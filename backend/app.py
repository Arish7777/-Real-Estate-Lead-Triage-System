from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import asyncio
import json

from leads_loader import load_leads_from_csv
from scoring import calculate_score
from ai_intent import analyze_intent

app = FastAPI(title="Real Estate Lead Triage System")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
processed_leads = []

class LeadResponse(BaseModel):
    id: int
    data: dict
    score: int
    tier: str
    action: str
    intent: str
    reason: str
    breakdown: dict

@app.post("/process")
async def process_leads(file: UploadFile = File(...)):
    global processed_leads
    content = await file.read()
    leads_data = load_leads_from_csv(content)
    
    new_processed = []
    
    # Process each lead
    # Note: In a real app, we might want to do this asynchronously or in background tasks if many leads
    # For this demo, we'll do it sequentially but maybe limit concurrency if needed.
    # Since we need to call LLM, it might be slow.
    
    for idx, lead in enumerate(leads_data):
        # Scoring
        score_result = calculate_score(lead)
        
        # AI Intent
        intent_result = analyze_intent(lead)
        
        processed_lead = {
            "id": len(processed_leads) + len(new_processed) + 1,
            "data": lead,
            "score": score_result["score"],
            "tier": score_result["tier"],
            "action": score_result["action"],
            "breakdown": score_result["breakdown"],
            "intent": intent_result.get("intent_label", "unknown"),
            "reason": intent_result.get("short_reason", "")
        }
        new_processed.append(processed_lead)
        
    processed_leads.extend(new_processed)
    return {"message": f"Processed {len(new_processed)} leads", "count": len(new_processed)}

@app.get("/leads")
def get_leads():
    try:
        # Clean up any potential NaN values before returning
        import math
        
        def clean_value(v):
            if isinstance(v, float) and (math.isnan(v) or math.isinf(v)):
                return None
            if isinstance(v, dict):
                return {k: clean_value(val) for k, val in v.items()}
            if isinstance(v, list):
                return [clean_value(item) for item in v]
            return v
        
        clean_leads = [clean_value(lead) for lead in processed_leads]
        return clean_leads
    except Exception as e:
        print(f"Error in get_leads: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/report")
def get_report():
    # HOT leads grouped by source
    hot_leads = [l for l in processed_leads if l["tier"] == "HOT"]
    report = {}
    for lead in hot_leads:
        source = lead["data"].get("source", "Unknown")
        if source not in report:
            report[source] = []
        report[source].append(lead)
    return report

@app.delete("/clear")
def clear_leads():
    global processed_leads
    count = len(processed_leads)
    processed_leads = []
    return {"message": f"Cleared {count} leads", "count": count}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)

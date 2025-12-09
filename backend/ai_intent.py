import json
import os
from dotenv import load_dotenv
from openai import OpenAI
from config import Config

# Ensure .env is loaded
load_dotenv(override=True)

# Use OpenRouter as the API provider
OPENROUTER_BASE_URL = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")

client = OpenAI(
    base_url=OPENROUTER_BASE_URL,
    api_key=Config.OPENAI_API_KEY
) if Config.OPENAI_API_KEY else None

SYSTEM_PROMPT = """You are a strict classifier that reads a single real-estate lead message and returns a JSON object only.
Allowed intent labels: serious_buyer, serious_renter, seller, casual_inquiry, spam, not_relevant.
Output format:
{
  "intent_label": "serious_buyer",
  "short_reason": "Asks about prices and buying options."
}
"""

def analyze_intent(lead: dict) -> dict:
    """
    Analyzes the lead using LLM to determine intent.
    """
    if not client or Config.USE_MOCK_AI:
        # Fallback/Mock behavior
        return {
            "intent_label": "casual_inquiry",
            "short_reason": "Mock AI: API Key not provided. Defaulting to casual inquiry."
        }

    user_prompt = f"""Lead Data JSON:
Name: {lead.get('name')}
Email: {lead.get('email')}
Phone: {lead.get('phone')}
Property Type: {lead.get('property_type')}
Budget: {lead.get('budget')}
Location Preference: {lead.get('location_preference')}
Timeframe: {lead.get('timeframe_to_move')}
Message: {lead.get('message')}
Source: {lead.get('source')}
"""

    try:
        response = client.chat.completions.create(
            model="openai/gpt-4o-mini",  # OpenRouter model format
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0,
            max_tokens=100
        )
        
        content = response.choices[0].message.content.strip()
        # Clean up potential markdown code blocks if the LLM adds them
        if content.startswith("```json"):
            content = content[7:]
        if content.endswith("```"):
            content = content[:-3]
            
        return json.loads(content)
    except Exception as e:
        print(f"LLM Error: {e}")
        return {
            "intent_label": "error",
            "short_reason": "AI processing failed."
        }

import re

def score_location(location: str) -> int:
    if not location:
        return 0
    loc_lower = location.lower()
    if any(x in loc_lower for x in ["dubai", "abu dhabi"]):
        return 30
    if any(x in loc_lower for x in ["ajman", "al ain", "rak", "ras al khaimah"]):
        return 20
    return 10

def score_budget(budget: str) -> int:
    # Logic: If budget is present and seems valid (not empty), give 25.
    # The prompt didn't specify sub-rules for budget, just "Budget -> 25".
    if budget and str(budget).strip().lower() not in ["", "nan", "none", "undisclosed"]:
        return 25
    return 0

def score_timeframe(timeframe: str) -> int:
    if not timeframe:
        return 0
    tf_lower = timeframe.lower()
    if "now" in tf_lower or "immediate" in tf_lower or "asap" in tf_lower:
        return 20
    if "1-3" in tf_lower or "1 to 3" in tf_lower:
        return 15
    if "3-6" in tf_lower or "3 to 6" in tf_lower:
        return 8
    if "6+" in tf_lower or "6 months" in tf_lower:
        return 3
    # Default fallback if some timeframe is present but doesn't match exact strings?
    # Prompt implies strict mapping. If it doesn't match, maybe 0?
    # Let's be slightly lenient if it contains "month" but not specific, maybe 3?
    # But for strictness, I'll stick to the rules.
    return 0

def score_contact(email: str, phone: str) -> int:
    score = 0
    if email and str(email).strip().lower() not in ["", "nan", "none"]:
        score += 7
    if phone and str(phone).strip().lower() not in ["", "nan", "none"]:
        score += 8
    return score

def score_message_quality(message: str) -> int:
    if not message or str(message).strip().lower() in ["", "nan", "none"]:
        return 0
    
    msg_lower = message.lower()
    
    # Check for spam (simple keyword check, though LLM handles intent, this is scoring)
    spam_keywords = ["lottery", "winner", "click here", "subscribe"]
    if any(k in msg_lower for k in spam_keywords):
        return 0
        
    # Keywords
    keywords = ["buy", "rent", "sell", "investment", "price", "looking for", "bedroom", "studio", "villa", "apartment"]
    if any(k in msg_lower for k in keywords):
        # "up to +10". Let's give 10 if it has keywords and is of decent length.
        if len(message.split()) > 5:
            return 10
        return 5 # Short but has keywords
        
    # Short or vague
    if len(message.split()) < 5:
        return 3
        
    return 3 # Default to "Short or vague" score if no strong keywords found but not spam

def calculate_score(lead: dict) -> dict:
    """
    Calculates the score for a single lead and returns the breakdown.
    """
    s_loc = score_location(lead.get("location_preference"))
    s_bud = score_budget(lead.get("budget"))
    s_time = score_timeframe(lead.get("timeframe_to_move"))
    s_cont = score_contact(lead.get("email"), lead.get("phone"))
    s_msg = score_message_quality(lead.get("message"))
    
    total_score = s_loc + s_bud + s_time + s_cont + s_msg
    
    # Tier Mapping
    if total_score >= 80:
        tier = "HOT"
        action = "call now"
    elif total_score >= 60:
        tier = "MEDIUM"
        action = "call later"
    elif total_score >= 40:
        tier = "LOW"
        action = "nurture"
    else:
        tier = "JUNK"
        action = "ignore"
        
    return {
        "score": total_score,
        "breakdown": {
            "location": s_loc,
            "budget": s_bud,
            "timeframe": s_time,
            "contact": s_cont,
            "message": s_msg
        },
        "tier": tier,
        "action": action
    }

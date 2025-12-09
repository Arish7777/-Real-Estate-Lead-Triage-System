"""Lead intent analyzer using LLM classification."""

import json
import os
from typing import Dict, Any, Optional
from dataclasses import dataclass

from dotenv import load_dotenv
from openai import OpenAI

from config import Config


@dataclass
class IntentResult:
    """Container for intent analysis results."""
    intent_label: str
    short_reason: str


class IntentAnalyzer:
    """Analyzes real estate lead messages to determine intent."""
    
    # Intent classification labels
    INTENT_LABELS = {
        "serious_buyer",
        "serious_renter", 
        "seller",
        "casual_inquiry",
        "spam",
        "not_relevant",
    }
    
    # System prompt for the LLM classifier
    SYSTEM_PROMPT = """You are a strict classifier that reads a single real-estate lead message and returns a JSON object only.
    Allowed intent labels: serious_buyer, serious_renter, seller, casual_inquiry, spam, not_relevant.
    
    Output format:
    {
      "intent_label": "serious_buyer",
      "short_reason": "Asks about prices and buying options."
    }
    """
    
    # Default error response
    ERROR_RESPONSE = IntentResult(
        intent_label="error",
        short_reason="AI processing failed."
    )
    
    def __init__(self):
        """Initialize the analyzer with API client."""
        load_dotenv(override=True)
        self.client = self._initialize_openai_client()
    
    def _initialize_openai_client(self) -> Optional[OpenAI]:
        """Initialize and return OpenAI client if API key is available."""
        if not Config.OPENAI_API_KEY or Config.USE_MOCK_AI:
            return None
            
        base_url = os.getenv(
            "OPENROUTER_BASE_URL", 
            "https://openrouter.ai/api/v1"
        )
        
        return OpenAI(
            base_url=base_url,
            api_key=Config.OPENAI_API_KEY
        )
    
    def _format_lead_prompt(self, lead: Dict[str, Any]) -> str:
        """Format lead data into a prompt for the LLM."""
        return f"""Lead Data:
        Name: {lead.get('name', 'Not provided')}
        Email: {lead.get('email', 'Not provided')}
        Phone: {lead.get('phone', 'Not provided')}
        Property Type: {lead.get('property_type', 'Not specified')}
        Budget: {lead.get('budget', 'Not specified')}
        Location Preference: {lead.get('location_preference', 'Not specified')}
        Timeframe: {lead.get('timeframe_to_move', 'Not specified')}
        Message: {lead.get('message', 'No message')}
        Source: {lead.get('source', 'Unknown')}
        """
    
    def _extract_json_from_response(self, content: str) -> Dict[str, Any]:
        """Extract JSON from LLM response, handling markdown formatting."""
        content = content.strip()
        
        # Remove markdown code block formatting if present
        if content.startswith("```json"):
            content = content[7:]
        if content.endswith("```"):
            content = content[:-3]
        if content.startswith("```"):
            content = content[3:]
            
        return json.loads(content.strip())
    
    def _call_llm(self, user_prompt: str) -> IntentResult:
        """Make the LLM API call to analyze intent."""
        try:
            response = self.client.chat.completions.create(
                model="openai/gpt-4o-mini",
                messages=[
                    {"role": "system", "content": self.SYSTEM_PROMPT},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0,  # Deterministic output
                max_tokens=100
            )
            
            content = response.choices[0].message.content
            result = self._extract_json_from_response(content)
            
            # Validate the response format
            if ("intent_label" not in result or 
                "short_reason" not in result):
                raise ValueError("Invalid response format from LLM")
            
            return IntentResult(
                intent_label=result["intent_label"],
                short_reason=result["short_reason"]
            )
            
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            return self.ERROR_RESPONSE
        except Exception as e:
            print(f"LLM API error: {e}")
            return self.ERROR_RESPONSE
    
    def analyze_lead(self, lead: Dict[str, Any]) -> IntentResult:
        """
        Analyze a lead to determine its intent.
        
        Args:
            lead: Dictionary containing lead information with keys:
                - name, email, phone, property_type, budget, 
                  location_preference, timeframe_to_move, message, source
        
        Returns:
            IntentResult object with intent_label and short_reason
        
        Examples:
            >>> analyzer = IntentAnalyzer()
            >>> lead = {"name": "John", "message": "Looking to buy ASAP"}
            >>> result = analyzer.analyze_lead(lead)
            >>> print(result.intent_label)
        """
        # Use mock response if client is not available
        if not self.client:
            return IntentResult(
                intent_label="casual_inquiry",
                short_reason="Mock mode: API not configured"
            )
        
        user_prompt = self._format_lead_prompt(lead)
        return self._call_llm(user_prompt)


# Convenience function for simple usage
def analyze_intent(lead: Dict[str, Any]) -> Dict[str, str]:
    """
    Convenience function for analyzing lead intent.
    
    This maintains backward compatibility with the original function signature.
    
    Args:
        lead: Dictionary containing lead information
        
    Returns:
        Dictionary with "intent_label" and "short_reason" keys
    """
    analyzer = IntentAnalyzer()
    result = analyzer.analyze_lead(lead)
    
    return {
        "intent_label": result.intent_label,
        "short_reason": result.short_reason
    }


if __name__ == "__main__":
    # Example usage
    test_lead = {
        "name": "Muhammad Arish",
        "email": "muhammadarishkhan555@gmail.com",
        "message": "I'm looking to buy a 3-bedroom house in downtown area."
    }
    
    result = analyze_intent(test_lead)
    print(f"Intent: {result['intent_label']}")
    print(f"Reason: {result['short_reason']}")
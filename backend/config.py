import os
from dotenv import load_dotenv

# Force reload from .env file, overriding any existing environment variables
load_dotenv(override=True)

class Config:
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    # If no key is found, we can set a flag to use mock data
    USE_MOCK_AI = not bool(OPENAI_API_KEY)
    
    # Scoring Weights
    SCORE_LOCATION = 30
    SCORE_BUDGET = 25
    SCORE_TIMEFRAME = 20
    SCORE_CONTACT = 15
    SCORE_MESSAGE = 10

    # Tier Thresholds
    TIER_HOT_MIN = 80
    TIER_MEDIUM_MIN = 60
    TIER_LOW_MIN = 40

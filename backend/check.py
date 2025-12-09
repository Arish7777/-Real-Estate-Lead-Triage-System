from dotenv import load_dotenv
import os

load_dotenv(override=True)
from config import Config

print(f"API Key: {os.getenv('OPENAI_API_KEY')}")

if Config.USE_MOCK_AI:
    print("Using: MOCK THING")
else:
    print("Using: OPENAI API")

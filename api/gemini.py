from dotenv import load_dotenv
import os
from google import genai

load_dotenv()

class Gemini:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.client = genai.Client(api_key=self.api_key)

    def generate_content(self, prompt: str, model: str = "gemini-2.0-flash") -> str:
        response = self.client.models.generate_content(
            model=model,
            contents=prompt
        )
        return response.text
    
    def get_api_key(self):
        return self.api_key
    def get_client(self):
        return self.client
from dotenv import load_dotenv
import os
from flask import Flask, jsonify, request
from flask_cors import CORS

load_dotenv()

from apify_client import ApifyClient
class InstagramProfile:
    def __init__(self):
        self.client = ApifyClient(os.getenv("APIFY_API_TOKEN"))
        self.run = None
    
    def set_username(self, username): 
        self.run = None
        self.username = username

    def fetch_profile(self):
        try:
            # Siapkan input untuk actor Instagram Scraper
            run_input = {
                "directUrls": [f"https://www.instagram.com/{self.username}/"],
                "resultsType": "details",         # <-- ambil data profil, bukan postingan
                "resultsLimit": 1,
                "searchType": "user",
                "searchLimit": 1,
                "addParentData": False,
            }

            # Jalankan actor Instagram scraper
            run = self.client.actor("shu8hvrXbJbY3Eb9W").call(run_input=run_input)
            self.run = run
        except Exception as e: 
            print(f"Error fetching profile: {e}")

    def get_profile_info(self) -> dict:
        if not self.run:
            self.fetch_profile()
        
        for item in self.client.dataset(self.run["defaultDatasetId"]).iterate_items():
            return {
                "username": item.get("username"),
                "full_name": item.get("fullName"),
                "bio": item.get("biography"),
                "followers": item.get("followersCount"),
                "following": item.get("followsCount"),
                "posts": item.get("postsCount"),
                "private": item.get("isPrivate"),
                "verified": item.get("isVerified"),
                "external_url": item.get("externalUrl"),
                "profile_pic_url": item.get("profilePicUrlHd") or item.get("profilePicUrl")
            }
    
    def get_posts(self, num_posts=6) -> list:
        posts = []
        ##
        return posts
    
    def get_profile_instance(self):
        return self.profile    
    
from google import genai
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

test = InstagramProfile()

test2 = Gemini()

app = Flask(__name__)
CORS(app)

@app.route('/api/get_content', methods=['POST'])
def index():
    try:
        data = request.get_json() 
        if not data or 'username' not in data:
            return jsonify({"error": "Username is required"}), 400

        test.set_username(data.get('username'))

        prompt = ["Berikan saya mengenai emosi atau perasaan dari pengguna Instagram ini",
        " "+test.get_profile_info()["username"]+" dengan nama lengkap"+test.get_profile_info()["full_name"]+"caption bio seperti ini "+test.get_profile_info()["bio"],
        " dan dengan jumlah followers "+str(test.get_profile_info()["followers"])+" dan jumlah following "+str(test.get_profile_info()["following"])+" dan jumlah post "+str(test.get_profile_info()["posts"]),
        " dan dari semua informasi ini, apa yang bisa kita simpulkan tentang "+test.get_profile_info()["username"]+"?",
        ' PENTING: Berikan HANYA teks analisis, tanpa kata pengantar atau pembuka apapun seperti "Oke, siap" atau "Berikut analisis untuk". Langsung mulai dengan analisisnya. sesekali gunakan emoticon.',
        ' Gunakan Bahasa Gaul, gunakan kata kata yang bisa dipahami.']

        return jsonify({
            "statusCode": 200,
            "headers": { "Content-Type": "application/json" },
            "body": {
                "profile": test.get_profile_info(), 
                "content": test2.generate_content("".join(prompt))
            }
        })
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__': 
    if os.getenv("DEBUG"):        
        app.run(debug=True)
    else:
        app.run()
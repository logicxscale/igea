from dotenv import load_dotenv
import os
from flask import Flask, jsonify, request
from flask_cors import CORS

load_dotenv()

import instaloader
class InstagramProfile:
    def __init__(self):
        self.loader = instaloader.Instaloader()
    
    def set_username(self, username): 
        self.username = username
        self.profile = instaloader.Profile.from_username(self.loader.context, username)

    def get_profile_info(self) -> dict:
        return {
            "username": self.profile.username,
            "full_name": self.profile.full_name,
            "bio": self.profile.biography,
            "followers": self.profile.followers,
            "following": self.profile.followees,
            "posts": self.profile.mediacount,
            "private": self.profile.is_private,
            "verified": self.profile.is_verified,
            "external_url": self.profile.external_url,
            "profile_pic_url": self.profile.profile_pic_url
        }
    
    def get_posts(self, num_posts=6) -> list:
        posts = []
        for post in self.profile.get_posts():
            if len(posts) >= num_posts:
                break
            posts.append({                
                "likes": post.likes,                
                "caption": post.caption,
                "date": post.date
            })
        return posts
    
    def get_profile_instance(self):
        return self.profile
    def get_loader_instance(self):
        return self.loader
    
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
        data = request.json        
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
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__': 
    if os.getenv("DEBUG"):        
        app.run(debug=True)
    else:
        app.run()
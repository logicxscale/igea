from flask import Flask

from instagram import InstagramProfile
from gemini import Gemini

test = InstagramProfile()

test2 = Gemini()

app = Flask(__name__)

@app.route('/api/v1/get_content/<username>', methods=['POST'])
def index(username):
    test.set_username(username)

    prompt = ["Berikan saya mengenai emosi atau perasaan dari pengguna Instagram ini",
    " "+test.get_profile_info()["username"]+" dengan nama lengkap"+test.get_profile_info()["full_name"]+"caption bio seperti ini "+test.get_profile_info()["bio"],
    " dan dengan jumlah followers "+str(test.get_profile_info()["followers"])+" dan jumlah following "+str(test.get_profile_info()["following"])+" dan jumlah post "+str(test.get_profile_info()["posts"]),
    " dan dari semua informasi ini, apa yang bisa kita simpulkan tentang "+test.get_profile_info()["username"]+"?",
    '  PENTING: Berikan HANYA teks analisis, tanpa kata pengantar atau pembuka apapun seperti "Oke, siap" atau "Berikut analisis untuk". Langsung mulai dengan analisisnya. sesekali gunakan emoticon.',
    ' Gunakan Bahasa Gaul, gunakan kata kata yang bisa dipahami.']

    return (test2.generate_content("".join(prompt)))

if __name__ == '__main__':  
    app.run(debug=True)
# 📸 IG Emotion Analyzer

**IG Emotion Analyzer** adalah aplikasi berbasis web yang memungkinkan pengguna untuk menganalisis kepribadian seseorang berdasarkan profil Instagram mereka, menggunakan kecerdasan buatan (AI) dari **Gemini**. Cukup masukkan username Instagram, dan sistem akan melakukan scraping data publik dan memberikan ringkasan kepribadian secara otomatis.

---

## ✨ Fitur Utama

- 🔍 Scraping data profil Instagram (foto profil, bio, follower, dll)
- 🧠 Analisis kepribadian berdasarkan data dengan AI Gemini
- 📷 Menampilkan informasi pengguna dan profil dengan visual menarik
- 📤 Share hasil analisis
- ⚡ Cepat, ringan, dan bisa diakses dari browser manapun

---

## 🧱 Tech Stack

- **Frontend**: [Next.js 14 (App Router)](https://nextjs.org/) + TypeScript
- **Backend API**: Python (Flask via Vercel Serverless Function)
- **Scraping**: [Apify Instagram Scraper](https://apify.com/shu8hvrXbJbY3Eb9W/instagram-scraper)
- **AI**: [Gemini (Google AI)](https://deepmind.google/technologies/gemini/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## ⚙️ Setup dan Instalasi

1. **Clone project**

```bash
git clone https://github.com/username/ig-emotion-analyzer.git
cd ig-emotion-analyzer
```

2. **Instalasi dependencies Next.js**
```npm install```
atau
```yarn install```

3. **Konfigurasi environment**
Buat file .env.local dan tambahkan:
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
APIFY_API_TOKEN=your_apify_token
GEMINI_API_KEY=your_gemini_key
```

4. **Jalankan aplikasi**
```npm run dev```

5. **(Opsional) Setup Python backend**
# Jika kamu ingin menjalankan backend Flask API secara lokal:
```
cd api
pip install -r requirements.txt
python index.py
```

## 📦 Dependencies
# Frontend
- next
- react
- axios
- tailwindcss
- bootstrap

## Backend
- flask
- apify-client
- python-dotenv
- requests

## 👤 Author
Made with ❤️ by [@bagusa4](https://github.com/bagusa4)
🚀 Happy analyzing!
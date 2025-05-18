'use client';

import Image from "next/image";
import styles from "./page.module.css";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [username, setInput] = useState("");
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (username.trim() !== "") {
      router.push(`${baseUrl}/result/${username}`);
    } else {  
      alert("Please enter a username");
    }
  };

  return (
    <div className={styles.page} style={{ paddingTop: "0px", marginTop: "0px" }}>
      <main className={styles.main}>
        <h1 className={`center`}>EmotionGram <i className="bi bi-instagram"></i></h1>
        <h3 className={`center`}>Coba AI Biar Analisi Kepribadian Kamu Lewat Instagram, Gas!</h3>
        <div className="card">
            <div className="card-header">
              Username Instagram
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">@</span>
                <input onChange={e => setInput(e.target.value)} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
              </div>
              <button type="submit" className="btn btn-primary">Analyze</button>
              </form>
            </div>
          </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
          <div className="card">
              <div className="card-body">
                <h5 className="card-title">Cepat</h5>
                <p className="card-text">Analisis Dengan Cepat Menggunakan AI dari Google Gemini.</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Mudah</h5>
                <p className="card-text">Tinggal kamu masukkan username Instagram yang ingin di analisis maka langsung muncul.</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Gratis</h5>
                <p className="card-text">Bisa digunakan gratis dan bisa di share ke temen-temen buat pamer kepribadian kamu di Instagram.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
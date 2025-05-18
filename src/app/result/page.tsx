'use client';

import Image from "next/image";
import styles from "../page.module.css";

import { useRef, useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  useEffect(() => {
    async function fetchData() {
        const result = await fetch(`${baseUrl}/api/v1/get_content/bagusa4`, {method: 'POST', headers: {'Content-Type': 'application/json'}});
        const data = await result.json();
        setData(data);
    }
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleCopy = () => {
    const text = textRef.current?.innerText;
    if (text) {
      navigator.clipboard.writeText(text);
      alert('Teks berhasil disalin!');
    }
  };

  return (
    <div className={`${styles.page}`}>
      <h1 className={`center`}>Hasil IG <i className="bi bi-instagram"></i> Emotion Analyzer</h1>
      <main className={`${styles.main}`}>
        <div className="container">
            <div className="row text-center">
                <div className="col">
                    <div className="alert alert-primary" role="alert">
                        Mantap hasil udah keluar nih, check it out!
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <i className="bi bi-person-circle"></i> Profile @{data.profile.username}
                        </div>
                        <Image src={data.profile.profile_pic_url} className="card-img-top" alt="Profile Picture" width={600} height={0} style={{height: 'auto'}}/>
                        <div className="card-body">
                            <h5 className="card-title">@{data.profile.username} - {data.profile.full_name}</h5>
                            <p className="card-text">{data.profile.bio}</p>
                            <div className="row pb-3">
                                <div className="col">
                                    <p className="card-text">Followers: {data.profile.followers}</p>
                                </div>
                                <div className="col">
                                    <p className="card-text">Following: {data.profile.following}</p>
                                </div>
                                <div className="col">
                                    <p className="card-text">Posts: {data.profile.posts}</p>
                                </div>
                            </div>
                        </div>
                        </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                            <i className="bi bi-lightbulb-fill"></i> Hasil Analyze
                        </div>
                        <div className="card-body">
                            <p ref={textRef} className="card-text text-break lh-lg" style={{ whiteSpace: 'pre-line' }}>{data.content}</p>
                            <button onClick={handleCopy} className="btn btn-primary">Copy</button>
                        </div>
                        </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
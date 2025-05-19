'use client';

import Image from "next/image";
import styles from "../../page.module.css";

import { useRef, useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import html2canvas from 'html2canvas';
import axios from "axios";

interface Data {
    body: {
        profile: {
            username: string;
            full_name: string;
            profile_pic_url: string;
            bio: string;
            followers: number;
            following: number;
            posts: number;
        };
        content: string;
        error: string;    
    }
}

export default function Home() {
  const params = useParams();
  const [data, setData] = useState<Data | undefined>();
  const textRef = useRef<HTMLParagraphElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  useEffect(() => {
    async function fetchData() {
        try {
            const result = await axios.post<Data>(`/api/get_content`, {
                username: params.param,
            }, {
                headers: {'Content-Type': 'application/json'},
            });

            const data: Data = result.data;

            if (data.body?.error) {
                alert("Gagal mendapatkan data, silahkan coba lagi"+" "+data.body.error);
                return;
            }
            
            setData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Gagal mendapatkan data, silahkan coba lagi");
        }
    }
    fetchData();
  }, []);

  if (!data) {
    return (
        <div className={`${styles.page}`}>
            <main className={`${styles.main}`}>
                <div className="spinner-border text-primary" role="status">
                    <span>Loading...</span>
                </div>
            </main>
        </div>
    );
  }

  const handleCopy = () => {
    const text = textRef.current?.innerText;
    if (text) {
      navigator.clipboard.writeText(text);
      alert('Teks berhasil disalin!');
    }
  };

  const handleScreenshot = async () => {
    if (!divRef.current) return;
    const canvas = await html2canvas(divRef.current);
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "screenshot.png";
    link.click();    
  };

  return (
    <div ref={divRef} className={`${styles.page}`}>
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
                            <i className="bi bi-person-circle"></i> Profile @{data.body.profile.username}
                        </div>
                        <Image src={data.body.profile.profile_pic_url} className="card-img-top" alt="Profile Picture" width={600} height={0} style={{height: 'auto'}}/>
                        <div className="card-body">
                            <h5 className="card-title">@{data.body.profile.username} - {data.body.profile.full_name}</h5>
                            <div className="card-text">
                                <figure>
                                    <blockquote className="blockquote">
                                        <p>{data.body.profile.bio}</p>
                                    </blockquote>
                                    <figcaption className="blockquote-footer">
                                        by <cite title="Source Title">@{data.body.profile.username}</cite>
                                    </figcaption>
                                </figure>
                            </div>
                            <div className="row pb-3">
                                <div className="col">
                                    <p className="card-text">Followers: {data.body.profile.followers}</p>
                                </div>
                                <div className="col">
                                    <p className="card-text">Following: {data.body.profile.following}</p>
                                </div>
                                <div className="col">
                                    <p className="card-text">Posts: {data.body.profile.posts}</p>
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
                            <p ref={textRef} className="card-text text-break lh-lg" style={{ whiteSpace: 'pre-line' }}>{data.body.content}</p>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-2">
                                    <button onClick={handleCopy} className="btn btn-primary">Copy</button>
                                </div>
                                <div className="col-2">
                                    <button onClick={handleScreenshot} className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
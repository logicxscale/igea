import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={`center`}>EmotionGram <i className="bi bi-instagram"></i></h1>
        <h3 className={`center`}>Coba AI Biar Analisi Kepribadian Kamu Lewat Instagram, Gas!</h3>
        <div className="card">
          <div className="card-header">
            Username Instagram
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">@</span>
              <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" id="username"></input>
            </div>
            <a href="#" className="btn btn-primary">Analyze</a>
          </div>
        </div>
      </main>
    </div>
  );
}
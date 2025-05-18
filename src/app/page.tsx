import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={`${styles.page}`}>
      <h1 className={`center`}>EmotionGram</h1>
      <main className={styles.main}>
        <div className="card">
          <div className="card-header">
            Username Instagram
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">@</span>
              <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
            </div>
            <a href="#" className="btn btn-primary">Analyze</a>
          </div>
        </div>
      </main>
    </div>
  );
}
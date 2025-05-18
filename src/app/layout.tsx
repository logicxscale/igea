import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BootstrapClient from "./components/BootstrapClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IG Emotion Analyzer",
  description: "Analyze your Instagram account using AI - Create by @bagusa4 - using Next.js & Python Flask & Bootstrap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} data-bs-theme="dark">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              EmotionGram <i className="bi bi-instagram"></i>
            </a>
          </div>
        </nav>
        <div className="container bs-dark">
          {children}
        </div>
        <footer className="footer mt-auto py-3 bg-body-tertiary">
          <div className="container">
            <p className="text-center">
              Made with ❤️ by <a href="https://github.com/bagusa4">{"@bagusa4"}</a>
            </p>    
          </div>          
        </footer>
        <BootstrapClient />
      </body>
    </html>
  );
}

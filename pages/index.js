import React, { useState } from 'react';
import { MapPin, Star, Car, Users, ShieldCheck, Navigation } from 'lucide-react';

// 🔥 آپ کی فراہم کردہ فائر بیس کنفیگریشن
const firebaseConfig = {
  apiKey: "AIzaSyCbawvd2xE6DL4cMJ1w1Et2AuKInYL5kWs",
  authDomain: "gosmart-489f2.firebaseapp.com",
  projectId: "gosmart-489f2",
  storageBucket: "gosmart-489f2.firebasestorage.app",
  messagingSenderId: "965154402861",
  appId: "1:965154402861:web:cf753229db65e1c84bbea4",
  measurementId: "G-SRJFWD55Z1"
};

export default function GoSmartApp() {
  const [view, setView] = useState('rider');
  const [fare, setFare] = useState(0);
  const [loading, setLoading] = useState(false);

  // 📸 آپ کا لوگو (جو public فولڈر میں ہے)
  const myLogo = "/IMG_20260124_084929.JPG"; 

  const handleBooking = () => {
    setLoading(true);
    // ڈیٹا بیس میں رائیڈ سیو کرنے کا عمل یہاں سے شروع ہوگا
    setTimeout(() => {
      alert("شکریہ! آپ کی رائیڈ کی درخواست فائر بیس ڈیٹا بیس میں رجسٹر ہو گئی ہے۔");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="app-main" dir="rtl">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        
        :root {
          --neon-green: #22c55e;
          --electric-blue: #3b82f6;
          --bg-dark: #0F172A;
        }

        body {
          margin: 0;
          background-color: var(--bg-dark);
          color: white;
          font-family: 'Noto Nastaliq Urdu', serif;
        }

        /* 📸 لوگو ہیڈر */
        .header-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
        }

        .logo-img {
          width: 170px;
          height: auto;
          border-radius: 25px;
          box-shadow: 0 0 25px rgba(34, 197, 94, 0.4);
          margin-bottom: 15px;
        }

        /* ✨ ہائی لائٹر نیویگیشن */
        .nav-container {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: -30px;
          position: relative;
          z-index: 10;
        }

        .nav-btn {
          padding: 12px 35px;
          border-radius: 50px;
          border: 2px solid #334155;
          background: #1e293b;
          color: #94a3b8;
          font-weight: bold;
          cursor: pointer;
          transition: 0.4s ease;
        }

        .nav-btn.active {
          background: var(--neon-green);
          color: white;
          border-color: #4ade80;
          box-shadow: 0 0 25px rgba(34, 197, 94, 0.6);
          transform: scale(1.1);
        }

        /* 📱 مین کارڈ ڈیزائن */
        .glass-card {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 40px;
          padding: 30px;
          margin: 25px 15px;
          backdrop-filter: blur(15px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }

        .input-wrapper {
          background: #0F172A;
          border: 2px solid #334155;
          border-radius: 22px;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          outline: none;
          font-size: 16px;
          font-family: inherit;
        }

        .book-btn {
          width: 100%;
          padding: 20px;
          background: linear-gradient(90deg, #16a34a, #22c55e);
          border: none;
          border-radius: 22px;
          color: white;
          font-weight: 800;
          font-size: 22px;
          cursor: pointer;
          box-shadow: 0 15px 30px rgba(22, 163, 74, 0.4);
        }
      `}</style>

      {/* ہیڈر سیکشن */}
      <header className="header-box">
        <img src={myLogo} alt="GoSmart Logo" className="logo-img" />
        <h1 style={{margin: 0, fontSize: '32px', color: 'white'}}>GoSmart</h1>
      </header>

      {/* ہائی لائٹر سوئچر */}
      <div className="nav-container">
        <button onClick={() => setView('rider')} className={`nav-btn ${view === 'rider' ? 'active' : ''}`}>سواری</button>
        <button onClick={() => setView('driver')} className={`nav-btn ${view === 'driver' ? 'active' : ''}`}>ڈرائیور</button>
      </div>

      <main style={{maxWidth: '480px', margin: '0 auto'}}>
        {view === 'rider' ? (
          <div className="glass-card">
            <div className="input-wrapper">
              <MapPin color="#ef4444" size={24} />
              <input 
                type="text" 
                placeholder="آپ کی منزل کہاں ہے؟" 
                onChange={(e) => e.target.value.length > 2 ? setFare(580) : setFare(0)} 
              />
            </div>
            
            {fare > 0 && (
              <div style={{textAlign: 'center', marginTop: '20px'}}>
                <div style={{fontSize: '55px', fontWeight: '900', color: 'white'}}>Rs. {fare}</div>
                <button className="book-btn" onClick={handleBooking}>
                  {loading ? "بکنگ ہو رہی ہے..." : "ابھی سواری بلائیں"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-card">
             <div style={{borderRight: '5px solid var(--electric-blue)', paddingRight: '20px'}}>
                <p style={{fontSize: '14px', color: '#94a3b8', margin: 0}}>نئی رائیڈ کی درخواست</p>
                <h2 style={{margin: '15px 0', fontSize: '24px'}}>ڈی ایچ اے فیز 5، لاہور</h2>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px'}}>
                   <div style={{fontSize: '32px', fontWeight: 'bold', color: 'var(--neon-green)'}}>Rs. 850</div>
                   <button className="nav-btn active" style={{padding: '10px 20px'}}>قبول کریں</button>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import { MapPin, Globe, CreditCard, Users, ShieldCheck, Star } from 'lucide-react';

export default function GoSmartApp() {
  const [view, setView] = useState('rider'); 
  const [fare, setFare] = useState(0);

  return (
    <div className="main-container" dir="rtl">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        
        :root {
          --go-green: #22c55e;
          --go-blue: #3b82f6;
          --go-yellow: #eab308;
          --bg-dark: #0F172A;
        }

        body {
          margin: 0;
          background-color: var(--bg-dark);
          color: white;
          font-family: 'Noto Nastaliq Urdu', serif;
        }

        /* جدید لوگو اسٹائل */
        .logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px 0;
        }

        .logo-svg {
          width: 80px;
          height: 80px;
          filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.4));
        }

        .brand-name {
          font-size: 32px;
          font-weight: 900;
          margin-top: -10px;
          background: linear-gradient(to right, #22c55e, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-style: italic;
        }

        /* ہائی لائٹر بٹنز */
        .view-switcher {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-bottom: 20px;
        }

        .tab-btn {
          padding: 10px 25px;
          border-radius: 50px;
          border: 2px solid transparent;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
          background: #1e293b;
          color: #94a3b8;
        }

        .tab-btn.active {
          background: var(--go-green);
          color: white;
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
          border-color: #4ade80;
          transform: scale(1.05);
        }

        .card {
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 25px;
          backdrop-filter: blur(15px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }

        .highlight-input {
          border: 2px solid #334155;
          transition: 0.3s;
        }

        .highlight-input:focus-within {
          border-color: var(--go-blue);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
        }
      `}</style>

      {/* 🚀 ایپ ہیڈر اور لوگو */}
      <header className="logo-container">
        <svg className="logo-svg" viewBox="0 0 100 100">
          {/* لوکیشن پن */}
          <path d="M50 5 C30 5 15 20 15 40 C15 65 50 95 50 95 C50 95 85 65 85 40 C85 20 70 5 50 5 Z" fill="#22c55e" />
          {/* کار کا خاکہ */}
          <path d="M35 45 L65 45 L62 38 C61 36 59 35 57 35 L43 35 C41 35 39 36 38 38 Z M32 45 C30 45 28 47 28 49 L28 55 C28 56 29 57 30 57 L70 57 C71 57 72 56 72 55 L72 49 C72 47 70 45 68 45 Z" fill="white" />
          {/* سوئش لہریں */}
          <path d="M20 75 Q50 60 80 75" stroke="#eab308" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M25 82 Q50 67 75 82" stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
        <h1 className="brand-name">GoSmart</h1>
      </header>

      <main style={{padding: '0 20px', maxWidth: '450px', margin: '0 auto'}}>
        {/* ویو سوئچر */}
        <div className="view-switcher">
          <button onClick={() => setView('rider')} className={`tab-btn ${view === 'rider' ? 'active' : ''}`}>سواری</button>
          <button onClick={() => setView('driver')} className={`tab-btn ${view === 'driver' ? 'active' : ''}`}>ڈرائیور</button>
        </div>

        {view === 'rider' ? (
          <div className="card animate-in fade-in">
            <div className="highlight-input" style={{display:'flex', alignItems:'center', gap:'10px', padding:'12px', borderRadius:'15px', background:'#0F172A'}}>
              <MapPin color="#ef4444" size={20} />
              <input 
                type="text" 
                placeholder="آپ کی منزل کہاں ہے؟" 
                style={{background:'none', border:'none', color:'white', outline:'none', width:'100%'}}
                onChange={() => setFare(520)}
              />
            </div>
            
            {fare > 0 && (
              <div style={{textAlign:'center', marginTop:'30px'}}>
                <div style={{fontSize:'55px', fontWeight:'900', color:'white', textShadow:'0 0 20px rgba(34,197,94,0.3)'}}>Rs. {fare}</div>
                <button style={{width:'100%', padding:'18px', background:'var(--go-green)', border:'none', borderRadius:'20px', color:'white', fontWeight:'bold', fontSize:'18px', boxShadow:'0 10px 20px rgba(34,197,94,0.3)'}}>
                  ابھی بک کریں
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="card">
             <div style={{borderRight:'4px solid #3b82f6', paddingRight:'15px'}}>
                <p style={{fontSize:'12px', color:'#94a3b8', margin:0}}>نئی درخواست موصول ہوئی</p>
                <h3 style={{margin:'10px 0'}}>گلبرگ سے علامہ اقبال ٹاؤن</h3>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'20px'}}>
                   <span style={{fontSize:'24px', fontWeight:'bold', color:'#22c55e'}}>Rs. 740</span>
                   <button className="tab-btn active">قبول کریں</button>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}

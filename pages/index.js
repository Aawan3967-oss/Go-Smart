import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Star, CreditCard, Users, ShieldCheck } from 'lucide-react';

export default function GoSmartAllInOne() {
  const [view, setView] = useState('rider'); 
  const [fare, setFare] = useState(0);

  return (
    <div className="main-container" dir="rtl">
      {/* 🎨 تمام اسٹائلز اب اسی فائل کے اندر ہیں */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        
        :root {
          --indigo: #4F46E5;
          --bg-dark: #0F172A;
          --card-bg: #1E293B;
        }

        body {
          margin: 0;
          padding: 0;
          background-color: var(--bg-dark);
          color: white;
          font-family: 'Noto Nastaliq Urdu', serif;
          line-height: 2.2;
        }

        .main-container { min-h-screen; }
        
        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--card-bg);
          border-bottom: 1px solid rgba(79, 70, 229, 0.3);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
        }

        .logo-box {
          background: var(--indigo);
          padding: 8px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(79, 70, 229, 0.4);
        }

        .logo-text h1 {
          margin: 0;
          font-size: 24px;
          color: var(--indigo);
          font-style: italic;
          font-weight: 900;
          line-height: 1;
        }

        .view-switcher {
          background: #0F172A;
          padding: 4px;
          border-radius: 16px;
          display: flex;
          gap: 5px;
        }

        .btn-tab {
          padding: 8px 16px;
          border-radius: 12px;
          border: none;
          color: #64748b;
          background: transparent;
          cursor: pointer;
          font-weight: bold;
          font-size: 12px;
          transition: 0.3s;
        }

        .btn-active {
          background: var(--indigo);
          color: white;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        }

        .card {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(79, 70, 229, 0.2);
          border-radius: 40px;
          padding: 2rem;
          margin-top: 20px;
          backdrop-filter: blur(10px);
        }

        .input-group {
          background: #0F172A;
          border-radius: 20px;
          padding: 10px 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #334155;
        }

        input {
          background: transparent;
          border: none;
          color: white;
          outline: none;
          width: 100%;
          font-size: 14px;
        }

        .fare-display {
          font-size: 50px;
          font-weight: 900;
          color: var(--indigo);
          margin: 20px 0;
          text-align: center;
        }

        .btn-main {
          width: 100%;
          background: var(--indigo);
          padding: 18px;
          border-radius: 25px;
          border: none;
          color: white;
          font-weight: bold;
          font-size: 18px;
          box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
          cursor: pointer;
        }
      `}</style>

      {/* 🏗 ہیڈر اور لوگو */}
      <nav className="nav-bar">
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
           <div className="logo-box">
              <Navigation size={22} color="white" fill="white" />
           </div>
           <div className="logo-text">
              <h1>GoSmart</h1>
           </div>
        </div>
        
        <div className="view-switcher">
          <button onClick={() => setView('rider')} className={`btn-tab ${view === 'rider' ? 'btn-active' : ''}`}>سواری</button>
          <button onClick={() => setView('driver')} className={`btn-tab ${view === 'driver' ? 'btn-active' : ''}`}>ڈرائیور</button>
        </div>
      </nav>

      {/* 📱 مین مواد */}
      <main style={{padding: '20px', maxWidth: '450px', margin: '0 auto'}}>
        {view === 'rider' ? (
          <div className="card">
            <div className="input-group">
              <MapPin size={20} color="#ef4444" />
              <input 
                type="text" 
                placeholder="آپ کی منزل کہاں ہے؟" 
                onChange={() => setFare(480)}
              />
            </div>
            {fare > 0 && (
              <div style={{textAlign: 'center', marginTop: '30px'}}>
                <p style={{fontSize: '12px', color: '#818cf8', margin: 0}}>تجویز کردہ کرایہ</p>
                <div className="fare-display">Rs. {fare}</div>
                <button className="btn-main">ابھی سواری تلاش کریں</button>
              </div>
            )}
          </div>
        ) : (
          <div style={{marginTop: '20px'}}>
            <div className="card" style={{borderRadius: '30px', padding: '1.5rem'}}>
               <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8'}}>
                  <span>قریبی سواری (1.2 کلومیٹر)</span>
                  <span style={{color: '#22c55e'}}>● آن لائن</span>
               </div>
               <h3 style={{margin: '15px 0'}}>گلبرگ 3 سے ڈی ایچ اے لاہور</h3>
               <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{fontSize: '28px', fontWeight: 'bold', color: '#818cf8'}}>Rs. 650</div>
                  <button className="btn-tab btn-active" style={{fontSize: '14px', padding: '10px 20px'}}>قبول کریں</button>
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

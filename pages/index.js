import React, { useState } from 'react';
import { MapPin, Navigation, Globe, CreditCard, Users, ShieldCheck, Star } from 'lucide-react';

export default function GoSmartApp() {
  const [view, setView] = useState('rider'); 
  const [fare, setFare] = useState(0);

  // آپ کا فراہم کردہ لوگو پاتھ
  const logoPath = "/https://www.facebook.com/share/1Aj62NFQ6n/"; 

  return (
    <div className="app-container" dir="rtl">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        
        :root {
          --neon-green: #22c55e;
          --electric-blue: #3b82f6;
          --warning-yellow: #eab308;
          --dark-navy: #0F172A;
          --card-bg: #1E293B;
        }

        body {
          margin: 0;
          background-color: var(--dark-navy);
          color: white;
          font-family: 'Noto Nastaliq Urdu', serif;
          overflow-x: hidden;
        }

        /* لوگو ڈیزائن */
        .header-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 30px 0;
          background: linear-gradient(180deg, rgba(30,41,59,1) 0%, rgba(15,23,42,1) 100%);
        }

        .logo-img {
          width: 140px;
          height: auto;
          filter: drop-shadow(0 0 15px rgba(34, 197, 94, 0.3));
          margin-bottom: 10px;
        }

        /* ہائی لائٹر بٹنز */
        .nav-switcher {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin: 25px 0;
        }

        .tab-btn {
          padding: 12px 35px;
          border-radius: 50px;
          border: 2px solid #334155;
          background: transparent;
          color: #94a3b8;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s all ease;
        }

        .tab-btn.active {
          background: var(--neon-green);
          color: white;
          border-color: var(--neon-green);
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
          transform: scale(1.05);
        }

        /* مین کارڈ اسٹائل */
        .glass-card {
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 35px;
          padding: 30px;
          backdrop-filter: blur(10px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.4);
        }

        .input-box {
          background: #0F172A;
          border: 2px solid #334155;
          border-radius: 20px;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: 0.3s;
        }

        .input-box:focus-within {
          border-color: var(--electric-blue);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
        }

        input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          outline: none;
          font-size: 16px;
        }

        .confirm-btn {
          width: 100%;
          padding: 20px;
          background: linear-gradient(90deg, #16a34a, #22c55e);
          border: none;
          border-radius: 20px;
          color: white;
          font-weight: 800;
          font-size: 20px;
          margin-top: 25px;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(22, 163, 74, 0.4);
        }
      `}</style>

      {/* 🖼 ہیڈر اور لوگو */}
      <header className="header-section">
        <img 
          src={logoPath} 
          alt="GoSmart Logo" 
          className="logo-img"
          onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png'; }}
        />
      </header>

      <main style={{padding: '0 20px', maxWidth: '450px', margin: '0 auto'}}>
        {/* ویو سوئچر */}
        <div className="nav-switcher">
          <button onClick={() => setView('rider')} className={`tab-btn ${view === 'rider' ? 'active' : ''}`}>سواری</button>
          <button onClick={() => setView('driver')} className={`tab-btn ${view === 'driver' ? 'active' : ''}`}>ڈرائیور</button>
        </div>

        {view === 'rider' ? (
          <div className="glass-card">
            <div className="input-box">
              <MapPin color="#ef4444" size={24} />
              <input 
                type="text" 
                placeholder="آپ کی منزل کہاں ہے؟" 
                onChange={() => setFare(580)}
              />
            </div>
            
            {fare > 0 && (
              <div style={{textAlign: 'center', marginTop: '30px'}}>
                <p style={{color: '#818cf8', fontSize: '12px', marginBottom: '5px'}}>تجویز کردہ کرایہ</p>
                <div style={{fontSize: '55px', fontWeight: '900', color: 'white'}}>Rs. {fare}</div>
                <button className="confirm-btn">ابھی بکنگ کریں</button>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-card">
             <div style={{borderRight: '5px solid var(--electric-blue)', paddingRight: '20px'}}>
                <p style={{fontSize: '14px', color: '#94a3b8', margin: 0}}>نئی درخواست موصول ہوئی</p>
                <h2 style={{margin: '15px 0', fontSize: '24px', fontStyle: 'italic'}}>گلبرگ سے ڈی ایچ اے لاہور</h2>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px'}}>
                   <div style={{fontSize: '32px', fontWeight: 'bold', color: 'var(--neon-green)'}}>Rs. 920</div>
                   <button className="tab-btn active" style={{padding: '10px 20px'}}>قبول کریں</button>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}

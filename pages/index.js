import React, { useState } from 'react';
import { MapPin, Navigation, Star, ShieldCheck, Car, Smartphone, CreditCard, Users } from 'lucide-react';

export default function GoSmartApp() {
  const [view, setView] = useState('rider'); 
  const [fare, setFare] = useState(0);

  // آپ کی تصویر کا نام یہاں سیٹ ہے (اسے public فولڈر میں ہونا چاہیے)
  const myLogo = "/IMG_20260124_084929.JPG"; 

  return (
    <div className="app-container" dir="rtl">
      {/* 🎨 تمام ڈیزائن (CSS) اسی فائل میں ہے */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        
        :root {
          --neon-green: #22c55e;
          --electric-blue: #3b82f6;
          --bright-yellow: #facc15;
          --dark-navy: #0F172A;
          --card-bg: #1E293B;
        }

        body {
          margin: 0;
          padding: 0;
          background-color: var(--dark-navy);
          color: white;
          font-family: 'Noto Nastaliq Urdu', serif;
          line-height: 2.2;
        }

        /* لوگو سیکشن */
        .header-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 30px 20px 50px 20px;
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .logo-img {
          width: 160px;
          height: auto;
          filter: drop-shadow(0 0 15px rgba(34, 197, 94, 0.4));
          border-radius: 20px;
          margin-bottom: 10px;
        }

        /* ہائی لائٹر ویو سوئچر */
        .switcher-nav {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: -30px;
          position: relative;
          z-index: 100;
        }

        .nav-btn {
          padding: 12px 25px;
          border-radius: 50px;
          border: 2px solid #334155;
          background: #1e293b;
          color: #94a3b8;
          font-weight: bold;
          cursor: pointer;
          transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          font-size: 14px;
        }

        .nav-btn.active {
          background: var(--neon-green);
          color: white;
          border-color: #4ade80;
          box-shadow: 0 0 25px rgba(34, 197, 94, 0.6);
          transform: scale(1.1) translateY(-2px);
        }

        /* کارڈ اور ان پٹ */
        .main-card {
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 40px;
          padding: 30px;
          margin: 25px 15px;
          backdrop-filter: blur(20px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }

        .highlight-input {
          background: #0F172A;
          border: 2px solid #334155;
          border-radius: 20px;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: 0.3s;
        }

        .highlight-input:focus-within {
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
          font-family: 'Noto Nastaliq Urdu', serif;
        }

        .confirm-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(90deg, #16a34a, #22c55e);
          border: none;
          border-radius: 22px;
          color: white;
          font-weight: 800;
          font-size: 20px;
          margin-top: 25px;
          cursor: pointer;
          box-shadow: 0 15px 30px rgba(22, 163, 74, 0.4);
          transition: 0.3s;
        }

        .confirm-btn:active { transform: scale(0.95); }

        .fare-text {
          font-size: 55px;
          font-weight: 900;
          color: white;
          text-align: center;
          margin: 15px 0;
          text-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }
      `}</style>

      {/* 🖼 ہیڈر اور آپ کا لوگو */}
      <header className="header-box">
        <img 
          src={myLogo} 
          alt="GoSmart Logo" 
          className="logo-img"
          onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png'; }} 
        />
      </header>

      {/* 💡 ہائی لائٹر نیویگیشن */}
      <nav className="switcher-nav">
        <button onClick={() => setView('rider')} className={`nav-btn ${view === 'rider' ? 'active' : ''}`}>سواری</button>
        <button onClick={() => setView('driver')} className={`nav-btn ${view === 'driver' ? 'active' : ''}`}>ڈرائیور</button>
        <button onClick={() => setView('admin')} className={`nav-btn ${view === 'admin' ? 'active' : ''}`}>ایڈمن</button>
      </nav>

      {/* 📱 مین مواد */}
      <main style={{maxWidth: '500px', margin: '0 auto'}}>
        {view === 'rider' && (
          <div className="main-card">
            <div className="highlight-input">
              <MapPin color="#ef4444" size={24} />
              <input 
                type="text" 
                placeholder="آپ کی منزل کہاں ہے؟" 
                onChange={(e) => e.target.value.length > 3 ? setFare(480) : setFare(0)}
              />
            </div>
            {fare > 0 && (
              <div style={{textAlign: 'center', marginTop: '20px'}}>
                <p style={{fontSize: '12px', color: '#818cf8', margin: 0}}>تجویز کردہ کرایہ</p>
                <div className="fare-text">Rs. {fare}</div>
                <button className="confirm-btn">ابھی سواری تلاش کریں</button>
              </div>
            )}
          </div>
        )}

        {view === 'driver' && (
          <div className="main-card">
             <div style={{borderRight: '5px solid var(--electric-blue)', paddingRight: '20px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                   <span style={{fontSize: '12px', color: '#94a3b8'}}>1.5 کلومیٹر دور</span>
                   <div style={{display:'flex', gap:'2px'}}><Star size={12} fill="#facc15" color="#facc15" /> 4.9</div>
                </div>
                <h2 style={{margin: '10px 0', fontSize: '22px'}}>بحرئیہ ٹاؤن فیز 7، راولپنڈی</h2>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px'}}>
                   <div style={{fontSize: '28px', fontWeight: 'bold', color: 'var(--neon-green)'}}>Rs. 620</div>
                   <button className="nav-btn active" style={{padding: '10px 20px', fontSize: '12px'}}>قبول کریں</button>
                </div>
             </div>
          </div>
        )}

        {view === 'admin' && (
          <div style={{padding: '10px'}}>
            <div className="main-card" style={{marginTop: '10px', display: 'flex', gap: '15px', alignItems: 'center'}}>
              <div style={{background: 'rgba(34,197,94,0.1)', padding: '15px', borderRadius: '15px'}}><CreditCard color="#22c55e" /></div>
              <div><p style={{margin:0, fontSize:'12px', color:'#94a3b8'}}>آج کا کل کمیشن</p><h3 style={{margin:0}}>Rs. 12,450</h3></div>
            </div>
            <div className="main-card" style={{marginTop: '0px', display: 'flex', gap: '15px', alignItems: 'center'}}>
              <div style={{background: 'rgba(59,130,246,0.1)', padding: '15px', borderRadius: '15px'}}><Users color="#3b82f6" /></div>
              <div><p style={{margin:0, fontSize:'12px', color:'#94a3b8'}}>ایکٹو ڈرائیورز</p><h3 style={{margin:0}}>84</h3></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

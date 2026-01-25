import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  Navigation, MapPin, Phone, MessageSquare, AlertCircle, Ticket, CreditCard, 
  User, Trophy, Plane, Menu, Bell, Car, DollarSign, Shield, ArrowLeft, Truck, Map, History
} from 'lucide-react';

export default function GoSmartApp() {
  // --- 1. STATES (تمام حصوں کی اسٹیٹس ایک جگہ) ---
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [appMode, setAppMode] = useState('rider'); // rider or driver
  const [fare, setFare] = useState(0);
  const [offer, setOffer] = useState(0);
  const [selectedFareIndex, setSelectedFareIndex] = useState(null);
  const [isDriverOffline, setIsDriverOffline] = useState(false);
  const [destination, setDestination] = useState("");

  // --- 2. LOGIC (سپلیش اور ایمرجنسی ڈیٹیکشن) ---
  useEffect(() => {
    if (currentScreen === 'splash') {
      setTimeout(() => setCurrentScreen('registration'), 2500);
    }
  }, [currentScreen]);

  // سیمولیٹڈ ڈیڈ مین سوئچ (اگر ڈرائیور موڈ میں ڈیٹا بند ہو)
  useEffect(() => {
    if (appMode === 'driver' && currentScreen === 'active') {
      const timer = setTimeout(() => setIsDriverOffline(true), 10000); // 10 سیکنڈ بعد ٹیسٹ الرٹ
      return () => clearTimeout(timer);
    }
  }, [currentScreen, appMode]);

  // --- 3. STYLES (انڈیگو تھیم) ---
  const globalStyles = (
    <style jsx global>{`
      :root { --indigo: #1a1c2c; --card-bg: #282a44; --accent: #3f51b5; --green: #22c55e; --red: #ef4444; --text-muted: #94a3b8; }
      body { margin: 0; background-color: var(--indigo); color: white; font-family: 'Segoe UI', sans-serif; }
      .mobile-frame { max-width: 450px; margin: 0 auto; min-height: 100vh; position: relative; padding-bottom: 20px; }
      .indigo-card { background: var(--card-bg); border: 1px solid #3f4264; border-radius: 20px; padding: 20px; margin-bottom: 15px; }
      .input-field { background: #212339; border-radius: 12px; padding: 12px; display: flex; align-items: center; gap: 12px; margin-bottom: 12px; border: 1px solid #3f4264; }
      .input-field input, .input-field select { background: none; border: none; color: white; width: 100%; outline: none; }
      .primary-btn { background: var(--accent); color: white; border: none; padding: 16px; border-radius: 15px; width: 100%; font-weight: bold; cursor: pointer; transition: 0.3s; }
      .primary-btn:active { transform: scale(0.98); }
      .blink { animation: pulse 1.5s infinite; }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    `}</style>
  );

  return (
    <div className="mobile-frame">
      <Head><title>GoSmart - Super App</title></Head>
      {globalStyles}

      {/* مرحلہ 1: سپلیش اسکرین */}
      {currentScreen === 'splash' && (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/IMG_20260124_084929.JPG" style={{ width: '120px', borderRadius: '30px' }} className="blink" alt="Logo" />
          <h1 style={{ color: 'var(--green)', marginTop: '20px' }}>GOSMART</h1>
        </div>
      )}

      {/* مرحلہ 2: رجسٹریشن (Security Layer) */}
      {currentScreen === 'registration' && (
        <div style={{ padding: '20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src="/IMG_20260124_084929.JPG" style={{ width: '60px', borderRadius: '12px' }} />
            <h3 style={{ color: 'var(--green)' }}>رجسٹریشن / سیکیورٹی</h3>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button onClick={() => setAppMode('rider')} style={{ flex: 1, padding: '12px', borderRadius: '12px', background: appMode === 'rider' ? 'var(--accent)' : 'var(--card-bg)', color: 'white', border: '1px solid var(--accent)' }}>رائیڈر</button>
            <button onClick={() => setAppMode('driver')} style={{ flex: 1, padding: '12px', borderRadius: '12px', background: appMode === 'driver' ? 'var(--accent)' : 'var(--card-bg)', color: 'white', border: '1px solid var(--accent)' }}>ڈرائیور</button>
          </div>
          {appMode === 'rider' ? (
            <div className="indigo-card">
              <div className="input-field"><User size={18} /><input placeholder="نام (آپشنل)" /></div>
              <div className="input-field"><AlertCircle size={18} color="var(--red)" /><input placeholder="ایمرجنسی نمبر (لازمی)" /></div>
              <button className="primary-btn" onClick={() => setCurrentScreen('home')}>گیسٹ موڈ میں داخل ہوں</button>
            </div>
          ) : (
            <div className="indigo-card">
              <div className="input-field"><Car size={18} /><select><option>بائیک</option><option>رکشہ</option><option>کار</option></select></div>
              <div className="input-field"><Shield size={18} /><input placeholder="CNIC نمبر" /></div>
              <div className="input-field"><MapPin size={18} /><input placeholder="گھر کا پتہ" /></div>
              <button className="primary-btn" onClick={() => setCurrentScreen('home')}>رجسٹر کریں</button>
            </div>
          )}
        </div>
      )}

      {/* مرحلہ 3: ہوم اسکرین (Rider - 4 Fare Logic) */}
      {currentScreen === 'home' && appMode === 'rider' && (
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}><Menu /><img src="/IMG_20260124_084929.JPG" style={{ width: '40px', borderRadius: '8px' }} /><Bell /></div>
          <div className="indigo-card">
            <div className="input-field"><Navigation size={18} color="var(--green)" /><input value="Current Location (Multan)" readOnly /></div>
            <div className="input-field"><MapPin size={18} color="var(--red)" /><input placeholder="منزل لکھیں..." onChange={(e) => {setDestination(e.target.value); if(e.target.value.length > 2) setFare(300);}} /></div>
            {fare > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '15px' }}>
                {[ {l:'سستا', p:fare}, {l:'مناسب', p:fare+50}, {l:'VIP', p:fare+150}, {l:'آفر', p:offer||fare-20} ].map((item, i) => (
                  <div key={i} onClick={()=>{setOffer(item.p); setSelectedFareIndex(i);}} style={{ background: selectedFareIndex === i ? 'var(--accent)' : 'none', border: '1px solid #3f4264', padding: '10px', borderRadius: '12px', textAlign: 'center' }}>
                    <small>{item.l}</small><div>Rs.{item.p}</div>
                  </div>
                ))}
                <button className="primary-btn" style={{ gridColumn: 'span 2', marginTop: '10px' }} onClick={() => setCurrentScreen('active')}>رائیڈ بک کریں</button>
              </div>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div className="indigo-card" style={{ textAlign: 'center' }} onClick={() => setCurrentScreen('tickets')}><Ticket color="var(--green)" /><div>ٹکٹس</div></div>
            <div className="indigo-card" style={{ textAlign: 'center' }} onClick={() => setCurrentScreen('admin')}><History color="var(--accent)" /><div>ایڈمن</div></div>
          </div>
        </div>
      )}

      {/* مرحلہ 4: ایکٹیو رائیڈ (SOS & Dead-man Switch) */}
      {currentScreen === 'active' && (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, background: '#1e2030', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Map size={48} className="blink" />
            {isDriverOffline && <div style={{ position: 'absolute', top: 20, background: 'var(--red)', padding: '10px', borderRadius: '10px' }}>انتباہ: ڈرائیور کا رابطہ ٹوٹ گیا ہے!</div>}
          </div>
          <div className="indigo-card" style={{ margin: 0, borderRadius: '30px 30px 0 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div><h3>عمران علی</h3><p>سفید کرولا (ABC-123)</p></div>
              <div className="blink" style={{ background: 'var(--red)', padding: '15px', borderRadius: '50%' }} onClick={() => alert("SOS Alert Sent!")}><AlertCircle /></div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="primary-btn" style={{ background: 'var(--green)', flex: 1 }}><Phone size={18} /> کال</button>
              <button className="primary-btn" style={{ flex: 1 }} onClick={() => setCurrentScreen('home')}>ختم کریں</button>
            </div>
          </div>
        </div>
      )}

      {/* مرحلہ 5: ٹکٹنگ ہب (Global Links & 1.5% Logic) */}
      {currentScreen === 'tickets' && (
        <div style={{ padding: '20px' }}>
          <h2 onClick={() => setCurrentScreen('home')}><ArrowLeft /> گلوبل ٹکٹس</h2>
          <div className="indigo-card">
            <p style={{ fontSize: '12px', color: 'var(--green)' }}>ہر بکنگ پر 1.5% کمیشن ریوارڈ ملے گا</p>
            <h4 style={{ color: 'var(--text-muted)' }}>کرکٹ بورڈز</h4>
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
              {['PCB', 'PSL', 'BPL', 'BCCI', 'ICC'].map(b => (
                <div key={b} onClick={() => window.open('https://pcb.bookme.pk', '_blank')} style={{ background: 'var(--indigo)', padding: '10px', borderRadius: '10px', minWidth: '80px', textAlign: 'center' }}>{b}</div>
              ))}
            </div>
            <h4 style={{ color: 'var(--text-muted)', marginTop: '20px' }}>ایئر لائنز اور ٹرانسپورٹ</h4>
            {['PIA', 'Emirates', 'Daewoo', 'Flynas'].map(t => (
              <div key={t} onClick={() => window.open('https://www.piac.com.pk', '_blank')} className="input-field" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '10px' }}><Plane size={18} /> {t}</div>
                <small>Book Now</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* مرحلہ 6: ایڈمن پینل */}
      {currentScreen === 'admin' && (
        <div style={{ padding: '20px' }}>
          <h2 onClick={() => setCurrentScreen('home')}><ArrowLeft /> ایڈمن ڈیش بورڈ</h2>
          <div className="indigo-card" style={{ borderLeft: '5px solid var(--green)' }}>
            <small>ٹکٹ سیلز کمیشن (1.5%)</small>
            <h2 style={{ color: 'var(--green)' }}>Rs. 18,450</h2>
          </div>
          <div className="indigo-card">
            <h4>ڈرائیور ویریفیکیشن</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--indigo)', padding: '10px', borderRadius: '10px' }}>
              <span>عامر علی (Bike)</span>
              <button style={{ background: 'var(--green)', border: 'none', color: 'white', borderRadius: '5px', padding: '5px 10px' }}>Approve</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

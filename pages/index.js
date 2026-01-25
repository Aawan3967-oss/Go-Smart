import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  Navigation, MapPin, Phone, MessageSquare, AlertCircle, Ticket, CreditCard, 
  User, Trophy, Plane, Menu, Bell, Car, DollarSign, Shield, ArrowLeft, Truck, Map, History, Search, CheckCircle, X
} from 'lucide-react';

export default function GoSmartApp() {
  // --- [1] تمام اسٹیٹس (STATES) ---
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [appMode, setAppMode] = useState('rider'); 
  const [fare, setFare] = useState(0);
  const [offer, setOffer] = useState(0);
  const [selectedFareIndex, setSelectedFareIndex] = useState(null);
  const [isDriverOffline, setIsDriverOffline] = useState(false);
  const [destination, setDestination] = useState("");
  const [riderName, setRiderName] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [vehicleType, setVehicleType] = useState("bike");

  // --- [2] لاجک اور ایفیکٹس ---
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => setCurrentScreen('registration'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // ڈیڈ مین سوئچ لاجک (لوکیشن/ڈیٹا بند ہونے پر)
  useEffect(() => {
    let interval;
    if (currentScreen === 'active') {
      interval = setInterval(() => {
        // یہاں بیک اینڈ سگنل چیک ہوگا، فی الحال ٹیسٹ کے لیے
        console.log("Security Layer: Monitoring Signal...");
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentScreen]);

  // --- [3] اسٹائل شیٹ (INDIGO THEME) ---
  const globalStyles = (
    <style jsx global>{`
      :root { 
        --indigo: #1a1c2c; --card-bg: #282a44; --accent: #3f51b5; 
        --green: #22c55e; --red: #ef4444; --text-muted: #94a3b8; 
      }
      body { margin: 0; background-color: var(--indigo); color: white; font-family: 'Inter', sans-serif; overflow-x: hidden; }
      .mobile-frame { max-width: 450px; margin: 0 auto; min-height: 100vh; position: relative; padding-bottom: 20px; }
      .indigo-card { background: var(--card-bg); border: 1px solid #3f4264; border-radius: 20px; padding: 20px; margin-bottom: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
      .input-field { background: #212339; border-radius: 12px; padding: 12px; display: flex; align-items: center; gap: 12px; margin-bottom: 12px; border: 1px solid #3f4264; }
      .input-field input, .input-field select { background: none; border: none; color: white; width: 100%; outline: none; font-size: 15px; }
      .primary-btn { background: var(--accent); color: white; border: none; padding: 16px; border-radius: 15px; width: 100%; font-weight: bold; cursor: pointer; transition: 0.3s; }
      .primary-btn:active { transform: scale(0.97); }
      .blink { animation: pulse 1.5s infinite; }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      .scroll-x { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 10px; scrollbar-width: none; }
      .scroll-x::-webkit-scrollbar { display: none; }
    `}</style>
  );

  return (
    <div className="mobile-frame">
      <Head><title>GoSmart - Complete App</title></Head>
      {globalStyles}

      {/* --- [SECTION 1] SPLASH SCREEN --- */}
      {currentScreen === 'splash' && (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/IMG_20260124_084929.JPG" style={{ width: '130px', borderRadius: '35px', boxShadow: '0 0 30px rgba(63, 81, 181, 0.5)' }} className="blink" alt="Logo" />
          <h1 style={{ color: 'var(--green)', marginTop: '25px', letterSpacing: '4px' }}>GOSMART</h1>
          <p style={{ color: 'var(--text-muted)' }}>Safety • Speed • Savings</p>
        </div>
      )}

      {/* --- [SECTION 2] REGISTRATION (Security Logic) --- */}
      {currentScreen === 'registration' && (
        <div style={{ padding: '25px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <img src="/IMG_20260124_084929.JPG" style={{ width: '80px', borderRadius: '20px' }} />
            <h2 style={{ color: 'var(--green)', marginTop: '10px' }}>سیکیورٹی رجسٹریشن</h2>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button onClick={() => setAppMode('rider')} style={{ flex: 1, padding: '15px', borderRadius: '15px', background: appMode === 'rider' ? 'var(--accent)' : 'var(--card-bg)', color: 'white', border: '1px solid var(--accent)' }}>رائیڈر (Rider)</button>
            <button onClick={() => setAppMode('driver')} style={{ flex: 1, padding: '15px', borderRadius: '15px', background: appMode === 'driver' ? 'var(--accent)' : 'var(--card-bg)', color: 'white', border: '1px solid var(--accent)' }}>ڈرائیور (Driver)</button>
          </div>

          {appMode === 'rider' ? (
            <div className="indigo-card">
              <p style={{fontSize:'12px', color:'var(--text-muted)', marginBottom:'15px'}}>رائیڈر کے لیے رجسٹریشن آپشنل ہے، گیسٹ موڈ دستیاب ہے۔</p>
              <div className="input-field"><User size={18} /><input placeholder="آپ کا نام" onChange={(e)=>setRiderName(e.target.value)} /></div>
              <div className="input-field"><Phone size={18} /><input placeholder="فون نمبر" /></div>
              <div className="input-field"><AlertCircle size={18} color="var(--red)" /><input placeholder="ایمرجنسی رابطہ نمبر (لازمی)" onChange={(e)=>setEmergencyContact(e.target.value)} /></div>
              <button className="primary-btn" onClick={() => setCurrentScreen('home')}>گیسٹ موڈ میں داخل ہوں</button>
            </div>
          ) : (
            <div className="indigo-card" style={{maxHeight:'60vh', overflowY:'auto'}}>
              <h4 style={{color:'var(--accent)', marginBottom:'15px'}}>گاڑی کی تفصیلات (لازمی)</h4>
              <div className="input-field">
                <Car size={18} />
                <select onChange={(e)=>setVehicleType(e.target.value)}>
                  <option value="bike">موٹر سائیکل (Bike)</option>
                  <option value="rickshaw">رکشہ (Rickshaw)</option>
                  <option value="car">کار (Car / Mini)</option>
                </select>
              </div>
              <div className="input-field"><Truck size={18} /><input placeholder="گاڑی کا نمبر (LEC-1234)" /></div>
              <h4 style={{color:'var(--accent)', margin:'20px 0 10px'}}>سیکیورٹی کوائف (خفیہ)</h4>
              <div className="input-field"><Shield size={18} /><input placeholder="CNIC نمبر" type="number" /></div>
              <div className="input-field"><MapPin size={18} /><input placeholder="گھر کا مکمل پتہ" /></div>
              <div className="input-field"><AlertCircle size={18} color="var(--red)" /><input placeholder="گھر کا ہنگامی نمبر" /></div>
              <button className="primary-btn" onClick={() => setCurrentScreen('home')}>رجسٹریشن مکمل کریں</button>
            </div>
          )}
        </div>
      )}

      {/* --- [SECTION 3] RIDER HOME (4 Fare Selection) --- */}
      {currentScreen === 'home' && appMode === 'rider' && (
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <Menu size={24} />
            <img src="/IMG_20260124_084929.JPG" style={{ width: '45px', borderRadius: '12px' }} />
            <Bell size={24} />
          </div>

          <div className="indigo-card" style={{border: '1px solid var(--accent)'}}>
            <div className="input-field"><Navigation size={18} color="var(--green)" /><input value="Current Location: Multan" readOnly /></div>
            <div className="input-field"><MapPin size={18} color="var(--red)" /><input placeholder="کہاں جانا ہے؟" onChange={(e) => {setDestination(e.target.value); if(e.target.value.length > 3) setFare(350);}} /></div>
            
            {fare > 0 && (
              <div style={{ marginTop: '20px' }}>
                <p style={{textAlign:'center', fontSize:'13px', color:'var(--text-muted)'}}>بہترین کرایہ منتخب کریں:</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                  {[
                    { label: 'سستا', price: fare, desc: 'عام وقت' },
                    { label: 'مناسب', price: fare + 50, desc: 'جلدی پہنچیں' },
                    { label: 'VIP', price: fare + 150, desc: 'بہترین گاڑی' },
                    { label: 'اپنی آفر', price: offer || fare - 20, desc: 'بولی لگائیں' }
                  ].map((item, index) => (
                    <div key={index} onClick={() => {setOffer(item.price); setSelectedFareIndex(index);}}
                      style={{ background: selectedFareIndex === index ? 'var(--accent)' : 'rgba(255,255,255,0.05)', border: selectedFareIndex === index ? '2px solid var(--green)' : '1px solid #3f4264', padding: '15px', borderRadius: '15px', textAlign: 'center', cursor: 'pointer' }}>
                      <small style={{opacity:0.8}}>{item.label}</small>
                      <h3 style={{ margin: '5px 0' }}>Rs.{item.price}</h3>
                    </div>
                  ))}
                </div>
                <button className="primary-btn" style={{ marginTop: '20px', background: 'var(--green)' }} onClick={() => setCurrentScreen('active')}>رائیڈ کی درخواست بھیجیں</button>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="indigo-card" style={{ textAlign: 'center', cursor:'pointer' }} onClick={() => setCurrentScreen('tickets')}><Ticket size={24} color="var(--green)" /><p style={{margin:'5px 0 0', fontSize:'12px'}}>ٹکٹس</p></div>
            <div className="indigo-card" style={{ textAlign: 'center', cursor:'pointer' }} onClick={() => setCurrentScreen('admin')}><DollarSign size={24} color="var(--accent)" /><p style={{margin:'5px 0 0', fontSize:'12px'}}>ایڈمن پینل</p></div>
          </div>
        </div>
      )}

      {/* --- [SECTION 4] ACTIVE RIDE & EMERGENCY (Dead-Man Switch) --- */}
      {currentScreen === 'active' && (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, background: '#1e2030', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Map size={60} className="blink" color="var(--accent)" />
            {isDriverOffline && (
              <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', background: 'var(--red)', color: 'white', padding: '15px', borderRadius: '15px', textAlign: 'center', zIndex: 100 }}>
                <strong>سیکیورٹی الرٹ:</strong> ڈرائیور کا رابطہ منقطع ہو گیا ہے۔ ایمرجنسی مسڈ کال سسٹم فعال ہے!
              </div>
            )}
            <div onClick={() => setCurrentScreen('home')} style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'var(--card-bg)', padding: '10px', borderRadius: '50%' }}><ArrowLeft /></div>
          </div>

          <div className="indigo-card" style={{ margin: 0, borderRadius: '30px 30px 0 0', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ width: '50px', height: '50px', background: 'var(--accent)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User /></div>
                <div><h3 style={{ margin: 0 }}>عمران علی</h3><p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>سفید کرولا (ABC-123)</p></div>
              </div>
              <div className="blink" style={{ background: 'var(--red)', padding: '15px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => alert("SOS: Emergency Services Notified!")}><AlertCircle color="white" size={24} /></div>
            </div>
            <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
              <button className="primary-btn" style={{ background: 'var(--green)', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Phone size={18} /> کال</button>
              <button className="primary-btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><MessageSquare size={18} /> چیٹ</button>
            </div>
            <p style={{textAlign:'center', fontSize:'11px', color:'var(--text-muted)', marginTop:'20px'}}>سیکیورٹی نوٹ: آپ کا سفر لائیو مانیٹر کیا جا رہا ہے۔</p>
          </div>
        </div>
      )}

      {/* --- [SECTION 5] GLOBAL TICKETS (Cricket & Travel with 1.5% Commission) --- */}
      {currentScreen === 'tickets' && (
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <ArrowLeft onClick={() => setCurrentScreen('home')} style={{cursor:'pointer'}} />
            <h2 style={{ margin: 0, color: 'var(--green)' }}>گلوبل ٹکٹنگ سینٹر</h2>
          </div>

          <div className="indigo-card" style={{border:'1px dashed var(--green)', textAlign:'center', marginBottom:'20px'}}>
            <small style={{color:'var(--green)'}}>آفر: ہر ٹکٹ پر 1.5% کمیشن ریوارڈ پائیں</small>
          </div>

          <h4 style={{ color: 'var(--text-muted)', marginBottom: '15px' }}>کرکٹ بورڈز اور لیگز</h4>
          <div className="scroll-x">
            {[
              { n: 'PCB', u: 'https://pcb.bookme.pk', i: '🇵🇰' },
              { n: 'PSL', u: 'https://www.paltan.pk', i: '🏏' },
              { n: 'BPL', u: 'https://www.shohoz.com', i: '🇧🇩' },
              { n: 'IL T20', u: 'https://tickets.ilt20.ae', i: '🇦🇪' },
              { n: 'BCCI', u: 'https://www.bcci.tv/tickets', i: '🇮🇳' },
              { n: 'ICC', u: 'https://tickets.t20worldcup.com', i: '🏆' }
            ].map((b, i) => (
              <div key={i} onClick={() => window.open(b.u, '_blank')} className="indigo-card" style={{ minWidth: '100px', textAlign: 'center', padding: '15px' }}>
                <div style={{ fontSize: '24px' }}>{b.i}</div>
                <strong style={{fontSize:'12px'}}>{b.n}</strong>
              </div>
            ))}
          </div>

          <h4 style={{ color: 'var(--text-muted)', margin: '20px 0 15px' }}>فلائٹس اور ٹریول</h4>
          {[
            { n: 'PIA (Pakistan)', u: 'https://www.piac.com.pk' },
            { n: 'Emirates (UAE)', u: 'https://www.emirates.com' },
            { n: 'Air Arabia', u: 'https://www.airarabia.com' },
            { n: 'Flynas (KSA)', u: 'https://www.flynas.com' },
            { n: 'Biman Bangladesh', u: 'https://www.biman-airlines.com' },
            { n: 'Daewoo Express', u: 'https://www.daewoo.com.pk' },
            { n: 'Saptco (Saudi Bus)', u: 'https://www.saptco.com.sa' }
          ].map((t, i) => (
            <div key={i} onClick={() => window.open(t.u, '_blank')} className="indigo-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {t.n.includes('Bus') || t.n.includes('Daewoo') ? <Truck size={20} color="var(--green)" /> : <Plane size={20} color="var(--accent)" />}
                <span>{t.n}</span>
              </div>
              <small style={{color:'var(--green)'}}>Book</small>
            </div>
          ))}
        </div>
      )}

      {/* --- [SECTION 6] ADMIN PANEL (Commission & Monitoring) --- */}
      {currentScreen === 'admin' && (
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <ArrowLeft onClick={() => setCurrentScreen('home')} style={{cursor:'pointer'}} />
            <h2 style={{ margin: 0 }}>ایڈمن ڈیش بورڈ</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="indigo-card" style={{ borderLeft: '5px solid var(--green)' }}>
              <small style={{color:'var(--text-muted)'}}>ٹکٹ سیلز</small>
              <h2 style={{margin:'5px 0'}}>Rs.1.4M</h2>
            </div>
            <div className="indigo-card" style={{ borderLeft: '5px solid #fbbf24' }}>
              <small style={{color:'var(--text-muted)'}}>کمیشن (1.5%)</small>
              <h2 style={{margin:'5px 0', color:'#fbbf24'}}>Rs.21K</h2>
            </div>
          </div>

          <div className="indigo-card" style={{marginTop:'20px'}}>
            <h4 style={{marginBottom:'15px'}}>ڈرائیور ویریفیکیشن (Pending)</h4>
            {[
              { n: 'عامر علی', v: 'بائیک', c: 'ملتان' },
              { n: 'ساجد خان', v: 'کار', c: 'لاہور' }
            ].map((d, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><strong>{d.n}</strong><br/><small>{d.v} - {d.c}</small></div>
                <div style={{display:'flex', gap:'5px'}}>
                  <button style={{background:'var(--green)', border:'none', color:'white', padding:'5px 10px', borderRadius:'5px'}}>Approve</button>
                  <button style={{background:'var(--red)', border:'none', color:'white', padding:'5px 10px', borderRadius:'5px'}}>Reject</button>
                </div>
              </div>
            ))}
          </div>

          <div className="indigo-card">
            <h4 style={{marginBottom:'10px'}}>لائیو ٹکٹ ٹریکر</h4>
            <table style={{width:'100%', fontSize:'12px', textAlign:'left'}}>
              <thead><tr style={{color:'var(--text-muted)'}}><th>کمپنی</th><th>رقم</th><th>منافع</th></tr></thead>
              <tbody>
                <tr style={{borderBottom:'1px solid #333'}}><td style={{padding:'8px 0'}}>PCB</td><td>2000</td><td style={{color:'var(--green)'}}>30</td></tr>
                <tr style={{borderBottom:'1px solid #333'}}><td style={{padding:'8px 0'}}>Emirates</td><td>95000</td><td style={{color:'var(--green)'}}>1425</td></tr>
                <tr><td style={{padding:'8px 0'}}>Daewoo</td><td>1800</td><td style={{color:'var(--green)'}}>27</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

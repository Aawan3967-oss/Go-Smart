import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  Navigation, MapPin, Phone, MessageSquare, AlertCircle, Ticket, CreditCard, 
  User, Trophy, Plane, Menu, Bell, Car, DollarSign, Shield, ArrowLeft, Truck, Map, History, X, Globe, Bike, FileText, Activity, Search
} from 'lucide-react';

export default function GoSmartApp() {
  // --- [1] تمام اسٹیٹس (ALL STATES) ---
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [appMode, setAppMode] = useState('rider'); 
  const [fare, setFare] = useState(0);
  const [offer, setOffer] = useState(0);
  const [selectedFareIndex, setSelectedFareIndex] = useState(null);
  const [isDriverOffline, setIsDriverOffline] = useState(false);
  const [destination, setDestination] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState('bike');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [externalUrl, setExternalUrl] = useState(null);

  // --- [2] لاجک اور سیکیورٹی مانیٹرنگ ---
  useEffect(() => {
    if (currentScreen === 'splash') {
      setTimeout(() => setCurrentScreen('registration'), 2500);
    }
  }, [currentScreen]);

  // --- [3] سی ایس ایس (COMPLETE INDIGO THEME) ---
  const globalStyles = (
    <style jsx global>{`
      :root { --indigo: #1a1c2c; --card-bg: #282a44; --accent: #3f51b5; --green: #22c55e; --red: #ef4444; --text-muted: #94a3b8; }
      body { margin: 0; background-color: var(--indigo); color: white; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; overflow-x: hidden; }
      .mobile-frame { max-width: 450px; margin: 0 auto; min-height: 100vh; position: relative; }
      .indigo-card { background: var(--card-bg); border: 1px solid #3f4264; border-radius: 20px; padding: 20px; margin-bottom: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
      .input-field { background: #212339; border-radius: 12px; padding: 12px; display: flex; align-items: center; gap: 12px; margin-bottom: 12px; border: 1px solid #3f4264; }
      .input-field input, .input-field select { background: none; border: none; color: white; width: 100%; outline: none; font-size: 15px; }
      .primary-btn { background: var(--green); color: white; border: none; padding: 16px; border-radius: 15px; width: 100%; font-weight: bold; cursor: pointer; transition: 0.3s; }
      .primary-btn:active { transform: scale(0.97); }
      
      /* نیوز ٹکر */
      .news-ticker { white-space: nowrap; overflow: hidden; background: #212339; padding: 10px 0; border-top: 1px solid var(--accent); border-bottom: 1px solid var(--accent); margin: 15px 0; }
      .news-ticker p { display: inline-block; padding-left: 100%; animation: ticker 25s linear infinite; margin: 0; color: #fbbf24; font-size: 13px; }
      @keyframes ticker { 0% { transform: translate(0, 0); } 100% { transform: translate(-100%, 0); } }

      /* سائیڈ مینو */
      .side-menu { position: fixed; top: 0; left: ${isMenuOpen ? '0' : '-100%'}; width: 85%; height: 100%; background: var(--indigo); z-index: 2000; transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1); padding: 30px; box-shadow: 10px 0 40px rgba(0,0,0,0.8); }
      .menu-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1999; display: ${isMenuOpen ? 'block' : 'none'}; }
      .menu-link { display: flex; align-items: center; gap: 15px; padding: 15px 0; border-bottom: 1px solid #282a44; cursor: pointer; color: white; text-decoration: none; }
      
      .blink { animation: pulse 1.5s infinite; }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    `}</style>
  );

  return (
    <div className="mobile-frame">
      <Head><title>GoSmart - Ultimate App</title></Head>
      {globalStyles}

      {/* --- [A] سائیڈ مینو اور مینیو آپریشنز --- */}
      <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
      <div className="side-menu">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'40px'}}>
           <img src="/IMG_20260124_084929.JPG" style={{width:'60px', borderRadius:'15px'}} />
           <X onClick={() => setIsMenuOpen(false)} style={{cursor:'pointer'}} />
        </div>
        <div className="menu-link" onClick={() => {setExternalUrl('https://www.icc-cricket.com/live-scores'); setIsMenuOpen(false);}}>
           <Activity color="var(--green)" /> <span>ICC لائیو اسکور</span>
        </div>
        <div className="menu-link" onClick={() => {setCurrentScreen('tickets'); setIsMenuOpen(false);}}>
           <Ticket color="var(--accent)" /> <span>گلوبل ٹکٹس</span>
        </div>
        <div className="menu-link" onClick={() => {setCurrentScreen('admin'); setIsMenuOpen(false);}}>
           <DollarSign color="#fbbf24" /> <span>ایڈمن کنٹرول</span>
        </div>
        <div className="menu-link" onClick={() => {setIsMenuOpen(false); alert("شرائط: 1.5% کمیشن لاگو ہوگا۔ تمام رائیڈز سیکیورٹی مانیٹرنگ میں ہیں۔")}}>
           <FileText color="var(--text-muted)" /> <span>ٹرمز اینڈ کنڈیشنز</span>
        </div>
        <div className="menu-link" style={{marginTop:'auto', border:'none'}} onClick={() => setCurrentScreen('registration')}>
           <Shield color="var(--red)" /> <span>سیکیورٹی لاگ آؤٹ</span>
        </div>
      </div>

      {/* --- [B] ان-ایپ براؤزر (Browser Back Option) --- */}
      {externalUrl && (
        <div style={{position:'fixed', top:0, left:0, width:'100%', height:'100%', zIndex:3000, background:'white'}}>
          <div style={{background: 'var(--indigo)', padding:'15px', display:'flex', alignItems:'center', gap:'15px'}}>
            <ArrowLeft onClick={() => setExternalUrl(null)} color="white" style={{cursor:'pointer'}} />
            <span style={{color:'white', fontWeight:'bold'}}>GoSmart Safe Gateway</span>
          </div>
          <iframe src={externalUrl} style={{width:'100%', height:'93%', border:'none'}}></iframe>
        </div>
      )}

      {/* --- [SECTION 1] اسپلش اسکرین --- */}
      {currentScreen === 'splash' && (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/IMG_20260124_084929.JPG" style={{ width: '130px', borderRadius: '35px' }} className="blink" />
          <h1 style={{ color: 'var(--green)', marginTop: '25px', letterSpacing:'4px' }}>GOSMART</h1>
        </div>
      )}

      {/* --- [SECTION 2] رجسٹریشن (سیکیورٹی لوازمات) --- */}
      {currentScreen === 'registration' && (
        <div style={{ padding: '25px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <img src="/IMG_20260124_084929.JPG" style={{ width: '80px', borderRadius: '20px' }} />
            <h2 style={{ color: 'var(--green)', marginTop: '15px' }}>سیکیورٹی رجسٹریشن</h2>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button onClick={() => setAppMode('rider')} style={{ flex: 1, padding: '15px', borderRadius: '15px', background: appMode === 'rider' ? 'var(--accent)' : 'var(--card-bg)', border: '1px solid var(--accent)', color: 'white' }}>رائیڈر</button>
            <button onClick={() => setAppMode('driver')} style={{ flex: 1, padding: '15px', borderRadius: '15px', background: appMode === 'driver' ? 'var(--accent)' : 'var(--card-bg)', border: '1px solid var(--accent)', color: 'white' }}>ڈرائیور</button>
          </div>
          <div className="indigo-card">
            <div className="input-field"><User size={18} /><input placeholder="مکمل نام" /></div>
            {appMode === 'driver' && (
              <>
                <div className="input-field"><Shield size={18} /><input placeholder="CNIC نمبر" /></div>
                <div className="input-field"><Car size={18} /><select><option>موٹر سائیکل</option><option>رکشہ</option><option>کار</option></select></div>
              </>
            )}
            <div className="input-field"><AlertCircle size={18} color="var(--red)" /><input placeholder="ایمرجنسی رابطہ نمبر" /></div>
            <button className="primary-btn" onClick={() => setCurrentScreen('home')}>محفوظ کریں</button>
          </div>
        </div>
      )}

      {/* --- [SECTION 3] ہوم اسکرین (Detailed) --- */}
      {currentScreen === 'home' && (
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Menu onClick={() => setIsMenuOpen(true)} style={{cursor:'pointer'}} />
            <img src="/IMG_20260124_084929.JPG" style={{ width: '45px', borderRadius: '12px' }} />
            <Bell size={24} />
          </div>

          {/* سروسز ایڈورٹائزمنٹ */}
          <div className="indigo-card" style={{background: 'linear-gradient(135deg, #3f51b5, #1a1c2c)', padding:'20px', textAlign:'center', border:'none'}}>
            <h4 style={{margin:0, color:'white'}}>ہماری خدمات</h4>
            <p style={{margin:'8px 0 0', fontSize:'11px', color:'var(--green)', fontWeight:'bold'}}>ٹکٹس • سستی رائیڈز • ICC لائیو اسکور</p>
          </div>

          {/* نیوز ٹکر */}
          <div className="news-ticker">
            <p>تازہ ترین: پاکستان بمقابلہ انڈیا لائیو اسکور کے لیے مینو دیکھیں • دبئی اور سعودی عرب فلائٹس پر رعایت • سیکیورٹی کے لیے اپنی لوکیشن آن رکھیں • GoSmart آپ کا اعتماد...</p>
          </div>

          {/* بکنگ انجن (4-Fare & Vehicle Select) */}
          <div className="indigo-card">
            <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
               {[{id:'bike', n:'بائیک', i:<Bike/>}, {id:'rickshaw', n:'رکشہ', i:<Truck/>}, {id:'car', n:'کار', i:<Car/>}].map(v => (
                 <div key={v.id} onClick={() => setSelectedVehicle(v.id)} style={{flex:1, padding:'12px', borderRadius:'15px', background:selectedVehicle === v.id ? 'var(--accent)' : '#212339', border:'1px solid #3f4264', textAlign:'center', cursor:'pointer'}}>
                    {v.i} <div style={{fontSize:'10px', marginTop:'5px'}}>{v.n}</div>
                 </div>
               ))}
            </div>
            
            <div className="input-field"><Navigation size={18} color="var(--green)" /><input value="Current Location: Multan" readOnly /></div>
            <div className="input-field"><MapPin size={18} color="var(--red)" /><input placeholder="منزل کہاں ہے؟" onChange={(e) => {if(e.target.value.length > 2) setFare(350);}} /></div>

            {fare > 0 && (
              <div style={{marginTop:'15px'}}>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
                  {[{l:'سستا', p:350}, {l:'مناسب', p:400}, {l:'VIP', p:500}, {l:'اپنی آفر', p:330}].map((item, i) => (
                    <div key={i} onClick={() => {setOffer(item.p); setSelectedFareIndex(i);}} style={{padding:'15px', borderRadius:'15px', background:selectedFareIndex === i ? 'var(--accent)' : 'rgba(255,255,255,0.05)', border:'1px solid #444', textAlign:'center', cursor:'pointer'}}>
                       <small>{item.l}</small><h3>Rs.{item.p}</h3>
                    </div>
                  ))}
                </div>
                <button className="primary-btn" style={{marginTop:'20px'}} onClick={() => setCurrentScreen('active')}>رائیڈ کی درخواست بھیجیں</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- [SECTION 4] ٹکٹس ہب (Global Access) --- */}
      {currentScreen === 'tickets' && (
        <div style={{ padding: '20px' }}>
          <div style={{display:'flex', alignItems:'center', gap:'15px', marginBottom:'25px'}}>
             <ArrowLeft onClick={() => setCurrentScreen('home')} style={{cursor:'pointer'}} />
             <h2 style={{margin:0}}>گلوبل ٹکٹنگ</h2>
          </div>
          <div className="indigo-card" onClick={() => setExternalUrl('https://pcb.bookme.pk')} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
             <span>PCB Official (Cricket)</span> <ArrowLeft style={{transform:'rotate(180deg)'}} size={18} />
          </div>
          <div className="indigo-card" onClick={() => setExternalUrl('https://www.emirates.com')}>
             <span>Emirates Airline</span>
          </div>
          <div className="indigo-card" onClick={() => setExternalUrl('https://www.daewoo.com.pk')}>
             <span>Daewoo Express</span>
          </div>
          <p style={{textAlign:'center', fontSize:'11px', color:'var(--green)'}}>ہر بکنگ پر 1.5% کمیشن ریوارڈ پائیں</p>
        </div>
      )}

      {/* --- [SECTION 5] ایڈمن پینل --- */}
      {currentScreen === 'admin' && (
        <div style={{ padding: '20px' }}>
          <h2 onClick={() => setCurrentScreen('home')}><ArrowLeft/> ایڈمن ڈیش بورڈ</h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px', marginTop:'20px'}}>
             <div className="indigo-card" style={{borderLeft:'5px solid var(--green)'}}><small>ٹوٹل سیلز</small><h3>Rs. 1.2M</h3></div>
             <div className="indigo-card" style={{borderLeft:'5px solid #fbbf24'}}><small>کمیشن (1.5%)</small><h3>Rs. 18,000</h3></div>
          </div>
          <div className="indigo-card">
             <h4>ڈرائیور رجسٹریشن ریکوئسٹ</h4>
             <div style={{background:'#1a1c2c', padding:'10px', borderRadius:'10px', display:'flex', justifyContent:'space-between'}}>
                <span>احمد علی (بائیک)</span>
                <CheckCircle color="var(--green)" />
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

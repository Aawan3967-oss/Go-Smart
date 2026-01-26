import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  Navigation, MapPin, Phone, MessageSquare, AlertCircle, Ticket, CreditCard, 
  User, Trophy, Plane, Menu, Bell, Car, DollarSign, Shield, ArrowLeft, Truck, Map, History, X, Globe, Bike, FileText, Activity, Search, CheckCircle, Smartphone
} from 'lucide-react';

export default function GoSmartApp() {
  // --------------------------------------------------------
  // 1. تمام اسٹیٹس (STATES) - ایک ایک فیچر کے لیے الگ اسٹیٹ
  // --------------------------------------------------------
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

  // ایڈمن کنٹرول کی اسٹیٹس
  const [adminData, setAdminData] = useState({
    rideStatus: 'Active',
    emergencyMode: false,
    notification: 'Welcome to GoSmart!'
  });
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  // انسٹال بٹن کی لاجک
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBtn(true);
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowBtn(false);
  };
  
  // سیکیورٹی ڈیٹا اسٹیٹس
  const [driverName, setDriverName] = useState("");
  const [cnic, setCnic] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  // --------------------------------------------------------
  // 2. ٹائمرز اور لاجک (LOGIC)
  // --------------------------------------------------------
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => setCurrentScreen('registration'), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // --------------------------------------------------------
  // 3. ڈیزائن اور تھیم (CSS)
  // --------------------------------------------------------
  const globalStyles = (
    <style jsx global>{`
      :root { 
        --indigo: #1a1c2c; 
        --card-bg: #282a44; 
        --accent: #3f51b5; 
        --green: #22c55e; 
        --red: #ef4444; 
        --text-muted: #94a3b8; 
      }
      body { 
        margin: 0; 
        background-color: var(--indigo); 
        color: white; 
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
        overflow-x: hidden; 
      }
      .mobile-frame { 
        max-width: 450px; 
        margin: 0 auto; 
        min-height: 100vh; 
        position: relative; 
        background-color: var(--indigo);
      }
      .indigo-card { 
        background: var(--card-bg); 
        border: 1px solid #3f4264; 
        border-radius: 20px; 
        padding: 20px; 
        margin-bottom: 15px; 
        transition: all 0.3s ease;
      }
      .input-field { 
        background: #212339; 
        border-radius: 12px; 
        padding: 15px; 
        display: flex; 
        align-items: center; 
        gap: 12px; 
        margin-bottom: 15px; 
        border: 1px solid #3f4264; 
      }
      .input-field input, .input-field select { 
        background: none; 
        border: none; 
        color: white; 
        width: 100%; 
        outline: none; 
        font-size: 16px;
      }
      .primary-btn { 
        background: var(--green); 
        color: white; 
        border: none; 
        padding: 18px; 
        border-radius: 15px; 
        width: 100%; 
        font-weight: bold; 
        font-size: 16px;
        cursor: pointer; 
        box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
      }
      .news-ticker { 
        white-space: nowrap; 
        overflow: hidden; 
        background: #212339; 
        padding: 12px 0; 
        border-top: 2px solid var(--accent); 
        border-bottom: 1px solid #3f4264;
        margin: 15px 0; 
      }
      .news-ticker p { 
        display: inline-block; 
        padding-left: 100%; 
        animation: ticker 30s linear infinite; 
        margin: 0; 
        color: #fbbf24; 
        font-weight: 500;
      }
      @keyframes ticker { 
        0% { transform: translate(0, 0); } 
        100% { transform: translate(-100%, 0); } 
      }
      .side-menu { 
        position: fixed; 
        top: 0; 
        left: ${isMenuOpen ? '0' : '-100%'}; 
        width: 85%; 
        height: 100%; 
        background: var(--indigo); 
        z-index: 2000; 
        transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1); 
        padding: 30px; 
        box-shadow: 15px 0 50px rgba(0,0,0,0.8); 
      }
      .blink { animation: pulse 2s infinite; }
      @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
    `}</style>
  );

  return (
    <div className="mobile-frame">
      <Head>
        <title>GoSmart Super App - Secure Rides & Tickets</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a1c2c" />
        <link rel="apple-touch-icon" href="/IMG_20260124_084929.JPG" />
      </Head>
      {globalStyles}

      {/* --- [A] مینیو اوورلے (Overlay) --- */}
      {isMenuOpen && (
        <div 
          style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:1999}} 
          onClick={()=>setIsMenuOpen(false)}
        ></div>
      )}
      
      {/* --- [B] تفصیلی سائیڈ مینو (Full Operations List) --- */}
      <div className="side-menu">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'40px', borderBottom:'1px solid #3f4264', paddingBottom:'20px'}}>
           <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
             <img src="/IMG_20260124_084929.JPG" style={{width:'50px', borderRadius:'12px'}} />
             <span style={{fontWeight:'bold', color:'var(--green)'}}>GOSMART MENU</span>
           </div>
           <X onClick={()=>setIsMenuOpen(false)} style={{cursor:'pointer'}} />
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
           {/* مینو آئٹمز */}
           <div className="input-field" onClick={()=>{setExternalUrl('https://www.icc-cricket.com/live-scores'); setIsMenuOpen(false)}} style={{cursor:'pointer', border:'none'}}>
              <Activity color="var(--green)" size={20}/> <span>ICC لائیو اسکور</span>
           </div>
           
           <div className="input-field" onClick={()=>{setCurrentScreen('home'); setIsMenuOpen(false)}} style={{cursor:'pointer', border:'none'}}>
              <Smartphone size={20}/> <span>ہوم اسکرین</span>
           </div>

           <div className="input-field" onClick={()=>{setCurrentScreen('tickets'); setIsMenuOpen(false)}} style={{cursor:'pointer', border:'none'}}>
              <Ticket size={20}/> <span>گلوبل ٹکٹس بکنگ</span>
           </div>

    <div className="menu-link" 
     onClick={() => {
         setExternalUrl('https://www.google.com/search?q=cricket+schedule+and+live+score&igu=1');
         setIsMenuOpen(false);
     }}
     style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 10px', cursor: 'pointer' }}>
    <Trophy color="#fbbf24" size={20} />
    <strong style={{ color: 'white' }}>کرکٹ شیڈول اور لائیو میچز</strong>
</div>

<div className="input-field" onClick={() => {setCurrentScreen('admin'); setIsMenuOpen(false);}}>
    <DollarSign color="#fbbf24" size={20} />
    <span>ایڈمن پینل کنٹرول</span>
</div>

<div className="input-field" onClick={() => alert("کمیشن لاگو ہوگا! ڈیٹا محفوظ ہے۔")}>
    <FileText size={20} />
    <span>اصول و ضوابط (T&C)</span>
</div>

<div className="input-field" style={{cursor: 'pointer', border: 'none', marginTop: '20px'}}
     onClick={() => { /* لاگ آؤٹ فنکشن یہاں آئے گا */ }}>
    <Shield color="var(--red)" size={20} />
    <span>ایمرجنسی لاگ آؤٹ</span>
</div>
          
           <div className="input-field" onClick={()=>{setCurrentScreen('admin'); setIsMenuOpen(false)}} style={{cursor:'pointer', border:'none'}}>
              <DollarSign color="#fbbf24" size={20}/> <span>ایڈمن پینل کنٹرول</span>
           </div>

           <div className="input-field" onClick={()=>{alert("سیکیورٹی ٹرمز: آپ کا ڈیٹا محفوظ ہے۔ 1.5% کمیشن لاگو ہوگا۔"); setIsMenuOpen(false)}} style={{cursor:'pointer', border:'none'}}>
              <FileText size={20}/> <span>اصول و ضوابط (T&C)</span>
           </div>

           <div className="input-field" style={{cursor:'pointer', border:'none', marginTop:'20px'}}>
              <Shield color="var(--red)" size={20}/> <span>ایمرجنسی لاگز</span>
           </div>
        </div>
      </div>

      {/* --- [C] ان-ایپ براؤزر مع واپسی کنٹرول --- */}
      {externalUrl && (
        <div style={{position:'fixed', top:0, left:0, width:'100%', height:'100%', zIndex:3000, background:'white'}}>
          <div style={{background: 'var(--indigo)', padding:'15px', display:'flex', alignItems:'center', gap:'20px', borderBottom:'3px solid var(--accent)'}}>
            <ArrowLeft onClick={() => setExternalUrl(null)} color="white" style={{cursor:'pointer'}} />
            <span style={{color:'white', fontWeight:'bold', fontSize:'18px'}}>GoSmart Safe Web</span>
          </div>
          <iframe 
            src={externalUrl} 
            style={{width:'100%', height:'calc(100% - 60px)', border:'none'}}
            title="External Content"
          ></iframe>
        </div>
      )}
{/* --- ایڈمن پینل اسکرین --- */}
      {currentScreen === 'admin' && (
        <div style={{ padding: '20px', color: 'white', background: '#1a1c2c', minHeight: '100vh', direction: 'rtl', position: 'fixed', inset: 0, zIndex: 5000, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '15px' }}>
            <ArrowLeft size={24} onClick={() => {setCurrentScreen('home'); setIsAdminAuthenticated(false);}} style={{ cursor: 'pointer' }} />
            <h2 style={{ fontSize: '1.2rem' }}>ایڈمن کنٹرول سینٹر</h2>
          </div>

          {!isAdminAuthenticated ? (
            <div style={{ background: '#252945', padding: '25px', borderRadius: '15px', textAlign: 'center', marginTop: '20px' }}>
              <Lock size={45} color="#fbbf24" style={{ marginBottom: '15px' }} />
              <h3 style={{ marginBottom: '10px' }}>سیکیورٹی لاک</h3>
              <p style={{ fontSize: '0.9rem', color: '#ccc' }}>ایڈمن پینل تک رسائی کے لیے پاس ورڈ درج کریں</p>
              <input 
                type="password" 
                placeholder="پاس ورڈ درج کریں" 
                onChange={(e) => setAdminPassword(e.target.value)}
                style={{ width: '100%', padding: '12px', margin: '20px 0', borderRadius: '10px', border: '1px solid #444', background: '#1a1c2c', color: 'white', textAlign: 'center' }} 
              />
              <button 
                onClick={() => adminPassword === '1234' ? setIsAdminAuthenticated(true) : alert('غلط پاس ورڈ! دوبارہ کوشش کریں۔')}
                style={{ width: '100%', background: '#fbbf24', color: 'black', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                لاگ ان کریں
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#252945', padding: '20px', borderRadius: '15px', border: '1px solid #3d426a' }}>
                <p style={{ marginBottom: '12px', fontSize: '1rem' }}>سروس کی موجودہ حالت: <strong style={{ color: adminData.rideStatus === 'Active' ? '#22c55e' : '#fbbf24' }}>{adminData.rideStatus}</strong></p>
                <button onClick={() => setAdminData({...adminData, rideStatus: adminData.rideStatus === 'Active' ? 'Maintenance' : 'Active'})} 
                        style={{ background: '#444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  اسٹیٹس تبدیل کریں
                </button>
              </div>
              
              <div style={{ background: '#252945', padding: '20px', borderRadius: '15px', border: '1px solid #3d426a' }}>
                <p style={{ marginBottom: '12px', fontSize: '1rem' }}>ایمرجنسی الرٹ سسٹم: <strong style={{ color: adminData.emergencyMode ? '#ef4444' : '#22c55e' }}>{adminData.emergencyMode ? 'آن ہے' : 'آف ہے'}</strong></p>
                <button onClick={() => setAdminData({...adminData, emergencyMode: !adminData.emergencyMode})} 
                        style={{ width: '100%', background: adminData.emergencyMode ? '#ef4444' : '#22c55e', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {adminData.emergencyMode ? 'ایمرجنسی الرٹ بند کریں' : 'ایمرجنسی الرٹ جاری کریں'}
                </button>
              </div>

              <button onClick={() => setIsAdminAuthenticated(false)} 
                      style={{ marginTop: '20px', background: 'transparent', color: '#aaa', border: '1px solid #444', padding: '10px', borderRadius: '8px' }}>
                پینل لاک کریں
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- [SECTION 1] تفصیلی اسپلش اسکرین --- */}
      {currentScreen === 'splash' && (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background:'var(--indigo)' }}>
          <img src="/IMG_20260124_084929.JPG" className="blink" style={{ width: '150px', borderRadius: '40px', boxShadow:'0 0 50px rgba(63, 81, 181, 0.4)' }} />
          <h1 style={{ color: 'var(--green)', marginTop: '30px', letterSpacing:'5px', fontSize:'32px' }}>GOSMART</h1>
          <div style={{marginTop:'20px', color:'var(--text-muted)'}}>Loading Secure Modules...</div>
        </div>
      )}

      {/* --- [SECTION 2] تفصیلی رجسٹریشن (Security Requirements) --- */}
      {currentScreen === 'registration' && (
        <div style={{ padding: '30px 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <img src="/IMG_20260124_084929.JPG" style={{ width: '100px', borderRadius: '25px' }} />
            <h2 style={{ color: 'var(--green)', marginTop: '20px' }}>سیکیورٹی ویریفیکیشن</h2>
            <p style={{color:'var(--text-muted)', fontSize:'14px'}}>اپنا اکاؤنٹ منتخب کریں تاکہ ہم آپ کو تحفظ دے سکیں</p>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
            <button 
              onClick={()=>setAppMode('rider')} 
              style={{ flex: 1, padding: '18px', borderRadius: '15px', background: appMode==='rider'?'var(--accent)':'var(--card-bg)', border: '2px solid var(--accent)', color: 'white', fontWeight:'bold' }}
            >رائیڈر (Rider)</button>
            <button 
              onClick={()=>setAppMode('driver')} 
              style={{ flex: 1, padding: '18px', borderRadius: '15px', background: appMode==='driver'?'var(--accent)':'var(--card-bg)', border: '2px solid var(--accent)', color: 'white', fontWeight:'bold' }}
            >ڈرائیور (Driver)</button>
          </div>

          <div className="indigo-card">
            <h4 style={{marginBottom:'20px', color:'var(--accent)'}}>بنیادی معلومات</h4>
            <div className="input-field"><User size={20}/><input placeholder="آپ کا مکمل قانونی نام" onChange={(e)=>setDriverName(e.target.value)} /></div>
            
            {appMode === 'driver' && (
              <div style={{marginTop:'20px'}}>
                <h4 style={{marginBottom:'20px', color:'var(--accent)'}}>گاڑی اور سیکیورٹی کوائف</h4>
                <div className="input-field"><Shield size={20}/><input placeholder="شناختی کارڈ (CNIC) نمبر" onChange={(e)=>setCnic(e.target.value)} /></div>
                <div className="input-field"><Car size={20}/><select onChange={(e)=>setSelectedVehicle(e.target.value)}><option value="bike">موٹر سائیکل</option><option value="rickshaw">رکشہ</option><option value="car">کار (Mini/AC)</option></select></div>
                <div className="input-field"><Truck size={20}/><input placeholder="گاڑی کا نمبر (مثلاً LEC-2026)" onChange={(e)=>setVehicleNo(e.target.value)} /></div>
                <div className="input-field"><MapPin size={20}/><input placeholder="گھر کا مکمل پتہ" onChange={(e)=>setHomeAddress(e.target.value)} /></div>
              </div>
            )}
            
            <div className="input-field"><AlertCircle size={20} color="var(--red)"/><input placeholder="ہنگامی رابطہ نمبر (SOS)" onChange={(e)=>setEmergencyPhone(e.target.value)} /></div>
            
            <div style={{fontSize:'12px', color:'var(--text-muted)', marginBottom:'20px', padding:'0 5px'}}>
              * بٹن دبانے سے آپ ہماری سیکیورٹی پالیسی اور 1.5% کمیشن فیس سے اتفاق کرتے ہیں۔
            </div>

            <button className="primary-btn" onClick={()=>setCurrentScreen('home')}>رجسٹریشن مکمل کریں</button>
          </div>
        </div>
      )}

      {/* --- [SECTION 3] تفصیلی ہوم اسکرین (Rider Mode) --- */}
      {currentScreen === 'home' && (
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <Menu onClick={()=>setIsMenuOpen(true)} style={{cursor:'pointer'}} size={28} />
            <img src="/IMG_20260124_084929.JPG" style={{ width: '50px', borderRadius: '12px', boxShadow:'0 4px 10px rgba(0,0,0,0.3)' }} />
            <div style={{position:'relative'}}>
               <Bell size={28} />
               <span style={{position:'absolute', top:0, right:0, background:'var(--red)', width:'10px', height:'10px', borderRadius:'50%'}}></span>
            </div>
          </div>

{showBtn && (
  <div onClick={handleInstallClick} style={{ 
    cursor:'pointer', 
    background:'rgba(34,197,94,0.1)', 
    border:'1px dashed var(--green)', 
    borderRadius:'15px', 
    padding:'15px', 
    margin:'20px', 
    display:'flex', 
    alignItems:'center', 
    gap:'12px',
    animation: 'pulse 2s infinite'
  }}>
     <img src="/IMG_20260124_084929.JPG" style={{width:'40px', borderRadius:'10px'}} />
     <div>
        <div style={{fontSize:'14px', color:'white', fontWeight:'bold'}}>GoSmart ایپ انسٹال کریں</div>
        <div style={{fontSize:'10px', color:'var(--green)'}}>بہترین رائیڈنگ تجربے کے لیے</div>
     </div>
  </div>
)}

          {/* سروسز اشتہارات (Interactive Ads) */}
          <div className="indigo-card" style={{background:'linear-gradient(135deg, #3f51b5 0%, #1a1c2c 100%)', border:'none', padding:'25px'}}>
             <h3 style={{margin:0, color:'white', fontSize:'20px'}}>GoSmart پریمیم سروسز</h3>
             <p style={{fontSize:'12px', margin:'10px 0', color:'rgba(255,255,255,0.8)'}}>پاکستان کی پہلی سیکیور رائیڈ ایپ جہاں آپ کے سفر کے ساتھ آپ کی بچت بھی محفوظ ہے۔</p>
             <div style={{display:'flex', gap:'10px', marginTop:'15px'}}>
                <span style={{background:'rgba(255,255,255,0.1)', padding:'5px 10px', borderRadius:'8px', fontSize:'10px'}}>✓ سستی فلائٹس</span>
                <span style={{background:'rgba(255,255,255,0.1)', padding:'5px 10px', borderRadius:'8px', fontSize:'10px'}}>✓ لائیو اسکورز</span>
             </div>
          </div>

          {/* متحرک نیوز ٹکر */}
          <div className="news-ticker">
            <p>
               تازہ ترین اپڈیٹ: ICC چیمپئنز ٹرافی 2026 کے تمام میچز کے لائیو اسکورز اب GoSmart مینو میں دستیاب ہیں! • 
               پی سی بی ٹکٹس کی بکنگ پر حاصل کریں 1.5% کیش بیک • 
               سیکیورٹی الرٹ: سفر کے دوران اپنی لوکیشن ہمیشہ آن رکھیں • 
               نئے ڈرائیورز کے لیے رجسٹریشن بالکل مفت ہے...
            </p>
          </div>

          {/* بکنگ انجن (Detailed Selection) */}
          <div className="indigo-card" style={{borderTop:'4px solid var(--green)'}}>
            <h4 style={{marginBottom:'20px', display:'flex', alignItems:'center', gap:'10px'}}>
               <Navigation size={18} color="var(--green)"/> سواری کا انتخاب کریں
            </h4>
            
            <div style={{display:'flex', gap:'10px', marginBottom:'25px'}}>
               {[
                 {id:'bike', icon:<Bike size={24}/>, label:'بائیک'},
                 {id:'rickshaw', icon:<Truck size={24}/>, label:'رکشہ'},
                 {id:'car', icon:<Car size={24}/>, label:'کار'}
               ].map(vehicle => (
                 <div 
                   key={vehicle.id} 
                   onClick={()=>setSelectedVehicle(vehicle.id)} 
                   style={{
                     flex:1, padding:'15px 10px', borderRadius:'18px', 
                     background:selectedVehicle===vehicle.id?'var(--accent)':'#212339', 
                     textAlign:'center', border:selectedVehicle===vehicle.id?'2px solid var(--green)':'1px solid #3f4264',
                     cursor:'pointer', transition:'0.3s'
                   }}
                 >
                    {vehicle.icon}
                    <div style={{fontSize:'11px', marginTop:'8px', fontWeight:'bold'}}>{vehicle.label}</div>
                 </div>
               ))}
            </div>
            
            <div className="input-field">
              <MapPin size={20} color="var(--green)" />
              <input value="آپ کی موجودہ جگہ: Multan, Pakistan" readOnly />
            </div>
            
            <div className="input-field" style={{marginTop:'15px'}}>
              <Search size={20} color="var(--red)" />
              <input 
                placeholder="منزل کا نام لکھیں (Destination)..." 
                onChange={(e) => {
                  setDestination(e.target.value);
                  if(e.target.value.length > 3) setFare(450);
                }} 
              />
            </div>

            {/* 4-کرایہ لاجک (Detailed) */}
            {fare > 0 && (
              <div style={{marginTop:'25px', animation:'fadeIn 0.5s'}}>
                <p style={{fontSize:'13px', color:'var(--text-muted)', textAlign:'center', marginBottom:'15px'}}>بہترین کرایہ منتخب کریں:</p>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
                  {[
                    {title:'سستا ترین', price:fare, info:'بچت کارڈ'},
                    {title:'مناسب', price:fare + 60, info:'جلدی آمد'},
                    {title:'V.I.P', price:fare + 180, info:'لگژری'},
                    {title:'بولی (Bid)', price:offer || fare - 30, info:'آپ کی مرضی'}
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      onClick={()=>{setOffer(item.price); setSelectedFareIndex(index);}}
                      style={{
                        padding:'18px 10px', borderRadius:'15px', 
                        background:selectedFareIndex===index?'var(--accent)':'rgba(255,255,255,0.03)',
                        border:selectedFareIndex===index?'2px solid var(--green)':'1px solid #3f4264',
                        textAlign:'center', cursor:'pointer'
                      }}
                    >
                       <div style={{fontSize:'10px', opacity:0.7}}>{item.title}</div>
                       <h3 style={{margin:'5px 0'}}>Rs. {item.price}</h3>
                       <div style={{fontSize:'9px', color:'var(--green)'}}>{item.info}</div>
                    </div>
                  ))}
                </div>
                <button className="primary-btn" style={{marginTop:'25px'}} onClick={()=>setCurrentScreen('active')}>
                   رائیڈ کی درخواست بھیجیں
                </button>
              </div>
            )}
          </div>
          
          {/* کوئک لنکس (Bottom Grid) */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px', marginTop:'10px'}}>
             <div className="indigo-card" style={{textAlign:'center', padding:'25px'}} onClick={()=>setCurrentScreen('tickets')}>
                <Ticket color="var(--green)" size={32} />
                <h4 style={{margin:'10px 0 0'}}>ٹکٹس</h4>
             </div>
             <div className="indigo-card" style={{textAlign:'center', padding:'25px'}} onClick={()=>setExternalUrl('https://pcb.bookme.pk')}>
                <Trophy color="#fbbf24" size={32} />
                <h4 style={{margin:'10px 0 0'}}>PCB لائیو</h4>
             </div>
          </div>
        </div>
      )}

      {/* --- [SECTION 4] تفصیلی گلوبل ٹکٹنگ (Full List) --- */}
      {currentScreen === 'tickets' && (
        <div style={{ padding: '25px' }}>
          <div style={{display:'flex', alignItems:'center', gap:'15px', marginBottom:'30px'}}>
             <ArrowLeft onClick={()=>setCurrentScreen('home')} style={{cursor:'pointer'}} />
             <h2 style={{margin:0, color:'var(--green)'}}>گلوبل ٹکٹ پورٹل</h2>
          </div>

          <div className="indigo-card" style={{border:'1px dashed var(--green)', textAlign:'center', background:'rgba(34,197,94,0.05)'}}>
             <small style={{color:'var(--green)', fontWeight:'bold'}}>مبارک ہو! ہر بکنگ پر 1.5% ایڈمن کمیشن ریوارڈ آپ کے اکاؤنٹ میں شامل ہوگا</small>
          </div>

          {/* کرکٹ بورڈز لسٹ */}
          <h4 style={{color:'var(--text-muted)', marginBottom:'15px', marginTop:'20px'}}>کرکٹ بورڈز اور ایونٹس</h4>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
             {[
               {name:'PCB (Pakistan)', url:'https://pcb.bookme.pk'},
               {name:'PSL 2026', url:'https://www.paltan.pk'},
               {name:'BPL (Bangladesh)', url:'https://www.shohoz.com'},
               {name:'ICC Champions', url:'https://tickets.t20worldcup.com'},
               {name:'IL T20 (UAE)', url:'https://tickets.ilt20.ae'},
               {name:'BCCI (India)', url:'https://www.bcci.tv/tickets'}
             ].map((board, i) => (
               <div key={i} className="indigo-card" style={{margin:0, padding:'15px', textAlign:'center'}} onClick={()=>setExternalUrl(board.url)}>
                  <Trophy size={20} color="#fbbf24" style={{marginBottom:'8px'}} />
                  <div style={{fontSize:'11px', fontWeight:'bold'}}>{board.name}</div>
               </div>
             ))}
          </div>

          {/* ٹریول اور ایئر لائنز لسٹ */}
          <h4 style={{color:'var(--text-muted)', margin:'30px 0 15px'}}>ایئر لائنز اور ٹرانسپورٹ</h4>
          {[
            {name:'PIA - Pakistan International', url:'https://www.piac.com.pk'},
            {name:'Emirates - UAE Luxury', url:'https://www.emirates.com'},
            {name:'Air Arabia - Low Cost', url:'https://www.airarabia.com'},
            {name:'Flynas - Saudi Arabia', url:'https://www.flynas.com'},
            {name:'Biman - Bangladesh', url:'https://www.biman-airlines.com'},
            {name:'Daewoo Express Bus', url:'https://www.daewoo.com.pk'},
            {name:'Saptco - Saudi Transport', url:'https://www.saptco.com.sa'}
          ].map((travel, i) => (
            <div key={i} className="indigo-card" style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px'}} onClick={()=>setExternalUrl(travel.url)}>
               <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
                  {travel.name.includes('Bus') ? <Truck size={20} color="var(--green)"/> : <Plane size={20} color="var(--accent)"/>}
                  <span style={{fontSize:'14px'}}>{travel.name}</span>
               </div>
               <ArrowLeft style={{transform:'rotate(180deg)'}} size={16} color="var(--text-muted)"/>
            </div>
          ))}
        </div>
      )}

      {/* --- [SECTION 5] تفصیلی ایڈمن پینل (Commission Control) --- */}
      {currentScreen === 'admin' && (
        <div style={{ padding: '25px' }}>
          <div style={{display:'flex', alignItems:'center', gap:'15px', marginBottom:'30px'}}>
             <ArrowLeft onClick={()=>setCurrentScreen('home')} style={{cursor:'pointer'}} />
             <h2 style={{margin:0}}>ایڈمن کنٹرول ٹاور</h2>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px'}}>
             <div className="indigo-card" style={{borderLeft:'5px solid var(--green)', margin:0}}>
                <small style={{color:'var(--text-muted)'}}>کل سیلز (Gross)</small>
                <h2 style={{margin:'10px 0', fontSize:'24px'}}>Rs. 1.25M</h2>
             </div>
             <div className="indigo-card" style={{borderLeft:'5px solid #fbbf24', margin:0}}>
                <small style={{color:'var(--text-muted)'}}>کمیشن (1.5%)</small>
                <h2 style={{margin:'10px 0', color:'#fbbf24', fontSize:'24px'}}>Rs. 18,750</h2>
             </div>
          </div>

          <div className="indigo-card" style={{marginTop:'25px'}}>
             <h4 style={{marginBottom:'20px'}}>ڈرائیور ویریفیکیشن لسٹ</h4>
             {[
               {name:'احمد علی', vehicle:'بائیک', status:'Pending'},
               {name:'محمد ساجد', vehicle:'کار', status:'Review'}
             ].map((d, i) => (
               <div key={i} style={{background:'#1a1c2c', padding:'15px', borderRadius:'15px', marginBottom:'10px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:'bold'}}>{d.name}</div>
                    <small style={{color:'var(--text-muted)'}}>{d.vehicle}</small>
                  </div>
                  <div style={{display:'flex', gap:'8px'}}>
                     <button style={{background:'var(--green)', border:'none', color:'white', padding:'8px 12px', borderRadius:'8px', fontSize:'11px'}}>Approve</button>
                     <button style={{background:'var(--red)', border:'none', color:'white', padding:'8px 12px', borderRadius:'8px', fontSize:'11px'}}>Reject</button>
                  </div>
               </div>
             ))}
          </div>

          <div className="indigo-card">
             <h4>لائیو ٹکٹنگ ٹرانزیکشنز</h4>
             <div style={{fontSize:'12px', overflowX:'auto'}}>
                <table style={{width:'100%', borderCollapse:'collapse'}}>
                   <thead>
                      <tr style={{color:'var(--text-muted)', textAlign:'left', borderBottom:'1px solid #3f4264'}}>
                         <th style={{padding:'10px'}}>سورس</th>
                         <th style={{padding:'10px'}}>رقم</th>
                         <th style={{padding:'10px'}}>منافع</th>
                      </tr>
                   </thead>
                   <tbody>
                      <tr style={{borderBottom:'1px solid #212339'}}>
                         <td style={{padding:'10px'}}>PIA Tickets</td>
                         <td style={{padding:'10px'}}>Rs. 85,000</td>
                         <td style={{padding:'10px', color:'var(--green)'}}>Rs. 1,275</td>
                      </tr>
                      <tr>
                         <td style={{padding:'10px'}}>PCB (Cricket)</td>
                         <td style={{padding:'10px'}}>Rs. 2,000</td>
                         <td style={{padding:'10px', color:'var(--green)'}}>Rs. 30</td>
                      </tr>
                   </tbody>
                </table>
             </div>
          </div>
        </div>
      )}

      {/* --- [SECTION 6] ایکٹیو رائیڈ (SOS & Monitor) --- */}
      {currentScreen === 'active' && (
        <div style={{height:'100vh', display:'flex', flexDirection:'column'}}>
           <div style={{flex:1, background:'#1e2030', display:'flex', alignItems:'center', justifyContent:'center', position:'relative'}}>
              <Map size={80} color="var(--accent)" className="blink" />
              <div style={{position:'absolute', bottom:'20px', left:'20px', background:'var(--card-bg)', padding:'10px', borderRadius:'10px', fontSize:'12px'}}>
                 Live Security Monitoring: Active
              </div>
           </div>
           <div className="indigo-card" style={{margin:0, borderRadius:'30px 30px 0 0', padding:'30px'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                 <div>
                    <h3 style={{margin:0}}>ڈرائیور: علی رضا</h3>
                    <p style={{margin:'5px 0', fontSize:'12px', color:'var(--text-muted)'}}>گاڑی نمبر: LEC-2026</p>
                 </div>
                 <div 
                   className="blink" 
                   style={{background:'var(--red)', padding:'15px', borderRadius:'50%', cursor:'pointer'}}
                   onClick={()=>alert("SOS الرٹ: ایمرجنسی سروسز کو اطلاع دے دی گئی ہے!")}
                 >
                    <AlertCircle size={30} />
                 </div>
              </div>
              <button className="primary-btn" style={{marginTop:'30px', background:'var(--red)'}} onClick={()=>setCurrentScreen('home')}>رائیڈ ختم کریں</button>
           </div>
        </div>
      )}
    </div>
  );
}

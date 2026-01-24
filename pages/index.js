import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Bike, Car, Bus, Info, ShieldCheck, CreditCard, Zap, Moon, 
  Tag, Star, Clock, Navigation, Shield, PhoneCall, Bell, Settings, 
  History, Wallet, User, Menu, X, CheckCircle, LogIn, DollarSign, 
  Plane, Train, Ticket, Monitor, Trophy, Search, Plus, Minus, ExternalLink, 
  AlertTriangle, Smartphone, Globe
} from 'lucide-react';

export default function GoSmartApp() {
  // --- States ---
  const [activeTab, setActiveTab] = useState('home'); 
  const [userRole, setUserRole] = useState(null); // 'rider' or 'driver'
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [portalUrl, setPortalUrl] = useState(null);
  
  // --- ڈرائیور ڈیٹا ---
  const [driverData, setDriverData] = useState({
    name: '', phone: '', cnic: '', vehicleType: 'car', vehicleNo: '', address: '', emergencyNo: ''
  });

  // --- ٹکٹنگ پارٹنرز (براہ راست لنکس) ---
  const partners = {
    cricket: [
      { name: 'Pakistan Cricket (PCB)', url: 'https://pcb.bookme.pk', icon: <Trophy color="#22c55e"/> },
      { name: 'Australia Cricket (CA)', url: 'https://www.cricket.com.au/tickets', icon: <Trophy color="#facc15"/> },
      { name: 'England Cricket (ECB)', url: 'https://www.ecb.co.uk/tickets', icon: <Trophy color="#ef4444"/> },
      { name: 'Sri Lanka Cricket (SLC)', url: 'https://srilankacricket.lk/tickets', icon: <Trophy color="#3b82f6"/> },
      { name: 'Bangladesh Cricket (BCB)', url: 'http://www.tigercricket.com.bd', icon: <Trophy color="#059669"/> }
    ],
    travel: [
      { name: 'Pakistan Railway', url: 'https://www.pakrail.gov.pk', icon: <Train color="#16a34a"/> },
      { name: 'PIA', url: 'https://www.piac.com.pk', icon: <Plane color="#065f46"/> },
      { name: 'AirSial', url: 'https://www.airsial.com', icon: <Plane color="#1e3a8a"/> },
      { name: 'Daewoo Express', url: 'https://daewoo.com.pk', icon: <Bus color="#ef4444"/> }
    ]
  };

  // --- رجسٹریشن لاجک ---
  const handleDriverReg = (e) => {
    e.preventDefault();
    setIsRegistered(true);
    setShowRegModal(false);
  };

  return (
    <div dir="rtl" style={{ backgroundColor: '#1a1c2c', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <Head>
        <title>GoSmart - Indigo Edition</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style jsx global>{`
        body { margin: 0; background: #1a1c2c; }
        .indigo-card { background: #282a44; border: 1px solid #3f4264; border-radius: 20px; padding: 20px; }
        .btn-indigo { background: #3f51b5; color: white; border: none; padding: 15px; border-radius: 12px; width: 100%; font-weight: bold; cursor: pointer; }
        .partner-btn { display: flex; align-items: center; justify-content: space-between; background: #212339; border: 1px solid #3f4264; padding: 15px; border-radius: 15px; margin-bottom: 10px; cursor: pointer; }
        .portal-overlay { position: fixed; inset: 0; background: #1a1c2c; z-index: 5000; }
        .emergency-blink { animation: blink 1s infinite; color: #ef4444; }
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
      `}</style>

      {/* --- Smart Portal Frame (آپ کا تھیم اور لوگو برقرار رہے گا) --- */}
      {portalUrl && (
        <div className="portal-overlay">
          <div style={{ padding: '15px', background: '#3f51b5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <img src="/IMG_20260124_084929.JPG" style={{ width: '35px', borderRadius: '5px' }} />
               <span style={{ fontWeight: 'bold' }}>GoSmart Secure Ticket</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ fontSize: '10px', background: 'white', color: '#3f51b5', padding: '2px 8px', borderRadius: '10px' }}>1.5% Fee Included</span>
              <X onClick={() => setPortalUrl(null)} size={24} />
            </div>
          </div>
          <iframe src={portalUrl} style={{ width: '100%', height: 'calc(100% - 65px)', border: 'none' }} />
        </div>
      )}

      {/* --- ہیڈر --- */}
      <nav style={{ padding: '15px 20px', background: '#212339', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #3f4264' }}>
        <Menu size={24} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/IMG_20260124_084929.JPG" alt="GoSmart" style={{ width: '45px', height: '45px', borderRadius: '12px' }} />
          <h2 style={{ margin: 0, color: 'white', fontSize: '20px' }}>GoSmart</h2>
        </div>
        <div style={{ position: 'relative' }}>
          <Bell size={24} />
          <div className="emergency-blink" style={{ position: 'absolute', top: 0, right: 0 }}><AlertTriangle size={10} /></div>
        </div>
      </nav>

      {/* --- رجسٹریشن چیک (صرف ڈرائیور کے لیے لازمی) --- */}
      {!isRegistered && userRole === 'driver' && (
        <div style={{ position: 'fixed', inset: 0, background: '#1a1c2c', zIndex: 1000, padding: '20px', overflowY: 'auto' }}>
          <div className="indigo-card">
            <h2 style={{ textAlign: 'center' }}>ڈرائیور رجسٹریشن</h2>
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>ایپ استعمال کرنے کے لیے رجسٹریشن لازمی ہے</p>
            <form onSubmit={handleDriverReg}>
              <input placeholder="مکمل نام" required style={{ width: '100%', padding: '15px', background: '#212339', border: '1px solid #3f4264', color: 'white', borderRadius: '10px', marginBottom: '10px' }} />
              <input placeholder="CNIC نمبر" required style={{ width: '100%', padding: '15px', background: '#212339', border: '1px solid #3f4264', color: 'white', borderRadius: '10px', marginBottom: '10px' }} />
              <select style={{ width: '100%', padding: '15px', background: '#212339', border: '1px solid #3f4264', color: 'white', borderRadius: '10px', marginBottom: '10px' }}>
                <option>موٹر سائیکل</option>
                <option>رکشہ</option>
                <option>کار</option>
              </select>
              <input placeholder="گاڑی کا نمبر" required style={{ width: '100%', padding: '15px', background: '#212339', border: '1px solid #3f4264', color: 'white', borderRadius: '10px', marginBottom: '10px' }} />
              <input placeholder="ایمرجنسی نمبر (گھر کا)" required onChange={(e) => setDriverData({...driverData, emergencyNo: e.target.value})} style={{ width: '100%', padding: '15px', background: '#212339', border: '1px solid #3f4264', color: 'white', borderRadius: '10px', marginBottom: '20px' }} />
              <button type="submit" className="btn-indigo">رجسٹریشن مکمل کریں</button>
            </form>
          </div>
        </div>
      )}

      {/* --- رول سوئچر --- */}
      {!userRole && (
        <div style={{ padding: '50px 20px', textAlign: 'center' }}>
          <img src="/IMG_20260124_084929.JPG" style={{ width: '100px', borderRadius: '20px', marginBottom: '30px' }} />
          <h1>خوش آمدید</h1>
          <button className="btn-indigo" onClick={() => setUserRole('rider')} style={{ marginBottom: '15px' }}>میں سوار ہوں (Rider)</button>
          <button className="btn-indigo" style={{ background: '#282a44' }} onClick={() => setUserRole('driver')}>میں ڈرائیور ہوں (Driver)</button>
        </div>
      )}

      {userRole && (
        <main style={{ padding: '20px', paddingBottom: '100px' }}>
          {activeTab === 'home' && (
            <div className="indigo-card">
              <h3>{userRole === 'rider' ? 'سواری تلاش کریں' : 'آن لائن ڈیوٹی'}</h3>
              <div style={{ background: '#212339', padding: '15px', borderRadius: '12px', marginBottom: '10px' }}>
                <Navigation size={18} color="#3f51b5" /> <span>ملتان، پاکستان (Live)</span>
              </div>
              {userRole === 'rider' && (
                <div style={{ background: '#212339', padding: '15px', borderRadius: '12px', border: '1px solid #3f4264' }}>
                  <MapPin size={18} color="#ef4444" />
                  <input placeholder="منزل لکھیں..." style={{ background: 'none', border: 'none', color: 'white', marginRight: '10px', width: '70%' }} />
                </div>
              )}
              {userRole === 'driver' && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Zap size={40} color="#22c55e" />
                  <p>آپ لائیو ہیں اور رائیڈرز آپ کو دیکھ سکتے ہیں</p>
                  <small style={{ color: '#ef4444' }}>⚠️ فون بند ہونے پر {driverData.emergencyNo} پر الرٹ جائے گا</small>
                </div>
              )}
            </div>
          )}

          {activeTab === 'portal' && (
            <div>
              <div className="indigo-card" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0 }}>ٹکٹنگ پورٹل</h3>
                <small>1.5% ٹیکنالوجی فیس ادائیگی کے وقت شامل ہوگی</small>
              </div>

              <h4>کرکٹ بورڈز (ٹکٹس)</h4>
              {partners.cricket.map((p, i) => (
                <div key={i} className="partner-btn" onClick={() => setPortalUrl(p.url)}>
                  <div style={{ display: 'flex', gap: '12px' }}>{p.icon} <b>{p.name}</b></div>
                  <ExternalLink size={16} />
                </div>
              ))}

              <h4 style={{ marginTop: '20px' }}>فضائی اور زمینی سفر</h4>
              {partners.travel.map((p, i) => (
                <div key={i} className="partner-btn" onClick={() => setPortalUrl(p.url)}>
                  <div style={{ display: 'flex', gap: '12px' }}>{p.icon} <b>{p.name}</b></div>
                  <ExternalLink size={16} />
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* --- فائنل فوٹر (پیمنٹ انٹیگریشن کے ساتھ) --- */}
      {userRole && (
        <footer style={{ position: 'fixed', bottom: 0, width: '100%', background: '#212339', display: 'flex', justifyContent: 'space-around', padding: '15px', borderTop: '1px solid #3f4264' }}>
          <div onClick={() => setActiveTab('home')} style={{ color: activeTab === 'home' ? '#3f51b5' : '#64748b', textAlign: 'center' }}><Navigation/><br/><small>ہوم</small></div>
          <div onClick={() => setActiveTab('portal')} style={{ color: activeTab === 'portal' ? '#3f51b5' : '#64748b', textAlign: 'center' }}><Ticket/><br/><small>ٹکٹ</small></div>
          <div onClick={() => alert("EasyPaisa/JazzCash/Card ادائیگی فعال ہے")} style={{ textAlign: 'center', color: '#64748b' }}><CreditCard/><br/><small>ادائیگی</small></div>
          <div onClick={() => setUserRole(null)} style={{ textAlign: 'center', color: '#ef4444' }}><X/><br/><small>لاگ آؤٹ</small></div>
        </footer>
      )}
    </div>
  );
}

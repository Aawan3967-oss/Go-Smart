import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Bike, Car, Bus, Info, ShieldCheck, CreditCard, Zap, Moon, 
  Tag, Star, Clock, Navigation, Shield, PhoneCall, Bell, Settings, 
  History, Wallet, User, Menu, X, CheckCircle, LogIn, DollarSign, 
  Plane, Train, Ticket, Monitor, Trophy, Search, Plus, Minus, ExternalLink, Gift
} from 'lucide-react';

export default function GoSmartApp() {
  // --- States ---
  const [view, setView] = useState('rider'); 
  const [activeTab, setActiveTab] = useState('home'); 
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [destination, setDestination] = useState('');
  const [vehicle, setVehicle] = useState('car');
  const [userOffer, setUserOffer] = useState(0);
  const [finalFare, setFinalFare] = useState(0);
  const [userCoins, setUserCoins] = useState(100); // ویلکم کوائنز

  // --- ٹکٹنگ پورٹل لنکس ---
  const ticketingPartners = [
    { name: 'PCB (Cricket Tickets)', url: 'https://pcb.bookme.pk', cat: 'Sports', icon: <Trophy color="#22c55e" />, logo: 'PCB' },
    { name: 'PIA (Flight Booking)', url: 'https://www.piac.com.pk', cat: 'Airline', icon: <Plane color="#065f46" />, logo: 'PIA' },
    { name: 'Pakistan Railway', url: 'https://www.pakrail.gov.pk', cat: 'Train', icon: <Train color="#16a34a" />, logo: 'PR' },
    { name: 'AirSial', url: 'https://www.airsial.com', cat: 'Airline', icon: <Plane color="#3b82f6" />, logo: 'AS' },
    { name: 'Daewoo Express', url: 'https://daewoo.com.pk', cat: 'Bus', icon: <Bus color="#ef4444" />, logo: 'DW' }
  ];

  // --- کرایہ اور رجسٹریشن لاجک ---
  useEffect(() => {
    if (destination.length > 2) {
      let base = destination.length * 48;
      // رجسٹرڈ یوزر کو 3% ڈسکاؤنٹ، غیر رجسٹرڈ کو 3% اضافی (Platform Fee)
      let total = isRegistered ? (base * 0.97) : (base * 1.03);
      setFinalFare(Math.round(total));
      setUserOffer(Math.round(total));
    }
  }, [destination, isRegistered]);

  return (
    <div dir="rtl" style={{ backgroundColor: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', paddingBottom: '90px' }}>
      <Head>
        <title>GoSmart - Super App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <style jsx global>{`
        .glass-card { background: #1e293b; border: 1px solid #334155; border-radius: 20px; padding: 20px; margin-bottom: 15px; }
        .partner-row { display: flex; align-items: center; justify-content: space-between; background: #0f172a; border: 1px solid #334155; padding: 18px; border-radius: 15px; margin-bottom: 12px; cursor: pointer; text-decoration: none; color: white; }
        .partner-row:hover { border-color: #22c55e; background: #1e293b; }
        .tab-btn { flex: 1; padding: 15px; border: none; background: none; color: #64748b; font-weight: bold; border-bottom: 2px solid transparent; transition: 0.3s; }
        .tab-active { color: #22c55e; border-bottom-color: #22c55e; background: rgba(34, 197, 94, 0.05); }
        .coin-badge { background: linear-gradient(to right, #fbbf24, #f59e0b); color: #000; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 12px; display: flex; align-items: center; gap: 5px; }
        .btn-main { background: #22c55e; color: white; border: none; padding: 16px; border-radius: 15px; width: 100%; font-weight: bold; font-size: 18px; cursor: pointer; box-shadow: 0 10px 20px rgba(34,197,94,0.3); }
        .nav-icon { display: flex; flex-direction: column; align-items: center; gap: 5px; cursor: pointer; color: #64748b; flex: 1; }
        .nav-icon.active { color: #22c55e; }
      `}</style>

      {/* --- ٹاپ ہیڈر (آپ کے لوگو کے ساتھ) --- */}
      <nav style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, zIndex: 100 }}>
        <Menu size={26} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/IMG_20260124_084929.JPG" alt="GoSmart" style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }} />
          <h2 style={{ margin: 0, fontSize: '20px', color: '#22c55e' }}>GoSmart</h2>
        </div>
        <div className="coin-badge">
          <Gift size={14} /> {userCoins}
        </div>
      </nav>

      {/* --- مین ٹیب سوئچر --- */}
      <div style={{ display: 'flex', background: '#0f172a' }}>
        <button onClick={() => setActiveTab('home')} className={`tab-btn ${activeTab === 'home' ? 'tab-active' : ''}`}>سواری (Ride)</button>
        <button onClick={() => setActiveTab('portal')} className={`tab-btn ${activeTab === 'portal' ? 'tab-active' : ''}`}>ٹکٹ پورٹل</button>
      </div>

      <main style={{ padding: '15px' }}>
        
        {/* --- سیکشن 1: ہوم (Ride Booking) --- */}
        {activeTab === 'home' && (
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ color: '#94a3b8' }}>آپ کی لوکیشن: <b>ملتان</b></span>
              {isRegistered ? <span style={{ color: '#22c55e', fontSize: '12px' }}>● Gold Member</span> : <span onClick={() => setShowRegModal(true)} style={{ color: '#fbbf24', fontSize: '12px', cursor: 'pointer' }}>رجسٹر ہوں (3% بچائیں)</span>}
            </div>

            <div style={{ background: '#0f172a', padding: '15px', borderRadius: '15px', border: '1px solid #334155', marginBottom: '10px' }}>
              <Navigation size={18} color="#22c55e" style={{ marginLeft: '10px' }} />
              <input value="کرنٹ لوکیشن (گھر)" readOnly style={{ background: 'none', border: 'none', color: 'white', width: '80%' }} />
            </div>

            <div style={{ background: '#0f172a', padding: '15px', borderRadius: '15px', border: '1px solid #334155', marginBottom: '20px' }}>
              <MapPin size={18} color="#ef4444" style={{ marginLeft: '10px' }} />
              <input placeholder="کہاں جانا چاہتے ہیں؟" onChange={(e) => setDestination(e.target.value)} style={{ background: 'none', border: 'none', color: 'white', width: '80%', outline: 'none' }} />
            </div>

            {finalFare > 0 && (
              <div style={{ textAlign: 'center' }}>
                <small style={{ color: '#94a3b8' }}>Platform Convenience Fee شامل ہے</small>
                <h1 style={{ fontSize: '56px', margin: '5px 0', color: '#22c55e' }}>Rs. {userOffer}</h1>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '25px' }}>
                  <button onClick={() => setUserOffer(userOffer - 20)} style={{ background: '#334155', border: 'none', color: 'white', width: '45px', height: '45px', borderRadius: '50%' }}>−</button>
                  <button onClick={() => setUserOffer(userOffer + 20)} style={{ background: '#334155', border: 'none', color: 'white', width: '45px', height: '45px', borderRadius: '50%' }}>+</button>
                </div>
                <button className="btn-main" onClick={() => alert("درخواست بھیج دی گئی!")}>ابھی سواری بلائیں</button>
              </div>
            )}
          </div>
        )}

        {/* --- سیکشن 2: ٹکٹنگ پورٹل (Aggregator) --- */}
        {activeTab === 'portal' && (
          <div>
            <div className="glass-card" style={{ background: 'linear-gradient(to bottom right, #1e293b, #0f172a)', textAlign: 'center' }}>
              <h3 style={{ margin: 0, color: '#22c55e' }}>آفیشل ٹکٹنگ پارٹنرز</h3>
              <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>
                ہر بکنگ پر حاصل کریں <span style={{ color: '#fbbf24' }}>50 Smart Coins</span> بطور سروس ریوارڈ
              </p>
            </div>

            <div style={{ marginTop: '10px' }}>
              {ticketingPartners.map((partner, index) => (
                <a key={index} href={partner.url} target="_blank" className="partner-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '45px', height: '45px', background: '#1e293b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #334155' }}>
                      {partner.icon}
                    </div>
                    <div>
                      <b style={{ fontSize: '15px' }}>{partner.name}</b><br/>
                      <small style={{ color: '#64748b' }}>{partner.cat} | Official Site</small>
                    </div>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <ExternalLink size={18} color="#22c55e" />
                    <div style={{ fontSize: '9px', color: '#22c55e', marginTop: '5px' }}>+50 Coins</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="glass-card" style={{ marginTop: '20px', border: '1px dashed #22c55e', textAlign: 'center' }}>
               <h4 style={{ margin: 0 }}>خصوصی آفر</h4>
               <p style={{ fontSize: '12px', color: '#94a3b8' }}>پوری بس بک کروانے پر حاصل کریں فلیٹ <span style={{ color: '#22c55e' }}>Rs. 500</span> کا فیول ریوارڈ!</p>
            </div>
          </div>
        )}
      </main>

      {/* --- باٹم نیویگیشن بار --- */}
      <footer style={{ position: 'fixed', bottom: 0, width: '100%', background: '#0f172a', display: 'flex', justifyContent: 'space-around', padding: '15px 5px', borderTop: '1px solid #1e293b', zIndex: 500 }}>
        <div onClick={() => setActiveTab('home')} className={`nav-icon ${activeTab === 'home' ? 'active' : ''}`}><Navigation size={22}/><small>ہوم</small></div>
        <div onClick={() => setActiveTab('portal')} className={`nav-icon ${activeTab === 'portal' ? 'active' : ''}`}><Ticket size={22}/><small>ٹکٹ</small></div>
        <div className="nav-icon"><Wallet size={22}/><small>والٹ</small></div>
        <div onClick={() => setShowRegModal(true)} className="nav-icon"><User size={22}/><small>پروفائل</small></div>
      </footer>

      {/* --- رجسٹریشن ماڈل --- */}
      {showRegModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-card" style={{ width: '90%', maxWidth: '400px', textAlign: 'center' }}>
            <img src="/IMG_20260124_084929.JPG" style={{ width: '60px', borderRadius: '15px', marginBottom: '15px' }} />
            <h2 style={{ color: '#22c55e' }}>GoSmart ممبر شپ</h2>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>گولڈ ممبر بنیں اور پائیں 3% مستقل ڈسکاؤنٹ اور ڈبل ریوارڈ کوائنز!</p>
            
            <input placeholder="آپ کا نام" style={{ width: '100%', padding: '15px', background: '#0f172a', border: '1px solid #334155', color: 'white', borderRadius: '12px', marginBottom: '10px', outline: 'none' }} />
            <input placeholder="فون نمبر" style={{ width: '100%', padding: '15px', background: '#0f172a', border: '1px solid #334155', color: 'white', borderRadius: '12px', marginBottom: '20px', outline: 'none' }} />
            
            <button className="btn-main" onClick={() => {setIsRegistered(true); setUserCoins(userCoins + 500); setShowRegModal(false)}}>ممبر بنیں اور 500 کوائنز لیں</button>
            <button onClick={() => setShowRegModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', marginTop: '15px' }}>بعد میں کریں</button>
          </div>
        </div>
      )}
    </div>
  );
}

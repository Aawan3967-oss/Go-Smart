import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Bike, Car, Bus, Info, ShieldCheck, CreditCard, Zap, Moon, 
  Tag, Star, Clock, Navigation, Shield, PhoneCall, Bell, Settings, 
  History, Wallet, User, Menu, X, CheckCircle, LogIn, DollarSign, 
  Plane, Train, Ticket, Monitor, Trophy, Search, Plus, Minus, ExternalLink, ArrowRight
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
  
  // --- Portal States ---
  const [portalUrl, setPortalUrl] = useState(null);
  const [portalName, setPortalName] = useState('');

  // --- ٹکٹنگ پورٹل ڈیٹا ---
  const ticketingPartners = {
    sports: [
      { name: 'PCB (Cricket)', url: 'https://pcb.bookme.pk', icon: <Trophy color="#22c55e" /> },
      { name: 'PSL Official', url: 'https://www.bookme.pk', icon: <Star color="#fbbf24" /> }
    ],
    airline: [
      { name: 'PIA Official', url: 'https://www.piac.com.pk', icon: <Plane color="#065f46" /> },
      { name: 'AirSial', url: 'https://www.airsial.com', icon: <Plane color="#1e3a8a" /> }
    ],
    transport: [
      { name: 'Pak Railway', url: 'https://www.pakrail.gov.pk', icon: <Train color="#16a34a" /> },
      { name: 'Daewoo Exp', url: 'https://daewoo.com.pk', icon: <Bus color="#ef4444" /> }
    ]
  };

  useEffect(() => {
    if (destination.length > 2) {
      let base = destination.length * 50;
      let total = isRegistered ? base : base * 1.03;
      setFinalFare(Math.round(total));
      setUserOffer(Math.round(total));
    }
  }, [destination, isRegistered]);

  const openPortal = (name, url) => {
    setPortalName(name);
    setPortalUrl(url);
  };

  return (
    <div dir="rtl" style={{ backgroundColor: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'system-ui', paddingBottom: '90px' }}>
      <Head>
        <title>GoSmart - Super Aggregator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      </Head>

      <style jsx global>{`
        .glass-card { background: #1e293b; border: 1px solid #334155; border-radius: 20px; padding: 20px; margin-bottom: 15px; }
        .partner-btn { display: flex; align-items: center; justify-content: space-between; background: #0f172a; border: 1px solid #334155; padding: 15px; border-radius: 12px; margin-bottom: 10px; cursor: pointer; }
        .tab-btn { flex: 1; padding: 15px; border: none; background: none; color: #64748b; font-weight: bold; font-size: 14px; }
        .tab-btn.active { color: #22c55e; border-bottom: 3px solid #22c55e; background: rgba(34, 197, 94, 0.05); }
        .btn-green { background: #22c55e; color: white; border: none; padding: 15px; border-radius: 12px; width: 100%; font-weight: bold; cursor: pointer; }
        .portal-header { background: #0f172a; padding: 15px; display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #22c55e; position: fixed; top: 0; width: 100%; z-index: 2000; }
      `}</style>

      {/* --- Smart Portal Frame (یہ آپ کے کلرز برقرار رکھے گا) --- */}
      {portalUrl && (
        <div style={{ position: 'fixed', inset: 0, background: '#020617', zIndex: 3000 }}>
          <div className="portal-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setPortalUrl(null)} style={{ background: '#1e293b', border: 'none', color: 'white', padding: '8px', borderRadius: '50%' }}><ArrowRight size={20}/></button>
              <span style={{ fontWeight: 'bold' }}>GoSmart | {portalName}</span>
            </div>
            <div style={{ background: 'rgba(34, 197, 94, 0.2)', padding: '5px 12px', borderRadius: '20px', fontSize: '11px', color: '#22c55e' }}>
              محفوظ بکنگ فعال ہے
            </div>
          </div>
          <iframe src={portalUrl} style={{ width: '100%', height: '100%', border: 'none', paddingTop: '65px' }} title="Portal View" />
        </div>
      )}

      {/* ہیڈر */}
      {!portalUrl && (
        <nav style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a' }}>
          <Menu size={24} />
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#22c55e', margin: 0 }}>GoSmart</h2>
            <small style={{ color: '#64748b', fontSize: '10px' }}>آپ کی اپنی سواری</small>
          </div>
          <Bell size={24} />
        </nav>
      )}

      {/* ٹیب سوئچر */}
      {!portalUrl && (
        <div style={{ display: 'flex', background: '#0f172a' }}>
          <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'tab-btn active' : 'tab-btn'}>ٹیکسی / بائیک</button>
          <button onClick={() => setActiveTab('bookings')} className={activeTab === 'bookings' ? 'tab-btn active' : 'tab-btn'}>ٹکٹنگ پورٹل</button>
        </div>
      )}

      <main style={{ padding: '20px' }}>
        
        {/* --- سواری سیکشن --- */}
        {activeTab === 'home' && (
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <h3 style={{ margin: 0 }}>کہاں جانا ہے؟</h3>
              {!isRegistered && <span style={{ background: '#fbbf24', color: 'black', fontSize: '9px', padding: '2px 6px', borderRadius: '4px' }}>آفر: رجسٹر ہوں اور 3% بچائیں</span>}
            </div>
            
            <div style={{ background: '#0f172a', padding: '12px', borderRadius: '12px', display: 'flex', gap: '10px', marginBottom: '10px', border: '1px solid #334155' }}>
              <Navigation size={18} color="#22c55e" />
              <input value="کرنٹ لوکیشن (ملتان)" readOnly style={{ background: 'none', border: 'none', color: 'white', width: '100%' }} />
            </div>

            <div style={{ background: '#0f172a', padding: '12px', borderRadius: '12px', display: 'flex', gap: '10px', marginBottom: '20px', border: '1px solid #334155' }}>
              <MapPin size={18} color="#ef4444" />
              <input placeholder="اپنی منزل کا نام لکھیں" onChange={(e) => setDestination(e.target.value)} style={{ background: 'none', border: 'none', color: 'white', width: '100%' }} />
            </div>

            {finalFare > 0 && (
              <div style={{ textAlign: 'center' }}>
                <small style={{ color: '#94a3b8' }}>منصفانہ کرایہ آفر کریں</small>
                <h1 style={{ fontSize: '56px', margin: '5px 0', color: '#22c55e', fontWeight: '900' }}>Rs. {userOffer}</h1>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '25px' }}>
                  <button onClick={() => setUserOffer(userOffer - 20)} style={{ background: '#334155', border: 'none', color: 'white', width: '45px', height: '45px', borderRadius: '50%', fontSize: '20px' }}>−</button>
                  <button onClick={() => setUserOffer(userOffer + 20)} style={{ background: '#334155', border: 'none', color: 'white', width: '45px', height: '45px', borderRadius: '50%', fontSize: '20px' }}>+</button>
                </div>
                <button className="btn-green" onClick={() => setShowRegModal(true)}>سواری کی تلاش شروع کریں</button>
              </div>
            )}
          </div>
        )}

        {/* --- ٹکٹنگ پورٹل سیکشن --- */}
        {activeTab === 'bookings' && (
          <div>
            <div className="glass-card" style={{ textAlign: 'center', border: '1px solid #22c55e' }}>
              <h3 style={{ margin: 0, color: '#22c55e' }}>آفیشل ٹکٹنگ پارٹنرز</h3>
              <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '5px' }}>
                گو-اسمارٹ کی بہترین سہولیات کے عوض صرف <span style={{ color: '#22c55e', fontWeight: 'bold' }}>1.5% ٹیکنالوجی فیس</span> شامل ہوگی۔
              </p>
            </div>

            {/* پینلز */}
            {[
              { title: 'کرکٹ اور اسپورٹس', key: 'sports' },
              { title: 'ائیر لائنز (Flights)', key: 'airline' },
              { title: 'ٹرین اور ٹرانسپورٹ', key: 'transport' }
            ].map((section) => (
              <div key={section.key} style={{ marginBottom: '25px' }}>
                <h4 style={{ color: '#64748b', marginBottom: '10px', paddingRight: '5px' }}>{section.title}</h4>
                {ticketingPartners[section.key].map((p, i) => (
                  <div key={i} onClick={() => openPortal(p.name, p.url)} className="partner-btn">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ background: '#1e293b', padding: '10px', borderRadius: '10px' }}>{p.icon}</div>
                      <span style={{ fontWeight: '500' }}>{p.name}</span>
                    </div>
                    <ExternalLink size={16} color="#334155" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* باٹم نیویگیشن */}
      {!portalUrl && (
        <footer style={{ position: 'fixed', bottom: 0, width: '100%', background: '#0f172a', display: 'flex', justifyContent: 'space-around', padding: '15px', borderTop: '1px solid #334155', zIndex: 100 }}>
          <div onClick={() => setActiveTab('home')} style={{ textAlign: 'center', color: activeTab === 'home' ? '#22c55e' : '#64748b' }}><Navigation size={22} /><br/><small style={{ fontSize: '10px' }}>ہوم</small></div>
          <div onClick={() => setActiveTab('bookings')} style={{ textAlign: 'center', color: activeTab === 'bookings' ? '#22c55e' : '#64748b' }}><Ticket size={22} /><br/><small style={{ fontSize: '10px' }}>ٹکٹ</small></div>
          <div style={{ textAlign: 'center', color: '#64748b' }}><Wallet size={22} /><br/><small style={{ fontSize: '10px' }}>والٹ</small></div>
          <div style={{ textAlign: 'center', color: '#64748b' }}><User size={22} /><br/><small style={{ fontSize: '10px' }}>پروفائل</small></div>
        </footer>
      )}

      {/* رجسٹریشن ماڈل */}
      {showRegModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-card" style={{ width: '85%', maxWidth: '400px' }}>
            <h2 style={{ textAlign: 'center', color: '#22c55e' }}>خوش آمدید!</h2>
            <p style={{ textAlign: 'center', fontSize: '13px', color: '#94a3b8' }}>رجسٹرڈ ممبر بنیں اور ہر رائیڈ پر 3% ڈسکاؤنٹ حاصل کریں۔</p>
            <input placeholder="آپ کا نام" style={{ width: '100%', padding: '15px', background: '#0f172a', border: '1px solid #334155', color: 'white', borderRadius: '12px', marginBottom: '10px', outline: 'none' }} />
            <button className="btn-green" onClick={() => {setIsRegistered(true); setShowRegModal(false)}}>ممبر بنیں</button>
            <button onClick={() => setShowRegModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', width: '100%', marginTop: '15px', fontSize: '13px' }}>بعد میں (عام ریٹ پر جاری رکھیں)</button>
          </div>
        </div>
      )}
    </div>
  );
}

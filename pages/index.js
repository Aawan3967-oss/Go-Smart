import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Bike, Car, Bus, Info, ShieldCheck, CreditCard, Zap, Moon, 
  Tag, Star, Clock, Navigation, Shield, PhoneCall, Bell, Settings, 
  History, Wallet, User, Menu, X, CheckCircle, LogIn, DollarSign, 
  Plane, Train, Ticket, Monitor, Trophy, Search, Plus, Minus, ExternalLink
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

  // --- ٹکٹنگ پورٹل ڈیٹا (لنکس کے ساتھ) ---
  const ticketingPartners = {
    sports: [
      { name: 'PCB (Cricket)', url: 'https://pcb.bookme.pk', icon: <Trophy color="#22c55e" /> },
      { name: 'PSL Tickets', url: 'https://www.bookme.pk', icon: <Star color="#fbbf24" /> },
      { name: 'Hockey Fed.', url: 'https://pakhockey.org', icon: <Zap color="#ef4444" /> }
    ],
    airline: [
      { name: 'PIA', url: 'https://www.piac.com.pk', icon: <Plane color="#065f46" /> },
      { name: 'AirSial', url: 'https://www.airsial.com', icon: <Plane color="#1e3a8a" /> },
      { name: 'Serene Air', url: 'https://www.sereneair.com', icon: <Plane color="#3b82f6" /> }
    ],
    transport: [
      { name: 'Pak Railway', url: 'https://www.pakrail.gov.pk', icon: <Train color="#16a34a" /> },
      { name: 'Daewoo Express', url: 'https://daewoo.com.pk', icon: <Bus color="#ef4444" /> },
      { name: 'Faisal Movers', url: 'https://faisalmovers.com', icon: <Bus color="#facc15" /> }
    ]
  };

  // --- رائیڈ لاجک (3% پینلٹی) ---
  useEffect(() => {
    if (destination.length > 2) {
      let base = destination.length * 45; // فرضی ریٹ
      let total = isRegistered ? base : base * 1.03;
      setFinalFare(Math.round(total));
      setUserOffer(Math.round(total));
    }
  }, [destination, isRegistered]);

  // --- فیس کیلکولیشن ---
  const showServiceFee = (price) => Math.round(price * 0.015);

  return (
    <div dir="rtl" style={{ backgroundColor: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'system-ui', paddingBottom: '90px' }}>
      <Head>
        <title>GoSmart - Official Booking Portal</title>
      </Head>

      <style jsx global>{`
        .glass-card { background: #1e293b; border: 1px solid #334155; border-radius: 20px; padding: 20px; margin-bottom: 15px; }
        .partner-btn { display: flex; align-items: center; justify-content: space-between; background: #0f172a; border: 1px solid #334155; padding: 15px; border-radius: 12px; margin-bottom: 10px; cursor: pointer; transition: 0.3s; text-decoration: none; color: white; }
        .partner-btn:hover { background: #1e293b; border-color: #22c55e; }
        .tab-btn { flex: 1; padding: 12px; border: none; background: none; color: #64748b; font-weight: bold; cursor: pointer; transition: 0.3s; }
        .tab-btn.active { color: #22c55e; border-bottom: 3px solid #22c55e; }
        .btn-green { background: #22c55e; color: white; border: none; padding: 15px; border-radius: 12px; width: 100%; font-weight: bold; font-size: 16px; cursor: pointer; }
        .penalty-tag { background: #fbbf24; color: black; font-size: 10px; padding: 2px 8px; border-radius: 5px; }
      `}</style>

      {/* ہیڈر */}
      <nav style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a' }}>
        <Menu size={24} />
        <h2 style={{ color: '#22c55e', margin: 0 }}>GoSmart</h2>
        <Bell size={24} />
      </nav>

      {/* مین ٹیب سوئچر */}
      <div style={{ display: 'flex', background: '#0f172a', borderBottom: '1px solid #1e293b' }}>
        <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'tab-btn active' : 'tab-btn'}>سفر (Ride)</button>
        <button onClick={() => setActiveTab('bookings')} className={activeTab === 'bookings' ? 'tab-btn active' : 'tab-btn'}>ٹکٹنگ (Portal)</button>
      </div>

      <main style={{ padding: '20px' }}>
        
        {/* --- سیکشن 1: رائیڈ ہوم --- */}
        {activeTab === 'home' && (
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0 }}>بکنگ</h3>
              {!isRegistered && <span className="penalty-tag">3% اضافی ریٹ لاگو ہے</span>}
            </div>
            
            <div style={{ background: '#0f172a', padding: '12px', borderRadius: '12px', display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Navigation size={18} color="#22c55e" />
              <input value="کرنٹ لوکیشن (Multan)" readOnly style={{ background: 'none', border: 'none', color: 'white', width: '100%' }} />
            </div>

            <div style={{ background: '#0f172a', padding: '12px', borderRadius: '12px', display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <MapPin size={18} color="#ef4444" />
              <input placeholder="منزل سیٹ کریں" onChange={(e) => setDestination(e.target.value)} style={{ background: 'none', border: 'none', color: 'white', width: '100%' }} />
            </div>

            {finalFare > 0 && (
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '48px', margin: '10px 0', color: '#22c55e' }}>Rs. {userOffer}</h1>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
                  <button onClick={() => setUserOffer(userOffer - 20)} style={{ background: '#334155', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%' }}>−</button>
                  <button onClick={() => setUserOffer(userOffer + 20)} style={{ background: '#334155', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%' }}>+</button>
                </div>
                <button className="btn-green" onClick={() => setShowRegModal(true)}>رائیڈ کنفرم کریں</button>
              </div>
            )}
          </div>
        )}

        {/* --- سیکشن 2: آفیشل ٹکٹنگ پورٹل --- */}
        {activeTab === 'bookings' && (
          <div>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <h3 style={{ margin: 0, color: '#22c55e' }}>آفیشل ٹکٹنگ پارٹنرز</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>آپ کی بکنگ پر 1.5% گو-اسمارٹ سروس فیس لاگو ہوگی</p>
            </div>

            {/* اسپورٹس (PCB etc) */}
            <h4 style={{ color: '#94a3b8', marginBottom: '10px' }}>کرکٹ اور اسپورٹس ایونٹس</h4>
            {ticketingPartners.sports.map((p, i) => (
              <a key={i} href={p.url} target="_blank" className="partner-btn">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {p.icon} <span>{p.name}</span>
                </div>
                <ExternalLink size={16} color="#64748b" />
              </a>
            ))}

            {/* ائیر لائنز */}
            <h4 style={{ color: '#94a3b8', marginBottom: '10px', marginTop: '20px' }}>فضائی سفر (Airlines)</h4>
            {ticketingPartners.airline.map((p, i) => (
              <a key={i} href={p.url} target="_blank" className="partner-btn">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {p.icon} <span>{p.name}</span>
                </div>
                <ExternalLink size={16} color="#64748b" />
              </a>
            ))}

            {/* ٹرین اور ٹرانسپورٹ */}
            <h4 style={{ color: '#94a3b8', marginBottom: '10px', marginTop: '20px' }}>ٹرین اور بس سروس</h4>
            {ticketingPartners.transport.map((p, i) => (
              <a key={i} href={p.url} target="_blank" className="partner-btn">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {p.icon} <span>{p.name}</span>
                </div>
                <ExternalLink size={16} color="#64748b" />
              </a>
            ))}

            {/* پوری بس بکنگ */}
            <div className="glass-card" style={{ marginTop: '20px', background: 'rgba(34, 197, 94, 0.1)', border: '1px dashed #22c55e' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bus color="#22c55e" />
                <div>
                  <h4 style={{ margin: 0 }}>پوری بس بک کریں</h4>
                  <p style={{ fontSize: '11px', margin: 0 }}>شادی یا ٹور کے لیے اسپیشل سروس</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* باٹم نیویگیشن */}
      <footer style={{ position: 'fixed', bottom: 0, width: '100%', background: '#0f172a', display: 'flex', justifyContent: 'space-around', padding: '15px', borderTop: '1px solid #334155' }}>
        <div onClick={() => setActiveTab('home')} style={{ textAlign: 'center', color: activeTab === 'home' ? '#22c55e' : '#64748b' }}><Navigation size={22} /><br/><small>ہوم</small></div>
        <div onClick={() => setActiveTab('bookings')} style={{ textAlign: 'center', color: activeTab === 'bookings' ? '#22c55e' : '#64748b' }}><Ticket size={22} /><br/><small>ٹکٹ</small></div>
        <div style={{ textAlign: 'center', color: '#64748b' }}><Wallet size={22} /><br/><small>والٹ</small></div>
        <div style={{ textAlign: 'center', color: '#64748b' }}><User size={22} /><br/><small>پروفائل</small></div>
      </footer>

      {/* رجسٹریشن ماڈل */}
      {showRegModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-card" style={{ width: '85%', maxWidth: '400px' }}>
            <h2 style={{ textAlign: 'center' }}>رجسٹریشن</h2>
            <p style={{ textAlign: 'center', fontSize: '12px' }}>3% فیس سے بچنے کے لیے اپنا نام درج کریں</p>
            <input placeholder="نام" style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155', color: 'white', borderRadius: '10px', marginBottom: '10px' }} />
            <button className="btn-green" onClick={() => {setIsRegistered(true); setShowRegModal(false)}}>محفوظ کریں</button>
            <button onClick={() => setShowRegModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', width: '100%', marginTop: '10px' }}>بغیر رجسٹریشن جاری رکھیں</button>
          </div>
        </div>
      )}
    </div>
  );
}

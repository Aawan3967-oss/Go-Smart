import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Bike, Car, Bus, Info, ShieldCheck, CreditCard, Zap, Moon, 
  Tag, Star, Clock, Navigation, Shield, PhoneCall, MessageCircle, 
  Bell, Settings, History, Wallet, User, Menu, X, CheckCircle 
} from 'lucide-react';

export default function GoSmartApp() {
  const [view, setView] = useState('rider'); // Rider or Driver
  const [destination, setDestination] = useState('');
  const [pickup, setPickup] = useState('کرنٹ لوکیشن (آپ کا گھر)');
  const [vehicle, setVehicle] = useState('car');
  const [rateType, setRateType] = useState('standard'); 
  const [userOffer, setUserOffer] = useState(''); // InDrive Style Offer
  const [fare, setFare] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 💰 Pricing Logic (Base Rates)
  const rateCards = {
    bike: { standard: 15, rush: 22, night: 28, promo: 12 },
    rickshaw: { standard: 28, rush: 38, night: 45, promo: 22 },
    car: { standard: 48, rush: 65, night: 75, promo: 42 },
    bus: { standard: 12, rush: 18, night: 20, promo: 10 }
  };

  // کرایہ کیلکولیٹ کرنا
  useEffect(() => {
    if (destination.length > 2) {
      const baseFare = destination.length * rateCards[vehicle][rateType];
      setFare(baseFare);
      setUserOffer(baseFare); // پہلے سے تجویز کردہ کرایہ
    }
  }, [destination, vehicle, rateType]);

  const handleBooking = () => {
    if (!destination) return alert("منزل سیٹ کریں (Drop-off)");
    setLoading(true);
    if (window.db) {
      window.db.ref('requests/').push({
        pickup, destination, vehicle, rateType, 
        fare: userOffer || fare, 
        status: 'pending', time: new Date().toLocaleTimeString()
      }).then(() => {
        setLoading(false);
        alert("رائیڈ کی درخواست بھیج دی گئی ہے!");
      });
    }
  };

  return (
    <div dir="rtl" style={{ backgroundColor: '#0F172A', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <Head>
        <title>GoSmart - Super App</title>
        <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          var config = {
            apiKey: "AIzaSyCbawvd2xE6DL4cMJ1w1Et2AuKInYL5kWs",
            authDomain: "gosmart-489f2.firebaseapp.com",
            projectId: "gosmart-489f2",
            databaseURL: "https://gosmart-489f2-default-rtdb.firebaseio.com",
            appId: "1:965154402861:web:cf753229db65e1c84bbea4"
          };
          if (!firebase.apps.length) { firebase.initializeApp(config); window.db = firebase.database(); }
        `}} />
      </Head>

      <style jsx global>{`
        .glass { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); border-radius: 25px; }
        .btn-active { background: #22c55e !important; box-shadow: 0 0 15px #22c55e; border: none !important; }
        .input-row { display: flex; align-items: center; gap: 10px; background: #1e293b; padding: 12px; border-radius: 15px; margin-bottom: 10px; border: 1px solid #334155; }
        input { background: none; border: none; color: white; width: 100%; outline: none; font-size: 15px; }
        .v-card { flex: 1; text-align: center; padding: 12px 5px; border-radius: 15px; background: #1e293b; cursor: pointer; border: 2px solid transparent; transition: 0.2s; }
        .v-selected { border-color: #22c55e; background: rgba(34, 197, 94, 0.1); }
      `}</style>

      {/* 1. Header & Sidebar Control */}
      <header style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Menu onClick={() => setIsMenuOpen(true)} style={{ cursor: 'pointer' }} />
        <h2 style={{ color: '#22c55e', margin: 0 }}>GoSmart</h2>
        <Bell size={24} />
      </header>

      {/* 2. Main Switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '10px' }}>
        <button onClick={() => setView('rider')} className={view === 'rider' ? 'nav-btn btn-active' : 'nav-btn'} style={{ padding: '8px 30px', borderRadius: '20px', border: '1px solid #334155', background: '#1e293b', color: 'white' }}>رائیڈر</button>
        <button onClick={() => setView('driver')} className={view === 'driver' ? 'nav-btn btn-active' : 'nav-btn'} style={{ padding: '8px 30px', borderRadius: '20px', border: '1px solid #334155', background: '#1e293b', color: 'white' }}>ڈرائیور</button>
      </div>

      {/* 3. Content Area */}
      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '15px' }}>
        {view === 'rider' ? (
          <div className="glass" style={{ padding: '20px' }}>
            {/* Pickup & Dropoff (Table Items 1, 2) */}
            <div className="input-row">
              <Navigation size={18} color="#22c55e" />
              <input value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="پک اپ لوکیشن" />
            </div>
            <div className="input-row">
              <MapPin size={18} color="#ef4444" />
              <input placeholder="کہاں جانا ہے؟ (Drop-off)" onChange={(e) => setDestination(e.target.value)} />
            </div>

            {/* Vehicle Selector (Table Item 7) */}
            <div style={{ display: 'flex', gap: '8px', margin: '20px 0' }}>
              {['bike', 'rickshaw', 'car', 'bus'].map(v => (
                <div key={v} onClick={() => setVehicle(v)} className={`v-card ${vehicle === v ? 'v-selected' : ''}`}>
                  {v === 'bike' && <Bike size={22}/>} {v === 'rickshaw' && <Info size={22}/>}
                  {v === 'car' && <Car size={22}/>} {v === 'bus' && <Bus size={22}/>}
                  <div style={{ fontSize: '10px', marginTop: '5px', textTransform: 'capitalize' }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Rate Options & InDrive Style Fare (Table Items 4, 5, 6) */}
            {fare > 0 && (
              <div style={{ borderTop: '1px solid #334155', paddingTop: '15px' }}>
                <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
                  <button onClick={() => setRateType('standard')} style={{ flex: 1, fontSize: '11px', padding: '5px', borderRadius: '5px', background: rateType === 'standard' ? '#fbbf24' : '#1e293b', border: 'none', color: 'black' }}>Standard</button>
                  <button onClick={() => setRateType('rush')} style={{ flex: 1, fontSize: '11px', padding: '5px', borderRadius: '5px', background: rateType === 'rush' ? '#fbbf24' : '#1e293b', border: 'none', color: 'black' }}>Rush Hour</button>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <small style={{ color: '#94a3b8' }}>اپنی قیمت آفر کریں (InDrive Style)</small>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', margin: '10px 0' }}>
                    <button onClick={() => setUserOffer(userOffer - 10)} style={{ background: '#334155', border: 'none', color: 'white', width: '35px', height: '35px', borderRadius: '50%' }}>-</button>
                    <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#22c55e' }}>Rs. {userOffer}</span>
                    <button onClick={() => setUserOffer(userOffer + 10)} style={{ background: '#334155', border: 'none', color: 'white', width: '35px', height: '35px', borderRadius: '50%' }}>+</button>
                  </div>
                  <button onClick={handleBooking} className="btn-active" style={{ width: '100%', padding: '15px', borderRadius: '15px', color: 'white', fontWeight: 'bold', border: 'none', fontSize: '18px' }}>
                    {loading ? "درخواست بھیجی جا رہی ہے..." : "رائیڈ کنفرم کریں"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Driver Side (Table Items - Driver Section) */
          <div className="glass" style={{ padding: '30px', textAlign: 'center' }}>
            <div style={{ marginBottom: '20px' }}>
               <div style={{ width: '60px', height: '30px', background: '#334155', borderRadius: '20px', margin: '0 auto', position: 'relative' }}>
                  <div style={{ width: '26px', height: '26px', background: '#22c55e', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
               </div>
               <p>آن لائن (On Duty)</p>
            </div>
            <Clock size={40} color="#22c55e" />
            <h3>نئی رائیڈز کا انتظار ہے</h3>
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>جیسے ہی کوئی رائیڈر بکنگ کرے گا، یہاں پاپ اپ ظاہر ہوگا۔</p>
          </div>
        )}
      </main>

      {/* 4. Footer Icons (Table Items 13, 14, 15, 22) */}
      <footer style={{ position: 'fixed', bottom: 0, width: '100%', background: '#1e293b', display: 'flex', justifyContent: 'space-around', padding: '15px', borderTop: '1px solid #334155' }}>
        <div style={{ textAlign: 'center' }}><History size={20} /><br/><small>ہسٹری</small></div>
        <div style={{ textAlign: 'center' }}><Wallet size={20} /><br/><small>والٹ</small></div>
        <div style={{ textAlign: 'center' }}><Shield size={20} color="#ef4444" /><br/><small>SOS</small></div>
        <div style={{ textAlign: 'center' }}><User size={20} /><br/><small>پروفائل</small></div>
      </footer>

      {/* 5. Sidebar Drawer (Table Items 20-26) */}
      {isMenuOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '70%', height: '100%', background: '#0F172A', zIndex: 100, padding: '20px', boxShadow: '-5px 0 20px rgba(0,0,0,0.5)' }}>
          <X onClick={() => setIsMenuOpen(false)} style={{ marginBottom: '20px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#22c55e' }}></div>
            <div><strong>اعوان یوزر</strong><br/><small>Rating: 5.0 ⭐</small></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '10px' }}><History size={20}/> ٹرپ ہسٹری</div>
            <div style={{ display: 'flex', gap: '10px' }}><Tag size={20}/> پرومو کوڈز</div>
            <div style={{ display: 'flex', gap: '10px' }}><Settings size={20}/> سیٹنگز</div>
            <div style={{ display: 'flex', gap: '10px' }}><ShieldCheck size={20}/> ہیلپ سپورٹ</div>
          </div>
        </div>
      )}
    </div>
  );
}

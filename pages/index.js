import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { MapPin, Bike, Car, Bus, Info, ShieldCheck, CreditCard, Zap, Moon, Tag, Star, Clock, Navigation, Shield, PhoneCall } from 'lucide-react';

export default function GoSmartApp() {
  const [view, setView] = useState('rider');
  const [destination, setDestination] = useState('');
  const [vehicle, setVehicle] = useState('car');
  const [rateType, setRateType] = useState('standard'); 
  const [fare, setFare] = useState(0);
  const [loading, setLoading] = useState(false);

  // 💰 ہر سواری کے لیے 4 الگ الگ ریٹ کارڈز (بحث سے بچنے کے لیے)
  const rateCards = {
    bike: { standard: 15, rush: 22, night: 28, promo: 12 },
    rickshaw: { standard: 28, rush: 38, night: 45, promo: 22 },
    car: { standard: 48, rush: 65, night: 75, promo: 42 },
    bus: { standard: 12, rush: 18, night: 20, promo: 10 }
  };

  // کرایہ کیلکولیٹ کرنے کا خودکار نظام
  useEffect(() => {
    if (destination.length > 2) {
      const distanceFactor = destination.length; // فرضی فاصلہ
      const pricePerUnit = rateCards[vehicle][rateType];
      setFare(distanceFactor * pricePerUnit);
    } else {
      setFare(0);
    }
  }, [destination, vehicle, rateType]);

  // فائر بیس میں رائیڈ محفوظ کرنا
  const handleBooking = () => {
    if (!destination) return alert("براہ کرم منزل کا نام لکھیں");
    setLoading(true);
    if (window.db) {
      const rideRef = window.db.ref('requests/').push();
      rideRef.set({
        destination,
        vehicle,
        rateType,
        fare,
        time: new Date().toLocaleTimeString(),
        status: 'pending'
      }).then(() => {
        setLoading(false);
        alert(`آپ کی ${vehicle} کی درخواست (${rateType} ریٹ پر) بھیج دی گئی ہے!`);
      });
    } else {
      setLoading(false);
      alert("سسٹم ابھی لوڈ ہو رہا ہے، ایک لمحہ انتظار کریں...");
    }
  };

  return (
    <div dir="rtl" style={{ backgroundColor: '#0F172A', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <Head>
        <title>GoSmart - مکمل ورژن</title>
        {/* فائر بیس CDN کنکشن */}
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
          if (!firebase.apps.length) { 
            firebase.initializeApp(config); 
            window.db = firebase.database(); 
          }
        `}} />
      </Head>

      <style jsx global>{`
        .nav-btn { padding: 12px 35px; border-radius: 50px; border: 2px solid #334155; background: #1e293b; color: white; cursor: pointer; transition: 0.3s; font-weight: bold; }
        .active { background: #22c55e !important; border-color: #22c55e; box-shadow: 0 0 20px #22c55e; transform: scale(1.05); }
        .glass-card { background: rgba(30, 41, 59, 0.85); border-radius: 30px; padding: 25px; margin: 15px auto; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .vehicle-box { flex: 1; padding: 15px 5px; background: #1e293b; border-radius: 18px; border: 2px solid transparent; cursor: pointer; text-align: center; transition: 0.2s; }
        .selected-v { border-color: #22c55e; background: rgba(34, 197, 94, 0.15); }
        .rate-chip { flex: 1; padding: 10px 5px; font-size: 13px; background: #0F172A; border-radius: 12px; border: 1px solid #334155; cursor: pointer; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 5px; }
        .rate-active { border-color: #fbbf24; color: #fbbf24; background: rgba(251, 191, 36, 0.15); }
        input { background: none; border: none; color: white; outline: none; width: 100%; font-size: 18px; }
      `}</style>

      {/* لوگو سیکشن */}
      <center style={{ padding: '40px 20px' }}>
        <img src="/IMG_20260124_084929.JPG" style={{ width: '130px', borderRadius: '25px', boxShadow: '0 0 25px rgba(34,197,94,0.4)' }} alt="GoSmart" />
        <h1 style={{ fontSize: '42px', margin: '10px 0', letterSpacing: '1px' }}>GoSmart</h1>
      </center>

      {/* سوئچر */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '-30px', position: 'relative', zIndex: 10 }}>
        <button onClick={() => setView('rider')} className={view === 'rider' ? 'nav-btn active' : 'nav-btn'}>رائیڈر</button>
        <button onClick={() => setView('driver')} className={view === 'driver' ? 'nav-btn active' : 'nav-btn'}>ڈرائیور</button>
      </div>

      <main style={{ maxWidth: '480px', margin: '0 auto', paddingBottom: '100px' }}>
        {view === 'rider' ? (
          <div className="glass-card">
            <h3 style={{ marginBottom: '15px', color: '#94a3b8' }}>آپ کی منزل:</h3>
            <div style={{ display: 'flex', background: '#0F172A', padding: '15px', borderRadius: '15px', alignItems: 'center', gap: '12px', border: '1px solid #334155' }}>
              <MapPin size={22} color="#ef4444" />
              <input placeholder="کہاں جانا چاہتے ہیں؟" onChange={(e) => setDestination(e.target.value)} />
            </div>

            <h4 style={{ margin: '25px 0 15px' }}>سواری منتخب کریں:</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div onClick={() => setVehicle('bike')} className={`vehicle-box ${vehicle === 'bike' ? 'selected-v' : ''}`}><Bike size={28}/><br/><small>بائیک</small></div>
              <div onClick={() => setVehicle('rickshaw')} className={`vehicle-box ${vehicle === 'rickshaw' ? 'selected-v' : ''}`}><Navigation size={28}/><br/><small>رکشہ</small></div>
              <div onClick={() => setVehicle('car')} className={`vehicle-box ${vehicle === 'car' ? 'selected-v' : ''}`}><Car size={28}/><br/><small>کار</small></div>
              <div onClick={() => setVehicle('bus')} className={`vehicle-box ${vehicle === 'bus' ? 'selected-v' : ''}`}><Bus size={28}/><br/><small>بس</small></div>
            </div>

            <h4 style={{ margin: '25px 0 15px' }}>کرایہ کا آپشن (بحث ختم):</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div onClick={() => setRateType('standard')} className={`rate-chip ${rateType === 'standard' ? 'rate-active' : ''}`}><Star size={16}/> عام ریٹ</div>
              <div onClick={() => setRateType('rush')} className={`rate-chip ${rateType === 'rush' ? 'rate-active' : ''}`}><Zap size={16}/> رش ٹائم</div>
              <div onClick={() => setRateType('night')} className={`rate-chip ${rateType === 'night' ? 'rate-active' : ''}`}><Moon size={16}/> نائٹ ریٹ</div>
              <div onClick={() => setRateType('promo')} className={`rate-chip ${rateType === 'promo' ? 'rate-active' : ''}`}><Tag size={16}/> رعایت</div>
            </div>

            {fare > 0 && (
              <div style={{ textAlign: 'center', marginTop: '30px', borderTop: '2px solid #334155', paddingTop: '20px' }}>
                <div style={{ fontSize: '16px', color: '#94a3b8' }}>منتخب کردہ فائنل کرایہ</div>
                <div style={{ fontSize: '60px', fontWeight: 'bold', color: '#22c55e', margin: '5px 0' }}>Rs. {fare}</div>
                <button onClick={handleBooking} style={{ width: '100%', padding: '20px', background: '#22c55e', border: 'none', borderRadius: '18px', color: 'white', fontWeight: 'bold', fontSize: '20px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(34,197,94,0.3)' }}>
                  {loading ? "درخواست بھیجی جا رہی ہے..." : "بکنگ کنفرم کریں"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-card" style={{ textAlign: 'center', padding: '50px 20px' }}>
             <Clock size={48} color="#3b82f6" style={{ marginBottom: '15px' }} />
             <h3>ڈرائیور پینل</h3>
             <p style={{ color: '#94a3b8' }}>رئیل ٹائم درخواستیں یہاں لوڈ ہوں گی جن میں سواری اور ریٹ کی مکمل تفصیل ہوگی۔</p>
          </div>
        )}
      </main>

      {/* باٹم بار */}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', display: 'flex', justifyContent: 'space-around', padding: '20px', background: '#1e293b', borderTop: '1px solid #334155' }}>
        <div style={{ textAlign: 'center' }}><Shield size={20} /><br/><small>محفوظ</small></div>
        <div style={{ textAlign: 'center' }}><CreditCard size={20} /><br/><small>والٹ</small></div>
        <div style={{ textAlign: 'center' }}><PhoneCall size={20} /><br/><small>ہیلپ</small></div>
      </div>
    </div>
  );
}

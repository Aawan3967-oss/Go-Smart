import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { MapPin, Bike, Car, Bus, Info, ShieldCheck, Users, CreditCard } from 'lucide-react';

export default function GoSmartApp() {
  const [view, setView] = useState('rider');
  const [destination, setDestination] = useState('');
  const [vehicle, setVehicle] = useState('car'); // ڈیفالٹ سواری کار
  const [fare, setFare] = useState(0);
  const [loading, setLoading] = useState(false);

  // سواریوں کے ریٹس (فی کلومیٹر فرضی حساب)
  const rates = {
    bike: 15,
    rickshaw: 25,
    car: 45,
    bus: 10
  };

  // کرایہ اپ ڈیٹ کرنے کا فنکشن
  useEffect(() => {
    if (destination.length > 2) {
      setFare(destination.length * rates[vehicle]);
    } else {
      setFare(0);
    }
  }, [destination, vehicle]);

  const handleBooking = () => {
    if (!destination) return alert("منزل لکھیں");
    setLoading(true);
    if (window.db) {
      const rideRef = window.db.ref('requests/').push();
      rideRef.set({
        destination,
        vehicle,
        fare,
        status: 'pending',
        time: new Date().toLocaleTimeString()
      }).then(() => {
        setLoading(false);
        alert(`آپ کی ${vehicle} بکنگ کی درخواست بھیج دی گئی ہے!`);
      });
    }
  };

  return (
    <div dir="rtl" style={{ backgroundColor: '#0F172A', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <Head>
        <title>GoSmart - Multi Vehicle</title>
        <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          var config = {
            apiKey: "AIzaSyCbawvd2xE6DL4cMJ1w1Et2AuKInYL5kWs",
            authDomain: "gosmart-489f2.firebaseapp.com",
            projectId: "gosmart-489f2",
            databaseURL: "https://gosmart-489f2-default-rtdb.firebaseio.com",
            storageBucket: "gosmart-489f2.firebasestorage.app",
            messagingSenderId: "965154402861",
            appId: "1:965154402861:web:cf753229db65e1c84bbea4"
          };
          if (!firebase.apps.length) { firebase.initializeApp(config); window.db = firebase.database(); }
        `}} />
      </Head>

      <style jsx global>{`
        .nav-btn { padding: 10px 30px; border-radius: 50px; border: 1px solid #334155; background: #1e293b; color: white; cursor: pointer; }
        .active { background: #22c55e !important; border-color: #22c55e; box-shadow: 0 0 15px #22c55e; }
        .vehicle-card { flex: 1; padding: 15px 5px; background: #1e293b; border-radius: 15px; border: 2px solid transparent; cursor: pointer; text-align: center; transition: 0.3s; }
        .selected-v { border-color: #22c55e; background: rgba(34, 197, 94, 0.1); }
        .glass-card { background: rgba(30, 41, 59, 0.8); border-radius: 25px; padding: 20px; margin: 15px; border: 1px solid rgba(255,255,255,0.1); }
      `}</style>

      <center style={{ padding: '30px' }}>
        <img src="/IMG_20260124_084929.JPG" style={{ width: '100px', borderRadius: '15px' }} />
        <h1 style={{ margin: '10px' }}>GoSmart</h1>
      </center>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setView('rider')} className={view === 'rider' ? 'nav-btn active' : 'nav-btn'}>سواری</button>
        <button onClick={() => setView('driver')} className={view === 'driver' ? 'nav-btn active' : 'nav-btn'}>ڈرائیور</button>
      </div>

      <main style={{ maxWidth: '500px', margin: '0 auto' }}>
        {view === 'rider' ? (
          <div className="glass-card">
            <h3>منزل کا انتخاب</h3>
            <div style={{ display: 'flex', background: '#0F172A', padding: '12px', borderRadius: '12px', alignItems: 'center', gap: '10px' }}>
              <MapPin size={20} color="red" />
              <input 
                placeholder="آپ کہاں جانا چاہتے ہیں؟" 
                onChange={(e) => setDestination(e.target.value)}
                style={{ background: 'none', border: 'none', color: 'white', outline: 'none', width: '100%' }}
              />
            </div>

            <h4 style={{ marginTop: '20px' }}>سواری منتخب کریں</h4>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <div onClick={() => setVehicle('bike')} className={`vehicle-card ${vehicle === 'bike' ? 'selected-v' : ''}`}>
                <Bike size={24} /> <br/> <small>بائیک</small>
              </div>
              <div onClick={() => setVehicle('rickshaw')} className={`vehicle-card ${vehicle === 'rickshaw' ? 'selected-v' : ''}`}>
                <Info size={24} /> <br/> <small>رکشہ</small>
              </div>
              <div onClick={() => setVehicle('car')} className={`vehicle-card ${vehicle === 'car' ? 'selected-v' : ''}`}>
                <Car size={24} /> <br/> <small>کار</small>
              </div>
              <div onClick={() => setVehicle('bus')} className={`vehicle-card ${vehicle === 'bus' ? 'selected-v' : ''}`}>
                <Bus size={24} /> <br/> <small>بس</small>
              </div>
            </div>

            {fare > 0 && (
              <div style={{ textAlign: 'center', marginTop: '25px' }}>
                <span style={{ color: '#94a3b8' }}>کرایہ: </span>
                <span style={{ fontSize: '35px', fontWeight: 'bold', color: '#22c55e' }}>Rs. {fare}</span>
                <button onClick={handleBooking} style={{ width: '100%', padding: '15px', background: '#22c55e', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold', marginTop: '15px' }}>
                  {loading ? "انتظار کریں..." : "بکنگ کنفرم کریں"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-card" style={{ textAlign: 'center' }}>
            <Users size={40} color="#3b82f6" />
            <h3>ڈرائیور پینل</h3>
            <p style={{ color: '#94a3b8' }}>نئی درخواستیں یہاں ظاہر ہوں گی...</p>
          </div>
        )}
      </main>

      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '30px', opacity: 0.5 }}>
        <div style={{ textAlign: 'center' }}><ShieldCheck size={18} /><br/><small>محفوظ</small></div>
        <div style={{ textAlign: 'center' }}><CreditCard size={18} /><br/><small>کیش</small></div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { MapPin, Car, Users } from 'lucide-react';

// 🔥 آپ کی فراہم کردہ مکمل فائر بیس کنفیگریشن
const firebaseConfig = {
  apiKey: "AIzaSyCbawvd2xE6DL4cMJ1w1Et2AuKInYL5kWs",
  authDomain: "gosmart-489f2.firebaseapp.com",
  projectId: "gosmart-489f2",
  storageBucket: "gosmart-489f2.firebasestorage.app",
  messagingSenderId: "965154402861",
  appId: "1:965154402861:web:cf753229db65e1c84bbea4",
  measurementId: "G-SRJFWD55Z1"
};

// فائر بیس انیشلائزیشن
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function GoSmartApp() {
  const [view, setView] = useState('rider'); 
  const [destination, setDestination] = useState('');
  const [fare, setFare] = useState(0);
  const [rides, setRides] = useState([]); // ڈرائیور کے لیے رائیڈز کی لسٹ
  const myLogo = "/IMG_20260124_084929.JPG"; 

  // 1. رائیڈر کے لیے: ڈیٹا بیس میں رائیڈ بھیجنا
  const bookRide = () => {
    if (!destination) return alert("منزل کا نام لکھیں");
    
    const rideRef = ref(db, 'requests/');
    const newRideRef = push(rideRef);
    set(newRideRef, {
      destination: destination,
      fare: fare,
      status: 'pending',
      time: new Date().toLocaleTimeString()
    }).then(() => {
      alert("آپ کی رائیڈ کی درخواست ڈرائیورز کو بھیج دی گئی ہے!");
    });
  };

  // 2. ڈرائیور کے لیے: ڈیٹا بیس سے لائیو رائیڈز اٹھانا
  useEffect(() => {
    const ridesRef = ref(db, 'requests/');
    onValue(ridesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setRides(list.reverse()); // تازہ ترین رائیڈز اوپر دکھانے کے لیے
      }
    });
  }, []);

  return (
    <div dir="rtl" style={{backgroundColor: '#0F172A', minHeight: '100vh', color: 'white', paddingBottom: '50px'}}>
      <style jsx>{`
        .nav-btn { padding: 12px 30px; border-radius: 50px; border: 2px solid #334155; background: #1e293b; color: white; cursor: pointer; transition: 0.3s; font-weight: bold; }
        .active { background: #22c55e !important; border-color: #4ade80; box-shadow: 0 0 15px #22c55e; transform: scale(1.05); }
        .card { background: #1e293b; border-radius: 25px; padding: 25px; margin: 20px auto; border: 1px solid rgba(255,255,255,0.1); max-width: 400px; }
        .logo { width: 140px; border-radius: 20px; box-shadow: 0 0 20px rgba(34,197,94,0.3); }
        input { background: #0F172A; border: 1px solid #334155; padding: 15px; border-radius: 12px; color: white; width: 85%; outline: none; }
      `}</style>

      {/* لوگو اور نام */}
      <center style={{padding: '40px 20px'}}>
        <img src={myLogo} className="logo" alt="GoSmart" />
        <h1 style={{margin: '10px 0', fontSize: '2.5rem'}}>GoSmart</h1>
      </center>

      {/* ہائی لائٹر بٹنز (Navigation) */}
      <div style={{display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '-20px'}}>
        <button onClick={() => setView('rider')} className={view === 'rider' ? 'nav-btn active' : 'nav-btn'}>رائیڈر</button>
        <button onClick={() => setView('driver')} className={view === 'driver' ? 'nav-btn active' : 'nav-btn'}>ڈرائیور</button>
      </div>

      {/* مین باڈی */}
      <main>
        {view === 'rider' ? (
          <div className="card text-center">
            <h3>سواری بک کریں</h3>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', background: '#0F172A', padding: '5px 15px', borderRadius: '15px'}}>
              <MapPin color="red" />
              <input 
                placeholder="منزل کہاں ہے؟" 
                onChange={(e) => {
                  setDestination(e.target.value);
                  setFare(e.target.value.length * 25); // فرضی کرایہ کا حساب
                }}
              />
            </div>
            {fare > 0 && (
              <div style={{marginTop: '25px'}}>
                <h2 style={{fontSize: '40px'}}>Rs. {fare}</h2>
                <button onClick={bookRide} style={{width: '100%', padding: '18px', background: '#22c55e', border: 'none', borderRadius: '15px', color: 'white', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer'}}>کنفرم بکنگ</button>
              </div>
            )}
          </div>
        ) : (
          <div style={{padding: '10px'}}>
            <h3 style={{textAlign: 'center'}}>دستیاب رائیڈز</h3>
            {rides.length === 0 ? <p style={{textAlign: 'center', color: '#94a3b8'}}>فی الحال کوئی درخواست نہیں ہے...</p> : 
              rides.map((ride) => (
                <div key={ride.id} className="card" style={{borderRight: '6px solid #3b82f6'}}>
                  <p style={{fontSize: '12px', color: '#94a3b8'}}>{ride.time}</p>
                  <h4>{ride.destination}</h4>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{fontSize: '22px', color: '#22c55e', fontWeight: 'bold'}}>Rs. {ride.fare}</span>
                    <button className="nav-btn active" style={{padding: '8px 15px'}}>قبول کریں</button>
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </main>
    </div>
  );
}

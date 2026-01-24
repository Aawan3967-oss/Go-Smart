import Head from 'next/head';
import React, { useState, useEffect } from 'react';

export default function GoSmartApp() {
  const [view, setView] = useState('rider');
  const [destination, setDestination] = useState('');
  const [rides, setRides] = useState([]);

  // یہ فنکشن رائیڈ بک کرنے کے لیے ہے
  const bookRide = () => {
    if (!destination) return alert("منزل کا نام لکھیں");
    if (typeof window !== 'undefined' && window.db) {
      const newRideRef = window.push(window.ref(window.db, 'requests/'));
      window.set(newRideRef, {
        destination: destination,
        status: 'pending',
        time: new Date().toLocaleTimeString()
      }).then(() => alert("درخواست بھیج دی گئی!"));
    }
  };

  return (
    <div dir="rtl" style={{backgroundColor: '#0F172A', minHeight: '100vh', color: 'white'}}>
      <Head>
        {/* فائر بیس کو براہ راست لوڈ کرنے والے کوڈز جو آپ پہلے دیکھ رہے تھے */}
        <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
        <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          const firebaseConfig = {
            apiKey: "AIzaSyCbawvd2xE6DL4cMJ1w1Et2AuKInYL5kWs",
            authDomain: "gosmart-489f2.firebaseapp.com",
            projectId: "gosmart-489f2",
            storageBucket: "gosmart-489f2.firebasestorage.app",
            messagingSenderId: "965154402861",
            appId: "1:965154402861:web:cf753229db65e1c84bbea4"
          };
          if (!firebase.apps.length) {
            const app = firebase.initializeApp(firebaseConfig);
            window.db = firebase.database();
            window.ref = firebase.database.ref;
            window.set = (ref, data) => ref.set(data);
            window.push = (ref) => ref.push();
            window.onValue = (ref, cb) => ref.on('value', cb);
          }
        `}} />
      </Head>

      <style jsx>{`
        .nav-btn { padding: 12px 30px; border-radius: 50px; border: 1px solid #334155; background: #1e293b; color: white; cursor: pointer; margin: 10px; }
        .active { background: #22c55e !important; border-color: #22c55e; box-shadow: 0 0 15px #22c55e; }
        .card { background: #1e293b; border-radius: 20px; padding: 25px; margin: 20px auto; max-width: 400px; border: 1px solid #334155; }
        input { width: 90%; padding: 15px; border-radius: 10px; border: none; background: #0F172A; color: white; margin-bottom: 15px; }
      `}</style>

      <center style={{padding: '40px'}}>
        <img src="/IMG_20260124_084929.JPG" style={{width: '120px', borderRadius: '20px'}} />
        <h1 style={{fontSize: '35px'}}>GoSmart</h1>
      </center>

      <div style={{display: 'flex', justifyContent: 'center'}}>
        <button onClick={() => setView('rider')} className={view === 'rider' ? 'nav-btn active' : 'nav-btn'}>سواری</button>
        <button onClick={() => setView('driver')} className={view === 'driver' ? 'nav-btn active' : 'nav-btn'}>ڈرائیور</button>
      </div>

      <div className="card">
        {view === 'rider' ? (
          <div>
            <h3>منزل کا انتخاب کریں</h3>
            <input placeholder="کہاں جانا ہے؟" onChange={(e) => setDestination(e.target.value)} />
            <button onClick={bookRide} style={{width: '100%', padding: '15px', background: '#22c55e', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold'}}>بک کریں</button>
          </div>
        ) : (
          <div>
            <h3>دستیاب درخواستیں</h3>
            <p style={{color: '#94a3b8'}}>رئیل ٹائم ڈیٹا لوڈ ہو رہا ہے...</p>
          </div>
        )}
      </div>
    </div>
  );
}

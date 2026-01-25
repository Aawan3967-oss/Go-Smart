import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  Navigation, MapPin, Phone, MessageSquare, AlertCircle, 
  Ticket, CreditCard, History, User, Trophy, Plane, Menu, Bell, 
  DollarSign, Car, Shield, Truck, Power, HelpCircle, X
} from 'lucide-react';

export default function GoSmartApp() {
  const [role, setRole] = useState('rider'); // 'rider' or 'driver'
  const [screen, setScreen] = useState('splash');
  const [isOnline, setIsOnline] = useState(false);
  const [fareData, setFareData] = useState({ base: 0, offer: 0 });

  useEffect(() => {
    if (screen === 'splash') setTimeout(() => setScreen('home'), 2000);
  }, [screen]);

  // ریوز ایبل اسٹائلز (ٹکراؤ ختم کرنے کے لیے)
  const styles = (
    <style jsx global>{`
      :root { --indigo: #1a1c2c; --card: #282a44; --accent: #3f51b5; --green: #22c55e; --red: #ef4444; }
      body { margin: 0; background: var(--indigo); color: white; font-family: sans-serif; }
      .app-box { max-width: 450px; margin: 0 auto; min-height: 100vh; position: relative; }
      .card { background: var(--card); border: 1px solid #3f4264; border-radius: 20px; padding: 20px; margin-bottom: 15px; }
      .input-row { background: #212339; border-radius: 12px; padding: 12px; display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
      .input-row input { background: none; border: none; color: white; width: 100%; outline: none; }
      .btn { border: none; padding: 15px; border-radius: 12px; width: 100%; font-weight: bold; cursor: pointer; color: white; }
      .nav-bar { position: fixed; bottom: 0; width: 100%; max-width: 450px; background: #212339; display: flex; justify-content: space-around; padding: 15px 0; border-top: 1px solid #3f4264; }
      .blink { animation: pulse 1.5s infinite; }
      @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } }
    `}</style>
  );

  if (screen === 'splash') return (
    <div className="app-box" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'100vh'}}>
      {styles} <img src="/IMG_20260124_084929.JPG" width="100" style={{borderRadius:20}} />
      <h1 style={{color:'var(--green)'}}>GoSmart</h1>
    </div>
  );

  return (
    <div className="app-box">
      {styles}
      <Head><title>GoSmart - {role.toUpperCase()}</title></Head>

      {/* ہیڈر */}
      <div style={{padding:'20px', display:'flex', justifyContent:'space-between'}}>
        <Menu onClick={() => setRole(role === 'rider' ? 'driver' : 'rider')} />
        <span style={{fontWeight:'bold'}}>{role === 'rider' ? 'Rider Mode' : 'Driver Mode'}</span>
        <Bell />
      </div>

      {/* مین کنٹینٹ (سٹرکچر کے مطابق) */}
      <div style={{padding:'0 20px'}}>
        {role === 'rider' ? (
          /* رائیڈر ہوم */
          <div className="card">
             <div className="input-row"><Navigation size={18} color="var(--green)" /><input value="Current Location" readOnly /></div>
             <div className="input-row"><MapPin size={18} color="var(--red)" /><input placeholder="منزل لکھیں" onChange={(e) => setFareData({base:350, offer:350})} /></div>
             {fareData.base > 0 && <button className="btn" style={{background:'var(--accent)'}} onClick={()=>setScreen('active')}>Confirm Ride</button>}
          </div>
        ) : (
          /* ڈرائیور ہوم */
          <div style={{textAlign:'center'}}>
             <button className="btn" style={{background: isOnline ? 'var(--red)' : 'var(--green)'}} onClick={()=>setIsOnline(!isOnline)}>
               {isOnline ? 'Go Offline' : 'Go Online'}
             </button>
             <div className="card" style={{marginTop:20, height:150, display:'flex', alignItems:'center', justifyContent:'center'}}>
               {isOnline ? <p className="blink">صارفین کی تلاش جاری ہے...</p> : <p>آپ آف لائن ہیں</p>}
             </div>
          </div>
        )}
      </div>

      {/* کامن نیویگیشن بار */}
      <div className="nav-bar">
        <div className="tab" onClick={()=>setScreen('home')}><Navigation size={20}/><small>Home</small></div>
        <div className="tab" onClick={()=>setScreen('tickets')}><Ticket size={20}/><small>Tickets</small></div>
        <div className="tab" onClick={()=>setScreen('earnings')}><DollarSign size={20}/><small>Wallet</small></div>
        <div className="tab"><User size={20}/><small>Profile</small></div>
      </div>
    </div>
  );
}

// GoSmart Unified Backend Logic
const GoSmartCore = {
    // 1. بزنس رولز (ٹکراؤ ختم: سواری پر 0%، ٹکٹ پر 1.5%)
    calculatePricing: (type, amount) => {
        const commissionRate = (type === 'ticket') ? 0.015 : 0;
        const fee = amount * commissionRate;
        return {
            base: amount,
            platformFee: fee,
            total: amount + fee
        };
    },

    // 2. سیکیورٹی (ڈیٹا ماسکنگ)
    getPublicProfile: (driver) => {
        const { cnic, address, emergencyContact, ...publicData } = driver;
        return publicData; // حساس ڈیٹا ہذف کر دیا گیا
    },

    // 3. رجسٹریشن کنٹرول (ڈرائیور کے لیے لازمی، رائیڈر کے لیے گیسٹ)
    verifyAccess: (user) => {
        if (user.role === 'driver' && !user.isVerified) return false;
        return true; // رائیڈر اور گیسٹ الاؤڈ ہیں
    },

    // 4. ایمرجنسی سروس (آف لائن ڈیٹیکشن)
    emergencyMonitor: (driver) => {
        if (driver.isOnline && (Date.now() - driver.lastPing > 120000)) {
            // خودکار الرٹ بھیجیں
            return "SEND_SMS_ALERT";
        }
    }
};

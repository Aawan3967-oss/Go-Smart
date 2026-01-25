import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  Navigation, MapPin, Phone, MessageSquare, AlertCircle, Ticket, CreditCard, 
  User, Trophy, Plane, Menu, Bell, Car, DollarSign, Shield, X, CheckCircle 
} from 'lucide-react';

export default function GoSmartMasterApp() {
  const [appMode, setAppMode] = useState('rider'); // rider or driver
  const [screen, setScreen] = useState('splash');
  const [isOnline, setIsOnline] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  // کرکٹ لنکس اور ڈیٹا
  const cricketLeagues = [
    { name: 'PSL 2026', url: 'https://www.psl-t20.com', icon: '🏏' },
    { name: 'ICC Champions Trophy', url: 'https://www.icc-cricket.com', icon: '🏆' },
    { name: 'PCB Official', url: 'https://www.pcb.com.pk', icon: '🇵🇰' }
  ];

  useEffect(() => {
    if (screen === 'splash') setTimeout(() => setScreen('home'), 2500);
  }, [screen]);

  const styles = (
    <style jsx global>{`
      :root { --indigo: #1a1c2c; --card: #282a44; --accent: #3f51b5; --green: #22c55e; --red: #ef4444; }
      body { margin: 0; background: var(--indigo); color: white; font-family: 'Inter', sans-serif; overflow-x: hidden; }
      .container { max-width: 450px; margin: 0 auto; min-height: 100vh; position: relative; padding-bottom: 80px; }
      .card { background: var(--card); border: 1px solid #3f4264; border-radius: 20px; padding: 18px; margin-bottom: 15px; transition: 0.3s; }
      .card:active { transform: scale(0.98); }
      .input-box { background: #212339; border-radius: 12px; padding: 12px; display: flex; align-items: center; gap: 10px; margin-bottom: 10px; border: 1px solid #3f4264; }
      .input-box input { background: none; border: none; color: white; width: 100%; outline: none; }
      .btn-main { background: var(--accent); color: white; border: none; padding: 16px; border-radius: 15px; width: 100%; font-weight: bold; cursor: pointer; }
      .nav-bar { position: fixed; bottom: 0; width: 100%; max-width: 450px; background: #212339; display: flex; justify-content: space-around; padding: 15px 0; border-top: 1px solid #3f4264; z-index: 100; }
      .blink { animation: pulse 1s infinite; }
      @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
    `}</style>
  );

  if (screen === 'splash') return (
    <div className="container" style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
      {styles}
      <div style={{textAlign:'center'}}>
        <img src="/IMG_20260124_084929.JPG" width="120" style={{borderRadius:'25px', boxShadow:'0 10px 30px rgba(0,0,0,0.5)'}} />
        <h1 style={{color:'var(--green)', letterSpacing:'2px', marginTop:'20px'}}>GoSmart</h1>
        <p style={{color:'#64748b'}}>Safety • Speed • Savings</p>
      </div>
    </div>
  );

  return (
    <div className="container">
      {styles}
      <Head><title>GoSmart - {appMode === 'rider' ? 'Rider' : 'Driver'}</title></Head>

      {/* Header */}
      <header style={{padding:'20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Menu onClick={() => setAppMode(appMode === 'rider' ? 'driver' : 'rider')} />
        <img src="/IMG_20260124_084929.JPG" width="40" style={{borderRadius:'8px'}} />
        <Bell />
      </header>

      <main style={{padding:'0 20px'}}>
        {appMode === 'rider' ? (
          /* --- RIDER APP STRUCTURE --- */
          <>
            {screen === 'home' && (
              <div>
                <div className="card">
                  <div className="input-row" style={{marginBottom:'15px'}}>
                    <div className="input-box"><Navigation size={18} color="var(--green)"/><input value="My Current Location (Multan)" readOnly /></div>
                    <div className="input-box"><MapPin size={18} color="var(--red)"/><input placeholder="Where to?" onChange={() => setTicketData({fare: 450})} /></div>
                  </div>
                  {ticketData && (
                    <div style={{textAlign:'center'}}>
                      <h2 style={{fontSize:'32px', margin:'10px 0'}}>Rs. 450</h2>
                      <button className="btn-main" onClick={() => setScreen('active')}>Confirm Ride</button>
                    </div>
                  )}
                </div>
                
                <h3 style={{margin:'20px 0 10px'}}>Cricket Leagues & Tickets</h3>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
                  {cricketLeagues.map((league, i) => (
                    <div key={i} className="card" style={{textAlign:'center', padding:'15px'}} onClick={() => window.open(league.url, '_blank')}>
                      <span style={{fontSize:'24px'}}>{league.icon}</span>
                      <p style={{fontSize:'12px', margin:'5px 0 0'}}>{league.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {screen === 'active' && (
              <div className="card blink" style={{border:'2px solid var(--accent)'}}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <div><b>Ali Khan</b><br/><small>Suzuki Alto (LEB-442)</small></div>
                  <div style={{background:'var(--red)', padding:'10px', borderRadius:'50%'}}><AlertCircle /></div>
                </div>
                <div style={{display:'flex', gap:'10px', marginTop:'15px'}}>
                  <button className="btn-main" style={{background:'var(--green)'}}><Phone size={18}/> Call</button>
                  <button className="btn-main"><MessageSquare size={18}/> Chat</button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* --- DRIVER APP STRUCTURE --- */
          <>
            <div style={{textAlign:'center', marginBottom:'20px'}}>
              <button className="btn-main" style={{background: isOnline ? 'var(--red)' : 'var(--green)'}} onClick={() => setIsOnline(!isOnline)}>
                {isOnline ? 'Go Offline' : 'Go Online'}
              </button>
            </div>
            
            <div className="card" style={{height:'200px', display:'flex', flexDirection:'column', justifyContent:'center', textAlign:'center', borderStyle: isOnline ? 'solid' : 'dashed'}}>
              {isOnline ? (
                <div><div className="blink" style={{color:'var(--green)'}}>● Searching for Riders...</div></div>
              ) : (
                <p style={{color:'#64748b'}}>You are currently offline</p>
              )}
            </div>

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
              <div className="card" style={{textAlign:'center'}}><DollarSign/><br/><small>Earnings</small></div>
              <div className="card" style={{textAlign:'center'}}><Shield/><br/><small>Registration</small></div>
            </div>
          </>
        )}
      </main>

      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div onClick={() => setScreen('home')} style={{textAlign:'center'}}><Navigation size={22}/><br/><small style={{fontSize:'9px'}}>Home</small></div>
        <div onClick={() => setScreen('home')} style={{textAlign:'center'}}><Ticket size={22}/><br/><small style={{fontSize:'9px'}}>Tickets</small></div>
        <div style={{textAlign:'center'}}><CreditCard size={22}/><br/><small style={{fontSize:'9px'}}>Payments</small></div>
        <div style={{textAlign:'center'}}><User size={22}/><br/><small style={{fontSize:'9px'}}>Profile</small></div>
      </nav>
    </div>
  );
}

// GoSmart Backend Core Service
const GoSmartBackend = {
  // رول: ٹکٹ پر 1.5% کمیشن، رائیڈ پر 0%
  processPayment: (type, amount, userId) => {
    const commission = type === 'ticket' ? amount * 0.015 : 0;
    const total = amount + commission;
    
    // رول: ٹکٹ بائر اگر رجسٹرڈ نہیں تو آٹو رجسٹر کریں
    if (type === 'ticket') {
      this.autoRegister(userId);
    }
    
    return { 
      transactionId: `GS-${Math.random().toString(36).toUpperCase().substr(2, 9)}`,
      payable: total,
      commissionAdded: commission
    };
  },

  // ڈرائیور رجسٹریشن رول (Mandatory)
  validateDriver: (docs) => {
    if (!docs.cnic || !docs.license) return { status: 'rejected', msg: 'Documents Missing' };
    return { status: 'approved' };
  }
};

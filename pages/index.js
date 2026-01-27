import React, { useState, useEffect } from 'react';
import { 
  Home, User, Ticket, Trophy, Lock, ArrowLeft, 
  DollarSign, CreditCard, Shield, AlertTriangle 
} from 'lucide-react';

export default function GoSmartApp() {
  // --- 1. پرانی اور نئی اسٹیٹس (States) ---
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [externalUrl, setExternalUrl] = useState(null);
  const [showPrivacy, setShowPrivacy] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  
  // ایڈمن اور والٹ اسٹیٹس
  const [adminData, setAdminData] = useState({ rideStatus: 'Active', emergencyMode: false });
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [commissionLedger, setCommissionLedger] = useState([]);
  
  // رائیڈ اور سیکیورٹی
  const [rideActive, setRideActive] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);
  const [lastOnlineTime, setLastOnlineTime] = useState(Date.now());
  const [invoiceData, setInvoiceData] = useState(null);

  // --- 2. ایفیکٹس (Effects) ---
  useEffect(() => {
    // انٹرنیٹ مانیٹرنگ
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    
    // SOS ہارٹ بیٹ
    const heartbeat = setInterval(() => {
      if (rideActive) setLastOnlineTime(Date.now());
    }, 15000);

    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
      clearInterval(heartbeat);
    };
  }, [rideActive]);

  // --- 3. فنکشنز (Functions) ---
  const generateInvoice = (type, amount) => {
    const comm = Math.round(amount * 0.015);
    setInvoiceData({
      id: "GS-" + Date.now(),
      type,
      date: new Date().toLocaleString(),
      details: { amount, commission: comm, net: amount - comm }
    });
    // والٹ میں کمیشن شامل کریں
    setWalletBalance(prev => prev + comm);
    setCommissionLedger(prev => [{ id: Date.now(), source: type, amount, commission: comm }, ...prev]);
  };

  return (
    <div style={{ background: '#1a1c2c', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', direction: 'rtl' }}>
      
      {/* آف لائن الرٹ */}
      {!isOnline && (
        <div style={{ background: '#ef4444', textAlign: 'center', padding: '5px', fontSize: '12px', position: 'fixed', top: 0, width: '100%', zIndex: 10000 }}>
          انٹرنیٹ کنکشن نہیں ہے — ایپ آف لائن موڈ میں ہے
        </div>
      )}

      {/* --- پرائیویسی پالیسی --- */}
      {showPrivacy && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zMount: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#252945', padding: '25px', borderRadius: '20px', textAlign: 'center', maxWidth: '400px', border: '1px solid #3f51b5' }}>
            <Shield size={50} color="#22c55e" style={{ marginBottom: '15px' }} />
            <h3>خوش آمدید! پرائیویسی پالیسی</h3>
            <p style={{ fontSize: '13px', color: '#ccc', margin: '15px 0' }}>GoSmart آپ کا ڈیٹا صرف سروس اور 1.5% کمیشن کے لیے استعمال کرتا ہے۔</p>
            <button onClick={() => setShowPrivacy(false)} style={{ width: '100%', background: '#22c55e', color: 'black', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold' }}>میں متفق ہوں</button>
          </div>
        </div>
      )}

      {/* --- انوائس پاپ اپ --- */}
      {invoiceData && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', color: 'black', padding: '20px', borderRadius: '15px', width: '85%' }}>
            <h3 style={{ textAlign: 'center' }}>GoSmart آفیشل رسید</h3>
            <hr />
            <p>آئی ڈی: {invoiceData.id}</p>
            <p>سروس: {invoiceData.type}</p>
            <p>کل رقم: Rs. {invoiceData.details.amount}</p>
            <p style={{ color: 'green' }}>کمیشن (1.5%): Rs. {invoiceData.details.commission}</p>
            <button onClick={() => setInvoiceData(null)} style={{ width: '100%', marginTop: '15px', padding: '10px', background: '#1a1c2c', color: 'white', borderRadius: '8px' }}>بند کریں</button>
          </div>
        </div>
      )}

      {/* --- ہوم اسکرین (ٹرائینگل نیویگیشن) --- */}
      {currentScreen === 'home' && !externalUrl && (
        <div style={{ paddingTop: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '70vh', gap: '10px', padding: '15px' }}>
            <div onClick={() => setCurrentScreen('registration')} style={{ background: 'linear-gradient(135deg, #1a237e, #3f51b5)', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <User size={40} /> <span>رجسٹر کریں</span>
            </div>
            <div onClick={() => setCurrentScreen('tickets')} style={{ background: 'linear-gradient(135deg, #283593, #1a1c2c)', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Ticket size={40} /> <span>ٹکٹس</span>
            </div>
            <div onClick={() => setExternalUrl('https://www.icc-cricket.com')} style={{ background: 'linear-gradient(135deg, #303f9f, #252945)', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Trophy size={40} /> <span>اسپورٹس</span>
            </div>
            <div onClick={() => setCurrentScreen('wallet')} style={{ background: 'linear-gradient(135deg, #3949ab, #1a237e)', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={40} /> <span>والٹ / آمدن</span>
            </div>
          </div>
        </div>
      )}

      {/* --- ایڈمن پینل --- */}
      {currentScreen === 'admin' && (
        <div style={{ padding: '20px' }}>
          <ArrowLeft onClick={() => setCurrentScreen('home')} style={{ marginBottom: '20px' }} />
          {!isAdminAuthenticated ? (
            <div style={{ textAlign: 'center' }}>
              <Lock size={50} style={{ marginBottom: '20px' }} />
              <input type="password" placeholder="پاس ورڈ" onChange={(e)=>setAdminPassword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', marginBottom: '10px' }} />
              <button onClick={() => adminPassword === '1234' ? setIsAdminAuthenticated(true) : alert('غلط پاس ورڈ')} style={{ width: '100%', padding: '10px', background: '#fbbf24', color: 'black', borderRadius: '8px' }}>لاگ ان</button>
            </div>
          ) : (
            <div>
              <h3>ایڈمن کنٹرول</h3>
              <button onClick={() => setAdminData({...adminData, rideStatus: 'Maintenance'})} style={{ width: '100%', padding: '10px', background: '#444', color: 'white', borderRadius: '8px' }}>سروس بند کریں</button>
            </div>
          )}
        </div>
      )}

      {/* --- والٹ اسکرین --- */}
      {currentScreen === 'wallet' && (
        <div style={{ padding: '20px' }}>
          <ArrowLeft onClick={() => setCurrentScreen('home')} />
          <div style={{ background: '#252945', padding: '20px', borderRadius: '15px', marginTop: '20px', borderLeft: '5px solid #22c55e' }}>
            <p>کل آمدن (والٹ)</p>
            <h2 style={{ color: '#22c55e' }}>Rs. {walletBalance}</h2>
          </div>
          <h4 style={{ marginTop: '20px' }}>حالیہ ٹرانزیکشنز</h4>
          {commissionLedger.map(item => (
            <div key={item.id} style={{ background: '#1a1c2c', padding: '10px', borderRadius: '10px', marginBottom: '5px', fontSize: '12px' }}>
              {item.source} - Rs. {item.amount} | کمیشن: Rs. {item.commission}
            </div>
          ))}
        </div>
      )}

      {/* --- براؤزر --- */}
      {externalUrl && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'white' }}>
          <div style={{ background: '#1a1c2c', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ArrowLeft onClick={() => setExternalUrl(null)} color="white" />
            <span style={{ color: 'white' }}>GoSmart Browser</span>
          </div>
          <iframe src={externalUrl} style={{ width: '100%', height: 'calc(100% - 50px)', border: 'none' }}></iframe>
        </div>
      )}

      {/* --- فٹر نیویگیشن --- */}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', background: '#1a1c2c', display: 'flex', justifyContent: 'space-around', padding: '15px', borderTop: '1px solid #333' }}>
        <Home onClick={() => setCurrentScreen('home')} color={currentScreen === 'home' ? '#fbbf24' : 'white'} />
        <DollarSign onClick={() => setCurrentScreen('wallet')} color={currentScreen === 'wallet' ? '#fbbf24' : 'white'} />
        <User onClick={() => setCurrentScreen('admin')} color={currentScreen === 'admin' ? '#fbbf24' : 'white'} />
      </div>

    </div>
  );
}

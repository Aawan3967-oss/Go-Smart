const [showPrivacy, setShowPrivacy] = useState(true);
const [privacyAccepted, setPrivacyAccepted] = useState(false);

useEffect(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
    setShowBtn(true);
    setShowPrivacy(true);
  });
}, []);

{showPrivacy && (
  <div style={{
    position:'fixed', inset:0, zIndex:6000,
    background:'rgba(0,0,0,0.85)',
    display:'flex', alignItems:'center', justifyContent:'center'
  }}>
    <div className="indigo-card" style={{maxWidth:'500px'}}>
      <h3 style={{color:'var(--green)'}}>Privacy Policy</h3>
      <p style={{fontSize:'12px', color:'var(--text-muted)'}}>
        GoSmart آپ کی لوکیشن، رائیڈ اور ٹکٹ ڈیٹا صرف سروس فراہم کرنے
        اور 1.5% کمیشن کیلکولیشن کے لیے استعمال کرتا ہے۔
        کوئی ذاتی معلومات عوامی نہیں کی جاتیں۔
      </p>

      <button
        className="primary-btn"
        onClick={()=>{
          setPrivacyAccepted(true);
          setShowPrivacy(false);
        }}
      >
        I Agree & Continue
      </button>
    </div>
  </div>
)}

const [termsAccepted, setTermsAccepted] = useState(false);
<div style={{display:'flex', gap:'10px', alignItems:'center', marginBottom:'15px'}}>
  <input
    type="checkbox"
    checked={termsAccepted}
    onChange={(e)=>setTermsAccepted(e.target.checked)}
  />
  <small style={{fontSize:'12px', color:'var(--text-muted)'}}>
    میں GoSmart کے Terms & Conditions اور 1.5% کمیشن سے متفق ہوں
  </small>
</div>

<button
  className="primary-btn"
  disabled={!termsAccepted}
  style={{opacity: termsAccepted ? 1 : 0.5}}
  onClick={()=>setCurrentScreen('home')}
>
  رجسٹریشن مکمل کریں
</button>
const [showHomeGrid, setShowHomeGrid] = useState(true);
{currentScreen === 'home' && showHomeGrid && (
  <div style={{
    position:'fixed', inset:0, zIndex:4000,
    display:'grid',
    gridTemplateColumns:'1fr 1fr',
    gridTemplateRows:'1fr 1fr'
  }}>
    <div onClick={()=>setShowHomeGrid(false)}
      style={{background:'#1a237e',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <img src="/IMG_20260124_084929.JPG" style={{width:'80px'}}/>
    </div>

    <div onClick={()=>{setShowHomeGrid(false); setCurrentScreen('registration')}}
      style={{background:'#283593',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <h3>Register</h3>
    </div>

    <div onClick={()=>{setShowHomeGrid(false); setCurrentScreen('tickets')}}
      style={{background:'#303f9f',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <h3>Tickets</h3>
    </div>

    <div onClick={()=>{setShowHomeGrid(false); setExternalUrl('https://www.icc-cricket.com')}}
      style={{background:'#3949ab',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <h3>Sports</h3>
    </div>
  </div>
)}

.triangle-grid {
  position: fixed;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  z-index: 4000;
}

.triangle {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.25s ease;
}

.triangle:hover {
  transform: scale(1.03);
}

/* Individual triangles */
.tri-logo {
  background: #1a237e;
  clip-path: polygon(0 0, 100% 0, 0 100%);
}

.tri-register {
  background: #283593;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}

.tri-tickets {
  background: #303f9f;
  clip-path: polygon(0 100%, 100% 100%, 0 0);
}

.tri-sports {
  background: #3949ab;
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
}

{currentScreen === 'home' && showHomeGrid && (
  <div className="triangle-grid">

    <div
      className="triangle tri-logo"
      onClick={() => setShowHomeGrid(false)}
    >
      <img
        src="/IMG_20260124_084929.JPG"
        alt="GoSmart"
        style={{ width: '90px' }}
      />
    </div>

    <div
      className="triangle tri-register"
      onClick={() => {
        setShowHomeGrid(false);
        setCurrentScreen('registration');
      }}
    >
      <h3>Register</h3>
    </div>

    <div
      className="triangle tri-tickets"
      onClick={() => {
        setShowHomeGrid(false);
        setCurrentScreen('tickets');
      }}
    >
      <h3>Tickets</h3>
    </div>

    <div
      className="triangle tri-sports"
      onClick={() => {
        setShowHomeGrid(false);
        setExternalUrl('https://www.icc-cricket.com');
      }}
    >
      <h3>Sports</h3>
    </div>

  </div>
)}

@keyframes fadeScaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.triangle {
  animation: fadeScaleIn 0.6s ease forwards;
}

.triangle span.hint {
  position: absolute;
  bottom: 20px;
  font-size: 12px;
  opacity: 0.85;
  background: rgba(0,0,0,0.4);
  padding: 4px 8px;
  border-radius: 8px;
}

const [showHints, setShowHints] = useState(true);
useEffect(() => {
  if (showHomeGrid) {
    const t = setTimeout(() => setShowHints(false), 3000);
    return () => clearTimeout(t);
  }
}, [showHomeGrid]);
{showHints && <span className="hint">Welcome to GoSmart</span>}
 {showHints && <span className="hint">Start Here</span>}
  {showHints && <span className="hint">Tickets & Earnings</span>}
   {showHints && <span className="hint">Live Sports</span>}
    
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    useEffect(() => {
  const goOnline = () => setIsOnline(true);
  const goOffline = () => setIsOnline(false);

  window.addEventListener('online', goOnline);
  window.addEventListener('offline', goOffline);

  return () => {
    window.removeEventListener('online', goOnline);
    window.removeEventListener('offline', goOffline);
  };
}, []);
    .offline-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(90deg, #1a237e, #3949ab);
  color: #fff;
  text-align: center;
  padding: 8px;
  font-size: 13px;
  z-index: 7000;
}
   {!isOnline && (
  <div className="offline-banner">
    انٹرنیٹ کنکشن نہیں ہے — ایپ محفوظ حالت میں ہے
  </div>
)}
    const [rideActive, setRideActive] = useState(false);
const [emergencySent, setEmergencySent] = useState(false);
    const triggerEmergency = () => {
  if (emergencySent) return;

  setEmergencySent(true);

  // SMS (Backend / Gateway required)
  console.log("🚨 EMERGENCY SMS SENT");

  // Missed call trigger (tel link)
  window.location.href = "tel:EMERGENCY_NUMBER";
};
    useEffect(() => {
  const handleVisibility = () => {
    if (document.hidden && rideActive) {
      triggerEmergency();
    }
  };

  document.addEventListener("visibilitychange", handleVisibility);

  return () =>
    document.removeEventListener("visibilitychange", handleVisibility);
}, [rideActive]);
    useEffect(() => {
  if (!isOnline && rideActive) {
    triggerEmergency();
  }
}, [isOnline, rideActive]);
    setRideActive(true);
setEmergencySent(false);
    setRideActive(false);
setEmergencySent(false);
    {rideActive && (
  <div style={{
    position:'fixed',
    bottom:'10px',
    right:'10px',
    background:'#d32f2f',
    color:'#fff',
    padding:'6px 10px',
    borderRadius:'8px',
    fontSize:'12px',
    zIndex:6000
  }}>
    Safety Monitoring ON
  </div>
)}
  const COMMISSION_RATE = 0.015;
const [commissionAmount, setCommissionAmount] = useState(0);
const [userAcceptedPolicy, setUserAcceptedPolicy] = useState(false);
   useEffect(() => {
  if (fare > 0) {
    setCommissionAmount(Math.round(fare * COMMISSION_RATE));
  }
}, [fare]);
   {fare > 0 && (
  <div className="indigo-card" style={{border:'1px dashed var(--green)'}}>
    <h4 style={{marginBottom:'10px'}}>کرایہ کی تفصیل</h4>
    <p style={{fontSize:'13px'}}>بنیادی کرایہ: <strong>Rs. {fare}</strong></p>
    <p style={{fontSize:'13px', color:'var(--green)'}}>
      GoSmart سروس فیس (1.5%): Rs. {commissionAmount}
    </p>
    <small style={{color:'var(--text-muted)'}}>
      یہ فیس سیکیورٹی، SOS اور قانونی تحفظ کیلئے ہے
    </small>
  </div>
)}
<button
  className="primary-btn"
  disabled={!userAcceptedPolicy}
  onClick={() => {
    setRideActive(true);
    setCurrentScreen('active');
  }}
>
  رائیڈ کنفرم کریں
</button>
<div style={{marginTop:'15px', fontSize:'12px'}}>
  <label style={{display:'flex', gap:'8px', cursor:'pointer'}}>
    <input
      type="checkbox"
      onChange={(e)=>setUserAcceptedPolicy(e.target.checked)}
    />
    میں GoSmart کی 
    <span style={{color:'var(--green)'}}> Privacy Policy </span>
    اور 
    <span style={{color:'var(--green)'}}> Terms & Conditions </span>
    سے متفق ہوں
  </label>
</div>
<div style={{
  background:'rgba(34,197,94,0.1)',
  padding:'8px',
  borderRadius:'8px',
  fontSize:'11px',
  marginBottom:'10px'
}}>
  💰 ہر بکنگ پر GoSmart کا 1.5% شفاف کمیشن لاگو
</div>
<style jsx global>{`
:root{
  --indigo:#1a1c2c;
  --indigo-dark:#0f1120;
  --accent:#3f51b5;
  --green:#22c55e;
}

.triangle-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  height:100vh;
}

.triangle{
  position:relative;
  clip-path:polygon(0 0,100% 0,0 100%);
  background:linear-gradient(135deg,var(--accent),var(--indigo-dark));
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  transition:0.4s;
}

.triangle.bottom{
  clip-path:polygon(100% 0,100% 100%,0 100%);
}

.triangle:hover{
  transform:scale(1.03);
  box-shadow:0 0 40px rgba(63,81,181,0.6);
}

.triangle-content{
  transform:rotate(-45deg);
  text-align:center;
  color:white;
}

.triangle-content h3{
  margin-top:10px;
  font-size:14px;
  letter-spacing:1px;
}
`}</style>
{currentScreen === 'home' && (
  {/* 🔺 HERO TRIANGLE NAVIGATION (PREMIUM) */}
<div className="triangle-grid">

  {/* LOGO */}
  <div
    className="triangle"
    onClick={()=>alert("GoSmart – Secure | Smart | Transparent")}
  >
    <div className="triangle-content">
      <img src="/IMG_20260124_084929.JPG" style={{width:'60px',borderRadius:'14px'}}/>
      <h3>GOSMART</h3>
    </div>
  </div>

  {/* REGISTER */}
  <div
    className="triangle bottom"
    onClick={()=>setCurrentScreen('registration')}
  >
    <div className="triangle-content">
      <User size={30}/>
      <h3>رجسٹر کریں</h3>
    </div>
  </div>

  {/* TICKETS */}
  <div
    className="triangle bottom"
    onClick={()=>setCurrentScreen('tickets')}
  >
    <div className="triangle-content">
      <Ticket size={30}/>
      <h3>ٹکٹس</h3>
    </div>
  </div>

  {/* SPORTS */}
  <div
    className="triangle"
    onClick={()=>setExternalUrl('https://www.icc-cricket.com')}
  >
    <div className="triangle-content">
      <Trophy size={30}/>
      <h3>اسپورٹس</h3>
    </div>
  </div>

</div>
const [lastOnlineTime, setLastOnlineTime] = useState(Date.now());
const [sosTriggered, setSosTriggered] = useState(false);
useEffect(() => {
  if (currentScreen !== 'active') return;

  const interval = setInterval(() => {
    const now = Date.now();
    const diff = (now - lastOnlineTime) / 1000;

    if (diff > 60 && !sosTriggered) {
      triggerEmergencySOS();
      setSosTriggered(true);
    }
  }, 5000);

  return () => clearInterval(interval);
}, [currentScreen, lastOnlineTime, sosTriggered]);
useEffect(() => {
  if (currentScreen !== 'active') return;

  const heartbeat = setInterval(() => {
    setLastOnlineTime(Date.now());
  }, 15000);

  return () => clearInterval(heartbeat);
}, [currentScreen]);
const triggerEmergencySOS = () => {
  alert(
    "⚠️ ایمرجنسی الرٹ!\n" +
    "ڈرائیور آف لائن ہو چکا ہے۔\n" +
    "ہنگامی رابطہ نمبر پر اطلاع بھیج دی گئی ہے۔"
  );

  // یہاں اصل ایپ میں:
  // SMS API
  // Missed Call API
  // WhatsApp fallback
};
<div style={{
  marginTop:'10px',
  fontSize:'12px',
  color: sosTriggered ? 'var(--red)' : 'var(--green)'
}}>
  {sosTriggered
    ? '🚨 ایمرجنسی الرٹ ایکٹیو ہے'
    : '🟢 ڈرائیور آن لائن مانیٹر ہو رہا ہے'}
</div>
const [driverRating, setDriverRating] = useState(5);
const [ratingGiven, setRatingGiven] = useState(false);
const [driverStrikes, setDriverStrikes] = useState(0);
const [driverSuspended, setDriverSuspended] = useState(false);
{!ratingGiven && (
  <div className="indigo-card" style={{marginTop:'15px'}}>
    <h4>ڈرائیور کو ریٹ کریں</h4>

    <div style={{display:'flex', gap:'8px', margin:'10px 0'}}>
      {[1,2,3,4,5].map(star => (
        <span
          key={star}
          onClick={()=>setDriverRating(star)}
          style={{
            fontSize:'26px',
            cursor:'pointer',
            color: star <= driverRating ? '#fbbf24' : '#555'
          }}
        >
          ★
        </span>
      ))}
    </div>

    <button
      className="primary-btn"
      onClick={()=>{
        submitRating();
        setRatingGiven(true);
      }}
    >
      ریٹنگ جمع کریں
    </button>
  </div>
)}
const submitRating = () => {
  if (driverRating <= 2) {
    setDriverStrikes(prev => prev + 1);
    alert("⚠️ کم ریٹنگ نوٹ کر لی گئی ہے");
  } else {
    alert("✅ شکریہ! آپ کی ریٹنگ محفوظ ہو گئی");
  }
};
useEffect(() => {
  if (driverStrikes >= 3) {
    setDriverSuspended(true);
    alert(
      "🚫 ڈرائیور اکاؤنٹ معطل!\n" +
      "بار بار کم ریٹنگ کی وجہ سے"
    );
  }
}, [driverStrikes]);
{driverSuspended && (
  <div style={{
    background:'rgba(239,68,68,0.15)',
    padding:'10px',
    borderRadius:'8px',
    color:'var(--red)',
    fontSize:'12px',
    marginTop:'10px'
  }}>
    🚫 یہ ڈرائیور سسٹم کے ذریعے خودکار طور پر معطل ہے
  </div>
)}
const [walletBalance, setWalletBalance] = useState(0);
const [commissionLedger, setCommissionLedger] = useState([]);
const addTicketCommission = (source, amount) => {
  const commission = Math.round(amount * 0.015);

  setWalletBalance(prev => prev + commission);

  setCommissionLedger(prev => [
    {
      id: Date.now(),
      source,
      amount,
      commission,
      time: new Date().toLocaleString()
    },
    ...prev
  ]);
};
addTicketCommission("PCB Tickets", 2000);
setExternalUrl(board.url);
<div className="indigo-card" style={{borderLeft:'5px solid var(--green)'}}>
  <small style={{color:'var(--text-muted)'}}>GoSmart Wallet</small>
  <h2 style={{margin:'10px 0', color:'var(--green)'}}>
    Rs. {walletBalance}
  </h2>
  <p style={{fontSize:'12px'}}>
    ٹکٹ بکنگ سے حاصل شدہ 1.5% کمیشن
  </p>
</div>
<div className="indigo-card" style={{marginTop:'20px'}}>
  <h4>کمیشن لیجر (Live)</h4>

  {commissionLedger.length === 0 && (
    <small style={{color:'var(--text-muted)'}}>
      ابھی کوئی ٹرانزیکشن نہیں
    </small>
  )}

  {commissionLedger.map(item => (
    <div
      key={item.id}
      style={{
        background:'#1a1c2c',
        padding:'12px',
        borderRadius:'10px',
        marginBottom:'8px',
        fontSize:'12px'
      }}
    >
      <strong>{item.source}</strong><br/>
      رقم: Rs. {item.amount}  
      | کمیشن: <span style={{color:'var(--green)'}}>Rs. {item.commission}</span><br/>
      <small style={{color:'var(--text-muted)'}}>{item.time}</small>
    </div>
  ))}
</div>
const [paymentMethod, setPaymentMethod] = useState(null);
const [showPayment, setShowPayment] = useState(false);
const [paymentSuccess, setPaymentSuccess] = useState(false);
const [autoRegistered, setAutoRegistered] = useState(false);
setShowPayment(true);
{showPayment && (
  <div style={{
    position:'fixed',
    inset:0,
    background:'rgba(0,0,0,0.8)',
    zIndex:6000,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  }}>
    <div className="indigo-card" style={{width:'90%',maxWidth:'420px'}}>

      <h3 style={{textAlign:'center'}}>ادائیگی کا طریقہ منتخب کریں</h3>

      {[
        {id:'card', label:'Credit / Debit Card'},
        {id:'easypaisa', label:'Easypaisa'},
        {id:'jazzcash', label:'JazzCash'}
      ].map(p => (
        <div
          key={p.id}
          className="input-field"
          onClick={()=>setPaymentMethod(p.id)}
          style={{
            cursor:'pointer',
            border: paymentMethod===p.id
              ? '2px solid var(--green)'
              : '1px solid #3f4264'
          }}
        >
          <CreditCard size={18}/>
          <span>{p.label}</span>
        </div>
      ))}

      <button
        className="primary-btn"
        disabled={!paymentMethod}
        onClick={()=>{
          setPaymentSuccess(true);
          setShowPayment(false);
          setAutoRegistered(true);
          alert("✅ ادائیگی کامیاب! اکاؤنٹ خودکار طور پر رجسٹر ہو گیا");
        }}
      >
        ادائیگی کریں
      </button>

      <button
        style={{
          marginTop:'10px',
          background:'transparent',
          color:'#aaa',
          border:'none'
        }}
        onClick={()=>setShowPayment(false)}
      >
        منسوخ کریں
      </button>

    </div>
  </div>
)}
useEffect(() => {
  if (paymentSuccess && !autoRegistered) {
    setAutoRegistered(true);
    console.log("User auto-registered via payment");
  }
}, [paymentSuccess]);
<small style={{fontSize:'11px', color:'var(--text-muted)'}}>
  ✔ ادائیگی کے ساتھ اکاؤنٹ خودکار طور پر رجسٹر ہو جائے گا  
  ✔ 1.5% GoSmart سروس فیس شامل
</small>
const [driverWallet, setDriverWallet] = useState(0);
const [driverLedger, setDriverLedger] = useState([]);
const [lastPayout, setLastPayout] = useState(null);
const addDriverEarning = (title, amount) => {
  setDriverWallet(prev => prev + amount);

  setDriverLedger(prev => [
    {
      id: Date.now(),
      title,
      amount,
      time: new Date().toLocaleString()
    },
    ...prev
  ]);
};
const payoutDriver = () => {
  if (driverWallet === 0) {
    alert("کوئی رقم دستیاب نہیں");
    return;
  }

  setLastPayout({
    amount: driverWallet,
    time: new Date().toLocaleString()
  });

  setDriverWallet(0);
  alert("✅ ڈرائیور کو رقم منتقل کر دی گئی");
};
<div className="indigo-card" style={{marginTop:'20px'}}>
  <small style={{color:'var(--text-muted)'}}>Driver Wallet</small>
  <h2 style={{color:'var(--green)'}}>Rs. {driverWallet}</h2>

  <button
    className="primary-btn"
    style={{marginTop:'10px'}}
    onClick={payoutDriver}
  >
    Weekly Payout
  </button>

  {lastPayout && (
    <small style={{display:'block',marginTop:'8px'}}>
      آخری ادائیگی: Rs. {lastPayout.amount}  
      <br/> {lastPayout.time}
    </small>
  )}
</div>
<div className="indigo-card" style={{marginTop:'15px'}}>
  <h4>آمدن کی تفصیل</h4>

  {driverLedger.length === 0 && (
    <small style={{color:'var(--text-muted)'}}>
      ابھی کوئی آمدن نہیں
    </small>
  )}

  {driverLedger.map(item => (
    <div
      key={item.id}
      style={{
        background:'#1a1c2c',
        padding:'10px',
        borderRadius:'10px',
        marginBottom:'6px',
        fontSize:'12px'
      }}
    >
      <strong>{item.title}</strong><br/>
      رقم: <span style={{color:'var(--green)'}}>Rs. {item.amount}</span><br/>
      <small>{item.time}</small>
    </div>
  ))}
</div>
const [invoiceData, setInvoiceData] = useState(null);
const generateInvoice = (type, details) => {
  setInvoiceData({
    id: "GS-" + Date.now(),
    type,
    details,
    date: new Date().toLocaleString()
  });
};
generateInvoice("Ticket", {
  amount: 2000,
  commission: 30,
  net: 1970
});
{invoiceData && (
  <div style={{
    position:'fixed',
    inset:0,
    background:'rgba(0,0,0,0.85)',
    zIndex:7000,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  }}>
    <div className="indigo-card" style={{width:'92%',maxWidth:'480px'}}>

      <h3 style={{textAlign:'center'}}>GoSmart رسید</h3>

      <p><strong>Invoice ID:</strong> {invoiceData.id}</p>
      <p><strong>قسم:</strong> {invoiceData.type}</p>
      <p><strong>تاریخ:</strong> {invoiceData.date}</p>

      <hr/>

      <p>کل رقم: Rs. {invoiceData.details.amount}</p>
      <p>
        کمیشن:
        <span style={{color:'var(--green)'}}>
          Rs. {invoiceData.details.commission}
        </span>
      </p>
      <p>ادا شدہ رقم: Rs. {invoiceData.details.net}</p>

      <small style={{color:'var(--text-muted)'}}>
        ✔ 1.5% GoSmart سروس فیس شامل  
        ✔ یہ رسید خودکار طور پر تیار کی گئی ہے
      </small>

      <button
        className="primary-btn"
        style={{marginTop:'15px'}}
        onClick={()=>window.print()}
      >
        PDF ڈاؤن لوڈ کریں
      </button>

      <button
        style={{
          marginTop:'10px',
          background:'transparent',
          color:'#aaa',
          border:'none'
        }}
        onClick={()=>setInvoiceData(null)}
      >
        بند کریں
      </button>

    </div>
  </div>
)}

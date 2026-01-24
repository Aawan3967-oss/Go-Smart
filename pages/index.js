import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Bike, Car, Bus, Info, ShieldCheck, CreditCard, Zap, Moon, 
  Tag, Star, Clock, Navigation, Shield, PhoneCall, MessageCircle, 
  Bell, Settings, History, Wallet, User, Menu, X, CheckCircle, LogIn, 
  DollarSign, Plane, Train, Ticket, Monitor, Trophy, Search, Plus, Minus,
  Eye, Filter, Share2, HelpCircle, Power, ChevronRight, Layout
} from 'lucide-react';

export default function GoSmartApp() {
  // --- بنیادی اسٹیٹس (States) ---
  const [view, setView] = useState('rider'); // rider, driver
  const [activeTab, setActiveTab] = useState('home'); // home, bookings, wallet, history
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: '', phone: '', vehicleNo: '', balance: 1500 });
  
  // --- رائیڈ بکنگ اسٹیٹس ---
  const [pickup, setPickup] = useState('میرا موجودہ مقام (Multan)');
  const [destination, setDestination] = useState('');
  const [vehicle, setVehicle] = useState('car');
  const [rateType, setRateType] = useState('standard'); 
  const [userOffer, setUserOffer] = useState(0);
  const [baseFare, setBaseFare] = useState(0);
  const [finalFare, setFinalFare] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // --- ٹکٹنگ اسٹیٹس (BookMe Style) ---
  const [bookingCategory, setBookingCategory] = useState('bus'); 
  const [ticketDetails, setTicketDetails] = useState({
    from: '', to: '', date: '', passengers: 1, stand: 'Standard'
  });
  const [rawPrice, setRawPrice] = useState(0);

  // --- ریٹ کارڈز (تفصیلی) ---
  const vehicleRates = {
    bike: { standard: 15, rush: 25, night: 30, promo: 12 },
    rickshaw: { standard: 30, rush: 40, night: 50, promo: 25 },
    car: { standard: 50, rush: 70, night: 85, promo: 45 },
    bus: { standard: 15, rush: 20, night: 25, promo: 10 }
  };

  // --- لاجک: کرایہ اور رجسٹریشن کا اثر ---
  useEffect(() => {
    if (destination.length > 2) {
      let calcBase = destination.length * vehicleRates[vehicle][rateType];
      setBaseFare(calcBase);
      
      // اگر یوزر رجسٹرڈ نہیں ہے تو 3% اضافی (Penalty)
      let penalty = isRegistered ? 0 : (calcBase * 0.03);
      let total = Math.round(calcBase + penalty);
      
      setFinalFare(total);
      setUserOffer(total);
    }
  }, [destination, vehicle, rateType, isRegistered]);

  // --- فنکشن: ٹکٹ کمیشن (1.5%) ---
  const calculateTotalTicketPrice = (price) => {
    const commission = price * 0.015;
    return {
      fee: Math.round(commission),
      total: Math.round(price + commission)
    };
  };

  // --- ہینڈلرز ---
  const completeRegistration = (e) => {
    e.preventDefault();
    setIsRegistered(true);
    setShowRegModal(false);
  };

  return (
    <div dir="rtl" style={{ backgroundColor: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'system-ui', paddingBottom: '100px' }}>
      <Head>
        <title>GoSmart - Super Transport & Ticket App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* --- کسٹم اسٹائلز --- */}
      <style jsx global>{`
        .main-card { background: #1e293b; border: 1px solid #334155; border-radius: 24px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .input-group { background: #0f172a; border: 1px solid #334155; border-radius: 16px; padding: 12px; display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .input-group input { background: transparent; border: none; color: white; outline: none; width: 100%; font-size: 16px; }
        .btn-primary { background: #22c55e; color: white; border: none; padding: 16px; border-radius: 16px; font-weight: bold; width: 100%; cursor: pointer; transition: 0.3s; }
        .btn-primary:active { transform: scale(0.95); }
        .category-item { flex: 1; text-align: center; padding: 15px 5px; border-radius: 18px; background: #0f172a; border: 2px solid transparent; cursor: pointer; }
        .category-item.active { border-color: #22c55e; background: rgba(34, 197, 94, 0.1); }
        .badge-penalty { background: #facc15; color: #000; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: bold; }
        .sidebar-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 1000; }
      `}</style>

      {/* --- ہیڈر پینل --- */}
      <nav style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, zIndex: 100 }}>
        <Menu size={24} color="#94a3b8" />
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '22px', margin: 0, color: '#22c55e', fontWeight: '900' }}>GoSmart</h1>
          <small style={{ color: '#64748b' }}>Super Transport</small>
        </div>
        <div style={{ position: 'relative' }}>
          <Bell size={24} color="#94a3b8" />
          <span style={{ position: 'absolute', top: -2, right: -2, background: '#ef4444', width: '8px', height: '8px', borderRadius: '50%' }}></span>
        </div>
      </nav>

      {/* --- رجسٹریشن ماڈل (تفصیلی) --- */}
      {(showRegModal || (view === 'driver' && !isRegistered)) && (
        <div className="sidebar-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="main-card" style={{ width: '90%', maxWidth: '400px', background: '#0f172a' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <User size={48} color="#22c55e" />
              <h2>{view === 'driver' ? 'ڈرائیور رجسٹریشن' : 'یوزر رجسٹریشن'}</h2>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>{view === 'driver' ? 'سروس شروع کرنے کے لیے رجسٹر کریں' : 'رجسٹر کریں اور 3% ٹیکس بچائیں'}</p>
            </div>
            <form onSubmit={completeRegistration}>
              <div className="input-group"><User size={18}/><input placeholder="پورا نام" required /></div>
              <div className="input-group"><PhoneCall size={18}/><input placeholder="فون نمبر" required /></div>
              {view === 'driver' && <div className="input-group"><Car size={18}/><input placeholder="گاڑی کا نمبر" required /></div>}
              {view === 'driver' && <div className="input-group"><Shield size={18}/><input placeholder="شناختی کارڈ نمبر" required /></div>}
              
              <button type="submit" className="btn-primary">رجسٹریشن مکمل کریں</button>
              {view === 'rider' && (
                <button type="button" onClick={() => setShowRegModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', width: '100%', marginTop: '15px' }}>
                  بعد میں (3% اضافی کرایہ کے ساتھ جاری رکھیں)
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* --- ٹاپ سوئچر --- */}
      <div style={{ display: 'flex', padding: '15px', gap: '10px' }}>
        <button onClick={() => setView('rider')} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: view === 'rider' ? '#22c55e' : '#1e293b', color: 'white', fontWeight: 'bold' }}>سواری (Rider)</button>
        <button onClick={() => setView('driver')} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: view === 'driver' ? '#22c55e' : '#1e293b', color: 'white', fontWeight: 'bold' }}>ڈرائیور (Driver)</button>
      </div>

      <main style={{ padding: '0 15px' }}>
        
        {/* --- سیکشن 1: رائیڈر ہوم (Uber/InDrive Style) --- */}
        {activeTab === 'home' && view === 'rider' && (
          <div className="main-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ fontWeight: 'bold' }}>سواری بک کریں</span>
              {!isRegistered && <span className="badge-penalty">3% ٹیکس لاگو ہے</span>}
            </div>

            <div className="input-group"><Navigation size={18} color="#22c55e"/><input value={pickup} readOnly /></div>
            <div className="input-group"><MapPin size={18} color="#ef4444"/><input placeholder="کہاں جانا ہے؟ (Drop-off)" onChange={(e) => setDestination(e.target.value)} /></div>

            <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
              <div onClick={() => setVehicle('bike')} className={`category-item ${vehicle === 'bike' ? 'active' : ''}`}><Bike/><br/><small>بائیک</small></div>
              <div onClick={() => setVehicle('rickshaw')} className={`category-item ${vehicle === 'rickshaw' ? 'active' : ''}`}><Info/><br/><small>رکشہ</small></div>
              <div onClick={() => setVehicle('car')} className={`category-item ${vehicle === 'car' ? 'active' : ''}`}><Car/><br/><small>کار</small></div>
              <div onClick={() => setVehicle('bus')} className={`category-item ${vehicle === 'bus' ? 'active' : ''}`}><Bus/><br/><small>بس</small></div>
            </div>

            {finalFare > 0 && (
              <div style={{ background: '#0f172a', padding: '15px', borderRadius: '20px', textAlign: 'center' }}>
                <small style={{ color: '#94a3b8' }}>آپ کی پیشکش (InDrive Style)</small>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '25px', margin: '10px 0' }}>
                  <button onClick={() => setUserOffer(userOffer - 20)} style={{ background: '#1e293b', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', fontSize: '20px' }}>−</button>
                  <h2 style={{ fontSize: '42px', color: '#22c55e', margin: 0 }}>Rs. {userOffer}</h2>
                  <button onClick={() => setUserOffer(userOffer + 20)} style={{ background: '#1e293b', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', fontSize: '20px' }}>+</button>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                  <button onClick={() => setPaymentMethod('cash')} className={`input-group ${paymentMethod === 'cash' ? 'active' : ''}`} style={{ flex: 1, justifyContent: 'center', margin: 0 }}><DollarSign size={16}/> نقد</button>
                  <button onClick={() => setPaymentMethod('wallet')} className={`input-group ${paymentMethod === 'wallet' ? 'active' : ''}`} style={{ flex: 1, justifyContent: 'center', margin: 0 }}><CreditCard size={16}/> والٹ</button>
                </div>

                <button className="btn-primary" onClick={() => alert("درخواست بھیج دی گئی!")}>رائیڈ کی تلاش شروع کریں</button>
              </div>
            )}
          </div>
        )}

        {/* --- سیکشن 2: ٹکٹنگ پورٹل (BookMe Style) --- */}
        {activeTab === 'bookings' && (
          <div className="main-card">
            <h3 style={{ textAlign: 'center', color: '#22c55e' }}>ٹکٹنگ اور ایونٹس</h3>
            <p style={{ textAlign: 'center', fontSize: '11px', color: '#64748b', marginTop: '-10px' }}>1.5% سروس فیس کے ساتھ محفوظ بکنگ</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', margin: '20px 0' }}>
              <div onClick={() => {setBookingCategory('bus'); setRawPrice(1200)}} className={`category-item ${bookingCategory === 'bus' ? 'active' : ''}`}><Bus size={20}/><br/><small>بس</small></div>
              <div onClick={() => {setBookingCategory('flight'); setRawPrice(15000)}} className={`category-item ${bookingCategory === 'flight' ? 'active' : ''}`}><Plane size={20}/><br/><small>فلائٹ</small></div>
              <div onClick={() => {setBookingCategory('train'); setRawPrice(2500)}} className={`category-item ${bookingCategory === 'train' ? 'active' : ''}`}><Train size={20}/><br/><small>ٹرین</small></div>
              <div onClick={() => {setBookingCategory('cinema'); setRawPrice(800)}} className={`category-item ${bookingCategory === 'cinema' ? 'active' : ''}`}><Monitor size={20}/><br/><small>سینیما</small></div>
              <div onClick={() => {setBookingCategory('event'); setRawPrice(2000)}} className={`category-item ${bookingCategory === 'event' ? 'active' : ''}`}><Trophy size={20}/><br/><small>اسپورٹس</small></div>
              <div onClick={() => {setBookingCategory('full-bus'); setRawPrice(45000)}} className={`category-item ${bookingCategory === 'full-bus' ? 'active' : ''}`}><Plus size={20}/><br/><small>پوری بس</small></div>
            </div>

            <div className="input-group"><Search size={18}/><input placeholder={`${bookingCategory} سرچ کریں (مثلاً لاہور سے کراچی)`} /></div>
            
            {/* اسٹیڈیم اسٹینڈ / سیٹ سلیکشن ڈیمو */}
            <div style={{ background: '#0f172a', padding: '15px', borderRadius: '16px', marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span>ٹکٹ کی اصل قیمت:</span>
                <span>Rs. {rawPrice}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#22c55e', marginBottom: '8px' }}>
                <span>سروس فیس (1.5%):</span>
                <span>Rs. {calculateTotalTicketPrice(rawPrice).fee}</span>
              </div>
              <div style={{ borderTop: '1px solid #334155', paddingWeight: '10px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>کل رقم:</span>
                <span style={{ fontSize: '20px' }}>Rs. {calculateTotalTicketPrice(rawPrice).total}</span>
              </div>
              
              <div style={{ marginTop: '15px' }}>
                <small style={{ color: '#64748b' }}>اسٹینڈ / کلاس منتخب کریں:</small>
                <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                  {['Standard', 'VIP', 'VVIP'].map(s => (
                    <button key={s} style={{ flex: 1, padding: '5px', fontSize: '10px', background: '#1e293b', border: '1px solid #334155', borderRadius: '5px', color: 'white' }}>{s}</button>
                  ))}
                </div>
              </div>

              <button className="btn-primary" style={{ marginTop: '20px' }}>ابھی ٹکٹ بک کریں</button>
            </div>
          </div>
        )}

        {/* --- سیکشن 3: ڈرائیور پینل (تفصیلی) --- */}
        {view === 'driver' && (
          <div className="main-card" style={{ textAlign: 'center' }}>
            <div style={{ background: '#0f172a', padding: '20px', borderRadius: '20px', marginBottom: '20px' }}>
              <Power size={40} color={isRegistered ? "#22c55e" : "#64748b"} />
              <h3>{isRegistered ? "آپ آن لائن ہیں" : "رجسٹریشن درکار ہے"}</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>ڈرائیور ID: {isRegistered ? "GS-9921" : "نامعلوم"}</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ background: '#1e293b', padding: '15px', borderRadius: '15px' }}>
                <small>آج کی کمائی</small>
                <h3 style={{ margin: 0, color: '#22c55e' }}>Rs. 0</h3>
              </div>
              <div style={{ background: '#1e293b', padding: '15px', borderRadius: '15px' }}>
                <small>ٹوٹل رائیڈز</small>
                <h3 style={{ margin: 0 }}>0</h3>
              </div>
            </div>

            <div style={{ marginTop: '30px', padding: '20px', border: '2px dashed #334155', borderRadius: '20px' }}>
               <Clock size={30} style={{ marginBottom: '10px' }} />
               <p style={{ color: '#94a3b8' }}>نئی سواریوں کا ڈیٹا بیس سے انتظار کیا جا رہا ہے...</p>
            </div>
          </div>
        )}

        {/* --- سیکشن 4: والٹ (Wallet) --- */}
        {activeTab === 'wallet' && (
          <div className="main-card">
            <h3>میرا گو-اسمارٹ والٹ</h3>
            <div style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', padding: '30px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: -20, top: -20, opacity: 0.2 }}><Wallet size={100} /></div>
              <small>دستیاب بیلنس</small>
              <h1 style={{ fontSize: '40px', margin: '5px 0' }}>Rs. {userProfile.balance}</h1>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button style={{ padding: '5px 15px', borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white' }}>+ رقم جمع کریں</button>
              </div>
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <h4>حالیہ ٹرانزیکشنز</h4>
              {[1,2].map(i => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #334155' }}>
                  <div><small>رائیڈ پیمنٹ</small><br/><b>لاہور ٹو قصور</b></div>
                  <div style={{ color: '#ef4444' }}>-Rs. 450</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* --- فائنل باٹم نیویگیشن (تمام بٹنز فعال) --- */}
      <footer style={{ position: 'fixed', bottom: 0, width: '100%', background: '#0f172a', display: 'flex', justifyContent: 'space-around', padding: '15px 5px', borderTop: '1px solid #1e293b', zIndex: 200 }}>
        <div onClick={() => setActiveTab('home')} style={{ textAlign: 'center', color: activeTab === 'home' ? '#22c55e' : '#64748b', cursor: 'pointer' }}>
          <Navigation size={24} /><br/><small style={{ fontSize: '10px' }}>ہوم</small>
        </div>
        <div onClick={() => setActiveTab('bookings')} style={{ textAlign: 'center', color: activeTab === 'bookings' ? '#22c55e' : '#64748b', cursor: 'pointer' }}>
          <Ticket size={24} /><br/><small style={{ fontSize: '10px' }}>بکنگ</small>
        </div>
        <div onClick={() => setActiveTab('wallet')} style={{ textAlign: 'center', color: activeTab === 'wallet' ? '#22c55e' : '#64748b', cursor: 'pointer' }}>
          <Wallet size={24} /><br/><small style={{ fontSize: '10px' }}>والٹ</small>
        </div>
        <div onClick={() => setActiveTab('history')} style={{ textAlign: 'center', color: activeTab === 'history' ? '#22c55e' : '#64748b', cursor: 'pointer' }}>
          <History size={24} /><br/><small style={{ fontSize: '10px' }}>تاریخ</small>
        </div>
        <div onClick={() => setShowRegModal(true)} style={{ textAlign: 'center', color: isRegistered ? '#22c55e' : '#64748b', cursor: 'pointer' }}>
          <User size={24} /><br/><small style={{ fontSize: '10px' }}>پروفائل</small>
        </div>
      </footer>
    </div>
  );
}

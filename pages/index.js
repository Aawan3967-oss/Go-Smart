import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  Navigation, MapPin, Phone, MessageSquare, AlertCircle, 
  Ticket, CreditCard, History, User, Trophy, Plane, 
  ArrowLeft, Search, CheckCircle, Menu, Bell
} from 'lucide-react';

export default function RiderApp() {
  // --- سٹرکچر کے مطابق اسٹیٹس ---
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [pickup, setPickup] = useState('کرنٹ لوکیشن (Multan)');
  const [destination, setDestination] = useState('');
  const [fare, setFare] = useState(0);
  const [offer, setOffer] = useState(0);

  // 1. Splash Logic
  useEffect(() => {
    if (currentScreen === 'splash') {
      setTimeout(() => setCurrentScreen('home'), 2000);
    }
  }, [currentScreen]);

  // 2. AutoPrice Logic
  useEffect(() => {
    if (destination.length > 3) {
      const estimatedPrice = 350; // فرضی کیلکولیشن
      setFare(estimatedPrice);
      setOffer(estimatedPrice);
    }
  }, [destination]);

  return (
    <div className="mobile-container">
      <Head>
        <title>GoSmart Rider</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>

      <style jsx global>{`
        body { margin: 0; background: #1a1c2c; color: white; font-family: sans-serif; }
        .mobile-container { max-width: 450px; margin: 0 auto; min-height: 100vh; position: relative; background: #1a1c2c; }
        .indigo-card { background: #282a44; border: 1px solid #3f4264; border-radius: 20px; padding: 20px; margin-bottom: 15px; }
        .input-group { background: #212339; border: 1px solid #3f4264; border-radius: 12px; padding: 12px; display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .input-group input { background: none; border: none; color: white; width: 100%; outline: none; }
        .btn-accent { background: #3f51b5; color: white; border: none; padding: 15px; border-radius: 12px; width: 100%; font-weight: bold; cursor: pointer; }
        .nav-bar { position: fixed; bottom: 0; width: 100%; max-width: 450px; background: #212339; display: flex; justify-content: space-around; padding: 15px 0; border-top: 1px solid #3f4264; }
        .nav-item { display: flex; flex-direction: column; align-items: center; font-size: 10px; color: #64748b; cursor: pointer; }
        .nav-active { color: #22c55e; }
        .sos-btn { background: #ef4444; border-radius: 50%; padding: 10px; animation: pulse 1s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
      `}</style>

      {/* --- 1. SPLASH --- */}
      {currentScreen === 'splash' && (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/IMG_20260124_084929.JPG" style={{ width: '100px', borderRadius: '20px' }} />
          <h1 style={{ color: '#22c55e', marginTop: '15px' }}>GoSmart</h1>
        </div>
      )}

      {/* --- 2. HOME (Pickup, Drop, AutoPrice, Offer, Confirm) --- */}
      {currentScreen === 'home' && (
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}><Menu /><Bell /></div>
          <div className="indigo-card">
            <div className="input-group"><Navigation size={18} color="#22c55e" /><input value={pickup} readOnly /></div>
            <div className="input-group"><MapPin size={18} color="#ef4444" /><input placeholder="منزل لکھیں" onChange={(e)=>setDestination(e.target.value)} /></div>
            
            {fare > 0 && (
              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <small style={{ color: '#94a3b8' }}>AutoPrice: Rs. {fare}</small>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', margin: '15px 0' }}>
                  <button onClick={()=>setOffer(offer-10)} style={{ border: 'none', background: '#3f4264', color: 'white', borderRadius: '50%', width: '35px', height: '35px' }}>-</button>
                  <h1 style={{ margin: 0 }}>{offer}</h1>
                  <button onClick={()=>setOffer(offer+10)} style={{ border: 'none', background: '#3f4264', color: 'white', borderRadius: '50%', width: '35px', height: '35px' }}>+</button>
                </div>
                <button className="btn-accent" onClick={()=>setCurrentScreen('active')}>Confirm Ride</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- 3. ACTIVE RIDE (LiveMap, Info, Call/Chat, SOS) --- */}
      {currentScreen === 'active' && (
        <div style={{ height: '100vh' }}>
          <div style={{ height: '50%', background: '#1e2030', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#64748b' }}>[ Live Map View ]</span>
          </div>
          <div style={{ padding: '20px' }}>
            <div className="indigo-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><b>عمران علی</b><br/><small>White Corolla (ABC-123)</small></div>
                <div className="sos-btn"><AlertCircle size={24} color="white" /></div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button className="btn-accent" style={{ background: '#22c55e', flex: 1 }}><Phone size={18} /> Call</button>
                <button className="btn-accent" style={{ flex: 1 }}><MessageSquare size={18} /> Chat</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 4. TICKETS (Cricket, Travel, Checkout with 1.5%) --- */}
      {currentScreen === 'tickets' && (
        <div style={{ padding: '20px' }}>
          <h3 style={{ borderBottom: '1px solid #3f4264', paddingBottom: '10px' }}>Tickets</h3>
          <div className="indigo-card" onClick={()=>setCurrentScreen('payments')}>
            <div style={{ display: 'flex', gap: '15px' }}><Trophy color="#22c55e" /> <div>Cricket Tickets<br/><small>International & League</small></div></div>
          </div>
          <div className="indigo-card" onClick={()=>setCurrentScreen('payments')}>
            <div style={{ display: 'flex', gap: '15px' }}><Plane color="#3f51b5" /> <div>Travel Tickets<br/><small>Air, Train, Bus</small></div></div>
          </div>
        </div>
      )}

      {/* --- 5. PAYMENTS (EasyPaisa, JazzCash, Card) --- */}
      {currentScreen === 'payments' && (
        <div style={{ padding: '20px' }}>
          <h3>Checkout</h3>
          <div className="indigo-card" style={{ border: '1px dashed #22c55e' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Ticket Fee</span><span>Rs. 1000</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#22c55e' }}><span>Service Fee (1.5%)</span><span>Rs. 15</span></div>
            <hr style={{ borderColor: '#3f4264' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}><span>Total</span><span>Rs. 1015</span></div>
          </div>
          <p>Payment Methods:</p>
          <div className="input-group"><CreditCard size={18} /> Card Payment</div>
          <div className="input-group">📱 EasyPaisa / JazzCash</div>
          <button className="btn-accent" style={{ marginTop: '20px' }}>Pay Now</button>
        </div>
      )}

      {/* --- BOTTOM NAVIGATION (History, Profile included) --- */}
      {currentScreen !== 'splash' && (
        <div className="nav-bar">
          <div onClick={()=>setCurrentScreen('home')} className={`nav-item ${currentScreen === 'home' ? 'nav-active' : ''}`}><Navigation size={20}/><small>Home</small></div>
          <div onClick={()=>setCurrentScreen('tickets')} className={`nav-item ${currentScreen === 'tickets' ? 'nav-active' : ''}`}><Ticket size={20}/><small>Tickets</small></div>
          <div onClick={()=>setCurrentScreen('payments')} className={`nav-item ${currentScreen === 'payments' ? 'nav-active' : ''}`}><CreditCard size={20}/><small>Payments</small></div>
          <div className="nav-item"><History size={20}/><small>History</small></div>
          <div className="nav-item"><User size={20}/><small>Profile</small></div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  User, Stepper, Car, Bike, Info, Shield, Map, 
  Navigation, MessageSquare, AlertTriangle, Wallet, 
  Power, CheckCircle, ChevronRight, Phone, DollarSign,
  Truck, HelpCircle, X, ArrowLeft
} from 'lucide-react';

export default function DriverApp() {
  // --- سٹرکچر کے مطابق اسٹیٹس ---
  const [screen, setScreen] = useState('login'); // login, vehicle, home, active, earnings, support
  const [isOnline, setIsOnline] = useState(false);
  const [vehicle, setVehicle] = useState('Car');
  const [activeRequest, setActiveRequest] = useState(null);

  // 1. وہیکل رجسٹریشن ڈیٹا
  const [vehicleData, setVehicleData] = useState({
    type: 'Car',
    number: '',
    cnic: '',
    emergencyNo: ''
  });

  // 2. فرضی رائیڈ ریکوئسٹ (ٹیسٹنگ کے لیے)
  useEffect(() => {
    if (isOnline) {
      const timer = setTimeout(() => {
        setActiveRequest({ riderName: 'احمد علی', pickup: 'Multan Cantt', drop: 'Gulgasht', fare: 450 });
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setActiveRequest(null);
    }
  }, [isOnline]);

  return (
    <div className="driver-container">
      <Head>
        <title>GoSmart Driver - Control Panel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>

      <style jsx global>{`
        body { margin: 0; background: #1a1c2c; color: white; font-family: sans-serif; }
        .driver-container { max-width: 450px; margin: 0 auto; min-height: 100vh; position: relative; background: #1a1c2c; }
        .indigo-card { background: #282a44; border: 1px solid #3f4264; border-radius: 20px; padding: 20px; margin-bottom: 15px; }
        .input-group { background: #212339; border: 1px solid #3f4264; border-radius: 12px; padding: 12px; display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .input-group input, .input-group select { background: none; border: none; color: white; width: 100%; outline: none; }
        .btn-online { background: #22c55e; color: white; border: none; padding: 15px; border-radius: 12px; width: 100%; font-weight: bold; cursor: pointer; box-shadow: 0 5px 15px rgba(34, 197, 94, 0.4); }
        .btn-offline { background: #ef4444; color: white; border: none; padding: 15px; border-radius: 12px; width: 100%; font-weight: bold; cursor: pointer; }
        .tab-bar { position: fixed; bottom: 0; width: 100%; max-width: 450px; background: #212339; display: flex; justify-content: space-around; padding: 15px 0; border-top: 1px solid #3f4264; }
        .tab-item { display: flex; flex-direction: column; align-items: center; font-size: 10px; color: #64748b; cursor: pointer; }
        .tab-active { color: #3f51b5; }
        .request-popup { position: fixed; bottom: 80px; left: 20px; right: 20px; background: #3f51b5; border-radius: 20px; padding: 20px; animation: slideUp 0.5s ease; z-index: 1000; }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .emergency-blink { animation: blink 1s infinite; background: #ef4444 !important; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

      {/* --- 1. LOGIN / REGISTER --- */}
      {screen === 'login' && (
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          <img src="/IMG_20260124_084929.JPG" style={{ width: '80px', borderRadius: '15px', marginBottom: '20px' }} />
          <h2>ڈرائیور لاگ ان</h2>
          <div className="input-group"><Phone size={18} /><input placeholder="فون نمبر" type="tel" /></div>
          <button className="btn-online" style={{ background: '#3f51b5' }} onClick={() => setScreen('vehicle')}>جاری رکھیں</button>
        </div>
      )}

      {/* --- 2. VEHICLE REGISTRATION --- */}
      {screen === 'vehicle' && (
        <div style={{ padding: '20px' }}>
          <h3>گاڑی کی رجسٹریشن</h3>
          <div className="indigo-card">
            <div className="input-group">
              <Car size={18} />
              <select onChange={(e) => setVehicle(e.target.value)}>
                <option>Car</option>
                <option>Bike</option>
                <option>Rickshaw</option>
              </select>
            </div>
            <div className="input-group"><Truck size={18} /><input placeholder="گاڑی کا نمبر (e.g. LEC-123)" /></div>
            <div className="input-group"><Shield size={18} /><input placeholder="CNIC نمبر" /></div>
            <p style={{ fontSize: '10px', color: '#94a3b8' }}>* تمام دستاویزات ایچ ڈی کوالٹی میں ہونی چاہئیں (Hidden for Privacy)</p>
            <button className="btn-online" style={{ background: '#3f51b5' }} onClick={() => setScreen('home')}>رجسٹریشن مکمل کریں</button>
          </div>
        </div>
      )}

      {/* --- 3. HOME (Online/Offline, Ride Requests) --- */}
      {screen === 'home' && (
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <img src="/IMG_20260124_084929.JPG" style={{ width: '40px', borderRadius: '10px' }} />
            <div onClick={() => setIsOnline(!isOnline)} style={{ cursor: 'pointer' }}>
              {isOnline ? <div className="btn-offline" style={{ padding: '8px 20px' }}>Offline ہو جائیں</div> : <div className="btn-online" style={{ padding: '8px 20px' }}>Online ہو جائیں</div>}
            </div>
          </div>

          <div className="indigo-card" style={{ textAlign: 'center', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {isOnline ? (
              <div>
                <div className="emergency-blink" style={{ width: '10px', height: '10px', borderRadius: '50%', margin: '0 auto 10px' }}></div>
                <p>صارفین کی تلاش جاری ہے...</p>
              </div>
            ) : (
              <p style={{ color: '#64748b' }}>آپ آف لائن ہیں</p>
            )}
          </div>

          {activeRequest && (
            <div className="request-popup">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <b>نئی رائیڈ: {activeRequest.riderName}</b>
                <span style={{ fontWeight: 'bold' }}>Rs. {activeRequest.fare}</span>
              </div>
              <p style={{ fontSize: '12px', margin: '10px 0' }}>منزل: {activeRequest.drop}</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn-online" onClick={() => setScreen('active')}>قبول کریں</button>
                <button className="btn-offline" style={{ flex: 1 }} onClick={() => setActiveRequest(null)}>مسترد</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- 4. ACTIVE RIDE (Navigation, Chat, Emergency) --- */}
      {screen === 'active' && (
        <div style={{ height: '100vh' }}>
          <div style={{ height: '50%', background: '#1a1c2c', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '2px solid #3f51b5' }}>
            <Navigation size={40} className="emergency-blink" />
          </div>
          <div style={{ padding: '20px' }}>
            <div className="indigo-card">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>رائیڈر: <b>احمد علی</b></span>
                <div className="emergency-blink" style={{ padding: '5px', borderRadius: '50%' }}><AlertTriangle size={20} /></div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button className="btn-online" style={{ background: '#3f51b5' }}><MessageSquare size={18} /> چیٹ</button>
                <button className="btn-online" onClick={() => setScreen('home')}>رائیڈ ختم کریں</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 5. EARNINGS & WITHDRAW --- */}
      {screen === 'earnings' && (
        <div style={{ padding: '20px' }}>
          <h3>میری کمائی</h3>
          <div className="indigo-card" style={{ textAlign: 'center' }}>
            <small>کل بیلنس</small>
            <h1 style={{ margin: '10px 0', color: '#22c55e' }}>Rs. 4,500</h1>
            <button className="btn-online" style={{ background: '#3f51b5' }} onClick={() => alert('رقم کی درخواست بھیج دی گئی')}>رقم نکلوائیں (Withdraw)</button>
          </div>
          <div className="indigo-card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>آج کی کمائی</span><span>Rs. 1,200</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}><span>کل رائیڈز</span><span>12</span></div>
          </div>
        </div>
      )}

      {/* --- 6. SUPPORT --- */}
      {screen === 'support' && (
        <div style={{ padding: '20px' }}>
          <h3>ہیلپ اور سپورٹ</h3>
          <div className="indigo-card"><HelpCircle size={18} /> ہمیں واٹس ایپ کریں</div>
          <div className="indigo-card"><Phone size={18} /> ہیلپ لائن کال کریں</div>
        </div>
      )}

      {/* --- BOTTOM NAVIGATION (All Options) --- */}
      {screen !== 'login' && (
        <div className="tab-bar">
          <div onClick={() => setScreen('home')} className={`tab-item ${screen === 'home' ? 'tab-active' : ''}`}><Map /><small>ہوم</small></div>
          <div onClick={() => setScreen('earnings')} className={`tab-item ${screen === 'earnings' ? 'tab-active' : ''}`}><DollarSign /><small>کمائی</small></div>
          <div onClick={() => setScreen('support')} className={`tab-item ${screen === 'support' ? 'tab-active' : ''}`}><HelpCircle /><small>سپورٹ</small></div>
          <div onClick={() => setScreen('login')} className="tab-item"><X color="#ef4444" /><small>لاگ آؤٹ</small></div>
        </div>
      )}
    </div>
  );
}

// Master Server Entry Point (index.js)
const express = require('express');
const app = express();
app.use(express.json());

// 1. --- Auth Service ---
const authService = {
  driverLogin: (data) => {
    // رجسٹریشن اور دستاویزات کی تصدیق لازمی ہے
    if(!data.cnic || !data.vehicleNo) return { status: 400, msg: "Registration Required" };
    return { status: 200, token: "JWT_SECURE_TOKEN" };
  },
  riderGuest: () => ({ status: 200, role: "guest", msg: "Limited Access" })
};

// 2. --- Ride Service (Pricing Engine) ---
const rideService = {
  pricingEngine: (distance) => {
    const basePrice = 100;
    const perKm = 40;
    return basePrice + (distance * perKm);
  },
  status: ["Searching", "Accepted", "Started", "Completed"]
};

// 3. --- Ticket Service (1.5% Commission Engine) ---
const ticketService = {
  calculateTotal: (ticketPrice) => {
    const commission = ticketPrice * 0.015; // 1.5% ہمارا حصہ
    return {
      originalPrice: ticketPrice,
      platformFee: commission,
      totalToPay: ticketPrice + commission
    };
  },
  redirect: (provider) => {
    const urls = {
      pcb: "https://pcb.bookme.pk",
      pia: "https://piac.com.pk",
      railway: "https://pakrail.gov.pk"
    };
    return urls[provider];
  }
};

// 4. --- Payment Service (Gateways) ---
const paymentService = {
  process: (method, amount) => {
    // EasyPaisa / JazzCash / Card Integration
    console.log(`Processing ${amount} via ${method}`);
    return { transactionId: "TXN_" + Math.random().toString(36).substr(2, 9), status: "Success" };
  }
};

// 5. --- Emergency Service (Detection) ---
const emergencyService = {
  checkDriverStatus: (isOnline, lastPing, emergencyNo) => {
    const now = Date.now();
    // اگر ڈرائیور 2 منٹ سے آف لائن ہے اور رائیڈ ایکٹو ہے
    if (isOnline && (now - lastPing > 120000)) {
      this.sendAlert(emergencyNo);
    }
  },
  sendAlert: (number) => {
    console.log(`ALERT: Sending SMS and Missed Call to ${number}`);
    // SMS API Integration here
  }
};

// --- API Endpoints ---

// ٹاپ لیول ٹکٹ بکنگ ود کمیشن
app.post('/api/tickets/book', (req, res) => {
  const { price, provider } = req.body;
  const billing = ticketService.calculateTotal(price);
  const portal = ticketService.redirect(provider);
  res.json({ billing, portal });
});

// ایمرجنسی الرٹ مانیٹرنگ
app.post('/api/emergency/check', (req, res) => {
  const { isOnline, lastPing, emergencyNo } = req.body;
  emergencyService.checkDriverStatus(isOnline, lastPing, emergencyNo);
  res.send("Status Monitored");
});

// سواری کا کرایہ (Pricing)
app.get('/api/ride/fare', (req, res) => {
  const { dist } = req.query;
  const total = rideService.pricingEngine(dist);
  res.json({ fare: total });
});

app.listen(3000, () => console.log("GoSmart Backend Services Running on Port 3000"));

-- 1. Users Table (Riders and Drivers)
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    role VARCHAR(10) NOT NULL, -- 'rider' or 'driver'
    phone VARCHAR(15) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    is_registered BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Drivers Table (Detailed Info)
CREATE TABLE Drivers (
    user_id INTEGER PRIMARY KEY REFERENCES Users(id),
    vehicle_type VARCHAR(20), -- 'bike', 'rickshaw', 'car'
    vehicle_number VARCHAR(20) UNIQUE,
    cnic_number VARCHAR(15) UNIQUE,
    emergency_contact VARCHAR(15),
    status VARCHAR(15) DEFAULT 'offline', -- 'online', 'offline', 'on_ride'
    rating DECIMAL(2,1) DEFAULT 5.0
);

-- 3. Rides Table (Live & Past Rides)
CREATE TABLE Rides (
    id SERIAL PRIMARY KEY,
    rider_id INTEGER REFERENCES Users(id),
    driver_id INTEGER REFERENCES Users(id),
    pickup_location TEXT,
    drop_location TEXT,
    fare DECIMAL(10,2),
    status VARCHAR(15), -- 'searching', 'accepted', 'started', 'completed', 'cancelled'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tickets Table (Booking & 1.5% Commission)
CREATE TABLE Tickets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    source VARCHAR(50), -- 'PCB', 'PIA', 'PR', 'Daewoo'
    ticket_amount DECIMAL(10,2),
    commission_amount DECIMAL(10,2) GENERATED ALWAYS AS (ticket_amount * 0.015) STORED, -- 1.5% خودکار حساب
    total_paid DECIMAL(10,2),
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Payments Table (Financial Records)
CREATE TABLE Payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    method VARCHAR(20), -- 'easypaisa', 'jazzcash', 'card'
    amount DECIMAL(10,2),
    transaction_id VARCHAR(100) UNIQUE,
    status VARCHAR(15), -- 'pending', 'success', 'failed'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// Security & Rules Engine
const GoSmartRules = {

    // 1. ڈرائیور کی معلومات کو ہائڈ (Mask) کرنے کا فنکشن
    maskDriverSensitiveInfo: (driver) => {
        return {
            name: driver.full_name,
            vehicle: driver.vehicle_type,
            plate: driver.vehicle_number,
            rating: driver.rating,
            // حساس ڈیٹا کو یہاں سے نکال دیا گیا ہے (CNIC, Address, EmergencyNo hidden)
        };
    },

    // 2. رجسٹریشن کی لازمی شرط (Driver Mandatory Check)
    accessControl: (user) => {
        if (user.role === 'driver' && !user.is_verified) {
            return { allowed: false, msg: "ایپ استعمال کرنے کے لیے رجسٹریشن اور دستاویزات کی تصدیق لازمی ہے۔" };
        }
        if (user.role === 'rider') {
            return { allowed: true, msg: "Guest Mode Active" }; // رائیڈر گیسٹ موڈ میں جا سکتا ہے
        }
        return { allowed: true };
    },

    // 3. مالیاتی فارمولا (Commission Engine)
    calculateBilling: (serviceType, amount) => {
        let finalAmount = amount;
        let platformCommission = 0;

        if (serviceType === 'ride') {
            // سواری پر کوئی کمیشن لاگو نہیں
            platformCommission = 0;
            console.log("Ride: No commission applied.");
        } 
        else if (serviceType === 'ticket') {
            // ٹکٹ پر 1.5% ٹیکنالوجی فیس
            platformCommission = amount * 0.015;
            finalAmount = amount + platformCommission;
            console.log(`Ticket: 1.5% Fee (${platformCommission}) added.`);
        }

        return {
            baseAmount: amount,
            fee: platformCommission,
            totalToPay: finalAmount
        };
    },

    // 4. آٹو رجسٹریشن رول (Ticket Buyer Auto Register)
    handleTicketPayment: (user, paymentStatus) => {
        if (paymentStatus === 'success') {
            if (!user.is_registered) {
                // ادائیگی ہوتے ہی صارف کو خودکار رجسٹر کریں
                user.is_registered = true;
                user.role = 'rider';
                console.log("User Auto-Registered after successful payment.");
            }
            return { status: "Paid", user: user };
        }
        return { status: "Pending" };
    }
};

// --- استعمال کی مثالیں (Use Cases) ---

// مثال 1: رائیڈر کو ڈرائیور کی پروفائل دکھانا
const fullDriverData = { full_name: "عمران", cnic: "36302-xxxx", vehicle_number: "MN-555", address: "Multan Cantt" };
const safeData = GoSmartRules.maskDriverSensitiveInfo(fullDriverData);
console.log("Rider Sees:", safeData); // اس میں ایڈریس اور CNIC نہیں ہوگا

// مثال 2: ٹکٹ کی قیمت نکالنا
const ticketBill = GoSmartRules.calculateBilling('ticket', 2000);
console.log("Ticket Bill:", ticketBill); // Rs. 2030 (1000 + 30)

// مثال 3: سواری کی قیمت نکالنا
const rideBill = GoSmartRules.calculateBilling('ride', 500);
console.log("Ride Bill:", rideBill); // Rs. 500 (No commission)


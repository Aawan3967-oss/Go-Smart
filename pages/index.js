import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Settings, CreditCard, Users, ShieldCheck, Globe } from 'lucide-react';

export default function GoSmartApp() {
  const [view, setView] = useState('rider'); 
  const [lang, setLang] = useState('ur'); // Default Urdu
  const [fare, setFare] = useState(0);

  // زبان کے الفاظ کا مجموعہ
  const content = {
    ur: {
      rider: "سواری", driver: "ڈرائیور", admin: "ایڈمن",
      placeholder: "آپ کی منزل کیا ہے؟",
      guarantee: "سمارٹ رائیڈ گارنٹی", savings: "دوسری ایپس سے 15% کم",
      book: "بکنگ کنفرم کریں", commission: "آج کا کل کمیشن",
      active: "ایکٹو ڈرائیورز", status: "سسٹم مانیٹرنگ: نارمل"
    },
    en: {
      rider: "Rider", driver: "Driver", admin: "Admin",
      placeholder: "Where to?",
      guarantee: "Smart Ride Guarantee", savings: "15% cheaper than others",
      book: "Confirm Booking", commission: "Today's Total Commission",
      active: "Active Drivers", status: "System Monitoring: Normal"
    }
  };

  const t = content[lang];

  // ڈیوائس کی زبان چیک کرنا
  useEffect(() => {
    const deviceLang = navigator.language.split('-')[0];
    if (deviceLang === 'en' || deviceLang === 'ur') {
      setLang(deviceLang);
    }
  }, []);

  return (
    <div className={`min-h-screen bg-[#0F172A] text-white ${lang === 'ur' ? 'font-urdu' : 'font-sans'}`} dir={lang === 'ur' ? 'rtl' : 'ltr'}>
      {/* گوگل فونٹ امپورٹ */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        .font-urdu { font-family: 'Noto Nastaliq Urdu', serif; line-height: 2.5; }
      `}</style>

      {/* نیویگیشن بار */}
      <nav className="p-4 flex justify-between items-center bg-[#1E293B] border-b border-[#4F46E5]/30 sticky top-0 z-50 shadow-2xl">
        <div className="flex items-center gap-2">
           <div className="bg-[#4F46E5] p-2 rounded-lg shadow-lg shadow-indigo-500/50">
              <Navigation size={20} className="text-white" />
           </div>
           <h1 className="text-2xl font-black text-[#4F46E5] italic tracking-tighter">GoSmart</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => setLang(lang === 'ur' ? 'en' : 'ur')} className="p-2 bg-slate-800 rounded-full text-indigo-400">
            <Globe size={18} />
          </button>
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700">
            <button onClick={() => setView('rider')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'rider' ? 'bg-[#4F46E5] shadow-lg' : 'text-gray-500'}`}>{t.rider}</button>
            <button onClick={() => setView('driver')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'driver' ? 'bg-[#4F46E5] shadow-lg' : 'text-gray-500'}`}>{t.driver}</button>
            <button onClick={() => setView('admin')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'admin' ? 'bg-red-600 shadow-lg' : 'text-gray-500'}`}>{t.admin}</button>
          </div>
        </div>
      </nav>

      <main className="p-6 max-w-md mx-auto">
        {view === 'rider' && (
          <div className="space-y-6">
            <div className="bg-slate-800/80 p-8 rounded-[2.5rem] border border-[#4F46E5]/30 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-3 mb-8 bg-[#0F172A] p-4 rounded-2xl border border-slate-700">
                <MapPin className="text-red-500" />
                <input 
                  onChange={(e) => setFare(450)}
                  type="text" placeholder={t.placeholder} 
                  className="bg-transparent border-none focus:ring-0 w-full text-sm"
                />
              </div>
              
              {fare > 0 && (
                <div className="text-center animate-in zoom-in duration-300">
                  <p className="text-[#4F46E5] text-[10px] font-bold tracking-widest uppercase">{t.guarantee}</p>
                  <div className="text-6xl font-black text-white my-4">Rs. {fare}</div>
                  <p className="text-gray-400 text-xs mb-8 italic">{t.savings}</p>
                  <button className="w-full bg-[#4F46E5] hover:bg-[#4338CA] py-5 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-500/40 transition-all active:scale-95">
                    {t.book}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'admin' && (
          <div className="grid gap-4 animate-in slide-in-from-bottom duration-500">
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-3xl flex items-center gap-5 shadow-lg">
              <div className="bg-[#4F46E5]/20 p-4 rounded-2xl text-[#4F46E5]"><CreditCard /></div>
              <div><p className="text-xs text-gray-400">{t.commission} (5%)</p><h3 className="text-2xl font-black">Rs. 8,420</h3></div>
            </div>
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-3xl flex items-center gap-5 shadow-lg">
              <div className="bg-green-500/20 p-4 rounded-2xl text-green-500"><Users /></div>
              <div><p className="text-xs text-gray-400">{t.active}</p><h3 className="text-2xl font-black">142</h3></div>
            </div>
            <div className="flex items-center gap-2 text-xs text-red-500 bg-red-500/10 p-3 rounded-xl justify-center">
              <ShieldCheck size={16} /> <span>{t.status}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

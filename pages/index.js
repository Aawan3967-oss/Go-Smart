import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Globe, CreditCard, Users, ShieldCheck } from 'lucide-react';

export default function GoSmartApp() {
  const [view, setView] = useState('rider'); 
  const [lang, setLang] = useState('ur');
  const [fare, setFare] = useState(0);

  const content = {
    ur: { rider: "سواری", driver: "ڈرائیور", admin: "ایڈمن", placeholder: "آپ کی منزل کیا ہے؟", book: "بکنگ کریں", commission: "آج کا کل کمیشن", active: "ایکٹو ڈرائیورز", status: "سسٹم مانیٹرنگ: نارمل" },
    en: { rider: "Rider", driver: "Driver", admin: "Admin", placeholder: "Where to?", book: "Confirm Booking", commission: "Total Commission", active: "Active Drivers", status: "System: Normal" }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
      {/* نوری نستعلیق فونٹ لوڈر */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        * { font-family: ${lang === 'ur' ? "'Noto Nastaliq Urdu', serif" : "ui-sans-serif, system-ui"}; }
        .urdu-text { line-height: 2.5; }
      `}</style>

      {/* خوبصورت نیویگیشن بار (لوگو کے ساتھ) */}
      <nav className="p-4 flex justify-between items-center bg-[#1E293B] border-b border-indigo-500/30 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-2">
           <div className="bg-indigo-500 p-2 rounded-xl shadow-lg shadow-indigo-500/50">
              <Navigation size={22} className="text-white" />
           </div>
           <h1 className="text-2xl font-black text-indigo-500 italic tracking-tighter">GoSmart</h1>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-2xl border border-slate-700">
          <button onClick={() => setView('rider')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === 'rider' ? 'bg-indigo-500 shadow-md scale-105' : 'text-gray-500'}`}>{t.rider}</button>
          <button onClick={() => setView('driver')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === 'driver' ? 'bg-indigo-500 shadow-md scale-105' : 'text-gray-500'}`}>{t.driver}</button>
          <button onClick={() => setView('admin')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === 'admin' ? 'bg-red-600 shadow-md scale-105' : 'text-gray-500'}`}>{t.admin}</button>
        </div>
      </nav>

      <main className="p-6 max-w-md mx-auto urdu-text">
        {view === 'rider' && (
          <div className="bg-slate-800/80 p-8 rounded-[2.5rem] border border-indigo-500/20 backdrop-blur-xl shadow-2xl mt-4">
             <div className="flex items-center gap-3 mb-8 bg-[#0F172A] p-4 rounded-2xl border border-slate-700 focus-within:border-indigo-500 transition-all">
                <MapPin className="text-red-500" />
                <input 
                  onChange={(e) => setFare(450)}
                  type="text" placeholder={t.placeholder} 
                  className="bg-transparent border-none outline-none w-full text-sm text-white"
                />
              </div>
              
              {fare > 0 && (
                <div className="text-center animate-pulse">
                  <div className="text-5xl font-black text-indigo-400 my-4">Rs. {fare}</div>
                  <button className="w-full bg-indigo-500 hover:bg-indigo-600 py-5 rounded-[1.5rem] font-bold text-lg shadow-lg shadow-indigo-500/30 transition-all active:scale-95">
                    {t.book}
                  </button>
                </div>
              )}
          </div>
        )}

        {view === 'admin' && (
          <div className="space-y-4 mt-4">
            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 flex items-center gap-4 shadow-xl">
              <div className="bg-indigo-500/20 p-4 rounded-2xl text-indigo-500"><CreditCard /></div>
              <div><p className="text-xs text-gray-400">{t.commission}</p><h3 className="text-2xl font-black italic">Rs. 8,420</h3></div>
            </div>
            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 flex items-center gap-4 shadow-xl">
              <div className="bg-green-500/20 p-4 rounded-2xl text-green-500"><Users /></div>
              <div><p className="text-xs text-gray-400">{t.active}</p><h3 className="text-2xl font-black italic">142</h3></div>
            </div>
            <div className="flex items-center justify-center gap-2 text-[10px] text-red-400 bg-red-500/5 p-4 rounded-2xl">
               <ShieldCheck size={14} /> <span>{t.status}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

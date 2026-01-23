import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Settings, CreditCard, Users, ShieldCheck } from 'lucide-react';

export default function GoSmartApp() {
  const [view, setView] = useState('rider'); 
  const [destination, setDestination] = useState('');
  const [fare, setFare] = useState(0);

  // سمارٹ کرایہ فارمولا (پٹرول اور فاصلے کی بنیاد پر)
  const calculateSmartFare = (dist) => {
    const baseFare = 50;
    const ratePerKm = 20; // پٹرول کی قیمت کے مطابق ایڈجسٹ ایبل
    const total = baseFare + (dist * ratePerKm);
    setFare(Math.round(total));
  };

  return (
    <div className="bg-[#1E293B] min-h-screen text-white font-sans selection:bg-indigo-500">
      {/* نیویگیشن بار */}
      <nav className="p-4 flex justify-between items-center bg-[#0F172A] border-b border-indigo-500/20 sticky top-0 z-50">
        <h1 className="text-2xl font-black text-[#4F46E5] italic tracking-tighter">GoSmart</h1>
        <div className="flex bg-slate-800 p-1 rounded-xl">
          <button onClick={() => setView('rider')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'rider' ? 'bg-[#4F46E5] text-white shadow-lg' : 'text-gray-400'}`}>سواری</button>
          <button onClick={() => setView('driver')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'driver' ? 'bg-[#4F46E5] text-white shadow-lg' : 'text-gray-400'}`}>ڈرائیور</button>
          <button onClick={() => setView('admin')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'admin' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400'}`}>ایڈمن</button>
        </div>
      </nav>

      <main className="p-6 max-w-md mx-auto">
        {/* --- رائیڈر ویو --- */}
        {view === 'rider' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-slate-800/50 p-6 rounded-[2.5rem] border border-indigo-500/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6 bg-slate-900/50 p-4 rounded-2xl">
                <MapPin className="text-red-500" />
                <input 
                  onChange={(e) => {setDestination(e.target.value); calculateSmartFare(12);}}
                  type="text" placeholder="آپ کی منزل کیا ہے؟" 
                  className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium"
                />
              </div>
              
              {fare > 0 && (
                <div className="text-center py-4 border-t border-slate-700">
                  <p className="text-indigo-400 text-xs font-bold tracking-widest uppercase mb-1">Smart Ride Guarantee</p>
                  <div className="text-6xl font-black text-white mb-2 leading-none">Rs. {fare}</div>
                  <p className="text-gray-400 text-[10px] mb-6 italic text-right px-4">آپ کی بچت: دوسرے ایپس سے 15% کم</p>
                  <button className="w-full bg-[#4F46E5] hover:bg-[#4338CA] py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/20 active:scale-95 transition-all">
                    بکنگ کنفرم کریں
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- ڈرائیور ویو --- */}
        {view === 'driver' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-indigo-600/20 p-4 rounded-2xl border border-indigo-500/40">
              <span className="text-sm font-bold text-indigo-300">آن لائن اسٹیٹس</span>
              <div className="w-12 h-6 bg-green-500 rounded-full relative shadow-inner"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
            </div>
            <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700">
              <div className="flex justify-between mb-4"><span className="text-xs text-gray-400">نئی درخواست</span><span className="text-xs text-indigo-400 font-bold italic">2 منٹ پہلے</span></div>
              <p className="font-bold text-lg mb-1">ڈیفنس فیز 5، لاہور</p>
              <div className="flex justify-between items-end">
                <div><span className="text-3xl font-black text-white">Rs. 580</span><p className="text-[10px] text-green-400 font-bold">کمیشن: صرف 5% (Rs. 29)</p></div>
                <button className="bg-indigo-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">قبول کریں</button>
              </div>
            </div>
          </div>
        )}

        {/* --- ایڈمن ویو --- */}
        {view === 'admin' && (
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl flex items-center gap-5">
              <div className="bg-indigo-500/20 p-4 rounded-2xl"><CreditCard className="text-indigo-400" /></div>
              <div><p className="text-xs text-gray-400">آج کا کل کمیشن (5%)</p><h3 className="text-2xl font-black italic">Rs. 8,420</h3></div>
            </div>
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl flex items-center gap-5">
              <div className="bg-green-500/20 p-4 rounded-2xl"><Users className="text-green-400" /></div>
              <div><p className="text-xs text-gray-400">ایکٹو ڈرائیورز</p><h3 className="text-2xl font-black italic">142</h3></div>
            </div>
            <div className="bg-red-600/10 border border-red-600/30 p-4 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="text-red-500" size={20}/>
              <span className="text-xs font-bold text-red-500">سسٹم مانیٹرنگ: نارمل</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

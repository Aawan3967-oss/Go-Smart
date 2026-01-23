import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Settings, CreditCard, Users } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// 1. ڈیٹا بیس کنکشن (اپنی کیز یہاں ڈالیں)
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

export default function GoSmartApp() {
  const [view, setView] = useState('rider'); // rider, driver, admin
  const [destination, setDestination] = useState('');
  const [fare, setFare] = useState(0);
  const [isBooking, setIsBooking] = useState(false);

  // 2. سمارٹ کرایہ کیلکولیٹر (Logic)
  const calculateSmartFare = (dist) => {
    const base = 50;
    const kmRate = 18; // پٹرول کے مطابق
    const total = base + (dist * kmRate);
    setFare(Math.round(total));
  };

  // 3. رائیڈ بکنگ فنکشن (Database Action)
  const handleBooking = async () => {
    setIsBooking(true);
    const { data, error } = await supabase
      .from('rides')
      .insert([{ 
        destination, 
        fare, 
        commission: (fare * 0.05), // 5% خودکار کمیشن
        status: 'pending' 
      }]);
    
    if (!error) alert("درخواست بھیج دی گئی! ڈرائیور کا انتظار کریں");
    setIsBooking(false);
  };

  return (
    <div className="bg-[#1E293B] min-h-screen text-white font-sans">
      {/* ٹاپ نیویگیشن بار */}
      <nav className="p-4 flex justify-between items-center bg-[#111827] border-b border-indigo-500/20">
        <h1 className="text-2xl font-black text-[#4F46E5] italic">GoSmart</h1>
        <div className="flex gap-2">
          <button onClick={() => setView('rider')} className={`px-3 py-1 rounded-lg text-xs ${view === 'rider' ? 'bg-[#4F46E5]' : 'bg-slate-700'}`}>سواری</button>
          <button onClick={() => setView('driver')} className={`px-3 py-1 rounded-lg text-xs ${view === 'driver' ? 'bg-[#4F46E5]' : 'bg-slate-700'}`}>ڈرائیور</button>
          <button onClick={() => setView('admin')} className={`px-3 py-1 rounded-lg text-xs ${view === 'admin' ? 'bg-red-600' : 'bg-slate-700'}`}>ایڈمن</button>
        </div>
      </nav>

      <main className="p-6">
        {/* رائیڈر ویو */}
        {view === 'rider' && (
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-3xl border border-indigo-500/30">
              <h2 className="text-lg mb-4 flex items-center gap-2"><MapPin size={18}/> آپ کہاں جانا چاہتے ہیں؟</h2>
              <input 
                onChange={(e) => {setDestination(e.target.value); calculateSmartFare(10);}}
                type="text" placeholder="منزل لکھیں..." 
                className="w-full p-4 rounded-xl bg-slate-700 border-none focus:ring-2 focus:ring-[#4F46E5]"
              />
              {fare > 0 && (
                <div className="mt-6 text-center animate-fade-in">
                  <p className="text-gray-400 text-sm italic">Smart Fare (Only 5% Commision)</p>
                  <div className="text-5xl font-bold text-[#4F46E5] my-2">Rs. {fare}</div>
                  <button 
                    onClick={handleBooking}
                    className="w-full bg-[#4F46E5] py-4 rounded-2xl font-bold mt-4 shadow-lg active:scale-95 transition-all">
                    {isBooking ? "بکنگ ہو رہی ہے..." : "ابھی بک کریں"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ڈرائیور ویو */}
        {view === 'driver' && (
          <div className="bg-slate-800 p-6 rounded-3xl">
            <h2 className="text-xl font-bold mb-4">دستیاب سواریاں</h2>
            <div className="bg-slate-700 p-4 rounded-2xl border-l-4 border-green-500">
              <p className="text-sm text-gray-300">منزل: گلبرگ، لاہور</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xl font-bold text-white">Rs. 450</span>
                <button className="bg-green-600 px-4 py-2 rounded-lg text-sm">قبول کریں</button>
              </div>
              <p className="text-[10px] mt-2 text-gray-400">آپ کی بچت: Rs. 427 (کمیشن کٹنے کے بعد)</p>
            </div>
          </div>
        )}

        {/* ایڈمن ویو */}
        {view === 'admin' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-900/40 p-4 rounded-2xl border border-indigo-500/50 text-center">
                <CreditCard className="mx-auto mb-2 text-indigo-400" />
                <p className="text-xs">کل کمیشن</p>
                <h3 className="text-lg font-bold">Rs. 12,500</h3>
              </div>
              <div className="bg-slate-800 p-4 rounded-2xl text-center">
                <Users className="mx-auto mb-2 text-gray-400" />
                <p className="text-xs">ایکٹو ڈرائیورز</p>
                <h3 className="text-lg font-bold">48</h3>
              </div>
            </div>
            <button className="w-full bg-red-600/20 text-red-500 p-3 rounded-xl border border-red-600/50 font-bold">تمام سروسز روک دیں</button>
          </div>
        )}
      </main>

      {/* فوٹر */}
      <footer className="fixed bottom-4 left-0 right-0 text-center text-[10px] text-gray-500">
        GoSmart v1.0 • Designed for Efficiency
      </footer>
    </div>
  );
}

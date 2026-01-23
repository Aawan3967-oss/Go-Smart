import { useState } from 'react';
import { MapPin, Navigation, Settings } from 'lucide-react';

export default function Home() {
  const [distance, setDistance] = useState(5);
  const fareData = { recommended: 450, minPrice: 400, maxPrice: 550 };

  return (
    <div className="bg-[#1E293B] min-h-screen text-white p-4 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-[#4F46E5] italic">GoSmart</h1>
        <Settings className="text-gray-400" />
      </div>

      {/* Map Placeholder */}
      <div className="bg-slate-800 w-full h-48 rounded-3xl mb-6 flex items-center justify-center border border-indigo-500/20">
        <Navigation className="animate-pulse text-[#4F46E5]" size={40} />
      </div>

      {/* Selection Card */}
      <div className="bg-slate-900 rounded-t-[40px] p-8 fixed bottom-0 left-0 right-0 border-t border-indigo-500/30">
        <div className="flex items-center gap-3 bg-slate-800 p-4 rounded-2xl mb-4">
          <MapPin className="text-red-500" />
          <input type="text" placeholder="منزل کہاں ہے؟" className="bg-transparent border-none focus:ring-0 w-full" />
        </div>

        <div className="text-center my-6">
          <p className="text-gray-400 text-sm mb-2">منصفانہ کرایہ (Smart Deal)</p>
          <h2 className="text-5xl font-bold text-[#4F46E5]">Rs. {fareData.recommended}</h2>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 bg-slate-700 p-4 rounded-2xl font-bold">کرایہ کم کریں</button>
          <button className="flex-[2] bg-[#4F46E5] p-4 rounded-2xl font-bold shadow-lg shadow-indigo-500/40">
            بکنگ کریں
          </button>
        </div>
      </div>
    </div>
  );
}

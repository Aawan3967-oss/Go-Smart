import React, { useState } from 'react';

export default function GoSmartHome() {
  const [fare, setFare] = useState(450);

  return (
    <div className="bg-slate-900 min-h-screen text-white p-6 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#4F46E5]">GoSmart</h1>
        <div className="bg-[#4F46E5] px-4 py-1 rounded-full text-sm">Smart Mode</div>
      </header>

      {/* Main Card */}
      <div className="bg-slate-800 rounded-3xl p-6 shadow-xl border border-indigo-500/30">
        <h2 className="text-xl mb-4">آپ کہاں جانا چاہتے ہیں؟</h2>
        <input 
          type="text" 
          placeholder="منزل تلاش کریں..." 
          className="w-full p-4 rounded-xl bg-slate-700 border-none focus:ring-2 focus:ring-[#4F46E5] mb-4"
        />
        
        {/* Negotiation Slider */}
        <div className="mt-6">
          <label className="block mb-2 text-sm text-gray-400 text-center">کرایہ تجویز کریں (Smart Deal)</label>
          <input 
            type="range" min="300" max="600" value={fare} 
            onChange={(e) => setFare(e.target.value)}
            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-[#4F46E5]"
          />
          <div className="text-center text-4xl font-bold mt-4">Rs. {fare}</div>
        </div>

        <button className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold py-4 rounded-2xl mt-8 transition-all">
          بکنگ کنفرم کریں
        </button>
      </div>

      {/* Driver Info Tag */}
      <p className="text-center text-xs text-gray-500 mt-6">
        Fair Price Guarantee • Only 5% Commission
      </p>
    </div>
  );
}

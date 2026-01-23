export default function Admin() {
  const stats = [
    { label: "کل سواریاں", value: "1,240" },
    { label: "کمیشن (5%)", value: "Rs. 15,400" },
    { label: "ایکٹو ڈرائیورز", value: "85" }
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-right">GoSmart کنٹرول سینٹر</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-[#4F46E5]">
            <p className="text-gray-500">{s.label}</p>
            <h3 className="text-2xl font-black">{s.value}</h3>
          </div>
        ))}
      </div>
      <button className="mt-8 bg-red-500 text-white px-6 py-2 rounded-lg">ایمرجنسی اسٹاپ</button>
    </div>
  );
}

// GoSmart Fare Logic
export default function handler(req, res) {
    const { distance, time, baseFare = 50 } = req.body;
    
    const fuelPrice = 280; // موجودہ پٹرول کی قیمت
    const kmRate = fuelPrice / 15; // فی کلومیٹر ریٹ
    const timeRate = 2; // فی منٹ ٹریفک چارجز

    // خودکار کرایہ
    const estimatedFare = baseFare + (distance * kmRate) + (time * timeRate);
    
    // ڈرائیور کے لیے 5% کٹوتی کے بعد رقم
    const driverEarnings = estimatedFare * 0.95;

    res.status(200).json({ 
        totalFare: estimatedFare.toFixed(0),
        driverTakeHome: driverEarnings.toFixed(0),
        commission: (estimatedFare * 0.05).toFixed(0)
    });
}

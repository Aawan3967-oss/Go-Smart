export const calculateFare = (distance, trafficFactor = 1) => {
  const petrolPrice = 270; // موجودہ ریٹ
  const baseFare = 50;
  const ratePerKm = (petrolPrice / 15) + 10; // پٹرول + مینٹیننس
  
  let fare = baseFare + (distance * ratePerKm * trafficFactor);
  
  return {
    recommended: Math.round(fare),
    minPrice: Math.round(fare * 0.9), // 10% کم کرنے کی اجازت
    maxPrice: Math.round(fare * 1.2), // 20% زیادہ کی اجازت
    commission: Math.round(fare * 0.05) // صرف 5% کمیشن
  };
};

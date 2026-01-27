import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Car, Bike, Truck, MapPin, Phone, AlertTriangle,
  Ticket, CreditCard, User, Lock, Menu, X
} from "lucide-react";

export default function GoSmart() {

  /* ================= STATES ================= */
  const [screen, setScreen] = useState("splash");
  const [menu, setMenu] = useState(false);

  // Ride
  const [destination, setDestination] = useState("");
  const [vehicle, setVehicle] = useState("bike");

  // Driver
  const [driverName, setDriverName] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [cnic, setCnic] = useState("");
  const [emergency, setEmergency] = useState("");

  // Ticket
  const [ticketType, setTicketType] = useState("");
  const [price, setPrice] = useState(0);

  /* ================= EFFECTS ================= */
  useEffect(() => {
    const t = setTimeout(() => setScreen("home"), 2500);
    return () => clearTimeout(t);
  }, []);

  /* ================= STYLES ================= */
  const styles = `
    body { margin:0; background:#0b1026; color:white; font-family:system-ui }
    .card { background:#12183a; padding:20px; border-radius:16px; margin-bottom:15px }
    input,select { width:100%; padding:12px; border-radius:10px; border:none; margin-top:8px }
    button { width:100%; padding:14px; border:none; border-radius:14px; background:#3949ab; color:white; font-weight:bold }
    .row { display:flex; gap:10px }
    .iconBtn { flex:1; background:#1a237e }
    .top { display:flex; justify-content:space-between; align-items:center }
    .menu { position:fixed; inset:0; background:#0b1026; padding:20px }
  `;

  /* ================= UI ================= */
  return (
    <>
      <Head><title>GoSmart Super App</title></Head>
      <style>{styles}</style>

{/* ================= SPLASH ================= */}
{screen === "splash" && (
  <div style={{height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
    <img src="/IMG_20260124_084929.jpg" width="120" />
    <h2>GoSmart</h2>
    <p>Ride • Tickets • Travel</p>
  </div>
)}

{/* ================= HOME ================= */}
{screen === "home" && (
  <div style={{padding:20}}>
    <div className="top">
      <h2>GoSmart</h2>
      <Menu onClick={()=>setMenu(true)} />
    </div>

    {/* Ride */}
    <div className="card">
      <h3>Book a Ride</h3>
      <input placeholder="Destination" value={destination} onChange={e=>setDestination(e.target.value)} />
      <div className="row" style={{marginTop:10}}>
        <button className="iconBtn" onClick={()=>setVehicle("bike")}><Bike/> Bike</button>
        <button className="iconBtn" onClick={()=>setVehicle("car")}><Car/> Car</button>
        <button className="iconBtn" onClick={()=>setVehicle("rikshaw")}><Truck/> Rikshaw</button>
      </div>
      <p style={{marginTop:10}}>No commission on rides ✅</p>
      <button style={{marginTop:10}}>Find Driver</button>
    </div>

    {/* Tickets */}
    <div className="card">
      <h3>Tickets (1.5% Commission)</h3>
      <select onChange={e=>setTicketType(e.target.value)}>
        <option>Select Ticket</option>
        <option>PCB Cricket</option>
        <option>Bangladesh Cricket</option>
        <option>Sri Lanka Cricket</option>
        <option>England Cricket</option>
        <option>Australia Cricket</option>
        <option>Bus / Air Travel</option>
      </select>
      <input type="number" placeholder="Ticket Price" onChange={e=>setPrice(e.target.value)} />
      <p>Commission: {price ? (price*0.015).toFixed(0) : 0}</p>
      <button>Proceed to Payment</button>
    </div>

    {/* Driver */}
    <div className="card">
      <h3>Driver Registration</h3>
      <input placeholder="Full Name" onChange={e=>setDriverName(e.target.value)} />
      <input placeholder="CNIC" onChange={e=>setCnic(e.target.value)} />
      <input placeholder="Vehicle No" onChange={e=>setVehicleNo(e.target.value)} />
      <input placeholder="Emergency Contact" onChange={e=>setEmergency(e.target.value)} />
      <p style={{fontSize:12}}>Your data remains hidden 🔒</p>
      <button>Register Driver</button>
    </div>

    {/* Emergency */}
    <div className="card">
      <h3>Emergency System</h3>
      <p>If driver goes offline, alert + missed call will be sent automatically.</p>
      <button style={{background:"#b91c1c"}}><AlertTriangle/> SOS Test</button>
    </div>

  </div>
)}

{/* ================= MENU ================= */}
{menu && (
  <div className="menu">
    <X onClick={()=>setMenu(false)} />
    <button onClick={()=>setScreen("home")}>Home</button>
    <button>Ride History</button>
    <button>Tickets</button>
    <button>Admin</button>
  </div>
)}

    </>
  );
}

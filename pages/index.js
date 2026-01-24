<!DOCTYPE html>
<html lang="ur">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

<title>GoSmart</title>

<style>
:root{
  --indigo:#2c2f7a;
  --darkblue:#0b1c3d;
  --light:#f4f6ff;
}

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial, sans-serif;
}

body{
  background:linear-gradient(180deg,var(--darkblue),var(--indigo));
  color:white;
  min-height:100vh;
}

header{
  display:flex;
  align-items:center;
  gap:10px;
  padding:15px;
}

header img{
  width:45px;
  height:45px;
  border-radius:10px;
}

header h1{
  font-size:22px;
}

.container{
  padding:15px;
}

.card{
  background:#ffffff10;
  border-radius:15px;
  padding:15px;
  margin-bottom:15px;
}

input,button,select{
  width:100%;
  padding:12px;
  border-radius:10px;
  border:none;
  margin-top:10px;
  font-size:16px;
}

input,select{
  background:#fff;
  color:#000;
}

button{
  background:var(--indigo);
  color:#fff;
  cursor:pointer;
}

button.secondary{
  background:#1a2b5f;
}

.row{
  display:flex;
  gap:10px;
}

.row button{
  flex:1;
}

.footer{
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  display:flex;
  justify-content:space-around;
  background:var(--darkblue);
  padding:10px 0;
}

.footer div{
  font-size:14px;
  cursor:pointer;
}
</style>
</head>

<body>

<!-- HEADER -->
<header>
  <img src="IMG_20260124_084929.JPG" alt="GoSmart Logo">
  <h1>GoSmart</h1>
</header>

<!-- MAIN -->
<div class="container">

  <!-- LOCATION -->
  <div class="card">
    <input type="text" placeholder="📍 Pick-up Location">
    <input type="text" placeholder="🎯 Drop Location">
  </div>

  <!-- PRICING -->
  <div class="card">
    <p>💰 Estimated Fare: <b>PKR 480</b></p>
    <input type="number" placeholder="✍️ Offer Your Fare (Optional)">
    <select>
      <option>🚗 Car</option>
      <option>🏍 Bike</option>
      <option>🛺 Rickshaw</option>
    </select>
  </div>

  <!-- ACTION BUTTONS -->
  <div class="card row">
    <button>✅ Confirm Ride</button>
    <button class="secondary">❌ Cancel</button>
  </div>

  <!-- DRIVER INFO -->
  <div class="card">
    <p>👤 Driver: Ali Khan</p>
    <p>⭐ Rating: 4.8</p>
    <div class="row">
      <button>📞 Call</button>
      <button>💬 Chat</button>
      <button>🚨 SOS</button>
    </div>
  </div>

</div>

<!-- FOOTER NAV -->
<div class="footer">
  <div>🏠 Home</div>
  <div>🕘 Trips</div>
  <div>👛 Wallet</div>
  <div>⚙️ Settings</div>
</div>

<script>
// Future JS logic here
console.log("GoSmart Loaded");
</script>

</body>
</html>

{/* --- REGISTRATION & IDENTITY SCREEN --- */}
{currentScreen === 'registration' && (
  <div style={{ padding: '20px' }}>
    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
      <img src="/IMG_20260124_084929.JPG" style={{ width: '80px', borderRadius: '20px' }} />
      <h2 style={{ color: 'var(--green)', marginTop: '10px' }}>سیکیورٹی رجسٹریشن</h2>
    </div>

    {/* رول سلیکٹر (Rider or Driver) */}
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <button 
        onClick={() => setAppMode('rider')} 
        style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--accent)', background: appMode === 'rider' ? 'var(--accent)' : 'none', color: 'white' }}>
        <User size={18} /> رائیڈر
      </button>
      <button 
        onClick={() => setAppMode('driver')} 
        style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--accent)', background: appMode === 'driver' ? 'var(--accent)' : 'none', color: 'white' }}>
        <Car size={18} /> ڈرائیور
      </button>
    </div>

    {/* --- رائیڈر فارم (مختصر کوائف) --- */}
    {appMode === 'rider' && (
      <div className="indigo-card">
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>نوٹ: رائیڈر کے لیے رجسٹریشن آپشنل ہے، لیکن ایمرجنسی نمبر لازمی ہے۔</p>
        <div className="input-field"><User size={18} /><input placeholder="مکمل نام" /></div>
        <div className="input-field"><Phone size={18} /><input placeholder="فون نمبر" /></div>
        <div className="input-field"><AlertCircle size={18} color="var(--red)" /><input placeholder="ایمرجنسی کانٹیکٹ نمبر" /></div>
        <button className="primary-btn" onClick={() => setCurrentScreen('home')}>گیسٹ موڈ میں داخل ہوں</button>
      </div>
    )}

    {/* --- ڈرائیور فارم (لازمی اور تفصیلی کوائف) --- */}
    {appMode === 'driver' && (
      <div className="indigo-card" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        <h4 style={{ margin: '0 0 15px', color: 'var(--accent)' }}>گاڑی کی تفصیلات (لازمی)</h4>
        
        {/* گاڑی کی نوعیت سلیکٹ کریں */}
        <div className="input-field">
          <Car size={18} />
          <select style={{ background: 'none', border: 'none', color: 'white', width: '100%' }}>
            <option style={{color:'black'}} value="bike">موٹر سائیکل (Bike)</option>
            <option style={{color:'black'}} value="rickshaw">رکشہ (Rickshaw)</option>
            <option style={{color:'black'}} value="car">کار (Car / Mini)</option>
          </select>
        </div>

        <div className="input-field"><Truck size={18} /><input placeholder="گاڑی کا نمبر (مثلاً LEC-1234)" /></div>
        
        <h4 style={{ margin: '20px 0 15px', color: 'var(--accent)' }}>سیکیورٹی کوائف (خفیہ رکھے جائیں گے)</h4>
        <div className="input-field"><Shield size={18} /><input placeholder="شناختی کارڈ نمبر (CNIC)" type="number" /></div>
        <div className="input-field"><MapPin size={18} /><input placeholder="گھر کا پتہ" /></div>
        <div className="input-field"><AlertCircle size={18} color="var(--red)" /><input placeholder="ایمرجنسی گھر کا نمبر" /></div>
        
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '15px' }}>
          * ڈرائیور کا ڈیٹا انکرپٹڈ ہے اور صرف سیکیورٹی مقاصد کے لیے محفوظ کیا جائے گا۔
        </p>
        
        <button className="primary-btn" onClick={() => setCurrentScreen('home')}>رجسٹریشن مکمل کریں</button>
      </div>
    )}
  </div>
)}

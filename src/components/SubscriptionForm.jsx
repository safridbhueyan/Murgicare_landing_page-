import React, { useState, useEffect } from 'react';
import { Phone, Lock, CheckCircle2, ShieldCheck, RefreshCw, XCircle, AlertCircle } from 'lucide-react';

export default function SubscriptionForm({ isSubscribed, setIsSubscribed }) {
  const [operator, setOperator] = useState('robi'); // Default Robi
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState(1); // 1: Input, 2: OTP, 3: Success
  const [isLoading, setIsLoading] = useState(false);
  const [simulatedOTP, setSimulatedOTP] = useState('');
  const [enteredOTP, setEnteredOTP] = useState(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const operators = [
    { id: 'robi', name: 'Robi', prefix: ['018'] },
    { id: 'airtel', name: 'Airtel', prefix: ['016'] },
  ];

  const handlePhoneNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, ''); // numbers only
    if (val.length <= 11) {
      setPhoneNumber(val);
      setErrorMsg('');
    }
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 11) {
      setErrorMsg('Please enter a valid 11-digit mobile number.');
      return;
    }
    
    // Check prefix match
    const selectedOp = operators.find(op => op.id === operator);
    const hasValidPrefix = selectedOp.prefix.some(pref => phoneNumber.startsWith(pref));
    if (!hasValidPrefix) {
      setErrorMsg(`Number prefix doesn't match selected operator (${selectedOp.name} prefixes: ${selectedOp.prefix.join(', ')}).`);
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    
    // Mock API request to send OTP
    setTimeout(() => {
      setIsLoading(false);
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setSimulatedOTP(code);
      setStep(2);
    }, 1500);
  };

  const handleOTPChange = (index, value) => {
    const cleanVal = value.replace(/\D/g, '').substring(0, 1);
    const newOTP = [...enteredOTP];
    newOTP[index] = cleanVal;
    setEnteredOTP(newOTP);
    setErrorMsg('');

    // Auto-focus next input
    if (cleanVal !== '' && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && enteredOTP[index] === '' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        const newOTP = [...enteredOTP];
        newOTP[index - 1] = '';
        setEnteredOTP(newOTP);
      }
    }
  };

  const handleVerifyOTP = (e) => {
    if (e) e.preventDefault();
    const otpCode = enteredOTP.join('');
    if (otpCode.length !== 4) {
      setErrorMsg('Please enter a 4-digit code.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    // Mock API verification
    setTimeout(() => {
      setIsLoading(false);
      if (otpCode === simulatedOTP || otpCode === '1234') { // Allow 1234 as universal bypass
        setIsSubscribed(true);
        setStep(3);
      } else {
        setErrorMsg('Invalid OTP. Please check the simulated SMS alert box and try again.');
      }
    }, 1200);
  };

  const handleCancelSubscription = () => {
    setIsSubscribed(false);
    setPhoneNumber('');
    setStep(1);
    setEnteredOTP(['', '', '', '']);
    setSimulatedOTP('');
  };

  return (
    <section id="subscribe" className="section-padding" style={{ backgroundColor: 'var(--bg-white)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Premium Access</span>
          <h2 className="section-title">BDApp Subscription</h2>
          <p className="section-description">
            Subscribe easily using your mobile account. Active subscriptions unlock full, unlimited AI disease detection, detailed veterinary guidance, and preventative tips.
          </p>
        </div>

        <div className="subscription-widget">
          <div className="subscription-inner">
            <div>
              <h3 className="sub-title">Unlock Premium Diagnostics</h3>
              <p className="sub-desc" style={{ marginBottom: '20px' }}>
                Get instant access to advanced diagnosis reports, symptoms tracking, and detailed medicine recommendations.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--primary-green)' }} />
                  <span style={{ fontSize: '0.9rem' }}>Only 4 BDT/Day (plus taxes)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--primary-green)' }} />
                  <span style={{ fontSize: '0.9rem' }}>Auto-renewal via USSD/SMS</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--primary-green)' }} />
                  <span style={{ fontSize: '0.9rem' }}>Dial *51415# to subscribe directly</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--primary-green)' }} />
                  <span style={{ fontSize: '0.9rem' }}>Cancel anytime by typing STOP</span>
                </div>
              </div>
            </div>

            <div className="bdapp-card">
              {step === 1 && !isSubscribed && (
                <form onSubmit={handleSendOTP}>
                  <div style={{ marginBottom: '16px' }}>
                    <label className="form-label">Select Operator</label>
                    <div className="operator-select-grid">
                      {operators.map((op) => (
                        <button
                          key={op.id}
                          type="button"
                          className={`operator-btn ${operator === op.id ? 'selected' : ''}`}
                          onClick={() => { setOperator(op.id); setErrorMsg(''); }}
                        >
                          {op.name.replace('phone', '')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label className="form-label" htmlFor="phone">Mobile Number</label>
                    <div className="input-container">
                      <div style={{ display: 'relative', flex: 1 }}>
                        <input
                          id="phone"
                          type="tel"
                          className="sub-input"
                          placeholder="e.g. 01812345678"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-orange sub-button"
                        disabled={isLoading || phoneNumber.length !== 11}
                      >
                        {isLoading ? <RefreshCw size={18} className="animate-spin" /> : 'Subscribe'}
                      </button>
                    </div>
                    {errorMsg && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f87171', fontSize: '0.82rem', marginTop: '8px' }}>
                        <AlertCircle size={14} />
                        <span>{errorMsg}</span>
                      </div>
                    )}
                  </div>

                  <div className="sub-info" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Phone size={14} />
                      <span>A 4-digit verification code will be sent to your phone.</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.08)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.75rem', borderLeft: '3px solid var(--accent-orange)', width: '100%', boxSizing: 'border-box' }}>
                      <strong>Direct Sub:</strong> Dial <code>*51415#</code> on your Robi or Airtel mobile connection to subscribe instantly.
                    </div>
                  </div>
                </form>
              )}

              {step === 2 && !isSubscribed && (
                <div className="otp-container">
                  <h4 className="otp-title">Enter Verification Code</h4>
                  <p className="otp-desc">
                    We have sent a simulated verification OTP to <strong>{phoneNumber}</strong> via BDApp charging service.
                  </p>

                  <div className="otp-simulation-alert">
                    <AlertCircle size={16} style={{ color: 'var(--accent-orange)', float: 'left', marginRight: '8px', marginTop: '2px' }} />
                    <div>
                      <strong>Simulated SMS Received:</strong><br />
                      MurgiCare Alert: Your OTP code is <code>{simulatedOTP}</code>. Cost: 4 BDT/Day.
                    </div>
                  </div>

                  <form onSubmit={handleVerifyOTP}>
                    <div className="otp-inputs">
                      {enteredOTP.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-${idx}`}
                          type="text"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          className="otp-field"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOTPChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOTPKeyDown(idx, e)}
                          disabled={isLoading}
                          required
                        />
                      ))}
                    </div>

                    {errorMsg && (
                      <div style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '16px' }}>
                        {errorMsg}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ flex: 1, padding: '10px' }}
                        onClick={() => { setStep(1); setErrorMsg(''); }}
                        disabled={isLoading}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn btn-orange"
                        style={{ flex: 2, padding: '10px' }}
                        disabled={isLoading || enteredOTP.join('').length !== 4}
                      >
                        {isLoading ? 'Verifying...' : 'Verify & Activate'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {(step === 3 || isSubscribed) && (
                <div className="sub-success-state">
                  <div className="success-icon-ring">
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 className="success-title">Subscription Active!</h4>
                  <p className="success-desc">
                    Premium access unlocked successfully. You can now use all premium features on the MurgiCare mobile app.
                  </p>
                  <button
                    className="btn btn-secondary"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
                    onClick={handleCancelSubscription}
                  >
                    Cancel Subscription (Test Lock State)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

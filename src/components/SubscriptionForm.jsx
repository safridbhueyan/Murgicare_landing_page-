import React, { useState, useEffect } from 'react';
import { Phone, Lock, CheckCircle2, ShieldCheck, RefreshCw, XCircle, AlertCircle, Award } from 'lucide-react';
import { sendOtp, verifyOtp, checkSubscription, unsubscribe } from '../services/api';

export default function SubscriptionForm({ isSubscribed, setIsSubscribed }) {
  const [operator, setOperator] = useState('robi'); // Default Robi
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState(1); // 1: Input, 2: OTP, 3: Success
  const [isLoading, setIsLoading] = useState(false);
  const [apiAction, setApiAction] = useState(''); // 'subscribe', 'check', 'verify', 'unsubscribe'
  const [referenceNo, setReferenceNo] = useState('');
  const [enteredOTP, setEnteredOTP] = useState(['', '', '', '', '', '']); // 6-digit OTP
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const operators = [
    { id: 'robi', name: 'Robi', prefix: ['018'] },
    { id: 'airtel', name: 'Airtel', prefix: ['016'] },
  ];

  // Sync state from localStorage on load
  useEffect(() => {
    const savedMobile = localStorage.getItem('murgicare_user_mobile');
    const savedSub = localStorage.getItem('murgicare_is_subscribed');
    if (savedMobile && savedSub === 'true') {
      setPhoneNumber(savedMobile);
      setIsSubscribed(true);
      setStep(3);
    }
  }, [setIsSubscribed]);

  const handlePhoneNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, ''); // numbers only
    if (val.length <= 11) {
      setPhoneNumber(val);
      setErrorMsg('');
      setSuccessMsg('');
    }
  };

  const validatePhoneInput = () => {
    if (phoneNumber.length !== 11) {
      setErrorMsg('Please enter a valid 11-digit mobile number.');
      return false;
    }
    
    // Check prefix match
    const selectedOp = operators.find(op => op.id === operator);
    const hasValidPrefix = selectedOp.prefix.some(pref => phoneNumber.startsWith(pref));
    if (!hasValidPrefix) {
      setErrorMsg(`Number prefix doesn't match selected operator (${selectedOp.name} prefixes: ${selectedOp.prefix.join(', ')}).`);
      return false;
    }
    return true;
  };

  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    if (!validatePhoneInput()) return;

    setIsLoading(true);
    setApiAction('subscribe');
    setErrorMsg('');
    setSuccessMsg('');
    
    try {
      const res = await sendOtp(phoneNumber);
      console.log('sendOtp response:', res);
      
      const refNo = res.referenceNo || res.reference_no || res.reference;
      
      // If server returned S1000 status code or referenceNo, success
      if (refNo) {
        setReferenceNo(refNo);
        setStep(2);
      } else {
        // Handle server-returned error details
        const details = res.statusDetail || res.status || 'Failed to request OTP. Please try again.';
        setErrorMsg(details);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error occurred while contacting the server.');
    } finally {
      setIsLoading(false);
      setApiAction('');
    }
  };

  const handleCheckStatus = async () => {
    if (!validatePhoneInput()) return;

    setIsLoading(true);
    setApiAction('check');
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await checkSubscription(phoneNumber);
      console.log('checkSubscription response:', res);

      const responseString = JSON.stringify(res).toUpperCase();
      const isRegistered = responseString.includes('REGISTERED') && !responseString.includes('UNREGISTERED');

      if (isRegistered) {
        localStorage.setItem('murgicare_user_mobile', phoneNumber);
        localStorage.setItem('murgicare_is_subscribed', 'true');
        setIsSubscribed(true);
        setStep(3);
        setSuccessMsg('Active subscription detected! Unlocked premium features.');
      } else {
        setErrorMsg('This number is not registered yet. Please click "Subscribe" to register.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error occurred while checking subscription status.');
    } finally {
      setIsLoading(false);
      setApiAction('');
    }
  };

  const handleOTPChange = (index, value) => {
    const cleanVal = value.replace(/\D/g, '').substring(0, 1);
    const newOTP = [...enteredOTP];
    newOTP[index] = cleanVal;
    setEnteredOTP(newOTP);
    setErrorMsg('');

    // Auto-focus next input
    if (cleanVal !== '' && index < 5) {
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

  const handleVerifyOTP = async (e) => {
    if (e) e.preventDefault();
    const otpCode = enteredOTP.join('');
    if (otpCode.length !== 6) {
      setErrorMsg('Please enter a 6-digit code.');
      return;
    }

    setIsLoading(true);
    setApiAction('verify');
    setErrorMsg('');

    try {
      const res = await verifyOtp(otpCode, referenceNo);
      console.log('verifyOtp response:', res);

      const responseString = JSON.stringify(res).toUpperCase();
      const isSuccess = responseString.includes('SUCCESS') || 
                        responseString.includes('S1000') || 
                        res.statusCode === 'S1000' || 
                        res.status === 'success';

      if (isSuccess) {
        localStorage.setItem('murgicare_user_mobile', phoneNumber);
        localStorage.setItem('murgicare_is_subscribed', 'true');
        setIsSubscribed(true);
        setStep(3);
      } else {
        setErrorMsg(res.statusDetail || res.status || 'Invalid verification code. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error occurred while verifying code.');
    } finally {
      setIsLoading(false);
      setApiAction('');
    }
  };

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    setApiAction('unsubscribe');
    setErrorMsg('');

    try {
      const res = await unsubscribe(phoneNumber);
      console.log('unsubscribe response:', res);
      
      // Clear storage and state upon unsubscribing
      localStorage.removeItem('murgicare_user_mobile');
      localStorage.removeItem('murgicare_is_subscribed');
      setIsSubscribed(false);
      setPhoneNumber('');
      setStep(1);
      setEnteredOTP(['', '', '', '', '', '']);
      setReferenceNo('');
      setSuccessMsg('Successfully unsubscribed.');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error occurred while unsubscribing.');
    } finally {
      setIsLoading(false);
      setApiAction('');
    }
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
                          onClick={() => { setOperator(op.id); setErrorMsg(''); setSuccessMsg(''); }}
                        >
                          {op.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label className="form-label" htmlFor="phone">Mobile Number</label>
                    <div className="input-container" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <input
                        id="phone"
                        type="tel"
                        className="sub-input"
                        placeholder="e.g. 01812345678"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        required
                        disabled={isLoading}
                        style={{ width: '100%' }}
                      />
                      <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                        <button
                          type="submit"
                          className="btn btn-orange"
                          style={{ flex: 1.2, padding: '14px 20px' }}
                          disabled={isLoading || phoneNumber.length !== 11}
                        >
                          {isLoading && apiAction === 'subscribe' ? (
                            <RefreshCw size={18} className="animate-spin" />
                          ) : (
                            'Subscribe'
                          )}
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          style={{ flex: 1, padding: '14px 20px', color: 'white', borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                          onClick={handleCheckStatus}
                          disabled={isLoading || phoneNumber.length !== 11}
                        >
                          {isLoading && apiAction === 'check' ? (
                            <RefreshCw size={18} className="animate-spin" />
                          ) : (
                            'Check Status'
                          )}
                        </button>
                      </div>
                    </div>
                    {errorMsg && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f87171', fontSize: '0.82rem', marginTop: '8px' }}>
                        <AlertCircle size={14} />
                        <span>{errorMsg}</span>
                      </div>
                    )}
                    {successMsg && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-green)', fontSize: '0.82rem', marginTop: '8px' }}>
                        <CheckCircle2 size={14} />
                        <span>{successMsg}</span>
                      </div>
                    )}
                  </div>

                  <div className="sub-info" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Phone size={14} />
                      <span>An SMS verification OTP will be sent to your phone.</span>
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
                    A real activation SMS has been sent to <strong>{phoneNumber}</strong>. Please enter the 6-digit OTP to complete subscription.
                  </p>

                  <div className="otp-simulation-alert" style={{ borderLeftColor: 'var(--primary-teal)' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--primary-teal)', float: 'left', marginRight: '8px', marginTop: '2px' }} />
                    <div>
                      <strong>SMS Verification Sent:</strong><br />
                      Please check your phone's messages for a 6-digit code.
                      {referenceNo && <><br /><span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Reference No: <code>{referenceNo}</code></span></>}
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
                          style={{ width: '40px', height: '45px', fontSize: '1.25rem' }} // slightly narrower to fit 6 inputs beautifully
                        />
                      ))}
                    </div>

                    {errorMsg && (
                      <div style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <AlertCircle size={14} />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ flex: 1, padding: '10px' }}
                        onClick={() => { setStep(1); setErrorMsg(''); setSuccessMsg(''); }}
                        disabled={isLoading}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn btn-orange"
                        style={{ flex: 2, padding: '10px' }}
                        disabled={isLoading || enteredOTP.join('').length !== 6}
                      >
                        {isLoading && apiAction === 'verify' ? 'Verifying...' : 'Verify & Activate'}
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
                    Premium access is unlocked. You can now use all premium features on the MurgiCare platform.
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
                    Registered Mobile: <strong>{phoneNumber}</strong>
                  </p>
                  <button
                    className="btn btn-secondary"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', borderColor: 'rgba(255,255,255,0.2)', width: '100%' }}
                    onClick={handleCancelSubscription}
                    disabled={isLoading}
                  >
                    {isLoading && apiAction === 'unsubscribe' ? (
                      <RefreshCw size={18} className="animate-spin" />
                    ) : (
                      'Cancel Subscription (Unsubscribe)'
                    )}
                  </button>
                  {errorMsg && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f87171', fontSize: '0.82rem', marginTop: '12px' }}>
                      <AlertCircle size={14} />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

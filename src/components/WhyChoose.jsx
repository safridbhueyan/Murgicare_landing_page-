import React from 'react';
import { X, Check, ShieldCheck, AlertCircle } from 'lucide-react';

export default function WhyChoose() {
  const traditional = [
    { title: "Slow Diagnosis", desc: "Takes days to schedule visits, allowing infection to spread in the coop." },
    { title: "Requires Expert Access", desc: "Requires vet presence in remote locations, which is often unavailable." },
    { title: "High Consultation Cost", desc: "Expensive diagnostic fees for every flock checkup or minor symptom check." },
    { title: "Hard for Remote Farmers", desc: "Inaccessible to farmers far from sub-district agricultural offices." }
  ];

  const murgicare = [
    { title: "AI-Powered Analysis", desc: "Uses trained neural networks to evaluate image features on the spot." },
    { title: "Instant Predictions", desc: "Provides possible disease identifications in seconds, saving critical time." },
    { title: "Available 24/7/365", desc: "Access standard diagnosis reports anytime, even at midnight or holidays." },
    { title: "Easy & Farmer-Friendly", desc: "Simple visual navigation in English and Bangla with simple buttons." },
    { title: "Low Daily Cost", desc: "Subscribe for only 2 BDT/day via USSD mobile accounts." }
  ];

  return (
    <section className="section-padding comparison-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Value Comparison</span>
          <h2 className="section-title">Why Choose MurgiCare</h2>
          <p className="section-description">
            Compare how MurgiCare makes a difference compared to traditional veterinary consultation channels.
          </p>
        </div>

        <div className="comparison-wrapper">
          <div className="comparison-grid">
            {/* Traditional Column */}
            <div className="comp-column">
              <div className="comp-column-header">
                <AlertCircle size={28} style={{ color: '#ef4444' }} />
                <h3 className="comp-column-title">Traditional Diagnosis</h3>
              </div>
              <ul className="comp-list">
                {traditional.map((item, idx) => (
                  <li key={idx} className="comp-item">
                    <X size={20} style={{ color: '#ef4444', marginTop: '2px' }} />
                    <div className="comp-item-content">
                      <h4 style={{ color: 'var(--text-dark)' }}>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* MurgiCare Column */}
            <div className="comp-column murgicare">
              <span className="comp-tag">Recommended</span>
              <div className="comp-column-header">
                <ShieldCheck size={28} style={{ color: 'var(--primary-teal)' }} />
                <h3 className="comp-column-title" style={{ color: 'var(--primary-teal-dark)' }}>MurgiCare Solution</h3>
              </div>
              <ul className="comp-list">
                {murgicare.map((item, idx) => (
                  <li key={idx} className="comp-item">
                    <Check size={20} style={{ color: 'var(--primary-green)', marginTop: '2px' }} />
                    <div className="comp-item-content">
                      <h4 style={{ color: 'var(--primary-teal-dark)' }}>{item.title}</h4>
                      <p style={{ color: 'var(--text-medium)' }}>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

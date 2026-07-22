import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Disclaimer() {
  return (
    <section className="section-padding disclaimer-section">
      <div className="container">
        <div className="disclaimer-card">
          <AlertTriangle size={28} className="disclaimer-icon" />
          <div className="disclaimer-content">
            <h3>Important Notice</h3>
            <p>
              AI predictions are intended to assist poultry farmers and are not a substitute for professional veterinary diagnosis. Always consult a qualified veterinarian before administering medication or making treatment decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

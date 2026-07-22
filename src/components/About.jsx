import React from 'react';
import chickenCare from '../assets/chicken-care.png';

export default function About() {
  return (
    <section id="about" className="section-padding about">
      <div className="container">
        <div className="grid-2">
          <div className="about-image-container">
            <img src={chickenCare} className="about-image" alt="Poultry Doctor Care Illustration" />
          </div>

          <div className="about-content">
            <span className="section-tag">About MurgiCare</span>
            <h2 className="section-title" style={{ fontSize: '2.25rem', marginBottom: '20px' }}>
              Smarter Poultry Health Management
            </h2>
            <p className="about-p">
              MurgiCare is an AI-powered poultry health assistant designed to help farmers quickly identify common chicken diseases. By analyzing images of chicken droppings, feet, or facial lesions, the app provides possible disease predictions along with symptoms, prevention methods, and treatment recommendations to support better poultry management.
            </p>
            <p className="about-p" style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
              Built by poultry experts and machine learning researchers, MurgiCare bridges the gap between rural farmers and expert veterinary knowledge. It works instantly, reducing disease spreading rates and improving overall flock survivability.
            </p>

            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-num">95%+</span>
                <span className="stat-lbl">Detection Accuracy</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">2 Sec</span>
                <span className="stat-lbl">Average Diagnostic Time</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">10k+</span>
                <span className="stat-lbl">Farmers Empowered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

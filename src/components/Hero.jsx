import React from 'react';
import appReportLight from '../assets/app-report-light.png';
import logo from '../assets/logo.png';
import { Download, Sparkles, Shield, ArrowRight } from 'lucide-react';

export default function Hero({ scrollToSection }) {
  return (
    <section id="home" className="hero">
      {/* Animated Particles */}
      <div className="hero-particle hero-particle-1"></div>
      <div className="hero-particle hero-particle-2"></div>
      <div className="hero-particle hero-particle-3"></div>
      <div className="hero-particle hero-particle-4"></div>
      <div className="hero-particle hero-particle-5"></div>
      <div className="hero-particle hero-particle-6"></div>
      <div className="hero-particle hero-particle-7"></div>
      <div className="hero-particle hero-particle-8"></div>

      {/* Decorative Blurred Circles */}
      <div className="deco-circle deco-circle-1"></div>
      <div className="deco-circle deco-circle-2"></div>

      <div className="container">
        <div className="grid-2">
          <div className="hero-content animate-fade-in">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>Next-Gen Poultry Health AI</span>
            </div>
            <h1 className="hero-title">
              AI-Powered Chicken Disease Detection
            </h1>
            <p className="hero-subtitle">
              Detect common poultry diseases in seconds using artificial intelligence. Simply scan chicken droppings, feet, or facial lesions to receive disease predictions, symptoms, prevention tips, and treatment guidance.
            </p>
            <div className="hero-ctas">
              <button onClick={() => scrollToSection('download')} className="btn btn-primary">
                <Download size={18} /> Download App
              </button>
              <button onClick={() => scrollToSection('about')} className="btn btn-secondary">
                Learn More <ArrowRight size={18} />
              </button>
            </div>

            {/* Hero Stats Row */}
            <div className="hero-stats-row">
              <div className="hero-stat">
                <span className="hero-stat-number">95%+</span>
                <span className="hero-stat-label">Accuracy</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">2 Sec</span>
                <span className="hero-stat-label">Diagnosis</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">10k+</span>
                <span className="hero-stat-label">Farmers</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">8+</span>
                <span className="hero-stat-label">Diseases</span>
              </div>
            </div>
          </div>

          <div className="hero-mockup-container">
            <div className="hero-phone-mockup animate-float">
              <div className="phone-screen" style={{ padding: 0 }}>
                <div className="phone-notch" style={{ backgroundColor: '#ffffff', opacity: 0.8 }}></div>
                <img src={appReportLight} className="scan-subject-img" alt="MurgiCare Diagnostic Report" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

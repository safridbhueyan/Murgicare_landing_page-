import React from 'react';
import logo from '../assets/logo.png';
import { Mail, PhoneCall, Globe } from 'lucide-react';

export default function Footer({ scrollToSection }) {
  const handleLinkClick = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-about-logo">
              <img src={logo} alt="MurgiCare Logo" />
              <span>MurgiCare</span>
            </div>
            <p className="footer-about-desc">
              AI-powered poultry health diagnostics helping farmers detect chicken diseases in seconds. Restoring farm profitability through technology.
            </p>
            <div className="footer-socials">
              <a href="#facebook" className="social-icon" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#twitter" className="social-icon" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="mailto:safridbhueyan@gmail.com" className="social-icon" aria-label="Email"><Mail size={16} /></a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li className="footer-link-item">
                <a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>Home</a>
              </li>
              <li className="footer-link-item">
                <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>About Us</a>
              </li>
              <li className="footer-link-item">
                <a href="#how-it-works" onClick={(e) => handleLinkClick(e, 'how-it-works')}>How It Works</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li className="footer-link-item">
                <a href="#features" onClick={(e) => handleLinkClick(e, 'features')}>Features</a>
              </li>
              <li className="footer-link-item">
                <a href="#diseases" onClick={(e) => handleLinkClick(e, 'diseases')}>Diseases Detected</a>
              </li>
              <li className="footer-link-item">
                <a href="#subscribe" onClick={(e) => handleLinkClick(e, 'subscribe')}>BDApp Subscription</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Contact & Support</h4>
            <ul className="footer-links" style={{ fontSize: '0.88rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <PhoneCall size={16} style={{ color: 'var(--primary-teal)' }} />
                <span>+880 1700-000000</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Mail size={16} style={{ color: 'var(--primary-teal)' }} />
                <span>safridbhueyan@gmail.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={16} style={{ color: 'var(--primary-teal)' }} />
                <span>www.murgicare.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            Copyright © {new Date().getFullYear()} <strong>MurgiCare</strong>. Created by <strong>Safrid Bhueyan</strong>.
          </div>
          <div className="footer-bottom-links">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy Policy (Simulated)'); }}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service (Simulated)'); }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

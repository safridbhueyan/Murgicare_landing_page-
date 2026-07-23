import React from 'react';
import logo from '../assets/logo.png';
import { Mail, PhoneCall, Globe, Linkedin, ExternalLink } from 'lucide-react';

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
              <a
                href="https://www.linkedin.com/in/safridbhueyan"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon linkedin"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://portfolionew-lime-phi.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon portfolio"
                aria-label="Portfolio"
              >
                <Globe size={16} />
              </a>
              <a href="mailto:safridbhueyan@gmail.com" className="social-icon email" aria-label="Email">
                <Mail size={16} />
              </a>
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
            <div className="footer-contact-item">
              <PhoneCall size={16} />
              <a href="tel:+8801575115194">+880 1575-115194</a>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} />
              <a href="mailto:safridbhueyan@gmail.com">safridbhueyan@gmail.com</a>
            </div>
            <div className="footer-contact-item">
              <Linkedin size={16} />
              <a href="https://www.linkedin.com/in/safridbhueyan" target="_blank" rel="noopener noreferrer">
                LinkedIn Profile
              </a>
            </div>
            <div className="footer-contact-item">
              <ExternalLink size={16} />
              <a href="https://portfolionew-lime-phi.vercel.app" target="_blank" rel="noopener noreferrer">
                Portfolio Website
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            Copyright © {new Date().getFullYear()} <strong>MurgiCare</strong>. Created by{' '}
            <a href="https://portfolionew-lime-phi.vercel.app" target="_blank" rel="noopener noreferrer">
              <strong>Safrid Bhueyan</strong>
            </a>.
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

import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { Menu, X, ShieldAlert, Award } from 'lucide-react';

export default function Header({ isSubscribed, scrollToSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id) => {
    setIsMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#home" className="logo-link" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
          <img src={logo} alt="MurgiCare Logo" className="logo-img" />
          <span>MurgiCare</span>
        </a>

        <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="#home" className="nav-link" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>Home</a></li>
          <li><a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}>About</a></li>
          <li><a href="#how-it-works" className="nav-link" onClick={(e) => { e.preventDefault(); handleLinkClick('how-it-works'); }}>How It Works</a></li>
          <li><a href="#diseases" className="nav-link" onClick={(e) => { e.preventDefault(); handleLinkClick('diseases'); }}>Diseases</a></li>
          <li><a href="#features" className="nav-link" onClick={(e) => { e.preventDefault(); handleLinkClick('features'); }}>Features</a></li>
          {isMenuOpen && (
            <li style={{ marginTop: '20px' }}>
              {isSubscribed ? (
                <div className="badge-premium">
                  <Award size={16} /> Premium Active
                </div>
              ) : (
                <button className="btn btn-primary" onClick={() => handleLinkClick('subscribe')}>Subscribe</button>
              )}
            </li>
          )}
        </ul>

        <div className="header-actions">
          {isSubscribed ? (
            <div className="badge-premium">
              <Award size={16} /> Premium Active
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => scrollToSection('subscribe')}>Subscribe</button>
          )}
        </div>

        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

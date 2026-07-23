import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturesStrip from './components/FeaturesStrip';
import SubscriptionForm from './components/SubscriptionForm';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import AppShowcase from './components/AppShowcase';
import Diseases from './components/Diseases';
import KeyFeatures from './components/KeyFeatures';
import WhyChoose from './components/WhyChoose';
import Disclaimer from './components/Disclaimer';
import Download from './components/Download';
import Footer from './components/Footer';

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />;
}

function App() {
  const [isSubscribed, setIsSubscribed] = useState(() => {
    return localStorage.getItem('murgicare_is_subscribed') === 'true';
  });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="app">
      <ScrollProgressBar />
      <Header isSubscribed={isSubscribed} scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <FeaturesStrip />
      <SubscriptionForm isSubscribed={isSubscribed} setIsSubscribed={setIsSubscribed} />
      <About />
      <HowItWorks />
      <AppShowcase />
      <Diseases />
      <KeyFeatures />
      <WhyChoose />
      <Disclaimer />
      <Download />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}

export default App;

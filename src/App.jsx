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
import DownloadModal from './components/DownloadModal';

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
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

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

  const handleDownloadDirect = () => {
    const link = document.createElement('a');
    link.href = '/murgicare.apk';
    link.setAttribute('download', 'murgicare.apk');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTrigger = () => {
    if (isSubscribed) {
      handleDownloadDirect();
    } else {
      setIsDownloadModalOpen(true);
    }
  };

  return (
    <div className="app">
      <ScrollProgressBar />
      <Header isSubscribed={isSubscribed} scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} isSubscribed={isSubscribed} onDownloadClick={handleDownloadTrigger} />
      <FeaturesStrip />
      <SubscriptionForm isSubscribed={isSubscribed} setIsSubscribed={setIsSubscribed} />
      <About />
      <HowItWorks />
      <AppShowcase />
      <Diseases />
      <KeyFeatures />
      <WhyChoose />
      <Disclaimer />
      <Download isSubscribed={isSubscribed} onDownloadClick={handleDownloadTrigger} />
      <Footer scrollToSection={scrollToSection} />

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onSubscribeClick={() => scrollToSection('subscribe')}
        onDownloadDirect={handleDownloadDirect}
      />
    </div>
  );
}

export default App;

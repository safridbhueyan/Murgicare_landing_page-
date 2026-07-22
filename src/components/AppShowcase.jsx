import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import appSplash from '../assets/app-splash.png';
import appDashboard from '../assets/app-dashboard.png';
import appOnboarding1 from '../assets/app-onboarding-1.png';
import appOnboarding2 from '../assets/app-onboarding-2.png';
import appOnboarding3 from '../assets/app-onboarding-3.png';
import appCrop from '../assets/app-crop.png';
import appSuccessDark from '../assets/app-success-dark.png';
import appReportLight from '../assets/app-report-light.png';
import appReportDark from '../assets/app-report-dark.png';
import appKnowledge from '../assets/app-knowledge.png';

export default function AppShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);

  const screenshots = [
    {
      img: appSplash,
      title: "Clean Splash Screen",
      desc: "Fast, minimal startup with the MurgiCare logo profile."
    },
    {
      img: appOnboarding1,
      title: "AI Disease Detection Guide",
      desc: "Step-by-step introduction showing how farmers scan droppings, feet, or face."
    },
    {
      img: appOnboarding2,
      title: "How It Works Guide",
      desc: "Guides users on how the neural network compares patterns against disease profiles."
    },
    {
      img: appOnboarding3,
      title: "Actionable Results Guide",
      desc: "Explains how the app delivers symptoms, prevention tips, and treatment options."
    },
    {
      img: appDashboard,
      title: "Interactive Bengali Dashboard",
      desc: "Localized tools including FCR calculators, stocking densities, and direct WhatsApp vet helpline support."
    },
    {
      img: appCrop,
      title: "Precision Image Cropping",
      desc: "Focus the scan area using custom grid overlays and rotation controls for accurate diagnosis."
    },
    {
      img: appSuccessDark,
      title: "Analysis Successful",
      desc: "Instant completion state with full diagnostic summary and easy results button."
    },
    {
      img: appReportLight,
      title: "Light-Theme Report",
      desc: "Readable disease predictions (e.g. Fowl Pox with 99.3% confidence) and clinical data."
    },
    {
      img: appReportDark,
      title: "Dark-Theme Details",
      desc: "Detailed tabs for symptoms list, first aid medication (iodine/potash), and vector control prevention guidelines."
    },
    {
      img: appKnowledge,
      title: "Poultry Knowledge Base",
      desc: "Articles by poultry experts (e.g. '5 ways to increase egg production') translated into Bengali."
    }
  ];

  // Adjust visible cards depending on viewport width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setVisibleCards(1);
      } else if (window.innerWidth <= 900) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = screenshots.length - visibleCards;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 3500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, visibleCards]);

  const handleDotClick = (index) => {
    // Prevent going past max index
    const target = index > maxIndex ? maxIndex : index;
    setCurrentIndex(target);
  };

  // Generate dots corresponding to slider groupings
  const totalDots = screenshots.length - visibleCards + 1;

  return (
    <section id="app-showcase" className="section-padding" style={{ backgroundColor: 'var(--bg-light)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">App Walkthrough</span>
          <h2 className="section-title">Explore MurgiCare Interface</h2>
          <p className="section-description">
            Take a closer look at the actual screens and features of the MurgiCare mobile application, designed for maximum clarity and ease of use in the field.
          </p>
        </div>

        <div
          className="showcase-slider-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow */}
          <button className="slider-arrow slider-arrow-prev" onClick={handlePrev} aria-label="Previous Slide">
            <ChevronLeft size={24} />
          </button>

          <div className="showcase-slider-viewport">
            <div
              className="showcase-slider-track"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
            >
              {screenshots.map((s, idx) => (
                <div key={idx} className="showcase-slide">
                  <div className="showcase-mockup">
                    <div className="showcase-screen">
                      <div className="showcase-notch"></div>
                      <img src={s.img} alt={s.title} className="showcase-img" />
                    </div>
                  </div>
                  <h3 className="showcase-card-title">{s.title}</h3>
                  <p className="showcase-card-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button className="slider-arrow slider-arrow-next" onClick={handleNext} aria-label="Next Slide">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicators */}
        <div className="slider-dots">
          {Array.from({ length: totalDots }).map((_, idx) => (
            <button
              key={idx}
              className={`slider-dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => handleDotClick(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Eye, Zap, Pill, ShieldCheck, Languages, Smartphone } from 'lucide-react';

export default function KeyFeatures() {
  const list = [
    {
      icon: <Eye size={24} />,
      title: "AI Image Recognition",
      desc: "Advanced neural networks detect poultry diseases from images of droppings, feet, or combs."
    },
    {
      icon: <Zap size={24} />,
      title: "Fast Diagnosis",
      desc: "Get initial diagnostic results within seconds, allowing rapid action to protect the flock."
    },
    {
      icon: <Pill size={24} />,
      title: "Treatment Guidance",
      desc: "Access information on possible medications, vitamins, and supportive care for each detected condition."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Prevention Tips",
      desc: "Receive actionable biosecurity advice and sanitation steps to stop diseases from spreading."
    },
    {
      icon: <Languages size={24} />,
      title: "Bilingual Support",
      desc: "Fully accessible in both English and Bangla, ensuring ease of use for local Bangladeshi farmers."
    },
    {
      icon: <Smartphone size={24} />,
      title: "Simple Interface",
      desc: "Designed specifically for poultry farmers with simple navigation, icons, and large text."
    }
  ];

  return (
    <section id="features" className="section-padding features-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Powerful Features</span>
          <h2 className="section-title">Key Features</h2>
          <p className="section-description">
            Designed for durability in the field, MurgiCare offers a robust set of tools tailored to modern agricultural needs.
          </p>
        </div>

        <div className="grid-3">
          {list.map((feat, idx) => (
            <div key={idx} className="card">
              <div className="feature-card-icon">
                {feat.icon}
              </div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

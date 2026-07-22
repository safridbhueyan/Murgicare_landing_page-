import React from 'react';
import { Camera, Cpu, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <Camera size={36} className="step-icon" />,
      title: "Take a Photo",
      desc: "Capture a clear image of chicken droppings, feet, or facial lesions using your phone camera."
    },
    {
      num: "02",
      icon: <Cpu size={36} className="step-icon" />,
      title: "AI Analysis",
      desc: "Our trained AI model analyzes the image instantly and compares it with thousands of disease patterns."
    },
    {
      num: "03",
      icon: <CheckCircle size={36} className="step-icon" />,
      title: "Get Results",
      desc: "Receive possible disease predictions with symptoms, prevention tips, and treatment guidance."
    }
  ];

  return (
    <section id="how-it-works" className="section-padding how-it-works">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Easy Process</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-description">
            Diagnosing chicken issues is as simple as clicking a photo. Follow these three simple steps to secure your poultry flock.
          </p>
        </div>

        <div className="timeline">
          {steps.map((step, idx) => (
            <div key={idx} className="timeline-step">
              <div className="step-num-container">
                <span className="step-number">{step.num}</span>
                {step.icon}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

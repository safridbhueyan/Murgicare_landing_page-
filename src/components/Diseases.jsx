import React from 'react';
import { Shield, ShieldAlert, Sparkles, HeartPulse, Stethoscope, AlertTriangle, Eye, Activity } from 'lucide-react';

export default function Diseases() {
  const list = [
    {
      icon: <AlertTriangle size={22} />,
      title: "Newcastle Disease",
      desc: "Highly contagious viral infection affecting respiratory, nervous, and digestive systems, often leading to rapid flock mortality.",
      type: "severe"
    },
    {
      icon: <ShieldAlert size={22} />,
      title: "Coccidiosis",
      desc: "Parasitic intestinal tract infection leading to bloody diarrhea, severe nutrient malabsorption, and high dehydration risks.",
      type: "severe"
    },
    {
      icon: <Activity size={22} />,
      title: "Salmonella",
      desc: "Bacterial infection causing white-pasty diarrhea, drowsiness, and high mortality in young chicks.",
      type: "moderate"
    },
    {
      icon: <HeartPulse size={22} />,
      title: "Chronic Respiratory Disease (CRD)",
      desc: "Mycoplasma-induced respiratory issue presenting as gurgling sounds, coughing, sneezing, and watery eyes.",
      type: "moderate"
    },
    {
      icon: <Stethoscope size={22} />,
      title: "Infectious Coryza",
      desc: "Acute respiratory bacterial disease causing severe facial swelling, closed eyes, and foul-smelling nasal discharge.",
      type: "moderate"
    },
    {
      icon: <Eye size={22} />,
      title: "Fowl Pox",
      desc: "Viral infection causing dry, warty nodules on comb, wattles, and earlobes, or wet lesions in the throat.",
      type: "moderate"
    },
    {
      icon: <AlertTriangle size={22} />,
      title: "Bumblefoot",
      desc: "Bacterial footpad infection showing as swelling, lameness, and a black skin lesion scab on the bottom of the foot.",
      type: "mild"
    },
    {
      icon: <Sparkles size={22} />,
      title: "Healthy Detection",
      desc: "Analyzes standard color, shape, and tissue textures to confirm normal flock condition, saving diagnostic costs.",
      type: "healthy"
    }
  ];

  return (
    <section id="diseases" className="section-padding diseases-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Flock Diagnostics</span>
          <h2 className="section-title">Diseases We Help Detect</h2>
          <p className="section-description">
            Our AI model is trained on thousands of clinical poultry images to identify common infectious diseases, lesions, and symptoms with high accuracy.
          </p>
        </div>

        <div className="grid-4 diseases-grid">
          {list.map((item, idx) => (
            <div
              key={idx}
              className={`card disease-card ${item.type === 'healthy' ? 'healthy' : ''}`}
            >
              <div className="disease-header">
                <div className="disease-icon-container">
                  {item.icon}
                </div>
                <h3 className="disease-title">{item.title}</h3>
              </div>
              <p className="disease-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

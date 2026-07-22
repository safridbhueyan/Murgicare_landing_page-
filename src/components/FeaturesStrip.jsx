import React from 'react';
import { ShieldCheck, Zap, HeartHandshake, Award, Globe, Lock } from 'lucide-react';

export default function FeaturesStrip() {
  const badges = [
    { icon: <ShieldCheck size={20} />, label: "AI Disease Detection" },
    { icon: <Zap size={20} />, label: "Instant Results" },
    { icon: <HeartHandshake size={20} />, label: "Vet Guidance" },
    { icon: <Award size={20} />, label: "Farmer Friendly" },
    { icon: <Globe size={20} />, label: "Bilingual Support" },
    { icon: <Lock size={20} />, label: "Secure & Fast" }
  ];

  return (
    <section className="features-strip">
      <div className="container features-strip-container">
        {badges.map((badge, idx) => (
          <div key={idx} className="strip-item">
            {badge.icon}
            <span>{badge.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

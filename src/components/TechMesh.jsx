import React from 'react';

export default function TechMesh() {
  return (
    <svg className="tech-mesh" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#a0ffde" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Network lines */}
      <path className="tech-line" d="M920,80 L700,160 L560,120 L420,180 L300,140" />
      <path className="tech-line" d="M80,420 L220,360 L380,420 L520,360 L660,420 L820,360" />
      <path className="tech-line" d="M200,80 L360,140 L540,80 L700,140 L880,100" />

      {/* Nodes */}
      <circle className="tech-node" cx="920" cy="80" r="6" />
      <circle className="tech-node" cx="700" cy="160" r="6" />
      <circle className="tech-node" cx="560" cy="120" r="6" />
      <circle className="tech-node" cx="420" cy="180" r="6" />
      <circle className="tech-node" cx="300" cy="140" r="6" />

      <circle className="tech-node" cx="80" cy="420" r="6" />
      <circle className="tech-node" cx="220" cy="360" r="6" />
      <circle className="tech-node" cx="380" cy="420" r="6" />
      <circle className="tech-node" cx="520" cy="360" r="6" />
      <circle className="tech-node" cx="660" cy="420" r="6" />

      <circle className="tech-node" cx="200" cy="80" r="6" />
      <circle className="tech-node" cx="360" cy="140" r="6" />
      <circle className="tech-node" cx="540" cy="80" r="6" />
      <circle className="tech-node" cx="700" cy="140" r="6" />
      <circle className="tech-node" cx="880" cy="100" r="6" />
    </svg>
  );
}

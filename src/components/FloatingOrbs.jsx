import React from 'react';

function Orb({ style, delay }) {
  return <div className="floating-orb" style={{ ...style, animationDelay: delay }} />;
}

export default function FloatingOrbs({ count = 6 }) {
  // predefined positions for consistent look
  const presets = [
    { right: '8%', bottom: '18%', size: 220 },
    { right: '18%', bottom: '6%', size: 140 },
    { left: '14%',  top: '20%', size: 160 },
    { left: '6%',   bottom: '28%', size: 100 },
    { right: '28%', top: '12%', size: 180 },
    { left: '40%',  top: '6%', size: 120 },
  ];

  return (
    <div className="floating-orbs" aria-hidden="true">
      {presets.slice(0, count).map((p, i) => (
        <Orb
          key={i}
          delay={`${-i * 0.4}s`}
          style={{
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            position: 'absolute',
            ...('left' in p ? { left: p.left } : {}),
            ...('right' in p ? { right: p.right } : {}),
            ...('top' in p ? { top: p.top } : {}),
            ...('bottom' in p ? { bottom: p.bottom } : {}),
          }}
        />
      ))}
    </div>
  );
}

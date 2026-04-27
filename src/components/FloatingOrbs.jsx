import React from 'react';

function Orb({ style, delay }) {
  return <div className="floating-orb" style={{ ...style, animationDelay: delay }} />;
}

export default function FloatingOrbs({ count = 4 }) {
  // symmetric, uniform presets for a balanced look
  const presets = [
    { right: '8%',  bottom: '18%', size: 220 },
    { left:  '8%',  bottom: '18%', size: 220 },
    { right: '12%', top:    '12%', size: 160 },
    { left:  '12%', top:    '12%', size: 160 },
  ];

  return (
    <div className="floating-orbs" aria-hidden="true">
      {presets.slice(0, count).map((p, i) => (
        <Orb
          key={i}
          // evenly staggered positive delays for uniform animation timing
          delay={`${i * 0.6}s`}
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

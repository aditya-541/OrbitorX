import { useEffect, useState } from 'react';

const WORDS = ['Launch.', 'Scale.', 'Build.', 'Orbit.', 'Grow.', 'Ship.'];
const PREFIX = 'We ';

export default function KineticTagline({ className = '' }) {
  const [index, setIndex]   = useState(0);
  const [anim,  setAnim]    = useState('idle'); // 'idle' | 'exit' | 'enter'

  useEffect(() => {
    const cycle = setInterval(() => {
      // exit current word
      setAnim('exit');
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setAnim('enter');
        setTimeout(() => setAnim('idle'), 400);
      }, 320);
    }, 2600);
    return () => clearInterval(cycle);
  }, []);

  const exitStyle = {
    opacity:   0,
    transform: 'translateY(-60%) rotateX(30deg)',
    filter:    'blur(4px)',
  };
  const enterStyle = {
    opacity:   0,
    transform: 'translateY(60%) rotateX(-30deg)',
    filter:    'blur(4px)',
  };
  const idleStyle = {
    opacity:   1,
    transform: 'translateY(0) rotateX(0deg)',
    filter:    'blur(0px)',
  };

  const wordStyle = anim === 'exit' ? exitStyle : anim === 'enter' ? enterStyle : idleStyle;

  return (
    <p
      className={`font-sans font-light leading-snug ${className}`}
      style={{ perspective: '800px' }}
    >
      <span className="text-white/40">{PREFIX}</span>
      <span
        className="inline-block font-medium text-white/80"
        style={{
          ...wordStyle,
          transition: 'opacity 0.32s cubic-bezier(.22,1,.36,1), transform 0.32s cubic-bezier(.22,1,.36,1), filter 0.32s ease',
        }}
      >
        {WORDS[index]}
      </span>
    </p>
  );
}

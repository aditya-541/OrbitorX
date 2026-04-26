import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>[]{}';

/**
 * GlitchText — scrambles text characters on mount, then resolves to final text.
 * Optionally repeats the effect on hover.
 */
export function GlitchText({ text, className = '', tag: Tag = 'span', repeat = false, speed = 40 }) {
  const [displayed, setDisplayed] = useState(text);
  const iterRef  = useRef(0);
  const frameRef = useRef(null);

  const scramble = () => {
    iterRef.current = 0;
    const totalIter = text.length * 3;

    const step = () => {
      const iter = iterRef.current;
      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iter / 3) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      iterRef.current++;
      if (iter < totalIter) {
        frameRef.current = setTimeout(step, speed);
      } else {
        setDisplayed(text);
      }
    };
    step();
  };

  useEffect(() => {
    // Trigger on mount
    const t = setTimeout(scramble, 300);
    return () => {
      clearTimeout(t);
      if (frameRef.current) clearTimeout(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag
      className={className}
      data-text={text}
      onMouseEnter={repeat ? scramble : undefined}
      style={{ cursor: repeat ? 'default' : undefined }}
    >
      {displayed}
    </Tag>
  );
}

/**
 * TextScramble — one‑shot scramble reveal.
 */
export function TextScramble({ text, className = '', delay = 0 }) {
  const [displayed, setDisplayed] = useState('');
  const frameRef = useRef(null);

  useEffect(() => {
    let iter = 0;
    const totalIter = text.length * 4;
    const timer = setTimeout(() => {
      const step = () => {
        setDisplayed(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              if (i < iter / 4) return text[i];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );
        iter++;
        if (iter <= totalIter) {
          frameRef.current = setTimeout(step, 35);
        } else {
          setDisplayed(text);
        }
      };
      step();
    }, delay);

    return () => {
      clearTimeout(timer);
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [text, delay]);

  return <span className={className}>{displayed || '\u00A0'}</span>;
}

import { useState, useEffect } from 'react';
import { GlitchText } from './GlitchText.jsx';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['services', 'work', 'about', 'contact'];
      let current = '';
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 120) current = id;
        }
      });
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const links = [
    { label: 'Services', id: 'services' },
    { label: 'Work',     id: 'work'     },
    { label: 'About',    id: 'about'    },
    { label: 'Contact',  id: 'contact'  },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-neon/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-pixel text-sm text-white neon-text tracking-wider hover:text-neon transition-colors"
          aria-label="OrbitorX home"
        >
          <GlitchText text="OX" repeat tag="span" className="font-pixel text-sm" />
          <span className="font-pixel text-[10px] text-white/50 ml-2">ORBITORX</span>
        </button>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {links.map(({ label, id }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`nav-link font-mono-custom text-xs tracking-widest uppercase transition-colors ${
                  active === id ? 'text-neon active' : 'text-white/60'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => scrollTo('contact')}
          className="btn-neon font-mono-custom text-xs px-5 py-2 tracking-widest hidden md:block"
        >
          LAUNCH →
        </button>

        {/* Mobile hamburger */}
        <MobileMenu links={links} scrollTo={scrollTo} />
      </div>
    </nav>
  );
}

function MobileMenu({ links, scrollTo }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-neon font-pixel text-xs border border-neon/40 px-3 py-2"
        aria-label="Toggle menu"
      >
        {open ? '✕' : '≡'}
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 bg-black/95 border-b border-neon/20 backdrop-blur-md py-4">
          <ul className="flex flex-col items-center gap-6 list-none m-0 p-0">
            {links.map(({ label, id }) => (
              <li key={id}>
                <button
                  onClick={() => { scrollTo(id); setOpen(false); }}
                  className="nav-link font-mono-custom text-sm tracking-widest uppercase text-white/70"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

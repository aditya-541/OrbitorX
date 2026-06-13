import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Services', path: '/services', homeId: 'services' },
  { label: 'Work',     path: '/work',     homeId: 'work'     },
  { label: 'About',    path: '/about',    homeId: 'about'    },
  { label: 'Contact',  path: '/contact',  homeId: 'contact'  },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [activeHomeId, setActiveHomeId] = useState('');
  const location  = useLocation();
  const navigate  = useNavigate();
  const isHome    = location.pathname === '/';

  useEffect(() => {
    if (!isHome) { setActiveHomeId(''); return; }

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = NAV_LINKS.map((l) => l.homeId);
      let current = '';
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      });
      setActiveHomeId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  useEffect(() => {
    setScrolled(window.scrollY > 40);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (link) => navigate(link.path);
  const handleLogoClick = () => {
    if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' });
    else navigate('/');
  };

  const isLinkActive = (link) => {
    if (isHome) return activeHomeId === link.homeId;
    return location.pathname === link.path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/92 backdrop-blur-xl border-b border-neon/15 shadow-[0_1px_0_rgba(0,255,255,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="flex items-center group focus:outline-none shrink-0"
          aria-label="OrbitorX home"
        >
          <img
            src="/logo.png"
            alt="OrbitorX"
            className="h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-125"
            style={{ filter: 'brightness(1.15) contrast(1.05)' }}
            draggable={false}
          />
        </button>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <button
                onClick={() => handleNavClick(link)}
                className={`nav-link font-mono-custom text-[11px] tracking-widest uppercase transition-colors duration-200 ${
                  isLinkActive(link) ? 'text-neon active' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => navigate('/contact')}
          className="btn-neon font-mono-custom text-[11px] px-5 py-2.5 tracking-widest hidden md:block"
        >
          LAUNCH →
        </button>

        {/* Mobile menu */}
        <MobileMenu links={NAV_LINKS} onNavClick={handleNavClick} />
      </div>
    </nav>
  );
}

function MobileMenu({ links, onNavClick }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef  = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [open]);

  // Close on route change
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <div className="md:hidden" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 focus:outline-none group"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span
          className={`block w-6 h-px bg-neon transition-all duration-300 ${open ? 'rotate-45 translate-y-[5px]' : ''}`}
        />
        <span
          className={`block w-6 h-px bg-neon transition-all duration-300 ${open ? 'opacity-0 -translate-x-2' : ''}`}
        />
        <span
          className={`block w-6 h-px bg-neon transition-all duration-300 ${open ? '-rotate-45 -translate-y-[5px]' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-0 right-0 bg-black/96 border-b border-neon/15 backdrop-blur-xl overflow-hidden transition-all duration-350 ease-[cubic-bezier(.22,1,.36,1)] ${
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ transitionProperty: 'max-height, opacity' }}
      >
        <div className="flex justify-center py-5 border-b border-white/5">
          <img src="/logo.png" alt="OrbitorX" className="h-14 w-auto object-contain" style={{ filter: 'brightness(1.1) contrast(1.05)' }} draggable={false} />
        </div>

        <ul className="flex flex-col items-center gap-0 list-none m-0 p-0 py-4">
          {links.map((link, i) => (
            <li key={link.path} className="w-full">
              <button
                onClick={() => { onNavClick(link); setOpen(false); }}
                className="w-full py-3.5 font-mono-custom text-sm tracking-widest uppercase text-white/60 hover:text-neon hover:bg-neon/5 transition-all duration-200 text-center"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex justify-center pb-6">
          <button
            onClick={() => { navigate('/contact'); setOpen(false); }}
            className="btn-neon font-mono-custom text-xs px-7 py-3 tracking-widest"
          >
            LAUNCH →
          </button>
        </div>
      </div>
    </div>
  );
}

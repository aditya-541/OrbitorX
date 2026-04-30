import { useState, useEffect } from 'react';
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

  // Scroll-spy only on the home page
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

  // Always navigate to the route path
  const handleNavClick = (link) => {
    navigate(link.path);
  };

  const handleLogoClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const isLinkActive = (link) => {
    if (isHome) return activeHomeId === link.homeId;
    return location.pathname === link.path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-neon/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="flex items-center group focus:outline-none shrink-0"
          aria-label="OrbitorX home"
        >
          <img
            src="/logo.png"
            alt="OrbitorX"
            className="h-14 w-auto object-contain brightness-110 transition-all duration-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_16px_rgba(0,255,255,0.8)]"
            draggable={false}
          />
        </button>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <button
                onClick={() => handleNavClick(link)}
                className={`nav-link font-mono-custom text-xs tracking-widest uppercase transition-colors ${
                  isLinkActive(link) ? 'text-neon active' : 'text-white/60'
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
          className="btn-neon font-mono-custom text-xs px-5 py-2 tracking-widest hidden md:block"
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

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-neon font-pixel text-xs border border-neon/40 px-3 py-2"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? '✕' : '≡'}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-black/95 border-b border-neon/20 backdrop-blur-md py-6">
          {/* Mobile menu logo */}
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="OrbitorX" className="h-10 w-auto object-contain brightness-110" draggable={false} />
          </div>
          <ul className="flex flex-col items-center gap-6 list-none m-0 p-0">
            {links.map((link) => (
              <li key={link.path}>
                <button
                  onClick={() => { onNavClick(link); setOpen(false); }}
                  className="nav-link font-mono-custom text-sm tracking-widest uppercase text-white/70 hover:text-neon transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => { navigate('/contact'); setOpen(false); }}
                className="btn-neon font-mono-custom text-xs px-6 py-3 tracking-widest mt-2"
              >
                LAUNCH →
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

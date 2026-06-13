import { useNavigate } from 'react-router-dom';

const LINKS = [
  { label: 'Services', path: '/services' },
  { label: 'Work',     path: '/work'     },
  { label: 'About',    path: '/about'    },
  { label: 'Contact',  path: '/contact'  },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-dark-2 border-t border-neon/8">

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

        {/* Brand */}
        <div className="flex flex-col gap-4">
          <img
            src="/logo.png"
            alt="OrbitorX"
            className="h-10 w-auto object-contain brightness-110 opacity-75 hover:opacity-100 hover:brightness-125 transition-all duration-300 cursor-pointer"
            draggable={false}
            onClick={() => navigate('/')}
          />
          <p className="font-sans text-white/30 text-xs leading-relaxed max-w-xs">
            We embed, build, and launch alongside founders who refuse to orbit the same problems.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <p className="font-mono-custom text-neon/40 text-[9px] tracking-[0.35em] uppercase">Navigation</p>
          <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
            {LINKS.map((link) => (
              <li key={link.path}>
                <button
                  onClick={() => navigate(link.path)}
                  className="font-mono-custom text-white/35 text-[11px] tracking-widest uppercase hover:text-neon transition-colors duration-200"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Status */}
        <div className="flex flex-col gap-4">
          <p className="font-mono-custom text-neon/40 text-[9px] tracking-[0.35em] uppercase">Get In Touch</p>
          <a
            href="mailto:hello@orbitorx.com"
            className="font-mono-custom text-white/40 text-xs hover:text-neon transition-colors duration-200"
          >
            hello@orbitorx.com
          </a>
          <button
            onClick={() => navigate('/contact')}
            className="btn-neon font-mono-custom text-[10px] px-5 py-2.5 tracking-widest w-fit mt-1"
          >
            LAUNCH PROJECT →
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono-custom text-white/20 text-[10px] tracking-widest">
            © 2025 OrbitorX. All systems go.
          </p>

          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full bg-neon"
              style={{ boxShadow: '0 0 6px #00FFFF', animation: 'blink 2s ease-in-out infinite' }}
              aria-hidden="true"
            />
            <span className="font-mono-custom text-neon/50 text-[9px] tracking-widest">SYSTEMS ONLINE</span>
          </div>
        </div>
      </div>

    </footer>
  );
}

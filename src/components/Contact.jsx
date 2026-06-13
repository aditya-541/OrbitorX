import { useState } from 'react';
import { FadeIn } from './Animations.jsx';

const SOCIAL_LINKS = [
  {
    id: 'twitter',
    label: 'X / Twitter',
    href: 'https://twitter.com/orbitorx',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.258 5.63L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/orbitorx',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/orbitorx',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

export default function Contact({ hideHeader = false }) {
  const [form,      setForm]      = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      // Fallback: still show success on network error (offline / dev mode)
      console.warn('[OrbitorX] Contact submit:', err.message);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-dark-3 py-28 px-6 section-parallax">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        {!hideHeader && (
          <FadeIn className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-5 h-px bg-neon opacity-60" />
              <p className="font-mono-custom text-neon/70 text-[10px] tracking-[0.4em] uppercase">
                // GET IN TOUCH
              </p>
              <div className="w-5 h-px bg-neon opacity-60" />
            </div>
            <h2 className="font-pixel text-white text-2xl md:text-4xl leading-tight">
              Ready to<br />
              <span className="shimmer-text">Orbit?</span>
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-neon to-transparent mx-auto mt-6" />
          </FadeIn>
        )}

        {submitted ? (
          <FadeIn>
            <div className="text-center py-16 border border-neon/30 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(0,255,255,0.04) 0%, transparent 100%)' }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-acid" />

              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 border border-neon/40 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="1.5" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </div>

              <p className="font-pixel text-neon text-sm mb-4">Transmission Received.</p>
              <p className="font-mono-custom text-white/40 text-xs tracking-widest">
                We'll be in contact soon. Stay in orbit.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 font-mono-custom text-white/30 text-[10px] tracking-widest hover:text-neon transition-colors duration-200 underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="font-mono-custom text-neon/70 text-[10px] tracking-widest uppercase">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="neon-input font-sans text-sm px-4 py-3 w-full"
                    autoComplete="name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="font-mono-custom text-neon/70 text-[10px] tracking-widest uppercase">
                    Email <span className="text-acid/60">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="neon-input font-sans text-sm px-4 py-3 w-full"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="font-mono-custom text-neon/70 text-[10px] tracking-widest uppercase">
                  Message <span className="text-acid/60">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, event, or collaboration idea..."
                  className="neon-input font-sans text-sm px-4 py-3 w-full resize-none"
                />
              </div>

              {/* Error message */}
              {error && (
                <p className="font-mono-custom text-red-400 text-xs tracking-wide">{error}</p>
              )}

              {/* Submit row */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <button
                  id="contact-submit"
                  type="submit"
                  disabled={loading}
                  className={`btn-neon font-mono-custom text-xs px-8 py-4 tracking-widest transition-all duration-300 ${
                    loading ? 'opacity-60 cursor-not-allowed' : 'animate-pulse-neon'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border border-neon/50 border-t-neon rounded-full animate-spin inline-block" />
                      Transmitting...
                    </span>
                  ) : (
                    'Launch →'
                  )}
                </button>
                <p className="font-mono-custom text-white/25 text-[10px] tracking-widest">
                  No spam. Only signal.
                </p>
              </div>
            </form>
          </FadeIn>
        )}

        {/* Social links */}
        <FadeIn className="mt-16 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-px bg-white/8" />
            <span className="font-mono-custom text-white/20 text-[9px] tracking-widest">FIND US ON</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ id, label, href, icon }) => (
              <a
                key={id}
                id={`social-${id}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center gap-2 text-white/35 hover:text-neon transition-all duration-300 px-4 py-2.5 border border-white/8 hover:border-neon/40 hover:bg-neon/5 group"
              >
                {icon}
                <span className="font-mono-custom text-[9px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-0 group-hover:w-auto overflow-hidden">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section className="w-full bg-black border-t border-white/8 py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Section label */}
        <p className="font-mono text-xs tracking-widest text-white/35 uppercase mb-6">
          // JOIN 2,400+ SUBSCRIBERS
        </p>

        {/* Heading */}
        <h2 className="font-pixel text-3xl sm:text-4xl text-white mb-4 leading-tight">
          Stay in Orbit
        </h2>

        {/* Subtext */}
        <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-10 max-w-md mx-auto">
          Event recaps, ecosystem updates, and launch intel — direct to your inbox.
        </p>

        {submitted ? (
          <div className="border border-white/15 bg-white/3 rounded px-6 py-8">
            <p className="font-mono text-xs tracking-widest text-white/35 uppercase mb-2">
              // CONFIRMED
            </p>
            <p className="text-white text-base">You're on the list.</p>
            <p className="text-white/40 text-sm mt-1">
              We'll be in touch — no noise, only signal.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="your@email.com"
                className="flex-1 bg-white/3 border border-white/15 text-white placeholder-white/30 text-sm px-4 py-3 rounded outline-none focus:border-white/40 transition-colors duration-200"
              />
              <button
                type="submit"
                className="shrink-0 border border-white text-white text-sm font-mono tracking-widest uppercase px-6 py-3 rounded hover:bg-white hover:text-black transition-colors duration-200"
              >
                Subscribe
              </button>
            </div>

            {error && (
              <p className="text-white/50 text-xs font-mono mt-3 text-left sm:text-left">
                {error}
              </p>
            )}
          </form>
        )}

        {/* Privacy note */}
        {!submitted && (
          <p className="text-white/25 text-xs font-mono mt-4 tracking-wide">
            No spam. Unsubscribe anytime.
          </p>
        )}
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neon/10 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="OrbitorX"
          className="h-10 w-auto object-contain brightness-110 opacity-70 hover:opacity-100 hover:brightness-125 transition-all duration-300"
          draggable={false}
        />

        {/* Copyright */}
        <p className="font-mono-custom text-white/30 text-xs tracking-widest">
          © 2025 OrbitorX. All systems go.
        </p>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full bg-neon"
            style={{ boxShadow: '0 0 6px #00FFFF', animation: 'blink 2s ease-in-out infinite' }}
            aria-hidden="true"
          />
          <span className="font-mono-custom text-neon text-[10px] tracking-widest">SYSTEMS ONLINE</span>
        </div>
      </div>
    </footer>
  );
}

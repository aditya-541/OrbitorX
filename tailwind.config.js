/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: "#00FFFF",
        acid: "#39FF14",
        dark: "#000000",
        "dark-2": "#050505",
        "dark-3": "#0a0a0a",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        mono: ['"Space Mono"', "monospace"],
        sans: ["Outfit", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 12px #00FFFF, 0 0 24px rgba(0, 255, 255, 0.3)",
        "neon-sm": "0 0 6px #00FFFF",
        "neon-lg": "0 0 20px #00FFFF, 0 0 40px rgba(0, 255, 255, 0.4)",
        acid: "0 0 12px #39FF14, 0 0 24px rgba(57, 255, 20, 0.3)",
      },
      animation: {
        blink: "blink 1s steps(2) infinite",
        marquee: "marquee 30s linear infinite",
        "marquee-2": "marquee2 30s linear infinite",
        orbit: "orbit 12s linear infinite",
        starfield: "starfield 60s linear infinite",
        scanline: "scanline 8s linear infinite",
        "glitch-1": "glitch-1 0.3s infinite",
        "glitch-2": "glitch-2 0.3s infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        starfield: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        scanline: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100%" },
        },
        "glitch-1": {
          "0%, 100%": { clip: "rect(42px, 9999px, 44px, 0)", transform: "skew(0.15deg)" },
          "25%": { clip: "rect(12px, 9999px, 59px, 0)", transform: "skew(0.8deg)" },
          "50%": { clip: "rect(71px, 9999px, 73px, 0)", transform: "skew(-0.3deg)" },
          "75%": { clip: "rect(28px, 9999px, 30px, 0)", transform: "skew(0.5deg)" },
        },
        "glitch-2": {
          "0%, 100%": { clip: "rect(65px, 9999px, 119px, 0)", transform: "skew(-0.35deg)" },
          "25%": { clip: "rect(22px, 9999px, 72px, 0)", transform: "skew(0.4deg)" },
          "50%": { clip: "rect(83px, 9999px, 89px, 0)", transform: "skew(-0.1deg)" },
          "75%": { clip: "rect(47px, 9999px, 95px, 0)", transform: "skew(0.6deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-neon": {
          "0%, 100%": { boxShadow: "0 0 12px #00FFFF, 0 0 24px rgba(0, 255, 255, 0.3)" },
          "50%": { boxShadow: "0 0 20px #00FFFF, 0 0 40px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0,255,255,0.2)" },
        },
      },
      backgroundImage: {
        "pixel-grid": "radial-gradient(circle, rgba(0,255,255,0.15) 1px, transparent 1px)",
      },
      backgroundSize: {
        "pixel-grid": "32px 32px",
      },
    },
  },
  plugins: [],
};

// Generates themed event poster images using SVG → JPEG via sharp
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '../public/images/events');
mkdirSync(OUT, { recursive: true });

const events = [
  { file:'event-1', title:'TechSurge 2024',   subtitle:'Hackathon and Dev Summit',        location:'Bengaluru', date:'March 2024',    tagline:'800+ Builders  48 Hours  $50K in Prizes',       bg1:'#000D1A', bg2:'#001A33', accent1:'#00FFFF', accent2:'#00BFFF', pattern:'circuit' },
  { file:'event-2', title:'LaunchPad Summit', subtitle:'Startup Pitch and Funding',        location:'Mumbai',    date:'July 2024',     tagline:'60 Startups  25 VCs  10Cr Funding Pool',         bg1:'#0D001A', bg2:'#1A0033', accent1:'#7B2FFF', accent2:'#BF00FF', pattern:'dots'    },
  { file:'event-3', title:'Orbit Conf 2023',  subtitle:'Web3 and DeFi Conference',         location:'Hyderabad', date:'November 2023', tagline:'1200 Attendees  40 Speakers  3 Days',            bg1:'#001A0D', bg2:'#00330D', accent1:'#39FF14', accent2:'#00FF88', pattern:'grid'    },
  { file:'event-4', title:'Scale Week',       subtitle:'Growth and GTM Intensive',         location:'Delhi',     date:'August 2023',   tagline:'5-Day Bootcamp  200 Founders  30 Mentors',       bg1:'#1A0A00', bg2:'#331500', accent1:'#FF6B00', accent2:'#FFB300', pattern:'lines'   },
  { file:'event-5', title:"GrowthHack 23",    subtitle:'Marketing and Community Workshop', location:'Chennai',   date:'June 2023',     tagline:'300 Marketers  Live Campaigns  War Room',        bg1:'#1A001A', bg2:'#330033', accent1:'#FF00FF', accent2:'#FF69B4', pattern:'dots'    },
  { file:'event-6', title:'Product Cosmos',   subtitle:'Product Design and UX Forum',      location:'Pune',      date:'February 2024', tagline:'500 PMs and Designers  Workshops  Showcases',   bg1:'#001A1A', bg2:'#003333', accent1:'#00FFFF', accent2:'#39FF14', pattern:'circuit' },
  { file:'event-7', title:'Startup Ignite',   subtitle:'Early Stage Pitch Battle',         location:'Bengaluru', date:'September 2022',tagline:'120 Pre-seed Startups  Angel Network',           bg1:'#1A0A00', bg2:'#1A1100', accent1:'#FFD700', accent2:'#FF6B00', pattern:'grid'    },
  { file:'event-8', title:'DevFest OrbitorX', subtitle:'Developer Community Festival',     location:'Kolkata',   date:'December 2022', tagline:'2000 Devs  Open Source  Workshops',              bg1:'#000D1A', bg2:'#00001A', accent1:'#00FFFF', accent2:'#7B2FFF', pattern:'lines'   },
  { file:'event-9', title:'Nexus 2024',       subtitle:'Ecosystem Builder Meetup',         location:'Ahmedabad', date:'May 2024',      tagline:'L1s  L2s  Protocols  Cross-chain Collab',       bg1:'#0A001A', bg2:'#05000D', accent1:'#7B2FFF', accent2:'#00FFFF', pattern:'dots'    },
];

function hex2rgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function makePattern(type, accent1) {
  const c = hex2rgb(accent1);
  const stroke = `rgba(${c.r},${c.g},${c.b},0.08)`;

  if (type === 'circuit') {
    return `
      <line x1="0" y1="150" x2="900" y2="150" stroke="${stroke}" stroke-width="1"/>
      <line x1="0" y1="300" x2="900" y2="300" stroke="${stroke}" stroke-width="1"/>
      <line x1="0" y1="450" x2="900" y2="450" stroke="${stroke}" stroke-width="1"/>
      <line x1="150" y1="0" x2="150" y2="600" stroke="${stroke}" stroke-width="1"/>
      <line x1="300" y1="0" x2="300" y2="600" stroke="${stroke}" stroke-width="1"/>
      <line x1="450" y1="0" x2="450" y2="600" stroke="${stroke}" stroke-width="1"/>
      <line x1="600" y1="0" x2="600" y2="600" stroke="${stroke}" stroke-width="1"/>
      <line x1="750" y1="0" x2="750" y2="600" stroke="${stroke}" stroke-width="1"/>
      <circle cx="150" cy="150" r="4" fill="rgba(${c.r},${c.g},${c.b},0.15)"/>
      <circle cx="300" cy="300" r="4" fill="rgba(${c.r},${c.g},${c.b},0.15)"/>
      <circle cx="450" cy="150" r="4" fill="rgba(${c.r},${c.g},${c.b},0.15)"/>
      <circle cx="600" cy="450" r="4" fill="rgba(${c.r},${c.g},${c.b},0.15)"/>
      <circle cx="750" cy="300" r="4" fill="rgba(${c.r},${c.g},${c.b},0.15)"/>
    `;
  }
  if (type === 'dots') {
    let d = '';
    for (let x = 0; x < 900; x += 40) {
      for (let y = 0; y < 600; y += 40) {
        d += `<circle cx="${x}" cy="${y}" r="1.5" fill="rgba(${c.r},${c.g},${c.b},0.12)"/>`;
      }
    }
    return d;
  }
  if (type === 'grid') {
    let d = '';
    for (let x = 0; x < 900; x += 60) {
      d += `<line x1="${x}" y1="0" x2="${x}" y2="600" stroke="${stroke}" stroke-width="0.5"/>`;
    }
    for (let y = 0; y < 600; y += 60) {
      d += `<line x1="0" y1="${y}" x2="900" y2="${y}" stroke="${stroke}" stroke-width="0.5"/>`;
    }
    return d;
  }
  if (type === 'lines') {
    let d = '';
    for (let i = -600; i < 1500; i += 40) {
      d += `<line x1="${i}" y1="0" x2="${i + 600}" y2="600" stroke="${stroke}" stroke-width="0.7"/>`;
    }
    return d;
  }
  return '';
}

function makeSVG(ev) {
  const c1 = hex2rgb(ev.accent1);
  const c2 = hex2rgb(ev.accent2);
  const bg1 = ev.bg1;
  const bg2 = ev.bg2;

  const pattern = makePattern(ev.pattern, ev.accent1);

  const glowOpacity = 0.18;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="900" height="600" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg1}"/>
      <stop offset="100%" stop-color="${bg2}"/>
    </linearGradient>
    <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${ev.accent1}"/>
      <stop offset="100%" stop-color="${ev.accent2}"/>
    </linearGradient>
    <radialGradient id="glow1" cx="30%" cy="30%" r="50%">
      <stop offset="0%" stop-color="rgba(${c1.r},${c1.g},${c1.b},${glowOpacity})"/>
      <stop offset="100%" stop-color="rgba(${c1.r},${c1.g},${c1.b},0)"/>
    </radialGradient>
    <radialGradient id="glow2" cx="80%" cy="75%" r="45%">
      <stop offset="0%" stop-color="rgba(${c2.r},${c2.g},${c2.b},0.12)"/>
      <stop offset="100%" stop-color="rgba(${c2.r},${c2.g},${c2.b},0)"/>
    </radialGradient>
    <filter id="blur-lg">
      <feGaussianBlur stdDeviation="40"/>
    </filter>
    <filter id="text-glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="clip"><rect width="900" height="600"/></clipPath>
  </defs>

  <!-- Background -->
  <rect width="900" height="600" fill="url(#bg)" clip-path="url(#clip)"/>

  <!-- Ambient glows -->
  <ellipse cx="270" cy="180" rx="350" ry="280" fill="url(#glow1)" filter="url(#blur-lg)" opacity="0.8"/>
  <ellipse cx="720" cy="450" rx="300" ry="250" fill="url(#glow2)" filter="url(#blur-lg)" opacity="0.8"/>

  <!-- Pattern layer -->
  <g clip-path="url(#clip)">${pattern}</g>

  <!-- Noise overlay (subtle) -->
  <rect width="900" height="600" fill="rgba(0,0,0,0.1)"/>

  <!-- Top-left corner accent -->
  <line x1="48" y1="48" x2="120" y2="48" stroke="${ev.accent1}" stroke-width="2"/>
  <line x1="48" y1="48" x2="48" y2="120" stroke="${ev.accent1}" stroke-width="2"/>

  <!-- Bottom-right corner accent -->
  <line x1="852" y1="552" x2="780" y2="552" stroke="${ev.accent2}" stroke-width="2"/>
  <line x1="852" y1="552" x2="852" y2="480" stroke="${ev.accent2}" stroke-width="2"/>

  <!-- Accent top bar -->
  <rect x="48" y="44" width="200" height="2" fill="url(#accent-grad)" rx="1"/>

  <!-- ORBITORX badge -->
  <rect x="48" y="58" width="90" height="18" fill="rgba(${c1.r},${c1.g},${c1.b},0.12)" rx="2"/>
  <text x="55" y="71" font-family="monospace" font-size="9" font-weight="700" letter-spacing="2" fill="${ev.accent1}" opacity="0.9">ORBITORX</text>

  <!-- Date badge top right -->
  <text x="852" y="68" font-family="monospace" font-size="10" letter-spacing="1.5" fill="rgba(255,255,255,0.35)" text-anchor="end">${ev.date} · ${ev.location}</text>

  <!-- Main event title -->
  <text x="48" y="320" font-family="monospace" font-size="58" font-weight="900" letter-spacing="-1" fill="${ev.accent1}" opacity="0.95" filter="url(#text-glow)">${ev.title}</text>

  <!-- Subtitle -->
  <text x="48" y="362" font-family="monospace" font-size="18" font-weight="400" letter-spacing="3" fill="rgba(255,255,255,0.55)">${ev.subtitle.toUpperCase()}</text>

  <!-- Horizontal divider -->
  <line x1="48" y1="385" x2="450" y2="385" stroke="url(#accent-grad)" stroke-width="1" opacity="0.4"/>

  <!-- Tagline -->
  <text x="48" y="410" font-family="monospace" font-size="13" letter-spacing="1" fill="rgba(255,255,255,0.38)">${ev.tagline}</text>

  <!-- Location + year pill -->
  <rect x="48" y="440" width="${ev.location.length * 9 + 30}" height="24" rx="2" fill="rgba(${c1.r},${c1.g},${c1.b},0.1)" stroke="${ev.accent1}" stroke-width="0.5" stroke-opacity="0.4"/>
  <text x="${ev.location.length * 4.5 + 63}" y="456" font-family="monospace" font-size="10" letter-spacing="2" fill="${ev.accent1}" text-anchor="middle" opacity="0.8">${ev.location.toUpperCase()}</text>

  <!-- Bottom scanlines -->
  <rect x="0" y="540" width="900" height="60" fill="rgba(0,0,0,0.4)"/>
  <line x1="0" y1="542" x2="900" y2="542" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
  <line x1="0" y1="546" x2="900" y2="546" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>

  <!-- Orbitorx.com watermark -->
  <text x="852" y="585" font-family="monospace" font-size="10" letter-spacing="2" fill="rgba(255,255,255,0.2)" text-anchor="end">orbitorx.com</text>
</svg>`;
}

const W = 900, H = 600;

for (const ev of events) {
  const svg = makeSVG(ev);
  const svgBuf = Buffer.from(svg, 'utf8');
  const outPath = join(OUT, `${ev.file}.jpg`);

  await sharp(svgBuf)
    .resize(W, H)
    .jpeg({ quality: 92 })
    .toFile(outPath);

  console.log(`✓ ${ev.file}.jpg — ${ev.title}`);
}

console.log('\nAll event images generated ✓');

// Generates professional editorial event poster images (SVG → JPEG via sharp)
import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '../public/images/events');
mkdirSync(OUT, { recursive: true });

const events = [
  {
    file: 'event-1',
    title: 'TechSurge 2024',
    subtitle: 'Hackathon and Dev Summit',
    location: 'Bengaluru, India',
    date: 'March 2024',
    tagline: '800+ Builders  -  48 Hours  -  $50K in Prizes',
    edition: 'Vol. 04',
    bg: '#080C10',
    stripe: '#0F1820',
    accent: '#C8D8E8',
    accentDim: '#3A5068',
    label: 'DEV',
  },
  {
    file: 'event-2',
    title: 'LaunchPad Summit',
    subtitle: 'Startup Pitch and Funding',
    location: 'Mumbai, India',
    date: 'July 2024',
    tagline: '60 Startups  -  25 VCs  -  Rs.10Cr Funding Pool',
    edition: 'Vol. 07',
    bg: '#0C0810',
    stripe: '#180F20',
    accent: '#D4C8E8',
    accentDim: '#5A3A80',
    label: 'PITCH',
  },
  {
    file: 'event-3',
    title: 'Orbit Conf 2023',
    subtitle: 'Web3 and DeFi Conference',
    location: 'Hyderabad, India',
    date: 'November 2023',
    tagline: '1,200 Attendees  -  40 Speakers  -  3 Days',
    edition: 'Vol. 03',
    bg: '#080C0A',
    stripe: '#0F1A10',
    accent: '#C8E8D0',
    accentDim: '#2A5038',
    label: 'CONF',
  },
  {
    file: 'event-4',
    title: 'Scale Week',
    subtitle: 'Growth and GTM Intensive',
    location: 'New Delhi, India',
    date: 'August 2023',
    tagline: '5-Day Bootcamp  -  200 Founders  -  30 Mentors',
    edition: 'Vol. 02',
    bg: '#100C08',
    stripe: '#201510',
    accent: '#E8D8C8',
    accentDim: '#705030',
    label: 'GTM',
  },
  {
    file: 'event-5',
    title: 'GrowthHack 23',
    subtitle: 'Marketing and Community Workshop',
    location: 'Chennai, India',
    date: 'June 2023',
    tagline: '300 Marketers  -  Live Campaigns  -  War Room',
    edition: 'Vol. 01',
    bg: '#0C080C',
    stripe: '#180F18',
    accent: '#E8C8E8',
    accentDim: '#703870',
    label: 'MKT',
  },
  {
    file: 'event-6',
    title: 'Product Cosmos',
    subtitle: 'Product Design and UX Forum',
    location: 'Pune, India',
    date: 'February 2024',
    tagline: '500 PMs + Designers  -  Workshops  -  Showcases',
    edition: 'Vol. 05',
    bg: '#080C10',
    stripe: '#101820',
    accent: '#C8DCE8',
    accentDim: '#305060',
    label: 'UX',
  },
  {
    file: 'event-7',
    title: 'Startup Ignite',
    subtitle: 'Early Stage Pitch Battle',
    location: 'Bengaluru, India',
    date: 'September 2022',
    tagline: '120 Pre-seed Startups  -  Angel Network',
    edition: 'Vol. 01',
    bg: '#100E08',
    stripe: '#1C1808',
    accent: '#E8E0C8',
    accentDim: '#605828',
    label: 'ANGEL',
  },
  {
    file: 'event-8',
    title: 'DevFest OrbitorX',
    subtitle: 'Developer Community Festival',
    location: 'Kolkata, India',
    date: 'December 2022',
    tagline: '2,000 Devs  -  Open Source  -  15 Workshops',
    edition: 'Vol. 02',
    bg: '#080A10',
    stripe: '#10121C',
    accent: '#C8CCE8',
    accentDim: '#303870',
    label: 'FEST',
  },
  {
    file: 'event-9',
    title: 'Nexus 2024',
    subtitle: 'Ecosystem Builder Meetup',
    location: 'Ahmedabad, India',
    date: 'May 2024',
    tagline: 'L1s - L2s - Protocols - Cross-chain Collab',
    edition: 'Vol. 06',
    bg: '#0A080C',
    stripe: '#140F18',
    accent: '#D0C8E8',
    accentDim: '#483070',
    label: 'ECO',
  },
];

function makeSVG(ev) {
  const W = 1200, H = 675; // 16:9

  // Large ghost number in background
  const num = String(events.indexOf(ev) + 1).padStart(2, '0');

  // Diagonal stripe pattern
  const stripes = Array.from({ length: 30 }, (_, i) => {
    const x = -200 + i * 80;
    return `<line x1="${x}" y1="0" x2="${x + H}" y2="${H}" stroke="${ev.stripe}" stroke-width="1" opacity="0.9"/>`;
  }).join('');

  // Small horizontal rule marks
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const y = 60 + i * 52;
    return `<line x1="0" y1="${y}" x2="12" y2="${y}" stroke="${ev.accent}" stroke-width="1" opacity="0.25"/>`;
  }).join('');

  // Right-side vertical text
  const rightLabel = ev.label;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.65)"/>
    </radialGradient>
    <linearGradient id="bottomFade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.85)"/>
    </linearGradient>
    <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${ev.accent}" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="${ev.accent}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${ev.accent}" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="clip"><rect width="${W}" height="${H}"/></clipPath>
  </defs>

  <!-- Base background -->
  <rect width="${W}" height="${H}" fill="${ev.bg}"/>

  <!-- Diagonal stripe texture -->
  <g clip-path="url(#clip)" opacity="0.5">${stripes}</g>

  <!-- Ghost number in background -->
  <text x="${W / 2}" y="${H / 2 + 100}" font-family="monospace" font-size="420" font-weight="900"
    fill="${ev.accentDim}" opacity="0.12" text-anchor="middle" dominant-baseline="middle"
    letter-spacing="-20">${num}</text>

  <!-- Vignette overlay -->
  <rect width="${W}" height="${H}" fill="url(#vignette)" clip-path="url(#clip)"/>

  <!-- Bottom gradient for text legibility -->
  <rect width="${W}" height="${H}" fill="url(#bottomFade)" clip-path="url(#clip)"/>

  <!-- Left edge accent bar -->
  <rect x="0" y="0" width="3" height="${H}" fill="${ev.accent}" opacity="0.7"/>

  <!-- Top margin line -->
  <rect x="0" y="0" width="${W}" height="1" fill="${ev.accent}" opacity="0.08"/>

  <!-- Top-left: OrbitorX wordmark -->
  <text x="40" y="52" font-family="monospace" font-size="11" font-weight="700" letter-spacing="4"
    fill="${ev.accent}" opacity="0.6">ORBITORX</text>
  <rect x="40" y="58" width="60" height="1" fill="${ev.accent}" opacity="0.25"/>

  <!-- Top-left: edition -->
  <text x="40" y="78" font-family="monospace" font-size="10" letter-spacing="3"
    fill="rgba(255,255,255,0.25)">${ev.edition}</text>

  <!-- Top-right: date and location -->
  <text x="${W - 40}" y="48" font-family="monospace" font-size="10" letter-spacing="2.5"
    fill="rgba(255,255,255,0.28)" text-anchor="end">${ev.date.toUpperCase()}</text>
  <text x="${W - 40}" y="66" font-family="monospace" font-size="10" letter-spacing="2"
    fill="rgba(255,255,255,0.18)" text-anchor="end">${ev.location.toUpperCase()}</text>

  <!-- Left ticks -->
  ${ticks}

  <!-- Right vertical label -->
  <text x="${W - 30}" y="${H / 2}" font-family="monospace" font-size="9" font-weight="700"
    letter-spacing="5" fill="${ev.accent}" opacity="0.22" text-anchor="middle"
    transform="rotate(90, ${W - 30}, ${H / 2})">${rightLabel}</text>

  <!-- Label badge -->
  <rect x="40" y="${H - 210}" width="${rightLabel.length * 9 + 24}" height="22" fill="${ev.accentDim}" opacity="0.5" rx="1"/>
  <text x="${40 + (rightLabel.length * 9 + 24) / 2}" y="${H - 194}" font-family="monospace"
    font-size="9" font-weight="700" letter-spacing="3" fill="${ev.accent}"
    text-anchor="middle" opacity="0.9">${rightLabel}</text>

  <!-- Subtitle above title -->
  <text x="40" y="${H - 165}" font-family="monospace" font-size="12" letter-spacing="4"
    fill="rgba(255,255,255,0.38)" font-weight="400">${ev.subtitle.toUpperCase()}</text>

  <!-- Main event title — two lines if needed -->
  <text x="38" y="${H - 100}" font-family="monospace" font-size="72" font-weight="900"
    letter-spacing="-2" fill="${ev.accent}" opacity="0.97">${ev.title}</text>

  <!-- Accent rule under title -->
  <rect x="40" y="${H - 76}" width="480" height="1.5" fill="url(#accentLine)"/>

  <!-- Tagline -->
  <text x="40" y="${H - 50}" font-family="monospace" font-size="12" letter-spacing="2"
    fill="rgba(255,255,255,0.32)">${ev.tagline}</text>

  <!-- Bottom-right: orbitorx.com -->
  <text x="${W - 40}" y="${H - 30}" font-family="monospace" font-size="10" letter-spacing="2"
    fill="rgba(255,255,255,0.15)" text-anchor="end">orbitorx.com</text>

  <!-- Bottom edge line -->
  <rect x="0" y="${H - 2}" width="${W}" height="2" fill="${ev.accent}" opacity="0.3"/>
</svg>`;
}

const W = 1200, H = 675;

for (const ev of events) {
  const svg = makeSVG(ev);
  const svgBuf = Buffer.from(svg, 'utf8');
  const outPath = join(OUT, `${ev.file}.jpg`);

  await sharp(svgBuf)
    .resize(W, H)
    .jpeg({ quality: 95 })
    .toFile(outPath);

  console.log(`✓ ${ev.file}.jpg — ${ev.title}`);
}

console.log('\nAll event posters generated ✓');

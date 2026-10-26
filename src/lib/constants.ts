import type { CarSpec, CarColor, NavItem, WheelFinish } from '@/types'

// ─── Animation ────────────────────────────────────────────────────────────────
export const EASE_CURVE = [0.16, 1, 0.3, 1] as const

// ─── Navigation Items ─────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Performance', href: '#performance' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'Configurator', href: '#configure' },
]

// ─── Car Specifications (Aston Martin Valkyrie AMR Pro) ───────────────────────
// Sourced from Aston Martin Lagonda official technical data
export const CAR_SPECS: CarSpec[] = [
  {
    label: 'Engine',
    value: '6.5L Naturally Aspirated V12',
    description: 'Bespoke Cosworth-developed 65° race-specification V12 with zero hybrid penalty',
  },
  {
    label: 'Redline',
    value: '11,100',
    unit: 'RPM',
    description: 'The highest-revving naturally aspirated production-derived engine in history',
  },
  {
    label: 'Power Output',
    value: '1,000+',
    unit: 'BHP',
    description: 'Over 1,000 bhp (1,014 PS) delivering over 1:1 power-to-weight ratio',
  },
  {
    label: 'Downforce',
    value: '2,660+',
    unit: 'KG',
    description: 'Generates more than twice the downforce of the road-legal Valkyrie',
  },
  {
    label: 'Lateral Force',
    value: '3.5+',
    unit: 'G',
    description: 'Extreme cornering loads exceeding modern Formula 1 and LMP1 parameters',
  },
  {
    label: '0–100 km/h',
    value: '2.1',
    unit: 's',
    description: 'Relentless instantaneous traction on bespoke Michelin racing slicks',
  },
  {
    label: 'Top Speed',
    value: '360',
    unit: 'km/h',
    description: 'Track-calibrated high downforce top speed (225 mph)',
  },
  {
    label: 'Circuit Lap Time',
    value: '3:20',
    unit: 'min',
    description: 'Projected 24 Hours of Le Mans Circuit de la Sarthe lap time',
  },
]

// ─── Primary Performance Stats ────────────────────────────────────────────────
export const PERFORMANCE_STATS = [
  {
    value: '1,000+',
    unit: 'BHP',
    label: 'V12 Power Output',
    detail: '6.5L Cosworth Naturally Aspirated',
  },
  {
    value: '11,100',
    unit: 'RPM',
    label: 'Engine Redline',
    detail: 'Pure High-Frequency Acoustics',
  },
  {
    value: '2,660',
    unit: 'KG',
    label: 'Track Downforce',
    detail: 'Twice the Road Valkyrie',
  },
  {
    value: '3.5+',
    unit: 'G',
    label: 'Lateral Acceleration',
    detail: 'Unrivaled Cornering Velocity',
  },
] as const

// ─── Available Paint Colors (Q by Aston Martin) ──────────────────────────────
export const CAR_COLORS: CarColor[] = [
  {
    id: 'satin_carbon',
    name: 'Satin Exposed Carbon',
    hex: '#0A0C0F',
    accentHex: '#C1CAD2',
    matte: true,
    description: 'Full naked carbon fiber weave with satin anti-glare lacquer.',
  },
  {
    id: 'liquid_titanium',
    name: 'Liquid Titanium Silver',
    hex: '#C1CAD2',
    accentHex: '#282E35',
    metallic: true,
    description: 'High-specular liquid metal finish accentuating sculpted aerodynamic surfaces.',
  },
  {
    id: 'gunmetal_metallic',
    name: 'Gunmetal Competition',
    hex: '#282E35',
    accentHex: '#C1CAD2',
    metallic: true,
    description: 'Deep metallic graphite engineered for high-downforce prototype chassis.',
  },
  {
    id: 'hyper_red',
    name: 'Hyper Red Metallic',
    hex: '#7A0E18',
    accentHex: '#F4F6F8',
    metallic: true,
    description: 'Dramatic high-intensity racing crimson with rich specular response.',
  },
  {
    id: 'mariana_blue',
    name: 'Mariana Deep Blue',
    hex: '#0A1830',
    accentHex: '#C1CAD2',
    metallic: true,
    description: 'Intense ultramarine sapphire inspired by midnight endurance racing.',
  },
  {
    id: 'solaris_yellow',
    name: 'Solaris Trophy Gold',
    hex: '#B88200',
    accentHex: '#0A0C0F',
    metallic: true,
    description: 'Warm high-contrast competition gold engineered for the circuit.',
  },
]

// ─── Available Accent Livery Finishes ────────────────────────────────────────
export const ACCENT_LIVERIES = [
  {
    id: 'silver_leaf',
    name: 'Titanium Silver Accent',
    hex: '#C1CAD2',
  },
  {
    id: 'gunmetal_accent',
    name: 'Gunmetal Track Stripe',
    hex: '#282E35',
  },
  {
    id: 'pure_white',
    name: 'Cirrus Soft White',
    hex: '#F4F6F8',
  },
  {
    id: 'stealth_black',
    name: 'Stealth Carbon Black',
    hex: '#0A0C0F',
  },
] as const

// ─── Available Wheel Finishes ────────────────────────────────────────────────
export const WHEEL_FINISHES: WheelFinish[] = [
  {
    id: 'dark_titanium',
    name: 'Satin Dark Titanium',
    hex: '#4A4D54',
    roughness: 0.32,
    metalness: 0.90,
  },
  {
    id: 'platinum_silver',
    name: 'Platinum Brushed Alloy',
    hex: '#C1CAD2',
    roughness: 0.22,
    metalness: 0.95,
  },
  {
    id: 'gloss_black',
    name: 'Gloss Obsidian Black',
    hex: '#0A0C0F',
    roughness: 0.15,
    metalness: 0.85,
  },
  {
    id: 'satin_gold',
    name: 'Satin Trophy Gold',
    hex: '#C8A251',
    roughness: 0.28,
    metalness: 0.92,
  },
]

// ─── Interior Cockpit Themes ─────────────────────────────────────────────────
export const INTERIOR_THEMES = [
  {
    id: 'alcantara_silver',
    name: 'Obsidian Alcantara / Titanium Silver Stitching',
    hex: '#0A0C0F',
    accent: '#C1CAD2',
    description: 'Ultra-lightweight microfibre bucket seats with refined Titanium Silver detailing.',
  },
  {
    id: 'alcantara_black',
    name: 'Full Stealth Carbon / Nero Alcantara',
    hex: '#0A0C0F',
    accent: '#282E35',
    description: 'Monochrome pure competition interior stripped for absolute focus and minimal glare.',
  },
  {
    id: 'alcantara_red',
    name: 'Pure Racing Alcantara / Crimson Accents',
    hex: '#100D0E',
    accent: '#8C1820',
    description: 'Heritage motorsport trim with contrasting crimson harness belts and driver focal points.',
  },
] as const

// ─── Aerodynamic Highlights ──────────────────────────────────────────────────
export const AERO_FEATURES = [
  {
    title: 'Extreme Ground Effect Tunnels',
    description:
      'Massive carbon venturi tunnels underfloor suck the Valkyrie AMR Pro to the tarmac, generating immense downforce without excessive aerodynamic drag penalties.',
    metric: '2,660 KG',
    metricLabel: 'Peak Downforce',
  },
  {
    title: 'LMP1 Central Aerodynamic Fin',
    description:
      'Inspired by Le Mans 24h prototype regulations, the central dorsal fin channels high-speed airflow directly to the dual-element rear wing, providing yaw stability at 300+ km/h.',
    metric: '360 KM/H',
    metricLabel: 'High-Speed Stability',
  },
  {
    title: 'Active Wing & Front Splitter',
    description:
      'Extended carbon front splitter, dive planes, and an exaggerated dual-plane rear wing work in unison to balance high-speed aerodynamic center of pressure across turns.',
    metric: '3.5+ G',
    metricLabel: 'Lateral Grip',
  },
] as const

// ─── Engineering Highlights ──────────────────────────────────────────────────
export const ENGINEERING_FEATURES = [
  {
    title: '6.5L Naturally Aspirated Cosworth V12',
    description:
      'Free from heavy battery packs or hybrid motors, this bespoke V12 breathes freely up to 11,100 RPM, producing a spine-tingling acoustic soundtrack and instantaneous throttle response.',
    tag: 'Powertrain',
  },
  {
    title: 'Pure Carbon Fiber Monocoque Architecture',
    description:
      'Extended by 266 mm with wider track widths (96 mm front, 115 mm rear), the chassis features full carbon fiber wishbones and Perspex windows, keeping dry weight at ~1,000 kg.',
    tag: 'Chassis',
  },
  {
    title: 'Brembo Carbon Ceramic Brake System',
    description:
      'F1-derived carbon-carbon matrix discs clamped by bespoke monobloc calipers bring the Valkyrie from 300 km/h to standstill in jaw-dropping distances.',
    tag: 'Deceleration',
  },
] as const

// ─── Site Metadata ────────────────────────────────────────────────────────────
export const SITE_NAME = 'Aston Martin Valkyrie AMR Pro'
export const SITE_TAGLINE = 'The Rules Don’t Apply'
export const SITE_DESCRIPTION =
  'Experience the Aston Martin Valkyrie AMR Pro — a no-compromise, 1,000+ BHP naturally aspirated V12 track hypercar delivering Le Mans prototype performance in a breathtaking 3D experience.'

// ─── Canonical Design Tokens (Carbon & Titanium Silver Palette) ────────────────
export const BRAND_COLORS = {
  carbonBlack: '#0A0C0F',
  gunmetal: '#282E35',
  titanium: '#82909C',
  titaniumSilver: '#C1CAD2',
  softWhite: '#F4F6F8',
  mutedGrey: '#929DA8',

  // Canonical semantic aliases
  background: '#0A0C0F',
  card: '#282E35',
  border: '#282E35',
  primary: '#C1CAD2',
  highlight: '#C1CAD2',
  text: '#F4F6F8',
  secondaryText: '#82909C',
  muted: '#929DA8',
  white: '#F4F6F8',
  silver: '#C1CAD2',
} as const

// ─── Vehicle Metadata ─────────────────────────────────────────────────────────
export const VEHICLE = {
  brand: 'Aston Martin',
  model: 'Valkyrie AMR Pro',
  year: '2022–2024',
  production: 'Limited to 40 Bespoke Chassis',
  engine: '6.5L Cosworth Naturally Aspirated V12',
  redline: '11,100 RPM',
  horsepower: '1,000+ BHP',
  downforce: '2,660 kg',
  acceleration: '2.1 s (0–100 km/h)',
  topSpeed: '360 km/h (225 mph)',
  lapTime: '3m 20s (Circuit de la Sarthe)',
  price: '$3,500,000 USD (Approx. Base Allocation)',
} as const
import { PassportLoyaltyCard } from '../types';

export const mockPassportCards: PassportLoyaltyCard[] = [
  {
    id: 'injourney',
    issuer: 'InJourney (Holding BUMN Pariwisata)',
    shortName: 'InJourney Passport',
    programTitle: 'InJourney Heritage & Aviation Pass',
    tagline: 'Indonesian Aviation & Tourism Holding',
    tier: 'Nusantara Elite',
    passportNo: 'INJ-ID-882910',
    gradient: 'from-[#0b192c] via-[#1e3e62] to-[#0a1128]',
    backGradient: 'from-[#050d18] via-[#0b1726] to-[#050a12]',
    accentColor: 'text-sky-400',
    badgeBg: 'bg-sky-500/20',
    badgeText: 'text-sky-300',
    borderClass: 'border-sky-500/40 shadow-sky-950/40',
    icon: '✈️',
    points: 4250,
    stampedSites: 12,
    totalSites: 20,
    affiliates: [
      'Taman Mini Indonesia Indah (TMII)',
      'Sarinah Thamrin Department Store',
      'Candi Borobudur Cultural Park',
      'Candi Prambanan Heritage Complex',
      'Airport Cultural Lounges (CGK & SUB)'
    ],
    keyBenefits: [
      'Priority fast-track entry at TMII & Sarinah',
      '15% Off heritage dining at Sarinah Food Gallery',
      'Complimentary airport cultural lounge access'
    ],
    pdpStatus: 'State Tourism Data Protection Law Certified',
    endorser: 'Kementerian BUMN · InJourney Tourism Ecosystem'
  },
  {
    id: 'solo',
    issuer: 'Dinas Pariwisata Kota Surakarta',
    shortName: 'Dinas Pariwisata Solo',
    programTitle: 'Paspor Budaya & Wisata Surakarta',
    tagline: 'The Spirit of Java · Official Royal Heritage Pass',
    tier: 'Abdi Praja Kencana',
    passportNo: 'SLO-TR-202609',
    gradient: 'from-[#064e3b] via-[#047857] to-[#022c22]',
    backGradient: 'from-[#021f17] via-[#033425] to-[#01140f]',
    accentColor: 'text-emerald-300',
    badgeBg: 'bg-emerald-500/20',
    badgeText: 'text-emerald-300',
    borderClass: 'border-emerald-400/40 shadow-emerald-950/40',
    icon: '👑',
    points: 3100,
    stampedSites: 14,
    totalSites: 32,
    affiliates: [
      'Keraton Surakarta Hadiningrat',
      'Pura Mangkunegaran & Pendopo Agung',
      'Museum Radya Pustaka Surakarta',
      'Lokananta Audio Heritage Studio',
      'Kampung Batik Laweyan & Kauman'
    ],
    keyBenefits: [
      'VIP front-row seating at Mangkunegaran court dance',
      'Free guided access at Museum Radya Pustaka & Lokananta',
      'Exclusive savings across certified Solo artisan batik houses'
    ],
    pdpStatus: 'Surakarta Municipal Tourism Board Verified',
    endorser: 'Pemerintah Kota Surakarta & Kasunanan Royal Court'
  },
  {
    id: 'sarirasa',
    issuer: 'Sarirasa Group Indonesia',
    shortName: 'Sarirasa Group',
    programTitle: 'Sarirasa Privileges Gastronomy Pass',
    tagline: 'Pioneers of Indonesian Archipelago Flavors since 1974',
    tier: 'Senayan Connoisseur Gold',
    passportNo: 'SRG-VIP-90218',
    gradient: 'from-[#3d1200] via-[#78350f] to-[#1c0700]',
    backGradient: 'from-[#1f0900] via-[#381604] to-[#0f0400]',
    accentColor: 'text-amber-400',
    badgeBg: 'bg-amber-600/20',
    badgeText: 'text-amber-300',
    borderClass: 'border-amber-600/40 shadow-amber-950/40',
    icon: '🍢',
    points: 2850,
    stampedSites: 9,
    totalSites: 15,
    affiliates: [
      'Sate Khas Senayan (Plaza Senayan & Menteng)',
      'Sate & Seafood Senayan',
      'TeSaTe Indonesian Fine Dining',
      'Gopek House Authentic Peranakan',
      'Sarirasa Catering & Banquets'
    ],
    keyBenefits: [
      '15% Member dining savings across all outlets',
      'Free signature Es Cendol / Tahu Telur treat on visits',
      'Priority table reservations & annual Chef masterclass invite'
    ],
    pdpStatus: 'Sarirasa Hospitality Privileges Data Certified',
    endorser: 'Sarirasa Kuliner Nusantara · Archipelago Flavors'
  }
];

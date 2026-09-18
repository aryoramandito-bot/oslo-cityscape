import { LedgerEntry, BadgeItem } from '../types';

export const initialUserLedger: LedgerEntry[] = [
  { id: 'l1', action: 'Check-In', spot: 'National Monument (Monas)', pts: 100, icon: '📍', date: '22 Jun 2026' },
  { id: 'l2', action: 'Guided Tour Booking', spot: 'National Monument (Monas)', pts: 400, icon: '🎟️', date: '23 Jun 2026' },
  { id: 'l3', action: 'Special Event Entry', spot: 'National Monument (Monas)', pts: 500, icon: '🎟️', date: '24 Jun 2026' },
  { id: 'l4', action: 'Check-In', spot: 'Kota Tua (Old Batavia)', pts: 100, icon: '📍', date: '22 Jun 2026' },
  { id: 'l5', action: 'Registration Bonus', spot: 'Verified Explorer Badge', pts: 500, icon: '🏅', date: '22 Jun 2026' },
  { id: 'l6', action: 'Badge Unlocked', spot: '🏛️ Heritage Explorer', pts: 400, icon: '🏅', date: '22 Jun 2026' },
  { id: 'l7', action: 'Badge Unlocked', spot: '☕ Caffeine Critic', pts: 300, icon: '🏅', date: '23 Jun 2026' },
  { id: 'l8', action: 'NFT Art Purchase', spot: 'Batavia Heritage NFT #108', pts: 1000, icon: '🎨', date: '23 Jun 2026' },
  { id: 'l9', action: 'Booking', spot: 'Dufan', pts: 200, icon: '🎟️', date: '23 Jun 2026' },
  { id: 'l10', action: 'Booking', spot: 'Oslo Cityscape Flight', pts: 950, icon: '✈️', date: '23 Jun 2026' },
  { id: 'l11', action: 'Check-In', spot: 'Kopi Es Tak Kie', pts: 100, icon: '📍', date: '24 Jun 2026' },
  { id: 'l12', action: 'Order', spot: 'Kopi Es Tak Kie', pts: 200, icon: '🛒', date: '24 Jun 2026' },
  { id: 'l13', action: 'Check-In', spot: 'Giyanti Coffee Roastery', pts: 100, icon: '📍', date: '25 Jun 2026' },
  { id: 'l14', action: 'Order', spot: 'Giyanti Coffee Roastery', pts: 200, icon: '🛒', date: '25 Jun 2026' },
  { id: 'l15', action: 'Check-In', spot: 'Soto Betawi Haji Mamat', pts: 100, icon: '📍', date: '26 Jun 2026' },
  { id: 'l16', action: 'Order', spot: 'Soto Betawi Haji Mamat', pts: 200, icon: '🛒', date: '26 Jun 2026' },
  { id: 'l17', action: 'Check-In', spot: 'Sate Khas Senayan', pts: 100, icon: '📍', date: '26 Jun 2026' },
  { id: 'l18', action: 'Order', spot: 'Sate Khas Senayan', pts: 200, icon: '🛒', date: '26 Jun 2026' },
  { id: 'l19', action: 'Check-In', spot: 'Cafe Batavia', pts: 100, icon: '📍', date: '27 Jun 2026' },
  { id: 'l20', action: 'Order', spot: 'Cafe Batavia', pts: 200, icon: '🛒', date: '27 Jun 2026' },
  { id: 'l21', action: 'VIP Reservation', spot: 'Cafe Batavia', pts: 300, icon: '🍽️', date: '27 Jun 2026' },
  { id: 'l22', action: 'Heritage Dinner Banquet', spot: 'Cafe Batavia', pts: 400, icon: '🍽️', date: '28 Jun 2026' }
];

export const interestBadges: BadgeItem[] = [
  { tag: 'betawi-food', title: '🍜 Betawi Foodie', minCount: 2, pts: 300, icon: '🍜' },
  { tag: 'heritage', title: '🏛️ Heritage Explorer', minCount: 2, pts: 400, icon: '🏛️' },
  { tag: 'coffee', title: '☕ Caffeine Critic', minCount: 2, pts: 300, icon: '☕' },
  { tag: 'arts', title: '🎭 Arts & Culture Connoisseur', minCount: 1, pts: 400, icon: '🎭' },
  { tag: 'recreation', title: '🎢 Thrill Seeker', minCount: 1, pts: 400, icon: '🎢' },
  { tag: 'nature', title: '🌴 Coastal & Highland Nomad', minCount: 1, pts: 300, icon: '🌴' }
];

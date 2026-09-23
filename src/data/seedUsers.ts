import { UserAccount, UserDataVault } from '../types';
import { initialUserLedger } from './initialLedger';

export interface SeedPersona {
  account: UserAccount;
  vault: UserDataVault;
}

export const SEED_PERSONAS: SeedPersona[] = [
  // 1. Astrid Widayani — Surakarta / Laweyan Heritage Custodian
  {
    account: {
      id: 'usr_astrid',
      email: 'astrid.widayani@voyage.id',
      profile: {
        providerUid: 'usr_astrid',
        name: 'Astrid Widayani',
        nationality: 'Indonesian (WNI)',
        region: 'Surakarta / Jawa Tengah',
        age: '35-49',
        gender: 'Female',
        isVerified: true,
        email: 'astrid.widayani@voyage.id',
        bio: 'Cultural heritage preservationist and royal batik archivist in Surakarta & Laweyan.',
        avatarColor: 'from-[#d85d5d] to-[#c64f4f]'
      },
      role: 'Heritage Custodian',
      createdAt: '2026-01-15T08:00:00Z',
      lastActiveAt: 'Just now',
      isGuest: false
    },
    vault: {
      loyaltyPoints: 6650,
      activeCity: 'solo',
      checkins: ['s1', 's2', 's3', 'lw1', 'lw3', 'lw7'],
      eventReminders: ['es1', 'elw1'],
      redeemedPerks: ['prk_solo_1', 'prk_laweyan_1'],
      userLedger: initialUserLedger
    }
  },

  // 2. Budi Santoso — Bandung Creative & Culinary Connoisseur
  {
    account: {
      id: 'usr_budi',
      email: 'budi.santoso@voyage.id',
      profile: {
        providerUid: 'usr_budi',
        name: 'Budi Santoso',
        nationality: 'Indonesian (WNI)',
        region: 'Bandung / Jawa Barat',
        age: '25-34',
        gender: 'Male',
        isVerified: true,
        email: 'budi.santoso@voyage.id',
        bio: 'Specialty coffee roaster, Bandung culinary critic & Art Deco architecture photowalker.',
        avatarColor: 'from-[#4f46e5] to-[#3730a3]'
      },
      role: 'Culinary Critic',
      createdAt: '2026-03-10T11:20:00Z',
      lastActiveAt: '2 hours ago',
      isGuest: false
    },
    vault: {
      loyaltyPoints: 3400,
      activeCity: 'bandung',
      checkins: ['b1', 'b2', 'b18', 'b21', 'b28'],
      eventReminders: ['eb1', 'eb3'],
      redeemedPerks: ['prk_bdg_1', 'prk_bdg_2'],
      userLedger: [
        { id: 'lb1', action: 'Check-In', spot: 'Gedung Sate', pts: 100, icon: '📍', date: '18 Sep 2026' },
        { id: 'lb2', action: 'Guided Tour', spot: 'Gedung Sate', pts: 400, icon: '🎟️', date: '18 Sep 2026' },
        { id: 'lb3', action: 'Check-In', spot: 'Jalan Braga (Braga Street)', pts: 100, icon: '📍', date: '19 Sep 2026' },
        { id: 'lb4', action: 'Order', spot: 'Kopi Toko Djawa', pts: 200, icon: '☕', date: '19 Sep 2026' },
        { id: 'lb5', action: 'Badge Unlocked', spot: '☕ Caffeine Critic', pts: 300, icon: '🏅', date: '19 Sep 2026' },
        { id: 'lb6', action: 'Check-In', spot: 'Batagor Kingsley', pts: 100, icon: '📍', date: '20 Sep 2026' },
        { id: 'lb7', action: 'Order', spot: 'Batagor Kingsley', pts: 200, icon: '🛒', date: '20 Sep 2026' },
        { id: 'lb8', action: 'Review', spot: 'Batagor Kingsley Review', pts: 150, icon: '⭐', date: '20 Sep 2026' },
        { id: 'lb9', action: 'Badge Unlocked', spot: '🍜 Sunda Food Connoisseur', pts: 400, icon: '🏅', date: '20 Sep 2026' },
        { id: 'lb10', action: 'Check-In', spot: 'Kopi Aroma Banceuy', pts: 100, icon: '📍', date: '21 Sep 2026' },
        { id: 'lb11', action: 'Order', spot: 'Kopi Aroma Banceuy', pts: 250, icon: '☕', date: '21 Sep 2026' },
        { id: 'lb12', action: 'Registration Bonus', spot: 'Verified Explorer Badge', pts: 500, icon: '🏅', date: '18 Sep 2026' },
        { id: 'lb13', action: 'Check-In', spot: 'Warung Kopi Purnama', pts: 100, icon: '📍', date: '22 Sep 2026' },
        { id: 'lb14', action: 'Order', spot: 'Warung Kopi Purnama Roti Srikaya', pts: 200, icon: '🛒', date: '22 Sep 2026' },
        { id: 'lb15', action: 'Review', spot: 'Warung Kopi Purnama Review', pts: 150, icon: '⭐', date: '22 Sep 2026' }
      ]
    }
  },

  // 3. Sarah Jenkins — International Cultural Researcher (Jakarta Focus)
  {
    account: {
      id: 'usr_sarah',
      email: 'sarah.jenkins@expats.voyage',
      profile: {
        providerUid: 'usr_sarah',
        name: 'Sarah Jenkins',
        nationality: 'Australian (WNA)',
        region: 'Jakarta Capital Region',
        age: '25-34',
        gender: 'Female',
        isVerified: true,
        email: 'sarah.jenkins@expats.voyage',
        bio: 'Sydney architectural researcher documenting Indonesian independence monuments & Dutch Batavia colonial urban design.',
        avatarColor: 'from-[#059669] to-[#047857]'
      },
      role: 'International Explorer',
      createdAt: '2026-05-01T09:15:00Z',
      lastActiveAt: 'Yesterday',
      isGuest: false
    },
    vault: {
      loyaltyPoints: 1200,
      activeCity: 'jakarta',
      checkins: ['1', '2'],
      eventReminders: ['e1', 'e2'],
      redeemedPerks: ['prk_jkt_1'],
      userLedger: [
        { id: 'ls1', action: 'Registration Bonus', spot: 'Welcome to Nusantara Explorer', pts: 500, icon: '🏅', date: '01 May 2026' },
        { id: 'ls2', action: 'Check-In', spot: 'National Monument (Monas)', pts: 100, icon: '📍', date: '10 May 2026' },
        { id: 'ls3', action: 'Guided Tour', spot: 'Monas Observation Cupola', pts: 300, icon: '🎟️', date: '10 May 2026' },
        { id: 'ls4', action: 'Check-In', spot: 'Kota Tua (Old Batavia)', pts: 100, icon: '📍', date: '15 May 2026' },
        { id: 'ls5', action: 'Review', spot: 'Fatahillah Square Review', pts: 150, icon: '⭐', date: '15 May 2026' },
        { id: 'ls6', action: 'Badge Unlocked', spot: '🏛️ First Landmark Stamp', pts: 50, icon: '🏅', date: '10 May 2026' }
      ]
    }
  }
];

export const GUEST_USER: SeedPersona = {
  account: {
    id: 'usr_guest',
    email: 'guest@voyage.oslo',
    profile: {
      providerUid: 'usr_guest',
      name: 'Guest Explorer',
      nationality: 'International / Anonymous',
      region: 'Discovery Mode',
      age: 'All',
      gender: 'Unspecified',
      isVerified: false,
      bio: 'Exploring Oslo Cityscape in anonymous guest mode. Connect an account to save your passport stamps permanently.',
      avatarColor: 'from-stone-500 to-stone-700'
    },
    role: 'Guest Explorer',
    createdAt: new Date().toISOString(),
    lastActiveAt: 'Just now',
    isGuest: true
  },
  vault: {
    loyaltyPoints: 0,
    activeCity: 'jakarta',
    checkins: [],
    eventReminders: [],
    redeemedPerks: [],
    userLedger: []
  }
};

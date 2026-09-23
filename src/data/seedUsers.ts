import { UserAccount, UserDataVault } from '../types';
import { initialUserLedger } from './initialLedger';

export interface SeedPersona {
  account: UserAccount;
  vault: UserDataVault;
}

export const SEED_PERSONAS: SeedPersona[] = [
  // Astrid Widayani — Sole Primary Explorer Persona tied to device
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
      bio: 'Exploring Oslo Cityscape in anonymous guest mode. Sign in to save your passport stamps permanently.',
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

import { PerkItem } from '../types';

export const mockPerks: PerkItem[] = [
  // Jakarta Perks
  {
    id: 'p1',
    title: '15% Off Flagship Beef Soto',
    merchant: 'Soto Betawi Haji Mamat',
    discount: '15% OFF',
    validUntil: 'Valid Until Dec 2026',
    cityId: 'jakarta',
    description: 'Enjoy 15% discount on all hearty slow-cooked soto betawi bowls and emping crackers.',
    code: 'BETAWI15',
    tags: ['Dining', 'Popular']
  },
  {
    id: 'p2',
    title: 'Complimentary Bir Pletok Welcome Drink',
    merchant: 'Cafe Batavia (Kota Tua)',
    discount: 'FREE ITEM',
    validUntil: 'Valid for Guests',
    cityId: 'jakarta',
    description: 'Redeem an authentic herbal welcome beverage brewed with ginger, lemongrass, and secang wood.',
    code: 'PLETOKFREE',
    tags: ['Beverage', 'Heritage']
  },
  {
    id: 'p3',
    title: 'Free Entry & Priority Pass',
    merchant: 'Jakarta History Museum (Fatahillah)',
    discount: 'FREE PASS',
    validUntil: 'Daily 09:00 - 15:00',
    cityId: 'jakarta',
    description: 'Skip-the-line complimentary access to the historic Old Town Dutch governor museum galleries.',
    code: 'FATAHILLAH26',
    tags: ['Museum', 'VIP']
  },

  // Bandung Perks
  {
    id: 'pb1',
    title: '20% Off Legendary Batagor Platter',
    merchant: 'Batagor Kingsley',
    discount: '20% OFF',
    validUntil: 'Valid Everyday',
    cityId: 'bandung',
    description: 'Special 20% discount on combo fried mackerel dumplings with signature peanut-lime dressing.',
    code: 'KINGSLEY20',
    tags: ['Culinary', 'Signature']
  },
  {
    id: 'pb2',
    title: 'Free Pisang Bolen Souvenir Box',
    merchant: 'Kartika Sari Bakery',
    discount: 'GIFT BOX',
    validUntil: 'Min. Purchase 150k',
    cityId: 'bandung',
    description: 'Complimentary mini box of legendary baked banana-cheese puff pastry rolls.',
    code: 'KARTIKA-OSLO',
    tags: ['Souvenir', 'Bakery']
  },
  {
    id: 'pb3',
    title: 'VIP Seating & Bamboo Souvenir',
    merchant: 'Saung Angklung Udjo',
    discount: 'VIP PERK',
    validUntil: 'Showtimes 15:30',
    cityId: 'bandung',
    description: 'Front-row pavilion seats and a miniature tuned souvenir angklung instrument to take home.',
    code: 'ANGKLUNG-VIP',
    tags: ['Culture', 'Exclusive']
  }
];

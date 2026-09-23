export type Category = 'attraction' | 'culinary';

export interface Landmark {
  id: string;
  name: string;
  category: Category;
  rating?: string;
  image: string;
  description: string;
  history: string;
  hours: string;
  lat: number;
  lng: number;
  placeId?: string;
  tags: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export type CityId = 'jakarta' | 'bandung' | 'solo' | 'laweyan';

export interface CityChapter {
  id: CityId;
  name: string;
  shortName: string;
  tagline: string;
  badge: string;
  themeColor: string;
  accentColor: string;
  sitesCount: number;
}

export type EventCategory = 'workshop' | 'walking' | 'culinary' | 'performance' | 'festival';

export interface EventItem {
  id: string;
  title: string;
  time: string;
  location: string;
  category: EventCategory;
  categoryLabel: string;
  iconUrl: string;
  description: string;
  cityId: CityId;
  duration?: string;
  highlightBadge?: string;
  image?: string;
  host?: string;
  admission?: string;
  itinerary?: string[];
  fullDetails?: string;
  meetingPoint?: string;
  lat?: number;
  lng?: number;
  tags?: string[];
}

export interface PerkItem {
  id: string;
  title: string;
  merchant: string;
  discount: string;
  validUntil: string;
  cityId: CityId;
  description: string;
  code: string;
  tags?: string[];
}

export interface UserProfile {
  providerUid: string;
  name: string;
  nationality: string;
  region: string;
  age: string;
  gender: string;
  isVerified: boolean;
}

export type TabType = 'explore' | 'events' | 'vault' | 'perks' | 'portal';

export interface RadarCoordinate {
  x: number;
  y: number;
}

export interface LedgerEntry {
  id: string;
  action: string;
  spot: string;
  pts: number;
  icon: string;
  date: string;
}

export interface BadgeItem {
  tag: string;
  title: string;
  minCount: number;
  pts: number;
  icon: string;
}

export type SortOption = 'default' | 'rating' | 'name';

export interface PassportLoyaltyCard {
  id: 'injourney' | 'solo' | 'sarirasa';
  issuer: string;
  shortName: string;
  programTitle: string;
  tagline: string;
  tier: string;
  passportNo: string;
  gradient: string;
  backGradient?: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  borderClass: string;
  icon: string;
  points: number;
  stampedSites: number;
  totalSites: number;
  affiliates: string[];
  keyBenefits: string[];
  pdpStatus: string;
  endorser: string;
}


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

export type CityId = 'jakarta' | 'bandung';

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

export interface EventItem {
  id: string;
  title: string;
  time: string;
  location: string;
  category: string;
  description: string;
  cityId: CityId;
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

export type TabType = 'portal' | 'explore' | 'events' | 'vault' | 'perks';

export interface RadarCoordinate {
  x: number;
  y: number;
}

import { createContext, useContext, useState, useEffect, ReactNode, useOptimistic, useTransition } from 'react';
import { Landmark, Review, CityId, TabType, UserProfile, LedgerEntry, SortOption } from '../types';
import { mockLandmarks } from '../data/jakarta';
import { mockBandungLandmarks } from '../data/bandung';
import { initialUserLedger, interestBadges } from '../data/initialLedger';
import { Coordinates, CITY_CENTERS, getDistanceInMeters, formatDistance } from '../utils/geo';

export interface PointsToastData {
  message: string;
  icon: string;
}

interface AppContextType {
  activeCity: CityId;
  setActiveCity: (city: CityId) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  landmarks: Landmark[];
  allLandmarks: Landmark[];
  checkins: string[];
  toggleCheckin: (id: string) => void;
  reviews: Record<string, Review[]>;
  addReview: (landmarkId: string, rating: number, comment: string) => void;
  selectedLandmark: Landmark | null;
  setSelectedLandmark: (landmark: Landmark | null) => void;
  isCitySwitcherOpen: boolean;
  setIsCitySwitcherOpen: (open: boolean) => void;
  isRadarMapOpen: boolean;
  setIsRadarMapOpen: (open: boolean) => void;
  activeIntroCity: CityId | null;
  setActiveIntroCity: (city: CityId | null) => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: 'all' | 'attraction' | 'culinary';
  setCategoryFilter: (cat: 'all' | 'attraction' | 'culinary') => void;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
  // Geospatial & Map
  userLocation: Coordinates | null;
  setUserLocation: (coords: Coordinates | null) => void;
  mapTargetLandmark: Landmark | null;
  setMapTargetLandmark: (lm: Landmark | null) => void;
  openMapToLandmark: (lm: Landmark) => void;
  getLandmarkDistance: (lm: Landmark) => string | null;
  // Loyalty & Ledger
  loyaltyPoints: number;
  userLedger: LedgerEntry[];
  rewardPoints: (pts: number, activityName: string, icon?: string) => void;
  selectedStatementSite: string | null;
  setSelectedStatementSite: (site: string | null) => void;
  pointsToast: PointsToastData | null;
  setPointsToast: (toast: PointsToastData | null) => void;
}

const defaultUserProfile: UserProfile = {
  providerUid: 'voyage_explorer_882910',
  name: 'Aryo Ramandito',
  nationality: 'Indonesian (WNI)',
  region: 'DKI Jakarta',
  age: '25-34',
  gender: 'Male',
  isVerified: true
};

const defaultReviews: Record<string, Review[]> = {
  '1': [
    { id: 'r1', author: 'Sari W.', rating: 5, date: '2 days ago', comment: 'Spectacular views from the top! The museum at the base is very educational.' },
    { id: 'r2', author: 'Budi P.', rating: 5, date: '1 week ago', comment: 'A proud national symbol. The flame of independence looks majestic at sunset.' }
  ],
  '2': [
    { id: 'r3', author: 'Clara K.', rating: 4, date: '3 days ago', comment: 'Renting the colorful Sepeda Onthel in Fatahillah square is such a timeless experience.' }
  ],
  '3': [
    { id: 'r4', author: 'Dimas T.', rating: 5, date: 'Yesterday', comment: 'The richest coconut and milk broth in Jakarta. Generous tender beef cuts.' }
  ],
  'b1': [
    { id: 'rb1', author: 'Reza A.', rating: 5, date: 'Yesterday', comment: 'Stunning Dutch-Sundanese architecture! The sate skewers pinnacle is magnificent.' },
    { id: 'rb2', author: 'Maya S.', rating: 5, date: '3 days ago', comment: 'Clean, well-maintained heritage grounds in the heart of Bandung.' }
  ],
  'b2': [
    { id: 'rb3', author: 'Andi H.', rating: 5, date: '5 days ago', comment: 'A deeply historic site of the 1955 Asia-Africa conference. Well-curated museum.' }
  ],
  'b18': [
    { id: 'rb4', author: 'Taufik K.', rating: 5, date: 'Today', comment: 'The best batagor in Bandung hands down. Crispy exterior with aromatic peanut sauce.' }
  ]
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeCity, setActiveCityState] = useState<CityId>(() => {
    return (localStorage.getItem('oslo_active_city') as CityId) || 'jakarta';
  });
  
  // Landing page defaults to explore
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [isCitySwitcherOpen, setIsCitySwitcherOpen] = useState(false);
  const [isRadarMapOpen, setIsRadarMapOpen] = useState(false);
  const [activeIntroCity, setActiveIntroCity] = useState<CityId | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'attraction' | 'culinary'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  // Loyalty points & ledger
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(() => {
    const saved = localStorage.getItem('oslo_loyalty_points');
    return saved ? parseInt(saved, 10) : 6650;
  });

  const [userLedger, setUserLedger] = useState<LedgerEntry[]>(() => {
    const saved = localStorage.getItem('oslo_user_ledger');
    return saved ? JSON.parse(saved) : initialUserLedger;
  });

  const [selectedStatementSite, setSelectedStatementSite] = useState<string | null>(null);
  const [pointsToast, setPointsToast] = useState<PointsToastData | null>(null);

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('oslo_user_profile');
    return saved ? JSON.parse(saved) : defaultUserProfile;
  });

  const [checkins, setCheckins] = useState<string[]>(() => {
    const saved = localStorage.getItem('oslo_checkins');
    return saved ? JSON.parse(saved) : ['1', '2', '31']; // Original checkins from prototype
  });

  const [reviews, setReviews] = useState<Record<string, Review[]>>(() => {
    const saved = localStorage.getItem('oslo_reviews');
    return saved ? JSON.parse(saved) : defaultReviews;
  });

  const [, startTransition] = useTransition();

  const setActiveCity = (city: CityId) => {
    startTransition(() => {
      setActiveCityState(city);
      localStorage.setItem('oslo_active_city', city);
    });
  };

  const landmarks = activeCity === 'bandung' ? mockBandungLandmarks : mockLandmarks;
  const allLandmarks = [...mockLandmarks, ...mockBandungLandmarks];

  // Geospatial state & Geolocation watcher
  const [userLocation, setUserLocation] = useState<Coordinates | null>(() => {
    return CITY_CENTERS[activeCity] || CITY_CENTERS.jakarta;
  });
  const [mapTargetLandmark, setMapTargetLandmark] = useState<Landmark | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn('Geolocation fallback to city center:', err.message);
          setUserLocation(CITY_CENTERS[activeCity] || CITY_CENTERS.jakarta);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setUserLocation(CITY_CENTERS[activeCity] || CITY_CENTERS.jakarta);
    }
  }, [activeCity]);

  const openMapToLandmark = (lm: Landmark) => {
    setMapTargetLandmark(lm);
    setIsRadarMapOpen(true);
  };

  const getLandmarkDistance = (lm: Landmark): string | null => {
    if (!userLocation) return null;
    const meters = getDistanceInMeters(userLocation.lat, userLocation.lng, lm.lat, lm.lng);
    return formatDistance(meters);
  };

  // Helper to award points and check badges
  const rewardPoints = (pts: number, activityName: string, icon: string = '⭐') => {
    const todayFormatted = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const newEntry: LedgerEntry = {
      id: 'l_' + Date.now(),
      action: activityName.includes('Check')
        ? 'Check-In'
        : activityName.includes('Review')
        ? 'Review'
        : 'Activity',
      spot: activityName,
      pts,
      icon,
      date: todayFormatted
    };

    setLoyaltyPoints(prev => {
      const next = prev + pts;
      localStorage.setItem('oslo_loyalty_points', next.toString());
      return next;
    });

    setUserLedger(prev => {
      const nextLedger = [newEntry, ...prev];

      // Check for tag-based badges to award
      const visitedSpots = nextLedger
        .filter(e => e.action === 'Check-In' || e.action === 'Order' || e.action === 'Review')
        .map(e => e.spot);

      const tagCounts: Record<string, number> = {};
      visitedSpots.forEach(spotName => {
        const spot = allLandmarks.find(l => l.name === spotName);
        if (spot?.tags) {
          spot.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
      });

      interestBadges.forEach(badge => {
        const alreadyHas = nextLedger.some(e => e.action === 'Badge Unlocked' && e.spot === badge.title);
        if (!alreadyHas && (tagCounts[badge.tag] || 0) >= badge.minCount) {
          const badgeEntry: LedgerEntry = {
            id: 'badge_' + Date.now(),
            action: 'Badge Unlocked',
            spot: badge.title,
            pts: badge.pts,
            icon: badge.icon || '🏅',
            date: todayFormatted
          };
          nextLedger.unshift(badgeEntry);
          setLoyaltyPoints(curr => curr + badge.pts);
        }
      });

      localStorage.setItem('oslo_user_ledger', JSON.stringify(nextLedger));
      return nextLedger;
    });

    // Fire celebration toast
    setPointsToast({
      message: `+${pts} pts for ${activityName}`,
      icon
    });
  };

  // Optimistic check-in
  const [optimisticCheckins, setOptimisticCheckin] = useOptimistic(
    checkins,
    (current, id: string) => {
      if (current.includes(id)) {
        return current.filter(item => item !== id);
      }
      return [...current, id];
    }
  );

  const toggleCheckin = (id: string) => {
    const landmark = allLandmarks.find(l => l.id === id);
    const willBeCheckedIn = !checkins.includes(id);

    setOptimisticCheckin(id);
    setCheckins(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('oslo_checkins', JSON.stringify(updated));
      return updated;
    });

    if (willBeCheckedIn && landmark) {
      rewardPoints(100, landmark.name, '📍');
    }
  };

  const addReview = (landmarkId: string, rating: number, comment: string) => {
    const landmark = allLandmarks.find(l => l.id === landmarkId);
    const newReview: Review = {
      id: 'rev_' + Date.now(),
      author: userProfile.name || 'Anonymous Explorer',
      rating,
      date: 'Just now',
      comment
    };

    setReviews(prev => {
      const existing = prev[landmarkId] || [];
      const updated = {
        ...prev,
        [landmarkId]: [newReview, ...existing]
      };
      localStorage.setItem('oslo_reviews', JSON.stringify(updated));
      return updated;
    });

    if (landmark) {
      rewardPoints(150, `${landmark.name} Review`, '⭐');
    }
  };

  useEffect(() => {
    localStorage.setItem('oslo_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  return (
    <AppContext.Provider
      value={{
        activeCity,
        setActiveCity,
        activeTab,
        setActiveTab,
        landmarks,
        allLandmarks,
        checkins: optimisticCheckins,
        toggleCheckin,
        reviews,
        addReview,
        selectedLandmark,
        setSelectedLandmark,
        isCitySwitcherOpen,
        setIsCitySwitcherOpen,
        isRadarMapOpen,
        setIsRadarMapOpen,
        activeIntroCity,
        setActiveIntroCity,
        userProfile,
        setUserProfile,
        searchQuery,
        setSearchQuery,
        categoryFilter,
        setCategoryFilter,
        sortOption,
        setSortOption,
        userLocation,
        setUserLocation,
        mapTargetLandmark,
        setMapTargetLandmark,
        openMapToLandmark,
        getLandmarkDistance,
        loyaltyPoints,
        userLedger,
        rewardPoints,
        selectedStatementSite,
        setSelectedStatementSite,
        pointsToast,
        setPointsToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

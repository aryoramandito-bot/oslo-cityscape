import { createContext, useContext, useState, useEffect, ReactNode, useOptimistic, useTransition } from 'react';
import { Landmark, Review, CityId, TabType, UserProfile } from '../types';
import { mockLandmarks } from '../data/jakarta';
import { mockBandungLandmarks } from '../data/bandung';

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
  
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [isCitySwitcherOpen, setIsCitySwitcherOpen] = useState(false);
  const [isRadarMapOpen, setIsRadarMapOpen] = useState(false);
  const [activeIntroCity, setActiveIntroCity] = useState<CityId | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'attraction' | 'culinary'>('all');

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('oslo_user_profile');
    return saved ? JSON.parse(saved) : defaultUserProfile;
  });

  const [checkins, setCheckins] = useState<string[]>(() => {
    const saved = localStorage.getItem('oslo_checkins');
    return saved ? JSON.parse(saved) : ['1', '3']; // Pre-checked Monas and Soto Betawi
  });

  const [reviews, setReviews] = useState<Record<string, Review[]>>(() => {
    const saved = localStorage.getItem('oslo_reviews');
    return saved ? JSON.parse(saved) : defaultReviews;
  });

  // React 19 useTransition for smooth chapter and tab navigation
  const [, startTransition] = useTransition();

  const setActiveCity = (city: CityId) => {
    startTransition(() => {
      setActiveCityState(city);
      localStorage.setItem('oslo_active_city', city);
    });
  };

  // React 19 Optimistic check-ins
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
    setOptimisticCheckin(id);
    setCheckins(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('oslo_checkins', JSON.stringify(updated));
      return updated;
    });
  };

  const addReview = (landmarkId: string, rating: number, comment: string) => {
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
  };

  useEffect(() => {
    localStorage.setItem('oslo_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const landmarks = activeCity === 'bandung' ? mockBandungLandmarks : mockLandmarks;
  const allLandmarks = [...mockLandmarks, ...mockBandungLandmarks];

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

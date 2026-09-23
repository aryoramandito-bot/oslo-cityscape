import { createContext, useContext, useState, useEffect, ReactNode, useOptimistic, useTransition, useCallback } from 'react';
import { Landmark, Review, CityId, TabType, UserProfile, LedgerEntry, SortOption, EventItem, UserAccount, UserDataVault } from '../types';
import { mockLandmarks } from '../data/jakarta';
import { mockBandungLandmarks } from '../data/bandung';
import { mockSoloLandmarks } from '../data/solo';
import { mockLaweyanLandmarks } from '../data/laweyan';
import { interestBadges } from '../data/initialLedger';
import { Coordinates, CITY_CENTERS, getDistanceInMeters, formatDistance } from '../utils/geo';
import {
  initializeUserStore,
  getRegisteredAccounts,
  getActiveAccountId,
  setActiveAccountId,
  getAccountById,
  getUserVault,
  saveUserVault,
  registerUserAccount,
  removeUserAccount,
} from '../utils/userStore';
import { GUEST_USER } from '../data/seedUsers';

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
  selectedEvent: EventItem | null;
  setSelectedEvent: (event: EventItem | null) => void;
  eventReminders: string[];
  toggleEventReminder: (id: string) => void;
  getEventDistance: (event: EventItem) => string | null;
  redeemedPerks: string[];
  redeemPerk: (perkId: string) => void;
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
  // Multi-User & Auth Session
  currentAccount: UserAccount;
  registeredAccounts: UserAccount[];
  switchUser: (userId: string) => void;
  registerUser: (account: UserAccount, initialVault?: Partial<UserDataVault>) => void;
  loginWithEmail: (email: string, password?: string) => Promise<boolean>;
  loginAsGuest: () => void;
  removeAccount: (userId: string) => void;
  isLoginPageOpen: boolean;
  setIsLoginPageOpen: (open: boolean) => void;
  isAccountSwitcherOpen: boolean;
  setIsAccountSwitcherOpen: (open: boolean) => void;
  isLogoutModalOpen: boolean;
  setIsLogoutModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  logout: () => void;
}

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
  ],
  's1': [
    { id: 'rs1', author: 'Danang W.', rating: 5, date: 'Yesterday', comment: 'Majestic Javanese royal palace! The classical architecture and museum collection are incredible.' }
  ],
  's2': [
    { id: 'rs2', author: 'Siti M.', rating: 5, date: '3 days ago', comment: 'The largest teak pendopo in Southeast Asia. Royal cultural elegance at its finest.' }
  ],
  's17': [
    { id: 'rs3', author: 'Bambang S.', rating: 5, date: 'Today', comment: 'The signature beef steak salad with sweet soy broth is a true royal culinary masterpiece!' }
  ],
  's20': [
    { id: 'rs4', author: 'Tri H.', rating: 5, date: '2 days ago', comment: 'Warm, melt-in-the-mouth serabi straight from the clay pots. Unmatched authentic taste.' }
  ],
  'lw1': [
    { id: 'rlw1', author: 'Raden Mas H.', rating: 5, date: 'Yesterday', comment: 'Deeply serene and spiritual resting sanctuary. The ancestral Pajang banyan trees exude timeless history.' }
  ],
  'lw3': [
    { id: 'rlw2', author: 'Nadia P.', rating: 5, date: '3 days ago', comment: 'Walking through Gang Senggol between high fortress walls feels like stepping right into the 19th century!' }
  ],
  'lw7': [
    { id: 'rlw3', author: 'Wawan K.', rating: 5, date: 'Today', comment: 'Top-tier canting and natural dye workshop! The master craftsmen patiently explain every single motif.' }
  ],
  'lw15': [
    { id: 'rlw4', author: 'Retno A.', rating: 5, date: '2 days ago', comment: 'Authentic warm Apem Mencon straight off the charcoal hearth. Best traditional sweet treat in Solo.' }
  ]
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize multi-user store on boot
  initializeUserStore();

  const [activeUserId, setActiveUserId] = useState<string>(() => getActiveAccountId());
  const [registeredAccounts, setRegisteredAccounts] = useState<UserAccount[]>(() => getRegisteredAccounts());
  const [currentAccount, setCurrentAccount] = useState<UserAccount>(() => getAccountById(activeUserId));

  // Hydrate initial vault for active user
  const initialVault = getUserVault(activeUserId);

  const [activeCity, setActiveCityState] = useState<CityId>(() => {
    return initialVault.activeCity || (localStorage.getItem('oslo_active_city') as CityId) || 'solo';
  });

  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [eventReminders, setEventReminders] = useState<string[]>(() => initialVault.eventReminders || []);
  const [redeemedPerks, setRedeemedPerks] = useState<string[]>(() => initialVault.redeemedPerks || []);

  const [isCitySwitcherOpen, setIsCitySwitcherOpen] = useState(false);
  const [isRadarMapOpen, setIsRadarMapOpen] = useState(false);
  const [activeIntroCity, setActiveIntroCity] = useState<CityId | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'attraction' | 'culinary'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  // Loyalty points & ledger
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(() => initialVault.loyaltyPoints ?? 6650);
  const [userLedger, setUserLedger] = useState<LedgerEntry[]>(() => initialVault.userLedger || []);

  const [selectedStatementSite, setSelectedStatementSite] = useState<string | null>(null);
  const [pointsToast, setPointsToast] = useState<PointsToastData | null>(null);

  // Auth & Multi-User Modal/Overlay States
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAccountSwitcherOpen, setIsAccountSwitcherOpen] = useState(false);
  const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(() => {
    return !localStorage.getItem('oslo_onboarding_completed');
  });

  const [userProfile, setUserProfileState] = useState<UserProfile>(() => currentAccount.profile);

  const setUserProfile = (newProfile: UserProfile) => {
    setUserProfileState(newProfile);
    setCurrentAccount((prev) => {
      const updated = { ...prev, profile: newProfile };
      registerUserAccount(updated);
      return updated;
    });
  };

  const [checkins, setCheckins] = useState<string[]>(() => initialVault.checkins || ['s1', 's2', 's3']);

  const [reviews, setReviews] = useState<Record<string, Review[]>>(() => {
    const saved = localStorage.getItem('oslo_reviews');
    return saved ? JSON.parse(saved) : defaultReviews;
  });

  const [, startTransition] = useTransition();

  const setActiveCity = (city: CityId) => {
    startTransition(() => {
      setActiveCityState(city);
      localStorage.setItem('oslo_active_city', city);
      // Also update active user vault
      saveUserVault(activeUserId, {
        loyaltyPoints,
        userLedger,
        checkins,
        eventReminders,
        redeemedPerks,
        activeCity: city,
      });
    });
  };

  const landmarks = activeCity === 'bandung'
    ? mockBandungLandmarks
    : activeCity === 'solo'
    ? mockSoloLandmarks
    : activeCity === 'laweyan'
    ? mockLaweyanLandmarks
    : mockLandmarks;
  const allLandmarks = [...mockLandmarks, ...mockBandungLandmarks, ...mockSoloLandmarks, ...mockLaweyanLandmarks];

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

  const getEventDistance = (event: EventItem): string | null => {
    if (!userLocation || !event.lat || !event.lng) return null;
    const meters = getDistanceInMeters(userLocation.lat, userLocation.lng, event.lat, event.lng);
    return formatDistance(meters);
  };

  // Helper to persist current vault when user-scoped values change
  const persistCurrentVault = useCallback(
    (overrides?: Partial<UserDataVault>) => {
      saveUserVault(activeUserId, {
        loyaltyPoints,
        userLedger,
        checkins,
        eventReminders,
        redeemedPerks,
        activeCity,
        ...overrides,
      });
    },
    [activeUserId, loyaltyPoints, userLedger, checkins, eventReminders, redeemedPerks, activeCity]
  );

  // Auto-sync active vault when state modifies
  useEffect(() => {
    if (activeUserId) {
      saveUserVault(activeUserId, {
        loyaltyPoints,
        userLedger,
        checkins,
        eventReminders,
        redeemedPerks,
        activeCity,
      });
    }
  }, [activeUserId, loyaltyPoints, userLedger, checkins, eventReminders, redeemedPerks, activeCity]);

  // Multi-User Switching
  const switchUser = useCallback((newUserId: string) => {
    // 1. Flush current state
    saveUserVault(activeUserId, {
      loyaltyPoints,
      userLedger,
      checkins,
      eventReminders,
      redeemedPerks,
      activeCity,
    });

    // 2. Set new active user ID
    setActiveAccountId(newUserId);
    setActiveUserId(newUserId);

    // 3. Hydrate new account and vault
    const targetAccount = getAccountById(newUserId);
    const targetVault = getUserVault(newUserId);

    setCurrentAccount(targetAccount);
    setUserProfileState(targetAccount.profile);
    setLoyaltyPoints(targetVault.loyaltyPoints);
    setUserLedger(targetVault.userLedger || []);
    setCheckins(targetVault.checkins || []);
    setEventReminders(targetVault.eventReminders || []);
    setRedeemedPerks(targetVault.redeemedPerks || []);

    if (targetVault.activeCity) {
      setActiveCityState(targetVault.activeCity);
    }

    setRegisteredAccounts(getRegisteredAccounts());
    setIsAccountSwitcherOpen(false);
    setIsLoginPageOpen(false);
    setIsLogoutModalOpen(false);

    // Fire celebration toast for account switch
    setPointsToast({
      message: `Active Explorer: ${targetAccount.profile.name}`,
      icon: '👤',
    });
  }, [activeUserId, loyaltyPoints, userLedger, checkins, eventReminders, redeemedPerks, activeCity]);

  // Register New User
  const registerUser = useCallback((newAccount: UserAccount, customVault?: Partial<UserDataVault>) => {
    registerUserAccount(newAccount, customVault);
    const updatedAccounts = getRegisteredAccounts();
    setRegisteredAccounts(updatedAccounts);
    switchUser(newAccount.id);
  }, [switchUser]);

  // Login With Email simulation
  const loginWithEmail = useCallback(async (email: string, _password?: string): Promise<boolean> => {
    const accounts = getRegisteredAccounts();
    const match = accounts.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
    if (match) {
      switchUser(match.id);
      return true;
    }
    // If not found, create a new explorer profile on the fly
    const namePart = email.split('@')[0] || 'Explorer';
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const newAcc: UserAccount = {
      id: 'usr_' + Date.now(),
      email: email.trim(),
      profile: {
        providerUid: 'usr_' + Date.now(),
        name: formattedName,
        nationality: 'Indonesian (WNI)',
        region: 'Jakarta Capital Region',
        age: '25-34',
        gender: 'Unspecified',
        isVerified: true,
        email: email.trim(),
        avatarColor: 'from-[#d85d5d] to-[#c64f4f]',
      },
      role: 'Verified Explorer',
      createdAt: new Date().toISOString(),
      lastActiveAt: 'Just now',
      isGuest: false,
    };
    registerUser(newAcc);
    return true;
  }, [registerUser, switchUser]);

  // Login As Guest
  const loginAsGuest = useCallback(() => {
    setActiveAccountId(GUEST_USER.account.id);
    setActiveUserId(GUEST_USER.account.id);
    setCurrentAccount(GUEST_USER.account);
    setUserProfileState(GUEST_USER.account.profile);
    setLoyaltyPoints(GUEST_USER.vault.loyaltyPoints);
    setUserLedger(GUEST_USER.vault.userLedger);
    setCheckins(GUEST_USER.vault.checkins);
    setEventReminders(GUEST_USER.vault.eventReminders);
    setRedeemedPerks(GUEST_USER.vault.redeemedPerks);
    setActiveCityState(GUEST_USER.vault.activeCity);

    setIsLoginPageOpen(false);
    setIsAccountSwitcherOpen(false);
    setPointsToast({
      message: 'Browsing in Anonymous Guest Mode',
      icon: '🧭',
    });
  }, []);

  // Remove Account
  const removeAccount = useCallback((userId: string) => {
    removeUserAccount(userId);
    const remaining = getRegisteredAccounts();
    setRegisteredAccounts(remaining);
    if (activeUserId === userId) {
      const nextId = remaining.length > 0 ? remaining[0].id : 'usr_astrid';
      switchUser(nextId);
    }
  }, [activeUserId, switchUser]);

  const logout = () => {
    setIsAccountSwitcherOpen(false);
    setIsLogoutModalOpen(false);
    setIsLoginPageOpen(true);
  };

  const toggleEventReminder = (id: string) => {
    setEventReminders((prev) => {
      const next = prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id];
      persistCurrentVault({ eventReminders: next });
      return next;
    });
  };

  const redeemPerk = (perkId: string) => {
    setRedeemedPerks((prev) => {
      if (prev.includes(perkId)) return prev;
      const next = [...prev, perkId];
      persistCurrentVault({ redeemedPerks: next });
      return next;
    });
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
        : activityName.includes('Redeem')
        ? 'Voucher Redeemed'
        : 'Activity',
      spot: activityName,
      pts,
      icon,
      date: todayFormatted
    };

    setLoyaltyPoints(prev => {
      const next = prev + pts;
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
      persistCurrentVault({ checkins: updated });
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
        selectedEvent,
        setSelectedEvent,
        eventReminders,
        toggleEventReminder,
        getEventDistance,
        redeemedPerks,
        redeemPerk,
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
        currentAccount,
        registeredAccounts,
        switchUser,
        registerUser,
        loginWithEmail,
        loginAsGuest,
        removeAccount,
        isLoginPageOpen,
        setIsLoginPageOpen,
        isAccountSwitcherOpen,
        setIsAccountSwitcherOpen,
        isLogoutModalOpen,
        setIsLogoutModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        logout,
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

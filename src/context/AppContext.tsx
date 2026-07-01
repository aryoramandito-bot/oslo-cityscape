import { createContext, useContext, useState, ReactNode } from 'react';

export type Tab = 'portal' | 'directory' | 'landmark' | 'events' | 'vault' | 'perks';

interface AppContextType {
  claimedNFTs: string[];
  claimNFT: (id: string, callback?: () => void) => void;
  isClaiming: boolean;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isNFTModalOpen: boolean;
  setIsNFTModalOpen: (open: boolean) => void;
  currentlyClaimingNFT: string | null;
  selectedLandmarkId: string | null;
  setSelectedLandmarkId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [claimedNFTs, setClaimedNFTs] = useState<string[]>([]);
  const [isClaiming, setIsClaiming] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('portal');
  const [isNFTModalOpen, setIsNFTModalOpen] = useState(false);
  const [currentlyClaimingNFT, setCurrentlyClaimingNFT] = useState<string | null>(null);
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string | null>(null);

  const claimNFT = (id: string, callback?: () => void) => {
    setIsClaiming(true);
    setIsNFTModalOpen(true);
    setCurrentlyClaimingNFT(id);
    
    setTimeout(() => {
      setClaimedNFTs(prev => [...prev, id]);
      setIsClaiming(false);
      if (callback) callback();
    }, 2500);
  };

  return (
    <AppContext.Provider value={{ 
      claimedNFTs, 
      claimNFT, 
      isClaiming, 
      activeTab, 
      setActiveTab,
      isNFTModalOpen,
      setIsNFTModalOpen,
      currentlyClaimingNFT,
      selectedLandmarkId,
      setSelectedLandmarkId
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

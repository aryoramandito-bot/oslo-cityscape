import { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/common/Header';
import BottomNav from './components/navigation/BottomNav';
import ExploreTab from './components/tabs/ExploreTab';
import PortalTab from './components/tabs/PortalTab';
import EventsTab from './components/tabs/EventsTab';
import VaultTab from './components/tabs/VaultTab';
import PerksTab from './components/tabs/PerksTab';
import CitySwitcherModal from './components/modals/CitySwitcherModal';
import CityIntroModal from './components/modals/CityIntroModal';
import RadarMapModal from './components/modals/RadarMapModal';
import LandmarkDetailModal from './components/modals/LandmarkDetailModal';
import SiteStatementModal from './components/modals/SiteStatementModal';
import OnboardingModal from './components/modals/OnboardingModal';
import PointsToast from './components/common/PointsToast';

function MainLayout() {
  const { activeTab } = useAppContext();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const isCompleted = localStorage.getItem('oslo_onboarding_completed');
    if (!isCompleted) {
      setShowOnboarding(true);
    }
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'explore':
        return <ExploreTab />;
      case 'events':
        return <EventsTab />;
      case 'vault':
        return <VaultTab />;
      case 'perks':
        return <PerksTab />;
      case 'portal':
        return <PortalTab />;
      default:
        return <ExploreTab />;
    }
  };

  return (
    <div className="mx-auto max-w-md min-h-screen bg-[#f9f8f6] text-gray-800 flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.06)] border-x border-gray-200/60 font-sans">
      {/* Floating Animated Celebration Toast */}
      <PointsToast />

      {/* Persistent Header */}
      <Header />

      {/* Main Tab View Area */}
      <main className="flex-1 px-4 pt-3 overflow-y-auto">
        {renderActiveTab()}
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNav />

      {/* Modals & Overlays */}
      <CitySwitcherModal />
      <CityIntroModal />
      <RadarMapModal />
      <LandmarkDetailModal />
      <SiteStatementModal />
      {showOnboarding && <OnboardingModal onComplete={() => setShowOnboarding(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

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
import EventDetailModal from './components/modals/EventDetailModal';
import SiteStatementModal from './components/modals/SiteStatementModal';
import OnboardingModal from './components/modals/OnboardingModal';
import LogoutModal from './components/modals/LogoutModal';
import AccountSwitcherModal from './components/modals/AccountSwitcherModal';
import LoginPage from './components/auth/LoginPage';
import PointsToast from './components/common/PointsToast';

function MainLayout() {
  const { activeTab, isLoginModalOpen, setIsLoginModalOpen, isLoginPageOpen, setIsLoginPageOpen } = useAppContext();

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
    <div className="mx-auto max-w-md min-h-screen bg-[#f9f8f6] text-stone-900 flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.06)] border-x border-stone-200/60 font-sans selection:bg-[#ff9898]/30">
      {/* Floating Animated Celebration Toast */}
      <PointsToast />

      {/* Persistent Sticky Header */}
      <Header />

      {/* Main Tab Content with generous bottom clearance above floating toolbar */}
      <main className="flex-1 px-4 pt-3 pb-28">
        {renderActiveTab()}
      </main>

      {/* Floating Transparent Liquid Glass Bottom Navigation */}
      <BottomNav />

      {/* Modals & Overlays */}
      <CitySwitcherModal />
      <CityIntroModal />
      <RadarMapModal />
      <LandmarkDetailModal />
      <EventDetailModal />
      <SiteStatementModal />
      <AccountSwitcherModal />
      {isLoginPageOpen && (
        <LoginPage onClose={() => setIsLoginPageOpen(false)} />
      )}
      {isLoginModalOpen && (
        <OnboardingModal onComplete={() => setIsLoginModalOpen(false)} />
      )}
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

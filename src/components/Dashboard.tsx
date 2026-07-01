import { Map, Calendar, Wallet, Compass, Ticket, Hexagon, CheckCircle2 } from 'lucide-react';
import DirectoryTab from './Tabs/DirectoryTab';
import LandmarkTab from './Tabs/LandmarkTab';
import EventsTab from './Tabs/EventsTab';
import VaultTab from './Tabs/VaultTab';
import PerksTab from './Tabs/PerksTab';
import PortalTab from './Tabs/PortalTab';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext, Tab } from '../context/AppContext';

export default function Dashboard() {
  const { activeTab, setActiveTab, isNFTModalOpen, setIsNFTModalOpen, isClaiming } = useAppContext();

  const renderContent = () => {
    switch (activeTab) {
      case 'portal': return <PortalTab />;
      case 'directory': return <DirectoryTab />;
      case 'landmark': return <LandmarkTab />;
      case 'events': return <EventsTab />;
      case 'vault': return <VaultTab />;
      case 'perks': return <PerksTab />;
    }
  };

  const navItems = [
    { id: 'portal', label: 'Portal', icon: Compass },
    { id: 'landmark', label: 'Landmark', icon: Map },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'vault', label: 'Vault', icon: Wallet },
    { id: 'perks', label: 'Perks', icon: Ticket },
  ] as const;

  return (
    <div className="flex flex-col h-full bg-[#0c0c0c] text-gray-200 relative">
      {/* Header */}
      <div className="pt-12 pb-4 px-6 bg-[#0c0c0c] border-b border-gray-200/50 flex items-center justify-between z-10 sticky top-0">
        <div>
           {activeTab === 'directory' && (
             <button onClick={() => setActiveTab('portal')} className="text-gray-400 hover:text-white transition-colors mb-2 flex items-center gap-1">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
               <span className="text-[10px] uppercase tracking-wider font-bold">Back</span>
             </button>
           )}
           <h1 className="text-3xl font-light tracking-tighter text-white mb-0.5">OSLO</h1>
           <span className="text-[10px] text-[#ff9898] font-bold tracking-[0.2em] uppercase block">Guest Portal</span>
        </div>
        <div className="w-10 h-10 rounded-full border border-gray-200/80 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-xs text-white">
           AD
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto relative">
        <div className="px-6 pt-4 pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation Toolbar */}
      <div className="shrink-0 w-full bg-[#0e0e0e] border-t border-gray-200/50 pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.5)] z-20">
        <div className="flex items-center justify-around px-2 h-20">
          {navItems.map(item => (
             <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={cn(
                "flex flex-col items-center gap-1.5 w-16 h-14 justify-center relative transition-all duration-200"
              )}
             >
               <item.icon className={cn("w-5 h-5 transition-colors duration-300", activeTab === item.id ? "text-white" : "text-gray-600")} strokeWidth={activeTab === item.id ? 2.5 : 2} />
               <span 
                className={cn("text-[9px] font-bold uppercase tracking-wider transition-colors duration-300", activeTab === item.id ? "text-white" : "text-gray-600")}
               >
                 {item.label}
               </span>
               {activeTab === item.id && (
                 <motion.div 
                   layoutId="activeTabIndicator" 
                   className="absolute -bottom-3 w-1 h-1 rounded-full bg-white" 
                 />
               )}
             </button>
          ))}
        </div>
      </div>

      {/* Loyalty Point Claim Overlay */}
      {isNFTModalOpen && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md z-[110] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          {isClaiming ? (
            <div className="flex flex-col items-center justify-center w-full">
              <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                <div className="absolute inset-0 border-t-2 border-r-2 border-[#7c3aed] rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-l-2 border-b-2 border-emerald-500 rounded-full animate-[spin_1.5s_reverse_infinite]"></div>
                <Hexagon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-white mb-2 tracking-tighter">Claiming Points</h3>
              <p className="text-[10px] text-[#ff9898] font-bold uppercase tracking-widest animate-pulse">Adding to your balance...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full animate-in fade-in zoom-in duration-500">
              <div className="w-full max-w-[240px] aspect-square rounded-2xl bg-gradient-to-br from-[#7c3aed]/20 to-[#2dd4bf]/20 flex flex-col items-center justify-center border border-gray-200/80 mb-6 p-2 relative shadow-[0_0_40px_rgba(124,58,237,0.3)] text-white">
                <div className="absolute top-3 left-3 bg-white/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] text-[#2dd4bf] uppercase font-bold tracking-wider border border-teal-500/30">
                  Loyalty Reward
                </div>
                <div className="text-6xl mb-4">🌟</div>
                <div className="text-5xl font-black">+500</div>
                <div className="text-sm font-bold text-[#ff9898] uppercase tracking-widest mt-2">Pts</div>
              </div>
              
              <div className="bg-[#ff9898]/10 border border-[#ff9898]/30 text-[#ff9898] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Points Verified
              </div>
              
              <h3 className="text-2xl font-light text-white mb-1 tracking-tighter">Loyalty Points Awarded</h3>
              <p className="text-[11px] text-gray-400 mb-8">Taman Wisata Candi Points</p>
              
              <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={() => {
                    setIsNFTModalOpen(false);
                    setActiveTab('vault');
                  }} 
                  className="w-full bg-white text-black py-3.5 font-bold rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors text-[11px] cursor-pointer"
                >
                  <Wallet className="w-4 h-4" /> View in Vault
                </button>
                <button 
                  onClick={() => setIsNFTModalOpen(false)} 
                  className="w-full bg-white border border-gray-200/80 text-white py-3.5 font-bold rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors text-[11px] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import { useAppContext } from '../../context/AppContext';
import { Compass, Calendar, Wallet, Ticket } from 'lucide-react';
import { TabType } from '../../types';

export default function BottomNav() {
  const { activeTab, setActiveTab } = useAppContext();

  // Liquid Glass Active Pill with subtle specular rim
  const activeBg =
    'bg-[#d85d5d]/12 text-[#d85d5d] border border-[#d85d5d]/25 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.9)] backdrop-blur-md';

  const navItems: { id: TabType; label: string; icon: typeof Compass }[] = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'vault', label: 'Vault', icon: Wallet },
    { id: 'perks', label: 'Perks', icon: Ticket },
  ];

  return (
    /* Transparent Liquid Glass Floating Island */
    <nav className="fixed bottom-3 left-4 right-4 max-w-sm mx-auto h-16 rounded-full bg-white/45 backdrop-blur-2xl backdrop-saturate-200 border border-white/65 shadow-[0_16px_40px_rgba(28,25,23,0.1),inset_0_1.5px_1.5px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(255,255,255,0.35)] ring-1 ring-stone-900/5 px-2 flex items-center justify-between z-30 select-none">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex-1 h-12 rounded-full flex flex-col items-center justify-center relative cursor-pointer transition-all duration-300 active:scale-95 ${
              isActive ? activeBg : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Icon
              className={`w-4.5 h-4.5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}
              strokeWidth={isActive ? 2.4 : 1.8}
            />
            <span
              className={`text-[10px] font-outfit mt-0.5 tracking-tight ${
                isActive ? 'font-extrabold text-[#d85d5d]' : 'font-semibold text-stone-500'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

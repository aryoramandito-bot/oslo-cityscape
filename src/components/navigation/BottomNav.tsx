import { useAppContext } from '../../context/AppContext';
import { Compass, Calendar, Wallet, Ticket } from 'lucide-react';
import { TabType } from '../../types';

export default function BottomNav() {
  const { activeTab, setActiveTab } = useAppContext();

  // Unified Oslo Brand Signature Palette: Oslo Rose #d85d5d
  const activeColor = 'text-[#d85d5d]';
  const activeBg = 'bg-[#fff1f1] text-[#d85d5d]';

  const navItems: { id: TabType; label: string; icon: typeof Compass }[] = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'vault', label: 'Vault', icon: Wallet },
    { id: 'perks', label: 'Perks', icon: Ticket },
  ];

  return (
    <nav className="fixed bottom-3 left-4 right-4 max-w-sm mx-auto h-16 rounded-full bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_12px_36px_rgba(28,25,23,0.08),0_2px_8px_rgba(28,25,23,0.03)] ring-1 ring-stone-900/5 px-2.5 flex items-center justify-between z-30 select-none">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex-1 h-12 rounded-full flex flex-col items-center justify-center relative cursor-pointer transition-all duration-300 ${
              isActive ? activeBg : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Icon
              className={`w-4.5 h-4.5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}
              strokeWidth={isActive ? 2.4 : 1.8}
            />
            <span
              className={`text-[10px] font-outfit mt-0.5 tracking-tight ${
                isActive ? 'font-extrabold text-[#d85d5d]' : 'font-semibold text-stone-400'
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

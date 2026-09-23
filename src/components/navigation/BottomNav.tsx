import { useAppContext } from '../../context/AppContext';
import { Compass, Calendar, Wallet, Ticket } from 'lucide-react';
import { TabType } from '../../types';

export default function BottomNav() {
  const { activeTab, setActiveTab } = useAppContext();

  const navItems: { id: TabType; label: string; icon: typeof Compass }[] = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'vault', label: 'Vault', icon: Wallet },
    { id: 'perks', label: 'Perks', icon: Ticket },
  ];

  const activeIndex = Math.max(0, navItems.findIndex((item) => item.id === activeTab));

  return (
    /* Persistent Transparent Liquid Glass Bottom Toolbar - Always Pinned to Bottom */
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-18 bg-white/70 backdrop-blur-2xl backdrop-saturate-200 border-t border-white/80 shadow-[0_-12px_36px_rgba(28,25,23,0.08),inset_0_1.5px_1px_rgba(255,255,255,0.95)] z-40 pb-safe px-3 flex items-center justify-between select-none">
      
      {/* Snappy Sliding Liquid Pill Thumb Indicator */}
      <div
        className="absolute top-2 h-12 rounded-2xl bg-[#d85d5d]/12 border border-[#d85d5d]/25 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.95),0_4px_16px_rgba(216,93,93,0.12)] backdrop-blur-md pointer-events-none transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        style={{
          width: 'calc((100% - 24px) / 4)',
          left: '12px',
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />

      {/* Navigation Buttons */}
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveTab(item.id)}
            className="relative z-10 flex-1 h-12 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-transform duration-100 active:scale-90 group"
          >
            <Icon
              className={`w-4.5 h-4.5 transition-all duration-150 ${
                isActive ? 'text-[#d85d5d] scale-110' : 'text-stone-500 group-hover:text-stone-700'
              }`}
              strokeWidth={isActive ? 2.4 : 1.8}
            />
            <span
              className={`text-[10px] font-outfit mt-0.5 tracking-tight transition-colors duration-150 ${
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

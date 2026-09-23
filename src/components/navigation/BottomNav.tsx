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
    /* Transparent Liquid Glass Floating Island */
    <nav className="fixed bottom-3 left-4 right-4 max-w-sm mx-auto h-16 rounded-full bg-white/45 backdrop-blur-2xl backdrop-saturate-200 border border-white/65 shadow-[0_16px_40px_rgba(28,25,23,0.1),inset_0_1.5px_1.5px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(255,255,255,0.35)] ring-1 ring-stone-900/5 px-2 flex items-center justify-between z-30 select-none relative overflow-hidden">
      
      {/* Snappy Sliding Liquid Pill Thumb Indicator */}
      <div
        className="absolute top-2 bottom-2 rounded-full bg-[#d85d5d]/12 border border-[#d85d5d]/30 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.95),0_4px_16px_rgba(216,93,93,0.12)] backdrop-blur-md pointer-events-none transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        style={{
          width: 'calc((100% - 16px) / 4)',
          left: '8px',
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
            className="relative z-10 flex-1 h-12 rounded-full flex flex-col items-center justify-center cursor-pointer transition-transform duration-100 active:scale-90 group"
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

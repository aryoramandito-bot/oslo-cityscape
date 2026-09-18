import { useAppContext } from '../../context/AppContext';
import { Compass, Map, Calendar, Wallet, Ticket } from 'lucide-react';
import { TabType } from '../../types';

export default function BottomNav() {
  const { activeTab, setActiveTab, activeCity } = useAppContext();

  const isJakarta = activeCity === 'jakarta';
  const activeColor = isJakarta ? 'text-[#ff9898]' : 'text-amber-500';
  const activeDot = isJakarta ? 'bg-[#ff9898]' : 'bg-amber-500';

  const navItems: { id: TabType; label: string; icon: typeof Compass }[] = [
    { id: 'portal', label: 'Concierge', icon: Compass },
    { id: 'explore', label: 'Explore', icon: Map },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'vault', label: 'Vault', icon: Wallet },
    { id: 'perks', label: 'Perks', icon: Ticket },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-18 bg-[#f9f8f6]/90 backdrop-blur-lg border-t border-gray-200/80 px-4 flex items-center justify-around z-30 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="flex flex-col items-center justify-center w-14 h-12 relative cursor-pointer group transition-all"
          >
            <Icon
              className={`w-5 h-5 transition-transform group-active:scale-90 ${
                isActive ? activeColor : 'text-gray-400 group-hover:text-gray-600'
              }`}
              strokeWidth={isActive ? 2.4 : 1.8}
            />
            <span
              className={`text-[9.5px] font-outfit font-semibold mt-1 transition-colors ${
                isActive ? `${activeColor} font-bold` : 'text-gray-400'
              }`}
            >
              {item.label}
            </span>
            {isActive && (
              <span className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full ${activeDot}`} />
            )}
          </button>
        );
      })}
    </nav>
  );
}

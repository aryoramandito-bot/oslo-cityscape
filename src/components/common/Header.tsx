import { useAppContext } from '../../context/AppContext';
import { ChevronDown, Sparkles, MapPin } from 'lucide-react';

export default function Header() {
  const { activeCity, setIsCitySwitcherOpen, setIsRadarMapOpen, userProfile, setIsLogoutModalOpen, allLandmarks } = useAppContext();

  const isLaweyan = activeCity === 'laweyan';
  const isSolo = activeCity === 'solo';
  const isBandung = activeCity === 'bandung';
  
  // Chapter Nomenclature
  const badgeCode = isLaweyan ? 'LW' : isSolo ? 'SL' : isBandung ? 'BD' : 'JK';
  const chapterName = isLaweyan ? 'Desa Laweyan Chapter' : isSolo ? 'Solo Chapter' : isBandung ? 'Bandung Chapter' : 'Jakarta Chapter';
  
  // Dynamic site count from active landmarks
  const citySites = allLandmarks.filter((l) => l.cityId === activeCity);
  const siteCount = citySites.length > 0 ? citySites.length : (isLaweyan ? 26 : isSolo ? 32 : isBandung ? 36 : 34);

  return (
    <header className="h-16 px-4 pt-safe border-b border-stone-200/60 bg-[#f9f8f6]/85 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between shadow-[0_2px_15px_rgba(28,25,23,0.02)] select-none">
      {/* Chapter Selector Pill */}
      <button
        onClick={() => setIsCitySwitcherOpen(true)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs hover:border-stone-300 transition-all cursor-pointer group text-left active:scale-[0.98]"
      >
        {/* Heraldic Chapter Seal */}
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#d85d5d] to-[#c64f4f] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
          {badgeCode}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-outfit font-extrabold text-xs text-stone-900 tracking-tight leading-none">
              {chapterName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-600 transition-colors" />
          </div>
          <span className="text-[10px] text-stone-400 font-medium font-mono mt-0.5 leading-none">
            {siteCount} Curated Sites
          </span>
        </div>
      </button>

      {/* Right Controls: Unified Oslo Rose Radar Beacon & Profile Avatar */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsRadarMapOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-stone-200/80 text-stone-700 hover:text-stone-900 hover:border-stone-300 text-xs font-semibold shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff9898] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d85d5d]"></span>
          </span>
          <MapPin className="w-3.5 h-3.5 text-[#d85d5d]" />
          <span className="font-outfit text-[11px] font-bold">Radar</span>
        </button>

        {/* Explorer Avatar (Tap to open Logout / Session Screen) */}
        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-9 h-9 rounded-xl bg-white border border-stone-200/80 hover:border-stone-400 flex items-center justify-center shadow-2xs relative cursor-pointer transition-all active:scale-95"
          title={`Verified Explorer: ${userProfile.name} • Tap to view session`}
        >
          <span className="font-outfit font-extrabold text-xs text-stone-800">
            {userProfile.name
              ? userProfile.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
              : 'AW'}
          </span>
          {userProfile.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          )}
        </button>
      </div>
    </header>
  );
}

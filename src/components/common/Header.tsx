import { useAppContext } from '../../context/AppContext';
import { ChevronDown, Sparkles, MapPin } from 'lucide-react';

export default function Header() {
  const { activeCity, setIsCitySwitcherOpen, setIsRadarMapOpen, userProfile, setIsLogoutModalOpen } = useAppContext();

  const isLaweyan = activeCity === 'laweyan';
  const isSolo = activeCity === 'solo';
  const isBandung = activeCity === 'bandung';
  const badgeColor = isLaweyan ? 'bg-[#78350f] text-amber-100' : isSolo ? 'bg-emerald-600 text-white' : isBandung ? 'bg-amber-500 text-white' : 'bg-[#ff9898] text-white';
  const badgeCode = isLaweyan ? 'LW' : isSolo ? 'SL' : isBandung ? 'BD' : 'JK';
  const chapterName = isLaweyan ? 'Desa Laweyan Chapter' : isSolo ? 'Solo Chapter' : isBandung ? 'Bandung Chapter' : 'Jakarta Chapter';
  const siteCountText = isLaweyan ? '26 Curated Sites' : isSolo ? '32 Curated Sites' : isBandung ? '36 Curated Sites' : '34 Curated Sites';

  return (
    <header className="h-16 px-5 border-b border-gray-200/60 bg-[#f9f8f6]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
      {/* Chapter Selector Pill */}
      <button
        onClick={() => setIsCitySwitcherOpen(true)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:border-gray-300 transition-all cursor-pointer group text-left"
      >
        <div
          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs ${badgeColor}`}
        >
          {badgeCode}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-outfit font-extrabold text-xs text-gray-900 tracking-tight leading-none">
              {chapterName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
          <span className="text-[10px] text-gray-400 font-medium font-mono mt-0.5 leading-none">
            {siteCountText}
          </span>
        </div>
      </button>

      {/* Right Controls: Radar Quick Action & Profile Avatar */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setIsRadarMapOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200/80 text-gray-700 hover:text-gray-900 hover:border-gray-300 text-xs font-semibold shadow-xs transition-all cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff9898] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff9898]"></span>
          </span>
          <MapPin className="w-3.5 h-3.5 text-[#ff9898]" />
          <span className="font-outfit text-[11px] font-bold">Radar</span>
        </button>

        {/* Explorer Avatar (Tap to open Logout / Profile Screen) */}
        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-9 h-9 rounded-xl bg-white border border-gray-200/80 hover:border-gray-400 flex items-center justify-center shadow-xs relative cursor-pointer transition-all active:scale-95"
          title={`Verified Explorer: ${userProfile.name} • Tap to manage session & log out`}
        >
          <span className="font-outfit font-bold text-xs text-gray-700">
            {userProfile.name
              ? userProfile.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
              : 'AW'}
          </span>
          {userProfile.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-white flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          )}
        </button>
      </div>
    </header>
  );
}

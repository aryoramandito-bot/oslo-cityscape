import { useAppContext } from '../../context/AppContext';
import { useConfetti } from '../../hooks/useConfetti';
import { X, Check } from 'lucide-react';
import { CityId } from '../../types';

export default function CitySwitcherModal() {
  const {
    isCitySwitcherOpen,
    setIsCitySwitcherOpen,
    activeCity,
    setActiveCity,
    setActiveIntroCity,
  } = useAppContext();
  const { triggerConfetti } = useConfetti();

  if (!isCitySwitcherOpen) return null;

  const handleSelect = (city: CityId) => {
    setIsCitySwitcherOpen(false);
    if (city !== activeCity) {
      setActiveCity(city);
      if (city === 'bandung') {
        setActiveIntroCity('bandung');
      } else if (city === 'solo') {
        setActiveIntroCity('solo');
      } else if (city === 'laweyan') {
        setActiveIntroCity('laweyan');
      } else {
        triggerConfetti();
      }
    }
  };

  const cities: { id: CityId; code: string; name: string; subtitle: string }[] = [
    { id: 'jakarta', code: 'JK', name: 'Jakarta Chapter', subtitle: '34 Curated Sites · Capital Node' },
    { id: 'bandung', code: 'BD', name: 'Bandung Chapter', subtitle: '36 Curated Sites · Highland Node' },
    { id: 'solo', code: 'SL', name: 'Solo Chapter', subtitle: '32 Curated Sites · Spirit of Java' },
    { id: 'laweyan', code: 'LW', name: 'Desa Laweyan Chapter', subtitle: '26 Curated Sites · Pajang & Batik Enclave' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsCitySwitcherOpen(false)}
    >
      {/* Translucent Liquid Glass Modal Sheet */}
      <div
        className="w-full max-w-md bg-white/85 backdrop-blur-2xl rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-white/85 ring-1 ring-stone-900/5 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <h3 className="text-sm font-bold text-stone-900 font-outfit">City Chapters</h3>
            <p className="text-[11px] text-stone-400">Select active cultural discovery region</p>
          </div>
          <button
            onClick={() => setIsCitySwitcherOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100/80 hover:bg-stone-200/80 text-stone-500 hover:text-stone-800 transition-colors flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* City Options List with Liquid Glass Cards */}
        <div className="space-y-2.5 my-5">
          {cities.map((c) => {
            const isActive = activeCity === c.id;

            return (
              <div
                key={c.id}
                onClick={() => handleSelect(c.id)}
                className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer active:scale-[0.98] ${
                  isActive
                    ? 'border-[#d85d5d]/50 bg-[#fff1f1]/80 backdrop-blur-xl shadow-[0_4px_20px_rgba(216,93,93,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)]'
                    : 'border-stone-200/70 hover:border-stone-300 bg-white/70 hover:bg-white/90 shadow-2xs backdrop-blur-md'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Unified Oslo Emblem */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm font-outfit shadow-2xs transition-transform ${
                    isActive
                      ? 'bg-gradient-to-br from-[#d85d5d] to-[#c64f4f] text-white scale-105'
                      : 'bg-stone-100 text-stone-700'
                  }`}>
                    {c.code}
                  </div>
                  <div className="text-left">
                    <span className={`text-xs font-bold font-outfit block ${
                      isActive ? 'text-[#d85d5d]' : 'text-stone-900'
                    }`}>
                      {c.name}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {c.subtitle}
                    </span>
                  </div>
                </div>
                {isActive && (
                  <div className="w-6 h-6 rounded-full bg-[#d85d5d] text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Liquid Glass Cancel Pill */}
        <button
          onClick={() => setIsCitySwitcherOpen(false)}
          className="w-full py-3 rounded-2xl bg-white/60 hover:bg-white text-stone-700 font-outfit font-bold text-xs border border-stone-200/80 backdrop-blur-md shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

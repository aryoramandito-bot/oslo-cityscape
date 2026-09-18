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
      } else {
        triggerConfetti();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-gray-200/80 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-900 font-outfit">City Chapters</h3>
            <p className="text-[11px] text-gray-400">Select active cultural discovery region</p>
          </div>
          <button
            onClick={() => setIsCitySwitcherOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* City Options List */}
        <div className="space-y-3 my-5">
          {/* Jakarta Option */}
          <div
            onClick={() => handleSelect('jakarta')}
            className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
              activeCity === 'jakarta'
                ? 'border-[#ff9898] bg-rose-50/20 shadow-xs'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#ff9898] text-white flex items-center justify-center font-extrabold text-sm font-outfit shadow-xs">
                JK
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-gray-900 font-outfit block">
                  Jakarta Chapter
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  38 Curated Sites · Capital Node
                </span>
              </div>
            </div>
            {activeCity === 'jakarta' && <Check className="w-4 h-4 text-[#ff9898]" />}
          </div>

          {/* Bandung Option */}
          <div
            onClick={() => handleSelect('bandung')}
            className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
              activeCity === 'bandung'
                ? 'border-amber-500 bg-amber-50/20 shadow-xs'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-extrabold text-sm font-outfit shadow-xs">
                BD
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-gray-900 font-outfit block">
                  Bandung Chapter
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  36 Curated Sites · Highland Node
                </span>
              </div>
            </div>
            {activeCity === 'bandung' && <Check className="w-4 h-4 text-amber-500" />}
          </div>
        </div>

        <button
          onClick={() => setIsCitySwitcherOpen(false)}
          className="w-full py-3 rounded-2xl bg-gray-100 text-gray-700 font-outfit font-bold text-xs hover:bg-gray-200 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

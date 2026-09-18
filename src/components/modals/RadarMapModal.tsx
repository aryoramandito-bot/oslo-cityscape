import { useState } from 'react';
import type React from 'react';
import { useAppContext } from '../../context/AppContext';
import { mapCoordinates } from '../../data/mapCoordinates';
import { ChevronLeft, Radar, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { Landmark } from '../../types';

export default function RadarMapModal() {
  const { isRadarMapOpen, setIsRadarMapOpen, activeCity, landmarks, checkins, setSelectedLandmark } =
    useAppContext();
  const [activePin, setActivePin] = useState<Landmark | null>(null);

  if (!isRadarMapOpen) return null;

  const isJakarta = activeCity === 'jakarta';

  const handlePinClick = (lm: Landmark, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePin(lm);
  };

  const handleOpenDetails = (lm: Landmark) => {
    setIsRadarMapOpen(false);
    setSelectedLandmark(lm);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[#f9f8f6] animate-in fade-in duration-200"
      onClick={() => setActivePin(null)}
    >
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-5 border-b border-gray-200/80 bg-white/80 backdrop-blur-md z-20">
        <button
          onClick={() => setIsRadarMapOpen(false)}
          className="flex items-center gap-1 text-xs font-bold text-[#ff9898] hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Discovery</span>
        </button>

        <div className="flex items-center gap-2">
          <Radar className="w-4 h-4 text-[#ff9898] animate-spin" style={{ animationDuration: '8s' }} />
          <span className="text-xs font-bold font-outfit uppercase tracking-wider text-gray-800">
            {isJakarta ? 'Jakarta Radar' : 'Bandung Radar'}
          </span>
        </div>

        <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
          {landmarks.length} POIs
        </span>
      </header>

      {/* Radar Canvas Area */}
      <div className="relative flex-1 bg-gradient-to-b from-[#111827] via-[#1f2937] to-[#111827] overflow-hidden flex items-center justify-center select-none">
        {/* Radar Concentric Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[85vw] max-w-[400px] h-[85vw] max-h-[400px] rounded-full border border-emerald-500/20" />
          <div className="w-[60vw] max-w-[280px] h-[60vw] max-h-[280px] rounded-full border border-emerald-500/25" />
          <div className="w-[35vw] max-w-[160px] h-[35vw] max-h-[160px] rounded-full border border-emerald-500/35" />
          <div className="w-[12vw] max-w-[50px] h-[12vw] max-h-[50px] rounded-full border border-emerald-500/50 bg-emerald-500/10" />

          {/* Crosshairs */}
          <div className="absolute w-full h-px bg-emerald-500/15" />
          <div className="absolute h-full w-px bg-emerald-500/15" />

          {/* User Beacon */}
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </div>
        </div>

        {/* Radar Map Coordinates Container */}
        <div className="relative w-full h-full max-w-md mx-auto">
          {landmarks.map((lm) => {
            const coord = mapCoordinates[lm.id];
            if (!coord) return null;

            const isVisited = checkins.includes(lm.id);
            const isSelected = activePin?.id === lm.id;

            return (
              <button
                key={lm.id}
                onClick={(e) => handlePinClick(lm, e)}
                style={{
                  left: `${coord.x}%`,
                  top: `${coord.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute p-1.5 rounded-full transition-all cursor-pointer z-10 ${
                  isSelected
                    ? 'scale-125 ring-4 ring-white shadow-xl z-20 bg-white text-gray-900'
                    : isVisited
                    ? 'bg-emerald-500 text-white hover:scale-110 shadow-xs'
                    : lm.category === 'culinary'
                    ? 'bg-amber-500 text-white hover:scale-110 shadow-xs'
                    : 'bg-[#ff9898] text-white hover:scale-110 shadow-xs'
                }`}
                title={lm.name}
              >
                {isVisited ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <MapPin className="w-3 h-3" />
                )}
              </button>
            );
          })}
        </div>

        {/* Floating Quick Card Preview on Pin Click */}
        {activePin && (
          <div
            className="absolute bottom-6 left-5 right-5 max-w-sm mx-auto bg-white rounded-3xl p-4 shadow-2xl border border-gray-100 flex items-center justify-between gap-3 z-30 animate-in slide-in-from-bottom-5 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={activePin.image}
                alt={activePin.name}
                className="w-13 h-13 rounded-2xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#ff9898] font-mono">
                  {activePin.category}
                </span>
                <h4 className="text-xs font-bold text-gray-900 font-outfit truncate">
                  {activePin.name}
                </h4>
                <span className="text-[10px] text-gray-400 block truncate">
                  {activePin.hours.split('(')[0].trim()}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleOpenDetails(activePin)}
              className="px-3.5 py-2.5 rounded-2xl bg-gray-900 text-white text-xs font-bold font-outfit flex items-center gap-1.5 shrink-0 hover:bg-black transition-colors cursor-pointer shadow-xs"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

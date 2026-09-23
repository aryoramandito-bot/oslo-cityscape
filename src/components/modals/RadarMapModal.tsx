import { useState, useEffect } from 'react';
import type React from 'react';
import { useAppContext } from '../../context/AppContext';
import { mapCoordinates } from '../../data/mapCoordinates';
import { ChevronLeft, Radar, MapPin, CheckCircle2, ArrowRight, Map as MapIcon, Sparkles } from 'lucide-react';
import { Landmark } from '../../types';
import RealMap from '../map/RealMap';
import { isWithinCheckinRadius } from '../../utils/geo';

export default function RadarMapModal() {
  const {
    isRadarMapOpen,
    setIsRadarMapOpen,
    activeCity,
    landmarks,
    checkins,
    setSelectedLandmark,
    userLocation,
    mapTargetLandmark,
    setMapTargetLandmark,
    getLandmarkDistance,
  } = useAppContext();

  // Mode: Real Map (default) vs Sci-Fi Radar
  const [mapMode, setMapMode] = useState<'real' | 'radar'>('real');
  const [activePin, setActivePin] = useState<Landmark | null>(null);

  useEffect(() => {
    if (mapTargetLandmark) {
      setActivePin(mapTargetLandmark);
    }
  }, [mapTargetLandmark]);

  if (!isRadarMapOpen) return null;

  const handleClose = () => {
    setIsRadarMapOpen(false);
    setMapTargetLandmark(null);
    setActivePin(null);
  };

  const handlePinClick = (lm: Landmark, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePin(lm);
  };

  const handleOpenDetails = (lm: Landmark) => {
    handleClose();
    setSelectedLandmark(lm);
  };

  const activeDistance = activePin ? getLandmarkDistance(activePin) : null;
  const isNearCheckin =
    activePin && userLocation
      ? isWithinCheckinRadius(userLocation.lat, userLocation.lng, activePin.lat, activePin.lng, 500)
      : false;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[#f9f8f6] animate-in fade-in duration-200 select-none"
      onClick={() => setActivePin(null)}
    >
      {/* Top Navigation Header with Liquid Glass */}
      <header className="h-16 flex items-center justify-between px-4 border-b border-stone-200/50 bg-white/60 backdrop-blur-2xl z-30 shrink-0">
        <button
          onClick={handleClose}
          className="flex items-center gap-1 text-xs font-bold text-[#d85d5d] hover:underline cursor-pointer py-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Discovery</span>
          <span className="sm:hidden">Back</span>
        </button>

        {/* Dual Mode Switcher: Liquid Glass Segmented Pill */}
        <div className="bg-stone-200/50 backdrop-blur-md p-1 rounded-2xl border border-white/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] flex items-center gap-1 text-[11px] font-bold font-outfit">
          <button
            onClick={() => setMapMode('real')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              mapMode === 'real'
                ? 'bg-white text-stone-900 shadow-2xs font-extrabold'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5 text-[#d85d5d]" />
            <span>Real Map</span>
          </button>
          <button
            onClick={() => setMapMode('radar')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              mapMode === 'radar'
                ? 'bg-[#d85d5d] text-white shadow-2xs font-extrabold'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Radar className="w-3.5 h-3.5 text-white" />
            <span>Radar</span>
          </button>
        </div>

        <button
          onClick={handleClose}
          className="text-xs font-semibold text-stone-400 hover:text-stone-700 cursor-pointer"
        >
          Close
        </button>
      </header>

      {/* Map View Area */}
      <div className="flex-1 relative overflow-hidden bg-stone-100">
        {mapMode === 'real' ? (
          <RealMap
            landmarks={landmarks}
            activeCity={activeCity}
            checkins={checkins}
            selectedLandmark={activePin}
            onSelectLandmark={(lm) => setActivePin(lm)}
            userLocation={userLocation}
            targetLandmark={mapTargetLandmark}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-stone-900 text-white">
            <Radar className="w-16 h-16 text-[#d85d5d] animate-spin mb-3" style={{ animationDuration: '6s' }} />
            <h3 className="text-base font-bold font-outfit">Radar Sweep Active</h3>
            <p className="text-xs text-stone-400 mt-1 max-w-xs">
              Detecting heritage waypoints within your proximity radius.
            </p>
          </div>
        )}

        {/* Selected Landmark Bottom Card (Liquid Glass Sheet) */}
        {activePin && (
          <div
            className="absolute bottom-5 left-4 right-4 max-w-md mx-auto bg-white/90 backdrop-blur-2xl rounded-3xl p-4 shadow-2xl border border-white/80 ring-1 ring-stone-900/5 z-40 animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <img
                src={activePin.image}
                alt={activePin.name}
                className="w-16 h-16 rounded-2xl object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-[#d85d5d] block">
                  {activePin.category}
                </span>
                <h4 className="text-xs font-bold text-stone-900 font-outfit truncate mt-0.5">
                  {activePin.name}
                </h4>
                <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                  {activePin.description}
                </p>
                {activeDistance && (
                  <span className="text-[10px] font-mono text-stone-400 mt-1 block">
                    📍 {activeDistance} away
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => handleOpenDetails(activePin)}
              className="mt-3 w-full py-2.5 rounded-xl bg-[#d85d5d] hover:bg-[#c64f4f] text-white font-outfit font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>View Full Details & Check In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect, useMemo } from 'react';
import type React from 'react';
import { useAppContext } from '../../context/AppContext';
import {
  ChevronLeft,
  Radar,
  ArrowRight,
  Map as MapIcon,
  Navigation,
  Compass,
  CheckCircle2,
  Utensils,
  Landmark as LandmarkIcon,
} from 'lucide-react';
import { Landmark } from '../../types';
import RealMap, { buildGoogleTileUrl } from '../map/RealMap';
import { CITY_CENTERS, getDistanceInMeters, formatDistance } from '../../utils/geo';

function latLngToTileXY(lat: number, lng: number, zoom: number) {
  const n = Math.pow(2, zoom);
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n);
  return { x, y };
}

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

  // Mode: Real Map (default) vs Live Proximity Radar
  const [mapMode, setMapMode] = useState<'real' | 'radar'>('real');
  const [activePin, setActivePin] = useState<Landmark | null>(null);
  const [radarRangeMeters, setRadarRangeMeters] = useState<number>(3000);

  useEffect(() => {
    if (mapTargetLandmark) {
      setActivePin(mapTargetLandmark);
    }
  }, [mapTargetLandmark]);

  const radarOrigin = useMemo(() => {
    return userLocation || CITY_CENTERS[activeCity] || CITY_CENTERS.jakarta;
  }, [userLocation, activeCity]);

  // Compute polar coordinates (bearing + distance) for every landmark relative to radarOrigin
  const radarBlips = useMemo(() => {
    return landmarks
      .map((lm) => {
        const distMeters = getDistanceInMeters(radarOrigin.lat, radarOrigin.lng, lm.lat, lm.lng);
        const dLat = lm.lat - radarOrigin.lat;
        const dLng = (lm.lng - radarOrigin.lng) * Math.cos((radarOrigin.lat * Math.PI) / 180);
        // Angle where 0 is North (top), 90 is East (right)
        const angleRad = Math.atan2(dLng, dLat);
        // Normalize radial distance onto [8%, 45%] of the radar circle
        const clampedRatio = Math.min(1, Math.sqrt(distMeters / radarRangeMeters));
        const radiusPct = 8 + clampedRatio * 37;
        const xPct = 50 + Math.sin(angleRad) * radiusPct;
        const yPct = 50 - Math.cos(angleRad) * radiusPct;

        return {
          landmark: lm,
          distMeters,
          formattedDist: formatDistance(distMeters),
          xPct,
          yPct,
          isWithinRange: distMeters <= radarRangeMeters,
        };
      })
      .sort((a, b) => a.distMeters - b.distMeters);
  }, [landmarks, radarOrigin, radarRangeMeters]);

  // Center Google Satellite tile for the Radar scope background
  const radarSatelliteTileUrl = useMemo(() => {
    const zoom = activeCity === 'laweyan' ? 15 : 14;
    const { x, y } = latLngToTileXY(radarOrigin.lat, radarOrigin.lng, zoom);
    return buildGoogleTileUrl('s', '1', String(x), String(y), String(zoom));
  }, [radarOrigin, activeCity]);

  if (!isRadarMapOpen) return null;

  const handleClose = () => {
    setIsRadarMapOpen(false);
    setMapTargetLandmark(null);
    setActivePin(null);
  };

  const handleOpenDetails = (lm: Landmark) => {
    handleClose();
    setSelectedLandmark(lm);
  };

  const activeDistance = activePin ? getLandmarkDistance(activePin) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[#f9f8f6] animate-in fade-in duration-200 select-none"
      onClick={() => setActivePin(null)}
    >
      {/* Top Navigation Header with Liquid Glass */}
      <header className="h-16 flex items-center justify-between px-4 border-b border-stone-200/50 bg-white/80 backdrop-blur-2xl z-30 shrink-0">
        <button
          onClick={handleClose}
          className="flex items-center gap-1 text-xs font-bold text-[#d85d5d] hover:underline cursor-pointer py-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Discovery</span>
          <span className="sm:hidden">Back</span>
        </button>

        {/* Dual Mode Switcher: Liquid Glass Segmented Pill */}
        <div className="bg-stone-200/60 backdrop-blur-md p-1 rounded-2xl border border-white/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] flex items-center gap-1 text-[11px] font-bold font-outfit">
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
            <Radar className={`w-3.5 h-3.5 ${mapMode === 'radar' ? 'text-white' : 'text-stone-500'}`} />
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

      {/* Map / Radar View Area */}
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
          <div
            className="w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 bg-stone-950 text-white overflow-y-auto"
            onClick={() => setActivePin(null)}
          >
            {/* Top Telemetry Bar */}
            <div className="w-full max-w-md flex items-center justify-between gap-2 z-10">
              <div className="flex items-center gap-2 bg-stone-900/90 border border-stone-800 px-3 py-1.5 rounded-2xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-300">
                  Google Telemetry · {activeCity.toUpperCase()}
                </span>
              </div>

              {/* Range Selector Pills */}
              <div className="flex items-center gap-1 bg-stone-900/90 border border-stone-800 p-1 rounded-2xl text-[10px] font-mono">
                {[
                  { label: '1.5km', value: 1500 },
                  { label: '3km', value: 3000 },
                  { label: '10km', value: 10000 },
                ].map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setRadarRangeMeters(r.value);
                    }}
                    className={`px-2 py-1 rounded-xl transition-all cursor-pointer font-bold ${
                      radarRangeMeters === r.value
                        ? 'bg-[#d85d5d] text-white'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Circular Tactical Radar Scope with Google Satellite Base */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-2 border-[#d85d5d]/40 shadow-[0_0_60px_rgba(216,93,93,0.18)] overflow-hidden my-3 shrink-0 bg-stone-900">
              {/* Google Maps Satellite Imagery Underlay */}
              <img
                src={radarSatelliteTileUrl}
                alt="Google Satellite Radar Base"
                className="absolute inset-0 w-full h-full object-cover opacity-25 scale-125 grayscale contrast-125 pointer-events-none"
              />

              {/* Dark Radial Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(12,10,9,0.2) 0%, rgba(12,10,9,0.75) 75%, rgba(12,10,9,0.95) 100%)',
                }}
              />

              {/* Rotating Conic Radar Sweep Beam */}
              <div
                className="absolute inset-0 rounded-full animate-spin pointer-events-none"
                style={{
                  animationDuration: '5s',
                  background:
                    'conic-gradient(from 0deg, transparent 0deg, rgba(216, 93, 93, 0.02) 260deg, rgba(216, 93, 93, 0.32) 360deg)',
                }}
              />

              {/* Concentric Range Rings */}
              <div className="absolute inset-[16%] rounded-full border border-stone-700/60 pointer-events-none" />
              <div className="absolute inset-[33%] rounded-full border border-stone-700/60 border-dashed pointer-events-none" />
              <div className="absolute inset-[48%] rounded-full border border-[#d85d5d]/40 pointer-events-none" />

              {/* Crosshair Axes */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-stone-700/50 pointer-events-none" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-stone-700/50 pointer-events-none" />

              {/* Cardinal Compass Labels */}
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-[#d85d5d]">
                N
              </span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-stone-500">
                S
              </span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-stone-500">
                W
              </span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-stone-500">
                E
              </span>

              {/* Center User Beacon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-white shadow-[0_0_12px_#3b82f6]" />
              </div>

              {/* Landmark Radar Blips */}
              {radarBlips.map(({ landmark, xPct, yPct }) => {
                const isVisited = checkins.includes(landmark.id);
                const isSelected = activePin?.id === landmark.id;
                const isCulinary = landmark.category.toLowerCase() === 'culinary';

                const dotColor = isVisited
                  ? 'bg-emerald-400 border-emerald-100'
                  : isCulinary
                  ? 'bg-amber-400 border-amber-100'
                  : 'bg-[#ff9898] border-white';

                return (
                  <button
                    key={landmark.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePin(landmark);
                    }}
                    style={{ left: `${xPct}%`, top: `${yPct}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer transition-transform ${
                      isSelected ? 'scale-150 z-40' : 'hover:scale-125'
                    }`}
                    title={`${landmark.name}`}
                  >
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full bg-[#d85d5d]/50 animate-ping" />
                    )}
                    <span
                      className={`block w-3 h-3 rounded-full border ${dotColor} shadow-md`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Closest Waypoints Quick-Select Strip */}
            <div className="w-full max-w-md space-y-2 pb-20 z-10">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-stone-400 px-1">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#d85d5d]" />
                  Nearest Detected Waypoints ({radarBlips.length})
                </span>
                <span>Tap blip to lock</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {radarBlips.slice(0, 4).map(({ landmark, formattedDist }) => {
                  const isSelected = activePin?.id === landmark.id;
                  const isVisited = checkins.includes(landmark.id);
                  const isCulinary = landmark.category.toLowerCase() === 'culinary';

                  return (
                    <button
                      key={landmark.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePin(landmark);
                      }}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-[#d85d5d]/20 border-[#d85d5d] text-white'
                          : 'bg-stone-900/90 border-stone-800/90 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                          isVisited
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : isCulinary
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-[#d85d5d]/20 text-[#ff9898]'
                        }`}
                      >
                        {isVisited ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : isCulinary ? (
                          <Utensils className="w-3.5 h-3.5" />
                        ) : (
                          <LandmarkIcon className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold font-outfit truncate text-white">
                          {landmark.name}
                        </p>
                        <p className="text-[10px] font-mono text-stone-400">{formattedDist}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Selected Landmark Bottom Card (Liquid Glass Sheet) */}
        {activePin && (
          <div
            className="absolute bottom-5 left-4 right-4 max-w-md mx-auto bg-white/95 backdrop-blur-2xl rounded-3xl p-4 shadow-2xl border border-white/80 ring-1 ring-stone-900/5 z-40 animate-in slide-in-from-bottom duration-200"
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

            <div className="grid grid-cols-2 gap-2 mt-3">
              <button
                type="button"
                onClick={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${activePin.lat},${activePin.lng}`;
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
                className="py-2.5 px-3 rounded-xl bg-blue-50/80 hover:bg-blue-100/80 text-blue-700 border border-blue-200/80 font-outfit font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
                title="Navigate via Google Maps"
              >
                <Navigation className="w-3.5 h-3.5 fill-blue-600/20" />
                <span>Directions</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenDetails(activePin)}
                className="py-2.5 px-3 rounded-xl bg-[#d85d5d] hover:bg-[#c64f4f] text-white font-outfit font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

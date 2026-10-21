import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import { Landmark } from '../../types';
import { Coordinates, CITY_CENTERS } from '../../utils/geo';
import { Utensils, Landmark as LandmarkIcon, LocateFixed, Plus, Minus, Layers } from 'lucide-react';

export const GOOGLE_MAPS_API_KEY =
  (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GOOGLE_MAPS_API_KEY || '';

export function buildGoogleTileUrl(layerStyle: 'm' | 'p' | 'y' | 's', s = '{s}', x = '{x}', y = '{y}', z = '{z}'): string {
  const keyParam = GOOGLE_MAPS_API_KEY ? `&key=${encodeURIComponent(GOOGLE_MAPS_API_KEY)}` : '';
  return `https://mt${s}.google.com/vt/lyrs=${layerStyle}&x=${x}&y=${y}&z=${z}&hl=en${keyParam}`;
}

type GoogleMapStyle = 'm' | 'p' | 'y';

const MAP_STYLE_LABELS: Record<GoogleMapStyle, string> = {
  m: 'Road',
  p: 'Terrain',
  y: 'Satellite',
};

interface RealMapProps {
  landmarks: Landmark[];
  activeCity: string;
  checkins: string[];
  selectedLandmark: Landmark | null;
  onSelectLandmark: (lm: Landmark) => void;
  userLocation: Coordinates | null;
  targetLandmark?: Landmark | null;
}

export default function RealMap({
  landmarks,
  activeCity,
  checkins,
  selectedLandmark,
  onSelectLandmark,
  userLocation,
  targetLandmark,
}: RealMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.LayerGroup | null>(null);

  const [mapCategory, setMapCategory] = useState<'all' | 'attraction' | 'culinary'>('all');
  const [mapStyle, setMapStyle] = useState<GoogleMapStyle>('m');

  // Filter landmarks based on on-map category toggle
  const filteredLandmarks = useMemo(() => {
    if (mapCategory === 'all') return landmarks;
    return landmarks.filter((l) => l.category.toLowerCase() === mapCategory);
  }, [landmarks, mapCategory]);

  // Initial city center
  const initialCenter = useMemo(() => {
    if (targetLandmark) {
      return [targetLandmark.lat, targetLandmark.lng] as [number, number];
    }
    const center = CITY_CENTERS[activeCity] || CITY_CENTERS.jakarta;
    return [center.lat, center.lng] as [number, number];
  }, [activeCity, targetLandmark]);

  // 1. Initialize Leaflet Map Instance with Google Maps Tiles
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: targetLandmark ? 15 : activeCity === 'laweyan' ? 15 : 13,
        zoomControl: false,
        attributionControl: true,
      });

      const googleTileUrl = buildGoogleTileUrl(mapStyle);

      const tileLayer = L.tileLayer(googleTileUrl, {
        attribution: '&copy; Google Maps',
        subdomains: ['0', '1', '2', '3'],
        maxZoom: 20,
      }).addTo(map);

      const markersLayer = L.layerGroup().addTo(map);
      const userLayer = L.layerGroup().addTo(map);

      tileLayerRef.current = tileLayer;
      markersLayerRef.current = markersLayer;
      userMarkerRef.current = userLayer;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        tileLayerRef.current = null;
      }
    };
  }, []);

  // 1b. Update Google Maps Tile Layer style when toggled (Road / Terrain / Satellite)
  useEffect(() => {
    if (!tileLayerRef.current) return;
    const nextUrl = buildGoogleTileUrl(mapStyle);
    tileLayerRef.current.setUrl(nextUrl);
  }, [mapStyle]);

  // 2. Handle City Change / Center Updates
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const center = CITY_CENTERS[activeCity] || CITY_CENTERS.jakarta;
    if (targetLandmark) {
      mapInstanceRef.current.flyTo([targetLandmark.lat, targetLandmark.lng], 15, {
        duration: 1.2,
      });
    } else {
      const defaultZoom = activeCity === 'laweyan' ? 15 : 13;
      mapInstanceRef.current.flyTo([center.lat, center.lng], defaultZoom, {
        duration: 1.2,
      });
    }
  }, [activeCity, targetLandmark]);

  // 3. Render Landmark Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    filteredLandmarks.forEach((lm) => {
      const isVisited = checkins.includes(lm.id);
      const isSelected = selectedLandmark?.id === lm.id;
      const isCulinary = lm.category.toLowerCase() === 'culinary';

      // Determine pin styling
      const bgColor = isVisited
        ? 'bg-emerald-500 text-white'
        : isCulinary
        ? 'bg-amber-500 text-white'
        : 'bg-[#d85d5d] text-white';

      const ringStyle = isSelected
        ? 'ring-4 ring-white scale-125 z-50 shadow-2xl'
        : 'shadow-md hover:scale-110';

      const iconHtml = `
        <div class="relative flex items-center justify-center cursor-pointer transition-transform duration-200">
          <div class="w-8 h-8 rounded-full ${bgColor} ${ringStyle} flex items-center justify-center border-2 border-white">
            ${
              isVisited
                ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>'
                : isCulinary
                ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>'
                : '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>'
            }
          </div>
          ${
            isSelected
              ? '<div class="absolute -bottom-1 w-2 h-2 bg-stone-900 rotate-45"></div>'
              : ''
          }
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: iconHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([lm.lat, lm.lng], { icon: customIcon });

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        onSelectLandmark(lm);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([lm.lat, lm.lng], 15, { duration: 0.8 });
        }
      });

      markersLayerRef.current?.addLayer(marker);
    });
  }, [filteredLandmarks, checkins, selectedLandmark, onSelectLandmark]);

  // 4. Render User Location Beacon
  useEffect(() => {
    if (!mapInstanceRef.current || !userMarkerRef.current || !userLocation) return;

    userMarkerRef.current.clearLayers();

    const userBeaconHtml = `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-8 h-8 rounded-full bg-blue-500/25 animate-ping"></div>
        <div class="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-lg"></div>
      </div>
    `;

    const userIcon = L.divIcon({
      className: 'user-location-pin',
      html: userBeaconHtml,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const marker = L.marker([userLocation.lat, userLocation.lng], {
      icon: userIcon,
      zIndexOffset: 1000,
    });

    const circle = L.circle([userLocation.lat, userLocation.lng], {
      radius: 350,
      color: '#3b82f6',
      fillColor: '#60a5fa',
      fillOpacity: 0.1,
      weight: 1,
    });

    userMarkerRef.current.addLayer(circle);
    userMarkerRef.current.addLayer(marker);
  }, [userLocation]);

  // Recenter to user or city
  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    if (userLocation) {
      mapInstanceRef.current.flyTo([userLocation.lat, userLocation.lng], 15, {
        duration: 1.0,
      });
    } else {
      const center = CITY_CENTERS[activeCity] || CITY_CENTERS.jakarta;
      mapInstanceRef.current.flyTo([center.lat, center.lng], 13, {
        duration: 1.0,
      });
    }
  };

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const cycleMapStyle = () => {
    setMapStyle((prev) => (prev === 'm' ? 'p' : prev === 'p' ? 'y' : 'm'));
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Real Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Filter Pills on Top of Map */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-center pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-1.5 py-1 rounded-2xl shadow-lg border border-stone-200/80 flex items-center gap-1 text-[11px] font-bold font-outfit pointer-events-auto">
          <button
            onClick={() => setMapCategory('all')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              mapCategory === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            All ({landmarks.length})
          </button>
          <button
            onClick={() => setMapCategory('attraction')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
              mapCategory === 'attraction'
                ? 'bg-[#d85d5d] text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <LandmarkIcon className="w-3 h-3" />
            <span>Sites</span>
          </button>
          <button
            onClick={() => setMapCategory('culinary')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
              mapCategory === 'culinary'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Utensils className="w-3 h-3" />
            <span>Food</span>
          </button>
        </div>
      </div>

      {/* Floating Layer Switcher, Zoom & GPS Controls */}
      <div className="absolute bottom-24 right-4 z-20 flex flex-col items-end gap-2">
        <button
          onClick={cycleMapStyle}
          className="px-2.5 h-9 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-stone-200/80 flex items-center gap-1.5 text-[10px] font-mono font-bold text-stone-700 hover:text-[#d85d5d] hover:bg-stone-50 transition-all cursor-pointer"
          title="Switch Google Maps Layer"
        >
          <Layers className="w-3.5 h-3.5 text-[#d85d5d]" />
          <span>{MAP_STYLE_LABELS[mapStyle]}</span>
        </button>

        <button
          onClick={handleRecenter}
          className="w-10 h-10 rounded-2xl bg-white shadow-lg border border-stone-200/80 flex items-center justify-center text-stone-700 hover:text-blue-600 hover:bg-stone-50 transition-all cursor-pointer"
          title="Recenter Location"
        >
          <LocateFixed className="w-5 h-5 text-blue-500" />
        </button>

        <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-stone-200/80 overflow-hidden">
          <button
            onClick={handleZoomIn}
            className="w-10 h-9 flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-all cursor-pointer border-b border-stone-100"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-9 flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-all cursor-pointer"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

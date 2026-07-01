import { useState } from 'react';
import { Navigation, BookOpen, X, ChevronDown, ChevronUp } from 'lucide-react';
import { siteNodes } from '../../mockData';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

import { useAppContext } from '../../context/AppContext';

export default function DirectoryTab() {
  const { setActiveTab, setSelectedLandmarkId } = useAppContext();
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(null);

  const openMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  const handlePoiClick = (id: string) => {
    setSelectedLandmarkId(id);
    setActiveTab('landmark');
  };

  return (
    <div className="flex flex-col gap-3 pb-8">
      {/* Interactive Map View */}
      <div className="w-full h-56 bg-white rounded-2xl border border-gray-200/50 relative overflow-hidden group">
        {/* Satellite View Style Background */}
        <div className="absolute inset-0 bg-white/40 z-10" />
        <img 
          src="/assets/image3.png" 
          alt="Jakarta Map View" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:scale-110 transition-transform duration-1000 ease-in-out"
        />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 z-10 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        {/* Interactive Markers */}
        <div className="absolute inset-0 z-20">
          {/* Current Location (User) */}
          <div className="absolute top-[45%] left-[40%] flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <div className="w-3 h-3 bg-[#ff9898] rounded-full shadow-[0_0_12px_#3b82f6]" />
              <div className="absolute w-10 h-10 bg-[#ff9898]/20 rounded-full animate-ping" />
              <div className="absolute w-16 h-16 border border-[#ff9898]/30 rounded-full" />
            </div>
            <div className="mt-2 bg-white/60 backdrop-blur-md px-2 py-1 rounded text-[8px] font-bold text-white uppercase tracking-widest border border-gray-200/80">You</div>
          </div>
          
          {/* POI 1: Monas */}
          <div className="absolute top-[30%] left-[55%] flex flex-col items-center cursor-pointer group/pin hover:z-30" onClick={() => handlePoiClick('1')}>
            <div className="absolute bottom-full mb-1 opacity-0 group-hover/pin:opacity-100 transition-opacity bg-white/80 backdrop-blur-md px-2 py-1 rounded text-[8px] font-bold text-white uppercase tracking-widest border border-gray-200/80 whitespace-nowrap">Monas Monument</div>
            <div className="w-2.5 h-2.5 bg-[#ff9898] rounded-full shadow-[0_0_8px_#ff9898] border-2 border-[#ffffff] group-hover/pin:scale-125 transition-transform" />
          </div>
          
          {/* POI 2: Kota Tua */}
          <div className="absolute top-[60%] left-[75%] flex flex-col items-center cursor-pointer group/pin hover:z-30" onClick={() => handlePoiClick('2')}>
            <div className="absolute bottom-full mb-1 opacity-0 group-hover/pin:opacity-100 transition-opacity bg-white/80 backdrop-blur-md px-2 py-1 rounded text-[8px] font-bold text-white uppercase tracking-widest border border-gray-200/80 whitespace-nowrap">Kota Tua</div>
            <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_#ff9898] border-2 border-[#ffffff] opacity-80 group-hover/pin:scale-125 transition-transform" />
          </div>

          {/* POI 3: Soto Betawi */}
          <div className="absolute top-[75%] left-[25%] flex flex-col items-center cursor-pointer group/pin hover:z-30" onClick={() => handlePoiClick('3')}>
             <div className="absolute bottom-full mb-1 opacity-0 group-hover/pin:opacity-100 transition-opacity bg-white/80 backdrop-blur-md px-2 py-1 rounded text-[8px] font-bold text-white uppercase tracking-widest border border-gray-200/80 whitespace-nowrap">Soto Betawi Haji Mamat</div>
            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#ff9898] border-2 border-[#ffffff] opacity-60 group-hover/pin:scale-125 transition-transform" />
          </div>

          {/* POI 4: Kerak Telor */}
          <div className="absolute top-[50%] left-[85%] flex flex-col items-center cursor-pointer group/pin hover:z-30" onClick={() => handlePoiClick('4')}>
             <div className="absolute bottom-full mb-1 opacity-0 group-hover/pin:opacity-100 transition-opacity bg-white/80 backdrop-blur-md px-2 py-1 rounded text-[8px] font-bold text-white uppercase tracking-widest border border-gray-200/80 whitespace-nowrap">Kerak Telor Kemayoran Stand</div>
            <div className="w-2.5 h-2.5 bg-blue-400 rounded-full shadow-[0_0_8px_#ff9898] border-2 border-[#ffffff] group-hover/pin:scale-125 transition-transform" />
          </div>
        </div>
        
        <div className="absolute bottom-3 right-3 z-30 bg-[#0e0e0e]/80 backdrop-blur-md border border-gray-200/80 px-3 py-1.5 rounded-lg shadow-sm text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-[#ff9898] shadow-[0_0_8px_#ff9898] animate-pulse" />
           Live Map
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {siteNodes.map(node => (
          <div 
            key={node.id} 
            id={`site-${node.id}`}
            className="bg-white p-4 rounded-2xl border border-gray-200/50 flex flex-col justify-between cursor-pointer transition-colors hover:bg-white"
            onClick={() => {
              setSelectedLandmarkId(node.id);
              setActiveTab('landmark');
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col mb-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">{node.category}</span>
                <h3 className="text-lg font-medium text-white leading-tight">{node.name}</h3>
              </div>
              <button className="text-gray-500 hover:text-white transition-colors p-1">
                {expandedNodeId === node.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="h-40 w-full bg-[#f9f8f6] rounded-lg relative overflow-hidden border border-gray-200/50 mb-3 group">
               <img src={node.image} alt={node.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-700" />
            </div>

            <AnimatePresence>
              {expandedNodeId === node.id ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed mt-2 border-t border-gray-200/50 pt-3">
                    {node.history}
                  </p>
                </motion.div>
              ) : (
                <>
                  <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                    {node.description}
                  </p>
                  {node.hours && (
                    <div className="flex items-center gap-1.5 mb-4 text-[10px] text-gray-500 font-mono">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#ff9898]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span>{node.hours}</span>
                    </div>
                  )}
                </>
              )}
            </AnimatePresence>

            <div className="flex gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  openMaps(node.lat, node.lng);
                }}
                className="flex-1 py-3 bg-white text-black text-[11px] font-bold rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                Find My Way
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

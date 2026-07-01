import { useState, useMemo } from 'react';
import { siteNodes } from '../../mockData';
import { MapPin, Info, ArrowRight, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function LandmarkTab() {
  const { selectedLandmarkId, setSelectedLandmarkId } = useAppContext();
  
  const selectedLandmark = useMemo(() => {
    if (!selectedLandmarkId) return null;
    return siteNodes.find(n => n.id === selectedLandmarkId) || null;
  }, [selectedLandmarkId]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-light tracking-tighter text-white">Jakarta Attractions & Culinary</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {siteNodes.map((landmark) => (
            <div 
              key={landmark.id}
              onClick={() => setSelectedLandmarkId(landmark.id)}
              className="bg-white rounded-2xl border border-gray-200/50 overflow-hidden flex flex-col group cursor-pointer hover:border-gray-200 transition-all shadow-lg shadow-black/20"
            >
              <div className="h-28 bg-white relative overflow-hidden">
                <img 
                  src={landmark.image} 
                  alt={landmark.name}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-2 left-2 bg-white/60 backdrop-blur-md px-2 py-0.5 rounded text-[9px] text-[#ff9898] uppercase font-bold tracking-wider border border-[#ff9898]/20">
                  {landmark.category}
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">{landmark.name}</h3>
                <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed mb-1">{landmark.description}</p>
                {landmark.hours && (
                  <div className="flex items-center gap-1 mt-1 text-[9px] text-gray-500 font-mono">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-[#ff9898]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>{landmark.hours}</span>
                  </div>
                )}
                <div className="mt-auto pt-3 flex items-center text-[10px] text-[#ff9898] font-bold uppercase tracking-wider group-hover:text-[#ff9898] transition-colors">
                  Explore <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedLandmark && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center pointer-events-none">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-white/80 backdrop-blur-sm pointer-events-auto transition-opacity"
            onClick={() => setSelectedLandmarkId(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="bg-[#0c0c0c] border border-gray-200/80 w-full sm:w-[90%] max-w-md sm:rounded-2xl rounded-t-2xl max-h-[85vh] flex flex-col pointer-events-auto overflow-hidden relative shadow-2xl shadow-black/50 animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedLandmarkId(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/40 backdrop-blur-md border border-gray-200/80 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="w-full h-56 relative shrink-0">
              <img 
                src={selectedLandmark.image} 
                alt={selectedLandmark.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0c0c0c] to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <div className="bg-[#ff9898]/10 border border-[#ff9898]/30 px-2 py-0.5 rounded text-[10px] text-[#ff9898] uppercase font-bold tracking-wider inline-block mb-2">
                  {selectedLandmark.category}
                </div>
                <h2 className="text-2xl font-light tracking-tighter text-white">{selectedLandmark.name}</h2>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto overflow-x-hidden pb-8">
              
              <div className="mb-6">
                <h4 className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">
                  <Info className="w-3.5 h-3.5" /> About
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  {selectedLandmark.description}
                </p>
                {selectedLandmark.hours && (
                  <div className="flex items-center gap-2 text-xs text-gray-300 font-mono bg-white/5 border border-gray-200/50 p-3 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#ff9898]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <div>
                      <span className="text-[8px] text-gray-500 uppercase block tracking-wider font-bold">Opening Hours</span>
                      <span className="text-[10px] text-gray-305 font-bold">{selectedLandmark.hours}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <h4 className="flex items-center gap-2 text-[10px] text-[#ff9898] uppercase tracking-widest font-bold mb-2">
                  History
                </h4>
                <div className="bg-white p-4 rounded-xl border border-gray-200/50">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {selectedLandmark.history}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="flex items-center gap-2 text-[10px] text-[#ff9898] uppercase tracking-widest font-bold mb-2">
                  <MapPin className="w-3.5 h-3.5" /> How to get there
                </h4>
                <div className="bg-[#ff9898]/10 border border-[#ff9898]/30 p-4 rounded-xl flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#ff9898]/20 flex flex-shrink-0 items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#ff9898]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-200 leading-relaxed mb-2">
                      Coordinates: {selectedLandmark.lat.toFixed(4)}, {selectedLandmark.lng.toFixed(4)}
                    </p>
                    <button className="text-[10px] font-bold text-white bg-[#ff9898] py-1.5 px-3 rounded uppercase tracking-wider hover:bg-blue-600 transition-colors">
                      Open in Map
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { Navigation } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { userNFTs } from '../../mockData';

export default function PortalTab() {
  const { setActiveTab } = useAppContext();

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Triple-Check Pass */}
      <div className="bg-white rounded-2xl border border-gray-200/50 p-4 flex items-center gap-4 shadow-lg shadow-black/20">
        <div className="flex -space-x-4">
          <div className="w-8 h-8 rounded-full border border-emerald-500/50 bg-[#0c0c0c] flex items-center justify-center p-1.5 z-30">
             <div className="w-full h-full rounded-full bg-[#ff9898]/20 flex items-center justify-center">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff9898" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
             </div>
          </div>
          <div className="w-8 h-8 rounded-full border border-emerald-500/50 bg-[#0c0c0c] flex items-center justify-center p-1.5 z-20">
             <div className="w-full h-full rounded-full bg-[#ff9898]/20 flex items-center justify-center">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff9898" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
             </div>
          </div>
          <div className="w-8 h-8 rounded-full border border-emerald-500/50 bg-[#0c0c0c] flex items-center justify-center p-1.5 z-10">
             <div className="w-full h-full rounded-full bg-[#ff9898]/20 flex items-center justify-center">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff9898" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
             </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-white font-bold text-sm tracking-tight">Triple-Check Pass</h3>
          <p className="text-gray-500 text-[11px]">Access Valid: Oct 12, 2025</p>
        </div>
      </div>

      {/* Current Location (Wayfinding) */}
      <div className="bg-white rounded-2xl border border-gray-200/50 p-4 flex flex-col gap-3 shadow-lg shadow-black/20">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold flex items-center gap-1">
            Current Location
          </span>
          <h3 className="text-xl font-bold text-white flex items-end gap-1">
            Nordic Pavilion <span className="text-gray-600 font-light text-base mb-0.5">B2</span>
          </h3>
        </div>
        
        <div className="h-24 w-full bg-[#0c0c0c] rounded-lg relative overflow-hidden border border-gray-200/50">
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#555_1px,transparent_1px)] bg-[size:10px_10px]"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <div className="relative flex items-center justify-center">
               <div className="w-2.5 h-2.5 bg-[#ff9898] rounded-full shadow-[0_0_12px_#3b82f6]"></div>
               <div className="absolute w-8 h-8 bg-[#ff9898]/20 rounded-full animate-ping"></div>
             </div>
           </div>
        </div>

        <button 
          onClick={() => setActiveTab('directory')}
          className="w-full mt-1 bg-white text-black py-3 font-bold rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors text-xs"
        >
          <Navigation className="w-4 h-4" /> FIND MY WAY
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Live Now */}
        <div className="bg-white rounded-2xl border border-gray-200/50 p-4 flex flex-col justify-between shadow-lg shadow-black/20 h-auto aspect-square">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-[#a855f7] uppercase tracking-widest font-bold">Live Now</span>
            <h3 className="text-sm font-bold text-white leading-tight mt-1">Aurora Sync Show</h3>
          </div>
          
          <div className="bg-[#a855f7]/10 border border-[#a855f7]/20 rounded-lg px-3 py-2 flex items-center gap-2 w-full mt-4">
             <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse"></div>
             <span className="text-[10px] font-bold text-white uppercase tracking-wider">Point Drop</span>
          </div>
        </div>

        {/* Your Loyalty Points */}
        <div className="bg-white rounded-2xl border border-gray-200/50 p-4 flex flex-col justify-between shadow-lg shadow-black/20 h-auto aspect-square">
           <div className="flex flex-col gap-1">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Your Loyalty Points</span>
           </div>
           
           <div className="flex items-center gap-2 mt-2">
             <div className="flex flex-col">
               <span className="text-3xl font-black text-white">10,900</span>
               <span className="text-[10px] text-[#ff9898] uppercase tracking-widest font-bold mt-1">+900 this trip</span>
             </div>
           </div>

           <button 
             onClick={() => setActiveTab('vault')}
             className="text-[11px] text-white underline underline-offset-4 font-medium text-left mt-4"
           >
             View Vault
           </button>
        </div>
      </div>

      {/* Secure WiFi */}
      <div className="bg-white rounded-2xl border border-gray-200/50 p-4 flex items-center justify-between gap-4 shadow-lg shadow-black/20 mt-1">
         <div className="flex flex-col gap-1">
           <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Secure WiFi</span>
           <h3 className="text-white font-bold text-sm">OSLO_Guest_5G</h3>
         </div>
         <button className="bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 text-[#2dd4bf] hover:bg-[#2dd4bf]/20 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors shrink-0 whitespace-nowrap">
            Get Key
         </button>
      </div>

    </div>
  );
}

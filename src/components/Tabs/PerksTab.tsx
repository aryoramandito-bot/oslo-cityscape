import { perksInfo } from '../../mockData';
import { Wifi, Copy, Coffee, QrCode, Droplets, Car, ChevronRight, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const SlideToReveal = ({ onReveal }: { onReveal: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
       ref={containerRef}
       className="relative w-full h-14 bg-gradient-to-r from-[#222] to-[#111] rounded-full flex items-center justify-center border border-gray-200/80 overflow-hidden shadow-inner"
    >
       <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest pl-8 opacity-80 pointer-events-none transition-opacity duration-300">
         Slide to reveal QR
       </span>
       <motion.div
         drag="x"
         dragConstraints={containerRef}
         dragElastic={0.05}
         dragSnapToOrigin={true}
         onDragEnd={(_, info) => {
           const containerWidth = containerRef.current?.offsetWidth || 300;
           if (info.offset.x > (containerWidth * 0.55 - 40)) {
             onReveal();
           }
         }}
         className="absolute left-1 top-1 bottom-1 w-16 bg-white rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-10 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-gray-100 transition-colors"
       >
         <ChevronRight className="w-5 h-5 text-black" />
         <ChevronRight className="w-5 h-5 text-black -ml-3 opacity-60" />
         <ChevronRight className="w-5 h-5 text-black -ml-3 opacity-30" />
       </motion.div>
    </div>
  );
};

export default function PerksTab() {
  const [copied, setCopied] = useState(false);
  const [selectedPerk, setSelectedPerk] = useState<string | null>(null);
  const [revealedPerks, setRevealedPerks] = useState<Record<string, boolean>>({});
  const [usedPerks, setUsedPerks] = useState<string[]>([]);

  const copyPassword = () => {
    navigator.clipboard.writeText(perksInfo.wifiPass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const perks = [
    {
      id: 'fore-coffee',
      title: 'Fore Coffee',
      desc: 'Rp5,000 Discount for Salted Caramel Aren Latte',
      icon: Coffee,
      code: 'FC-991-882',
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10'
    },
    {
      id: 'aqua',
      title: 'Aqua',
      desc: 'Small Bottle 330 Ml [Complimentary Beverage]',
      icon: Droplets,
      code: 'AQ-110-334',
      color: 'text-[#ff9898]',
      bgColor: 'bg-blue-400/10'
    },
    {
      id: 'parking',
      title: 'Parking Fee',
      desc: 'Rp2,000 Discount for Parking Fee',
      icon: Car,
      code: 'PK-442-901',
      color: 'text-[#ff9898]',
      bgColor: 'bg-[#ff9898]/10'
    }
  ];

  const availablePerks = perks.filter(p => !usedPerks.includes(p.id));

  return (
    <div className="flex flex-col gap-3 pb-8">
      {/* WiFi Card */}
      <div className="bg-gradient-to-br from-red-900/40 to-red-950/40 backdrop-blur-md p-6 rounded-2xl border border-red-500/20 flex flex-col relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-10">
          <Wifi className="w-40 h-40 text-red-500" />
        </div>
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="w-10 h-10 bg-red-950 border border-red-500/30 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <Wifi className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-white font-medium">Secure WIFI</h3>
            <p className="text-[10px] uppercase font-bold tracking-widest text-red-400">powered by Telkom Indonesia</p>
          </div>
        </div>

        <div className="space-y-3 relative z-10">
          <div className="bg-red-950/50 p-3 rounded-xl border border-red-500/20 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform">
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-red-300 font-bold mb-1">Network (SSID)</span>
              <span className="font-mono text-sm text-gray-100">{perksInfo.wifiSSID}</span>
            </div>
          </div>
          <div className="bg-red-950/50 p-3 rounded-xl border border-red-500/20 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform">
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-red-300 font-bold mb-1">Password</span>
              <span className="font-mono text-sm tracking-widest text-gray-100">{perksInfo.wifiPass}</span>
            </div>
            <button 
              onClick={copyPassword}
              className="px-3 py-2 bg-red-900 text-white text-[10px] font-bold rounded-md border border-red-500/30 uppercase tracking-wider flex items-center gap-1 active:scale-[0.98] transition-all"
            >
               {copied ? <span className="text-white">Copied</span> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
            </button>
          </div>
        </div>
      </div>

      {/* Rewards List */}
      <h3 className="font-light tracking-tighter text-white text-xl mt-4 mb-2 px-2">Available Rewards</h3>
      <div className="flex flex-col gap-3">
        {availablePerks.map((perk) => (
          <div key={perk.id} className="bg-white rounded-2xl border border-gray-200/50 overflow-hidden">
             <button 
                onClick={() => setSelectedPerk(selectedPerk === perk.id ? null : perk.id)}
                className="w-full relative p-4 flex items-center justify-between text-left active:bg-white transition-colors"
                style={{ WebkitTapHighlightColor: 'transparent' }}
             >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${perk.bgColor} border border-gray-200/50 flex items-center justify-center shrink-0`}>
                    <perk.icon className={`w-5 h-5 ${perk.color}`} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">{perk.title}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-snug max-w-[190px]">{perk.desc}</p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#f9f8f6] border border-gray-200/50">
                   <QrCode className="w-3.5 h-3.5 text-gray-400" />
                </div>
             </button>
             
             <AnimatePresence>
               {selectedPerk === perk.id && (
                 <motion.div
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: 'auto', opacity: 1 }}
                   exit={{ height: 0, opacity: 0 }}
                   className="overflow-hidden"
                 >
                   <div className="p-6 pt-2 pb-6 border-t border-gray-200/50 flex flex-col items-center justify-center bg-[#181818] relative">
                      {revealedPerks[perk.id] ? (
                        <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-300 relative mt-4">
                          <button 
                             onClick={(e) => {
                                e.stopPropagation();
                                setUsedPerks(prev => [...prev, perk.id]);
                                setSelectedPerk(null);
                             }}
                             title="Mark as used"
                             className="absolute -top-4 -right-2 p-2 bg-[#2a2a2a] rounded-full text-gray-400 hover:text-white border border-gray-200/80 flex items-center justify-center shadow-md active:scale-95 transition-all z-20"
                          >
                             <X className="w-4 h-4" />
                          </button>
                          <div className="p-4 bg-white rounded-xl mb-3 flex flex-col items-center justify-center aspect-square shadow-[0_0_30px_rgba(255,255,255,0.15)] relative">
                            <QrCode className="w-32 h-32 text-black mb-2" />
                            <p className="text-[10px] font-mono text-black font-bold uppercase tracking-widest text-center">{perk.code}</p>
                          </div>
                          <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider mb-2">Scan at the counter</p>
                        </div>
                      ) : (
                        <div className="w-full mt-2 animate-in fade-in duration-300 delay-100">
                          <SlideToReveal onReveal={() => setRevealedPerks(prev => ({ ...prev, [perk.id]: true }))} />
                        </div>
                      )}
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        ))}
        {availablePerks.length === 0 && (
          <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
             <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200/50 mb-3 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
               <span className="text-lg">🎉</span>
             </div>
             <p className="text-gray-400 text-[11px] uppercase tracking-widest font-bold">You're all set</p>
             <p className="text-gray-500 text-xs mt-1">All rewards claimed</p>
          </div>
        )}
      </div>
    </div>
  );
}

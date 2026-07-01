import { useState, useRef } from 'react';
import { userProfile } from '../../mockData';
import { ShieldAlert, Fingerprint, ShieldCheck, Clock, Award, Crown, MapPin, QrCode, ArrowRightLeft } from 'lucide-react';
import { motion } from 'motion/react';

const loyaltyPrograms = [
  {
    id: 'injourney',
    name: 'InJourney Loyalty',
    points: 1500,
    maxPoints: 2000,
    tier: 'Gold Tier',
    uid: 'INJ-849201',
    icon: Crown,
    colorClass: 'from-blue-600 to-blue-900',
    iconColor: 'text-blue-200',
    shadow: 'shadow-blue-900/40',
  },
  {
    id: 'twc',
    name: 'Jakarta Tourism',
    points: 400,
    maxPoints: 1000,
    tier: 'Explorer Tier',
    uid: 'DKI-992014',
    icon: MapPin,
    colorClass: 'from-amber-600 to-amber-900',
    iconColor: 'text-amber-200',
    shadow: 'shadow-amber-900/40',
  },
  {
    id: 'oslo',
    name: 'OSLO Tourism',
    points: 9000,
    maxPoints: 10000,
    tier: 'Platinum Tier',
    uid: 'OSL-110293',
    icon: Award,
    colorClass: 'from-purple-600 to-purple-900',
    iconColor: 'text-purple-200',
    shadow: 'shadow-purple-900/40',
  }
];

const historyData = {
  injourney: [
    { id: 1, activity: 'Hotel Check-in - The Meru', date: 'Oct 10, 2024', points: '+500' },
    { id: 2, activity: 'Flight Booking - Garuda', date: 'Sep 24, 2024', points: '+1000' },
  ],
  twc: [
    { id: 3, activity: 'Kota Tua Museum Entry', date: 'Oct 12, 2024', points: '+250' },
    { id: 4, activity: 'Monas Observation Access', date: 'Jul 14, 2024', points: '+150' },
  ],
  oslo: [
    { id: 5, activity: 'OSLO Summit Registration', date: 'Oct 01, 2024', points: '+5000' },
    { id: 6, activity: 'Community Contribution', date: 'Sep 15, 2024', points: '+4000' },
  ],
};

const DigitalCard = ({ program }: { program: typeof loyaltyPrograms[0] }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = program.icon;

  return (
    <div className="w-[280px] h-[170px] shrink-0 snap-center perspective-1000 mx-2 digital-card-item">
      <motion.div
        className="w-full h-full relative cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card */}
        <div 
          className={`absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br ${program.colorClass} shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${program.shadow} p-5 flex flex-col justify-between border border-gray-200`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-white text-sm opacity-90">{program.name}</h4>
              <p className="text-white/70 text-[10px] tracking-wider uppercase mt-0.5">{program.tier}</p>
            </div>
            <div className={`p-2 rounded-full bg-white/20 backdrop-blur-md`}>
              <Icon className={`w-5 h-5 ${program.iconColor}`} />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl font-black text-white">{program.points.toLocaleString()}</span>
              <span className="text-xs text-white/70 mb-1">/ {program.maxPoints.toLocaleString()} pts</span>
            </div>
            <div className="w-full bg-black/30 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-white h-1.5 rounded-full relative" 
                style={{ width: `${(program.points / program.maxPoints) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/40 mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div 
          className="absolute inset-0 rounded-2xl bg-white p-4 flex flex-col items-center justify-center border border-gray-200 shadow-xl"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-gray-100 p-2 rounded-xl mb-2">
              <QrCode className="w-16 h-16 text-gray-900" />
            </div>
            <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">ID: {program.uid}</p>
          </div>
          <div className="w-full flex items-center justify-between border-t border-gray-100 pt-2 mt-1">
            <span className="text-xs font-bold text-gray-800">{program.name}</span>
            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
              <ArrowRightLeft className="w-3 h-3" />
              Tap to flip
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function VaultTab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollCenter = container.scrollLeft + container.clientWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    const cards = Array.from(container.querySelectorAll('.digital-card-item'));
    cards.forEach((child, index) => {
      const childElement = child as HTMLElement;
      const childCenter = childElement.offsetLeft + childElement.clientWidth / 2;
      const distance = Math.abs(childCenter - scrollCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex && closestIndex >= 0 && closestIndex < loyaltyPrograms.length) {
      setActiveIndex(closestIndex);
    }
  };

  const activeProgram = loyaltyPrograms[activeIndex];
  const activeHistory = historyData[activeProgram.id as keyof typeof historyData];

  return (
    <div className="flex flex-col gap-0 pb-8">
      {/* Profile summary */}
      <div className="px-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-200/50 flex flex-col items-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 border border-gray-200/50 shadow-inner">
            <Fingerprint className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-white text-lg font-medium leading-tight">Cross-Event Identity</h3>
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-1 mb-4">UID: {userProfile.provider_uid}</p>
          
          <div className="flex items-center gap-2 bg-[#ff9898]/10 border border-[#ff9898]/20 px-3 py-1.5 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4 text-[#ff9898]" />
            <span className="text-[10px] text-[#ff9898] font-bold uppercase tracking-wider">Triple-Check Verified</span>
          </div>
          
          <div className="w-full grid grid-cols-2 gap-4 text-sm mt-2 border-t border-gray-200/50 pt-4">
            <div>
              <span className="block text-[10px] uppercase text-gray-500 font-bold mb-1 tracking-wider">Age</span>
              <span className="text-sm text-gray-200">{userProfile.age}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-gray-500 font-bold mb-1 tracking-wider">Gender</span>
              <span className="text-sm text-gray-200">{userProfile.gender}</span>
            </div>
            <div className="col-span-2">
              <span className="block text-[10px] uppercase text-gray-500 font-bold mb-1 tracking-wider">Location</span>
              <span className="text-sm text-gray-200">{userProfile.city}, {userProfile.province}</span>
            </div>
            <div className="col-span-2 pt-2 border-t border-gray-200/50 mt-2">
              <span className="block text-[10px] uppercase text-gray-500 font-bold mb-1 tracking-wider">Access Validity</span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-sm text-gray-200">Valid until Oct 12, 2025</span>
                </div>
                <span className="text-[9px] text-[#ff9898] font-bold uppercase tracking-widest bg-[#ff9898]/10 border border-[#ff9898]/20 px-2 py-1 rounded">Active Status</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Passes Header */}
      <div className="px-4 mt-8 mb-4">
        <h3 className="font-light tracking-tighter text-white text-xl">Digital Passes</h3>
        <p className="text-xs text-gray-500 mt-1">Swipe to view memberships. Tap to scan.</p>
      </div>

      {/* Card Scroller */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory relative scroll-smooth cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none' }}
        onScroll={handleScroll}
      >
        {/* Magic Spacer to visually center the first card */}
        <div className="w-[calc(50%-140px)] shrink-0" />
        
        {loyaltyPrograms.map((program) => (
          <DigitalCard key={program.id} program={program} />
        ))}
        
        {/* Magic Spacer to visually center the last card */}
        <div className="w-[calc(50%-140px)] shrink-0" />
      </div>

      {/* Pagination Indicators */}
      <div className="flex justify-center items-center gap-1.5 mt-4 mb-2">
        {loyaltyPrograms.map((_, index) => (
          <div 
            key={index} 
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === index ? 'w-4 bg-white' : 'w-1.5 bg-gray-600'
            }`} 
          />
        ))}
      </div>

      <div className="h-px bg-white/5 mx-4 my-6"></div>

      {/* History Log */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-light tracking-tighter text-white text-lg">Activity</h3>
          <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
            {activeProgram.name}
          </span>
        </div>
        
        <div className="flex flex-col gap-3 mb-6">
          {activeHistory && activeHistory.length > 0 ? (
            activeHistory.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4 border border-gray-200/50 flex items-center justify-between group hover:border-gray-200/80 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{item.activity}</span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <div className="text-[#ff9898] font-bold text-sm bg-[#ff9898]/10 px-3 py-1 rounded-full border border-[#ff9898]/20">
                  {item.points}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              No recent activity.
            </div>
          )}
        </div>

        <button className="w-full py-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-white/5 border border-gray-200/80 flex items-center justify-center gap-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors">
          View All Transactions
        </button>
      </div>

    </div>
  );
}

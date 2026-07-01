import { dailyEvents } from '../../mockData';
import { cn } from '../../lib/utils';
import { useAppContext } from '../../context/AppContext';

export default function EventsTab() {
  const { claimNFT, claimedNFTs, isClaiming, currentlyClaimingNFT } = useAppContext();

  return (
    <div className="flex flex-col gap-3 pb-8">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="font-light tracking-tighter text-white text-xl">Schedule</h3>
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff9898]">Oct 12</span>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#333] before:to-transparent">
        {dailyEvents.map((event, i) => {
          const isClaimed = claimedNFTs.includes(event.id);
          const isThisClaiming = isClaiming && currentlyClaimingNFT === event.id;

          return (
          <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
             {/* Timeline Node */}
             <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0c0c0c] bg-white text-gray-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
               {event.status === 'Ended' ? (
                 <div className="w-2 h-2 bg-gray-600 rounded-full" />
               ) : event.status === 'Started' ? (
                 <div className="w-2 h-2 bg-[#7c3aed] rounded-full shadow-[0_0_8px_#8b5cf6] animate-pulse" />
               ) : (
                 <div className="w-2 h-2 border border-gray-600 rounded-full" />
               )}
             </div>

             {/* Content Card */}
             <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-white border border-gray-200/50 ml-4 md:ml-0 flex flex-col items-start relative">
               <div className="flex items-center justify-between w-full mb-1">
                 <span className="text-[10px] font-bold text-gray-400">{event.time}</span>
                 <span className={cn(
                   "text-[9px] font-bold uppercase tracking-wider",
                   event.status === 'Ended' ? "text-gray-600" :
                   event.status === 'Started' ? "text-[#ff9898]" :
                   "text-gray-600"
                 )}>
                   {event.status === 'Started' ? 'Live Now' : event.status}
                 </span>
               </div>
               <h4 className="font-bold text-white mb-1 text-sm">{event.title}</h4>
               <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-widest">{event.location}</p>

               {event.has_nft && (
                 <button 
                  disabled={event.status === 'Ended' || isClaimed || isThisClaiming}
                  onClick={() => claimNFT(event.id)}
                  className={cn(
                    "mt-2 w-full flex items-center justify-center gap-1.5 p-2 rounded-lg border text-[9px] uppercase font-bold tracking-wider transition-colors",
                    event.status === 'Started' && !isClaimed
                      ? "bg-[#ff9898]/10 border-purple-500/20 text-purple-200 cursor-pointer hover:bg-[#ff9898]/20" 
                      : "bg-white/5 border-gray-200/50 text-gray-500 cursor-not-allowed"
                  )}
                 >
                   <div className={cn("w-1.5 h-1.5 rounded-full", (event.status === 'Started' && !isClaimed) ? "bg-purple-400" : "bg-gray-600")} />
                   {isClaimed ? 'Loyalty Points Claimed' : event.status === 'Started' ? 'Loyalty Point Claim + 500 Pts' : event.status === 'Ended' ? 'Points Claimed' : 'Points Locked'}
                 </button>
               )}
             </div>
          </div>
        )})}
      </div>
    </div>
  );
}
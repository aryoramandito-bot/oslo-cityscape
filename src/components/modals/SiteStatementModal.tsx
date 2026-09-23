import { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useConfetti } from '../../hooks/useConfetti';
import { ChevronLeft, X, Award } from 'lucide-react';

export default function SiteStatementModal() {
  const { selectedStatementSite, setSelectedStatementSite, userLedger, allLandmarks } =
    useAppContext();
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    if (selectedStatementSite) {
      triggerConfetti();
    }
  }, [selectedStatementSite]);

  if (!selectedStatementSite) return null;

  const siteTransactions = userLedger.filter((e) => e.spot === selectedStatementSite);
  const totalSitePts = siteTransactions.reduce((sum, e) => sum + e.pts, 0);

  const landmark = allLandmarks.find((l) => l.name === selectedStatementSite);
  const isCulinary = landmark && landmark.category === 'culinary';
  const cardTitle = isCulinary ? 'Culinary Tenant Statement' : 'Attraction Site Statement';
  const discountPct = isCulinary ? 10 : 5;
  const isLoyal = totalSitePts >= 1000;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#f9f8f6] max-w-md mx-auto animate-in slide-in-from-bottom duration-300 overflow-hidden">
      {/* Top App Header with Liquid Glass */}
      <header className="h-16 px-4 border-b border-stone-200/50 bg-white/60 backdrop-blur-2xl sticky top-0 z-20 flex items-center justify-between select-none">
        <button
          onClick={() => setSelectedStatementSite(null)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#d85d5d] hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </button>

        <span className="text-xs font-bold font-outfit uppercase tracking-wider text-stone-800">
          Site Statement
        </span>

        <button
          onClick={() => setSelectedStatementSite(null)}
          className="w-8 h-8 rounded-full bg-white/80 border border-stone-200/60 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors cursor-pointer shadow-2xs"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Tenant Statement Card: Liquid Glass Doppelrand */}
        <div className="rounded-3xl p-5 border border-white/80 bg-white/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(28,25,23,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)] relative overflow-hidden text-left ring-1 ring-stone-900/5">
          {/* Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#ff9898]/15 rounded-full blur-xl pointer-events-none" />

          {isLoyal ? (
            <div className="absolute right-4 top-4 text-4xl animate-bounce select-none">👑</div>
          ) : (
            <div className="absolute right-4 top-4 text-3xl opacity-20 select-none">🏆</div>
          )}

          <span className="text-[10px] uppercase tracking-wider text-[#d85d5d] font-mono font-bold">
            {cardTitle}
          </span>
          <h2 className="text-base font-extrabold text-stone-900 font-outfit mt-0.5 pr-10">
            {selectedStatementSite}
          </h2>

          {/* Points & Unlocked Discount Chip */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-2xl font-extrabold font-outfit text-[#d85d5d] tabular-nums">
              {totalSitePts.toLocaleString()} pts
            </span>
            {isLoyal && (
              <span className="text-[9px] font-extrabold text-white bg-gradient-to-r from-amber-500 to-amber-600 px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 select-none font-outfit">
                🏷️ {discountPct}% VIP Discount Active
              </span>
            )}
          </div>

          {/* Loyalty Progress Meter */}
          <div className="mt-4 pt-3.5 border-t border-stone-100 space-y-2">
            <div className="flex justify-between items-center text-[10.5px] font-mono text-stone-600">
              <span className="font-semibold">Loyalty Progress Meter</span>
              <span className="font-extrabold text-stone-900 tabular-nums">
                {totalSitePts.toLocaleString()} / 1,000 pts
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full h-2 bg-stone-200/60 rounded-full overflow-hidden border border-white shadow-inner">
              <div
                className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-[#d85d5d] to-[#c64f4f]"
                style={{ width: `${Math.min(100, (totalSitePts / 1000) * 100)}%` }}
              />
            </div>

            <div className="text-[10px] font-bold text-stone-500 font-mono leading-normal pt-0.5">
              {isLoyal ? (
                <span className="text-emerald-700">
                  🎉 Milestone achieved! You have unlocked VIP Patron privileges.
                </span>
              ) : (
                <span>
                  ✨ {(1000 - totalSitePts).toLocaleString()} points remaining to earn your Loyal Customer badge.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Historical Transactions List */}
        <div>
          <h3 className="text-xs font-bold text-stone-900 font-outfit uppercase tracking-wider mb-2 px-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#d85d5d]" />
            Historical Activity Statement ({siteTransactions.length})
          </h3>

          {siteTransactions.length > 0 ? (
            <div className="space-y-2">
              {siteTransactions.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-stone-200/70 bg-white/80 backdrop-blur-md shadow-2xs text-left"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="text-base shrink-0">{entry.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold text-stone-900 font-outfit truncate">
                          {entry.action}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono shrink-0">
                          {entry.date}
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider font-mono truncate block">
                        {entry.spot}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#d85d5d] shrink-0 ml-2 font-mono tabular-nums">
                    +{entry.pts} pts
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-stone-200/80 text-center text-xs text-stone-400">
              No historical transactions recorded for this site yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

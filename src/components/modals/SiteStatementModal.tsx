import { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useConfetti } from '../../hooks/useConfetti';
import { ChevronLeft, X, Sparkles, MapPin, Award } from 'lucide-react';

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

  // Filter transactions for this site
  const siteTransactions = userLedger.filter((e) => e.spot === selectedStatementSite);
  const totalSitePts = siteTransactions.reduce((sum, e) => sum + e.pts, 0);

  const landmark = allLandmarks.find((l) => l.name === selectedStatementSite);
  const isCulinary = landmark && landmark.category === 'culinary';
  const cardTitle = isCulinary ? 'Culinary Tenant Statement' : 'Attraction Site Statement';
  const discountPct = isCulinary ? 10 : 5;
  const isLoyal = totalSitePts >= 1000;

  const cardBg = isLoyal
    ? 'bg-gradient-to-br from-amber-400/20 via-[#ff9898]/15 to-white border-amber-300/60'
    : 'bg-gradient-to-br from-rose-50/50 via-white to-white border-gray-200/80';

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#f9f8f6] max-w-md mx-auto animate-in slide-in-from-bottom duration-300 overflow-hidden">
      {/* Top App Header */}
      <header className="h-16 px-5 border-b border-gray-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between">
        <button
          onClick={() => setSelectedStatementSite(null)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#ff9898] hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </button>

        <span className="text-xs font-bold font-outfit uppercase tracking-wider text-gray-800">
          Site Statement
        </span>

        <button
          onClick={() => setSelectedStatementSite(null)}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Tenant Statement Card */}
        <div className={`rounded-3xl p-5 border shadow-sm relative overflow-hidden text-left ${cardBg}`}>
          {/* Background Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#ff9898]/10 rounded-full blur-xl pointer-events-none" />

          {/* Badge Visual Stamp */}
          {isLoyal ? (
            <div className="absolute right-4 top-4 text-4xl animate-bounce select-none">👑</div>
          ) : (
            <div className="absolute right-4 top-4 text-3xl opacity-20 select-none">🏆</div>
          )}

          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono font-bold">
            {cardTitle}
          </span>
          <h2 className="text-base font-extrabold text-gray-900 font-outfit mt-0.5 pr-10">
            {selectedStatementSite}
          </h2>

          {/* Points & Unlocked Discount Chip */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-2xl font-extrabold font-outfit text-[#ff9898]">
              {totalSitePts.toLocaleString()} pts
            </span>
            {isLoyal && (
              <span className="text-[9px] font-extrabold text-white bg-gradient-to-r from-amber-500 to-amber-600 px-2.5 py-1 rounded-full shadow-xs animate-pulse flex items-center gap-1 select-none font-outfit">
                🏷️ {discountPct}% Purchase Discount Active
              </span>
            )}
          </div>

          {/* Loyalty Progress Meter */}
          <div className="mt-4 pt-3.5 border-t border-gray-200/60 space-y-2">
            <div className="flex justify-between items-center text-[10.5px] font-mono text-gray-600">
              <span className="font-semibold">Loyalty Progress Meter</span>
              <span className="font-extrabold text-gray-900">
                {totalSitePts.toLocaleString()} / 1,000 pts
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full h-2 bg-gray-200/60 rounded-full overflow-hidden border border-white shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isLoyal
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                    : 'bg-gradient-to-r from-[#ff9898] to-rose-400'
                }`}
                style={{ width: `${Math.min(100, (totalSitePts / 1000) * 100)}%` }}
              />
            </div>

            <div className="text-[10px] font-bold text-gray-500 font-mono leading-normal pt-0.5">
              {isLoyal ? (
                <span className="text-emerald-600">
                  🎉 Milestone achieved! You have earned the Loyal Customer Badge! 🥳
                </span>
              ) : (
                <span>
                  ✨ {(1000 - totalSitePts).toLocaleString()} points remaining to earn your Loyal
                  Customer Badge.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Historical Transactions List */}
        <div>
          <h3 className="text-xs font-bold text-gray-900 font-outfit uppercase tracking-wider mb-2 px-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#ff9898]" />
            Historical Activity Statement ({siteTransactions.length})
          </h3>

          {siteTransactions.length > 0 ? (
            <div className="space-y-2">
              {siteTransactions.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 rounded-2xl border border-gray-200/80 bg-white shadow-2xs text-left"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="text-base shrink-0">{entry.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold text-gray-900 font-outfit truncate">
                          {entry.action}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono shrink-0">
                          {entry.date}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono truncate block">
                        {entry.spot}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#ff9898] shrink-0 ml-2 font-mono">
                    +{entry.pts} pts
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 text-center text-xs text-gray-500">
              No historical transactions recorded for this site yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

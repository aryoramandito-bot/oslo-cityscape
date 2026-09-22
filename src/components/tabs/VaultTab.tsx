import { useAppContext } from '../../context/AppContext';
import {
  Award,
  MapPin,
  CheckCircle2,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import PassportCardDeck from '../vault/PassportCardDeck';

export default function VaultTab() {
  const {
    userProfile,
    checkins,
    allLandmarks,
    loyaltyPoints,
    userLedger,
    setSelectedStatementSite,
    setIsLogoutModalOpen,
  } = useAppContext();

  const checkedLandmarks = allLandmarks.filter((item) => checkins.includes(item.id));

  // 1. Top Badges (sorted by points descending, top 2)
  const unlockedBadges = userLedger
    .filter((e) => e.action === 'Badge Unlocked')
    .sort((a, b) => b.pts - a.pts)
    .slice(0, 2);

  // 2. Accumulated Loyalty Points per Culinary or Attraction Site
  const sitePoints: Record<string, number> = {};
  userLedger.forEach((entry) => {
    const lm = allLandmarks.find((l) => l.name === entry.spot);
    if (lm && (lm.category === 'culinary' || lm.category === 'attraction')) {
      sitePoints[entry.spot] = (sitePoints[entry.spot] || 0) + entry.pts;
    }
  });

  const siteList = Object.entries(sitePoints)
    .map(([siteName, pts]) => ({ name: siteName, points: pts }))
    .sort((a, b) => b.points - a.points);

  return (
    <div className="flex flex-col gap-5 pb-20 pt-1">
      {/* Section Headline */}
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ff9898] block">
            Digital Loyalty Passports
          </span>
          <h2 className="text-base font-extrabold text-gray-900 font-outfit mt-0.5">
            Explorer Vault & Passports
          </h2>
        </div>
        <span className="text-[10px] font-mono text-gray-400 bg-white px-2 py-1 rounded-lg border border-gray-200/80">
          Swipe & tap to flip
        </span>
      </div>

      {/* Horizontal Sliding Passport Card Deck */}
      <PassportCardDeck
        userProfile={userProfile}
        onSelectAffiliateSite={(site) => setSelectedStatementSite(site)}
      />

      {/* ========================================== */}
      {/* MY ACTIVITY LEDGER & LOYALTY BREAKDOWN */}
      {/* ========================================== */}
      <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs space-y-4">
        {/* Ledger Header */}
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <div>
            <span className="text-[9.5px] uppercase tracking-widest text-[#ff9898] font-bold font-mono">
              Points Breakdown
            </span>
            <h3 className="text-base font-extrabold text-gray-900 font-outfit">
              My Activity Ledger
            </h3>
          </div>

          <div className="bg-rose-50 border border-rose-200/60 px-3 py-1 rounded-xl text-xs font-extrabold font-mono text-[#ff9898]">
            {loyaltyPoints.toLocaleString()} pts
          </div>
        </div>

        {/* Section 1: Top Badges & Accolades */}
        <div className="space-y-2">
          <span className="text-[9.5px] uppercase tracking-wider text-gray-400 font-bold block px-0.5 font-mono">
            Top Badges & Accolades
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            {unlockedBadges.length > 0 ? (
              unlockedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-gradient-to-br from-rose-50/40 via-white to-white border border-rose-200/60 p-3 rounded-2xl flex flex-col justify-between h-20 shadow-2xs relative overflow-hidden"
                >
                  <div className="text-lg shrink-0">{badge.icon || '🏅'}</div>
                  <div className="mt-auto">
                    <span className="text-[10px] font-bold text-gray-900 leading-tight block truncate font-outfit">
                      {badge.spot}
                    </span>
                    <span className="text-[9px] text-[#ff9898] font-extrabold font-mono">
                      +{badge.pts} pts
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 bg-gray-50 border border-gray-200/60 p-4 rounded-2xl text-center text-xs text-gray-400 font-medium">
                🏅 Explore spots to unlock interest badges!
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Site & Tenant Loyalty Balances */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[9.5px] uppercase tracking-wider text-gray-400 font-bold font-mono">
              Site & Tenant Loyalty Balances
            </span>
            <span className="text-[10px] text-gray-400 font-medium">Tap site to view statement</span>
          </div>

          <div className="space-y-2">
            {siteList.length > 0 ? (
              siteList.map((site) => {
                const landmark = allLandmarks.find((l) => l.name === site.name);
                const isCulinary = landmark && landmark.category === 'culinary';
                const isLoyal = site.points >= 1000;
                const discountPct = isCulinary ? 10 : 5;

                // Category Icon
                let siteIcon = '📍';
                if (isCulinary) {
                  const hasCoffee =
                    site.name.toLowerCase().includes('kopi') ||
                    site.name.toLowerCase().includes('coffee');
                  siteIcon = hasCoffee ? '☕' : '🍜';
                } else if (landmark?.tags?.includes('heritage')) {
                  siteIcon = '🏛️';
                } else if (landmark?.tags?.includes('recreation')) {
                  siteIcon = '🎢';
                }

                return (
                  <div
                    key={site.name}
                    onClick={() => setSelectedStatementSite(site.name)}
                    className="p-3 rounded-2xl border border-gray-200/80 bg-gray-50/50 hover:bg-white hover:border-[#ff9898]/40 transition-all flex items-center justify-between cursor-pointer shadow-2xs group"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-sm shrink-0 shadow-2xs">
                        {siteIcon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-bold text-gray-900 block truncate font-outfit group-hover:text-[#ff9898] transition-colors">
                          {site.name}
                        </span>

                        {isLoyal ? (
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[8px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded-md font-mono">
                              👑 Loyal Customer
                            </span>
                            <span className="text-[8px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-700 px-1.5 py-0.2 rounded-md font-mono">
                              🏷️ {discountPct}% Off
                            </span>
                          </div>
                        ) : (
                          <span className="text-[9px] text-gray-400 font-mono block mt-0.5">
                            {(1000 - site.points).toLocaleString()} pts to Loyal Customer
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="text-xs font-extrabold text-[#ff9898] font-mono">
                        {site.points.toLocaleString()} pts
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 rounded-2xl bg-gray-50 text-center text-xs text-gray-400">
                No site transactions recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stamped Sites Showcase */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold text-gray-900 font-outfit uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#ff9898]" />
            Collected Cultural Stamps ({checkedLandmarks.length})
          </h3>
        </div>

        {checkedLandmarks.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5">
            {checkedLandmarks.map((landmark) => (
              <div
                key={landmark.id}
                className="p-3 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex items-center gap-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 font-outfit truncate">
                    {landmark.name}
                  </h4>
                  <span className="text-[9.5px] text-gray-400 capitalize flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-[#ff9898]" />
                    {landmark.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 text-center">
            <p className="text-xs text-gray-500 font-medium">No cultural stamps collected yet.</p>
            <p className="text-[11px] text-gray-400 mt-1">
              Visit landmarks and check in to unlock collectible badges.
            </p>
          </div>
        )}
      </div>

      {/* Account Session & Sign Out Card */}
      <div className="bg-white rounded-3xl p-4 border border-gray-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-400 to-[#ff9898] text-white flex items-center justify-center font-bold text-sm font-outfit shrink-0">
            {userProfile.name
              ? userProfile.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
              : 'AW'}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-gray-900 font-outfit truncate">
                {userProfile.name}
              </h4>
              <span className="text-[8.5px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-md font-bold">
                Active
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono block truncate mt-0.5">
              ID: {userProfile.providerUid} · {userProfile.region}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100/70 text-rose-600 transition-colors text-xs font-outfit font-bold cursor-pointer shrink-0 ml-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}

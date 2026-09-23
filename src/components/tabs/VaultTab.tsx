import { useAppContext } from '../../context/AppContext';
import {
  Award,
  MapPin,
  ChevronRight,
  LogOut,
  Stamp,
  RotateCw,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import PassportCardDeck from '../vault/PassportCardDeck';
import { useState } from 'react';

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

  const [copiedUid, setCopiedUid] = useState(false);

  const checkedLandmarks = allLandmarks.filter((item) => checkins.includes(item.id));

  // Top Badges
  const unlockedBadges = userLedger
    .filter((e) => e.action === 'Badge Unlocked')
    .sort((a, b) => b.pts - a.pts);

  // Accumulated Loyalty Points per Culinary or Attraction Site
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

  const handleCopyUid = (uid: string) => {
    navigator.clipboard?.writeText(uid);
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
  };

  // Stamp ink tones
  const stampColors = [
    { border: 'border-[#d85d5d]', text: 'text-[#d85d5d]', bg: 'bg-[#fff1f1]' },
    { border: 'border-emerald-600', text: 'text-emerald-700', bg: 'bg-emerald-50' },
    { border: 'border-stone-700', text: 'text-stone-800', bg: 'bg-stone-100' },
    { border: 'border-amber-700', text: 'text-amber-800', bg: 'bg-amber-50' },
  ];

  return (
    <div className="flex flex-col gap-5 pb-24 pt-1">
      {/* 1. Section Headline */}
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#d85d5d] block">
            Digital Loyalty Passports
          </span>
          <h2 className="text-xl font-extrabold text-stone-900 font-outfit tracking-tight">
            Explorer Vault & Passports
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-stone-500 bg-white px-2.5 py-1 rounded-full border border-stone-200/80 shadow-2xs">
          <RotateCw className="w-3 h-3 text-[#d85d5d]" />
          <span>Swipe & tap to flip</span>
        </div>
      </div>

      {/* 2. Horizontal Sliding Passport Card Deck */}
      <PassportCardDeck
        userProfile={userProfile}
        onSelectAffiliateSite={(site) => setSelectedStatementSite(site)}
      />

      {/* 3. Double-Bezel Activity Ledger & Loyalty Breakdown */}
      <div className="rounded-[28px] p-1 bg-gradient-to-b from-stone-900/[0.04] to-stone-900/[0.01] ring-1 ring-stone-900/[0.05] shadow-2xs">
        <div className="rounded-[calc(28px-0.25rem)] bg-white p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-4">
          
          {/* Ledger Header */}
          <div className="flex justify-between items-center pb-3 border-b border-stone-100">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#d85d5d] font-bold font-mono">
                Points Breakdown
              </span>
              <h3 className="text-base font-extrabold text-stone-900 font-outfit tracking-tight">
                My Activity Ledger
              </h3>
            </div>

            <div className="bg-[#fff1f1] border border-[#fecaca] px-3 py-1 rounded-xl text-xs font-mono font-extrabold text-[#d85d5d] flex items-center gap-1 tabular-nums">
              <Coins className="w-3.5 h-3.5" />
              <span>{loyaltyPoints.toLocaleString()} pts</span>
            </div>
          </div>

          {/* Section: Badges & Accolades */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold font-mono">
                Explorer Badges ({unlockedBadges.length})
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {unlockedBadges.length > 0 ? (
                unlockedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-gradient-to-br from-[#fff1f1]/40 via-white to-white border border-[#fecaca]/80 p-3 rounded-2xl flex flex-col justify-between h-20 shadow-2xs relative overflow-hidden"
                  >
                    <div className="text-lg shrink-0">{badge.icon || '🏅'}</div>
                    <div className="mt-auto">
                      <span className="text-[11px] font-bold text-stone-900 leading-tight block truncate font-outfit">
                        {badge.spot}
                      </span>
                      <span className="text-[9.5px] text-[#d85d5d] font-extrabold font-mono tabular-nums">
                        +{badge.pts} pts
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 bg-stone-50 border border-stone-200/60 p-4 rounded-2xl text-center text-xs text-stone-400 font-medium">
                  🏅 Visit heritage sites & check in to unlock badges!
                </div>
              )}
            </div>
          </div>

          {/* Section: Tenant Loyalty Balances with Micro-Progress Bar */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold font-mono">
                Site & Tenant Balances
              </span>
              <span className="text-[10px] text-stone-400 font-medium">Tap site to view statement</span>
            </div>

            <div className="space-y-2.5">
              {siteList.length > 0 ? (
                siteList.map((site) => {
                  const landmark = allLandmarks.find((l) => l.name === site.name);
                  const isCulinary = landmark && landmark.category === 'culinary';
                  const isLoyal = site.points >= 1000;
                  const discountPct = isCulinary ? 10 : 5;
                  const progressPct = Math.min(100, Math.round((site.points / 1000) * 100));

                  return (
                    <div
                      key={site.name}
                      onClick={() => setSelectedStatementSite(site.name)}
                      className="p-3.5 rounded-2xl border border-stone-200/80 bg-stone-50/50 hover:bg-white hover:border-[#d85d5d]/40 transition-all flex flex-col gap-2 cursor-pointer shadow-2xs group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1 pr-2">
                          <span className="text-xs font-bold text-stone-900 block truncate font-outfit group-hover:text-[#d85d5d] transition-colors">
                            {site.name}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono">
                            {isLoyal ? 'VIP Patron Tier' : `${(1000 - site.points).toLocaleString()} pts to VIP`}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-xs font-extrabold text-[#d85d5d] font-mono tabular-nums">
                            {site.points.toLocaleString()} pts
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>

                      {/* Micro Progress Bar to 1,000 pts */}
                      <div className="w-full bg-stone-200/70 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#d85d5d] h-full rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>

                      {isLoyal && (
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                            👑 Loyal Patron
                          </span>
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                            🏷️ {discountPct}% VIP Discount
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-4 rounded-2xl bg-stone-50 text-center text-xs text-stone-400">
                  No site transactions recorded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Collected Cultural Stamps (Vintage Rubber Postal Visa Stamps) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-stone-900 font-outfit uppercase tracking-wider flex items-center gap-1.5">
            <Stamp className="w-4 h-4 text-[#d85d5d]" />
            Collected Cultural Stamps ({checkedLandmarks.length})
          </h3>
          <span className="text-[10px] font-mono text-stone-400">Official Heritage Visas</span>
        </div>

        {checkedLandmarks.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5">
            {checkedLandmarks.map((landmark, idx) => {
              const color = stampColors[idx % stampColors.length];
              const rotation = idx % 2 === 0 ? '-rotate-1' : 'rotate-1';

              return (
                <div
                  key={landmark.id}
                  className={`p-3.5 rounded-2xl bg-white border-2 border-dashed ${color.border} shadow-2xs flex flex-col justify-between h-24 relative overflow-hidden transition-transform hover:scale-[1.02] ${rotation}`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`text-[8.5px] font-mono font-extrabold uppercase tracking-widest ${color.text}`}>
                      PASSPORT VISA
                    </span>
                    <span className={`w-5 h-5 rounded-full ${color.bg} flex items-center justify-center ${color.text} text-[10px] font-bold`}>
                      ✓
                    </span>
                  </div>

                  <div className="min-w-0 mt-auto">
                    <h4 className="text-xs font-extrabold text-stone-900 font-outfit truncate">
                      {landmark.name}
                    </h4>
                    <span className="text-[9.5px] text-stone-400 capitalize block truncate mt-0.5 font-mono">
                      {landmark.category} · Verified
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 text-center shadow-2xs">
            <Stamp className="w-6 h-6 text-stone-300 mx-auto mb-1.5" />
            <p className="text-xs text-stone-600 font-semibold font-outfit">No cultural stamps collected yet</p>
            <p className="text-[11px] text-stone-400 mt-0.5">
              Visit landmarks and check in with your GPS radar to collect physical visa rubber stamps.
            </p>
          </div>
        )}
      </div>

      {/* 5. Account Session & Sign Out Card */}
      <div className="bg-white rounded-3xl p-4.5 border border-stone-200/80 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#d85d5d] to-[#c64f4f] text-white flex items-center justify-center font-bold text-sm font-outfit shrink-0 shadow-2xs">
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
              <h4 className="text-xs font-bold text-stone-900 font-outfit truncate">
                {userProfile.name}
              </h4>
              <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-md font-bold border border-emerald-200/60">
                Active
              </span>
            </div>
            <button
              onClick={() => handleCopyUid(userProfile.providerUid)}
              className="text-[10px] text-stone-400 font-mono mt-0.5 flex items-center gap-1 hover:text-stone-700 transition-colors cursor-pointer"
              title="Click to copy explorer ID"
            >
              <span>ID: {userProfile.providerUid.slice(0, 16)}...</span>
              {copiedUid ? <Check className="w-2.5 h-2.5 text-emerald-600" /> : <Copy className="w-2.5 h-2.5" />}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-stone-600 transition-all text-xs font-outfit font-bold cursor-pointer shrink-0 ml-2 active:scale-95"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Session</span>
        </button>
      </div>
    </div>
  );
}

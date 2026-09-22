import { useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { mockPerks } from '../../data/perks';
import { Ticket, QrCode, Sparkles } from 'lucide-react';
import { PerkItem } from '../../types';
import RedeemVoucherModal from '../modals/RedeemVoucherModal';

export default function PerksTab() {
  const { activeCity } = useAppContext();
  const [selectedPerk, setSelectedPerk] = useState<PerkItem | null>(null);
  const [redeemedPerks, setRedeemedPerks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('oslo_redeemed_perks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const cityPerks = mockPerks.filter((p) => p.cityId === activeCity);

  const handleRedeemSuccess = (perkId: string) => {
    setRedeemedPerks((prev) => {
      if (prev.includes(perkId)) return prev;
      const next = [...prev, perkId];
      try {
        localStorage.setItem('oslo_redeemed_perks', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // City-specific banner & accent styling
  const cityTheme = useMemo(() => {
    switch (activeCity) {
      case 'bandung':
        return {
          bannerBg: 'bg-amber-500/10 text-amber-600',
          accentText: 'text-amber-600',
          pill: 'bg-amber-50 border-amber-200/60 text-amber-700',
          btn: 'bg-amber-600 hover:bg-amber-700 text-white',
        };
      case 'solo':
        return {
          bannerBg: 'bg-emerald-500/10 text-emerald-600',
          accentText: 'text-emerald-600',
          pill: 'bg-emerald-50 border-emerald-200/60 text-emerald-700',
          btn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        };
      case 'laweyan':
        return {
          bannerBg: 'bg-amber-950/10 text-[#78350f]',
          accentText: 'text-[#78350f]',
          pill: 'bg-amber-950/10 border-amber-800/30 text-[#78350f]',
          btn: 'bg-[#78350f] hover:bg-amber-900 text-white',
        };
      case 'jakarta':
      default:
        return {
          bannerBg: 'bg-rose-500/10 text-rose-600',
          accentText: 'text-[#ff9898]',
          pill: 'bg-rose-50 border-rose-200/60 text-[#ff9898]',
          btn: 'bg-gray-900 hover:bg-black text-white',
        };
    }
  }, [activeCity]);

  return (
    <div className="flex flex-col gap-4 pb-20 pt-1">
      {/* Top Banner */}
      <div className="p-4 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between">
        <div>
          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${cityTheme.accentText}`}>
            Exclusive Benefits
          </span>
          <h2 className="text-base font-bold text-gray-900 font-outfit mt-0.5">
            {activeCity === 'laweyan'
              ? 'Laweyan Merchant & Artisan Perks'
              : activeCity === 'solo'
              ? 'Solo Heritage & Partner Perks'
              : activeCity === 'bandung'
              ? 'Bandung Partner Discounts'
              : 'Jakarta Explorer Perks'}
          </h2>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Slide to redeem and present dynamic QR code at the counter
          </p>
        </div>
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${cityTheme.bannerBg}`}>
          <Ticket className="w-5 h-5" />
        </div>
      </div>

      {/* Perks List */}
      <div className="space-y-3.5">
        {cityPerks.map((perk) => {
          const isRedeemed = redeemedPerks.includes(perk.id);

          return (
            <div
              key={perk.id}
              className={`p-4 rounded-2xl bg-white border shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-3 ${
                isRedeemed ? 'border-emerald-200 bg-emerald-50/10' : 'border-gray-200/80'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border font-outfit inline-block ${cityTheme.pill}`}
                    >
                      {perk.discount}
                    </span>

                    {isRedeemed && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase font-mono tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        QR Active
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs font-bold text-gray-900 font-outfit leading-tight">
                    {perk.title}
                  </h3>
                  <span className="text-[11px] text-gray-400 block mt-0.5 font-medium">
                    {perk.merchant} · {perk.validUntil}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedPerk(perk)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold font-outfit transition-all cursor-pointer shrink-0 shadow-xs flex items-center gap-1.5 ${
                    isRedeemed
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : cityTheme.btn
                  }`}
                >
                  {isRedeemed ? (
                    <>
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Show QR</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Redeem</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-gray-500 leading-relaxed border-t border-gray-100 pt-2.5">
                {perk.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Slideable & QR Code Redemption Modal */}
      <RedeemVoucherModal
        perk={selectedPerk}
        onClose={() => setSelectedPerk(null)}
        isAlreadyRedeemed={selectedPerk ? redeemedPerks.includes(selectedPerk.id) : false}
        onRedeemSuccess={handleRedeemSuccess}
      />
    </div>
  );
}

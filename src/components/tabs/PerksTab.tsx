import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { mockPerks } from '../../data/perks';
import { Ticket, QrCode, Sparkles, Copy, Check, Tag, Clock } from 'lucide-react';
import { PerkItem } from '../../types';
import RedeemVoucherModal from '../modals/RedeemVoucherModal';

export default function PerksTab() {
  const { activeCity, rewardPoints, redeemedPerks, redeemPerk } = useAppContext();
  const [selectedPerk, setSelectedPerk] = useState<PerkItem | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const cityPerks = useMemo(() => {
    return mockPerks.filter((p) => p.cityId === activeCity);
  }, [activeCity]);

  const handleRedeemSuccess = (perkId: string) => {
    redeemPerk(perkId);

    const perk = mockPerks.find((p) => p.id === perkId);
    if (perk) {
      rewardPoints(50, `Redeemed ${perk.merchant}`, '🎟️');
    }
  };

  const copyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getCityTitle = () => {
    switch (activeCity) {
      case 'laweyan':
        return 'Laweyan Merchant & Artisan Perks';
      case 'solo':
        return 'Solo Heritage & Partner Perks';
      case 'bandung':
        return 'Bandung Creative Partner Discounts';
      case 'jakarta':
      default:
        return 'Jakarta Explorer & Partner Perks';
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-24 pt-1">
      {/* 1. Header Banner */}
      <div className="p-4.5 rounded-3xl bg-white border border-stone-200/80 shadow-2xs flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d85d5d]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#d85d5d]">
              Exclusive Member Privileges
            </span>
          </div>
          <h2 className="text-lg font-extrabold text-stone-900 font-outfit tracking-tight">
            {getCityTitle()}
          </h2>
          <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
            Slide to redeem and present dynamic merchant QR code at the counter
          </p>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-[#fff1f1] border border-[#fecaca] text-[#d85d5d] flex items-center justify-center shrink-0 shadow-2xs">
          <Ticket className="w-5 h-5" />
        </div>
      </div>

      {/* 2. Perks Ticket-Stub List */}
      <div className="space-y-3.5">
        {cityPerks.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-stone-200/80 shadow-2xs">
            <Ticket className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-stone-800 font-outfit">No active vouchers in this chapter</p>
            <p className="text-[11px] text-stone-400 mt-1">Check back soon as local custodians announce new privileges.</p>
          </div>
        ) : (
          cityPerks.map((perk) => {
            const isRedeemed = redeemedPerks.includes(perk.id);

            return (
              /* Physical Ticket-Stub Card */
              <div
                key={perk.id}
                className={`relative rounded-2xl bg-white border transition-all duration-300 shadow-2xs hover:shadow-md overflow-hidden flex flex-col justify-between ${
                  isRedeemed ? 'border-emerald-300/80 bg-gradient-to-b from-emerald-50/20 to-white' : 'border-stone-200/80'
                }`}
              >
                {/* Semicircular Scalloped Cutout Notches */}
                <div className="absolute top-[88px] -left-2.5 w-5 h-5 rounded-full bg-[#f9f8f6] border-r border-stone-200/80 z-20" />
                <div className="absolute top-[88px] -right-2.5 w-5 h-5 rounded-full bg-[#f9f8f6] border-l border-stone-200/80 z-20" />

                {/* Upper Voucher Section */}
                <div className="p-4 flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    {/* Discount Badge & Status */}
                    <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#fff1f1] border border-[#fecaca] text-[#d85d5d]">
                        {perk.discount}
                      </span>

                      {perk.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[9px] font-mono uppercase tracking-wider bg-stone-100 text-stone-600 border border-stone-200/60"
                        >
                          {tag}
                        </span>
                      ))}

                      {isRedeemed && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase font-mono tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          QR Active
                        </span>
                      )}
                    </div>

                    {/* Perk Title & Merchant */}
                    <h3 className="text-xs font-bold text-stone-900 font-outfit leading-snug">
                      {perk.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-1 font-medium">
                      <span>{perk.merchant}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {perk.validUntil}
                      </span>
                    </div>
                  </div>

                  {/* Redeem / Show QR CTA */}
                  <button
                    type="button"
                    onClick={() => setSelectedPerk(perk)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold font-outfit transition-all duration-200 cursor-pointer shrink-0 shadow-2xs flex items-center gap-1.5 active:scale-95 ${
                      isRedeemed
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-[#d85d5d] hover:bg-[#c64f4f] text-white'
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

                {/* Dashed Perforation Tear-Off Line */}
                <div className="border-t-2 border-dashed border-stone-200/90 mx-5 relative z-10" />

                {/* Lower Voucher Details & Coupon Chip */}
                <div className="p-4 pt-3 flex items-center justify-between gap-3 text-[11px] text-stone-500">
                  <p className="line-clamp-2 leading-relaxed flex-1">
                    {perk.description}
                  </p>

                  {perk.code && (
                    <button
                      type="button"
                      onClick={(e) => copyCode(perk.code, e)}
                      className="px-2.5 py-1 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200/80 font-mono text-[10px] font-bold text-stone-700 flex items-center gap-1 cursor-pointer transition-colors shrink-0"
                      title="Click to copy coupon code"
                    >
                      {copiedCode === perk.code ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-stone-400" />
                          <span>{perk.code}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
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

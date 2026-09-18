import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { mockPerks } from '../../data/perks';
import { Ticket, Check, Copy, QrCode } from 'lucide-react';
import { PerkItem } from '../../types';

export default function PerksTab() {
  const { activeCity } = useAppContext();
  const [selectedPerk, setSelectedPerk] = useState<PerkItem | null>(null);
  const [copied, setCopied] = useState(false);

  const isJakarta = activeCity === 'jakarta';
  const cityPerks = mockPerks.filter((p) => p.cityId === activeCity);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 pb-20 pt-1">
      {/* Top Banner */}
      <div className="p-4 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ff9898] block">
            Exclusive Benefits
          </span>
          <h2 className="text-base font-bold text-gray-900 font-outfit mt-0.5">
            {isJakarta ? 'Jakarta Explorer Perks' : 'Bandung Partner Discounts'}
          </h2>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Show these vouchers at merchant counters to redeem
          </p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
          <Ticket className="w-5 h-5" />
        </div>
      </div>

      {/* Perks List */}
      <div className="space-y-3.5">
        {cityPerks.map((perk) => (
          <div
            key={perk.id}
            className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-rose-50 border border-rose-200/60 text-[#ff9898] font-outfit inline-block mb-1.5">
                  {perk.discount}
                </span>
                <h3 className="text-xs font-bold text-gray-900 font-outfit">{perk.title}</h3>
                <span className="text-[11px] text-gray-400 block mt-0.5 font-medium">
                  {perk.merchant} · {perk.validUntil}
                </span>
              </div>

              <button
                onClick={() => setSelectedPerk(perk)}
                className="px-3 py-1.5 rounded-xl bg-gray-900 text-white text-[11px] font-bold font-outfit hover:bg-black transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                Redeem
              </button>
            </div>

            <p className="text-[11px] text-gray-500 leading-relaxed border-t border-gray-100 pt-2.5">
              {perk.description}
            </p>
          </div>
        ))}
      </div>

      {/* Redeem Voucher Modal */}
      {selectedPerk && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-5 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 flex flex-col items-center text-center relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <QrCode className="w-6 h-6" />
            </div>

            <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff9898] font-bold">
              {selectedPerk.merchant}
            </span>
            <h3 className="text-base font-extrabold font-outfit text-gray-900 mt-1">
              {selectedPerk.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Present this code at the cashier counter during checkout.
            </p>

            {/* Voucher Code Box */}
            <div className="my-5 p-3.5 rounded-2xl bg-gray-50 border border-dashed border-gray-300 w-full flex items-center justify-between">
              <span className="font-mono font-extrabold text-sm tracking-widest text-gray-800">
                {selectedPerk.code}
              </span>
              <button
                onClick={() => handleCopy(selectedPerk.code)}
                className="flex items-center gap-1 text-xs text-[#ff9898] font-bold hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <button
              onClick={() => setSelectedPerk(null)}
              className="w-full py-3 rounded-2xl bg-gray-900 text-white font-outfit font-bold text-xs hover:bg-black transition-colors cursor-pointer"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

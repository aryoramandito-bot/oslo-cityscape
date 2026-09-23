import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { useConfetti } from '../../hooks/useConfetti';
import { PerkItem } from '../../types';
import SlideToRedeem from '../perks/SlideToRedeem';
import { X, Check, Copy, QrCode, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface RedeemVoucherModalProps {
  perk: PerkItem | null;
  onClose: () => void;
  isAlreadyRedeemed?: boolean;
  onRedeemSuccess?: (perkId: string) => void;
}

export default function RedeemVoucherModal({
  perk,
  onClose,
  isAlreadyRedeemed = false,
  onRedeemSuccess,
}: RedeemVoucherModalProps) {
  const { triggerConfetti } = useConfetti();

  const [isRedeemed, setIsRedeemed] = useState(isAlreadyRedeemed);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(900); // 15 minutes timer

  useEffect(() => {
    setIsRedeemed(isAlreadyRedeemed);
    setSecondsRemaining(900);
  }, [perk, isAlreadyRedeemed]);

  // Generate real QR code when perk is redeemed
  useEffect(() => {
    if (!perk || !isRedeemed) return;

    const payload = JSON.stringify({
      app: 'Oslo Cityscape',
      protocol: 'DISCOUNT_VOUCHER_V1',
      voucherId: perk.id,
      code: perk.code,
      merchant: perk.merchant,
      discount: perk.discount,
      city: perk.cityId,
      issuedAt: new Date().toISOString(),
      expiresInMinutes: 15,
    });

    QRCode.toDataURL(payload, {
      width: 280,
      margin: 1,
      color: {
        dark: '#1c1917',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR code', err));
  }, [perk, isRedeemed]);

  // Expiration Countdown
  useEffect(() => {
    if (!isRedeemed || secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRedeemed, secondsRemaining]);

  if (!perk) return null;

  const handleSlideConfirm = () => {
    setIsRedeemed(true);
    triggerConfetti();
    if (onRedeemSuccess) {
      onRedeemSuccess(perk.id);
    }
  };

  const copyVoucherCode = () => {
    if (!perk.code) return;
    navigator.clipboard?.writeText(perk.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Translucent Liquid Glass Voucher Sheet */}
      <div
        className="w-full max-w-sm bg-white/90 backdrop-blur-2xl rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-white/80 ring-1 ring-stone-900/5 animate-in slide-in-from-bottom duration-300 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Light Leak */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#ff9898]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-[#fff1f1] border border-[#fecaca] text-[#d85d5d]">
              Verified Merchant Perk
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100/80 hover:bg-stone-200/80 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Voucher Headline & Merchant Info */}
        <div className="mt-4 mb-4 relative z-10 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xl font-extrabold font-outfit text-stone-900">
              {perk.discount} Off
            </span>
            <span className="text-xs font-bold font-mono text-[#d85d5d]">
              {perk.merchant}
            </span>
          </div>
          <h3 className="text-xs font-bold text-stone-700 font-outfit mt-0.5">
            {perk.title}
          </h3>
          <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
            {perk.description}
          </p>
        </div>

        {/* VIEW 1: Slide to Redeem */}
        {!isRedeemed ? (
          <div className="space-y-4 relative z-10">
            {/* Voucher Code Preview Box (Liquid Glass) */}
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-stone-200/80 text-center shadow-2xs">
              <span className="text-[9.5px] uppercase tracking-wider text-stone-400 font-mono font-bold block mb-1">
                Merchant Counter Code
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg font-mono font-extrabold tracking-widest text-stone-900">
                  {perk.code}
                </span>
                <button
                  type="button"
                  onClick={copyVoucherCode}
                  className="p-1 rounded-md hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                  title="Copy code"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Instruction Callout */}
            <div className="flex items-start gap-2 p-3 rounded-2xl bg-stone-50 border border-stone-200/60 text-[11px] text-stone-600 text-left">
              <Clock className="w-4 h-4 text-[#d85d5d] shrink-0 mt-0.5" />
              <span>
                Slide the bar below when you are at the cashier counter to generate your live QR code.
              </span>
            </div>

            {/* Slide to Redeem Component */}
            <SlideToRedeem onConfirm={handleSlideConfirm} />
          </div>
        ) : (
          /* VIEW 2: Real Scannable QR Code */
          <div className="space-y-4 relative z-10">
            {/* Scannable Real QR Code Surface */}
            <div className="p-4 rounded-3xl bg-white border border-stone-200/80 shadow-md flex flex-col items-center justify-center relative overflow-hidden">
              <div className="relative w-48 h-48 bg-white rounded-2xl flex items-center justify-center overflow-hidden">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Redeem QR Code"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="animate-pulse flex items-center justify-center text-xs text-stone-400">
                    Generating secure QR...
                  </div>
                )}
                {/* Laser scan line animation */}
                <div className="absolute inset-x-0 h-0.5 bg-[#d85d5d] shadow-[0_0_8px_#d85d5d] animate-qr-scan" />
              </div>

              {/* Active Timer Pill */}
              <div className="flex items-center gap-1.5 mt-3 text-[11px] font-mono font-bold text-stone-700 bg-stone-50 px-3 py-1 rounded-full border border-stone-200">
                <Clock className="w-3.5 h-3.5 text-[#d85d5d]" />
                <span>Expires in: {timeFormatted}</span>
              </div>
            </div>

            {/* Security Guarantee Pill */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-emerald-700 bg-emerald-50 py-1.5 px-3 rounded-xl border border-emerald-200/60">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Single-Use Merchant QR Voucher</span>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-[#d85d5d] hover:bg-[#c64f4f] text-white font-outfit font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-95"
            >
              Done / Return to Perks
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

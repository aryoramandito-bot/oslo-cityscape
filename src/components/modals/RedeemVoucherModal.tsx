import React, { useState, useEffect, useMemo } from 'react';
import QRCode from 'qrcode';
import { useConfetti } from '../../hooks/useConfetti';
import { useAppContext } from '../../context/AppContext';
import { PerkItem } from '../../types';
import SlideToRedeem from '../perks/SlideToRedeem';
import { X, Check, Copy, QrCode, Sparkles, Clock, ShieldCheck, ArrowLeft } from 'lucide-react';

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
  const { activeCity } = useAppContext();
  const { triggerConfetti } = useConfetti();

  const [isRedeemed, setIsRedeemed] = useState(isAlreadyRedeemed);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(900); // 15 minutes timer

  // Sync redeemed status when perk changes
  useEffect(() => {
    setIsRedeemed(isAlreadyRedeemed);
    setSecondsRemaining(900);
  }, [perk, isAlreadyRedeemed]);

  // City chapter theme styling
  const theme = useMemo(() => {
    switch (activeCity) {
      case 'bandung':
        return {
          gradient: 'from-amber-400 to-amber-600',
          text: 'text-amber-600',
          bgLight: 'bg-amber-50',
          border: 'border-amber-200',
          badge: 'bg-amber-500 text-white',
        };
      case 'solo':
        return {
          gradient: 'from-emerald-500 to-emerald-700',
          text: 'text-emerald-600',
          bgLight: 'bg-emerald-50',
          border: 'border-emerald-200',
          badge: 'bg-emerald-600 text-white',
        };
      case 'laweyan':
        return {
          gradient: 'from-amber-800 to-[#78350f]',
          text: 'text-[#78350f]',
          bgLight: 'bg-amber-950/10',
          border: 'border-amber-800/30',
          badge: 'bg-[#78350f] text-amber-100',
        };
      case 'jakarta':
      default:
        return {
          gradient: 'from-rose-400 to-[#ff9898]',
          text: 'text-[#ff9898]',
          bgLight: 'bg-rose-50',
          border: 'border-rose-200',
          badge: 'bg-[#ff9898] text-white',
        };
    }
  }, [activeCity]);

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
        dark: '#111827', // Crisp dark zinc
        light: '#ffffff', // Pure white background
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('Error generating QR code:', err);
      });
  }, [perk, isRedeemed]);

  // Countdown timer for active voucher
  useEffect(() => {
    if (!isRedeemed) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRedeemed]);

  if (!perk) return null;

  const formatTimer = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSlideConfirm = () => {
    setIsRedeemed(true);
    triggerConfetti();
    if (onRedeemSuccess) {
      onRedeemSuccess(perk.id);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 flex flex-col items-center text-center relative overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-1.5 text-left">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold font-outfit uppercase tracking-wider ${theme.badge}`}
            >
              {perk.discount}
            </span>
            <span className="text-[11px] font-mono text-gray-400">
              {perk.validUntil}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isRedeemed ? (
          /* =================================================================
             1. UNREDEEMED STATE: VOUCHER DETAILS & SLIDE TO REDEEM
             ================================================================= */
          <div className="w-full flex flex-col items-center pt-4">
            {/* Voucher Icon */}
            <div
              className={`w-14 h-14 rounded-2xl ${theme.bgLight} ${theme.text} flex items-center justify-center mb-3 shadow-xs`}
            >
              <QrCode className="w-7 h-7" />
            </div>

            {/* Merchant & Title */}
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">
              {perk.merchant}
            </span>
            <h3 className="text-base font-extrabold font-outfit text-gray-900 mt-1 leading-snug">
              {perk.title}
            </h3>

            <p className="text-xs text-gray-500 mt-2 leading-relaxed px-2">
              {perk.description}
            </p>

            {/* In-store advisory card */}
            <div className="my-4 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-left flex items-start gap-2.5 w-full">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-[11px] text-amber-900/90 leading-tight">
                <strong className="font-semibold block mb-0.5">Ready at Cashier Counter?</strong>
                Slide the bar below when you are in front of the merchant to generate your single-use QR Code.
              </div>
            </div>

            {/* Interactive Slide-to-Redeem Bar */}
            <div className="w-full mt-2 mb-1">
              <SlideToRedeem
                onConfirm={handleSlideConfirm}
                label="Slide to Redeem Voucher"
                confirmedLabel="Voucher Activated!"
                accentGradient={theme.gradient}
                accentText={theme.text}
              />
            </div>
          </div>
        ) : (
          /* =================================================================
             2. REDEEMED STATE: LIVE QR CODE FOR MERCHANT SCANNER
             ================================================================= */
          <div className="w-full flex flex-col items-center pt-3 animate-in fade-in zoom-in-95 duration-300">
            {/* Live Active Status Banner with Ticking Clock */}
            <div className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 mb-3.5">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-extrabold uppercase font-mono tracking-wide text-emerald-700">
                  Active · Ready to Scan
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10.5px] font-mono font-bold text-emerald-800">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>{formatTimer(secondsRemaining)}</span>
              </div>
            </div>

            {/* Merchant Name & Applied Discount */}
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">
              {perk.merchant}
            </span>
            <h4 className="text-sm font-bold font-outfit text-gray-900 mt-0.5">
              {perk.discount} Applied to Bill
            </h4>

            {/* QR Code Presentation Box with Laser Scanner Beam */}
            <div className="my-3 p-3.5 bg-white rounded-2xl border-2 border-dashed border-gray-300 shadow-sm relative overflow-hidden flex flex-col items-center justify-center">
              {qrDataUrl ? (
                <div className="relative">
                  <img
                    src={qrDataUrl}
                    alt={`Voucher QR for ${perk.title}`}
                    className="w-48 h-48 rounded-lg object-contain"
                  />
                  {/* Glowing Laser Scan Line Animation */}
                  <div className="absolute left-1 right-1 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-qr-scan pointer-events-none" />
                </div>
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-gray-400 text-xs font-mono">
                  Generating QR...
                </div>
              )}

              {/* Merchant Instruction Banner */}
              <div className="mt-2 pt-2 border-t border-gray-100 w-full text-center">
                <span className="text-[10px] text-gray-500 font-medium block">
                  Point merchant optical scanner at QR code
                </span>
              </div>
            </div>

            {/* Manual Alphanumeric Voucher Code Fallback */}
            <div className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-between mb-3">
              <div className="text-left">
                <span className="text-[9px] uppercase font-mono text-gray-400 block">
                  Voucher Code (Manual Entry)
                </span>
                <span className="font-mono font-extrabold text-sm tracking-widest text-gray-900">
                  {perk.code}
                </span>
              </div>
              <button
                onClick={() => handleCopyCode(perk.code)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-2xs transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
                <span className={copied ? 'text-emerald-600' : ''}>
                  {copied ? 'Copied' : 'Copy'}
                </span>
              </button>
            </div>

            {/* Done / Close Button */}
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-gray-900 text-white font-outfit font-bold text-xs hover:bg-black transition-colors cursor-pointer shadow-xs"
            >
              Merchant Scanned / Done
            </button>

            {/* Re-lock Voucher Option */}
            <button
              onClick={() => setIsRedeemed(false)}
              className="mt-2 text-[10px] text-gray-400 hover:text-gray-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to slider (Re-lock voucher)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { ShieldAlert, ArrowRight, Lock } from 'lucide-react';

interface SessionWarningModalProps {
  countdown: number;
  onExtend: () => void;
  onLockNow: () => void;
}

export default function SessionWarningModal({ countdown, onExtend, onLockNow }: SessionWarningModalProps) {
  // Listen for Enter / Space to quickly extend session
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onExtend();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExtend]);

  const RADIUS = 44;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~276.46
  const TOTAL_SECONDS = 60;
  const progress = Math.min(1, Math.max(0, countdown / TOTAL_SECONDS));
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-warning-title"
    >
      <div className="bg-white/95 backdrop-blur-2xl rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-white/80 ring-1 ring-stone-900/5 flex flex-col items-center text-center gap-4 relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Ambient Warm Oslo Glow */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#ff9898]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header Alert Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 text-[10px] font-mono font-bold uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>Inactivity Timeout Warning</span>
        </div>

        {/* Circular Countdown Ring */}
        <div className="relative my-1">
          <svg width="104" height="104" viewBox="0 0 104 104" className="mx-auto drop-shadow-xs">
            {/* Background Track */}
            <circle cx="52" cy="52" r={RADIUS} fill="none" stroke="#f5f5f4" strokeWidth="7" />
            {/* Animated Progress Ring */}
            <circle
              cx="52"
              cy="52"
              r={RADIUS}
              fill="none"
              stroke="#d85d5d"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 52 52)"
              className="transition-[stroke-dashoffset] duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-mono font-extrabold text-stone-900 leading-none">
              {countdown}
            </span>
            <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest mt-0.5">
              seconds
            </span>
          </div>
        </div>

        {/* Title and Leisure Context Copy */}
        <div className="space-y-1">
          <h2 id="session-warning-title" className="text-lg font-extrabold font-outfit text-stone-900 tracking-tight">
            Still Exploring Oslo?
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed max-w-[270px] mx-auto">
            Your session is pausing to protect your redeemed merchant vouchers and digital passport ledger.
          </p>
        </div>

        {/* Actions */}
        <div className="w-full space-y-2 pt-1">
          <button
            type="button"
            onClick={onExtend}
            className="w-full py-3 px-4 rounded-2xl bg-[#d85d5d] hover:bg-[#c64f4f] text-white font-outfit font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
          >
            <span>Keep Exploring</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onLockNow}
            className="w-full py-2 text-xs font-semibold font-outfit text-stone-500 hover:text-stone-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Session Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

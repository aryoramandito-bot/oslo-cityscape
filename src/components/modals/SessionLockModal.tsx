import { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Lock, Fingerprint, LogOut, Coins, MapPin, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface SessionLockModalProps {
  sessionStartedAt: Date;
  onUnlock: () => void;
  onSignOut: () => void;
}

export default function SessionLockModal({ sessionStartedAt, onUnlock, onSignOut }: SessionLockModalProps) {
  const { currentAccount, userProfile, loyaltyPoints, checkins } = useAppContext();

  const sessionDurationText = useMemo(() => {
    const elapsedMinutes = Math.max(1, Math.round((Date.now() - sessionStartedAt.getTime()) / (1000 * 60)));
    if (elapsedMinutes < 60) {
      return `${elapsedMinutes}m`;
    }
    const hours = Math.floor(elapsedMinutes / 60);
    const mins = elapsedMinutes % 60;
    return `${hours}h ${mins}m`;
  }, [sessionStartedAt]);

  const initials = currentAccount?.profile?.name
    ? currentAccount.profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
    : 'AW';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-2xl animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-lock-title"
    >
      <div className="bg-white/95 backdrop-blur-2xl rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-white/80 ring-1 ring-stone-900/5 flex flex-col gap-4 relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Subtle Ambient Light Leak */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#ff9898]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Lock Pill Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700">
              Session Locked · Inactive
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-mono text-stone-400">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>Vault Protected</span>
          </div>
        </div>

        {/* Explorer Identity Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#fff1f1]/70 via-white to-white border border-[#fecaca] shadow-xs relative z-10 space-y-3">
          <div className="flex items-center gap-3">
            {/* Avatar Bubble */}
            <div className="relative">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${
                  currentAccount?.profile?.avatarColor || 'from-[#d85d5d] to-[#c64f4f]'
                } text-white flex items-center justify-center font-outfit font-extrabold text-base shadow-2xs`}
              >
                {initials}
              </div>
              {(currentAccount?.profile?.isVerified ?? userProfile.isVerified) && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 id="session-lock-title" className="text-sm font-extrabold font-outfit text-stone-900 truncate">
                  {currentAccount?.profile?.name || userProfile.name}
                </h3>
                <span className="text-[9px] font-mono font-bold bg-[#d85d5d] text-white px-1.5 py-0.5 rounded-full">
                  VERIFIED
                </span>
              </div>
              <span className="text-[10px] font-mono text-stone-500 block truncate mt-0.5">
                {currentAccount?.profile?.region || userProfile.region}
              </span>
            </div>
          </div>

          {/* Protected Stats Strip */}
          <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-stone-100/80 text-center">
            <div className="p-2 rounded-xl bg-white/80 border border-stone-200/60 shadow-2xs">
              <span className="text-[9px] font-mono text-stone-400 uppercase block leading-none">
                Duration
              </span>
              <span className="text-xs font-mono font-bold text-stone-800 flex items-center justify-center gap-0.5 mt-0.5">
                <Clock className="w-3 h-3 text-stone-400" />
                {sessionDurationText}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-white/80 border border-stone-200/60 shadow-2xs">
              <span className="text-[9px] font-mono text-stone-400 uppercase block leading-none">
                Stamps
              </span>
              <span className="text-xs font-mono font-bold text-[#d85d5d] flex items-center justify-center gap-0.5 mt-0.5">
                <MapPin className="w-3 h-3 text-[#d85d5d]" />
                {checkins.length}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-white/80 border border-stone-200/60 shadow-2xs">
              <span className="text-[9px] font-mono text-stone-400 uppercase block leading-none">
                Balance
              </span>
              <span className="text-xs font-mono font-bold text-amber-600 flex items-center justify-center gap-0.5 mt-0.5">
                <Coins className="w-3 h-3 text-amber-500" />
                {loyaltyPoints}
              </span>
            </div>
          </div>
        </div>

        {/* Informative Security Callout */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200/60 text-[11px] text-stone-600 relative z-10">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="leading-tight">
            Background state & active discoveries are preserved. Re-authenticate to resume.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1 relative z-10">
          <button
            type="button"
            onClick={onUnlock}
            className="w-full py-3 px-4 rounded-2xl bg-[#d85d5d] hover:bg-[#c64f4f] text-white font-outfit font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
          >
            <Fingerprint className="w-4 h-4" />
            <span>Resume Journey</span>
          </button>

          <button
            type="button"
            onClick={onSignOut}
            className="w-full py-2 text-xs font-semibold font-outfit text-stone-500 hover:text-stone-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign In with Another Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useAppContext } from '../../context/AppContext';
import {
  X,
  Sparkles,
  LogOut,
  Coins,
  MapPin,
  ShieldCheck,
  Mail,
  User,
  Clock,
  Compass,
} from 'lucide-react';
import { useSession, TimeoutPreset } from '../../hooks/useSessionManager';

interface AccountSwitcherModalProps {
  onReplayTour?: () => void;
}

export default function AccountSwitcherModal({ onReplayTour }: AccountSwitcherModalProps) {
  const {
    isAccountSwitcherOpen,
    setIsAccountSwitcherOpen,
    isLogoutModalOpen,
    setIsLogoutModalOpen,
    currentAccount,
    loyaltyPoints,
    checkins,
    setIsLoginPageOpen,
    loginAsGuest,
  } = useAppContext();
  const { timeoutPreset, setTimeoutPreset, triggerDemoWarning } = useSession();

  const isOpen = isAccountSwitcherOpen || isLogoutModalOpen;
  if (!isOpen) return null;

  const handleClose = () => {
    setIsAccountSwitcherOpen(false);
    setIsLogoutModalOpen(false);
  };

  const initials = currentAccount?.profile?.name
    ? currentAccount.profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
    : 'AW';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-stone-900/50 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="bg-white/95 backdrop-blur-2xl rounded-3xl max-w-sm w-full p-5 sm:p-6 shadow-2xl border border-white/80 ring-1 ring-stone-900/5 flex flex-col gap-4 animate-in zoom-in-95 duration-200 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Light Leak */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#ff9898]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-700">
              Active Explorer Profile
            </span>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
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
              {currentAccount?.profile?.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-sm font-extrabold font-outfit text-stone-900 truncate">
                  {currentAccount?.profile?.name || 'Astrid Widayani'}
                </h3>
                <span className="text-[9px] font-mono font-bold bg-[#d85d5d] text-white px-1.5 py-0.5 rounded-full">
                  VERIFIED
                </span>
              </div>
              <span className="text-[10px] font-mono text-stone-500 block truncate mt-0.5">
                {currentAccount?.profile?.region || 'Surakarta / Jawa Tengah'}
              </span>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-100/80">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-stone-200/60 shadow-2xs">
              <Coins className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <span className="text-[9px] font-mono text-stone-400 uppercase block leading-none">
                  Passport Pts
                </span>
                <span className="text-xs font-mono font-bold text-stone-900">
                  {loyaltyPoints} pts
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-stone-200/60 shadow-2xs">
              <MapPin className="w-4 h-4 text-[#d85d5d] shrink-0" />
              <div>
                <span className="text-[9px] font-mono text-stone-400 uppercase block leading-none">
                  Stamps Collected
                </span>
                <span className="text-xs font-mono font-bold text-stone-900">
                  {checkins.length} Sites
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information List */}
        <div className="p-3 rounded-2xl bg-stone-50/80 border border-stone-200/60 space-y-2 text-xs relative z-10">
          <div className="flex items-center justify-between text-stone-600">
            <span className="flex items-center gap-1.5 text-[11px] text-stone-400 font-mono">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              Email
            </span>
            <span className="font-mono text-[11px] font-semibold text-stone-800 truncate max-w-[190px]">
              {currentAccount?.email || 'astrid.widayani@voyage.id'}
            </span>
          </div>

          <div className="flex items-center justify-between text-stone-600 border-t border-stone-200/40 pt-1.5">
            <span className="flex items-center gap-1.5 text-[11px] text-stone-400 font-mono">
              <User className="w-3.5 h-3.5 text-stone-400" />
              Role
            </span>
            <span className="font-outfit font-semibold text-stone-800">
              {currentAccount?.role || 'Heritage Custodian'}
            </span>
          </div>

          <div className="flex items-center justify-between text-stone-600 border-t border-stone-200/40 pt-1.5">
            <span className="flex items-center gap-1.5 text-[11px] text-stone-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Data Privacy
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
              PDP Law Protected
            </span>
          </div>
        </div>

        {/* Session Security & Inactivity Timeout Controls */}
        <div className="p-3.5 rounded-2xl bg-stone-50/90 border border-stone-200/70 space-y-2.5 relative z-10">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] font-bold font-mono text-stone-700 uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-[#d85d5d]" />
              Inactivity Timeout
            </span>
            <span className="text-[10px] font-mono text-stone-400">
              Auto-Lock
            </span>
          </div>

          {/* Preset Pills */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-stone-200/50 rounded-xl">
            {(
              [
                { id: '2m', label: '2 min' },
                { id: '15m', label: '15 min' },
                { id: '30m', label: '30 min' },
                { id: 'never', label: 'Never' },
              ] as const
            ).map((preset) => {
              const isSelected = timeoutPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setTimeoutPreset(preset.id as TimeoutPreset)}
                  className={`py-1.5 rounded-lg text-[10px] font-outfit font-bold transition-all cursor-pointer text-center ${
                    isSelected
                      ? 'bg-[#d85d5d] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 bg-transparent'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Quick Demo Trigger for Stakeholders */}
          <div className="flex items-center justify-between pt-1 border-t border-stone-200/40 text-[10px]">
            <span className="text-stone-400 font-mono">
              Evaluator Test:
            </span>
            <button
              type="button"
              onClick={() => {
                handleClose();
                triggerDemoWarning();
              }}
              className="font-outfit font-bold text-[#d85d5d] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>⚡ Test Warning (10s Demo)</span>
            </button>
          </div>
        </div>

        {/* Action Buttons: Sign In with Another Account | Guest Mode */}
        <div className="space-y-2 pt-1 border-t border-stone-100 relative z-10">
          <button
            onClick={() => {
              handleClose();
              setIsLoginPageOpen(true);
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-black text-white font-outfit font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign In to Another Account</span>
          </button>

          <div className="flex flex-col items-center justify-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => {
                loginAsGuest();
                handleClose();
              }}
              className="text-xs text-stone-500 hover:text-stone-800 font-medium cursor-pointer"
            >
              Continue in Guest Mode →
            </button>

            {onReplayTour && (
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  onReplayTour();
                }}
                className="text-xs text-[#d85d5d] hover:text-[#c64f4f] font-semibold cursor-pointer flex items-center gap-1.5 pt-1 border-t border-stone-100/80 w-full justify-center"
              >
                <Compass className="w-3.5 h-3.5 text-[#d85d5d]" />
                <span>Replay Feature Tour</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

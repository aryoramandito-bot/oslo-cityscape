import React from 'react';
import { useAppContext } from '../../context/AppContext';
import {
  LogOut,
  ShieldCheck,
  Sparkles,
  X,
  RotateCw,
  Coins,
  MapPin,
  Compass
} from 'lucide-react';

export default function LogoutModal() {
  const {
    isLogoutModalOpen,
    setIsLogoutModalOpen,
    userProfile,
    loyaltyPoints,
    checkins,
    logout,
  } = useAppContext();

  if (!isLogoutModalOpen) return null;

  const initials = userProfile.name
    ? userProfile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
    : 'AW';

  const handleConfirmLogout = () => {
    logout();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsLogoutModalOpen(false)}
    >
      {/* Translucent Liquid Glass Modal Container */}
      <div 
        className="bg-white/85 backdrop-blur-2xl rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-white/85 ring-1 ring-stone-900/5 flex flex-col gap-4 animate-in zoom-in-95 duration-200 relative overflow-hidden"
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
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">
              Active Explorer Session
            </span>
          </div>

          <button
            onClick={() => setIsLogoutModalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100/80 hover:bg-stone-200/80 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Identity Card: Liquid Glass Frosted Surface (NO PITCH BLACK) */}
        <div className="p-4.5 rounded-2xl bg-gradient-to-br from-white/95 via-[#fff1f1]/40 to-white/95 border border-stone-200/80 shadow-[0_8px_24px_rgba(28,25,23,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] backdrop-blur-xl relative z-10 space-y-3">
          <div className="flex items-center gap-3">
            {/* Avatar Bubble */}
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d85d5d] to-[#c64f4f] text-white flex items-center justify-center font-outfit font-extrabold text-base shadow-2xs">
                {initials}
              </div>
              {userProfile.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-extrabold font-outfit text-stone-900 truncate">
                  {userProfile.name}
                </h3>
                <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md border border-emerald-200/80">
                  VERIFIED
                </span>
              </div>
              <span className="text-[10px] font-mono text-stone-400 block truncate mt-0.5">
                ID: {userProfile.providerUid.slice(0, 18)}...
              </span>
            </div>
          </div>

          {/* Demographic Pills with Clean Liquid Glass */}
          <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-stone-100 text-[10px] font-mono">
            <span className="px-2.5 py-0.5 rounded-lg bg-white/90 border border-stone-200/70 text-stone-600 font-medium flex items-center gap-1 shadow-2xs">
              <MapPin className="w-2.5 h-2.5 text-[#d85d5d]" />
              {userProfile.region}
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-white/90 border border-stone-200/70 text-stone-600 font-medium flex items-center gap-1 shadow-2xs">
              <Compass className="w-2.5 h-2.5 text-emerald-600" />
              {userProfile.nationality}
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-white/90 border border-stone-200/70 text-stone-600 font-medium shadow-2xs">
              {userProfile.gender} · {userProfile.age}
            </span>
          </div>
        </div>

        {/* Live Explorer Telemetry Stats (Liquid Glass Cards) */}
        <div className="grid grid-cols-2 gap-2.5 relative z-10">
          <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-stone-200/70 shadow-2xs">
            <span className="text-[9px] uppercase tracking-wider text-stone-400 font-mono font-bold block">
              Loyalty Points
            </span>
            <span className="text-base font-extrabold font-outfit text-stone-900 mt-0.5 flex items-center gap-1 tabular-nums">
              <Coins className="w-3.5 h-3.5 text-[#d85d5d]" />
              <span>{loyaltyPoints.toLocaleString()}</span>
              <span className="text-[10px] text-[#d85d5d] font-mono">pts</span>
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-stone-200/70 shadow-2xs">
            <span className="text-[9px] uppercase tracking-wider text-stone-400 font-mono font-bold block">
              Collected Stamps
            </span>
            <span className="text-base font-extrabold font-outfit text-stone-900 mt-0.5 flex items-center gap-1 tabular-nums">
              <span>{checkins.length}</span>
              <span className="text-[10px] text-emerald-600 font-mono">Visas</span>
            </span>
          </div>
        </div>

        {/* Security & PDP Compliance Notice */}
        <div className="flex items-start gap-2 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-[11px] text-emerald-900 leading-snug relative z-10">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            PDP Law Protected telemetry. Signing out clears credentials from this device and immediately reopens the Login Screen.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1 relative z-10">
          {/* Primary Logout Button */}
          <button
            type="button"
            onClick={handleConfirmLogout}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#d85d5d] to-[#c64f4f] hover:from-[#c64f4f] hover:to-[#b94444] text-white font-outfit font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_8px_20px_rgba(216,93,93,0.3)] active:scale-[0.98]"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Oslo Cityscape</span>
          </button>

          {/* Switch Account (Liquid Glass Pill) */}
          <button
            type="button"
            onClick={handleConfirmLogout}
            className="w-full py-2.5 px-4 rounded-2xl bg-white/70 hover:bg-white text-stone-700 font-outfit font-semibold text-xs border border-stone-200/80 shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
          >
            <RotateCw className="w-3.5 h-3.5 text-stone-500" />
            <span>Switch Explorer Profile</span>
          </button>

          {/* Stay Signed In */}
          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(false)}
            className="w-full py-2 text-center text-xs text-stone-400 hover:text-stone-600 font-medium cursor-pointer transition-colors"
          >
            Stay Signed In
          </button>
        </div>
      </div>
    </div>
  );
}

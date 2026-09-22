import React from 'react';
import { useAppContext } from '../../context/AppContext';
import {
  LogOut,
  ShieldCheck,
  Sparkles,
  X,
  RotateCw,
  Award,
  CheckCircle2,
  MapPin,
  Check
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Background Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-rose-100/60 rounded-full blur-2xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600">
              Active Explorer Session
            </span>
          </div>

          <button
            onClick={() => setIsLogoutModalOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Identity Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white shadow-md relative z-10 space-y-3">
          <div className="flex items-center gap-3">
            {/* Avatar Initials Bubble */}
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-[#ff9898] text-white flex items-center justify-center font-outfit font-extrabold text-base shadow-sm">
                {initials}
              </div>
              {userProfile.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-gray-900 flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-extrabold font-outfit text-white truncate">
                  {userProfile.name}
                </h3>
                <span className="text-[8.5px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded-md border border-emerald-500/30">
                  VERIFIED
                </span>
              </div>
              <span className="text-[10px] font-mono text-gray-400 block truncate mt-0.5">
                ID: {userProfile.providerUid}
              </span>
            </div>
          </div>

          {/* Demographic Pills */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-white/10 text-[10px]">
            <span className="px-2 py-0.5 rounded-lg bg-white/10 text-gray-300 font-medium">
              📍 {userProfile.region}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-white/10 text-gray-300 font-medium">
              🇮🇩 {userProfile.nationality}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-white/10 text-gray-300 font-medium">
              {userProfile.gender} · {userProfile.age}
            </span>
          </div>
        </div>

        {/* Live Explorer Telemetry Stats */}
        <div className="grid grid-cols-2 gap-2.5 relative z-10">
          <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/80">
            <span className="text-[9px] uppercase tracking-wider text-gray-400 font-mono font-bold block">
              Loyalty Points
            </span>
            <span className="text-base font-extrabold font-outfit text-gray-900 mt-0.5 block">
              {loyaltyPoints.toLocaleString()} <span className="text-xs text-[#ff9898]">pts</span>
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/80">
            <span className="text-[9px] uppercase tracking-wider text-gray-400 font-mono font-bold block">
              Collected Stamps
            </span>
            <span className="text-base font-extrabold font-outfit text-gray-900 mt-0.5 block">
              {checkins.length} <span className="text-xs text-emerald-600">Sites</span>
            </span>
          </div>
        </div>

        {/* Security & PDP Compliance Notice */}
        <div className="flex items-start gap-2 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-[11px] text-emerald-800 leading-snug relative z-10">
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
            className="w-full py-3.5 px-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-outfit font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm active:scale-[0.98]"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out of Cityscape</span>
          </button>

          {/* Switch Account */}
          <button
            type="button"
            onClick={handleConfirmLogout}
            className="w-full py-2.5 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-outfit font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5 text-gray-500" />
            <span>Switch Explorer Profile</span>
          </button>

          {/* Stay Signed In */}
          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(false)}
            className="w-full py-2 text-center text-xs text-gray-400 hover:text-gray-600 font-medium cursor-pointer transition-colors"
          >
            Stay Signed In
          </button>
        </div>
      </div>
    </div>
  );
}

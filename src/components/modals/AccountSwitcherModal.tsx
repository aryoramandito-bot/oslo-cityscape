import React from 'react';
import { useAppContext } from '../../context/AppContext';
import {
  X,
  Sparkles,
  LogOut,
  UserPlus,
  Coins,
  MapPin,
  CheckCircle2,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export default function AccountSwitcherModal() {
  const {
    isAccountSwitcherOpen,
    setIsAccountSwitcherOpen,
    isLogoutModalOpen,
    setIsLogoutModalOpen,
    currentAccount,
    registeredAccounts,
    switchUser,
    loyaltyPoints,
    checkins,
    setIsLoginPageOpen,
    loginAsGuest,
  } = useAppContext();

  // If either account switcher or legacy logout modal is open, we render this enhanced hub
  const isOpen = isAccountSwitcherOpen || isLogoutModalOpen;
  if (!isOpen) return null;

  const handleClose = () => {
    setIsAccountSwitcherOpen(false);
    setIsLogoutModalOpen(false);
  };

  const handleAddAccount = () => {
    handleClose();
    setIsLoginPageOpen(true);
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
              Explorer Identity & Accounts
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

        {/* Active Account Card */}
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
                  {currentAccount?.profile?.name || 'Explorer'}
                </h3>
                <span className="text-[9px] font-mono font-bold bg-[#d85d5d] text-white px-1.5 py-0.5 rounded-full">
                  ACTIVE
                </span>
              </div>
              <span className="text-[10px] font-mono text-stone-500 block truncate mt-0.5">
                {currentAccount?.profile?.region || 'Nusantara Explorer'}
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

        {/* Other Accounts on this device */}
        <div className="space-y-2 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
              Switch Account on Device
            </span>
            <button
              onClick={handleAddAccount}
              className="text-[10px] font-mono font-bold text-[#d85d5d] hover:underline cursor-pointer flex items-center gap-0.5"
            >
              <UserPlus className="w-3 h-3" />
              <span>Add Account</span>
            </button>
          </div>

          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-0.5">
            {registeredAccounts
              .filter((a) => a.id !== currentAccount?.id)
              .map((account) => {
                const accInitials = account.profile.name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2);

                return (
                  <div
                    key={account.id}
                    onClick={() => {
                      switchUser(account.id);
                      handleClose();
                    }}
                    className="p-2.5 rounded-xl border border-stone-200/70 hover:border-stone-300 bg-white/70 hover:bg-white flex items-center justify-between gap-2 transition-all cursor-pointer group shadow-2xs active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl bg-gradient-to-br ${
                          account.profile.avatarColor || 'from-[#d85d5d] to-[#c64f4f]'
                        } text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-2xs`}
                      >
                        {accInitials}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold font-outfit text-stone-800 block truncate group-hover:text-[#d85d5d] transition-colors">
                          {account.profile.name}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400 block truncate">
                          {account.profile.region.split('/')[0]}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 text-stone-400 group-hover:text-stone-700">
                      <span className="text-[10px] font-mono text-stone-500 font-semibold">Switch</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Action Buttons: Add Account | Guest | Sign Out */}
        <div className="space-y-2 pt-2 border-t border-stone-100 relative z-10">
          <button
            onClick={handleAddAccount}
            className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-black text-white font-outfit font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <UserPlus className="w-4 h-4" />
            <span>Sign In to Another Account</span>
          </button>

          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={() => {
                loginAsGuest();
                handleClose();
              }}
              className="text-xs text-stone-500 hover:text-stone-800 font-medium cursor-pointer"
            >
              Guest Mode
            </button>

            <button
              onClick={() => {
                handleClose();
                setIsLoginPageOpen(true);
              }}
              className="text-xs font-bold text-[#d85d5d] hover:underline cursor-pointer flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Switch / Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

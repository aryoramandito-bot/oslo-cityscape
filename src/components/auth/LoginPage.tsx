import { useState } from 'react';
import type React from 'react';
import { useAppContext } from '../../context/AppContext';
import { UserAccount } from '../../types';
import {
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
  User,
  MapPin,
  X,
  Coins,
} from 'lucide-react';

interface LoginPageProps {
  onClose?: () => void;
  initialMode?: 'login' | 'register';
}

export default function LoginPage({ onClose, initialMode = 'login' }: LoginPageProps) {
  const {
    switchUser,
    registerUser,
    loginWithEmail,
    loginAsGuest,
    setIsLoginPageOpen,
  } = useAppContext();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialMode);

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register Form State
  const [regStep, setRegStep] = useState<1 | 2>(1);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regNationality, setRegNationality] = useState('Indonesian (WNI)');
  const [regRegion, setRegRegion] = useState('Surakarta / Jawa Tengah');
  const [regAge, setRegAge] = useState('35-49');
  const [regGender, setRegGender] = useState('Female');
  const [regAvatarColor, setRegAvatarColor] = useState('from-[#d85d5d] to-[#c64f4f]');
  const [regPdpConsent, setRegPdpConsent] = useState(true);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setLoginError('Please enter your email or identifier.');
      return;
    }
    setIsSubmitting(true);
    setLoginError(null);

    try {
      await loginWithEmail(loginEmail.trim(), loginPassword);
      if (onClose) onClose();
      setIsLoginPageOpen(false);
    } catch {
      setLoginError('Unable to authenticate. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;

    const newAccount: UserAccount = {
      id: 'usr_' + Date.now(),
      email: regEmail.trim(),
      profile: {
        providerUid: 'usr_' + Date.now(),
        name: regName.trim(),
        nationality: regNationality,
        region: regRegion,
        age: regAge,
        gender: regGender,
        isVerified: true,
        email: regEmail.trim(),
        avatarColor: regAvatarColor,
        bio: `Explorer based in ${regRegion}. Passport activated on Oslo Cityscape.`,
      },
      role: 'Verified Explorer',
      createdAt: new Date().toISOString(),
      lastActiveAt: 'Just now',
      isGuest: false,
    };

    registerUser(newAccount, {
      loyaltyPoints: 500,
      activeCity: regRegion.toLowerCase().includes('bandung')
        ? 'bandung'
        : regRegion.toLowerCase().includes('solo') || regRegion.toLowerCase().includes('surakarta')
        ? 'solo'
        : regRegion.toLowerCase().includes('laweyan')
        ? 'laweyan'
        : 'jakarta',
    });

    if (onClose) onClose();
    setIsLoginPageOpen(false);
  };

  const AVATAR_PALETTES = [
    { label: 'Oslo Rose', class: 'from-[#d85d5d] to-[#c64f4f]' },
    { label: 'Bandung Indigo', class: 'from-[#4f46e5] to-[#3730a3]' },
    { label: 'Emerald Forest', class: 'from-[#059669] to-[#047857]' },
    { label: 'Golden Amber', class: 'from-[#d97706] to-[#b45309]' },
    { label: 'Charcoal Linen', class: 'from-[#44403c] to-[#292524]' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-3.5 sm:p-6 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-[32px] p-6 sm:p-7 shadow-2xl border border-white/80 ring-1 ring-stone-900/5 relative overflow-hidden flex flex-col gap-5 my-auto">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-[#ff9898]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Navigation & Close */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#fff1f1] border border-[#fecaca] text-[#d85d5d] flex items-center justify-center shadow-2xs font-extrabold text-sm font-outfit">
              O
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#d85d5d] block leading-none">
                Oslo Cityscape
              </span>
              <span className="text-xs font-extrabold font-outfit text-stone-900">
                Explorer Access Portal
              </span>
            </div>
          </div>

          {onClose && (
            <button
              onClick={() => {
                onClose();
                setIsLoginPageOpen(false);
              }}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2-Segment Tab Navigation: Sign In | Create Account */}
        <div className="p-1 rounded-2xl bg-stone-100/90 border border-stone-200/70 flex items-center gap-1 select-none relative z-10">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 text-xs font-outfit font-bold rounded-xl transition-all cursor-pointer text-center ${
              activeTab === 'login'
                ? 'bg-white text-stone-900 shadow-xs border border-white'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 text-xs font-outfit font-bold rounded-xl transition-all cursor-pointer text-center ${
              activeTab === 'register'
                ? 'bg-white text-stone-900 shadow-xs border border-white'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: SIGN IN (WITH 1-TAP ASTRID QUICK ACCESS) */}
        {/* ========================================================================= */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* 1-Tap Quick Access: Continue as Astrid Widayani (Device Owner) */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#fff1f1] to-white border border-[#fecaca] shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d85d5d] to-[#c64f4f] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-2xs relative">
                  AW
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs">
                    <Sparkles className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div className="min-w-0 text-left">
                  <span className="text-xs font-bold font-outfit text-stone-900 block truncate">
                    Astrid Widayani
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 block truncate">
                    Surakarta / Solo · Heritage Custodian
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  switchUser('usr_astrid');
                  if (onClose) onClose();
                  setIsLoginPageOpen(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-[#d85d5d] hover:bg-[#c64f4f] text-white text-xs font-outfit font-bold transition-all shadow-xs cursor-pointer active:scale-95 shrink-0 flex items-center gap-1"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2 my-1">
              <div className="flex-1 h-px bg-stone-100" />
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">or sign in with email</span>
              <div className="flex-1 h-px bg-stone-100" />
            </div>

            {loginError && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium leading-snug">
                {loginError}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                Explorer Email or ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="explorer@voyage.id"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#d85d5d] focus:ring-1 focus:ring-[#d85d5d]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('For presentation demo, any valid password is accepted!')}
                  className="text-[10px] font-mono text-[#d85d5d] hover:underline cursor-pointer"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#d85d5d] focus:ring-1 focus:ring-[#d85d5d]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Primary Sign In Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#d85d5d] to-[#c64f4f] hover:from-[#c64f4f] hover:to-[#b94444] text-white font-outfit font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span>Connecting Passport...</span>
              ) : (
                <>
                  <span>Sign In to Oslo Passport</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Social Auth Simulation */}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block text-center">
                Or Continue With Identity Provider
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    switchUser('usr_astrid');
                    if (onClose) onClose();
                    setIsLoginPageOpen(false);
                  }}
                  className="py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 flex items-center justify-center gap-2 text-xs font-semibold text-stone-700 transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    switchUser('usr_astrid');
                    if (onClose) onClose();
                    setIsLoginPageOpen(false);
                  }}
                  className="py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 flex items-center justify-center gap-2 text-xs font-semibold text-stone-700 transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-stone-900" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.42c.67-.82 1.12-1.96.99-3.1-.96.04-2.13.64-2.82 1.45-.61.71-1.14 1.87-1 2.99 1.07.08 2.16-.52 2.83-1.34z" />
                  </svg>
                  <span>Apple ID</span>
                </button>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  loginAsGuest();
                  if (onClose) onClose();
                }}
                className="text-xs text-stone-500 hover:text-stone-800 font-medium cursor-pointer"
              >
                Just exploring? Continue as Guest Explorer →
              </button>
            </div>
          </form>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CREATE NEW EXPLORER ACCOUNT */}
        {/* ========================================================================= */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold font-outfit text-stone-900">
                  Register as Nusantara Explorer
                </h3>
                <span className="text-[10px] font-mono text-[#d85d5d] font-bold">
                  Step {regStep} of 2
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Join our verified travel passport network with +500 Welcome Points.
              </p>
            </div>

            {regStep === 1 && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                    Full Explorer Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Raden Arya Pratama"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#d85d5d] focus:ring-1 focus:ring-[#d85d5d]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="arya@voyage.id"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#d85d5d] focus:ring-1 focus:ring-[#d85d5d]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#d85d5d] focus:ring-1 focus:ring-[#d85d5d]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (regName.trim() && regEmail.trim()) {
                      setRegStep(2);
                    } else {
                      alert('Please provide your name and email first.');
                    }
                  }}
                  className="w-full py-3 rounded-2xl bg-stone-900 hover:bg-black text-white font-outfit font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span>Next: Cultural Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {regStep === 2 && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                      Nationality
                    </label>
                    <select
                      value={regNationality}
                      onChange={(e) => setRegNationality(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800"
                    >
                      <option value="Indonesian (WNI)">Indonesian (WNI)</option>
                      <option value="International (WNA)">International (WNA)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                      Home Base
                    </label>
                    <select
                      value={regRegion}
                      onChange={(e) => setRegRegion(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800"
                    >
                      <option value="Surakarta / Jawa Tengah">Solo (Surakarta)</option>
                      <option value="Bandung / Jawa Barat">Bandung</option>
                      <option value="Jakarta Capital Region">Jakarta</option>
                      <option value="DI Yogyakarta">Yogyakarta</option>
                      <option value="Bali & Nusa Tenggara">Bali</option>
                      <option value="International">Overseas</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                    Avatar Theme Color
                  </label>
                  <div className="flex items-center gap-2">
                    {AVATAR_PALETTES.map((pal) => (
                      <button
                        key={pal.label}
                        type="button"
                        onClick={() => setRegAvatarColor(pal.class)}
                        className={`w-7 h-7 rounded-xl bg-gradient-to-br ${pal.class} border-2 transition-transform cursor-pointer ${
                          regAvatarColor === pal.class ? 'scale-110 border-stone-900 shadow-xs' : 'border-transparent opacity-70'
                        }`}
                        title={pal.label}
                      />
                    ))}
                  </div>
                </div>

                {/* Welcome Bonus Notice */}
                <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center gap-2.5">
                  <Coins className="w-5 h-5 text-amber-600 shrink-0" />
                  <div className="text-[11px] text-amber-900 leading-tight">
                    <strong>+500 Welcome Points</strong> will be credited to your new personal ledger!
                  </div>
                </div>

                {/* PDP Consent Checkbox */}
                <label className="flex items-start gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={regPdpConsent}
                    onChange={(e) => setRegPdpConsent(e.target.checked)}
                    className="mt-0.5 rounded text-[#d85d5d] focus:ring-[#d85d5d]"
                  />
                  <span className="text-[10px] text-stone-500 leading-snug">
                    I agree to the PDP Law (No. 27/2022) processing of my cultural check-in passport and activity stamps.
                  </span>
                </label>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setRegStep(1)}
                    className="px-3 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!regPdpConsent}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#d85d5d] to-[#c64f4f] hover:from-[#c64f4f] hover:to-[#b94444] text-white font-outfit font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Activate My Passport</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

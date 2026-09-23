import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useConfetti } from '../../hooks/useConfetti';
import { TravelArchetype } from '../../types';
import { ShieldCheck, Sparkles, Check, ArrowRight, ArrowLeft, Compass, Award } from 'lucide-react';

interface OnboardingModalProps {
  onComplete: () => void;
  onLaunchTour?: () => void;
}

interface ArchetypeCard {
  id: TravelArchetype;
  icon: string;
  title: string;
  desc: string;
}

const ARCHETYPES: ArchetypeCard[] = [
  {
    id: 'heritage',
    icon: '🏛️',
    title: 'Heritage Custodian',
    desc: 'Kasunanan, Mangkunegaran & classical royal bastions',
  },
  {
    id: 'culinary',
    icon: '🍜',
    title: 'Culinary Connoisseur',
    desc: 'Timlo Sastro, Selat Solo & legendary street eats',
  },
  {
    id: 'photowalker',
    icon: '📸',
    title: 'Slow Photowalker',
    desc: 'Gang Senggol, Kampoeng Laweyan & scenic vantage points',
  },
  {
    id: 'craft',
    icon: '🎨',
    title: 'Batik & Craft Patron',
    desc: 'Canting workshops, Danar Hadi & master textile guilds',
  },
];

export default function OnboardingModal({ onComplete, onLaunchTour }: OnboardingModalProps) {
  const { setUserProfile, rewardPoints } = useAppContext();
  const { triggerCelebration } = useConfetti();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State initialized to Astrid Widayani
  const [name, setName] = useState('Astrid Widayani');
  const [nationality, setNationality] = useState('Indonesian (WNI)');
  const [region, setRegion] = useState('Surakarta / Jawa Tengah');
  const [age, setAge] = useState('35-49');
  const [gender, setGender] = useState('Female');
  const [selectedArchetype, setSelectedArchetype] = useState<TravelArchetype>('heritage');

  // Trigger celebration confetti when landing on Step 4
  useEffect(() => {
    if (step === 4) {
      triggerCelebration();
    }
  }, [step, triggerCelebration]);

  const handleFinish = (withTour: boolean = false) => {
    setUserProfile({
      providerUid: 'voyage_explorer_882910',
      name: name.trim() || 'Astrid Widayani',
      nationality,
      region,
      age,
      gender,
      isVerified: true,
    });

    localStorage.setItem('oslo_onboarding_completed', 'true');
    localStorage.setItem('oslo_travel_archetype', selectedArchetype);

    // Award welcome grant
    rewardPoints(500, 'Welcome Explorer Grant', '🏅');

    onComplete();
    if (withTour && onLaunchTour) {
      onLaunchTour();
    }
  };

  const selectedArchetypeData = ARCHETYPES.find((a) => a.id === selectedArchetype) || ARCHETYPES[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-stone-900/60 backdrop-blur-md animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 sm:p-6 shadow-2xl border border-stone-200/80 flex flex-col justify-between min-h-[500px] relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#ff9898]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Step Indicator Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-3 relative z-10">
          <div className="flex items-center gap-1.5">
            {step > 1 && step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                className="w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors mr-1 cursor-pointer"
                title="Go back"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="w-2 h-2 rounded-full bg-[#d85d5d]" />
            )}
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
              {step === 1 && 'Explorer Identity · Step 1 of 4'}
              {step === 2 && 'Travel Persona · Step 2 of 4'}
              {step === 3 && 'Privacy & Consent · Step 3 of 4'}
              {step === 4 && 'Passport Activated · Step 4 of 4'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-3.5 h-1.5 rounded-full transition-colors ${
                  s <= step ? 'bg-[#d85d5d]' : 'bg-stone-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Welcome & Quick Login */}
        {step === 1 && (
          <div className="flex-1 flex flex-col justify-between relative z-10">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#fff1f1] border border-[#fecaca] text-[#d85d5d] flex items-center justify-center mb-2.5 shadow-2xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-extrabold text-stone-900 font-outfit tracking-tight">
                Welcome to Oslo Cityscape
              </h2>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Connect your personal explorer profile to unlock cultural discovery passports, exclusive
                merchant perks, and verified check-in stamps.
              </p>

              <div className="mt-4 space-y-2.5">
                {/* 1-Tap Quick Access for Astrid Widayani */}
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 px-3.5 rounded-2xl bg-stone-900 hover:bg-black text-white flex items-center justify-between transition-all cursor-pointer text-xs font-bold font-outfit shadow-sm border border-stone-800 group active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#d85d5d] to-[#c64f4f] text-white flex items-center justify-center font-extrabold text-[11px] shrink-0">
                      AW
                    </div>
                    <div className="text-left min-w-0">
                      <span className="block text-white leading-tight font-extrabold truncate">
                        Continue as Astrid Widayani
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono font-normal block truncate">
                        Surakarta / Jawa Tengah · Verified
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1" />
                </button>

                <div className="flex items-center gap-2 my-1">
                  <div className="flex-1 h-px bg-stone-100" />
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">or sign in with</span>
                  <div className="flex-1 h-px bg-stone-100" />
                </div>

                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-2.5 px-3.5 rounded-2xl border border-stone-200 flex items-center justify-between hover:bg-stone-50 transition-colors cursor-pointer text-xs font-semibold text-stone-700 font-outfit shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </button>

                {/* Apple ID */}
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-2.5 px-3.5 rounded-2xl border border-stone-200 flex items-center justify-between hover:bg-stone-50 transition-colors cursor-pointer text-xs font-semibold text-stone-700 font-outfit shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 fill-current text-stone-900" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.42c.67-.82 1.12-1.96.99-3.1-.96.04-2.13.64-2.82 1.45-.61.71-1.14 1.87-1 2.99 1.07.08 2.16-.52 2.83-1.34z"/>
                    </svg>
                    <span>Continue with Apple ID</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="mt-3 text-center text-xs text-stone-500 hover:text-stone-800 font-semibold cursor-pointer py-1"
            >
              Set Up Custom Profile →
            </button>
          </div>
        )}

        {/* STEP 2: Travel Persona Archetype (NEW) */}
        {step === 2 && (
          <div className="flex-1 flex flex-col justify-between relative z-10">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-2.5 shadow-2xs">
                <Compass className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-extrabold text-stone-900 font-outfit tracking-tight">
                Select Your Travel Passion
              </h2>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Choose your primary explorer persona to tailor curated wayfinding and merchant recommendations.
              </p>

              {/* 2x2 Grid of Archetypes */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {ARCHETYPES.map((arch) => {
                  const isSelected = selectedArchetype === arch.id;
                  return (
                    <button
                      key={arch.id}
                      type="button"
                      onClick={() => setSelectedArchetype(arch.id)}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between min-h-[96px] ${
                        isSelected
                          ? 'border-[#d85d5d] bg-[#fff1f1]/50 ring-2 ring-[#d85d5d]/20 shadow-xs'
                          : 'border-stone-200/80 bg-stone-50/50 hover:bg-stone-50 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-2xl">{arch.icon}</span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-[#d85d5d] text-white flex items-center justify-center text-[10px]">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold font-outfit text-stone-900 block leading-tight">
                          {arch.title}
                        </span>
                        <span className="text-[9px] text-stone-500 font-sans block line-clamp-2 mt-0.5 leading-snug">
                          {arch.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full py-3.5 rounded-2xl bg-[#d85d5d] text-white font-outfit font-bold text-xs hover:bg-[#c64f4f] transition-colors cursor-pointer shadow-xs active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Continue to Privacy Consent</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PDP Law & Profile Demographics */}
        {step === 3 && (
          <div className="flex-1 flex flex-col justify-between relative z-10">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 shadow-2xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-extrabold text-stone-900 font-outfit tracking-tight">
                Data Privacy & Profile
              </h2>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Adhering to Indonesia’s Personal Data Protection (PDP Law). Your telemetry is anonymized and stored locally.
              </p>

              <div className="mt-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-200/80 text-[11px] text-stone-600 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Anonymized demographic wayfinding</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Encrypted digital passport vault storage</span>
                </div>
              </div>

              {/* Quick Profile Confirmation */}
              <div className="mt-3 space-y-2">
                <div>
                  <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block font-mono">
                    Explorer Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-0.5 p-2 rounded-xl border border-stone-200 text-xs text-stone-900 font-medium focus:outline-hidden focus:border-[#d85d5d]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block font-mono">
                      Region
                    </label>
                    <input
                      type="text"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full mt-0.5 p-2 rounded-xl border border-stone-200 text-xs text-stone-900 font-medium focus:outline-hidden focus:border-[#d85d5d]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block font-mono">
                      Nationality
                    </label>
                    <select
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full mt-0.5 p-2 rounded-xl border border-stone-200 text-xs text-stone-900 font-medium bg-white focus:outline-hidden focus:border-[#d85d5d]"
                    >
                      <option>Indonesian (WNI)</option>
                      <option>International (WNA)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-full py-3.5 rounded-2xl bg-[#d85d5d] text-white font-outfit font-bold text-xs hover:bg-[#c64f4f] transition-colors cursor-pointer shadow-xs active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Agree & Activate Passport</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Celebration & Welcome Bonus (NEW) */}
        {step === 4 && (
          <div className="flex-1 flex flex-col justify-between text-center relative z-10">
            <div className="py-2">
              {/* Celebration Emblem */}
              <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-[#fff1f1] to-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center mx-auto mb-3 shadow-sm animate-bounce">
                <Award className="w-7 h-7 text-amber-500" />
              </div>

              <h2 className="text-2xl font-extrabold text-stone-900 font-outfit tracking-tight">
                Passport Activated!
              </h2>

              <p className="text-xs text-stone-500 mt-1 max-w-[260px] mx-auto leading-relaxed">
                Welcome to Nusantara. Your personal travel passport is ready for exploration.
              </p>

              {/* Reward Grant Box */}
              <div className="my-4 p-4 rounded-2xl bg-gradient-to-br from-[#fff1f1] via-white to-amber-50/60 border border-[#fecaca] shadow-xs space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-mono font-bold text-xs">
                  <span>🏅 +500 PTS Welcome Grant</span>
                </div>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="text-xl">{selectedArchetypeData.icon}</span>
                  <div className="text-left">
                    <span className="text-[11px] font-mono font-bold text-stone-400 uppercase block leading-none">
                      Active Archetype
                    </span>
                    <span className="text-xs font-extrabold font-outfit text-stone-900">
                      {selectedArchetypeData.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-2">
              <button
                type="button"
                onClick={() => handleFinish(false)}
                className="w-full py-3.5 rounded-2xl bg-[#d85d5d] text-white font-outfit font-bold text-xs hover:bg-[#c64f4f] transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
              >
                Start Exploring Oslo →
              </button>

              {onLaunchTour && (
                <button
                  type="button"
                  onClick={() => handleFinish(true)}
                  className="w-full py-2 text-xs font-semibold text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                >
                  Take a 30-Second Feature Tour →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

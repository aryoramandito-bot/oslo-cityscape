import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ShieldCheck, Sparkles, Check, ArrowRight } from 'lucide-react';

interface OnboardingModalProps {
  onComplete: () => void;
}

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const { setUserProfile } = useAppContext();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [name, setName] = useState('Aryo Ramandito');
  const [nationality, setNationality] = useState('Indonesian (WNI)');
  const [region, setRegion] = useState('DKI Jakarta');
  const [age, setAge] = useState('25-34');
  const [gender, setGender] = useState('Male');

  const handleFinish = () => {
    setUserProfile({
      providerUid: 'voyage_sub_' + Math.floor(100000 + Math.random() * 900000),
      name: name || 'Explorer',
      nationality,
      region,
      age,
      gender,
      isVerified: true,
    });
    localStorage.setItem('oslo_onboarding_completed', 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 flex flex-col justify-between min-h-[440px]">
        {/* Step Indicator */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff9898]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">
              Triple-Check Gating · Step {step} of 3
            </span>
          </div>

          <div className="flex items-center gap-1">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-4 h-1.5 rounded-full transition-colors ${
                  s <= step ? 'bg-[#ff9898]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Authentication Simulation */}
        {step === 1 && (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#ff9898] flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-extrabold text-gray-900 font-outfit">
                Welcome to Oslo Cityscape
              </h2>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Connect your explorer profile to unlock cultural discovery passports, exclusive
                merchant perks, and verified check-in stamps.
              </p>

              <div className="mt-5 space-y-2.5">
                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3 px-4 rounded-2xl border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer text-xs font-semibold text-gray-700 font-outfit shadow-2xs"
                >
                  <span>Continue with Google</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3 px-4 rounded-2xl border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer text-xs font-semibold text-gray-700 font-outfit shadow-2xs"
                >
                  <span>Continue with Apple ID</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="mt-4 text-center text-[11px] text-gray-400 hover:text-gray-600 font-medium cursor-pointer"
            >
              Continue as Guest Explorer
            </button>
          </div>
        )}

        {/* Step 2: PDP Law & Privacy Consent */}
        {step === 2 && (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-extrabold text-gray-900 font-outfit">
                Data Privacy & Consent
              </h2>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Adhering to Indonesia’s Personal Data Protection (PDP Law). Your telemetry and
                explorer data are anonymized and never shared with unverified parties.
              </p>

              <div className="mt-4 p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80 text-[11px] text-gray-600 space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Anonymized demographic wayfinding</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Zero PII exposure to AI models</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Encrypted digital passport vault storage</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full py-3.5 rounded-2xl bg-gray-900 text-white font-outfit font-bold text-xs hover:bg-black transition-colors cursor-pointer mt-4"
            >
              I Agree & Continue
            </button>
          </div>
        )}

        {/* Step 3: Demographics Setup */}
        {step === 3 && (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 font-outfit">
                Explorer Profile
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Tailors concierge wayfinding & cultural perks to you.
              </p>

              <div className="mt-3.5 space-y-2.5">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block font-mono">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 font-medium focus:outline-hidden focus:border-[#ff9898]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block font-mono">
                      Nationality
                    </label>
                    <select
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full mt-1 p-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 font-medium focus:outline-hidden focus:border-[#ff9898] bg-white"
                    >
                      <option>Indonesian (WNI)</option>
                      <option>International (WNA)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block font-mono">
                      Age Bracket
                    </label>
                    <select
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full mt-1 p-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 font-medium focus:outline-hidden focus:border-[#ff9898] bg-white"
                    >
                      <option>18-24</option>
                      <option>25-34</option>
                      <option>35-49</option>
                      <option>50+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block font-mono">
                    Home Base Region
                  </label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 font-medium focus:outline-hidden focus:border-[#ff9898]"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-2xl bg-gray-900 text-white font-outfit font-bold text-xs hover:bg-black transition-colors cursor-pointer mt-4"
            >
              Enter Oslo Cityscape →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

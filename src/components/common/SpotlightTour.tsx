import { useState } from 'react';
import { Compass, Radio, Wallet, Ticket, ArrowRight, X, Sparkles } from 'lucide-react';

interface SpotlightTourProps {
  isOpen: boolean;
  onComplete: () => void;
}

interface TourStepItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: typeof Compass;
  targetHint: string;
}

const TOUR_STEPS: TourStepItem[] = [
  {
    id: 'chapter',
    title: 'Chapter Discovery',
    description: 'Tap the Chapter Seal in the top-left to switch between Surakarta, Laweyan, Bandung, and Jakarta chapters.',
    badge: 'Step 1 of 4 · Wayfinding',
    icon: Compass,
    targetHint: 'Top-Left Header Pill',
  },
  {
    id: 'radar',
    title: 'Proximity Radar Beacon',
    description: 'The pulsing beacon opens a real-time GPS radar scanning nearby cultural heritage sites and culinary landmarks.',
    badge: 'Step 2 of 4 · Live Scan',
    icon: Radio,
    targetHint: 'Top-Right Header Radar',
  },
  {
    id: 'vault',
    title: 'Digital Passport Vault',
    description: 'Inspect your stamped visas, loyalty tiers, earned explorer badges, and cryptographic check-in ledger.',
    badge: 'Step 3 of 4 · Identity',
    icon: Wallet,
    targetHint: 'Bottom Navigation · Vault',
  },
  {
    id: 'perks',
    title: 'Artisan Merchant Perks',
    description: 'Unlock exclusive offline discounts from verified local craftspeople and heritage restaurants. Slide to redeem.',
    badge: 'Step 4 of 4 · Rewards',
    icon: Ticket,
    targetHint: 'Bottom Navigation · Perks',
  },
];

export default function SpotlightTour({ isOpen, onComplete }: SpotlightTourProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];
  const isLast = currentStepIndex === TOUR_STEPS.length - 1;
  const StepIcon = currentStep.icon;

  const handleNext = () => {
    if (isLast) {
      localStorage.setItem('oslo_tour_completed', 'true');
      onComplete();
      setCurrentStepIndex(0);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('oslo_tour_completed', 'true');
    onComplete();
    setCurrentStepIndex(0);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-step-title"
    >
      <div className="bg-white/95 backdrop-blur-2xl rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-white/80 ring-1 ring-stone-900/5 flex flex-col gap-4 relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#ff9898]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3 relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#d85d5d]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
              {currentStep.badge}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            title="Skip Tour"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tour Feature Presentation Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#fff1f1]/60 via-white to-white border border-[#fecaca] shadow-xs relative z-10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#fff1f1] border border-[#fecaca] text-[#d85d5d] flex items-center justify-center font-outfit shadow-2xs shrink-0">
              <StepIcon className="w-6 h-6" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono text-[#d85d5d] font-bold uppercase block leading-none">
                📍 {currentStep.targetHint}
              </span>
              <h3 id="tour-step-title" className="text-base font-extrabold font-outfit text-stone-900 tracking-tight mt-0.5">
                {currentStep.title}
              </h3>
            </div>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed font-sans pt-1">
            {currentStep.description}
          </p>
        </div>

        {/* Progress Dots & Actions */}
        <div className="flex items-center justify-between pt-1 relative z-10">
          {/* 4 Progress Dots */}
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  idx === currentStepIndex
                    ? 'w-5 bg-[#d85d5d]'
                    : 'w-1.5 bg-stone-200'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSkip}
              className="text-xs font-semibold text-stone-400 hover:text-stone-700 transition-colors cursor-pointer px-2 py-1"
            >
              Skip
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="py-2.5 px-4 rounded-xl bg-[#d85d5d] hover:bg-[#c64f4f] text-white font-outfit font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <span>{isLast ? 'Start Exploring' : 'Next'}</span>
              {isLast ? <Sparkles className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, QrCode, ShieldCheck, UserCircle, ChevronRight, Check } from 'lucide-react';
import { cn } from '../lib/utils';

type OnboardingProps = {
  onComplete: () => void;
};

const INDONESIA_LOCATIONS: Record<string, string[]> = {
  'DKI Jakarta': ['Central Jakarta', 'North Jakarta', 'West Jakarta', 'South Jakarta', 'East Jakarta'],
  'Jawa Barat': ['Bandung', 'Bekasi', 'Bogor', 'Depok'],
  'Jawa Tengah': ['Semarang', 'Surakarta', 'Magelang'],
  'Jawa Timur': ['Surabaya', 'Malang', 'Sidoarjo'],
  'Bali': ['Denpasar', 'Badung', 'Gianyar'],
};

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [isSimulatingLink, setIsSimulatingLink] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    province: '',
    city: '',
    nationality: 'Indonesian'
  });

  const handleNext = () => setStep(s => s + 1);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center h-full text-center px-6"
          >
            <div className="flex flex-col items-center justify-center mb-10 mt-4">
              <div className="flex flex-row items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full border-[1.5px] border-white p-[3px] flex items-center justify-center">
                  <div className="w-full h-full rounded-full border-[1.5px] border-white/60"></div>
                </div>
                <div className="text-white uppercase flex flex-col items-start">
                  <span className="font-light opacity-100 mb-0.5 text-2xl tracking-normal">OSLO</span>
                  <span className="font-bold opacity-90 text-[10px] tracking-[0.2em]">TOURISM INFRASTRUCTURE</span>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-light tracking-tighter text-white mb-2">Welcome to OSLO.</h1>
            <p className="text-[#ff9898] text-[10px] font-bold uppercase tracking-widest mb-12">Authenticate to begin</p>
            
            <button 
              onClick={handleNext}
              className="w-full bg-white text-black py-4 font-bold rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors text-[11px]"
            >
              <UserCircle className="w-4 h-4" />
              Continue with Google
            </button>
            <button 
              onClick={handleNext}
              className="w-full bg-white border border-gray-200/80 text-white rounded-lg py-4 mt-3 font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors text-[11px]"
            >
               Continue with Apple
            </button>
            <button 
              onClick={handleNext}
              className="w-full bg-white border border-emerald-900/30 text-[#ff9898] rounded-lg py-4 mt-3 font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-emerald-950/20 transition-colors text-[11px]"
            >
               Login with WhatsApp
            </button>
          </motion.div>
        );
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col h-full px-6 py-12"
          >
            <ShieldCheck className="w-12 h-12 text-[#ff9898] mb-6" />
            <h2 className="text-2xl font-light tracking-tighter text-white mb-4">Data Privacy</h2>
            <div className="flex-1 overflow-y-auto mb-6 text-sm text-gray-400 space-y-4">
              <p>To provide a highly personalized and secure Voyage experience, we require your consent to process certain demographic and interaction data.</p>
              <p>Your data is protected under PDP regulations and stored in an encrypted demographic lake separated from your personal identifiers.</p>
              <p>We use this data strictly for event admission, NFT distribution, and security verification.</p>
            </div>
            <button 
              onClick={handleNext}
              className="w-full bg-white text-black text-[11px] font-bold rounded-lg py-4 uppercase tracking-wider hover:bg-gray-200 transition-colors"
            >
              I Accept & Continue
            </button>
          </motion.div>
        );
      case 2:
        return (
           <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col h-full px-6 py-12 items-center"
          >
            <div className="text-center mb-8 w-full">
              <h2 className="text-2xl font-light tracking-tighter text-white mb-2">Ticket Pairing</h2>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Scan your OTA ticket QR code</p>
            </div>
            
            <div className="flex-1 w-full flex flex-col items-center justify-center -mt-12">
              <div className="w-64 h-64 border-2 border-dashed border-gray-200/80 rounded-3xl relative flex items-center justify-center bg-[#f9f8f6] overflow-hidden">
                {!isSimulatingLink ? (
                  <>
                    <Camera className="w-12 h-12 text-gray-600 mb-4" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#222] to-transparent animate-pulse opacity-50" />
                  </>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center text-[#ff9898]"
                  >
                    <div className="w-16 h-16 bg-[#ff9898]/10 border border-[#ff9898]/30 rounded-full flex items-center justify-center mb-4">
                      <Check className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-[11px] uppercase tracking-wider">Verified</span>
                  </motion.div>
                )}
              </div>
              
              {!isSimulatingLink ? (
                <button 
                  onClick={() => {
                    setIsSimulatingLink(true);
                    setTimeout(() => {
                      handleNext();
                    }, 1500);
                  }}
                  className="mt-12 w-full bg-white text-black text-[11px] font-bold rounded-lg py-4 uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  Simulate QR Scan
                </button>
              ) : null}
            </div>
          </motion.div>
        );
      case 3:
        const isFormValid = Object.values(formData).every(v => typeof v === 'string' && v.trim() !== '');
        return (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col h-full px-6 py-12"
          >
            <h2 className="text-2xl font-light tracking-tighter text-white mb-2">Demographics</h2>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-8">Final step to unlock</p>
            
            <div className="space-y-4 flex-1">
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-2">Age Range</label>
                <select 
                  className="w-full bg-white text-white border border-gray-200/50 rounded-lg px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#7c3aed] appearance-none"
                  value={formData.age}
                  onChange={e => setFormData({...formData, age: e.target.value})}
                >
                  <option value="" disabled>Select age...</option>
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45+">45+</option>
                </select>
              </div>
               <div>
                <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-2">Gender</label>
                <select 
                  className="w-full bg-white text-white border border-gray-200/50 rounded-lg px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#7c3aed] appearance-none"
                  value={formData.gender}
                  onChange={e => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="" disabled>Select gender...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
               <div>
                <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-2">Province</label>
                <select 
                  className="w-full bg-white text-white border border-gray-200/50 rounded-lg px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#7c3aed] appearance-none"
                  value={formData.province}
                  onChange={e => setFormData({...formData, province: e.target.value, city: ''})}
                >
                  <option value="" disabled>Select province...</option>
                  {Object.keys(INDONESIA_LOCATIONS).map(prov => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-2">City</label>
                <select 
                  className="w-full bg-white text-white border border-gray-200/50 rounded-lg px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#7c3aed] appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                  disabled={!formData.province}
                >
                  <option value="" disabled>Select city...</option>
                  {formData.province && INDONESIA_LOCATIONS[formData.province]?.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button 
              disabled={!isFormValid}
              onClick={() => {
                // Simulate final server validation
                onComplete();
              }}
              className={cn(
                "w-full rounded-lg py-4 text-[11px] font-bold uppercase tracking-wider flex items-center justify-center transition-all",
                isFormValid 
                  ? "bg-white text-black hover:bg-gray-200" 
                  : "bg-white text-gray-600 border border-gray-200/50 cursor-not-allowed"
              )}
            >
              Complete Entry
            </button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-[#0c0c0c] text-gray-200 relative">
      <AnimatePresence mode="wait">
        <motion.div key={step} className="h-full absolute inset-0">
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

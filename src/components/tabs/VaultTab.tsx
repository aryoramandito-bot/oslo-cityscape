import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ShieldCheck, Sparkles, Award, MapPin, CheckCircle2, RotateCw } from 'lucide-react';

export default function VaultTab() {
  const { userProfile, checkins, allLandmarks, activeCity } = useAppContext();
  const [isFlipped, setIsFlipped] = useState(false);

  const checkedLandmarks = allLandmarks.filter((item) => checkins.includes(item.id));
  const isJakarta = activeCity === 'jakarta';

  return (
    <div className="flex flex-col gap-4 pb-20 pt-1">
      {/* Section Headline */}
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ff9898] block">
            Digital Identity & Storage
          </span>
          <h2 className="text-base font-bold text-gray-900 font-outfit mt-0.5">
            Explorer Vault & Badges
          </h2>
        </div>
        <span className="text-[10px] font-mono text-gray-400 bg-white px-2 py-1 rounded-lg border border-gray-200/80">
          Tap card to flip
        </span>
      </div>

      {/* 3D Flip Explorer Passport Card */}
      <div
        className="w-full h-52 perspective-1000 cursor-pointer"
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <div
          className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Card Front */}
          <div className="absolute inset-0 backface-hidden rounded-3xl p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white shadow-xl flex flex-col justify-between border border-gray-800">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#ff9898]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>OSLO CITYSCAPE PASSPORT</span>
                </div>
                <h3 className="text-lg font-extrabold font-outfit mt-1 tracking-tight">
                  {userProfile.name}
                </h3>
                <span className="text-[10px] font-mono text-gray-400">
                  ID: {userProfile.providerUid}
                </span>
              </div>

              <div className="w-9 h-9 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-white/10 pt-3">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-mono">
                  Current Rank
                </span>
                <span className="text-xs font-bold font-outfit text-amber-400">
                  ⭐ Senior Heritage Explorer
                </span>
              </div>

              <div className="text-right">
                <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-mono">
                  Verified Check-ins
                </span>
                <span className="text-sm font-extrabold font-outfit text-white">
                  {checkins.length} Sites Stamped
                </span>
              </div>
            </div>
          </div>

          {/* Card Back (PDP Privacy & Demographics) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-5 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white shadow-xl flex flex-col justify-between border border-gray-800">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  PDP Law Compliant Data
                </span>
                <RotateCw className="w-3 h-3 text-gray-400" />
              </div>

              <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-[11px]">
                <div>
                  <span className="text-[9px] text-gray-400 block font-mono">NATIONALITY</span>
                  <span className="font-semibold text-white">{userProfile.nationality}</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 block font-mono">REGION</span>
                  <span className="font-semibold text-white">{userProfile.region}</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 block font-mono">AGE BRACKET</span>
                  <span className="font-semibold text-white">{userProfile.age}</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 block font-mono">VERIFICATION</span>
                  <span className="font-semibold text-emerald-400">Verified Explorer</span>
                </div>
              </div>
            </div>

            <div className="text-[9px] font-mono text-gray-400 border-t border-white/10 pt-2 text-center">
              Tap anywhere to return to passport cover
            </div>
          </div>
        </div>
      </div>

      {/* Stamped Sites Showcase */}
      <div className="mt-2">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold text-gray-900 font-outfit uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#ff9898]" />
            Collected Cultural Stamps ({checkedLandmarks.length})
          </h3>
        </div>

        {checkedLandmarks.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5">
            {checkedLandmarks.map((landmark) => (
              <div
                key={landmark.id}
                className="p-3 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex items-center gap-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 font-outfit truncate">
                    {landmark.name}
                  </h4>
                  <span className="text-[9.5px] text-gray-400 capitalize flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-[#ff9898]" />
                    {landmark.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 text-center">
            <p className="text-xs text-gray-500 font-medium">No cultural stamps collected yet.</p>
            <p className="text-[11px] text-gray-400 mt-1">
              Visit landmarks and check in to unlock collectible badges.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

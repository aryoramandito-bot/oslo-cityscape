import type React from 'react';
import { Landmark } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { Star, CheckCircle2, Clock, MapPin } from 'lucide-react';

interface LandmarkCardProps {
  key?: React.Key;
  landmark: Landmark;
}

export default function LandmarkCard({ landmark }: LandmarkCardProps) {
  const { checkins, reviews, setSelectedLandmark, getLandmarkDistance } = useAppContext();

  const isCheckedIn = checkins.includes(landmark.id);
  const distance = getLandmarkDistance(landmark);

  // Calculate live review rating or fallback
  const siteReviews = reviews[landmark.id] || [];
  const averageRating =
    siteReviews.length > 0
      ? (siteReviews.reduce((sum, r) => sum + r.rating, 0) / siteReviews.length).toFixed(1)
      : landmark.rating || '4.7';

  return (
    <div
      onClick={() => setSelectedLandmark(landmark)}
      className="group bg-white rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-stone-300 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full active:scale-[0.99]"
    >
      {/* Media Container with Directional Scrim */}
      <div className="relative aspect-[16/11] w-full bg-stone-100 overflow-hidden">
        <img
          src={landmark.image}
          alt={landmark.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.src = 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80';
          }}
        />

        {/* Ambient Bottom Scrim for Rating & Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent pointer-events-none" />

        {/* Top-Right: Collectible Verified Visa Stamp Badge */}
        {isCheckedIn && (
          <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-600 text-white flex items-center gap-1 shadow-xs border border-white/20">
            <CheckCircle2 className="w-3 h-3 text-emerald-200" />
            Stamped
          </span>
        )}

        {/* Bottom-Left: Glass Rating Tag */}
        <div className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-lg bg-white/90 backdrop-blur-md text-stone-900 flex items-center gap-1 text-[10px] font-bold shadow-xs">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span className="font-mono">{averageRating}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Metadata Row: Category & Distance */}
          <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono mb-1">
            <span className="font-bold uppercase tracking-wider text-[#d85d5d]">
              {landmark.category}
            </span>
            {distance && (
              <span className="flex items-center gap-0.5 text-stone-500 font-medium">
                <MapPin className="w-2.5 h-2.5 text-[#d85d5d]" />
                {distance}
              </span>
            )}
          </div>

          <h3 className="text-xs font-bold text-stone-900 font-outfit line-clamp-1 group-hover:text-[#d85d5d] transition-colors">
            {landmark.name}
          </h3>
          <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-relaxed">
            {landmark.description}
          </p>
        </div>

        {/* Bottom Bar: Operating Hours & Action */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
          <div className="flex items-center gap-1 line-clamp-1">
            <Clock className="w-3 h-3 shrink-0" />
            <span className="truncate">{landmark.hours.split('(')[0].trim()}</span>
          </div>
          <span className="font-bold shrink-0 font-outfit text-[#d85d5d] group-hover:translate-x-0.5 transition-transform">
            Details →
          </span>
        </div>
      </div>
    </div>
  );
}

import type React from 'react';
import { Landmark } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { Star, CheckCircle2, Clock } from 'lucide-react';

interface LandmarkCardProps {
  key?: React.Key;
  landmark: Landmark;
}

export default function LandmarkCard({ landmark }: LandmarkCardProps) {
  const { checkins, reviews, setSelectedLandmark, activeCity, getLandmarkDistance } = useAppContext();

  const isCheckedIn = checkins.includes(landmark.id);
  const isJakarta = activeCity === 'jakarta';
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
      className="group bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md hover:border-gray-300/90 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col h-full"
    >
      {/* Media Container */}
      <div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden">
        <img
          src={landmark.image}
          alt={landmark.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            // Fallback to placeholder if offline or missing
            const target = e.currentTarget;
            target.src = 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80';
          }}
        />

        {/* Category Pill */}
        <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-gray-700 shadow-xs">
          {landmark.category}
        </span>

        {/* Check-in Stamped Indicator */}
        {isCheckedIn && (
          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500 text-white flex items-center gap-1 shadow-xs">
            <CheckCircle2 className="w-3 h-3" />
            Visited
          </span>
        )}

        {/* Rating Floating Tag */}
        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white flex items-center gap-1 text-[10px] font-bold">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>{averageRating}</span>
        </div>

        {/* Distance Floating Tag */}
        {distance && (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white flex items-center gap-1 text-[9px] font-mono font-medium">
            <span>📍 {distance}</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xs font-bold text-gray-900 font-outfit line-clamp-1 group-hover:text-[#ff9898] transition-colors">
            {landmark.name}
          </h3>
          <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">
            {landmark.description}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
          <div className="flex items-center gap-1 line-clamp-1">
            <Clock className="w-3 h-3 shrink-0" />
            <span className="truncate">{landmark.hours.split('(')[0].trim()}</span>
          </div>
          <span
            className={`font-semibold shrink-0 font-outfit ${
              isJakarta ? 'text-[#ff9898]' : 'text-amber-500'
            }`}
          >
            Details →
          </span>
        </div>
      </div>
    </div>
  );
}

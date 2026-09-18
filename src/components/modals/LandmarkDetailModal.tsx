import { useState } from 'react';
import type React from 'react';
import { useAppContext } from '../../context/AppContext';
import { useConfetti } from '../../hooks/useConfetti';
import {
  X,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
  Share2,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export default function LandmarkDetailModal() {
  const { selectedLandmark, setSelectedLandmark, checkins, toggleCheckin, reviews, addReview } =
    useAppContext();
  const { triggerCelebration } = useConfetti();

  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  if (!selectedLandmark) return null;

  const isCheckedIn = checkins.includes(selectedLandmark.id);
  const landmarkReviews = reviews[selectedLandmark.id] || [];

  const handleCheckin = () => {
    if (!isCheckedIn) {
      triggerCelebration();
    }
    toggleCheckin(selectedLandmark.id);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    setIsSubmittingReview(true);
    addReview(selectedLandmark.id, ratingInput, commentInput.trim());
    setCommentInput('');
    setIsSubmittingReview(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white animate-in slide-in-from-bottom duration-300 max-w-md mx-auto overflow-hidden">
      {/* Hero Media Top Area */}
      <div className="relative h-64 w-full bg-gray-100 shrink-0">
        <img
          src={selectedLandmark.image}
          alt={selectedLandmark.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            target.src = 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* Top Control Icons */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <button
            onClick={() => setSelectedLandmark(null)}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: selectedLandmark.name,
                    text: selectedLandmark.description,
                    url: window.location.href,
                  });
                }
              }}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer shadow-md"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Hero Info */}
        <div className="absolute bottom-4 left-4 right-4 text-white z-10">
          <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 inline-block mb-1">
            {selectedLandmark.category}
          </span>
          <h2 className="text-xl font-extrabold font-outfit leading-tight drop-shadow-md">
            {selectedLandmark.name}
          </h2>
        </div>
      </div>

      {/* Scrollable Body Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Quick Details Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="font-medium text-[11px]">{selectedLandmark.hours}</span>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${selectedLandmark.lat},${selectedLandmark.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-bold text-[#ff9898] hover:underline"
          >
            <MapPin className="w-3 h-3" />
            <span>Map Coordinates</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Check-in CTA Button */}
        <button
          onClick={handleCheckin}
          className={`w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 font-outfit font-bold text-xs transition-all shadow-md cursor-pointer ${
            isCheckedIn
              ? 'bg-emerald-500 text-white hover:bg-emerald-600'
              : 'bg-gray-900 text-white hover:bg-black'
          }`}
        >
          {isCheckedIn ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Stamped in Passport · Visited</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Check In & Stamp Digital Passport</span>
            </>
          )}
        </button>

        {/* Overview & Description */}
        <div>
          <h3 className="text-xs font-bold font-outfit uppercase tracking-wider text-gray-400 mb-1.5">
            About Landmark
          </h3>
          <p className="text-xs text-gray-700 leading-relaxed font-medium">
            {selectedLandmark.description}
          </p>
        </div>

        {/* History & Cultural Significance */}
        {selectedLandmark.history && (
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
            <h3 className="text-xs font-bold font-outfit uppercase tracking-wider text-[#ff9898] mb-1.5">
              Cultural Lore & Heritage
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {selectedLandmark.history}
            </p>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {selectedLandmark.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-gray-100 text-[10px] font-mono font-medium text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Community Reviews & Star Ratings */}
        <div className="border-t border-gray-100 pt-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold font-outfit uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#ff9898]" />
              Explorer Reviews ({landmarkReviews.length})
            </h3>
          </div>

          {/* Add Review Form */}
          <form
            onSubmit={handleReviewSubmit}
            className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80 mb-4"
          >
            <span className="text-[11px] font-bold text-gray-700 font-outfit block mb-1">
              Rate your experience:
            </span>

            {/* Star Rating Picker */}
            <div className="flex items-center gap-1.5 mb-2.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRatingInput(star)}
                  className="cursor-pointer p-0.5"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= ratingInput
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a tip or cultural reflection for fellow explorers..."
              rows={2}
              className="w-full p-2.5 rounded-xl bg-white border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#ff9898] resize-none"
            />

            <button
              type="submit"
              disabled={!commentInput.trim() || isSubmittingReview}
              className="mt-2 w-full py-2 rounded-xl bg-gray-900 text-white font-outfit font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:bg-black transition-colors"
            >
              Post Review
            </button>
          </form>

          {/* Reviews List */}
          <div className="space-y-2.5">
            {landmarkReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-3 rounded-xl bg-white border border-gray-100 shadow-2xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-900 font-outfit">
                    {rev.author}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${
                          s <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">{rev.comment}</p>
                <span className="text-[9px] text-gray-400 mt-1 block">{rev.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

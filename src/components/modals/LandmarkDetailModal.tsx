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
  MessageSquare,
  Sparkles,
  Navigation,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';

export default function LandmarkDetailModal() {
  const {
    selectedLandmark,
    setSelectedLandmark,
    checkins,
    toggleCheckin,
    reviews,
    addReview,
    userLedger,
    setSelectedStatementSite,
    openMapToLandmark,
    getLandmarkDistance,
  } = useAppContext();
  const { triggerCelebration } = useConfetti();

  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);

  const handleOpenGoogleMapsDirections = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedLandmark) return;
    const { lat, lng } = selectedLandmark;
    // Standard Google Maps Directions URL - launches turn-by-turn navigation directly to coordinates
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyCoords = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedLandmark) return;
    const coords = `${selectedLandmark.lat}, ${selectedLandmark.lng}`;
    navigator.clipboard.writeText(coords);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  if (!selectedLandmark) return null;

  const isCheckedIn = checkins.includes(selectedLandmark.id);
  const landmarkReviews = reviews[selectedLandmark.id] || [];

  const siteTransactions = userLedger.filter((e) => e.spot === selectedLandmark.name);
  const sitePts = siteTransactions.reduce((sum, e) => sum + e.pts, 0);
  const isLoyal = sitePts >= 1000;
  const isCulinary = selectedLandmark.category === 'culinary';
  const discountPct = isCulinary ? 10 : 5;

  const handleCheckin = () => {
    toggleCheckin(selectedLandmark.id);
    if (!isCheckedIn) {
      triggerCelebration();
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    setIsSubmittingReview(true);
    setTimeout(() => {
      addReview(selectedLandmark.id, {
        author: 'Astrid Widayani',
        rating: ratingInput,
        date: 'Just now',
        comment: commentInput.trim(),
      });
      setCommentInput('');
      setIsSubmittingReview(false);
      triggerCelebration();
    }, 400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setSelectedLandmark(null)}
    >
      {/* Translucent Liquid Glass Modal Sheet */}
      <div
        className="w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/80 ring-1 ring-stone-900/5 flex flex-col max-h-[92vh] overflow-hidden animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Hero Image Banner */}
        <div className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden shrink-0">
          <img
            src={selectedLandmark.image}
            alt={selectedLandmark.name}
            className="w-full h-full object-cover"
          />

          {/* Directional Vignette Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-stone-900/40" />

          {/* Liquid Glass Action Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              onClick={() => setSelectedLandmark(null)}
              className="w-10 h-10 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-xl border border-white/40 text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenGoogleMapsDirections}
                title="Navigate via Google Maps"
                className="w-10 h-10 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-xl border border-white/40 text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95 group"
              >
                <Navigation className="w-4.5 h-4.5 fill-white/20 group-hover:scale-110 transition-transform" />
              </button>

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
                className="w-10 h-10 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-xl border border-white/40 text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                title="Share landmark"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Hero Info */}
          <div className="absolute bottom-4 left-4 right-4 text-white z-10">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/25 backdrop-blur-xl text-white border border-white/40 inline-block mb-1.5 shadow-2xs">
              {selectedLandmark.category}
            </span>
            <h2 className="text-xl font-extrabold font-outfit leading-tight drop-shadow-md">
              {selectedLandmark.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4.5 overscroll-contain">
          {/* Quick Details Bar (Liquid Glass Pill) */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-stone-200/70 shadow-2xs flex-wrap gap-2">
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <Clock className="w-3.5 h-3.5 text-[#d85d5d] shrink-0" />
              <span className="font-medium text-[11px]">{selectedLandmark.hours}</span>
            </div>

            <div className="flex items-center gap-2">
              {getLandmarkDistance(selectedLandmark) && (
                <span className="text-[10px] font-mono font-bold text-stone-700 bg-stone-100/90 px-2 py-0.5 rounded-md border border-stone-200/60">
                  📍 {getLandmarkDistance(selectedLandmark)}
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedLandmark(null);
                  openMapToLandmark(selectedLandmark);
                }}
                className="flex items-center gap-1 text-[11px] font-bold text-[#d85d5d] hover:underline cursor-pointer"
                title="Open in-app Real Map centered here"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Real Map</span>
              </button>
            </div>
          </div>

          {/* Direct Google Maps Direction CTA with Live Coordinates Callout */}
          <div className="rounded-2xl bg-gradient-to-r from-blue-50/70 via-white/80 to-blue-50/40 hover:from-blue-50/90 hover:to-white backdrop-blur-xl border border-blue-200/70 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all p-3.5 flex items-center justify-between gap-3 group">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={handleOpenGoogleMapsDirections}
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform cursor-pointer"
                title="Navigate via Google Maps"
              >
                <Navigation className="w-5 h-5 fill-white/20" />
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold font-outfit text-stone-900">
                    Direction
                  </span>
                  <span className="text-[9.5px] font-mono font-bold text-blue-700 bg-blue-100/70 px-1.5 py-0.5 rounded-md border border-blue-200/80">
                    Google Maps
                  </span>
                </div>

                {/* Direct Coordinate Callout & 1-Click Copy */}
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] font-mono font-semibold text-stone-600 bg-white/90 px-1.5 py-0.5 rounded border border-stone-200/70 truncate">
                    GPS: {selectedLandmark.lat.toFixed(5)}, {selectedLandmark.lng.toFixed(5)}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCoords}
                    className="text-[10px] font-mono font-semibold text-stone-500 hover:text-stone-800 flex items-center gap-0.5 cursor-pointer bg-stone-50 hover:bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200/60 transition-colors shrink-0"
                    title="Copy exact GPS coordinates"
                  >
                    {copiedCoords ? (
                      <>
                        <Check className="w-2.5 h-2.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-2.5 h-2.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick 1-Tap Navigate Button */}
            <button
              type="button"
              onClick={handleOpenGoogleMapsDirections}
              className="shrink-0 flex items-center gap-1.5 text-xs font-outfit font-bold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-2.5 rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <span>Navigate</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Check-in CTA Button: Oslo Rose Liquid Pill (NO PITCH BLACK) */}
          <button
            onClick={handleCheckin}
            className={`w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 font-outfit font-bold text-xs transition-all shadow-[0_8px_24px_rgba(216,93,93,0.3)] active:scale-[0.98] cursor-pointer ${
              isCheckedIn
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500'
                : 'bg-gradient-to-r from-[#d85d5d] to-[#c64f4f] hover:from-[#c64f4f] hover:to-[#b94444] text-white border border-[#d85d5d]'
            }`}
          >
            {isCheckedIn ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Stamped in Passport · Visited</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Check In & Stamp Digital Passport</span>
              </>
            )}
          </button>

          {/* Site Loyalty Score & Achievement Card (Liquid Glass) */}
          <div className="p-4.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-stone-200/80 shadow-[0_4px_20px_rgba(28,25,23,0.03),inset_0_1px_1px_rgba(255,255,255,0.95)] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-base">{isLoyal ? '👑' : '🏆'}</span>
                <span className="text-xs font-bold text-stone-900 font-outfit">Site Loyalty Balance</span>
              </div>
              <span className="text-xs font-mono font-extrabold text-[#d85d5d] tabular-nums">
                {sitePts.toLocaleString()} pts
              </span>
            </div>

            <div className="w-full bg-stone-200/70 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#d85d5d] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((sitePts / 1000) * 100))}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono pt-0.5">
              <span>
                {isLoyal
                  ? `🎉 ${discountPct}% VIP Discount Active`
                  : `${(1000 - sitePts).toLocaleString()} pts to Loyal Customer`}
              </span>
              <button
                onClick={() => setSelectedStatementSite(selectedLandmark.name)}
                className="text-[#d85d5d] font-bold hover:underline cursor-pointer flex items-center gap-0.5"
              >
                Statement →
              </button>
            </div>
          </div>

          {/* Overview & Description */}
          <div>
            <h3 className="text-xs font-bold font-outfit uppercase tracking-wider text-stone-400 mb-1.5">
              About Landmark
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              {selectedLandmark.description}
            </p>
          </div>

          {/* History & Cultural Significance in Oslo Rose Liquid Surface */}
          {selectedLandmark.history && (
            <div className="p-4 rounded-2xl bg-[#fff1f1]/60 backdrop-blur-md border border-[#fecaca]/80 shadow-2xs">
              <h3 className="text-xs font-bold font-outfit uppercase tracking-wider text-[#d85d5d] mb-1.5">
                Cultural Lore & Heritage
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed font-normal">
                {selectedLandmark.history}
              </p>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {selectedLandmark.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-stone-100 text-[10px] font-mono font-medium text-stone-600 border border-stone-200/60"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Community Reviews & Star Ratings */}
          <div className="border-t border-stone-100 pt-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold font-outfit uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#d85d5d]" />
                Explorer Reviews ({landmarkReviews.length})
              </h3>
            </div>

            {/* Add Review Form (Liquid Glass) */}
            <form
              onSubmit={handleReviewSubmit}
              className="p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-stone-200/80 mb-4 shadow-2xs space-y-2.5"
            >
              <span className="text-[11px] font-bold text-stone-800 font-outfit block">
                Rate your experience:
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatingInput(star)}
                    className="p-1 text-base cursor-pointer hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        star <= ratingInput
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Share your cultural review or culinary tips..."
                className="w-full p-2.5 rounded-xl border border-stone-200/80 bg-white/80 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-[#d85d5d] focus:ring-2 focus:ring-[#d85d5d]/15 resize-none h-18"
              />
              <button
                type="submit"
                disabled={isSubmittingReview || !commentInput.trim()}
                className="w-full py-2.5 rounded-xl bg-[#d85d5d] hover:bg-[#c64f4f] disabled:opacity-50 text-white font-outfit font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-[0.98]"
              >
                {isSubmittingReview ? 'Submitting...' : 'Post Verified Review'}
              </button>
            </form>

            {/* Reviews List */}
            <div className="space-y-2.5">
              {landmarkReviews.map((r) => (
                <div
                  key={r.id}
                  className="p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-stone-200/70 shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold font-outfit text-stone-900">{r.author}</span>
                    <span className="text-[10px] text-stone-400 font-mono">{r.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${
                          s <= r.rating ? 'text-amber-500 fill-amber-500' : 'text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

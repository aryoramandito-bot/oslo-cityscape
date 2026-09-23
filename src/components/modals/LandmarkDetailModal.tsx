import { useState, useEffect } from 'react';
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
  Image,
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
  const [isPhotoFaded, setIsPhotoFaded] = useState(false);

  // Smooth entrance transition: greeting photo fades out after 1.4s to reveal full content
  useEffect(() => {
    setIsPhotoFaded(false);
    if (!selectedLandmark) return;
    const timer = setTimeout(() => {
      setIsPhotoFaded(true);
    }, 1400);
    return () => clearTimeout(timer);
  }, [selectedLandmark]);

  const handleContentScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // If user starts scrolling, immediately fade out photo so content has full viewport
    if (e.currentTarget.scrollTop > 10 && !isPhotoFaded) {
      setIsPhotoFaded(true);
    }
  };

  const handleOpenGoogleMapsDirections = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedLandmark) return;
    const { lat, lng } = selectedLandmark;
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

  const handleShare = () => {
    if (!selectedLandmark) return;
    if (navigator.share) {
      navigator.share({
        title: selectedLandmark.name,
        text: selectedLandmark.description,
        url: window.location.href,
      });
    }
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
      addReview(selectedLandmark.id, ratingInput, commentInput.trim());
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
        className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/80 ring-1 ring-stone-900/5 flex flex-col max-h-[92vh] overflow-hidden animate-in slide-in-from-bottom duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar (Adapts smoothly from floating photo scrim to liquid glass bar) */}
        <div className={`z-20 flex items-center justify-between px-4 py-3 transition-all duration-500 shrink-0 ${
          isPhotoFaded
            ? 'bg-white/85 backdrop-blur-xl border-b border-stone-200/70 shadow-2xs'
            : 'absolute top-0 left-0 right-0 bg-gradient-to-b from-stone-900/70 via-stone-900/30 to-transparent'
        }`}>
          {/* Close button */}
          <button
            onClick={() => setSelectedLandmark(null)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 ${
              isPhotoFaded
                ? 'bg-stone-100 hover:bg-stone-200 border border-stone-200/80 text-stone-700'
                : 'bg-white/25 hover:bg-white/40 backdrop-blur-xl border border-white/40 text-white'
            }`}
            title="Close modal"
          >
            <X className="w-4.5 h-4.5" />
          </button>

          {/* Center Masthead (Smoothly fades in when photo fades out) */}
          <div className={`flex-1 mx-3 min-w-0 transition-all duration-500 ${
            isPhotoFaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
          }`}>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#d85d5d] block leading-none truncate">
              {selectedLandmark.category}
            </span>
            <h3 className="text-sm font-extrabold font-outfit text-stone-900 truncate leading-snug">
              {selectedLandmark.name}
            </h3>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Photo Toggle Button */}
            <button
              onClick={() => setIsPhotoFaded(!isPhotoFaded)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-outfit font-semibold transition-all cursor-pointer shadow-sm active:scale-95 ${
                isPhotoFaded
                  ? 'bg-stone-100 hover:bg-stone-200 border border-stone-200/80 text-stone-700'
                  : 'bg-white/25 hover:bg-white/40 backdrop-blur-xl border border-white/40 text-white'
              }`}
              title={isPhotoFaded ? "Show photo banner" : "Fade out photo"}
            >
              <Image className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono">{isPhotoFaded ? 'Photo' : 'Fade'}</span>
            </button>

            {/* Google Maps Navigate */}
            <button
              onClick={handleOpenGoogleMapsDirections}
              title="Navigate via Google Maps"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 group ${
                isPhotoFaded
                  ? 'bg-stone-100 hover:bg-stone-200 border border-stone-200/80 text-blue-600'
                  : 'bg-white/25 hover:bg-white/40 backdrop-blur-xl border border-white/40 text-white'
              }`}
            >
              <Navigation className="w-4 h-4 fill-current/20 group-hover:scale-110 transition-transform" />
            </button>

            {/* Native Share */}
            <button
              onClick={handleShare}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 ${
                isPhotoFaded
                  ? 'bg-stone-100 hover:bg-stone-200 border border-stone-200/80 text-stone-700'
                  : 'bg-white/25 hover:bg-white/40 backdrop-blur-xl border border-white/40 text-white'
              }`}
              title="Share landmark"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Smooth Collapsible Hero Image Banner */}
        <div 
          onClick={() => setIsPhotoFaded(true)}
          className={`relative w-full bg-stone-100 overflow-hidden shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isPhotoFaded
              ? 'max-h-0 opacity-0 pointer-events-none'
              : 'max-h-64 sm:max-h-72 aspect-[16/10] opacity-100 cursor-pointer'
          }`}
          title="Tap to fade photo and present full content"
        >
          <img
            src={selectedLandmark.image}
            alt={selectedLandmark.name}
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isPhotoFaded ? 'scale-105' : 'scale-100'
            }`}
          />

          {/* Directional Vignette Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/20 to-stone-900/40" />

          {/* Bottom Hero Info inside Banner */}
          <div className="absolute bottom-4 left-4 right-4 text-white z-10">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/25 backdrop-blur-xl text-white border border-white/40 inline-block mb-1.5 shadow-2xs">
              {selectedLandmark.category}
            </span>
            <h2 className="text-xl font-extrabold font-outfit leading-tight drop-shadow-md">
              {selectedLandmark.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Body Content: Expands to FULL MODAL HEIGHT when photo fades */}
        <div 
          onScroll={handleContentScroll}
          className="flex-1 overflow-y-auto p-5 space-y-4.5 overscroll-contain"
        >
          {/* Full Site Masthead (Presented cleanly when photo is faded) */}
          {isPhotoFaded && (
            <div className="pb-3 border-b border-stone-100 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#fff1f1] text-[#d85d5d] border border-[#fecaca]">
                  {selectedLandmark.category}
                </span>

                {selectedLandmark.rating && (
                  <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{selectedLandmark.rating}</span>
                  </div>
                )}
              </div>

              <h1 className="text-xl font-extrabold font-outfit text-stone-900 leading-tight">
                {selectedLandmark.name}
              </h1>

              {selectedLandmark.tags && selectedLandmark.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedLandmark.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200/50">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

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

          {/* Check-in CTA Button: Oslo Rose Liquid Pill */}
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
              <span className="font-mono text-xs font-bold text-stone-900">{sitePts} pts</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isLoyal ? 'bg-amber-500' : 'bg-[#d85d5d]'
                }`}
                style={{ width: `${Math.min(100, (sitePts / 1000) * 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <span className="text-[10px] text-stone-500 font-mono">
                {isLoyal ? 'Unlocked Loyal Customer Tier' : `${1000 - sitePts} pts to Loyal Customer`}
              </span>
              <button
                onClick={() => {
                  setSelectedStatementSite(selectedLandmark.name);
                }}
                className="text-[10px] font-mono text-[#d85d5d] hover:underline font-bold cursor-pointer"
              >
                Statement →
              </button>
            </div>

            {isLoyal && (
              <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] font-outfit font-bold text-emerald-800">
                  🏷️ {discountPct}% Privilege Discount Active
                </span>
                <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">
                  APPLIED
                </span>
              </div>
            )}
          </div>

          {/* Description & Cultural Lore */}
          <div className="space-y-3 pt-1">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-600">
              About Landmark
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              {selectedLandmark.description}
            </p>

            <div className="p-4 rounded-2xl bg-[#fff1f1]/60 backdrop-blur-md border border-[#fecaca]/80 space-y-1.5">
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#d85d5d]">
                Cultural Lore & Heritage
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed font-sans">
                {selectedLandmark.history}
              </p>
            </div>
          </div>

          {/* Reviews List & Submission */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#d85d5d]" />
                <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-600">
                  Explorer Reviews ({landmarkReviews.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200">
                +150 pts per review
              </span>
            </div>

            {/* Add Review Form */}
            <form onSubmit={handleReviewSubmit} className="space-y-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatingInput(star)}
                    className="p-1 text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        star <= ratingInput ? 'fill-amber-400 text-amber-400' : ''
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Share your authentic experience..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-white/80 border border-stone-200 focus:outline-none focus:border-[#d85d5d] focus:ring-1 focus:ring-[#d85d5d]"
                />
                <button
                  type="submit"
                  disabled={isSubmittingReview || !commentInput.trim()}
                  className="px-3.5 py-2 text-xs font-outfit font-bold rounded-xl bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-50 transition-all cursor-pointer shrink-0 shadow-2xs"
                >
                  {isSubmittingReview ? 'Posting...' : 'Post'}
                </button>
              </div>
            </form>

            {/* Existing Reviews */}
            <div className="space-y-2 pt-1">
              {landmarkReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 rounded-xl bg-white/60 border border-stone-200/60 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800 font-outfit">
                      {rev.author}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono ml-1">
                        {rev.date}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

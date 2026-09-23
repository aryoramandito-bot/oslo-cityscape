import { useState, useEffect } from 'react';
import type React from 'react';
import { useAppContext } from '../../context/AppContext';
import { useConfetti } from '../../hooks/useConfetti';
import {
  X,
  Clock,
  MapPin,
  Share2,
  Bell,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  UserCheck,
  Ticket,
  Compass,
  CheckCircle2,
  Sparkles,
  Image,
} from 'lucide-react';

export default function EventDetailModal() {
  const {
    selectedEvent,
    setSelectedEvent,
    eventReminders,
    toggleEventReminder,
    getEventDistance,
  } = useAppContext();
  const { triggerCelebration } = useConfetti();

  const [copiedCoords, setCopiedCoords] = useState(false);
  const [isPhotoFaded, setIsPhotoFaded] = useState(false);

  // Smooth entrance transition: greeting photo fades out after 1.4s to reveal full content
  useEffect(() => {
    setIsPhotoFaded(false);
    if (!selectedEvent) return;
    const timer = setTimeout(() => {
      setIsPhotoFaded(true);
    }, 1400);
    return () => clearTimeout(timer);
  }, [selectedEvent]);

  const handleContentScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // If user starts scrolling, immediately fade out photo so content has full viewport
    if (e.currentTarget.scrollTop > 10 && !isPhotoFaded) {
      setIsPhotoFaded(true);
    }
  };

  if (!selectedEvent) return null;

  const isReminderSet = eventReminders.includes(selectedEvent.id);

  const handleOpenGoogleMapsDirections = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedEvent || selectedEvent.lat === undefined || selectedEvent.lng === undefined) return;
    const { lat, lng } = selectedEvent;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyCoords = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedEvent || selectedEvent.lat === undefined || selectedEvent.lng === undefined) return;
    const coords = `${selectedEvent.lat}, ${selectedEvent.lng}`;
    navigator.clipboard.writeText(coords);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const handleShare = () => {
    if (!selectedEvent) return;
    if (navigator.share) {
      navigator.share({
        title: selectedEvent.title,
        text: selectedEvent.description,
        url: window.location.href,
      });
    }
  };

  const handleToggleReminder = () => {
    toggleEventReminder(selectedEvent.id);
    if (!isReminderSet) {
      triggerCelebration();
    }
  };

  const eventDistance = getEventDistance(selectedEvent);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setSelectedEvent(null)}
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
            onClick={() => setSelectedEvent(null)}
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
              {selectedEvent.categoryLabel}
            </span>
            <h3 className="text-sm font-extrabold font-outfit text-stone-900 truncate leading-snug">
              {selectedEvent.title}
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
            {selectedEvent.lat !== undefined && selectedEvent.lng !== undefined && (
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
            )}

            {/* Native Share */}
            <button
              onClick={handleShare}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 ${
                isPhotoFaded
                  ? 'bg-stone-100 hover:bg-stone-200 border border-stone-200/80 text-stone-700'
                  : 'bg-white/25 hover:bg-white/40 backdrop-blur-xl border border-white/40 text-white'
              }`}
              title="Share event"
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
            src={selectedEvent.image || 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1000&q=85'}
            alt={selectedEvent.title}
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isPhotoFaded ? 'scale-105' : 'scale-100'
            }`}
          />

          {/* Directional Vignette Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/30 to-stone-900/40" />

          {/* Bottom Hero Info inside Banner */}
          <div className="absolute bottom-4 left-4 right-4 text-white z-10">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/25 backdrop-blur-xl text-white border border-white/40 shadow-2xs">
                {selectedEvent.categoryLabel}
              </span>
              {selectedEvent.highlightBadge && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#fff1f1] text-[#d85d5d] border border-[#fecaca] shadow-2xs">
                  {selectedEvent.highlightBadge}
                </span>
              )}
            </div>
            <h2 className="text-xl font-extrabold font-outfit leading-tight drop-shadow-md">
              {selectedEvent.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Body Content: Expands to FULL MODAL HEIGHT when photo fades */}
        <div 
          onScroll={handleContentScroll}
          className="flex-1 overflow-y-auto p-5 space-y-4.5 overscroll-contain"
        >
          {/* Full Event Masthead (Presented cleanly when photo is faded) */}
          {isPhotoFaded && (
            <div className="pb-3 border-b border-stone-100 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#fff1f1] text-[#d85d5d] border border-[#fecaca]">
                  {selectedEvent.categoryLabel}
                </span>

                {selectedEvent.highlightBadge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#fff1f1] text-[#d85d5d] border border-[#fecaca]">
                    {selectedEvent.highlightBadge}
                  </span>
                )}
              </div>

              <h1 className="text-xl font-extrabold font-outfit text-stone-900 leading-tight">
                {selectedEvent.title}
              </h1>

              {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedEvent.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium bg-stone-100 text-stone-600 border border-stone-200/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick Schedule & Venue Bar (Liquid Glass Pill) */}
          <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-stone-200/70 shadow-2xs space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              {/* Time & Duration */}
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fff1f1] text-[#d85d5d] border border-[#fecaca] font-mono text-[11px] font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedEvent.time}</span>
                </div>
                {selectedEvent.duration && (
                  <div className="flex items-center gap-1 pl-1 text-[10px] font-mono font-semibold text-stone-500">
                    <Clock className="w-2.5 h-2.5 text-stone-400" />
                    <span>{selectedEvent.duration}</span>
                  </div>
                )}
              </div>

              {/* Distance pill if available */}
              {eventDistance && (
                <span className="text-[10px] font-mono font-bold text-stone-700 bg-stone-100/90 px-2 py-0.5 rounded-md border border-stone-200/60">
                  📍 {eventDistance}
                </span>
              )}
            </div>

            {/* Venue & Location */}
            <div className="flex items-center gap-2 text-xs text-stone-700 pt-1 border-t border-stone-100">
              <MapPin className="w-3.5 h-3.5 text-[#d85d5d] shrink-0" />
              <span className="font-semibold text-stone-900">{selectedEvent.location}</span>
            </div>

            {selectedEvent.meetingPoint && (
              <div className="flex items-start gap-1.5 text-[11px] text-stone-500 bg-stone-50/80 p-2 rounded-xl border border-stone-200/60">
                <Compass className="w-3.5 h-3.5 text-stone-400 mt-0.5 shrink-0" />
                <span className="leading-snug">
                  <strong className="text-stone-700">Meeting Point:</strong> {selectedEvent.meetingPoint}
                </span>
              </div>
            )}
          </div>

          {/* Direct Google Maps Direction CTA with Live Coordinates Callout */}
          {selectedEvent.lat !== undefined && selectedEvent.lng !== undefined && (
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
                      GPS: {selectedEvent.lat.toFixed(5)}, {selectedEvent.lng.toFixed(5)}
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
          )}

          {/* Reminder / Calendar Toggle CTA: Oslo Rose Liquid Pill */}
          <button
            type="button"
            onClick={handleToggleReminder}
            className={`w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 font-outfit font-bold text-xs transition-all shadow-[0_8px_24px_rgba(216,93,93,0.3)] active:scale-[0.98] cursor-pointer ${
              isReminderSet
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500'
                : 'bg-gradient-to-r from-[#d85d5d] to-[#c64f4f] hover:from-[#c64f4f] hover:to-[#b94444] text-white border border-[#d85d5d]'
            }`}
          >
            {isReminderSet ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Reminder Set in Your Schedule · Active</span>
              </>
            ) : (
              <>
                <Bell className="w-4 h-4 text-amber-200" />
                <span>Set Event Reminder · Add to Schedule</span>
              </>
            )}
          </button>

          {/* Host & Admission Pill Card */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-stone-200/80 shadow-2xs">
              <div className="flex items-center gap-1.5 text-stone-500 mb-1">
                <UserCheck className="w-3.5 h-3.5 text-[#d85d5d]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Host / Curator</span>
              </div>
              <p className="text-xs font-bold text-stone-900 font-outfit line-clamp-2">
                {selectedEvent.host || 'Verified Cultural Custodian'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-stone-200/80 shadow-2xs">
              <div className="flex items-center gap-1.5 text-stone-500 mb-1">
                <Ticket className="w-3.5 h-3.5 text-[#d85d5d]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Admission</span>
              </div>
              <p className="text-xs font-bold text-stone-900 font-outfit line-clamp-2">
                {selectedEvent.admission || 'Verified Timetable'}
              </p>
            </div>
          </div>

          {/* Step-by-Step Program / Itinerary */}
          {selectedEvent.itinerary && selectedEvent.itinerary.length > 0 && (
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-stone-200/80 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#d85d5d]" />
                <h3 className="text-xs font-bold font-outfit text-stone-900 tracking-tight">
                  Program & Step-by-Step Itinerary
                </h3>
              </div>

              <div className="space-y-2.5 relative pl-3 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-stone-200">
                {selectedEvent.itinerary.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#d85d5d] ring-4 ring-white shrink-0 mt-1 relative z-10" />
                    <p className="text-[11.5px] text-stone-700 leading-snug font-medium">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cultural Overview & Full Description */}
          <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-stone-200/80 shadow-2xs space-y-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#d85d5d]" />
              <h3 className="text-xs font-bold font-outfit text-stone-900 tracking-tight">
                About this Cultural Event
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              {selectedEvent.fullDetails || selectedEvent.description}
            </p>
          </div>

          {/* Tags */}
          {selectedEvent.tags && selectedEvent.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedEvent.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-stone-100/80 text-stone-600 border border-stone-200/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

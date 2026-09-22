import React, { useState, useRef } from 'react';
import { PassportLoyaltyCard, UserProfile } from '../../types';
import { mockPassportCards } from '../../data/passports';
import {
  ShieldCheck,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface PassportCardDeckProps {
  userProfile: UserProfile;
  onSelectAffiliateSite?: (siteName: string) => void;
}

export default function PassportCardDeck({
  userProfile,
  onSelectAffiliateSite,
}: PassportCardDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Touch and drag swipe state
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDeltaX, setDragDeltaX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartTimeRef = useRef<number>(0);

  // Toggle 3D flip for a specific card
  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Switch to a card index
  const selectCard = (index: number) => {
    if (index >= 0 && index < mockPassportCards.length) {
      setActiveIndex(index);
    }
  };

  // --- Touch Gesture Handlers ---
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
    setDragDeltaX(0);
    setIsDragging(false);
    dragStartTimeRef.current = Date.now();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const currentX = e.touches[0].clientX;
    const delta = currentX - dragStartX;

    if (Math.abs(delta) > 6) {
      setIsDragging(true);
      // Rubber-banding at bounds
      if (
        (activeIndex === 0 && delta > 0) ||
        (activeIndex === mockPassportCards.length - 1 && delta < 0)
      ) {
        setDragDeltaX(delta * 0.25);
      } else {
        setDragDeltaX(delta);
      }
    }
  };

  const handleTouchEnd = (cardId: string) => {
    if (dragStartX === null) return;
    const delta = dragDeltaX;
    const wasDragging = isDragging;
    const duration = Date.now() - dragStartTimeRef.current;

    setDragStartX(null);
    setDragDeltaX(0);
    setIsDragging(false);

    // Fast flick or significant horizontal drag
    const isFlick = Math.abs(delta) > 25 && duration < 280;
    const isSwipe = Math.abs(delta) > 40 || isFlick;

    if (isSwipe) {
      if (delta < 0 && activeIndex < mockPassportCards.length - 1) {
        selectCard(activeIndex + 1);
      } else if (delta > 0 && activeIndex > 0) {
        selectCard(activeIndex - 1);
      }
    } else if (!wasDragging) {
      // Clean stationary tap -> flip card!
      toggleFlip(cardId);
    }
  };

  // --- Mouse Drag Handlers (for Desktop testing & swipe) ---
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
    setDragDeltaX(0);
    setIsDragging(false);
    dragStartTimeRef.current = Date.now();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX === null) return;
    const delta = e.clientX - dragStartX;

    if (Math.abs(delta) > 6) {
      setIsDragging(true);
      if (
        (activeIndex === 0 && delta > 0) ||
        (activeIndex === mockPassportCards.length - 1 && delta < 0)
      ) {
        setDragDeltaX(delta * 0.25);
      } else {
        setDragDeltaX(delta);
      }
    }
  };

  const handleMouseUp = (cardId: string) => {
    if (dragStartX === null) return;
    const delta = dragDeltaX;
    const wasDragging = isDragging;
    const duration = Date.now() - dragStartTimeRef.current;

    setDragStartX(null);
    setDragDeltaX(0);
    setIsDragging(false);

    const isFlick = Math.abs(delta) > 25 && duration < 280;
    const isSwipe = Math.abs(delta) > 40 || isFlick;

    if (isSwipe) {
      if (delta < 0 && activeIndex < mockPassportCards.length - 1) {
        selectCard(activeIndex + 1);
      } else if (delta > 0 && activeIndex > 0) {
        selectCard(activeIndex - 1);
      }
    } else if (!wasDragging) {
      toggleFlip(cardId);
    }
  };

  const activePassport = mockPassportCards[activeIndex] || mockPassportCards[0];

  return (
    <div className="w-full flex flex-col gap-3.5 select-none">
      {/* 1. Header Segmented Switcher Pills */}
      <div className="flex items-center gap-1.5 p-1 bg-gray-100/90 rounded-2xl border border-gray-200/80 overflow-x-auto no-scrollbar shadow-2xs">
        {mockPassportCards.map((card, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={card.id}
              onClick={() => selectCard(idx)}
              className={`flex-1 min-w-[95px] py-1.5 px-2 rounded-xl text-[11px] font-bold font-outfit whitespace-nowrap transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-white text-gray-900 shadow-xs font-extrabold'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span className="text-xs">{card.icon}</span>
              <span className="truncate">{card.shortName}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Slideable Passport Card Carousel */}
      <div className="relative w-full overflow-hidden rounded-3xl">
        <div
          className="flex will-change-transform"
          style={{
            transform: `translateX(calc(-${activeIndex * 100}% + ${dragDeltaX}px))`,
            transition: isDragging ? 'none' : 'transform 320ms cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {mockPassportCards.map((card) => {
            const isFlipped = !!flippedCards[card.id];

            return (
              <div
                key={card.id}
                className="w-full shrink-0 px-0.5"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => handleTouchEnd(card.id)}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={() => handleMouseUp(card.id)}
                onMouseLeave={() => {
                  if (dragStartX !== null) {
                    setDragStartX(null);
                    setDragDeltaX(0);
                    setIsDragging(false);
                  }
                }}
              >
                {/* 3D Perspective Card Wrapper */}
                <div className="w-full h-56 perspective-1000 cursor-pointer">
                  <div
                    className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                    style={{
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      WebkitTransform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* ================= CARD FRONT ================= */}
                    <div
                      className={`absolute inset-0 w-full h-full backface-hidden rounded-3xl p-5 bg-gradient-to-br ${card.gradient} text-white shadow-xl flex flex-col justify-between border ${card.borderClass} overflow-hidden`}
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)',
                        WebkitTransform: 'rotateY(0deg)',
                        zIndex: isFlipped ? 1 : 2,
                      }}
                    >
                      {/* Holographic Ambient Glow Reflection */}
                      <div className="absolute -top-12 -right-12 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                      {/* Front Top Bar: Issuer & Verified Status */}
                      <div className="flex items-start justify-between relative z-10">
                        <div className="min-w-0 flex-1 pr-2">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-gray-300 font-bold uppercase truncate">
                            <span>{card.icon}</span>
                            <span className="truncate">{card.issuer}</span>
                          </div>
                          <h3 className="text-base font-extrabold font-outfit mt-1 tracking-tight text-white leading-tight truncate">
                            {card.programTitle}
                          </h3>
                          <span className={`text-[10px] font-mono font-bold block mt-0.5 ${card.accentColor}`}>
                            {card.tier}
                          </span>
                        </div>

                        {/* Verified Pill & Flip Affordance */}
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <div className={`px-2.5 py-1 rounded-xl ${card.badgeBg} border border-white/20 backdrop-blur-md flex items-center gap-1`}>
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span className={`text-[9px] font-mono font-extrabold ${card.badgeText}`}>
                              VERIFIED
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => toggleFlip(card.id, e)}
                            className="text-[9px] font-mono text-gray-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded-md"
                            title="Flip card to view privileges"
                          >
                            <RotateCw className="w-2.5 h-2.5" />
                            <span>Flip</span>
                          </button>
                        </div>
                      </div>

                      {/* Front Middle Bar: Cardholder & Passport No */}
                      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-2.5 my-auto">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-mono">
                            CARDHOLDER
                          </span>
                          <span className="text-sm font-extrabold font-outfit tracking-wide text-white">
                            {userProfile.name}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-mono">
                            PASSPORT NO
                          </span>
                          <span className="text-xs font-mono font-bold tracking-widest text-gray-200">
                            {card.passportNo}
                          </span>
                        </div>
                      </div>

                      {/* Front Bottom Bar: Points & Stamped Sites */}
                      <div className="flex items-end justify-between border-t border-white/10 pt-2.5 relative z-10">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-mono">
                            Loyalty Points
                          </span>
                          <span className={`text-base font-extrabold font-outfit ${card.accentColor}`}>
                            {card.points.toLocaleString()} pts
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-mono">
                            Stamped Sites
                          </span>
                          <span className="text-xs font-extrabold font-outfit text-white">
                            {card.stampedSites} / {card.totalSites} Visited
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ================= CARD BACK ================= */}
                    <div
                      className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl p-5 bg-gradient-to-br ${card.backGradient || 'from-gray-950 via-gray-900 to-gray-950'} text-white shadow-xl flex flex-col justify-between border ${card.borderClass} overflow-hidden`}
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        WebkitTransform: 'rotateY(180deg)',
                        zIndex: isFlipped ? 2 : 1,
                      }}
                    >
                      {/* Back Header */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="flex items-center gap-1.5 min-w-0 pr-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="text-[9.5px] font-mono uppercase tracking-wider text-emerald-300 font-bold truncate">
                            {card.pdpStatus}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => toggleFlip(card.id, e)}
                          className="flex items-center gap-1 text-[9px] font-mono text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-md transition-colors cursor-pointer shrink-0"
                          title="Flip back to card front"
                        >
                          <RotateCw className="w-2.5 h-2.5" />
                          <span>Front</span>
                        </button>
                      </div>

                      {/* Back Middle: Endorsement & Privileges Checklist */}
                      <div className="my-auto space-y-2 text-left">
                        <div>
                          <span className="text-[8.5px] font-mono text-gray-400 uppercase tracking-wider block">
                            ISSUER ENDORSEMENT
                          </span>
                          <p className="text-[10.5px] font-bold font-outfit text-gray-100 leading-tight mt-0.5 truncate">
                            {card.endorser}
                          </p>
                        </div>

                        <div>
                          <span className="text-[8.5px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
                            TIER PRIVILEGES
                          </span>
                          <ul className="space-y-1">
                            {card.keyBenefits.map((benefit, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-1.5 text-[10px] text-gray-200 leading-snug">
                                <span className="text-emerald-400 font-bold text-xs shrink-0 leading-none mt-0.5">✓</span>
                                <span className="line-clamp-1">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Back Footer */}
                      <div className="text-[9px] font-mono text-gray-400 border-t border-white/10 pt-2 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-gray-300">
                          <RotateCw className="w-2.5 h-2.5 text-gray-400" />
                          Tap card to flip back
                        </span>
                        <span className="text-gray-400 font-mono tracking-wider text-[8.5px]">
                          ENC · SHA-256
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Carousel Navigation & Dots Indicator */}
      <div className="flex items-center justify-between px-2 pt-0.5 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          {mockPassportCards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => selectCard(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeIndex === idx ? 'w-6 bg-gray-900' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to ${card.shortName}`}
            />
          ))}
          <span className="text-[10px] font-mono text-gray-400 ml-1.5">
            {activeIndex + 1} of {mockPassportCards.length}
          </span>
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => selectCard(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="p-1 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs transition-colors"
            aria-label="Previous passport card"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => selectCard(Math.min(mockPassportCards.length - 1, activeIndex + 1))}
            disabled={activeIndex === mockPassportCards.length - 1}
            className="p-1 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs transition-colors"
            aria-label="Next passport card"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. Active Passport Ecosystem & Privileges Detail Drawer */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs text-left space-y-2.5">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-7 h-7 rounded-xl ${activePassport.badgeBg} flex items-center justify-center text-sm shrink-0`}>
              {activePassport.icon}
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-gray-900 font-outfit leading-tight truncate">
                {activePassport.shortName} Ecosystem
              </h4>
              <span className="text-[10px] text-gray-400 font-medium block truncate">
                {activePassport.tagline}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 shrink-0">
            {activePassport.points.toLocaleString()} Pts
          </span>
        </div>

        {/* Affiliated Locations in Oslo Cityscape */}
        <div>
          <span className="text-[9.5px] uppercase tracking-wider text-gray-400 font-mono font-bold block mb-1.5">
            Verified Cultural Sites & Partners ({activePassport.affiliates.length}):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activePassport.affiliates.map((aff, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSelectAffiliateSite && onSelectAffiliateSite(aff)}
                className="px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200/70 text-[10px] font-medium text-gray-700 transition-colors text-left flex items-center gap-1 cursor-pointer hover:border-gray-300"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                <span className="truncate max-w-[240px]">{aff}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

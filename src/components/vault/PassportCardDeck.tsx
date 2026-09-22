import React, { useState, useRef, useEffect } from 'react';
import { PassportLoyaltyCard, UserProfile } from '../../types';
import { mockPassportCards } from '../../data/passports';
import {
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Award,
  CheckCircle2,
  ExternalLink,
  Crown
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

  const scrollRef = useRef<HTMLDivElement>(null);

  // Toggle 3D flip for a specific card
  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Smooth scroll to card at index
  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    if (!scrollRef.current) return;
    const cardEl = scrollRef.current.children[index] as HTMLElement;
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  // Track active card while scrolling
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth * 0.9;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < mockPassportCards.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const activePassport = mockPassportCards[activeIndex] || mockPassportCards[0];

  return (
    <div className="w-full flex flex-col gap-3">
      {/* 1. Header Segmented Card Switcher Pills */}
      <div className="flex items-center gap-1.5 p-1 bg-gray-100/90 rounded-2xl border border-gray-200/80 overflow-x-auto no-scrollbar shadow-2xs">
        {mockPassportCards.map((card, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={card.id}
              onClick={() => scrollToCard(idx)}
              className={`flex-1 min-w-[100px] py-1.5 px-2.5 rounded-xl text-[11px] font-bold font-outfit whitespace-nowrap transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
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

      {/* 2. Horizontal Scrollable Snap Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-1 py-1 no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {mockPassportCards.map((card, idx) => {
          const isFlipped = !!flippedCards[card.id];

          return (
            <div
              key={card.id}
              className="w-full max-w-[340px] xs:max-w-[360px] min-w-[300px] h-54 perspective-1000 snap-center shrink-0 cursor-pointer"
              onClick={() => toggleFlip(card.id)}
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* ================= CARD FRONT ================= */}
                <div
                  className={`absolute inset-0 backface-hidden rounded-3xl p-5 bg-gradient-to-br ${card.gradient} text-white shadow-xl flex flex-col justify-between border ${card.borderClass} relative overflow-hidden`}
                >
                  {/* Subtle holographic foil shine reflection */}
                  <div className="absolute -top-12 -right-12 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Top Bar: Issuer & Security Badge */}
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-gray-300 font-bold uppercase">
                        <span>{card.icon}</span>
                        <span>{card.issuer}</span>
                      </div>
                      <h3 className="text-base font-extrabold font-outfit mt-1 tracking-tight text-white leading-tight">
                        {card.programTitle}
                      </h3>
                      <span className={`text-[10px] font-mono font-bold block mt-0.5 ${card.accentColor}`}>
                        {card.tier}
                      </span>
                    </div>

                    {/* Verified Shield Pill */}
                    <div className="flex flex-col items-end gap-1">
                      <div className={`px-2.5 py-1 rounded-xl ${card.badgeBg} border border-white/20 backdrop-blur-md flex items-center gap-1`}>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className={`text-[9px] font-mono font-extrabold ${card.badgeText}`}>
                          VERIFIED
                        </span>
                      </div>
                      <button
                        onClick={(e) => toggleFlip(card.id, e)}
                        className="text-[9px] font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-0.5 mt-1 cursor-pointer bg-white/10 px-1.5 py-0.5 rounded-md"
                        title="Flip card"
                      >
                        <RotateCw className="w-2.5 h-2.5" />
                        <span>Flip</span>
                      </button>
                    </div>
                  </div>

                  {/* Middle: Cardholder Name & Passport No */}
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
                      <span className="text-xs font-mono font-bold tracking-widest text-gray-300">
                        {card.passportNo}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Bar: Points & Stamped Sites */}
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
                  className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-900 text-white shadow-xl flex flex-col justify-between border ${card.borderClass} relative overflow-hidden`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {card.pdpStatus}
                      </span>
                      <button
                        onClick={(e) => toggleFlip(card.id, e)}
                        className="p-1 rounded-md hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
                      >
                        <RotateCw className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Member Endorsement & Benefits */}
                    <div className="space-y-1.5 text-left">
                      <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wide block">
                        ISSUER ENDORSEMENT:
                      </span>
                      <p className="text-[10.5px] font-bold font-outfit text-gray-200 leading-tight mb-2">
                        {card.endorser}
                      </p>

                      <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wide block">
                        TIER PRIVILEGES:
                      </span>
                      <ul className="space-y-1 text-[10px] text-gray-300 leading-relaxed font-sans">
                        {card.keyBenefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="text-[9px] font-mono text-gray-400 border-t border-white/10 pt-2 flex items-center justify-between">
                    <span>TAP TO FLIP FRONT</span>
                    <span className="text-gray-500 font-mono">ENC-SHA256</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Carousel Navigation & Dots Indicator */}
      <div className="flex items-center justify-between px-2 pt-0.5 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          {mockPassportCards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => scrollToCard(idx)}
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
            onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="p-1 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => scrollToCard(Math.min(mockPassportCards.length - 1, activeIndex + 1))}
            disabled={activeIndex === mockPassportCards.length - 1}
            className="p-1 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
            aria-label="Next card"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. Active Passport Network & Privileges Detail Panel */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs text-left space-y-2.5 animate-in fade-in duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-xl ${activePassport.badgeBg} flex items-center justify-center text-sm`}>
              {activePassport.icon}
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 font-outfit leading-tight">
                {activePassport.shortName} Ecosystem
              </h4>
              <span className="text-[10px] text-gray-400 font-medium block">
                {activePassport.tagline}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
            {activePassport.points} Pts
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
                onClick={() => onSelectAffiliateSite && onSelectAffiliateSite(aff)}
                className="px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200/70 text-[10px] font-medium text-gray-700 transition-colors text-left flex items-center gap-1 cursor-pointer"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                <span>{aff}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

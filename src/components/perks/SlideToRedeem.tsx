import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsRight, Check, Sparkles } from 'lucide-react';

interface SlideToRedeemProps {
  onConfirm: () => void;
  label?: string;
  confirmedLabel?: string;
  disabled?: boolean;
}

export default function SlideToRedeem({
  onConfirm,
  label = 'Slide to Redeem Voucher',
  confirmedLabel = 'Redeemed & Ready!',
  disabled = false,
}: SlideToRedeemProps) {
  const [sliderX, setSliderX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [trackWidth, setTrackWidth] = useState(280);

  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);

  const thumbSize = 48; // px
  const padding = 4; // px
  const maxSlide = Math.max(0, trackWidth - thumbSize - padding * 2);

  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const progress = maxSlide > 0 ? Math.min(1, Math.max(0, sliderX / maxSlide)) : 0;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || isConfirmed) return;
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentXRef.current = sliderX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || disabled || isConfirmed) return;
    const delta = e.clientX - startXRef.current;
    const newX = Math.max(0, Math.min(maxSlide, currentXRef.current + delta));
    setSliderX(newX);

    if (newX >= maxSlide * 0.94) {
      setIsDragging(false);
      setSliderX(maxSlide);
      setIsConfirmed(true);
      onConfirm();
    }
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (!isConfirmed) {
      setSliderX(0);
    }
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full h-14 rounded-full select-none cursor-pointer overflow-hidden p-1 transition-all duration-300 ${
        isConfirmed
          ? 'bg-emerald-500 shadow-md'
          : 'bg-white/70 backdrop-blur-xl border border-stone-200/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {/* Sliding Fill Track in Oslo Rose */}
      {!isConfirmed && (
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#fff1f1] to-[#fecaca] rounded-full transition-none pointer-events-none"
          style={{ width: `${sliderX + thumbSize + padding * 2}px` }}
        />
      )}

      {/* Background Center Label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-12">
        <span
          className={`text-xs font-outfit font-bold tracking-tight transition-opacity ${
            isConfirmed ? 'text-white' : 'text-stone-600'
          }`}
          style={{ opacity: isConfirmed ? 1 : Math.max(0.2, 1 - progress * 1.5) }}
        >
          {isConfirmed ? confirmedLabel : label}
        </span>
      </div>

      {/* Interactive Drag Thumb (Liquid Glass Jewel) */}
      <div
        className={`absolute top-1 bottom-1 w-12 rounded-full flex items-center justify-center shadow-md transition-shadow active:scale-95 ${
          isConfirmed
            ? 'bg-white text-emerald-600'
            : 'bg-gradient-to-r from-[#d85d5d] to-[#c64f4f] text-white'
        }`}
        style={{
          transform: `translateX(${sliderX}px)`,
          transition: isDragging ? 'none' : 'transform 240ms cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {isConfirmed ? (
          <Check className="w-5 h-5 stroke-[2.5]" />
        ) : (
          <ChevronsRight className="w-5 h-5 animate-pulse" />
        )}
      </div>
    </div>
  );
}

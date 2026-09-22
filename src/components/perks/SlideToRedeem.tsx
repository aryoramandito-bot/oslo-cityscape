import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsRight, Check, Sparkles } from 'lucide-react';

interface SlideToRedeemProps {
  onConfirm: () => void;
  label?: string;
  confirmedLabel?: string;
  accentGradient?: string;
  accentText?: string;
  disabled?: boolean;
}

export default function SlideToRedeem({
  onConfirm,
  label = 'Slide to Redeem Voucher',
  confirmedLabel = 'Redeemed & Ready!',
  accentGradient = 'from-rose-400 to-[#ff9898]',
  accentText = 'text-[#ff9898]',
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

  // Measure track width dynamically on mount & resize
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
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || disabled || isConfirmed) return;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (sliderX >= maxSlide * 0.75) {
      // Threshold reached -> snap to end & confirm
      setSliderX(maxSlide);
      setIsConfirmed(true);
      setTimeout(() => {
        onConfirm();
      }, 250);
    } else {
      // Return to start with smooth spring
      setSliderX(0);
    }
  };

  // Keyboard accessibility or quick tap handler
  const handleDirectClick = useCallback(() => {
    if (disabled || isConfirmed) return;
    setSliderX(maxSlide);
    setIsConfirmed(true);
    setTimeout(() => {
      onConfirm();
    }, 250);
  }, [disabled, isConfirmed, maxSlide, onConfirm]);

  return (
    <div className="w-full flex flex-col items-center gap-2 select-none">
      {/* Slider Track Container */}
      <div
        ref={trackRef}
        className={`relative w-full h-14 rounded-full p-1 border overflow-hidden transition-colors ${
          isConfirmed
            ? 'bg-emerald-50 border-emerald-300'
            : disabled
            ? 'bg-gray-100 border-gray-200 opacity-60'
            : 'bg-gray-100/90 border-gray-200 shadow-inner'
        }`}
      >
        {/* Dynamic Progress Fill Bar */}
        <div
          className={`absolute top-1 bottom-1 left-1 rounded-full bg-gradient-to-r ${accentGradient} transition-all duration-75 ${
            isConfirmed ? 'from-emerald-400 to-emerald-500' : ''
          }`}
          style={{
            width: isConfirmed ? 'calc(100% - 8px)' : `${sliderX + thumbSize}px`,
            opacity: isConfirmed ? 1 : Math.max(0.2, progress),
          }}
        />

        {/* Center Track Label */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-150 pl-6"
          style={{
            opacity: isConfirmed ? 0 : Math.max(0, 1 - progress * 1.6),
          }}
        >
          <span className="text-xs font-bold font-outfit text-gray-500 tracking-wide flex items-center gap-1">
            {label}
            <ChevronsRight className={`w-4 h-4 animate-pulse ${accentText}`} />
          </span>
        </div>

        {/* Confirmed State Label */}
        {isConfirmed && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs font-extrabold font-outfit text-emerald-700 tracking-wide gap-1 animate-in fade-in duration-200">
            <Check className="w-4 h-4 text-emerald-600" strokeWidth={3} />
            {confirmedLabel}
          </div>
        )}

        {/* Draggable Thumb Handle */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`absolute top-1 bottom-1 z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing touch-none ${
            isDragging ? '' : 'transition-all duration-200 ease-out'
          } ${
            isConfirmed
              ? 'bg-emerald-500 text-white shadow-emerald-300'
              : 'bg-white text-gray-700 border border-gray-200 hover:scale-102'
          }`}
          style={{
            transform: `translateX(${sliderX}px)`,
          }}
          role="slider"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
        >
          {isConfirmed ? (
            <Sparkles className="w-5 h-5 text-white animate-spin" />
          ) : (
            <ChevronsRight
              className={`w-5 h-5 transition-transform ${
                isDragging ? 'scale-110' : ''
              } ${progress > 0.5 ? accentText : 'text-gray-400'}`}
              strokeWidth={2.5}
            />
          )}
        </div>
      </div>

      {/* Subtle Accessibility Helper */}
      {!isConfirmed && !disabled && (
        <button
          type="button"
          onClick={handleDirectClick}
          className="text-[10px] text-gray-400 hover:text-gray-600 font-medium hover:underline cursor-pointer pt-0.5"
        >
          Or tap here to slide automatically
        </button>
      )}
    </div>
  );
}

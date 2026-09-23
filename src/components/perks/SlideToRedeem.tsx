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
  const [trackWidth, setTrackWidth] = useState(320);

  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isConfirmedRef = useRef(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);

  const thumbSize = 48; // px
  const padding = 4; // px

  // Measure track width accurately using ResizeObserver
  useEffect(() => {
    const updateMetrics = () => {
      if (trackRef.current) {
        const measured = trackRef.current.getBoundingClientRect().width || trackRef.current.clientWidth;
        if (measured > 100) {
          setTrackWidth(measured);
        }
      }
    };

    updateMetrics();

    // ResizeObserver catches modal animations & layout changes
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && trackRef.current) {
      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.contentRect.width;
          if (w > 100) setTrackWidth(w);
        }
      });
      observer.observe(trackRef.current);
    }

    window.addEventListener('resize', updateMetrics);
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', updateMetrics);
    };
  }, []);

  // Compute live maxSlide distance, guaranteeing at least 120px slide room
  const getLiveMaxSlide = useCallback(() => {
    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const w = rect.width > 120 ? rect.width : (trackWidth > 120 ? trackWidth : 320);
      return Math.max(120, w - thumbSize - padding * 2);
    }
    return Math.max(120, trackWidth - thumbSize - padding * 2);
  }, [trackWidth]);

  const maxSlide = getLiveMaxSlide();
  const progress = maxSlide > 0 ? Math.min(1, Math.max(0, sliderX / maxSlide)) : 0;

  // Confirm redemption and trigger callback
  const triggerRedemption = useCallback(() => {
    if (isConfirmedRef.current || disabled) return;
    isConfirmedRef.current = true;
    isDraggingRef.current = false;
    setIsDragging(false);
    setIsConfirmed(true);
    setSliderX(getLiveMaxSlide());
    onConfirm();
  }, [disabled, getLiveMaxSlide, onConfirm]);

  // Smoothly auto-slide to 100% and confirm
  const autoSlideToConfirm = useCallback(() => {
    if (isConfirmedRef.current || disabled) return;
    const max = getLiveMaxSlide();
    setSliderX(max);
    triggerRedemption();
  }, [disabled, getLiveMaxSlide, triggerRedemption]);

  // Start drag interaction
  const handleStart = (clientX: number) => {
    if (disabled || isConfirmedRef.current) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = clientX;
    currentXRef.current = sliderX;
  };

  // Move drag interaction
  const handleMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current || disabled || isConfirmedRef.current) return;
    const max = getLiveMaxSlide();
    const delta = clientX - startXRef.current;
    const newX = Math.max(0, Math.min(max, currentXRef.current + delta));
    setSliderX(newX);

    // If dragged past 88%, confirm immediately
    if (newX >= max * 0.88) {
      triggerRedemption();
    }
  }, [disabled, getLiveMaxSlide, triggerRedemption]);

  // End drag interaction
  const handleEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    if (!isConfirmedRef.current) {
      // Snap back to starting position
      setSliderX(0);
    }
  }, []);

  // Global window listeners while dragging to prevent dropped frames or pointer loss
  useEffect(() => {
    if (!isDragging) return;

    const onPointerMove = (e: PointerEvent) => {
      handleMove(e.clientX);
    };

    const onPointerUp = () => {
      handleEnd();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault(); // Prevent page scroll while sliding
        handleMove(e.touches[0].clientX);
      }
    };

    const onTouchEnd = () => {
      handleEnd();
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  // Handle pointer down on the container
  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled || isConfirmed) return;
    handleStart(e.clientX);
  };

  // Handle touch down on the container
  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || isConfirmed) return;
    if (e.touches.length > 0) {
      handleStart(e.touches[0].clientX);
    }
  };

  // Handle click on the track (auto-slide if clicked towards the right half)
  const handleTrackClick = (e: React.MouseEvent) => {
    if (isDragging || isConfirmed || disabled) return;
    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      if (relativeX > rect.width * 0.45) {
        autoSlideToConfirm();
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Main Sliding Pill Track */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onTouchStart={handleTouchStart}
        onClick={handleTrackClick}
        className={`relative w-full h-14 rounded-full select-none cursor-grab active:cursor-grabbing overflow-hidden p-1 touch-none transition-colors duration-300 ${
          isConfirmed
            ? 'bg-emerald-500 shadow-md cursor-default'
            : 'bg-white/80 backdrop-blur-xl border border-stone-200/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.02)]'
        } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
      >
        {/* Sliding Fill Track in Oslo Rose */}
        {!isConfirmed && (
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#fff1f1] via-[#fed7d7] to-[#fca5a5] rounded-full pointer-events-none"
            style={{
              width: `${sliderX + thumbSize + padding * 2}px`,
              transition: isDragging ? 'none' : 'width 240ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        )}

        {/* Center Label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-12">
          <span
            className={`text-xs font-outfit font-bold tracking-tight transition-opacity ${
              isConfirmed ? 'text-white' : 'text-stone-600'
            }`}
            style={{ opacity: isConfirmed ? 1 : Math.max(0.15, 1 - progress * 1.5) }}
          >
            {isConfirmed ? confirmedLabel : label}
          </span>
        </div>

        {/* Interactive Drag Thumb (Liquid Glass Jewel) */}
        <div
          className={`absolute top-1 bottom-1 w-12 rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(216,93,93,0.3)] touch-none select-none transition-shadow ${
            isConfirmed
              ? 'bg-white text-emerald-600'
              : 'bg-gradient-to-r from-[#d85d5d] to-[#c64f4f] text-white'
          }`}
          style={{
            transform: `translateX(${sliderX}px)`,
            transition: isDragging ? 'none' : 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {isConfirmed ? (
            <Check className="w-5 h-5 stroke-[2.5]" />
          ) : (
            <ChevronsRight className={`w-5 h-5 ${isDragging ? 'translate-x-0.5' : 'animate-pulse'}`} />
          )}
        </div>
      </div>

      {/* Tap-to-Redeem Assist Option */}
      {!isConfirmed && !disabled && (
        <button
          type="button"
          onClick={autoSlideToConfirm}
          className="mt-2.5 text-[11px] font-medium text-stone-400 hover:text-[#d85d5d] transition-colors text-center cursor-pointer py-1 px-3 rounded-lg hover:bg-stone-100/60"
        >
          Can't slide? <span className="underline font-semibold text-[#d85d5d]">Tap here to redeem</span>
        </button>
      )}
    </div>
  );
}

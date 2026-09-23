import { useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { mockEvents, EVENT_CATEGORY_TABS } from '../../data/events';
import { EventCategory } from '../../types';
import { Calendar, MapPin, Bell, BellRing, Sparkles, Clock, ChevronRight } from 'lucide-react';

export default function EventsTab() {
  const { activeCity, setSelectedEvent, eventReminders, toggleEventReminder } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const cityEvents = useMemo(() => {
    return mockEvents.filter((e) => e.cityId === activeCity);
  }, [activeCity]);

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'all') return cityEvents;
    return cityEvents.filter((e) => e.category === selectedCategory);
  }, [cityEvents, selectedCategory]);

  const getCityHeading = () => {
    switch (activeCity) {
      case 'laweyan':
        return 'Laweyan Artisan Masterclasses & Heritage Walks';
      case 'solo':
        return 'Royal Keraton Rituals & Mangkunegaran Sessions';
      case 'bandung':
        return 'Art Deco Walks & Creative Workshops';
      case 'jakarta':
      default:
        return 'Cultural Festivals & Heritage Timetable';
    }
  };

  // Unified Oslo Color Registry category tokens (clean, neutral, no clashing colors)
  const getCategoryTheme = (_category?: EventCategory) => {
    return {
      textAccent: 'text-[#d85d5d]',
      badgeBg: 'bg-[#fff1f1]',
      badgeBorder: 'border-[#fecaca]',
      badgeText: 'text-[#d85d5d]',
      emblemBg: 'from-stone-50 to-white',
      emblemBorder: 'border-stone-200/80',
      bgGlow: 'bg-[#ff9898]/10',
    };
  };

  return (
    <div className="flex flex-col gap-4 pb-24 pt-1">
      {/* 1. Double-Bezel Top Header Banner */}
      <div className="rounded-[24px] p-1 bg-gradient-to-b from-stone-900/[0.04] to-stone-900/[0.01] ring-1 ring-stone-900/[0.05] shadow-2xs">
        <div className="rounded-[calc(24px-0.25rem)] bg-white p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d85d5d]" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#d85d5d]">
                Cultural Timetable & Sessions
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-stone-900 font-outfit tracking-tight leading-tight">
              {getCityHeading()}
            </h2>
            <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
              Curated masterclasses, walking tours & verified custodian schedules
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#fff1f1] border border-[#fecaca] text-[#d85d5d] flex items-center justify-center shrink-0 shadow-2xs">
            <Calendar className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. Floating Horizontal Filter Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 -mx-4 px-4 no-scrollbar select-none">
        {EVENT_CATEGORY_TABS.map((tab) => {
          const isActive = selectedCategory === tab.key;
          const count = tab.key === 'all' 
            ? cityEvents.length 
            : cityEvents.filter((ev) => ev.category === tab.key).length;

          if (tab.key !== 'all' && count === 0) return null;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSelectedCategory(tab.key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-outfit font-medium transition-all duration-300 cursor-pointer shrink-0 border active:scale-[0.98] ${
                isActive
                  ? 'bg-[#d85d5d] text-white border-[#d85d5d] shadow-xs font-bold'
                  : 'bg-white/90 hover:bg-white text-stone-600 border-stone-200/80 hover:border-stone-300 shadow-2xs'
              }`}
            >
              {tab.iconUrl && (
                <img 
                  src={tab.iconUrl} 
                  alt={tab.label} 
                  className={`w-4 h-4 object-contain shrink-0 transition-all ${
                    isActive ? 'brightness-0 invert' : 'opacity-80'
                  }`} 
                />
              )}
              <span className="tracking-tight">{tab.label}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full min-w-4 text-center tabular-nums ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-stone-100 text-stone-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Event Cards List */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-stone-200/80 shadow-xs">
            <Sparkles className="w-8 h-8 text-[#d85d5d] mx-auto mb-2 opacity-80" />
            <p className="text-xs font-bold text-stone-800 font-outfit">No events in this category yet</p>
            <p className="text-[11px] text-stone-500 mt-1">Try selecting another category or check back soon.</p>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="mt-3 px-4 py-2 rounded-full bg-[#d85d5d] text-white text-xs font-outfit font-bold cursor-pointer shadow-xs hover:bg-[#c64f4f] transition-colors"
            >
              View All Events ({cityEvents.length})
            </button>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const hasReminder = eventReminders.includes(event.id);
            const theme = getCategoryTheme(event.category);

            return (
              /* Double-Bezel Card in Oslo Warm Linen & Rose Palette with Rich Click-to-Detail Interaction */
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="group relative rounded-[28px] p-1.5 bg-gradient-to-b from-stone-900/[0.04] via-stone-900/[0.015] to-stone-900/[0.04] ring-1 ring-stone-900/[0.05] shadow-[0_4px_24px_-4px_rgba(28,25,23,0.04)] hover:shadow-[0_12px_32px_-6px_rgba(216,93,93,0.14)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 cursor-pointer"
                title="Tap to view full itinerary and location details"
              >
                <div className="relative rounded-[calc(28px-0.375rem)] bg-white p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] overflow-hidden flex flex-col gap-3.5">
                  
                  {/* Subtle Category Ambient Radial Glow */}
                  <div className={`absolute -top-16 -right-16 w-36 h-36 ${theme.bgGlow} rounded-full blur-3xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* 1. TOP ANCHORAGE: TIME (WITH DURATION MOVED VERTICALLY BELOW) & VENUE STRIP */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-100 relative z-10">
                    {/* Time Pill in Oslo Rose with Duration Displayed Vertically Below */}
                    <div className="flex flex-col items-start gap-1 min-w-0">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff1f1] text-[#d85d5d] border border-[#fecaca] font-mono text-[11px] font-bold tracking-tight shadow-2xs shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d85d5d] animate-pulse shrink-0" />
                        <span className="whitespace-nowrap">{event.time}</span>
                      </div>

                      {/* Duration cleanly positioned directly below time without any horizontal truncation */}
                      {event.duration && (
                        <div className="flex items-center gap-1 pl-1 text-[10px] font-mono text-stone-500 font-semibold tracking-wide">
                          <Clock className="w-2.5 h-2.5 text-stone-400 shrink-0" />
                          <span>{event.duration}</span>
                        </div>
                      )}
                    </div>

                    {/* Venue Chip */}
                    <div className="flex items-center gap-1 text-[11px] font-medium text-stone-600 bg-stone-50 px-2.5 py-1 rounded-full border border-stone-200/60 shrink-0 max-w-[170px] truncate mt-0.5">
                      <MapPin className="w-3 h-3 text-[#d85d5d] shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  {/* 2. HERO BLOCK: VECTOR JEWEL + MASTHEAD */}
                  <div className="flex items-start gap-3.5 relative z-10">
                    {/* Category Vector Jewel */}
                    <div className="w-12 h-12 rounded-2xl p-2.5 bg-stone-50/90 backdrop-blur-md border border-stone-200/80 flex items-center justify-center shrink-0 shadow-2xs relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <img
                        src={event.iconUrl}
                        alt={event.categoryLabel}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Masthead & Title */}
                    <div className="min-w-0 flex-1">
                      {/* Eyebrow & Highlight Tag */}
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-[10px] font-mono font-bold tracking-[0.14em] uppercase ${theme.textAccent}`}>
                          {event.categoryLabel}
                        </span>

                        {event.highlightBadge && (
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${theme.badgeBg} border ${theme.badgeBorder} ${theme.badgeText} font-semibold leading-none`}>
                            {event.highlightBadge}
                          </span>
                        )}
                      </div>

                      {/* Event Title */}
                      <h3 className="text-sm font-extrabold text-stone-900 font-outfit tracking-tight leading-snug group-hover:text-[#d85d5d] transition-colors flex items-center gap-1">
                        <span>{event.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#d85d5d] shrink-0" />
                      </h3>
                    </div>
                  </div>

                  {/* 3. NARRATIVE PROSE */}
                  <p className="text-[12px] text-stone-500 leading-relaxed font-sans line-clamp-2 relative z-10">
                    {event.description}
                  </p>

                  {/* 4. FOOTER UTILITY & BUTTON-IN-BUTTON CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-stone-100 relative z-10">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-stone-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="uppercase tracking-wider">Verified Schedule</span>
                    </div>

                    {/* Button-in-Button Trailing Icon Architecture (stops propagation so user can toggle reminder without opening modal) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleEventReminder(event.id);
                      }}
                      className={`group/btn flex items-center gap-2 pl-3.5 pr-1.5 py-1 rounded-full text-xs font-outfit font-semibold transition-all duration-300 shadow-2xs active:scale-[0.97] cursor-pointer ${
                        hasReminder
                          ? 'bg-[#d85d5d] text-white shadow-xs'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/80 hover:border-stone-300'
                      }`}
                    >
                      <span className="tracking-tight text-[11px] font-bold">
                        {hasReminder ? 'Reminder Set' : 'Remind Me'}
                      </span>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        hasReminder
                          ? 'bg-white/20 text-white'
                          : 'bg-white text-stone-600 shadow-2xs group-hover/btn:translate-x-0.5'
                      }`}>
                        {hasReminder ? (
                          <BellRing className="w-3.5 h-3.5" />
                        ) : (
                          <Bell className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { mockEvents, EVENT_CATEGORY_TABS } from '../../data/events';
import { EventCategory } from '../../types';
import { Calendar, MapPin, Bell, Check, Sparkles } from 'lucide-react';

export default function EventsTab() {
  const { activeCity } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<'all' | EventCategory>('all');
  const [reminders, setReminders] = useState<string[]>([]);

  const cityEvents = mockEvents.filter((ev) => ev.cityId === activeCity);
  const filteredEvents = selectedCategory === 'all' 
    ? cityEvents 
    : cityEvents.filter((ev) => ev.category === selectedCategory);

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getCityHeading = () => {
    switch (activeCity) {
      case 'laweyan':
        return 'Laweyan Heritage & Workshop Schedule';
      case 'solo':
        return 'Solo Heritage & Festival Schedule';
      case 'bandung':
        return 'Bandung Festival & Cultural Schedule';
      default:
        return 'Jakarta Daily Happenings & Schedule';
    }
  };

  const getCategoryTheme = (category: EventCategory) => {
    switch (category) {
      case 'workshop':
        return {
          bgGlow: 'bg-amber-400/20',
          emblemBg: 'from-amber-500/15 via-orange-500/10 to-amber-500/5',
          emblemBorder: 'border-amber-500/30',
          textAccent: 'text-amber-800',
          badgeBg: 'bg-amber-50',
          badgeBorder: 'border-amber-200/80',
          badgeText: 'text-amber-900',
        };
      case 'walking':
        return {
          bgGlow: 'bg-emerald-400/20',
          emblemBg: 'from-emerald-500/15 via-teal-500/10 to-emerald-500/5',
          emblemBorder: 'border-emerald-500/30',
          textAccent: 'text-emerald-800',
          badgeBg: 'bg-emerald-50',
          badgeBorder: 'border-emerald-200/80',
          badgeText: 'text-emerald-900',
        };
      case 'culinary':
        return {
          bgGlow: 'bg-orange-400/20',
          emblemBg: 'from-orange-500/15 via-amber-500/10 to-orange-500/5',
          emblemBorder: 'border-orange-500/30',
          textAccent: 'text-orange-800',
          badgeBg: 'bg-orange-50',
          badgeBorder: 'border-orange-200/80',
          badgeText: 'text-orange-900',
        };
      case 'performance':
        return {
          bgGlow: 'bg-indigo-400/20',
          emblemBg: 'from-indigo-500/15 via-purple-500/10 to-indigo-500/5',
          emblemBorder: 'border-indigo-500/30',
          textAccent: 'text-indigo-800',
          badgeBg: 'bg-indigo-50',
          badgeBorder: 'border-indigo-200/80',
          badgeText: 'text-indigo-900',
        };
      case 'festival':
        return {
          bgGlow: 'bg-rose-400/20',
          emblemBg: 'from-rose-500/15 via-pink-500/10 to-rose-500/5',
          emblemBorder: 'border-rose-500/30',
          textAccent: 'text-rose-800',
          badgeBg: 'bg-rose-50',
          badgeBorder: 'border-rose-200/80',
          badgeText: 'text-rose-900',
        };
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-24 pt-1">
      {/* 1. Double-Bezel Top Header Banner */}
      <div className="rounded-[24px] p-1 bg-gradient-to-b from-black/[0.04] to-black/[0.01] ring-1 ring-black/[0.05] shadow-[0_2px_16px_-2px_rgba(0,0,0,0.03)]">
        <div className="rounded-[calc(24px-0.25rem)] bg-white p-4.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff7070]" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#ff7070]">
                Cultural Timetable & Sessions
              </span>
            </div>
            <h2 className="text-base font-extrabold text-gray-900 font-outfit tracking-tight">
              {getCityHeading()}
            </h2>
            <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
              Live synchronized with local custodians, artisan masterclasses & verified venues
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs">
            <Calendar className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. Floating Horizontal Filter Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 -mx-4 px-4 no-scrollbar">
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
                  ? 'bg-gray-950 text-white border-gray-950 shadow-sm'
                  : 'bg-white/90 hover:bg-white text-gray-600 border-black/[0.06] hover:border-black/[0.12] shadow-2xs'
              }`}
            >
              {tab.iconUrl && (
                <img 
                  src={tab.iconUrl} 
                  alt={tab.label} 
                  className="w-4 h-4 object-contain shrink-0" 
                />
              )}
              <span className="tracking-tight">{tab.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full min-w-4 text-center ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-black/[0.04] text-gray-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. High-End Event Cards List */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-black/[0.06] shadow-xs">
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-gray-800 font-outfit">No events in this category yet</p>
            <p className="text-[11px] text-gray-500 mt-1">Try selecting another category or check back soon.</p>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="mt-3 px-4 py-2 rounded-full bg-gray-900 text-white text-xs font-outfit font-semibold cursor-pointer shadow-xs hover:bg-black transition-colors"
            >
              View All Events ({cityEvents.length})
            </button>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const hasReminder = reminders.includes(event.id);
            const theme = getCategoryTheme(event.category);

            return (
              /* Double-Bezel Luxury Card */
              <div
                key={event.id}
                className="group relative rounded-[28px] p-1.5 bg-gradient-to-b from-black/[0.04] via-black/[0.015] to-black/[0.04] ring-1 ring-black/[0.05] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.08)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5"
              >
                <div className="relative rounded-[calc(28px-0.375rem)] bg-white p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] overflow-hidden flex flex-col gap-4">
                  
                  {/* Subtle Category Radial Light Ambient */}
                  <div className={`absolute -top-16 -right-16 w-36 h-36 ${theme.bgGlow} rounded-full blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* 1. TOP ANCHORAGE: EDITORIAL TIME & VENUE STRIP */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-black/[0.04] relative z-10">
                    {/* Time & Duration Pill */}
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-950 text-amber-300 font-mono text-[11px] font-bold tracking-tight shadow-xs shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                        <span className="whitespace-nowrap">{event.time}</span>
                      </div>

                      {event.duration && (
                        <span className="text-[10px] font-mono text-gray-500 font-semibold tracking-wide truncate max-w-[120px]">
                          {event.duration}
                        </span>
                      )}
                    </div>

                    {/* Venue Chip */}
                    <div className="flex items-center gap-1 text-[11px] font-medium text-gray-600 bg-gray-50/80 px-2.5 py-1 rounded-full border border-black/[0.04] shrink-0 max-w-[170px] truncate">
                      <MapPin className="w-3 h-3 text-[#ff7070] shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  {/* 2. HERO BLOCK: VECTOR JEWEL + MASTHEAD */}
                  <div className="flex items-start gap-3.5 relative z-10">
                    {/* Category Vector Emblem (Doppelrand Jewel) */}
                    <div className={`w-12 h-12 rounded-2xl p-2 bg-gradient-to-br ${theme.emblemBg} border ${theme.emblemBorder} flex items-center justify-center shrink-0 shadow-2xs relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                      <img
                        src={event.iconUrl}
                        alt={event.categoryLabel}
                        className="w-full h-full object-contain drop-shadow-2xs"
                      />
                    </div>

                    {/* Masthead & Title */}
                    <div className="min-w-0 flex-1">
                      {/* Eyebrow & Highlight Tag */}
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-[9.5px] font-mono font-bold tracking-[0.16em] uppercase ${theme.textAccent}`}>
                          {event.categoryLabel}
                        </span>

                        {event.highlightBadge && (
                          <span className={`text-[9.5px] font-mono px-2 py-0.5 rounded-full ${theme.badgeBg} border ${theme.badgeBorder} ${theme.badgeText} font-semibold leading-none`}>
                            {event.highlightBadge}
                          </span>
                        )}
                      </div>

                      {/* Event Title */}
                      <h3 className="text-sm font-extrabold text-gray-900 font-outfit tracking-tight leading-snug group-hover:text-gray-950 transition-colors">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {/* 3. NARRATIVE PROSE */}
                  <p className="text-[12px] text-gray-500 leading-relaxed font-sans line-clamp-2 relative z-10 -mt-1">
                    {event.description}
                  </p>

                  {/* 4. FOOTER UTILITY & BUTTON-IN-BUTTON CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-black/[0.04] relative z-10">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="uppercase tracking-wider">Verified Schedule</span>
                    </div>

                    {/* Button-in-Button Trailing Icon Architecture */}
                    <button
                      type="button"
                      onClick={() => toggleReminder(event.id)}
                      className={`group/btn flex items-center gap-2 pl-3.5 pr-1.5 py-1 rounded-full text-xs font-outfit font-semibold transition-all duration-300 shadow-2xs active:scale-[0.97] cursor-pointer ${
                        hasReminder
                          ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                          : 'bg-gray-950 hover:bg-black text-white'
                      }`}
                    >
                      <span>{hasReminder ? 'Reminder Set' : 'Remind Me'}</span>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
                          hasReminder
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white/15 text-amber-300 group-hover/btn:scale-105 group-hover/btn:translate-x-0.5'
                        }`}
                      >
                        {hasReminder ? (
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        ) : (
                          <Bell className="w-3 h-3" />
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

import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { mockEvents, EVENT_CATEGORY_TABS } from '../../data/events';
import { EventCategory } from '../../types';
import { Calendar, Clock, MapPin, Bell, Check, Sparkles } from 'lucide-react';

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

  return (
    <div className="flex flex-col gap-4 pb-20 pt-1">
      {/* Header Banner */}
      <div className="p-4 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ff7070] block">
            Cultural Timetable
          </span>
          <h2 className="text-base font-bold text-gray-900 font-outfit mt-0.5">
            {getCityHeading()}
          </h2>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Synchronized with local heritage hubs, masterclasses & verified schedules
          </p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5" />
        </div>
      </div>

      {/* Category Filter Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
        {EVENT_CATEGORY_TABS.map((tab) => {
          const isActive = selectedCategory === tab.key;
          const count = tab.key === 'all' 
            ? cityEvents.length 
            : cityEvents.filter((ev) => ev.category === tab.key).length;

          if (tab.key !== 'all' && count === 0) return null;

          return (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-outfit font-medium transition-all cursor-pointer shrink-0 border ${
                isActive
                  ? 'bg-gray-900 text-white border-gray-900 shadow-xs'
                  : 'bg-white text-gray-600 border-gray-200/80 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              {tab.iconUrl && (
                <img 
                  src={tab.iconUrl} 
                  alt={tab.label} 
                  className="w-4 h-4 object-contain shrink-0" 
                />
              )}
              <span>{tab.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-gray-200/80 shadow-xs">
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-gray-800 font-outfit">No events in this category yet</p>
            <p className="text-[11px] text-gray-500 mt-1">Try selecting another category or check back soon.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-3 px-3 py-1.5 rounded-xl bg-gray-900 text-white text-xs font-outfit font-medium cursor-pointer"
            >
              View All Events ({cityEvents.length})
            </button>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const hasReminder = reminders.includes(event.id);

            return (
              <div
                key={event.id}
                className="p-4 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col gap-3"
              >
                {/* 1. TOP EXPOSURE: TIME & PLACE FIRST */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-gray-100">
                  {/* Time Callout Pill */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gray-900 text-amber-300 font-mono text-[11.5px] font-bold shadow-2xs">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{event.time}</span>
                    </div>

                    {event.duration && (
                      <span className="text-[10px] font-mono font-semibold text-gray-500 bg-gray-100/90 px-2 py-0.8 rounded-lg">
                        {event.duration}
                      </span>
                    )}
                  </div>

                  {/* Location Chip */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-amber-50/70 border border-amber-200/60 px-2.5 py-1 rounded-xl">
                    <MapPin className="w-3.5 h-3.5 text-[#ff7070] shrink-0" />
                    <span className="truncate font-medium">{event.location}</span>
                  </div>
                </div>

                {/* 2. CATEGORY VECTOR ICON + TITLE + REMINDER BUTTON */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {/* Dedicated Category Vector PNG */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/60 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                      <img
                        src={event.iconUrl}
                        alt={event.categoryLabel}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div>
                      {/* Category Label and Highlight Badge */}
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700 font-outfit">
                          {event.categoryLabel}
                        </span>

                        {event.highlightBadge && (
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 font-outfit">
                            {event.highlightBadge}
                          </span>
                        )}
                      </div>

                      {/* Event Title */}
                      <h3 className="text-[13px] font-bold text-gray-900 font-outfit leading-snug">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {/* Reminder Button */}
                  <button
                    onClick={() => toggleReminder(event.id)}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer shrink-0 ${
                      hasReminder
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-600 shadow-2xs'
                        : 'bg-gray-50 border-gray-200/80 text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    }`}
                    title={hasReminder ? 'Reminder Scheduled' : 'Set Event Reminder'}
                  >
                    {hasReminder ? <Check className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                  </button>
                </div>

                {/* 3. SECONDARY: CONCISE DESCRIPTION */}
                <p className="text-[11.5px] text-gray-500 leading-relaxed pt-1">
                  {event.description}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}


import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { mockEvents } from '../../data/events';
import { Calendar, Clock, MapPin, Bell, Check } from 'lucide-react';

export default function EventsTab() {
  const { activeCity } = useAppContext();
  const [reminders, setReminders] = useState<string[]>([]);

  const isJakarta = activeCity === 'jakarta';
  const cityEvents = mockEvents.filter((ev) => ev.cityId === activeCity);

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-4 pb-20 pt-1">
      {/* Header Banner */}
      <div className="p-4 rounded-3xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ff9898] block">
            Cultural Timetable
          </span>
          <h2 className="text-base font-bold text-gray-900 font-outfit mt-0.5">
            {activeCity === 'solo' ? 'Solo Heritage & Festival Schedule' : activeCity === 'bandung' ? 'Bandung Festival Schedule' : 'Jakarta Daily Happenings'}
          </h2>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Synchronized with local heritage hubs & verified schedules
          </p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5" />
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3.5">
        {cityEvents.map((event) => {
          const hasReminder = reminders.includes(event.id);

          return (
            <div
              key={event.id}
              className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 font-outfit">
                      {event.category}
                    </span>
                    <div className="flex items-center gap-1 text-[10.5px] font-medium text-gray-400 font-mono">
                      <Clock className="w-3 h-3" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-gray-900 font-outfit leading-snug">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
                    <MapPin className="w-3 h-3 text-[#ff9898] shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleReminder(event.id)}
                  className={`p-2 rounded-xl border transition-all cursor-pointer shrink-0 ${
                    hasReminder
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-600'
                      : 'bg-gray-50 border-gray-200/80 text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                  title={hasReminder ? 'Reminder Set' : 'Set Event Reminder'}
                >
                  {hasReminder ? <Check className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-[11px] text-gray-500 leading-relaxed border-t border-gray-100 pt-2.5">
                {event.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

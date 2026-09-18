import { useAppContext } from '../../context/AppContext';
import LandmarkCard from '../cards/LandmarkCard';
import { Search, X, Radar, Compass } from 'lucide-react';

export default function ExploreTab() {
  const {
    activeCity,
    landmarks,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    setIsRadarMapOpen,
    checkins,
  } = useAppContext();

  const isJakarta = activeCity === 'jakarta';
  const accentColor = isJakarta ? 'bg-[#ff9898]' : 'bg-amber-500';

  const filtered = landmarks.filter((item) => {
    if (categoryFilter !== 'all' && item.category.toLowerCase() !== categoryFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTags) return false;
    }
    return true;
  });

  const visitedCount = landmarks.filter((item) => checkins.includes(item.id)).length;

  return (
    <div className="flex flex-col gap-4 pb-20 pt-1">
      {/* Radar Map Quick Launch Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4.5 shadow-md">
        <div className="relative z-10 flex items-center justify-between">
          <div className="max-w-[70%]">
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#ff9898] uppercase tracking-wider mb-1">
              <Radar className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span>POI Proximity Radar</span>
            </div>
            <h2 className="text-base font-bold font-outfit leading-tight text-white">
              {isJakarta ? 'Explore Jakarta Heritage' : 'Discover Bandung Beauty'}
            </h2>
            <p className="text-[11px] text-gray-300 mt-1 leading-normal">
              {visitedCount} of {landmarks.length} sites stamped. Open radar map to view nearby nodes.
            </p>
          </div>

          <button
            onClick={() => setIsRadarMapOpen(true)}
            className="px-3.5 py-2.5 rounded-2xl bg-white text-gray-900 font-outfit font-bold text-xs shadow-md hover:bg-gray-100 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Compass className="w-4 h-4 text-[#ff9898]" />
            Radar Map
          </button>
        </div>

        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${isJakarta ? 'Jakarta' : 'Bandung'} sites, dishes, museums...`}
          className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white border border-gray-200/90 text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#ff9898] focus:ring-2 focus:ring-[#ff9898]/20 transition-all shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(
          [
            { id: 'all', label: 'All Sites' },
            { id: 'attraction', label: '🏛️ Attractions' },
            { id: 'culinary', label: '🍜 Culinary' },
          ] as const
        ).map((pill) => {
          const isActive = categoryFilter === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => setCategoryFilter(pill.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer font-outfit ${
                isActive
                  ? `${accentColor} text-white shadow-xs`
                  : 'bg-white border border-gray-200/80 text-gray-600 hover:border-gray-300'
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-medium px-1">
        <span>
          Showing <strong className="text-gray-900 font-bold">{filtered.length}</strong> sites
        </span>
        <span className="text-[11px] font-mono text-gray-400">
          {visitedCount}/{landmarks.length} Visited
        </span>
      </div>

      {/* Grid of Landmark Cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-3.5">
          {filtered.map((landmark) => (
            <LandmarkCard key={landmark.id} landmark={landmark} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 mb-2">
            <Search className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-gray-700 font-outfit">No matching sites found</p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Try searching for another keyword or clear your filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
            }}
            className="mt-3 px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

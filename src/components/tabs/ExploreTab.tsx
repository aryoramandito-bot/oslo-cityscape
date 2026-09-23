import { useAppContext } from '../../context/AppContext';
import LandmarkCard from '../cards/LandmarkCard';
import { Search, X, Compass, ArrowUpDown } from 'lucide-react';
import { SortOption } from '../../types';

export default function ExploreTab() {
  const {
    activeCity,
    landmarks,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    sortOption,
    setSortOption,
    setIsRadarMapOpen,
    checkins,
  } = useAppContext();

  const isLaweyan = activeCity === 'laweyan';
  const isSolo = activeCity === 'solo';
  const isBandung = activeCity === 'bandung';

  const nodeName = isLaweyan ? 'Pajang & Batik Merchant Node' : isSolo ? 'Royal Heritage Node' : isBandung ? 'Highland Creative Node' : 'Capital Cultural Node';
  const discoveryTitle = isLaweyan ? 'Laweyan Discovery' : isSolo ? 'Solo Discovery' : isBandung ? 'Bandung Discovery' : 'Jakarta Discovery';

  // 1. Strict Category Filtering
  const filteredByCategory = landmarks.filter((item) => {
    if (categoryFilter === 'all') return true;
    return item.category.toLowerCase() === categoryFilter;
  });

  // 2. Search Query Filtering
  const filteredBySearch = filteredByCategory.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchName = item.name.toLowerCase().includes(q);
    const matchDesc = item.description.toLowerCase().includes(q);
    const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));
    return matchName || matchDesc || matchTags;
  });

  // 3. Sorting Execution
  const sortedLandmarks = [...filteredBySearch].sort((a, b) => {
    if (sortOption === 'rating') {
      const ratingA = parseFloat(a.rating || '4.7');
      const ratingB = parseFloat(b.rating || '4.7');
      return ratingB - ratingA;
    }
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0; // Default curated order
  });

  const visitedCount = landmarks.filter((item) => checkins.includes(item.id)).length;
  const attractionCount = landmarks.filter((item) => item.category.toLowerCase() === 'attraction').length;
  const culinaryCount = landmarks.filter((item) => item.category.toLowerCase() === 'culinary').length;

  return (
    <div className="flex flex-col gap-4 pb-20 pt-1">
      {/* Top Header Card: Translucent Liquid Glass */}
      <div className="flex flex-col gap-3.5 bg-white/70 backdrop-blur-2xl p-5 rounded-3xl border border-white/80 shadow-[0_8px_32px_rgba(28,25,23,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] ring-1 ring-stone-900/5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] block text-[#d85d5d]">
              {nodeName}
            </span>
            <h1 className="text-xl font-extrabold font-outfit text-stone-900 leading-tight">
              {discoveryTitle}
            </h1>
          </div>

          {/* Quick Radar Action: Liquid Glass Pill (NO PITCH BLACK) */}
          <button
            onClick={() => setIsRadarMapOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-white text-stone-800 font-outfit font-bold text-xs border border-stone-200/80 shadow-[0_4px_16px_rgba(28,25,23,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95"
          >
            <Compass className="w-4 h-4 text-[#d85d5d]" />
            <span>Radar Map</span>
          </button>
        </div>

        {/* Liquid Glass Segmented Category Rail */}
        <div className="bg-stone-200/50 backdrop-blur-md p-1 rounded-2xl border border-white/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] flex items-center justify-between gap-1 text-[11px] font-bold font-outfit select-none">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer text-center ${
              categoryFilter === 'all'
                ? 'bg-white text-stone-900 shadow-2xs font-extrabold'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            All ({landmarks.length})
          </button>
          <button
            onClick={() => setCategoryFilter('attraction')}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer text-center ${
              categoryFilter === 'attraction'
                ? 'bg-[#d85d5d] text-white shadow-2xs font-extrabold'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Attractions ({attractionCount})
          </button>
          <button
            onClick={() => setCategoryFilter('culinary')}
            className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer text-center ${
              categoryFilter === 'culinary'
                ? 'bg-[#d85d5d] text-white shadow-2xs font-extrabold'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Culinary ({culinaryCount})
          </button>
        </div>
      </div>

      {/* Search Input & Sort Selector Row with Liquid Glass */}
      <div className="flex items-center gap-2">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${
              categoryFilter === 'all'
                ? 'all sites'
                : categoryFilter === 'attraction'
                ? 'attractions'
                : 'culinary'
            }...`}
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white/75 backdrop-blur-xl border border-stone-200/80 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-hidden focus:border-[#d85d5d] focus:ring-2 focus:ring-[#d85d5d]/15 transition-all shadow-[0_2px_12px_rgba(28,25,23,0.03)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Selector Dropdown */}
        <div className="relative shrink-0">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="appearance-none pl-3 pr-8 py-2.5 rounded-2xl bg-white/75 backdrop-blur-xl border border-stone-200/80 text-xs font-semibold text-stone-700 font-outfit focus:bg-white focus:outline-hidden focus:border-[#d85d5d] shadow-[0_2px_12px_rgba(28,25,23,0.03)] cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
          </select>
          <ArrowUpDown className="w-3 h-3 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Results Header Info with Progress Pill */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-medium px-1">
        <span>
          Showing <strong className="text-stone-800 font-bold tabular-nums">{sortedLandmarks.length}</strong> curated sites
        </span>
        <span className="text-[10px] font-mono bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-stone-200/80 text-stone-600">
          <span className="text-emerald-600 font-bold tabular-nums">{visitedCount}</span>/{landmarks.length} Visited
        </span>
      </div>

      {/* Landmarks Grid */}
      {sortedLandmarks.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {sortedLandmarks.map((landmark) => (
            <LandmarkCard key={landmark.id} landmark={landmark} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white/80 backdrop-blur-xl rounded-3xl border border-stone-200/80 shadow-2xs">
          <p className="text-xs font-bold text-stone-700 font-outfit">No sites match your search</p>
          <p className="text-[11px] text-stone-400 mt-1">Try another keyword or reset the category filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
            }}
            className="mt-3 px-4 py-1.5 rounded-full bg-[#d85d5d] text-white text-xs font-outfit font-bold shadow-2xs hover:bg-[#c64f4f] transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

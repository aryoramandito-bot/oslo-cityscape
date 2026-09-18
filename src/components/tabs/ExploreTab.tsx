import { useAppContext } from '../../context/AppContext';
import LandmarkCard from '../cards/LandmarkCard';
import { Search, X, Radar, Compass, ArrowUpDown } from 'lucide-react';
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

  const isJakarta = activeCity === 'jakarta';
  const activeColor = isJakarta ? 'bg-[#ff9898]' : 'bg-amber-500';

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
      {/* Top Header Segmented Controls & Title */}
      <div className="flex flex-col gap-3 bg-white p-4 rounded-3xl border border-gray-200/80 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ff9898] block">
              {isJakarta ? 'Capital Node' : 'Highland Node'}
            </span>
            <h1 className="text-lg font-extrabold font-outfit text-gray-900 leading-tight">
              {isJakarta ? 'Jakarta Discovery' : 'Bandung Discovery'}
            </h1>
          </div>

          {/* Quick Radar Action */}
          <button
            onClick={() => setIsRadarMapOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-gray-900 text-white font-outfit font-bold text-xs shadow-xs hover:bg-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Compass className="w-3.5 h-3.5 text-[#ff9898]" />
            Radar Map
          </button>
        </div>

        {/* Segmented Category Filter in Header Section */}
        <div className="bg-gray-100/80 p-1 rounded-2xl border border-gray-200/60 flex items-center justify-between gap-1 text-[11px] font-bold font-outfit">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
              categoryFilter === 'all'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            All ({landmarks.length})
          </button>
          <button
            onClick={() => setCategoryFilter('attraction')}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
              categoryFilter === 'attraction'
                ? `${activeColor} text-white shadow-xs`
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            🏛️ Attractions ({attractionCount})
          </button>
          <button
            onClick={() => setCategoryFilter('culinary')}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
              categoryFilter === 'culinary'
                ? `${activeColor} text-white shadow-xs`
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            🍜 Culinary ({culinaryCount})
          </button>
        </div>
      </div>

      {/* Search Input & Sort Selector Row */}
      <div className="flex items-center gap-2">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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

        {/* Sort Selector Dropdown */}
        <div className="relative shrink-0">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="appearance-none pl-3 pr-8 py-2.5 rounded-2xl bg-white border border-gray-200/90 text-xs font-semibold text-gray-700 font-outfit focus:outline-hidden focus:border-[#ff9898] shadow-xs cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="rating">⭐ Rating</option>
            <option value="name">🔤 Name</option>
          </select>
          <ArrowUpDown className="w-3 h-3 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Results Header Info */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-medium px-1">
        <span>
          Showing <strong className="text-gray-900 font-bold">{sortedLandmarks.length}</strong>{' '}
          {categoryFilter === 'all'
            ? 'curated sites'
            : categoryFilter === 'attraction'
            ? 'attraction landmarks'
            : 'culinary spots'}
        </span>
        <span className="text-[11px] font-mono text-gray-400">
          {visitedCount}/{landmarks.length} Visited
        </span>
      </div>

      {/* Grid of Landmark Cards */}
      {sortedLandmarks.length > 0 ? (
        <div className="grid grid-cols-2 gap-3.5">
          {sortedLandmarks.map((landmark) => (
            <LandmarkCard key={landmark.id} landmark={landmark} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 mb-2">
            <Search className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-gray-700 font-outfit">No matching sites found</p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Try adjusting your search query or switching the category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
            }}
            className="mt-3 px-3.5 py-2 rounded-xl bg-gray-900 text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

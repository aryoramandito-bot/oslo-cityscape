import { useAppContext } from '../../context/AppContext';
import { useConfetti } from '../../hooks/useConfetti';

export default function CityIntroModal() {
  const { activeIntroCity, setActiveIntroCity } = useAppContext();
  const { triggerConfetti } = useConfetti();

  if (!activeIntroCity) return null;

  const city = activeIntroCity;
  const isBandung = city === 'bandung';
  const isSolo = city === 'solo';

  const handleClose = () => {
    setActiveIntroCity(null);
    triggerConfetti();
  };

  // Background styling
  const bgGradient = isSolo
    ? 'linear-gradient(135deg, rgba(5,150,105,0.15) 0%, rgba(255,255,255,0.98) 40%, rgba(4,120,87,0.1) 100%)'
    : isBandung
    ? 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(255,255,255,0.98) 40%, rgba(245,158,11,0.1) 100%)'
    : 'linear-gradient(135deg, rgba(255,152,152,0.15) 0%, rgba(255,255,255,0.98) 40%, rgba(255,152,152,0.1) 100%)';

  const badgeColor = isSolo ? 'bg-emerald-600 text-white' : isBandung ? 'bg-amber-500 text-white' : 'bg-[#ff9898] text-white';
  const accentTextColor = isSolo ? 'text-emerald-600' : isBandung ? 'text-amber-500' : 'text-[#ff9898]';
  const badgeCode = isSolo ? 'SL' : isBandung ? 'BD' : 'JK';
  const chapterRegion = isSolo ? 'City Chapter · Central Java' : isBandung ? 'City Chapter · West Java' : 'Capital Chapter · DKI Jakarta';
  const cityName = isSolo ? 'Solo (Surakarta)' : isBandung ? 'Bandung' : 'Jakarta';
  const tagline = isSolo ? 'The Spirit of Java · Kota Budaya & Batik' : isBandung ? 'Paris Van Java · Kota Kembang' : 'Heart of Nusantara · Big Durian';

  const description = isSolo
    ? "Immerse in the cultural heartland of classical Java — sacred royal courts of Kasunanan and Mangkunegaran, historic world-class batik quarters, timeless performing arts, and royal culinary treasures."
    : isBandung
    ? "Discover West Java's cultural capital — Dutch colonial elegance, Sundanese artistry, active volcanoes, world-class pastries, and Indonesia's most beloved street foods."
    : "Explore the bustling Indonesian metropolis — centuries of colonial maritime history, royal Betawi heritage, soaring modern skyscrapers, and vibrant street markets.";

  const stats = isSolo
    ? { attractions: 16, culinary: 16, total: 32 }
    : isBandung
    ? { attractions: 17, culinary: 19, total: 36 }
    : { attractions: 19, culinary: 15, total: 34 };

  const buttonClass = isSolo
    ? 'bg-emerald-600 hover:bg-emerald-700'
    : isBandung
    ? 'bg-amber-500 hover:bg-amber-600'
    : 'bg-[#ff9898] hover:bg-[#ff8080]';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in duration-300"
      style={{
        background: bgGradient,
        backdropFilter: 'blur(25px)',
      }}
    >
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm mx-auto">
        {/* City Badge Icon */}
        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl mb-4 ${badgeColor}`}>
          <span className="font-outfit font-extrabold text-2xl">{badgeCode}</span>
        </div>

        {/* Chapter Label */}
        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] font-mono mb-1.5 ${accentTextColor}`}>
          {chapterRegion}
        </span>

        {/* Headline */}
        <h1 className="text-3xl font-extrabold text-gray-900 font-outfit leading-tight mb-1">
          {cityName}
        </h1>
        <p className={`text-xs font-semibold mb-4 ${accentTextColor}`}>
          {tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed mb-6">
          {description}
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {isSolo ? (
            <>
              <span className="px-3 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-[10px] font-semibold text-emerald-700">
                👑 Royal Palaces
              </span>
              <span className="px-3 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-[10px] font-semibold text-emerald-700">
                🎨 Heritage Batik
              </span>
              <span className="px-3 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-[10px] font-semibold text-emerald-700">
                🎵 Lokananta Vinyl
              </span>
              <span className="px-3 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-[10px] font-semibold text-emerald-700">
                🥘 Javanese Cuisine
              </span>
              <span className="px-3 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-[10px] font-semibold text-emerald-700">
                🏛️ Classical Antiquities
              </span>
            </>
          ) : isBandung ? (
            <>
              <span className="px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-[10px] font-semibold text-amber-700">
                🏛️ Colonial Heritage
              </span>
              <span className="px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-[10px] font-semibold text-amber-700">
                🌋 Volcanic Wonders
              </span>
              <span className="px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-[10px] font-semibold text-amber-700">
                🎵 Angklung Music
              </span>
              <span className="px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-[10px] font-semibold text-amber-700">
                🥘 Sundanese Cuisine
              </span>
              <span className="px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-[10px] font-semibold text-amber-700">
                ☕ Heritage Coffee
              </span>
            </>
          ) : (
            <>
              <span className="px-3 py-1 bg-rose-50 border border-rose-200/60 rounded-full text-[10px] font-semibold text-rose-700">
                🏛️ Old Batavia
              </span>
              <span className="px-3 py-1 bg-rose-50 border border-rose-200/60 rounded-full text-[10px] font-semibold text-rose-700">
                ⭐ Monas Monument
              </span>
              <span className="px-3 py-1 bg-rose-50 border border-rose-200/60 rounded-full text-[10px] font-semibold text-rose-700">
                🍲 Soto Betawi
              </span>
              <span className="px-3 py-1 bg-rose-50 border border-rose-200/60 rounded-full text-[10px] font-semibold text-rose-700">
                🎭 Ondel-Ondel
              </span>
            </>
          )}
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-6 mb-7 bg-white/80 border border-gray-200/80 px-5 py-3 rounded-2xl shadow-xs">
          <div className="text-center">
            <div className={`text-xl font-extrabold font-outfit ${accentTextColor}`}>
              {stats.attractions}
            </div>
            <div className="text-[10px] text-gray-400 font-medium">Attractions</div>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            <div className={`text-xl font-extrabold font-outfit ${accentTextColor}`}>
              {stats.culinary}
            </div>
            <div className="text-[10px] text-gray-400 font-medium">Culinary</div>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            <div className={`text-xl font-extrabold font-outfit ${accentTextColor}`}>
              {stats.total}
            </div>
            <div className="text-[10px] text-gray-400 font-medium">Total Sites</div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClose}
          className={`w-full py-3.5 rounded-2xl text-white font-outfit font-bold text-xs shadow-lg transition-transform active:scale-98 cursor-pointer ${buttonClass}`}
        >
          Explore {isSolo ? 'Solo' : isBandung ? 'Bandung' : 'Jakarta'} Chapter →
        </button>

        <button
          onClick={handleClose}
          className="mt-3 text-[11px] text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          Skip Introduction
        </button>
      </div>
    </div>
  );
}

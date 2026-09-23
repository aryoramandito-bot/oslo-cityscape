import { useAppContext } from '../../context/AppContext';
import { useConfetti } from '../../hooks/useConfetti';

export default function CityIntroModal() {
  const { activeIntroCity, setActiveIntroCity } = useAppContext();
  const { triggerConfetti } = useConfetti();

  if (!activeIntroCity) return null;

  const city = activeIntroCity;
  const isLaweyan = city === 'laweyan';
  const isSolo = city === 'solo';
  const isBandung = city === 'bandung';

  const handleClose = () => {
    setActiveIntroCity(null);
    triggerConfetti();
  };

  const badgeCode = isLaweyan ? 'LW' : isSolo ? 'SL' : isBandung ? 'BD' : 'JK';
  const chapterRegion = isLaweyan
    ? 'Heritage Chapter · Jawa Tengah'
    : isSolo
    ? 'City Chapter · Central Java'
    : isBandung
    ? 'City Chapter · West Java'
    : 'Capital Chapter · DKI Jakarta';

  const cityName = isLaweyan ? 'Desa Laweyan' : isSolo ? 'Solo (Surakarta)' : isBandung ? 'Bandung' : 'Jakarta';
  const tagline = isLaweyan
    ? 'Kampung Batik Tertua · Warisan Saudagar Pajang'
    : isSolo
    ? 'The Spirit of Java · Kota Budaya & Batik'
    : isBandung
    ? 'Paris Van Java · Kota Kembang'
    : 'Heart of Nusantara · Big Durian';

  const description = isLaweyan
    ? "Step into Java's oldest autonomous batik quarter — 16th-century Pajang origins, towering fortress walls (Gang Senggol), historic master canting studios, and ancestral confections."
    : isSolo
    ? "Immerse in the cultural heartland of classical Java — sacred royal courts of Kasunanan and Mangkunegaran, historic world-class batik quarters, timeless performing arts, and royal culinary treasures."
    : isBandung
    ? "Discover West Java's cultural capital — Dutch colonial elegance, Sundanese artistry, active volcanoes, world-class pastries, and Indonesia's most beloved street foods."
    : "Explore the bustling Indonesian metropolis — centuries of colonial maritime history, royal Betawi heritage, soaring modern skyscrapers, and vibrant street markets.";

  const stats = isLaweyan
    ? { attractions: 14, culinary: 12, total: 26 }
    : isSolo
    ? { attractions: 16, culinary: 16, total: 32 }
    : isBandung
    ? { attractions: 17, culinary: 19, total: 36 }
    : { attractions: 19, culinary: 15, total: 34 };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-900/40 backdrop-blur-2xl animate-in fade-in duration-300"
    >
      {/* Translucent Liquid Glass Intro Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm mx-auto bg-white/85 backdrop-blur-2xl p-7 rounded-3xl border border-white/80 shadow-2xl ring-1 ring-stone-900/5">
        {/* City Badge Icon */}
        <div className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg mb-4 bg-gradient-to-br from-[#d85d5d] to-[#c64f4f] text-white">
          <span className="font-outfit font-extrabold text-2xl">{badgeCode}</span>
        </div>

        {/* Chapter Label */}
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono mb-1.5 text-[#d85d5d]">
          {chapterRegion}
        </span>

        {/* Headline */}
        <h1 className="text-2xl font-extrabold text-stone-900 font-outfit leading-tight mb-1">
          {cityName}
        </h1>
        <p className="text-xs font-semibold mb-3 text-[#d85d5d]">
          {tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-stone-500 leading-relaxed mb-5">
          {description}
        </p>

        {/* Feature Liquid Glass Chips */}
        <div className="flex flex-wrap gap-1.5 justify-center mb-5">
          {isLaweyan ? (
            <>
              <span className="px-2.5 py-1 bg-white/80 border border-stone-200/80 rounded-full text-[10px] font-semibold text-stone-700 shadow-2xs">
                🧱 Gang Senggol Alleys
              </span>
              <span className="px-2.5 py-1 bg-white/80 border border-stone-200/80 rounded-full text-[10px] font-semibold text-stone-700 shadow-2xs">
                🌿 Pajang 1546 Heritage
              </span>
              <span className="px-2.5 py-1 bg-white/80 border border-stone-200/80 rounded-full text-[10px] font-semibold text-stone-700 shadow-2xs">
                🎨 Batik Tulis & Canting
              </span>
            </>
          ) : isSolo ? (
            <>
              <span className="px-2.5 py-1 bg-white/80 border border-stone-200/80 rounded-full text-[10px] font-semibold text-stone-700 shadow-2xs">
                👑 Royal Palaces
              </span>
              <span className="px-2.5 py-1 bg-white/80 border border-stone-200/80 rounded-full text-[10px] font-semibold text-stone-700 shadow-2xs">
                🎨 Heritage Batik
              </span>
              <span className="px-2.5 py-1 bg-white/80 border border-stone-200/80 rounded-full text-[10px] font-semibold text-stone-700 shadow-2xs">
                🥘 Javanese Cuisine
              </span>
            </>
          ) : isBandung ? (
            <>
              <span className="px-2.5 py-1 bg-white/80 border border-stone-200/80 rounded-full text-[10px] font-semibold text-stone-700 shadow-2xs">
                🏛️ Colonial Heritage
              </span>
              <span className="px-2.5 py-1 bg-white/80 border border-stone-200/80 rounded-full text-[10px] font-semibold text-stone-700 shadow-2xs">
                🌋 Volcanic Wonders
              </span>
              <span className="px-2.5 py-1 bg-white/80 border border-stone-200/80 rounded-full text-[10px] font-semibold text-stone-700 shadow-2xs">
                ☕ Heritage Coffee
              </span>
            </>
          ) : (
            <>
              <span className="px-2.5 py-1 bg-white/80 border border-stone-200/80 rounded-full text-[10px] font-semibold text-stone-700 shadow-2xs">
                🏛️ Old Batavia
              </span>
              <span className="px-2.5 py-1 bg-white/80 border border-stone-200/80 rounded-full text-[10px] font-semibold text-stone-700 shadow-2xs">
                ⭐ Monas Monument
              </span>
              <span className="px-2.5 py-1 bg-white/80 border border-stone-200/80 rounded-full text-[10px] font-semibold text-stone-700 shadow-2xs">
                🍲 Soto Betawi
              </span>
            </>
          )}
        </div>

        {/* Stats Row in Liquid Glass */}
        <div className="flex items-center gap-5 mb-6 bg-white/70 backdrop-blur-md border border-stone-200/70 px-5 py-3 rounded-2xl shadow-2xs w-full justify-around">
          <div className="text-center">
            <div className="text-xl font-extrabold font-outfit text-[#d85d5d] tabular-nums">
              {stats.attractions}
            </div>
            <div className="text-[10px] text-stone-400 font-medium">Attractions</div>
          </div>
          <div className="w-px h-8 bg-stone-200" />
          <div className="text-center">
            <div className="text-xl font-extrabold font-outfit text-[#d85d5d] tabular-nums">
              {stats.culinary}
            </div>
            <div className="text-[10px] text-stone-400 font-medium">Culinary</div>
          </div>
          <div className="w-px h-8 bg-stone-200" />
          <div className="text-center">
            <div className="text-xl font-extrabold font-outfit text-[#d85d5d] tabular-nums">
              {stats.total}
            </div>
            <div className="text-[10px] text-stone-400 font-medium">Total Sites</div>
          </div>
        </div>

        {/* Action Button: Liquid Oslo Rose */}
        <button
          onClick={handleClose}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d85d5d] to-[#c64f4f] hover:from-[#c64f4f] hover:to-[#b94444] text-white font-outfit font-bold text-xs shadow-[0_8px_20px_rgba(216,93,93,0.3)] transition-all active:scale-[0.98] cursor-pointer"
        >
          Explore {isLaweyan ? 'Desa Laweyan' : isSolo ? 'Solo' : isBandung ? 'Bandung' : 'Jakarta'} Chapter →
        </button>

        <button
          onClick={handleClose}
          className="mt-3 text-[11px] text-stone-400 hover:text-stone-600 cursor-pointer"
        >
          Skip Introduction
        </button>
      </div>
    </div>
  );
}

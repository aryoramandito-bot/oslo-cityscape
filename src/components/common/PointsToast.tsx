import { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function PointsToast() {
  const { pointsToast, setPointsToast } = useAppContext();

  useEffect(() => {
    if (pointsToast) {
      const timer = setTimeout(() => {
        setPointsToast(null);
      }, 2700);
      return () => clearTimeout(timer);
    }
  }, [pointsToast, setPointsToast]);

  if (!pointsToast) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[200] max-w-xs w-full px-4 pointer-events-none animate-in slide-in-from-top-4 duration-300">
      <div className="bg-[#ff9898] text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 border border-white/30 backdrop-blur-md">
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm shrink-0">
          {pointsToast.icon}
        </div>
        <div className="flex flex-col text-left min-w-0">
          <span className="text-[8.5px] uppercase tracking-wider text-white/90 font-mono font-bold">
            Points Earned!
          </span>
          <span className="text-xs font-outfit font-extrabold truncate">
            {pointsToast.message}
          </span>
        </div>
      </div>
    </div>
  );
}

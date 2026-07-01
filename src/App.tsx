import { useState } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import { AppProvider } from './context/AppContext';

export default function App() {
  const [isActiveToday, setIsActiveToday] = useState(false);

  return (
    <AppProvider>
      <div className="mx-auto max-w-md h-[100dvh] bg-[#0c0c0c] text-gray-200 border-x border-[#222] overflow-hidden flex flex-col relative shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        {!isActiveToday ? (
          <Onboarding onComplete={() => setIsActiveToday(true)} />
        ) : (
          <Dashboard />
        )}
      </div>
    </AppProvider>
  );
}

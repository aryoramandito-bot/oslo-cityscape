import { useState, useEffect, useRef, useCallback, createContext, useContext, ReactNode } from 'react';

export type SessionState = 'active' | 'warning' | 'locked';
export type TimeoutPreset = '2m' | '15m' | '30m' | 'never';

export interface UseSessionManagerReturn {
  sessionState: SessionState;
  warningCountdown: number;
  sessionStartedAt: Date;
  timeoutPreset: TimeoutPreset;
  setTimeoutPreset: (p: TimeoutPreset) => void;
  extendSession: () => void;
  lockNow: () => void;
  unlock: () => void;
  triggerDemoWarning: () => void;
}

const TIMEOUT_MS: Record<TimeoutPreset, number> = {
  '2m': 2 * 60 * 1000,
  '15m': 15 * 60 * 1000,
  '30m': 30 * 60 * 1000,
  'never': Infinity,
};

const WARNING_LEAD_TIME_MS = 60 * 1000; // 60 seconds before timeout
const STORAGE_KEY_TIMEOUT_PRESET = 'oslo_session_timeout_preset';

export function useSessionManagerInternal(): UseSessionManagerReturn {
  const [sessionState, setSessionState] = useState<SessionState>('active');
  const [warningCountdown, setWarningCountdown] = useState<number>(60);
  const [sessionStartedAt] = useState<Date>(() => new Date());
  const [timeoutPreset, setTimeoutPresetState] = useState<TimeoutPreset>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TIMEOUT_PRESET);
    if (saved === '2m' || saved === '15m' || saved === '30m' || saved === 'never') {
      return saved;
    }
    return '15m';
  });

  const lastActivityRef = useRef<number>(Date.now());
  const stateRef = useRef<SessionState>(sessionState);
  stateRef.current = sessionState;

  const presetRef = useRef<TimeoutPreset>(timeoutPreset);
  presetRef.current = timeoutPreset;

  const setTimeoutPreset = useCallback((preset: TimeoutPreset) => {
    setTimeoutPresetState(preset);
    localStorage.setItem(STORAGE_KEY_TIMEOUT_PRESET, preset);
    lastActivityRef.current = Date.now();
  }, []);

  // Record user interaction
  const recordActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  // Listen to user inputs on window and document
  useEffect(() => {
    const handleActivity = () => {
      if (stateRef.current === 'active') {
        recordActivity();
      }
    };

    const windowEvents: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
    windowEvents.forEach((evt) => window.addEventListener(evt, handleActivity, { passive: true }));
    document.addEventListener('visibilitychange', handleActivity);

    return () => {
      windowEvents.forEach((evt) => window.removeEventListener(evt, handleActivity));
      document.removeEventListener('visibilitychange', handleActivity);
    };
  }, [recordActivity]);

  // Extend / Refresh session
  const extendSession = useCallback(() => {
    lastActivityRef.current = Date.now();
    setWarningCountdown(60);
    setSessionState('active');
  }, []);

  // Manual Lock
  const lockNow = useCallback(() => {
    setSessionState('locked');
  }, []);

  // Unlock session
  const unlock = useCallback(() => {
    lastActivityRef.current = Date.now();
    setWarningCountdown(60);
    setSessionState('active');
  }, []);

  // Stakeholder fast demo trigger
  const triggerDemoWarning = useCallback(() => {
    setWarningCountdown(10);
    setSessionState('warning');
  }, []);

  // Inactivity check interval loop
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const currentPreset = presetRef.current;
      const timeoutLimit = TIMEOUT_MS[currentPreset];

      if (timeoutLimit === Infinity) {
        return;
      }

      if (stateRef.current === 'active') {
        const elapsed = Date.now() - lastActivityRef.current;
        const warningThreshold = Math.max(0, timeoutLimit - WARNING_LEAD_TIME_MS);

        if (elapsed >= timeoutLimit) {
          setSessionState('locked');
        } else if (elapsed >= warningThreshold) {
          const remainingSecs = Math.max(1, Math.ceil((timeoutLimit - elapsed) / 1000));
          setWarningCountdown(Math.min(60, remainingSecs));
          setSessionState('warning');
        }
      } else if (stateRef.current === 'warning') {
        setWarningCountdown((prev) => {
          if (prev <= 1) {
            setSessionState('locked');
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return {
    sessionState,
    warningCountdown,
    sessionStartedAt,
    timeoutPreset,
    setTimeoutPreset,
    extendSession,
    lockNow,
    unlock,
    triggerDemoWarning,
  };
}

// Lightweight Context so any child component can access session manager
const SessionContext = createContext<UseSessionManagerReturn | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSessionManagerInternal();
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

export function useSession(): UseSessionManagerReturn {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

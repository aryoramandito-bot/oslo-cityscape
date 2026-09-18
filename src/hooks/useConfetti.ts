import confetti from 'canvas-confetti';

export function useConfetti() {
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff9898', '#f59e0b', '#10b981', '#6366f1', '#ec4899']
      });
    } catch {
      // Fallback if canvas is unavailable
    }
  };

  const triggerCelebration = () => {
    try {
      // Two bursts for grand milestone
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff9898', '#f59e0b', '#3b82f6']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff9898', '#f59e0b', '#3b82f6']
      });
    } catch {
      // Fallback
    }
  };

  return { triggerConfetti, triggerCelebration };
}

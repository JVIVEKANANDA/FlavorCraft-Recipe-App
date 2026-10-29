import confetti from 'canvas-confetti';

export function triggerConfetti(count = 70) {
  try {
    confetti({
      particleCount: count,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#3b82f6']
    });
  } catch (e) {
    // Fallback if canvas is unavailable
  }
}

export function triggerPrideConfetti() {
  try {
    const end = Date.now() + 1000;
    const colors = ['#f97316', '#ec4899', '#10b981'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch (e) {}
}

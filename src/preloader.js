/**
 * Preloader Module — Minimalist 0-100% Counter & Fade Animation
 */
export function initPreloader() {
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('preloader-counter');
  
  if (!preloader || !counterEl) return;

  let currentCount = 0;
  const targetCount = 100;
  const duration = 1600; // ms
  const intervalTime = 20; // ms
  const step = Math.ceil(targetCount / (duration / intervalTime));

  const timer = setInterval(() => {
    currentCount += step;
    if (currentCount >= targetCount) {
      currentCount = targetCount;
      counterEl.textContent = `${currentCount}%`;
      clearInterval(timer);

      // Smooth curtain reveal delay
      setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.style.overflow = 'auto';
      }, 300);
    } else {
      counterEl.textContent = `${currentCount}%`;
    }
  }, intervalTime);
}

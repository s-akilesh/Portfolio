/* Flyer Eats UX Case Study Interactions & Scroll Animations */

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for subtle scroll reveals
  const revealElements = document.querySelectorAll(
    '.cs-section, .cs-hero-header, .cs-meta-grid, .cs-hero-image-frame, .cs-highlight-card, .cs-insight-card, .cs-opp-card, .cs-solution-frame, .cs-design-card, .cs-comp-card, .cs-outcome-card, .cs-final-visual-frame'
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });

  // Animated Numbers Counter
  const countElements = document.querySelectorAll('.cs-metric-num[data-count]');
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetNum = parseInt(target.getAttribute('data-count'), 10);
        let startNum = 0;
        const duration = 1200;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = targetNum / steps;

        const timer = setInterval(() => {
          startNum += increment;
          if (startNum >= targetNum) {
            target.textContent = targetNum;
            clearInterval(timer);
          } else {
            target.textContent = Math.floor(startNum);
          }
        }, stepTime);

        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  countElements.forEach((el) => countObserver.observe(el));
});

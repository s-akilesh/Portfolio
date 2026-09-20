/**
 * Clean Tab Transition Engine
 * Provides smooth, elegant cross-fade & slide transitions between About tabs.
 * Eliminates particle clutter and desync artifacts.
 */

let canvas = null;
let ctx = null;

export function initDustParticleEngine() {
  canvas = document.getElementById('dust-particle-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

export function triggerDustDisperse(direction, switchTabFn, onComplete) {
  if (canvas && ctx) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    canvas.classList.remove('active');
  }

  const contentLayer = document.getElementById('work-style-content-layer');
  const toolsSection = document.getElementById('tools-section');

  if (direction === 'forward') {
    // -------------------------------------------------------------
    // FORWARD: Work Style -> Tools
    // -------------------------------------------------------------
    if (contentLayer) {
      contentLayer.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      contentLayer.style.opacity = '0';
      contentLayer.style.transform = 'translate(-50%, -52%) scale(0.98)';
    }

    setTimeout(() => {
      if (typeof switchTabFn === 'function') switchTabFn();
      if (contentLayer) {
        contentLayer.style.transition = '';
        contentLayer.style.opacity = '';
        contentLayer.style.transform = '';
      }
      if (typeof onComplete === 'function') onComplete();
    }, 250);

  } else {
    // -------------------------------------------------------------
    // REVERSE: Tools -> Work Style
    // -------------------------------------------------------------
    if (toolsSection) {
      toolsSection.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      toolsSection.style.opacity = '0';
      toolsSection.style.transform = 'translateY(15px)';
    }

    setTimeout(() => {
      if (toolsSection) {
        toolsSection.style.opacity = '';
        toolsSection.style.transform = '';
        toolsSection.style.transition = '';
      }

      if (typeof switchTabFn === 'function') switchTabFn();

      if (typeof window.updateWorkStyleScrollytelling === 'function') {
        window.updateWorkStyleScrollytelling();
      }

      if (typeof onComplete === 'function') onComplete();
    }, 250);
  }
}

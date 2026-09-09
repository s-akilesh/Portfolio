/**
 * Luminous Dust Particle Transition Engine
 * Provides smooth, elegant particle atmosphere & seamless transitions between About tabs.
 * Eliminates DOM-sampling desync and double-text artifacts.
 */

let canvas = null;
let ctx = null;
let animId = null;
let particles = [];

export function initDustParticleEngine() {
  canvas = document.getElementById('dust-particle-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');

  function resizeCanvas() {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });
}

export function triggerDustDisperse(direction, switchTabFn, onComplete) {
  if (!canvas) {
    canvas = document.getElementById('dust-particle-canvas');
    if (canvas) ctx = canvas.getContext('2d');
  }
  if (!canvas || !ctx) {
    if (typeof switchTabFn === 'function') switchTabFn();
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const contentLayer = document.getElementById('work-style-content-layer');
  const toolsSection = document.getElementById('tools-section');

  const colors = [
    'rgba(255, 255, 255, ',
    'rgba(56, 189, 248, ',
    'rgba(236, 199, 20, ',
    'rgba(168, 85, 247, '
  ];

  particles = [];

  if (direction === 'forward') {
    // -------------------------------------------------------------
    // FORWARD: Work Style -> Tools
    // -------------------------------------------------------------
    canvas.classList.add('active');

    // Smoothly dissolve the DOM content layer
    if (contentLayer) {
      contentLayer.style.transition = 'opacity 0.35s ease, transform 0.35s ease, filter 0.35s ease';
      contentLayer.style.opacity = '0';
      contentLayer.style.transform = 'translate(-50%, -54%) scale(0.95)';
      contentLayer.style.filter = 'blur(6px)';
    }

    // Generate high-density luminous floating dust explosion from center
    const count = 280;
    const cx = window.innerWidth * 0.5;
    const cy = window.innerHeight * 0.5;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (window.innerWidth * 0.38);
      const speed = Math.random() * 3.2 + 0.8;

      particles.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist * 0.6,
        vx: (Math.random() - 0.5) * 4.5,
        vy: -Math.random() * 3.8 - 0.8,
        size: Math.random() * 3.0 + 1.2,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: Math.random() * 0.012 + 0.008,
        spin: Math.random() * Math.PI * 2
      });
    }

    // Switch tab midway through the burst (350ms)
    setTimeout(() => {
      if (typeof switchTabFn === 'function') switchTabFn();
      if (contentLayer) {
        contentLayer.style.transition = '';
        contentLayer.style.filter = '';
      }
    }, 350);

    const startTime = performance.now();
    const duration = 900;

    function renderForward(now) {
      const elapsed = now - startTime;
      const globalProgress = Math.min(1.0, elapsed / duration);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(p.spin + elapsed * 0.004) * 0.8;
        p.y += p.vy;
        p.vy *= 0.98;
        p.vx *= 0.98;
        p.spin += 0.04;

        const fadeOut = Math.max(0, 1.0 - globalProgress);
        const alpha = fadeOut * 0.85;

        if (alpha > 0.001) {
          ctx.fillStyle = p.colorPrefix + alpha.toFixed(3) + ')';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * fadeOut, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (globalProgress < 1.0) {
        animId = requestAnimationFrame(renderForward);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.classList.remove('active');
        if (typeof onComplete === 'function') onComplete();
      }
    }

    if (animId) cancelAnimationFrame(animId);
    animId = requestAnimationFrame(renderForward);

  } else {
    // -------------------------------------------------------------
    // REVERSE: Tools -> Work Style
    // -------------------------------------------------------------
    if (toolsSection) {
      toolsSection.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      toolsSection.style.opacity = '0';
      toolsSection.style.transform = 'translateY(20px)';
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

      canvas.classList.add('active');

      const count = 240;
      const cx = window.innerWidth * 0.5;
      const cy = window.innerHeight * 0.5;

      particles = [];
      for (let i = 0; i < count; i++) {
        const targetAngle = Math.random() * Math.PI * 2;
        const targetDist = Math.random() * (window.innerWidth * 0.35);
        const targetX = cx + Math.cos(targetAngle) * targetDist;
        const targetY = cy + Math.sin(targetAngle) * targetDist * 0.5;

        const startX = targetX + (Math.random() - 0.5) * 350;
        const startY = targetY - Math.random() * 220 - 40;

        particles.push({
          startX: startX,
          startY: startY,
          targetX: targetX,
          targetY: targetY,
          x: startX,
          y: startY,
          size: Math.random() * 2.8 + 1.2,
          colorPrefix: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      const startTime = performance.now();
      const duration = 850;

      function renderReverse(now) {
        const elapsed = now - startTime;
        const globalProgress = Math.min(1.0, elapsed / duration);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
          const flyProgress = Math.min(1.0, elapsed / 650);
          const ease = 1 - Math.pow(1 - flyProgress, 2.5);

          p.x = p.startX + (p.targetX - p.startX) * ease;
          p.y = p.startY + (p.targetY - p.startY) * ease;

          let alpha = Math.min(1.0, elapsed / 250);
          if (elapsed > 550) {
            alpha = Math.max(0, 1.0 - (elapsed - 550) / 300);
          }

          if (alpha > 0.001) {
            ctx.fillStyle = p.colorPrefix + (alpha * 0.85).toFixed(3) + ')';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * Math.max(0.3, alpha), 0, Math.PI * 2);
            ctx.fill();
          }
        });

        if (globalProgress < 1.0) {
          animId = requestAnimationFrame(renderReverse);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.classList.remove('active');
          if (typeof onComplete === 'function') onComplete();
        }
      }

      if (animId) cancelAnimationFrame(animId);
      animId = requestAnimationFrame(renderReverse);

    }, 350);
  }
}

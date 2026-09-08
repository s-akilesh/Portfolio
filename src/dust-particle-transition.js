/**
 * Text & Card Dust Particle Transition Engine
 * Pixel-accurate text sampling: Samples exact text characters, paragraph lines, and card shapes.
 * Disintegrates text directly into fine glowing dust particles on forward scroll,
 * and converges dust back into solid text on reverse scroll.
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

/**
 * Samples pixel coordinates and colors directly from visible text elements & cards
 */
/**
 * Samples pixel coordinates and colors directly from visible text elements & cards
 */
function sampleTextAndDOMParticles() {
  const elements = document.querySelectorAll(
    '#work-style-content-layer .about-section-title, ' +
    '#work-style-content-layer .about-section-subtitle, ' +
    '#work-style-content-layer .process-card-title, ' +
    '#work-style-content-layer .process-card-desc, ' +
    '#work-style-content-layer .process-card-flow, ' +
    '#work-style-content-layer .process-card, ' +
    '#work-style-content-layer .axis-node span'
  );

  const sampledParticles = [];

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const style = window.getComputedStyle(el);
    const color = style.color || 'rgba(255, 255, 255, 1)';
    const text = el.innerText ? el.innerText.trim() : '';

    const off = document.createElement('canvas');
    off.width = Math.ceil(rect.width);
    off.height = Math.ceil(rect.height);
    const octx = off.getContext('2d');

    if (text && el.children.length === 0) {
      // Draw text string onto offscreen canvas
      octx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      octx.fillStyle = color;
      octx.textAlign = style.textAlign === 'center' ? 'center' : 'left';
      octx.textBaseline = 'top';

      const xPos = style.textAlign === 'center' ? off.width / 2 : 0;
      const words = text.split(' ');
      let line = '';
      let yPos = 0;
      const lineHeight = parseFloat(style.lineHeight) || (parseFloat(style.fontSize) * 1.3);

      words.forEach((word) => {
        const testLine = line + word + ' ';
        const metrics = octx.measureText(testLine);
        if (metrics.width > off.width && line !== '') {
          octx.fillText(line, xPos, yPos);
          line = word + ' ';
          yPos += lineHeight;
        } else {
          line = testLine;
        }
      });
      octx.fillText(line, xPos, yPos);
    } else if (el.classList.contains('process-card')) {
      // Draw card border and background
      octx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      octx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      octx.lineWidth = 1.5;
      if (octx.roundRect) {
        octx.beginPath();
        octx.roundRect(1, 1, off.width - 2, off.height - 2, 12);
        octx.fill();
        octx.stroke();
      } else {
        octx.fillRect(0, 0, off.width, off.height);
      }
    }

    try {
      const imgData = octx.getImageData(0, 0, off.width, off.height);
      const data = imgData.data;

      // Sample every 3rd pixel for high density and smooth performance
      const step = 3;
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const idx = (y * off.width + x) * 4;
          const a = data[idx + 3];
          if (a > 25) {
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            sampledParticles.push({
              origX: rect.left + x,
              origY: rect.top + y,
              colorPrefix: `rgba(${r}, ${g}, ${b}, `
            });
          }
        }
      }
    } catch (e) {
      // Fallback
    }
  });

  return sampledParticles;
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

  // Accent fallback colors if sampling yields few pixels
  const fallbackColors = [
    'rgba(255, 255, 255, ',
    'rgba(56, 189, 248, ',
    'rgba(168, 85, 247, ',
    'rgba(236, 199, 20, '
  ];

  particles = [];

  if (direction === 'forward') {
    // -------------------------------------------------------------
    // FORWARD: Disintegrate Text & Cards into floating dust -> Tools
    // -------------------------------------------------------------
    const textPixels = sampleTextAndDOMParticles();

    canvas.classList.add('active');

    if (contentLayer) {
      contentLayer.classList.remove('assemble-in');
      contentLayer.classList.add('disintegrate-out');
    }

    if (textPixels.length > 0) {
      textPixels.forEach((tp) => {
        // Explode outward & upward with gentle turbulent velocity
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 0.8;
        const vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 2;
        const vy = Math.sin(angle) * speed - Math.random() * 3.5 - 1.0;

        particles.push({
          x: tp.origX,
          y: tp.origY,
          vx: vx,
          vy: vy,
          size: Math.random() * 2.5 + 1.2,
          colorPrefix: tp.colorPrefix,
          life: 1.0,
          decay: Math.random() * 0.008 + 0.006,
          spin: Math.random() * Math.PI * 2
        });
      });
    } else {
      // Fallback particle creation
      const count = 400;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.4,
          y: window.innerHeight * 0.3 + Math.random() * window.innerHeight * 0.4,
          vx: (Math.random() - 0.5) * 4,
          vy: -Math.random() * 4 - 1.5,
          size: Math.random() * 3 + 1,
          colorPrefix: fallbackColors[Math.floor(Math.random() * fallbackColors.length)],
          life: 1.0,
          decay: Math.random() * 0.008 + 0.006,
          spin: Math.random() * Math.PI * 2
        });
      }
    }

    // Switch tab to Tools smoothly midway through the particle explosion (600ms)
    setTimeout(() => {
      if (typeof switchTabFn === 'function') switchTabFn();
    }, 600);

    const startTime = performance.now();
    const duration = 1200;

    function renderForward(now) {
      const elapsed = now - startTime;
      const globalProgress = Math.min(1.0, elapsed / duration);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(p.spin + elapsed * 0.003) * 0.6;
        p.y += p.vy;
        p.vy *= 0.985;
        p.vx *= 0.985;
        p.spin += 0.03;

        // Smooth fade-out of all particles from 1.0 to 0.0 over duration
        const fadeOut = Math.max(0, 1.0 - globalProgress);
        const alpha = fadeOut;

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
        if (contentLayer) {
          contentLayer.classList.remove('disintegrate-out');
          contentLayer.style.opacity = '0';
          contentLayer.style.visibility = 'hidden';
        }
        if (typeof onComplete === 'function') onComplete();
      }
    }

    if (animId) cancelAnimationFrame(animId);
    animId = requestAnimationFrame(renderForward);

  } else {
    // -------------------------------------------------------------
    // REVERSE: Zoom-out Tools -> assemble scattered dust back into Work Style text
    // -------------------------------------------------------------
    if (toolsSection) {
      toolsSection.classList.add('zoom-out-fade');
    }

    setTimeout(() => {
      if (toolsSection) {
        toolsSection.classList.remove('zoom-out-fade');
      }

      if (typeof switchTabFn === 'function') switchTabFn();

      if (typeof window.updateWorkStyleScrollytelling === 'function') {
        window.updateWorkStyleScrollytelling();
      }

      // Sample text pixels while Work Style section is active and rendered
      const textPixels = sampleTextAndDOMParticles();

      canvas.classList.add('active');

      if (contentLayer) {
        contentLayer.classList.remove('disintegrate-out');
        contentLayer.classList.add('assemble-in');
      }

      particles = [];

      if (textPixels.length > 0) {
        textPixels.forEach((tp) => {
          const startX = tp.origX + (Math.random() - 0.5) * window.innerWidth * 0.6;
          const startY = tp.origY - Math.random() * 260 - 50;

          particles.push({
            startX: startX,
            startY: startY,
            targetX: tp.origX,
            targetY: tp.origY,
            x: startX,
            y: startY,
            size: Math.random() * 2.5 + 1.2,
            colorPrefix: tp.colorPrefix
          });
        });
      } else {
        const count = 400;
        for (let i = 0; i < count; i++) {
          const targetX = window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.4;
          const targetY = window.innerHeight * 0.3 + Math.random() * window.innerHeight * 0.4;
          particles.push({
            startX: targetX + (Math.random() - 0.5) * 300,
            startY: targetY - 180,
            targetX: targetX,
            targetY: targetY,
            x: targetX,
            y: targetY - 180,
            size: Math.random() * 3 + 1,
            colorPrefix: fallbackColors[Math.floor(Math.random() * fallbackColors.length)]
          });
        }
      }

      const startTime = performance.now();
      const duration = 1300;
      const fadeStart = 850;

      function renderReverse(now) {
        const elapsed = now - startTime;
        const globalProgress = Math.min(1.0, elapsed / duration);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
          // Phase 1: Fly towards target over 0 -> 900ms
          const flyProgress = Math.min(1.0, elapsed / 900);
          const ease = 1 - Math.pow(1 - flyProgress, 2.5);

          p.x = p.startX + (p.targetX - p.startX) * ease;
          p.y = p.startY + (p.targetY - p.startY) * ease;

          // Phase 2: Fade IN (0 -> 350ms), hold solid (350 -> 850ms), dissolve OUT to 0 (850 -> 1300ms)
          let alpha = Math.min(1.0, elapsed / 350);

          if (elapsed > fadeStart) {
            const fadeProgress = (elapsed - fadeStart) / (duration - fadeStart);
            alpha = Math.max(0, 1.0 - fadeProgress);
          }

          if (alpha > 0.001) {
            ctx.fillStyle = p.colorPrefix + alpha.toFixed(3) + ')';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * Math.max(0.4, alpha), 0, Math.PI * 2);
            ctx.fill();
          }
        });

        if (globalProgress < 1.0) {
          animId = requestAnimationFrame(renderReverse);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.classList.remove('active');
          if (contentLayer) {
            contentLayer.style.opacity = '1';
            contentLayer.style.visibility = 'visible';
            contentLayer.style.transform = 'translate(-50%, -50%) scale(1)';
            contentLayer.style.filter = 'blur(0px)';
            contentLayer.classList.remove('assemble-in');
          }
          if (typeof onComplete === 'function') onComplete();
        }
      }

      if (animId) cancelAnimationFrame(animId);
      animId = requestAnimationFrame(renderReverse);

    }, 350);
  }
}

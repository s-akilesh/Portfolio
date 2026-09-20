/**
 * Fluid Canvas Module — "How I Work" Process Section with Sequential Card Stagger Reveal, Expanding Axis Line & Rotating (+) Nodes, About Me Section ("I LIKE MAKING THINGS MAKE SENSE"), Ultra-Compact Organic Liquid Jelly Portal with Slow Elegant Spinning Outer Circular Text ("AKILESH • UI/UX DESIGNER • PRODUCT ARCHITECT"), Velocity-Capped Inertial Lerp Smooth Scroll Engine, 3D Character Animation Video Section (Focused 3-Card Viewport Window), Organic Dust White Portal with 16:9 Image Slide & Interactive Negative-Color Blend Hover Cursor Circle ("EXPLORE") & Kinetic Dashed Grid
 */

let animFrameId = null;

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  });
}

export function initFluidCanvas() {
  if (animFrameId) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }

  const canvas = document.getElementById('hero-canvas');
  const topCanvas = document.getElementById('transition-canvas');
  const scrollWrapper = document.getElementById('hero-scroll-wrapper');
  const heroContent = document.getElementById('hero-content');
  const siteHeader = document.getElementById('site-header');
  const portraitWrapper = document.getElementById('about-portrait-wrapper');
  const portalClipPath = document.getElementById('projects-portal-path');

  if (!canvas) return;

  // Preload Mohave, Luckiest Guy, Moirai One & Archivo Black Google Fonts for canvas 2D text rendering
  if (typeof document !== 'undefined' && document.fonts && document.fonts.load) {
    document.fonts.load('400 48px "Luckiest Guy"');
    document.fonts.load('400 80px "Moirai One"');
    document.fonts.load('700 80px Mohave');
    document.fonts.load('700 24px Mohave');
    document.fonts.load('400 48px "Archivo Black"');
    document.fonts.load('900 48px Syne');
  }

  // Load Real Uploaded Akilesh Portrait Image
  const akileshPortraitImg = new Image();
  akileshPortraitImg.src = '/Akilesh_img.png';

  // Load 3D Avatar Workspace Fallback Image
  const avatar3dImg = new Image();
  avatar3dImg.src = '/akilesh_3d_avatar.png';

  // Load 16:9 Widescreen Showcase Images for 1-Column Canvas Slide
  const showcase1Img = new Image();
  showcase1Img.src = '/showcase_1.jpg';

  const showcase2Img = new Image();
  showcase2Img.src = '/showcase_2.jpg';

  const showcase3Img = new Image();
  showcase3Img.src = '/showcase_3.jpg';

  // Load Updated 3D Character Animation Video (Char_Anim.mp4 with Cache Busting)
  const animVideo = document.createElement('video');
  animVideo.src = '/Char_Anim.mp4?v=' + Date.now();
  animVideo.muted = true;
  animVideo.playsInline = true;
  animVideo.loop = true;
  animVideo.autoplay = true;
  animVideo.setAttribute('muted', '');
  animVideo.setAttribute('playsinline', '');
  animVideo.setAttribute('autoplay', '');
  animVideo.preload = 'auto';

  // Ensure continuous smooth 60fps playback
  const startVideoPlay = () => {
    animVideo.play().catch(() => {});
  };
  animVideo.addEventListener('canplay', startVideoPlay);
  startVideoPlay();

  // Load Enhanced Pure White Company Logos
  const dolpvizImg = new Image();
  dolpvizImg.src = '/dolpviz_logo_white.png';

  const saarcImg = new Image();
  saarcImg.src = '/saarcmasts_logo_white.png';

  // DOM Portrait wrapper is kept hidden since portrait is drawn directly inside clipped media canvas!
  if (portraitWrapper) {
    portraitWrapper.classList.add('hidden');
    portraitWrapper.style.opacity = '0';
    portraitWrapper.style.display = 'none';
  }

  const ctx = canvas.getContext('2d');
  const topCtx = topCanvas ? topCanvas.getContext('2d') : null;
  let width = 1200, height = 800, dpr = 1;

  // Mouse tracking & smooth lerp mouse coords
  let mouse = { x: -1000, y: -1000, speed: 0 };
  let smoothMouse = { x: 0, y: 0 };

  // Velocity-Capped Inertial Lerp Smooth Scroll Engine Variables
  let rawScrollProgress = 0;
  let smoothScrollProgress = 0;
  let cachedMaxScroll = 1;

  function updateScrollMetrics() {
    if (scrollWrapper) {
      cachedMaxScroll = Math.max(scrollWrapper.offsetHeight - window.innerHeight, 1);
      rawScrollProgress = Math.min(Math.max(window.scrollY / cachedMaxScroll, 0), 1);
    }
  }

  // Smooth lerp position & scale for interactive negative-blend Explore hover cursor circle
  let exploreCursor = { x: -100, y: -100, scale: 0.0 };

  // Persistent smooth lerp hover factors for bottom-left project title text overlay
  let img1HoverFactor = 0.0;
  let img2HoverFactor = 0.0;
  let img3HoverFactor = 0.0;

  // Persistent smooth lerp hover factors for 6 right-side Figma cards
  const cardHoverFactors = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  let colorTrailPoints = [];
  let lastTrailMouse = { x: -1000, y: -1000, time: 0 };
  let currentHeadHue = 320;
  let wavePhaseCounter = 0;
  let whiteDustParticles = [];

  // Kinetic Architectural Grid Setup
  const verticalGridLines = [
    { baseRatio: 0.12, speed: 0.08 },
    { baseRatio: 0.28, speed: 0.16 },
    { baseRatio: 0.46, speed: 0.05 },
    { baseRatio: 0.64, speed: 0.14 },
    { baseRatio: 0.82, speed: 0.09 },
    { baseRatio: 0.94, speed: 0.18 },
  ];

  const horizontalGridLines = [
    { baseRatio: 0.15, speed: 0.12 },
    { baseRatio: 0.32, speed: 0.06 },
    { baseRatio: 0.52, speed: 0.17 },
    { baseRatio: 0.72, speed: 0.09 },
    { baseRatio: 0.88, speed: 0.14 },
  ];

  // Media texture composition
  const mediaCanvas = document.createElement('canvas');
  const mctx = mediaCanvas.getContext('2d');

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    if (!width || !height) return;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    mediaCanvas.width = width * dpr;
    mediaCanvas.height = height * dpr;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    mctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.scale(dpr, dpr);
    mctx.scale(dpr, dpr);

    if (topCanvas && topCtx) {
      topCanvas.width = width * dpr;
      topCanvas.height = height * dpr;
      topCanvas.style.width = `${width}px`;
      topCanvas.style.height = `${height}px`;
      topCtx.setTransform(1, 0, 0, 1, 0, 0);
      topCtx.scale(dpr, dpr);
    }

    updateScrollMetrics();
  }

  let isImage2Past50Global = false;
  let isCursorInsideImageGlobal = false;
  let activeIndexGlobal = 0;
  let isOverDomeGlobal = false;
  let isDetailOverlayOpen = false;
  let domeHoverTimer = null;
  let domeHoverFactor = 0.0;
  let currentDomeCoords = { x: 0, y: 0 };

  window.openAboutDetail = function(x, y) {
    if (isDetailOverlayOpen) return;
    const overlay = document.getElementById('about-detail-overlay');
    if (!overlay) return;
    const targetX = x !== undefined ? x : (currentDomeCoords.x || window.innerWidth * 0.7);
    const targetY = y !== undefined ? y : (currentDomeCoords.y || window.innerHeight * 0.95);
    overlay.style.setProperty('--dome-x', `${targetX}px`);
    overlay.style.setProperty('--dome-y', `${targetY}px`);
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    isDetailOverlayOpen = true;

    document.body.style.overflow = 'hidden';

    if (siteHeader) {
      siteHeader.classList.add('hide-for-overlay');
    }

    // Start video playback
    const vid = document.getElementById('about-character-video');
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }
    // Reset overlay to default WORK STYLE tab panel
    const subnavItems = overlay.querySelectorAll('.subnav-item');
    const tabPanels = overlay.querySelectorAll('.about-tab-panel');
    subnavItems.forEach((b) => b.classList.remove('active'));
    tabPanels.forEach((p) => p.classList.remove('active'));

    const defaultBtn = overlay.querySelector('.subnav-item[data-target="#work-style-section"]');
    const defaultPanel = overlay.querySelector('#work-style-section');
    if (defaultBtn) defaultBtn.classList.add('active');
    if (defaultPanel) defaultPanel.classList.add('active');

    if (overlay) overlay.scrollTop = 0;

    requestAnimationFrame(() => {
      if (overlay) overlay.scrollTop = 0;
      if (typeof window.updateWorkStyleScrollytelling === 'function') {
        window.updateWorkStyleScrollytelling();
      }
    });

    if (typeof window.startAboutTabsFloat === 'function') {
      window.startAboutTabsFloat();
    }
  };

  window.closeAboutDetail = function() {
    const overlay = document.getElementById('about-detail-overlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    overlay.classList.remove('light-theme-tools');
    overlay.setAttribute('aria-hidden', 'true');
    isDetailOverlayOpen = false;

    if (typeof window.stopAboutTabsFloat === 'function') {
      window.stopAboutTabsFloat();
    }

    document.body.style.overflow = '';

    if (siteHeader) {
      siteHeader.classList.remove('hide-for-overlay');
    }

    if (domeHoverTimer) {
      clearTimeout(domeHoverTimer);
      domeHoverTimer = null;
    }
  };

  const backBtn = document.getElementById('about-detail-back-btn');
  if (backBtn) {
    const handleClose = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      window.closeAboutDetail();
    };
    backBtn.addEventListener('click', handleClose);
    backBtn.addEventListener('pointerdown', handleClose);
    backBtn.addEventListener('touchend', handleClose);
  }

  const handleShowcaseClick = (e) => {
    if (isDetailOverlayOpen) return;

    const rect = canvas ? canvas.getBoundingClientRect() : { left: 0, top: 0 };
    let clickX = width * 0.5;
    let clickY = height * 0.5;

    if (e) {
      if (e.clientX !== undefined) clickX = e.clientX - rect.left;
      if (e.clientY !== undefined) clickY = e.clientY - rect.top;
      if (e.changedTouches && e.changedTouches[0]) {
        clickX = e.changedTouches[0].clientX - rect.left;
        clickY = e.changedTouches[0].clientY - rect.top;
      }
    }

    if (isOverDomeGlobal || smoothScrollProgress < 0.40) {
      if (e && e.cancelable) {
        e.preventDefault();
      }
      window.openAboutDetail(clickX, clickY);
    }
  };

  [topCanvas, canvas].forEach((c) => {
    if (!c) return;
    c.addEventListener('click', handleShowcaseClick);
    c.addEventListener('pointerdown', (e) => {
      if ((isOverDomeGlobal || smoothScrollProgress < 0.40) && !isDetailOverlayOpen) {
        handleShowcaseClick(e);
      }
    });
    c.addEventListener('touchend', (e) => {
      if ((isOverDomeGlobal || smoothScrollProgress < 0.40) && !isDetailOverlayOpen) {
        handleShowcaseClick(e);
      }
    });
  });

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('scroll', updateScrollMetrics, { passive: true });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', resize, { passive: true });
  }
  resize();



  // Mouse move event & Base1 Iridescent Comet Trail Generation (Matching Reference Video)
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const nx = e.clientX - rect.left;
    const ny = e.clientY - rect.top;

    const dx = nx - mouse.x;
    const dy = ny - mouse.y;
    mouse.speed = Math.sqrt(dx * dx + dy * dy);

    mouse.x = nx;
    mouse.y = ny;

    if (nx > 0 && nx < width && ny > 0 && ny < height) {
      if (lastTrailMouse.x > -500) {
        const moveDist = Math.hypot(nx - lastTrailMouse.x, ny - lastTrailMouse.y);
        if (moveDist > 3) {
          const dirX = (nx - lastTrailMouse.x) / moveDist;
          const dirY = (ny - lastTrailMouse.y) / moveDist;

          // Forward impulse speed proportional to motion speed
          const impulse = Math.min(Math.max(moveDist * 0.14, 0.8), 4.5);

          // Advance chromatic hue along the rainbow spectrum
          currentHeadHue = (currentHeadHue + moveDist * 0.45) % 360;

          const steps = Math.max(1, Math.min(Math.floor(moveDist / 5.5), 18));

          for (let s = 1; s <= steps; s++) {
            const t = s / steps;
            const px = lastTrailMouse.x + (nx - lastTrailMouse.x) * t;
            const py = lastTrailMouse.y + (ny - lastTrailMouse.y) * t;
            const nodeHue = (currentHeadHue - (1 - t) * (moveDist * 0.45) + 360) % 360;

            colorTrailPoints.push({
              x: px,
              y: py,
              // Forward momentum when cursor stops
              vx: dirX * impulse,
              vy: dirY * impulse,
              birthHue: nodeHue,
              radius: Math.min(42 + mouse.speed * 0.26, 62),
              maxRadius: Math.min(130 + mouse.speed * 0.75, 185),
              life: 1.0,
              decay: Math.random() * 0.004 + 0.014, // Graceful smooth dissipation (~1.1s - 1.4s)
            });
          }
          lastTrailMouse.x = nx;
          lastTrailMouse.y = ny;
        }
      } else {
        lastTrailMouse.x = nx;
        lastTrailMouse.y = ny;
      }

      // Keep array optimal for consistent 60fps performance
      if (colorTrailPoints.length > 120) {
        colorTrailPoints.splice(0, colorTrailPoints.length - 120);
      }
    } else {
      lastTrailMouse.x = -1000;
      lastTrailMouse.y = -1000;
    }
  });

  let time = 0;

  // Automatic Typewriter State Variables
  let isTypingTriggered = false;
  let typedCharFloat = 0;

  // About Me Section Static Content
  const ABOUT_TITLE = "I LIKE MAKING THINGS MAKE SENSE.";
  const ABOUT_BIO = "I’m a UI/UX designer who looks beyond the interface. I understand the business, study the users, uncover the gaps, and turn complex problems into simple, useful experiences.";

  /**
   * Helper function to wrap canvas text nicely across lines (Left Aligned)
   */
  function wrapCanvasText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, currentY);
    return currentY + lineHeight;
  }

  /**
   * Helper function to wrap canvas text nicely across lines (Center Aligned)
   */
  function wrapCanvasTextCentered(context, text, centerX, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    const lines = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lines.push(line.trim());
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());

    context.textAlign = 'center';
    lines.forEach((l) => {
      context.fillText(l, centerX, currentY);
      currentY += lineHeight;
    });

    return currentY;
  }

  /**
   * Helper function to draw project work showcase image to FIT & FILL 100% of the canvas frame edge-to-edge
   * Returns exact image bounding box { dx, dy, dw, dh }
   */
  function drawImageCover(context, img, x, y, w, h) {
    if (!img.complete || img.naturalWidth === 0) return null;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const containerAspect = w / h;

    let sx, sy, sw, sh;

    if (imgAspect > containerAspect) {
      sh = img.naturalHeight;
      sw = sh * containerAspect;
      sx = (img.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      sw = img.naturalWidth;
      sh = sw / containerAspect;
      sx = 0;
      sy = (img.naturalHeight - sh) / 2;
    }

    context.drawImage(img, sx, sy, sw, sh, x, y, w, h);
    return { dx: x, dy: y, dw: w, dh: h };
  }

  /**
   * Helper function to draw text with kinetic separating / joining letter-spacing fade transition
   */
  function drawKineticText(context, text, x, y, font, fillStyle, alpha, hoverProgress) {
    if (alpha <= 0.01) return;
    context.save();
    context.globalAlpha *= alpha;
    context.font = font;
    context.fillStyle = fillStyle;
    context.textAlign = 'left';
    context.textBaseline = 'alphabetic';

    // Letter Spacing Math: 18px extra space when unhovered (separated) -> 0.5px when hovered (joined)
    const extraSpace = (1.0 - hoverProgress) * 18.0;

    if (context.letterSpacing !== undefined) {
      context.letterSpacing = `${extraSpace + 0.5}px`;
      context.fillText(text, x, y);
    } else {
      // Character-by-character rendering fallback
      let currentX = x;
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        context.fillText(char, currentX, y);
        currentX += context.measureText(char).width + extraSpace + 0.5;
      }
    }

    context.restore();
  }

  /**
   * Render spinning circular text orbiting around center point (cx, cy) at radius R
   */
  function drawSpinningCircularText(context, text, cx, cy, radius, startAngle, alpha) {
    if (alpha <= 0.01) return;
    context.save();
    context.globalAlpha *= alpha;
    context.font = '700 11px Poppins, sans-serif';
    context.fillStyle = '#000000';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    const totalChars = text.length;
    const angleStep = (Math.PI * 2) / totalChars;

    for (let i = 0; i < totalChars; i++) {
      const char = text[i];
      const charAngle = startAngle + i * angleStep;

      const x = cx + Math.cos(charAngle) * radius;
      const y = cy + Math.sin(charAngle) * radius;

      context.save();
      context.translate(x, y);
      context.rotate(charAngle + Math.PI / 2);
      context.fillText(char, 0, 0);
      context.restore();
    }

    context.restore();
  }

  /**
   * Render portal texture with 50-50 split screen layout, Process Section ("How I Work"), 3D Character Animation Video Section & KINETIC ARCHITECTURAL DASHED GRID
   */
  function renderMediaTexture(t, scrollProgress, aboutOpacity, aboutScale, whitePortalProgress) {
    mctx.clearRect(0, 0, width, height);

    // Base background matching About Me sunny yellow
    mctx.fillStyle = '#FCEA63';
    mctx.fillRect(0, 0, width, height);

    // 1. RENDER ABOUT ME SECTION (Entire screen matches user's reference composition: full-bleed sunny yellow #FCEA63)
    // As user scrolls, the image glides from center to left side (0.20 -> 0.60),
    // then the right-side content ("UI/UX DESIGNER - PRODUCT THINKER", "I LIKE MAKING THINGS MAKE SENSE",
    // and bottom dome "VIEW MORE ABOUT AKILESH") smoothly fades & rises into place (0.35 -> 0.75).
    if (aboutOpacity > 0.01) {
      mctx.save();
      mctx.globalAlpha = aboutOpacity;

      // 1. Full-bleed Vibrant Sunny Yellow Background (matches exact #FCEA63 from reference image)
      mctx.fillStyle = '#FCEA63';
      mctx.fillRect(0, 0, width, height);

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1100;

      // Reveal Akilesh portrait and text inside liquid portal from frame 1
      const revealP = 1.0;

      // 2. Large Outlined Name 'AKILESH' in Font Family 'Moirai One' (Centered in Background)
      if (revealP > 0.01) {
        mctx.save();
        mctx.globalAlpha = aboutOpacity * revealP;
        const nameFontSize = Math.round(
          isMobile 
            ? Math.min(width * 0.25, height * 0.18) 
            : (isTablet ? Math.min(width * 0.22, height * 0.24) : Math.min(width * 0.20, height * 0.26))
        );
        
        const nameCenterY = isMobile ? height * 0.26 : height * 0.24;
        const nameCenterX = isMobile ? (width * 0.5 + 14) : (width * 0.5);

        mctx.font = `400 ${nameFontSize}px "Moirai One", cursive, sans-serif`;
        mctx.textAlign = 'center';
        mctx.textBaseline = 'middle';
        mctx.strokeStyle = 'rgba(255, 255, 255, 0.58)';
        mctx.lineWidth = isMobile ? 2.5 : Math.max(width * 0.003, 3.2);
        mctx.lineJoin = 'round';
        mctx.lineCap = 'round';
        if ('letterSpacing' in mctx) {
          mctx.letterSpacing = '0.04em';
        }
        mctx.strokeText('AKILESH', nameCenterX, nameCenterY);
        mctx.restore();
      }

      // 3. Image Horizontal Slide Motion:
      // Starts centered at width * 0.5 on the full screen, and slides from Center to Left Side (0.20 -> 0.60)
      const moveRaw = Math.min(Math.max((scrollProgress - 0.20) / 0.40, 0.0), 1.0);
      const easeMove = moveRaw * moveRaw * (3.0 - 2.0 * moveRaw); // Smooth cubic ease

      // 4. Right-side Content Reveal Animation (0.35 -> 0.75)
      const contentRaw = Math.min(Math.max((scrollProgress - 0.35) / 0.40, 0.0), 1.0);
      const easeContent = contentRaw * contentRaw * (3.0 - 2.0 * contentRaw);

      // Draw Cutout Akilesh (Revealed ONLY on scroll as portal expands to full screen; NEVER on landing screen)
      if (revealP > 0.01 && akileshPortraitImg.complete && akileshPortraitImg.naturalWidth > 0) {
        mctx.save();
        mctx.globalAlpha = aboutOpacity * revealP;

        const imgAspect = akileshPortraitImg.naturalWidth / akileshPortraitImg.naturalHeight; // 4960 / 3120 = ~1.5897
        
        const drawH = isMobile ? height * 0.90 : height * 0.98;
        const drawW = drawH * imgAspect;
        
        const fullScreenCenterX = width * 0.5;
        const targetLeftCenterX = isMobile ? width * 0.25 : (isTablet ? width * 0.26 : width * 0.25);
        const currentCenterX = fullScreenCenterX + (targetLeftCenterX - fullScreenCenterX) * easeMove;

        const drawX = currentCenterX - drawW * 0.5;
        const drawY = height - drawH;

        mctx.drawImage(akileshPortraitImg, drawX, drawY, drawW, drawH);
        mctx.restore();
      }

      // Draw Right Side Content ("UI/UX DESIGNER...", "I LIKE MAKING THINGS MAKE SENSE", and Dome badge)
      if (easeContent > 0.005) {
        mctx.save();
        mctx.globalAlpha = aboutOpacity * easeContent;

        const contentCenterX = isMobile ? width * 0.50 : (isTablet ? width * 0.69 : width * 0.70);
        const contentFloatY = (1.0 - easeContent) * 25; // Floats smoothly up into position

        // 5. Headline ("I LIKE MAKING THINGS MAKE SENSE") in Luckiest Guy with Card Background
        const titleFontSize = Math.round(
          isMobile 
            ? Math.min(width * 0.052, 26) 
            : (isTablet ? Math.min(width * 0.055, 64) : Math.min(width * 0.048, 82))
        );
        const titleLineSpacing = titleFontSize * 1.16;
        const headlineCenterY = (isMobile ? height * 0.78 : (isTablet ? height * 0.50 : height * 0.50)) - contentFloatY;

        const line1 = 'I LIKE MAKING';
        const line2 = 'THINGS MAKE SENSE';

        mctx.save();
        mctx.font = `400 ${titleFontSize}px "Luckiest Guy", cursive, sans-serif`;

        // Measure text bounds to fit inside unshaped card
        const w1 = mctx.measureText(line1).width;
        const w2 = mctx.measureText(line2).width;
        const textWidth = Math.max(w1, w2);

        const padX = isMobile ? 22 : 36;
        const padY = isMobile ? 14 : 22;
        const cardW = textWidth + padX * 2;
        const cardH = titleLineSpacing * 1.8 + padY * 2;
        const cardX = contentCenterX - cardW * 0.5;
        const cardY = headlineCenterY - cardH * 0.5;

        // Draw Unshaped Rounded Rectangle Card Background (Mobile only)
        if (isMobile) {
          const cornerRadius = 16;
          mctx.beginPath();
          if ('roundRect' in mctx) {
            mctx.roundRect(cardX, cardY, cardW, cardH, cornerRadius);
          } else {
            mctx.rect(cardX, cardY, cardW, cardH);
          }

          mctx.fillStyle = '#FFFFFF';
          mctx.shadowColor = 'rgba(2, 32, 46, 0.16)';
          mctx.shadowBlur = 16;
          mctx.shadowOffsetY = 4;
          mctx.fill();

          mctx.lineWidth = 2;
          mctx.strokeStyle = '#02202E';
          mctx.stroke();
        }

        // Reset shadow for crisp text rendering
        mctx.shadowColor = 'transparent';
        mctx.shadowBlur = 0;
        mctx.shadowOffsetY = 0;

        // Draw Headline Lines inside the Card
        mctx.fillStyle = '#02202E';
        mctx.textAlign = 'center';
        mctx.textBaseline = 'middle';
        if ('letterSpacing' in mctx) {
          mctx.letterSpacing = '0.01em';
        }
        mctx.fillText(line1, contentCenterX, headlineCenterY - titleLineSpacing * 0.44);
        mctx.fillText(line2, contentCenterX, headlineCenterY + titleLineSpacing * 0.44);
        mctx.restore();

        // 7. Slanted Polygonal Button ("View More About Akilesh" matching user reference)
        const baseBtnW = isMobile 
          ? Math.min(Math.round(width * 0.84), 335) 
          : (isTablet ? Math.min(Math.round(width * 0.45), 375) : Math.min(Math.round(width * 0.28), 410));

        // Scale animation on hover (5% scale boost)
        const btnScale = 1.0 + domeHoverFactor * 0.05;
        const btnW = baseBtnW * btnScale;
        const hLeft = Math.round(btnW * 0.20);
        const hRight = Math.round(btnW * 0.31);
        const cornerRadius = Math.round(btnW * 0.045);

        // Slide in from bottom edge on scroll
        const slideOffset = (1.0 - easeContent) * (hRight * 1.35);
        const currentBaseY = height + slideOffset;

        // True geometric center of the slanted button (equal margins top, bottom, left, and right)
        const avgHeight = (hLeft + hRight) / 2;
        const textCenterY = currentBaseY - Math.round(avgHeight * 0.51);
        const textCenterX = contentCenterX + Math.round((currentBaseY - textCenterY) * 0.45);

        // Algebraic hit test for the slanted polygon
        const isHoverBtn = (function(px, py) {
          if (py > currentBaseY || py < currentBaseY - (hRight + 8)) return false;
          const leftX = contentCenterX - btnW / 2;
          const rightX = contentCenterX + btnW / 2;
          const xLeftAtY = leftX + (currentBaseY - py) * 0.45;
          const xRightAtY = rightX + (currentBaseY - py) * 0.45;
          if (px < xLeftAtY - 6 || px > xRightAtY + 6) return false;
          const xTL = leftX + hLeft * 0.45;
          const xTR = rightX + hRight * 0.45;
          const topProgress = (px - xTL) / Math.max(xTR - xTL, 1);
          const yTopAtX = (currentBaseY - hLeft) - topProgress * (hRight - hLeft);
          return py >= yTopAtX - 5;
        })(mouse.x, mouse.y);

        isOverDomeGlobal = isHoverBtn && easeContent > 0.7;

        // Coordinates for expanding circle overlay origin
        currentDomeCoords = { x: textCenterX, y: textCenterY };

        // Update cursor pointer
        const activeCursor = isOverDomeGlobal ? "url('/cursor-svgrepo-com.svg') 0 0, pointer" : "url('/cursor-svgrepo-com.svg') 0 0, auto";
        if (canvas && canvas.style.cursor !== activeCursor) canvas.style.cursor = activeCursor;
        if (topCanvas && topCanvas.style.cursor !== activeCursor) topCanvas.style.cursor = activeCursor;

        // Smooth lerp hover factor for fluid 60fps interaction
        const targetDomeHover = isOverDomeGlobal ? 1.0 : 0.0;
        domeHoverFactor += (targetDomeHover - domeHoverFactor) * 0.16;

        // Corner Points
        const bLeftX = contentCenterX - btnW / 2;
        const bRightX = contentCenterX + btnW / 2;
        const pTL = { x: bLeftX + hLeft * 0.45, y: currentBaseY - hLeft };
        const pTR = { x: bRightX + hRight * 0.45, y: currentBaseY - hRight };

        mctx.save();
        mctx.beginPath();
        mctx.moveTo(bLeftX, currentBaseY);
        mctx.arcTo(pTL.x, pTL.y, pTR.x, pTR.y, cornerRadius);
        mctx.arcTo(pTR.x, pTR.y, bRightX, currentBaseY, cornerRadius);
        mctx.lineTo(bRightX, currentBaseY);
        mctx.closePath();

        // Single 8px outer border in button color at 25% opacity (lineWidth 16, so 8px extends outside)
        mctx.lineWidth = 16;
        mctx.strokeStyle = 'rgba(2, 32, 46, 0.25)';
        mctx.stroke();

        // Button background (#02202E)
        mctx.fillStyle = isOverDomeGlobal ? '#082C3D' : '#02202E';
        mctx.fill();

        // Animated Typography Adapting to Shape with 100% Even Top & Bottom Spacing
        const textBounceY = Math.sin(time * 5.2) * 1.4 * domeHoverFactor;
        const minSize = (isMobile ? 14 : (isTablet ? 17 : 19)) * btnScale;
        const maxSize = (isMobile ? 22 : (isTablet ? 26 : 29)) * btnScale;

        const words = ['VIEW', 'MORE', 'ABOUT', 'AKILESH'];
        const wordSizes = words.map((_, i) => {
          const t = i / (words.length - 1);
          return Math.round(minSize + (maxSize - minSize) * t);
        });

        // Measure individual word widths
        const wordWidths = [];
        words.forEach((w, i) => {
          mctx.font = `400 ${wordSizes[i]}px "Luckiest Guy", cursive, sans-serif`;
          wordWidths.push(mctx.measureText(w).width);
        });

        const wordGap = Math.round((isMobile ? 6 : 9) * btnScale);
        const totalTextW = wordWidths.reduce((sum, w) => sum + w, 0) + (words.length - 1) * wordGap;

        // Slanted top edge line coordinates
        const xTL = bLeftX + hLeft * 0.45;
        const xTR = bRightX + hRight * 0.45;
        const yTL = currentBaseY - hLeft;
        const yTR = currentBaseY - hRight;

        // Angle along the button's vertical centerline
        const midlineAngle = Math.atan2(-(hRight - hLeft) * 0.50, btnW);

        // Center the word block horizontally within the slanted shape
        const midX = contentCenterX + (avgHeight * 0.50) * 0.45;
        let curWordX = midX - totalTextW / 2;

        mctx.save();
        mctx.fillStyle = '#FFFFFF';
        mctx.textAlign = 'center';
        mctx.textBaseline = 'middle';
        if ('letterSpacing' in mctx) {
          mctx.letterSpacing = '0.04em';
        }

        words.forEach((w, i) => {
          const wordCX = curWordX + wordWidths[i] / 2;
          curWordX += wordWidths[i] + wordGap;

          // Local top edge directly above wordCX
          const topT = Math.max(0, Math.min(1, (wordCX - xTL) / Math.max(xTR - xTL, 1)));
          const yTopAtWord = yTL + topT * (yTR - yTL);
          const localHeight = currentBaseY - yTopAtWord;

          // Exact vertical midpoint at this word's horizontal position (with 10px upward offset):
          const wordCY = currentBaseY - localHeight / 2 - 10 + textBounceY;

          mctx.save();
          mctx.translate(wordCX, wordCY);
          mctx.rotate(midlineAngle);
          mctx.font = `400 ${wordSizes[i]}px "Luckiest Guy", cursive, sans-serif`;
          mctx.fillText(w, 0, 0);
          mctx.restore();
        });

        mctx.restore();

        mctx.restore();
        mctx.restore();
      }

      mctx.restore();
    }

    // Note: "How I Work" Process Section and "Capabilities & 3D Video" have been relocated to #about-detail-overlay
  }

  /**
   * Render Top Transition Layer (Cleared organic blob pattern for direct clean section scroll transitions)
   */
  function renderTopTransition(t, progress, scrollProgress) {
    if (!topCtx) return;
    topCtx.clearRect(0, 0, width, height);
    if (portalClipPath) portalClipPath.setAttribute('d', '');
  }

  /**
   * Main render loop
   */
  function animate() {
    time += 0.02;

    smoothMouse.x += (mouse.x - smoothMouse.x) * 0.08;
    smoothMouse.y += (mouse.y - smoothMouse.y) * 0.08;

    // DIRECT RESPONSIVE SCROLL ENGINE:
    // Scrolls smoothly while user scrolls and STOPS IMMEDIATELY when user stops scrolling
    if (cachedMaxScroll > 0) {
      rawScrollProgress = Math.min(Math.max(window.scrollY / cachedMaxScroll, 0), 1);
    }
    const scrollDiff = rawScrollProgress - smoothScrollProgress;
    if (Math.abs(scrollDiff) < 0.0001) {
      smoothScrollProgress = rawScrollProgress;
    } else {
      smoothScrollProgress += scrollDiff * 0.92;
    }

    if (heroContent) {
      if (smoothScrollProgress > 0.04) {
        heroContent.classList.add('fade-out-text');
      } else {
        heroContent.classList.remove('fade-out-text');
      }
    }

    // Update Header Theme when Contact Section is in View
    const contactSection = document.getElementById('contact-section');
    let isDarkHeader = false;
    if (contactSection) {
      const cRect = contactSection.getBoundingClientRect();
      if (cRect.top <= 80 && cRect.bottom >= 80) {
        isDarkHeader = true;
      }
    }
    if (isDarkHeader) {
      document.body.classList.add('dark-bg-active');
      if (siteHeader) siteHeader.classList.add('dark-header');
    } else {
      document.body.classList.remove('dark-bg-active');
      if (siteHeader) siteHeader.classList.remove('dark-header');
    }

    // ABOUT ME STAGE: Always 100% full opacity in the hero section
    const aboutOpacity = 1.0;
    const aboutScale = 1.0;

    renderMediaTexture(time, smoothScrollProgress, aboutOpacity, aboutScale, 0);

    ctx.clearRect(0, 0, width, height);

    // Zoom portal expansion: circle grows from hero spot into full viewport (0.00 -> 0.35)
    const zoomProgress = Math.min(smoothScrollProgress / 0.35, 1.0);
    const easeScroll = Math.pow(zoomProgress, 2.2);
    const zoomScale = 1.0 + easeScroll * 22.0;

    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const targetCenterX = isMobile ? width * 0.5 : (isTablet ? width * 0.82 : width * 0.78);
    const centerX = targetCenterX + (width * 0.5 - targetCenterX) * Math.min(zoomProgress * 1.5, 1);
    const centerY = isMobile ? height * 0.58 : (isTablet ? height * 0.52 : height * 0.48);

    // 1. ULTRA-COMPACT RESPONSIVE RADIUS FOR ORGANIC JELLY PORTAL
    const baseRadius = Math.min(width, height) * (isMobile ? 0.18 : (isTablet ? 0.13 : 0.14)) * zoomScale;

    // 2. GENERATE 12 ORGANIC LIQUID JELLY CONTROL POINTS WITH INTERACTIVE MOUSE PUSH DEFORMATION
    const numJellyPoints = 12;
    const jellyPoints = [];

    for (let i = 0; i < numJellyPoints; i++) {
      const angle = (i / numJellyPoints) * Math.PI * 2;

      // Organic jelly undulating sine waves (gelatin liquid motion)
      const waveDamp = Math.max(1 - zoomProgress * 0.8, 0.25);
      const wave1 = Math.sin(time * 1.5 + i * 0.9) * 0.055 * waveDamp;
      const wave2 = Math.cos(time * 1.2 - i * 0.7) * 0.035 * waveDamp;

      const r = baseRadius * (1.0 + wave1 + wave2);

      let px = centerX + Math.cos(angle) * r;
      let py = centerY + Math.sin(angle) * r;

      // Mouse distance push & deformation (changes shape when mouse goes near/over it!)
      const dx = mouse.x - px;
      const dy = mouse.y - py;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 0.001 && dist < 100 && zoomProgress < 0.35) {
        const pushMag = (100 - dist) * 0.35;
        px -= (dx / dist) * pushMag;
        py -= (dy / dist) * pushMag;
      }

      jellyPoints.push({ x: px, y: py });
    }

    // 3. DRAW ORGANIC SMOOTH JELLY PORTAL MASK & CLIP MEDIA CANVAS
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(
      (jellyPoints[0].x + jellyPoints[jellyPoints.length - 1].x) / 2,
      (jellyPoints[0].y + jellyPoints[jellyPoints.length - 1].y) / 2
    );

    for (let i = 0; i < jellyPoints.length; i++) {
      const nextPt = jellyPoints[(i + 1) % jellyPoints.length];
      const midX = (jellyPoints[i].x + nextPt.x) / 2;
      const midY = (jellyPoints[i].y + nextPt.y) / 2;
      ctx.quadraticCurveTo(jellyPoints[i].x, jellyPoints[i].y, midX, midY);
    }
    ctx.closePath();

    ctx.clip();
    ctx.drawImage(mediaCanvas, 0, 0, width, height);
    ctx.restore();

    // 4. SUBTLE OUTER SHADOW STROKE AROUND DEFORMING JELLY PORTAL (High performance native stroke)
    if (zoomProgress < 0.85) {
      ctx.save();
      ctx.lineWidth = Math.max(6 * (1 - zoomProgress), 1);
      ctx.strokeStyle = `rgba(0, 0, 0, ${0.10 * (1 - zoomProgress)})`;
      ctx.beginPath();
      ctx.moveTo(
        (jellyPoints[0].x + jellyPoints[jellyPoints.length - 1].x) / 2,
        (jellyPoints[0].y + jellyPoints[jellyPoints.length - 1].y) / 2
      );
      for (let i = 0; i < jellyPoints.length; i++) {
        const nextPt = jellyPoints[(i + 1) % jellyPoints.length];
        const midX = (jellyPoints[i].x + nextPt.x) / 2;
        const midY = (jellyPoints[i].y + nextPt.y) / 2;
        ctx.quadraticCurveTo(jellyPoints[i].x, jellyPoints[i].y, midX, midY);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    // 5. DRAW SLOW ELEGANT SPINNING CIRCULAR TEXT AROUND ULTRA-COMPACT JELLY PORTAL
    if (zoomProgress < 0.55) {
      const spinningTextAlpha = (1.0 - Math.min(zoomProgress / 0.40, 1.0));
      const spinningTextRadius = baseRadius + 18;
      const spinAngle = time * 0.14; // Reduced rotation speed
      const circularTextCopy = "AKILESH  •  UI/UX DESIGNER  •  PRODUCT ARCHITECT  •  AKILESH  •  UI/UX DESIGNER  •  PRODUCT ARCHITECT  •  ";

      drawSpinningCircularText(ctx, circularTextCopy, centerX, centerY, spinningTextRadius, spinAngle, spinningTextAlpha);
    }

    renderTopTransition(time, 0, smoothScrollProgress);

    // Base1 Dynamic Iridescent Comet Trail (Renders ABOVE Hero Text & Foreground Layer)
    const trailCtx = topCtx || ctx;
    if (colorTrailPoints.length > 0 && smoothScrollProgress < 0.95 && trailCtx) {
      trailCtx.save();
      trailCtx.globalCompositeOperation = 'source-over';

      const fadeOverall = (1.0 - smoothScrollProgress);

      for (let i = colorTrailPoints.length - 1; i >= 0; i--) {
        const p = colorTrailPoints[i];

        // 1. Forward Momentum Propagation: When cursor stops, comet tail glides forward and dissolves
        p.x += p.vx;
        p.y += p.vy;

        // Fluid viscous deceleration
        p.vx *= 0.954;
        p.vy *= 0.954;

        p.life -= p.decay;

        if (p.life <= 0) {
          colorTrailPoints.splice(i, 1);
          continue;
        }

        // 2. Chromatic spectrum shift along the trailing comet body
        const nodeHue = (p.birthHue - (1.0 - p.life) * 45 + 360) % 360;

        // 3. Volumetric radius expansion / taper
        const spreadProgress = Math.pow(1.0 - p.life, 0.60);
        const curRadius = p.radius + (p.maxRadius - p.radius) * spreadProgress;

        // 4. Soft, translucent volumetric alpha (reduced opacity for light airy feel)
        const easeLife = Math.pow(p.life, 1.20);
        const alpha = easeLife * 0.22 * fadeOverall;

        // Multi-stop volumetric radial gradient matching Base1 reference video
        const grad = trailCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, curRadius);
        grad.addColorStop(0.0, `hsla(${nodeHue}, 100%, 75%, ${alpha * 0.90})`);                 // Luminous bright core
        grad.addColorStop(0.28, `hsla(${nodeHue}, 96%, 58%, ${alpha * 0.55})`);                 // Rich saturated body
        grad.addColorStop(0.60, `hsla(${(nodeHue + 38) % 360}, 90%, 48%, ${alpha * 0.20})`);    // Chromatic iridescent fringe
        grad.addColorStop(0.85, `hsla(${(nodeHue + 50) % 360}, 80%, 35%, ${alpha * 0.05})`);    // Soft outer atmosphere
        grad.addColorStop(1.0, `hsla(${(nodeHue + 50) % 360}, 70%, 25%, 0)`);                  // Feathered edge

        trailCtx.fillStyle = grad;
        trailCtx.beginPath();
        trailCtx.arc(p.x, p.y, curRadius, 0, Math.PI * 2);
        trailCtx.fill();
      }

      // 5. Soft Glowing Spherical Comet Head (Directly at Cursor Tip)
      if (mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
        const headAlpha = 0.32 * fadeOverall;
        const headRad = Math.min(45 + mouse.speed * 0.32, 75);

        // Multi-layer glowing orb with softer, lighter transparency
        const headGrad = trailCtx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, headRad);
        headGrad.addColorStop(0.0, `hsla(${currentHeadHue}, 100%, 95%, ${headAlpha * 0.95})`);               // White-hot nucleus
        headGrad.addColorStop(0.25, `hsla(${currentHeadHue}, 100%, 65%, ${headAlpha * 0.70})`);             // Vibrant neon orb
        headGrad.addColorStop(0.60, `hsla(${(currentHeadHue + 30) % 360}, 95%, 52%, ${headAlpha * 0.25})`); // Chromatic bloom
        headGrad.addColorStop(1.0, `hsla(${(currentHeadHue + 45) % 360}, 85%, 40%, 0)`);                    // Outer halo

        trailCtx.fillStyle = headGrad;
        trailCtx.beginPath();
        trailCtx.arc(mouse.x, mouse.y, headRad, 0, Math.PI * 2);
        trailCtx.fill();
      }

      trailCtx.restore();
    }

    animFrameId = requestAnimationFrame(animate);
  }

  animate();
}

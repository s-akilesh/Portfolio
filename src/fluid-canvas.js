/**
 * Fluid Canvas Module — "How I Work" Process Section with Sequential Card Stagger Reveal, Expanding Axis Line & Rotating (+) Nodes, About Me Section ("I LIKE MAKING THINGS MAKE SENSE"), Ultra-Compact Organic Liquid Jelly Portal with Slow Elegant Spinning Outer Circular Text ("AKILESH • UI/UX DESIGNER • PRODUCT ARCHITECT"), Velocity-Capped Inertial Lerp Smooth Scroll Engine, 3D Character Animation Video Section (Focused 3-Card Viewport Window), Organic Dust White Portal with 16:9 Image Slide & Interactive Negative-Color Blend Hover Cursor Circle ("EXPLORE") & Kinetic Dashed Grid
 */

export function initFluidCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const topCanvas = document.getElementById('transition-canvas');
  const scrollWrapper = document.getElementById('hero-scroll-wrapper');
  const heroContent = document.getElementById('hero-content');
  const siteHeader = document.getElementById('site-header');
  const portraitWrapper = document.getElementById('about-portrait-wrapper');

  if (!canvas) return;

  // Load Real Uploaded Akilesh Portrait Image
  const akileshPortraitImg = new Image();
  akileshPortraitImg.src = '/akilesh_portrait.jpg';

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

  // Smooth lerp position & scale for interactive negative-blend Explore hover cursor circle
  let exploreCursor = { x: -100, y: -100, scale: 0.0 };

  // Persistent smooth lerp hover factors for bottom-left project title text overlay
  let img1HoverFactor = 0.0;
  let img2HoverFactor = 0.0;
  let img3HoverFactor = 0.0;

  // Persistent smooth lerp hover factors for 6 right-side Figma cards
  const cardHoverFactors = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  let particles = [];
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
    width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
    height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

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
  }

  let isImage2Past50Global = false;
  let isCursorInsideImageGlobal = false;
  let activeIndexGlobal = 0;

  const handleShowcaseClick = (e) => {
    if (smoothScrollProgress >= 0.68) {
      if (activeIndexGlobal === 0) {
        window.location.href = './flyer-eats.html';
      } else if (activeIndexGlobal === 2) {
        window.location.href = './habit-partner.html';
      }
    }
  };

  if (topCanvas) {
    topCanvas.style.cursor = 'pointer';
    topCanvas.addEventListener('click', handleShowcaseClick);
  }
  if (canvas) {
    canvas.style.cursor = 'pointer';
    canvas.addEventListener('click', handleShowcaseClick);
  }

  window.addEventListener('resize', resize);
  resize();

  // Mouse move event
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
      const pCount = Math.min(Math.max(Math.floor(mouse.speed / 1.2), 3), 24);
      for (let i = 0; i < pCount; i++) {
        particles.push({
          x: nx + (Math.random() - 0.5) * 24,
          y: ny + (Math.random() - 0.5) * 24,
          vx: (Math.random() - 0.5) * 2.8,
          vy: (Math.random() - 0.5) * 2.8 - 0.6,
          size: Math.random() * 1.8 + 0.6,
          life: 1.0,
          decay: Math.random() * 0.018 + 0.009,
        });
      }
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

    const portalCenterX = width * 0.5;
    const portalCenterY = height * 0.5;

    const blackShiftProgress = Math.min(Math.max((scrollProgress - 0.04) / 0.08, 0), 1);

    if (blackShiftProgress < 1) {
      const bgGrad = mctx.createRadialGradient(
        portalCenterX, portalCenterY, 50,
        portalCenterX, portalCenterY, Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, '#151c28');
      bgGrad.addColorStop(0.5, '#0a0d14');
      bgGrad.addColorStop(1, '#050608');
      mctx.fillStyle = bgGrad;
      mctx.fillRect(0, 0, width, height);

      const orbAlpha = (1 - blackShiftProgress);
      const orb1X = portalCenterX + Math.sin(t * 0.8) * 90;
      const orb1Y = portalCenterY - 20 + Math.cos(t * 0.6) * 60;
      const orb1Grad = mctx.createRadialGradient(orb1X, orb1Y, 10, orb1X, orb1Y, 260);
      orb1Grad.addColorStop(0, `rgba(56, 189, 248, ${0.32 * orbAlpha})`);
      orb1Grad.addColorStop(0.6, `rgba(30, 58, 138, ${0.1 * orbAlpha})`);
      orb1Grad.addColorStop(1, 'transparent');
      mctx.fillStyle = orb1Grad;
      mctx.fillRect(0, 0, width, height);

      const orb2X = portalCenterX + Math.cos(t * 0.7) * 80;
      const orb2Y = portalCenterY + 40 + Math.sin(t * 0.9) * 70;
      const orb2Grad = mctx.createRadialGradient(orb2X, orb2Y, 10, orb2X, orb2Y, 300);
      orb2Grad.addColorStop(0, `rgba(168, 85, 247, ${0.25 * orbAlpha})`);
      orb2Grad.addColorStop(0.6, `rgba(88, 28, 135, ${0.06 * orbAlpha})`);
      orb2Grad.addColorStop(1, 'transparent');
      mctx.fillStyle = orb2Grad;
      mctx.fillRect(0, 0, width, height);

      mctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * orbAlpha})`;
      mctx.lineWidth = 1.5;
      mctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const y = height * 0.25 + i * 55 + Math.sin(t * 1.2 + i) * 18;
        mctx.moveTo(0, y);
        mctx.bezierCurveTo(width * 0.3, y + 35, width * 0.7, y - 35, width, y);
      }
      mctx.stroke();
    }

    if (blackShiftProgress > 0) {
      mctx.fillStyle = `rgba(0, 0, 0, ${blackShiftProgress})`;
      mctx.fillRect(0, 0, width, height);
    }

    // RENDER KINETIC ARCHITECTURAL DASHED GRID FOR AVATAR & PROCESS SCREENS
    if (scrollProgress > 0.16 && whitePortalProgress < 0.95) {
      const gridAlpha = Math.min((scrollProgress - 0.16) / 0.08, 1.0) * (1 - whitePortalProgress);

      if (gridAlpha > 0.01) {
        const mouseOffsetX = (smoothMouse.x - width * 0.5);
        const mouseOffsetY = (smoothMouse.y - height * 0.5);

        mctx.save();
        mctx.globalAlpha = gridAlpha * 0.55;
        mctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        mctx.lineWidth = 1.2;
        mctx.setLineDash([8, 8]);

        const computedVertLines = verticalGridLines.map((line) => {
          const shiftY = mouseOffsetY * line.speed;
          const x = width * line.baseRatio;
          return { x, shiftY, speed: line.speed };
        });

        const computedHorizLines = horizontalGridLines.map((line) => {
          const shiftX = mouseOffsetX * line.speed;
          const y = height * line.baseRatio;
          return { y, shiftX, speed: line.speed };
        });

        computedVertLines.forEach((vLine) => {
          mctx.beginPath();
          mctx.moveTo(vLine.x, 0);
          mctx.lineTo(vLine.x, height);
          mctx.stroke();
        });

        computedHorizLines.forEach((hLine) => {
          mctx.beginPath();
          mctx.moveTo(0, hLine.y);
          mctx.lineTo(width, hLine.y);
          mctx.stroke();
        });

        mctx.setLineDash([]);
        mctx.strokeStyle = 'rgba(56, 189, 248, 0.40)';
        mctx.lineWidth = 1.4;

        computedVertLines.forEach((vLine, colIdx) => {
          computedHorizLines.forEach((hLine, rowIdx) => {
            const ix = vLine.x + hLine.shiftX * 0.5;
            const iy = hLine.y + vLine.shiftY * 0.5;

            mctx.beginPath();
            mctx.moveTo(ix - 7, iy);
            mctx.lineTo(ix + 7, iy);
            mctx.moveTo(ix, iy - 7);
            mctx.lineTo(ix, iy + 7);
            mctx.stroke();

            if ((colIdx + rowIdx) % 2 === 1) {
              const boxSize = 14;
              const offsetX = ((colIdx % 3) - 1) * 22;
              const offsetY = ((rowIdx % 2) - 0.5) * 28;

              const bx = ix + offsetX;
              const by = iy + offsetY;

              mctx.save();
              mctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
              mctx.lineWidth = 1.0;
              mctx.setLineDash([3, 3]);
              mctx.strokeRect(bx - boxSize / 2, by - boxSize / 2, boxSize, boxSize);
              mctx.restore();
            }
          });
        });

        mctx.restore();
      }
    }

    // 1. RENDER ABOUT ME SECTION (scrollProgress 0.04 -> 0.20)
    if (aboutOpacity > 0.01) {
      const isMobile = width < 1100;

      mctx.save();
      mctx.globalAlpha = aboutOpacity;

      if (!isMobile && akileshPortraitImg.complete && akileshPortraitImg.naturalWidth > 0) {
        const cardX = Math.max(width * 0.05, 50);
        const cardWidth = Math.min(Math.max(320, width * 0.36), 500);
        const cardHeight = Math.min(Math.max(500, height * 0.82), 840);
        const cardY = (height * 0.52) - (cardHeight / 2);

        mctx.save();
        mctx.beginPath();
        if (mctx.roundRect) {
          mctx.roundRect(cardX, cardY, cardWidth, cardHeight, 24);
        } else {
          mctx.rect(cardX, cardY, cardWidth, cardHeight);
        }
        mctx.clip();

        const imgAspect = akileshPortraitImg.naturalWidth / akileshPortraitImg.naturalHeight;
        const cardAspect = cardWidth / cardHeight;

        let drawW, drawH, drawX, drawY;
        if (imgAspect > cardAspect) {
          drawH = cardHeight;
          drawW = cardHeight * imgAspect;
          drawX = cardX - (drawW - cardWidth) / 2;
          drawY = cardY;
        } else {
          drawW = cardWidth;
          drawH = cardWidth / imgAspect;
          drawX = cardX;
          drawY = cardY;
        }

        mctx.drawImage(akileshPortraitImg, drawX, drawY, drawW, drawH);

        const badgeGrad = mctx.createLinearGradient(cardX, cardY + cardHeight - 120, cardX, cardY + cardHeight);
        badgeGrad.addColorStop(0, 'transparent');
        badgeGrad.addColorStop(1, 'rgba(10, 14, 20, 0.96)');
        mctx.fillStyle = badgeGrad;
        mctx.fillRect(cardX, cardY + cardHeight - 120, cardWidth, 120);

        mctx.font = '900 20px Poppins, sans-serif';
        mctx.fillStyle = '#ffffff';
        mctx.textAlign = 'left';
        mctx.textBaseline = 'alphabetic';
        mctx.fillText('AKILESH', cardX + 24, cardY + cardHeight - 48);

        mctx.font = '600 13px Poppins, sans-serif';
        mctx.fillStyle = '#38bdf8';
        mctx.letterSpacing = '1px';
        mctx.fillText('CREATIVE DIRECTOR', cardX + 24, cardY + cardHeight - 24);

        mctx.restore();
      }

      const portalTextX = isMobile ? width * 0.5 : Math.max(width * 0.50, 540);
      const textMaxWidth = isMobile ? width * 0.85 : Math.min(width * 0.42, 560);

      const portraitCardHeight = Math.min(Math.max(500, height * 0.82), 840);
      const exactPortraitTopY = (height * 0.52) - (portraitCardHeight / 2);

      const topAlignY = isMobile ? Math.max(height * 0.10, 95) : Math.max(exactPortraitTopY + 20, 115);

      mctx.save();
      
      mctx.translate(portalTextX, topAlignY);
      mctx.scale(aboutScale, aboutScale);
      mctx.translate(-portalTextX, -topAlignY);

      mctx.textAlign = isMobile ? 'center' : 'left';
      mctx.textBaseline = 'top';
      mctx.shadowBlur = 0;
      mctx.shadowColor = 'transparent';

      const textFloatY = topAlignY + Math.sin(t * 1.5) * 3;

      mctx.font = '500 13px Poppins, sans-serif';
      mctx.fillStyle = '#94a3b8';
      mctx.letterSpacing = '2px';
      mctx.fillText('ABOUT ME', portalTextX, textFloatY);

      if (scrollProgress > 0.04) {
        isTypingTriggered = true;
      } else if (scrollProgress < 0.02) {
        isTypingTriggered = false;
        typedCharFloat = 0;
      }

      if (isTypingTriggered) {
        if (typedCharFloat < ABOUT_TITLE.length) {
          typedCharFloat += 2.0;
        }

        const charsToShow = Math.min(Math.floor(typedCharFloat), ABOUT_TITLE.length);
        const visibleTitle = ABOUT_TITLE.substring(0, charsToShow) + (charsToShow < ABOUT_TITLE.length ? '|' : '');

        let currentY = textFloatY + 38;
        const fontSize = width < 768 ? 18 : 24;

        mctx.font = `900 ${fontSize}px Poppins, sans-serif`;
        mctx.fillStyle = '#ffffff';

        currentY = wrapCanvasText(mctx, visibleTitle, portalTextX, currentY, textMaxWidth, 32);
        currentY += 18;

        if (charsToShow > 8) {
          mctx.font = '400 13.5px Poppins, sans-serif';
          mctx.fillStyle = 'rgba(255, 255, 255, 0.88)';

          currentY = wrapCanvasText(mctx, ABOUT_BIO, portalTextX, currentY, textMaxWidth, 20);
          currentY += 28;

          mctx.font = '500 13px Poppins, sans-serif';
          mctx.fillStyle = '#94a3b8';
          mctx.letterSpacing = '2px';
          mctx.fillText('COMPANIES', portalTextX, currentY);

          const logoY = currentY + 22;

          if (dolpvizImg.complete && dolpvizImg.naturalWidth > 0) {
            const w1 = 140;
            const h1 = (dolpvizImg.naturalHeight / dolpvizImg.naturalWidth) * w1;
            const l1X = isMobile ? portalTextX - 150 : portalTextX;
            mctx.drawImage(dolpvizImg, l1X, logoY, w1, h1);
          }

          if (saarcImg.complete && saarcImg.naturalWidth > 0) {
            const w2 = 155;
            const h2 = (saarcImg.naturalHeight / saarcImg.naturalWidth) * w2;
            const l2X = isMobile ? portalTextX + 10 : portalTextX + 170;
            mctx.drawImage(saarcImg, l2X, logoY + 3, w2, h2);
          }
        }
      }

      mctx.restore();
      mctx.restore();
    }

    // 2. RENDER "HOW I WORK" PROCESS SECTION WITH SEQUENTIAL CARD STAGGER REVEAL, EXPANDING AXIS LINE & ROTATING (+) NODES
    let processOpacity = 0.0;
    if (scrollProgress > 0.19 && scrollProgress < 0.45) {
      const secP = (scrollProgress - 0.19) / 0.26; // 0.0 -> 1.0

      if (secP < 0.12) {
        processOpacity = Math.min(secP / 0.12, 1.0);
      } else if (secP > 0.84) {
        processOpacity = 1.0 - Math.min((secP - 0.84) / 0.16, 1.0);
      } else {
        processOpacity = 1.0;
      }

      if (processOpacity > 0.01) {
        mctx.save();

        const isMobile = width < 900;
        const marginX = width * 0.08;
        const availableW = width - (marginX * 2);

        const startY = Math.max(height * 0.15, 110) + 30;

        // Header Title (Fades & slides up first)
        const headerP = Math.min(secP / 0.18, 1.0);
        const headerOffsetY = (1.0 - headerP) * 20;

        mctx.save();
        mctx.globalAlpha = processOpacity * headerP;
        mctx.translate(0, headerOffsetY);

        mctx.font = '500 13px Poppins, sans-serif';
        mctx.fillStyle = '#94a3b8';
        mctx.letterSpacing = '2px';
        mctx.textAlign = 'left';
        mctx.textBaseline = 'top';
        mctx.fillText('PROCESS', marginX, startY);

        const titleFontSize = width < 768 ? 32 : 48;
        mctx.font = `900 ${titleFontSize}px Poppins, sans-serif`;
        mctx.fillStyle = '#ffffff';
        mctx.fillText('How I Work', marginX, startY + 24);
        mctx.restore();

        // 3 Columns Layout Geometry
        const gridTopY = startY + (titleFontSize > 40 ? 120 : 100);
        const colGap = 40;
        const numCols = isMobile ? 1 : 3;
        const colWidth = (availableW - (colGap * (numCols - 1))) / numCols;

        const processSteps = [
          {
            step: 'STEP — 01',
            title: 'Understand',
            desc: 'I start with the business and the people — understanding goals, users, context, and the problem worth solving.',
            flow: 'Business → Users → Insights',
            triggerP: Math.min(Math.max((secP - 0.12) / 0.22, 0), 1.0)
          },
          {
            step: 'STEP — 02',
            title: 'Shape',
            desc: 'I turn insights into structure and solutions — simplifying complex problems and designing experiences that balance user needs with business goals.',
            flow: 'Gaps → Structure → Design',
            triggerP: Math.min(Math.max((secP - 0.30) / 0.22, 0), 1.0)
          },
          {
            step: 'STEP — 03',
            title: 'Evolve',
            desc: 'I test, learn, and refine the experience — using feedback and data to create a product that keeps getting better.',
            flow: 'Validate → Improve → Grow',
            triggerP: Math.min(Math.max((secP - 0.48) / 0.22, 0), 1.0)
          }
        ];

        // Draw 3 Process Step Columns with Sequential Stagger Reveal
        processSteps.forEach((s, idx) => {
          if (s.triggerP <= 0.005) return;

          const cardAlpha = s.triggerP * processOpacity;
          const cardOffsetY = (1.0 - s.triggerP) * 32;

          let cx, cy;
          if (isMobile) {
            cx = marginX;
            cy = gridTopY + idx * 165;
          } else {
            cx = marginX + idx * (colWidth + colGap);
            cy = gridTopY;
          }

          mctx.save();
          mctx.globalAlpha = cardAlpha;
          mctx.translate(0, cardOffsetY);

          // Step Counter Tag (STEP — 01)
          mctx.font = '600 11.5px Poppins, sans-serif';
          mctx.fillStyle = '#94a3b8';
          mctx.letterSpacing = '1.5px';
          mctx.fillText(s.step, cx, cy);

          // Step Title (Understand, Shape, Evolve) - Increased space (+12px)
          mctx.font = '700 24px Poppins, sans-serif';
          mctx.fillStyle = '#ffffff';
          mctx.fillText(s.title, cx, cy + 38);

          // Body Description - Increased space (+12px+)
          mctx.font = '300 13px Poppins, sans-serif';
          mctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
          const nextY = wrapCanvasText(mctx, s.desc, cx, cy + 84, colWidth, 20);

          // Flow Pill Tag - Increased space (+12px)
          const flowY = nextY + 20;
          mctx.font = '600 12px Poppins, sans-serif';
          const flowW = mctx.measureText(s.flow).width + 24;

          mctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
          mctx.beginPath();
          if (mctx.roundRect) {
            mctx.roundRect(cx, flowY, flowW, 28, 14);
          } else {
            mctx.rect(cx, flowY, flowW, 28);
          }
          mctx.fill();

          mctx.fillStyle = '#38bdf8';
          mctx.textAlign = 'center';
          mctx.textBaseline = 'middle';
          mctx.fillText(s.flow, cx + flowW / 2, flowY + 14.5);
          mctx.textAlign = 'left';
          mctx.textBaseline = 'top';

          mctx.restore();
        });

        // Bottom Architectural Axis Divider Line Length Expansion Based on Scroll
        const lineP = Math.min(Math.max((secP - 0.08) / 0.70, 0), 1.0);
        const lineY = isMobile ? gridTopY + 3 * 200 + 10 : gridTopY + 265;
        const currentLineEndX = marginX + lineP * availableW;

        mctx.save();
        mctx.globalAlpha = processOpacity;

        // Background subtle guide line
        mctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        mctx.lineWidth = 1.0;
        mctx.beginPath();
        mctx.moveTo(marginX, lineY);
        mctx.lineTo(width - marginX, lineY);
        mctx.stroke();

        // Expanding active cyan axis line
        if (lineP > 0.001) {
          const lineGrad = mctx.createLinearGradient(marginX, lineY, currentLineEndX, lineY);
          lineGrad.addColorStop(0, 'rgba(56, 189, 248, 0.30)');
          lineGrad.addColorStop(1, '#38bdf8');
          mctx.strokeStyle = lineGrad;
          mctx.lineWidth = 1.6;
          mctx.beginPath();
          mctx.moveTo(marginX, lineY);
          mctx.lineTo(currentLineEndX, lineY);
          mctx.stroke();
        }

        // Rotating Plus Nodes (+)
        const nodes = isMobile ? [marginX, width - marginX] : [
          marginX,
          marginX + colWidth + colGap / 2,
          marginX + 2 * colWidth + 1.5 * colGap,
          width - marginX
        ];

        nodes.forEach((nx, idx) => {
          const isReached = currentLineEndX >= nx - 5;
          const nodeAlpha = isReached ? processOpacity : processOpacity * 0.25;

          // Rotation angle driven by scroll
          const spinAngle = (scrollProgress * Math.PI * 6) + idx * 0.785;
          const nodeScale = isReached ? 1.0 : 0.7;

          mctx.save();
          mctx.globalAlpha = nodeAlpha;
          mctx.translate(nx, lineY);
          mctx.rotate(spinAngle);
          mctx.scale(nodeScale, nodeScale);

          mctx.strokeStyle = isReached ? '#38bdf8' : 'rgba(255, 255, 255, 0.40)';
          mctx.lineWidth = isReached ? 1.8 : 1.0;

          mctx.beginPath();
          mctx.moveTo(-6, 0);
          mctx.lineTo(6, 0);
          mctx.moveTo(0, -6);
          mctx.lineTo(0, 6);
          mctx.stroke();

          mctx.restore();
        });

        mctx.restore();
        mctx.restore();
      }
    }

    // 3. RENDER 3D CHARACTER ANIMATION VIDEO SECTION (scrollProgress 0.42 -> 0.68)
    if (scrollProgress > 0.42 && scrollProgress < 0.68) {
      const avatarAlpha = scrollProgress < 0.48 
        ? Math.min((scrollProgress - 0.42) / 0.06, 1.0)
        : (scrollProgress > 0.62 ? 1.0 - Math.min((scrollProgress - 0.62) / 0.06, 1.0) : 1.0);

      if (avatarAlpha > 0.01) {
        // Video slide to left completes by scrollProgress = 0.50
        const slideProgress = Math.min(Math.max((scrollProgress - 0.44) / 0.06, 0), 1.0);
        const easeSlide = slideProgress * slideProgress * (3 - 2 * slideProgress);

        // Ensure video plays continuously at full 60fps
        if (animVideo.paused) {
          animVideo.play().catch(() => {});
        }

        mctx.save();
        mctx.globalAlpha = avatarAlpha;

        const isMobile = width < 1000;
        const startCenterX = width * 0.50;
        const targetLeftX = isMobile ? width * 0.50 : Math.max(width * 0.26, 280);
        const currentAvatarX = startCenterX + (targetLeftX - startCenterX) * easeSlide;

        // Video Size: 80% center zoom -> 58% on left side
        const initialScaleW = isMobile ? width * 0.90 : width * 0.80;
        const finalScaleW = isMobile ? width * 0.85 : Math.min(width * 0.58, 720);
        let imgW = initialScaleW + (finalScaleW - initialScaleW) * easeSlide;

        const videoAspect = (animVideo.videoWidth && animVideo.videoHeight) 
          ? (animVideo.videoWidth / animVideo.videoHeight) 
          : (1280 / 720);
        let imgH = imgW / videoAspect;

        const maxAllowedH = (height * 0.80) + ((height * 0.58) - (height * 0.80)) * easeSlide;
        if (imgH > maxAllowedH) {
          imgH = maxAllowedH;
          imgW = imgH * videoAspect;
        }

        const imgY = height * 0.50 - imgH * (isMobile ? 0.65 : 0.50);

        mctx.save();
        // Blend dark background seamlessly into dark obsidian environment
        mctx.globalCompositeOperation = 'screen';

        if (animVideo.readyState >= 2) {
          mctx.drawImage(animVideo, currentAvatarX - imgW / 2, imgY, imgW, imgH);
        } else if (avatar3dImg.complete && avatar3dImg.naturalWidth > 0) {
          mctx.drawImage(avatar3dImg, currentAvatarX - imgW / 2, imgY, imgW, imgH);
        }
        mctx.restore();

        // Draw Right-Side Architectural Cards (FOCUSED 3-CARD MIDDLE VIEWPORT WINDOW WITH FADE MASKING)
        if (easeSlide > 0.02) {
          const cardsFadeIn = Math.min(Math.max((scrollProgress - 0.46) / 0.05, 0), 1.0);
          const textOpacity = cardsFadeIn;

          const textX = isMobile ? width * 0.06 : Math.max(width * 0.54, 580);
          const cardWidth = isMobile ? width * 0.88 : Math.min(width * 0.40, 520);

          const cardGap = 20;
          const innerPaddingX = 24; // 24PX INNER PADDING LEFT & RIGHT
          const innerPaddingY = 24; // 24PX INNER PADDING TOP & BOTTOM

          // CARDS DATA
          const cardsData = [
            {
              title: 'UNTANGLE',
              desc: 'I enjoy taking complicated products and figuring out how they should actually work.',
              pills: ['Complex Products', 'Enterprise UX', 'Workflow Logic', 'Problem Solving']
            },
            {
              title: 'STRUCTURE',
              desc: 'I turn scattered requirements and messy processes into clear product experiences.',
              pills: ['Information Architecture', 'Product Structure', 'User Flows', 'Simplification']
            },
            {
              title: 'THINK BUSINESS',
              desc: 'I design with an eye on users, business goals, product value, and what is actually feasible.',
              pills: ['Product Thinking', 'Business Goals', 'Prioritization', 'Trade-offs']
            },
            {
              title: 'BUILD',
              desc: 'I understand the space between design and development, helping ideas move from Figma into real products.',
              pills: ['Developer Collaboration', 'Design Handoff', 'Frontend Awareness', 'Feasibility']
            },
            {
              title: 'MAKE IT BETTER',
              desc: 'I bring strong visual thinking to functional products, turning usable experiences into polished ones.',
              pills: ['Visual Design', 'Interaction', 'UI Craft', 'Design Systems']
            },
            {
              title: 'OWN IT',
              desc: 'I’m comfortable jumping between problems, learning fast, and taking an idea from ambiguity to execution.',
              pills: ['Ownership', 'Curiosity', 'Adaptability', 'Fast Learner']
            }
          ];

          // Compute total stack height of all 6 cards
          let totalCardsStackH = 0;
          const cardHeights = [];

          const pillPaddingX = 14; // 14px left/right
          const pillHeight = 28;   // 28px total height
          const pillGapX = 8;
          const pillGapY = 8;

          cardsData.forEach((c, idx) => {
            const maxContentWidth = Math.max(cardWidth - (innerPaddingX * 2), 120);

            // 1. Calculate wrapped lines for description paragraph
            const words = c.desc.split(' ');
            let line = '';
            let lineCount = 1;
            mctx.font = '300 12.5px Poppins, sans-serif';
            for (let n = 0; n < words.length; n++) {
              const testLine = line + words[n] + ' ';
              if (mctx.measureText(testLine).width > maxContentWidth && n > 0) {
                line = words[n] + ' ';
                lineCount++;
              } else {
                line = testLine;
              }
            }
            const descTextHeight = lineCount * 18;

            // 2. Calculate multi-row wrapped layout for pills (Weight 500)
            mctx.font = '500 13.5px Poppins, sans-serif';
            const pillRows = [];
            let currentRow = [];
            let currentRowWidth = 0;

            c.pills.forEach((p) => {
              const pWidth = pillPaddingX + mctx.measureText(p).width + pillPaddingX;
              if (currentRow.length > 0 && (currentRowWidth + pillGapX + pWidth) > maxContentWidth) {
                pillRows.push({ pills: currentRow, totalWidth: currentRowWidth });
                currentRow = [{ name: p, width: pWidth }];
                currentRowWidth = pWidth;
              } else {
                if (currentRow.length > 0) currentRowWidth += pillGapX;
                currentRow.push({ name: p, width: pWidth });
                currentRowWidth += pWidth;
              }
            });
            if (currentRow.length > 0) {
              pillRows.push({ pills: currentRow, totalWidth: currentRowWidth });
            }

            const pillRowsCount = pillRows.length;
            const totalPillsHeight = pillRowsCount * pillHeight + Math.max(pillRowsCount - 1, 0) * pillGapY;

            const hFactor = (cardHoverFactors && cardHoverFactors[idx]) || 0;

            // Title (22px) + Gap (12px) + Desc + Pills gap (12px + totalPillsHeight)
            const cardH = (innerPaddingY + 22 + 12 + descTextHeight) + (12 + totalPillsHeight) * hFactor + innerPaddingY;
            cardHeights.push(cardH);
            totalCardsStackH += cardH + cardGap;
          });

          // 3-ITEM MIDDLE VIEWPORT WINDOW GEOMETRY
          const middleWindowH = Math.min(height * 0.62, 450);
          const middleWindowCenterY = height * 0.50;
          const viewportTopY = middleWindowCenterY - middleWindowH / 2;
          const viewportBotY = middleWindowCenterY + middleWindowH / 2;
          const fadeZoneH = 50; // Smooth 50px fade-out at top & bottom boundaries

          // Initial start Y so Cards 1, 2, 3 sit centered in the 3-item middle window
          const startY = viewportTopY + 15;

          // Cards scroll sequence (scrollProgress 0.48 -> 0.64)
          const cardsScrollSeq = Math.min(Math.max((scrollProgress - 0.48) / 0.16, 0), 1.0);
          const easeCardsScroll = cardsScrollSeq * cardsScrollSeq * (3 - 2 * cardsScrollSeq);

          // End position so Cards 4, 5, 6 sit centered in the 3-item middle window
          const initialCard6BottomY = startY + totalCardsStackH - cardGap;
          const targetCard6BottomY = viewportBotY - 15;
          const maxScrollDistance = Math.max(initialCard6BottomY - targetCard6BottomY, 0);

          const scrollOffsetY = - (easeCardsScroll * maxScrollDistance);

          let currentCardY = startY + scrollOffsetY;

          cardsData.forEach((c, idx) => {
            const cardHeight = cardHeights[idx];
            const mx = smoothMouse.x;
            const my = smoothMouse.y;

            // Mouse Bounding Box Check
            const isMouseOver = (mx >= textX && mx <= textX + cardWidth && my >= currentCardY && my <= currentCardY + cardHeight);

            // Lerp hover factor smoothly (0.0 -> 1.0)
            const targetHover = isMouseOver ? 1.0 : 0.0;
            if (cardHoverFactors && cardHoverFactors[idx] !== undefined) {
              cardHoverFactors[idx] += (targetHover - cardHoverFactors[idx]) * 0.12;
            }
            const hFactor = (cardHoverFactors && cardHoverFactors[idx]) || 0;

            // FADE AND HIDE TOP & BOTTOM CONTENT OUTSIDE 3-ITEM MIDDLE WINDOW
            const cardCenterY = currentCardY + cardHeight * 0.5;

            let topFade = 1.0;
            if (cardCenterY < viewportTopY) {
              topFade = Math.max(1.0 - (viewportTopY - cardCenterY) / fadeZoneH, 0.0);
            }

            let botFade = 1.0;
            if (cardCenterY > viewportBotY) {
              botFade = Math.max(1.0 - (cardCenterY - viewportBotY) / fadeZoneH, 0.0);
            }

            const cardEdgeAlpha = Math.min(topFade, botFade);

            // Render Card Content & Mild Division Lines ONLY IF within visible middle 3-item window
            if (cardEdgeAlpha > 0.01) {
              mctx.save();
              mctx.globalAlpha = avatarAlpha * textOpacity * cardEdgeAlpha;

              // 1. MILD ELEGANT HORIZONTAL DIVISION LINE BETWEEN ADJACENT CARDS (FOR idx > 0)
              if (idx > 0) {
                const dividerY = currentCardY - cardGap / 2;
                const prevHFactor = (cardHoverFactors && cardHoverFactors[idx - 1]) || 0;
                const lineHFactor = Math.max(hFactor, prevHFactor);

                mctx.save();
                mctx.lineWidth = 1.0;

                const lineGrad = mctx.createLinearGradient(textX, dividerY, textX + cardWidth, dividerY);
                lineGrad.addColorStop(0, 'transparent');
                lineGrad.addColorStop(0.15, `rgba(255, 255, 255, ${(0.14 + 0.22 * lineHFactor).toFixed(2)})`);
                lineGrad.addColorStop(0.5, `rgba(255, 255, 255, ${(0.22 + 0.28 * lineHFactor).toFixed(2)})`);
                lineGrad.addColorStop(0.85, `rgba(255, 255, 255, ${(0.14 + 0.22 * lineHFactor).toFixed(2)})`);
                lineGrad.addColorStop(1, 'transparent');

                mctx.strokeStyle = lineGrad;
                mctx.beginPath();
                mctx.moveTo(textX, dividerY);
                mctx.lineTo(textX + cardWidth, dividerY);
                mctx.stroke();
                mctx.restore();
              }

              // 2. CENTER ALIGNED CONTENT LAYOUT
              const centerX = textX + cardWidth / 2;
              const maxContentWidth = Math.max(cardWidth - (innerPaddingX * 2), 120);

              // Title: Heading Weight 600, Size 20px, CENTER ALIGNED
              mctx.font = '600 20px Poppins, sans-serif';
              mctx.fillStyle = '#ffffff';
              mctx.textAlign = 'center';
              mctx.textBaseline = 'top';
              mctx.fillText(c.title, centerX, currentCardY + innerPaddingY);

              // Description Paragraph: Exactly 12px space below title, CENTER ALIGNED
              mctx.font = '300 12.5px Poppins, sans-serif';
              mctx.fillStyle = `rgba(255, 255, 255, ${(0.78 + 0.22 * hFactor).toFixed(2)})`;
              wrapCanvasTextCentered(mctx, c.desc, centerX, currentCardY + innerPaddingY + 34, maxContentWidth, 18);

              // 3. TECH TAG PILLS: MILD BACKGROUND FILL, NO BORDER, REDUCED WEIGHT 500, PERFECT CENTERED TEXT ALIGNMENT
              if (hFactor > 0.01) {
                mctx.save();
                mctx.globalAlpha = cardEdgeAlpha * hFactor;

                mctx.font = '500 13.5px Poppins, sans-serif';

                // Build multi-row wrapped layout for pills
                const pillRows = [];
                let currentRow = [];
                let currentRowWidth = 0;

                c.pills.forEach((p) => {
                  const pWidth = pillPaddingX + mctx.measureText(p).width + pillPaddingX;
                  if (currentRow.length > 0 && (currentRowWidth + pillGapX + pWidth) > maxContentWidth) {
                    pillRows.push({ pills: currentRow, totalWidth: currentRowWidth });
                    currentRow = [{ name: p, width: pWidth }];
                    currentRowWidth = pWidth;
                  } else {
                    if (currentRow.length > 0) currentRowWidth += pillGapX;
                    currentRow.push({ name: p, width: pWidth });
                    currentRowWidth += pWidth;
                  }
                });
                if (currentRow.length > 0) {
                  pillRows.push({ pills: currentRow, totalWidth: currentRowWidth });
                }

                const pillRowsCount = pillRows.length;
                const totalPillsHeight = pillRowsCount * pillHeight + Math.max(pillRowsCount - 1, 0) * pillGapY;

                let startPillY = currentCardY + cardHeight - innerPaddingY - totalPillsHeight;

                pillRows.forEach((rObj) => {
                  let pillX = centerX - rObj.totalWidth / 2;

                  rObj.pills.forEach((pObj) => {
                    const pWidth = pObj.width;

                    // MILD TRANSLUCENT BACKGROUND FILL (NO BORDER)
                    mctx.fillStyle = 'rgba(255, 255, 255, 0.12)';

                    mctx.beginPath();
                    if (mctx.roundRect) {
                      mctx.roundRect(pillX, startPillY, pWidth, pillHeight, 14);
                    } else {
                      mctx.rect(pillX, startPillY, pWidth, pillHeight);
                    }
                    mctx.fill();

                    // PERFECT 100% MATHEMATICAL VERTICAL & HORIZONTAL CENTERED TEXT ALIGNMENT
                    mctx.fillStyle = '#ffffff';
                    mctx.textAlign = 'center';
                    mctx.textBaseline = 'middle';
                    mctx.fillText(pObj.name, pillX + pWidth / 2, startPillY + pillHeight / 2 + 0.5);

                    pillX += pWidth + pillGapX;
                  });

                  startPillY += pillHeight + pillGapY;
                });

                mctx.restore();
              }

              mctx.restore();
            }

            currentCardY += cardHeight + cardGap;
          });

          mctx.restore();
        }

        mctx.restore();
      }
    }
  }

  /**
   * Render Organic 4-Corner Dust White Portal + 2-STAGE KEYFRAMED IMAGE SLIDE + KINETIC BOTTOM-LEFT PROJECT TITLE OVERLAY + STRICT IMAGE BOUNDING BOX HOVER CURSOR CIRCLE ("EXPLORE")
   */
  function renderTopTransition(t, progress, scrollProgress) {
    if (!topCtx) return;
    topCtx.clearRect(0, 0, width, height);

    if (progress <= 0) {
      whiteDustParticles = [];
      return;
    }

    const cx = width * 0.5;
    const cy = height * 0.5;
    const maxDiag = Math.sqrt(cx * cx + cy * cy) * 1.5;

    topCtx.save();
    topCtx.fillStyle = '#ffffff';
    topCtx.beginPath();

    const totalPoints = 14;
    const baseRadius = maxDiag * Math.pow(progress, 1.6);

    const pts = [];
    for (let i = 0; i < totalPoints; i++) {
      const angle = (i / totalPoints) * Math.PI * 2;
      
      const cornerFactor = Math.abs(Math.sin(angle * 2));
      const cornerNoise = (1 + cornerFactor * 0.35) * baseRadius;
      const waveNoise = Math.sin(angle * 5 + t * 2.8) * 45 * Math.sin(progress * Math.PI);
      const waveNoise2 = Math.cos(angle * 3 - t * 2.2) * 35 * Math.sin(progress * Math.PI);

      const r = Math.min(cornerNoise + waveNoise + waveNoise2, maxDiag * 1.2);

      const px = cx + Math.cos(angle) * r;
      const py = cy + Math.sin(angle) * r;

      pts.push({ x: px, y: py });
    }

    topCtx.moveTo((pts[0].x + pts[pts.length - 1].x) / 2, (pts[0].y + pts[pts.length - 1].y) / 2);
    for (let i = 0; i < pts.length; i++) {
      const nextPt = pts[(i + 1) % pts.length];
      const midX = (pts[i].x + nextPt.x) / 2;
      const midY = (pts[i].y + nextPt.y) / 2;
      topCtx.quadraticCurveTo(pts[i].x, pts[i].y, midX, midY);
    }
    topCtx.closePath();
    topCtx.fill();

    // RENDER 16:9 WIDESCREEN FULL-FRAME 1-COLUMN IMAGES AFTER PORTAL OPENS TO 30%
    if (progress >= 0.30) {
      const portalAlpha = Math.min((progress - 0.30) / 0.15, 1.0);

      topCtx.save();
      topCtx.clip(); // Clip directly inside the organic expanding portal!
      topCtx.globalAlpha = portalAlpha;

      // 3-STAGE TIMELINE MATH (01 Catering -> 02 Yes2Food -> 03 Habit Partner)
      let slideRaw = 0;
      if (scrollProgress >= 0.76) {
        slideRaw = Math.min((scrollProgress - 0.76) / 0.12, 2.0);
      }

      // Mouse Parallax Offset (subtle)
      const mouseOffsetY = (smoothMouse.y - height * 0.5) * 0.015;
      let isCursorInsideImage = false;

      // Image 1: Catering Made Easy (Pinned stationary at y = 0)
      const img1Y = mouseOffsetY;
      let b1 = drawImageCover(topCtx, showcase1Img, 0, img1Y, width, height);
      if (b1 && smoothMouse.x >= b1.dx && smoothMouse.x <= b1.dx + b1.dw &&
          smoothMouse.y >= b1.dy && smoothMouse.y <= b1.dy + b1.dh && slideRaw < 0.85) {
        isCursorInsideImage = true;
        img1HoverFactor += (1.0 - img1HoverFactor) * 0.12;
      } else {
        img1HoverFactor += (0.0 - img1HoverFactor) * 0.12;
      }

      if (b1 && img1HoverFactor > 0.005) {
        topCtx.save();
        const trX = b1.dx + b1.dw;
        const trY = b1.dy;
        const blX = b1.dx - b1.dw * (1.0 - img1HoverFactor * 0.8);
        const blY = b1.dy + b1.dh * (1.0 + img1HoverFactor * 0.8);

        const sweepGrad = topCtx.createLinearGradient(trX, trY, blX, blY);
        sweepGrad.addColorStop(0.0, `rgba(35, 40, 50, ${0.75 * img1HoverFactor})`);
        sweepGrad.addColorStop(Math.min(img1HoverFactor * 0.7, 1.0), `rgba(25, 28, 35, ${0.68 * img1HoverFactor})`);
        sweepGrad.addColorStop(1.0, `rgba(15, 18, 22, ${0.60 * img1HoverFactor})`);

        topCtx.fillStyle = sweepGrad;
        topCtx.fillRect(b1.dx, b1.dy, b1.dw, b1.dh);
        topCtx.restore();
      }

      // Image 2: Yes2Food Business (Slides up from bottom at slideRaw 0.0 -> 1.0)
      const slide2Stage = Math.min(Math.max(slideRaw, 0.0), 1.0);
      const easeSlide2 = slide2Stage * slide2Stage * (3 - 2 * slide2Stage);
      const img2Y = (1.0 - easeSlide2) * height + mouseOffsetY;

      let b2 = null;
      if (slideRaw > 0.001) {
        b2 = drawImageCover(topCtx, showcase2Img, 0, img2Y, width, height);
        if (b2 && smoothMouse.x >= b2.dx && smoothMouse.x <= b2.dx + b2.dw &&
            smoothMouse.y >= b2.dy && smoothMouse.y <= b2.dy + b2.dh && slideRaw >= 0.15 && slideRaw < 1.85) {
          isCursorInsideImage = true;
          img2HoverFactor += (1.0 - img2HoverFactor) * 0.12;
        } else {
          img2HoverFactor += (0.0 - img2HoverFactor) * 0.12;
        }

        if (b2 && img2HoverFactor > 0.005) {
          topCtx.save();
          const trX = b2.dx + b2.dw;
          const trY = b2.dy;
          const blX = b2.dx - b2.dw * (1.0 - img2HoverFactor * 0.8);
          const blY = b2.dy + b2.dh * (1.0 + img2HoverFactor * 0.8);

          const sweepGrad = topCtx.createLinearGradient(trX, trY, blX, blY);
          sweepGrad.addColorStop(0.0, `rgba(35, 40, 50, ${0.75 * img2HoverFactor})`);
          sweepGrad.addColorStop(Math.min(img2HoverFactor * 0.7, 1.0), `rgba(25, 28, 35, ${0.68 * img2HoverFactor})`);
          sweepGrad.addColorStop(1.0, `rgba(15, 18, 22, ${0.60 * img2HoverFactor})`);

          topCtx.fillStyle = sweepGrad;
          topCtx.fillRect(b2.dx, b2.dy, b2.dw, b2.dh);
          topCtx.restore();
        }
      } else {
        img2HoverFactor = 0.0;
      }

      // Image 3: Habit Partner Mobile App (Slides up from bottom at slideRaw 1.0 -> 2.0)
      const slide3Stage = Math.min(Math.max(slideRaw - 1.0, 0.0), 1.0);
      const easeSlide3 = slide3Stage * slide3Stage * (3 - 2 * slide3Stage);
      const img3Y = (1.0 - easeSlide3) * height + mouseOffsetY;

      let b3 = null;
      if (slideRaw > 1.001) {
        b3 = drawImageCover(topCtx, showcase3Img, 0, img3Y, width, height);
        if (b3 && smoothMouse.x >= b3.dx && smoothMouse.x <= b3.dx + b3.dw &&
            smoothMouse.y >= b3.dy && smoothMouse.y <= b3.dy + b3.dh && slideRaw >= 1.15) {
          isCursorInsideImage = true;
          img3HoverFactor += (1.0 - img3HoverFactor) * 0.12;
        } else {
          img3HoverFactor += (0.0 - img3HoverFactor) * 0.12;
        }

        if (b3 && img3HoverFactor > 0.005) {
          topCtx.save();
          const trX = b3.dx + b3.dw;
          const trY = b3.dy;
          const blX = b3.dx - b3.dw * (1.0 - img3HoverFactor * 0.8);
          const blY = b3.dy + b3.dh * (1.0 + img3HoverFactor * 0.8);

          const sweepGrad = topCtx.createLinearGradient(trX, trY, blX, blY);
          sweepGrad.addColorStop(0.0, `rgba(35, 40, 50, ${0.75 * img3HoverFactor})`);
          sweepGrad.addColorStop(Math.min(img3HoverFactor * 0.7, 1.0), `rgba(25, 28, 35, ${0.68 * img3HoverFactor})`);
          sweepGrad.addColorStop(1.0, `rgba(15, 18, 22, ${0.60 * img3HoverFactor})`);

          topCtx.fillStyle = sweepGrad;
          topCtx.fillRect(b3.dx, b3.dy, b3.dw, b3.dh);
          topCtx.restore();
        }
      } else {
        img3HoverFactor = 0.0;
      }

      // RENDER REFERENCE DESIGN OVERLAY (VERTICALLY CENTERED ON SCREEN WITH SCROLL PROGRESS BAR LINE)
      topCtx.save();
      topCtx.globalAlpha = portalAlpha;

      let activeIndex = 0;
      if (slideRaw >= 1.45 || (b3 && img3Y <= height * 0.50)) {
        activeIndex = 2;
      } else if (slideRaw >= 0.45 || (b2 && img2Y <= height * 0.50)) {
        activeIndex = 1;
      }

      const isImage2Past50 = activeIndex > 0;
      isImage2Past50Global = isImage2Past50;
      isCursorInsideImageGlobal = isCursorInsideImage;
      activeIndexGlobal = activeIndex;

      const activeNum = activeIndex === 2 ? '03' : (activeIndex === 1 ? '02' : '01');
      const activePill = activeIndex === 2 ? '🎯 Habit Partner' : (activeIndex === 1 ? '⚡ Yes2Food' : '🍽 Catering');
      const activeSub = activeIndex === 2 ? '— Social Habit Tracker' : (activeIndex === 1 ? '— Enterprise Dashboard' : '— Mobile Experience');
      const activeHeadline = activeIndex === 2
        ? 'Habit Partner — Social Habit Tracker & Accountability Mobile App'
        : (activeIndex === 1
          ? 'Yes2Food Business — Enterprise Merchant & Orders Dashboard'
          : 'Catering Made Easy — Mobile Order & Bulk Catering Experience');

      const marginX = Math.max(width * 0.08, 40);
      const availableW = width - (marginX * 2);

      // VERTICAL CENTERED LAYOUT MATH:
      const titleFontSize = width < 768 ? 22 : (width < 1200 ? 32 : 40);
      const lineY = (height * 0.50) - 50;

      // 1. SCROLL-DRIVEN HORIZONTAL PROGRESS BAR DIVIDER LINE (100% END-TO-END SCREEN FILL, WHITE COLOR, NO CIRCLE)
      let showcaseProgress = 0.0;
      if (scrollProgress >= 0.68) {
        showcaseProgress = Math.min(Math.max((scrollProgress - 0.68) / 0.30, 0), 1.0);
      }
      const currentLineEndX = showcaseProgress * width;

      // Background subtle guide line (100% end-to-end from 0 to width)
      topCtx.strokeStyle = 'rgba(255, 255, 255, 0.20)';
      topCtx.lineWidth = 1.0;
      topCtx.beginPath();
      topCtx.moveTo(0, lineY);
      topCtx.lineTo(width, lineY);
      topCtx.stroke();

      // Active expanding pure white progress bar line based on scroll (no circle dot!)
      if (showcaseProgress > 0.001) {
        const lineGrad = topCtx.createLinearGradient(0, lineY, currentLineEndX, lineY);
        lineGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
        lineGrad.addColorStop(1, '#ffffff');
        topCtx.strokeStyle = lineGrad;
        topCtx.lineWidth = 2.0;
        topCtx.beginPath();
        topCtx.moveTo(0, lineY);
        topCtx.lineTo(currentLineEndX, lineY);
        topCtx.stroke();
      }

      // 2. Top-Left Number Counter (01 / 02) Above Line
      topCtx.font = '700 15px Poppins, sans-serif';
      topCtx.fillStyle = '#ffffff';
      topCtx.textAlign = 'left';
      topCtx.textBaseline = 'alphabetic';
      topCtx.fillText(activeNum, marginX, lineY - 14);

      // 3. Top-Center Brand Pill Badge (Overlapping line)
      const pillText = activePill;
      topCtx.font = '600 12px Poppins, sans-serif';
      const pillW = topCtx.measureText(pillText).width + 32;
      const pillX = (width * 0.40) - (pillW / 2);
      const pillY = lineY - 14;

      topCtx.fillStyle = 'rgba(147, 197, 253, 0.35)';
      topCtx.beginPath();
      if (topCtx.roundRect) {
        topCtx.roundRect(pillX, pillY, pillW, 28, 14);
      } else {
        topCtx.rect(pillX, pillY, pillW, 28);
      }
      topCtx.fill();

      topCtx.fillStyle = '#ffffff';
      topCtx.textAlign = 'center';
      topCtx.textBaseline = 'middle';
      topCtx.fillText(pillText, pillX + pillW / 2, pillY + 14);

      // 4. Left Sub-Label Below Line
      topCtx.textAlign = 'left';
      topCtx.textBaseline = 'top';
      topCtx.font = '500 13px Poppins, sans-serif';
      topCtx.fillStyle = 'rgba(255, 255, 255, 0.78)';
      topCtx.fillText(activeSub, marginX, lineY + 28);

      // 5. Main Center Editorial Headline
      const headlineX = width < 900 ? marginX : Math.max(width * 0.32, 340);
      const headlineMaxW = width < 900 ? width - marginX * 2 : Math.min(width * 0.58, 720);

      topCtx.font = `700 ${titleFontSize}px Poppins, sans-serif`;
      topCtx.fillStyle = '#ffffff';

      wrapCanvasText(topCtx, activeHeadline, headlineX, lineY + 38, headlineMaxW, titleFontSize * 1.28);
      topCtx.restore();

      // RENDER INTERACTIVE NEGATIVE-COLOR BLEND HOVER CURSOR CIRCLE ("EXPLORE") ONLY WHEN CURSOR IS INSIDE THE VISIBLE IMAGE BOUNDS
      const targetScale = isCursorInsideImage ? 1.0 : 0.0;
      exploreCursor.scale += (targetScale - exploreCursor.scale) * 0.18;
      exploreCursor.x += (smoothMouse.x - exploreCursor.x) * 0.18;
      exploreCursor.y += (smoothMouse.y - exploreCursor.y) * 0.18;

      const circleRadius = 56 * exploreCursor.scale;

      if (circleRadius > 0.8) {
        topCtx.save();

        // 1. Draw Solid White Circle with 'difference' composite mode to produce negative color inversion of image underneath!
        topCtx.globalCompositeOperation = 'difference';
        topCtx.fillStyle = '#ffffff';
        topCtx.beginPath();
        topCtx.arc(exploreCursor.x, exploreCursor.y, circleRadius, 0, Math.PI * 2);
        topCtx.fill();

        // 2. Draw Centered Text "Explore" in 'difference' mode for dynamic inverse text contrast!
        topCtx.font = '600 13px Poppins, sans-serif';
        topCtx.letterSpacing = '1.5px';
        topCtx.textAlign = 'center';
        topCtx.textBaseline = 'middle';
        topCtx.fillStyle = '#ffffff';
        topCtx.fillText('Explore', exploreCursor.x, exploreCursor.y + 0.5);

        topCtx.restore();
      }

      topCtx.restore();
    }

    if (progress > 0.35) {
      const gridAlpha = Math.min((progress - 0.35) / 0.35, 1.0);

      const mouseOffsetX = (smoothMouse.x - width * 0.5);
      const mouseOffsetY = (smoothMouse.y - height * 0.5);

      topCtx.save();
      topCtx.globalAlpha = gridAlpha * 0.65;
      topCtx.strokeStyle = 'rgba(0, 0, 0, 0.22)';
      topCtx.lineWidth = 1.2;
      topCtx.setLineDash([8, 8]);

      const computedVertLines = verticalGridLines.map((line) => {
        const shiftY = mouseOffsetY * line.speed;
        const x = width * line.baseRatio;
        return { x, shiftY, speed: line.speed };
      });

      const computedHorizLines = horizontalGridLines.map((line) => {
        const shiftX = mouseOffsetX * line.speed;
        const y = height * line.baseRatio;
        return { y, shiftX, speed: line.speed };
      });

      computedVertLines.forEach((vLine) => {
        topCtx.beginPath();
        topCtx.moveTo(vLine.x, 0);
        topCtx.lineTo(vLine.x, height);
        topCtx.stroke();
      });

      computedHorizLines.forEach((hLine) => {
        topCtx.beginPath();
        topCtx.moveTo(0, hLine.y);
        topCtx.lineTo(width, hLine.y);
        topCtx.stroke();
      });

      topCtx.setLineDash([]);
      topCtx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
      topCtx.lineWidth = 1.4;

      computedVertLines.forEach((vLine, colIdx) => {
        computedHorizLines.forEach((hLine, rowIdx) => {
          const ix = vLine.x + hLine.shiftX * 0.5;
          const iy = hLine.y + vLine.shiftY * 0.5;

          topCtx.beginPath();
          topCtx.moveTo(ix - 7, iy);
          topCtx.lineTo(ix + 7, iy);
          topCtx.moveTo(ix, iy - 7);
          topCtx.lineTo(ix, iy + 7);
          topCtx.stroke();

          if ((colIdx + rowIdx) % 2 === 1) {
            const boxSize = 14;
            const offsetX = ((colIdx % 3) - 1) * 22;
            const offsetY = ((rowIdx % 2) - 0.5) * 28;

            const bx = ix + offsetX;
            const by = iy + offsetY;

            topCtx.save();
            topCtx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
            topCtx.lineWidth = 1.0;
            topCtx.setLineDash([3, 3]);
            topCtx.strokeRect(bx - boxSize / 2, by - boxSize / 2, boxSize, boxSize);
            topCtx.restore();
          }
        });
      });

      topCtx.restore();
    }

    if (progress > 0.05 && progress < 0.95 && Math.random() < 0.85) {
      const randomPt = pts[Math.floor(Math.random() * pts.length)];
      whiteDustParticles.push({
        x: randomPt.x + (Math.random() - 0.5) * 50,
        y: randomPt.y + (Math.random() - 0.5) * 50,
        vx: (Math.random() - 0.5) * 4.0,
        vy: (Math.random() - 0.5) * 4.0 - 1.5,
        size: Math.random() * 4.5 + 1.2,
        life: 1.0,
        decay: Math.random() * 0.035 + 0.018,
      });
    }

    for (let i = whiteDustParticles.length - 1; i >= 0; i--) {
      const p = whiteDustParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        whiteDustParticles.splice(i, 1);
        continue;
      }

      topCtx.fillStyle = `rgba(255, 255, 255, ${p.life * 0.95})`;
      topCtx.beginPath();
      topCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      topCtx.fill();
    }

    topCtx.restore();
  }

  /**
   * Main render loop
   */
  function animate() {
    time += 0.02;

    smoothMouse.x += (mouse.x - smoothMouse.x) * 0.06;
    smoothMouse.y += (mouse.y - smoothMouse.y) * 0.06;

    // VELOCITY-CAPPED INERTIAL LERP SMOOTH SCROLL ENGINE
    if (scrollWrapper) {
      const maxScroll = scrollWrapper.offsetHeight - window.innerHeight;
      if (maxScroll > 0) {
        rawScrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      }
    }

    // Velocity-Capped Inertial Physics Loop:
    const scrollDiff = rawScrollProgress - smoothScrollProgress;
    const maxScrollSpeedPerFrame = 0.0075; // Controlled constant maximum speed cap
    const scrollLerpFactor = 0.07;          // Smooth acceleration & deceleration curve

    let scrollStep = scrollDiff * scrollLerpFactor;
    if (Math.abs(scrollStep) > maxScrollSpeedPerFrame) {
      scrollStep = Math.sign(scrollStep) * maxScrollSpeedPerFrame;
    }

    smoothScrollProgress += scrollStep;

    if (heroContent) {
      if (smoothScrollProgress > 0.04) {
        heroContent.classList.add('fade-out-text');
      } else {
        heroContent.classList.remove('fade-out-text');
      }
    }

    // White Organic Portal Expansion Progress (smoothScrollProgress 0.68 -> 0.80)
    let whitePortalProgress = 0;
    if (smoothScrollProgress > 0.68) {
      whitePortalProgress = Math.min((smoothScrollProgress - 0.68) / 0.12, 1.0);
    }

    if (siteHeader) {
      if (whitePortalProgress > 0.35) {
        siteHeader.classList.remove('dark-header');
      } else if (smoothScrollProgress > 0.04) {
        siteHeader.classList.add('dark-header');
      } else {
        siteHeader.classList.remove('dark-header');
      }
    }

    // ABOUT ME STAGE: smoothScrollProgress 0.04 -> 0.20
    let aboutOpacity = 0.0;
    let aboutScale = 1.0;

    if (smoothScrollProgress > 0.04 && smoothScrollProgress < 0.20) {
      if (smoothScrollProgress < 0.10) {
        aboutOpacity = Math.min((smoothScrollProgress - 0.04) / 0.06, 1.0);
        aboutScale = 1.0;
      } else if (smoothScrollProgress > 0.16) {
        const fadeProgress = Math.min((smoothScrollProgress - 0.16) / 0.04, 1.0);
        aboutOpacity = 1.0 - fadeProgress;
        aboutScale = 1.0 - fadeProgress * 0.12;
      } else {
        aboutOpacity = 1.0;
        aboutScale = 1.0;
      }
    }

    renderMediaTexture(time, smoothScrollProgress, aboutOpacity, aboutScale, whitePortalProgress);

    ctx.clearRect(0, 0, width, height);

    const bgOpacity = Math.max(1 - smoothScrollProgress * 2.8, 0);
    ctx.fillStyle = `rgba(255, 255, 255, ${bgOpacity})`;
    ctx.fillRect(0, 0, width, height);

    if (bgOpacity < 1) {
      ctx.fillStyle = `rgba(10, 10, 10, ${1 - bgOpacity})`;
      ctx.fillRect(0, 0, width, height);
    }

    const zoomProgress = Math.min(smoothScrollProgress / 0.18, 1);
    const easeScroll = Math.pow(zoomProgress, 2.2);
    const zoomScale = 1.0 + easeScroll * 18.0;

    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const targetCenterX = isMobile ? width * 0.5 : (isTablet ? width * 0.82 : width * 0.78);
    const centerX = targetCenterX + (width * 0.5 - targetCenterX) * Math.min(zoomProgress * 1.5, 1);
    const centerY = height * 0.48;

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

    // 4. SUBTLE OUTER SHADOW STROKE AROUND DEFORMING JELLY PORTAL
    if (zoomProgress < 0.85) {
      ctx.save();
      ctx.lineWidth = Math.max(10 * (1 - zoomProgress), 1);
      ctx.strokeStyle = `rgba(0, 0, 0, ${0.12 * (1 - zoomProgress)})`;
      ctx.filter = 'blur(6px)';
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
      const spinAngle = time * 0.14; // Reduced rotation speed as requested!
      const circularTextCopy = "AKILESH  •  UI/UX DESIGNER  •  PRODUCT ARCHITECT  •  AKILESH  •  UI/UX DESIGNER  •  PRODUCT ARCHITECT  •  ";

      drawSpinningCircularText(ctx, circularTextCopy, centerX, centerY, spinningTextRadius, spinAngle, spinningTextAlpha);
    }

    // Micro Particle Mouse Dust Trail
    if (zoomProgress < 0.55) {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = p.life * 0.85 * (1 - zoomProgress * 1.8);
        ctx.fillStyle = `rgba(15, 23, 42, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    renderTopTransition(time, whitePortalProgress, smoothScrollProgress);

    requestAnimationFrame(animate);
  }

  animate();
}

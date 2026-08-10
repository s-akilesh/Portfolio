/**
 * Fluid Canvas Module — Portal Zoom, 50-50 About Section, 3D Character Animation Video Section (Focused 3-Card Viewport Window), Organic 4-Corner Dust White Portal with 16:9 Widescreen Full-Frame Image Slide, Kinetic Bottom-Left Project Title Overlay (Separating & Joining Letter Spacing Hover Fade) & Interactive Negative-Color Blend Hover Cursor Circle ("EXPLORE") & Kinetic Architectural Dashed Grid
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

  // Smooth lerp position & scale for interactive negative-blend Explore hover cursor circle
  let exploreCursor = { x: -100, y: -100, scale: 0.0 };

  // Persistent smooth lerp hover factors for bottom-left project title text overlay
  let img1HoverFactor = 0.0;
  let img2HoverFactor = 0.0;

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

  // Organic Fluid "A" Letter Silhouette Control Points
  const baseAPoints = [
    { rx: 0.0, ry: -0.65 },
    { rx: 0.18, ry: -0.45 },
    { rx: 0.45, ry: -0.05 },
    { rx: 0.58, ry: 0.46 },
    { rx: 0.36, ry: 0.62 },
    { rx: 0.15, ry: 0.22 },
    { rx: 0.0, ry: 0.12 },
    { rx: -0.15, ry: 0.22 },
    { rx: -0.36, ry: 0.62 },
    { rx: -0.58, ry: 0.46 },
    { rx: -0.45, ry: -0.05 },
    { rx: -0.18, ry: -0.45 },
  ];

  // Static Content
  const LINE_1 = "I design products people choose to explore,";
  const LINE_2 = "and complex tools they learn to trust.";
  const TOTAL_CHARS = LINE_1.length + LINE_2.length;

  const BIO_P1 = "I’m a product design leader working across content experiences, AI-powered products, search and discovery, personalization, and design systems. At Dow Jones, I connect product direction with hands-on craft, aligning partners and carrying ambitious ideas into scalable foundations used across multiple brands.";
  const BIO_P2 = "I combine product strategy with hands-on interaction and visual design, turning ambiguous opportunities into high-fidelity concepts, prototypes, and production-ready experiences. My background in accessibility and design systems helps ambitious ideas retain their quality as they scale.";

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
   * Helper function to draw full UI showcase image centered inside canvas frame without cutting off UI elements
   * Returns exact image bounding box { dx, dy, dw, dh }
   */
  function drawImageFit(context, img, x, y, w, h) {
    if (!img.complete || img.naturalWidth === 0) return null;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const containerAspect = w / h;

    let dw, dh, dx, dy;

    if (Math.abs(imgAspect - containerAspect) < 0.1) {
      dw = w;
      dh = h;
      dx = x;
      dy = y;
    } else if (imgAspect > containerAspect) {
      dw = w;
      dh = w / imgAspect;
      dx = x;
      dy = y + (h - dh) / 2;
    } else {
      dh = h;
      dw = h * imgAspect;
      dx = x + (w - dw) / 2;
      dy = y;
    }

    context.drawImage(img, dx, dy, dw, dh);
    return { dx, dy, dw, dh };
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
   * Render portal texture with 50-50 split screen layout, 3D Character Animation Video Section & KINETIC ARCHITECTURAL DASHED GRID
   */
  function renderMediaTexture(t, scrollProgress, aboutOpacity, aboutScale, whitePortalProgress) {
    mctx.clearRect(0, 0, width, height);

    const portalCenterX = width * 0.5;
    const portalCenterY = height * 0.5;

    const blackShiftProgress = Math.min(Math.max((scrollProgress - 0.14) / 0.12, 0), 1);

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

    // RENDER KINETIC ARCHITECTURAL DASHED GRID FOR AVATAR SCREEN
    if (scrollProgress > 0.24 && whitePortalProgress < 0.95) {
      const gridAlpha = Math.min((scrollProgress - 0.24) / 0.10, 1.0) * (1 - whitePortalProgress);

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

    // 1. RENDER ABOUT ME SECTION
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

      mctx.font = '600 12px Poppins, sans-serif';
      mctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      mctx.fillText('AKILESH — CREATIVE ARCHITECT', portalTextX, textFloatY + 24);

      if (scrollProgress > 0.04) {
        isTypingTriggered = true;
      } else if (scrollProgress < 0.02) {
        isTypingTriggered = false;
        typedCharFloat = 0;
      }

      if (isTypingTriggered) {
        if (typedCharFloat < TOTAL_CHARS) {
          typedCharFloat += 2.0;
        }

        const charsToShow = Math.min(Math.floor(typedCharFloat), TOTAL_CHARS);

        let visibleLine1 = "";
        let visibleLine2 = "";

        if (charsToShow <= LINE_1.length) {
          visibleLine1 = LINE_1.substring(0, charsToShow);
          visibleLine2 = "";
        } else {
          visibleLine1 = LINE_1;
          visibleLine2 = LINE_2.substring(0, charsToShow - LINE_1.length);
        }

        let currentY = textFloatY + 58;
        const fontSize = width < 768 ? 14 : 16;

        mctx.font = `600 ${fontSize}px Poppins, sans-serif`;
        mctx.fillStyle = '#ffffff';

        const line1Text = visibleLine1 + (charsToShow <= LINE_1.length && charsToShow < TOTAL_CHARS ? '|' : '');
        mctx.fillText(line1Text, portalTextX, currentY);

        if (charsToShow > LINE_1.length) {
          const line2Text = visibleLine2 + (charsToShow < TOTAL_CHARS ? '|' : '');
          mctx.fillText(line2Text, portalTextX, currentY + 26);
          currentY += 26;
        }

        currentY += 42;

        if (charsToShow > LINE_1.length + 5) {
          mctx.font = '400 12.5px Poppins, sans-serif';
          mctx.fillStyle = 'rgba(255, 255, 255, 0.85)';

          currentY = wrapCanvasText(mctx, BIO_P1, portalTextX, currentY, textMaxWidth, 19);
          currentY += 12;

          currentY = wrapCanvasText(mctx, BIO_P2, portalTextX, currentY, textMaxWidth, 19);
          currentY += 24;

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

    // 2. RENDER 3D CHARACTER ANIMATION VIDEO SECTION (FOCUSED 3-CARD MIDDLE VIEWPORT WINDOW WITH FADE MASKING)
    if (scrollProgress > 0.28 && scrollProgress < 0.65) {
      const avatarAlpha = scrollProgress < 0.35 
        ? Math.min((scrollProgress - 0.28) / 0.07, 1.0)
        : (scrollProgress > 0.58 ? 1.0 - Math.min((scrollProgress - 0.58) / 0.07, 1.0) : 1.0);

      if (avatarAlpha > 0.01) {
        // Video slide to left completes by scrollProgress = 0.38
        const slideProgress = Math.min(Math.max((scrollProgress - 0.32) / 0.06, 0), 1.0);
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
          const cardsFadeIn = Math.min(Math.max((scrollProgress - 0.36) / 0.05, 0), 1.0);
          const textOpacity = cardsFadeIn;

          const textX = isMobile ? width * 0.06 : Math.max(width * 0.54, 580);
          const cardWidth = isMobile ? width * 0.88 : Math.min(width * 0.40, 520);

          const cardGap = 20;
          const innerPaddingX = 24; // 24PX INNER PADDING LEFT & RIGHT
          const innerPaddingY = 24; // 24PX INNER PADDING TOP & BOTTOM

          // CARDS DATA
          const cardsData = [
            {
              title: 'FRONTEND & CRAFT',
              desc: 'Crafting performant, responsive interfaces with modern frameworks. From SPAs to micro-frontends, I deliver pixel-perfect experiences.',
              pills: ['WebGL Shaders', 'Next.js', 'Design Systems', 'AI Integrations']
            },
            {
              title: 'GRAPHICS ENGINE',
              desc: 'Designing 60fps interactive visualizers, fluid control-point portals, and high-performance WebGL Canvas shader graphics.',
              pills: ['Canvas API', 'Shader Math', 'Kinetic Parallax']
            },
            {
              title: 'SCALABLE SYSTEMS',
              desc: 'Building reusable component token architectures and autonomous AI-powered search and discovery tools.',
              pills: ['Design Tokens', 'AI Agents', 'Accessibility']
            },
            {
              title: 'USER VALIDATION',
              desc: 'Conducting real user interviews, live usability tests, and iterative prototype validation to solve core product needs.',
              pills: ['User Research', 'Usability Testing', 'A/B Validation']
            },
            {
              title: 'COMPLEX WORKFLOWS',
              desc: 'Transforming complex multi-brand enterprise flows into clear, intuitive, and frictionless user journeys.',
              pills: ['Workflow UX', 'Multi-Brand', 'Information Arch']
            },
            {
              title: 'PRODUCT PERFORMANCE',
              desc: 'Streamlining performance architectures for rapid loading times, WCAG accessibility compliance, and high conversion.',
              pills: ['Core Web Vitals', 'WCAG AAA', 'Conversion Opt']
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

          // Cards scroll sequence (scrollProgress 0.40 -> 0.58)
          const cardsScrollSeq = Math.min(Math.max((scrollProgress - 0.40) / 0.18, 0), 1.0);
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

      // 2-STAGE TIMELINE MATH:
      // STAGE 1: Portal expands from 30% to 100% open (scrollProgress 0.58 -> 0.72). Image 1 stays 100% stationary centered (slideRaw = 0).
      // STAGE 2: AFTER portal is 100% open (scrollProgress >= 0.72), scrolling further slides Image 1 up and Image 2 into view!
      let slideRaw = 0;
      if (scrollProgress >= 0.72) {
        slideRaw = Math.min((scrollProgress - 0.72) / 0.23, 1.0);
      }
      const easeSlide = slideRaw * slideRaw * (3 - 2 * slideRaw); // 0.0 -> 1.0 smooth cubic ease

      // Mouse Parallax Offset (subtle)
      const mouseOffsetY = (smoothMouse.y - height * 0.5) * 0.015;

      let isCursorInsideImage = false;

      // Image 1 (Full-frame, stays 100% centered during portal entrance, then slides up AFTER portal is 100% open)
      const img1Y = - easeSlide * height + mouseOffsetY;
      let b1 = null;
      if (img1Y + height > -50) {
        b1 = drawImageFit(topCtx, showcase1Img, 0, img1Y, width, height);
        if (b1 && smoothMouse.x >= b1.dx && smoothMouse.x <= b1.dx + b1.dw &&
            smoothMouse.y >= b1.dy && smoothMouse.y <= b1.dy + b1.dh) {
          isCursorInsideImage = true;
          img1HoverFactor += (1.0 - img1HoverFactor) * 0.12;
        } else {
          img1HoverFactor += (0.0 - img1HoverFactor) * 0.12;
        }
      } else {
        img1HoverFactor = 0.0;
      }

      // Image 2 (Full-frame, slides up from bottom into frame AFTER portal is 100% open)
      const img2Y = height - easeSlide * height + mouseOffsetY;
      let b2 = null;
      if (img2Y < height + 50) {
        b2 = drawImageFit(topCtx, showcase2Img, 0, img2Y, width, height);
        if (b2 && smoothMouse.x >= b2.dx && smoothMouse.x <= b2.dx + b2.dw &&
            smoothMouse.y >= b2.dy && smoothMouse.y <= b2.dy + b2.dh) {
          isCursorInsideImage = true;
          img2HoverFactor += (1.0 - img2HoverFactor) * 0.12;
        } else {
          img2HoverFactor += (0.0 - img2HoverFactor) * 0.12;
        }
      } else {
        img2HoverFactor = 0.0;
      }

      // RENDER KINETIC BOTTOM-LEFT PROJECT TITLE & SUB-CONTENT OVERLAY
      // Hover In: Separated letters join together & fade in. Hover Out: Joined letters separate apart & fade out.
      if (b1 && img1HoverFactor > 0.005) {
        const textX = b1.dx + 42;
        const titleY = b1.dy + b1.dh - 58;
        const subY = b1.dy + b1.dh - 34;

        drawKineticText(topCtx, 'MYWORKER AI', textX, titleY, '600 22px Poppins, sans-serif', '#ffffff', img1HoverFactor, img1HoverFactor);
        drawKineticText(topCtx, 'Enterprise Autonomous AI Agent Ecosystem', textX, subY, '400 13px Poppins, sans-serif', 'rgba(255, 255, 255, 0.85)', img1HoverFactor, img1HoverFactor);
      }

      if (b2 && img2HoverFactor > 0.005) {
        const textX = b2.dx + 42;
        const titleY = b2.dy + b2.dh - 58;
        const subY = b2.dy + b2.dh - 34;

        drawKineticText(topCtx, 'PULSE STUDIO', textX, titleY, '600 22px Poppins, sans-serif', '#ffffff', img2HoverFactor, img2HoverFactor);
        drawKineticText(topCtx, '60fps Real-Time WebGL Audio Shader Engine', textX, subY, '400 13px Poppins, sans-serif', 'rgba(255, 255, 255, 0.85)', img2HoverFactor, img2HoverFactor);
      }

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

    let scrollProgress = 0;
    if (scrollWrapper) {
      const maxScroll = scrollWrapper.offsetHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      }
    }

    if (heroContent) {
      if (scrollProgress > 0.04) {
        heroContent.classList.add('fade-out-text');
      } else {
        heroContent.classList.remove('fade-out-text');
      }
    }

    // White Organic Portal Expansion Progress (scrollProgress 0.58 -> 0.72)
    let whitePortalProgress = 0;
    if (scrollProgress > 0.58) {
      whitePortalProgress = Math.min((scrollProgress - 0.58) / 0.14, 1.0);
    }

    if (siteHeader) {
      if (whitePortalProgress > 0.35) {
        siteHeader.classList.remove('dark-header');
      } else if (scrollProgress > 0.12) {
        siteHeader.classList.add('dark-header');
      } else {
        siteHeader.classList.remove('dark-header');
      }
    }

    // ABOUT ME STAGE: scrollProgress 0.04 -> 0.32
    let aboutOpacity = 0.0;
    let aboutScale = 1.0;

    if (scrollProgress > 0.04 && scrollProgress < 0.32) {
      if (scrollProgress < 0.12) {
        aboutOpacity = Math.min((scrollProgress - 0.04) / 0.08, 1.0);
        aboutScale = 1.0;
      } else if (scrollProgress > 0.24) {
        const fadeProgress = Math.min((scrollProgress - 0.24) / 0.08, 1.0);
        aboutOpacity = 1.0 - fadeProgress;
        aboutScale = 1.0 - fadeProgress * 0.12;
      } else {
        aboutOpacity = 1.0;
        aboutScale = 1.0;
      }
    }

    renderMediaTexture(time, scrollProgress, aboutOpacity, aboutScale, whitePortalProgress);

    ctx.clearRect(0, 0, width, height);

    const bgOpacity = Math.max(1 - scrollProgress * 2.8, 0);
    ctx.fillStyle = `rgba(255, 255, 255, ${bgOpacity})`;
    ctx.fillRect(0, 0, width, height);

    if (bgOpacity < 1) {
      ctx.fillStyle = `rgba(10, 10, 10, ${1 - bgOpacity})`;
      ctx.fillRect(0, 0, width, height);
    }

    const zoomProgress = Math.min(scrollProgress / 0.18, 1);
    const easeScroll = Math.pow(zoomProgress, 2.2);
    const zoomScale = 1.0 + easeScroll * 18.0;

    const isMobile = width < 768;
    const targetCenterX = isMobile ? width * 0.5 : width * 0.74;
    const centerX = targetCenterX + (width * 0.5 - targetCenterX) * Math.min(zoomProgress * 1.5, 1);
    const centerY = height * 0.48;
    const baseRadius = Math.min(width, height) * (isMobile ? 0.38 : 0.36) * zoomScale;

    ctx.save();
    ctx.beginPath();

    // Map control points for fluid organic "A" portal silhouette
    const points = baseAPoints.map((pt, index) => {
      const waveDamp = Math.max(1 - zoomProgress * 0.8, 0.25);
      const waveX = Math.sin(time * 1.3 + index * 0.8) * 0.035 * waveDamp;
      const waveY = Math.cos(time * 1.1 - index * 0.6) * 0.035 * waveDamp;
      
      const px = centerX + (pt.rx + waveX) * baseRadius;
      const py = centerY + (pt.ry + waveY) * baseRadius;
      
      const dx = mouse.x - px;
      const dy = mouse.y - py;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let pushX = 0;
      let pushY = 0;
      if (dist > 0.001 && dist < 120 && zoomProgress < 0.3) {
        const pushMag = (120 - dist) * 0.25;
        pushX = (dx / dist) * pushMag;
        pushY = (dy / dist) * pushMag;
      }

      return {
        x: px - pushX,
        y: py - pushY,
      };
    });

    // Draw Smooth Organic Polygon Curve & Clip Media Canvas
    ctx.moveTo((points[0].x + points[points.length - 1].x) / 2, (points[0].y + points[points.length - 1].y) / 2);
    for (let i = 0; i < points.length; i++) {
      const nextPt = points[(i + 1) % points.length];
      const midX = (points[i].x + nextPt.x) / 2;
      const midY = (points[i].y + nextPt.y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
    }
    ctx.closePath();

    ctx.clip();
    ctx.drawImage(mediaCanvas, 0, 0, width, height);
    ctx.restore();

    // Subtle Outer Shadow Outline Stroke around Fluid "A" Portal
    if (zoomProgress < 0.85) {
      ctx.save();
      ctx.lineWidth = Math.max(14 * (1 - zoomProgress), 1);
      ctx.strokeStyle = `rgba(0, 0, 0, ${0.14 * (1 - zoomProgress)})`;
      ctx.filter = 'blur(10px)';
      ctx.beginPath();
      ctx.moveTo((points[0].x + points[points.length - 1].x) / 2, (points[0].y + points[points.length - 1].y) / 2);
      for (let i = 0; i < points.length; i++) {
        const nextPt = points[(i + 1) % points.length];
        const midX = (points[i].x + nextPt.x) / 2;
        const midY = (points[i].y + nextPt.y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
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

    renderTopTransition(time, whitePortalProgress, scrollProgress);

    requestAnimationFrame(animate);
  }

  animate();
}

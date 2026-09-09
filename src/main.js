import './../style.css';
import { initFluidCanvas } from './fluid-canvas.js';
import { initDustParticleEngine, triggerDustDisperse } from './dust-particle-transition.js';

function initApp() {
  // Preloader Logic
  const preloader = document.getElementById('preloader');
  const counter = document.getElementById('preloader-counter');

  let currentCount = 0;
  const interval = setInterval(() => {
    currentCount += Math.floor(Math.random() * 15) + 5;
    if (currentCount >= 100) {
      currentCount = 100;
      clearInterval(interval);

      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('fade-out');
        }
      }, 300);
    }
    if (counter) {
      counter.textContent = `${currentCount}%`;
    }
  }, 40);

  // Initialize Fluid Canvas & Portal Zoom Engine
  initFluidCanvas();

  // Initialize Dust Particle Transition Engine
  initDustParticleEngine();

  // Header Navigation Smooth Scroll Handlers
  const navWork = document.getElementById('nav-work');
  const navAbout = document.getElementById('nav-about');
  const navContact = document.getElementById('nav-contact');
  const headerLogo = document.querySelector('.header-logo');

  function getHeroScrollMax() {
    const scrollWrapper = document.getElementById('hero-scroll-wrapper');
    if (!scrollWrapper) return 0;
    return scrollWrapper.offsetHeight - window.innerHeight;
  }

  if (navAbout) {
    navAbout.addEventListener('click', (e) => {
      e.preventDefault();
      const maxScroll = getHeroScrollMax();
      const targetY = maxScroll * 0.25; // Smooth scroll directly to About Me section
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  }

  if (navWork) {
    navWork.addEventListener('click', (e) => {
      e.preventDefault();
      const maxScroll = getHeroScrollMax();
      const targetY = maxScroll; // Smooth scroll directly to Projects section
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  }

  if (headerLogo) {
    headerLogo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile Drawer Navigation Handlers
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavCloseBtn = document.getElementById('mobile-nav-close-btn');
  const mobNavWork = document.getElementById('mob-nav-work');
  const mobNavAbout = document.getElementById('mob-nav-about');
  const mobNavContact = document.getElementById('mob-nav-contact');
  const navPillInner = document.querySelector('.nav-pill-inner');

  function openMobileMenu() {
    if (window.innerWidth <= 850 && mobileNavOverlay) {
      mobileNavOverlay.classList.add('active');
    }
  }

  function closeMobileMenu() {
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.remove('active');
    }
  }

  // Open large menu when clicking the menu button on mobile only
  if (navPillInner) {
    navPillInner.addEventListener('click', (e) => {
      if (window.innerWidth <= 850) {
        if (!e.target.closest('.nav-pill-link')) {
          e.preventDefault();
          openMobileMenu();
        }
      }
    });
  }

  if (mobileNavCloseBtn) {
    mobileNavCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
    });
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target === mobileNavOverlay) {
        closeMobileMenu();
      }
    });
  }

  if (mobNavAbout) {
    mobNavAbout.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
      const maxScroll = getHeroScrollMax();
      const targetY = maxScroll * 0.25;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  }

  if (mobNavWork) {
    mobNavWork.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
      const maxScroll = getHeroScrollMax();
      const targetY = maxScroll;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  }

  if (mobNavContact) {
    mobNavContact.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
      scrollToContact();
    });
  }

  // About Detail Overlay Back Button & Escape Key
  const aboutBackBtn = document.getElementById('about-detail-back-btn');
  if (aboutBackBtn) {
    aboutBackBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof window.closeAboutDetail === 'function') {
        window.closeAboutDetail();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (typeof window.closeAboutDetail === 'function') {
        window.closeAboutDetail();
      }
    }
  });

  // About Detail Top Subnav Pill Tab Switching
  const subnavItems = document.querySelectorAll('.subnav-item');
  const overlayContainer = document.getElementById('about-detail-overlay');
  const tabPanels = document.querySelectorAll('.about-tab-panel');

  // Work Style Scrollytelling Animation (Sequential reveal of Step 1, Step 2, Step 3 on scroll)
  const heroVideoLayer = document.getElementById('work-style-hero-video');
  const contentLayer = document.getElementById('work-style-content-layer');
  const scrollTrack = document.querySelector('.work-style-scroll-track');
  const step1 = document.getElementById('process-step-1');
  const step2 = document.getElementById('process-step-2');
  const step3 = document.getElementById('process-step-3');
  const sectionHeader = document.querySelector('#work-style-content-layer .about-section-header');
  const axisWrapper = document.querySelector('#work-style-content-layer .process-axis-wrapper');

  window.updateWorkStyleScrollytelling = function() {
    if (!overlayContainer || !heroVideoLayer || !contentLayer || !scrollTrack) return;
    const workStylePanel = document.getElementById('work-style-section');
    if (!workStylePanel || !workStylePanel.classList.contains('active')) return;

    const totalScrollable = scrollTrack.offsetHeight - overlayContainer.clientHeight;
    if (totalScrollable <= 0) return;

    const currentScroll = overlayContainer.scrollTop;
    const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

    // Phase 1: Video Float Up to Top & Fade Out (Progress 0.0 -> 0.45)
    const videoPhaseMax = 0.45;
    const videoProgress = Math.min(progress / videoPhaseMax, 1);

    const translateY = -50 - videoProgress * 60; // Moves UP from -50% to -110%
    const videoScale = 1.0 - videoProgress * 0.25;
    const videoOpacity = Math.max(0, 1.0 - videoProgress * 1.15);

    heroVideoLayer.style.transform = `translate(-50%, ${translateY.toFixed(2)}%) scale(${videoScale.toFixed(3)})`;
    heroVideoLayer.style.opacity = videoOpacity.toFixed(3);

    if (videoOpacity <= 0.02) {
      heroVideoLayer.style.visibility = 'hidden';
      heroVideoLayer.style.pointerEvents = 'none';
    } else {
      heroVideoLayer.style.visibility = 'visible';
      heroVideoLayer.style.pointerEvents = 'auto';
    }

    // Phase 2: Content Layer Container Visibility
    const contentStart = 0.15;
    if (progress < contentStart) {
      contentLayer.style.opacity = '0';
      contentLayer.style.visibility = 'hidden';
      contentLayer.style.pointerEvents = 'none';
    } else {
      contentLayer.style.opacity = '1';
      contentLayer.style.transform = 'translate(-50%, -50%)';
      contentLayer.style.visibility = 'visible';
      contentLayer.style.pointerEvents = 'auto';
    }

    // Helper to calculate item opacity & slide up
    function getItemState(startP, endP) {
      if (progress < startP) {
        return { opacity: '0', transform: 'translateY(24px) scale(0.96)', visibility: 'hidden' };
      } else if (progress >= endP) {
        return { opacity: '1', transform: 'translateY(0px) scale(1)', visibility: 'visible' };
      } else {
        const itemP = (progress - startP) / (endP - startP);
        const y = 24 * (1 - itemP);
        const scale = 0.96 + itemP * 0.04;
        return { opacity: itemP.toFixed(3), transform: `translateY(${y.toFixed(1)}px) scale(${scale.toFixed(3)})`, visibility: 'visible' };
      }
    }

    // 1. Header (Title & Subtitle): Reveals from progress 0.15 -> 0.32
    if (sectionHeader) {
      const hState = getItemState(0.15, 0.32);
      sectionHeader.style.opacity = hState.opacity;
      sectionHeader.style.transform = hState.transform;
      sectionHeader.style.visibility = hState.visibility;
    }

    // 2. Step 1 (Understand): Reveals one by one from progress 0.28 -> 0.50
    if (step1) {
      const s1State = getItemState(0.28, 0.50);
      step1.style.opacity = s1State.opacity;
      step1.style.transform = s1State.transform;
      step1.style.visibility = s1State.visibility;
    }

    // 3. Step 2 (Shape): Reveals one by one from progress 0.48 -> 0.70
    if (step2) {
      const s2State = getItemState(0.48, 0.70);
      step2.style.opacity = s2State.opacity;
      step2.style.transform = s2State.transform;
      step2.style.visibility = s2State.visibility;
    }

    // 4. Step 3 (Evolve): Reveals one by one from progress 0.68 -> 0.90
    if (step3) {
      const s3State = getItemState(0.68, 0.90);
      step3.style.opacity = s3State.opacity;
      step3.style.transform = s3State.transform;
      step3.style.visibility = s3State.visibility;
    }

    // 5. Axis Line Draw & Rotating Nodes: Draws from left to right as content loads (progress 0.25 -> 0.90)
    if (axisWrapper) {
      const aState = getItemState(0.25, 0.90);
      axisWrapper.style.opacity = aState.opacity;
      axisWrapper.style.transform = aState.transform;
      axisWrapper.style.visibility = aState.visibility;

      const lineStart = 0.25;
      const lineEnd = 0.90;
      let lineProgress = 0;
      if (progress >= lineStart) {
        lineProgress = Math.min(Math.max((progress - lineStart) / (lineEnd - lineStart), 0), 1);
      }

      const axisFill = document.getElementById('process-axis-fill');
      const node1 = document.getElementById('axis-node-1');
      const node2 = document.getElementById('axis-node-2');
      const node3 = document.getElementById('axis-node-3');
      const node4 = document.getElementById('axis-node-4');

      if (axisFill) {
        axisFill.style.transform = `scaleX(${lineProgress.toFixed(3)})`;
      }

      if (node1) node1.classList.toggle('active', lineProgress >= 0.02);
      if (node2) node2.classList.toggle('active', lineProgress >= 0.33);
      if (node3) node3.classList.toggle('active', lineProgress >= 0.66);
      if (node4) node4.classList.toggle('active', lineProgress >= 0.96);
    }
  };

  // Tools Section Scroll-Driven Scrubbing (Category Rows wipe in & Icon pop directly on scroll)
  window.updateToolsScrollScrubbing = function() {
    if (!overlayContainer) return;
    const toolsPanel = document.getElementById('tools-section');
    if (!toolsPanel || !toolsPanel.classList.contains('active')) return;

    const totalScrollable = overlayContainer.scrollHeight - overlayContainer.clientHeight;
    const currentScroll = overlayContainer.scrollTop;
    const progress = totalScrollable > 0 ? Math.min(Math.max(currentScroll / totalScrollable, 0), 1) : 0;

    const categoryRows = toolsPanel.querySelectorAll('.tool-category-row');
    if (!categoryRows || categoryRows.length === 0) return;

    const ranges = [
      { start: 0.00, end: 0.22 },
      { start: 0.15, end: 0.42 },
      { start: 0.35, end: 0.58 },
      { start: 0.52, end: 0.72 }
    ];

    categoryRows.forEach((row, idx) => {
      const range = ranges[idx] || { start: 0, end: 1 };
      let rowP = 0;

      if (totalScrollable > 0) {
        if (progress <= range.start) {
          rowP = 0;
        } else if (progress >= range.end) {
          rowP = 1;
        } else {
          rowP = (progress - range.start) / (range.end - range.start);
        }
      } else {
        rowP = 1;
      }

      const opacity = (0.0 + rowP * 1.0).toFixed(2);
      const translateY = ((1 - rowP) * 24).toFixed(1);

      if (rowP >= 0.98) {
        row.style.clipPath = 'none';
      } else {
        const clipInset = (100 - rowP * 100).toFixed(1);
        row.style.clipPath = `inset(-120px ${clipInset}% -350px -100px)`;
      }

      row.style.opacity = opacity;
      row.style.transform = `translateY(${translateY}px)`;

      const pills = row.querySelectorAll('.tool-pill-badge');
      pills.forEach((pill, pIdx) => {
        const pillOffset = pIdx * 0.08;
        const pillP = Math.min(Math.max((rowP - pillOffset) / (1 - pillOffset || 1), 0), 1);
        const scale = (0.6 + pillP * 0.4).toFixed(3);
        pill.style.opacity = pillP.toFixed(2);
        pill.style.transform = `scale(${scale})`;
      });
    });
  };

  // What I Build / Capabilities Section Scroll-Driven Outer Corner Fly-In Engine
  window.updateBuildScrollScrubbing = function() {
    if (!overlayContainer) return;
    const buildPanel = document.getElementById('what-i-build-section');
    if (!buildPanel || !buildPanel.classList.contains('active')) return;

    const totalScrollable = overlayContainer.scrollHeight - overlayContainer.clientHeight;
    const currentScroll = overlayContainer.scrollTop;
    const progress = totalScrollable > 0 ? Math.min(Math.max(currentScroll / totalScrollable, 0), 1) : 0;

    const cards = buildPanel.querySelectorAll('.arch-card');
    if (!cards || cards.length === 0) return;

    const isMobile = window.innerWidth <= 768;

    // Responsive corner origin vectors: bounded to prevent clipping out of screen
    const cornerOffsets = isMobile ? [
      { x: 0,   y: 0,  z: 0,   rx: 0,  ry: 0,   rz: 0  }, // Card 01: In place at top
      { x: -25, y: 30, z: -20, rx: 8,  ry: 8,   rz: -3 }, // Card 02: Gentle bottom-left offset
      { x: 25,  y: 30, z: -20, rx: 8,  ry: -8,  rz: 3  }, // Card 03: Gentle bottom-right offset
      { x: -25, y: 30, z: -20, rx: 8,  ry: 8,   rz: -3 }, // Card 04: Gentle bottom-left offset
      { x: 25,  y: 30, z: -20, rx: 8,  ry: -8,  rz: 3  }, // Card 05: Gentle bottom-right offset
      { x: 0,   y: 30, z: -20, rx: 8,  ry: 0,   rz: 0  }  // Card 06: Gentle bottom-center offset
    ] : [
      { x: -280, y: -120, z: -150, rx: 20, ry: 20,  rz: -8 }, // Card 01: Top-Left Corner
      { x: 0,    y: -150, z: -150, rx: 25, ry: 0,   rz: 0  }, // Card 02: Top-Center
      { x: 280,  y: -120, z: -150, rx: 20, ry: -20, rz: 8  }, // Card 03: Top-Right Corner
      { x: -280, y: 150,  z: -150, rx: -20, ry: 20, rz: -8 }, // Card 04: Bottom-Left Corner
      { x: 0,    y: 180,  z: -150, rx: -25, ry: 0,  rz: 0  }, // Card 05: Bottom-Center
      { x: 280,  y: 150,  z: -150, rx: -20, ry: -20, rz: 8 }  // Card 06: Bottom-Right Corner
    ];

    cards.forEach((card, idx) => {
      const offset = cornerOffsets[idx] || cornerOffsets[0];

      let cardP = 0;
      if (isMobile) {
        if (idx === 0) {
          cardP = 1; // Card 01 is always fully positioned in place on mobile
        } else {
          // Sequential scrub for Cards 02..06 on mobile from below
          const stepStart = 0.05 + (idx - 1) * 0.15;
          const stepEnd   = stepStart + 0.20;
          if (progress <= stepStart) cardP = 0;
          else if (progress >= stepEnd) cardP = 1;
          else cardP = (progress - stepStart) / (stepEnd - stepStart);
        }
      } else {
        // Desktop timing: Top row (0,1,2) 0.00 -> 0.35; Bottom row (3,4,5) 0.18 -> 0.58
        let start = (idx < 3) ? 0.00 : 0.18;
        let end   = (idx < 3) ? 0.35 : 0.58;

        if (totalScrollable > 0) {
          if (progress <= start) {
            cardP = 0;
          } else if (progress >= end) {
            cardP = 1;
          } else {
            cardP = (progress - start) / (end - start);
          }
        } else {
          cardP = 1;
        }
      }

      const invP = 1 - cardP;
      const opacity = (0.0 + cardP * 1.0).toFixed(2);
      const x = (offset.x * invP).toFixed(1);
      const y = (offset.y * invP).toFixed(1);
      const z = (offset.z * invP).toFixed(1);
      const rx = (offset.rx * invP).toFixed(1);
      const ry = (offset.ry * invP).toFixed(1);
      const rz = (offset.rz * invP).toFixed(1);
      const scale = (0.60 + cardP * 0.40).toFixed(3);

      card.style.opacity = opacity;
      card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale})`;
    });
  };

  let isTabTransitioning = false;
  let transitionCooldownTimer = null;

  function lockTabTransition() {
    isTabTransitioning = true;
    if (overlayContainer) {
      overlayContainer.style.overflow = 'hidden';
    }
  }

  function unlockTabTransition() {
    clearTimeout(transitionCooldownTimer);
    transitionCooldownTimer = setTimeout(() => {
      isTabTransitioning = false;
      if (overlayContainer) {
        overlayContainer.style.overflow = '';
      }
    }, 350);
  }

  function switchTabByTarget(targetSel, scrollPos = 'top') {
    const btn = document.querySelector(`.subnav-item[data-target="${targetSel}"]`);
    const targetEl = document.querySelector(targetSel);
    if (!targetEl || !btn) return;

    subnavItems.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    tabPanels.forEach((panel) => {
      panel.classList.remove('active');
    });
    targetEl.classList.add('active');

    if (overlayContainer) {
      if (targetSel === '#tools-section' || targetSel === '#what-i-build-section') {
        overlayContainer.classList.add('light-theme-tools');
      } else {
        overlayContainer.classList.remove('light-theme-tools');
      }
    }

    if (overlayContainer) {
      if (scrollPos === 'top') {
        overlayContainer.scrollTop = 0;
      } else if (scrollPos === 'bottom') {
        const totalScrollable = overlayContainer.scrollHeight - overlayContainer.clientHeight;
        overlayContainer.scrollTop = totalScrollable > 0 ? totalScrollable : 0;
      }
    }

    if (targetSel === '#work-style-section' && typeof window.updateWorkStyleScrollytelling === 'function') {
      window.updateWorkStyleScrollytelling();
    } else if (targetSel === '#tools-section' && typeof window.updateToolsScrollScrubbing === 'function') {
      window.updateToolsScrollScrubbing();
    } else if (targetSel === '#what-i-build-section' && typeof window.updateBuildScrollScrubbing === 'function') {
      window.updateBuildScrollScrubbing();
    }
  }

  function triggerToolsToBuildTransition(direction, switchTabFn, onComplete) {
    const toolsSection = document.getElementById('tools-section');
    const buildSection = document.getElementById('what-i-build-section');

    if (direction === 'forward') {
      if (toolsSection) {
        toolsSection.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        toolsSection.style.opacity = '0';
        toolsSection.style.transform = 'translateY(-20px)';
      }

      setTimeout(() => {
        if (typeof switchTabFn === 'function') switchTabFn();
        if (toolsSection) {
          toolsSection.style.opacity = '';
          toolsSection.style.transform = '';
          toolsSection.style.transition = '';
        }
        if (typeof onComplete === 'function') onComplete();
      }, 350);

    } else {
      // REVERSE: What I Build -> Tools
      if (buildSection) {
        buildSection.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        buildSection.style.opacity = '0';
        buildSection.style.transform = 'translateY(20px)';
      }

      setTimeout(() => {
        if (typeof switchTabFn === 'function') switchTabFn();
        if (buildSection) {
          buildSection.style.opacity = '';
          buildSection.style.transform = '';
          buildSection.style.transition = '';
        }
        if (typeof onComplete === 'function') onComplete();
      }, 350);
    }
  }

  function handleAutoTabScroll(deltaY) {
    if (isTabTransitioning || !overlayContainer) return;

    const activePanel = document.querySelector('.about-tab-panel.active');
    if (!activePanel) return;

    const panelId = activePanel.id;

    if (panelId === 'work-style-section') {
      if (deltaY > 0) {
        const totalScrollable = scrollTrack ? (scrollTrack.offsetHeight - overlayContainer.clientHeight) : 0;
        const currentScroll = overlayContainer.scrollTop;
        if (totalScrollable > 0 && currentScroll >= totalScrollable - 20) {
          lockTabTransition();
          triggerDustDisperse('forward', () => {
            switchTabByTarget('#tools-section', 'top');
          }, () => {
            unlockTabTransition();
          });
        }
      } else if (deltaY < -25) {
        if (overlayContainer.scrollTop <= 10) {
          if (typeof window.closeAboutDetail === 'function') {
            window.closeAboutDetail();
          }
        }
      }
    } else if (panelId === 'tools-section') {
      if (deltaY > 0) {
        const maxScroll = overlayContainer.scrollHeight - overlayContainer.clientHeight;
        if (overlayContainer.scrollTop >= maxScroll - 5 || maxScroll <= 0) {
          lockTabTransition();
          triggerToolsToBuildTransition('forward', () => {
            switchTabByTarget('#what-i-build-section', 'top');
          }, () => {
            unlockTabTransition();
          });
        }
      } else if (deltaY < 0) {
        if (overlayContainer.scrollTop <= 10) {
          lockTabTransition();
          triggerDustDisperse('reverse', () => {
            switchTabByTarget('#work-style-section', 'bottom');
          }, () => {
            unlockTabTransition();
          });
        }
      }
    } else if (panelId === 'what-i-build-section') {
      if (deltaY < 0) {
        if (overlayContainer.scrollTop <= 10) {
          lockTabTransition();
          triggerToolsToBuildTransition('reverse', () => {
            switchTabByTarget('#tools-section', 'bottom');
          }, () => {
            unlockTabTransition();
          });
        }
      }
    }
  }

  subnavItems.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isTabTransitioning) return;

      const targetSel = btn.getAttribute('data-target');
      if (!targetSel) return;

      const activePanel = document.querySelector('.about-tab-panel.active');
      const currentId = activePanel ? activePanel.id : '';

      if (currentId === 'work-style-section' && targetSel === '#tools-section') {
        lockTabTransition();
        triggerDustDisperse('forward', () => {
          switchTabByTarget('#tools-section', 'top');
        }, () => {
          unlockTabTransition();
        });
      } else if (currentId === 'tools-section' && targetSel === '#work-style-section') {
        lockTabTransition();
        triggerDustDisperse('reverse', () => {
          switchTabByTarget('#work-style-section', 'bottom');
        }, () => {
          unlockTabTransition();
        });
      } else if (currentId === 'tools-section' && targetSel === '#what-i-build-section') {
        lockTabTransition();
        triggerToolsToBuildTransition('forward', () => {
          switchTabByTarget('#what-i-build-section', 'top');
        }, () => {
          unlockTabTransition();
        });
      } else if (currentId === 'what-i-build-section' && targetSel === '#tools-section') {
        lockTabTransition();
        triggerToolsToBuildTransition('reverse', () => {
          switchTabByTarget('#tools-section', 'bottom');
        }, () => {
          unlockTabTransition();
        });
      } else {
        switchTabByTarget(targetSel, 'top');
      }
    });
  });

  if (overlayContainer) {
    const handleOverlayScrollScrub = () => {
      const activePanel = document.querySelector('.about-tab-panel.active');
      const currentId = activePanel ? activePanel.id : '';

      if (currentId === 'work-style-section' && typeof window.updateWorkStyleScrollytelling === 'function') {
        window.updateWorkStyleScrollytelling();
      } else if (currentId === 'tools-section' && typeof window.updateToolsScrollScrubbing === 'function') {
        window.updateToolsScrollScrubbing();
      } else if (currentId === 'what-i-build-section' && typeof window.updateBuildScrollScrubbing === 'function') {
        window.updateBuildScrollScrubbing();
      }
    };

    overlayContainer.addEventListener('scroll', handleOverlayScrollScrub, { passive: true });

    overlayContainer.addEventListener('wheel', (e) => {
      if (isTabTransitioning) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      handleAutoTabScroll(e.deltaY);
    }, { passive: false });

    let touchStartY = 0;
    overlayContainer.addEventListener('touchstart', (e) => {
      if (isTabTransitioning) {
        e.preventDefault();
        return;
      }
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: false });

    overlayContainer.addEventListener('touchmove', (e) => {
      if (isTabTransitioning) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (e.touches.length > 0) {
        const currentY = e.touches[0].clientY;
        const deltaY = touchStartY - currentY;
        handleAutoTabScroll(deltaY);
      }
    }, { passive: false });

    overlayContainer.addEventListener('keydown', (e) => {
      if (isTabTransitioning && ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  // Force manual scroll restoration so reloads always land on top of Home Screen
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Force landing on top of Home Screen on initial page load / refresh
  window.scrollTo(0, 0);

  // Handle Hash Scroll ONLY when user explicitly navigates to #projects or #work
  function handleInitialHashScroll() {
    const hash = window.location.hash;
    if (hash === '#projects' || hash === '#work') {
      setTimeout(() => {
        const maxScroll = getHeroScrollMax();
        const targetY = maxScroll; // Scroll to Projects Showcase
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }, 250);
    }
  }

  // On page reload, clear any leftover hash so page lands cleanly on Home Screen
  if (window.performance && window.performance.navigation && window.performance.navigation.type === 1) {
    if (window.location.hash) {
      history.replaceState('', document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  } else if (window.location.hash === '#projects' || window.location.hash === '#work') {
    handleInitialHashScroll();
  } else {
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', handleInitialHashScroll);

  // Contact & Separate Screen Handlers
  function scrollToContact() {
    const maxScroll = getHeroScrollMax();
    window.scrollTo({ top: maxScroll, behavior: 'smooth' });
  }

  if (navContact) {
    navContact.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToContact();
    });
  }

  // Copy Email Handlers
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email');
      if (email) {
        navigator.clipboard.writeText(email).then(() => {
          btn.classList.add('copied');
          setTimeout(() => {
            btn.classList.remove('copied');
          }, 2000);
        });
      }
    });
  });

  // Interactive Accordion Project Rows (Matching Reference Design)
  const projectsAccordion = document.querySelector('.projects-accordion');
  const projectRows = document.querySelectorAll('.project-row');

  projectRows.forEach((row) => {
    const activateRow = () => {
      if (!row.classList.contains('active')) {
        projectRows.forEach((r) => r.classList.remove('active'));
        row.classList.add('active');
      }
    };

    // Hover & pointer events
    row.addEventListener('mouseenter', activateRow);
    row.addEventListener('mousemove', activateRow);
    row.addEventListener('pointerenter', activateRow);

    // When leaving a row, only collapse if cursor leaves the accordion entirely
    row.addEventListener('mouseleave', (e) => {
      const toEl = e.relatedTarget;
      if (!toEl || (projectsAccordion && !projectsAccordion.contains(toEl))) {
        row.classList.remove('active');
      }
    });

    // Click / Touch interaction
    row.addEventListener('click', (e) => {
      // Allow live website button to handle its own navigation
      if (e.target.closest('.btn-live-website')) {
        return;
      }

      const isAlreadyActive = row.classList.contains('active');
      projectRows.forEach((r) => r.classList.remove('active'));

      if (!isAlreadyActive) {
        row.classList.add('active');
      } else {
        // If clicked while active, follow the row URL if present
        const url = row.getAttribute('data-url');
        if (url && url !== '#') {
          if (url.startsWith('#')) {
            const targetEl = document.querySelector(url);
            if (targetEl) targetEl.classList.remove('hidden');
          } else {
            window.location.href = url;
          }
        }
      }
    });

    // Keyboard Accessibility (Enter / Space to toggle)
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isAlreadyActive = row.classList.contains('active');
        projectRows.forEach((r) => r.classList.remove('active'));
        if (!isAlreadyActive) row.classList.add('active');
      }
    });
  });

  // When mouse leaves the entire accordion container, collapse all rows back to default
  if (projectsAccordion) {
    projectsAccordion.addEventListener('mouseleave', () => {
      projectRows.forEach((r) => r.classList.remove('active'));
    });
  }

  // Handle Horizontal Projects Track Scroll (Right-to-Left Motion)
  const projectsWrapper = document.getElementById('projects-scroll-wrapper');
  const horizontalTrack = document.getElementById('horizontal-projects-track');

  function updateHorizontalProjectsScroll() {
    if (!projectsWrapper || !horizontalTrack) return;

    const wrapperRect = projectsWrapper.getBoundingClientRect();
    const wrapperHeight = projectsWrapper.offsetHeight;
    const windowHeight = window.innerHeight;

    const scrollDistance = wrapperHeight - windowHeight;
    if (scrollDistance <= 0) return;

    const currentScroll = -wrapperRect.top;
    const progress = Math.min(Math.max(currentScroll / scrollDistance, 0), 1);

    const trackWidth = horizontalTrack.scrollWidth;
    const maxHorizontalShift = trackWidth - (window.innerWidth - 60);

    if (maxHorizontalShift > 0) {
      const translateX = -progress * maxHorizontalShift;
      horizontalTrack.style.transform = `translate3d(${translateX}px, 0, 0)`;
    }
  }

  window.addEventListener('scroll', updateHorizontalProjectsScroll, { passive: true });
  window.addEventListener('resize', updateHorizontalProjectsScroll);
  updateHorizontalProjectsScroll();

  // --------------------------------------------------------------------------
  // Interactive Smooth Mouse Floating Parallax Engine for All About Tabs
  // (Work Style, Tool, and What I Bring to the Table)
  // --------------------------------------------------------------------------
  function initAboutTabsMouseFloat() {
    const overlay = document.getElementById('about-detail-overlay');
    if (!overlay) return;

    // Elements for "What I Build" Tab
    const buildSection = document.getElementById('what-i-build-section');
    const buildWrap = buildSection ? buildSection.querySelector('.capabilities-floating-wrap') : null;
    const buildGridBg = buildSection ? buildSection.querySelector('.capabilities-grid-bg') : null;
    const buildHeader = buildSection ? buildSection.querySelector('.capabilities-header') : null;

    // Elements for "Work Style" Tab
    const workStyleSection = document.getElementById('work-style-section');
    const workStyleVideoCard = workStyleSection ? workStyleSection.querySelector('.video-container-card') : null;
    const workStyleWrap = workStyleSection ? workStyleSection.querySelector('.work-style-floating-wrap') : null;
    const workStyleHeader = workStyleSection ? workStyleSection.querySelector('.about-section-header') : null;

    // Elements for "Tools" Tab
    const toolsSection = document.getElementById('tools-section');
    const toolsWrap = toolsSection ? toolsSection.querySelector('.tools-floating-wrap') : null;
    const toolsHeader = toolsSection ? toolsSection.querySelector('.about-section-header') : null;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let floatTime = 0;

    function onMouseMove(e) {
      const cx = window.innerWidth * 0.5;
      const cy = window.innerHeight * 0.5;

      const relX = (e.clientX - cx) / cx;
      const relY = (e.clientY - cy) / cy;

      targetX = Math.max(-1, Math.min(1, relX));
      targetY = Math.max(-1, Math.min(1, relY));
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    function renderFloat() {
      floatTime += 0.02;

      // Smooth Inertial Lerp Damping (0.065 for organic, viscous feel)
      currentX += (targetX - currentX) * 0.065;
      currentY += (targetY - currentY) * 0.065;

      // Subtle ambient breathing float oscillation
      const ambientFloatY = Math.sin(floatTime * 1.5) * 3;
      const ambientFloatX = Math.cos(floatTime * 1.2) * 2;

      const moveX = currentX * 22 + ambientFloatX;
      const moveY = currentY * 16 + ambientFloatY;
      const rotX = -currentY * 5.5; // subtle tilt X
      const rotY = currentX * 6.8;   // subtle tilt Y
      const hX = currentX * 9;
      const hY = currentY * 7;

      // 1. What I Build Screen Parallax Float
      if (buildSection && buildSection.classList.contains('active')) {
        if (buildWrap) {
          buildWrap.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
        }
        if (buildGridBg) {
          const bgX = -currentX * 14 - ambientFloatX * 0.5;
          const bgY = -currentY * 11 - ambientFloatY * 0.5;
          buildGridBg.style.transform = `translate3d(${bgX.toFixed(2)}px, ${bgY.toFixed(2)}px, 0)`;
        }
        if (buildHeader) {
          buildHeader.style.transform = `translate3d(${hX.toFixed(2)}px, ${hY.toFixed(2)}px, 16px)`;
        }
      }

      // 2. Work Style Screen Parallax Float
      if (workStyleSection && workStyleSection.classList.contains('active')) {
        if (workStyleVideoCard) {
          const vMoveX = moveX * 0.75;
          const vMoveY = moveY * 0.75;
          const vRotX = rotX * 0.7;
          const vRotY = rotY * 0.7;
          workStyleVideoCard.style.transform = `translate3d(${vMoveX.toFixed(2)}px, ${vMoveY.toFixed(2)}px, 0) rotateX(${vRotX.toFixed(2)}deg) rotateY(${vRotY.toFixed(2)}deg)`;
        }
        if (workStyleWrap) {
          workStyleWrap.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
        }
        if (workStyleHeader) {
          workStyleHeader.style.transform = `translate3d(${hX.toFixed(2)}px, ${hY.toFixed(2)}px, 14px)`;
        }
      }

      // 3. Tools Screen Parallax Float
      if (toolsSection && toolsSection.classList.contains('active')) {
        if (toolsWrap) {
          toolsWrap.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
        }
        if (toolsHeader) {
          toolsHeader.style.transform = `translate3d(${hX.toFixed(2)}px, ${hY.toFixed(2)}px, 16px)`;
        }
      }

      requestAnimationFrame(renderFloat);
    }

    requestAnimationFrame(renderFloat);
  }

  initAboutTabsMouseFloat();
  initToolCardToggles();
}

function initToolCardToggles() {
  document.addEventListener('click', (e) => {
    const clickedWrapper = e.target.closest('.tool-item-wrapper');
    const allWrappers = document.querySelectorAll('.tool-item-wrapper');

    if (clickedWrapper) {
      const isAlreadyActive = clickedWrapper.classList.contains('active');

      // Close all other active wrappers first
      allWrappers.forEach((wrapper) => {
        if (wrapper !== clickedWrapper) {
          wrapper.classList.remove('active');
          const badge = wrapper.querySelector('.tool-pill-badge');
          if (badge) badge.blur();
        }
      });

      if (isAlreadyActive) {
        // Toggle OFF if clicked a second time, and blur element to release :focus-within
        clickedWrapper.classList.remove('active');
        const badge = clickedWrapper.querySelector('.tool-pill-badge');
        if (badge) badge.blur();
        if (document.activeElement && clickedWrapper.contains(document.activeElement)) {
          document.activeElement.blur();
        }
      } else {
        // Toggle ON
        clickedWrapper.classList.add('active');
      }
    } else {
      // Clicked outside any tool item wrapper -> close all active tool cards
      allWrappers.forEach((wrapper) => {
        wrapper.classList.remove('active');
        const badge = wrapper.querySelector('.tool-pill-badge');
        if (badge) badge.blur();
      });
      if (document.activeElement && document.activeElement.closest('.tool-item-wrapper')) {
        document.activeElement.blur();
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

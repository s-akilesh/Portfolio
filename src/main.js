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

  function scrollToProjects() {
    const scrollWrapper = document.getElementById('projects-scroll-wrapper');
    if (scrollWrapper) {
      const maxScroll = Math.max(scrollWrapper.offsetHeight - window.innerHeight, 1);
      const targetY = scrollWrapper.offsetTop + maxScroll * 0.70;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    } else {
      const projectsSec = document.getElementById('projects-section');
      if (projectsSec) projectsSec.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function scrollToAbout() {
    const maxScroll = getHeroScrollMax();
    window.scrollTo({ top: maxScroll, behavior: 'smooth' });
  }

  if (navAbout) {
    navAbout.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToAbout();
    });
  }

  if (navWork) {
    navWork.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToProjects();
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
      scrollToAbout();
    });
  }

  if (mobNavWork) {
    mobNavWork.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
      scrollToProjects();
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

    // Phase 1: Video Float Up to Top & Fade Out (Progress 0.0 -> 0.14 for instant responsiveness)
    const videoPhaseMax = 0.14;
    const videoProgress = Math.min(progress / videoPhaseMax, 1);

    const translateY = -50 - videoProgress * 60; // Moves UP from -50% to -110%
    const videoScale = 1.0 - videoProgress * 0.25;
    const videoOpacity = Math.max(0, 1.0 - videoProgress * 1.5);

    heroVideoLayer.style.transform = `translate(-50%, ${translateY.toFixed(2)}%) scale(${videoScale.toFixed(3)})`;
    heroVideoLayer.style.opacity = videoOpacity.toFixed(3);

    if (videoOpacity <= 0.02) {
      heroVideoLayer.style.visibility = 'hidden';
      heroVideoLayer.style.pointerEvents = 'none';
    } else {
      heroVideoLayer.style.visibility = 'visible';
      heroVideoLayer.style.pointerEvents = 'auto';
    }

    // Phase 2: Content Layer Container Visibility (Immediate on start of scroll)
    const contentStart = 0.01;
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

    // 1. Header (Title & Subtitle): Reveals immediately from progress 0.02 -> 0.15
    if (sectionHeader) {
      const hState = getItemState(0.02, 0.15);
      sectionHeader.style.opacity = hState.opacity;
      sectionHeader.style.transform = hState.transform;
      sectionHeader.style.visibility = hState.visibility;
    }

    // 2. Step 1 (Understand): Reveals smoothly from progress 0.08 -> 0.35
    if (step1) {
      const s1State = getItemState(0.08, 0.35);
      step1.style.opacity = s1State.opacity;
      step1.style.transform = s1State.transform;
      step1.style.visibility = s1State.visibility;
    }

    // 3. Step 2 (Shape): Reveals smoothly from progress 0.25 -> 0.60
    if (step2) {
      const s2State = getItemState(0.25, 0.60);
      step2.style.opacity = s2State.opacity;
      step2.style.transform = s2State.transform;
      step2.style.visibility = s2State.visibility;
    }

    // 4. Step 3 (Evolve): Reveals smoothly from progress 0.45 -> 0.85
    if (step3) {
      const s3State = getItemState(0.45, 0.85);
      step3.style.opacity = s3State.opacity;
      step3.style.transform = s3State.transform;
      step3.style.visibility = s3State.visibility;
    }

    // 5. Axis Line Draw & Rotating Nodes: Draws from left to right as content loads (progress 0.05 -> 0.85)
    if (axisWrapper) {
      const aState = getItemState(0.05, 0.85);
      axisWrapper.style.opacity = aState.opacity;
      axisWrapper.style.transform = aState.transform;
      axisWrapper.style.visibility = aState.visibility;

      const lineStart = 0.05;
      const lineEnd = 0.85;
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

  // Tools Section Display & Scrubbing
  window.updateToolsScrollScrubbing = function() {
    if (!overlayContainer) return;
    const toolsPanel = document.getElementById('tools-section');
    if (!toolsPanel || !toolsPanel.classList.contains('active')) return;

    const categoryRows = toolsPanel.querySelectorAll('.tool-category-row');
    if (!categoryRows || categoryRows.length === 0) return;

    categoryRows.forEach((row) => {
      row.style.opacity = '1';
      row.style.transform = 'translateY(0px)';
      row.style.clipPath = 'none';
      const pills = row.querySelectorAll('.tool-pill-badge');
      pills.forEach((pill) => {
        pill.style.opacity = '1';
        pill.style.transform = 'scale(1)';
      });
    });
  };

  // 6 3D Outer Corner Vectors for "What I Bring to the Table" (WHAT I BUILD) Cards
  const buildCardCornerOffsets = [
    { tx: -700, ty: -500, tz: -300, rx: 45, ry: 45, rz: -20, s: 0.55 },  // Card 01 (UNTANGLE - Top-Left)
    { tx: 0,    ty: -650, tz: -300, rx: 65, ry: 0,  rz: 0,   s: 0.55 },  // Card 02 (STRUCTURE - Top-Center)
    { tx: 700,  ty: -500, tz: -300, rx: 45, ry: -45, rz: 20,  s: 0.55 },  // Card 03 (THINK BUSINESS - Top-Right)
    { tx: -700, ty: 500,  tz: -300, rx: -45, ry: 45, rz: -20, s: 0.55 },  // Card 04 (BUILD - Bottom-Left)
    { tx: 0,    ty: 650,  tz: -300, rx: -65, ry: 0,  rz: 0,   s: 0.55 },  // Card 05 (MAKE IT BETTER - Bottom-Center)
    { tx: 700,  ty: 500,  tz: -300, rx: -45, ry: -45, rz: 20,  s: 0.55 }   // Card 06 (OWN IT - Bottom-Right)
  ];

  let currentBuildProgress = 0;
  let targetBuildProgress = 0;
  let buildAnimFrameId = null;

  window.updateBuildScrollScrubbing = function(forceReset = false) {
    if (!overlayContainer) return;
    const buildPanel = document.getElementById('what-i-build-section');
    if (!buildPanel || !buildPanel.classList.contains('active')) return;

    const cards = buildPanel.querySelectorAll('.arch-card');
    if (!cards || cards.length === 0) return;

    if (forceReset) {
      currentBuildProgress = 0;
      targetBuildProgress = 0;
    } else {
      const scrollVal = overlayContainer.scrollTop;
      const maxScroll = Math.max(overlayContainer.scrollHeight - overlayContainer.clientHeight, 1);
      const maxScrubDist = Math.min(maxScroll, 240);

      targetBuildProgress = Math.min(Math.max(scrollVal / maxScrubDist, 0), 1);
      if (scrollVal >= maxScroll - 12) {
        targetBuildProgress = 1;
      }
    }

    currentBuildProgress += (targetBuildProgress - currentBuildProgress) * 0.18;
    if (Math.abs(targetBuildProgress - currentBuildProgress) < 0.0005) {
      currentBuildProgress = targetBuildProgress;
    }

    const p = currentBuildProgress;

    cards.forEach((card, idx) => {
      const offset = buildCardCornerOffsets[idx % buildCardCornerOffsets.length];
      const startP = idx * 0.04;
      const endP = Math.min(startP + 0.60, 0.95);

      const cardP = p <= startP ? 0 : (p >= endP ? 1 : (p - startP) / (endP - startP));
      const easeP = 1 - Math.pow(1 - cardP, 2.5);

      if (easeP >= 0.998) {
        card.style.opacity = '1';
        card.style.transform = 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)';
        card.style.pointerEvents = 'auto';
      } else {
        const tx = offset.tx * (1 - easeP);
        const ty = offset.ty * (1 - easeP);
        const tz = offset.tz * (1 - easeP);
        const rx = offset.rx * (1 - easeP);
        const ry = offset.ry * (1 - easeP);
        const rz = offset.rz * (1 - easeP);
        const scale = offset.s + (1 - offset.s) * easeP;
        const opacity = Math.min(easeP * 1.4, 1);

        card.style.opacity = opacity.toFixed(3);
        card.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, ${tz.toFixed(1)}px) rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg) rotateZ(${rz.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        card.style.pointerEvents = easeP > 0.8 ? 'auto' : 'none';
      }
    });

    if (Math.abs(targetBuildProgress - currentBuildProgress) > 0.0005) {
      if (buildAnimFrameId) cancelAnimationFrame(buildAnimFrameId);
      buildAnimFrameId = requestAnimationFrame(() => window.updateBuildScrollScrubbing(false));
    }
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
      window.updateBuildScrollScrubbing(true);
    }
  }

  function triggerToolsToBuildTransition(direction, switchTabFn, onComplete) {
    const toolsSection = document.getElementById('tools-section');

    if (direction === 'forward') {
      if (toolsSection) {
        toolsSection.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        toolsSection.style.opacity = '0';
        toolsSection.style.transform = 'translateY(-15px)';
      }

      setTimeout(() => {
        if (typeof switchTabFn === 'function') switchTabFn();
        if (toolsSection) {
          toolsSection.style.opacity = '';
          toolsSection.style.transform = '';
          toolsSection.style.transition = '';
        }
        if (typeof window.updateBuildScrollScrubbing === 'function') {
          window.updateBuildScrollScrubbing(true);
        }
        if (typeof onComplete === 'function') onComplete();
      }, 250);

    } else {
      // REVERSE: What I Build -> Tools
      if (typeof switchTabFn === 'function') switchTabFn();
      if (typeof window.updateToolsScrollScrubbing === 'function') {
        window.updateToolsScrollScrubbing();
      }
      if (typeof onComplete === 'function') onComplete();
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
      } else if (deltaY < 0) {
        if (overlayContainer.scrollTop <= 15) {
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
        if (overlayContainer.scrollTop <= 15) {
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
        if (overlayContainer.scrollTop <= 15 && currentBuildProgress <= 0.15) {
          lockTabTransition();
          triggerToolsToBuildTransition('reverse', () => {
            switchTabByTarget('#tools-section', 'bottom');
          }, () => {
            unlockTabTransition();
          });
        }
      } else if (deltaY > 0) {
        const maxScroll = overlayContainer.scrollHeight - overlayContainer.clientHeight;
        if ((overlayContainer.scrollTop >= maxScroll - 15 || maxScroll <= 10) && currentBuildProgress >= 0.90) {
          lockTabTransition();
          if (typeof window.closeAboutDetail === 'function') {
            window.closeAboutDetail();
          }
          setTimeout(() => {
            unlockTabTransition();
            const contactSec = document.getElementById('contact-section');
            if (contactSec) {
              contactSec.scrollIntoView({ behavior: 'smooth' });
            }
          }, 400);
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
      const scrollSpeedFactor = 0.20; // 20% speed multiplier for View More About Akilesh screen
      const maxOverlayDelta = 18;     // Ultra-slow fixed max speed cap per event (px)
      let targetDeltaY = e.deltaY * scrollSpeedFactor;
      if (Math.abs(targetDeltaY) > maxOverlayDelta) {
        targetDeltaY = Math.sign(targetDeltaY) * maxOverlayDelta;
      }
      
      const prevTop = overlayContainer.scrollTop;
      overlayContainer.scrollTop += targetDeltaY;
      const actualDelta = overlayContainer.scrollTop - prevTop;

      handleAutoTabScroll(actualDelta !== 0 ? actualDelta : targetDeltaY);
      e.preventDefault();
    }, { passive: false });

    let touchStartY = 0;
    let lastTouchY = 0;
    overlayContainer.addEventListener('touchstart', (e) => {
      if (isTabTransitioning) {
        e.preventDefault();
        return;
      }
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
        lastTouchY = e.touches[0].clientY;
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
        const maxTouchDelta = 14;
        let deltaY = (lastTouchY - currentY) * 0.20;
        if (Math.abs(deltaY) > maxTouchDelta) {
          deltaY = Math.sign(deltaY) * maxTouchDelta;
        }
        lastTouchY = currentY;

        overlayContainer.scrollTop += deltaY;
        handleAutoTabScroll(deltaY);
        e.preventDefault();
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
    const contactSec = document.getElementById('contact-section');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
    }
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

  // --------------------------------------------------------------------------
  // CHAPTER II PROJECTS: "My Project" Scroll Reveal & Interactive Preview
  // --------------------------------------------------------------------------
  const projectsScrollWrapper = document.getElementById('projects-scroll-wrapper');
  const projectsIntroLayer = document.getElementById('projects-intro-layer');
  const projectsShowcaseLayer = document.getElementById('projects-showcase-layer');
  const projectLivePreviewImg = document.getElementById('project-live-preview-img');
  const chapterProjectItems = document.querySelectorAll('.chapter-project-item');

  let projectScrollTicking = false;

  function updateChapterProjectsScroll() {
    if (!projectsScrollWrapper || !projectsIntroLayer || !projectsShowcaseLayer) return;

    const rect = projectsScrollWrapper.getBoundingClientRect();
    const maxScroll = projectsScrollWrapper.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const scrolled = -rect.top;
    const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);

    // 1. "My Project" Intro Title: Stays centered, then glides up & fades out (0.05 -> 0.40)
    const introFade = Math.min(Math.max((progress - 0.05) / 0.35, 0), 1);
    const easeIntro = introFade * introFade;
    projectsIntroLayer.style.opacity = (1.0 - easeIntro).toFixed(3);
    projectsIntroLayer.style.transform = `translateY(-${(easeIntro * 48).toFixed(1)}px) scale(${(1.0 - easeIntro * 0.06).toFixed(3)})`;
    projectsIntroLayer.style.pointerEvents = introFade >= 0.85 ? 'none' : 'auto';

    // 2. Chapter II Showcase Layer: Fades in and rises into place (0.25 -> 0.65)
    const showFade = Math.min(Math.max((progress - 0.25) / 0.36, 0), 1);
    const easeShow = showFade * showFade * (3.0 - 2.0 * showFade);
    projectsShowcaseLayer.style.opacity = easeShow.toFixed(3);
    projectsShowcaseLayer.style.transform = `translateY(${((1.0 - easeShow) * 40).toFixed(1)}px)`;
    projectsShowcaseLayer.style.pointerEvents = showFade >= 0.6 ? 'auto' : 'none';

    if (showFade >= 0.6) {
      projectsShowcaseLayer.classList.add('active');
    } else {
      projectsShowcaseLayer.classList.remove('active');
    }
  }

  function requestProjectScrollUpdate() {
    if (!projectScrollTicking) {
      projectScrollTicking = true;
      requestAnimationFrame(() => {
        updateChapterProjectsScroll();
        projectScrollTicking = false;
      });
    }
  }

  window.addEventListener('scroll', requestProjectScrollUpdate, { passive: true });
  window.addEventListener('resize', requestProjectScrollUpdate, { passive: true });
  updateChapterProjectsScroll();

  // Interactive Project Selection & Dynamic Image Preview Crossfade
  chapterProjectItems.forEach((item) => {
    const activateProject = () => {
      chapterProjectItems.forEach((it) => it.classList.remove('active'));
      item.classList.add('active');

      const newImgSrc = item.getAttribute('data-img');
      if (newImgSrc && projectLivePreviewImg && projectLivePreviewImg.getAttribute('src') !== newImgSrc) {
        projectLivePreviewImg.style.opacity = '0.3';
        projectLivePreviewImg.style.transform = 'scale(0.97)';
        setTimeout(() => {
          projectLivePreviewImg.src = newImgSrc;
          projectLivePreviewImg.style.opacity = '1';
          projectLivePreviewImg.style.transform = 'scale(1)';
        }, 120);
      }
    };

    item.addEventListener('mouseenter', activateProject);
    item.addEventListener('focus', activateProject);

    item.addEventListener('click', () => {
      activateProject();
      const url = item.getAttribute('data-url');
      if (url && url !== '#') {
        if (url.startsWith('#')) {
          const targetEl = document.querySelector(url);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          window.location.href = url;
        }
      }
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  const btnViewAllWork = document.getElementById('btn-view-all-work');
  if (btnViewAllWork) {
    btnViewAllWork.addEventListener('click', (e) => {
      e.preventDefault();
      const contactSec = document.getElementById('contact-section');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

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
    let floatAnimId = null;

    function onMouseMove(e) {
      if (!overlay.classList.contains('active')) return;
      const cx = window.innerWidth * 0.5;
      const cy = window.innerHeight * 0.5;

      const relX = (e.clientX - cx) / cx;
      const relY = (e.clientY - cy) / cy;

      targetX = Math.max(-1, Math.min(1, relX));
      targetY = Math.max(-1, Math.min(1, relY));
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    function renderFloat() {
      if (!overlay.classList.contains('active')) {
        floatAnimId = null;
        return;
      }

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

      floatAnimId = requestAnimationFrame(renderFloat);
    }

    window.startAboutTabsFloat = function() {
      if (!floatAnimId) {
        floatAnimId = requestAnimationFrame(renderFloat);
      }
    };

    window.stopAboutTabsFloat = function() {
      if (floatAnimId) {
        cancelAnimationFrame(floatAnimId);
        floatAnimId = null;
      }
    };
  }

  initAboutTabsMouseFloat();
  initToolCardToggles();
  initContactWatermarkSpotlight();
}

function initContactWatermarkSpotlight() {
  const contactSection = document.getElementById('contact-section');
  const watermarkWrap = document.querySelector('.contact-bg-text-grid, .contact-watermark-wrap');

  if (!contactSection || !watermarkWrap) return;

  let targetX = -1000;
  let targetY = -1000;
  let currentX = -1000;
  let currentY = -1000;
  let lastClientX = -1000;
  let lastClientY = -1000;
  let isInside = false;
  let animId = null;

  function renderSpotlight() {
    currentX += (targetX - currentX) * 0.22;
    currentY += (targetY - currentY) * 0.22;

    watermarkWrap.style.setProperty('--spotlight-x', `${currentX.toFixed(1)}px`);
    watermarkWrap.style.setProperty('--spotlight-y', `${currentY.toFixed(1)}px`);

    if (isInside || Math.hypot(targetX - currentX, targetY - currentY) > 0.5) {
      animId = requestAnimationFrame(renderSpotlight);
    } else {
      animId = null;
    }
  }

  function handlePointerMove(clientX, clientY) {
    lastClientX = clientX;
    lastClientY = clientY;
    const rect = watermarkWrap.getBoundingClientRect();
    targetX = clientX - rect.left;
    targetY = clientY - rect.top;

    if (!isInside) {
      isInside = true;
      currentX = targetX;
      currentY = targetY;
      watermarkWrap.style.setProperty('--spotlight-x', `${currentX.toFixed(1)}px`);
      watermarkWrap.style.setProperty('--spotlight-y', `${currentY.toFixed(1)}px`);
      watermarkWrap.style.setProperty('--watermark-opacity', '1');
      if (!animId) {
        animId = requestAnimationFrame(renderSpotlight);
      }
    }
  }

  function handlePointerLeave() {
    isInside = false;
    watermarkWrap.style.setProperty('--watermark-opacity', '0');
  }

  // Pointer & mouse tracking directly on contact section
  contactSection.addEventListener('pointerenter', (e) => {
    handlePointerMove(e.clientX, e.clientY);
  });

  contactSection.addEventListener('pointermove', (e) => {
    handlePointerMove(e.clientX, e.clientY);
  });

  contactSection.addEventListener('pointerleave', handlePointerLeave);

  // Global tracking for smooth pointer boundaries
  window.addEventListener('pointermove', (e) => {
    const cRect = contactSection.getBoundingClientRect();
    if (
      e.clientX >= cRect.left &&
      e.clientX <= cRect.right &&
      e.clientY >= cRect.top &&
      e.clientY <= cRect.bottom
    ) {
      handlePointerMove(e.clientX, e.clientY);
    } else if (isInside) {
      handlePointerLeave();
    }
  }, { passive: true });

  window.addEventListener('scroll', () => {
    if (isInside && lastClientX >= 0) {
      const cRect = contactSection.getBoundingClientRect();
      if (
        lastClientX >= cRect.left &&
        lastClientX <= cRect.right &&
        lastClientY >= cRect.top &&
        lastClientY <= cRect.bottom
      ) {
        handlePointerMove(lastClientX, lastClientY);
      } else {
        handlePointerLeave();
      }
    }
  }, { passive: true });

  window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

  // Touch support for mobile interaction
  contactSection.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  contactSection.addEventListener('touchend', handlePointerLeave, { passive: true });
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

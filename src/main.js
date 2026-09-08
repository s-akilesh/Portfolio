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
  const mobNavWork = document.getElementById('mob-nav-work');
  const mobNavAbout = document.getElementById('mob-nav-about');
  const mobNavContact = document.getElementById('mob-nav-contact');

  function closeMobileMenu() {
    if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
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
      openContactModal();
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
      panel.classList.remove('animate-tools');
    });
    targetEl.classList.add('active');

    if (overlayContainer) {
      if (targetSel === '#tools-section' || targetSel === '#what-i-build-section') {
        overlayContainer.classList.add('light-theme-tools');
      } else {
        overlayContainer.classList.remove('light-theme-tools');
      }
    }

    if (targetSel === '#tools-section') {
      void targetEl.offsetWidth; // Force reflow to restart CSS animation cleanly
      targetEl.classList.add('animate-tools');
    }

    if (overlayContainer) {
      if (scrollPos === 'top') {
        overlayContainer.scrollTop = 0;
      } else if (scrollPos === 'bottom') {
        const totalScrollable = scrollTrack ? (scrollTrack.offsetHeight - overlayContainer.clientHeight) : 0;
        overlayContainer.scrollTop = totalScrollable > 0 ? totalScrollable : (overlayContainer.scrollHeight - overlayContainer.clientHeight);
      }
    }

    if (typeof window.updateWorkStyleScrollytelling === 'function') {
      window.updateWorkStyleScrollytelling();
    }
  }

  function triggerToolsToBuildTransition(direction, switchTabFn, onComplete) {
    const toolsSection = document.getElementById('tools-section');
    const buildSection = document.getElementById('what-i-build-section');

    if (direction === 'forward') {
      if (toolsSection) {
        toolsSection.classList.add('zoom-out-fade');
      }

      setTimeout(() => {
        if (typeof switchTabFn === 'function') switchTabFn();
        if (buildSection) {
          buildSection.classList.remove('animate-capabilities-out');
          void buildSection.offsetWidth;
          buildSection.classList.add('animate-capabilities');
        }
      }, 350);

      setTimeout(() => {
        if (toolsSection) {
          toolsSection.classList.remove('zoom-out-fade');
        }
        if (typeof onComplete === 'function') onComplete();
      }, 1100);

    } else {
      // REVERSE: What I Build -> Tools
      if (buildSection) {
        buildSection.classList.remove('animate-capabilities');
        void buildSection.offsetWidth;
        buildSection.classList.add('animate-capabilities-out');
      }

      setTimeout(() => {
        if (typeof switchTabFn === 'function') switchTabFn();
        if (toolsSection) {
          toolsSection.classList.remove('zoom-out-fade');
          toolsSection.classList.add('zoom-in-restore');
          setTimeout(() => {
            toolsSection.classList.remove('zoom-in-restore');
          }, 800);
        }
      }, 350);

      setTimeout(() => {
        if (buildSection) {
          buildSection.classList.remove('animate-capabilities-out');
        }
        if (typeof onComplete === 'function') onComplete();
      }, 1100);
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
      }
    } else if (panelId === 'tools-section') {
      if (deltaY > 0) {
        const maxScroll = overlayContainer.scrollHeight - overlayContainer.clientHeight;
        if (overlayContainer.scrollTop >= maxScroll - 20 || maxScroll <= 0) {
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
    overlayContainer.addEventListener('scroll', window.updateWorkStyleScrollytelling, { passive: true });

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

  // Contact Modal Handlers
  const contactModal = document.getElementById('contact-modal');
  const openBtn = document.getElementById('open-contact-btn');
  const closeBtn = document.getElementById('close-contact-btn') || document.getElementById('modal-close-btn') || document.querySelector('.modal-close-btn');

  function openContactModal() {
    if (contactModal) {
      contactModal.classList.remove('hidden');
    }
  }

  function closeContactModal() {
    if (contactModal) {
      contactModal.classList.add('hidden');
    }
  }

  if (navContact) {
    navContact.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal();
    });
  }

  if (openBtn) {
    openBtn.addEventListener('click', openContactModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeContactModal();
    });
  }

  const allCloseBtns = document.querySelectorAll('#close-contact-btn, #modal-close-btn, .modal-close-btn');
  allCloseBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeContactModal();
    });
  });

  // Close modal when clicking on backdrop
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        closeContactModal();
      }
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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

import './../style.css';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
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

  // Initialize Lenis Ultra-Smooth Oceanic Wave Scroll Engine
  const lenis = new Lenis({
    duration: 1.6, // Silky oceanic wave momentum glide
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential wave curve
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.2,
    infinite: false,
  });

  window.lenis = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

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
      lenis.scrollTo(targetY, { duration: 1.6 });
    } else {
      const projectsSec = document.getElementById('projects-section');
      if (projectsSec) lenis.scrollTo(projectsSec, { duration: 1.6 });
    }
  }

  function scrollToAbout() {
    const maxScroll = getHeroScrollMax();
    lenis.scrollTo(maxScroll, { duration: 1.6 });
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
      lenis.scrollTo(0, { duration: 1.6 });
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

  // Force manual scroll restoration so entering/reloading link ALWAYS lands on top of Landing Screen
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Clear any hash in URL so entering the link lands 100% on the Landing Screen (hero canvas)
  if (window.location.hash) {
    history.replaceState('', document.title, window.location.pathname + window.location.search);
  }

  // Force landing on top of Landing Screen (0, 0)
  window.scrollTo(0, 0);

  window.addEventListener('load', () => {
    if (window.location.hash) {
      history.replaceState('', document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  });

  window.addEventListener('pageshow', () => {
    window.scrollTo(0, 0);
  });

  // Contact & Separate Screen Handlers
  function scrollToContact() {
    const contactSec = document.getElementById('contact-section');
    if (contactSec) {
      lenis.scrollTo(contactSec, { duration: 1.6 });
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
  // HOW I WORK (Process Section): Step-by-Step Scroll Reveal Engine
  // --------------------------------------------------------------------------
  const workStyleScrollWrapper = document.getElementById('work-style-scroll-wrapper');
  const processHeader = document.getElementById('process-header');
  const step1Card = document.getElementById('process-step-1');
  const step2Card = document.getElementById('process-step-2');
  const step3Card = document.getElementById('process-step-3');
  const axisFill = document.getElementById('process-axis-fill');
  const axisNode1 = document.getElementById('axis-node-1');
  const axisNode2 = document.getElementById('axis-node-2');
  const axisNode3 = document.getElementById('axis-node-3');
  const axisNode4 = document.getElementById('axis-node-4');

  let workStyleScrollTicking = false;

  function updateWorkStyleScroll() {
    if (!workStyleScrollWrapper) return;

    const rect = workStyleScrollWrapper.getBoundingClientRect();
    const maxScroll = workStyleScrollWrapper.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const scrolled = -rect.top;
    const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);

    // 1. Header: visible from the start
    if (processHeader) {
      const headerFade = Math.min(Math.max((progress + 0.1) / 0.25, 0), 1);
      processHeader.style.opacity = Math.max(0.6, headerFade).toFixed(3);
    }

    // 2. Step 1 (Understand): reveals at 0.04 -> 0.32
    const p1 = Math.min(Math.max((progress - 0.04) / 0.28, 0), 1);
    const ease1 = p1 * p1 * (3 - 2 * p1);
    if (step1Card) {
      step1Card.style.opacity = ease1.toFixed(3);
      step1Card.style.transform = `translateY(${((1 - ease1) * 32).toFixed(1)}px) scale(${(0.95 + ease1 * 0.05).toFixed(3)})`;
      if (ease1 >= 0.5) {
        step1Card.classList.add('active-glow');
      } else {
        step1Card.classList.remove('active-glow');
      }
    }

    // 3. Step 2 (Shape): reveals at 0.34 -> 0.62
    const p2 = Math.min(Math.max((progress - 0.34) / 0.28, 0), 1);
    const ease2 = p2 * p2 * (3 - 2 * p2);
    if (step2Card) {
      step2Card.style.opacity = ease2.toFixed(3);
      step2Card.style.transform = `translateY(${((1 - ease2) * 32).toFixed(1)}px) scale(${(0.95 + ease2 * 0.05).toFixed(3)})`;
      if (ease2 >= 0.5) {
        step2Card.classList.add('active-glow');
      } else {
        step2Card.classList.remove('active-glow');
      }
    }

    // 4. Step 3 (Evolve): reveals at 0.64 -> 0.92
    const p3 = Math.min(Math.max((progress - 0.64) / 0.28, 0), 1);
    const ease3 = p3 * p3 * (3 - 2 * p3);
    if (step3Card) {
      step3Card.style.opacity = ease3.toFixed(3);
      step3Card.style.transform = `translateY(${((1 - ease3) * 32).toFixed(1)}px) scale(${(0.95 + ease3 * 0.05).toFixed(3)})`;
      if (ease3 >= 0.5) {
        step3Card.classList.add('active-glow');
      } else {
        step3Card.classList.remove('active-glow');
      }
    }

    // 5. Axis line fill & nodes: progress-linked
    if (axisFill) {
      const axisProg = Math.min(Math.max((progress - 0.04) / 0.88, 0), 1);
      axisFill.style.transform = `scaleX(${axisProg.toFixed(3)})`;
    }

    if (axisNode1) axisNode1.classList.toggle('active', progress >= 0.04);
    if (axisNode2) axisNode2.classList.toggle('active', progress >= 0.34);
    if (axisNode3) axisNode3.classList.toggle('active', progress >= 0.64);
    if (axisNode4) axisNode4.classList.toggle('active', progress >= 0.88);
  }

  function requestWorkStyleScrollUpdate() {
    if (!workStyleScrollTicking) {
      workStyleScrollTicking = true;
      requestAnimationFrame(() => {
        updateWorkStyleScroll();
        workStyleScrollTicking = false;
      });
    }
  }

  window.addEventListener('scroll', requestWorkStyleScrollUpdate, { passive: true });
  window.addEventListener('resize', requestWorkStyleScrollUpdate, { passive: true });
  updateWorkStyleScroll();

  // --------------------------------------------------------------------------
  // TOOLS & ECOSYSTEM -> CAPABILITIES: Unified Step-by-Step & Fade-Over Scroll Reveal Engine
  // --------------------------------------------------------------------------
  const toolsScrollWrapper = document.getElementById('tools-scroll-wrapper');
  const toolsLayerWrap = document.getElementById('tools-layer-wrap');
  const toolsHeader = document.getElementById('tools-header');
  const toolCat1 = document.getElementById('tool-cat-1');
  const toolCat2 = document.getElementById('tool-cat-2');
  const toolCat3 = document.getElementById('tool-cat-3');
  const toolCat4 = document.getElementById('tool-cat-4');

  const capabilitiesLayerWrap = document.getElementById('what-i-build-section');
  const capabilitiesHeader = document.getElementById('capabilities-header');
  const capabilityCards = document.querySelectorAll('#what-i-build-section .arch-card');

  let toolsScrollTicking = false;

  function updateToolsScroll() {
    if (!toolsScrollWrapper) return;

    const rect = toolsScrollWrapper.getBoundingClientRect();
    const maxScroll = toolsScrollWrapper.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const scrolled = -rect.top;
    const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);

    // ---------------- PHASE 1: TOOLS & ECOSYSTEM REVEAL (0.00 -> 0.40) ----------------
    // 1. Header: visible from the start
    if (toolsHeader) {
      const headerFade = Math.min(Math.max((progress + 0.1) / 0.20, 0), 1);
      toolsHeader.style.opacity = Math.max(0.6, headerFade).toFixed(3);
    }

    // 2. Category 1 (DESIGN): reveals at 0.02 -> 0.11
    const p1 = Math.min(Math.max((progress - 0.02) / 0.09, 0), 1);
    const ease1 = p1 * p1 * (3 - 2 * p1);
    if (toolCat1) {
      toolCat1.style.opacity = ease1.toFixed(3);
      toolCat1.style.transform = `translateY(${((1 - ease1) * 28).toFixed(1)}px) scale(${(0.97 + ease1 * 0.03).toFixed(3)})`;
      if (ease1 >= 0.5) {
        toolCat1.classList.add('active-glow');
      } else {
        toolCat1.classList.remove('active-glow');
      }
    }

    // 3. Category 2 (MOTION): reveals at 0.11 -> 0.20
    const p2 = Math.min(Math.max((progress - 0.11) / 0.09, 0), 1);
    const ease2 = p2 * p2 * (3 - 2 * p2);
    if (toolCat2) {
      toolCat2.style.opacity = ease2.toFixed(3);
      toolCat2.style.transform = `translateY(${((1 - ease2) * 28).toFixed(1)}px) scale(${(0.97 + ease2 * 0.03).toFixed(3)})`;
      if (ease2 >= 0.5) {
        toolCat2.classList.add('active-glow');
      } else {
        toolCat2.classList.remove('active-glow');
      }
    }

    // 4. Category 3 (CODE): reveals at 0.20 -> 0.29
    const p3 = Math.min(Math.max((progress - 0.20) / 0.09, 0), 1);
    const ease3 = p3 * p3 * (3 - 2 * p3);
    if (toolCat3) {
      toolCat3.style.opacity = ease3.toFixed(3);
      toolCat3.style.transform = `translateY(${((1 - ease3) * 28).toFixed(1)}px) scale(${(0.97 + ease3 * 0.03).toFixed(3)})`;
      if (ease3 >= 0.5) {
        toolCat3.classList.add('active-glow');
      } else {
        toolCat3.classList.remove('active-glow');
      }
    }

    // 5. Category 4 (AI & ANALYTICS): reveals at 0.29 -> 0.38
    const p4 = Math.min(Math.max((progress - 0.29) / 0.09, 0), 1);
    const ease4 = p4 * p4 * (3 - 2 * p4);
    if (toolCat4) {
      toolCat4.style.opacity = ease4.toFixed(3);
      toolCat4.style.transform = `translateY(${((1 - ease4) * 28).toFixed(1)}px) scale(${(0.97 + ease4 * 0.03).toFixed(3)})`;
      if (ease4 >= 0.5) {
        toolCat4.classList.add('active-glow');
      } else {
        toolCat4.classList.remove('active-glow');
      }
    }

    // ---------------- PHASE 2: CROSSFADE DIRECTLY INTO WHAT I BRING TO THE TABLE (0.39 -> 0.60) ----------------
    // Layer 1 (Tools) fades out smoothly
    const toolsOutProg = Math.min(Math.max((progress - 0.39) / 0.12, 0), 1);
    const easeToolsOut = toolsOutProg * toolsOutProg * (3 - 2 * toolsOutProg);
    if (toolsLayerWrap) {
      toolsLayerWrap.style.opacity = (1 - easeToolsOut).toFixed(3);
      toolsLayerWrap.style.transform = `translateY(-${(easeToolsOut * 25).toFixed(1)}px) scale(${(1 - easeToolsOut * 0.03).toFixed(3)})`;
      toolsLayerWrap.style.pointerEvents = easeToolsOut >= 0.7 ? 'none' : 'auto';
      toolsLayerWrap.style.visibility = progress >= 0.65 ? 'hidden' : 'visible';
    }

    // Layer 2 (Capabilities / What I Bring to the Table) fades directly in on top
    const capInProg = Math.min(Math.max((progress - 0.40) / 0.13, 0), 1);
    const easeCapIn = capInProg * capInProg * (3 - 2 * capInProg);
    if (capabilitiesLayerWrap) {
      capabilitiesLayerWrap.style.opacity = easeCapIn.toFixed(3);
      capabilitiesLayerWrap.style.visibility = progress >= 0.39 ? 'visible' : 'hidden';
      if (progress >= 0.50) {
        capabilitiesLayerWrap.classList.add('active');
        capabilitiesLayerWrap.style.pointerEvents = 'auto';
      } else {
        capabilitiesLayerWrap.classList.remove('active');
        capabilitiesLayerWrap.style.pointerEvents = 'none';
      }
    }

    // Capabilities Header and 6 cards stagger-fade in
    if (capabilitiesHeader) {
      const hProg = Math.min(Math.max((progress - 0.42) / 0.12, 0), 1);
      const easeH = hProg * hProg * (3 - 2 * hProg);
      capabilitiesHeader.style.opacity = easeH.toFixed(3);
      capabilitiesHeader.style.transform = `translateY(${((1 - easeH) * 20).toFixed(1)}px)`;
    }

    capabilityCards.forEach((card, idx) => {
      const staggerDelay = (idx % 3) * 0.02 + Math.floor(idx / 3) * 0.03;
      const cp = Math.min(Math.max((progress - 0.44 - staggerDelay) / 0.14, 0), 1);
      const easeCard = cp * cp * (3 - 2 * cp);
      card.style.opacity = easeCard.toFixed(3);
      card.style.transform = `translateY(${((1 - easeCard) * 30).toFixed(1)}px) scale(${(0.96 + easeCard * 0.04).toFixed(3)})`;
    });
  }

  function requestToolsScrollUpdate() {
    if (!toolsScrollTicking) {
      toolsScrollTicking = true;
      requestAnimationFrame(() => {
        updateToolsScroll();
        toolsScrollTicking = false;
      });
    }
  }

  window.addEventListener('scroll', requestToolsScrollUpdate, { passive: true });
  window.addEventListener('resize', requestToolsScrollUpdate, { passive: true });
  updateToolsScroll();

  // Tool Item Badges Interactive Hover & Click Engine
  const toolItemWrappers = document.querySelectorAll('.tool-item-wrapper');
  toolItemWrappers.forEach((wrapper) => {
    wrapper.addEventListener('click', (e) => {
      const wasActive = wrapper.classList.contains('active');
      toolItemWrappers.forEach(w => w.classList.remove('active'));
      if (!wasActive) {
        wrapper.classList.add('active');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.tool-item-wrapper')) {
      toolItemWrappers.forEach(w => w.classList.remove('active'));
    }
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
            lenis.scrollTo(targetEl, { duration: 1.6 });
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
        lenis.scrollTo(contactSec, { duration: 1.6 });
      }
    });
  }

  // --------------------------------------------------------------------------
  // Interactive Smooth Mouse Floating Parallax Engine for About Sections
  // --------------------------------------------------------------------------
  function initAboutTabsMouseFloat() {
    const aboutContainer = document.getElementById('about-more-sections');
    if (!aboutContainer) return;

    const buildSection = document.getElementById('what-i-build-section');
    const buildWrap = buildSection ? buildSection.querySelector('.capabilities-floating-wrap') : null;
    const buildGridBg = buildSection ? buildSection.querySelector('.capabilities-grid-bg') : null;

    const toolsSection = document.getElementById('tools-section');
    const toolsWrap = toolsSection ? toolsSection.querySelector('.tools-floating-wrap') : null;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let floatTime = 0;

    function onMouseMove(e) {
      const rect = aboutContainer.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;

      const cx = window.innerWidth * 0.5;
      const cy = window.innerHeight * 0.5;

      const relX = (e.clientX - cx) / cx;
      const relY = (e.clientY - cy) / cy;

      targetX = Math.max(-1, Math.min(1, relX));
      targetY = Math.max(-1, Math.min(1, relY));
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    function renderFloat() {
      const rect = aboutContainer.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        floatTime += 0.02;

        currentX += (targetX - currentX) * 0.065;
        currentY += (targetY - currentY) * 0.065;

        const ambientFloatY = Math.sin(floatTime * 1.5) * 2;
        const ambientFloatX = Math.cos(floatTime * 1.2) * 1.5;

        const moveX = currentX * 14 + ambientFloatX;
        const moveY = currentY * 10 + ambientFloatY;
        const rotX = -currentY * 3.5;
        const rotY = currentX * 4.2;

        if (buildWrap) {
          buildWrap.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
        }
        if (buildGridBg) {
          const bgX = -currentX * 10 - ambientFloatX * 0.5;
          const bgY = -currentY * 8 - ambientFloatY * 0.5;
          buildGridBg.style.transform = `translate3d(${bgX.toFixed(2)}px, ${bgY.toFixed(2)}px, 0)`;
        }
        if (toolsWrap) {
          toolsWrap.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
        }
      }

      requestAnimationFrame(renderFloat);
    }

    requestAnimationFrame(renderFloat);
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

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
  // HOW I WORK: Interactive Sequential Step Activation & Axis Fill on Scroll
  // --------------------------------------------------------------------------
  const workStyleScrollWrapper = document.getElementById('work-style-scroll-wrapper');
  const axisFill = document.getElementById('process-axis-fill');
  const card1 = document.getElementById('process-step-1');
  const card2 = document.getElementById('process-step-2');
  const card3 = document.getElementById('process-step-3');
  const node1 = document.getElementById('axis-node-1');
  const node2 = document.getElementById('axis-node-2');
  const node3 = document.getElementById('axis-node-3');
  const node4 = document.getElementById('axis-node-4');
  const allProcessCards = [card1, card2, card3];

  let workStyleScrollTicking = false;
  let userHoveredCard = null;

  allProcessCards.forEach((card) => {
    if (!card) return;
    card.addEventListener('mouseenter', () => {
      userHoveredCard = card;
      updateWorkStyleState();
    });
    card.addEventListener('mouseleave', () => {
      userHoveredCard = null;
      updateWorkStyleState();
    });
    card.addEventListener('click', () => {
      userHoveredCard = card;
      updateWorkStyleState();
    });
  });

  function updateWorkStyleScroll() {
    if (!workStyleScrollWrapper) return;

    const rect = workStyleScrollWrapper.getBoundingClientRect();
    const maxScroll = workStyleScrollWrapper.offsetHeight - window.innerHeight;
    let progress = 0;

    if (maxScroll <= 0) {
      const winH = window.innerHeight;
      progress = Math.min(Math.max((winH - rect.top) / (winH + rect.height), 0), 1);
    } else {
      const scrolled = -rect.top;
      progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);
    }

    // Interactive progress line fill (smooth scaleX from 0 to 1)
    if (axisFill) {
      axisFill.style.transform = `scaleX(${progress.toFixed(3)})`;
    }

    // Node 1: lights up as soon as section begins
    if (node1) node1.classList.toggle('active', progress >= 0.02);
    // Node 2: lights up at 33% progress
    if (node2) node2.classList.toggle('active', progress >= 0.33);
    // Node 3: lights up at 66% progress
    if (node3) node3.classList.toggle('active', progress >= 0.66);
    // Node 4: lights up at 95% progress
    if (node4) node4.classList.toggle('active', progress >= 0.95);

    // If user is hovering/interacting directly with a card, let hover override
    if (userHoveredCard) return;

    // Step 1: Understand
    if (card1) {
      if (progress < 0.35) {
        card1.classList.add('active');
        card1.classList.remove('completed');
      } else {
        card1.classList.remove('active');
        card1.classList.add('completed');
      }
    }

    // Step 2: Shape
    if (card2) {
      if (progress >= 0.35 && progress < 0.70) {
        card2.classList.add('active');
        card2.classList.remove('completed');
      } else if (progress >= 0.70) {
        card2.classList.remove('active');
        card2.classList.add('completed');
      } else {
        card2.classList.remove('active', 'completed');
      }
    }

    // Step 3: Evolve
    if (card3) {
      if (progress >= 0.70) {
        card3.classList.add('active');
        card3.classList.remove('completed');
      } else {
        card3.classList.remove('active', 'completed');
      }
    }
  }

  function updateWorkStyleState() {
    if (userHoveredCard) {
      allProcessCards.forEach((c) => {
        if (!c) return;
        if (c === userHoveredCard) {
          c.classList.add('active');
        } else {
          c.classList.remove('active');
        }
      });
    } else {
      updateWorkStyleScroll();
    }
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

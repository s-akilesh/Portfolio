import './../style.css';
import { initFluidCanvas } from './fluid-canvas.js';

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

  // Mobile Hamburger & Drawer Navigation Handlers (Google Material Icons)
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobNavWork = document.getElementById('mob-nav-work');
  const mobNavAbout = document.getElementById('mob-nav-about');
  const mobNavContact = document.getElementById('mob-nav-contact');

  function toggleMobileMenu() {
    const isActive = mobileNavOverlay ? mobileNavOverlay.classList.contains('active') : false;
    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    if (mobileNavOverlay) mobileNavOverlay.classList.add('active');
    if (hamburgerBtn) hamburgerBtn.classList.add('active');
  }

  function closeMobileMenu() {
    if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
    if (hamburgerBtn) hamburgerBtn.classList.remove('active');
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMobileMenu);

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

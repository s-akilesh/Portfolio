import './../style.css';
import { initFluidCanvas } from './fluid-canvas.js';

document.addEventListener('DOMContentLoaded', () => {
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

  // Contact Modal Handlers
  const contactModal = document.getElementById('contact-modal');
  const openBtn = document.getElementById('open-contact-btn');
  const closeBtn = document.getElementById('close-contact-btn');

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

  if (openBtn) {
    openBtn.addEventListener('click', openContactModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeContactModal);
  }

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
});

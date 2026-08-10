/**
 * Contact Modal Module — "Available Worldwide" Interactive Card & Click-to-Copy Emails
 */

export function initContactModal() {
  const modal = document.getElementById('contact-modal');
  const openBtn = document.getElementById('open-contact-btn');
  const aboutCtaBtn = document.getElementById('about-contact-btn');
  const closeBtn = document.getElementById('close-contact-btn');
  const copyBtns = document.querySelectorAll('.copy-email-btn');

  if (!modal) return;

  function openModal() {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (aboutCtaBtn) aboutCtaBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close on backdrop click outside card
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Click-to-copy email addresses
  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const email = btn.dataset.email;
      if (!email) return;

      navigator.clipboard.writeText(email).then(() => {
        btn.classList.add('copied');
        setTimeout(() => {
          btn.classList.remove('copied');
        }, 2000);
      }).catch((err) => {
        console.error('Failed to copy email:', err);
      });
    });
  });
}

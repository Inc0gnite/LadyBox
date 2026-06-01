/* ══════════════════════════════════════════════════
   LadyBox — main.js
   Scroll reveal + header shadow on scroll
   ══════════════════════════════════════════════════ */

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Header shadow on scroll
const header = document.getElementById('site-header');

window.addEventListener(
  'scroll',
  () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  },
  { passive: true }
);

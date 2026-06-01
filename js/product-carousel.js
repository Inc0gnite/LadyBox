/* ══════════════════════════════════════════════════
   LadyBox — product-carousel.js
   ══════════════════════════════════════════════════ */

(function () {
  const carousels = document.querySelectorAll('[data-product-carousel]');

  carousels.forEach((carousel) => {
    const track     = carousel.querySelector('.product-carousel__track');
    const slides    = carousel.querySelectorAll('.product-carousel__slide');
    const dotsWrap  = carousel.querySelector('.product-carousel__dots');
    const btnPrev   = carousel.querySelector('.product-carousel__btn--prev');
    const btnNext   = carousel.querySelector('.product-carousel__btn--next');

    if (!track || !slides.length) return;

    let current   = 0;
    let autoTimer = null;

    // ── Build dots ──────────────────────────────
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'product-carousel__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll('.product-carousel__dot');

    // ── Go to slide ─────────────────────────────
    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    // ── Controls ────────────────────────────────
    btnPrev && btnPrev.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    btnNext && btnNext.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

    // ── Autoplay ────────────────────────────────
    function startAuto() {
      autoTimer = setInterval(() => goTo(current + 1), 4000);
    }

    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    startAuto();

    // ── Pause on hover / focus ───────────────────
    carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
    carousel.addEventListener('mouseleave', startAuto);
    carousel.addEventListener('focusin',    () => clearInterval(autoTimer));
    carousel.addEventListener('focusout',   startAuto);

    // ── Touch / swipe support ───────────────────
    let touchStartX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? current + 1 : current - 1);
        resetAuto();
      }
    }, { passive: true });

    // ── Keyboard support ────────────────────────
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  { goTo(current - 1); resetAuto(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); resetAuto(); }
    });
  });
})();

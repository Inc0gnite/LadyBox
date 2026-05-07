(function () {
  var root = document.querySelector("[data-product-carousel]");
  if (!root) return;

  var track = root.querySelector(".product-carousel__track");
  var slides = root.querySelectorAll(".product-carousel__slide");
  var prevBtn = root.querySelector(".product-carousel__btn--prev");
  var nextBtn = root.querySelector(".product-carousel__btn--next");
  var dotsWrap = root.querySelector(".product-carousel__dots");
  if (!track || !dotsWrap || !prevBtn || !nextBtn) return;

  var n = slides.length;
  if (n === 0) return;

  var index = 0;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var autoplayDelay = reducedMotion ? 9000 : 4000;
  var timer = null;

  function update() {
    track.style.transform = "translateX(-" + index * (100 / n) + "%)";
    slides.forEach(function (slide, j) {
      slide.setAttribute("aria-hidden", j !== index ? "true" : "false");
    });
    var dots = dotsWrap.querySelectorAll(".product-carousel__dot");
    dots.forEach(function (dot, j) {
      dot.setAttribute("aria-selected", j === index ? "true" : "false");
    });
  }

  function go(i) {
    index = ((i % n) + n) % n;
    update();
  }

  function nextSlide() {
    go(index + 1);
  }

  function prevSlide() {
    go(index - 1);
  }

  function stopAutoplay() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    timer = window.setInterval(nextSlide, autoplayDelay);
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  for (var i = 0; i < n; i++) {
    (function (j) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "product-carousel__dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Mostrar imagen " + (j + 1) + " de " + n);
      dot.addEventListener("click", function () {
        go(j);
        resetAutoplay();
      });
      dotsWrap.appendChild(dot);
    })(i);
  }

  prevBtn.addEventListener("click", function () {
    prevSlide();
    resetAutoplay();
  });
  nextBtn.addEventListener("click", function () {
    nextSlide();
    resetAutoplay();
  });

  root.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
      resetAutoplay();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
      resetAutoplay();
    }
  });

  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", startAutoplay);

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  update();
  startAutoplay();
})();

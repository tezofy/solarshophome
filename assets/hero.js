/* Solar Shop — home hero (v3 "trust band")
   The hero is intentionally static: no parallax, no filters, no photo
   blending. This file only adds a small, honest notice when a link
   points at a page that is not part of this single-page deliverable. */
(function () {
  var toast = document.createElement('div');
  toast.className = 'hv2-toast';
  toast.setAttribute('role', 'status');
  document.body.appendChild(toast);

  var timer;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add('on');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('on'); }, 2600);
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || /^(tel:|mailto:|https?:|#)/.test(href)) return;
    if (/\.html(\?|#|$)/.test(href)) {
      e.preventDefault();
      say('Demo home page — this link opens its own page on the live site.');
    }
  });
})();

/* =====================================================================
   HERO PHOTO SLIDER — 5 uploaded client images, crossfade
   ===================================================================== */
(function () {
  var slides = [].slice.call(document.querySelectorAll('.hv2-slide'));
  var dots = [].slice.call(document.querySelectorAll('.hv2-dot'));
  var count = slides.length;
  if (!count) return;
  var current = 0;
  var timer = null;
  var delay = 5200; // 5.2s between slides
  var capEl = document.querySelector('.hv2-cap-txt');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setCaption(i) {
    var cap = slides[i] && slides[i].getAttribute('data-cap');
    if (capEl && cap) capEl.textContent = cap;
  }

  function show(i) {
    if (i === current) return;
    slides[current].classList.remove('on');
    slides[current].setAttribute('aria-hidden', 'true');
    dots[current].classList.remove('on');
    dots[current].setAttribute('aria-selected', 'false');
    current = i;
    slides[current].classList.add('on');
    slides[current].setAttribute('aria-hidden', 'false');
    dots[current].classList.add('on');
    dots[current].setAttribute('aria-selected', 'true');
    setCaption(current);
  }

  function next() { show((current + 1) % count); }
  function prev() { show((current - 1 + count) % count); }

  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(next, delay);
  }

  window.hv2Go = function (i) { if (i >= 0 && i < count) { show(i); resetTimer(); } };
  window.hv2Next = function () { next(); resetTimer(); };
  window.hv2Prev = function () { prev(); resetTimer(); };

  if (!reduce) timer = setTimeout(next, delay);

  function play() { clearTimeout(timer); if (!reduce) timer = setTimeout(next, delay); }
  function pause() { clearTimeout(timer); }

  var slider = document.getElementById('hv2-slider');
  if (slider) {
    slider.addEventListener('mouseenter', pause);
    slider.addEventListener('mouseleave', play);
    slider.addEventListener('focusin', pause);
    slider.addEventListener('focusout', play);
  }
  document.addEventListener('visibilitychange', function () {
    document.hidden ? pause() : play();
  });

  /* keyboard: ← / → while the slider has focus */
  var wrapEl = document.querySelector('.hv2-media');
  if (wrapEl) {
    wrapEl.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { prev(); play(); }
      if (e.key === 'ArrowRight') { next(); play(); }
    });
  }

  /* touch swipe */
  var startX = null;
  if (slider) {
    slider.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { dx > 0 ? prev() : next(); play(); }
      startX = null;
    }, { passive: true });
  }
})();

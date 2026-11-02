/* Solar Shop — Home Hero (v6 "Split Editorial & Framed Showcase")
   Includes:
   1. Demo notice for sub-page links outside this single-page deliverable.
   2. 5-photo showcase slider with thumbnail dock, live slide counter,
      category badge, caption crossfade, and animated progress bar. */
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
   HERO PHOTO SHOWCASE & INTERACTIVE THUMBNAIL DOCK
   ===================================================================== */
(function () {
  var slides = [].slice.call(document.querySelectorAll('.hv2-slide'));
  var dots = [].slice.call(document.querySelectorAll('.hv2-dot'));
  var count = slides.length;
  if (!count) return;

  var current = 0;
  var timer = null;
  var delay = 5200; // matches --hv2-slide-duration
  var capEl = document.querySelector('.hv2-cap-txt');
  var numEl = document.querySelector('.hv2-counter-num');
  var tagEl = document.querySelector('.hv2-counter-tag');
  var progEl = document.querySelector('.hv2-progress-bar');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }

  function restartProgress() {
    if (!progEl || reduce) return;
    progEl.classList.remove('run');
    void progEl.offsetWidth; // trigger reflow to restart CSS keyframe animation
    progEl.classList.add('run');
  }

  function setMeta(i) {
    var s = slides[i];
    if (!s) return;
    var cap = s.getAttribute('data-cap');
    var tag = s.getAttribute('data-tag');
    if (capEl && cap) capEl.textContent = cap;
    if (numEl) numEl.textContent = pad2(i + 1) + ' / ' + pad2(count);
    if (tagEl && tag) tagEl.textContent = tag;
  }

  function show(i) {
    if (i === current) return;
    slides[current].classList.remove('on');
    slides[current].setAttribute('aria-hidden', 'true');
    if (dots[current]) {
      dots[current].classList.remove('on');
      dots[current].setAttribute('aria-selected', 'false');
    }
    current = i;
    slides[current].classList.add('on');
    slides[current].setAttribute('aria-hidden', 'false');
    if (dots[current]) {
      dots[current].classList.add('on');
      dots[current].setAttribute('aria-selected', 'true');
    }
    setMeta(current);
    restartProgress();
  }

  function next() { show((current + 1) % count); }
  function prev() { show((current - 1 + count) % count); }

  function resetTimer() {
    clearTimeout(timer);
    if (!reduce) {
      timer = setTimeout(next, delay);
      restartProgress();
    }
  }

  window.hv2Go = function (i) {
    if (i >= 0 && i < count) {
      if (i === current) {
        resetTimer();
      } else {
        show(i);
        clearTimeout(timer);
        if (!reduce) timer = setTimeout(next, delay);
      }
    }
  };
  window.hv2Next = function () { next(); clearTimeout(timer); if (!reduce) timer = setTimeout(next, delay); };
  window.hv2Prev = function () { prev(); clearTimeout(timer); if (!reduce) timer = setTimeout(next, delay); };

  if (!reduce) {
    restartProgress();
    timer = setTimeout(next, delay);
  }

  function play() {
    clearTimeout(timer);
    if (!reduce) {
      restartProgress();
      timer = setTimeout(next, delay);
    }
  }
  function pause() {
    clearTimeout(timer);
  }

  var stage = document.querySelector('.hv2-media') || document.getElementById('hv2-slider');
  if (stage) {
    stage.addEventListener('mouseenter', pause);
    stage.addEventListener('mouseleave', play);
    stage.addEventListener('focusin', pause);
    stage.addEventListener('focusout', play);
    stage.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); play(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); play(); }
    });
  }

  document.addEventListener('visibilitychange', function () {
    document.hidden ? pause() : play();
  });

  /* Touch swipe on the photo stage */
  var slider = document.getElementById('hv2-slider');
  var startX = null;
  if (slider) {
    slider.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) {
        dx > 0 ? prev() : next();
        play();
      }
      startX = null;
    }, { passive: true });
  }
})();

/* =====================================================================
   CONTINUOUS RANDOMIZED CUSTOMER REVIEW SLIDER (NON-STOP MARQUEE)
   ===================================================================== */
(function () {
  var track = document.getElementById('hv2-rev-track');
  if (!track) return;
  var cards = [].slice.call(track.querySelectorAll('.hv2-rev-card'));
  if (!cards.length) return;

  /* Randomly shuffle the review cards on each load (Fisher-Yates) */
  for (var i = cards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = cards[i];
    cards[i] = cards[j];
    cards[j] = tmp;
  }

  track.innerHTML = '';
  cards.forEach(function (card) {
    track.appendChild(card);
  });
  /* Append seamless duplicate set for infinite continuous loop */
  cards.forEach(function (card) {
    var clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
})();


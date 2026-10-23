(function () {
  'use strict';
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  /* Apparition au défilement + cascade des étiquettes */
  $$('.rv').forEach(function (el) {
    $$('.tag, .hero-badge', el).forEach(function (t, i) { t.style.setProperty('--i', i); });
  });
  var rv = $$('.rv');
  if (hasIO && !still) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add('in'); });
  }

  /* Menu actif selon la section visible */
  var links = $$('.toplinks a.l');
  if (hasIO) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { so.observe(s); });
  }

  /* Ombre du header, retour en haut */
  var up = $('#up'), nav = $('#nav');
  function onScroll() {
    up.classList.toggle('show', scrollY > 600);
    nav.classList.toggle('sc', scrollY > 8);
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  up.addEventListener('click', function () { scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' }); });

})();

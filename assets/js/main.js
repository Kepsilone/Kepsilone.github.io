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

  /* Progression, ombre du header, retour en haut */
  var pg = $('#pg'), up = $('#up'), nav = $('#nav');
  function onScroll() {
    var h = document.documentElement, m = h.scrollHeight - h.clientHeight;
    if (pg) pg.style.width = (m > 0 ? scrollY / m * 100 : 0) + '%';
    up.classList.toggle('show', scrollY > 600);
    nav.classList.toggle('sc', scrollY > 8);
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  up.addEventListener('click', function () { scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' }); });

  /* Halo et inclinaison 3D des cartes */
  $$('.project').forEach(function (c) {
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect();
      if (!still && matchMedia('(pointer: fine)').matches) {
        var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        c.style.transition = 'transform .1s';
        c.style.transform = 'perspective(800px) rotateX(' + (-py * 5) + 'deg) rotateY(' + (px * 7) + 'deg) translateY(-4px)';
      }
    });
    c.addEventListener('pointerleave', function () { c.style.transition = 'transform .5s'; c.style.transform = ''; });
  });

})();

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
    pg.style.width = (m > 0 ? scrollY / m * 100 : 0) + '%';
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

  /* Menu rapide (Ctrl / ⌘ + K) */
  var pal = $('#pal'), pi = $('#pi'), pl = $('#pl'), sel = 0, shown = [];
  var items = [
    { t: 'Accueil', h: '#top' },
    { t: 'Projets', h: '#projects-index' },
    { t: 'À propos', h: '#apropos' },
    { t: 'Parcours', h: '#parcours' },
    { t: 'Compétences', h: '#competences' },
    { t: 'Contact', h: '#contact' },
    { t: 'GitHub', s: 'ouvre un nouvel onglet', h: 'https://github.com/Kepsilone', x: 1 },
    { t: 'LinkedIn', s: 'ouvre un nouvel onglet', h: 'https://www.linkedin.com/in/jedid-sabeur', x: 1 }
  ];
  var lastFocus = null;
  function norm(t) { return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function draw() {
    var q = norm(pi.value.trim());
    shown = items.filter(function (i) { return !q || norm(i.t).indexOf(q) > -1; });
    sel = Math.min(sel, Math.max(shown.length - 1, 0));
    pl.innerHTML = '';
    shown.forEach(function (i, n) {
      var li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.textContent = i.t;
      if (i.s) { var sm = document.createElement('small'); sm.textContent = i.s; li.appendChild(sm); }
      if (n === sel) li.className = 'on';
      li.addEventListener('click', function () { go(i); });
      pl.appendChild(li);
    });
  }
  function openPal() { lastFocus = document.activeElement; pal.hidden = false; pi.value = ''; sel = 0; draw(); pi.focus(); }
  function closePal() { pal.hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true }); }
  function go(i) {
    closePal();
    if (i.x) { window.open(i.h, '_blank', 'noopener'); return; }
    var el = $(i.h);
    if (el) el.scrollIntoView({ behavior: still ? 'auto' : 'smooth' });
  }
  if (pal) {
    $('#palbtn').addEventListener('click', openPal);
    pi.addEventListener('input', function () { sel = 0; draw(); });
    pal.addEventListener('click', function (e) { if (e.target === pal) closePal(); });
    pi.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { sel = Math.min(sel + 1, shown.length - 1); draw(); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { sel = Math.max(sel - 1, 0); draw(); e.preventDefault(); }
      else if (e.key === 'Enter') { if (shown[sel]) go(shown[sel]); e.preventDefault(); }
      else if (e.key === 'Escape') { closePal(); }
    });
    addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? openPal() : closePal(); }
      else if (e.key === 'Escape' && !pal.hidden) closePal();
    });
  }

})();

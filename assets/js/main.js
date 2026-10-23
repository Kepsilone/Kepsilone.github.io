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

  /* Rubrique Apprentissage : billets lus dans assets/data/apprentissage.json */
  var learn = $('#learn-list');
  if (learn && window.fetch) {
    fetch('assets/data/apprentissage.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (items) {
        if (!Array.isArray(items) || !items.length) return;
        items.sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
        learn.innerHTML = '';
        var shown = 6;
        function fmt(d) {
          var p = String(d).split('-');
          var mois = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
          return p.length === 3 ? (+p[2]) + ' ' + mois[+p[1] - 1] + ' ' + p[0] : d;
        }
        function card(it) {
          var el = document.createElement('article');
          el.className = 'learn-item';
          var meta = document.createElement('p');
          meta.className = 'learn-meta';
          meta.textContent = fmt(it.date) + (it.tag ? ' · ' + it.tag : '');
          var h = document.createElement('h3');
          h.textContent = it.titre || '';
          var p = document.createElement('p');
          p.className = 'learn-text';
          p.textContent = it.texte || '';
          el.appendChild(meta); el.appendChild(h); el.appendChild(p);
          if (it.lien) {
            var a = document.createElement('a');
            a.className = 'learn-link';
            a.href = it.lien;
            a.target = '_blank';
            a.rel = 'noopener';
            a.textContent = 'Lire la suite ↗';
            el.appendChild(a);
          }
          return el;
        }
        items.forEach(function (it, i) {
          var el = card(it);
          if (i >= shown) el.hidden = true;
          learn.appendChild(el);
        });
        if (items.length > shown) {
          var more = document.createElement('button');
          more.type = 'button';
          more.className = 'btn btn-ghost btn-sm learn-more';
          more.textContent = 'Voir les billets précédents';
          more.addEventListener('click', function () {
            $$('.learn-item[hidden]', learn).forEach(function (el) { el.hidden = false; });
            more.remove();
          });
          learn.parentNode.appendChild(more);
        }
      })
      .catch(function () {});
  }

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

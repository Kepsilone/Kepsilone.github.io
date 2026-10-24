/* Graphiques des articles : barres horizontales et anneaux, sans bibliothèque.
   Chaque <figure class="chart"> porte ses données en JSON dans data-values :
   [["Libellé", valeur, "#couleur facultative"], ...] */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  var tip = document.createElement('div');
  tip.className = 'chart-tip';
  tip.setAttribute('role', 'status');
  document.body.appendChild(tip);
  function showTip(text, x, y) {
    tip.textContent = text;
    tip.style.left = x + 'px';
    tip.style.top = y + 'px';
    tip.classList.add('on');
  }
  function hideTip() { tip.classList.remove('on'); }
  function bindTip(el, text) {
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', text);
    el.addEventListener('pointermove', function (e) { showTip(text, e.clientX, e.clientY); });
    el.addEventListener('pointerleave', hideTip);
    el.addEventListener('focus', function () {
      var r = el.getBoundingClientRect();
      showTip(text, r.left + r.width / 2, r.top);
    });
    el.addEventListener('blur', hideTip);
  }

  function fmt(v, unit) {
    return String(v).replace('.', ',') + (unit === '%' ? ' %' : unit ? ' ' + unit : '');
  }

  function table(fig, rows, unit, head) {
    var d = document.createElement('details');
    d.className = 'chart-data';
    var s = document.createElement('summary');
    s.textContent = 'Voir les données';
    d.appendChild(s);
    var t = document.createElement('table');
    var tr = document.createElement('tr');
    [head[0], head[1]].forEach(function (h, i) {
      var th = document.createElement('th');
      th.textContent = h;
      if (i === 1) th.className = 'num';
      tr.appendChild(th);
    });
    t.appendChild(tr);
    rows.forEach(function (r) {
      var row = document.createElement('tr');
      var a = document.createElement('td'); a.textContent = r[0];
      var b = document.createElement('td'); b.textContent = fmt(r[1], unit); b.className = 'num';
      row.appendChild(a); row.appendChild(b);
      t.appendChild(row);
    });
    d.appendChild(t);
    fig.appendChild(d);
  }

  function bars(fig, rows, unit, tipSuffix) {
    var max = Math.max.apply(null, rows.map(function (r) { return r[1]; }));
    var scale = unit === '%' ? 100 : max * 1.15;
    var wrap = document.createElement('div');
    wrap.className = 'bars';
    rows.forEach(function (r) {
      var row = document.createElement('div');
      row.className = 'bar-row';
      var lab = document.createElement('span');
      lab.className = 'bar-label';
      lab.textContent = r[0];
      var track = document.createElement('span');
      track.className = 'bar-track';
      var fill = document.createElement('span');
      fill.className = 'bar-fill';
      fill.style.width = 'calc((100% - 64px) * ' + (r[1] / scale).toFixed(4) + ')';
      var val = document.createElement('span');
      val.className = 'bar-value';
      val.textContent = fmt(r[1], unit);
      track.appendChild(fill);
      track.appendChild(val);
      row.appendChild(lab);
      row.appendChild(track);
      bindTip(row, r[0] + ' : ' + fmt(r[1], unit) + (tipSuffix || ''));
      wrap.appendChild(row);
    });
    fig.appendChild(wrap);
  }

  function arc(cx, cy, r, a0, a1) {
    var p0 = [cx + r * Math.sin(a0), cy - r * Math.cos(a0)];
    var p1 = [cx + r * Math.sin(a1), cy - r * Math.cos(a1)];
    var large = a1 - a0 > Math.PI ? 1 : 0;
    return 'M' + p0[0].toFixed(2) + ' ' + p0[1].toFixed(2) + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + p1[0].toFixed(2) + ' ' + p1[1].toFixed(2);
  }

  function donut(fig, rows, unit, center, tipSuffix) {
    var total = rows.reduce(function (s, r) { return s + r[1]; }, 0);
    var box = document.createElement('div');
    box.className = 'donut';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('class', 'donut-svg');
    svg.setAttribute('aria-hidden', 'false');
    var cx = 100, cy = 100, rad = 74, gap = 0.035, a = 0;
    rows.forEach(function (r) {
      var span = r[1] / total * Math.PI * 2;
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', arc(cx, cy, rad, a + gap / 2, a + span - gap / 2));
      p.setAttribute('class', 'donut-seg');
      p.setAttribute('stroke', r[2]);
      bindTip(p, r[0] + ' : ' + fmt(r[1], unit) + (tipSuffix || ''));
      svg.appendChild(p);
      a += span;
    });
    if (center) {
      var t1 = document.createElementNS(NS, 'text');
      t1.setAttribute('x', cx); t1.setAttribute('y', cy - 2);
      t1.setAttribute('class', 'donut-big');
      t1.textContent = center[0];
      var t2 = document.createElementNS(NS, 'text');
      t2.setAttribute('x', cx); t2.setAttribute('y', cy + 20);
      t2.setAttribute('class', 'donut-small');
      t2.textContent = center[1];
      svg.appendChild(t1); svg.appendChild(t2);
    }
    box.appendChild(svg);
    var legend = document.createElement('ul');
    legend.className = 'donut-legend';
    rows.forEach(function (r) {
      var li = document.createElement('li');
      var sw = document.createElement('span');
      sw.className = 'sw';
      sw.style.background = r[2];
      var name = document.createElement('span');
      name.className = 'lg-name';
      name.textContent = r[0];
      var v = document.createElement('span');
      v.className = 'lg-val';
      v.textContent = fmt(r[1], unit);
      li.appendChild(sw); li.appendChild(name); li.appendChild(v);
      legend.appendChild(li);
    });
    box.appendChild(legend);
    fig.appendChild(box);
  }

  [].forEach.call(document.querySelectorAll('figure.chart'), function (fig) {
    var rows = JSON.parse(fig.getAttribute('data-values'));
    var unit = fig.getAttribute('data-unit') || '';
    var tipSuffix = fig.getAttribute('data-tip') || '';
    var head = (fig.getAttribute('data-head') || 'Catégorie|Valeur').split('|');
    var cap = fig.querySelector('figcaption');
    if (fig.getAttribute('data-type') === 'donut') {
      var c = fig.getAttribute('data-center');
      donut(fig, rows, unit, c ? c.split('|') : null, tipSuffix);
    } else {
      bars(fig, rows, unit, tipSuffix);
    }
    if (cap) fig.appendChild(cap);
  });
})();

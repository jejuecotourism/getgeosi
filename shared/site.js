/* 모바일 메뉴와 일정 카드를 그립니다. 내용은 data/events.js에서 고칩니다. */
(function () {
  var btn = document.querySelector('.menu-btn');
  var menu = document.querySelector('.menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  }

  var root = document.documentElement.dataset.root || '';

  /* 진행 사업: 날짜 없이 소개만 보여 줍니다 */
  if (typeof PROJECTS !== 'undefined') {
    var box = document.getElementById('project-list');
    if (box) {
      var active = PROJECTS.filter(function (p) { return !p.draft; });
      var limit = Number(box.dataset.limit) || active.length;
      box.innerHTML = active.slice(0, limit).map(function (p) {
        var label = p.status === 'done' ? '마무리' : '진행 중';
        var open = p.url ? '<a class="card project" href="' + root + p.url + '">' : '<div class="card project">';
        var end = p.url ? '</a>' : '</div>';
        var thumb = p.thumb ? '<div class="project-thumb"><img src="' + root + p.thumb + '" alt="' + (p.alt || '') + '" loading="lazy"></div>' : '';
        var lock = p.locked ? '<span class="meta">🔒 비밀번호 필요</span>' : '';
        return open + thumb + '<span class="tag ' + (p.status === 'done' ? 'done' : 'open') + '">' + label + '</span>' +
          '<span class="meta">' + p.area + '</span><h3>' + p.title + '</h3><p class="meta">' + p.summary + '</p>' + lock + end;
      }).join('');
    }
  }

  if (typeof EVENTS === 'undefined') return;

  var DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  var today = new Date().toISOString().slice(0, 10);
  var list = EVENTS.filter(function (e) { return !e.draft; });

  function fmt(s) {
    var d = new Date(s + 'T00:00:00');
    return (d.getMonth() + 1) + '.' + String(d.getDate()).padStart(2, '0') + ' ' + DAYS[d.getDay()];
  }
  function whenText(e) {
    var y = e.start.slice(0, 4) + '. ';
    var t = e.start === e.end ? y + fmt(e.start) : y + fmt(e.start) + ' ~ ' + fmt(e.end);
    return e.time ? t + ' · ' + e.time : t;
  }
  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }
  function card(e) {
    var thumb = e.cover
      ? '<img src="' + root + e.cover + '" alt="" loading="lazy">'
      : '<span>사진 준비 중</span>';
    var rec = e.record ? '<span class="meta">기록 있음</span>' : '';
    return '<a class="card" href="' + root + e.url + '">' +
      '<div class="thumb">' + thumb + '</div>' +
      '<div class="body">' +
      '<span class="tag ' + e.status + '">' + STATUS_LABEL[e.status] + '</span>' +
      '<span class="when">' + whenText(e) + '</span>' +
      '<h3>' + esc(e.title) + '</h3>' +
      (e.note ? '<span class="meta">' + esc(e.note) + '</span>' : '') + rec +
      '</div></a>';
  }
  function isUpcoming(e) { return e.end >= today; }
  function byNear(a, b) { return a.start < b.start ? -1 : 1; }
  function byRecent(a, b) { return a.start < b.start ? 1 : -1; }

  /* 메인: 가까운 행사와 최근 행사 */
  var home = document.getElementById('home-events');
  if (home) {
    var next = list.filter(isUpcoming).sort(byNear).slice(0, 3);
    var past = list.filter(function (e) { return !isUpcoming(e); }).sort(byRecent).slice(0, 3 - Math.min(next.length, 2));
    home.innerHTML = next.concat(past).map(card).join('');
  }

  /* 행사 일정: 분류 버튼과 전체 카드 */
  var grid = document.getElementById('schedule-grid');
  if (grid) {
    var chips = document.getElementById('chips');
    var years = list.map(function (e) { return e.start.slice(0, 4); }).filter(function (y, i, a) { return a.indexOf(y) === i; });
    var filters = [
      { label: '전체', test: function () { return true; } },
      { label: '다가오는 행사', test: isUpcoming },
      { label: '지난 행사', test: function (e) { return !isUpcoming(e); } }
    ];
    if (years.length > 1) years.forEach(function (y) { filters.push({ label: y, test: function (e) { return e.start.slice(0, 4) === y; } }); });

    function draw(f) {
      var items = list.filter(f.test);
      var up = items.filter(isUpcoming).sort(byNear);
      var old = items.filter(function (e) { return !isUpcoming(e); }).sort(byRecent);
      var all = up.concat(old);
      grid.innerHTML = all.length ? all.map(card).join('') : '<p class="meta">해당하는 행사가 없습니다.</p>';
    }
    filters.forEach(function (f, i) {
      var b = document.createElement('button');
      b.className = 'chip';
      b.textContent = f.label;
      b.setAttribute('aria-pressed', i === 0);
      b.addEventListener('click', function () {
        chips.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        draw(f);
      });
      chips.appendChild(b);
    });
    draw(filters[0]);
  }
})();

/* 준비 기간 동안 화면을 가리는 안내 장치입니다. 공개할 때 각 페이지에서 이 스크립트를 빼면 됩니다.
   브라우저에서만 확인하므로 실제 보안 장치는 아닙니다. 민감한 자료를 이것으로 보호하면 안 됩니다. */
(function () {
  var KEY = 'jeco-preview-unlocked';
  var ok = false;
  try { ok = localStorage.getItem(KEY) === '1'; } catch (e) {}
  if (!ok) { try { ok = sessionStorage.getItem(KEY) === '1'; } catch (e) {} }
  if (ok) return;
  document.documentElement.style.display = 'none';
  var script = document.currentScript;
  var gate = new URL('../gate.html', script.src);
  gate.searchParams.set('next', location.pathname + location.search + location.hash);
  location.replace(gate.href);
})();

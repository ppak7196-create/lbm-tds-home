/* 홈 화면 연결 페이지: ?u=<웹앱 주소(키 포함)>&n=<이름>
   - 처음 열면 안내 화면 + 주소에 h=1 을 붙여 둠 (홈 화면에 추가되는 주소)
   - 홈 화면 아이콘으로 열면(h=1) 바로 웹앱으로 이동
   - 이 파일과 페이지에는 매장 키가 없음 (키는 각자 받은 주소에만 있음) */
(function () {
  var q = new URLSearchParams(location.search);
  var u = q.get('u') || '', n = q.get('n') || '';
  var ok = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(\?[^#]*)?$/.test(u);
  if (n) document.title = n;
  var home = q.get('h') === '1' || window.navigator.standalone === true;
  if (ok && home) { location.replace(u); return; }
  var m = document.getElementById('m');
  if (!ok) {
    m.innerHTML = '<h1>주소를 확인해 주세요</h1><p>본사에서 받은 <b>홈 화면 주소</b>를 그대로 열어야 합니다. 주소가 잘렸거나 바뀌었을 수 있습니다.</p>';
    return;
  }
  q.set('h', '1');
  history.replaceState(null, '', location.pathname + '?' + q.toString());
  var nm = n ? n.replace(/[<>&"]/g, '') : '';
  m.innerHTML =
    '<h1>홈 화면에 추가</h1>' +
    (nm ? '<p class="nm">' + nm + '</p>' : '') +
    '<p class="w">지금 이 화면에서 바로 추가하세요. 앱으로 넘어간 뒤 추가하면 로고 대신 글자 아이콘이 생깁니다.</p>' +
    '<ol><li>Safari 아래쪽 <b>공유</b> 버튼(네모에 위 화살표)</li>' +
    '<li><b>홈 화면에 추가</b></li>' +
    '<li>주소가 <b>github.io</b>로 시작하는지 · 이름 확인 → <b>추가</b></li></ol>' +
    '<p class="s">추가한 아이콘을 누르면 이 화면 없이 바로 열립니다.</p>' +
    '<p class="s"><a class="lk" href="' + u.replace(/"/g, '&quot;') + '" rel="noreferrer">추가하지 않고 이번만 열기</a></p>';
})();

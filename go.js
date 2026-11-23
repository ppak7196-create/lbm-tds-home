/* 홈 화면 연결 페이지: ?u=<웹앱 주소(키 포함)>&n=<이름>
   - 홈 화면 아이콘(웹 앱으로 열기)으로 실행된 경우에만 바로 웹앱으로 이동
   - 브라우저(Safari · 카카오톡 등)로 열면 안내 화면 → 여기서 홈 화면에 추가
   - 이 파일과 페이지에는 매장 키가 없음 (키는 각자 받은 주소에만 있음) */
(function () {
  var q = new URLSearchParams(location.search);
  var u = q.get('u') || '', n = q.get('n') || '';
  var ok = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(\?[^#]*)?$/.test(u);
  if (n) document.title = n;
  var app = window.navigator.standalone === true || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  if (ok && app) { location.replace(u); return; }
  if (q.has('h')) { q.delete('h'); history.replaceState(null, '', location.pathname + '?' + q.toString()); }
  var m = document.getElementById('m');
  if (!ok) {
    m.innerHTML = '<h1>주소를 확인해 주세요</h1><p>본사에서 받은 <b>홈 화면 주소</b>를 그대로 열어야 합니다. 주소가 잘렸거나 바뀌었을 수 있습니다.</p>';
    return;
  }
  var ua = navigator.userAgent || '', inApp = /KAKAOTALK|NAVER\(inapp|Instagram|FBAN|FBAV|Line\/|DaumApps/i.test(ua);
  var ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1); /* iPad Safari는 Mac으로 표시됨 */
  var sam = /SamsungBrowser/i.test(ua), nm = n ? n.replace(/[<>&"]/g, '') : '';
  var S_IOS = '<ol><li>Safari 아래쪽 <b>공유</b> 버튼(네모에 위 화살표)</li><li><b>홈 화면에 추가</b></li>' +
      '<li>주소가 <b>github.io</b>로 시작하는지 · 이름 확인 · <b>웹 앱으로 열기 켜기</b> → <b>추가</b></li></ol>';
  var S_CHR = '<ol><li>Chrome 오른쪽 위 <b>⋮</b> 메뉴</li><li><b>홈 화면에 추가</b> (또는 <b>앱 설치</b>)</li><li>이름 확인 → <b>추가</b></li></ol>';
  var S_SAM = '<ol><li>삼성 인터넷 아래쪽 <b>≡</b> 메뉴</li><li><b>현재 페이지 추가</b> → <b>홈 화면</b></li><li>이름 확인 → <b>추가</b></li></ol>';
  var other = '<details class="ot"><summary>다른 기종 안내 보기</summary>' +
      '<p class="ot-h">아이폰 · 아이패드 (Safari)</p>' + S_IOS + '<p class="ot-h">갤럭시 · 안드로이드 (Chrome)</p>' + S_CHR +
      '<p class="ot-h">갤럭시 (삼성 인터넷)</p>' + S_SAM +
      '<p class="ot-h">카카오톡 안에서 열렸을 때</p><ol><li>아이폰: 오른쪽 아래 <b>공유</b> → <b>Safari로 열기</b></li><li>갤럭시: 오른쪽 위 <b>⋮</b> → <b>다른 브라우저로 열기</b></li></ol></details>';
  var lk = '<p class="s"><a class="lk" href="' + u.replace(/"/g, '&quot;') + '" rel="noreferrer">추가하지 않고 이번만 열기</a></p>';
  if (inApp) {
    m.innerHTML = '<h1>' + (ios ? 'Safari로' : 'Chrome으로') + ' 열어 주세요</h1>' + (nm ? '<p class="nm">' + nm + '</p>' : '') +
      '<p class="w">카카오톡 등 앱 안의 화면에서는 홈 화면에 추가할 수 없습니다.</p>' +
      (ios ? '<ol><li>오른쪽 아래 <b>공유</b>(네모에 위 화살표) 또는 <b>⋯</b> 버튼</li><li><b>Safari로 열기</b></li>'
        : '<ol><li>오른쪽 위 <b>⋮</b> 버튼</li><li><b>다른 브라우저로 열기</b> → <b>Chrome</b></li>') +
      '<li>열린 화면에서 다시 이 안내를 따라 추가</li></ol>' + other + lk;
    return;
  }
  m.innerHTML =
    '<h1>홈 화면에 추가</h1>' + (nm ? '<p class="nm">' + nm + '</p>' : '') +
    '<p class="w">지금 이 화면에서 바로 추가하세요. 앱으로 넘어간 뒤 추가하면 로고 대신 글자 아이콘이 생깁니다.</p>' +
    (ios ? S_IOS : sam ? S_SAM : S_CHR) +
    '<p class="s">추가한 아이콘을 누르면 이 화면 없이 바로 열립니다.</p>' + other + lk;
})();

/* 공유 시트 — index.html(히어로·카드)·program.html(상세) 공용
   openShare({url, title, text, img})
   - 2026-09-16 운영처 요청: 카카오톡 · 페이스북 · 인스타그램 · 링크 복사 4개만, 각 서비스 고유 아이콘 사용
   - 페이스북: 공유 URL로 새 창 / 카카오톡·인스타그램: 웹 공유 URL 없음 → 기기 공유(navigator.share) + 링크 복사 */
(function(){
  const css=`
  .shs-bg{position:fixed;inset:0;z-index:3000;background:rgba(20,16,12,.55);display:none;align-items:flex-end;justify-content:center}
  .shs-bg.open{display:flex}
  .shs{background:#FFFDF8;color:#2A2320;width:100%;max-width:560px;border-radius:22px 22px 0 0;padding:16px 18px 24px;box-shadow:0 -10px 40px rgba(0,0,0,.25);animation:shsUp .22s ease-out}
  @media(min-width:700px){.shs-bg{align-items:center}.shs{border-radius:22px;padding-bottom:20px}}
  @keyframes shsUp{from{transform:translateY(24px);opacity:0}to{transform:none;opacity:1}}
  .shs-h{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:6px}
  .shs-t{font-weight:700;font-size:1rem;line-height:1.3}
  .shs-x{border:0;background:#F0E7D6;width:36px;height:36px;border-radius:50%;font-size:1.2rem;cursor:pointer;flex:none}
  .shs-sub{font-size:.82rem;color:#8B7E70;margin-bottom:12px;word-break:break-all}
  .shs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px 6px;max-width:360px;margin:0 auto}
  
  .shs-b{display:flex;flex-direction:column;align-items:center;gap:6px;border:0;background:transparent;cursor:pointer;padding:6px 2px;border-radius:12px;color:#2A2320;text-decoration:none;font:inherit}
  .shs-b:hover{background:#F7F2E8}
  .shs-i{width:52px;height:52px;border-radius:16px;display:grid;place-items:center;color:#fff}
  .shs-b span{font-size:.74rem;font-weight:600;line-height:1.2;text-align:center}
  .shs-sec{margin:14px 0 6px;font-size:.78rem;font-weight:700;color:#5E5248}
  .shs-note{font-size:.76rem;color:#8B7E70;margin-top:10px;line-height:1.5}
  .shs-toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%);background:#1E3F27;color:#fff;padding:.6em 1.1em;border-radius:999px;font-size:.88rem;z-index:3100;opacity:0;transition:opacity .2s;pointer-events:none}
  .shs-toast.on{opacity:1}
  body.shs-lock{overflow:hidden}`;
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  const bg=document.createElement('div');bg.className='shs-bg';bg.setAttribute('role','dialog');bg.setAttribute('aria-modal','true');bg.setAttribute('aria-label','공유하기');
  document.body.appendChild(bg);
  const toast=document.createElement('div');toast.className='shs-toast';document.body.appendChild(toast);
  let tt;function say(m){toast.textContent=m;toast.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('on'),1800);}
  function close(){bg.classList.remove('open');document.body.classList.remove('shs-lock');bg.innerHTML='';}
  bg.addEventListener('click',e=>{if(e.target===bg)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&bg.classList.contains('open'))close();});

  async function copy(text){
    try{await navigator.clipboard.writeText(text);say('링크를 복사했습니다');return true;}catch(e){}
    try{const ta=document.createElement('textarea');ta.value=text;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;top:0;left:0;opacity:0';document.body.appendChild(ta);ta.select();ta.setSelectionRange(0,99999);const ok=document.execCommand('copy');ta.remove();if(ok){say('링크를 복사했습니다');return true;}}catch(e){}
    try{prompt('아래 링크를 길게 눌러 복사하세요',text);}catch(e){say('링크: '+text);}
    return false;
  }
  function pop(u){window.open(u,'_blank','noopener,width=640,height=720');}

  window.openShare=function(o){
    const url=o.url,title=o.title||document.title,text=o.text||'';
    const enc=encodeURIComponent, msg=`${title} — 2026생태관광주간 · 제주`;
    const canNative=!!navigator.share;
    const ICON={
      kakao:'<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path fill="#3C1E1E" d="M12 3C6.9 3 2.8 6.3 2.8 10.3c0 2.6 1.7 4.8 4.3 6.1-.2.7-.7 2.5-.8 2.9-.1.5.2.5.4.4.2-.1 2.7-1.8 3.8-2.6.5.1 1 .1 1.5.1 5.1 0 9.2-3.3 9.2-7.3S17.1 3 12 3z"/></svg>',
      fb:'<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path fill="#fff" d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3 0-1.3-.1-2.45-.1-2.4 0-4.05 1.5-4.05 4.2v2.2H7.5V13h2.7v8h3.3z"/></svg>',
      ig:'<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><g fill="none" stroke="#fff" stroke-width="1.9"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2"/><circle cx="12" cy="12" r="4.1"/></g><circle cx="17" cy="7" r="1.25" fill="#fff"/></svg>',
      link:'<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><g fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round"><path d="M10.2 13.8a3.6 3.6 0 0 0 5.1 0l2.8-2.8a3.6 3.6 0 0 0-5.1-5.1l-1.3 1.3"/><path d="M13.8 10.2a3.6 3.6 0 0 0-5.1 0l-2.8 2.8a3.6 3.6 0 0 0 5.1 5.1l1.3-1.3"/></g></svg>'};
    const items=[
      {k:'kakao',bg:'#FEE500',ic:ICON.kakao,l:'카카오톡'},
      {k:'fb',bg:'#1877F2',ic:ICON.fb,l:'페이스북'},
      {k:'ig',bg:'linear-gradient(45deg,#F9CE34,#EE2A7B,#6228D7)',ic:ICON.ig,l:'인스타그램'},
      {k:'copy',bg:'#5E5248',ic:ICON.link,l:'링크 복사'},
    ];
    bg.innerHTML=`<div class="shs">
      <div class="shs-h"><div class="shs-t">공유하기</div><button class="shs-x" type="button" aria-label="닫기">×</button></div>
      <div class="shs-sub">${title}<br>${url}</div>
      <div class="shs-grid">${items.map(i=>`<button class="shs-b" type="button" data-k="${i.k}"><span class="shs-i" style="background:${i.bg};${i.fg?'color:'+i.fg:''}">${i.ic}</span><span>${i.l}</span></button>`).join('')}</div>
      <p class="shs-note">카카오톡·인스타그램은 웹에서 링크를 바로 넘길 수 없습니다. 버튼을 누르면 링크가 복사되니(모바일은 기기 공유창) 앱에서 대화·게시글·스토리에 붙여 넣으세요.</p>
    </div>`;
    bg.classList.add('open');document.body.classList.add('shs-lock');
    bg.querySelector('.shs-x').onclick=close;
    bg.querySelectorAll('.shs-b').forEach(b=>b.onclick=async()=>{
      const k=b.dataset.k;
      if(k==='native'){try{await navigator.share({title:msg,text:text,url:url});close();return;}catch(e){if(e.name==='AbortError')return;}await copy(url);return;}
      if(k==='fb'){pop(`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`);return;}
      if(k==='copy'){await copy(url);return;}
      // kakao / ig : 링크 전달 API 없음 → 모바일은 기기 공유, 아니면 링크 복사
      if(navigator.share){try{await navigator.share({title:msg,text:text,url:url});close();return;}catch(e){if(e.name==='AbortError')return;}}
      await copy(url);
      const app={kakao:'카카오톡',ig:'인스타그램'}[k];
      say(`링크를 복사했습니다 · ${app} 앱에 붙여 넣으세요`);
    });
  };
})();

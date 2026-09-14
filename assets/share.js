/* 공유 시트 — index.html(히어로·카드)·program.html(상세) 공용
   openShare({url, title, text, img})
   - 페이스북 / X / 스레드 / 네이버 밴드 / 텔레그램 / 라인: 공유 URL로 새 창
   - 카카오톡·인스타그램·틱톡·유튜브: 웹 공유 URL이 없음 → 기기 공유(navigator.share) + 링크 복사 + 대표 이미지 저장으로 안내 */
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
  .shs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px 6px}
  @media(max-width:380px){.shs-grid{grid-template-columns:repeat(3,1fr)}}
  .shs-b{display:flex;flex-direction:column;align-items:center;gap:6px;border:0;background:transparent;cursor:pointer;padding:6px 2px;border-radius:12px;color:#2A2320;text-decoration:none;font:inherit}
  .shs-b:hover{background:#F7F2E8}
  .shs-i{width:50px;height:50px;border-radius:16px;display:grid;place-items:center;color:#fff;font-weight:800;font-size:1.05rem;letter-spacing:-.02em}
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
    const url=o.url,title=o.title||document.title,text=o.text||'',img=o.img||'';
    const enc=encodeURIComponent, msg=`${title} — 2026생태관광주간 · 제주`;
    const canNative=!!navigator.share;
    const items=[
      canNative?{k:'native',bg:'linear-gradient(135deg,#2F5E3A,#6B8F5A)',ic:'⇪',l:'카카오톡·문자 등<br>기기 공유'}:null,
      {k:'kakao',bg:'#FEE500',fg:'#3C1E1E',ic:'톡',l:'카카오톡'},
      {k:'fb',bg:'#1877F2',ic:'f',l:'페이스북'},
      {k:'ig',bg:'linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)',ic:'◎',l:'인스타그램'},
      {k:'th',bg:'#000',ic:'@',l:'스레드'},
      {k:'x',bg:'#111',ic:'X',l:'X(트위터)'},
      {k:'yt',bg:'#FF0000',ic:'▶',l:'유튜브'},
      {k:'tt',bg:'#010101',ic:'♪',l:'틱톡'},
      {k:'band',bg:'#21C531',ic:'B',l:'네이버 밴드'},
      {k:'line',bg:'#06C755',ic:'L',l:'라인'},
      {k:'tg',bg:'#26A5E4',ic:'✈',l:'텔레그램'},
      {k:'copy',bg:'#8B7E70',ic:'🔗',l:'링크 복사'},
      img?{k:'img',bg:'#B5763E',ic:'⤓',l:'대표 이미지<br>저장'}:null,
    ].filter(Boolean);
    bg.innerHTML=`<div class="shs">
      <div class="shs-h"><div class="shs-t">공유하기</div><button class="shs-x" type="button" aria-label="닫기">×</button></div>
      <div class="shs-sub">${title}<br>${url}</div>
      <div class="shs-grid">${items.map(i=>`<button class="shs-b" type="button" data-k="${i.k}"><span class="shs-i" style="background:${i.bg};${i.fg?'color:'+i.fg:''}">${i.ic}</span><span>${i.l}</span></button>`).join('')}</div>
      <p class="shs-note">인스타그램·유튜브·틱톡·카카오톡은 웹에서 링크를 바로 넘길 수 없습니다. 버튼을 누르면 링크가 복사되니(모바일은 기기 공유창) 앱에서 게시글·스토리·댓글에 붙여 넣으세요. 대표 이미지는 저장해 함께 올리면 좋습니다.</p>
    </div>`;
    bg.classList.add('open');document.body.classList.add('shs-lock');
    bg.querySelector('.shs-x').onclick=close;
    bg.querySelectorAll('.shs-b').forEach(b=>b.onclick=async()=>{
      const k=b.dataset.k;
      if(k==='native'){try{await navigator.share({title:msg,text:text,url:url});close();return;}catch(e){if(e.name==='AbortError')return;}await copy(url);return;}
      if(k==='fb'){pop(`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`);return;}
      if(k==='x'){pop(`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(msg)}`);return;}
      if(k==='th'){pop(`https://www.threads.net/intent/post?text=${enc(msg+'\n'+url)}`);return;}
      if(k==='band'){pop(`https://band.us/plugin/share?body=${enc(msg)}&route=${enc(url)}`);return;}
      if(k==='line'){pop(`https://social-plugins.line.me/lineit/share?url=${enc(url)}&text=${enc(msg)}`);return;}
      if(k==='tg'){pop(`https://t.me/share/url?url=${enc(url)}&text=${enc(msg)}`);return;}
      if(k==='copy'){await copy(url);return;}
      if(k==='img'){const a=document.createElement('a');a.href=img;a.download=(title.replace(/[\\/:*?"<>|]/g,'')||'image')+'.jpg';document.body.appendChild(a);a.click();a.remove();say('이미지를 저장합니다');return;}
      // kakao / ig / yt / tt : 링크 전달 API 없음 → 모바일은 기기 공유, 아니면 링크 복사
      if(navigator.share){try{await navigator.share({title:msg,text:text,url:url});close();return;}catch(e){if(e.name==='AbortError')return;}}
      await copy(url);
      const app={kakao:'카카오톡',ig:'인스타그램',yt:'유튜브',tt:'틱톡'}[k];
      say(`링크를 복사했습니다 · ${app} 앱에 붙여 넣으세요`);
    });
  };
})();

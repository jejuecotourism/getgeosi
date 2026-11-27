/* 행사 일정 목록. 진행 날짜가 정해진 행사만 넣습니다. 업무는 data/projects.js에 넣습니다.
   메인과 행사 일정 카드가 이 파일을 읽습니다.
   새 일정은 아래 한 덩어리를 복사해 맨 위에 붙이고 값을 고치면 됩니다.

   id     : 영문 이름. 주소가 되므로 한 번 정하면 바꾸지 않습니다.
   start, end : YYYY-MM-DD
   time   : 시간 (없으면 "")
   status : upcoming 예정 | open 모집 중 | closed 모집 완료 | done 종료
   cover  : 사진 주소 (없으면 "")
   url    : 일정 안내 페이지 주소
   record : 일정 기록 페이지 주소 (없으면 "")
   note   : 카드에 나오는 짧은 설명
   draft  : true면 사이트에 나오지 않습니다 (공개 전 일정)
   owner  : 주최. 협회 | 센터 | 외주 | 미정, 주최가 여럿이면 ["협회","센터"]처럼 모두 적습니다 (관리자 페이지에만 표시)
   ownerNote : 주최 근거를 짧게
   survey : 만족도 조사 양식 이름. 넣으면 관리자 만족도 조사 탭에서 이 행사를 눌러 응답을 봅니다 (없으면 생략) */
const EVENTS = [
  { id:"2026-workshop", title:"2026 생태관광 합동워크숍", start:"2026-12-11", end:"2026-12-11", time:"16:00 시작(등록 15:00~16:00)",
    status:"upcoming", cover:"", url:"", record:"", note:"", draft:true, owner:"센터", ownerNote:"센터 사업" },

  { id:"2026-birding", title:"오고 생이 제주로 탐조대회", start:"2026-11-14", end:"2026-11-14", time:"09:00~16:00",
    status:"done", cover:"events/2026-birding/cover.jpg", url:"events/2026-birding/", record:"events/2026-birding/record/", note:"새를 따라, 습지를 만나다", survey:"birding2026-survey", owner:"협회", ownerNote:"행사 페이지 주최" },

  { id:"2026-autumn", title:"2026 가을 생태관광주간", start:"2026-10-03", end:"2026-10-09", time:"",
    status:"done", cover:"assets/img/p13.jpg", url:"events/2026-autumn/", record:"records.html", note:"프로그램 27개", owner:["협회","센터"], ownerNote:"행사 페이지 주최: 협회·센터" },

  { id:"2026-summer", title:"제3회 갯것이영화제 × 2026 생태관광주간", start:"2026-08-08", end:"2026-08-15", time:"",
    status:"done", cover:"assets/img/eco_05_dolphin.jpg", url:"events/2026-summer/", record:"", note:"바다를 보고 느끼는 8일", owner:"센터", ownerNote:"주최 센터, 주관 협회" }
];

const STATUS_LABEL = { upcoming:"예정", open:"모집 중", closed:"모집 완료", done:"종료" };

/* 기록 카드 목록. '기록' 페이지(records.html)가 이 목록을 그리고, 관리자 '카드 공개' 탭이 이 목록을 읽습니다.
   새 기록은 같은 묶음(group)의 맨 위, 새 묶음이면 목록 맨 위에 넣습니다. 화면 순서 = 이 목록 순서입니다.

   rec    : 영문 이름. "rec-"로 시작하고 한 번 정하면 바꾸지 않습니다 (관리자가 카드를 찾는 열쇠)
   group  : 기록 페이지의 묶음 제목
   url    : 카드 전체를 눌렀을 때 열 페이지 (없으면 "")
   more   : url이 있을 때 카드 아래 첫 버튼 글자
   links  : 추가 버튼 [{ label:"버튼 글자", url:"주소" }] — url과 함께 쓰면 카드는 url로, 버튼은 각 주소로 열립니다
   prog   : 가을 생태관광주간 프로그램 id 목록 (program.html 상세 페이지에 이 카드의 영상·사진첩 버튼이 붙습니다)
   thumb, alt : 카드 사진과 설명
   tag, title, meta : 분류, 제목, 설명 줄들
   locked : true면 카드에 '비밀번호 필요'를 표시합니다 (페이지 잠금 자체는 관리자 '페이지 공개·비밀번호' 탭에서)
   draft  : true면 기록 페이지에 나오지 않습니다
   owner, ownerNote : 주최 (관리자 페이지에만 표시) */
const RECORDS = [
  { rec:"rec-2026-jeonbuk-exchange", group:"2026 기관 방문·교류", url:"events/2026-11-jeonbuk-exchange/record/", thumb:"events/2026-11-jeonbuk-exchange/record/cover.jpg", alt:"운곡 람사르습지 표지석 앞에서 찍은 교류방문단 사진", tag:"교류 · 협력", title:"갯벌과 습지에서 배운 운영 — 전북 생태관광 교류방문(고창)", meta:["2026. 11. 26.", "세계자연유산 고창갯벌과 국가생태관광지역 고창 운곡람사르습지에서 해설 탐방과 마을과 함께하는 운영을 살펴본 교류방문 기록"], more:"▶ 기록과 영상 보기", owner:"센터", ownerNote:"센터 국내 교류 사업(2026 전북 생태관광 교류방문 계획안)" },
  { rec:"rec-2026-advisory-meeting", group:"2026 자문단 회의", url:"events/2026-11-advisory-meeting/record/", thumb:"events/2026-11-advisory-meeting/record/cover.jpg", alt:"2026 하반기 생태관광 자문단 회의 단체 사진", tag:"자문 · 협력", title:"한 해를 돌아보고 내년을 묻다 — 2026 하반기 생태관광 자문단 회의", meta:["2026. 11. 20.", "생태관광지역 마을 대표·실무자 자문단과 올해 센터 사업, 시범 프로그램 평가, 내년 방향을 나눈 회의 기록"], more:"▶ 회의 기록과 영상 보기", owner:"센터", ownerNote:"센터 자문단 운영" },
  { rec:"rec-2026-gangwon-visit", group:"2026 기관 방문·교류", url:"events/2026-11-gangwon-visit/record/", thumb:"events/2026-11-gangwon-visit/record/cover.jpg", alt:"강원도생태관광협의회 제주 방문 간담회 단체 사진", tag:"교류 · 협력", title:"강원과 제주, 생태관광을 나누다 — 강원도생태관광협의회 제주 방문 간담회", meta:["2026. 11. 17.", "강원 생태관광지역 협의회 관계자들과 제주 생태관광 정책·센터 운영을 나눈 간담회 기록"], more:"▶ 기록과 사진 보기" },

  { rec:"rec-2026-birding", group:"2026 오조리 탐조대회", url:"events/2026-birding/record/", thumb:"events/2026-birding/record/cover.jpg", alt:"빗속에서 새를 만나다 — 2026 오조리 탐조대회", tag:"습지 · 탐조", title:"빗속에서 새를 만나다 — 2026 오조리 탐조대회 「오고 생이 제주로」", meta:["2026. 11. 14.", "하루 종일 비가 내린 11월 14일, 35개 팀 79명이 신청한 가족 탐조대회의 기록"], more:"▶ 영상과 기록 보기", owner:"협회", ownerNote:"행사 주최를 따름" },

  { rec:"rec-2026-marine-exhibition", group:"2026 해양생물 모니터링", url:"events/2026-11-marine-exhibition/record/", thumb:"events/2026-11-marine-exhibition/record/cover.jpg", alt:"교육청 로비에 설치한 「오조리의 해양생물」 현수막과 생물 사진 판넬", tag:"바다 · 연안습지", title:"오조리의 해양생물 — 해양생물 청소년 모니터링 결과 발표 전시", meta:["2026. 11. 2. ~ 11. 13.", "성산고등학교 학생들이 오조리 연안습지에서 만난 141종을 제주특별자치도교육청에서 소개한 전시 기록"], more:"▶ 전시 기록과 사진 보기", links:[{ label:"해양생물 모니터링 사업", url:"projects/marine-monitoring/" }], owner:"협회", ownerNote:"행사 주최를 따름" },

  { rec:"rec-2026-stonepark-forum", group:"2026 포럼·세미나 참여", url:"events/2026-11-stonepark/record/", thumb:"events/2026-11-stonepark/record/cover.jpg", alt:"2026 제주국제생태포럼에서 발표하는 고제량 협회장", tag:"포럼 · 생태관광", title:"생태관광으로 말하는 제주 자연과 인간의 미래 — 2026 제주국제생태포럼 고제량 협회장 발표", meta:["2026. 11. 6.", "제주돌문화공원 설문대할망전시관 「제주 전문가 네트워크」 세션에서 고제량 협회장이 발표하고 토론한 내용과 현장 사진"], more:"▶ 발표 기록과 영상 보기", owner:"협회", ownerNote:"협회장 발표 참여" },

  { rec:"rec-9a0a9d467758", group:"2026 가을 생태관광주간", url:"program.html?id=p21", more:"행사 내용 보기", prog:["p21","p22"], thumb:"record/g/9a0a9d467758/cover.jpg", alt:"", tag:"오름 · 바다", title:"숨, 평대", meta:["바다를 품은 순비기 향낭 · 평대의 향을 담은 AROMATIC THERAPY INHALER", "평대 돝오름 ~ 평대리생태체험장 · 구좌읍 평대리"], links:[{ label:"순비기 향낭 내용", url:"program.html?id=p22" }, { label:"▶ 기록 영상", url:"https://www.youtube.com/watch?v=xWmK9Opii3w" }, { label:"사진첩 열기", url:"record/g/9a0a9d467758/" }], owner:["협회","센터"], ownerNote:"행사 주최를 따름" },

  { rec:"rec-409184708a11", group:"2026 가을 생태관광주간", url:"program.html?id=p13", more:"행사 내용 보기", prog:["p13"], thumb:"record/g/409184708a11/cover.jpg", alt:"", tag:"곶자왈", title:"빛이 숲을 떠나는 시간", meta:["해 질 녘 저지곶자왈", "저지곶자왈 · 한경면 저지리"], links:[{ label:"▶ 기록 영상", url:"https://www.youtube.com/watch?v=Na_Yx3Be0CY" }, { label:"사진첩 열기", url:"record/g/409184708a11/" }], owner:["협회","센터"], ownerNote:"행사 주최를 따름" },

  { rec:"rec-c211db604c81", group:"2026 가을 생태관광주간", url:"program.html?id=p24", more:"행사 내용 보기", prog:["p24","p25"], thumb:"record/g/c211db604c81/cover.jpg", alt:"", tag:"숲길", title:"다시, 대나무 · 미로숲길에서 쉬멍, 맛있게 차롱", meta:["오영희 장인의 호근", "호근동 마을회관 · 하논 · 서귀포 치유의숲"], links:[{ label:"차롱 내용", url:"program.html?id=p25" }, { label:"▶ 기록 영상", url:"https://www.youtube.com/watch?v=gg6-9TWov0g" }, { label:"사진첩 열기", url:"record/g/c211db604c81/" }], owner:["협회","센터"], ownerNote:"행사 주최를 따름" },

  { rec:"rec-4fee7759275a", group:"2026 가을 생태관광주간", url:"program.html?id=p17", more:"행사 내용 보기", prog:["p17"], thumb:"record/g/4fee7759275a/cover.jpg", alt:"", tag:"오름", title:"하례리 보물찾기", meta:["고살리숲 — 밧줄놀이 · 숲속 보물찾기", "고살리숲 · 남원읍 하례리"], links:[{ label:"▶ 기록 영상", url:"https://www.youtube.com/watch?v=RWKi5WYQKMY" }, { label:"사진첩 열기", url:"record/g/4fee7759275a/" }], owner:["협회","센터"], ownerNote:"행사 주최를 따름" },

  { rec:"rec-204c499ab3c1", group:"2026 가을 생태관광주간", url:"program.html?id=p04", more:"행사 내용 보기", prog:["p04"], thumb:"record/g/204c499ab3c1/cover.jpg", alt:"", tag:"습지", title:"동백동산 오감찾기 프로젝트", meta:["손으로 · 코로 · 귀로 · 눈으로 만나는 람사르습지 곶자왈", "동백동산 · 조천읍 선흘리"], links:[{ label:"▶ 기록 영상", url:"https://www.youtube.com/watch?v=av0_Fx_sPo8" }, { label:"사진첩 열기", url:"record/g/204c499ab3c1/" }], owner:["협회","센터"], ownerNote:"행사 주최를 따름" },

  { rec:"rec-fbc0f4da890a", group:"2026 가을 생태관광주간", url:"program.html?id=p03", more:"행사 내용 보기", prog:["p03"], thumb:"record/g/fbc0f4da890a/cover.jpg", alt:"", tag:"습지", title:"동백동산 기후탐사대", meta:["탄소 보물 3개를 찾아서 — 흙 · 나무 · 습지", "동백동산 · 조천읍 선흘리"], links:[{ label:"▶ 기록 영상", url:"https://www.youtube.com/watch?v=tAy1ASz-xGc" }, { label:"사진첩 열기", url:"record/g/fbc0f4da890a/" }], owner:["협회","센터"], ownerNote:"행사 주최를 따름" },

  { rec:"rec-8a4215c03b89", group:"2026 가을 생태관광주간", url:"program.html?id=p14", more:"행사 내용 보기", prog:["p14"], thumb:"record/g/8a4215c03b89/cover.jpg", alt:"", tag:"곶자왈", title:"화순곶자왈 사운드워킹", meta:["헤드셋을 쓰고, 숲의 소리를 따라 걷기 · ㈜더사운드벙커", "화순곶자왈 생태탐방숲길 · 안덕면 화순리"], links:[{ label:"▶ 기록 영상", url:"https://www.youtube.com/watch?v=Gi_NvWsjuMM" }, { label:"사진첩 열기", url:"record/g/8a4215c03b89/" }], owner:["협회","센터"], ownerNote:"행사 주최를 따름" },

  { rec:"rec-e24c4735beb9", group:"2026 가을 생태관광주간", url:"program.html?id=p19", more:"행사 내용 보기", prog:["p19"], thumb:"record/g/e24c4735beb9/cover.jpg", alt:"", tag:"곶자왈", title:"이성권과 함께하는 제주나무이야기", meta:["동백동산 곶자왈과 습지의 나무 이야기 · (주)평화여행자", "동백동산습지센터 · 조천읍 선흘리"], links:[{ label:"▶ 기록 영상", url:"https://www.youtube.com/watch?v=I6uVG54iCM8" }, { label:"사진첩 열기", url:"record/g/e24c4735beb9/" }], owner:["협회","센터"], ownerNote:"행사 주최를 따름" },

  { rec:"rec-99c67bbf7af8", group:"2026 가을 생태관광주간", url:"program.html?id=p26", more:"행사 내용 보기", prog:["p26"], thumb:"record/g/99c67bbf7af8/cover.jpg", alt:"", tag:"숲길", title:"미로숲놀이터 자연놀이 네트플레이", meta:["나무 사이 오색 그물에서 놀다 · 호근동생태관광마을협의체 · 트리아이", "미로숲길 미로숲놀이터 · 서귀포 호근동"], links:[{ label:"▶ 기록 영상", url:"https://www.youtube.com/watch?v=07dIm0ToziQ" }, { label:"사진첩 열기", url:"record/g/99c67bbf7af8/" }], owner:["협회","센터"], ownerNote:"행사 주최를 따름" }
];

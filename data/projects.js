/* 진행 중인 사업(업무) 목록. '진행 사업' 탭과 메인이 이 파일을 읽습니다.
   마무리 일자나 내부 일정은 적지 않고, 어떤 사업인지 소개만 합니다.

   title   : 사업 이름
   area    : 하는 일 분류 (생태관광 프로그램, 마을과 주민, 교육과 사람, 조사와 연구, 알림과 협력)
   summary : 한두 문장 소개
   status  : ongoing 진행 중 | done 마무리
   url     : 더 볼 페이지 주소 (없으면 "")
   thumb   : 카드 사진 주소. 새 카드에는 반드시 넣습니다
   alt     : 카드 사진 설명
   locked  : true면 카드에 '비밀번호 필요'를 표시합니다
   links   : 카드 안에 버튼 여러 개를 넣을 때 [{ label:"버튼 글자", url:"주소" }] (이때 url은 "")
   draft   : true면 사이트에 나오지 않습니다 (공개 전 사업)
   owner   : 주최. 협회 | 센터 | 외주 | 미정, 주최가 여럿이면 ["협회","센터"]처럼 모두 적습니다 (관리자 페이지에만 표시)
   ownerNote : 주최 근거를 짧게 */
const PROJECTS = [
  { title:"전북 생태관광 교류방문", area:"알림과 협력",
    summary:"고창 갯벌·운곡습지 현장과 전북생태관광육성지원센터를 찾아 운영 사례를 배우고, 두 광역 센터의 협력 방안을 함께 찾습니다(11월 26~27일).",
    status:"ongoing", url:"projects/jeonbuk-exchange-2026/",
    thumb:"projects/jeonbuk-exchange-2026/thumb.jpg", alt:"고창갯벌의 갯벌과 염생식물 군락(국가유산청 사진, 공공누리 제1유형)", owner:"센터", ownerNote:"센터 국내 교류 사업(2026 전북 생태관광 교류방문 계획안)" },

  { title:"2026 생태관광 합동워크숍 「생태관광인의 날」", area:"알림과 협력",
    summary:"한 해를 마무리하며 제주 생태관광 마을, 사업자, 전문가, 행정이 동백동산 에코촌에 모여 올해의 사례를 나누고 내년을 이야기합니다(12월 11일).",
    status:"ongoing", url:"projects/joint-workshop-2026/",
    thumb:"projects/joint-workshop-2026/thumb.jpg", alt:"행사장 가까이 동백동산 습지의 물웅덩이와 숲(CC0 사진)", owner:"센터", ownerNote:"센터 고정 사업, 후원 (사)제주생태관광협회" },

  { title:"수산2리 생태관광 대표 캐릭터 기획안", area:"마을과 주민",
    summary:"수산2리 벌라릿굴에서 겨울을 나는 긴가락박쥐와 관박쥐를 한 쌍의 캐릭터 '라리'와 '울렝이'로 만드는 기획입니다. 제주자연생태공원과 수산2리 마을의 요청으로 준비하고 있습니다.",
    status:"ongoing", url:"projects/susan2-bat-character/",
    thumb:"assets/projects/susan2_bat_character_thumbnail.jpg", alt:"벌라릿굴 동굴 입구 앞에 마주 선 박쥐 캐릭터 두 마리(기획 단계 AI 시안)", locked:true, owner:"미정", ownerNote:"제주자연생태공원과 수산2리 마을 요청. 사업 명의 확인 필요" },

  { title:"오조리 마을 해설 자료 제작", area:"마을과 주민",
    summary:"오조리 어르신들이 들려주는 옛 바다 이야기를 기록해 마을 해설 자료로 만듭니다.",
    status:"ongoing", url:"",
    links:[ { label:"기획안 보기", url:"projects/ozori-book-plan/" }, { label:"채록 검수 보기", url:"projects/ozori-review/" } ],
    thumb:"assets/projects/ozori_pogu_thumbnail.jpg", alt:"오조리 내해에서 떼배에 앉아 있는 사람을 찍은 흑백 옛 사진", locked:true, owner:"협회", ownerNote:"해양보호구역 사업, 협회 명의" },

  { title:"해양생물 모니터링", area:"조사와 연구",
    summary:"성산고등학교 학생들이 전문가와 함께 오조리 연안습지보호지역의 해양생물을 조사해 141종을 기록하고, 그 결과를 전시 「오조리의 해양생물」로 나누었습니다.",
    status:"done", url:"projects/marine-monitoring/",
    thumb:"projects/marine-monitoring/thumb.jpg", alt:"현수막 「오조리의 해양생물」 — 오조리 연안습지 지도 위에 141종을 소개한 그림",
    owner:"협회", ownerNote:"2026 해양보호구역 인식증진 교육 및 홍보사업, (사)제주생태관광협회 보조사업(교부신청 2026-06-19)" },

  { title:"곶자왈·오름 특화사업", area:"생태관광 프로그램",
    summary:"곶자왈과 오름을 중심으로 생태관광을 키우는 사업입니다.",
    status:"done", url:"projects/gotjawal-oreum-report/",
    thumb:"assets/img/p13.jpg", alt:"저지곶자왈 숲 사이로 빛이 드는 모습", locked:true, owner:"협회", ownerNote:"공모 사업, 협회 명의" },

  { title:"가로수길 지도 제작", area:"알림과 협력",
    summary:"가로수길 지도를 앞뒤 2면으로 만들고 있습니다. 지금은 인쇄 전 시안을 검토하는 단계입니다.",
    status:"ongoing", url:"projects/garosugil-map/",
    thumb:"assets/projects/garosugil_thumbnail.jpg", alt:"2022년 가로수길 지도 표지의 나무 그림", locked:true, owner:"미정", ownerNote:"이번 사업 명의 확인 필요" },

  { title:"생태관광 자문단 운영", area:"알림과 협력",
    summary:"전문가와 함께 제주 생태관광의 방향을 논의합니다.",
    status:"ongoing", url:"", owner:"미정", ownerNote:"사업 명의 확인 필요" }
];

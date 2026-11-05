/* 진행 중인 사업(업무) 목록. '진행 사업' 탭과 메인이 이 파일을 읽습니다.
   마무리 일자나 내부 일정은 적지 않고, 어떤 사업인지 소개만 합니다.

   title   : 사업 이름
   area    : 하는 일 분류 (생태관광 프로그램, 마을과 주민, 교육과 사람, 조사와 연구, 알림과 협력)
   summary : 한두 문장 소개
   status  : ongoing 진행 중 | done 마무리
   url     : 더 볼 페이지 주소 (없으면 "")
   thumb   : 카드 사진 주소 (없으면 넣지 않음)
   alt     : 카드 사진 설명
   locked  : true면 카드에 '비밀번호 필요'를 표시합니다
   draft   : true면 사이트에 나오지 않습니다 (공개 전 사업) */
const PROJECTS = [
  { title:"오조리 마을 해설 자료 제작", area:"마을과 주민",
    summary:"오조리 어르신들이 들려주는 옛 바다 이야기를 기록해 마을 해설 자료로 만듭니다.",
    status:"ongoing", url:"projects/ozori-book-plan/",
    thumb:"assets/projects/ozori_card_thumbnail.jpg", alt:"오조리와 성산 일대를 찍은 1948년 흑백 항공사진", locked:true },

  { title:"해양생물 모니터링", area:"조사와 연구",
    summary:"제주 바다의 해양생물을 조사하고, 그 결과를 전시로 나눕니다.",
    status:"ongoing", url:"" },

  { title:"곶자왈·오름 특화사업", area:"생태관광 프로그램",
    summary:"곶자왈과 오름을 중심으로 생태관광을 키우는 사업입니다.",
    status:"ongoing", url:"" },

  { title:"생태관광 자문단 운영", area:"알림과 협력",
    summary:"전문가와 함께 제주 생태관광의 방향을 논의합니다.",
    status:"ongoing", url:"" }
];

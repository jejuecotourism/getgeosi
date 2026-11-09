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
   survey : 만족도 조사 양식 이름. 넣으면 관리자 만족도 조사 탭에서 이 행사를 눌러 응답을 봅니다 (없으면 생략) */
const EVENTS = [
  { id:"2026-workshop", title:"2026 생태관광 합동워크숍", start:"2026-12-11", end:"2026-12-11", time:"15:00~19:00",
    status:"upcoming", cover:"", url:"", record:"", note:"", draft:true },

  { id:"2026-birding", title:"오고 생이 제주로 탐조대회", start:"2026-11-14", end:"2026-11-14", time:"09:00~16:00",
    status:"closed", cover:"events/2026-birding/cover.jpg", url:"events/2026-birding/", record:"", note:"새를 따라, 습지를 만나다", survey:"birding2026-survey" },

  { id:"2026-autumn", title:"2026 가을 생태관광주간", start:"2026-10-03", end:"2026-10-09", time:"",
    status:"done", cover:"assets/img/p13.jpg", url:"events/2026-autumn/", record:"records.html", note:"프로그램 27개" },

  { id:"2026-summer", title:"제3회 갯것이영화제 × 2026 생태관광주간", start:"2026-08-08", end:"2026-08-15", time:"",
    status:"done", cover:"assets/img/eco_05_dolphin.jpg", url:"events/2026-summer/", record:"", note:"바다를 보고 느끼는 8일" }
];

const STATUS_LABEL = { upcoming:"예정", open:"모집 중", closed:"모집 완료", done:"종료" };

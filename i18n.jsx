/* eslint-disable */
// Tiny i18n + ambient-context layer. Loaded before pages.jsx so any
// component can call useT() / useLang() / useDesignMode().
// - STRINGS: keyed translations { en, ko }
// - LangContext: 'en' | 'ko' (provided by App from the `lang` tweak)
// - DesignContext: 'pixel' | 'modern' (provided by App from `designMode`)

const STRINGS = {
  // ── topbar / shell ────────────────────────────────────────────────
  'topbar.desktop':       { en: 'DESKTOP',     ko: '바탕화면' },
  'topbar.file':          { en: 'FILE',        ko: '파일' },
  'topbar.view':          { en: 'VIEW',        ko: '보기' },
  'topbar.help':          { en: 'HELP',        ko: '도움말' },
  'topbar.tweaks':        { en: '⚙ TWEAKS',    ko: '⚙ 설정' },
  'topbar.lang.tip':      { en: 'Language',    ko: '언어' },
  'boot.booting':         { en: 'booting…',    ko: '부팅 중…' },
  'boot.shell':           { en: 'portfolio shell', ko: '포트폴리오 셸' },

  // ── folder window ─────────────────────────────────────────────────
  'folder.items':         { en: 'items',       ko: '항목' },
  'folder.empty':         { en: 'still empty — coming soon.', ko: '아직 비어있어요 — 곧 채울 예정.' },

  // ── dock labels ───────────────────────────────────────────────────
  'dock.about':           { en: 'about',       ko: '소개' },
  'dock.resume':          { en: 'résumé',      ko: '이력서' },
  'dock.contact':         { en: 'contact',     ko: '연락처' },
  'dock.github':          { en: 'github',      ko: '깃허브' },
  'dock.readme':          { en: 'README',      ko: '읽어주세요' },
  'dock.trash':           { en: 'trash',       ko: '휴지통' },

  // ── about page ────────────────────────────────────────────────────
  'about.greeting':       { en: "Hi, I'm Your Name", ko: '안녕하세요, OOO입니다' },
  'about.role':           { en: 'SOFTWARE ENGINEER', ko: '소프트웨어 엔지니어' },
  'about.location':       { en: 'SEOUL, KR',   ko: '서울, 대한민국' },
  'about.intro':          {
    en: "I build small, sturdy things on the web. This portfolio is also a playground — every icon you see is an actual file you can open.",
    ko: "웹에서 작고 단단한 것들을 만듭니다. 이 포트폴리오 자체도 놀이터예요 — 보이는 모든 아이콘은 더블클릭으로 열리는 실제 파일입니다.",
  },
  'about.skills.languages':{ en: 'languages',  ko: '언어' },
  'about.skills.stack':   { en: 'stack',       ko: '스택' },
  'about.skills.tools':   { en: 'tools',       ko: '도구' },
  'about.skills.currently':{ en: 'currently',  ko: '진행 중' },
  'about.skills.building':{ en: 'building',    ko: '제작 중' },
  'about.values.title':   { en: 'Things I care about', ko: '중요하게 여기는 것' },
  'about.values.1':       { en: "Software that respects the user's time and attention.",
                            ko: "사용자의 시간과 주의를 존중하는 소프트웨어." },
  'about.values.2':       { en: "Small, well-named primitives over framework lock-in.",
                            ko: "프레임워크에 갇히기보다, 잘 이름붙은 작은 단위." },
  'about.values.3':       { en: "Designs you can hand to another engineer and they smile.",
                            ko: "다른 엔지니어에게 넘겼을 때 미소짓게 만드는 설계." },
  'about.hint':           { en: 'DOUBLE-CLICK ICONS · DRAG WINDOWS BY THE TITLEBAR · ESC CLOSES SELECTION',
                            ko: '아이콘 더블클릭 · 타이틀바를 드래그해서 윈도우 이동 · ESC로 선택 해제' },

  // ── resume page ───────────────────────────────────────────────────
  'resume.title':         { en: 'Résumé',      ko: '이력서' },
  'resume.updated':       { en: 'LAST UPDATED · MAY 2026', ko: '최종 갱신 · 2026년 5월' },
  'resume.experience':    { en: 'Experience',  ko: '경력' },
  'resume.exp.1.when':    { en: '2024 — PRESENT', ko: '2024 — 현재' },
  'resume.exp.1.role':    { en: 'Senior Engineer · Some Company', ko: '시니어 엔지니어 · 어느 회사' },
  'resume.exp.1.desc':    {
    en: 'Led the rebuild of the editor surface — shipped collaborative cursors, offline mode, and a ~30% perf win on initial load.',
    ko: '에디터 표면을 다시 짓는 작업을 이끌었어요 — 협업 커서, 오프라인 모드, 초기 로드 속도 약 30% 개선까지 출시했습니다.',
  },
  'resume.exp.2.when':    { en: '2022 — 2024', ko: '2022 — 2024' },
  'resume.exp.2.role':    { en: 'Engineer · Earlier Place', ko: '엔지니어 · 이전 회사' },
  'resume.exp.2.desc':    {
    en: 'Built the design system from scratch. Shipped 60+ components, adopted by every product team within a year.',
    ko: '디자인 시스템을 처음부터 구축했어요. 60+ 컴포넌트를 출시했고, 1년 안에 모든 제품 팀이 채택했습니다.',
  },
  'resume.exp.3.when':    { en: '2020 — 2022', ko: '2020 — 2022' },
  'resume.exp.3.role':    { en: 'Engineer · First Job', ko: '엔지니어 · 첫 직장' },
  'resume.exp.3.desc':    {
    en: 'Wore many hats. Owned the data pipeline, then the frontend, then realised I liked frontend more.',
    ko: '여러 모자를 썼어요. 데이터 파이프라인을 맡다가 프론트엔드로 넘어갔고, 그 쪽이 더 즐겁다는 걸 알게 됐습니다.',
  },
  'resume.education':     { en: 'Education',   ko: '학력' },
  'resume.edu.1.when':    { en: '2016 — 2020', ko: '2016 — 2020' },
  'resume.edu.1.role':    { en: 'B.S. Computer Science · University Name', ko: '컴퓨터공학 학사 · 학교명' },
  'resume.btn.pdf':       { en: 'DOWNLOAD .PDF', ko: 'PDF 다운로드' },
  'resume.btn.linkedin':  { en: 'VIEW ON LINKEDIN', ko: '링크드인에서 보기' },

  // ── contact page ──────────────────────────────────────────────────
  'contact.title':        { en: 'Get in touch', ko: '연락하기' },
  'contact.intro':        { en: 'Pick the channel you like. Email is fastest.',
                            ko: '편한 채널로 연락 주세요. 이메일이 가장 빠릅니다.' },
  'contact.card.email':   { en: 'EMAIL',       ko: '이메일' },
  'contact.card.github':  { en: 'GITHUB',      ko: '깃허브' },
  'contact.card.twitter': { en: 'TWITTER',     ko: '트위터' },
  'contact.card.linkedin':{ en: 'LINKEDIN',    ko: '링크드인' },
  'contact.form.title':   { en: 'Or send a message', ko: '또는 메시지 보내기' },
  'contact.form.name':    { en: 'NAME',        ko: '이름' },
  'contact.form.email':   { en: 'EMAIL',       ko: '이메일' },
  'contact.form.message': { en: 'MESSAGE',     ko: '메시지' },
  'contact.form.placeholder.name':    { en: 'Ada Lovelace', ko: '홍길동' },
  'contact.form.placeholder.email':   { en: 'ada@analytical.engine', ko: 'hong@example.com' },
  'contact.form.placeholder.message': { en: 'Hello! I saw your portfolio and...', ko: '안녕하세요! 포트폴리오를 보고…' },
  'contact.form.send':    { en: 'SEND →',      ko: '보내기 →' },
  'contact.sent.title':   { en: '✓ MESSAGE QUEUED', ko: '✓ 메시지가 큐에 들어갔어요' },
  'contact.sent.body':    { en: "Thanks — I'll get back to you within a couple of days.",
                            ko: "감사합니다 — 며칠 안에 답장 드릴게요." },

  // ── github page ───────────────────────────────────────────────────
  'github.followers':     { en: '421 FOLLOWERS', ko: '팔로워 421명' },
  'github.repos':         { en: '73 REPOS',    ko: '저장소 73개' },
  'github.btn.visit':     { en: 'VISIT →',     ko: '방문하기 →' },
  'github.contrib':       { en: 'Contributions · last 6 months', ko: '기여 · 최근 6개월' },
  'github.less':          { en: 'LESS',        ko: '적음' },
  'github.more':          { en: 'MORE',        ko: '많음' },
  'github.pinned':        { en: 'Pinned repositories', ko: '고정 저장소' },
  'github.repo.1.desc':   { en: 'A retro-styled portfolio shell. Yes, this one.',
                            ko: '레트로 스타일 포트폴리오 셸. 네, 이거예요.' },
  'github.repo.2.desc':   { en: 'Tiny CLI for managing tmux sessions across machines.',
                            ko: '여러 머신의 tmux 세션을 관리하는 작은 CLI.' },
  'github.repo.3.desc':   { en: 'Markdown renderer with print-quality typography.',
                            ko: '인쇄 품질의 타이포그래피를 갖춘 마크다운 렌더러.' },
  'github.repo.4.desc':   { en: 'My dotfiles. Heavy on vim, light on aliases.',
                            ko: '내 dotfiles. vim 많이, alias 적게.' },

  // ── readme page ───────────────────────────────────────────────────
  'readme.welcome':       { en: 'Welcome.',    ko: '환영합니다.' },
  'readme.body':          {
    en: 'This is my portfolio styled as a tiny pixel desktop. Every icon on the wallpaper is a real file you can open by double-clicking. The dock at the bottom holds the four main pages.',
    ko: '작은 픽셀 데스크톱으로 꾸민 포트폴리오입니다. 바탕화면의 모든 아이콘은 더블클릭으로 열리는 실제 파일이에요. 하단 Dock에 4개의 메인 페이지가 있습니다.',
  },
  'readme.controls':      { en: '## controls', ko: '## 조작' },
  'readme.ctl.open':      { en: 'open a file', ko: '파일 열기' },
  'readme.ctl.move':      { en: 'move a window', ko: '윈도우 이동' },
  'readme.ctl.esc':       { en: 'clear selection', ko: '선택 해제' },
  'readme.ctl.tweaks':    { en: 'open Tweaks',ko: '설정 열기' },
  'readme.colophon':      { en: '## colophon', ko: '## 콜로폰' },
  'readme.colophon.body': {
    en: 'Built with HTML, CSS, and a small amount of React. No frameworks. Type set in Pixelify Sans, VT323 and Silkscreen.',
    ko: 'HTML, CSS와 소량의 React로 만들었어요. 프레임워크 없음. Pixelify Sans, VT323, Silkscreen 서체를 사용했습니다.',
  },

  // ── notes page ────────────────────────────────────────────────────
  'notes.subtitle':       { en: 'SCRATCHPAD · OPEN TO EDIT', ko: '스크래치패드 · 열어서 편집' },
  'notes.default':        {
    en: "- ship the new portfolio\n- write the post about pixel chrome\n- refactor the editor undo stack\n- read more poetry",
    ko: "- 새 포트폴리오 출시\n- 픽셀 chrome 관련 글 작성\n- 에디터 undo 스택 리팩터\n- 시집 더 읽기",
  },

  // ── trash page ────────────────────────────────────────────────────
  'trash.summary':        { en: 'One item.',   ko: '항목 1개.' },
  'trash.item':           { en: 'old-portfolio.html', ko: 'old-portfolio.html' },
  'trash.meta':           { en: '12.4 KB · DELETED 2026-04-02', ko: '12.4 KB · 삭제됨 2026-04-02' },
  'trash.empty':          { en: 'EMPTY TRASH', ko: '휴지통 비우기' },
};

const LangContext = React.createContext('en');
const DesignContext = React.createContext('pixel');

function useT() {
  const lang = React.useContext(LangContext);
  return React.useCallback((key) => {
    const entry = STRINGS[key];
    if (!entry) return key;
    return entry[lang] ?? entry.en ?? key;
  }, [lang]);
}

function useLang() {
  return React.useContext(LangContext);
}

function useDesignMode() {
  return React.useContext(DesignContext);
}

Object.assign(window, { STRINGS, LangContext, DesignContext, useT, useLang, useDesignMode });

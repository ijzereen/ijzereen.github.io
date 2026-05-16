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
  'about.greeting':       { en: "Hi, I'm CheolWon Jung", ko: '안녕하세요, 정철원입니다' },
  'about.role':           { en: 'CREATOR · AI / EDU', ko: '크리에이터 · AI / 교육' },
  'about.location':       { en: 'KOREA',        ko: '대한민국' },
  'about.intro':          {
    en: "A Creator chasing what makes the heart race — making impact on the world. AI and education feel like the fastest, widest channels for that, so I focus there. During Air Force service I designed and shipped end-to-end LLM-based recommendation and image-generation services; before that I worked on LLM authoring tools and learning-data structures in the education / content domain.",
    ko: "가슴 뛰는 일을 좇아 세상에 임팩트를 만드는 Creator입니다. AI와 교육이 가장 빠르고 넓게 임팩트를 낼 수 있는 도메인이라 생각해 두 영역에 집중해왔어요. 공군 복무 중에는 LLM 기반 목표 추천 시스템과 이미지 생성 서비스를 End-to-End로 설계·구현했고, 그 이전에는 교육·콘텐츠 도메인에서 LLM 기반 저작 도구와 학습 데이터 구조를 다뤘습니다.",
  },
  'about.skills.languages':{ en: 'languages', ko: '언어' },
  'about.skills.stack':   { en: 'backend',    ko: '백엔드' },
  'about.skills.tools':   { en: 'ai / llm',   ko: 'AI / LLM' },
  'about.skills.currently':{ en: 'currently', ko: '진행 중' },
  'about.skills.building':{ en: 'building',   ko: '제작 중' },
  'about.values.title':   { en: 'Things I care about', ko: '중요하게 여기는 것' },
  'about.values.1':       { en: "Impact you can feel in someone's daily flow.",
                            ko: "누군가의 일상 흐름에 직접 닿는 임팩트." },
  'about.values.2':       { en: "End-to-end ownership — design through running system.",
                            ko: "설계부터 운영까지 끝과 끝을 책임지는 시스템." },
  'about.values.3':       { en: "AI as a tool that meets people where they actually learn and work.",
                            ko: "사람이 실제로 배우고 일하는 자리에서 만나는 AI." },
  'about.hint':           { en: 'DOUBLE-CLICK ICONS · DRAG WINDOWS BY THE TITLEBAR · ESC CLOSES SELECTION',
                            ko: '아이콘 더블클릭 · 타이틀바를 드래그해서 윈도우 이동 · ESC로 선택 해제' },

  // ── resume page ───────────────────────────────────────────────────
  'resume.title':         { en: 'Résumé',      ko: '이력서' },
  'resume.updated':       { en: 'LAST UPDATED · MAY 2026', ko: '최종 갱신 · 2026년 5월' },
  'resume.experience':    { en: 'Experience',  ko: '경력' },

  'resume.exp.1.when':    { en: 'OCT 2024 — JUL 2026', ko: '2024.10 — 2026.07' },
  'resume.exp.1.role':    { en: 'AI Systems Developer · ROK Air Force ICTC',
                            ko: 'AI체계개발병 · 공군 지능정보체계관리단' },
  'resume.exp.1.desc':    {
    en: 'Shipped two end-to-end AI services. AirWards image generation: webhook-based layered backend (BFF → API → Worker → Model Server) with Celery + RabbitMQ queuing and MinIO storage for async image generate / edit / background-remove. Goal-management recommender: air-gapped on-device system using local LLMs (vLLM, Ollama), a LangGraph state-machine pipeline, a Hybrid SQL + Lexical agent for retrieval, and a Self-Correction step for relevancy.',
    ko: '두 개의 End-to-End AI 서비스를 설계·구현했어요. AirWards 이미지 생성: Webhook 기반 레이어드 아키텍처(BFF → API → Worker → Model Server)에 Celery + RabbitMQ 큐잉과 MinIO 스토리지를 연결해 이미지 생성·편집·배경 제거를 비동기로 처리. 목표관리체계 추천: 망분리(air-gapped) 환경에서 로컬 LLM(vLLM, Ollama) 기반 On-Device 시스템을 구축, LangGraph 상태 기반 파이프라인 + SQL·Lexical Hybrid 검색 + Self-Correction(Relevancy Check)으로 정확도를 끌어올림.',
  },

  'resume.exp.2.when':    { en: 'MAR 2024 — OCT 2024', ko: '2024.03 — 2024.10' },
  'resume.exp.2.role':    { en: 'Research Engineer · Seedcoop',
                            ko: 'Research Engineer · 청년교육사회적협동조합 씨드콥' },
  'resume.exp.2.desc':    {
    en: "Pearl Abyss \"Dinga-Ding\" hackathon: reframed the BuildBox engine for first-time learners — a Korean-labeled block set re-grouped by frequency / concept difficulty, plus a modular curriculum aligned with it. Gukin mentoring program \"DecideX\": built an LLM story-graph engine where each LLM-generated scene is a node and branching choices are edges, with consistency checks across nodes so non-developers can author and ship choose-your-own-adventure games from a single web UI.",
    ko: '펄어비스 해커톤 「딩가딩 프로젝트」: BuildBox 엔진을 초기 학습자 관점에서 재구성한 학습용 블록 셋(빈출 블록 캡슐화 · 저빈도 블록 인터페이스 은닉)과 모듈형 커리큘럼 설계·구현. 국인(Gukin) 글로벌 멘토링 프로그램 「DecideX」: LLM이 만든 스토리를 노드로, 선택지를 엣지로 잇는 분기형 게임 생성 엔진 설계·구현 — 노드 간 일관성 검증을 도입해 비개발자도 단일 웹 인터페이스에서 어드벤처 게임을 제작·배포할 수 있도록 구성.',
  },

  'resume.exp.3.when':    { en: 'NOV 2023 — FEB 2024', ko: '2023.11 — 2024.02' },
  'resume.exp.3.role':    { en: 'Content Assistant · Mathpresso',
                            ko: 'Content Assistant · 매스프래소' },
  'resume.exp.3.desc':    {
    en: 'Designed a K-12 math knowledge ontology — formalized curriculum units, achievement standards and problem-bank metadata into a graph schema, then defined the problem ↔ concept ↔ unit mapping rules and prerequisite edges that feed downstream recommendation and diagnostic pipelines.',
    ko: 'K-12 수학 교육과정을 정형화한 Knowledge Structure 온톨로지를 설계했어요. 단원·성취기준·문항 데이터를 그래프 스키마로 정제하고, 선후행 위계와 개념 의존성을 반영한 노드/엣지 구조 + 문항–개념–단원 매핑 규칙을 정립해 추천·진단 파이프라인의 기반 데이터로 만들었습니다.',
  },

  'resume.exp.4.when':    { en: 'OCT 2022 — JUN 2023', ko: '2022.10 — 2023.06' },
  'resume.exp.4.role':    { en: 'Research Engineer · Seedcoop',
                            ko: 'Research Engineer · 청년교육사회적협동조합 씨드콥' },
  'resume.exp.4.desc':    {
    en: 'Designed and authored "Retail-Tech Coding Class with Shinsegae I&C" — a PBL curriculum that reframes retail-domain cases (POS, inventory, customer analytics) as learning scenarios, with scaffolded modules walking learners from Python basics → data processing → applying ML models.',
    ko: '신세계아이앤씨와 함께하는 「리테일테크 코딩교실」 — POS·재고·고객 분석 등 리테일 도메인 사례를 학습 시나리오로 재구성한 PBL 커리큘럼 설계·집필. Python 기초 → 데이터 처리 → ML 모델 적용으로 이어지는 스캐폴딩 구조로 자기주도 학습이 가능하도록 구성.',
  },

  'resume.education':     { en: 'Education',   ko: '학력' },
  'resume.edu.1.when':    { en: 'MAR 2022 — PRESENT', ko: '2022.03 — 재학' },
  'resume.edu.1.role':    { en: 'Computer Education · Korea National University of Education',
                            ko: '컴퓨터교육과 · 한국교원대학교' },
  'resume.btn.pdf':       { en: 'DOWNLOAD .PDF', ko: 'PDF 다운로드' },
  'resume.btn.linkedin':  { en: 'VIEW ON LINKEDIN', ko: '링크드인에서 보기' },

  // ── contact page ──────────────────────────────────────────────────
  'contact.title':        { en: 'Get in touch', ko: '연락하기' },
  'contact.intro':        { en: 'Pick the channel you like. Email is fastest.',
                            ko: '편한 채널로 연락 주세요. 이메일이 가장 빠릅니다.' },
  'contact.card.email':   { en: 'EMAIL',       ko: '이메일' },
  'contact.card.phone':   { en: 'PHONE',       ko: '전화' },
  'contact.card.github':  { en: 'GITHUB',      ko: '깃허브' },
  'contact.card.linkedin':{ en: 'LINKEDIN',    ko: '링크드인' },
  'contact.card.empty':   { en: '—',           ko: '—' },
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

// Profile MD files (Profile/about.md, Profile/resume.md, Profile/contact.md)
// are compiled by scripts/index-profile.py into window.PROFILE_STRINGS and
// loaded right before this file. Merge them in so the in-file STRINGS map
// serves as the schema/fallback and the MD wins.
if (typeof window !== 'undefined' && window.PROFILE_STRINGS) {
  Object.assign(STRINGS, window.PROFILE_STRINGS);
}

const LangContext = React.createContext('en');
const DesignContext = React.createContext('pixel');

function useT() {
  const lang = React.useContext(LangContext);
  return React.useCallback((key) => {
    const entry = STRINGS[key];
    if (entry == null) return key;
    // Language-neutral keys (e.g., about.skill.languages) ship as plain
    // strings; bilingual keys ship as { en, ko } pairs.
    if (typeof entry === 'string') return entry;
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

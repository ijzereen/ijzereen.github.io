# IJZEREEN — Jekyll 블로그

Apple Pages 문서 편집 화면 톤의 개인 블로그 / 포트폴리오.
회색 워크스페이스 위에 흰 문서 종이가 놓인 디자인 시스템을 홈·블로그·포트폴리오가 공유한다.

🔗 https://ijzereen.github.io

> 더 자세한 내부 구조/디자인 토큰은 [`CLAUDE.md`](./CLAUDE.md) 참고.

---

## 🗺️ 사이트 구조

| 경로 | 설명 | 진입점 | 레이아웃 | CSS |
| --- | --- | --- | --- | --- |
| `/` | 홈 (편집 중인 문서) | `index.html` | `_layouts/home.html` | `assets/css/home.css` |
| `/blog/` | 블로그 인덱스(목차) | `blog.html` | `_layouts/blog-index.html` | `assets/css/blog-index.css` |
| `/blog/:slug/` | 개별 포스트 | `_posts/*.md` | `_layouts/post.html` | `assets/css/post.css` |
| `/portfolio/` | 포트폴리오 문서 | `portfolio.md` | `_layouts/portfolio.html` | `assets/css/portfolio.css` |

공통 head는 `_includes/head.html`, 상단 바는 `_includes/topbar.html`.

---

## ✍️ 글 쓰기

`_posts/` 에 `YYYY-MM-DD-제목.md` 파일을 만든다:

```markdown
---
title: "포스트 제목"
author: Ijzereen
date: 2026-01-01 14:30:00 +0900
categories: ["NLP", "AI"]
tags: [tag1, tag2]
---

# 본문 시작
```

- **URL**: `/blog/:slug/` (파일명 slug 자동 소문자화)
- **코드블록**: ```` ```python ```` 처럼 언어 지정 → VSCode 다크 카드로 렌더
- **수식**: 인라인 `$...$`, 블록 `$$...$$` (MathJax)
- 인덱스(`/blog/`)에는 날짜·카테고리·제목·태그가 자동으로 목록에 추가된다.

### 이미지 · 동영상 · 임베드

| 종류 | 작성법 | 메모 |
| --- | --- | --- |
| **이미지** | `![설명](/assets/img/posts/YYYY-MM-DD/x.jpg)` | 파일은 `assets/img/posts/날짜/`에. 파일명에 공백·Liquid 금지. 절대경로(`/`)면 VSCode Preview·배포 둘 다 OK |
| **캡션** | 이미지 줄 아래 `*설명*` | 기울임 캡션처럼 표시 |
| **유튜브** | `<div class="video"><iframe src="https://www.youtube.com/embed/ID" allowfullscreen></iframe></div>` | `.video` 래퍼가 16:9 반응형 처리 |
| **동영상 파일** | `<video controls width="100%" src="/assets/.../clip.mp4"></video>` | ⚠️ 100MB 초과 시 push 차단. 긴 영상은 유튜브로 |
| **인스타그램** | 게시물 `…` → 퍼가기 코드 붙여넣기 (아래) | 공개 계정만. `embed.js`는 글당 1개면 됨 |

```html
<!-- 인스타그램 임베드 -->
<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/게시물ID/" data-instgrm-version="14"></blockquote>
<script async src="//www.instagram.com/embed.js"></script>
```

> ⚠️ 동영상·인스타·iframe은 **VSCode Preview에선 안 보인다** (보안 차단). 로컬 `jekyll serve`나 배포본에서 확인.
> 임베드 스타일(가운데 정렬·반응형)은 `assets/css/post.css` 하단에 정의돼 있다.

포트폴리오는 `portfolio.md` 를 마크다운으로 직접 수정.
키–값 필드는 `<div class="field"><span class="k">키</span><span class="v">값</span></div>`.

---

## 🎨 어디를 고치면 되나 (디자인 수정 위치)

| 고치고 싶은 것 | 파일 | 위치 / 메모 |
| --- | --- | --- |
| **전체 색/배경/링크색** | `assets/css/base.css` | `:root` 의 `--pg-*` 토큰. 한 곳만 바꾸면 전체 반영 |
| **본문 폰트** | `assets/css/base.css` | `--pg-font`(본문=시스템), `--font-mono`(코드) |
| 웹폰트 로드 추가/제거 | `_includes/head.html` | `<link ... fonts.googleapis ...>` |
| **상단 바**(라이트 톱바) | `assets/css/base.css` → `.top-bar` | 라벨/제목은 각 레이아웃의 `{% include topbar.html %}` 인자 |
| **홈** 레이아웃/문구 | `_layouts/home.html` | 제목, 부제(`.doc-sub` 의 `data-type`), 링크(`.doc-link`) |
| 홈 스타일 | `assets/css/home.css` | 종이 크기·여백·커서 등 |
| 홈 부제 타이핑 속도 | `assets/js/home.js` | `setTimeout` 값 |
| **블로그 인덱스** 모양 | `assets/css/blog-index.css` | 제목·목록 행·태그 스타일 |
| 블로그 인덱스 제목/부제 | `_layouts/blog-index.html` | `term-title` / `term-sub` 텍스트 |
| **포스트** 본문 타이포 | `assets/css/post.css` | 제목/본문/표/인용구/이미지 |
| 코드블록 색(신택스) | `assets/css/post.css` → `.highlight` | VSCode 다크 팔레트 |
| **포트폴리오** 스타일 | `assets/css/portfolio.css` | 문서 타이포·필드 |
| 포트폴리오 내용 | `portfolio.md` | 마크다운 본문 |
| 사이트 제목/저자/소셜 | `_config.yml` | `title`, `author`, `social` 등 |
| 조회수 분석 | `_config.yml` → `goatcounter_code` | 대시보드 https://ijzereen.goatcounter.com |
| 댓글/좋아요 | `_config.yml` → `giscus_*` | giscus(GitHub Discussions) 댓글 + 👍반응. giscus.app에서 값 발급 |

> 모든 흰 종이(`.sheet` / `.terminal` / `.dossier` / `article`)는 동일한
> 그림자·둥근 모서리·여백 패턴을 쓴다. 종이 느낌을 바꾸려면 각 CSS의 해당 컨테이너에서.

---

## 🛠️ 로컬 실행

시스템 Ruby(2.6)는 버전이 낮아 Homebrew Ruby 사용:

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
bundle install
bundle exec jekyll serve --host 0.0.0.0 --port 4000
# → http://localhost:4000  (파일 저장 시 자동 새로고침)
```

---

## 🚀 배포

`main` 브랜치에 push하면 `.github/workflows/pages-deploy.yml` 이
GitHub Pages로 자동 빌드·배포한다.

```bash
git add -A
git commit -m "..."
git push origin main
```

# Apple Pages 스타일 Jekyll 블로그 가이드

> 회색 워크스페이스 위에 흰 문서 종이가 놓인 Apple Pages 편집 화면 톤.
> 홈 + 포트폴리오 + 기술블로그 모두 같은 "문서 종이" 디자인 시스템을 공유한다.

## 🗺️ 사이트 구조

| 경로 | 설명 | 진입점 | 레이아웃 |
| --- | --- | --- | --- |
| `/` | 홈 — 편집 중인 문서 한 장 | `index.html` | `_layouts/home.html` |
| `/portfolio/` | 포트폴리오 문서 | `portfolio.md` | `_layouts/portfolio.html` |
| `/blog/` | 기술블로그 인덱스(목차) | `blog.html` | `_layouts/blog-index.html` |
| `/blog/:slug/` | 개별 포스트 | `_posts/*.md` | `_layouts/post.html` |

## 📦 코드 구조

```
ijzereen.github.io/
├── index.html              # 홈 진입점
├── portfolio.md            # 포트폴리오 진입점 (마크다운)
├── blog.html               # 블로그 인덱스 진입점
│
├── _layouts/               # 레이아웃 (얇음 — 마크업만)
│   ├── home.html      # 홈 (문서 종이 + 타이핑 부제)
│   ├── portfolio.html
│   ├── blog-index.html
│   └── post.html
│
├── _includes/
│   ├── head.html           # 공통 head (메타, 폰트, CSS 로드)
│   └── topbar.html          # 상단 바 (라이트)
│
├── _posts/                 # 블로그 글
│
├── assets/
│   ├── css/                # 페이지별 CSS
│   │   ├── base.css        # 공통 토큰(:root)/리셋/톱바/선택색
│   │   ├── home.css   # 홈
│   │   ├── portfolio.css   # 포트폴리오 문서
│   │   ├── blog-index.css  # 인덱스 목차
│   │   └── post.css        # 포스트(코드 하이라이트 포함)
│   ├── js/
│   │   └── home.js    # 홈 부제 타이핑 + 커서
│   └── img/
│       ├── posts/          # 포스트 이미지
│       └── favicons/
│
├── _config.yml
└── CLAUDE.md
```

## 🎨 톤 / 색상 / 폰트

모든 색상/폰트는 `assets/css/base.css` 의 `:root` 변수에서 조정. 페이지 CSS는
이 토큰을 상속받으므로 한 곳만 바꾸면 전체에 반영된다.

```css
--pg-canvas:  #e8e8ec;   /* 워크스페이스 회색 */
--pg-paper:   #ffffff;   /* 문서 종이 */
--pg-ink:     #1d1d1f;   /* 본문 잉크 */
--pg-gray:    #86868b;   /* 보조 회색 */
--pg-faint:   #c7c7cc;   /* 옅은 마커 */
--pg-link:    #0b6bcb;   /* 문서 링크 블루 */
--pg-link-hi: #d6e8ff;   /* 텍스트 선택 하이라이트 */
--pg-rule:    #e6e6e9;   /* 구분선 */
--pg-code-bg: #f5f5f7;   /* 인라인 코드 배경 */

--pg-font:   -apple-system, system-ui, ...;   /* 본문 = 시스템 폰트(San Francisco) */
--font-mono: 'JetBrains Mono', ...;           /* 코드 전용 */
```

- 흰 종이 = `.sheet`(홈) / `.terminal`(블로그) / `.dossier`(포트폴리오) / `article`(포스트).
  모두 동일한 그림자·둥근 모서리·여백 패턴을 사용한다.

## 🏠 홈 — 편집 중인 문서

`_layouts/home.html` + `assets/css/home.css` + `assets/js/home.js`.

- 회색 워크스페이스 위 흰 종이 한 장, 좌측 정렬 문서 본문.
- 제목 `IJZEREEN`, 부제는 `data-type` 속성의 문구를 **한 글자씩 타이핑**(`home.js`).
  타이핑이 끝나면 본문(네비)·깜빡이는 커서가 등장한다.
- 링크 추가/변경은 `home.html` 의 `.doc-nav` 안 `.doc-link` 를 편집:
  ```html
  <a class="doc-link" href="{{ '/경로/' | relative_url }}">
      <span class="mark">—</span>
      <span class="lk-name">라벨</span>
      <span class="lk-gloss">설명</span>
  </a>
  ```
- 부제 문구는 `.doc-sub` 의 `data-type` 값, 타이핑 속도는 `home.js` 의 `setTimeout` 값.
- `prefers-reduced-motion` 환경에서는 타이핑 없이 즉시 표시된다.

## 📝 글 작성

`_posts/YYYY-MM-DD-제목.md`:
```yaml
---
title: "포스트 제목"
author: Ijzereen
date: 2026-01-01 14:30:00 +0900
categories: ["NLP", "AI"]
tags: [tag1, tag2]
---

# 본문
```
- URL: `/blog/:slug/` (slug는 자동 lowercase)
- 코드블록: VSCode 다크 카드(흰 종이 위) 자동 적용
- 인라인 코드: 연회색 배경 + 핑크 톤
- MathJax 수식: `$...$` / `$$...$$`

## 📄 포트폴리오 (`portfolio.md`)

마크다운으로 그대로 작성:
- 일반 마크다운 (`##`, `-` 리스트 등)
- 표 형식 필드: `<div class="field"><span class="k">키</span><span class="v">값</span></div>`

## 🛠️ 로컬 빌드

시스템 Ruby(2.6)는 너무 낮아 Homebrew Ruby 사용:
```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
bundle install
bundle exec jekyll serve --host 0.0.0.0 --port 4000
# → http://localhost:4000
```
배포: `main` 푸시 시 `.github/workflows/pages-deploy.yml` 이 GitHub Pages로 빌드.

## 🚫 빌드 제외 / Git 제외
- `_config.yml` `exclude`: `기획.md`, `README.md`, `LICENSE`
- `.gitignore`: `_site/`, `.jekyll-cache/`, `vendor/`, `.DS_Store`

# BIOHAZARD-스타일 Jekyll 블로그 가이드

> 바이오하자드 7 분위기의 1인칭 책상 씬 홈 + 서류철(포트폴리오) + 맥북(기술블로그) 구조.

## 🗺️ 사이트 구조

| 경로 | 설명 | 진입점 | 레이아웃 |
| --- | --- | --- | --- |
| `/` | 1인칭 책상 씬 (홈) | `index.html` | `_layouts/biohazard.html` |
| `/portfolio/` | 서류철 = 포트폴리오 | `portfolio.md` | `_layouts/portfolio.html` |
| `/blog/` | 맥북 = 기술블로그 인덱스 | `blog.html` | `_layouts/blog-index.html` |
| `/blog/:slug/` | 개별 포스트 | `_posts/*.md` | `_layouts/post.html` |

## 📦 코드 구조

```
ijzereen.github.io/
├── index.html              # 홈 진입점
├── portfolio.md            # 서류철 진입점 (마크다운)
├── blog.html               # 블로그 인덱스 진입점
│
├── _layouts/               # 레이아웃 (얇음 — 마크업만)
│   ├── biohazard.html      # 홈
│   ├── portfolio.html
│   ├── blog-index.html
│   └── post.html
│
├── _includes/              # 공통 마크업 조각
│   ├── head.html           # 공통 head (메타, 폰트, CSS 로드)
│   ├── topbar.html         # 상단 바
│   ├── atmosphere.html     # 비네트 + 그레인 오버레이
│   └── svg/
│       ├── macbook.svg
│       └── folder.svg
│
├── _posts/                 # 블로그 글
│
├── assets/
│   ├── css/                # 페이지별 CSS
│   │   ├── base.css        # 공통 토큰/리셋/탑바/오버레이
│   │   ├── biohazard.css   # 홈
│   │   ├── portfolio.css   # 서류철
│   │   ├── blog-index.css  # 터미널 인덱스
│   │   └── post.css        # 포스트(코드 하이라이트 포함)
│   ├── js/
│   │   └── biohazard.js    # 홈 인터랙션
│   └── img/
│       ├── posts/          # 포스트 이미지
│       └── favicons/
│
├── _data/                  # (옵션) authors / contact
├── _config.yml
└── CLAUDE.md
```

## 🎨 톤 / 색상 / 폰트

모든 색상/폰트는 `assets/css/base.css` 의 `:root` 변수에서 조정.

```css
--bg: #050403;          /* 기본 배경 */
--bg-paper: #ede0b8;    /* 종이 배경 (포트폴리오) */
--ink: #d8c9a4;         /* 기본 텍스트 */
--ink-strong: #f1e3bd;  /* 강조 텍스트 */
--ink-dim: #6b5e44;     /* 흐린 텍스트 */
--warn: #c14a2b;        /* 빨강 (도장/강조) */
--term: #7ec27a;        /* 터미널 그린 */
--rule: #2a221a;        /* 구분선 */

--font-mono: 'JetBrains Mono', monospace;
--font-deco: 'Special Elite', monospace;   /* 호러 타자기 톤 */
--font-body: 'Inter', system-ui, sans-serif;
```

## 🏠 홈 — 1인칭 책상 씬

`assets/css/biohazard.css` + `assets/js/biohazard.js`. 마크업은 `_layouts/biohazard.html`.

### 오브젝트 추가/변경
`_layouts/biohazard.html` 안 `.obj` 블록에 새로 추가:
```html
<div class="obj newthing"
     data-target="{{ '/somewhere/' | relative_url }}"
     data-name="OBJECT NAME"
     data-desc="설명">
    <span class="label">OBJECT NAME</span>
    {% include svg/yourfile.svg %}
</div>
```
- `data-target`: 인스펙트 후 클릭 시 이동 경로
- `data-name` / `data-desc`: 인스펙트 모드 표시 텍스트
- 위치/크기는 `assets/css/biohazard.css` 에서 `.newthing` 클래스로 정의

### 손전등 / 분위기
`assets/css/biohazard.css` 의 `:root` :
- `--beam-radius`: 손전등 코어 반경
- `--beam-soft`: 페이드 반경
- `@keyframes flicker`: 형광등 깜빡임 패턴

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
- 코드블록: VSCode 다크 테마 자동 적용
- 인라인 코드: 빨강 톤
- MathJax 수식: `$...$` / `$$...$$`

## 📄 포트폴리오 (`portfolio.md`)

마크다운으로 그대로 작성:
- 일반 마크다운 (`##`, `-` 리스트 등)
- 표 형식 필드: `<div class="field"><span class="k">키</span><span class="v">값</span></div>`

## 🛠️ 로컬 빌드

```bash
bundle install
bundle exec jekyll serve --host 0.0.0.0 --port 4000
# → http://localhost:4000
```

## 🚫 빌드 제외 / Git 제외
- `_config.yml` `exclude`: `기획.md`, `README.md`, `LICENSE`
- `.gitignore`: `_site/`, `.jekyll-cache/`, `vendor/`, `.DS_Store`

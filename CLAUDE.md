# BIOHAZARD-스타일 Jekyll 블로그 가이드

> 바이오하자드 7 분위기의 1인칭 책상 씬 홈 + 서류철(포트폴리오) + 맥북(기술블로그) 구조.

## 🗺️ 사이트 구조

| 경로 | 설명 | 진입점 | 레이아웃 |
| --- | --- | --- | --- |
| `/` | 1인칭 책상 씬 (홈) | `index.html` | `_layouts/biohazard.html` |
| `/portfolio/` | 서류철 = 포트폴리오 | `portfolio.md` | `_layouts/portfolio.html` |
| `/blog/` | 맥북 = 기술블로그 인덱스 | `blog.html` | `_layouts/blog-index.html` |
| `/blog/:title/` | 개별 포스트 | `_posts/*.md` | `_layouts/post.html` |

## 🏠 홈 — 1인칭 책상 씬

`_layouts/biohazard.html` 한 파일에 모두 들어있어.

### 오브젝트 변경/추가
오브젝트는 `<div class="obj ...">` 로 정의돼 있어.
```html
<div class="obj macbook"
     data-target="{{ '/blog/' | relative_url }}"
     data-name="OLD MACBOOK"
     data-desc="설명 텍스트">
    <span class="label">OLD MACBOOK</span>
    <svg>...</svg>
</div>
```
- `data-target`: 인스펙트 후 클릭 시 이동할 경로
- `data-name`: 인스펙트 모드에서 표시될 제목
- `data-desc`: 인스펙트 모드에서 표시될 설명

오브젝트 위치/크기는 `.macbook`, `.folder` CSS 블록에서 조정.

### 손전등 / 분위기 톤
CSS 변수에서 조정:
```css
--beam-radius: 280px;   /* 손전등 코어 반경 */
--beam-soft: 460px;     /* 손전등 페이드 반경 */
--ink: #d8c9a4;         /* 기본 텍스트 색 */
--warn: #c14a2b;        /* 강조(빨강) 색 */
```
또한 `.flicker` 의 `@keyframes flicker` 에서 형광등 깜빡임 패턴 조정 가능.

### 모바일
포인터가 coarse(터치)거나 720px 이하에서는 손전등/커서가 사라지고, 오브젝트가 세로로 정렬되고 라벨이 항상 보여.

## 📄 포트폴리오 (`portfolio.md`)

`_layouts/portfolio.html` 의 마닐라 폴더 종이 무드 위에 마크다운으로 그대로 작성하면 돼.
- `<div class="field">...<span class="k">키</span><span class="v">값</span></div>` — 표 형식 필드
- 일반 마크다운 (`##`, `-` 리스트 등) 도 다 동작

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
- 코드블럭은 VSCode 다크 테마, 인라인 코드는 빨강 톤.
- MathJax 수식: `$...$` / `$$...$$`.

## 🎨 톤 조정 한 줄 가이드

- **더 어둡게**: `body` 의 `background` 그라디언트를 더 깊게.
- **빨간 도장 톤 변경**: `--warn` 색만 바꾸면 모든 강조/도장이 일관되게 변해.
- **종이 색**: 포트폴리오의 `--paper` (`_layouts/portfolio.html`).
- **터미널 그린**: 블로그 인덱스의 `--term` (`_layouts/blog-index.html`).

## 📁 디렉토리

```
ijzereen.github.io/
├── index.html              # 홈 (책상 씬)
├── portfolio.md            # 서류철 진입점
├── blog.html               # 블로그 인덱스 진입점
├── _layouts/
│   ├── biohazard.html      # 1인칭 책상 씬
│   ├── portfolio.html      # 서류철(포트폴리오) 레이아웃
│   ├── blog-index.html     # 터미널 무드 인덱스
│   └── post.html           # 개별 포스트
├── _posts/                 # 블로그 글
├── _data/                  # 작성자/연락처 (옵션)
├── assets/img/             # 이미지
│   ├── posts/              # 포스트용
│   └── favicons/
├── _config.yml
└── CLAUDE.md
```

## 🧹 빌드 제외
`기획.md`, `README.md`, `LICENSE` 는 빌드 제외. (`_config.yml` `exclude`)

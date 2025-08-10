# 네오브루탈리스트 Jekyll 블로그 제어 가이드

## 🖼️ 이미지 창 제어

### 기본 설정 변경
`_layouts/neobrutalist.html` 파일의 `imageConfig` 객체 수정:

```javascript
// 라인 231-257 부근
const imageConfig = {
    // 기본 이미지 개수 (1-20)
    defaultCount: 2,
    
    // 사용할 이미지 소스들
    sources: [
        '{{ "/assets/img/floating/sample1.svg" | relative_url }}',
        '{{ "/assets/img/floating/sample2.svg" | relative_url }}',
        '{{ "/assets/img/floating/sample3.svg" | relative_url }}'
        // assets/img/floating/ 폴더에 이미지 파일을 추가하고 여기에 경로 추가
    ],
    
    // 창 크기 범위 (픽셀)
    width: { min: 280, max: 460 },
    height: { min: 180, max: 320 },
    
    // 회전 범위 (도)
    rotation: { min: -7, max: 7 }
};
```

### 수정 방법
1. **창 개수 변경**: `defaultCount: 10` (1-20 범위)
2. **로컬 이미지 추가**: 
   - `assets/img/floating/` 폴더에 이미지 파일 저장
   - `sources` 배열에 경로 추가: `'{{ "/assets/img/floating/your-image.jpg" | relative_url }}'`
3. **크기 조정**: `width/height`의 `min/max` 값 수정
4. **회전 각도**: `rotation`의 `min/max` 값 수정 (도 단위)

### 이미지 파일 추가하기
1. `assets/img/floating/` 폴더에 이미지 파일 복사
2. `_layouts/neobrutalist.html`의 `sources` 배열에 추가:
```javascript
sources: [
    '{{ "/assets/img/floating/my-image1.jpg" | relative_url }}',
    '{{ "/assets/img/floating/my-image2.png" | relative_url }}',
    '{{ "/assets/img/floating/my-image3.svg" | relative_url }}'
],
```

## 🎭 CHAOS 모드 제어

### 설정 위치
- **홈페이지**: `_layouts/neobrutalist.html`의 `toggleChaosMode()` 함수 (라인 468-529)
- **포스트**: `_layouts/post.html`의 CHAOS 스크립트 (라인 259-321)

### 효과 수정
CHAOS 모드의 간격/강도 조정:
```javascript
// 홈페이지 - 창 변경 간격 (밀리초)
chaosInterval = setInterval(() => {
    // ... 효과들
}, rand(800, 2000)); // 이 값들을 수정

// 포스트 - 효과 간격
chaosInterval = setInterval(() => {
    // ... 효과들  
}, rand(1000, 3000)); // 이 값들을 수정
```

## 📝 글 작성

### 포스트 파일 생성
`_posts/YYYY-MM-DD-제목.md` 형식:

```yaml
---
title: "포스트 제목"
author: Ijzereen
date: 2025-08-10 14:30:00 +0900
categories: ["카테고리1", "카테고리2"]
tags: [태그1, 태그2]
---

# 포스트 내용
```

## 🎨 디자인 수정

### 색상 변경
`_layouts/neobrutalist.html`과 `_layouts/post.html`의 `<style>` 태그에서:
- 배경색: `bg-pink-200` → `bg-blue-200`
- 테두리: `border-black` → `border-gray-800`
- 그림자: `brutal-shadow` CSS 클래스 수정

### 폰트 변경
각 레이아웃 파일의 Google Fonts 링크 수정:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

## ⚙️ 주요 파일 위치

- **홈페이지**: `_layouts/neobrutalist.html`
- **포스트**: `_layouts/post.html`  
- **포스트 폴더**: `_posts/`
- **홈화면 이미지 폴더**: `assets/img/floating/` ⭐ **여기에 이미지 파일 넣으세요**
- **포스트 이미지 폴더**: `assets/img/posts/`
- **검색 데이터**: `assets/js/search-data.json` (자동 생성)
- **설정**: `_config.yml`

## 📁 프로젝트 구조

```
ijzereen.github.io/
├── _layouts/           # 레이아웃 파일
│   ├── neobrutalist.html  # 홈페이지
│   └── post.html          # 포스트 페이지
├── _posts/             # 블로그 포스트
├── _data/              # 데이터 파일
├── _tabs/              # 탭 메뉴
├── assets/
│   ├── img/
│   │   ├── floating/   # 홈화면 이미지 ⭐
│   │   ├── posts/      # 포스트 이미지
│   │   └── favicons/   # 파비콘
│   └── js/            # JavaScript 파일
├── _config.yml         # 사이트 설정
├── index.html          # 홈페이지 설정
└── CLAUDE.md          # 이 가이드
```
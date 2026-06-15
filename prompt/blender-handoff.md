# 프로젝트 인수인계 — ijzereen.github.io

## 프로젝트 개요

Biohazard(바이오하자드 7) 분위기의 Jekyll 정적 블로그.  
홈 화면은 **1인칭 책상 씬** — 방문자가 책상 앞에 앉아있는 느낌.  
책상 위 오브젝트를 클릭하면 각 섹션으로 이동.

| 오브젝트 | 이동 경로 |
|---|---|
| MacBook | `/blog/` (기술 블로그) |
| Dossier (서류철) | `/portfolio/` |

---

## 현재 기술 스택

- **Jekyll** (GitHub Pages 배포)
- **Three.js r128** (CDN) — WebGL 3D 렌더링
- **UnrealBloomPass** (Three.js 후처리) — 광원 번짐 효과
- Ruby 3.3 (Homebrew) + bundler 2.6.9

### 로컬 실행

```bash
PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH" bundle exec jekyll serve --host 0.0.0.0 --port 4000
```

---

## 파일 구조 (핵심)

```
ijzereen.github.io/
├── _layouts/biohazard.html     # 홈 레이아웃 (Three.js CDN 로드)
├── assets/
│   ├── css/biohazard.css       # 커서·손전등 오버레이·인스펙트 UI
│   └── js/biohazard.js         # Three.js 씬 전체 (조명·모델·인터랙션)
```

---

## 현재 Three.js 씬 구조

### 카메라
- 위치: `(0, 1.55, 1.05)` — 눈높이 1.55m, 책상 뒤쪽
- 마우스 이동 → 카메라 Y/X 회전 (고개 돌리는 느낌)

### 조명
| 조명 | 역할 |
|---|---|
| `AmbientLight` | 극히 약한 기저 조명 |
| `lampSpot` (SpotLight) | 펜던트 램프 — 위(Y=2.88)에서 수직 하향 |
| `lampFill` (PointLight) | 램프 주변 누설광 |
| `spot` (SpotLight) | 커서 손전등 — 카메라 방향 추적 |

### 씬 오브젝트 (코드로 생성된 geometry)
- 방 (뒤벽·양옆벽·천장·바닥·걸레받이)
- 책상 (상판·측면·다리·가로대)
- 펜던트 램프 (전선·갓·전구 mesh)
- MacBook (베이스·키보드 48키 InstancedMesh·트랙패드·스크린·Apple 로고)
- 서류철 (표지·종이 5장)
- 커피잔 (본체·손잡이·커피 표면)

### 인터랙션 흐름
1. `Raycaster`로 hover 감지 → 커서 모양 변경
2. 클릭 → inspect 오버레이 표시 (이름 + 펄스 버튼)
3. 오버레이 클릭 → 해당 경로로 이동
4. ESC → inspect 닫기

---

## 다음 작업: Blender → 사이트 연결

### 왜 Blender인가
현재 Three.js geometry(박스·원기둥 조합)는 사실감에 한계가 있음.  
Blender에서 제작한 모델은 PBR 재질(노멀맵·러프니스맵·AO맵)이 포함된  
**GLB 파일**로 내보내 Three.js에 그대로 로드 가능.

### Blender 작업 요청 사항

모델링할 오브젝트:
- [ ] 책상 (다리·서랍 포함)
- [ ] MacBook (키보드·트랙패드·화면 디테일)
- [ ] 서류철 (종이 삐져나온 구조)
- [ ] 펜던트 램프 (전선·금속 갓·전구)
- [ ] 커피잔

**내보내기 규칙**
- 형식: **GLB** (텍스처 내장)
- 폴리곤: 총합 **50만 이하** 권장
- 재질: **Principled BSDF** (Three.js MeshStandardMaterial 호환)
- 오브젝트 이름: 영문 소문자 (`macbook`, `folder`, `lamp`, `desk`, `mug`)
- 원점: 각 오브젝트의 피벗을 바닥 중심으로 설정

### 코드 연결 작업 (GLB 받은 후)

```javascript
// 현재 geometry 코드를 아래로 교체 예정
const loader = new THREE.GLTFLoader();
loader.load('/assets/models/desk-scene.glb', (gltf) => {
    scene.add(gltf.scene);
    // macbook, folder 오브젝트 찾아서 raycaster 연결
});
```

추가로 적용할 것:
- `GLTFLoader` CDN 로드
- 오브젝트별 클릭 감지 재연결
- 기존 조명·카메라·bloom·인스펙트 UI 그대로 유지

---

## 현재 미완성 / 알려진 이슈

- 모바일에서 손전등 CSS 오버레이 비활성화 (의도적)
- 마우스 이동 전 CSS 손전등이 보이지 않도록 초기값 `-999px` 처리됨
- GLB 로드 시 기존 geometry 코드 제거 필요

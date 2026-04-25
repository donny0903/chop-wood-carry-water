# aboutdonny.com — 현재 설계도

> 2026.04 전면 리노베이션을 위한 현행 웹사이트 분석 문서

---

## 1. 기술 스택 & 호스팅

| 항목 | 현재 |
|------|------|
| 프레임워크 | 없음 (순수 HTML/CSS/JS) |
| 호스팅 | GitHub Pages |
| 도메인 | aboutdonny.com (CNAME) |
| 마크다운 렌더링 | marked.js (CDN) |
| 빌드 도구 | 없음 (정적 파일 직접 서빙) |
| 패키지 매니저 | 없음 |

---

## 2. 파일 구조

```
chop-wood-carry-water/
├── index.html              ← 메인 홈
├── about.html              ← 자기소개
├── work.html               ← 경력/프로젝트
├── blog_article.html       ← 블로그 목록 (텍스트)
├── blog_article_post.html  ← 블로그 상세
├── blog_space.html         ← 공간 기록 목록 (카드)
├── blog_space_post.html    ← 공간 기록 상세
├── CNAME
│
├── components/
│   ├── topNavigation.html  ← 상단 내비게이션 (fetch로 삽입)
│   ├── footer.html         ← 푸터 (fetch로 삽입)
│   └── workTabs.html       ← Work Experience / Personal 탭 버튼
│
├── css/
│   ├── font.css            ← @font-face 선언
│   ├── main.css            ← 전역 스타일 + 레이아웃
│   ├── blog.css            ← 블로그 목록/상세 스타일
│   └── fonts/
│       ├── Outfit/         ← 영문 (300~700)
│       ├── Pretendard/     ← 한글 (300~700)
│       └── Libre_Baskerville/ ← 세리프 (400, 현재 미사용)
│
├── js/
│   └── main.js             ← 전체 JS (컴포넌트 로드, 라우팅, 블로그 렌더링)
│
├── blog_article/           ← 블로그 마크다운 + index.json
├── blog_space/             ← 공간 기록 마크다운 + index.json
│
├── img/
│   ├── profile.jpg
│   ├── wood.png
│   ├── projects/           ← work 프리뷰 이미지 (21개)
│   ├── blog_article/       ← 블로그 첨부 이미지
│   ├── blog_space/         ← 공간 기록 첨부 이미지
│   ├── icon/               ← SVG/PNG 아이콘 (link, lock, chevron, divider, SNS 등)
│   └── favicon_package/
│
├── archive/                ← 이전 버전 백업 (1.ko, 2.en)
└── md/                     ← 내부 메모
```

---

## 3. 페이지 구성 & 라우팅

### 3-1. 페이지 목록 (7개)

| 페이지 | 파일 | 역할 |
|--------|------|------|
| **Home** | `index.html` | hero 텍스트 + work 카드 4개 + space 카드 + blog 리스트 |
| **Work** | `work.html` | 경력 아코디언 (탭: Field / Personal) |
| **Space** | `blog_space.html` | 공간 기록 카드 그리드 |
| **Blog** | `blog_article.html` | 블로그 텍스트 리스트 |
| **Space 상세** | `blog_space_post.html` | MD → HTML 렌더링 (slug 파라미터) |
| **Blog 상세** | `blog_article_post.html` | MD → HTML 렌더링 (slug 파라미터) |
| **About** | `about.html` | 프로필 사진 + 한줄 소개 |

### 3-2. 라우팅 방식

- **정적 HTML 파일** 직접 링크 (`work.html`, `about.html` 등)
- 블로그 상세는 **쿼리 파라미터** 방식: `blog_article_post.html?slug=2026_04_09`
- SPA 라우터 없음, 새로고침 시 항상 전체 페이지 리로드

### 3-3. 내비게이션 구조

```
[donny]  ←로고                    [work] [space] [blog] [about]
```

- 로고 클릭 → `index.html`
- 현재 페이지 하이라이트: `nav-item.active` (underline)
- 모바일: 햄버거 메뉴 (bar long + bar short, X 애니메이션)

---

## 4. 디자인 시스템

### 4-1. 컬러 팔레트

```
Grayscale (13단계)
──────────────────
--color-white   #FFFFFF     배경
--color-030     #F5F8FA     
--color-050     #EFF3F5     코드 블록 배경
--color-080     #E4E9ED     탭 배경, 구분선
--color-100     #DAE1E6     border
--color-200     #BEC8CF     blockquote border
--color-250     #B1BDC4
--color-300     #A3AEB5
--color-350     #99A5AD
--color-400     #899449     ⚠️ 오탈자 의심 (올리브톤, 사용처 불분명)
--color-500     #717D85     서브텍스트, 날짜
--color-600     #5C6469     본문 텍스트
--color-700     #434B4F     블로그 본문
--color-800     #292F33     코드 텍스트
--color-900     #12171A     제목, 내비, 최진한 텍스트

Accent
──────
--coral-500     #FF6B4A     링크 컬러 (블로그 본문 내)
```

**특징**: 쿨 그레이 기반, 거의 흑백에 가까운 절제된 팔레트. 유일한 포인트 컬러는 코랄.

### 4-2. 타이포그래피

| 용도 | 폰트 | Weight | 비고 |
|------|------|--------|------|
| **한글 본문** | Pretendard | 300 ~ 700 | 메인 body 폰트 |
| **영문 제목/내비** | Outfit | 300 ~ 700 | 산세리프, 기하학적 |
| **세리프 (미사용)** | Libre Baskerville | 400 | 로드만 하고 적용처 없음 |

**폰트 사이즈 (Desktop)**

| 요소 | 크기 |
|------|------|
| 내비게이션 | 1.7rem |
| 섹션 타이틀 | 2.2rem |
| 카드 타이틀 | 1.5rem |
| 히어로 텍스트 | 1.4rem |
| 본문 | 1.3rem ~ 1.35rem |
| 서브텍스트 | 1.25rem |

### 4-3. 레이아웃

| 속성 | 값 |
|------|-----|
| max-width | 1300px |
| container-padding | 2rem (데스크톱) / 1.25rem (모바일) |
| 네비 높이 | 90px (데스크톱) / 70px (모바일) |
| 반응형 브레이크포인트 | 800px (1개만 사용) |
| 그리드 | 2열 (데스크톱) → 1열 (모바일) |

---

## 5. 주요 컴포넌트 & 인터랙션

### 5-1. 공통 컴포넌트

| 컴포넌트 | 설명 |
|----------|------|
| **topNavigation** | fixed 네비바, backdrop-filter blur, 모바일 햄버거 |
| **footer** | 좌: 저작권, 우: SNS 아이콘 (email, LinkedIn, Instagram) |
| **divider** | 🍂 나뭇잎(?) 이미지 구분선 (divider.png, 80px) |

### 5-2. 페이지별 컴포넌트

| 페이지 | 컴포넌트 | 상세 |
|--------|----------|------|
| **Home** | project-card | 2열 그리드, 이미지(350px) + 제목 + 부제 |
| **Home** | blog-list-item | 제목 + 부제 + 날짜 (리스트 형태) |
| **Work** | work-tabs | Field / Personal 탭 전환 (슬라이드 애니메이션) |
| **Work** | work-item | 아코디언 구조 (chevron 토글) |
| **Work** | project-image-preview | 데스크톱 마우스오버 시 프로젝트 이미지 팝업 (800px, 화면 중앙) |
| **Blog 상세** | blog-post | hero 이미지 + 제목/부제/날짜 + MD 렌더링 본문 |

### 5-3. 인터랙션

| 인터랙션 | 방식 |
|----------|------|
| hover 피드백 | `opacity: 0.7` 또는 `0.8` (거의 모든 클릭 요소) |
| 아코디언 | `max-height` + `opacity` transition (0.4s) |
| 탭 전환 | `translateX(±20px)` 슬라이드 애니메이션 (0.6s) |
| 모바일 메뉴 | bar 회전 X 모양 변환 (0.3s) |
| 이미지 프리뷰 | 마우스 enter/leave 시 fixed overlay (`opacity` 토글) |
| 잠금 콘텐츠 | `href="#_work"` 클릭 시 `alert()` 모달 |

---

## 6. 콘텐츠 관리 시스템

### 6-1. 구조

```
blog_article/
├── index.json        ← 메타데이터 (slug, title, subtitle, thumbnail, tags)
├── 2025_04_24.md
├── 2026_04_02.md
└── 2026_04_09.md

blog_space/
├── index.json
└── 2026_04_03.md
```

### 6-2. 글 작성 프로세스

1. `blog_article/` 또는 `blog_space/`에 마크다운 파일 추가 (`YYYY_MM_DD.md`)
2. `index.json`에 메타데이터 수동 추가
3. 이미지는 `img/blog_article/YYYY_MM_DD/` 폴더에 수동 배치
4. git push → GitHub Pages 자동 배포

### 6-3. 블로그 렌더링

- `marked.js`로 마크다운 → HTML 클라이언트 사이드 변환
- SEO 메타 태그 동적 업데이트 (og:title, og:description, JSON-LD)
- `<hr>` → divider 이미지로 자동 치환
- 링크 자동 `target="_blank"` 처리
- 이미지 그리드 지원: `.img-row-2`, `.img-row-3`, `.img-grid-1-2`

---

## 7. SEO & 메타

| 항목 | 상태 |
|------|------|
| Open Graph | ✅ 모든 페이지 |
| Twitter Card | ✅ |
| JSON-LD (Article) | ✅ 블로그 상세만 |
| canonical URL | ✅ |
| robots meta | ✅ index, follow |
| Content-Security-Policy | ✅ (self + jsdelivr CDN) |
| 다국어 | ❌ 주석 처리됨 (이전 ko/en 구조 archive에 보존) |
| sitemap.xml | ❌ 없음 |
| RSS | ❌ 없음 |

---

## 8. 현재 디자인의 성격

### 톤 & 무드

- **진중하고 절제된** 흑백 톤. 포인트 컬러 거의 없음.
- **전통적 포트폴리오 레이아웃**: 상단 내비 → 콘텐츠 → 푸터의 직선적 흐름
- Jay(jayyoungjun-kim.github.io) 포트폴리오에서 영감받은 정적이고 격식있는 느낌
- "종이에 손으로 글을 쓴 듯한" 아날로그 감성 추구

### 강점

- 콘텐츠 중심의 깔끔한 구조
- 마크다운 기반 블로그로 글쓰기 편의성 확보
- 반응형 지원 (단일 브레이크포인트)
- SEO 기본기 갖춤

### 한계 / 개선 여지

- 모든 인터랙션이 `opacity` 변화에 의존 → 단조로움
- 다크모드 미지원
- 페이지 전환 시 전체 리로드 (SPA 아님)
- 이미지 최적화 없음 (일부 JPEG 8MB급)
- 폰트 로컬 호스팅으로 초기 로딩 무거움 (특히 Pretendard ~10MB)
- `alert()` 모달 → 사용자 경험 낮음
- 컴포넌트 재사용이 fetch 기반이라 SEO 크롤러가 인식 못할 수 있음
- Libre Baskerville 로드만 하고 미사용 (불필요한 리소스)
- `--color-400: #899449` 색상값이 팔레트 흐름과 불일치 (오탈자 가능성)
- archive 폴더에 이전 다국어 버전이 잔존
- `main.css`가 `@import './project-detail.css'`를 참조하지만, 해당 파일은 `css/`에 없고 `archive/`에만 존재 → 404 에러 발생 중
- 루트 HTML들의 경로가 `../css/`, `../img/` 패턴이라, 저장소 루트 = 웹 루트로 열면 경로 어긋남 (배포 구조에 의존적)

---

## 9. 영감 분석

> Andrew Kim(@mnmllymnml)과 Hark(hark.com)에서 받은 자극.
> "지금의 내 블로그가 너무 구닥다리 같다."

---

### 9-1. Andrew Kim / Minimally Minimal

**인물**
- 서울 출생, 밴쿠버 성장. ArtCenter College of Design 졸업.
- 커리어: Microsoft(Xbox One S, HoloLens, Windows 10) → Tesla(Model 3/S/X/Y, Semi) → Apple(HID) → Ford(EV 플랫폼)
- Forbes 30 Under 30 (2014). "The Next Microsoft" 리브랜딩 프로젝트로 대학생 시절 업계 주목.
- 인스타그램 @mnmllymnml, 블로그 minimallyminimal.com (2012~2018, 139개 글, 현재 폐쇄)

**디자인 철학: "I like cold. I like clean. I like space. I like the future."**

| 특징 | 설명 |
|------|------|
| **극단적 여백** | 피사체를 프레임 안에서 작고 오프센터로 배치. 빈 공간이 주인공 |
| **대각선 구도** | 테이블 모서리, 바닥과 벽의 경계를 극단적 각도로 배치해 긴장감 |
| **저대비 톤** | 그림자가 검지 않고, 하이라이트가 순백이 아닌 부드러운 톤 보정 |
| **타이포그래피 디테일** | 디보싱, 정밀한 커닝, 가는 선. "순수한 형태에 흥미를 더하는 방법" |
| **Knolling** | 물건을 90도 각도로 정렬하는 조직법. 이 주제로 e-book '90 Degrees' 출판 |
| **흰색 집착** | 자택이 "본 적 없는 수준의 white room". 2001 스페이스 오디세이 미학 |

**블로그 스타일 요약**
- Squarespace 기반 (당시), 넓은 여백, 대형 고품질 제품 사진 중심
- 텍스트는 최소화, 사진이 90% 이상의 서사를 담당
- 솔직하고 주관적인 제품 리뷰와 디자인 에세이
- 문화, 여행, 서울 가이드 등 라이프스타일 콘텐츠로 확장

---

### 9-2. Hark (hark.com)

**프로젝트**
- Brett Adcock 설립, 개인 자금 $100M 시드
- "세계에서 가장 진보한 개인 지능(Personal Intelligence)" 구축 목표
- AI 모델 + 하드웨어 + 인터페이스를 하나의 시스템으로 설계하는 수직 통합 접근
- Design Director: Abidur Chowdhury (ex-Apple, iPhone Air 리드 디자이너)
- 팀 구성: Apple, Tesla, Meta 출신 45명의 엔지니어 & 디자이너
- 2026 여름 첫 AI 모델 공개 예정

**웹사이트 디자인 특징**

| 특징 | 설명 |
|------|------|
| **내비게이션 없음** | 전통적 메뉴 바 부재. 스크롤이 유일한 탐색 수단 |
| **"Scroll to Explore"** | 첫 화면에서 단일 CTA. 스크롤 자체가 내러티브 장치 |
| **매니페스토 형식** | 제품 설명이 아닌 비전 선언문 형태의 카피. 각 문단이 독립적 호흡 |
| **극도의 텍스트 중심** | 이미지 없음. 타이포그래피와 여백만으로 구성 |
| **미니멀 UI** | 전체 페이지가 텍스트 블록 + 가입 폼 두 요소로만 구성 |
| **톤** | 자신감 있고 철학적. "We are witnessing a worldwide transformation" |

**Hark 웹사이트가 주는 교훈**
- 콘텐츠의 힘이 충분하면 장식이 불필요하다
- 스크롤 기반 내러티브는 전통적 메뉴 구조보다 몰입감이 높다
- "무엇을 하는 회사인가"보다 "무엇을 믿는 회사인가"를 먼저 전달
- 가입 폼 하나가 전체 사이트의 유일한 인터랙션

---

### 9-3. 현재 블로그 vs 영감 소스 — 격차 분석

| 관점 | aboutdonny.com (현재) | Andrew Kim / Hark |
|------|----------------------|-------------------|
| **여백** | 콘텐츠가 레이아웃을 꽉 채움 | 여백이 콘텐츠보다 많음 |
| **인터랙션** | opacity 변화 일변도 | 스크롤 기반 내러티브, 혹은 인터랙션 자체를 제거 |
| **내비게이션** | 전통적 상단 메뉴 4개 | 메뉴 없음 / 최소 |
| **이미지** | 카드 썸네일 위주 | 풀 블리드 고품질 사진 or 이미지 없이 타이포만 |
| **타이포그래피** | 기능적, 읽기 편한 수준 | 그 자체가 시각 언어이자 브랜드 |
| **톤** | 정보 전달 중심 | 선언적, 주관적, 감성적 |
| **기술 스택** | 정적 HTML 수동 관리 | 현대적 프레임워크 or 극도로 단순한 정적 페이지 |
| **색상** | 쿨 그레이 13단계 | 흑/백 2단계, 혹은 대담한 포인트 |

→ 핵심 격차: **"정보를 나열하는 사이트"**에서 **"자기 자신을 표현하는 공간"**으로의 전환이 필요.

---

### 9-4. Soul Searching — 나의 디자인 철학

> **"I like the future, delicacy and sustainability."**

이전의 나: 기록, 여백, 진심, 제약 속 답, 기본 — 표준적이고 안정적인 한국 디자이너의 언어. 나쁘지 않지만, 선언이 아니라 관찰이었다.

---

### 9-5. 매체에 대한 질문

> **"왜 블로그와 포트폴리오는 늘 글이여야만 할까?"**

참고: [Toss Simplicity S4 — When UX Ignores Blind Users](https://toss.im/simplicity/sessions/when-ux-ignores-blind-users)

정보 전달의 위계: **문제 > 영상 > 음성**

- Toss Simplicity 자체가 디자인 컨퍼런스를 글이 아닌 5~6분 숏폼 영상 + 인터랙션으로 전달
- 시각장애인 접근성 세션은 "보는 것"이 기본 전제인 UX에 대한 근본적 질문
- 블로그 = 텍스트라는 관성을 깨는 것도 리노베이션의 고려 대상
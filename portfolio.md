---
layout: portfolio
title: "Who am I"
permalink: /portfolio/
---

# 정철원 <span style="font-weight:400;color:#86868b">Cheolwon Jeong</span>

<div class="subtitle">Creator · AI / LLM Engineer</div>

<div class="field"><span class="k">이름</span><span class="v">정철원 (Cheolwon Jeong)</span></div>
<div class="field"><span class="k">역할</span><span class="v">Creator · AI / LLM Engineer</span></div>
<div class="field"><span class="k">관심 도메인</span><span class="v">AI · 교육 (Education)</span></div>
<div class="field"><span class="k">이메일</span><span class="v"><a href="mailto:{{ site.email }}">{{ site.email }}</a></span></div>
<div class="field"><span class="k">GitHub</span><span class="v"><a href="https://github.com/{{ site.github.username }}" target="_blank">@{{ site.github.username }}</a></span></div>

## About

가슴 뛰는 일을 좇아, 세상에 임팩트를 만드는 **Creator**입니다. 그 방법을 고민하며, AI와 교육은 가장 빠르고 넓게 임팩트를 낼 수 있다고 생각해 두 도메인에 집중해왔습니다.

공군 복무 중에는 LLM 기반 목표 추천 시스템과 이미지 생성 서비스를 End-to-End로 설계·구현했고, 그 이전에는 교육·콘텐츠 도메인에서 LLM 기반 저작 도구와 학습 데이터 구조를 다루며 사용자의 경험에 직접 닿는 가치를 만들어왔습니다.

## Tech Stack

- **Languages** — Python, C, C++
- **Backend** — FastAPI, Celery, RabbitMQ
- **AI / LLM** — LangChain, LangGraph, Agent Design (Knowledge / SQL / Lexical), Prompt Engineering, Context Engineering
- **Model Serving** — vLLM, Ollama
- **Database** — PostgreSQL, pgvector, SQLite
- **Storage** — MinIO
- **Infra** — Docker, Docker Compose
- **Architecture** — Layered Architecture (BFF / API / Worker / Model Server), Webhook-based Async Processing, On-Device System

## Experience

### 공군 지능정보체계관리단 · AI체계개발병
2024.10 – 2026.07

**AirWards — AI 이미지 생성 기능 개발** (Image Generate / Edit / Remove Background)

- 이미지 생성·편집·배경 제거에 대한 엔드투엔드 백엔드 처리 파이프라인을 설계·구현
- Webhook 통신 기반 레이어드 아키텍처(BFF → API → Worker → Model Server)로 요청 처리·비동기 작업·모델 실행을 분리해 운영 효율성 확보
- Celery + RabbitMQ 기반 큐잉 구조 구성, MinIO Storage 연계로 비동기 처리 안정성 강화

**목표관리체계 — AI Backend 개발** (Air-gapped 단독망 환경)

- 외부 패키지 저장소·LLM API는 물론 군 내부망 자원조차 접근 불가한 환경에서, 로컬 LLM(vLLM·Ollama) 기반 On-Device 추론 시스템을 직접 구축해 보안·망분리 요구사항 충족
- LangGraph 기반 상태 워크플로우로 목표 추천 파이프라인을 설계, 검색·추론·검증 단계를 명시적 상태 전이로 분리해 디버깅·확장이 용이한 구조 마련
- SQL Agent + Lexical Agent의 Hybrid 검색으로 정형 데이터 조회와 비정형 텍스트 검색을 통합, Self-Correction(Relevancy Check)으로 추천 정확도 향상

### 청년교육사회적협동조합 씨드콥 · Research Engineer
2024.03 – 2024.10

**펄어비스 해커톤 '딩가딩' — 게임 엔진 모듈 및 교육 커리큘럼 개발**

- BuildBox 엔진의 빌딩 블록을 사용 빈도·개념 난이도 기준으로 재분류하고 한글 도메인 용어로 매핑한 학습용 블록 셋 설계·구현
- 단일 블록 → 복합 블록 → 커스텀 로직으로 점진적 확장이 가능한 사용 경로 확보, 블록 셋에 정렬된 모듈형 커리큘럼 설계

**국인(Gukin) 글로벌 멘토링 'DecideX' — LLM 게임 생성 엔진 개발**

- LLM 생성 스토리를 노드로 정의하고 노드 간 선택지를 연결해 분기형 스토리 그래프를 구성하는 블록 기반 웹 엔진 설계·구현
- 프롬프트 템플릿화·컨텍스트 주입·일관성 검증(Consistency Check)으로 독립 생성 노드 간 서사·톤·설정 일관성 유지
- 그래프 편집·노드 미리보기·플레이 시뮬레이션을 단일 웹 인터페이스로 통합, 비개발자도 분기형 어드벤처 게임을 직접 제작·배포 가능하도록 함

### 매스프래소 (Mathpresso) · Content Assistant
2023.11 – 2024.02

**K-12 수학 지식 구조(Knowledge Structure) 최적화**

- K-12 수학 교육과정의 단원·성취기준·문항 데이터를 정형화해 Knowledge Structure를 설계, 문항별 난이도·서술 패턴 분석을 그래프 속성에 반영해 추천·진단 파이프라인 기반 데이터 최적화
- 단원 간 선후행 위계와 개념 의존성을 반영한 온톨로지 스키마 설계, 문항–개념–단원 매핑 규칙 정립으로 학습 경로 추천에 활용 가능한 구조 정제

### 청년교육사회적협동조합 씨드콥 · Research Engineer
2022.10 – 2023.06

**'신세계I&C와 함께하는 리테일테크 코딩교실' — AI/SW 커리큘럼 설계 및 집필**

- 리테일 도메인 사례(POS·재고·고객 분석 등)를 학습 시나리오로 재구성한 PBL 기반 커리큘럼 설계·집필
- Python 기초 → 데이터 처리 → ML 모델 적용으로 이어지는 스캐폴딩 구조의 학습 모듈 구성

## Education

<div class="field"><span class="k">한국교원대학교</span><span class="v">컴퓨터교육과 · 2022.03 ~ 재학</span></div>

## Contact

협업이나 문의는 <a href="mailto:{{ site.email }}">{{ site.email }}</a> 로 부탁드립니다.

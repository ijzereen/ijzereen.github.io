---
---
/* 홈 — 부제를 타이핑해 "편집 중인 Pages 문서" 느낌을 살린다. */
(function () {
    const sub   = document.querySelector('.doc-sub');
    const nav   = document.querySelector('.doc-nav');
    const caret = document.querySelector('.caret');
    if (!sub) return;

    const text   = sub.getAttribute('data-type') || '';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function reveal() {
        if (nav)   nav.classList.add('show');
        if (caret) caret.classList.add('show');
    }

    /* 모션 최소화 환경 — 즉시 표시 */
    if (reduce) {
        sub.textContent = text;
        reveal();
        return;
    }

    /* 한 글자씩 타이핑 → 끝나면 본문(네비)·커서 등장 */
    sub.classList.add('typing');
    let i = 0;
    function step() {
        sub.textContent = text.slice(0, i);
        if (i < text.length) {
            i++;
            setTimeout(step, 52 + Math.random() * 46);
        } else {
            sub.classList.remove('typing');
            setTimeout(reveal, 260);
        }
    }
    setTimeout(step, 520);
})();

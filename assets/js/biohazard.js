---
---
(function () {
    const root = document.documentElement;
    const cursor = document.querySelector('.cursor');
    const inspect = document.getElementById('inspect');
    const stage = document.getElementById('inspectStage');
    const nameEl = document.getElementById('inspectName');
    const descEl = document.getElementById('inspectDesc');
    const objs = document.querySelectorAll('.obj');

    let current = null;

    function onMove(e) {
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        root.style.setProperty('--mx', x + 'px');
        root.style.setProperty('--my', y + 'px');
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });

    objs.forEach(o => {
        o.addEventListener('mouseenter', () => {
            cursor && cursor.classList.add('over-obj');
        });
        o.addEventListener('mouseleave', () => {
            cursor && cursor.classList.remove('over-obj');
        });
        o.addEventListener('click', (e) => {
            e.stopPropagation();
            openInspect(o);
        });
    });

    function openInspect(obj) {
        current = obj;
        stage.innerHTML = '';
        const clone = obj.cloneNode(true);
        clone.classList.remove('obj');
        clone.classList.add('obj-clone');
        clone.style.position = 'static';
        clone.style.transform = '';
        const lbl = clone.querySelector('.label');
        if (lbl) lbl.remove();
        stage.appendChild(clone);

        nameEl.textContent = obj.dataset.name || '';
        descEl.textContent = obj.dataset.desc || '';
        inspect.classList.add('active');
    }

    function closeInspect() {
        inspect.classList.remove('active');
        stage.innerHTML = '';
        current = null;
    }

    inspect.addEventListener('click', () => {
        if (current && current.dataset.target) {
            window.location.href = current.dataset.target;
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeInspect();
    });
})();

/* eslint-disable */
// Two icon sets + window chrome + dock + top bar + mobile shell.
// PIXEL_ICONS: 13×13 SVG grids with shape-rendering: crispEdges.
// MODERN_ICONS: clean 24×24 SVG geometry using palette CSS vars.
// The exported ICONS map switches between them via DesignContext.

// ── Pixel icon factory ──────────────────────────────────────────────────────
function makeIcon(rows, palette, size = 44) {
  const w = rows[0].length;
  const h = rows.length;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${w} ${h}`}>
      {rows.flatMap((row, y) =>
        row.split('').map((ch, x) =>
          palette[ch]
            ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={palette[ch]} />
            : null
        )
      )}
    </svg>
  );
}

const PIXEL_ICONS = {
  // ── Folder ────────────────────────────────────────────────
  folder: () => makeIcon([
    '.............',
    '...####......',
    '..#YYYY#.....',
    '.############',
    '.#YYYYYYYYYY#',
    '.#YYYYYYYYYY#',
    '.#YYYYYYYYYY#',
    '.#yyyyyyyyyy#',
    '.#yyyyyyyyyy#',
    '.############',
    '.............',
    '.............',
    '.............',
  ], { '#': '#1c1410', Y: '#e8b04a', y: '#c08a30' }),

  // ── File / document ───────────────────────────────────────
  file: () => makeIcon([
    '.##########..',
    '.#........#..',
    '.#.######.#..',
    '.#........#..',
    '.#.######.#..',
    '.#........#..',
    '.#.####...#..',
    '.#........#..',
    '.#.######.#..',
    '.#........#..',
    '.#.####...#..',
    '.##########..',
    '.............',
  ], { '#': '#1c1410', '.': null }),

  // ── README ────────────────────────────────────────────────
  readme: () => makeIcon([
    '.##########..',
    '.#........#..',
    '.#.RRRRRR.#..',
    '.#........#..',
    '.#.RRRR...#..',
    '.#........#..',
    '.#.######.#..',
    '.#.######.#..',
    '.#.######.#..',
    '.#........#..',
    '.#.####...#..',
    '.##########..',
    '.............',
  ], { '#': '#1c1410', R: '#d97757' }),

  // ── Avatar / about ────────────────────────────────────────
  avatar: () => makeIcon([
    '....HHHHH....',
    '...HHHHHHH...',
    '..HHsssssH...',
    '..HsssssssH..',
    '..Hs#ss#ss#..',
    '..Hssssssss..',
    '..Hsss#ssss..',
    '...Hs####s...',
    '..AAAAAAAAA..',
    '.AAAAAAAAAAA.',
    '.AAAAAAAAAAA.',
    '.AAAAAAAAAAA.',
    '.............',
  ], { H: '#3a2418', s: '#e8c89a', '#': '#1c1410', A: '#d97757' }),

  // ── Resume / clipboard ────────────────────────────────────
  resume: () => makeIcon([
    '....####.....',
    '...#aaaa#....',
    '.##########..',
    '.#aa####aa#..',
    '.#........#..',
    '.#.######.#..',
    '.#.######.#..',
    '.#........#..',
    '.#.####...#..',
    '.#........#..',
    '.#.######.#..',
    '.##########..',
    '.............',
  ], { '#': '#1c1410', a: '#d97757' }),

  // ── Mail / contact ────────────────────────────────────────
  mail: () => makeIcon([
    '.............',
    '.###########.',
    '.#aaa###aaa#.',
    '.#aa#####aa#.',
    '.#a#######a#.',
    '.##########.#',
    '.#.........#.',
    '.#.........#.',
    '.#.........#.',
    '.#.........#.',
    '.###########.',
    '.............',
    '.............',
  ], { '#': '#1c1410', a: '#d97757' }),

  // ── Github / cat-in-box ───────────────────────────────────
  github: () => makeIcon([
    '...#####.....',
    '..#######....',
    '.#KK###KK#...',
    '.#KKKKKKK#...',
    '.#K##K##K#...',
    '.#K#K#K#K#...',
    '.##KKKKK##...',
    '..K######K...',
    '..K#KKK#K....',
    '...K###K.....',
    '..KK###KK....',
    '..KK###KK....',
    '.............',
  ], { '#': '#1c1410', K: '#3a2418' }),

  // ── Trash ─────────────────────────────────────────────────
  trash: () => makeIcon([
    '.............',
    '...#####.....',
    '.###########.',
    '.#.........#.',
    '..#.#.#.#.#..',
    '..#.#.#.#.#..',
    '..#.#.#.#.#..',
    '..#.#.#.#.#..',
    '..#.#.#.#.#..',
    '..#.#.#.#.#..',
    '...#######...',
    '....#####....',
    '.............',
  ], { '#': '#1c1410' }),

  // ── Notes / pencil ────────────────────────────────────────
  notes: () => makeIcon([
    '.........###.',
    '........#aa#.',
    '.......#aaa#.',
    '......#aaa#..',
    '.....#aaa#...',
    '....#aaa#....',
    '...#aaa#.....',
    '..#aaa#......',
    '.#aaa#.......',
    '.#aa#........',
    '.##.#........',
    '.#..#........',
    '.............',
  ], { '#': '#1c1410', a: '#e8b04a' }),

  // ── Terminal ──────────────────────────────────────────────
  terminal: () => makeIcon([
    '.###########.',
    '.#KKKKKKKKK#.',
    '.#KKKKKKKKK#.',
    '.#K.......K#.',
    '.#K.>_....K#.',
    '.#K.......K#.',
    '.#K.aaaa..K#.',
    '.#K.......K#.',
    '.#K.aa....K#.',
    '.#K.......K#.',
    '.#KKKKKKKKK#.',
    '.###########.',
    '.............',
  ], { '#': '#1c1410', K: '#1a1410', a: '#b6e26b' }),
};

// ── Modern icon set ─────────────────────────────────────────────────────────
// Clean 24×24 line-and-fill SVGs. Use palette CSS vars so themes carry
// through. Same keys as PIXEL_ICONS so call sites are unchanged.
const MODERN_SVG_PROPS = {
  width: 44, height: 44, viewBox: '0 0 24 24', fill: 'none',
  strokeLinecap: 'round', strokeLinejoin: 'round',
};
const MODERN_ICONS = {
  folder: () => (
    <svg {...MODERN_SVG_PROPS}>
      <path d="M3 7a2 2 0 0 1 2-2h3.5l2 2h8.5a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
            fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.5" />
    </svg>
  ),
  file: () => (
    <svg {...MODERN_SVG_PROPS}>
      <path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
            fill="var(--chrome)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M14 3v4h4" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="8" y1="12" x2="15" y2="12" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="8" y1="15" x2="15" y2="15" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="8" y1="18" x2="12" y2="18" stroke="var(--ink)" strokeWidth="1.5" />
    </svg>
  ),
  readme: () => (
    <svg {...MODERN_SVG_PROPS}>
      <path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
            fill="var(--chrome)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M14 3v4h4" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="8" y="11" width="7" height="2" rx="0.5" fill="var(--accent)" />
      <line x1="8" y1="16" x2="15" y2="16" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="8" y1="19" x2="12" y2="19" stroke="var(--ink)" strokeWidth="1.5" />
    </svg>
  ),
  avatar: () => (
    <svg {...MODERN_SVG_PROPS}>
      <circle cx="12" cy="9" r="4" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"
            fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.5" />
    </svg>
  ),
  resume: () => (
    <svg {...MODERN_SVG_PROPS}>
      <rect x="5" y="4" width="14" height="17" rx="1.5"
            fill="var(--chrome)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="9" y="2.5" width="6" height="3" rx="0.5"
            fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="8" y1="11" x2="16" y2="11" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="8" y1="14" x2="16" y2="14" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="8" y1="17" x2="13" y2="17" stroke="var(--ink)" strokeWidth="1.5" />
    </svg>
  ),
  mail: () => (
    <svg {...MODERN_SVG_PROPS}>
      <rect x="3" y="6" width="18" height="13" rx="1.5"
            fill="var(--chrome)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M3.5 7l8.5 6 8.5-6" stroke="var(--ink)" strokeWidth="1.5" />
    </svg>
  ),
  github: () => (
    <svg {...MODERN_SVG_PROPS}>
      <polyline points="9 7 5 12 9 17" stroke="var(--ink)" strokeWidth="2" />
      <polyline points="15 7 19 12 15 17" stroke="var(--ink)" strokeWidth="2" />
      <line x1="13.5" y1="6" x2="10.5" y2="18" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  ),
  trash: () => (
    <svg {...MODERN_SVG_PROPS}>
      <path d="M5 7h14" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"
            stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M6.5 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7"
            fill="var(--chrome)" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="10" y1="11" x2="10" y2="17" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="14" y1="11" x2="14" y2="17" stroke="var(--ink)" strokeWidth="1.5" />
    </svg>
  ),
  notes: () => (
    <svg {...MODERN_SVG_PROPS}>
      <path d="M16 3l5 5-13 13H3v-5L16 3z"
            fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M14 5l5 5" stroke="var(--ink)" strokeWidth="1.5" />
    </svg>
  ),
  terminal: () => (
    <svg {...MODERN_SVG_PROPS}>
      <rect x="3" y="4" width="18" height="16" rx="1.5"
            fill="var(--titlebar)" stroke="var(--ink)" strokeWidth="1.5" />
      <polyline points="7 10 10 12 7 14" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="12" y1="14" x2="16" y2="14" stroke="var(--accent)" strokeWidth="1.5" />
    </svg>
  ),
};

// ── Switching ICONS map ─────────────────────────────────────────────────────
// Each entry is a function component that picks the right set at render time
// via DesignContext. Call sites stay the same: React.createElement(ICONS[name]).
const ICONS = Object.fromEntries(
  Object.keys(PIXEL_ICONS).map((name) => [name, function ThemedIcon() {
    const mode = useDesignMode();
    const set = mode === 'modern' ? MODERN_ICONS : PIXEL_ICONS;
    return (set[name] || set.file)();
  }])
);

// ── Window ──────────────────────────────────────────────────────────────────
function Win({ win, onClose, onMinimize, onFocus, onMove, onResize, active }) {
  const dragRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);

  const onTitleDown = (e) => {
    if (e.target.closest('.win-controls')) return;
    onFocus();
    const startX = e.clientX, startY = e.clientY;
    const x0 = win.x, y0 = win.y;
    setDragging(true);
    const move = (ev) => {
      onMove(win.id, x0 + (ev.clientX - startX), y0 + (ev.clientY - startY));
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const onResizeDown = (e) => {
    e.stopPropagation();
    onFocus();
    const startX = e.clientX, startY = e.clientY;
    const w0 = win.w, h0 = win.h;
    const move = (ev) => {
      onResize(win.id,
        Math.max(320, w0 + (ev.clientX - startX)),
        Math.max(220, h0 + (ev.clientY - startY)));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <div
      ref={dragRef}
      className={`win${dragging ? ' is-dragging' : ''}`}
      style={{
        left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z,
        display: win.minimized ? 'none' : 'flex',
      }}
      onMouseDown={onFocus}
    >
      <div className={`win-titlebar${active ? ' active' : ''}`} onPointerDown={onTitleDown}>
        <div className="win-controls">
          <button className="win-btn close" onClick={(e) => { e.stopPropagation(); onClose(win.id); }} title="Close">×</button>
          <button className="win-btn" onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }} title="Minimize">_</button>
        </div>
        <div className="title">{win.title}</div>
        <div className="win-controls" style={{ visibility: 'hidden' }}>
          <button className="win-btn">×</button>
          <button className="win-btn">_</button>
        </div>
      </div>
      <div className="win-body">
        {win.render()}
      </div>
      <div className="win-resize" onPointerDown={onResizeDown} />
    </div>
  );
}

// ── Top bar ─────────────────────────────────────────────────────────────────
function TopBar({ activeTitle, lang = 'en', onCycleLang }) {
  const [now, setNow] = React.useState(() => new Date());
  const [tweaksOpen, setTweaksOpen] = React.useState(false);
  const t = useT();
  React.useEffect(() => {
    const tm = setInterval(() => setNow(new Date()), 30 * 1000);
    return () => clearInterval(tm);
  }, []);
  React.useEffect(() => {
    const onMsg = (e) => {
      const ty = e?.data?.type;
      if (ty === '__activate_edit_mode') setTweaksOpen(true);
      else if (ty === '__deactivate_edit_mode' || ty === '__edit_mode_dismissed') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const fmt = now.toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: lang !== 'ko',
  }).toUpperCase();

  const toggleTweaks = () => {
    window.postMessage({ type: tweaksOpen ? '__deactivate_edit_mode' : '__activate_edit_mode' }, '*');
  };

  return (
    <div className="topbar">
      <div className="topbar-logo">
        <span className="glyph" />
        <span>PIXEL/OS v0.9</span>
      </div>
      <div className="topbar-menus">
        <div className="topbar-menu">{activeTitle || t('topbar.desktop')}</div>
        <div className="topbar-menu">{t('topbar.file')}</div>
        <div className="topbar-menu">{t('topbar.view')}</div>
        <div className="topbar-menu">{t('topbar.help')}</div>
      </div>
      <div className="topbar-tray">
        <span className="pill">WIFI ✓</span>
        <span className="pill">BAT 87%</span>
        <span>{fmt}</span>
        <button className="topbar-lang" onClick={onCycleLang}
                title={t('topbar.lang.tip')} aria-label={t('topbar.lang.tip')}>
          {lang === 'ko' ? '한' : 'A'}
        </button>
        <button className="topbar-tweaks" onClick={toggleTweaks} aria-pressed={tweaksOpen} title="Tweaks">{t('topbar.tweaks')}</button>
      </div>
    </div>
  );
}

// ── Dock ────────────────────────────────────────────────────────────────────
function Dock({ items, position, openIds, onLaunch }) {
  const t = useT();
  return (
    <div className={`dock ${position}`}>
      {items.map((it, i) => {
        if (it.divider) return <span key={`d-${i}`} className="dock-divider" />;
        const label = it.labelKey ? t(it.labelKey) : it.label;
        return (
          <button key={it.id} className="dock-item"
                  onClick={() => onLaunch(it.id)}
                  title={label}>
            {React.createElement(ICONS[it.icon] || ICONS.file)}
            {openIds.includes(it.id) && <span className="running-dot" />}
            <span className="tip">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Desktop Icons ───────────────────────────────────────────────────────────
function DesktopIcon({ icon, label, selected, onSelect, onOpen }) {
  return (
    <div
      className={`desktop-icon${selected ? ' selected' : ''}`}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      onDoubleClick={onOpen}
    >
      <div className="icon-art">{React.createElement(ICONS[icon] || ICONS.file)}</div>
      <div className="icon-label">{label}</div>
    </div>
  );
}

// ── Mobile (Win8) tile shell ────────────────────────────────────────────────
// Replaces the desktop+dock when viewport ≤768px. Tiles are big, flat,
// solid color blocks sized 'sm' (1×1), 'wide' (2×1), 'lg' (2×2). Tap a
// tile to push a fullscreen page; back arrow returns to the start screen.
function MobileShell({ tiles, apps, openId, onLaunch, onClose }) {
  const t = useT();
  const open = openId ? apps[openId] : null;

  if (open) {
    return (
      <div className="m-page">
        <div className="m-page-bar">
          <button className="m-back" onClick={onClose} aria-label="Back">←</button>
          <span className="m-page-title">{open.title}</span>
        </div>
        <div className="m-page-body">{open.render()}</div>
      </div>
    );
  }

  return (
    <div className="m-shell">
      <div className="m-greet">
        <h1>portfolio</h1>
        <span className="m-greet-sub">{t('topbar.lang.tip') === '언어' ? '타일을 눌러서 열기' : 'tap a tile to open'}</span>
      </div>
      <div className="m-tiles">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            className={`m-tile m-tile-${tile.size || 'sm'}`}
            style={{ background: tile.bg, color: tile.fg }}
            onClick={() => onLaunch(tile.id)}
          >
            <span className="m-tile-icon">
              {React.createElement(ICONS[tile.icon] || ICONS.file)}
            </span>
            <span className="m-tile-label">{t(tile.labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Win, TopBar, Dock, DesktopIcon, MobileShell, ICONS, PIXEL_ICONS, MODERN_ICONS });

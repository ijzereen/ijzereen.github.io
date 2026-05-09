/* eslint-disable */
// Pixel-art icons + window chrome + dock + top bar
// Icons are simple 11×11 SVG grids. shape-rendering: crispEdges keeps them sharp.

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

const ICONS = {
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

Object.assign(window, { Win, TopBar, Dock, DesktopIcon, MobileShell, ICONS });

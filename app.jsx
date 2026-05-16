/* eslint-disable */
// Main App — wires desktop, top bar, dock, window manager, tweaks.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#9a7a5a", "#f7eedc", "#3a1f10", "#c45e3a"],
  "dockPos": "bottom",
  "showDesktopIcons": true,
  "boot": true,
  "designMode": "pixel",
  "lang": "ko",
  "crt": true,
  "scanlines": 0,
  "glow": true,
  "noise": false,
  "flicker": false,
  "wallpaper": "image"
}/*EDITMODE-END*/;

// Curated palettes: [bg, chrome, titlebar, accent]
const PALETTES = [
  ["#4a6557", "#f0e6d2", "#2a1e18", "#d97757"], // Forest Cream
  ["#6b4f6b", "#ebe4d4", "#2a1e2a", "#a8c090"], // Plum Sage
  ["#3f4670", "#f1e9d9", "#161827", "#e8b04a"], // Indigo Gold
  ["#9a7a5a", "#f7eedc", "#3a1f10", "#c45e3a"], // Sand Espresso
  ["#2a3542", "#dde2d6", "#0f141a", "#7ec0a8"], // Slate Mint
  ["#1f2937", "#e5e7eb", "#0b1220", "#22d3ee"], // Cyber Cyan (dark + neon)
  ["#0d1b2a", "#f4f1de", "#020617", "#e63946"], // Crimson Ink (deep navy + red)
  ["#7e1c45", "#fce4ec", "#3a0a23", "#ffb703"], // Berry Honey
  ["#264653", "#fefae0", "#0d1b1e", "#f4a261"], // Teal Amber
  ["#283618", "#fefae0", "#1a2010", "#bc6c25"], // Olive Rust
  ["#e9c46a", "#fff5e1", "#3d2914", "#264653"], // Mustard Pop (light bg)
  ["#f6bd60", "#fff8ed", "#3a2e1f", "#84a59d"], // Cream Mint (warm light)
  ["#1a1a1a", "#f0f0f0", "#000000", "#ff006e"], // Mono Pop (B&W + magenta)
  ["#0f3460", "#e8e8e8", "#0a1f3a", "#e94560"], // Mid-Night Rose
  ["#5e503f", "#eae0d5", "#22181c", "#c6ac8f"], // Latte
  // ── Retro / CRT-friendly palettes ──────────────────────────────────────
  ["#0f380f", "#9bbc0f", "#0f380f", "#306230"], // Game Boy
  ["#352879", "#a8b0fc", "#1d1655", "#fce8a1"], // C64
  ["#1a0e00", "#ffb86b", "#0a0500", "#ff8c00"], // Amber CRT
  ["#001a00", "#9fffb8", "#000a00", "#33ff99"], // Green Phosphor
  ["#1a0033", "#ff6ec7", "#0a001a", "#00f0ff"], // Synthwave
  ["#2b2b2b", "#f4d35e", "#0d0d0d", "#ee4266"], // Arcade
];

const APPS = {
  about:    { id: 'about',    title: 'about.app',     icon: 'avatar',   render: () => <AboutPage />,   w: 560, h: 520 },
  resume:   { id: 'resume',   title: 'resume.app',    icon: 'resume',   render: () => <ResumePage />,  w: 560, h: 580 },
  contact:  { id: 'contact',  title: 'contact.app',   icon: 'mail',     render: () => <ContactPage />, w: 520, h: 600 },
  github:   { id: 'github',   title: 'github.app',    icon: 'github',   render: () => <GithubPage />,  w: 600, h: 580 },
  readme:   { id: 'readme',   title: 'README.md',     icon: 'readme',   render: () => <ReadmePage />,  w: 480, h: 480 },
  notes:    { id: 'notes',    title: 'notes.txt',     icon: 'notes',    render: () => <NotesPage />,   w: 460, h: 440 },
  trash:    { id: 'trash',    title: '~/.trash',      icon: 'trash',    render: () => <TrashPage />,   w: 420, h: 320 },
  terminal: { id: 'terminal', title: 'terminal',      icon: 'terminal', render: () => <AboutPage />,   w: 560, h: 520 }, // reuses about for now

  // Post-category folder windows — derived from CONFIG so adding a
  // category in config.jsx auto-registers an app + desktop icon.
  ...Object.fromEntries(CONFIG.posts.categories.map((c) => [
    `post-${c.id}`,
    {
      id: `post-${c.id}`,
      title: `${c.folder}/`,
      icon: c.icon,
      render: () => <FolderPage categoryId={c.id} />,
      w: 480, h: 480,
    },
  ])),

  // Per-post viewer windows — one per item in each category. Opened from
  // FolderPage (markdown) or GalleryPage (image) when a user clicks an item.
  ...Object.fromEntries(
    CONFIG.posts.categories.flatMap((c) =>
      (c.items || [])
        .filter((item) => item.file)
        .map((item) => {
          const isImage = /\.(jpe?g|png|gif|webp|svg|avif)$/i.test(item.file);
          return [
            `post-${c.id}-${item.id}`,
            {
              id: `post-${c.id}-${item.id}`,
              title: `${c.folder}/${item.file}`,
              icon: 'file',
              render: () => isImage
                ? <ImagePage  basePath={CONFIG.posts.basePath} folder={c.folder} file={item.file} />
                : <PostPage   basePath={CONFIG.posts.basePath} folder={c.folder} file={item.file} />,
              w: isImage ? 640 : 720,
              h: isImage ? 640 : 600,
            },
          ];
        })
    )
  ),
};

const DOCK_ITEMS = [
  { id: 'about',   labelKey: 'dock.about',   icon: 'avatar' },
  { id: 'resume',  labelKey: 'dock.resume',  icon: 'resume' },
  { id: 'contact', labelKey: 'dock.contact', icon: 'mail' },
  { id: 'github',  labelKey: 'dock.github',  icon: 'github' },
  { divider: true },
  { id: 'readme',  labelKey: 'dock.readme',  icon: 'readme' },
  { id: 'trash',   labelKey: 'dock.trash',   icon: 'trash' },
];

// Desktop is now driven by CONFIG.posts.categories — each Post/* folder
// becomes a desktop folder icon. Edit config.jsx to add/rename/reorder.
const DESKTOP_FILES = CONFIG.posts.categories.map((c) => ({
  id: `post-${c.id}`,
  icon: c.icon,
  label: c.label,           // {en, ko} — DesktopIcon localizes
}));

// Mobile (Win8) tile layout — palette-aware bg/fg so themes carry through.
const MOBILE_TILES = [
  { id: 'about',   labelKey: 'dock.about',   icon: 'avatar', size: 'lg',   bg: 'var(--accent)',   fg: 'var(--accent-ink)' },
  { id: 'resume',  labelKey: 'dock.resume',  icon: 'resume', size: 'sm',   bg: 'var(--titlebar)', fg: 'var(--chrome)'     },
  { id: 'contact', labelKey: 'dock.contact', icon: 'mail',   size: 'sm',   bg: 'var(--ink-soft)', fg: 'var(--chrome)'     },
  { id: 'github',  labelKey: 'dock.github',  icon: 'github', size: 'wide', bg: 'var(--titlebar)', fg: 'var(--chrome)'     },
  { id: 'readme',  labelKey: 'dock.readme',  icon: 'readme', size: 'sm',   bg: 'var(--accent)',   fg: 'var(--accent-ink)' },
  { id: 'notes',   labelKey: 'dock.readme',  icon: 'notes',  size: 'sm',   bg: 'var(--chrome-2)', fg: 'var(--ink)'        },
  { id: 'trash',   labelKey: 'dock.trash',   icon: 'trash',  size: 'wide', bg: 'var(--ink-soft)', fg: 'var(--chrome)'     },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [windows, setWindows] = React.useState([]);
  const [zCounter, setZCounter] = React.useState(10);
  const [activeId, setActiveId] = React.useState(null);
  const [selectedIcon, setSelectedIcon] = React.useState(null);
  const [booting, setBooting] = React.useState(t.boot && CONFIG.features.showBootSplash);
  const [isMobile, setIsMobile] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );
  const [mobileOpen, setMobileOpen] = React.useState(null);

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const onChange = (e) => setIsMobile(e.matches);
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  // CSS variable bindings driven by palette
  React.useEffect(() => {
    const [bg, chrome, titlebar, accent] = t.palette || PALETTES[0];
    const r = document.documentElement.style;
    r.setProperty('--bg', bg);
    r.setProperty('--chrome', chrome);
    r.setProperty('--titlebar', titlebar);
    r.setProperty('--accent', accent);
    // Derive helper colors
    r.setProperty('--titlebar-ink', chrome);
    r.setProperty('--chrome-2', shade(chrome, -0.08));
    r.setProperty('--ink', shade(titlebar, -0.05));
    r.setProperty('--ink-soft', shade(titlebar, 0.18));
    r.setProperty('--accent-ink', isLight(accent) ? '#1c1410' : '#fff8e8');
  }, [t.palette]);

  // Apply design mode (pixel | modern) as a body class
  React.useEffect(() => {
    document.body.classList.remove('mode-pixel', 'mode-modern');
    document.body.classList.add(`mode-${t.designMode || 'pixel'}`);
  }, [t.designMode]);

  // Retro FX: toggle body classes and bind --scanline-alpha for intensity.
  // Scanlines render as a separate overlay (body.scanlines-on::after) so
  // turning the slider to 0 fully removes the layer + its animation while
  // the .crt vignette stays.
  React.useEffect(() => {
    document.body.classList.toggle('crt', !!t.crt);
    document.body.classList.toggle('glow', !!t.glow);
    document.body.classList.toggle('noise', !!t.noise);
    document.body.classList.toggle('flicker', !!t.flicker);
    const intensity = Math.max(0, Math.min(100, Number(t.scanlines) || 0));
    document.body.classList.toggle('scanlines-on', !!t.crt && intensity > 0);
    document.documentElement.style.setProperty('--scanline-alpha', (intensity / 100).toFixed(3));
  }, [t.crt, t.glow, t.noise, t.flicker, t.scanlines]);

  // Apply language to <html lang> + body class for font fallback
  React.useEffect(() => {
    const lang = t.lang || 'en';
    document.documentElement.lang = lang;
    document.body.classList.remove('lang-en', 'lang-ko');
    document.body.classList.add(`lang-${lang}`);
  }, [t.lang]);

  const cycleLang = () => setTweak('lang', (t.lang || 'en') === 'en' ? 'ko' : 'en');

  React.useEffect(() => {
    if (!booting) return;
    const timer = setTimeout(() => setBooting(false), 1500);
    return () => clearTimeout(timer);
  }, [booting]);

  // Keyboard
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedIcon(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Window manager
  const launchRef = React.useRef(null);
  React.useEffect(() => {
    window.__launch = (id) => launchRef.current && launchRef.current(id);
    return () => { delete window.__launch; };
  }, []);

  const launchApp = React.useCallback((appId) => {
    const app = APPS[appId];
    if (!app) return;
    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      // focus + restore
      setWindows((ws) => ws.map((w) =>
        w.id === existing.id ? { ...w, minimized: false, z: zCounter + 1 } : w
      ));
      setZCounter((z) => z + 1);
      setActiveId(existing.id);
      return;
    }
    const id = `win-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    // Cascade-position new windows
    const offset = (windows.length % 6) * 28;
    const x = 120 + offset;
    const y = 70 + offset;
    const newWin = {
      id, appId, title: app.title, render: app.render,
      x, y, w: app.w, h: app.h, z: zCounter + 1, minimized: false,
    };
    setWindows((ws) => [...ws, newWin]);
    setZCounter((z) => z + 1);
    setActiveId(id);
  }, [windows, zCounter]);

  // Keep the window-global launcher pointed at the latest closure.
  launchRef.current = launchApp;

  const closeWin = (id) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
    if (activeId === id) setActiveId(null);
  };
  const minimizeWin = (id) => {
    setWindows((ws) => ws.map((w) => w.id === id ? { ...w, minimized: !w.minimized } : w));
  };
  const focusWin = (id) => {
    if (activeId === id) return;
    setZCounter((z) => z + 1);
    setWindows((ws) => ws.map((w) => w.id === id ? { ...w, z: zCounter + 1 } : w));
    setActiveId(id);
  };
  const moveWin = (id, x, y) => {
    // .desktop is inset 28px from the top so a window's top edge in viewport
    // coords is (28 + win.y). The topbar occupies viewport 0–31 (height 28
    // + 3px pixel border), so the smallest win.y that keeps the titlebar
    // flush below the topbar is 31 − 28 = 3.
    const clampedY = Math.max(3, y);
    setWindows((ws) => ws.map((w) => w.id === id ? { ...w, x, y: clampedY } : w));
  };
  const resizeWin = (id, w, h) => {
    setWindows((ws) => ws.map((win) => win.id === id ? { ...win, w, h } : win));
  };

  const activeTitle = React.useMemo(() => {
    const a = windows.find((w) => w.id === activeId && !w.minimized);
    return a ? a.title.toUpperCase() : null;
  }, [activeId, windows]);

  const openAppIds = React.useMemo(
    () => Array.from(new Set(windows.map((w) => w.appId))),
    [windows]
  );

  return (
    <LangContext.Provider value={t.lang || 'en'}>
      <DesignContext.Provider value={t.designMode || 'pixel'}>
      <div className="wallpaper" onClick={() => setSelectedIcon(null)} />

      <TopBar activeTitle={activeTitle} lang={t.lang || 'en'} onCycleLang={cycleLang} />

      {isMobile ? (
        <MobileShell
          tiles={MOBILE_TILES}
          apps={APPS}
          openId={mobileOpen}
          onLaunch={setMobileOpen}
          onClose={() => setMobileOpen(null)}
        />
      ) : (
        <>
          <div className="desktop" onClick={() => setSelectedIcon(null)}>
            <Wallpaper mode={t.wallpaper || 'none'} />
            {t.showDesktopIcons && (
              <div className="desktop-icons">
                {DESKTOP_FILES.map((f) => (
                  <DesktopIcon
                    key={f.id}
                    icon={f.icon}
                    label={localize(f.label, t.lang || 'en')}
                    selected={selectedIcon === f.id}
                    onSelect={() => setSelectedIcon(f.id)}
                    onOpen={() => launchApp(f.id)}
                  />
                ))}
              </div>
            )}

            {windows.map((w) => (
              <Win
                key={w.id}
                win={w}
                active={activeId === w.id}
                onClose={closeWin}
                onMinimize={minimizeWin}
                onFocus={() => focusWin(w.id)}
                onMove={moveWin}
                onResize={resizeWin}
              />
            ))}
          </div>

          <Dock
            items={DOCK_ITEMS}
            position={t.dockPos}
            openIds={openAppIds}
            onLaunch={launchApp}
          />
        </>
      )}

      {booting && <BootSplash lang={t.lang || 'en'} />}

      {CONFIG.features.showTweaksButton && (
        <TweaksPanel title="Tweaks">
          <TweakSection label="Design">
            <TweakRadio label="Style" value={t.designMode || 'pixel'}
                        options={[{ value: 'pixel', label: 'Pixel' },
                                  { value: 'modern', label: 'Modern' }]}
                        onChange={(v) => setTweak('designMode', v)} />
            <TweakRadio label="Language" value={t.lang || 'en'}
                        options={[{ value: 'en', label: 'English' },
                                  { value: 'ko', label: '한국어' }]}
                        onChange={(v) => setTweak('lang', v)} />
          </TweakSection>
          <TweakSection label="Theme">
            <TweakColor label="Palette" value={t.palette} options={PALETTES}
                        onChange={(v) => setTweak('palette', v)} />
            <TweakRadio label="Wallpaper" value={t.wallpaper || 'image'}
                        options={[{ value: 'image',      label: 'Pixel Wave' },
                                  { value: 'procedural', label: 'Procedural' },
                                  { value: 'none',       label: 'Palette only' }]}
                        onChange={(v) => setTweak('wallpaper', v)} />
          </TweakSection>
          <TweakSection label="Retro FX">
            <TweakToggle label="CRT scanlines + vignette" value={!!t.crt}
                         onChange={(v) => setTweak('crt', v)} />
            <TweakSlider label="Scanline intensity" min={0} max={100} step={1}
                         value={Number(t.scanlines) || 0}
                         onChange={(v) => setTweak('scanlines', v)} />
            <TweakToggle label="Neon glow" value={!!t.glow}
                         onChange={(v) => setTweak('glow', v)} />
            <TweakToggle label="Film grain" value={!!t.noise}
                         onChange={(v) => setTweak('noise', v)} />
            <TweakToggle label="CRT flicker" value={!!t.flicker}
                         onChange={(v) => setTweak('flicker', v)} />
          </TweakSection>
          <TweakSection label="Layout">
            <TweakRadio label="Dock position" value={t.dockPos}
                        options={[{ value: 'bottom', label: 'Bottom' },
                                  { value: 'left', label: 'Left' }]}
                        onChange={(v) => setTweak('dockPos', v)} />
            <TweakToggle label="Desktop icons" value={t.showDesktopIcons}
                         onChange={(v) => setTweak('showDesktopIcons', v)} />
            <TweakToggle label="Boot splash on load" value={t.boot}
                         onChange={(v) => setTweak('boot', v)} />
          </TweakSection>
          <TweakSection label="Apps">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {Object.values(APPS).filter((a) => a.id !== 'terminal').map((a) => (
                <button key={a.id}
                        onClick={() => launchApp(a.id)}
                        style={{
                          padding: '6px 10px', border: '1px solid rgba(0,0,0,.15)',
                          background: 'rgba(255,255,255,.6)', borderRadius: 6,
                          font: '11px ui-sans-serif, system-ui, sans-serif',
                          cursor: 'default',
                        }}>
                  Open {a.id}
                </button>
              ))}
            </div>
          </TweakSection>
        </TweaksPanel>
      )}
      </DesignContext.Provider>
    </LangContext.Provider>
  );
}

function BootSplash({ lang }) {
  const t = (k) => (STRINGS[k] && (STRINGS[k][lang] ?? STRINGS[k].en)) || k;
  return (
    <div className="boot">
      <div style={{ letterSpacing: '0.1em' }}>{CONFIG.os.name} {t('boot.booting')}</div>
      <div className="bar"><i /></div>
      <div style={{ fontSize: 14, opacity: 0.6 }}>{CONFIG.os.version}</div>
    </div>
  );
}

// ── color helpers ───────────────────────────────────────────────────────────
function hexToRgb(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h;
  const n = parseInt(x.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex(r, g, b) {
  const toH = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return '#' + toH(r) + toH(g) + toH(b);
}
function shade(hex, amt) {
  // amt -1..1; positive lightens, negative darkens
  const [r, g, b] = hexToRgb(hex);
  if (amt >= 0) return rgbToHex(r + (255 - r) * amt, g + (255 - g) * amt, b + (255 - b) * amt);
  return rgbToHex(r * (1 + amt), g * (1 + amt), b * (1 + amt));
}
function isLight(hex) {
  const [r, g, b] = hexToRgb(hex);
  return r * 299 + g * 587 + b * 114 > 148000;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

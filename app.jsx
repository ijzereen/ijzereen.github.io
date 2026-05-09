/* eslint-disable */
// Main App — wires desktop, top bar, dock, window manager, tweaks.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#4a6557", "#f0e6d2", "#2a1e18", "#d97757"],
  "dockPos": "bottom",
  "showDesktopIcons": true,
  "boot": true
}/*EDITMODE-END*/;

// Curated palettes: [bg, chrome, titlebar, accent]
const PALETTES = [
  ["#4a6557", "#f0e6d2", "#2a1e18", "#d97757"], // Forest Cream
  ["#6b4f6b", "#ebe4d4", "#2a1e2a", "#a8c090"], // Plum Sage
  ["#3f4670", "#f1e9d9", "#161827", "#e8b04a"], // Indigo Gold
  ["#9a7a5a", "#f7eedc", "#3a1f10", "#c45e3a"], // Sand Espresso
  ["#2a3542", "#dde2d6", "#0f141a", "#7ec0a8"], // Slate Mint
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
};

const DOCK_ITEMS = [
  { id: 'about',   label: 'about',    icon: 'avatar' },
  { id: 'resume',  label: 'résumé',   icon: 'resume' },
  { id: 'contact', label: 'contact',  icon: 'mail' },
  { id: 'github',  label: 'github',   icon: 'github' },
  { divider: true },
  { id: 'readme',  label: 'README',   icon: 'readme' },
  { id: 'trash',   label: 'trash',    icon: 'trash' },
];

const DESKTOP_FILES = [
  { id: 'readme', icon: 'readme', label: 'README.md' },
  { id: 'about',  icon: 'avatar', label: 'about-me' },
  { id: 'notes',  icon: 'notes',  label: 'notes.txt' },
  { id: 'trash',  icon: 'trash',  label: 'trash' },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [windows, setWindows] = React.useState([]);
  const [zCounter, setZCounter] = React.useState(10);
  const [activeId, setActiveId] = React.useState(null);
  const [selectedIcon, setSelectedIcon] = React.useState(null);
  const [booting, setBooting] = React.useState(t.boot);

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
  const launchApp = (appId) => {
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
  };

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
    setWindows((ws) => ws.map((w) => w.id === id ? { ...w, x, y } : w));
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
    <>
      <div className="wallpaper" onClick={() => setSelectedIcon(null)} />

      <TopBar activeTitle={activeTitle} />

      <div className="desktop" onClick={() => setSelectedIcon(null)}>
        {t.showDesktopIcons && (
          <div className="desktop-icons">
            {DESKTOP_FILES.map((f) => (
              <DesktopIcon
                key={f.id}
                icon={f.icon}
                label={f.label}
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

      {booting && (
        <div className="boot">
          <div style={{ letterSpacing: '0.1em' }}>PIXEL/OS booting…</div>
          <div className="bar"><i /></div>
          <div style={{ fontSize: 14, opacity: 0.6 }}>portfolio shell · v0.9</div>
        </div>
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakColor label="Palette" value={t.palette} options={PALETTES}
                      onChange={(v) => setTweak('palette', v)} />
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
    </>
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

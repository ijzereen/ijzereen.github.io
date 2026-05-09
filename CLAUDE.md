# PIXEL/OS Portfolio — Claude facade

Static React 18 + Babel-standalone shell. No build step. Deploys to GitHub Pages.
Read this file first; only open the source files listed below when you actually need their internals.

## Architecture in one sentence

`index.html` boots React + Babel-standalone in the browser, then loads six JSX files in order — `tweaks-panel.jsx` → `config.jsx` → `i18n.jsx` → `pages.jsx` → `chrome.jsx` → `app.jsx` — each attaching its exports to `window` for the next file to consume. `app.jsx` mounts `<App />`.

## File map

| File | Purpose | When to open |
|------|---------|--------------|
| `index.html` | Script tag order + Google Fonts (Pixelify Sans, VT323, Silkscreen, Galmuri11, Noto Sans KR) | Adding a new JSX file or swapping a font |
| `config.jsx` | **Site facade.** `CONFIG` object: OS branding, owner contact, feature flags, post categories. **Edit here first** for any branding / structural change | Renaming the site, swapping owner info, adding a Post category, toggling topbar buttons |
| `app.jsx` | App shell, window manager, palette → CSS-var binding, design/lang/mobile state, Tweaks panel wiring. Defines `TWEAK_DEFAULTS`, `PALETTES`, `APPS`, `DOCK_ITEMS`, `DESKTOP_FILES`, `MOBILE_TILES` (latter two derive from CONFIG) | Wiring a new tweak, page, or palette |
| `chrome.jsx` | `Win`, `TopBar`, `Dock`, `DesktopIcon`, `MobileShell`, and the `ICONS`/`PIXEL_ICONS`/`MODERN_ICONS` maps | Window chrome, topbar, dock, mobile tile shell |
| `pages.jsx` | Page components: `AboutPage`, `ResumePage`, `ContactPage`, `GithubPage`, `ReadmePage`, `NotesPage`, `TrashPage`, `FolderPage` (generic post-category viewer) + `PixelAvatar` | Editing page copy/layout |
| `i18n.jsx` | `STRINGS` dict, `LangContext`, `DesignContext`, `useT()`, `useLang()`, `useDesignMode()` | Adding/changing a translation |
| `tweaks-panel.jsx` | **Vendored design-tool component — do not modify.** Floating tweaks shell + form controls. Listens for `__activate_edit_mode` postMessage | Almost never |
| `styles.css` | Pixel design system + `body.mode-modern` overrides + `body.lang-ko` font fallback + `.m-*` mobile tile styles | Visual changes |

## Key globals (attached to `window` by the JSX files)

**From `config.jsx`:** `CONFIG` (the facade — read it from anywhere; never deep-clone), `localize(value, lang)` resolves `{en, ko}` maps or passes strings through.

**From `tweaks-panel.jsx`:** `useTweaks`, `TweaksPanel`, `TweakSection`, `TweakRow`, `TweakSlider`, `TweakToggle`, `TweakRadio`, `TweakSelect`, `TweakText`, `TweakNumber`, `TweakColor`, `TweakButton`

**From `i18n.jsx`:** `STRINGS` (key → `{en, ko}`), `LangContext`, `DesignContext`, `useT()` returns `(key) => string`, `useLang()` returns `'en' | 'ko'`, `useDesignMode()` returns `'pixel' | 'modern'`

**From `chrome.jsx`:** `Win`, `TopBar`, `Dock`, `DesktopIcon`, `MobileShell`, `ICONS`, `PIXEL_ICONS`, `MODERN_ICONS` — keys: `folder | file | readme | avatar | resume | mail | github | trash | notes | terminal`. `ICONS[name]` is a `ThemedIcon` component that picks the right set via `useDesignMode()` at render time, so call sites never need to know which mode is active.

**From `pages.jsx`:** all page components + `PixelAvatar`, `ContactCard`, `Repo`

## Tweak shape (`TWEAK_DEFAULTS` in app.jsx:4)

```js
{
  palette: [bg, chrome, titlebar, accent],  // hex tuple from PALETTES
  dockPos: 'bottom' | 'left',
  showDesktopIcons: boolean,
  boot: boolean,                             // splash on load
  designMode: 'pixel' | 'modern',            // → body.mode-{designMode}
  lang: 'en' | 'ko',                         // → body.lang-{lang} + html[lang]
}
```

`useTweaks(defaults)` returns `[t, setTweak]`. Both `setTweak('key', val)` and `setTweak({k1: v1, k2: v2})` work.

## Palette → CSS vars (app.jsx ~70)

The 4-color palette tuple is exploded into CSS custom properties on `:root`:
- `--bg, --chrome, --titlebar, --accent` — direct
- `--titlebar-ink` = chrome
- `--chrome-2` = `shade(chrome, -0.08)`
- `--ink` = `shade(titlebar, -0.05)`, `--ink-soft` = `shade(titlebar, +0.18)`
- `--accent-ink` = `isLight(accent) ? '#1c1410' : '#fff8e8'`

Mobile tiles in `MOBILE_TILES` reference these vars (e.g. `bg: 'var(--accent)'`) so themes carry through.

## CONFIG facade shape (config.jsx)

```js
CONFIG = {
  os: { name, version },
  owner: { githubHandle, email, twitter, linkedin },
  features: { showTweaksButton, showLangButton, showBootSplash },
  posts: {
    basePath: 'Post',
    categories: [{ id, folder, icon, label: {en, ko}, items: [...] }, ...],
  },
}
```

`CONFIG.posts.categories` drives both `DESKTOP_FILES` (the desktop folder icons) and the dynamic `post-<id>` apps in `APPS`. To add a category, just push to the array — no other edits needed. Each `items[]` entry is `{ id, title (string|{en,ko}), date }` rendered by `FolderPage`.

## Common workflows

### Add a new page
1. Write `MyPage()` in `pages.jsx`, use `const t = useT()` for any user-facing strings.
2. Register in `APPS` (app.jsx:21): `mypage: { id, title, icon, render: () => <MyPage />, w, h }`.
3. (optional) Add to `DOCK_ITEMS` with `labelKey: 'dock.mypage'` and to `MOBILE_TILES`.
4. Add `STRINGS['dock.mypage'] = { en, ko }` in `i18n.jsx`.

### Add a Post category
- Append `{ id, folder, icon: 'folder', label: {en, ko}, items: [] }` to `CONFIG.posts.categories` in `config.jsx`. Desktop icon + folder window auto-register.

### Hide / show topbar buttons
- Toggle `CONFIG.features.showTweaksButton` / `showLangButton` / `showBootSplash`.

### Add a translation
- Add `'namespace.key': { en: '...', ko: '...' }` to `STRINGS` in `i18n.jsx`.
- Reference via `t('namespace.key')` in any component.
- Namespaces in use: `topbar.*`, `boot.*`, `dock.*`, `about.*`, `resume.*`, `contact.*`, `github.*`, `readme.*`, `notes.*`, `trash.*`.

### Add a palette
- Append `[bg, chrome, titlebar, accent]` hex tuple to `PALETTES` in `app.jsx:12`. The Tweak chip picker auto-renders it.

### Add a new icon
- Add a 13×13 pixel grid entry to `PIXEL_ICONS` in `chrome.jsx` (`makeIcon(rows, palette)` style).
- Add a matching 24×24 SVG entry to `MODERN_ICONS` using `var(--accent)`/`var(--ink)`/`var(--chrome)` so it carries through palette changes.
- Both maps must share the same key. `ICONS` auto-wraps via `useDesignMode()`.

### Tweak a visual style
- Pixel mode lives at the top of `styles.css`; modern overrides live under the `body.mode-modern` block (~line 540+); mobile tiles under `.m-*` (~line 850+).
- Korean font fallbacks under `body.lang-ko` (~line 130).

## Conventions

- **Comments:** module-level JSDoc only; avoid inline noise. The codebase favors short, named primitives over abstractions.
- **No build step.** `<script type="text/babel">` parses JSX in-browser. Don't introduce import/export — use `Object.assign(window, {...})` to publish.
- **Hard-coded text is a bug** in pages.jsx — every visible string should go through `t()`.
- **Borders/shadows in pixel mode** are `var(--pixel)` (3px) solid `var(--ink)` with hard offset shadows (no blur). Modern mode overrides via `body.mode-modern`.
- **Mobile breakpoint:** 768px. App swaps `<MobileShell />` for desktop+dock at this width.

## Git workflow

Commit each feature as its own commit (per-prompt requirement). Trailer:

```
Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

## What you can derive without reading source

- File structure → `ls`
- Recent changes → `git log --oneline`
- Anything in `tweaks-panel.jsx` beyond the control list above — it's a vendored library, treat it as a black box.

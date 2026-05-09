/* eslint-disable */
// ─────────────────────────────────────────────────────────────────────────
// Site facade — single source of truth.
//
// Edit THIS file to change:
//   - OS branding (name + version) shown in topbar, boot splash, page titles
//   - Owner contact info (email, github handle, social handles)
//   - Feature flags (hide/show topbar buttons, boot splash)
//   - Post categories (the folder icons on the desktop)
//
// Translated user-facing copy (greetings, intros, button labels, …) lives
// in i18n.jsx — this file holds non-translated values plus localized labels
// for structural items like post categories.
// ─────────────────────────────────────────────────────────────────────────

const CONFIG = {
  os: {
    name: 'PIXEL/OS',
    version: 'v0.9',
  },

  owner: {
    githubHandle: 'your-handle',
    email: 'hello@yourname.dev',
    twitter: '@your-handle',
    linkedin: '/in/your-name',
  },

  features: {
    showTweaksButton: false,   // ⚙ TWEAKS button + panel
    showLangButton: true,      // 한 / A language toggle
    showBootSplash: true,
  },

  // Each category becomes a folder icon on the desktop. Add items as you
  // write new posts — { id, title (string or {en, ko}), date, file? }.
  posts: {
    basePath: 'Post',
    categories: [
      { id: 'drawing', folder: 'Drawing', icon: 'folder',
        label: { en: 'Drawing', ko: '드로잉' }, items: [] },
      { id: 'movie',   folder: 'Movie',   icon: 'folder',
        label: { en: 'Movie',   ko: '영화' },   items: [] },
      { id: 'game',    folder: 'Game',    icon: 'folder',
        label: { en: 'Game',    ko: '게임' },   items: [] },
      { id: 'blog',    folder: 'Blog',    icon: 'folder',
        label: { en: 'Blog',    ko: '블로그' }, items: [] },
      { id: 'book',    folder: 'Book',    icon: 'folder',
        label: { en: 'Book',    ko: '책' },     items: [] },
    ],
  },
};

// Resolve {en, ko} maps or pass strings through untouched.
function localize(value, lang) {
  if (value && typeof value === 'object') return value[lang] ?? value.en ?? '';
  return value;
}

Object.assign(window, { CONFIG, localize });

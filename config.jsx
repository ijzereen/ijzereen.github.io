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
    // Mirrors Post/ on disk — folder names kept verbatim (no translation),
    // containment matches the filesystem.
    categories: [
      { id: 'drawing', folder: 'Drawing', icon: 'folder', label: 'Drawing',
        view: 'gallery',
        items: [
          { id: 'img-3508', file: 'IMG_3508.jpeg' },
          { id: 'img-3553', file: 'IMG_3553.jpeg' },
        ] },
      { id: 'movie',   folder: 'Movie',   icon: 'folder', label: 'Movie',   items: [] },
      { id: 'game',    folder: 'Game',    icon: 'folder', label: 'Game',    items: [] },
      { id: 'blog',    folder: 'Blog',    icon: 'folder', label: 'Blog',
        items: [
          { id: '2025-08-11-lexical-search',
            title: '2025-08-11-Lexical-Search',
            date: '2025-08-11',
            file: '2025-08-11-Lexical-Search.md' },
        ] },
      { id: 'book',    folder: 'Book',    icon: 'folder', label: 'Book',    items: [] },
    ],
  },
};

// Resolve {en, ko} maps or pass strings through untouched.
function localize(value, lang) {
  if (value && typeof value === 'object') return value[lang] ?? value.en ?? '';
  return value;
}

Object.assign(window, { CONFIG, localize });

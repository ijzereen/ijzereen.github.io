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

// Pull a category's items from the auto-generated posts-data.js manifest.
// Falls back to an empty array if the script hasn't been run yet.
function _postItems(catId) {
  return (window.POSTS_DATA && window.POSTS_DATA[catId]) || [];
}

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

  // Each category becomes a folder icon on the desktop. The items[] for
  // every category is populated from window.POSTS_DATA, which is generated
  // by scripts/index-posts.py from the actual contents of Post/<folder>/.
  // To add a new post or drawing: drop the file in Post/<folder>/ and run
  //   python3 scripts/index-posts.py
  posts: {
    basePath: 'Post',
    categories: [
      { id: 'drawing', folder: 'Drawing', icon: 'folder', label: 'Drawing',
        view: 'gallery', items: _postItems('drawing') },
      { id: 'movie',   folder: 'Movie',   icon: 'folder', label: 'Movie',
        items: _postItems('movie') },
      { id: 'game',    folder: 'Game',    icon: 'folder', label: 'Game',
        items: _postItems('game') },
      { id: 'blog',    folder: 'Blog',    icon: 'folder', label: 'Blog',
        items: _postItems('blog') },
      { id: 'book',    folder: 'Book',    icon: 'folder', label: 'Book',
        items: _postItems('book') },
    ],
  },
};

// Resolve {en, ko} maps or pass strings through untouched.
function localize(value, lang) {
  if (value && typeof value === 'object') return value[lang] ?? value.en ?? '';
  return value;
}

Object.assign(window, { CONFIG, localize });

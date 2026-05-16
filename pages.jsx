/* eslint-disable */
// Page contents for each window. Each is a function component that takes
// nothing and renders the body of one window. Strings come from i18n.jsx
// via useT() so the user can switch between English and Korean.

function AboutPage() {
  const t = useT();
  return (
    <div className="win-content">
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 18 }}>
        <PixelAvatar size={88} />
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: 4 }}>{t('about.greeting')}</h1>
          <p style={{ margin: 0 }}>
            <span className="tag accent">{t('about.role')}</span>
            &nbsp;<span className="tag">{t('about.location')}</span>
          </p>
          <p style={{ marginTop: 12 }}>{t('about.intro')}</p>
        </div>
      </div>

      <div className="term">
        <span className="prompt">$ </span>whoami
        <br />
        <span className="accent">{CONFIG.owner.githubHandle || 'ijzereen'}</span>
        <br />
        <span className="prompt">$ </span>cat skills.txt
        <br />
        <span className="muted">// {t('about.skills.languages')}   </span>python, c, c++
        <br />
        <span className="muted">// {t('about.skills.stack')}       </span>fastapi, celery, rabbitmq, postgres, minio
        <br />
        <span className="muted">// {t('about.skills.tools')}       </span>langchain, langgraph, vllm, ollama
        <br />
        <span className="muted">// {t('about.skills.currently')}   </span>{t('about.skills.building')} <span className="accent">AirWards · 목표관리체계</span>
        <br />
        <span className="prompt">$ </span><span style={{ animation: 'blink 1s steps(2) infinite' }}>▋</span>
      </div>

      <hr />

      <h2 style={{ marginBottom: 8 }}>{t('about.values.title')}</h2>
      <ul style={{ paddingLeft: 18, margin: 0 }}>
        <li>{t('about.values.1')}</li>
        <li>{t('about.values.2')}</li>
        <li>{t('about.values.3')}</li>
      </ul>

      <hr />

      <p className="cap">{t('about.hint')}</p>
    </div>
  );
}

function ResumePage() {
  const t = useT();
  return (
    <div className="win-content">
      <h1 style={{ marginBottom: 4 }}>{t('resume.title')}</h1>
      <p className="cap" style={{ marginBottom: 16 }}>{t('resume.updated')}</p>

      <h2 style={{ marginBottom: 10 }}>{t('resume.experience')}</h2>
      <div className="tl">
        {[1, 2, 3, 4].map((i) => (
          <div className="tl-item" key={i}>
            <div className="when">{t(`resume.exp.${i}.when`)}</div>
            <div className="role">{t(`resume.exp.${i}.role`)}</div>
            <p style={{ margin: '4px 0 0' }}>{t(`resume.exp.${i}.desc`)}</p>
          </div>
        ))}
      </div>

      <hr />

      <h2 style={{ marginBottom: 10 }}>{t('resume.education')}</h2>
      <div className="tl">
        <div className="tl-item">
          <div className="when">{t('resume.edu.1.when')}</div>
          <div className="role">{t('resume.edu.1.role')}</div>
        </div>
      </div>

      <hr />

      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn">{t('resume.btn.pdf')}</button>
        <button className="btn ghost">{t('resume.btn.linkedin')}</button>
      </div>
    </div>
  );
}

function ContactPage() {
  const t = useT();
  const [sent, setSent] = React.useState(false);
  return (
    <div className="win-content">
      <h1 style={{ marginBottom: 4 }}>{t('contact.title')}</h1>
      <p style={{ marginBottom: 18 }}>{t('contact.intro')}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
        <ContactCard label={t('contact.card.email')} value={CONFIG.owner.email || t('contact.card.empty')} />
        <ContactCard label={t('contact.card.phone')} value={CONFIG.owner.phone || t('contact.card.empty')} />
        <ContactCard label={t('contact.card.github')} value={CONFIG.owner.githubHandle ? `@${CONFIG.owner.githubHandle}` : t('contact.card.empty')} />
        <ContactCard label={t('contact.card.linkedin')} value={CONFIG.owner.linkedin || t('contact.card.empty')} />
      </div>

      <hr />

      <h2 style={{ marginBottom: 10 }}>{t('contact.form.title')}</h2>
      {sent ? (
        <div className="bordered" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
          <strong style={{ fontFamily: 'Silkscreen, monospace', fontSize: 12, letterSpacing: '.05em' }}>
            {t('contact.sent.title')}
          </strong>
          <p style={{ margin: '6px 0 0', color: 'var(--accent-ink)' }}>{t('contact.sent.body')}</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          <div className="field-group">
            <label>{t('contact.form.name')}</label>
            <input type="text" placeholder={t('contact.form.placeholder.name')} required />
          </div>
          <div className="field-group">
            <label>{t('contact.form.email')}</label>
            <input type="email" placeholder={t('contact.form.placeholder.email')} required />
          </div>
          <div className="field-group">
            <label>{t('contact.form.message')}</label>
            <textarea placeholder={t('contact.form.placeholder.message')} required />
          </div>
          <div>
            <button type="submit" className="btn">{t('contact.form.send')}</button>
          </div>
        </form>
      )}
    </div>
  );
}

function ContactCard({ label, value }) {
  return (
    <div className="bordered" style={{ background: 'var(--chrome)', padding: '10px 12px' }}>
      <div className="cap" style={{ marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function GithubPage() {
  const t = useT();
  // Deterministic-ish contribution grid: 26 weeks × 7 days = 182 cells
  const cells = React.useMemo(() => {
    const out = [];
    for (let i = 0; i < 26 * 7; i++) {
      const x = i % 26, y = Math.floor(i / 26);
      const s = Math.sin(x / 3.5) + Math.cos(y / 1.7) + ((i * 9301 + 49297) % 233) / 220;
      const v = Math.max(0, Math.min(4, Math.floor(s + 1.6)));
      out.push(v);
    }
    return out;
  }, []);

  return (
    <div className="win-content">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <h1 style={{ marginBottom: 4 }}>github.com/{CONFIG.owner.githubHandle}</h1>
          <p style={{ margin: 0 }}>
            <span className="tag">{t('github.followers')}</span>&nbsp;
            <span className="tag accent">{t('github.repos')}</span>
          </p>
        </div>
        <button className="btn">{t('github.btn.visit')}</button>
      </div>

      <h2 style={{ marginBottom: 8 }}>{t('github.contrib')}</h2>
      <div className="contrib-grid">
        {cells.map((v, i) => (
          <div key={i} className="contrib-cell" data-l={v} title={`${v} contributions`} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 8 }}>
        <span className="cap">{t('github.less')}</span>
        {[0, 1, 2, 3, 4].map((v) => (
          <span key={v} className="contrib-cell" data-l={v}
                style={{ width: 12, height: 12, display: 'inline-block' }} />
        ))}
        <span className="cap">{t('github.more')}</span>
      </div>

      <hr />

      <h2 style={{ marginBottom: 10 }}>{t('github.pinned')}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Repo name="pixel-os" desc={t('github.repo.1.desc')} stars={284} lang="TypeScript" langColor="#3178c6" />
        <Repo name="sturdy-cli" desc={t('github.repo.2.desc')} stars={1100} lang="Go" langColor="#00ADD8" />
        <Repo name="ink-md" desc={t('github.repo.3.desc')} stars={418} lang="JavaScript" langColor="#f1e05a" />
        <Repo name="dot.files" desc={t('github.repo.4.desc')} stars={62} lang="Shell" langColor="#89e051" />
      </div>
    </div>
  );
}

function Repo({ name, desc, stars, lang, langColor }) {
  return (
    <div className="bordered" style={{ background: 'var(--chrome)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 500, fontSize: 16 }}>{name}</span>
        <span className="cap">★ {stars}</span>
      </div>
      <p style={{ margin: '6px 0 10px', fontSize: 14 }}>{desc}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          width: 10, height: 10, background: langColor, border: '1.5px solid var(--ink)',
          display: 'inline-block',
        }} />
        <span className="cap">{lang}</span>
      </div>
    </div>
  );
}

function ReadmePage() {
  const t = useT();
  return (
    <div className="win-content" style={{ fontFamily: 'VT323, monospace', fontSize: 18, lineHeight: 1.3 }}>
      <h1 style={{ fontFamily: 'Pixelify Sans, monospace' }}># README.md</h1>
      <p style={{ fontFamily: 'inherit', fontSize: 18 }}>
        <strong>{t('readme.welcome')}</strong> {t('readme.body')}
      </p>
      <h2 style={{ fontFamily: 'Pixelify Sans, monospace', marginTop: 14 }}>{t('readme.controls')}</h2>
      <ul style={{ fontFamily: 'inherit', fontSize: 18 }}>
        <li><span className="kbd">DBL CLICK</span> · {t('readme.ctl.open')}</li>
        <li><span className="kbd">DRAG</span> · {t('readme.ctl.move')}</li>
        <li><span className="kbd">ESC</span> · {t('readme.ctl.esc')}</li>
        <li><span className="kbd">⌘ / CTRL + ,</span> · {t('readme.ctl.tweaks')}</li>
      </ul>
      <h2 style={{ fontFamily: 'Pixelify Sans, monospace', marginTop: 14 }}>{t('readme.colophon')}</h2>
      <p style={{ fontFamily: 'inherit', fontSize: 18 }}>{t('readme.colophon.body')}</p>
    </div>
  );
}

function NotesPage() {
  const t = useT();
  const lang = useLang();
  return (
    <div className="win-content">
      <h1>notes.txt</h1>
      <p className="cap" style={{ marginBottom: 14 }}>{t('notes.subtitle')}</p>
      <textarea
        key={lang}
        defaultValue={t('notes.default')}
        style={{
          width: '100%', minHeight: 280,
          border: '2px solid var(--ink)',
          background: '#fff8e8',
          padding: 12,
          fontFamily: 'VT323, monospace',
          fontSize: 20,
          lineHeight: 1.3,
          color: 'var(--ink)',
          boxShadow: '2px 2px 0 0 var(--ink) inset',
          resize: 'vertical',
        }}
      />
    </div>
  );
}

function TrashPage() {
  const t = useT();
  return (
    <div className="win-content">
      <h1>~/.trash</h1>
      <p style={{ marginBottom: 14 }}>{t('trash.summary')}</p>
      <ul style={{ paddingLeft: 18 }}>
        <li><strong>{t('trash.item')}</strong> &nbsp;<span className="cap">{t('trash.meta')}</span></li>
      </ul>
      <hr />
      <button className="btn ghost">{t('trash.empty')}</button>
    </div>
  );
}

function FolderPage({ categoryId }) {
  const t = useT();
  const lang = useLang();
  const cat = CONFIG.posts.categories.find((c) => c.id === categoryId);
  if (!cat) return <div className="win-content"><p>unknown.</p></div>;
  if (cat.view === 'gallery') return <GalleryPage cat={cat} />;
  const title = localize(cat.label, lang);
  const items = cat.items || [];
  return (
    <div className="win-content">
      <h1 style={{ marginBottom: 4 }}>{title}</h1>
      <p className="cap" style={{ marginBottom: 14 }}>
        {CONFIG.posts.basePath}/{cat.folder} · {items.length} {t('folder.items')}
      </p>
      {items.length === 0 ? (
        <div className="bordered">
          <p style={{ margin: 0 }}>{t('folder.empty')}</p>
        </div>
      ) : (
        <ul style={{ paddingLeft: 18, margin: 0 }}>
          {items.map((item) => (
            <li key={item.id} style={{ marginBottom: 8 }}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.__launch) window.__launch(`post-${cat.id}-${item.id}`);
                }}
                style={{ color: 'var(--accent)', cursor: 'pointer', textDecoration: 'underline' }}
              >
                <strong>{localize(item.title, lang)}</strong>
              </a>
              {item.date && <span className="cap"> · {item.date}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Wallpaper ─────────────────────────────────────────────────────────────
// Procedurally-drawn pixel-art ocean wave inspired by the OS X Mavericks
// composition (deep water + breaking curl + foam crest). The art is built
// cell-by-cell on a coarse grid and rendered as an inline SVG that scales
// crisply to any viewport size (shape-rendering=crispEdges + preserveAspectRatio
// slice). No external image asset is fetched.

const WALLPAPER_PALETTE = {
  abyss:  '#02050f',
  deepK:  '#03081a',
  deep:   '#061027',
  deep2:  '#0a1a36',
  mid:    '#102e58',
  midL:   '#1a4a7c',
  light:  '#2a6da6',
  glow:   '#5fa1c8',
  foamLo: '#a8c8d8',
  foam:   '#d0e2ea',
  white:  '#f0f6f9',
};

function buildMavericksSvg() {
  const W = 96, H = 60;
  const C = WALLPAPER_PALETTE;
  let s = 1337;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };

  const grid = Array.from({ length: H }, () => Array(W).fill(C.deep));

  // Depth banding — almost-black at the top and bottom, mid-tone band in the
  // middle. The wave will cut across the mid band.
  for (let y = 0; y < H; y++) {
    let base;
    if (y < 3)        base = C.abyss;
    else if (y < 9)   base = C.deepK;
    else if (y < 18)  base = C.deep;
    else if (y < 28)  base = C.deep2;
    else if (y < 40)  base = C.deep2;
    else if (y < 52)  base = C.deep;
    else              base = C.deepK;
    for (let x = 0; x < W; x++) grid[y][x] = base;
  }

  // Subtle surface striping — pull random cells to a neighbor shade to break
  // flat horizontal bands without looking like static noise.
  for (let y = 4; y < H - 4; y++) {
    for (let x = 0; x < W; x++) {
      if (rand() < 0.04) {
        const cur = grid[y][x];
        if (cur === C.deep)        grid[y][x] = C.deep2;
        else if (cur === C.deep2)  grid[y][x] = C.mid;
        else if (cur === C.deepK)  grid[y][x] = C.deep;
      }
    }
  }

  // Wave crest curve — asymmetric hump centered slightly left of middle,
  // with a tilt so the left side reaches higher than the right.
  const crestY = (x) => {
    const t = x / W;
    const width = t < 0.48 ? 0.22 : 0.34;
    const hump = Math.exp(-Math.pow((t - 0.48) / width, 2));
    return Math.round(28 - 16 * hump);
  };
  const humpAt = (x) => {
    const t = x / W;
    const width = t < 0.48 ? 0.22 : 0.34;
    return Math.exp(-Math.pow((t - 0.48) / width, 2));
  };

  // Tube interior glow — a lit cyan-teal band right under the foam crest in
  // the peak region. Brighter near the apex, dimmer toward the wave shoulders.
  for (let x = 0; x < W; x++) {
    const cy = crestY(x);
    const h = humpAt(x);
    if (h < 0.25) continue;
    const depth = Math.max(2, Math.floor(h * 7));
    for (let dy = 1; dy <= depth; dy++) {
      const y = cy + dy;
      if (y < 0 || y >= H) continue;
      let color;
      if (dy === 1)      color = h > 0.7 ? C.glow  : C.light;
      else if (dy === 2) color = h > 0.7 ? C.light : C.midL;
      else if (dy === 3) color = h > 0.6 ? C.midL  : C.mid;
      else if (dy <= 5)  color = C.mid;
      else               color = C.deep2;
      grid[y][x] = color;
    }
  }

  // Foam crest line — bright pixels along the curve, brightest where the
  // wave peaks. Adds an extra row above for thickness in the peak zone.
  for (let x = 0; x < W; x++) {
    const cy = crestY(x);
    if (cy < 0 || cy >= H) continue;
    const h = humpAt(x);
    grid[cy][x] = h > 0.55 ? C.white : C.foam;
    if (cy - 1 >= 0 && h > 0.4 && rand() < 0.85) {
      grid[cy - 1][x] = h > 0.7 ? C.foam : C.foamLo;
    }
    if (cy - 2 >= 0 && h > 0.6 && rand() < 0.5) {
      grid[cy - 2][x] = C.foamLo;
    }
  }

  // Foam splash particles above the crest — denser and taller where the
  // hump is strongest, suggesting upward spray from the breaking lip.
  for (let i = 0; i < 240; i++) {
    const x = Math.floor(rand() * W);
    const h = humpAt(x);
    if (rand() > h * 0.85 + 0.05) continue;
    const reach = Math.floor(1 + rand() * 9 * h);
    const cy = crestY(x);
    const y = cy - reach;
    if (y < 0 || y >= H) continue;
    const pick = rand();
    grid[y][x] = pick < 0.35 ? C.white : pick < 0.7 ? C.foam : C.foamLo;
  }

  // Ripple highlights catching light on the lower water.
  for (let i = 0; i < 50; i++) {
    const x = Math.floor(rand() * W);
    const y = 40 + Math.floor(rand() * 16);
    if (y < H) grid[y][x] = rand() < 0.5 ? C.mid : C.deep2;
  }

  // Run-length encode rows into <rect> spans.
  let rects = '';
  for (let y = 0; y < H; y++) {
    let start = 0;
    let color = grid[y][0];
    for (let x = 1; x <= W; x++) {
      if (x === W || grid[y][x] !== color) {
        rects += `<rect x="${start}" y="${y}" width="${x - start}" height="1" fill="${color}"/>`;
        if (x < W) { start = x; color = grid[y][x]; }
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" shape-rendering="crispEdges">${rects}</svg>`;
}

function Wallpaper({ mode }) {
  const svg = React.useMemo(() => buildMavericksSvg(), []);
  if (mode === 'image') {
    return (
      <div className="wallpaper-layer" aria-hidden="true">
        <img src="assets/wallpaper-wave.png" alt="" className="wallpaper-img" />
      </div>
    );
  }
  if (mode === 'procedural') {
    return (
      <div
        className="wallpaper-layer"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }
  return null;
}

// ── Gallery view (used by categories with view: 'gallery') ────────────────
// Renders items as a thumbnail grid. Each tile reads EXIF date from the
// image and shows the weekday + capture date as caption. Clicking a tile
// opens the full image in its own window via window.__launch.
function GalleryPage({ cat }) {
  const t = useT();
  const lang = useLang();
  const items = cat.items || [];
  return (
    <div className="win-content">
      <h1 style={{ marginBottom: 4 }}>{localize(cat.label, lang)}</h1>
      <p className="cap" style={{ marginBottom: 14 }}>
        {CONFIG.posts.basePath}/{cat.folder} · {items.length} {t('folder.items')}
      </p>
      {items.length === 0 ? (
        <div className="bordered"><p style={{ margin: 0 }}>{t('folder.empty')}</p></div>
      ) : (
        <div className="gallery-grid">
          {items.map((item) => (
            <GalleryTile key={item.id} item={item} cat={cat} />
          ))}
        </div>
      )}
    </div>
  );
}

function GalleryTile({ item, cat }) {
  const lang = useLang();
  const [date, setDate] = React.useState(null);
  const src = `${CONFIG.posts.basePath}/${cat.folder}/${item.file}`;

  React.useEffect(() => {
    let cancelled = false;
    if (!window.exifr) return;
    window.exifr
      .parse(src, ['DateTimeOriginal', 'CreateDate', 'ModifyDate'])
      .then((tags) => {
        if (cancelled || !tags) return;
        const raw = tags.DateTimeOriginal || tags.CreateDate || tags.ModifyDate;
        if (raw) setDate(raw instanceof Date ? raw : new Date(raw));
      })
      .catch(() => { /* no EXIF — leave date null */ });
    return () => { cancelled = true; };
  }, [src]);

  const locale = lang === 'ko' ? 'ko-KR' : 'en-US';
  const weekday = date && date.toLocaleDateString(locale, { weekday: 'long' });
  const dateStr = date && date.toLocaleDateString(locale, { year: 'numeric', month: '2-digit', day: '2-digit' });

  const open = () => {
    if (window.__launch) window.__launch(`post-${cat.id}-${item.id}`);
  };

  return (
    <div className="gallery-tile" onClick={open}>
      <div className="gallery-thumb">
        <img src={src} alt={item.file} loading="lazy" />
      </div>
      <div className="gallery-caption">
        {weekday ? (
          <>
            <strong>{weekday}</strong>
            <span className="cap"> · {dateStr}</span>
          </>
        ) : (
          <span className="cap">{item.file}</span>
        )}
      </div>
    </div>
  );
}

// Image viewer — opened when a gallery tile is clicked. Renders the file
// at natural size inside the standard window chrome.
function ImagePage({ basePath, folder, file }) {
  const lang = useLang();
  const [date, setDate] = React.useState(null);
  const src = `${basePath}/${folder}/${file}`;

  React.useEffect(() => {
    let cancelled = false;
    if (!window.exifr) return;
    window.exifr.parse(src, ['DateTimeOriginal', 'CreateDate', 'ModifyDate'])
      .then((tags) => {
        if (cancelled || !tags) return;
        const raw = tags.DateTimeOriginal || tags.CreateDate || tags.ModifyDate;
        if (raw) setDate(raw instanceof Date ? raw : new Date(raw));
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [src]);

  const locale = lang === 'ko' ? 'ko-KR' : 'en-US';
  const caption = date
    ? `${date.toLocaleDateString(locale, { weekday: 'long' })} · ${date.toLocaleString(locale)}`
    : `${folder}/${file}`;

  return (
    <div className="win-content image-content">
      <img src={src} alt={file}
           style={{ maxWidth: '100%', display: 'block', margin: '0 auto',
                    border: 'var(--pixel) solid var(--ink)',
                    boxShadow: '4px 4px 0 0 var(--shadow)' }} />
      <p className="cap" style={{ textAlign: 'center', marginTop: 10 }}>{caption}</p>
    </div>
  );
}

// Fetches a markdown file from Post/<folder>/<file>, strips YAML frontmatter,
// pre-processes $$…$$ / $…$ math into placeholders so marked doesn't mangle
// underscores, renders body via marked.js, then swaps the placeholders for
// KaTeX-rendered HTML and runs highlight.js on the code blocks.
function renderPostMarkdown(md) {
  const slots = [];
  // Block math first ($$…$$, multiline) so the inline pass doesn't see it.
  let processed = md.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => {
    const i = slots.push({ tex: tex.trim(), display: true }) - 1;
    return `@@MATH${i}@@`;
  });
  // Inline math: single $…$ on a single line, not adjacent to another $.
  processed = processed.replace(/(?<!\$)\$([^\$\n]+?)\$(?!\$)/g, (_, tex) => {
    const i = slots.push({ tex: tex.trim(), display: false }) - 1;
    return `@@MATH${i}@@`;
  });
  let html = (window.marked && window.marked.parse(processed)) || processed;
  html = html.replace(/@@MATH(\d+)@@/g, (_, i) => {
    const { tex, display } = slots[Number(i)];
    if (!window.katex) return `<code>${tex}</code>`;
    try {
      return window.katex.renderToString(tex, { displayMode: display, throwOnError: false });
    } catch (e) {
      return `<code>${tex}</code>`;
    }
  });
  return html;
}

function PostPage({ basePath, folder, file }) {
  const [html, setHtml] = React.useState('');
  const [error, setError] = React.useState(null);
  const containerRef = React.useRef(null);
  const url = `${basePath}/${folder}/${file}`;

  React.useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((text) => {
        if (cancelled) return;
        const body = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, '');
        setHtml(renderPostMarkdown(body));
      })
      .catch((e) => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }, [url]);

  React.useEffect(() => {
    if (!html || !containerRef.current || !window.hljs) return;
    containerRef.current.querySelectorAll('pre code').forEach((el) => {
      try { window.hljs.highlightElement(el); } catch (_) { /* ignore */ }
    });
  }, [html]);

  if (error) {
    return <div className="win-content"><p>load failed: {error}</p><p className="cap">{url}</p></div>;
  }
  return (
    <div
      ref={containerRef}
      className="win-content post-content"
      dangerouslySetInnerHTML={{ __html: html || '<p class="cap">loading…</p>' }}
    />
  );
}

function PixelAvatar({ size = 64 }) {
  const mode = useDesignMode();
  if (mode === 'modern') {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="var(--accent)"
           style={{ background: 'var(--chrome-2)', flexShrink: 0, overflow: 'hidden' }}>
        <circle cx="32" cy="24" r="11" />
        <path d="M10 60c0-11 9-19 22-19s22 8 22 19z" />
      </svg>
    );
  }
  const rows = [
    '...hhhhh...',
    '..hhhhhhh..',
    '.hhssssshh.',
    '.hssssssss.',
    '.s##s##sss.',
    '.sssssssss.',
    '.ssss#ssss.',
    '..s#####s..',
    '.aaaaaaaaa.',
    'aaaaaaaaaaa',
    'aaaaaaaaaaa',
  ];
  const colors = { s: '#e8c89a', h: '#3a2418', a: 'var(--accent)', '#': '#1c1410' };
  return (
    <svg width={size} height={size} viewBox="0 0 11 11"
         style={{ border: '2px solid var(--ink)', background: 'var(--chrome-2)', flexShrink: 0 }}>
      {rows.flatMap((row, y) =>
        row.split('').map((ch, x) =>
          ch === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={colors[ch]} />
        )
      )}
    </svg>
  );
}

Object.assign(window, {
  AboutPage, ResumePage, ContactPage, GithubPage,
  ReadmePage, NotesPage, TrashPage, FolderPage, PostPage,
  GalleryPage, GalleryTile, ImagePage,
  Wallpaper,
  PixelAvatar, ContactCard, Repo,
});

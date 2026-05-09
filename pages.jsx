/* eslint-disable */
// Page contents for each window. Each is a function component that takes
// nothing and renders the body of one window. Kept simple/static so the
// user can inline-edit copy directly in the preview.

function AboutPage() {
  return (
    <div className="win-content">
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 18 }}>
        <PixelAvatar size={88} />
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: 4 }}>Hi, I'm Your Name</h1>
          <p style={{ margin: 0 }}>
            <span className="tag accent">SOFTWARE ENGINEER</span>
            &nbsp;<span className="tag">SEOUL, KR</span>
          </p>
          <p style={{ marginTop: 12 }}>
            I build small, sturdy things on the web. This portfolio is also a
            playground — every icon you see is an actual file you can open.
          </p>
        </div>
      </div>

      <div className="term">
        <span className="prompt">$ </span>whoami
        <br />
        <span className="accent">your-name</span>
        <br />
        <span className="prompt">$ </span>cat skills.txt
        <br />
        <span className="muted">// languages   </span>typescript, python, go
        <br />
        <span className="muted">// stack       </span>react, node, postgres, redis
        <br />
        <span className="muted">// tools       </span>figma, linear, vim, tmux
        <br />
        <span className="muted">// currently   </span>building <span className="accent">[REDACTED]</span>
        <br />
        <span className="prompt">$ </span><span style={{ animation: 'blink 1s steps(2) infinite' }}>▋</span>
      </div>

      <hr />

      <h2 style={{ marginBottom: 8 }}>Things I care about</h2>
      <ul style={{ paddingLeft: 18, margin: 0 }}>
        <li>Software that respects the user's time and attention.</li>
        <li>Small, well-named primitives over framework lock-in.</li>
        <li>Designs you can hand to another engineer and they smile.</li>
      </ul>

      <hr />

      <p className="cap">DOUBLE-CLICK ICONS · DRAG WINDOWS BY THE TITLEBAR · ESC CLOSES SELECTION</p>
    </div>
  );
}

function ResumePage() {
  return (
    <div className="win-content">
      <h1 style={{ marginBottom: 4 }}>Résumé</h1>
      <p className="cap" style={{ marginBottom: 16 }}>LAST UPDATED · MAY 2026</p>

      <h2 style={{ marginBottom: 10 }}>Experience</h2>
      <div className="tl">
        <div className="tl-item">
          <div className="when">2024 — PRESENT</div>
          <div className="role">Senior Engineer · Some Company</div>
          <p style={{ margin: '4px 0 0' }}>
            Led the rebuild of the editor surface — shipped collaborative cursors,
            offline mode, and a ~30% perf win on initial load.
          </p>
        </div>
        <div className="tl-item">
          <div className="when">2022 — 2024</div>
          <div className="role">Engineer · Earlier Place</div>
          <p style={{ margin: '4px 0 0' }}>
            Built the design system from scratch. Shipped 60+ components,
            adopted by every product team within a year.
          </p>
        </div>
        <div className="tl-item">
          <div className="when">2020 — 2022</div>
          <div className="role">Engineer · First Job</div>
          <p style={{ margin: '4px 0 0' }}>
            Wore many hats. Owned the data pipeline, then the frontend,
            then realised I liked frontend more.
          </p>
        </div>
      </div>

      <hr />

      <h2 style={{ marginBottom: 10 }}>Education</h2>
      <div className="tl">
        <div className="tl-item">
          <div className="when">2016 — 2020</div>
          <div className="role">B.S. Computer Science · University Name</div>
        </div>
      </div>

      <hr />

      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn">DOWNLOAD .PDF</button>
        <button className="btn ghost">VIEW ON LINKEDIN</button>
      </div>
    </div>
  );
}

function ContactPage() {
  const [sent, setSent] = React.useState(false);
  return (
    <div className="win-content">
      <h1 style={{ marginBottom: 4 }}>Get in touch</h1>
      <p style={{ marginBottom: 18 }}>
        Pick the channel you like. Email is fastest.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
        <ContactCard label="EMAIL" value="hello@yourname.dev" />
        <ContactCard label="GITHUB" value="@your-handle" />
        <ContactCard label="TWITTER" value="@your-handle" />
        <ContactCard label="LINKEDIN" value="/in/your-name" />
      </div>

      <hr />

      <h2 style={{ marginBottom: 10 }}>Or send a message</h2>
      {sent ? (
        <div className="bordered" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
          <strong style={{ fontFamily: 'Silkscreen, monospace', fontSize: 12, letterSpacing: '.05em' }}>
            ✓ MESSAGE QUEUED
          </strong>
          <p style={{ margin: '6px 0 0', color: 'var(--accent-ink)' }}>
            Thanks — I'll get back to you within a couple of days.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          <div className="field-group">
            <label>NAME</label>
            <input type="text" placeholder="Ada Lovelace" required />
          </div>
          <div className="field-group">
            <label>EMAIL</label>
            <input type="email" placeholder="ada@analytical.engine" required />
          </div>
          <div className="field-group">
            <label>MESSAGE</label>
            <textarea placeholder="Hello! I saw your portfolio and..." required />
          </div>
          <div>
            <button type="submit" className="btn">SEND →</button>
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
  // Deterministic-ish contribution grid: 26 weeks × 7 days = 182 cells
  const cells = React.useMemo(() => {
    const out = [];
    for (let i = 0; i < 26 * 7; i++) {
      // pseudo-pattern: sine wave + noise
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
          <h1 style={{ marginBottom: 4 }}>github.com/your-handle</h1>
          <p style={{ margin: 0 }}>
            <span className="tag">421 FOLLOWERS</span>&nbsp;
            <span className="tag accent">73 REPOS</span>
          </p>
        </div>
        <button className="btn">VISIT →</button>
      </div>

      <h2 style={{ marginBottom: 8 }}>Contributions · last 6 months</h2>
      <div className="contrib-grid">
        {cells.map((v, i) => (
          <div key={i} className="contrib-cell" data-l={v} title={`${v} contributions`} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 8 }}>
        <span className="cap">LESS</span>
        {[0, 1, 2, 3, 4].map((v) => (
          <span key={v} className="contrib-cell" data-l={v}
                style={{ width: 12, height: 12, display: 'inline-block' }} />
        ))}
        <span className="cap">MORE</span>
      </div>

      <hr />

      <h2 style={{ marginBottom: 10 }}>Pinned repositories</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Repo name="pixel-os" desc="A retro-styled portfolio shell. Yes, this one." stars={284} lang="TypeScript" langColor="#3178c6" />
        <Repo name="sturdy-cli" desc="Tiny CLI for managing tmux sessions across machines." stars={1100} lang="Go" langColor="#00ADD8" />
        <Repo name="ink-md" desc="Markdown renderer with print-quality typography." stars={418} lang="JavaScript" langColor="#f1e05a" />
        <Repo name="dot.files" desc="My dotfiles. Heavy on vim, light on aliases." stars={62} lang="Shell" langColor="#89e051" />
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

// File-icon "double-click to open" modal contents
function ReadmePage() {
  return (
    <div className="win-content" style={{ fontFamily: 'VT323, monospace', fontSize: 18, lineHeight: 1.3 }}>
      <h1 style={{ fontFamily: 'Pixelify Sans, monospace' }}># README.md</h1>
      <p style={{ fontFamily: 'inherit', fontSize: 18 }}>
        <strong>Welcome.</strong> This is my portfolio styled as a tiny pixel desktop.
        Every <em>icon</em> on the wallpaper is a real file you can open by double-clicking.
        The dock at the bottom holds the four main pages.
      </p>
      <h2 style={{ fontFamily: 'Pixelify Sans, monospace', marginTop: 14 }}>## controls</h2>
      <ul style={{ fontFamily: 'inherit', fontSize: 18 }}>
        <li><span className="kbd">DBL CLICK</span> · open a file</li>
        <li><span className="kbd">DRAG</span> · move a window</li>
        <li><span className="kbd">ESC</span> · clear selection</li>
        <li><span className="kbd">⌘ / CTRL + ,</span> · open Tweaks</li>
      </ul>
      <h2 style={{ fontFamily: 'Pixelify Sans, monospace', marginTop: 14 }}>## colophon</h2>
      <p style={{ fontFamily: 'inherit', fontSize: 18 }}>
        Built with HTML, CSS, and a small amount of React. No frameworks.
        Type set in <em>Pixelify Sans</em>, <em>VT323</em> and <em>Silkscreen</em>.
      </p>
    </div>
  );
}

function NotesPage() {
  return (
    <div className="win-content">
      <h1>notes.txt</h1>
      <p className="cap" style={{ marginBottom: 14 }}>SCRATCHPAD · OPEN TO EDIT</p>
      <textarea
        defaultValue={"- ship the new portfolio\n- write the post about pixel chrome\n- refactor the editor undo stack\n- read more poetry"}
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
  return (
    <div className="win-content">
      <h1>~/.trash</h1>
      <p style={{ marginBottom: 14 }}>One item.</p>
      <ul style={{ paddingLeft: 18 }}>
        <li><strong>old-portfolio.html</strong> &nbsp;<span className="cap">12.4 KB · DELETED 2026-04-02</span></li>
      </ul>
      <hr />
      <button className="btn ghost">EMPTY TRASH</button>
    </div>
  );
}

function PixelAvatar({ size = 64 }) {
  // 11×11 pixel-art self-portrait silhouette (no recognizable face).
  // Drawn from a string for legibility: . = transparent, # = ink,
  // s = skin, h = hair, a = accent (shirt).
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
  const c = size / 11;
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
  ReadmePage, NotesPage, TrashPage,
  PixelAvatar, ContactCard, Repo,
});

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
        <span className="accent">your-name</span>
        <br />
        <span className="prompt">$ </span>cat skills.txt
        <br />
        <span className="muted">// {t('about.skills.languages')}   </span>typescript, python, go
        <br />
        <span className="muted">// {t('about.skills.stack')}       </span>react, node, postgres, redis
        <br />
        <span className="muted">// {t('about.skills.tools')}       </span>figma, linear, vim, tmux
        <br />
        <span className="muted">// {t('about.skills.currently')}   </span>{t('about.skills.building')} <span className="accent">[REDACTED]</span>
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
        <div className="tl-item">
          <div className="when">{t('resume.exp.1.when')}</div>
          <div className="role">{t('resume.exp.1.role')}</div>
          <p style={{ margin: '4px 0 0' }}>{t('resume.exp.1.desc')}</p>
        </div>
        <div className="tl-item">
          <div className="when">{t('resume.exp.2.when')}</div>
          <div className="role">{t('resume.exp.2.role')}</div>
          <p style={{ margin: '4px 0 0' }}>{t('resume.exp.2.desc')}</p>
        </div>
        <div className="tl-item">
          <div className="when">{t('resume.exp.3.when')}</div>
          <div className="role">{t('resume.exp.3.role')}</div>
          <p style={{ margin: '4px 0 0' }}>{t('resume.exp.3.desc')}</p>
        </div>
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
        <ContactCard label={t('contact.card.email')} value="hello@yourname.dev" />
        <ContactCard label={t('contact.card.github')} value="@your-handle" />
        <ContactCard label={t('contact.card.twitter')} value="@your-handle" />
        <ContactCard label={t('contact.card.linkedin')} value="/in/your-name" />
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
          <h1 style={{ marginBottom: 4 }}>github.com/your-handle</h1>
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

function PixelAvatar({ size = 64 }) {
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
  ReadmePage, NotesPage, TrashPage,
  PixelAvatar, ContactCard, Repo,
});

/* D+ · "Still TODO" screens — fills the honest-scope gaps.
 * 1. History list (D+ aesthetic, fallback if E rejected)
 * 2. Empty states (first-run Scope + first-run Evidence)
 * 3. System / sync states (drift offline, save in progress, API error)
 * 4. Multi-tenant settings (org switcher + member roster + RBAC matrix)
 * 5. Mobile Today (390px iPad/phone)
 * 6. AI mode comparison (deterministic vs LLM)
 */

// ============== 1. HISTORY LIST ===============================
const DPHistoryList = () => {
  const sessions = [
    { id: 'TXA7F3', bu: 'gen',  buName: 'Generation',    when: 'May 13, 2026 · 09:14', score: 3.34, delta: -0.18, operator: 'AS', flag: 'critical drift' },
    { id: 'TX9D2C', bu: 'gen',  buName: 'Generation',    when: 'Mar 14, 2026 · 11:08', score: 3.52, delta: -0.09, operator: 'AS', flag: null },
    { id: 'TX6B81', bu: 'gen',  buName: 'Generation',    when: 'Jan 22, 2026 · 14:32', score: 3.61, delta: +0.02, operator: 'AS', flag: null },
    { id: 'TXB2C1', bu: 'tra',  buName: 'Transmission',  when: 'May 06, 2026 · 11:32', score: 3.81, delta: +0.08, operator: 'NM', flag: null },
    { id: 'TXD4E9', bu: 'dis',  buName: 'Distribution',  when: 'Apr 29, 2026 · 14:08', score: 3.65, delta: +0.04, operator: 'RA', flag: null },
    { id: 'TXF8A2', bu: 'corp', buName: 'Corporate',     when: 'Apr 15, 2026 · 16:22', score: 3.42, delta: -0.06, operator: 'AS', flag: 'minor drift' },
    { id: 'TX5K7P', bu: 'sub',  buName: 'Subsidiaries',  when: 'Mar 28, 2026 · 10:05', score: 3.18, delta: -0.14, operator: 'NM', flag: 'minor drift' },
    { id: 'TX3Q9N', bu: 'jv',   buName: 'Joint Ventures',when: 'Feb 14, 2026 · 09:48', score: 3.40, delta: +0.10, operator: 'AS', flag: null },
  ];
  return (
    <div style={{ width: 1440, minHeight: 1080, background: nuTokens.bg, color: nuTokens.ink, ...nuFont.ui, padding: '40px 56px' }}>
      <NuLabel tone="accent" size={11}>● History · all units</NuLabel>
      <h1 style={{ ...nuFont.ui, fontSize: 36, fontWeight: 500, letterSpacing: '-0.025em', margin: '12px 0 6px' }}>
        18 past sessions
      </h1>
      <p style={{ fontSize: 14, color: nuTokens.inkSoft, marginBottom: 24, maxWidth: 640 }}>
        Every session is timestamped, scored deterministically, and addressable by transaction ID.
        Click any row to replay that snapshot.
      </p>

      {/* Filter row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <NuChip tone="accent">All BUs</NuChip>
        <NuChip tone="ink">Last 6 months</NuChip>
        <NuChip tone="ink">Benchmark · Industry</NuChip>
        <span style={{ flex: 1 }} />
        <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>
          sort: most recent · 18 sessions
        </span>
      </div>

      <div style={{ background: nuTokens.panel, border: `1px solid ${nuTokens.border}`, borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '90px 200px 1fr 100px 110px 90px 80px 80px', gap: 14, padding: '10px 18px', background: nuTokens.panelAlt, ...nuFont.mono, fontSize: 10, fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', color: nuTokens.inkMuted }}>
          <span>Score</span>
          <span>Operating unit</span>
          <span>When</span>
          <span style={{ textAlign: 'right' }}>Δ vs prior</span>
          <span>Trend</span>
          <span>Operator</span>
          <span>Status</span>
          <span style={{ textAlign: 'right' }}>Tx ID</span>
        </div>
        {sessions.map((s, i) => {
          const bu = dpBu[s.bu];
          const deltaColor = s.delta < -0.15 ? nuTokens.crit : s.delta < 0 ? nuTokens.warn : nuTokens.ok;
          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '90px 200px 1fr 100px 110px 90px 80px 80px',
              gap: 14, padding: '14px 18px', alignItems: 'center', fontSize: 13,
              borderTop: `1px solid ${nuTokens.border}`, cursor: 'pointer',
            }}>
              <span style={{ ...nuFont.ui, fontSize: 22, fontWeight: 600, letterSpacing: '-0.022em' }}>
                {s.score.toFixed(2)}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: 5, background: bu.tint, color: bu.dot, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DpBuGlyph id={s.bu} size={12} color={bu.dot} />
                </span>
                <span style={{ fontWeight: 500 }}>{s.buName}</span>
              </span>
              <span style={{ fontSize: 12.5, color: nuTokens.inkSoft, ...nuFont.mono }}>{s.when}</span>
              <span style={{ textAlign: 'right', ...nuFont.mono, fontSize: 12, color: deltaColor, fontWeight: 600 }}>
                {s.delta >= 0 ? '+' : ''}{s.delta.toFixed(2)}
              </span>
              <span><DpMiniTrend down={s.delta < 0} /></span>
              <NuAvatar initials={s.operator} size={22} />
              <span>
                {s.flag ? <NuChip tone={s.flag.includes('critical') ? 'crit' : 'warn'}>{s.flag}</NuChip> : <span style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted }}>nominal</span>}
              </span>
              <span style={{ textAlign: 'right', ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted, letterSpacing: '0.06em' }}>{s.id}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Mini trend sparkline
const DpMiniTrend = ({ down }) => {
  const pts = down ? [3.6, 3.55, 3.5, 3.42, 3.34] : [3.2, 3.3, 3.4, 3.5, 3.55];
  const w = 80, h = 22;
  const min = Math.min(...pts), max = Math.max(...pts);
  const span = max - min || 1;
  const path = pts.map((v, i) => {
    const x = (i / (pts.length - 1)) * w;
    const y = h - ((v - min) / span) * h;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg width={w} height={h}>
      <path d={path} fill="none" stroke={down ? nuTokens.crit : nuTokens.ok} strokeWidth="1.4" />
      <circle cx={w} cy={h - ((pts[pts.length-1] - min) / span) * h} r="2.5" fill={down ? nuTokens.crit : nuTokens.ok} />
    </svg>
  );
};

// ============== 2. EMPTY STATES ===============================
const DPEmptyStates = () => (
  <div style={{ width: 1440, minHeight: 760, background: nuTokens.bg, color: nuTokens.ink, ...nuFont.ui, padding: '40px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
    {/* First-run Scope */}
    <div>
      <NuLabel size={11}>First-run · BU Scope (zero archive)</NuLabel>
      <div style={{ marginTop: 14, background: nuTokens.panel, border: `1px solid ${nuTokens.border}`, borderRadius: 12, padding: 48, textAlign: 'center', minHeight: 560 }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ margin: '40px auto 0' }}>
          <rect x="10" y="14" width="44" height="36" rx="3" stroke={nuTokens.accent} strokeWidth="1.5" opacity="0.5" />
          <path d="M10 22 L54 22" stroke={nuTokens.accent} strokeWidth="1.5" opacity="0.5" />
          <path d="M20 34 L44 34 M20 40 L36 40" stroke={nuTokens.inkMuted} strokeWidth="1.5" />
        </svg>
        <h2 style={{ ...nuFont.ui, fontSize: 26, fontWeight: 500, letterSpacing: '-0.022em', margin: '24px 0 0' }}>
          A blank page,<br/>
          <span style={{ ...nuFont.ui, fontStyle: 'italic', color: nuTokens.accent }}>for now.</span>
        </h2>
        <p style={{ fontSize: 14, color: nuTokens.inkSoft, maxWidth: 380, margin: '14px auto 0', lineHeight: 1.55 }}>
          Choose an operating unit below to run your first 100-vector assessment.
          Once it's complete, your archive will live here — addressable, comparable, and drift-tracked.
        </p>
        <button style={{
          marginTop: 24, padding: '10px 20px', borderRadius: 7,
          background: nuTokens.accent, color: '#FFF', border: 'none', cursor: 'pointer',
          fontSize: 13, fontWeight: 600,
          boxShadow: "inset 0 2px 4px rgba(255,255,255,0.56), 0 4px 8px rgba(38,27,7,0.06), 0 1px 2px rgba(38,27,7,0.36)",
        }}>
          Pick an operating unit →
        </button>
      </div>
    </div>

    {/* First-run Evidence */}
    <div>
      <NuLabel size={11}>First-run · Evidence drawer (zero uploads)</NuLabel>
      <div style={{ marginTop: 14, background: nuTokens.panel, border: `1px solid ${nuTokens.border}`, borderRadius: 12, padding: 48, textAlign: 'center', minHeight: 560 }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ margin: '40px auto 0' }}>
          <path d="M14 18 L14 50 L50 50 L50 26 L40 16 L14 16 Z" stroke={nuTokens.accent} strokeWidth="1.5" opacity="0.55" />
          <path d="M40 16 L40 26 L50 26" stroke={nuTokens.accent} strokeWidth="1.5" opacity="0.55" />
          <path d="M24 36 L40 36 M24 42 L36 42" stroke={nuTokens.inkMuted} strokeWidth="1.5" />
          <circle cx="44" cy="44" r="8" fill="#FFF" stroke={nuTokens.accent} strokeWidth="1.5" />
          <path d="M44 41 L44 47 M41 44 L47 44" stroke={nuTokens.accent} strokeWidth="1.5" />
        </svg>
        <h2 style={{ ...nuFont.ui, fontSize: 26, fontWeight: 500, letterSpacing: '-0.022em', margin: '24px 0 0' }}>
          No evidence yet.
        </h2>
        <p style={{ fontSize: 14, color: nuTokens.inkSoft, maxWidth: 380, margin: '14px auto 0', lineHeight: 1.55 }}>
          Evidence is the difference between a claim and a fact. Upload policies, control tests,
          incident reports, and survey results — each gets linked to the vectors it supports.
        </p>
        <div style={{ marginTop: 24, display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button style={{
            padding: '10px 18px', borderRadius: 7, background: nuTokens.accent, color: '#FFF',
            border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
            boxShadow: "inset 0 2px 4px rgba(255,255,255,0.56), 0 4px 8px rgba(38,27,7,0.06), 0 1px 2px rgba(38,27,7,0.36)",
          }}>+ Upload evidence</button>
          <button style={{
            padding: '10px 18px', borderRadius: 7, background: 'transparent', color: nuTokens.ink,
            border: `1px solid ${nuTokens.borderStr}`, cursor: 'pointer', fontSize: 13, fontWeight: 500,
          }}>Connect Slack</button>
        </div>
        <p style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted, marginTop: 24, letterSpacing: '0.06em' }}>
          PDF · DOCX · XLSX · PNG · TXT · max 50 MB
        </p>
      </div>
    </div>
  </div>
);

// ============== 3. SYSTEM / SYNC STATES =======================
const DPSystemStates = () => (
  <div style={{ width: 1440, minHeight: 920, background: nuTokens.bg, color: nuTokens.ink, ...nuFont.ui, padding: '40px 32px' }}>
    <NuLabel tone="accent" size={11}>● System & sync states</NuLabel>
    <h1 style={{ ...nuFont.ui, fontSize: 28, fontWeight: 500, letterSpacing: '-0.022em', margin: '10px 0 24px' }}>
      Three things that always break — and how each one tells the user.
    </h1>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* State 1: Drift engine offline */}
      <div>
        <NuLabel size={10}>① Drift engine offline · top-of-screen banner</NuLabel>
        <div style={{ marginTop: 8, background: nuTokens.warnSoft, border: `1px solid ${nuTokens.warn}55`, borderRadius: 8, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 28, height: 28, borderRadius: 999, background: nuTokens.warn, color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 4v3M7 9.5v0.5"/><circle cx="7" cy="7" r="5.5"/></svg>
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: nuTokens.warn }}>Drift engine sync paused</div>
            <div style={{ fontSize: 13, color: nuTokens.inkSoft, marginTop: 2 }}>
              Drift detection last ran 6 minutes ago. Scores you see may not reflect the most recent responses. Retrying every 30s.
            </div>
          </div>
          <button style={{ padding: '6px 12px', borderRadius: 6, background: '#FFF', border: `1px solid ${nuTokens.warn}55`, fontSize: 12, fontWeight: 500, color: nuTokens.warn, cursor: 'pointer' }}>
            Retry now
          </button>
          <span style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted }}>auto-clears on reconnect</span>
        </div>
      </div>

      {/* State 2: Save in progress */}
      <div>
        <NuLabel size={10}>② Save in progress · bottom-right toast (with optimistic UI confirmed)</NuLabel>
        <div style={{ marginTop: 8, position: 'relative', minHeight: 80 }}>
          <div style={{ position: 'absolute', right: 0, top: 0, background: nuTokens.ink, color: nuTokens.bg, borderRadius: 10, padding: '14px 18px', boxShadow: '0 8px 24px rgba(20,24,31,0.18)', minWidth: 320, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 28, height: 28, borderRadius: 999, background: 'rgba(255,255,255,0.10)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={nuTokens.accent} strokeWidth="2">
                <circle cx="7" cy="7" r="5" strokeDasharray="20 10" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Saving 23 responses…</div>
              <div style={{ ...nuFont.mono, fontSize: 10.5, color: 'rgba(245,242,236,0.55)', marginTop: 2 }}>tx · A7F3-2C4D-9E · ~1s remaining</div>
            </div>
            <span style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.accent, padding: '2px 6px', background: 'rgba(196,84,42,0.18)', borderRadius: 3 }}>OFFLINE-SAFE</span>
          </div>
        </div>
      </div>

      {/* State 3: API error */}
      <div>
        <NuLabel size={10}>③ Scoring API error · inline modal (rare — actionable)</NuLabel>
        <div style={{ marginTop: 8, background: nuTokens.panel, border: `1px solid ${nuTokens.crit}55`, borderTop: `3px solid ${nuTokens.crit}`, borderRadius: 10, padding: 22, maxWidth: 540 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <span style={{ width: 32, height: 32, borderRadius: 999, background: nuTokens.critSoft, color: nuTokens.crit, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="8" cy="8" r="6.5"/><path d="M8 4.5v4M8 11v0.5"/></svg>
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ ...nuFont.ui, fontSize: 16, fontWeight: 600 }}>The scoring engine returned an error.</div>
              <p style={{ fontSize: 13, color: nuTokens.inkSoft, margin: '6px 0 0', lineHeight: 1.55 }}>
                Your 23 responses are safely stored. The deterministic scoring run failed on vector 47 —
                we suspect a malformed evidence file. Your assessment is intact; no data lost.
              </p>
              <div style={{ marginTop: 10, padding: '8px 12px', background: nuTokens.bgSubtle, borderRadius: 5, ...nuFont.mono, fontSize: 11, color: nuTokens.inkSoft }}>
                err.code: ENGINE_INPUT_INVALID · req.id: req_a7f3c2d4 · time: 14:32:17 UTC
              </div>
              <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                <button style={{ padding: '8px 14px', borderRadius: 6, background: nuTokens.ink, color: nuTokens.bg, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
                  Retry vector 47
                </button>
                <button style={{ padding: '8px 14px', borderRadius: 6, background: 'transparent', color: nuTokens.ink, border: `1px solid ${nuTokens.border}`, cursor: 'pointer', fontSize: 13 }}>
                  Skip & continue
                </button>
                <button style={{ padding: '8px 14px', borderRadius: 6, background: 'transparent', color: nuTokens.inkMuted, border: 'none', cursor: 'pointer', fontSize: 13 }}>
                  Copy error ID
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============== 4. MULTI-TENANT SETTINGS ======================
const DPSettings = () => {
  const members = [
    { name: 'Aisha Saleh',     email: 'aisha.saleh@gmail.com',    role: 'Assessor', last: '14m ago',  i: 'AS' },
    { name: 'Fahad Al-Otaibi', email: 'fahad.alotaibi@gmail.com', role: 'Reviewer', last: '2h ago',   i: 'FA' },
    { name: 'Nora Mansour',    email: 'nora.mansour@gmail.com',   role: 'Approver', last: 'yesterday',i: 'NM' },
    { name: 'Reem Al-Saud',    email: 'reem.alsaud@gmail.com',    role: 'Assessor', last: '4d ago',   i: 'RA' },
    { name: 'Khalid Ahmed',    email: 'khalid.ahmed@gmail.com',   role: 'Reviewer', last: '11d ago',  i: 'KA' },
  ];
  const roleColor = { Assessor: nuTokens.blue, Reviewer: nuTokens.warn, Approver: nuTokens.ok };
  return (
    <div style={{ width: 1440, minHeight: 980, background: nuTokens.bg, color: nuTokens.ink, ...nuFont.ui, padding: '40px 56px' }}>
      <NuLabel tone="accent" size={11}>● Settings · workspace</NuLabel>
      <h1 style={{ ...nuFont.ui, fontSize: 32, fontWeight: 500, letterSpacing: '-0.022em', margin: '10px 0 0' }}>
        The organization · workspace
      </h1>
      <p style={{ fontSize: 14, color: nuTokens.inkSoft, marginTop: 6, marginBottom: 24, maxWidth: 640 }}>
        Multi-tenant workspace with role-based access. 5 members across 3 roles. SSO active via Google Workspace.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18 }}>
        {/* Members table */}
        <div style={{ background: nuTokens.panel, border: `1px solid ${nuTokens.border}`, borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: `1px solid ${nuTokens.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <NuLabel tone="ink" size={11}>Members · 5</NuLabel>
            <button style={{ padding: '6px 12px', borderRadius: 6, background: nuTokens.ink, color: nuTokens.bg, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>
              + Invite member
            </button>
          </div>
          {members.map((m, i) => (
            <div key={i} style={{ padding: '14px 18px', borderTop: i === 0 ? 'none' : `1px solid ${nuTokens.border}`, display: 'grid', gridTemplateColumns: '36px 1fr 110px 90px', gap: 14, alignItems: 'center' }}>
              <NuAvatar initials={m.i} size={32} />
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{m.name}</div>
                <div style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted, marginTop: 2 }}>{m.email}</div>
              </div>
              <span style={{ padding: '4px 10px', borderRadius: 999, background: `${roleColor[m.role]}1A`, color: roleColor[m.role], ...nuFont.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center' }}>
                {m.role}
              </span>
              <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted, textAlign: 'right' }}>{m.last}</span>
            </div>
          ))}
        </div>

        {/* RBAC matrix */}
        <div style={{ background: nuTokens.panel, border: `1px solid ${nuTokens.border}`, borderRadius: 12, padding: 20 }}>
          <NuLabel tone="ink" size={11}>Role permissions · RBAC</NuLabel>
          <p style={{ fontSize: 12.5, color: nuTokens.inkSoft, marginTop: 8, marginBottom: 16, lineHeight: 1.5 }}>
            Patent Section B · ~1 week of engineering work. Currently scoped for pre-customer.
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${nuTokens.border}` }}>
                <th style={{ textAlign: 'left', padding: '8px 0', ...nuFont.mono, fontSize: 10, color: nuTokens.inkMuted, letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 500 }}>Action</th>
                {['Asses', 'Revw', 'Apprv'].map(r => (
                  <th key={r} style={{ width: 50, padding: '8px 0', ...nuFont.mono, fontSize: 10, color: nuTokens.inkMuted, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, textAlign: 'center' }}>{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Score vectors', true, false, false],
                ['Upload evidence', true, true, false],
                ['Lock assessment', false, true, false],
                ['Sign-off final', false, false, true],
                ['Override roadmap', false, false, true],
                ['Export PDF', true, true, true],
                ['View archive', true, true, true],
              ].map(([action, asses, revw, apprv], i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${nuTokens.border}` }}>
                  <td style={{ padding: '9px 0', fontSize: 12.5, color: nuTokens.ink }}>{action}</td>
                  {[asses, revw, apprv].map((v, j) => (
                    <td key={j} style={{ textAlign: 'center', padding: '9px 0' }}>
                      {v
                        ? <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: 999, background: nuTokens.okSoft, color: nuTokens.ok }}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 5l2 2 4-4"/></svg>
                          </span>
                        : <span style={{ color: nuTokens.inkSubtle }}>—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============== 5. MOBILE TODAY (390px) =======================
const DPMobile = () => (
  <div style={{ width: 1440, minHeight: 980, background: nuTokens.bg, color: nuTokens.ink, ...nuFont.ui, padding: '40px 32px' }}>
    <NuLabel tone="accent" size={11}>● Mobile / iPad · Today screen at 390px</NuLabel>
    <h1 style={{ ...nuFont.ui, fontSize: 28, fontWeight: 500, letterSpacing: '-0.022em', margin: '10px 0 6px' }}>
      Board members on the go.
    </h1>
    <p style={{ fontSize: 14, color: nuTokens.inkSoft, marginBottom: 28, maxWidth: 580 }}>
      Stripped chrome, signal-first, vertical scroll. The Live Brief becomes the hero with everything else collapsed under it.
    </p>

    <div style={{ display: 'flex', justifyContent: 'center', gap: 32 }}>
      {/* Phone frame */}
      <div style={{ width: 390, height: 844, background: '#000', borderRadius: 38, padding: 6, boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 32, background: nuTokens.bg, overflow: 'hidden', position: 'relative' }}>
          {/* Status bar */}
          <div style={{ height: 44, padding: '0 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...nuFont.mono, fontSize: 12, fontWeight: 600 }}>
            <span>9:41</span>
            <span style={{ width: 90, height: 26, background: '#000', borderRadius: 999 }} />
            <span>●●● 5G</span>
          </div>
          {/* Nav */}
          <div style={{ padding: '8px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${nuTokens.border}` }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 18, height: 18, borderRadius: 4, background: nuTokens.ink, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ width: 7, height: 7, background: nuTokens.accent, borderRadius: 2 }} />
              </span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Navigator</span>
            </span>
            <NuAvatar initials="AS" size={26} />
          </div>
          {/* Hero */}
          <div style={{ padding: '20px 18px' }}>
            <NuLabel tone="accent" size={9}>● Live brief · today</NuLabel>
            <div style={{ marginTop: 12, background: nuTokens.panel, border: `1px solid ${nuTokens.border}`, borderTop: `3px solid ${nuTokens.crit}`, borderRadius: 12, padding: 18 }}>
              <NuChip tone="crit">Critical regression</NuChip>
              <h2 style={{ ...nuFont.ui, fontSize: 21, fontWeight: 500, letterSpacing: '-0.018em', margin: '12px 0 0', lineHeight: 1.2 }}>
                <span style={{ color: nuTokens.crit }}>Risk Treatment</span> at Generation regressed
                <span style={{ ...nuFont.mono }}> −0.60</span>.
              </h2>
              <p style={{ fontSize: 12.5, color: nuTokens.inkSoft, marginTop: 10, lineHeight: 1.5 }}>
                Deterministic scoring caught it before the review cycle. Phase-1 fix recovers
                <strong style={{ color: nuTokens.ok }}> +0.34</strong> in 90 days.
              </p>
              <button style={{
                marginTop: 14, width: '100%', padding: '10px 14px', borderRadius: 8,
                background: nuTokens.accent, color: '#FFF', border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
                boxShadow: "inset 0 2px 4px rgba(255,255,255,0.4), 0 2px 4px rgba(38,27,7,0.18)",
              }}>
                Open action plan →
              </button>
            </div>
          </div>
          {/* Score card */}
          <div style={{ padding: '0 18px' }}>
            <div style={{ background: nuTokens.panel, border: `1px solid ${nuTokens.border}`, borderRadius: 12, padding: 18 }}>
              <NuLabel size={9}>Overall maturity</NuLabel>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
                <span style={{ ...nuFont.ui, fontSize: 44, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1 }}>3.34</span>
                <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>/5.00</span>
              </div>
              <div style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.crit, fontWeight: 600, marginTop: 4 }}>
                ↓ 0.21 vs Industry · ↓ 0.28 over 30d
              </div>
            </div>
          </div>
          {/* Pillar list mini */}
          <div style={{ padding: '14px 18px' }}>
            <NuLabel size={9}>Pillars · 3 critical</NuLabel>
            {[
              ['Risk Treatment', 2.95, nuTokens.crit],
              ['Risk Culture', 2.78, nuTokens.crit],
              ['Monitoring & Review', 3.20, nuTokens.warn],
            ].map(([n, s, c], i) => (
              <div key={i} style={{ marginTop: 10, padding: '8px 12px', background: nuTokens.panel, border: `1px solid ${nuTokens.border}`, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{n}</span>
                <span style={{ ...nuFont.ui, fontSize: 16, fontWeight: 600, color: c }}>{s.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet description */}
      <div style={{ flex: 1, maxWidth: 460, paddingTop: 60 }}>
        <NuLabel tone="ink" size={11}>Design choices for mobile</NuLabel>
        <ul style={{ marginTop: 14, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            ['Signal-first', 'Live Brief is the entire above-fold. No KPI strip, no nav tabs. One signal, one CTA.'],
            ['Vertical scroll only', 'No horizontal panels, no sidebars. Each section is full-width.'],
            ['Reduced data density', '3 critical pillars only — full pillar matrix lives behind a "view all" tap.'],
            ['Same reproducibility band', 'Trust signals stay even when chrome is stripped — kept short for mobile.'],
            ['One CTA per screen', 'Action plan is the only path forward; everything else is "later".'],
          ].map(([h, t], i) => (
            <li key={i} style={{ display: 'flex', gap: 12 }}>
              <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.accent, fontWeight: 600, minWidth: 22 }}>0{i+1}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{h}</div>
                <div style={{ fontSize: 13, color: nuTokens.inkSoft, marginTop: 2, lineHeight: 1.5 }}>{t}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// ============== 6. WHAT LLM ADDS ==============================
// Reframed: scoring is ALWAYS deterministic. LLM operates ABOVE the engine —
// reads evidence files (claim 18), narrates findings (claim 17). Not a
// competing scorer; an additive validator + explainer.
const DPAIComparison = () => (
  <div style={{ width: 1440, minHeight: 880, background: nuTokens.bg, color: nuTokens.ink, ...nuFont.ui, padding: '40px 32px' }}>
    <NuLabel tone="accent" size={11}>● What LLM mode adds</NuLabel>
    <h1 style={{ ...nuFont.ui, fontSize: 32, fontWeight: 500, letterSpacing: '-0.025em', margin: '10px 0 6px' }}>
      The scoring engine never changes. The LLM works <span style={{ color: nuTokens.accent }}>above it</span>.
    </h1>
    <p style={{ fontSize: 14.5, color: nuTokens.inkSoft, marginBottom: 24, maxWidth: 820, lineHeight: 1.55 }}>
      The 100-vector scoring is pinned by 35 unit tests — same responses produce the same number every time.
      LLM mode adds two things on top: it <strong>reads the evidence PDFs</strong> to validate the claims behind each
      score (patent claim 18), and it <strong>narrates the findings</strong> in plain language (claim 17).
      Neither capability touches the math.
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 18 }}>
      {/* CARD 1: Evidence validation — the real differentiator */}
      <div style={{ background: nuTokens.panel, border: `1px solid ${nuTokens.border}`, borderRadius: 12, padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <NuLabel tone="ink" size={11}>① Evidence validation · claim 18</NuLabel>
          <NuChip tone="accent">Claude Vision</NuChip>
        </div>
        <p style={{ fontSize: 13, color: nuTokens.inkSoft, marginBottom: 14, lineHeight: 1.5 }}>
          The assessor scored vector q.53 ("controls designed and tested") a <strong>2 of 5</strong> and attached a
          PDF. LLM reads the PDF and tells you whether the evidence actually supports a 2 — or contradicts it.
        </p>

        {/* PDF preview + verdict */}
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ background: nuTokens.bgSubtle, border: `1px solid ${nuTokens.border}`, borderRadius: 6, padding: 8, aspectRatio: '3/4', display: 'flex', flexDirection: 'column' }}>
            <div style={{ ...nuFont.mono, fontSize: 8, color: nuTokens.inkMuted, marginBottom: 6 }}>control-test-q3-2025.pdf</div>
            {[
              { w: 80, t: nuTokens.ink },
              { w: 100, t: nuTokens.ink },
              { w: 70, t: nuTokens.inkMuted },
              { w: 0, t: 'gap' },
              { w: 95, t: nuTokens.accent, hi: true },
              { w: 65, t: nuTokens.accent, hi: true },
              { w: 0, t: 'gap' },
              { w: 88, t: nuTokens.inkMuted },
              { w: 72, t: nuTokens.inkMuted },
            ].map((l, i) => l.t === 'gap'
              ? <div key={i} style={{ height: 6 }} />
              : <div key={i} style={{
                  height: 3, background: l.hi ? nuTokens.accent : l.t, borderRadius: 1, marginBottom: 4,
                  width: `${l.w}%`, opacity: l.hi ? 0.85 : 0.32,
                }} />
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ padding: '8px 12px', background: nuTokens.okSoft, border: `1px solid ${nuTokens.ok}33`, borderRadius: 6, fontSize: 12.5, color: nuTokens.ok, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ flexShrink: 0, marginTop: 1 }}><path d="M2 7l3 3 7-7"/></svg>
              <div><strong>6 of 8</strong> claimed controls have documented test results in the last 90 days. The score of 2 is consistent with the evidence.</div>
            </div>
            <div style={{ padding: '8px 12px', background: nuTokens.warnSoft, border: `1px solid ${nuTokens.warn}33`, borderRadius: 6, fontSize: 12.5, color: nuTokens.warn, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="7" cy="7" r="5.5"/><path d="M7 4v3.5M7 9.5v0.5"/></svg>
              <div><strong>Flag on vector q.55</strong> — claims "KRIs linked to actions" but the doc has no KRI-action mapping table. Recommend review.</div>
            </div>
            <div style={{ padding: '8px 12px', background: nuTokens.bgSubtle, borderRadius: 6, fontSize: 12, color: nuTokens.inkSoft }}>
              <strong>Why this matters:</strong> auditors can ask "where's the evidence" for any score, and the LLM has already pre-flagged where the evidence-claim alignment is weak.
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid ${nuTokens.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted }}>scanned 8 evidence files · 2 flagged · 0.4s</span>
          <button style={{ padding: '6px 12px', borderRadius: 6, background: nuTokens.ink, color: nuTokens.bg, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>
            Open flagged →
          </button>
        </div>
      </div>

      {/* CARD 2: Narration */}
      <div style={{ background: nuTokens.panel, border: `1px solid ${nuTokens.border}`, borderRadius: 12, padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <NuLabel tone="ink" size={11}>② Narration · claim 17</NuLabel>
          <NuChip tone="accent">Claude Haiku</NuChip>
        </div>
        <p style={{ fontSize: 13, color: nuTokens.inkSoft, marginBottom: 14, lineHeight: 1.5 }}>
          Live Brief copy + chat replies. Always grounded in the deterministic analysis JSON.
          Falls back to a 15-pattern matcher offline.
        </p>

        <div style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted, marginBottom: 4 }}>user asked: "weakest gap"</div>
        <div style={{ padding: 12, background: nuTokens.accentSoft, borderRadius: 8, fontSize: 13.5, lineHeight: 1.55 }}>
          The structural weak spot is <strong>Risk Treatment</strong> — and importantly, it's
          <em> not</em> just one bad number. People-dimension scores trail 0.6 below Tech-dimension
          across this pillar, which suggests the ownership layer is the root cause, not the controls themselves
          <sup style={{ color: nuTokens.accent }}>¹</sup>.
          <div style={{ marginTop: 8, ...nuFont.mono, fontSize: 10, color: nuTokens.accent, letterSpacing: '0.06em' }}>
            ¹ vectors 53, 55, 58 · target 3.60 · current 2.95 · deterministic engine v2.4
          </div>
        </div>

        <div style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted, margin: '14px 0 4px' }}>fallback · deterministic 15-pattern matcher</div>
        <div style={{ padding: 12, background: nuTokens.bgSubtle, borderRadius: 8, fontSize: 13.5, lineHeight: 1.55, color: nuTokens.inkSoft }}>
          Generation's weakest gap is Risk Treatment at −0.65 below Industry benchmark. Three vectors carry 70% of the regression.
        </div>

        <div style={{ marginTop: 14, padding: 10, background: nuTokens.bgSubtle, borderRadius: 6, fontSize: 12, color: nuTokens.inkSoft, lineHeight: 1.5 }}>
          Both narrate the <strong>same numbers from the deterministic engine</strong>. Difference is voice, not facts.
        </div>
      </div>
    </div>

    {/* Sacrosanct footer */}
    <div style={{ marginTop: 22, padding: '16px 20px', background: nuTokens.ink, color: nuTokens.bg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 32, height: 32, borderRadius: 999, background: 'rgba(255,255,255,0.10)', color: nuTokens.accent, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 7l3 3 7-7"/><circle cx="8" cy="8" r="6.5" opacity="0.5"/></svg>
        </span>
        <div>
          <div style={{ ...nuFont.ui, fontSize: 15, fontWeight: 600 }}>Scoring engine — sacrosanct.</div>
          <div style={{ fontSize: 12.5, color: 'rgba(245,242,236,0.65)', marginTop: 2 }}>
            LLM never computes a score. Identical responses always produce identical reports — patent claim 24,
            pinned by 35 unit tests + 6 property-based assertions in CI.
          </div>
        </div>
      </div>
      <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.accent, letterSpacing: '0.10em' }}>● 35/35 tests passing</span>
    </div>
  </div>
);

window.DPHistoryList = DPHistoryList;
window.DPEmptyStates = DPEmptyStates;
window.DPSystemStates = DPSystemStates;
window.DPSettings = DPSettings;
window.DPMobile = DPMobile;
window.DPAIComparison = DPAIComparison;

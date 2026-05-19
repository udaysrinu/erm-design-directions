/* Direction D — the actual answer.
 *
 * Throws out the Editorial Atlas pastiche entirely. Synthesizes:
 *   - Runway:  warm cream BG, terracotta accent, big numbers, restrained chrome,
 *              AI "hover" mode, scenarios as first-class.
 *   - Louisa:  the product hero IS a LIVE BRIEF card with named entities,
 *              relationship paths, signal → path → opportunity framing,
 *              dollar amounts attached to AI surfaces.
 *   - Foundry: dense entity tables w/ monospace IDs, ontology hint,
 *              industrial precision in micro-details.
 *
 * No Fraunces, no "Chapter I", no MMXXVI. Just a working analytical product.
 */

const nuTokens = {
  // Warm but contemporary — Runway-ish, lighter than the Atlas cream
  bg:        "#FAF7F1",
  bgSubtle:  "#F4F0E8",
  panel:     "#FFFFFF",
  panelAlt:  "#F8F5EE",

  // Near-black, slight warm
  ink:       "#16181A",
  inkSoft:   "rgba(22, 24, 26, 0.74)",
  inkMuted:  "rgba(22, 24, 26, 0.52)",
  inkSubtle: "rgba(22, 24, 26, 0.34)",
  inkFaint:  "rgba(22, 24, 26, 0.14)",

  border:    "rgba(22, 24, 26, 0.08)",
  borderStr: "rgba(22, 24, 26, 0.16)",

  // ACCENT: warm terracotta — my synthesis choice (not Runway-extracted)
  accent:    "#C4542A",
  accentSoft:"rgba(196, 84, 42, 0.10)",
  accentLine:"rgba(196, 84, 42, 0.30)",

  // Secondary: institutional muted blue for benchmark/comparison
  blue:      "#2C5F8C",
  blueSoft:  "rgba(44, 95, 140, 0.10)",

  // Status — desaturated
  ok:        "#3F7A57",
  okSoft:    "rgba(63, 122, 87, 0.12)",
  warn:      "#B5862A",
  warnSoft:  "rgba(181, 134, 42, 0.12)",
  crit:      "#A6442B",
  critSoft:  "rgba(166, 68, 43, 0.10)",

  // Dark accent footer/rail
  ground:    "#1A1B1E",
  groundInk: "rgba(250, 247, 241, 0.62)",
};

const nuFont = {
  // Single sans. No serif. Period.
  ui:   { fontFamily: '"Inter Tight", "Inter", system-ui, -apple-system, sans-serif', fontFeatureSettings: '"ss01"' },
  mono: { fontFamily: '"JetBrains Mono", ui-monospace, monospace' },
};

// ── tiny atoms ─────────────────────────────────────────────────
const NuLabel = ({ children, tone, size = 10 }) => {
  const color = tone === "accent" ? nuTokens.accent : tone === "ink" ? nuTokens.ink :
                tone === "blue" ? nuTokens.blue : nuTokens.inkMuted;
  return (
    <span style={{
      ...nuFont.mono, fontSize: size, fontWeight: 500,
      letterSpacing: '0.10em', textTransform: 'uppercase', color,
    }}>{children}</span>
  );
};

const NuChip = ({ children, tone = "ink", icon }) => {
  const bg = tone === "accent" ? nuTokens.accentSoft :
             tone === "ok" ? nuTokens.okSoft :
             tone === "warn" ? nuTokens.warnSoft :
             tone === "crit" ? nuTokens.critSoft :
             tone === "blue" ? nuTokens.blueSoft : nuTokens.bgSubtle;
  const fg = tone === "accent" ? nuTokens.accent :
             tone === "ok" ? nuTokens.ok :
             tone === "warn" ? nuTokens.warn :
             tone === "crit" ? nuTokens.crit :
             tone === "blue" ? nuTokens.blue : nuTokens.inkSoft;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px', borderRadius: 4,
      background: bg, color: fg,
      ...nuFont.mono, fontSize: 10, fontWeight: 500,
      letterSpacing: '0.10em', textTransform: 'uppercase',
    }}>
      {icon}{children}
    </span>
  );
};

// Pulse dot — for "live" / "drift detected"
const NuPulse = ({ color }) => (
  <span style={{ position: 'relative', display: 'inline-block', width: 7, height: 7 }}>
    <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: color }} />
    <span style={{
      position: 'absolute', inset: -3, borderRadius: 999,
      background: color, opacity: 0.25,
    }} />
  </span>
);

// Avatar — initials only, no photos
const NuAvatar = ({ initials, size = 28, tone = "ink" }) => {
  const bg = tone === "accent" ? nuTokens.accent : tone === "blue" ? nuTokens.blue : nuTokens.ink;
  return (
    <span style={{
      width: size, height: size, borderRadius: 999,
      background: bg, color: '#FAF7F1',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      ...nuFont.ui, fontSize: size * 0.36, fontWeight: 600,
      letterSpacing: '-0.01em', flexShrink: 0,
    }}>{initials}</span>
  );
};

// Sparkline — clean, single accent
const NuSpark = ({ pillar, w = 78, h = 22 }) => {
  const seed = pillar.id.charCodeAt(0);
  const pts = Array.from({ length: 14 }, (_, i) => {
    const base = pillar.score;
    const trend = (i / 13) * (pillar.score - pillar.target) * 0.7;
    const wobble = Math.sin((seed + i) * 1.9) * 0.16;
    return Math.max(1, Math.min(5, base - trend + wobble));
  });
  const max = 5, min = 1;
  const path = pts.map((v, i) => {
    const x = (i / (pts.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const fillPath = `${path} L${w},${h} L0,${h} Z`;
  const sev = severity(pillar.score, pillar.target);
  const color = sev === "ok" ? nuTokens.ok : sev === "warn" ? nuTokens.warn : nuTokens.crit;
  const lastX = w;
  const lastY = h - ((pts[pts.length - 1] - min) / (max - min)) * h;
  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <path d={fillPath} fill={color} opacity="0.12" />
      <path d={path} fill="none" stroke={color} strokeWidth="1.4" />
      <circle cx={lastX} cy={lastY} r="2.5" fill={color} />
    </svg>
  );
};

// Ontology-style graph hint — small relationship diagram
const NuRelGraph = ({ w = 280, h = 110 }) => {
  // Three nodes — signal, owner, action
  const nodes = [
    { x: 28, y: 55, label: "SIGNAL",   kind: "accent" },
    { x: 140, y: 30, label: "OWNER",   kind: "blue" },
    { x: 140, y: 80, label: "EVIDENCE",kind: "ink" },
    { x: 252, y: 55, label: "ACTION",  kind: "accent" },
  ];
  const links = [[0,1],[0,2],[1,3],[2,3]];
  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      {links.map(([a,b], i) => {
        const x1 = nodes[a].x, y1 = nodes[a].y;
        const x2 = nodes[b].x, y2 = nodes[b].y;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={nuTokens.inkFaint} strokeWidth="1" strokeDasharray="2 3" />;
      })}
      {nodes.map((n, i) => {
        const color = n.kind === "accent" ? nuTokens.accent :
                      n.kind === "blue" ? nuTokens.blue : nuTokens.ink;
        return (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="6" fill={color} />
            <circle cx={n.x} cy={n.y} r="11" fill="none" stroke={color} strokeOpacity="0.25" />
            <text x={n.x} y={n.y + 28} fontSize="8.5" fontWeight="600"
              fill={nuTokens.inkMuted} letterSpacing="0.12em"
              textAnchor="middle" style={nuFont.mono}>
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// Big radar — minimal, clean
const NuRadar = ({ size = 340 }) => {
  const cx = size/2, cy = size/2, r = size/2 - 36;
  const scores = ERM_DATA.pillars.map(p => p.score);
  const targets = ERM_DATA.pillars.map(p => p.target);
  return (
    <svg width={size} height={size}>
      {[0.25, 0.5, 0.75, 1].map(k => (
        <circle key={k} cx={cx} cy={cy} r={r * k} fill="none"
          stroke={nuTokens.border} strokeWidth="0.6" />
      ))}
      {ERM_DATA.pillars.map((_, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 10;
        return <line key={i} x1={cx} y1={cy}
          x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r}
          stroke={nuTokens.border} strokeWidth="0.5" />;
      })}
      <polygon points={radarPoints(targets, 5, cx, cy, r)}
        fill={nuTokens.blueSoft}
        stroke={nuTokens.blue} strokeWidth="1.1" strokeDasharray="3 3" />
      <polygon points={radarPoints(scores, 5, cx, cy, r)}
        fill={nuTokens.accent} fillOpacity="0.14"
        stroke={nuTokens.accent} strokeWidth="1.8" />
      {ERM_DATA.pillars.map((p, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 10;
        const x = cx + Math.cos(a) * r * (p.score / 5);
        const y = cy + Math.sin(a) * r * (p.score / 5);
        const sev = severity(p.score, p.target);
        const color = sev === "ok" ? nuTokens.ok : sev === "warn" ? nuTokens.warn : nuTokens.crit;
        return <circle key={p.id} cx={x} cy={y} r="3.5" fill={color}
          stroke={nuTokens.panel} strokeWidth="1.5" />;
      })}
      {ERM_DATA.pillars.map((p, i) => {
        const pos = radarLabelPos(i, 10, cx, cy, r, 22);
        const anchor = Math.abs(Math.cos(pos.a)) < 0.3 ? "middle" : pos.x > cx ? "start" : "end";
        return (
          <text key={p.id} x={pos.x} y={pos.y}
            fontSize="10" fontWeight="500"
            fontFamily="Inter Tight, Inter"
            fill={nuTokens.inkSoft}
            textAnchor={anchor} dominantBaseline="middle"
            letterSpacing="-0.005em">
            {p.short.slice(0, 1) + p.short.slice(1).toLowerCase()}
          </text>
        );
      })}
    </svg>
  );
};

// ── main composition ──────────────────────────────────────────
const DirectionD = () => (
  <div style={{
    width: 1440, minHeight: 1480,
    background: nuTokens.bg,
    color: nuTokens.ink,
    ...nuFont.ui,
    fontSize: 14, lineHeight: 1.5,
    position: 'relative', overflow: 'hidden',
  }}>
    {/* === NAV === */}
    <header style={{
      height: 56,
      borderBottom: `1px solid ${nuTokens.border}`,
      background: nuTokens.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{
            width: 22, height: 22, borderRadius: 5,
            background: nuTokens.ink,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ width: 8, height: 8, background: nuTokens.accent, borderRadius: 2 }} />
          </span>
          <span style={{ ...nuFont.ui, fontSize: 15, fontWeight: 600, letterSpacing: '-0.015em' }}>
            Navigator
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {[
            { l: "Today", active: true },
            { l: "Maturity" },
            { l: "Drift" },
            { l: "Roadmap" },
            { l: "Evidence" },
          ].map(t => (
            <button key={t.l} style={{
              ...nuFont.ui, fontSize: 13, fontWeight: 500,
              padding: '6px 12px', borderRadius: 6,
              background: t.active ? nuTokens.bgSubtle : 'transparent',
              color: t.active ? nuTokens.ink : nuTokens.inkMuted,
              border: 'none', cursor: 'pointer',
            }}>{t.l}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 10px', minWidth: 240, borderRadius: 6,
          background: nuTokens.bgSubtle, border: 'none',
          color: nuTokens.inkMuted, ...nuFont.ui, fontSize: 13, cursor: 'pointer',
          textAlign: 'left',
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="5.5" cy="5.5" r="3.5"/><path d="M8.5 8.5L11.5 11.5"/>
          </svg>
          <span style={{ flex: 1 }}>Search risks, actions, evidence…</span>
          <span style={{
            ...nuFont.mono, fontSize: 10, padding: '1px 5px',
            background: nuTokens.bg, color: nuTokens.inkMuted,
            border: `1px solid ${nuTokens.border}`, borderRadius: 3,
          }}>⌘K</span>
        </button>
        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 13px', borderRadius: 6,
          background: nuTokens.ink, color: nuTokens.bg,
          border: 'none', ...nuFont.ui, fontSize: 13, fontWeight: 500,
          cursor: 'pointer',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: nuTokens.accent }} />
          Ask Navigator
        </button>
        <NuAvatar initials="AS" size={28} />
      </div>
    </header>

    {/* === CONTEXT BAR === */}
    <div style={{
      padding: '14px 32px',
      borderBottom: `1px solid ${nuTokens.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <NuLabel>workspace</NuLabel>
        <span style={{ fontSize: 14, fontWeight: 500 }}>The organization</span>
        <span style={{ color: nuTokens.inkSubtle }}>/</span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '4px 10px', background: nuTokens.panel,
          border: `1px solid ${nuTokens.border}`, borderRadius: 6,
          ...nuFont.ui, fontSize: 13, fontWeight: 500, cursor: 'pointer',
        }}>
          <span style={{ width: 6, height: 6, background: nuTokens.accent, borderRadius: 999 }} />
          Generation
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M2 4l3 3 3-3" stroke={nuTokens.inkMuted} fill="none" strokeWidth="1.3"/>
          </svg>
        </span>
        <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>·  bench: Industry</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>
        <span>Last sync 14m ago</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <NuPulse color={nuTokens.warn} />
          3 active drift signals
        </span>
      </div>
    </div>

    {/* === HERO BRIEF (Louisa pattern) === */}
    <div style={{ padding: '24px 32px 8px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
      }}>
        <NuLabel tone="accent" size={11}>● Live brief · today</NuLabel>
        <span style={{ flex: 1, height: 1, background: nuTokens.border }} />
        <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>
          Mon, May 19 · 14:32 GMT+3
        </span>
      </div>

      <div style={{
        background: nuTokens.panel,
        border: `1px solid ${nuTokens.border}`,
        borderTop: `3px solid ${nuTokens.accent}`,
        borderRadius: 12,
        padding: 28,
        display: 'grid', gridTemplateColumns: '1.6fr 1fr',
        gap: 32,
      }}>
        {/* LEFT — the narrative */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <NuChip tone="accent">Signal detected</NuChip>
            <NuChip tone="warn">Maturity drift · 7d</NuChip>
            <span style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.inkMuted, letterSpacing: '0.06em' }}>
              SIG-2026-0519-A7F3
            </span>
          </div>

          <h1 style={{
            ...nuFont.ui, fontSize: 38, fontWeight: 500, letterSpacing: '-0.025em',
            lineHeight: 1.12, margin: 0, color: nuTokens.ink,
          }}>
            <span style={{ color: nuTokens.accent }}>Risk Treatment</span> at Generation
            regressed <span style={{ ...nuFont.mono, fontWeight: 600 }}>−0.60</span> at session 3
            — the operator has not yet flagged it.
          </h1>

          <p style={{
            fontSize: 15, lineHeight: 1.55, color: nuTokens.inkSoft,
            margin: '14px 0 0', maxWidth: 640,
          }}>
            Drift detection caught it before the next review cycle. <strong style={{ color: nuTokens.ink }}>The
            scoring engine is deterministic</strong> — same responses, same number, 35 unit tests
            pinned in CI. A Phase-1 treatment-plan action recovers
            <strong style={{ color: nuTokens.ok }}> +0.34 maturity</strong> in 90 days at Low effort.
          </p>

          {/* Reproducibility trust band — the patent moat made visible */}
          <div style={{
            marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 14,
            padding: '6px 12px', borderRadius: 999,
            background: nuTokens.bgSubtle, border: `1px solid ${nuTokens.border}`,
          }}>
            <span style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkSoft }}>
              <span style={{ color: nuTokens.ok }}>●</span> deterministic
            </span>
            <span style={{ width: 1, height: 12, background: nuTokens.borderStr }} />
            <span style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkSoft }}>
              ISO 31000 · COSO ERM · NIST RMF · RIMS RMM
            </span>
            <span style={{ width: 1, height: 12, background: nuTokens.borderStr }} />
            <span style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkSoft }}>
              35 tests · pinned
            </span>
          </div>

          {/* Entity row — Louisa-style */}
          <div style={{
            marginTop: 22, padding: '14px 0',
            borderTop: `1px solid ${nuTokens.border}`,
            borderBottom: `1px solid ${nuTokens.border}`,
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
          }}>
            <div>
              <NuLabel>Owner</NuLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                <NuAvatar initials="FA" size={32} />
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>Fahad Al-Otaibi</div>
                  <div style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted, marginTop: 1 }}>
                    Generation · Risk Lead
                  </div>
                </div>
              </div>
            </div>
            <div>
              <NuLabel>Originator</NuLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                <NuAvatar initials="NM" size={32} tone="blue" />
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>Nora Mansour</div>
                  <div style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted, marginTop: 1 }}>
                    flagged Mar 14 · v#41
                  </div>
                </div>
              </div>
            </div>
            <div>
              <NuLabel>Evidence</NuLabel>
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 32, height: 32, borderRadius: 6,
                  background: nuTokens.bgSubtle, border: `1px solid ${nuTokens.border}`,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  ...nuFont.mono, fontSize: 10, color: nuTokens.inkMuted,
                }}>PDF</span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>Q1-culture-survey.pdf</div>
                  <div style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted, marginTop: 1 }}>
                    + 2 incident logs · linked
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
            <button style={{
              ...nuFont.ui, fontSize: 13, fontWeight: 500,
              padding: '9px 16px', borderRadius: 7,
              background: nuTokens.ink, color: nuTokens.bg, border: 'none',
              cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              Open action plan
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M2 5.5h7M6 2.5l3 3-3 3"/>
              </svg>
            </button>
            <button style={{
              ...nuFont.ui, fontSize: 13, fontWeight: 500,
              padding: '9px 14px', borderRadius: 7,
              background: 'transparent', color: nuTokens.ink,
              border: `1px solid ${nuTokens.borderStr}`, cursor: 'pointer',
            }}>
              Ask Navigator why
            </button>
            <button style={{
              ...nuFont.ui, fontSize: 13, fontWeight: 500,
              padding: '9px 14px', borderRadius: 7,
              background: 'transparent', color: nuTokens.inkMuted,
              border: `1px solid ${nuTokens.border}`, cursor: 'pointer',
            }}>
              Dismiss · 24h
            </button>
          </div>
        </div>

        {/* RIGHT — the math */}
        <div style={{
          background: nuTokens.panelAlt,
          borderRadius: 8, padding: 22,
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          <div>
            <NuLabel>If we ship Phase-1 in 90 days</NuLabel>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
              <span style={{ ...nuFont.ui, fontSize: 48, fontWeight: 500, letterSpacing: '-0.03em', color: nuTokens.ok }}>
                +0.34
              </span>
              <span style={{ ...nuFont.mono, fontSize: 12, color: nuTokens.inkMuted }}>maturity</span>
            </div>
            <div style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkSoft, marginTop: 2 }}>
              culture: 2.78 → 3.12 · pulls overall +0.07
            </div>
          </div>
          <div style={{ height: 1, background: nuTokens.border }} />
          <div>
            <NuLabel>If we hold pattern</NuLabel>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
              <span style={{ ...nuFont.ui, fontSize: 32, fontWeight: 500, letterSpacing: '-0.03em', color: nuTokens.crit }}>
                −0.18
              </span>
              <span style={{ ...nuFont.mono, fontSize: 12, color: nuTokens.inkMuted }}>by Sep 2026</span>
            </div>
            <div style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkSoft, marginTop: 2 }}>
              culture drops below 2.60 · downgrades 3 pillars
            </div>
          </div>
          <div style={{ height: 1, background: nuTokens.border }} />
          <NuRelGraph w={260} h={100} />
          <div style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted, textAlign: 'center', marginTop: -6 }}>
            signal → owner + evidence → action
          </div>
        </div>
      </div>

      {/* Secondary briefs row */}
      <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          { tone: "warn",  pillar: "Risk Treatment",    metric: "−0.31",  copy: "Treatment-plan ownership unclear on 6 of 12 active risks. Phase-1 ledger fix queued.", id: "SIG-2026-0518-B2C1" },
          { tone: "warn",  pillar: "Monitoring & Review", metric: "−0.18", copy: "KRI thresholds last reviewed Aug 2025. Three breached without escalation in 14d.",      id: "SIG-2026-0517-D4E9" },
          { tone: "ok",    pillar: "Risk Identification",metric: "+0.22",  copy: "New supply-chain register pushed Identification above Industry for first time.",          id: "SIG-2026-0516-F8A2" },
        ].map((b, i) => {
          const tone = b.tone;
          const accentC = tone === "ok" ? nuTokens.ok : tone === "warn" ? nuTokens.warn : nuTokens.crit;
          return (
            <div key={i} style={{
              background: nuTokens.panel,
              border: `1px solid ${nuTokens.border}`,
              borderRadius: 10,
              padding: 16,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <NuChip tone={tone}>{tone === "ok" ? "Recovery" : "Drift"}</NuChip>
                <span style={{ ...nuFont.mono, fontSize: 10.5, color: accentC, fontWeight: 600 }}>{b.metric}</span>
              </div>
              <div style={{ ...nuFont.ui, fontSize: 14.5, fontWeight: 500, marginTop: 10, letterSpacing: '-0.005em' }}>
                {b.pillar}
              </div>
              <div style={{ fontSize: 12.5, color: nuTokens.inkSoft, marginTop: 4, lineHeight: 1.45 }}>
                {b.copy}
              </div>
              <div style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.inkSubtle, marginTop: 12, letterSpacing: '0.06em' }}>
                {b.id}
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* === MATURITY WORKSPACE === */}
    <div style={{
      marginTop: 28, padding: '0 32px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <NuLabel size={11}>Maturity workspace</NuLabel>
        <span style={{ flex: 1, height: 1, background: nuTokens.border }} />
        <div style={{ display: 'flex', gap: 4, background: nuTokens.bgSubtle, padding: 3, borderRadius: 6 }}>
          {["Industry","Peer","Target","External"].map((t, i) => (
            <button key={t} style={{
              ...nuFont.ui, fontSize: 12, fontWeight: 500,
              padding: '4px 11px', borderRadius: 4, border: 'none', cursor: 'pointer',
              background: i === 0 ? nuTokens.panel : 'transparent',
              color: i === 0 ? nuTokens.ink : nuTokens.inkMuted,
              boxShadow: i === 0 ? `0 1px 2px ${nuTokens.borderStr}` : 'none',
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 16 }}>
        {/* LEFT — score block + sortable pillar table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Big score, Runway-style */}
          <div style={{
            background: nuTokens.panel,
            border: `1px solid ${nuTokens.border}`,
            borderRadius: 12,
            padding: 24,
            display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 28, alignItems: 'center',
          }}>
            <div>
              <NuLabel>Overall maturity</NuLabel>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
                <span style={{ ...nuFont.ui, fontSize: 84, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
                  {ERM_DATA.overallScore.toFixed(2)}
                </span>
                <span style={{ ...nuFont.mono, fontSize: 14, color: nuTokens.inkMuted }}>/5.00</span>
              </div>
              <div style={{ marginTop: 6, display: 'flex', gap: 14 }}>
                <span style={{ fontSize: 12, color: nuTokens.inkSoft }}>
                  <span style={{ ...nuFont.mono, color: nuTokens.crit, fontWeight: 600 }}>−0.21</span>
                  <span style={{ color: nuTokens.inkMuted }}> vs Industry 3.55</span>
                </span>
                <span style={{ fontSize: 12, color: nuTokens.inkSoft }}>
                  <span style={{ ...nuFont.mono, color: nuTokens.crit, fontWeight: 600 }}>−0.18</span>
                  <span style={{ color: nuTokens.inkMuted }}> over 30d</span>
                </span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {[
                { l: "Aligned pillars", v: "2", u: "of 10", tone: "crit" },
                { l: "Drift signals", v: "3", u: "critical · 7d", tone: "warn" },
                { l: "Roadmap queue", v: "12", u: "actions", tone: "ink" },
                { l: "Evidence linked", v: "98", u: "%", tone: "ok" },
              ].map((k, i) => {
                const color = k.tone === "ok" ? nuTokens.ok : k.tone === "warn" ? nuTokens.warn :
                              k.tone === "crit" ? nuTokens.crit : nuTokens.ink;
                return (
                  <div key={i}>
                    <NuLabel size={9}>{k.l}</NuLabel>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                      <span style={{ ...nuFont.ui, fontSize: 30, fontWeight: 500, color, letterSpacing: '-0.02em', lineHeight: 1 }}>
                        {k.v}
                      </span>
                      <span style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.inkMuted }}>{k.u}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pillar matrix — Foundry-density */}
          <div style={{
            background: nuTokens.panel,
            border: `1px solid ${nuTokens.border}`,
            borderRadius: 12,
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '14px 18px', borderBottom: `1px solid ${nuTokens.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <NuLabel tone="ink" size={11}>Pillars · 10</NuLabel>
                <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>·  sort: gap desc</span>
              </div>
              <button style={{
                ...nuFont.ui, fontSize: 12, color: nuTokens.inkMuted, background: 'transparent',
                border: 'none', cursor: 'pointer',
              }}>
                Customize ›
              </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, ...nuFont.ui }}>
              <thead>
                <tr style={{ background: nuTokens.panelAlt }}>
                  {[
                    { l: "#", w: 36, a: 'left' },
                    { l: "Pillar", a: 'left' },
                    { l: "Score", w: 64, a: 'right' },
                    { l: "Bench", w: 60, a: 'right' },
                    { l: "Gap", w: 70, a: 'right' },
                    { l: "14-period trend", w: 90, a: 'left' },
                    { l: "Owner", w: 130, a: 'left' },
                    { l: "Status", w: 110, a: 'left' },
                  ].map(h => (
                    <th key={h.l} style={{
                      padding: '8px 12px', textAlign: h.a, width: h.w,
                      ...nuFont.mono, fontSize: 9.5, fontWeight: 500,
                      letterSpacing: '0.10em', textTransform: 'uppercase',
                      color: nuTokens.inkMuted,
                    }}>{h.l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...ERM_DATA.pillars].sort((a, b) => (b.target - b.score) - (a.target - a.score)).map((p, i) => {
                  const sev = severity(p.score, p.target);
                  const gap = p.score - p.target;
                  const sevColor = sev === "ok" ? nuTokens.ok : sev === "warn" ? nuTokens.warn : nuTokens.crit;
                  const owners = [
                    { i: "FA", n: "Fahad Al-Otaibi", tone: "ink" },
                    { i: "NM", n: "Nora Mansour", tone: "blue" },
                    { i: "RA", n: "Reem Al-Saud", tone: "accent" },
                  ];
                  const owner = owners[i % owners.length];
                  return (
                    <tr key={p.id} style={{ borderTop: `1px solid ${nuTokens.border}` }}>
                      <td style={{ padding: '11px 12px', ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted }}>
                        {String(i + 1).padStart(2, '0')}
                      </td>
                      <td style={{ padding: '11px 12px' }}>
                        <div style={{ fontSize: 13.5, fontWeight: 500, color: nuTokens.ink }}>{p.name}</div>
                        <div style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted, marginTop: 1.5 }}>
                          pillar.{p.id} · 10 vectors
                        </div>
                      </td>
                      <td style={{ padding: '11px 12px', textAlign: 'right', ...nuFont.ui, fontSize: 16, fontWeight: 600, color: nuTokens.ink, letterSpacing: '-0.01em' }}>
                        {p.score.toFixed(2)}
                      </td>
                      <td style={{ padding: '11px 12px', textAlign: 'right', ...nuFont.mono, fontSize: 12, color: nuTokens.blue }}>
                        {p.target.toFixed(2)}
                      </td>
                      <td style={{ padding: '11px 12px', textAlign: 'right', ...nuFont.mono, fontSize: 12, color: sevColor, fontWeight: 600 }}>
                        {gap >= 0 ? '+' : ''}{gap.toFixed(2)}
                      </td>
                      <td style={{ padding: '6px 12px' }}>
                        <NuSpark pillar={p} />
                      </td>
                      <td style={{ padding: '8px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <NuAvatar initials={owner.i} size={22} tone={owner.tone} />
                          <span style={{ fontSize: 12, color: nuTokens.inkSoft }}>{owner.n.split(' ')[0]}</span>
                        </div>
                      </td>
                      <td style={{ padding: '11px 12px' }}>
                        <NuChip tone={sev === "ok" ? "ok" : sev === "warn" ? "warn" : "crit"}>
                          {sev === "ok" ? "On bench" : sev === "warn" ? "Drifting" : "Critical"}
                        </NuChip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT — radar + queue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            background: nuTokens.panel,
            border: `1px solid ${nuTokens.border}`,
            borderRadius: 12,
            padding: 18,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <NuLabel tone="ink" size={11}>Coverage</NuLabel>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 2, background: nuTokens.accent }} />
                  <span style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkSoft }}>current</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, borderTop: `1.5px dashed ${nuTokens.blue}` }} />
                  <span style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkSoft }}>industry</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: -6, marginBottom: -6 }}>
              <NuRadar size={340} />
            </div>
          </div>

          <div style={{
            background: nuTokens.panel,
            border: `1px solid ${nuTokens.border}`,
            borderRadius: 12,
            padding: 18,
            flex: 1,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <NuLabel tone="ink" size={11}>Roadmap queue</NuLabel>
              <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>by expected uplift</span>
            </div>
            {ERM_DATA.roadmap.slice(0, 4).map((r, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '28px 1fr auto',
                gap: 10, alignItems: 'center',
                padding: '11px 0',
                borderTop: i === 0 ? 'none' : `1px solid ${nuTokens.border}`,
              }}>
                <span style={{
                  ...nuFont.mono, fontSize: 10, fontWeight: 600,
                  color: r.phase === 1 ? nuTokens.accent : nuTokens.inkMuted,
                  padding: '2px 0', textAlign: 'center',
                  border: `1px solid ${r.phase === 1 ? nuTokens.accentLine : nuTokens.borderStr}`,
                  borderRadius: 3, background: r.phase === 1 ? nuTokens.accentSoft : 'transparent',
                  letterSpacing: '0.04em',
                }}>P{r.phase}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: nuTokens.ink, lineHeight: 1.35 }}>{r.name}</div>
                  <div style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted, marginTop: 2 }}>
                    {r.pillar.toLowerCase()} · {r.effort.toLowerCase()} effort
                  </div>
                </div>
                <span style={{
                  ...nuFont.mono, fontSize: 14, fontWeight: 600, color: nuTokens.ok,
                  textAlign: 'right',
                }}>+{r.uplift.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer style={{
      marginTop: 28, height: 36,
      background: nuTokens.ground, color: nuTokens.groundInk,
      ...nuFont.mono, fontSize: 10.5,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px',
    }}>
      <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
        <span><span style={{ color: nuTokens.ok }}>●</span>  Drift engine</span>
        <span><span style={{ color: nuTokens.ok }}>●</span>  Scoring · 28ms</span>
        <span><span style={{ color: nuTokens.accent }}>●</span>  Navigator AI · idle</span>
        <span style={{ opacity: 0.6 }}>tx · a7f3-2c4d-9e</span>
      </div>
      <div style={{ display: 'flex', gap: 18, opacity: 0.7 }}>
        <span>ISO 31000 · COSO ERM · NIST RMF</span>
        <span>SOC 2 Type II</span>
      </div>
    </footer>
  </div>
);

window.DirectionD = DirectionD;
Object.assign(window, {
  nuTokens, nuFont,
  NuLabel, NuChip, NuPulse, NuAvatar, NuSpark, NuRelGraph, NuRadar,
});

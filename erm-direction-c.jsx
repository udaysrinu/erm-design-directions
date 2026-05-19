/* Direction C — Analytical Platform (RECOMMENDED).
   Inspired by Runway's warmth, Pry's modernity, Louisa.ai's AI-first lede,
   and Palantir Foundry's dense tabular ontology. Keeps Atlas's editorial
   DNA in micro-doses (Fraunces hero, ink, gold accent) but everything else
   is a working analytical platform.
*/

const platformTokens = {
  bg: "#FAF7F2",          // warm off-white, softer than Atlas
  bgPanel: "#FFFFFF",      // crisp white panels for data
  bgRaised: "#F4F0E8",
  bgRail: "#13171D",       // dark rail/header accents (Foundry hint)
  bgRailHover: "#1C2128",
  border: "rgba(20, 24, 31, 0.08)",
  borderStrong: "rgba(20, 24, 31, 0.16)",
  ink: "#14181F",          // near-black, slight warm
  inkSoft: "rgba(20, 24, 31, 0.72)",
  inkMuted: "rgba(20, 24, 31, 0.50)",
  inkSubtle: "rgba(20, 24, 31, 0.32)",
  inkInv: "#F5F2EC",       // ink on dark rail
  inkInvMuted: "rgba(245, 242, 236, 0.55)",
  // Accent palette — deep institutional blue from Foundry, warm gold from Atlas
  blue: "#1B4D8C",
  blueSoft: "rgba(27, 77, 140, 0.10)",
  gold: "#B8923A",
  goldSoft: "rgba(184, 146, 58, 0.12)",
  // Status — desaturated
  ok: "#3D7A56",
  okSoft: "rgba(61, 122, 86, 0.10)",
  warn: "#B8923A",
  warnSoft: "rgba(184, 146, 58, 0.12)",
  crit: "#A6442B",
  critSoft: "rgba(166, 68, 43, 0.10)",
};

const platformStyles = {
  body:    { fontFamily: '"Inter", "Inter Tight", system-ui, sans-serif' },
  display: { fontFamily: '"Fraunces", "Times New Roman", serif', letterSpacing: '-0.022em' },
  mono:    { fontFamily: '"JetBrains Mono", ui-monospace, monospace' },
};

const PlatformLabel = ({ children, tone = "muted" }) => {
  const color = tone === "gold" ? platformTokens.gold : tone === "ink" ? platformTokens.ink :
                tone === "blue" ? platformTokens.blue : platformTokens.inkMuted;
  return (
    <span style={{
      ...platformStyles.mono, fontSize: 10, fontWeight: 500,
      letterSpacing: '0.16em', textTransform: 'uppercase', color,
    }}>{children}</span>
  );
};

// Sparkline — tiny line chart from historical scores (synthetic but deterministic)
const Sparkline = ({ pillar, w = 88, h = 22 }) => {
  const seed = pillar.id.charCodeAt(0);
  const pts = Array.from({ length: 12 }, (_, i) => {
    const base = pillar.score;
    const trend = (i / 11) * (pillar.score - pillar.target) * 0.6;
    const wobble = Math.sin((seed + i) * 1.7) * 0.18;
    return Math.max(1, Math.min(5, base - trend + wobble));
  });
  const max = 5, min = 1;
  const path = pts.map((v, i) => {
    const x = (i / (pts.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const sev = severity(pillar.score, pillar.target);
  const stroke = sev === "ok" ? platformTokens.ok : sev === "warn" ? platformTokens.warn : platformTokens.crit;
  // Last point dot
  const lastX = w;
  const lastY = h - ((pts[pts.length - 1] - min) / (max - min)) * h;
  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <path d={path} fill="none" stroke={stroke} strokeWidth="1.4" />
      <circle cx={lastX} cy={lastY} r="2.5" fill={stroke} />
    </svg>
  );
};

// Compact radar for platform
const PlatformRadar = () => {
  const cx = 180, cy = 180, r = 128;
  const scores = ERM_DATA.pillars.map(p => p.score);
  const targets = ERM_DATA.pillars.map(p => p.target);
  return (
    <svg width="360" height="360" viewBox="0 0 360 360">
      {[0.2, 0.4, 0.6, 0.8, 1].map(k => (
        <circle key={k} cx={cx} cy={cy} r={r * k} fill="none"
          stroke={platformTokens.border} strokeWidth="0.6" />
      ))}
      {ERM_DATA.pillars.map((_, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 10;
        return <line key={i} x1={cx} y1={cy}
          x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r}
          stroke={platformTokens.border} strokeWidth="0.5" />;
      })}
      {/* Benchmark first (background) */}
      <polygon points={radarPoints(targets, 5, cx, cy, r)}
        fill={platformTokens.blueSoft}
        stroke={platformTokens.blue} strokeWidth="1.2" strokeDasharray="3 3" />
      {/* Current on top */}
      <polygon points={radarPoints(scores, 5, cx, cy, r)}
        fill={platformTokens.ink} fillOpacity="0.08"
        stroke={platformTokens.ink} strokeWidth="1.8" />
      {ERM_DATA.pillars.map((p, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 10;
        const x = cx + Math.cos(a) * r * (p.score / 5);
        const y = cy + Math.sin(a) * r * (p.score / 5);
        const sev = severity(p.score, p.target);
        const dot = sev === "ok" ? platformTokens.ok : sev === "warn" ? platformTokens.warn : platformTokens.crit;
        return <circle key={p.id} cx={x} cy={y} r="3.5" fill={dot} stroke={platformTokens.bgPanel} strokeWidth="1.5" />;
      })}
      {ERM_DATA.pillars.map((p, i) => {
        const pos = radarLabelPos(i, 10, cx, cy, r, 18);
        const anchor = Math.abs(Math.cos(pos.a)) < 0.3 ? "middle" : pos.x > cx ? "start" : "end";
        return (
          <text key={p.id} x={pos.x} y={pos.y} fontSize="9.5"
            fontFamily="Inter" fontWeight="500" fill={platformTokens.inkMuted}
            textAnchor={anchor} dominantBaseline="middle" letterSpacing="0.04em">
            {p.short}
          </text>
        );
      })}
    </svg>
  );
};

// Tiny ontology graph (Foundry hint) — pillars as nodes with thin links
const OntologyGraph = ({ size = 130 }) => {
  const cx = size / 2, cy = size / 2, r = size / 2 - 14;
  const positions = ERM_DATA.pillars.map((p, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 10;
    return { id: p.id, x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, sev: severity(p.score, p.target) };
  });
  // Cross-links — every node to next + opposite (deterministic)
  const links = [];
  for (let i = 0; i < positions.length; i++) {
    links.push([i, (i + 1) % positions.length]);
    if (i % 2 === 0) links.push([i, (i + 5) % positions.length]);
  }
  return (
    <svg width={size} height={size}>
      {links.map(([a, b], i) => (
        <line key={i} x1={positions[a].x} y1={positions[a].y}
          x2={positions[b].x} y2={positions[b].y}
          stroke={platformTokens.borderStrong} strokeWidth="0.4" opacity="0.6" />
      ))}
      {positions.map(n => {
        const color = n.sev === "ok" ? platformTokens.ok : n.sev === "warn" ? platformTokens.warn : platformTokens.crit;
        return <circle key={n.id} cx={n.x} cy={n.y} r="3" fill={color} />;
      })}
    </svg>
  );
};

// Tiny KRI icons for the rail (Foundry-style)
const RailIcon = ({ paths, active }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
    stroke={active ? platformTokens.gold : platformTokens.inkInvMuted}
    strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    {paths}
  </svg>
);

const DirectionC = () => {
  return (
    <div style={{
      width: 1440, height: 1080,
      background: platformTokens.bg,
      color: platformTokens.ink,
      ...platformStyles.body,
      display: 'grid', gridTemplateColumns: '56px 1fr',
      overflow: 'hidden', position: 'relative',
    }}>
      {/* LEFT RAIL — Foundry-inspired */}
      <aside style={{
        background: platformTokens.bgRail,
        borderRight: `1px solid ${platformTokens.borderStrong}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '14px 0',
      }}>
        {/* Brand mark */}
        <div style={{ width: 30, height: 30, borderRadius: 6, background: platformTokens.gold,
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <span style={{ ...platformStyles.display, fontSize: 16, color: platformTokens.bgRail, fontWeight: 600 }}>N</span>
        </div>
        {[
          { active: true, paths: <><rect x="2" y="2" width="14" height="14" rx="1"/><path d="M2 6h14M6 6v10"/></> },
          { paths: <><path d="M9 2v14M2 9h14"/></> },
          { paths: <><circle cx="9" cy="9" r="6"/><path d="M3 9l4-2 4 2 4-2"/></> },
          { paths: <><path d="M2 14h14M5 14V8M9 14V4M13 14V10"/></> },
          { paths: <><circle cx="9" cy="9" r="6"/><path d="M9 5v4l2 2"/></> },
        ].map((icon, i) => (
          <button key={i} style={{
            width: 36, height: 36, marginBottom: 4,
            background: icon.active ? platformTokens.bgRailHover : 'transparent',
            border: 'none', cursor: 'pointer', borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <RailIcon paths={icon.paths} active={icon.active} />
            {icon.active && <span style={{
              position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)',
              width: 3, height: 18, background: platformTokens.gold, borderRadius: 2,
            }} />}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        {/* Avatar */}
        <div style={{
          width: 28, height: 28, borderRadius: 999,
          background: `linear-gradient(135deg, ${platformTokens.gold}, ${platformTokens.blue})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          ...platformStyles.mono, fontSize: 10, color: platformTokens.bgRail, fontWeight: 600,
        }}>AS</div>
      </aside>

      {/* MAIN */}
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar — breadcrumb + search */}
        <header style={{
          height: 52, borderBottom: `1px solid ${platformTokens.border}`,
          background: platformTokens.bgPanel,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ ...platformStyles.mono, fontSize: 11, color: platformTokens.inkMuted }}>RISK·X·AI</span>
            <span style={{ color: platformTokens.inkSubtle }}>/</span>
            <span style={{ ...platformStyles.mono, fontSize: 11, color: platformTokens.inkSoft }}>SEC</span>
            <span style={{ color: platformTokens.inkSubtle }}>/</span>
            <span style={{ ...platformStyles.mono, fontSize: 11, color: platformTokens.inkSoft }}>units</span>
            <span style={{ color: platformTokens.inkSubtle }}>/</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px',
              background: platformTokens.bgRaised, borderRadius: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: platformTokens.gold }} />
              <span style={{ ...platformStyles.body, fontSize: 12, fontWeight: 500 }}>Generation</span>
              <span style={{ ...platformStyles.mono, fontSize: 10, color: platformTokens.inkMuted }}>· gen</span>
              <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" stroke={platformTokens.inkMuted} fill="none" strokeWidth="1.2"/></svg>
            </span>
            <span style={{ color: platformTokens.inkSubtle }}>/</span>
            <span style={{ ...platformStyles.body, fontSize: 12, color: platformTokens.ink, fontWeight: 500 }}>Command Center</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: platformTokens.bgRaised, padding: '6px 12px',
              borderRadius: 6, minWidth: 280,
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={platformTokens.inkMuted} strokeWidth="1.3">
                <circle cx="5" cy="5" r="3.5"/><path d="M8 8l2.5 2.5"/>
              </svg>
              <span style={{ fontSize: 12, color: platformTokens.inkMuted, flex: 1 }}>Search pillars, vectors, actions…</span>
              <span style={{ ...platformStyles.mono, fontSize: 10, color: platformTokens.inkMuted, padding: '2px 6px', background: platformTokens.bgPanel, borderRadius: 3, border: `1px solid ${platformTokens.border}` }}>⌘K</span>
            </div>
            <button style={{
              ...platformStyles.body, fontSize: 12, fontWeight: 500,
              padding: '7px 12px', borderRadius: 6,
              background: 'transparent', border: `1px solid ${platformTokens.border}`,
              color: platformTokens.ink, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M2 6h8M6 2v8"/></svg>
              Export
            </button>
            <button style={{
              ...platformStyles.body, fontSize: 12, fontWeight: 500,
              padding: '7px 14px', borderRadius: 6,
              background: platformTokens.ink, border: `1px solid ${platformTokens.ink}`,
              color: platformTokens.bg, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ width: 6, height: 6, background: platformTokens.gold, borderRadius: 999 }} />
              Ask Navigator AI
            </button>
          </div>
        </header>

        {/* Hero strip */}
        <div style={{
          background: platformTokens.bgPanel,
          borderBottom: `1px solid ${platformTokens.border}`,
          padding: '22px 24px',
          display: 'grid', gridTemplateColumns: '1.4fr 2.6fr', gap: 24,
        }}>
          {/* Score block */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            <OntologyGraph size={120} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <PlatformLabel>maturity score</PlatformLabel>
                <span style={{
                  padding: '2px 8px', borderRadius: 999,
                  background: platformTokens.warnSoft, color: platformTokens.warn,
                  ...platformStyles.mono, fontSize: 9, fontWeight: 600,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                }}>Drift</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ ...platformStyles.display, fontSize: 80, lineHeight: 0.9, fontWeight: 400 }}>
                  {ERM_DATA.overallScore.toFixed(2)}
                </span>
                <span style={{ ...platformStyles.mono, fontSize: 13, color: platformTokens.inkMuted }}>/5.00</span>
              </div>
              <div style={{ marginTop: 6, display: 'flex', gap: 14 }}>
                <span style={{ fontSize: 12, color: platformTokens.inkSoft }}>
                  <span style={{ ...platformStyles.mono, color: platformTokens.crit, fontWeight: 500 }}>−0.21</span>
                  <span style={{ color: platformTokens.inkMuted }}> vs Industry</span>
                </span>
                <span style={{ fontSize: 12, color: platformTokens.inkSoft }}>
                  <span style={{ ...platformStyles.mono, color: platformTokens.crit, fontWeight: 500 }}>−0.18</span>
                  <span style={{ color: platformTokens.inkMuted }}> 30-day Δ</span>
                </span>
              </div>
            </div>
          </div>

          {/* AI lede — Louisa-inspired */}
          <div style={{
            background: platformTokens.bgRaised,
            border: `1px solid ${platformTokens.border}`,
            borderRadius: 10,
            padding: 16,
            display: 'flex', gap: 14, alignItems: 'flex-start',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              background: platformTokens.ink, color: platformTokens.gold,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <path d="M7 1l1.5 4L13 6.5 8.5 8 7 13 5.5 8 1 6.5 5.5 5z"/>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <PlatformLabel tone="ink">Navigator AI · Executive read</PlatformLabel>
                <span style={{ ...platformStyles.mono, fontSize: 10, color: platformTokens.inkMuted }}>updated 14m ago</span>
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: platformTokens.ink, margin: 0 }}>
                Generation trails Industry by <strong style={{ ...platformStyles.mono, color: platformTokens.crit, fontWeight: 600 }}>0.21</strong>, driven by{' '}
                <strong>Risk Culture (2.78)</strong> and <strong>Risk Treatment (2.95)</strong>. People-led practices
                score lowest across all four dimensions, suggesting a <em>training and incentive root cause</em> rather
                than process gaps. Three Phase-1 actions would close{' '}
                <strong style={{ ...platformStyles.mono, color: platformTokens.ok, fontWeight: 600 }}>+0.84</strong> of
                the gap within two quarters.
              </p>
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                {["why is culture down?", "show treatment gap", "draft board memo"].map((q, i) => (
                  <button key={i} style={{
                    ...platformStyles.body, fontSize: 11, padding: '5px 10px',
                    background: platformTokens.bgPanel,
                    border: `1px solid ${platformTokens.border}`, borderRadius: 4,
                    color: platformTokens.inkSoft, cursor: 'pointer',
                  }}>{q}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* KPI strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
          background: platformTokens.bgPanel,
          borderBottom: `1px solid ${platformTokens.border}`,
        }}>
          {[
            { l: "Benchmark · Industry", v: ERM_DATA.benchmarkAverage.toFixed(2), u: "/5.00", d: "external profile" },
            { l: "Aligned pillars", v: `${ERM_DATA.alignedPillars}`, u: "of 10", d: "≥ benchmark", tone: "crit" },
            { l: "Drift signals · 30d", v: ERM_DATA.criticalRegressions, u: "critical", d: "+5 medium", tone: "warn" },
            { l: "Roadmap queue", v: ERM_DATA.activeRoadmap, u: "actions", d: "3 in Phase 1" },
            { l: "Evidence integrity", v: "98", u: "%", d: "linked to vectors", tone: "ok" },
          ].map((k, i) => {
            const color = k.tone === "ok" ? platformTokens.ok : k.tone === "warn" ? platformTokens.warn :
                          k.tone === "crit" ? platformTokens.crit : platformTokens.ink;
            return (
              <div key={i} style={{
                padding: '14px 20px',
                borderRight: i < 4 ? `1px solid ${platformTokens.border}` : 'none',
              }}>
                <PlatformLabel>{k.l}</PlatformLabel>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
                  <span style={{ ...platformStyles.display, fontSize: 30, color, fontWeight: 400 }}>{k.v}</span>
                  <span style={{ ...platformStyles.mono, fontSize: 11, color: platformTokens.inkMuted }}>{k.u}</span>
                </div>
                <span style={{ ...platformStyles.mono, fontSize: 10, color: platformTokens.inkMuted, marginTop: 4, display: 'block' }}>
                  {k.d}
                </span>
              </div>
            );
          })}
        </div>

        {/* Body — 2col */}
        <div style={{
          flex: 1, padding: 20, gap: 20,
          display: 'grid', gridTemplateColumns: '1.65fr 1fr',
          overflow: 'hidden',
        }}>
          {/* LEFT col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
            {/* Pillar table — Palantir-y dense tabular */}
            <section style={{
              background: platformTokens.bgPanel,
              border: `1px solid ${platformTokens.border}`,
              borderRadius: 10, overflow: 'hidden',
            }}>
              <div style={{
                padding: '12px 18px', borderBottom: `1px solid ${platformTokens.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <PlatformLabel tone="ink">Pillar matrix · 10</PlatformLabel>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <PlatformLabel>sort</PlatformLabel>
                  <span style={{ ...platformStyles.mono, fontSize: 11, color: platformTokens.ink, padding: '2px 8px', background: platformTokens.bgRaised, borderRadius: 3 }}>
                    gap desc
                  </span>
                </div>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, ...platformStyles.body }}>
                <thead>
                  <tr style={{ background: platformTokens.bgRaised }}>
                    {[
                      { l: '#', w: 36, a: 'left' },
                      { l: 'Pillar', a: 'left' },
                      { l: 'Score', w: 64, a: 'right' },
                      { l: 'Bench', w: 60, a: 'right' },
                      { l: 'Gap', w: 60, a: 'right' },
                      { l: '12-period trend', w: 110, a: 'left' },
                      { l: 'Status', w: 90, a: 'left' },
                    ].map(h => (
                      <th key={h.l} style={{
                        padding: '8px 12px', textAlign: h.a, width: h.w,
                        ...platformStyles.mono, fontSize: 9, fontWeight: 500,
                        letterSpacing: '0.16em', textTransform: 'uppercase',
                        color: platformTokens.inkMuted,
                      }}>{h.l}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...ERM_DATA.pillars].sort((a, b) => (b.target - b.score) - (a.target - a.score)).map((p, i) => {
                    const sev = severity(p.score, p.target);
                    const gap = p.score - p.target;
                    const sevColor = sev === "ok" ? platformTokens.ok : sev === "warn" ? platformTokens.warn : platformTokens.crit;
                    const sevBg = sev === "ok" ? platformTokens.okSoft : sev === "warn" ? platformTokens.warnSoft : platformTokens.critSoft;
                    const sevLabel = sev === "ok" ? "On benchmark" : sev === "warn" ? "Drifting" : "Critical gap";
                    return (
                      <tr key={p.id} style={{ borderTop: `1px solid ${platformTokens.border}` }}>
                        <td style={{ padding: '9px 12px', ...platformStyles.mono, fontSize: 10, color: platformTokens.inkMuted }}>
                          {String(i + 1).padStart(2, '0')}
                        </td>
                        <td style={{ padding: '9px 12px', color: platformTokens.ink, fontWeight: 500 }}>
                          {p.name}
                          <div style={{ ...platformStyles.mono, fontSize: 10, color: platformTokens.inkMuted, marginTop: 2 }}>
                            pillar.{p.id}
                          </div>
                        </td>
                        <td style={{ padding: '9px 12px', textAlign: 'right', ...platformStyles.mono, fontSize: 13, color: platformTokens.ink, fontWeight: 500 }}>
                          {p.score.toFixed(2)}
                        </td>
                        <td style={{ padding: '9px 12px', textAlign: 'right', ...platformStyles.mono, fontSize: 12, color: platformTokens.blue }}>
                          {p.target.toFixed(2)}
                        </td>
                        <td style={{ padding: '9px 12px', textAlign: 'right', ...platformStyles.mono, fontSize: 12, color: sevColor, fontWeight: 500 }}>
                          {gap >= 0 ? '+' : ''}{gap.toFixed(2)}
                        </td>
                        <td style={{ padding: '6px 12px' }}>
                          <Sparkline pillar={p} />
                        </td>
                        <td style={{ padding: '9px 12px' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            padding: '3px 8px', borderRadius: 3,
                            background: sevBg, color: sevColor,
                            ...platformStyles.mono, fontSize: 10, fontWeight: 500,
                            letterSpacing: '0.06em',
                          }}>
                            <span style={{ width: 5, height: 5, background: sevColor, borderRadius: 999 }} />
                            {sevLabel}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </div>

          {/* RIGHT col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
            {/* Radar */}
            <section style={{
              background: platformTokens.bgPanel,
              border: `1px solid ${platformTokens.border}`,
              borderRadius: 10, padding: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <PlatformLabel tone="ink">Maturity scope</PlatformLabel>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, height: 2, background: platformTokens.ink }} />
                    <span style={{ ...platformStyles.mono, fontSize: 10, color: platformTokens.inkSoft }}>current</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, borderTop: `1.5px dashed ${platformTokens.blue}` }} />
                    <span style={{ ...platformStyles.mono, fontSize: 10, color: platformTokens.inkSoft }}>industry</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: -8, marginBottom: -8 }}>
                <PlatformRadar />
              </div>
            </section>

            {/* Roadmap queue */}
            <section style={{
              background: platformTokens.bgPanel,
              border: `1px solid ${platformTokens.border}`,
              borderRadius: 10, padding: 16, flex: 1, overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <PlatformLabel tone="ink">Roadmap queue · expected uplift</PlatformLabel>
                <span style={{ ...platformStyles.mono, fontSize: 10, color: platformTokens.inkMuted }}>
                  {ERM_DATA.activeRoadmap} actions
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {ERM_DATA.roadmap.slice(0, 4).map((r, i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '32px 1fr 56px',
                    gap: 10, alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: i < 3 ? `1px solid ${platformTokens.border}` : 'none',
                  }}>
                    <span style={{
                      ...platformStyles.mono, fontSize: 10, fontWeight: 600,
                      color: r.phase === 1 ? platformTokens.gold : platformTokens.inkMuted,
                      padding: '2px 6px',
                      border: `1px solid ${r.phase === 1 ? platformTokens.gold : platformTokens.borderStrong}`,
                      borderRadius: 3, textAlign: 'center',
                    }}>P{r.phase}</span>
                    <div>
                      <div style={{ fontSize: 12.5, color: platformTokens.ink, fontWeight: 500, lineHeight: 1.3 }}>{r.name}</div>
                      <div style={{ ...platformStyles.mono, fontSize: 10, color: platformTokens.inkMuted, marginTop: 3 }}>
                        {r.pillar.toLowerCase()} · {r.effort.toLowerCase()} effort · {r.timeline}
                      </div>
                    </div>
                    <span style={{
                      ...platformStyles.mono, fontSize: 13, color: platformTokens.ok, fontWeight: 600,
                      textAlign: 'right',
                    }}>+{r.uplift.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Footer status strip */}
        <footer style={{
          height: 28, background: platformTokens.bgRail,
          color: platformTokens.inkInvMuted,
          ...platformStyles.mono, fontSize: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px',
        }}>
          <div style={{ display: 'flex', gap: 18 }}>
            <span><span style={{ color: platformTokens.ok }}>●</span> api 28ms</span>
            <span><span style={{ color: platformTokens.ok }}>●</span> drift engine</span>
            <span><span style={{ color: platformTokens.gold }}>●</span> assistant · idle</span>
            <span style={{ color: platformTokens.inkInvMuted }}>tx · a7f3-2c4d-9e</span>
          </div>
          <div style={{ display: 'flex', gap: 18 }}>
            <span>ISO 31000 · COSO ERM · NIST RMF · RIMS RMM</span>
            <span style={{ color: platformTokens.inkInvMuted }}>v0.1.0 · MMXXVI</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

window.DirectionC = DirectionC;

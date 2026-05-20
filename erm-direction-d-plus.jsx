/* Direction D+ — the synthesis.
 *
 * Takes Direction D's Louisa-style Live Brief hero and grafts in the six
 * features from the runway-rewrite branch that we actually want to keep:
 *
 *   1. Persistent left sidebar with per-BU PASTEL TINTS (peach Generation,
 *      mist-blue Transmission, sage Distribution, cream Corporate,
 *      rose Subsidiaries, violet JV). Each BU gets visual identity.
 *   2. Animated count-up feel for the hero score number.
 *   3. Inline sparkline next to the hero number.
 *   4. Focus-pillar inspector — click a pillar in the matrix, the
 *      dimension breakdown card appears below.
 *   5. Tactile 3-layer shadow on the gold CTA buttons.
 *   6. Drift area chart with gradient — small but punchy, top-right.
 *
 * Reuses tokens & atoms from erm-direction-d.jsx (nuTokens, NuLabel, etc).
 */

// Per-BU tints — sourced from runway-rewrite branch CSS tokens
const dpBu = {
  gen:  { tint: "#F5E4C8", dot: "#D49E3C", name: "Generation",     industry: "Power generation" },
  tra:  { tint: "#D8E4EF", dot: "#6B8FAE", name: "Transmission",   industry: "Grid operations" },
  dis:  { tint: "#D9E5D3", dot: "#7B9A6B", name: "Distribution",   industry: "Distribution networks" },
  corp: { tint: "#EEE6D7", dot: "#A89673", name: "Corporate",      industry: "Corporate services" },
  sub:  { tint: "#EBDEE0", dot: "#B08894", name: "Subsidiaries",   industry: "Subsidiary operations" },
  jv:   { tint: "#DDD8E9", dot: "#8E82A8", name: "Joint Ventures", industry: "JV portfolio" },
};

// Tactile shadow recipe (matches runway-rewrite --shadow-cta)
const DP_SHADOW_CTA = "inset 0 2px 4px rgba(255,255,255,0.56), 0 4px 8px rgba(38,27,7,0.06), 0 1px 2px rgba(38,27,7,0.36)";

// BU glyph — single-stroke marks per operating unit
const DpBuGlyph = ({ id, size = 16, color = "currentColor" }) => {
  const common = { width: size, height: size, viewBox: "0 0 28 28", fill: "none",
    stroke: color, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (id) {
    case "gen":  return <svg {...common}><circle cx="14" cy="14" r="2"/><path d="M14 12 L14 5 M13 5 Q14 2 15 5"/><path d="M15.7 15 L21.8 18.5 M21.8 17.5 Q24.3 18.5 22.8 20.2"/><path d="M12.3 15 L6.2 18.5 M6.2 17.5 Q3.7 18.5 5.2 20.2"/></svg>;
    case "tra":  return <svg {...common}><circle cx="5" cy="7" r="1.2" fill={color}/><circle cx="23" cy="7" r="1.2" fill={color}/><circle cx="14" cy="14" r="1.4" fill={color}/><circle cx="5" cy="21" r="1.2" fill={color}/><circle cx="23" cy="21" r="1.2" fill={color}/><path d="M5 7 L14 14 L23 7 M5 21 L14 14 L23 21"/></svg>;
    case "dis":  return <svg {...common}><rect x="11" y="4" width="6" height="8"/><path d="M14 12 L14 17"/><path d="M14 17 L6 17 L6 22 M14 17 L14 22 M14 17 L22 17 L22 22"/></svg>;
    case "corp": return <svg {...common}><path d="M6 24 L6 10 L14 5 L22 10 L22 24"/><path d="M10 24 L10 14 L14 14 L14 24 M18 24 L18 14"/><path d="M3 24 L25 24"/></svg>;
    case "sub":  return <svg {...common}><path d="M4 9 L14 4 L24 9 L14 14 Z"/><path d="M4 14 L14 19 L24 14"/><path d="M4 19 L14 24 L24 19"/></svg>;
    case "jv":   return <svg {...common}><circle cx="10" cy="14" r="6"/><circle cx="18" cy="14" r="6"/></svg>;
    default:     return <svg {...common}><rect x="4" y="4" width="20" height="20" rx="2"/></svg>;
  }
};

// Drift area chart — gradient fill, ink line, like runway-rewrite's drift signal
const DpDriftArea = ({ w = 360, h = 110 }) => {
  // Per-pillar drift deltas — negative = regression. Risk Treatment is the worst.
  const data = [
    { pillar: "LEAD",   delta:  0.02 },
    { pillar: "STRAT",  delta: -0.08 },
    { pillar: "SCOPE",  delta: -0.12 },
    { pillar: "IDENT",  delta:  0.18 },
    { pillar: "ASSESS", delta: -0.04 },
    { pillar: "TREAT",  delta: -0.60 },  // the demo regression
    { pillar: "MONITR", delta: -0.18 },
    { pillar: "REPORT", delta:  0.06 },
    { pillar: "CULTUR", delta: -0.22 },
    { pillar: "IMPRV",  delta: -0.10 },
  ];
  const padL = 26, padR = 6, padT = 10, padB = 22;
  const plotW = w - padL - padR, plotH = h - padT - padB;
  const max =  0.30, min = -0.70;
  const x = (i) => padL + (i / (data.length - 1)) * plotW;
  const y = (v) => padT + (1 - (v - min) / (max - min)) * plotH;
  const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.delta).toFixed(1)}`).join(' ');
  const area = `${line} L${x(data.length - 1).toFixed(1)},${y(0)} L${padL},${y(0)} Z`;
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="dpDriftG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={nuTokens.accent} stopOpacity="0.28" />
          <stop offset="100%" stopColor={nuTokens.accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Zero baseline */}
      <line x1={padL} y1={y(0)} x2={padL + plotW} y2={y(0)}
        stroke={nuTokens.borderStr} strokeDasharray="2 2" strokeWidth="0.8" />
      {[max, 0, min].map((v, i) => (
        <text key={i} x={padL - 5} y={y(v) + 3} textAnchor="end"
          fontSize="9" fontFamily="JetBrains Mono" fill={nuTokens.inkMuted}>
          {v >= 0 ? '+' : ''}{v.toFixed(2)}
        </text>
      ))}
      <path d={area} fill="url(#dpDriftG)" />
      <path d={line} fill="none" stroke={nuTokens.accent} strokeWidth="1.6" />
      {/* The catastrophic point — TREAT */}
      {data.map((d, i) => {
        if (d.delta > -0.4) return null;
        return (
          <g key={i}>
            <circle cx={x(i)} cy={y(d.delta)} r="4" fill={nuTokens.crit} stroke="#FFF" strokeWidth="1.5" />
            <text x={x(i)} y={y(d.delta) + 16} textAnchor="middle" fontSize="9"
              fontFamily="JetBrains Mono" fontWeight="600" fill={nuTokens.crit} letterSpacing="0.08em">
              {d.pillar}
            </text>
          </g>
        );
      })}
      {/* Tick labels along x */}
      {data.map((d, i) => (
        <text key={`x${i}`} x={x(i)} y={h - 4} textAnchor="middle"
          fontSize="8" fontFamily="JetBrains Mono" fill={nuTokens.inkSubtle} letterSpacing="0.06em">
          {d.pillar.slice(0, 3)}
        </text>
      ))}
    </svg>
  );
};

// Tiny "animated" number — visualize the count-up with subtle pulse styling
const DpHeroNum = ({ value }) => (
  <span style={{
    ...nuFont.ui, fontSize: 84, fontWeight: 500, letterSpacing: '-0.04em',
    lineHeight: 0.95, fontFeatureSettings: '"tnum","lnum","ss01"',
    background: `linear-gradient(180deg, ${nuTokens.ink} 0%, ${nuTokens.ink} 70%, rgba(22,24,26,0.85) 100%)`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  }}>{value}</span>
);

// Inline sparkline (re-using D's spark feel, but slightly wider)
const DpSpark = ({ values, w = 96, h = 28, color }) => {
  if (!values.length) return null;
  const min = Math.min(...values), max = Math.max(...values);
  const span = max - min || 1;
  const step = w / (values.length - 1 || 1);
  const points = values.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / span) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const lastX = (values.length - 1) * step;
  const lastY = h - ((values[values.length - 1] - min) / span) * h;
  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <polyline fill="none" stroke={color || nuTokens.accent} strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" points={points} />
      <circle cx={lastX} cy={lastY} r="2.5" fill={color || nuTokens.accent} />
    </svg>
  );
};

const DirectionDPlus = () => {
  const activeBuId = "gen";
  const activeBu = dpBu[activeBuId];

  return (
    <div style={{
      width: 1680, minHeight: 1480,
      background: nuTokens.bg,
      color: nuTokens.ink,
      ...nuFont.ui,
      fontSize: 14, lineHeight: 1.5,
      display: 'grid', gridTemplateColumns: '240px 1fr',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* === SIDEBAR (runway-rewrite synthesis) === */}
      <aside style={{
        background: nuTokens.panel,
        borderRight: `1px solid ${nuTokens.border}`,
        padding: 18,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 22 }}>
          <span style={{
            width: 22, height: 22, borderRadius: 5, background: nuTokens.ink,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ width: 8, height: 8, background: nuTokens.accent, borderRadius: 2 }} />
          </span>
          <span style={{
            fontFamily: '"Fraunces", "Times New Roman", serif',
            fontSize: 15, fontWeight: 500, color: nuTokens.ink, letterSpacing: '-0.01em',
          }}>
            ERM Navigator
          </span>
        </div>

        {/* Operating units — pastel mosaic */}
        <div style={{ marginBottom: 8 }}>
          <NuLabel size={10}>Operating units</NuLabel>
        </div>
        {Object.entries(dpBu).map(([id, bu]) => {
          const active = id === activeBuId;
          return (
            <button key={id} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '7px 9px', borderRadius: 6, marginBottom: 2,
              background: active ? nuTokens.panel : 'transparent',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              boxShadow: active ? `inset 0 0 0 1px ${nuTokens.borderStr}` : 'none',
              color: active ? nuTokens.ink : nuTokens.inkSoft,
              fontWeight: active ? 500 : 400,
              ...nuFont.ui, fontSize: 13,
            }}>
              <span style={{
                width: 26, height: 26, borderRadius: 6,
                background: bu.tint, color: bu.dot,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <DpBuGlyph id={id} size={14} color={bu.dot} />
              </span>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {bu.name}
              </span>
              {active && <span style={{ width: 4, height: 4, borderRadius: 999, background: nuTokens.accent }} />}
            </button>
          );
        })}

        <div style={{ height: 1, background: nuTokens.border, margin: '14px 0' }} />

        {/* Workspace nav */}
        <NuLabel size={10}>Workspace</NuLabel>
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { l: "Today", active: true },
            { l: "Maturity" },
            { l: "Drift signals", badge: "3" },
            { l: "Roadmap" },
            { l: "Evidence" },
            { l: "History" },
            { l: "Reports" },
          ].map(it => (
            <button key={it.l} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '7px 10px', borderRadius: 6,
              background: it.active ? nuTokens.panel : 'transparent',
              boxShadow: it.active ? `inset 0 0 0 1px ${nuTokens.borderStr}` : 'none',
              color: it.active ? nuTokens.ink : nuTokens.inkSoft,
              border: 'none', cursor: 'pointer', textAlign: 'left',
              fontWeight: it.active ? 500 : 400, fontSize: 13,
              ...nuFont.ui,
            }}>
              <span>{it.l}</span>
              {it.badge && <span style={{
                padding: '1px 6px', borderRadius: 999,
                background: nuTokens.accentSoft, color: nuTokens.accent,
                ...nuFont.mono, fontSize: 10, fontWeight: 600,
              }}>{it.badge}</span>}
            </button>
          ))}
        </div>

        {/* Trust footer */}
        <div style={{
          marginTop: 'auto', paddingTop: 14, borderTop: `1px solid ${nuTokens.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: nuTokens.ok }} />
            <span style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.inkSoft, letterSpacing: '0.06em' }}>
              35 / 35 tests passing
            </span>
          </div>
          <div style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.inkSubtle, marginTop: 4, letterSpacing: '0.04em' }}>
            ISO · COSO · NIST · RIMS
          </div>
        </div>
      </aside>

      {/* === MAIN === */}
      <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <header style={{
          height: 56,
          borderBottom: `1px solid ${nuTokens.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <DpBuGlyph id={activeBuId} size={18} color={activeBu.dot} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>{activeBu.name}</span>
            <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>
              · {activeBu.industry}
            </span>
            <span style={{ height: 18, width: 1, background: nuTokens.border, margin: '0 8px' }} />
            {/* Benchmark tabs */}
            <div style={{ display: 'flex', gap: 2, background: nuTokens.bgSubtle, padding: 3, borderRadius: 6 }}>
              {["Target", "Industry", "Peers", "External"].map((t, i) => (
                <span key={t} style={{
                  padding: '4px 11px', borderRadius: 4,
                  background: i === 1 ? nuTokens.panel : 'transparent',
                  color: i === 1 ? nuTokens.ink : nuTokens.inkSoft,
                  fontSize: 12, fontWeight: i === 1 ? 500 : 400,
                  boxShadow: i === 1 ? '0 1px 2px rgba(20,24,31,0.06)' : 'none',
                  cursor: 'pointer',
                }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '7px 12px', borderRadius: 999,
              background: 'transparent', color: nuTokens.inkSoft,
              border: `1px solid ${nuTokens.border}`, cursor: 'pointer',
              ...nuFont.mono, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M5.5 1v7M2.5 5.5l3 3 3-3 M1 9.5h9"/>
              </svg>
              Report PDF
            </button>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 14px', borderRadius: 7,
              background: nuTokens.accent, color: '#FFFFFF',
              border: `1px solid rgba(0,0,0,0.10)`,
              cursor: 'pointer',
              boxShadow: DP_SHADOW_CTA,
              ...nuFont.ui, fontSize: 13, fontWeight: 600, letterSpacing: '-0.005em',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: '#FFFFFF', opacity: 0.9 }} />
              Ask Navigator
            </button>
            <NuAvatar initials="AS" size={28} />
          </div>
        </header>

        {/* === LIVE BRIEF — abbreviated, paired with Drift chart === */}
        <div style={{ padding: '20px 32px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <NuLabel tone="accent" size={11}>● Live brief · today</NuLabel>
            <span style={{ flex: 1, height: 1, background: nuTokens.border }} />
            <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>
              Wed, May 20, 2026 · 14:32 GMT+3
            </span>
          </div>
          <div style={{
            background: nuTokens.panel,
            border: `1px solid ${nuTokens.border}`,
            borderTop: `3px solid ${nuTokens.crit}`,
            borderRadius: 12,
            padding: 24,
            display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 24,
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <NuChip tone="crit">Critical regression</NuChip>
                <NuChip tone="accent">Drift · session 3</NuChip>
                <span style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.inkMuted, letterSpacing: '0.06em' }}>
                  SIG-2026-0520-A7F3
                </span>
              </div>
              <h1 style={{
                ...nuFont.ui, fontSize: 30, fontWeight: 500, letterSpacing: '-0.022em',
                lineHeight: 1.15, margin: 0, color: nuTokens.ink,
              }}>
                <span style={{ color: nuTokens.crit }}>Risk Treatment</span> at Generation
                regressed <span style={{ ...nuFont.mono, fontWeight: 600 }}>−0.60</span> at session 3 —
                the operator has not yet flagged it.
              </h1>
              <p style={{
                fontSize: 14, lineHeight: 1.55, color: nuTokens.inkSoft,
                margin: '10px 0 0', maxWidth: 540,
              }}>
                Detected by the determ&shy;inistic scoring engine — same responses, same number,
                <strong style={{ color: nuTokens.ink }}> 35 unit tests pinned in CI.</strong> A
                Phase-1 treatment-plan action recovers
                <strong style={{ color: nuTokens.ok }}> +0.34 maturity</strong> in 90 days.
              </p>

              {/* Reproducibility trust band */}
              <div style={{
                marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 12,
                padding: '6px 11px', borderRadius: 999,
                background: nuTokens.bgSubtle, border: `1px solid ${nuTokens.border}`,
              }}>
                <span style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.inkSoft }}>
                  <span style={{ color: nuTokens.ok }}>●</span> deterministic
                </span>
                <span style={{ width: 1, height: 11, background: nuTokens.borderStr }} />
                <span style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.inkSoft }}>
                  ISO 31000 · COSO ERM · NIST RMF · RIMS RMM
                </span>
                <span style={{ width: 1, height: 11, background: nuTokens.borderStr }} />
                <span style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.inkSoft }}>
                  35 tests · pinned
                </span>
              </div>

              <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
                <button style={{
                  ...nuFont.ui, fontSize: 13, fontWeight: 600,
                  padding: '9px 16px', borderRadius: 7,
                  background: nuTokens.accent, color: '#FFFFFF',
                  border: `1px solid rgba(0,0,0,0.10)`,
                  cursor: 'pointer',
                  boxShadow: DP_SHADOW_CTA,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                  Open action plan
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M2 5.5h7M6 2.5l3 3-3 3"/>
                  </svg>
                </button>
                <button style={{
                  ...nuFont.ui, fontSize: 13, fontWeight: 500,
                  padding: '9px 14px', borderRadius: 7,
                  background: nuTokens.panel, color: nuTokens.ink,
                  border: `1px solid ${nuTokens.borderStr}`, cursor: 'pointer',
                  boxShadow: DP_SHADOW_CTA,
                }}>
                  Ask Navigator why
                </button>
              </div>
            </div>

            {/* RIGHT — drift area chart (runway-rewrite synthesis) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <NuLabel>Drift signal · vs prior baseline</NuLabel>
                <span style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.crit, fontWeight: 600 }}>
                  worst −0.60
                </span>
              </div>
              <DpDriftArea w={420} h={150} />
              <div style={{ marginTop: 6, ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted, lineHeight: 1.5 }}>
                3 regression signals · Risk Treatment is the structural one.
                The operator's last sign-off was 11 days ago.
              </div>
            </div>
          </div>
        </div>

        {/* === HERO SCORE STRIP (runway-rewrite count-up + sparkline) === */}
        <div style={{
          padding: '22px 32px 0',
        }}>
          <div style={{
            background: nuTokens.panel,
            border: `1px solid ${nuTokens.border}`,
            borderRadius: 12, padding: 24,
            display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'center',
          }}>
            <div>
              <NuLabel>Overall maturity</NuLabel>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: 4 }}>
                <DpHeroNum value="3.34" />
                <div style={{ paddingBottom: 6 }}>
                  <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>/5.00</span>
                  <div style={{ marginTop: 6 }}>
                    <DpSpark
                      values={[3.62, 3.68, 3.71, 3.74, 3.52, 3.41, 3.34]}
                      w={120} h={28} color={nuTokens.crit}
                    />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 4, display: 'flex', gap: 14 }}>
                <span style={{ fontSize: 12.5, color: nuTokens.inkSoft }}>
                  <span style={{ ...nuFont.mono, color: nuTokens.crit, fontWeight: 600 }}>−0.21</span>
                  <span style={{ color: nuTokens.inkMuted }}> vs Industry 3.55</span>
                </span>
                <span style={{ fontSize: 12.5, color: nuTokens.inkSoft }}>
                  <span style={{ ...nuFont.mono, color: nuTokens.crit, fontWeight: 600 }}>−0.28</span>
                  <span style={{ color: nuTokens.inkMuted }}> 90-day Δ</span>
                </span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
              {[
                { l: "Aligned pillars", v: "2", u: "of 10", tone: "crit" },
                { l: "Drift signals · 7d", v: "3", u: "critical", tone: "warn" },
                { l: "Roadmap queue", v: "12", u: "actions", tone: "ink" },
                { l: "Evidence linked", v: "98", u: "%", tone: "ok" },
              ].map((k, i) => {
                const color = k.tone === "ok" ? nuTokens.ok : k.tone === "warn" ? nuTokens.warn :
                              k.tone === "crit" ? nuTokens.crit : nuTokens.ink;
                return (
                  <div key={i}>
                    <NuLabel size={9}>{k.l}</NuLabel>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                      <span style={{ ...nuFont.ui, fontSize: 30, fontWeight: 500, color, letterSpacing: '-0.025em', lineHeight: 1 }}>
                        {k.v}
                      </span>
                      <span style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.inkMuted }}>{k.u}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* === PILLAR MATRIX + FOCUS INSPECTOR (the runway-rewrite move) === */}
        <div style={{ padding: '20px 32px 0', display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
          {/* Pillar matrix */}
          <div style={{
            background: nuTokens.panel,
            border: `1px solid ${nuTokens.border}`,
            borderRadius: 12, overflow: 'hidden',
          }}>
            <div style={{
              padding: '12px 18px', borderBottom: `1px solid ${nuTokens.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <NuLabel tone="ink" size={11}>Pillars · 10</NuLabel>
                <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>·  sort: gap desc</span>
              </div>
              <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>
                click row → inspector below
              </span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, ...nuFont.ui }}>
              <thead>
                <tr style={{ background: nuTokens.panelAlt }}>
                  {[
                    { l: "#", w: 32, a: 'left' },
                    { l: "Pillar", a: 'left' },
                    { l: "Score", w: 60, a: 'right' },
                    { l: "Bench", w: 56, a: 'right' },
                    { l: "Gap", w: 64, a: 'right' },
                    { l: "Trend", w: 84, a: 'left' },
                    { l: "Status", w: 100, a: 'left' },
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
                  const focused = p.id === "treat"; // pre-selected for demo narrative
                  return (
                    <tr key={p.id} style={{
                      borderTop: `1px solid ${nuTokens.border}`,
                      background: focused ? nuTokens.bgSubtle : 'transparent',
                      position: 'relative',
                    }}>
                      <td style={{ padding: '10px 12px', ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted }}>
                        {focused && <span style={{
                          position: 'absolute', left: 0, top: 0, bottom: 0,
                          width: 3, background: nuTokens.accent,
                        }} />}
                        {String(i + 1).padStart(2, '0')}
                      </td>
                      <td style={{ padding: '10px 12px', color: nuTokens.ink, fontWeight: focused ? 600 : 500 }}>
                        {p.name}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', ...nuFont.ui, fontSize: 15, fontWeight: 600, color: nuTokens.ink, letterSpacing: '-0.01em' }}>
                        {p.score.toFixed(2)}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', ...nuFont.mono, fontSize: 12, color: nuTokens.blue }}>
                        {p.target.toFixed(2)}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', ...nuFont.mono, fontSize: 12, color: sevColor, fontWeight: 600 }}>
                        {gap >= 0 ? '+' : ''}{gap.toFixed(2)}
                      </td>
                      <td style={{ padding: '6px 12px' }}>
                        <NuSpark pillar={p} />
                      </td>
                      <td style={{ padding: '10px 12px' }}>
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

          {/* Radar */}
          <div style={{
            background: nuTokens.panel,
            border: `1px solid ${nuTokens.border}`,
            borderRadius: 12, padding: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <NuLabel tone="ink" size={11}>Coverage</NuLabel>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 2, background: nuTokens.accent }} />
                  <span style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.inkSoft }}>current</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, borderTop: `1.5px dashed ${nuTokens.blue}` }} />
                  <span style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.inkSoft }}>industry</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: -6, marginBottom: -6 }}>
              <NuRadar size={340} />
            </div>
          </div>
        </div>

        {/* === FOCUS INSPECTOR (the runway-rewrite signature move) === */}
        <div style={{ padding: '16px 32px 0' }}>
          <div style={{
            background: nuTokens.panel,
            border: `1px solid ${nuTokens.border}`,
            borderTop: `3px solid ${nuTokens.crit}`,
            borderRadius: 12, padding: 20,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <NuLabel tone="accent" size={11}>● Focus · Risk Treatment</NuLabel>
                <div style={{
                  ...nuFont.ui, fontSize: 22, fontWeight: 500, letterSpacing: '-0.022em',
                  marginTop: 6, lineHeight: 1.2,
                }}>
                  2.95
                  <span style={{ color: nuTokens.inkMuted, fontWeight: 400 }}> vs Industry </span>
                  3.60
                  <span style={{ marginLeft: 14, color: nuTokens.crit, fontSize: 16, fontWeight: 600, ...nuFont.mono }}>
                    −0.65
                  </span>
                </div>
                <div style={{ fontSize: 13, color: nuTokens.inkSoft, marginTop: 8, maxWidth: 660, lineHeight: 1.5 }}>
                  The structural gap is in <strong>Technology</strong> and <strong>People</strong> dimensions —
                  controls aren't being designed-and-tested (q.53), KRIs aren't being linked to actions (q.55),
                  and treatment owners aren't accountable for implementation (q.58).
                </div>
              </div>
              <NuChip tone="crit">Below benchmark</NuChip>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {[
                { name: "People",     score: 2.50, q: "Treatment owners accountable",     critical: true },
                { name: "Process",    score: 3.20, q: "Treatment plans documented",       critical: false },
                { name: "Technology", score: 2.40, q: "Controls designed & tested",       critical: true },
                { name: "Governance", score: 3.40, q: "Treatment options cost-effective", critical: false },
              ].map(d => {
                const pct = (d.score / 5) * 100;
                const color = d.critical ? nuTokens.crit : d.score >= 4 ? nuTokens.ok : nuTokens.warn;
                return (
                  <div key={d.name} style={{
                    border: `1px solid ${d.critical ? nuTokens.critSoft : nuTokens.border}`,
                    borderRadius: 8, padding: 14,
                    background: d.critical ? nuTokens.critSoft : 'transparent',
                  }}>
                    <NuLabel>{d.name}</NuLabel>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                      <span style={{ ...nuFont.ui, fontSize: 24, fontWeight: 600, color, letterSpacing: '-0.02em', lineHeight: 1 }}>
                        {d.score.toFixed(2)}
                      </span>
                      <span style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.inkMuted }}>/5</span>
                    </div>
                    <div style={{ marginTop: 8, height: 3, background: nuTokens.bgSubtle, borderRadius: 999 }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 999 }} />
                    </div>
                    <div style={{ fontSize: 11.5, color: nuTokens.inkSoft, marginTop: 10, lineHeight: 1.4 }}>
                      weakest: <em>"{d.q}"</em>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ height: 28 }} />

        {/* Footer */}
        <footer style={{
          height: 32,
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
            <span>ISO 31000 · COSO ERM · NIST RMF · RIMS RMM</span>
            <span>SOC 2 Type II</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

window.DirectionDPlus = DirectionDPlus;

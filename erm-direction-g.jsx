/* Direction G — faithful mock of the CURRENT runway-rewrite branch state.
 *
 * Recreates the RNOSCommandCenter component as it exists today on
 * udaysrinu/ERM@runway-rewrite. Uses the exact tokens extracted from
 * runway.com via Playwright getComputedStyle() — bg #F8F7F5, ink #261B07,
 * gold CTA #F9A600, border #E3DFD5, 3-layer tactile shadow, Inter throughout,
 * Fraunces reserved for the wordmark only.
 *
 * This is "what's on the branch right now", not a proposed change.
 */

const rwTokens = {
  // Exact tokens from runway-rewrite branch — index.css source of truth
  bg:        "#F8F7F5",
  surface:   "#FFFFFF",
  soft:      "#E3DFD5",
  hover:     "#EEEAE0",
  border:    "#E3DFD5",
  borderStr: "rgba(38, 27, 7, 0.22)",
  ink:       "#261B07",
  inkSoft:   "rgba(38, 27, 7, 0.78)",
  inkMuted:  "rgba(38, 27, 7, 0.55)",
  inkSubtle: "rgba(38, 27, 7, 0.38)",
  inkFaint:  "rgba(38, 27, 7, 0.18)",
  gold:      "#F9A600",       // Runway marigold CTA
  goldSoft:  "rgba(249, 166, 0, 0.14)",
  highlight: "#F7B92E",
  mint:      "#2E6B48",
  mintSoft:  "rgba(46, 107, 72, 0.10)",
  coral:     "#A64226",
  coralSoft: "rgba(166, 66, 38, 0.09)",
  sky:       "#1E4D73",
  skySoft:   "rgba(30, 77, 115, 0.09)",
  // BU pastel tints
  buGen:  "#F5E4C8", buGenDot:  "#D49E3C",
  buTra:  "#D8E4EF", buTraDot:  "#6B8FAE",
  buDis:  "#D9E5D3", buDisDot:  "#7B9A6B",
  buCorp: "#EEE6D7", buCorpDot: "#A89673",
  buSub:  "#EBDEE0", buSubDot:  "#B08894",
  buJv:   "#DDD8E9", buJvDot:   "#8E82A8",
  // Tactile shadow recipe
  shadowCta: "inset 0 2px 4px rgba(255,255,255,0.56), 0 4px 8px rgba(38,27,7,0.06), 0 1px 2px rgba(38,27,7,0.36)",
  shadowCard:"0 4px 8px rgba(38,27,7,0.06)",
};

const rwFont = {
  ui:    { fontFamily: '"Inter", system-ui, sans-serif', letterSpacing: '-0.005em' },
  serif: { fontFamily: '"Fraunces", "Times New Roman", serif' },
  mono:  { fontFamily: '"JetBrains Mono", ui-monospace, monospace' },
};

const RwEyebrow = ({ children, tone = "muted" }) => {
  const color = tone === "gold" ? rwTokens.gold : tone === "ink" ? rwTokens.ink : rwTokens.inkMuted;
  return (
    <span style={{
      ...rwFont.mono, fontSize: 10, fontWeight: 500,
      letterSpacing: '0.12em', textTransform: 'uppercase', color,
    }}>{children}</span>
  );
};

const RwPill = ({ children, tone = "ink" }) => {
  const map = {
    ink:   [rwTokens.soft,      rwTokens.ink],
    amber: [rwTokens.goldSoft,  rwTokens.gold],
    mint:  [rwTokens.mintSoft,  rwTokens.mint],
    coral: [rwTokens.coralSoft, rwTokens.coral],
    sky:   [rwTokens.skySoft,   rwTokens.sky],
  };
  const [bg, fg] = map[tone] || map.ink;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 10px', borderRadius: 999,
      background: bg, color: fg,
      ...rwFont.mono, fontSize: 10, fontWeight: 500,
      letterSpacing: '0.12em', textTransform: 'uppercase',
    }}>{children}</span>
  );
};

const RwDot = ({ color = "amber" }) => {
  const map = {
    amber: rwTokens.gold, mint: rwTokens.mint, coral: rwTokens.coral, sky: rwTokens.sky, ink: rwTokens.ink,
  };
  return <span style={{ width: 6, height: 6, borderRadius: 999, background: map[color], flexShrink: 0 }} />;
};

// BU glyph (compass / grid / etc) — single-stroke
const RwBuGlyph = ({ id, size = 18 }) => {
  const common = { width: size, height: size, viewBox: "0 0 28 28", fill: "none", strokeWidth: 1.5, stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" };
  switch (id) {
    case "gen":
      return <svg {...common}><circle cx="14" cy="14" r="2"/><path d="M14 12 L14 5 M13 5 Q14 2 15 5"/><path d="M15.7 15 L21.8 18.5 M21.8 17.5 Q24.3 18.5 22.8 20.2"/><path d="M12.3 15 L6.2 18.5 M6.2 17.5 Q3.7 18.5 5.2 20.2"/></svg>;
    case "tra":
      return <svg {...common}><circle cx="5" cy="7" r="1.2" fill="currentColor"/><circle cx="23" cy="7" r="1.2" fill="currentColor"/><circle cx="14" cy="14" r="1.4" fill="currentColor"/><circle cx="5" cy="21" r="1.2" fill="currentColor"/><circle cx="23" cy="21" r="1.2" fill="currentColor"/><path d="M5 7 L14 14 L23 7 M5 21 L14 14 L23 21"/></svg>;
    case "dis":
      return <svg {...common}><rect x="11" y="4" width="6" height="8"/><path d="M14 12 L14 17"/><path d="M14 17 L6 17 L6 22 M14 17 L14 22 M14 17 L22 17 L22 22"/></svg>;
    case "corp":
      return <svg {...common}><path d="M6 24 L6 10 L14 5 L22 10 L22 24"/><path d="M10 24 L10 14 L14 14 L14 24 M18 24 L18 14"/><path d="M3 24 L25 24"/></svg>;
    case "sub":
      return <svg {...common}><path d="M4 9 L14 4 L24 9 L14 14 Z"/><path d="M4 14 L14 19 L24 14"/><path d="M4 19 L14 24 L24 19"/></svg>;
    case "jv":
      return <svg {...common}><circle cx="10" cy="14" r="6"/><circle cx="18" cy="14" r="6"/></svg>;
    default:
      return <svg {...common}><rect x="4" y="4" width="20" height="20" rx="2"/></svg>;
  }
};

// Brand wordmark — only place Fraunces appears
const RwBrand = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
    <span style={{
      width: 22, height: 22, borderRadius: 5, background: rwTokens.ink,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 2L7.9 4.9 11 5.5 8.5 7.5 9.3 11 7 9 4.7 11 5.5 7.5 3 5.5 6.1 4.9z"
          stroke={rwTokens.highlight} strokeWidth="0.5" fill={rwTokens.highlight} fillOpacity="0.1" />
        <path d="M7 9.2L7 5.5 M5.5 6.7 L7 5.5 L8.5 6.7" stroke={rwTokens.highlight} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
    <span style={{ ...rwFont.serif, fontSize: 15, fontWeight: 500, color: rwTokens.ink, letterSpacing: '-0.01em' }}>
      ERM Navigator
    </span>
  </div>
);

// Recharts-shaped radar
const RwRadar = ({ size = 340 }) => {
  const cx = size/2, cy = size/2, r = size/2 - 32;
  const scores = ERM_DATA.pillars.map(p => p.score);
  const targets = ERM_DATA.pillars.map(p => p.target);
  return (
    <svg width={size} height={size}>
      {[0.25, 0.5, 0.75, 1].map(k => (
        <circle key={k} cx={cx} cy={cy} r={r * k} fill="none" stroke={rwTokens.border} strokeWidth="0.6" />
      ))}
      {ERM_DATA.pillars.map((_, i) => {
        const a = -Math.PI/2 + (i * 2 * Math.PI)/10;
        return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a)*r} y2={cy + Math.sin(a)*r} stroke={rwTokens.border} strokeWidth="0.5" />;
      })}
      <polygon points={radarPoints(scores, 5, cx, cy, r)} fill={rwTokens.ink} fillOpacity="0.10" stroke={rwTokens.ink} strokeWidth="1.8" />
      <polygon points={radarPoints(targets, 5, cx, cy, r)} fill="none" stroke={rwTokens.gold} strokeWidth="1.5" strokeDasharray="4 4" />
      {ERM_DATA.pillars.map((p, i) => {
        const a = -Math.PI/2 + (i * 2 * Math.PI)/10;
        const x = cx + Math.cos(a) * r * (p.score/5);
        const y = cy + Math.sin(a) * r * (p.score/5);
        return <circle key={p.id} cx={x} cy={y} r="2.5" fill={rwTokens.ink} />;
      })}
      {ERM_DATA.pillars.map((p, i) => {
        const pos = radarLabelPos(i, 10, cx, cy, r, 18);
        const anchor = Math.abs(Math.cos(pos.a)) < 0.3 ? "middle" : pos.x > cx ? "start" : "end";
        return <text key={p.id} x={pos.x} y={pos.y} fontSize="9" fontFamily="Inter" fill={rwTokens.inkMuted} textAnchor={anchor} dominantBaseline="middle">
          {p.short.charAt(0) + p.short.slice(1).toLowerCase()}
        </text>;
      })}
    </svg>
  );
};

// Hero sparkline
const RwSpark = ({ values, w = 120, h = 28, color }) => {
  if (!values.length) return null;
  const min = Math.min(...values), max = Math.max(...values);
  const span = max - min || 1;
  const step = w / (values.length - 1 || 1);
  const points = values.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / span) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg width={w} height={h}>
      <polyline fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
};

// Drift area chart (small)
const RwDriftArea = ({ data, w = 320, h = 130 }) => {
  const padL = 30, padR = 6, padT = 8, padB = 22;
  const plotW = w - padL - padR, plotH = h - padT - padB;
  const max = Math.max(...data.map(d => d.delta), 0.1);
  const min = Math.min(...data.map(d => d.delta), -0.6);
  const x = (i) => padL + (i / (data.length - 1)) * plotW;
  const y = (v) => padT + (1 - (v - min) / (max - min)) * plotH;
  const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.delta).toFixed(1)}`).join(' ');
  const area = `${line} L${padL + plotW},${y(0)} L${padL},${y(0)} Z`;
  return (
    <svg width={w} height={h}>
      <defs>
        <linearGradient id="rwDriftG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={rwTokens.gold} stopOpacity="0.28" />
          <stop offset="100%" stopColor={rwTokens.gold} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Zero line */}
      <line x1={padL} y1={y(0)} x2={padL + plotW} y2={y(0)} stroke={rwTokens.borderStr} strokeDasharray="2 2" strokeWidth="0.8" />
      {/* Y ticks */}
      {[max, 0, min].map((v, i) => (
        <text key={i} x={padL - 6} y={y(v) + 3} textAnchor="end" fontSize="9" fontFamily="Inter" fill={rwTokens.inkMuted}>
          {v >= 0 ? '+' : ''}{v.toFixed(2)}
        </text>
      ))}
      <path d={area} fill="url(#rwDriftG)" />
      <path d={line} fill="none" stroke={rwTokens.gold} strokeWidth="1.8" />
    </svg>
  );
};

const DirectionG = () => {
  // Drift data — synthesize per-pillar regression deltas
  const driftData = ERM_DATA.pillars.map(p => ({
    pillar: p.short,
    delta: +((p.score - p.target) * 0.4 - 0.08 * Math.sin(p.id.charCodeAt(0))).toFixed(3),
  }));
  const heroSpark = ERM_DATA.pillars.map(p => p.score);

  return (
    <div style={{
      width: 1440, minHeight: 1480,
      background: rwTokens.bg,
      color: rwTokens.ink,
      ...rwFont.ui,
      fontSize: 14, lineHeight: 1.43,
      position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '240px 1fr',
    }}>
      {/* === SIDEBAR — Runway pattern with BU tints === */}
      <aside style={{
        background: rwTokens.surface,
        borderRight: `1px solid ${rwTokens.border}`,
        padding: 18, display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ marginBottom: 22 }}>
          <RwBrand />
        </div>

        <div style={{ marginBottom: 18 }}>
          <RwEyebrow>Operating units</RwEyebrow>
        </div>
        {[
          { id: "gen",  name: "Generation",       tint: rwTokens.buGen,  dot: rwTokens.buGenDot,  active: true },
          { id: "tra",  name: "Transmission",     tint: rwTokens.buTra,  dot: rwTokens.buTraDot },
          { id: "dis",  name: "Distribution",     tint: rwTokens.buDis,  dot: rwTokens.buDisDot },
          { id: "corp", name: "Corporate",        tint: rwTokens.buCorp, dot: rwTokens.buCorpDot },
          { id: "sub",  name: "Subsidiaries",     tint: rwTokens.buSub,  dot: rwTokens.buSubDot },
          { id: "jv",   name: "Joint Ventures",   tint: rwTokens.buJv,   dot: rwTokens.buJvDot },
        ].map(bu => (
          <button key={bu.id} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 10px', borderRadius: 6,
            background: bu.active ? rwTokens.surface : 'transparent',
            color: bu.active ? rwTokens.ink : rwTokens.inkSoft,
            border: 'none', cursor: 'pointer', textAlign: 'left',
            boxShadow: bu.active ? `inset 0 0 0 1px ${rwTokens.border}` : 'none',
            fontWeight: bu.active ? 500 : 400, fontSize: 13,
            ...rwFont.ui,
          }}>
            <span style={{
              width: 26, height: 26, borderRadius: 6,
              background: bu.tint, color: bu.dot,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <RwBuGlyph id={bu.id} size={15} />
            </span>
            <span style={{ flex: 1 }}>{bu.name}</span>
            {bu.active && <span style={{ width: 4, height: 4, borderRadius: 999, background: rwTokens.gold }} />}
          </button>
        ))}

        <div style={{ height: 1, background: rwTokens.border, margin: '16px 0' }} />

        <RwEyebrow>Workspace</RwEyebrow>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { l: "Overview", active: true },
            { l: "Maturity" },
            { l: "Drift signals", badge: "3" },
            { l: "Roadmap" },
            { l: "Evidence" },
            { l: "History" },
          ].map(it => (
            <button key={it.l} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '7px 10px', borderRadius: 6,
              background: it.active ? rwTokens.surface : 'transparent',
              boxShadow: it.active ? `inset 0 0 0 1px ${rwTokens.border}` : 'none',
              color: it.active ? rwTokens.ink : rwTokens.inkSoft,
              border: 'none', cursor: 'pointer', textAlign: 'left',
              fontWeight: it.active ? 500 : 400, fontSize: 13,
              ...rwFont.ui,
            }}>
              <span>{it.l}</span>
              {it.badge && <span style={{
                padding: '1px 6px', borderRadius: 999,
                background: rwTokens.goldSoft, color: rwTokens.gold,
                ...rwFont.mono, fontSize: 10, fontWeight: 600,
              }}>{it.badge}</span>}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: rwTokens.inkMuted }}>
          <span style={{ width: 24, height: 24, borderRadius: 999, background: rwTokens.ink, color: rwTokens.bg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600 }}>AS</span>
          <span>analyst@gmail.com</span>
        </div>
      </aside>

      {/* === MAIN === */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <div style={{
          padding: '16px 32px', borderBottom: `1px solid ${rwTokens.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <RwBuGlyph id="gen" size={18} />
            <span style={{ fontSize: 14, fontWeight: 500, color: rwTokens.ink }}>Generation</span>
            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" stroke={rwTokens.ink} fill="none" strokeWidth="1.5"/></svg>
            <span style={{ height: 16, width: 1, background: rwTokens.border }} />
            <div style={{ display: 'flex', gap: 2, background: rwTokens.soft, padding: 2, borderRadius: 5 }}>
              {["Target", "Industry", "Peers", "External"].map((t, i) => (
                <span key={t} style={{
                  padding: '5px 11px', borderRadius: 4,
                  background: i === 1 ? rwTokens.surface : 'transparent',
                  color: i === 1 ? rwTokens.ink : rwTokens.inkSoft,
                  ...rwFont.ui, fontSize: 12, fontWeight: i === 1 ? 500 : 400,
                  boxShadow: i === 1 ? rwTokens.shadowCta : 'none',
                  cursor: 'pointer',
                }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 999,
              background: 'transparent', color: rwTokens.inkSoft,
              border: `1px solid ${rwTokens.border}`, cursor: 'pointer',
              ...rwFont.mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5.5 1v7M2.5 5.5l3 3 3-3 M1 9.5h9"/></svg>
              Report
            </button>
            <RwPill tone="amber"><RwDot color="amber" />Drift detected</RwPill>
          </div>
        </div>

        {/* Canvas */}
        <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
          {/* === Hero band === */}
          <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 24, marginBottom: 22 }}>
            <div>
              <RwEyebrow>Generation · Industry</RwEyebrow>
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'flex-end', gap: 20 }}>
                <span style={{
                  ...rwFont.ui, fontWeight: 500,
                  fontSize: 72, lineHeight: 0.95, color: rwTokens.ink,
                  fontFeatureSettings: '"tnum","lnum","ss01"',
                  letterSpacing: '-0.028em',
                }}>
                  {ERM_DATA.overallScore.toFixed(2)}
                </span>
                <div style={{ paddingBottom: 8 }}>
                  <div style={{ ...rwFont.mono, fontSize: 10, color: rwTokens.inkMuted, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    of 5.00 overall
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <RwSpark values={heroSpark} w={120} h={28} color={rwTokens.gold} />
                  </div>
                </div>
              </div>
              <p style={{ marginTop: 12, fontSize: 13, color: rwTokens.inkSoft, maxWidth: 520, lineHeight: 1.55 }}>
                Weighted across 10 pillars · 2 aligned · 12 roadmap actions queued
              </p>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              border: `1px solid ${rwTokens.border}`, borderRadius: 8,
              background: rwTokens.surface, overflow: 'hidden',
            }}>
              {[
                { l: "Benchmark", v: "3.55", u: "avg / 5", color: rwTokens.ink },
                { l: "Aligned", v: "2", suf: <span style={{ color: rwTokens.inkMuted, fontSize: 14 }}>/10</span>, u: "pillars", color: rwTokens.coral },
                { l: "Integrity", v: "98", suf: <span style={{ color: rwTokens.inkMuted, fontSize: 14 }}>%</span>, u: "system", color: rwTokens.ink },
              ].map((m, i) => (
                <div key={m.l} style={{
                  padding: '14px 18px',
                  borderLeft: i > 0 ? `1px solid ${rwTokens.border}` : 'none',
                }}>
                  <RwEyebrow>{m.l}</RwEyebrow>
                  <div style={{ marginTop: 4, ...rwFont.ui, fontSize: 22, fontWeight: 500, color: m.color, letterSpacing: '-0.028em', fontFeatureSettings: '"tnum"' }}>
                    {m.v}{m.suf}
                  </div>
                  <div style={{ ...rwFont.mono, fontSize: 9, color: rwTokens.inkMuted, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {m.u}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* === Radar + Pillar list === */}
          <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 24, marginBottom: 22 }}>
            {/* Radar card */}
            <div style={{
              background: rwTokens.surface, border: `1px solid ${rwTokens.border}`,
              borderRadius: 8, padding: 20,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <RwEyebrow>Pillar scope</RwEyebrow>
                  <div style={{ ...rwFont.ui, fontSize: 16, fontWeight: 600, marginTop: 4, letterSpacing: '-0.018em' }}>
                    Maturity vs Industry
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 12, height: 2, background: rwTokens.ink }} />
                    <span style={{ fontSize: 11, color: rwTokens.inkSoft }}>Current</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 12, borderTop: `1.5px dashed ${rwTokens.gold}` }} />
                    <span style={{ fontSize: 11, color: rwTokens.inkSoft }}>Benchmark</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: -10, marginBottom: -10 }}>
                <RwRadar size={340} />
              </div>
            </div>

            {/* Pillar list */}
            <div style={{
              background: rwTokens.surface, border: `1px solid ${rwTokens.border}`,
              borderRadius: 8, overflow: 'hidden',
            }}>
              <div style={{ padding: '14px 18px', borderBottom: `1px solid ${rwTokens.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <RwEyebrow>Pillar vectors</RwEyebrow>
                  <div style={{ ...rwFont.ui, fontSize: 16, fontWeight: 600, marginTop: 2, letterSpacing: '-0.018em' }}>
                    Current vs Industry
                  </div>
                </div>
                <span style={{ ...rwFont.mono, fontSize: 10, color: rwTokens.inkMuted, marginTop: 4 }}>10 pillars</span>
              </div>
              {ERM_DATA.pillars.map((p, i) => {
                const above = p.score >= p.target;
                const pct = (p.score / 5) * 100;
                const targetPct = (p.target / 5) * 100;
                const focused = i === 0;
                return (
                  <div key={p.id} style={{
                    padding: '10px 18px',
                    background: focused ? rwTokens.hover : 'transparent',
                    borderBottom: i < ERM_DATA.pillars.length - 1 ? `1px solid ${rwTokens.border}` : 'none',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                      <span style={{ fontSize: 12.5, color: rwTokens.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {p.name}
                      </span>
                      <span style={{ ...rwFont.mono, fontSize: 13, color: rwTokens.ink, fontWeight: 500 }}>
                        {p.score.toFixed(2)}
                      </span>
                    </div>
                    <div style={{ marginTop: 6, height: 3, background: rwTokens.soft, borderRadius: 999, position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: above ? rwTokens.mint : rwTokens.gold, borderRadius: 999 }} />
                      <div style={{ position: 'absolute', top: -1, left: `${targetPct}%`, width: 1, height: 5, background: rwTokens.borderStr }} />
                    </div>
                    <div style={{ marginTop: 4, display: 'flex', justifyContent: 'space-between', ...rwFont.mono, fontSize: 9.5, color: rwTokens.inkMuted }}>
                      <span>Industry {p.target.toFixed(2)}</span>
                      <span style={{ color: p.score >= p.target ? rwTokens.mint : rwTokens.coral, fontWeight: 500 }}>
                        {p.score >= p.target ? "aligned" : `−${(p.target - p.score).toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* === Dimensions / Drift / Coverage === */}
          <div style={{ display: 'grid', gridTemplateColumns: '5fr 4fr 3fr', gap: 24, marginBottom: 22 }}>
            {/* Dimensions */}
            <div style={{ background: rwTokens.surface, border: `1px solid ${rwTokens.border}`, borderRadius: 8, padding: 20 }}>
              <RwEyebrow>Operating dimensions</RwEyebrow>
              <div style={{ ...rwFont.ui, fontSize: 16, fontWeight: 600, marginTop: 2, marginBottom: 16, letterSpacing: '-0.018em' }}>
                People · Process · Tech · Gov
              </div>
              {ERM_DATA.dimensions.map(d => {
                const pct = (d.score / 5) * 100;
                const above = d.score >= 4.0;
                return (
                  <div key={d.id} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                      <span style={{ fontSize: 12.5, color: rwTokens.ink }}>{d.name}</span>
                      <span style={{ ...rwFont.mono, fontSize: 14, color: above ? rwTokens.gold : rwTokens.ink, fontWeight: 600 }}>
                        {d.score.toFixed(2)}
                      </span>
                    </div>
                    <div style={{ height: 3, background: rwTokens.soft, borderRadius: 999 }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: above ? rwTokens.mint : rwTokens.ink, borderRadius: 999 }} />
                    </div>
                  </div>
                );
              })}
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${rwTokens.border}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <RwEyebrow>Avg gap</RwEyebrow>
                  <div style={{ ...rwFont.ui, fontSize: 18, fontWeight: 500, color: rwTokens.coral, marginTop: 2, letterSpacing: '-0.02em' }}>0.21</div>
                </div>
                <div>
                  <RwEyebrow>Integrity</RwEyebrow>
                  <div style={{ ...rwFont.ui, fontSize: 18, fontWeight: 500, color: rwTokens.mint, marginTop: 2, letterSpacing: '-0.02em' }}>98%</div>
                </div>
              </div>
            </div>

            {/* Drift signal */}
            <div style={{
              background: rwTokens.surface, border: `1px solid ${rwTokens.border}`,
              borderTop: `2px solid ${rwTokens.coral}`,
              borderRadius: 8, padding: 20,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <RwEyebrow>Drift signal</RwEyebrow>
                  <div style={{ ...rwFont.ui, fontSize: 16, fontWeight: 600, marginTop: 2, letterSpacing: '-0.018em' }}>
                    vs prior baseline
                  </div>
                </div>
                <RwDot color="coral" />
              </div>
              <div style={{ marginTop: 8 }}>
                <RwDriftArea data={driftData} w={320} h={130} />
              </div>
              <div style={{ paddingTop: 8, display: 'flex', justifyContent: 'space-between', ...rwFont.mono, fontSize: 10.5 }}>
                <span style={{ color: rwTokens.inkMuted }}>3 regression signals</span>
                <span style={{ color: rwTokens.coral, fontWeight: 500 }}>worst −0.42</span>
              </div>
            </div>

            {/* Response coverage */}
            <div style={{ background: rwTokens.surface, border: `1px solid ${rwTokens.border}`, borderRadius: 8, padding: 20 }}>
              <RwEyebrow>Response coverage</RwEyebrow>
              <div style={{ marginTop: 12 }}>
                {[
                  ["Vectors", "100/100"],
                  ["Evidence", "47"],
                  ["Notes", "23"],
                ].map(([k, v], i, arr) => (
                  <div key={k} style={{
                    display: 'flex', justifyContent: 'space-between',
                    fontSize: 12.5, padding: '10px 0',
                    borderBottom: i < arr.length - 1 ? `1px solid ${rwTokens.border}` : 'none',
                  }}>
                    <span style={{ ...rwFont.mono, color: rwTokens.inkMuted }}>{k}</span>
                    <span style={{ ...rwFont.mono, color: rwTokens.ink, fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* === Pillar focus inspector === */}
          <div style={{
            background: rwTokens.surface, border: `1px solid ${rwTokens.border}`,
            borderRadius: 8, padding: 20, marginBottom: 22,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <RwEyebrow>Focus · Leadership & Governance</RwEyebrow>
                <div style={{ ...rwFont.ui, fontSize: 16, fontWeight: 600, marginTop: 2, letterSpacing: '-0.018em' }}>
                  3.78 vs Industry 3.80
                  <span style={{ marginLeft: 12, fontSize: 13, color: rwTokens.coral, fontWeight: 500 }}>−0.02</span>
                </div>
              </div>
              <RwPill tone="coral">Below benchmark</RwPill>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {ERM_DATA.dimensions.map(d => (
                <div key={d.id} style={{
                  border: `1px solid ${rwTokens.border}`, borderRadius: 6, padding: 12,
                }}>
                  <RwEyebrow>{d.name}</RwEyebrow>
                  <div style={{ ...rwFont.ui, fontSize: 18, fontWeight: 500, marginTop: 2, letterSpacing: '-0.02em' }}>
                    {d.score.toFixed(2)}
                  </div>
                  <div style={{ marginTop: 8, height: 3, background: rwTokens.soft, borderRadius: 999 }}>
                    <div style={{ height: '100%', width: `${(d.score/5)*100}%`, background: d.score >= 4 ? rwTokens.mint : rwTokens.ink, borderRadius: 999 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* === Roadmap table === */}
          <div style={{
            background: rwTokens.surface, border: `1px solid ${rwTokens.border}`,
            borderRadius: 8, overflow: 'hidden',
          }}>
            <div style={{ padding: '14px 18px', borderBottom: `1px solid ${rwTokens.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <RwEyebrow>Sequencing</RwEyebrow>
                <div style={{ ...rwFont.ui, fontSize: 16, fontWeight: 600, marginTop: 2, letterSpacing: '-0.018em' }}>Uplift roadmap</div>
              </div>
              <RwPill>12 actions</RwPill>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
              <thead>
                <tr style={{ background: rwTokens.soft }}>
                  {["Action", "Phase", "Priority", "Uplift"].map((h, i) => (
                    <th key={h} style={{
                      padding: '10px 18px', textAlign: i >= 2 ? 'right' : 'left',
                      ...rwFont.mono, fontSize: 10, fontWeight: 500,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: rwTokens.inkMuted,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ERM_DATA.roadmap.map((r, i) => {
                  const phaseTone = r.phase === 1 ? "amber" : r.phase === 2 ? "sky" : "ink";
                  return (
                    <tr key={i} style={{ borderTop: `1px solid ${rwTokens.border}` }}>
                      <td style={{ padding: '12px 18px' }}>
                        <div style={{ fontSize: 12.5, color: rwTokens.ink }}>{r.name}</div>
                        <div style={{ ...rwFont.mono, fontSize: 10, color: rwTokens.inkMuted, marginTop: 2 }}>
                          {r.pillar} · {r.effort}
                        </div>
                      </td>
                      <td style={{ padding: '12px 18px' }}>
                        <RwPill tone={phaseTone}>Phase {r.phase}</RwPill>
                      </td>
                      <td style={{ padding: '12px 18px', textAlign: 'right', ...rwFont.mono, fontSize: 12, color: rwTokens.ink }}>
                        {(r.uplift * 3 + 1).toFixed(2)}
                      </td>
                      <td style={{ padding: '12px 18px', textAlign: 'right', ...rwFont.mono, fontSize: 13, color: rwTokens.gold, fontWeight: 600 }}>
                        +{r.uplift.toFixed(1)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ height: 32 }} />
      </div>
    </div>
  );
};

window.DirectionG = DirectionG;

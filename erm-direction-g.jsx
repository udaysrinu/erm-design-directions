/* Direction G — runway-rewrite branch, cleaned up.
 *
 * Same tokens as the live runway-rewrite branch (bg #F8F7F5, ink #261B07,
 * gold #F9A600, border #E3DFD5, Inter, 3-layer tactile shadow). What
 * changed: composition. Hero gets the room it deserved, fewer sections
 * fight for attention, one clear reading order: score → coverage → detail.
 */

const rwTokens = {
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
  gold:      "#F9A600",
  goldSoft:  "rgba(249, 166, 0, 0.14)",
  highlight: "#F7B92E",
  mint:      "#2E6B48",
  mintSoft:  "rgba(46, 107, 72, 0.10)",
  coral:     "#A64226",
  coralSoft: "rgba(166, 66, 38, 0.09)",
  sky:       "#1E4D73",
  buGen:  "#F5E4C8", buGenDot:  "#D49E3C",
  buTra:  "#D8E4EF", buTraDot:  "#6B8FAE",
  buDis:  "#D9E5D3", buDisDot:  "#7B9A6B",
  buCorp: "#EEE6D7", buCorpDot: "#A89673",
  buSub:  "#EBDEE0", buSubDot:  "#B08894",
  buJv:   "#DDD8E9", buJvDot:   "#8E82A8",
  shadowCta: "inset 0 2px 4px rgba(255,255,255,0.56), 0 4px 8px rgba(38,27,7,0.06), 0 1px 2px rgba(38,27,7,0.36)",
};

const rwFont = {
  ui:    { fontFamily: '"Inter", system-ui, sans-serif', letterSpacing: '-0.005em' },
  serif: { fontFamily: '"Fraunces", "Times New Roman", serif' },
  mono:  { fontFamily: '"JetBrains Mono", ui-monospace, monospace' },
};

const RwEyebrow = ({ children, tone = "muted", size = 10 }) => {
  const color = tone === "gold" ? rwTokens.gold : tone === "ink" ? rwTokens.ink : rwTokens.inkMuted;
  return (
    <span style={{
      ...rwFont.mono, fontSize: size, fontWeight: 500,
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

const RwBuGlyph = ({ id, size = 18, color = "currentColor" }) => {
  const common = { width: size, height: size, viewBox: "0 0 28 28", fill: "none", strokeWidth: 1.6, stroke: color, strokeLinecap: "round", strokeLinejoin: "round" };
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

const RwRadar = ({ size = 360 }) => {
  const cx = size/2, cy = size/2, r = size/2 - 36;
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
      <polygon points={radarPoints(scores, 5, cx, cy, r)} fill={rwTokens.ink} fillOpacity="0.08" stroke={rwTokens.ink} strokeWidth="1.8" />
      <polygon points={radarPoints(targets, 5, cx, cy, r)} fill="none" stroke={rwTokens.gold} strokeWidth="1.5" strokeDasharray="4 4" />
      {ERM_DATA.pillars.map((p, i) => {
        const a = -Math.PI/2 + (i * 2 * Math.PI)/10;
        const x = cx + Math.cos(a) * r * (p.score/5);
        const y = cy + Math.sin(a) * r * (p.score/5);
        return <circle key={p.id} cx={x} cy={y} r="3" fill={rwTokens.ink} />;
      })}
      {ERM_DATA.pillars.map((p, i) => {
        const pos = radarLabelPos(i, 10, cx, cy, r, 22);
        const anchor = Math.abs(Math.cos(pos.a)) < 0.3 ? "middle" : pos.x > cx ? "start" : "end";
        return <text key={p.id} x={pos.x} y={pos.y} fontSize="10.5" fontFamily="Inter" fill={rwTokens.inkMuted} textAnchor={anchor} dominantBaseline="middle" letterSpacing="-0.005em">
          {p.short.charAt(0) + p.short.slice(1).toLowerCase()}
        </text>;
      })}
    </svg>
  );
};

const RwSpark = ({ values, w = 140, h = 36, color }) => {
  if (!values.length) return null;
  const min = Math.min(...values), max = Math.max(...values);
  const span = max - min || 1;
  const step = w / (values.length - 1 || 1);
  const points = values.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / span) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const linePath = `M${points.join(' L')}`;
  const fillPath = `${linePath} L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h}>
      <path d={fillPath} fill={color} opacity="0.14" />
      <path d={linePath} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx={(values.length - 1) * step} cy={h - ((values[values.length - 1] - min) / span) * h} r="3" fill={color} />
    </svg>
  );
};

const DirectionG = () => {
  const heroSpark = [3.62, 3.68, 3.71, 3.65, 3.52, 3.41, 3.34];

  return (
    <div style={{
      width: 1440, minHeight: 1280,
      background: rwTokens.bg,
      color: rwTokens.ink,
      ...rwFont.ui, fontSize: 14, lineHeight: 1.5,
      display: 'grid', gridTemplateColumns: '240px 1fr',
      overflow: 'hidden',
    }}>
      {/* ── SIDEBAR ────────────────────────────────────────────── */}
      <aside style={{
        background: rwTokens.surface,
        borderRight: `1px solid ${rwTokens.border}`,
        padding: 20,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 28 }}>
          <span style={{ width: 22, height: 22, borderRadius: 5, background: rwTokens.ink, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ width: 8, height: 8, background: rwTokens.gold, borderRadius: 2 }} />
          </span>
          <span style={{ ...rwFont.serif, fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em' }}>ERM Navigator</span>
        </div>

        <RwEyebrow>Operating units</RwEyebrow>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { id: "gen",  name: "Generation",     tint: rwTokens.buGen,  dot: rwTokens.buGenDot, active: true },
            { id: "tra",  name: "Transmission",   tint: rwTokens.buTra,  dot: rwTokens.buTraDot },
            { id: "dis",  name: "Distribution",   tint: rwTokens.buDis,  dot: rwTokens.buDisDot },
            { id: "corp", name: "Corporate",      tint: rwTokens.buCorp, dot: rwTokens.buCorpDot },
            { id: "sub",  name: "Subsidiaries",   tint: rwTokens.buSub,  dot: rwTokens.buSubDot },
            { id: "jv",   name: "Joint Ventures", tint: rwTokens.buJv,   dot: rwTokens.buJvDot },
          ].map(bu => (
            <button key={bu.id} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '7px 9px', borderRadius: 6,
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
                flexShrink: 0,
              }}>
                <RwBuGlyph id={bu.id} size={14} color={bu.dot} />
              </span>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {bu.name}
              </span>
              {bu.active && <span style={{ width: 4, height: 4, borderRadius: 999, background: rwTokens.gold }} />}
            </button>
          ))}
        </div>

        <div style={{ height: 1, background: rwTokens.border, margin: '18px 0' }} />

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
              fontWeight: it.active ? 500 : 400, fontSize: 13, ...rwFont.ui,
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

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: rwTokens.inkMuted, paddingTop: 18 }}>
          <span style={{ width: 24, height: 24, borderRadius: 999, background: rwTokens.ink, color: rwTokens.bg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600 }}>AS</span>
          <span>analyst@gmail.com</span>
        </div>
      </aside>

      {/* ── MAIN ───────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{
          padding: '14px 36px', borderBottom: `1px solid ${rwTokens.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <RwBuGlyph id="gen" size={18} color={rwTokens.buGenDot} />
            <span style={{ fontSize: 14, fontWeight: 500, color: rwTokens.ink }}>Generation</span>
            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" stroke={rwTokens.ink} fill="none" strokeWidth="1.5"/></svg>
            <span style={{ height: 16, width: 1, background: rwTokens.border }} />
            <div style={{ display: 'flex', gap: 2, background: rwTokens.soft, padding: 2, borderRadius: 5 }}>
              {["Target", "Industry", "Peers", "External"].map((t, i) => (
                <span key={t} style={{
                  padding: '5px 12px', borderRadius: 4,
                  background: i === 1 ? rwTokens.surface : 'transparent',
                  color: i === 1 ? rwTokens.ink : rwTokens.inkSoft,
                  fontSize: 12, fontWeight: i === 1 ? 500 : 400,
                  boxShadow: i === 1 ? rwTokens.shadowCta : 'none',
                  cursor: 'pointer',
                }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <RwPill tone="amber"><span style={{ width: 6, height: 6, borderRadius: 999, background: rwTokens.gold }} />Drift detected</RwPill>
            <button style={{
              padding: '7px 14px', borderRadius: 7, fontSize: 13, fontWeight: 600,
              background: rwTokens.gold, color: rwTokens.ink,
              border: `1px solid rgba(38,27,7,0.20)`, cursor: 'pointer',
              boxShadow: rwTokens.shadowCta,
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5.5 1v7M2.5 5.5l3 3 3-3 M1 9.5h9"/></svg>
              Download PDF report
            </button>
          </div>
        </div>

        {/* ── HERO (the only thing in the first viewport) ───── */}
        <div style={{ padding: '44px 48px 0' }}>
          <RwEyebrow size={11}>Generation · benchmark · Industry</RwEyebrow>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
              <span style={{
                ...rwFont.ui, fontWeight: 500,
                fontSize: 104, lineHeight: 0.92, color: rwTokens.ink,
                fontFeatureSettings: '"tnum","lnum","ss01"', letterSpacing: '-0.035em',
              }}>
                3.34
              </span>
              <div style={{ paddingBottom: 8 }}>
                <div style={{ ...rwFont.mono, fontSize: 11, color: rwTokens.inkMuted, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  of 5.00 overall
                </div>
                <div style={{ marginTop: 10 }}>
                  <RwSpark values={heroSpark} w={160} h={42} color={rwTokens.coral} />
                </div>
                <div style={{ marginTop: 4, display: 'flex', gap: 14, ...rwFont.mono, fontSize: 11 }}>
                  <span style={{ color: rwTokens.coral, fontWeight: 600 }}>↓ 0.21 vs Industry</span>
                  <span style={{ color: rwTokens.coral, fontWeight: 600 }}>↓ 0.28 over 30d</span>
                </div>
              </div>
            </div>
          </div>
          <p style={{ marginTop: 18, fontSize: 14, color: rwTokens.inkSoft, maxWidth: 620, lineHeight: 1.55 }}>
            Weighted across 10 pillars and 4 operating dimensions. 2 pillars aligned with Industry · 12 roadmap
            actions queued. Drift detection flagged 3 critical regressions in the last 7 days.
          </p>
        </div>

        {/* KPI band */}
        <div style={{
          margin: '32px 48px 0', padding: '20px 24px',
          background: rwTokens.surface,
          border: `1px solid ${rwTokens.border}`,
          borderRadius: 10,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {[
            { l: "Benchmark · Industry", v: "3.55", u: "avg / 5", tone: 'ink' },
            { l: "Aligned pillars",      v: "2",    u: "of 10",   tone: 'coral' },
            { l: "Drift signals · 7d",   v: "3",    u: "critical", tone: 'coral' },
            { l: "Evidence integrity",   v: "98",   u: "% linked", tone: 'mint' },
          ].map((k, i) => {
            const color = k.tone === 'mint' ? rwTokens.mint : k.tone === 'coral' ? rwTokens.coral : rwTokens.ink;
            return (
              <div key={i} style={{
                paddingLeft: i > 0 ? 24 : 0,
                borderLeft: i > 0 ? `1px solid ${rwTokens.border}` : 'none',
              }}>
                <RwEyebrow>{k.l}</RwEyebrow>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
                  <span style={{ ...rwFont.ui, fontSize: 30, fontWeight: 500, color, letterSpacing: '-0.025em', lineHeight: 1 }}>
                    {k.v}
                  </span>
                  <span style={{ ...rwFont.mono, fontSize: 11, color: rwTokens.inkMuted }}>{k.u}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Detail row: radar + pillar list ──────────────── */}
        <div style={{ padding: '28px 48px 0', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 24 }}>
          {/* Radar */}
          <div style={{
            background: rwTokens.surface, border: `1px solid ${rwTokens.border}`,
            borderRadius: 10, padding: '22px 24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
              <div>
                <RwEyebrow>Pillar scope</RwEyebrow>
                <div style={{ ...rwFont.ui, fontSize: 17, fontWeight: 600, marginTop: 4, letterSpacing: '-0.018em' }}>
                  Maturity vs Industry
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 12, height: 2, background: rwTokens.ink }} />
                  <span style={{ fontSize: 11, color: rwTokens.inkSoft }}>Current</span>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 12, borderTop: `1.5px dashed ${rwTokens.gold}` }} />
                  <span style={{ fontSize: 11, color: rwTokens.inkSoft }}>Benchmark</span>
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: -6, marginBottom: -10 }}>
              <RwRadar size={360} />
            </div>
          </div>

          {/* Pillar list */}
          <div style={{
            background: rwTokens.surface, border: `1px solid ${rwTokens.border}`,
            borderRadius: 10, overflow: 'hidden',
          }}>
            <div style={{
              padding: '16px 22px', borderBottom: `1px solid ${rwTokens.border}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            }}>
              <div>
                <RwEyebrow>Pillars · 10</RwEyebrow>
                <div style={{ ...rwFont.ui, fontSize: 17, fontWeight: 600, marginTop: 4, letterSpacing: '-0.018em' }}>
                  Current vs Industry
                </div>
              </div>
              <span style={{ ...rwFont.mono, fontSize: 10.5, color: rwTokens.inkMuted, marginTop: 6 }}>sort: gap desc</span>
            </div>
            {[...ERM_DATA.pillars].sort((a, b) => (b.target - b.score) - (a.target - a.score)).map((p, i, arr) => {
              const above = p.score >= p.target;
              const pct = (p.score / 5) * 100;
              const targetPct = (p.target / 5) * 100;
              const barColor = above ? rwTokens.mint : Math.abs(p.target - p.score) > 0.4 ? rwTokens.coral : rwTokens.gold;
              return (
                <div key={p.id} style={{
                  padding: '11px 22px',
                  borderBottom: i < arr.length - 1 ? `1px solid ${rwTokens.border}` : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                    <span style={{ fontSize: 13, color: rwTokens.ink, fontWeight: 500 }}>
                      {p.name}
                    </span>
                    <span style={{ ...rwFont.ui, fontSize: 15, color: rwTokens.ink, fontWeight: 600, letterSpacing: '-0.01em' }}>
                      {p.score.toFixed(2)}
                    </span>
                  </div>
                  <div style={{ marginTop: 6, height: 3, background: rwTokens.soft, borderRadius: 999, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: barColor, borderRadius: 999 }} />
                    <div style={{ position: 'absolute', top: -2, left: `${targetPct}%`, width: 1, height: 7, background: rwTokens.borderStr }} />
                  </div>
                  <div style={{ marginTop: 4, display: 'flex', justifyContent: 'space-between', ...rwFont.mono, fontSize: 10, color: rwTokens.inkMuted }}>
                    <span>Industry {p.target.toFixed(2)}</span>
                    <span style={{ color: above ? rwTokens.mint : rwTokens.coral, fontWeight: 500 }}>
                      {above ? "aligned" : `−${(p.target - p.score).toFixed(2)}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Dimensions strip ─────────────────────────────── */}
        <div style={{ padding: '20px 48px 0' }}>
          <div style={{
            background: rwTokens.surface, border: `1px solid ${rwTokens.border}`,
            borderRadius: 10, padding: '20px 24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
              <div>
                <RwEyebrow>Operating dimensions</RwEyebrow>
                <div style={{ ...rwFont.ui, fontSize: 17, fontWeight: 600, marginTop: 4, letterSpacing: '-0.018em' }}>
                  People · Process · Technology · Governance
                </div>
              </div>
              <span style={{ ...rwFont.mono, fontSize: 10.5, color: rwTokens.inkMuted }}>
                avg gap −0.21 · integrity 98%
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {ERM_DATA.dimensions.map(d => {
                const pct = (d.score / 5) * 100;
                const above = d.score >= 4.0;
                return (
                  <div key={d.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: rwTokens.ink, fontWeight: 500 }}>{d.name}</span>
                      <span style={{ ...rwFont.ui, fontSize: 22, fontWeight: 600, color: above ? rwTokens.gold : rwTokens.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>
                        {d.score.toFixed(2)}
                      </span>
                    </div>
                    <div style={{ height: 4, background: rwTokens.soft, borderRadius: 999 }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: above ? rwTokens.mint : rwTokens.ink, borderRadius: 999 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ height: 32 }} />

        {/* Footer — trust band, mirrors runway-rewrite branch */}
        <footer style={{
          marginTop: 'auto', padding: '14px 48px',
          background: rwTokens.surface,
          borderTop: `1px solid ${rwTokens.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          ...rwFont.mono, fontSize: 10.5, color: rwTokens.inkMuted, letterSpacing: '0.06em',
        }}>
          <div style={{ display: 'flex', gap: 18 }}>
            <span><span style={{ color: rwTokens.mint }}>●</span>  35 / 35 tests passing</span>
            <span><span style={{ color: rwTokens.mint }}>●</span>  scoring · deterministic</span>
            <span><span style={{ color: rwTokens.gold }}>●</span>  drift engine · active</span>
          </div>
          <span>ISO 31000 · COSO ERM · NIST RMF · RIMS RMM</span>
        </footer>
      </div>
    </div>
  );
};

window.DirectionG = DirectionG;

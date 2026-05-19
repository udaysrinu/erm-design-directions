/* Direction E — "Time Machine".
 * Solves the problem: drift detection is the moat, but every dashboard buries it.
 * Make it the entire product. The hero is a 12-month timeline scrubber. Maturity
 * animates as you drag. Inflection points are pinned events. Pillars are small
 * multiples below. Right rail is "What was happening on [date]" — events, evidence,
 * decisions, all addressable.
 *
 * This is risk management as a Git log + flight recorder, not a dashboard.
 */

const tmTokens = {
  bg:        "#0F1115",       // near-black with warm undertone — drift is solemn
  bgPanel:   "#161A20",
  bgRaised:  "#1D222B",
  bgInset:   "#0A0C10",
  border:    "rgba(220, 218, 208, 0.08)",
  borderStr: "rgba(220, 218, 208, 0.18)",
  borderHi:  "rgba(255, 200, 110, 0.42)",
  ink:       "#E8E5DA",       // warm cream on dark
  inkSoft:   "rgba(232, 229, 218, 0.72)",
  inkMuted:  "rgba(232, 229, 218, 0.48)",
  inkSubtle: "rgba(232, 229, 218, 0.28)",
  inkFaint:  "rgba(232, 229, 218, 0.12)",
  accent:    "#E8B057",       // warm amber — historical, archival
  accentSoft:"rgba(232, 176, 87, 0.14)",
  accentDim: "rgba(232, 176, 87, 0.40)",
  blue:      "#7BAACD",
  blueSoft:  "rgba(123, 170, 205, 0.14)",
  ok:        "#7FC79E",
  okSoft:    "rgba(127, 199, 158, 0.14)",
  warn:      "#E8B057",
  warnSoft:  "rgba(232, 176, 87, 0.14)",
  crit:      "#E08070",
  critSoft:  "rgba(224, 128, 112, 0.14)",
};

const tmFont = {
  ui:   { fontFamily: '"Inter Tight", "Inter", system-ui, sans-serif' },
  mono: { fontFamily: '"JetBrains Mono", ui-monospace, monospace' },
};

// 12 months of synthetic maturity data, ending at current 3.34
const tmMonths = ["Jun '25","Jul","Aug","Sep","Oct","Nov","Dec","Jan '26","Feb","Mar","Apr","May"];
const tmMaturity = [3.62, 3.68, 3.71, 3.74, 3.69, 3.65, 3.58, 3.52, 3.48, 3.41, 3.36, 3.34];
const tmCulture  = [3.45, 3.48, 3.50, 3.52, 3.46, 3.38, 3.30, 3.22, 3.10, 2.95, 2.85, 2.78];
const tmTreat    = [3.40, 3.42, 3.44, 3.43, 3.38, 3.32, 3.26, 3.18, 3.10, 3.02, 2.98, 2.95];
const tmIdent    = [3.55, 3.58, 3.62, 3.65, 3.68, 3.72, 3.75, 3.78, 3.80, 3.82, 3.84, 3.85];

const tmEvents = [
  { m: 2,  kind: "audit",  label: "ISO 31000 external audit closed",      tone: "ok" },
  { m: 4,  kind: "ship",   label: "Vendor risk register v2 deployed",     tone: "ok" },
  { m: 6,  kind: "miss",   label: "Q4 culture survey skipped",            tone: "crit" },
  { m: 8,  kind: "drift",  label: "Treatment plans · 6 owners unassigned",tone: "warn" },
  { m: 9,  kind: "incident", label: "March incident · escalation failure",tone: "crit" },
  { m: 10, kind: "review", label: "KRI thresholds last reviewed",         tone: "warn" },
  { m: 11, kind: "signal", label: "Culture drift detected · today",       tone: "crit" },
];

const SVG_W = 1280;
const SVG_H = 260;
const PAD_L = 48, PAD_R = 48, PAD_T = 24, PAD_B = 50;
const PLOT_W = SVG_W - PAD_L - PAD_R;
const PLOT_H = SVG_H - PAD_T - PAD_B;
const NOW_IDX = 11; // current snapshot
const SEL_IDX = 9;  // selected = March

const x = (i) => PAD_L + (i / (tmMonths.length - 1)) * PLOT_W;
const y = (v, vmin = 2.4, vmax = 4.0) => PAD_T + (1 - (v - vmin) / (vmax - vmin)) * PLOT_H;

const tmLine = (series, vmin, vmax) =>
  series.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v, vmin, vmax).toFixed(1)}`).join(' ');

const tmArea = (series, vmin, vmax) =>
  `${tmLine(series, vmin, vmax)} L${x(series.length - 1).toFixed(1)},${(PAD_T + PLOT_H).toFixed(1)} L${PAD_L},${(PAD_T + PLOT_H).toFixed(1)} Z`;

// Tiny sparkline for pillar small-multiples
const TmSpark = ({ series, w = 140, h = 36, color, sel = SEL_IDX }) => {
  const vmin = Math.min(...series) - 0.05;
  const vmax = Math.max(...series) + 0.05;
  const sx = (i) => (i / (series.length - 1)) * w;
  const sy = (v) => h - ((v - vmin) / (vmax - vmin)) * h;
  const line = series.map((v, i) => `${i === 0 ? 'M' : 'L'}${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(' ');
  const area = `${line} L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h} style={{ overflow: 'visible', display: 'block' }}>
      <path d={area} fill={color} fillOpacity="0.18" />
      <path d={line} fill="none" stroke={color} strokeWidth="1.4" />
      {/* Selection marker */}
      <line x1={sx(sel)} y1="0" x2={sx(sel)} y2={h} stroke={tmTokens.accent} strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
      <circle cx={sx(sel)} cy={sy(series[sel])} r="3" fill={tmTokens.accent} stroke={tmTokens.bgPanel} strokeWidth="1.5" />
      {/* End marker */}
      <circle cx={sx(series.length - 1)} cy={sy(series[series.length - 1])} r="2" fill={color} />
    </svg>
  );
};

const DirectionE = () => {
  const selDate = "Mar 14, 2026";
  const selMaturity = tmMaturity[SEL_IDX];
  const nowMaturity = tmMaturity[NOW_IDX];

  return (
    <div style={{
      width: 1440, minHeight: 1280,
      background: tmTokens.bg,
      color: tmTokens.ink,
      ...tmFont.ui,
      fontSize: 14, lineHeight: 1.5,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* === NAV === */}
      <header style={{
        height: 56, borderBottom: `1px solid ${tmTokens.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <span style={{
              width: 22, height: 22, borderRadius: 5, background: tmTokens.accent,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ width: 8, height: 8, background: tmTokens.bg, borderRadius: 2 }} />
            </span>
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.015em' }}>Navigator</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {[
              { l: "Today" },
              { l: "History", active: true },
              { l: "Pillars" },
              { l: "Actions" },
              { l: "Evidence" },
            ].map(t => (
              <button key={t.l} style={{
                fontSize: 13, fontWeight: 500, padding: '6px 12px', borderRadius: 6,
                background: t.active ? tmTokens.bgRaised : 'transparent',
                color: t.active ? tmTokens.ink : tmTokens.inkMuted,
                border: 'none', cursor: 'pointer',
              }}>{t.l}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            ...tmFont.mono, fontSize: 11, color: tmTokens.inkMuted,
            padding: '5px 10px', background: tmTokens.bgPanel,
            border: `1px solid ${tmTokens.border}`, borderRadius: 5,
          }}>
            <span style={{ color: tmTokens.accent }}>●</span> 3 drift signals · 7d
          </span>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 13px', borderRadius: 6,
            background: tmTokens.accent, color: tmTokens.bg,
            border: 'none', fontSize: 13, fontWeight: 600,
            cursor: 'pointer',
          }}>
            Open today's brief
          </button>
        </div>
      </header>

      {/* === HERO === */}
      <div style={{ padding: '32px 32px 0' }}>
        <span style={{
          ...tmFont.mono, fontSize: 11, fontWeight: 500,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: tmTokens.accent,
        }}>
          ◐  Time machine · 12-month scope
        </span>
        <h1 style={{
          ...tmFont.ui, fontSize: 44, fontWeight: 500, letterSpacing: '-0.025em',
          lineHeight: 1.05, margin: '14px 0 0', maxWidth: 920,
        }}>
          Generation lost{' '}
          <span style={{ ...tmFont.mono, color: tmTokens.crit, fontWeight: 600 }}>−0.28</span>
          {' '}maturity since November. Three inflections explain
          <span style={{ borderBottom: `2px solid ${tmTokens.accentDim}`, paddingBottom: 2, marginLeft: 6 }}>
            87% of the drop
          </span>.
        </h1>
        <p style={{
          fontSize: 14.5, color: tmTokens.inkSoft, marginTop: 12, maxWidth: 760, lineHeight: 1.55,
        }}>
          Drag the playhead to any month to replay the snapshot. Inflection points are pinned —
          click one to see what was committed, audited, or skipped that quarter.
        </p>
      </div>

      {/* === TIMELINE CHART === */}
      <div style={{
        margin: '24px 32px 0',
        background: tmTokens.bgPanel,
        border: `1px solid ${tmTokens.border}`,
        borderRadius: 12, padding: '20px 8px 0',
      }}>
        <svg width={SVG_W} height={SVG_H} style={{ display: 'block', margin: '0 auto' }}>
          <defs>
            <linearGradient id="tmGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={tmTokens.accent} stopOpacity="0.32" />
              <stop offset="100%" stopColor={tmTokens.accent} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Y grid */}
          {[2.5, 3.0, 3.5, 4.0].map(g => {
            const yy = y(g);
            return (
              <g key={g}>
                <line x1={PAD_L} y1={yy} x2={PAD_L + PLOT_W} y2={yy}
                  stroke={tmTokens.border} strokeWidth="0.6" strokeDasharray="2 4" />
                <text x={PAD_L - 8} y={yy + 3} textAnchor="end" fontSize="10"
                  fontFamily="JetBrains Mono" fill={tmTokens.inkSubtle}>
                  {g.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Industry benchmark band */}
          <line x1={PAD_L} y1={y(3.55)} x2={PAD_L + PLOT_W} y2={y(3.55)}
            stroke={tmTokens.blue} strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          <text x={PAD_L + PLOT_W + 6} y={y(3.55) + 3} fontSize="10"
            fontFamily="JetBrains Mono" fill={tmTokens.blue} opacity="0.8">
            industry 3.55
          </text>

          {/* Maturity area + line */}
          <path d={tmArea(tmMaturity)} fill="url(#tmGrad)" />
          <path d={tmLine(tmMaturity)} fill="none" stroke={tmTokens.accent} strokeWidth="2.2" />

          {/* Event markers */}
          {tmEvents.map((e, i) => {
            const cx = x(e.m);
            const cy = y(tmMaturity[e.m]);
            const color = e.tone === "ok" ? tmTokens.ok : e.tone === "warn" ? tmTokens.warn : tmTokens.crit;
            return (
              <g key={i}>
                <line x1={cx} y1={cy} x2={cx} y2={PAD_T + PLOT_H + 8}
                  stroke={color} strokeWidth="0.8" opacity="0.32" strokeDasharray="2 2" />
                <circle cx={cx} cy={cy} r="5" fill={tmTokens.bgPanel} stroke={color} strokeWidth="1.4" />
                <circle cx={cx} cy={cy} r="2" fill={color} />
              </g>
            );
          })}

          {/* Playhead at selected month */}
          <line x1={x(SEL_IDX)} y1={PAD_T} x2={x(SEL_IDX)} y2={PAD_T + PLOT_H + 14}
            stroke={tmTokens.accent} strokeWidth="2" />
          <circle cx={x(SEL_IDX)} cy={y(tmMaturity[SEL_IDX])} r="7"
            fill={tmTokens.accent} stroke={tmTokens.bgPanel} strokeWidth="2.5" />

          {/* Selected month callout */}
          <g transform={`translate(${x(SEL_IDX)}, ${y(tmMaturity[SEL_IDX]) - 38})`}>
            <rect x="-44" y="-22" width="88" height="36" rx="6"
              fill={tmTokens.accent} />
            <text x="0" y="-7" textAnchor="middle" fontSize="11"
              fontFamily="JetBrains Mono" fontWeight="600" fill={tmTokens.bg} letterSpacing="0.06em">
              {selDate.split(',')[0].toUpperCase()}
            </text>
            <text x="0" y="9" textAnchor="middle" fontSize="14"
              fontFamily="Inter Tight, Inter" fontWeight="600" fill={tmTokens.bg} letterSpacing="-0.01em">
              {selMaturity.toFixed(2)}
            </text>
          </g>

          {/* X axis labels */}
          {tmMonths.map((m, i) => (
            <text key={i} x={x(i)} y={PAD_T + PLOT_H + 22}
              textAnchor="middle" fontSize="10.5"
              fontFamily="JetBrains Mono"
              fill={i === SEL_IDX ? tmTokens.accent : tmTokens.inkMuted}
              fontWeight={i === SEL_IDX ? 600 : 400}>
              {m}
            </text>
          ))}
          {/* Now marker */}
          <text x={x(NOW_IDX)} y={PAD_T + PLOT_H + 38} textAnchor="middle"
            fontSize="9" fontFamily="JetBrains Mono"
            fill={tmTokens.accent} letterSpacing="0.16em">
            ─── NOW
          </text>
        </svg>

        {/* Scrubber + playback */}
        <div style={{
          padding: '0 40px 18px',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <button style={{
            width: 32, height: 32, borderRadius: 999,
            background: tmTokens.bgRaised, border: `1px solid ${tmTokens.border}`,
            color: tmTokens.ink, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor">
              <path d="M3 2v7l5-3.5z" />
            </svg>
          </button>
          <div style={{ flex: 1, position: 'relative', height: 4 }}>
            <div style={{
              position: 'absolute', inset: 0, background: tmTokens.borderStr,
              borderRadius: 999,
            }} />
            <div style={{
              position: 'absolute', left: 0, top: 0, height: '100%',
              width: `${(SEL_IDX / (tmMonths.length - 1)) * 100}%`,
              background: tmTokens.accent, borderRadius: 999,
            }} />
            <div style={{
              position: 'absolute', left: `${(SEL_IDX / (tmMonths.length - 1)) * 100}%`,
              top: '50%', width: 14, height: 14, borderRadius: 999,
              background: tmTokens.accent, transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 0 4px ${tmTokens.accentSoft}`,
            }} />
          </div>
          <span style={{ ...tmFont.mono, fontSize: 11, color: tmTokens.inkMuted, minWidth: 60, textAlign: 'right' }}>
            {SEL_IDX + 1} / {tmMonths.length}
          </span>
          <div style={{ width: 1, height: 18, background: tmTokens.border }} />
          <div style={{ display: 'flex', gap: 4 }}>
            {["1y","6m","3m","1m"].map((r, i) => (
              <button key={r} style={{
                ...tmFont.mono, fontSize: 11, padding: '5px 10px',
                background: i === 0 ? tmTokens.bgRaised : 'transparent',
                color: i === 0 ? tmTokens.ink : tmTokens.inkMuted,
                border: `1px solid ${i === 0 ? tmTokens.borderStr : 'transparent'}`,
                borderRadius: 4, cursor: 'pointer',
              }}>{r}</button>
            ))}
          </div>
        </div>
      </div>

      {/* === SMALL MULTIPLES === */}
      <div style={{ padding: '24px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{
            ...tmFont.mono, fontSize: 11, fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: tmTokens.inkMuted,
          }}>
            10 pillars · 12-month trajectories · selection at {selDate}
          </span>
          <span style={{ flex: 1, height: 1, background: tmTokens.border }} />
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12,
        }}>
          {ERM_DATA.pillars.map((p, i) => {
            // Build a deterministic 12-month series ending at p.score
            const seed = p.id.charCodeAt(0);
            const series = Array.from({ length: 12 }, (_, k) => {
              const target = p.score;
              const drift = (k / 11) * (target - (target + (seed % 4) * 0.15 - 0.3));
              const wobble = Math.sin((seed + k) * 1.6) * 0.08;
              return +(target - drift * 0.6 + wobble).toFixed(2);
            });
            const start = series[0];
            const end = series[series.length - 1];
            const delta = end - start;
            const color = delta >= 0 ? tmTokens.ok : Math.abs(delta) > 0.3 ? tmTokens.crit : tmTokens.warn;
            return (
              <div key={p.id} style={{
                background: tmTokens.bgPanel,
                border: `1px solid ${tmTokens.border}`,
                borderRadius: 10, padding: 14,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 500, color: tmTokens.ink, lineHeight: 1.3 }}>
                      {p.name.length > 22 ? p.name.slice(0, 20) + '…' : p.name}
                    </div>
                    <div style={{ ...tmFont.mono, fontSize: 9, color: tmTokens.inkSubtle, marginTop: 3, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {p.short}
                    </div>
                  </div>
                  <span style={{
                    ...tmFont.mono, fontSize: 11, color, fontWeight: 600,
                  }}>
                    {delta >= 0 ? '+' : ''}{delta.toFixed(2)}
                  </span>
                </div>
                <div style={{ marginTop: 10 }}>
                  <TmSpark series={series} w={156} h={40} color={color} />
                </div>
                <div style={{
                  marginTop: 6, display: 'flex', justifyContent: 'space-between',
                  ...tmFont.mono, fontSize: 10, color: tmTokens.inkMuted,
                }}>
                  <span>{start.toFixed(2)}</span>
                  <span style={{ color: tmTokens.accent }}>→ at Mar: {series[SEL_IDX].toFixed(2)}</span>
                  <span style={{ color: tmTokens.ink, fontWeight: 600 }}>{end.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* === EVENT FEED FOR SELECTED DATE === */}
      <div style={{
        margin: '24px 32px 0',
        display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16,
      }}>
        <div style={{
          background: tmTokens.bgPanel,
          border: `1px solid ${tmTokens.border}`,
          borderRadius: 12, padding: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{
              ...tmFont.mono, fontSize: 11, fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: tmTokens.accent,
            }}>
              ✦ What was happening · {selDate}
            </span>
          </div>
          {[
            { time: "09:14", who: "Nora Mansour", what: "Flagged escalation-comfort drop in Q1 culture survey", kind: "flag", tone: "warn" },
            { time: "11:32", who: "Navigator AI", what: "Detected pattern: 3 People-dimension vectors regressed in 14 days", kind: "ai", tone: "crit" },
            { time: "13:45", who: "Fahad Al-Otaibi", what: "Linked incident report to vectors 86, 88, 90", kind: "evidence", tone: "ink" },
            { time: "16:20", who: "—", what: "Generation maturity crossed below 3.50 for first time since June", kind: "threshold", tone: "crit" },
            { time: "17:08", who: "Reem Al-Saud", what: "Opened Phase-1 action ACT-2026-019 · culture pulse cadence", kind: "action", tone: "ok" },
          ].map((e, i, arr) => {
            const dot = e.tone === "ok" ? tmTokens.ok : e.tone === "warn" ? tmTokens.warn :
                        e.tone === "crit" ? tmTokens.crit : tmTokens.inkSoft;
            return (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '54px 18px 1fr',
                gap: 12, padding: '12px 0', alignItems: 'flex-start',
                borderTop: i === 0 ? 'none' : `1px solid ${tmTokens.border}`,
              }}>
                <span style={{ ...tmFont.mono, fontSize: 11, color: tmTokens.inkMuted }}>
                  {e.time}
                </span>
                <div style={{ position: 'relative', height: '100%', minHeight: 20, display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: dot }} />
                  {i < arr.length - 1 && <span style={{
                    position: 'absolute', top: 14, bottom: -12,
                    width: 1, background: tmTokens.border,
                  }} />}
                </div>
                <div>
                  <div style={{ fontSize: 13.5, color: tmTokens.ink, lineHeight: 1.4 }}>
                    {e.what}
                  </div>
                  <div style={{ ...tmFont.mono, fontSize: 10.5, color: tmTokens.inkMuted, marginTop: 3 }}>
                    {e.who} · <span style={{ color: dot }}>{e.kind}</span>
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{
            marginTop: 14, paddingTop: 14, borderTop: `1px solid ${tmTokens.border}`,
            ...tmFont.mono, fontSize: 11, color: tmTokens.inkMuted,
          }}>
            + 12 lower-priority events on this date · <span style={{ color: tmTokens.accent }}>show all →</span>
          </div>
        </div>

        {/* RIGHT: contrast panel — now vs then */}
        <div style={{
          background: tmTokens.bgPanel,
          border: `1px solid ${tmTokens.border}`,
          borderRadius: 12, padding: 20,
        }}>
          <span style={{
            ...tmFont.mono, fontSize: 11, fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: tmTokens.inkMuted,
          }}>
            Snapshot · {selDate} ↔ today
          </span>
          {[
            { label: "Overall maturity",  then: selMaturity, now: nowMaturity, max: 5 },
            { label: "Risk Culture",       then: tmCulture[SEL_IDX], now: tmCulture[NOW_IDX], max: 5 },
            { label: "Risk Treatment",     then: tmTreat[SEL_IDX], now: tmTreat[NOW_IDX], max: 5 },
            { label: "Risk Identification",then: tmIdent[SEL_IDX], now: tmIdent[NOW_IDX], max: 5 },
          ].map((row, i) => {
            const delta = row.now - row.then;
            const color = delta >= 0 ? tmTokens.ok : Math.abs(delta) > 0.3 ? tmTokens.crit : tmTokens.warn;
            return (
              <div key={i} style={{
                padding: '14px 0',
                borderTop: i === 0 ? 'none' : `1px solid ${tmTokens.border}`,
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  marginBottom: 8,
                }}>
                  <span style={{ fontSize: 13, color: tmTokens.inkSoft }}>{row.label}</span>
                  <span style={{ ...tmFont.mono, fontSize: 12, color, fontWeight: 600 }}>
                    {delta >= 0 ? '+' : ''}{delta.toFixed(2)}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ ...tmFont.mono, fontSize: 10, color: tmTokens.inkSubtle, letterSpacing: '0.10em', textTransform: 'uppercase' }}>
                      then
                    </div>
                    <div style={{ ...tmFont.ui, fontSize: 22, fontWeight: 500, color: tmTokens.ink, letterSpacing: '-0.02em' }}>
                      {row.then.toFixed(2)}
                    </div>
                  </div>
                  <svg width="22" height="14" viewBox="0 0 22 14" fill="none"
                    stroke={color} strokeWidth="1.4" strokeLinecap="round">
                    <path d="M2 7h17M14 2l5 5-5 5"/>
                  </svg>
                  <div style={{ flex: 1, textAlign: 'right' }}>
                    <div style={{ ...tmFont.mono, fontSize: 10, color: tmTokens.inkSubtle, letterSpacing: '0.10em', textTransform: 'uppercase' }}>
                      now
                    </div>
                    <div style={{ ...tmFont.ui, fontSize: 22, fontWeight: 500, color, letterSpacing: '-0.02em' }}>
                      {row.now.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* AI summary */}
          <div style={{
            marginTop: 8, padding: 14,
            background: tmTokens.bgInset,
            border: `1px solid ${tmTokens.border}`,
            borderRadius: 8,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill={tmTokens.accent}>
                <path d="M5.5 1l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/>
              </svg>
              <span style={{ ...tmFont.mono, fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: tmTokens.accent }}>
                AI · 8 weeks since selection
              </span>
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.5, color: tmTokens.inkSoft, margin: 0 }}>
              Culture regressed the fastest. Identification kept climbing — the supply-chain
              register pushed it past benchmark in April. The widening gap between People
              vectors and Tech vectors is the structural signal.
            </p>
          </div>
        </div>
      </div>

      <div style={{ height: 32 }} />
    </div>
  );
};

window.DirectionE = DirectionE;

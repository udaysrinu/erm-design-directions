/* Direction A — Editorial Risk Atlas (current, refined).
   Warm cream paper, deep forest-ink primary, Saudi-gold accent.
   Fraunces display + Inter body + JetBrains Mono.
   Best for: board, audit, regulator, executive PDFs.
*/

const editorialTokens = {
  bg: "#F5F1E8",
  bgDeep: "#EEE8DB",
  surface: "#FFFDF8",
  surfaceSoft: "#EDE7D8",
  border: "rgba(15, 42, 27, 0.10)",
  borderStrong: "rgba(15, 42, 27, 0.22)",
  ink: "#0F2A1B",
  inkSoft: "rgba(15, 42, 27, 0.72)",
  inkMuted: "rgba(15, 42, 27, 0.52)",
  inkSubtle: "rgba(15, 42, 27, 0.35)",
  gold: "#9C7E3C",
  goldLine: "rgba(156, 126, 60, 0.40)",
  goldSoft: "rgba(156, 126, 60, 0.14)",
  highlight: "#C8A14B",
  mint: "#2E6B48",
  coral: "#A64226",
  sky: "#1E4D73",
};

const editorialStyles = {
  display: { fontFamily: '"Fraunces", "Times New Roman", serif', letterSpacing: '-0.025em' },
  italic:  { fontFamily: '"Fraunces", serif', fontStyle: 'italic', fontWeight: 300 },
  mono:    { fontFamily: '"JetBrains Mono", ui-monospace, monospace' },
  body:    { fontFamily: '"Inter", system-ui, sans-serif' },
  eyebrow: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: editorialTokens.inkMuted,
  },
};

const EditorialEyebrow = ({ children, tone = "muted" }) => {
  const color = tone === "gold" ? editorialTokens.gold : tone === "ink" ? editorialTokens.ink : editorialTokens.inkMuted;
  return <span style={{ ...editorialStyles.eyebrow, color }}>{children}</span>;
};

const EditorialChapterMark = ({ label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
    <span style={{ width: 32, height: 1, background: editorialTokens.goldLine }} />
    <span style={{ ...editorialStyles.italic, fontSize: 14, color: editorialTokens.inkMuted, letterSpacing: '0.01em' }}>
      {label}
    </span>
  </div>
);

const EditorialOrnamentalRule = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 0' }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <div style={{ height: 1, background: editorialTokens.goldLine }} />
      <div style={{ height: 1, background: editorialTokens.goldLine, opacity: 0.5 }} />
    </div>
    <svg width="10" height="10" viewBox="0 0 10 10" style={{ margin: '0 14px' }}>
      <path d="M5 0 L10 5 L5 10 L0 5 Z" fill={editorialTokens.gold} opacity="0.7" />
    </svg>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <div style={{ height: 1, background: editorialTokens.goldLine, opacity: 0.5 }} />
      <div style={{ height: 1, background: editorialTokens.goldLine }} />
    </div>
  </div>
);

const EditorialBrandMark = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="1" y="1" width="22" height="22" rx="5" fill={editorialTokens.ink} />
    <path
      d="M12 4 L13.5 8.2 L17.8 6.2 L16 10.5 L20.4 12 L16 13.5 L17.8 17.8 L13.5 15.8 L12 20 L10.5 15.8 L6.2 17.8 L8 13.5 L3.6 12 L8 10.5 L6.2 6.2 L10.5 8.2 Z"
      stroke={editorialTokens.highlight} strokeWidth="0.6" strokeLinejoin="round"
      fill={editorialTokens.highlight} fillOpacity="0.10"
    />
    <path
      d="M12 16.5 L12 8.8 M9.3 11.5 L12 8.8 L14.7 11.5"
      stroke={editorialTokens.highlight} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

// Editorial radar — gold dashed benchmark over ink filled current
const EditorialRadar = () => {
  const cx = 200, cy = 200, r = 138;
  const scores = ERM_DATA.pillars.map(p => p.score);
  const targets = ERM_DATA.pillars.map(p => p.target);
  return (
    <svg width="400" height="400" viewBox="0 0 400 400">
      {/* Concentric rings */}
      {[0.2, 0.4, 0.6, 0.8, 1].map(k => (
        <circle key={k} cx={cx} cy={cy} r={r * k} fill="none"
          stroke={editorialTokens.border} strokeWidth="0.8" />
      ))}
      {/* Axes */}
      {ERM_DATA.pillars.map((_, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 10;
        return (
          <line key={i} x1={cx} y1={cy}
            x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r}
            stroke={editorialTokens.border} strokeWidth="0.6" />
        );
      })}
      {/* Current */}
      <polygon points={radarPoints(scores, 5, cx, cy, r)}
        fill={editorialTokens.ink} fillOpacity="0.14"
        stroke={editorialTokens.ink} strokeWidth="1.8" />
      {/* Benchmark */}
      <polygon points={radarPoints(targets, 5, cx, cy, r)}
        fill="none" stroke={editorialTokens.gold} strokeWidth="1.4" strokeDasharray="4 4" />
      {/* Dots */}
      {ERM_DATA.pillars.map((p, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 10;
        const x = cx + Math.cos(a) * r * (p.score / 5);
        const y = cy + Math.sin(a) * r * (p.score / 5);
        return <circle key={p.id} cx={x} cy={y} r="3" fill={editorialTokens.ink} />;
      })}
      {/* Labels */}
      {ERM_DATA.pillars.map((p, i) => {
        const pos = radarLabelPos(i, 10, cx, cy, r, 22);
        const anchor = Math.abs(Math.cos(pos.a)) < 0.3 ? "middle" : pos.x > cx ? "start" : "end";
        return (
          <text key={p.id} x={pos.x} y={pos.y} fontSize="10"
            fontFamily="Inter" fill={editorialTokens.inkMuted} textAnchor={anchor}
            dominantBaseline="middle" letterSpacing="0.04em">
            {p.short}
          </text>
        );
      })}
    </svg>
  );
};

const DirectionA = () => {
  return (
    <div style={{
      width: 1440, height: 1080,
      background: editorialTokens.bg,
      color: editorialTokens.ink,
      fontFamily: editorialStyles.body.fontFamily,
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15,42,27,0.022) 1px, transparent 0)`,
      backgroundSize: '22px 22px',
    }}>
      {/* Masthead */}
      <header style={{
        borderBottom: `1px solid ${editorialTokens.border}`,
        padding: '20px 56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <EditorialBrandMark size={26} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ ...editorialStyles.display, fontSize: 17, fontWeight: 500 }}>ERM Navigator</span>
            <span style={{ ...editorialStyles.mono, fontSize: 9, color: editorialTokens.inkMuted, letterSpacing: '0.22em', marginTop: 4, textTransform: 'uppercase' }}>
              SEC Risk Maturity Platform
            </span>
          </div>
          <div style={{ height: 28, width: 1, background: editorialTokens.border, margin: '0 12px' }} />
          <EditorialEyebrow>Unit</EditorialEyebrow>
          <span style={{ ...editorialStyles.mono, fontSize: 12, color: editorialTokens.ink }}>Generation</span>
          <span style={{ color: editorialTokens.inkMuted }}>›</span>
          <EditorialEyebrow tone="ink">Command Center</EditorialEyebrow>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '4px 12px', borderRadius: 999,
            background: editorialTokens.goldSoft,
            color: editorialTokens.gold,
            ...editorialStyles.mono, fontSize: 10, letterSpacing: '0.16em',
            textTransform: 'uppercase', fontWeight: 600,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: editorialTokens.gold, boxShadow: `0 0 0 3px ${editorialTokens.goldSoft}` }} />
            Drift detected
          </span>
          <span style={{ ...editorialStyles.mono, fontSize: 10, color: editorialTokens.inkMuted, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            ⌘K
          </span>
        </div>
      </header>

      {/* Editorial masthead block */}
      <div style={{ padding: '40px 56px 28px' }}>
        <EditorialChapterMark label="Chapter IV · Maturity" />
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 56, marginTop: 18 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ ...editorialStyles.display, fontSize: 80, lineHeight: 0.96, fontWeight: 400, margin: 0 }}>
              Generation
            </h1>
            <p style={{
              ...editorialStyles.italic, fontSize: 22, fontWeight: 300,
              color: editorialTokens.inkSoft, marginTop: 12, maxWidth: 640, lineHeight: 1.3,
            }}>
              Vector drift detected across Culture and Treatment.
              <span style={{ color: editorialTokens.gold }}>&nbsp;Three pillars trail Industry by more than half a maturity step.</span>
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 48 }}>
            <div>
              <EditorialEyebrow tone="gold">Maturity score</EditorialEyebrow>
              <div style={{ ...editorialStyles.display, fontSize: 110, lineHeight: 1, fontWeight: 400, color: editorialTokens.ink, marginTop: 6 }}>
                {ERM_DATA.overallScore.toFixed(2)}
              </div>
              <div style={{ ...editorialStyles.mono, fontSize: 10, color: editorialTokens.inkMuted, letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 4 }}>
                of 5.00 · overall
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 8, minWidth: 150 }}>
              <Stat label="Benchmark · Industry" value={ERM_DATA.benchmarkAverage.toFixed(2)} unit="/5" />
              <Stat label="Aligned pillars" value={`${ERM_DATA.alignedPillars}`} unit="/10" tone="coral" />
              <Stat label="Active roadmap" value={ERM_DATA.activeRoadmap} unit="actions" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 56px' }}>
        <EditorialOrnamentalRule />
      </div>

      {/* Pillar vectors row */}
      <div style={{ padding: '20px 56px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ ...editorialStyles.italic, fontSize: 18, color: editorialTokens.inkMuted }}>
            Per-pillar <span style={{ ...editorialStyles.display, fontStyle: 'normal', color: editorialTokens.ink }}>Vectors</span>
          </span>
          <span style={{ ...editorialStyles.mono, fontSize: 10, color: editorialTokens.inkMuted, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            10 pillars · current vs Industry
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 8 }}>
          {ERM_DATA.pillars.map((p, i) => {
            const sev = severity(p.score, p.target);
            const stripeColor = sev === "ok" ? editorialTokens.mint : sev === "warn" ? editorialTokens.gold : editorialTokens.coral;
            const dot = sev === "ok" ? editorialTokens.mint : sev === "warn" ? editorialTokens.gold : editorialTokens.coral;
            return (
              <div key={p.id} style={{
                background: editorialTokens.surface,
                border: `1px solid ${editorialTokens.border}`,
                borderTop: `2px solid ${stripeColor}`,
                borderRadius: 10,
                padding: 14,
                display: 'flex', flexDirection: 'column', gap: 4, minHeight: 130,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ ...editorialStyles.mono, fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', color: editorialTokens.inkMuted }}>
                    {String(i+1).padStart(2,'0')}
                  </span>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: dot }} />
                </div>
                <span style={{ fontSize: 10, color: editorialTokens.inkMuted, lineHeight: 1.25, minHeight: 26 }}>
                  {p.name}
                </span>
                <span style={{ ...editorialStyles.display, fontSize: 26, lineHeight: 1, color: editorialTokens.ink, marginTop: 4 }}>
                  {p.score.toFixed(2)}
                </span>
                <span style={{ ...editorialStyles.mono, fontSize: 9, color: editorialTokens.inkMuted, letterSpacing: '0.1em' }}>
                  Δ {p.score >= p.target ? '+' : ''}{(p.score - p.target).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Three-column lower */}
      <div style={{ padding: '28px 56px 0', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr 0.85fr', gap: 18 }}>
        {/* Radar */}
        <div style={{
          background: editorialTokens.surface,
          border: `1px solid ${editorialTokens.border}`,
          borderRadius: 12, padding: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <EditorialEyebrow tone="gold">Pillar scope</EditorialEyebrow>
              <h3 style={{ ...editorialStyles.display, fontSize: 22, fontWeight: 400, margin: '8px 0 0', lineHeight: 1.1 }}>
                Maturity vs <span style={{ ...editorialStyles.italic, color: editorialTokens.gold, fontWeight: 300 }}>Industry</span>
              </h3>
            </div>
            <span style={{ ...editorialStyles.mono, fontSize: 9, color: editorialTokens.inkMuted, letterSpacing: '0.18em' }}>10 × 5</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: -8 }}>
            <EditorialRadar />
          </div>
          <div style={{ display: 'flex', gap: 18, paddingTop: 12, borderTop: `1px solid ${editorialTokens.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 14, height: 2, background: editorialTokens.ink }} />
              <span style={{ fontSize: 11, color: editorialTokens.inkSoft }}>Current</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 14, borderTop: `1.5px dashed ${editorialTokens.gold}` }} />
              <span style={{ fontSize: 11, color: editorialTokens.inkSoft }}>Industry benchmark</span>
            </div>
          </div>
        </div>

        {/* Dimensions */}
        <div style={{
          background: editorialTokens.surface,
          border: `1px solid ${editorialTokens.border}`,
          borderRadius: 12, padding: 24,
        }}>
          <EditorialEyebrow tone="gold">Operating dimensions</EditorialEyebrow>
          <h3 style={{ ...editorialStyles.display, fontSize: 20, fontWeight: 400, margin: '8px 0 22px', lineHeight: 1.15 }}>
            People · Process<br/>Tech · Governance
          </h3>
          {ERM_DATA.dimensions.map(d => {
            const pct = (d.score / 5) * 100;
            const above = d.score >= 3.5;
            return (
              <div key={d.id} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{d.name}</span>
                  <span style={{ ...editorialStyles.display, fontSize: 22, color: above ? editorialTokens.gold : editorialTokens.ink }}>
                    {d.score.toFixed(2)}
                  </span>
                </div>
                <div style={{ height: 3, background: editorialTokens.border, borderRadius: 999, position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: 0, top: 0, height: '100%',
                    width: `${pct}%`,
                    background: above ? editorialTokens.gold : editorialTokens.ink,
                    borderRadius: 999,
                  }} />
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: 22, padding: 16, background: editorialTokens.surfaceSoft, borderRadius: 8 }}>
            <EditorialEyebrow>Weakest dimension</EditorialEyebrow>
            <p style={{ ...editorialStyles.italic, fontSize: 14, color: editorialTokens.inkSoft, marginTop: 6, lineHeight: 1.4 }}>
              People-led practices trail process and governance, signaling a culture-and-training root cause.
            </p>
          </div>
        </div>

        {/* Roadmap / drift */}
        <div style={{
          background: editorialTokens.surface,
          border: `1px solid ${editorialTokens.border}`,
          borderRadius: 12, padding: 24,
        }}>
          <EditorialEyebrow tone="gold">Roadmap · Phase I</EditorialEyebrow>
          <h3 style={{ ...editorialStyles.display, fontSize: 20, fontWeight: 400, margin: '8px 0 16px', lineHeight: 1.15 }}>
            Highest expected <span style={{ ...editorialStyles.italic, color: editorialTokens.gold, fontWeight: 300 }}>uplift</span>
          </h3>
          {ERM_DATA.roadmap.slice(0, 4).map((r, i) => (
            <div key={i} style={{
              display: 'flex', gap: 12,
              paddingBottom: 12, paddingTop: i === 0 ? 0 : 12,
              borderBottom: i < 3 ? `1px solid ${editorialTokens.border}` : 'none',
            }}>
              <span style={{
                ...editorialStyles.italic,
                fontSize: 24, color: editorialTokens.gold,
                fontWeight: 300, lineHeight: 1, minWidth: 22,
              }}>
                {["i","ii","iii","iv"][i]}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, lineHeight: 1.4, color: editorialTokens.ink, margin: 0 }}>{r.name}</p>
                <div style={{ marginTop: 6, display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ ...editorialStyles.mono, fontSize: 10, color: editorialTokens.mint, fontWeight: 500 }}>
                    ▲ {r.uplift.toFixed(2)}
                  </span>
                  <span style={{ ...editorialStyles.mono, fontSize: 9, color: editorialTokens.inkMuted, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                    {r.effort} · {r.timeline}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 14, padding: '10px 0', borderTop: `1px solid ${editorialTokens.goldLine}`, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ ...editorialStyles.mono, fontSize: 10, color: editorialTokens.inkMuted, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              + {ERM_DATA.activeRoadmap - 4} sequenced
            </span>
            <span style={{ ...editorialStyles.italic, fontSize: 13, color: editorialTokens.gold }}>
              Open ledger →
            </span>
          </div>
        </div>
      </div>

      {/* Running footer */}
      <footer style={{ position: 'absolute', bottom: 18, left: 56, right: 56, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ ...editorialStyles.mono, fontSize: 9, color: editorialTokens.inkMuted, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          ERM Navigator · SEC Risk Maturity
        </span>
        <span style={{ ...editorialStyles.italic, fontSize: 13, color: editorialTokens.inkSoft }}>
          Folio IV · Maturity
        </span>
        <span style={{ ...editorialStyles.mono, fontSize: 9, color: editorialTokens.inkMuted, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          Folio · MMXXVI
        </span>
      </footer>
    </div>
  );
};

const Stat = ({ label, value, unit, tone }) => {
  const color = tone === "coral" ? editorialTokens.coral : tone === "gold" ? editorialTokens.gold : editorialTokens.ink;
  return (
    <div>
      <EditorialEyebrow>{label}</EditorialEyebrow>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
        <span style={{ ...editorialStyles.display, fontSize: 26, color }}>{value}</span>
        <span style={{ ...editorialStyles.mono, fontSize: 10, color: editorialTokens.inkMuted }}>{unit}</span>
      </div>
    </div>
  );
};

window.DirectionA = DirectionA;

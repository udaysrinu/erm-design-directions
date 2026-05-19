/* Direction B — Operations Console (terminal-dense, dark).
   Near-black warm-tinted background, monospace forward, info-rich,
   heat grids, real-time tickers. Best for: daily risk officer.
*/

const consoleTokens = {
  bg: "#0E1014",
  bgPanel: "#15181E",
  bgRaised: "#1B1F26",
  border: "rgba(220, 215, 200, 0.08)",
  borderStrong: "rgba(220, 215, 200, 0.18)",
  ink: "#E8E3D5",
  inkSoft: "rgba(232, 227, 213, 0.72)",
  inkMuted: "rgba(232, 227, 213, 0.48)",
  inkSubtle: "rgba(232, 227, 213, 0.28)",
  amber: "#E0B040",
  amberSoft: "rgba(224, 176, 64, 0.14)",
  mint: "#5DBF92",
  mintSoft: "rgba(93, 191, 146, 0.14)",
  coral: "#E07260",
  coralSoft: "rgba(224, 114, 96, 0.14)",
  sky: "#6BA8E0",
};

const consoleStyles = {
  mono: { fontFamily: '"JetBrains Mono", ui-monospace, monospace' },
  body: { fontFamily: '"Inter", system-ui, sans-serif' },
};

const ConsoleLabel = ({ children, tone }) => {
  const color = tone === "amber" ? consoleTokens.amber : tone === "mint" ? consoleTokens.mint : consoleTokens.inkMuted;
  return (
    <span style={{
      ...consoleStyles.mono, fontSize: 10, fontWeight: 500,
      letterSpacing: '0.18em', textTransform: 'uppercase', color,
    }}>{children}</span>
  );
};

const ConsoleRadar = () => {
  const cx = 175, cy = 175, r = 120;
  const scores = ERM_DATA.pillars.map(p => p.score);
  const targets = ERM_DATA.pillars.map(p => p.target);
  return (
    <svg width="350" height="350" viewBox="0 0 350 350">
      {/* Grid */}
      {[0.2, 0.4, 0.6, 0.8, 1].map(k => (
        <circle key={k} cx={cx} cy={cy} r={r * k} fill="none"
          stroke={consoleTokens.border} strokeWidth="0.6" />
      ))}
      {ERM_DATA.pillars.map((_, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 10;
        return <line key={i} x1={cx} y1={cy}
          x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r}
          stroke={consoleTokens.border} strokeWidth="0.5" />;
      })}
      {/* Current */}
      <polygon points={radarPoints(scores, 5, cx, cy, r)}
        fill={consoleTokens.amber} fillOpacity="0.10"
        stroke={consoleTokens.amber} strokeWidth="1.6" />
      {/* Benchmark */}
      <polygon points={radarPoints(targets, 5, cx, cy, r)}
        fill="none" stroke={consoleTokens.sky}
        strokeWidth="1.2" strokeDasharray="3 3" />
      {/* Vertex markers */}
      {ERM_DATA.pillars.map((p, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 10;
        const x = cx + Math.cos(a) * r * (p.score / 5);
        const y = cy + Math.sin(a) * r * (p.score / 5);
        const sev = severity(p.score, p.target);
        const dot = sev === "ok" ? consoleTokens.mint : sev === "warn" ? consoleTokens.amber : consoleTokens.coral;
        return <circle key={p.id} cx={x} cy={y} r="3.5" fill={dot} stroke={consoleTokens.bg} strokeWidth="1.5" />;
      })}
      {/* Labels */}
      {ERM_DATA.pillars.map((p, i) => {
        const pos = radarLabelPos(i, 10, cx, cy, r, 16);
        const anchor = Math.abs(Math.cos(pos.a)) < 0.3 ? "middle" : pos.x > cx ? "start" : "end";
        return (
          <text key={p.id} x={pos.x} y={pos.y} fontSize="9"
            fontFamily="JetBrains Mono" fill={consoleTokens.inkMuted}
            textAnchor={anchor} dominantBaseline="middle" letterSpacing="0.06em">
            {p.short}
          </text>
        );
      })}
    </svg>
  );
};

// Heat cell color from score
function heatColor(score) {
  if (score >= 3.8) return consoleTokens.mint;
  if (score >= 3.2) return consoleTokens.amber;
  return consoleTokens.coral;
}
function heatBg(score) {
  if (score >= 3.8) return "rgba(93, 191, 146, 0.18)";
  if (score >= 3.2) return "rgba(224, 176, 64, 0.16)";
  return "rgba(224, 114, 96, 0.18)";
}

const DirectionB = () => {
  const ts = "2026-05-19  14:32:08";
  return (
    <div style={{
      width: 1440, height: 1080,
      background: consoleTokens.bg,
      color: consoleTokens.ink,
      ...consoleStyles.body,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Status bar top */}
      <div style={{
        height: 32, background: '#080A0D',
        borderBottom: `1px solid ${consoleTokens.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', ...consoleStyles.mono, fontSize: 11, color: consoleTokens.inkMuted,
      }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <span style={{ color: consoleTokens.amber, letterSpacing: '0.15em' }}>● ERM-NAV / ops</span>
          <span>v0.1.0</span>
          <span style={{ color: consoleTokens.inkSubtle }}>·</span>
          <span>{ts}</span>
          <span style={{ color: consoleTokens.inkSubtle }}>·</span>
          <span>sess #a7f3-2c4d-9e</span>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <span><span style={{ color: consoleTokens.mint }}>●</span> api</span>
          <span><span style={{ color: consoleTokens.mint }}>●</span> db</span>
          <span><span style={{ color: consoleTokens.amber }}>●</span> drift</span>
          <span style={{ color: consoleTokens.inkSoft }}>analyst@gmail.com</span>
        </div>
      </div>

      {/* Header */}
      <header style={{
        padding: '18px 24px',
        borderBottom: `1px solid ${consoleTokens.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{
            ...consoleStyles.mono, fontSize: 14, fontWeight: 600,
            color: consoleTokens.amber, letterSpacing: '0.04em',
          }}>
            ERM/NAV
          </span>
          <span style={{ color: consoleTokens.inkSubtle, ...consoleStyles.mono }}>::</span>
          <ConsoleLabel>unit</ConsoleLabel>
          <span style={{ ...consoleStyles.mono, fontSize: 13 }}>generation</span>
          <span style={{ color: consoleTokens.inkSubtle, ...consoleStyles.mono }}>/</span>
          <ConsoleLabel>bench</ConsoleLabel>
          <span style={{ ...consoleStyles.mono, fontSize: 13 }}>industry</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {["overview","pillars","drift","roadmap","ledger"].map((t, i) => (
            <button key={t} style={{
              ...consoleStyles.mono, fontSize: 11, letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '6px 12px',
              background: i === 0 ? consoleTokens.amberSoft : 'transparent',
              color: i === 0 ? consoleTokens.amber : consoleTokens.inkSoft,
              border: `1px solid ${i === 0 ? consoleTokens.amber : consoleTokens.border}`,
              borderRadius: 4, cursor: 'pointer',
            }}>{t}</button>
          ))}
        </div>
      </header>

      {/* KPI strip */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)',
        borderBottom: `1px solid ${consoleTokens.border}`,
      }}>
        {[
          { label: "MATURITY", value: ERM_DATA.overallScore.toFixed(2), unit: "/5.00", tone: "amber", delta: "-0.21 vs bench" },
          { label: "BENCH·IND", value: ERM_DATA.benchmarkAverage.toFixed(2), unit: "/5.00", tone: "ink", delta: "+0.18 industry" },
          { label: "ALIGNED", value: `${ERM_DATA.alignedPillars}`, unit: "/10", tone: "coral", delta: "−4 wow" },
          { label: "DRIFT", value: ERM_DATA.criticalRegressions, unit: "critical", tone: "coral", delta: "07d window" },
          { label: "RDMAP", value: ERM_DATA.activeRoadmap, unit: "active", tone: "ink", delta: "P1: 3 · P2: 5" },
          { label: "INTEG", value: "98", unit: "%", tone: "mint", delta: "evidence linked" },
        ].map((k, i) => {
          const color = k.tone === "amber" ? consoleTokens.amber :
                         k.tone === "coral" ? consoleTokens.coral :
                         k.tone === "mint" ? consoleTokens.mint : consoleTokens.ink;
          return (
            <div key={k.label} style={{
              padding: '14px 18px',
              borderRight: i < 5 ? `1px solid ${consoleTokens.border}` : 'none',
            }}>
              <ConsoleLabel>{k.label}</ConsoleLabel>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
                <span style={{ ...consoleStyles.mono, fontSize: 28, color, fontWeight: 500 }}>{k.value}</span>
                <span style={{ ...consoleStyles.mono, fontSize: 10, color: consoleTokens.inkMuted }}>{k.unit}</span>
              </div>
              <div style={{ ...consoleStyles.mono, fontSize: 10, color: consoleTokens.inkMuted, marginTop: 4 }}>
                {k.delta}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1.1fr 0.95fr', gap: 0, height: 'calc(100% - 32px - 76px - 86px)' }}>
        {/* LEFT: Heat grid 10×4 */}
        <div style={{ padding: 20, borderRight: `1px solid ${consoleTokens.border}`, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <ConsoleLabel tone="amber">▶ heat · pillar × dimension</ConsoleLabel>
            <span style={{ ...consoleStyles.mono, fontSize: 10, color: consoleTokens.inkMuted }}>40 cells</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(4, 1fr)', gap: 2 }}>
            <div />
            {ERM_DATA.dimensions.map(d => (
              <div key={d.id} style={{
                ...consoleStyles.mono, fontSize: 9, color: consoleTokens.inkMuted,
                letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center', padding: '4px 0',
              }}>{d.id.slice(0, 4)}</div>
            ))}
            {ERM_HEAT.map(row => (
              <React.Fragment key={row.pillar.id}>
                <div style={{
                  ...consoleStyles.mono, fontSize: 11, color: consoleTokens.inkSoft,
                  display: 'flex', alignItems: 'center', padding: '0 8px 0 0',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{row.pillar.short}</div>
                {row.cells.map((c, i) => (
                  <div key={i} style={{
                    background: heatBg(c.score),
                    border: `1px solid ${heatColor(c.score)}40`,
                    padding: '10px 0', textAlign: 'center',
                    ...consoleStyles.mono, fontSize: 12, color: heatColor(c.score), fontWeight: 600,
                  }}>{c.score.toFixed(2)}</div>
                ))}
              </React.Fragment>
            ))}
          </div>

          <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px solid ${consoleTokens.border}`, display: 'flex', gap: 14 }}>
            {[
              { c: consoleTokens.mint, l: "≥ 3.80 ok" },
              { c: consoleTokens.amber, l: "3.20–3.79 warn" },
              { c: consoleTokens.coral, l: "< 3.20 crit" },
            ].map(x => (
              <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, background: x.c, opacity: 0.6 }} />
                <span style={{ ...consoleStyles.mono, fontSize: 10, color: consoleTokens.inkMuted }}>{x.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE: Radar + dimensions bars */}
        <div style={{ padding: 20, borderRight: `1px solid ${consoleTokens.border}`, display: 'flex', flexDirection: 'column' }}>
          <ConsoleLabel tone="amber">▶ radar · current vs industry</ConsoleLabel>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -10 }}>
            <ConsoleRadar />
          </div>
          <div style={{ display: 'flex', gap: 18, paddingTop: 10, borderTop: `1px solid ${consoleTokens.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, height: 2, background: consoleTokens.amber }} />
              <span style={{ ...consoleStyles.mono, fontSize: 10, color: consoleTokens.inkSoft }}>current</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, borderTop: `1.5px dashed ${consoleTokens.sky}` }} />
              <span style={{ ...consoleStyles.mono, fontSize: 10, color: consoleTokens.inkSoft }}>industry</span>
            </div>
          </div>
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${consoleTokens.border}` }}>
            <ConsoleLabel>dimension scores</ConsoleLabel>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ERM_DATA.dimensions.map(d => (
                <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ ...consoleStyles.mono, fontSize: 11, color: consoleTokens.inkSoft, minWidth: 72 }}>
                    {d.id.toLowerCase()}
                  </span>
                  <div style={{ flex: 1, height: 6, background: consoleTokens.bgRaised, position: 'relative' }}>
                    <div style={{
                      height: '100%', width: `${(d.score / 5) * 100}%`,
                      background: d.score >= 3.5 ? consoleTokens.mint : consoleTokens.amber,
                    }} />
                  </div>
                  <span style={{ ...consoleStyles.mono, fontSize: 12, color: consoleTokens.ink, minWidth: 38, textAlign: 'right' }}>
                    {d.score.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Drift log + activity */}
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <ConsoleLabel tone="amber">▶ drift log · 21d window</ConsoleLabel>
              <span style={{ ...consoleStyles.mono, fontSize: 10, color: consoleTokens.coral }}>3 critical</span>
            </div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column' }}>
              {ERM_DATA.regressions.map((r, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '40px 1fr auto',
                  gap: 10, alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: i < ERM_DATA.regressions.length - 1 ? `1px solid ${consoleTokens.border}` : 'none',
                }}>
                  <span style={{ ...consoleStyles.mono, fontSize: 10, color: consoleTokens.inkMuted, letterSpacing: '0.1em' }}>
                    -{r.when}
                  </span>
                  <div>
                    <div style={{ ...consoleStyles.mono, fontSize: 12, color: consoleTokens.ink }}>{r.pillar}</div>
                    <div style={{ ...consoleStyles.mono, fontSize: 10, color: consoleTokens.inkMuted, marginTop: 2 }}>
                      {r.prev.toFixed(2)} → {r.curr.toFixed(2)}
                    </div>
                  </div>
                  <span style={{
                    ...consoleStyles.mono, fontSize: 12, fontWeight: 600,
                    color: consoleTokens.coral,
                    padding: '2px 6px', background: consoleTokens.coralSoft,
                  }}>
                    {r.delta.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, minHeight: 0 }}>
            <ConsoleLabel tone="amber">▶ roadmap · phase 1 queue</ConsoleLabel>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column' }}>
              {ERM_DATA.roadmap.slice(0, 3).map((r, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, padding: '10px 0',
                  borderBottom: i < 2 ? `1px solid ${consoleTokens.border}` : 'none',
                }}>
                  <span style={{
                    ...consoleStyles.mono, fontSize: 10, fontWeight: 600,
                    color: consoleTokens.amber, minWidth: 28,
                    padding: '2px 6px', border: `1px solid ${consoleTokens.amber}`,
                    height: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>P1</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: consoleTokens.ink, ...consoleStyles.body, lineHeight: 1.35 }}>
                      {r.name}
                    </div>
                    <div style={{ ...consoleStyles.mono, fontSize: 10, color: consoleTokens.inkMuted, marginTop: 3 }}>
                      <span style={{ color: consoleTokens.mint }}>+{r.uplift.toFixed(2)}</span>
                      <span style={{ margin: '0 6px', color: consoleTokens.inkSubtle }}>·</span>
                      {r.effort.toLowerCase()} · {r.timeline.toLowerCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CLI footer */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 54,
        background: '#080A0D',
        borderTop: `1px solid ${consoleTokens.border}`,
        padding: '0 20px',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <span style={{ ...consoleStyles.mono, fontSize: 12, color: consoleTokens.amber }}>$</span>
        <input
          placeholder="ask navigator   /weakest    /drift culture    /roadmap p1   /export"
          style={{
            flex: 1, background: 'transparent', border: 'none',
            ...consoleStyles.mono, fontSize: 12, color: consoleTokens.ink,
            outline: 'none',
          }}
          defaultValue=""
          readOnly
        />
        <span style={{
          ...consoleStyles.mono, fontSize: 10, color: consoleTokens.inkMuted,
          padding: '4px 8px', border: `1px solid ${consoleTokens.border}`,
        }}>⌘K</span>
        <span style={{
          ...consoleStyles.mono, fontSize: 10, color: consoleTokens.inkMuted,
          padding: '4px 8px', border: `1px solid ${consoleTokens.border}`,
        }}>⏎</span>
      </div>
    </div>
  );
};

window.DirectionB = DirectionB;

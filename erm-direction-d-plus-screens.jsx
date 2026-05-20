/* Direction D+ — the rest of the product surface.
 * Login, BU Scope, History, Assessment, Evidence drawer, PDF Report.
 * All using the same tokens & sidebar pattern as DirectionDPlus.
 */

// -------- LOGIN -------------------------------------------------
const DPLoginScreen = () => (
  <div style={{
    width: 1680, minHeight: 1040,
    background: nuTokens.bg, color: nuTokens.ink,
    ...nuFont.ui, position: 'relative',
    display: 'grid', gridTemplateColumns: '1fr 1fr',
  }}>
    {/* Left — form */}
    <div style={{ padding: '60px 80px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <span style={{
          width: 24, height: 24, borderRadius: 6, background: nuTokens.ink,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ width: 9, height: 9, background: nuTokens.accent, borderRadius: 2 }} />
        </span>
        <span style={{ fontFamily: '"Fraunces", serif', fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em' }}>
          ERM Navigator
        </span>
      </div>

      <div style={{ marginTop: 'auto', maxWidth: 440 }}>
        <NuLabel tone="accent" size={11}>● Sign in</NuLabel>
        <h1 style={{
          ...nuFont.ui, fontSize: 44, fontWeight: 500, letterSpacing: '-0.028em',
          lineHeight: 1.05, margin: '14px 0 0',
        }}>
          A deterministic instrument<br/>for enterprise risk.
        </h1>
        <p style={{ fontSize: 14.5, color: nuTokens.inkSoft, marginTop: 14, lineHeight: 1.55 }}>
          100 standards-aligned vectors. 10 pillars × 4 operating dimensions.
          Same responses, same number — every time, across every assessor.
        </p>

        <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <NuLabel size={10}>Operator email</NuLabel>
            <input value="analyst@gmail.com" readOnly style={{
              width: '100%', marginTop: 8, padding: '10px 12px',
              background: nuTokens.panel, border: `1px solid ${nuTokens.border}`,
              borderRadius: 7, fontSize: 14, color: nuTokens.ink, fontFamily: 'inherit',
              outline: 'none',
            }}/>
          </div>
          <div>
            <NuLabel size={10}>Passphrase</NuLabel>
            <input type="password" value="••••••••" readOnly style={{
              width: '100%', marginTop: 8, padding: '10px 12px',
              background: nuTokens.panel, border: `1px solid ${nuTokens.border}`,
              borderRadius: 7, fontSize: 14, color: nuTokens.ink, fontFamily: 'inherit',
              outline: 'none',
            }}/>
          </div>
          <button style={{
            marginTop: 8,
            padding: '12px 22px', borderRadius: 8,
            background: nuTokens.accent, color: '#FFFFFF',
            border: `1px solid rgba(0,0,0,0.10)`,
            cursor: 'pointer',
            boxShadow: "inset 0 2px 4px rgba(255,255,255,0.56), 0 4px 8px rgba(38,27,7,0.06), 0 1px 2px rgba(38,27,7,0.36)",
            ...nuFont.ui, fontSize: 14, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            Enter the Navigator
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M2 6h7M6 3l3 3-3 3"/>
            </svg>
          </button>
        </div>

        <div style={{
          marginTop: 28, padding: '10px 14px', borderRadius: 999,
          background: nuTokens.bgSubtle, border: `1px solid ${nuTokens.border}`,
          display: 'inline-flex', alignItems: 'center', gap: 14, ...nuFont.mono, fontSize: 11, color: nuTokens.inkSoft,
        }}>
          <span><span style={{ color: nuTokens.ok }}>●</span> deterministic</span>
          <span style={{ width: 1, height: 12, background: nuTokens.borderStr }} />
          <span>35 tests · pinned in CI</span>
          <span style={{ width: 1, height: 12, background: nuTokens.borderStr }} />
          <span>SOC 2 Type II</span>
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 32, ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted }}>
        ISO 31000 · COSO ERM · NIST RMF · RIMS RMM
      </div>
    </div>

    {/* Right — atmospheric proof panel */}
    <div style={{
      background: nuTokens.panelAlt,
      padding: '60px 64px',
      borderLeft: `1px solid ${nuTokens.border}`,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <NuLabel tone="accent">The patent moat, in plain language</NuLabel>
      <p style={{
        ...nuFont.ui, fontSize: 26, fontWeight: 500, letterSpacing: '-0.022em',
        lineHeight: 1.3, margin: '18px 0 0', maxWidth: 560,
      }}>
        Two consultants used to score the same evidence differently.
        Two months apart, the same operator produced different reports.
        That ends here.
      </p>
      <p style={{
        ...nuFont.ui, fontSize: 26, fontWeight: 500, letterSpacing: '-0.022em',
        lineHeight: 1.3, margin: '8px 0 0', maxWidth: 560, color: nuTokens.accent,
      }}>
        Same inputs. Same number. Always.
      </p>

      <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, maxWidth: 560 }}>
        {[
          { n: '100', l: 'standards-aligned\nvectors' },
          { n: '10×4', l: 'pillars × operating\ndimensions' },
          { n: '35', l: 'unit tests\npinned in CI' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: 18, background: nuTokens.panel, borderRadius: 10,
            border: `1px solid ${nuTokens.border}`,
          }}>
            <div style={{ ...nuFont.ui, fontSize: 32, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1, color: nuTokens.accent }}>
              {s.n}
            </div>
            <div style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.inkMuted, marginTop: 8, letterSpacing: '0.08em', whiteSpace: 'pre-line', lineHeight: 1.4 }}>
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// -------- BU SCOPE ----------------------------------------------
const DPScopeScreen = () => {
  const tiles = [
    { id: 'gen',  name: 'Generation',     industry: 'Power generation',         score: 3.34, when: '7d ago',  delta: -0.21, status: 'crit' },
    { id: 'tra',  name: 'Transmission',   industry: 'Grid operations',          score: 3.81, when: '14d ago', delta:  0.08, status: 'ok' },
    { id: 'dis',  name: 'Distribution',   industry: 'Distribution networks',    score: 3.65, when: '21d ago', delta:  0.04, status: 'ok' },
    { id: 'corp', name: 'Corporate',      industry: 'Corporate services',       score: 3.42, when: '5d ago',  delta: -0.06, status: 'warn' },
    { id: 'sub',  name: 'Subsidiaries',   industry: 'Subsidiary operations',    score: 3.18, when: '34d ago', delta: -0.14, status: 'warn' },
    { id: 'jv',   name: 'Joint Ventures', industry: 'JV portfolio',             score: 0,    when: 'no data', delta:  0,    status: 'empty' },
  ];
  return (
    <div style={{
      width: 1680, minHeight: 1080,
      background: nuTokens.bg, color: nuTokens.ink,
      ...nuFont.ui, display: 'grid', gridTemplateColumns: '240px 1fr',
    }}>
      {/* Reuse sidebar shell — abbreviated */}
      <aside style={{ background: nuTokens.panel, borderRight: `1px solid ${nuTokens.border}`, padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 22 }}>
          <span style={{ width: 22, height: 22, borderRadius: 5, background: nuTokens.ink, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ width: 8, height: 8, background: nuTokens.accent, borderRadius: 2 }} />
          </span>
          <span style={{ fontFamily: '"Fraunces", serif', fontSize: 15, fontWeight: 500 }}>ERM Navigator</span>
        </div>
        <NuLabel size={10}>Workspace</NuLabel>
        <div style={{ marginTop: 8, ...nuFont.ui, fontSize: 13, color: nuTokens.inkMuted }}>
          Select an operating unit to begin.
        </div>
      </aside>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <header style={{
          height: 56, borderBottom: `1px solid ${nuTokens.border}`,
          padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Scope · choose unit
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkSoft }}>analyst@gmail.com</span>
            <NuAvatar initials="AS" size={28} />
          </div>
        </header>

        <div style={{ padding: '40px 32px 32px' }}>
          <NuLabel tone="accent" size={11}>● Operating units · the organization</NuLabel>
          <h1 style={{ ...nuFont.ui, fontSize: 36, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '12px 0 6px' }}>
            Choose the unit to measure.
          </h1>
          <p style={{ fontSize: 14, color: nuTokens.inkSoft, maxWidth: 640, marginBottom: 28 }}>
            Every unit runs a 100-vector assessment and rolls up into a weighted pillar-dimension
            matrix, benchmarked against four reference profiles. Pick a tile to open.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {tiles.map(t => {
              const bu = dpBu[t.id];
              const stateColor = t.status === 'ok' ? nuTokens.ok : t.status === 'warn' ? nuTokens.warn :
                                 t.status === 'crit' ? nuTokens.crit : nuTokens.inkMuted;
              return (
                <div key={t.id} style={{
                  background: nuTokens.panel,
                  border: `1px solid ${nuTokens.border}`,
                  borderRadius: 12, padding: 0, overflow: 'hidden',
                  cursor: 'pointer',
                }}>
                  {/* pastel tinted header band */}
                  <div style={{
                    background: bu.tint, padding: '18px 20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{
                        width: 38, height: 38, borderRadius: 8,
                        background: 'rgba(255,255,255,0.6)', color: bu.dot,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <DpBuGlyph id={t.id} size={20} color={bu.dot} />
                      </span>
                      <div>
                        <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.015em' }}>{t.name}</div>
                        <div style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted, marginTop: 1, letterSpacing: '0.06em' }}>
                          {t.industry}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* metrics */}
                  <div style={{ padding: '14px 20px' }}>
                    {t.status === 'empty' ? (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                        <span style={{ fontSize: 12.5, color: nuTokens.inkMuted }}>No assessment yet</span>
                        <NuChip tone="ink">Start →</NuChip>
                      </div>
                    ) : (
                      <>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                          <span style={{ ...nuFont.ui, fontSize: 28, fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1 }}>
                            {t.score.toFixed(2)}
                          </span>
                          <span style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted }}>/5.00</span>
                          <span style={{ ...nuFont.mono, fontSize: 11, color: stateColor, fontWeight: 600, marginLeft: 'auto' }}>
                            {t.delta >= 0 ? '+' : ''}{t.delta.toFixed(2)}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted }}>
                          <span>last · {t.when}</span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: stateColor }}>
                            <span style={{ width: 5, height: 5, borderRadius: 999, background: stateColor }} />
                            {t.status === 'ok' ? 'Aligned' : t.status === 'warn' ? 'Drifting' : 'Critical'}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Archive */}
          <div style={{ marginTop: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <NuLabel size={11}>Archive · past sessions</NuLabel>
              <span style={{ flex: 1, height: 1, background: nuTokens.border }} />
              <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>18 sessions · newest first</span>
            </div>
            <div style={{ background: nuTokens.panel, border: `1px solid ${nuTokens.border}`, borderRadius: 10, overflow: 'hidden' }}>
              {[
                { score: 3.34, bu: 'Generation',   when: 'May 13 · 09:14', tx: 'TXA7F3' },
                { score: 3.81, bu: 'Transmission', when: 'May 06 · 11:32', tx: 'TXB2C1' },
                { score: 3.65, bu: 'Distribution', when: 'Apr 29 · 14:08', tx: 'TXD4E9' },
                { score: 3.42, bu: 'Corporate',    when: 'May 15 · 16:22', tx: 'TXF8A2' },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '80px 1fr 200px 100px 80px',
                  gap: 16, padding: '12px 18px', alignItems: 'center',
                  borderBottom: i < 3 ? `1px solid ${nuTokens.border}` : 'none',
                  fontSize: 13,
                }}>
                  <span style={{ ...nuFont.ui, fontSize: 18, fontWeight: 500, letterSpacing: '-0.015em' }}>
                    {row.score.toFixed(2)}
                  </span>
                  <span style={{ fontWeight: 500 }}>{row.bu}</span>
                  <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>{row.when}</span>
                  <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>{row.tx}</span>
                  <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.accent, textAlign: 'right' }}>Open →</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------- ASSESSMENT (single question, traditional grid in D+ aesthetic) -----
const DPAssessmentScreen = () => (
  <div style={{
    width: 1680, minHeight: 1080,
    background: nuTokens.bg, color: nuTokens.ink,
    ...nuFont.ui, display: 'grid', gridTemplateColumns: '280px 1fr',
  }}>
    {/* Sidebar — pillar progress */}
    <aside style={{ background: nuTokens.panel, borderRight: `1px solid ${nuTokens.border}`, padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 18 }}>
        <span style={{ width: 22, height: 22, borderRadius: 5, background: nuTokens.ink, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ width: 8, height: 8, background: nuTokens.accent, borderRadius: 2 }} />
        </span>
        <span style={{ fontFamily: '"Fraunces", serif', fontSize: 14, fontWeight: 500 }}>ERM Navigator</span>
      </div>

      <NuLabel size={10}>Assessing</NuLabel>
      <div style={{ ...nuFont.ui, fontSize: 18, fontWeight: 500, marginTop: 4, marginBottom: 14 }}>Generation</div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <NuLabel size={10}>Progress</NuLabel>
        <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.ink, fontWeight: 600 }}>53%</span>
      </div>
      <div style={{ height: 4, background: nuTokens.bgSubtle, borderRadius: 999, marginBottom: 4 }}>
        <div style={{ height: '100%', width: '53%', background: nuTokens.accent, borderRadius: 999 }} />
      </div>
      <div style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.inkMuted, display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
        <span>53/100 vectors</span>
        <span>Q53/100</span>
      </div>

      <NuLabel size={10}>Pillars</NuLabel>
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {ERM_DATA.pillars.map((p, i) => {
          const answered = i < 5 ? 10 : i === 5 ? 3 : 0;
          const isCurr = i === 5;
          const pct = (answered / 10) * 100;
          return (
            <div key={p.id} style={{
              padding: '8px 10px', borderRadius: 5,
              background: isCurr ? nuTokens.ink : 'transparent',
              color: isCurr ? nuTokens.bg : nuTokens.ink,
              fontSize: 12,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: isCurr ? 500 : 400 }}>
                  <span style={{ ...nuFont.mono, fontSize: 9, opacity: 0.7, marginRight: 6 }}>{String(i+1).padStart(2,'0')}</span>
                  {p.name}
                </span>
                <span style={{ ...nuFont.mono, fontSize: 10, opacity: 0.7, flexShrink: 0 }}>{answered}/10</span>
              </div>
              <div style={{ marginTop: 5, height: 2, background: isCurr ? 'rgba(255,255,255,0.2)' : nuTokens.bgSubtle, borderRadius: 999 }}>
                <div style={{ height: '100%', width: `${pct}%`, background: answered === 10 ? nuTokens.ok : isCurr ? nuTokens.accent : nuTokens.inkMuted, borderRadius: 999 }} />
              </div>
            </div>
          );
        })}
      </div>
    </aside>

    {/* Main */}
    <main style={{ overflow: 'auto' }}>
      <div style={{ maxWidth: 880, padding: '40px 56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <NuChip tone="accent">Risk Treatment</NuChip>
          <NuChip tone="ink">Technology</NuChip>
          <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted, letterSpacing: '0.08em' }}>
            Vector 53 of 100
          </span>
        </div>

        <h2 style={{ ...nuFont.ui, fontSize: 30, fontWeight: 500, letterSpacing: '-0.022em', lineHeight: 1.2, margin: 0 }}>
          Are controls designed and tested for effectiveness?
        </h2>
        <p style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted, marginTop: 6 }}>
          q.053 · pillar.treat · dimension Technology · weight 0.014
        </p>

        <div style={{ marginTop: 32 }}>
          <NuLabel>Maturity level · 1 Ad-hoc → 5 Optimized</NuLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginTop: 12 }}>
            {[1,2,3,4,5].map(s => {
              const labels = ["Ad-hoc","Partial","Defined","Managed","Optimized"];
              const selected = s === 2;
              return (
                <button key={s} style={{
                  aspectRatio: '4/3',
                  background: selected ? nuTokens.ink : nuTokens.panel,
                  color: selected ? nuTokens.bg : nuTokens.ink,
                  border: `1px solid ${selected ? nuTokens.ink : nuTokens.border}`,
                  borderRadius: 10, cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                  boxShadow: selected ? `0 4px 12px rgba(38,27,7,0.18)` : 'none',
                }}>
                  <span style={{ ...nuFont.ui, fontSize: 32, fontWeight: 500, letterSpacing: '-0.025em' }}>{s}</span>
                  <span style={{ ...nuFont.mono, fontSize: 9.5, opacity: 0.7, letterSpacing: '0.10em', textTransform: 'uppercase' }}>
                    {labels[s-1]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Rubric for selected level (claim 11) */}
          <div style={{
            marginTop: 16, padding: 16,
            background: nuTokens.panelAlt, borderRadius: 8,
            borderLeft: `3px solid ${nuTokens.accent}`,
          }}>
            <NuLabel tone="accent">Rubric · level 2 · Partial</NuLabel>
            <p style={{ fontSize: 13.5, color: nuTokens.inkSoft, marginTop: 8, lineHeight: 1.55, margin: '8px 0 0' }}>
              Some controls exist for known high-impact risks, but design is informal and testing
              is ad-hoc. Effectiveness isn't measured against documented thresholds. Coverage gaps
              are known but not tracked.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <div>
            <NuLabel>Analyst note</NuLabel>
            <textarea
              defaultValue="Control library exists but last full test cycle was Q3 2025. Owner ambiguous between GRC and IT-Sec teams."
              style={{
                width: '100%', marginTop: 8, minHeight: 100,
                padding: 12, fontSize: 13.5, fontFamily: 'inherit',
                background: nuTokens.panel, border: `1px solid ${nuTokens.border}`,
                borderRadius: 8, outline: 'none', resize: 'none', color: nuTokens.ink,
              }}
            />
          </div>
          <div>
            <NuLabel>Evidence</NuLabel>
            <div style={{
              marginTop: 8, padding: 14, height: 100,
              background: nuTokens.panel, border: `1px dashed ${nuTokens.borderStr}`,
              borderRadius: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 32, height: 32, borderRadius: 6,
                  background: nuTokens.bgSubtle, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  ...nuFont.mono, fontSize: 10, color: nuTokens.inkMuted,
                }}>PDF</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>control-test-q3-2025.pdf</div>
                  <div style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted, marginTop: 2 }}>linked · 1.2 MB · attach more →</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button style={{
            padding: '9px 14px', borderRadius: 7,
            background: nuTokens.panel, color: nuTokens.ink,
            border: `1px solid ${nuTokens.border}`, cursor: 'pointer', fontSize: 13,
          }}>← Previous</button>
          <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>
            ⌘ + 1–5 to score · ↵ to advance
          </span>
          <button style={{
            padding: '9px 18px', borderRadius: 7,
            background: nuTokens.accent, color: '#FFF',
            border: `1px solid rgba(0,0,0,0.10)`, cursor: 'pointer',
            boxShadow: "inset 0 2px 4px rgba(255,255,255,0.56), 0 4px 8px rgba(38,27,7,0.06), 0 1px 2px rgba(38,27,7,0.36)",
            fontSize: 13, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            Next vector
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M2 5.5h7M6 2.5l3 3-3 3"/>
            </svg>
          </button>
        </div>
      </div>
    </main>
  </div>
);

// -------- EVIDENCE DRAWER ---------------------------------------
const DPEvidenceScreen = () => {
  const files = [
    { name: 'control-test-q3-2025.pdf',      size: '1.2 MB', when: 'May 13', bu: 'gen', pillar: 'Risk Treatment',     linked: 3 },
    { name: 'iso31000-audit-2025.pdf',       size: '3.4 MB', when: 'Apr 28', bu: 'gen', pillar: 'Leadership & Gov.',   linked: 7 },
    { name: 'kri-thresholds-current.xlsx',   size: '180 KB', when: 'May 02', bu: 'gen', pillar: 'Monitoring & Review', linked: 5 },
    { name: 'march-incident-postmortem.pdf', size: '2.1 MB', when: 'Mar 16', bu: 'gen', pillar: 'Risk Culture',        linked: 4 },
    { name: 'vendor-risk-register-v2.xlsx',  size: '420 KB', when: 'Feb 10', bu: 'tra', pillar: 'Risk Identification', linked: 8 },
    { name: 'board-risk-appetite-2026.pdf',  size: '880 KB', when: 'Jan 20', bu: 'corp', pillar: 'Strategy & Integr.', linked: 6 },
    { name: 'culture-survey-q1.pdf',         size: '650 KB', when: 'Apr 04', bu: 'gen', pillar: 'Risk Culture',        linked: 9 },
    { name: 'roadmap-rollup-2026.pdf',       size: '1.8 MB', when: 'May 18', bu: 'corp', pillar: 'Cross-cutting',      linked: 12 },
  ];
  return (
    <div style={{
      width: 1680, minHeight: 1080,
      background: nuTokens.bg, color: nuTokens.ink,
      ...nuFont.ui, display: 'grid', gridTemplateColumns: '240px 1fr',
    }}>
      <aside style={{ background: nuTokens.panel, borderRight: `1px solid ${nuTokens.border}`, padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 22 }}>
          <span style={{ width: 22, height: 22, borderRadius: 5, background: nuTokens.ink, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ width: 8, height: 8, background: nuTokens.accent, borderRadius: 2 }} />
          </span>
          <span style={{ fontFamily: '"Fraunces", serif', fontSize: 15, fontWeight: 500 }}>ERM Navigator</span>
        </div>
        <NuLabel size={10}>Workspace</NuLabel>
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {['Today', 'Maturity', 'Drift signals', 'Roadmap', 'Evidence', 'History', 'Reports'].map(l => (
            <div key={l} style={{
              padding: '7px 10px', borderRadius: 6, fontSize: 13,
              background: l === 'Evidence' ? nuTokens.panelAlt : 'transparent',
              boxShadow: l === 'Evidence' ? `inset 0 0 0 1px ${nuTokens.borderStr}` : 'none',
              fontWeight: l === 'Evidence' ? 500 : 400,
              color: l === 'Evidence' ? nuTokens.ink : nuTokens.inkSoft,
            }}>{l}</div>
          ))}
        </div>
      </aside>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <header style={{
          height: 56, borderBottom: `1px solid ${nuTokens.border}`,
          padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <NuLabel tone="ink" size={11}>Evidence library</NuLabel>
          <button style={{
            padding: '7px 14px', borderRadius: 7,
            background: nuTokens.accent, color: '#FFF',
            border: `1px solid rgba(0,0,0,0.10)`,
            cursor: 'pointer', fontSize: 13, fontWeight: 600,
            boxShadow: "inset 0 2px 4px rgba(255,255,255,0.56), 0 4px 8px rgba(38,27,7,0.06), 0 1px 2px rgba(38,27,7,0.36)",
          }}>+ Upload evidence</button>
        </header>

        <div style={{ padding: '28px 32px' }}>
          <h1 style={{ ...nuFont.ui, fontSize: 32, fontWeight: 500, letterSpacing: '-0.022em', margin: 0 }}>
            Evidence linked to <span style={{ color: nuTokens.accent }}>47 vectors</span>
          </h1>
          <p style={{ fontSize: 14, color: nuTokens.inkSoft, maxWidth: 720, marginTop: 8 }}>
            Files attached to assessment vectors. Each is stamped with operator email and signed-URL
            preserved across sessions. AI evidence-validation runs against PDFs and screenshots.
          </p>

          {/* Filter row */}
          <div style={{ marginTop: 24, padding: '10px 14px', background: nuTokens.panel, border: `1px solid ${nuTokens.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 14 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={nuTokens.inkMuted} strokeWidth="1.4"><circle cx="6" cy="6" r="4"/><path d="M9 9l3.5 3.5"/></svg>
            <span style={{ flex: 1, fontSize: 13, color: nuTokens.inkMuted }}>Search filename, pillar, BU…</span>
            <NuChip tone="accent">PDF · 6</NuChip>
            <NuChip tone="ink">XLSX · 2</NuChip>
            <NuChip tone="ink">All units</NuChip>
            <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>8 files · 10.7 MB</span>
          </div>

          {/* Files table */}
          <div style={{ marginTop: 16, background: nuTokens.panel, border: `1px solid ${nuTokens.border}`, borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '40px 2fr 1.4fr 110px 90px 90px 70px', gap: 12, padding: '10px 18px', background: nuTokens.panelAlt, ...nuFont.mono, fontSize: 10, fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', color: nuTokens.inkMuted }}>
              <span></span>
              <span>Filename</span>
              <span>Pillar</span>
              <span>BU</span>
              <span style={{ textAlign: 'right' }}>Size</span>
              <span style={{ textAlign: 'right' }}>Linked</span>
              <span style={{ textAlign: 'right' }}>When</span>
            </div>
            {files.map((f, i) => {
              const bu = dpBu[f.bu];
              return (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '40px 2fr 1.4fr 110px 90px 90px 70px', gap: 12,
                  padding: '12px 18px', alignItems: 'center', fontSize: 13,
                  borderTop: `1px solid ${nuTokens.border}`,
                }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 5,
                    background: f.name.endsWith('.pdf') ? nuTokens.critSoft : nuTokens.okSoft,
                    color: f.name.endsWith('.pdf') ? nuTokens.crit : nuTokens.ok,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    ...nuFont.mono, fontSize: 9, fontWeight: 600,
                  }}>
                    {f.name.endsWith('.pdf') ? 'PDF' : 'XLS'}
                  </span>
                  <span style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {f.name}
                  </span>
                  <span style={{ fontSize: 12.5, color: nuTokens.inkSoft }}>{f.pillar}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 16, height: 16, borderRadius: 4, background: bu.tint, color: bu.dot, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DpBuGlyph id={f.bu} size={10} color={bu.dot} />
                    </span>
                    <span style={{ fontSize: 12, color: nuTokens.inkSoft }}>{bu.name}</span>
                  </span>
                  <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted, textAlign: 'right' }}>{f.size}</span>
                  <span style={{ ...nuFont.mono, fontSize: 12, color: nuTokens.accent, fontWeight: 600, textAlign: 'right' }}>{f.linked} vectors</span>
                  <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted, textAlign: 'right' }}>{f.when}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// -------- PDF REPORT PREVIEW ------------------------------------
const DPReportScreen = () => {
  const Page = ({ children, n, title }) => (
    <div style={{
      width: 595, // A4 portrait approx
      minHeight: 842,
      background: '#FFFFFF',
      border: `1px solid ${nuTokens.border}`,
      borderRadius: 4,
      padding: '40px 44px',
      boxShadow: '0 6px 18px rgba(38,27,7,0.08)',
      position: 'relative',
      ...nuFont.ui, fontSize: 11, lineHeight: 1.5, color: nuTokens.ink,
    }}>
      {/* Page header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        paddingBottom: 10, borderBottom: `1px solid ${nuTokens.border}`,
      }}>
        <span style={{ fontFamily: '"Fraunces", serif', fontSize: 11, fontWeight: 500 }}>ERM Navigator</span>
        <span style={{ ...nuFont.mono, fontSize: 9, color: nuTokens.inkMuted, letterSpacing: '0.10em' }}>
          GENERATION · MAY 20 2026 · PAGE {n} / 5
        </span>
      </div>
      <div style={{ marginTop: 16 }}>
        <NuLabel size={9}>{title}</NuLabel>
        {children}
      </div>
    </div>
  );

  return (
    <div style={{
      width: 1680, minHeight: 1080,
      background: nuTokens.bg, color: nuTokens.ink,
      ...nuFont.ui, padding: '40px 56px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
        <div>
          <NuLabel tone="accent">● Board-grade PDF · 5 pages · A4</NuLabel>
          <h1 style={{ ...nuFont.ui, fontSize: 32, fontWeight: 500, letterSpacing: '-0.022em', margin: '6px 0 0' }}>
            What the board sees.
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{
            padding: '8px 14px', borderRadius: 7, fontSize: 13,
            background: nuTokens.panel, color: nuTokens.ink,
            border: `1px solid ${nuTokens.border}`, cursor: 'pointer',
          }}>Preview live</button>
          <button style={{
            padding: '8px 16px', borderRadius: 7, fontSize: 13, fontWeight: 600,
            background: nuTokens.accent, color: '#FFF',
            border: `1px solid rgba(0,0,0,0.10)`, cursor: 'pointer',
            boxShadow: "inset 0 2px 4px rgba(255,255,255,0.56), 0 4px 8px rgba(38,27,7,0.06), 0 1px 2px rgba(38,27,7,0.36)",
          }}>↓ Download PDF</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 595px)', gap: 18, overflow: 'auto' }}>
        {/* P1 — Cover */}
        <Page n={1} title="Cover">
          <div style={{ marginTop: 80 }}>
            <span style={{ fontFamily: '"Fraunces", serif', fontSize: 13, color: nuTokens.inkMuted }}>Risk Maturity Report</span>
            <h2 style={{ ...nuFont.ui, fontSize: 38, fontWeight: 500, letterSpacing: '-0.028em', lineHeight: 1.05, margin: '12px 0 0' }}>
              Generation
            </h2>
            <p style={{ fontSize: 12, color: nuTokens.inkMuted, marginTop: 6 }}>Power generation · benchmark · Industry</p>
            <div style={{ marginTop: 50, display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ ...nuFont.ui, fontSize: 90, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 0.95 }}>3.34</span>
              <span style={{ ...nuFont.mono, fontSize: 12, color: nuTokens.inkMuted }}>/5.00 overall</span>
            </div>
            <p style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.crit, fontWeight: 600, marginTop: 6 }}>
              −0.21 vs Industry · −0.28 over 30 days
            </p>
            <div style={{ marginTop: 60, paddingTop: 14, borderTop: `1px solid ${nuTokens.border}`, ...nuFont.mono, fontSize: 9, color: nuTokens.inkMuted, lineHeight: 1.6 }}>
              ISO 31000 · COSO ERM · NIST RMF · RIMS RMM<br/>
              Tx · A7F3-2C4D-9E · Generated May 20, 2026 14:32<br/>
              Operator · analyst@gmail.com · deterministic · 35 tests pinned in CI
            </div>
          </div>
        </Page>

        {/* P2 — Methodology */}
        <Page n={2} title="Methodology">
          <h3 style={{ ...nuFont.ui, fontSize: 16, fontWeight: 500, margin: '10px 0 8px' }}>How we score</h3>
          <p style={{ fontSize: 10.5, color: nuTokens.inkSoft, lineHeight: 1.6 }}>
            100 standards-aligned questions across 10 ERM pillars × 4 operating dimensions
            (People / Process / Technology / Governance). Each answer captured on a 1–5 maturity
            rubric with anchor text. Pillar weights × dimension weights × per-question weights
            roll up deterministically.
          </p>
          <h3 style={{ ...nuFont.ui, fontSize: 14, fontWeight: 500, margin: '20px 0 6px' }}>Maturity scale</h3>
          {[
            ['1', 'Ad-hoc',     'Informal, no documented process. Outcomes unpredictable.'],
            ['2', 'Partial',    'Some practices exist but inconsistent across the organization.'],
            ['3', 'Defined',    'Documented, communicated, applied consistently.'],
            ['4', 'Managed',    'Measured, reviewed, continuously refined against KRIs.'],
            ['5', 'Optimized',  'Predictive, automated, integrated into strategic planning.'],
          ].map(([n, name, text]) => (
            <div key={n} style={{ display: 'grid', gridTemplateColumns: '24px 70px 1fr', gap: 8, padding: '6px 0', borderBottom: `1px solid ${nuTokens.border}`, fontSize: 10.5 }}>
              <span style={{ ...nuFont.ui, fontWeight: 600, color: nuTokens.accent }}>{n}</span>
              <span style={{ fontWeight: 500 }}>{name}</span>
              <span style={{ color: nuTokens.inkSoft }}>{text}</span>
            </div>
          ))}
          <h3 style={{ ...nuFont.ui, fontSize: 14, fontWeight: 500, margin: '20px 0 6px' }}>Reproducibility (patent claim 24)</h3>
          <p style={{ fontSize: 10.5, color: nuTokens.inkSoft, lineHeight: 1.6 }}>
            Same responses always produce the same number. Pinned by 35 unit tests + 6 property-based
            assertions over 100 random inputs each. CI fails any drift.
          </p>
        </Page>

        {/* P3 — Pillar table */}
        <Page n={3} title="Pillar scores">
          <div style={{ marginTop: 14 }}>
            {ERM_DATA.pillars.map((p, i) => {
              const sev = severity(p.score, p.target);
              const color = sev === 'ok' ? nuTokens.ok : sev === 'warn' ? nuTokens.warn : nuTokens.crit;
              return (
                <div key={p.id} style={{ padding: '8px 0', borderBottom: `1px solid ${nuTokens.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 11, fontWeight: 500 }}>
                      <span style={{ ...nuFont.mono, fontSize: 9, color: nuTokens.inkMuted, marginRight: 8 }}>
                        {String(i+1).padStart(2, '0')}
                      </span>
                      {p.name}
                    </span>
                    <span style={{ ...nuFont.ui, fontSize: 14, fontWeight: 600 }}>{p.score.toFixed(2)}</span>
                  </div>
                  <div style={{ marginTop: 5, height: 3, background: nuTokens.bgSubtle, borderRadius: 999, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${(p.score/5)*100}%`, background: color, borderRadius: 999 }} />
                    <div style={{ position: 'absolute', top: -1, left: `${(p.target/5)*100}%`, width: 1, height: 5, background: nuTokens.borderStr }} />
                  </div>
                  <div style={{ marginTop: 3, display: 'flex', justifyContent: 'space-between', ...nuFont.mono, fontSize: 8.5, color: nuTokens.inkMuted }}>
                    <span>Industry {p.target.toFixed(2)}</span>
                    <span style={{ color }}>{p.score >= p.target ? 'aligned' : `−${(p.target - p.score).toFixed(2)}`}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Page>

        {/* P4 — Drift + dimensions */}
        <Page n={4} title="Drift detection · dimensions">
          <h3 style={{ ...nuFont.ui, fontSize: 14, fontWeight: 500, margin: '10px 0 8px' }}>Critical regression</h3>
          <div style={{ padding: 12, background: nuTokens.critSoft, borderRadius: 6, border: `1px solid ${nuTokens.critSoft}` }}>
            <NuLabel tone="ink" size={9}>RISK TREATMENT</NuLabel>
            <div style={{ ...nuFont.ui, fontSize: 13, fontWeight: 500, marginTop: 4 }}>
              Score dropped 3.55 → 2.95 (<span style={{ color: nuTokens.crit, fontWeight: 700 }}>−0.60</span>) at session 3.
              Operator has not flagged. Detected automatically by drift engine.
            </div>
          </div>

          <h3 style={{ ...nuFont.ui, fontSize: 14, fontWeight: 500, margin: '20px 0 8px' }}>Operating dimensions</h3>
          {ERM_DATA.dimensions.map(d => {
            const pct = (d.score / 5) * 100;
            const above = d.score >= 3.5;
            return (
              <div key={d.id} style={{ padding: '7px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <span>{d.name}</span>
                  <span style={{ ...nuFont.ui, fontWeight: 600, color: above ? nuTokens.ok : nuTokens.warn }}>{d.score.toFixed(2)}</span>
                </div>
                <div style={{ marginTop: 4, height: 3, background: nuTokens.bgSubtle, borderRadius: 999 }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: above ? nuTokens.ok : nuTokens.warn, borderRadius: 999 }} />
                </div>
              </div>
            );
          })}

          <h3 style={{ ...nuFont.ui, fontSize: 14, fontWeight: 500, margin: '20px 0 6px' }}>Mission status</h3>
          <div style={{ padding: 10, background: nuTokens.warnSoft, borderRadius: 6, fontSize: 11 }}>
            <strong>VECTOR_DRIFT</strong> — 3 critical regression signals detected.
            Recommendation: open Phase-1 actions before next review cycle.
          </div>
        </Page>

        {/* P5 — Roadmap */}
        <Page n={5} title="Uplift roadmap">
          <h3 style={{ ...nuFont.ui, fontSize: 14, fontWeight: 500, margin: '10px 0 8px' }}>Sequenced by uplift ÷ (cost × duration)</h3>
          {ERM_DATA.roadmap.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 50px', gap: 8, padding: '7px 0', borderBottom: `1px solid ${nuTokens.border}`, alignItems: 'center' }}>
              <span style={{
                ...nuFont.mono, fontSize: 9, fontWeight: 600, color: r.phase === 1 ? nuTokens.accent : nuTokens.inkMuted,
                padding: '2px 0', border: `1px solid ${r.phase === 1 ? nuTokens.accent : nuTokens.borderStr}`,
                borderRadius: 3, textAlign: 'center',
              }}>P{r.phase}</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 500 }}>{r.name}</div>
                <div style={{ ...nuFont.mono, fontSize: 9, color: nuTokens.inkMuted, marginTop: 2 }}>
                  {r.pillar} · {r.effort} effort · {r.timeline}
                </div>
              </div>
              <span style={{ ...nuFont.mono, fontSize: 12, fontWeight: 600, color: nuTokens.ok, textAlign: 'right' }}>
                +{r.uplift.toFixed(2)}
              </span>
            </div>
          ))}

          <div style={{ marginTop: 22, padding: 12, background: nuTokens.panelAlt, borderRadius: 6 }}>
            <NuLabel size={9}>Cumulative Phase-1</NuLabel>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 4 }}>
              <span style={{ fontSize: 11, color: nuTokens.inkSoft }}>If shipped within 90 days</span>
              <span style={{ ...nuFont.ui, fontSize: 22, fontWeight: 600, color: nuTokens.ok, letterSpacing: '-0.02em' }}>+0.34</span>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 30, left: 44, right: 44, ...nuFont.mono, fontSize: 8.5, color: nuTokens.inkMuted, paddingTop: 8, borderTop: `1px solid ${nuTokens.border}`, lineHeight: 1.5 }}>
            Generated by the ERM Navigator scoring engine. Identical responses always produce identical reports —
            verified by 35 unit tests + 6 property-based assertions over 100 random inputs each in CI.
          </div>
        </Page>
      </div>
    </div>
  );
};

window.DPLoginScreen = DPLoginScreen;
window.DPScopeScreen = DPScopeScreen;
window.DPAssessmentScreen = DPAssessmentScreen;
window.DPEvidenceScreen = DPEvidenceScreen;
window.DPReportScreen = DPReportScreen;

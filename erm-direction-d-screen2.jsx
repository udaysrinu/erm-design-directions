/* Direction D · Screen 2 — Action Plan drill-down.
 * What happens when you click "Open action plan" on the Live Brief.
 *
 * Reuses Direction D's tokens (nuTokens, nuFont) and atoms. Adds:
 *   - Runway-style scenario comparison (3 lanes, drag-to-explore feel)
 *   - Vector-level breakdown of the affected pillar
 *   - Action checklist with owner assignments and expected uplift math
 *   - Inline "Ask Navigator" cells (Runway's "AI hover mode" idea)
 */

const ActionPlanScreen = () => {
  // Vectors from Risk Culture pillar — these are the 10 actual questions
  // tagged pillarId='culture' from the codebase.
  const cultureVectors = [
    { id: 81, text: "Is risk awareness measured periodically?",       score: 3.0, prev: 3.4, dim: "People" },
    { id: 82, text: "Are employees encouraged to escalate risks?",    score: 2.5, prev: 3.1, dim: "People" },
    { id: 83, text: "Are incentives aligned with risk appetite?",     score: 2.8, prev: 2.8, dim: "Governance" },
    { id: 84, text: "Is leadership modeling desired risk behaviors?", score: 3.2, prev: 3.3, dim: "People" },
    { id: 85, text: "Are culture surveys conducted regularly?",       score: 3.5, prev: 3.5, dim: "People" },
    { id: 86, text: "Are training programs effective and role-specific?", score: 2.6, prev: 3.2, dim: "People" },
    { id: 87, text: "Are risk behaviors embedded into performance management?", score: 2.5, prev: 2.6, dim: "Governance" },
    { id: 88, text: "Are communication channels open and trusted?",   score: 2.8, prev: 3.4, dim: "People" },
    { id: 89, text: "Are risk violations addressed consistently?",    score: 2.9, prev: 3.0, dim: "Governance" },
    { id: 90, text: "Is psychological safety present for risk escalation?", score: 2.0, prev: 2.7, dim: "People" },
  ];

  // Phase-1 action plan steps
  const actions = [
    {
      id: "ACT-2026-019",
      name: "Monthly culture pulse · 4-question micro-survey",
      vectors: [85, 81, 90],
      uplift: 0.12,
      effort: "Low",
      weeks: 4,
      owner: "FA", ownerName: "Fahad Al-Otaibi",
      status: "ready",
    },
    {
      id: "ACT-2026-020",
      name: "Anonymous escalation channel · external ombudsman",
      vectors: [82, 88, 90],
      uplift: 0.14,
      effort: "Medium",
      weeks: 8,
      owner: "NM", ownerName: "Nora Mansour",
      status: "draft",
    },
    {
      id: "ACT-2026-021",
      name: "Role-specific risk training · cohort relaunch",
      vectors: [86, 81],
      uplift: 0.08,
      effort: "Medium",
      weeks: 10,
      owner: "RA", ownerName: "Reem Al-Saud",
      status: "draft",
    },
  ];

  // Scenario lanes
  const scenarios = [
    {
      name: "Status quo",
      sub: "Nothing changes",
      maturityEnd: 3.16,
      delta: -0.18,
      cultureEnd: 2.60,
      risks: ["Drift continues at current pace", "3 more pillars at risk of downgrade by Q3"],
      tone: "crit",
    },
    {
      name: "Phase-1 only",
      sub: "3 actions · 10 weeks",
      maturityEnd: 3.41,
      delta: +0.07,
      cultureEnd: 3.12,
      risks: ["Closes 80% of Culture gap", "Treatment + Monitoring still drifting"],
      tone: "warn",
      recommended: false,
    },
    {
      name: "Full sequence",
      sub: "Phase-1 + 2 · 22 weeks",
      maturityEnd: 3.62,
      delta: +0.28,
      cultureEnd: 3.34,
      risks: ["Aligned on Industry by Q4", "Resource cost: 2.4 FTE"],
      tone: "ok",
      recommended: true,
    },
  ];

  return (
    <div style={{
      width: 1440, minHeight: 1480,
      background: nuTokens.bg,
      color: nuTokens.ink,
      ...nuFont.ui,
      fontSize: 14, lineHeight: 1.5,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* === NAV (same as Screen 1) === */}
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
              { l: "Today" },
              { l: "Maturity" },
              { l: "Drift", active: true },
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
            ...nuFont.ui, fontSize: 13, fontWeight: 500,
            padding: '6px 13px', borderRadius: 6,
            background: 'transparent', color: nuTokens.inkSoft,
            border: `1px solid ${nuTokens.border}`,
            cursor: 'pointer',
          }}>Share plan</button>
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

      {/* === Breadcrumb / context === */}
      <div style={{
        padding: '14px 32px',
        borderBottom: `1px solid ${nuTokens.border}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <button style={{
          ...nuFont.ui, fontSize: 13, color: nuTokens.inkMuted,
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: 0,
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M8 3l-4 3.5L8 10"/>
          </svg>
          Today
        </button>
        <span style={{ color: nuTokens.inkSubtle }}>/</span>
        <span style={{ fontSize: 13, color: nuTokens.inkMuted }}>Generation</span>
        <span style={{ color: nuTokens.inkSubtle }}>/</span>
        <NuChip tone="accent">Signal · SIG-2026-0519-A7F3</NuChip>
        <span style={{ flex: 1 }} />
        <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>
          Last reviewed by FA · 14m ago
        </span>
      </div>

      {/* === HERO: action title + scenario hint === */}
      <div style={{ padding: '24px 32px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 32 }}>
          <div style={{ flex: 1 }}>
            <NuLabel tone="accent" size={11}>Action plan · Risk Culture</NuLabel>
            <h1 style={{
              ...nuFont.ui, fontSize: 40, fontWeight: 500, letterSpacing: '-0.025em',
              lineHeight: 1.1, margin: '12px 0 0', maxWidth: 820,
            }}>
              Recover{' '}
              <span style={{ ...nuFont.mono, color: nuTokens.ok, fontWeight: 600 }}>+0.34</span>
              {' '}of Culture maturity in{' '}
              <span style={{ borderBottom: `2px solid ${nuTokens.accentLine}`, paddingBottom: 1 }}>
                90 days
              </span>
              {' '}across three actions.
            </h1>
            <p style={{
              fontSize: 14.5, color: nuTokens.inkSoft, marginTop: 12, maxWidth: 720, lineHeight: 1.55,
            }}>
              Navigator sequenced these by{' '}
              <span style={{ ...nuFont.mono, fontSize: 12.5, padding: '1px 6px', background: nuTokens.bgSubtle, borderRadius: 3 }}>
                uplift ÷ (effort × duration)
              </span>
              . Three vectors carry 70% of the regression — pulses, escalation channels, and training.
              Owners pre-assigned from each vector's history.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button style={{
              ...nuFont.ui, fontSize: 13, fontWeight: 500,
              padding: '9px 14px', borderRadius: 7,
              background: 'transparent', color: nuTokens.ink,
              border: `1px solid ${nuTokens.borderStr}`, cursor: 'pointer',
            }}>
              Duplicate plan
            </button>
            <button style={{
              ...nuFont.ui, fontSize: 13, fontWeight: 500,
              padding: '9px 16px', borderRadius: 7,
              background: nuTokens.accent, color: nuTokens.bg,
              border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              Commit plan
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M2 5.5h7M6 2.5l3 3-3 3"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* === SCENARIO COMPARISON (Runway pattern) === */}
      <div style={{ padding: '8px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <NuLabel size={11}>Scenarios · drag inputs to explore</NuLabel>
          <span style={{ flex: 1, height: 1, background: nuTokens.border }} />
          <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>
            horizon: 90 days · model v2.4
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {scenarios.map((s, i) => {
            const accentC = s.tone === "ok" ? nuTokens.ok : s.tone === "warn" ? nuTokens.warn : nuTokens.crit;
            const accentSoftC = s.tone === "ok" ? nuTokens.okSoft : s.tone === "warn" ? nuTokens.warnSoft : nuTokens.critSoft;
            return (
              <div key={i} style={{
                background: nuTokens.panel,
                border: s.recommended ? `1.5px solid ${nuTokens.accent}` : `1px solid ${nuTokens.border}`,
                borderRadius: 12, padding: 20,
                position: 'relative',
              }}>
                {s.recommended && (
                  <span style={{
                    position: 'absolute', top: -10, left: 16,
                    padding: '3px 9px', background: nuTokens.accent, color: nuTokens.bg,
                    borderRadius: 4, ...nuFont.mono, fontSize: 9.5, fontWeight: 600,
                    letterSpacing: '0.10em', textTransform: 'uppercase',
                  }}>Recommended</span>
                )}
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ ...nuFont.ui, fontSize: 17, fontWeight: 600, letterSpacing: '-0.015em' }}>
                      {s.name}
                    </div>
                    <div style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted, marginTop: 2 }}>
                      {s.sub}
                    </div>
                  </div>
                  <NuChip tone={s.tone}>{s.delta >= 0 ? "uplift" : "drift"}</NuChip>
                </div>

                <div style={{ marginTop: 18, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ ...nuFont.ui, fontSize: 44, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, color: nuTokens.ink }}>
                    {s.maturityEnd.toFixed(2)}
                  </span>
                  <span style={{ ...nuFont.mono, fontSize: 13, color: accentC, fontWeight: 600 }}>
                    {s.delta >= 0 ? '+' : ''}{s.delta.toFixed(2)}
                  </span>
                </div>
                <div style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted, marginTop: 2 }}>
                  overall maturity by Aug 2026
                </div>

                <div style={{ marginTop: 16, padding: '12px 0', borderTop: `1px solid ${nuTokens.border}`, borderBottom: `1px solid ${nuTokens.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12.5, color: nuTokens.inkMuted }}>Culture pillar →</span>
                    <span style={{ ...nuFont.mono, fontSize: 14, fontWeight: 600, color: accentC }}>
                      {s.cultureEnd.toFixed(2)}
                    </span>
                  </div>
                  {/* Mini bar */}
                  <div style={{ marginTop: 8, height: 4, background: nuTokens.bgSubtle, borderRadius: 999, position: 'relative' }}>
                    <div style={{
                      position: 'absolute', left: 0, top: 0, height: '100%',
                      width: `${(s.cultureEnd / 5) * 100}%`,
                      background: accentC, borderRadius: 999,
                    }} />
                    {/* Target marker */}
                    <div style={{
                      position: 'absolute', left: '66%', top: -3, width: 2, height: 10,
                      background: nuTokens.blue, opacity: 0.7,
                    }} />
                  </div>
                </div>

                <ul style={{ margin: '14px 0 0', padding: 0, listStyle: 'none' }}>
                  {s.risks.map((r, j) => (
                    <li key={j} style={{
                      display: 'flex', gap: 8, fontSize: 12.5, color: nuTokens.inkSoft,
                      lineHeight: 1.4, marginBottom: j < s.risks.length - 1 ? 6 : 0,
                    }}>
                      <span style={{ color: accentC, marginTop: 1 }}>·</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* === BODY: actions + affected vectors === */}
      <div style={{
        padding: '24px 32px 0',
        display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16,
      }}>
        {/* LEFT: Action list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <NuLabel size={11}>Phase-1 actions · 3 of 12 sequenced</NuLabel>
            <span style={{ flex: 1, height: 1, background: nuTokens.border }} />
            <button style={{
              ...nuFont.ui, fontSize: 12, color: nuTokens.inkMuted,
              background: 'transparent', border: 'none', cursor: 'pointer',
            }}>
              + Add action
            </button>
          </div>
          {actions.map((a, i) => (
            <div key={a.id} style={{
              background: nuTokens.panel,
              border: `1px solid ${nuTokens.border}`,
              borderRadius: 12, padding: 18,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <NuChip tone="accent">P1 · #{String(i+1).padStart(2,'0')}</NuChip>
                    <span style={{ ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted }}>
                      {a.id}
                    </span>
                    <span style={{ ...nuFont.mono, fontSize: 10.5, color: a.status === "ready" ? nuTokens.ok : nuTokens.inkMuted }}>
                      · {a.status}
                    </span>
                  </div>
                  <div style={{ ...nuFont.ui, fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                    {a.name}
                  </div>
                  <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 16, ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <NuAvatar initials={a.owner} size={20} />
                      <span style={{ color: nuTokens.inkSoft }}>{a.ownerName.split(' ')[0]}</span>
                    </span>
                    <span>·</span>
                    <span>{a.effort.toLowerCase()} effort</span>
                    <span>·</span>
                    <span>{a.weeks}w</span>
                    <span>·</span>
                    <span>affects vectors {a.vectors.join(', ')}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <NuLabel size={9}>Uplift</NuLabel>
                  <div style={{ ...nuFont.ui, fontSize: 28, fontWeight: 600, color: nuTokens.ok, letterSpacing: '-0.02em', lineHeight: 1, marginTop: 4 }}>
                    +{a.uplift.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Inline AI prompt — Runway hover-mode hint */}
              <div style={{
                marginTop: 14, padding: '8px 12px',
                background: nuTokens.bgSubtle, borderRadius: 6,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill={nuTokens.accent}>
                  <path d="M6.5 1l1.4 3.7L11.5 6 7.9 7.3 6.5 11 5.1 7.3 1.5 6l3.6-1.3z"/>
                </svg>
                <span style={{ flex: 1, fontSize: 12.5, color: nuTokens.inkSoft }}>
                  Why these three vectors? · Why this owner? · Show similar plans from peers
                </span>
                <span style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.inkMuted }}>↵</span>
              </div>
            </div>
          ))}

          {/* Cumulative footer */}
          <div style={{
            padding: '14px 18px', background: nuTokens.panelAlt,
            border: `1px solid ${nuTokens.border}`, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <NuLabel>Cumulative · Phase-1 sum</NuLabel>
              <div style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted, marginTop: 4 }}>
                Diminishing-return adjusted · weighted by dimension overlap
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ ...nuFont.ui, fontSize: 32, fontWeight: 600, color: nuTokens.ok, letterSpacing: '-0.02em', lineHeight: 1 }}>
                +0.34
              </span>
              <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>culture</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Affected vectors table */}
        <div style={{
          background: nuTokens.panel,
          border: `1px solid ${nuTokens.border}`,
          borderRadius: 12, overflow: 'hidden',
          alignSelf: 'flex-start',
        }}>
          <div style={{
            padding: '14px 18px', borderBottom: `1px solid ${nuTokens.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <NuLabel tone="ink" size={11}>Culture vectors · 10</NuLabel>
            <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>
              · sort: delta desc
            </span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, ...nuFont.ui }}>
            <thead>
              <tr style={{ background: nuTokens.panelAlt }}>
                {[
                  { l: "#", w: 32 },
                  { l: "Vector" },
                  { l: "Dim", w: 64 },
                  { l: "Now", w: 50, a: 'right' },
                  { l: "30d Δ", w: 56, a: 'right' },
                ].map(h => (
                  <th key={h.l} style={{
                    padding: '8px 10px', textAlign: h.a || 'left', width: h.w,
                    ...nuFont.mono, fontSize: 9.5, fontWeight: 500,
                    letterSpacing: '0.10em', textTransform: 'uppercase',
                    color: nuTokens.inkMuted,
                  }}>{h.l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...cultureVectors].sort((a, b) => (a.score - a.prev) - (b.score - b.prev)).map((v, i) => {
                const delta = v.score - v.prev;
                const deltaColor = delta < -0.2 ? nuTokens.crit : delta < 0 ? nuTokens.warn : nuTokens.ok;
                const inPlan = actions.some(a => a.vectors.includes(v.id));
                return (
                  <tr key={v.id} style={{
                    borderTop: `1px solid ${nuTokens.border}`,
                    background: inPlan ? nuTokens.accentSoft : 'transparent',
                  }}>
                    <td style={{ padding: '9px 10px', ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkMuted, verticalAlign: 'top' }}>
                      {String(v.id).padStart(3,'0')}
                    </td>
                    <td style={{ padding: '9px 10px', verticalAlign: 'top' }}>
                      <div style={{ fontSize: 12.5, color: nuTokens.ink, lineHeight: 1.4 }}>{v.text}</div>
                      {inPlan && (
                        <div style={{ ...nuFont.mono, fontSize: 10, color: nuTokens.accent, marginTop: 2, fontWeight: 600, letterSpacing: '0.06em' }}>
                          ● TARGETED BY PLAN
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '9px 10px', ...nuFont.mono, fontSize: 10.5, color: nuTokens.inkSoft, verticalAlign: 'top' }}>
                      {v.dim.toLowerCase()}
                    </td>
                    <td style={{ padding: '9px 10px', textAlign: 'right', ...nuFont.mono, fontSize: 13, fontWeight: 500, verticalAlign: 'top' }}>
                      {v.score.toFixed(1)}
                    </td>
                    <td style={{ padding: '9px 10px', textAlign: 'right', ...nuFont.mono, fontSize: 11, color: deltaColor, fontWeight: 600, verticalAlign: 'top' }}>
                      {delta >= 0 ? '+' : ''}{delta.toFixed(1)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{
            padding: '12px 18px',
            borderTop: `1px solid ${nuTokens.border}`,
            background: nuTokens.panelAlt,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ ...nuFont.mono, fontSize: 11, color: nuTokens.inkMuted }}>
              5 of 10 vectors targeted
            </span>
            <button style={{
              ...nuFont.ui, fontSize: 12, color: nuTokens.inkSoft,
              background: 'transparent', border: 'none', cursor: 'pointer',
            }}>
              Show all vectors ›
            </button>
          </div>
        </div>
      </div>

      {/* Footer (same) */}
      <footer style={{
        marginTop: 32, height: 36,
        background: nuTokens.ground, color: nuTokens.groundInk,
        ...nuFont.mono, fontSize: 10.5,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px',
      }}>
        <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
          <span><span style={{ color: nuTokens.ok }}>●</span>  Drift engine</span>
          <span><span style={{ color: nuTokens.ok }}>●</span>  Scoring · 28ms</span>
          <span><span style={{ color: nuTokens.accent }}>●</span>  Navigator AI · idle</span>
          <span style={{ opacity: 0.6 }}>plan · ACT-2026-019..021</span>
        </div>
        <div style={{ display: 'flex', gap: 18, opacity: 0.7 }}>
          <span>ISO 31000 · COSO ERM · NIST RMF</span>
          <span>SOC 2 Type II</span>
        </div>
      </footer>
    </div>
  );
};

window.ActionPlanScreen = ActionPlanScreen;

/* Direction F — "The Conversation".
 * Solves the problem: nobody wants to fill out 100 questions.
 *
 * Navigator AI conducts the maturity assessment as a chat. Adaptive depth — if
 * you say "we have weekly leadership reviews", it asks for evidence, marks
 * affected vectors, moves on. The 100 vectors are captured INVISIBLY in the
 * background. The assessor's job becomes telling a story, not ticking boxes.
 *
 * Inspired by Louisa's conversational signal pattern + Runway's "agent that
 * knows your model" framing.
 */

const cvTokens = {
  bg:        "#F8F6F1",         // warm cream, slightly lighter than D
  panel:     "#FFFFFF",
  panelAlt:  "#F0EDE5",
  bgInk:     "#1A1815",         // for assistant message bubbles
  border:    "rgba(26, 24, 21, 0.08)",
  borderStr: "rgba(26, 24, 21, 0.18)",
  ink:       "#1A1815",
  inkSoft:   "rgba(26, 24, 21, 0.72)",
  inkMuted:  "rgba(26, 24, 21, 0.50)",
  inkSubtle: "rgba(26, 24, 21, 0.32)",
  inkInv:    "#F0EDE5",
  inkInvMuted: "rgba(240, 237, 229, 0.65)",
  accent:    "#A04A28",         // warmer terracotta — voice-of-AI moments
  accentSoft:"rgba(160, 74, 40, 0.10)",
  accentLine:"rgba(160, 74, 40, 0.32)",
  highlight: "#E8B057",         // soft amber — for capture confirmations
  highlightSoft: "rgba(232, 176, 87, 0.18)",
  ok:        "#2E6B48",
  okSoft:    "rgba(46, 107, 72, 0.10)",
  warn:      "#B5862A",
  warnSoft:  "rgba(181, 134, 42, 0.12)",
};

const cvFont = {
  ui:   { fontFamily: '"Inter Tight", "Inter", system-ui, sans-serif' },
  serif:{ fontFamily: '"Fraunces", "Times New Roman", serif' },
  mono: { fontFamily: '"JetBrains Mono", ui-monospace, monospace' },
};

// Conversation log — what an AI-conducted assessment looks like in flight
const cvTurns = [
  {
    role: "ai", time: "09:01",
    text: <>
      Good morning, Aisha. Let's spend ~25 minutes on Generation's risk-maturity assessment.
      I'll ask open questions; you answer in your own words and link any evidence you have. 
      I'll mark the 100 standards-aligned vectors as we go — you'll see them appear on the right.
    </>,
  },
  {
    role: "ai", time: "09:01",
    text: <>To open: <strong>how does Generation's leadership currently see risk?</strong> Specifically, what's been the
    most-discussed risk in your last two leadership meetings?</>,
    citation: "ISO 31000 § 5.2 · Leadership and commitment",
  },
  {
    role: "user", time: "09:03",
    text: <>The grid-stability piece has dominated — we had a near-miss in March that the board asked us to brief on twice.
    There's a written escalation policy but honestly the cultural side of it (people speaking up early) is what concerns me.</>,
  },
  {
    role: "captured", time: "09:03",
    captured: [
      { id: 1, pillar: "Leadership", text: "Formally approved ERM policy", score: 4 },
      { id: 3, pillar: "Leadership", text: "Senior leadership champions risk", score: 4 },
      { id: 10, pillar: "Leadership", text: "Timely decision-ready risk reports", score: 3 },
    ],
    flag: "open: culture concern noted — will probe in Pillar 9",
  },
  {
    role: "ai", time: "09:04",
    text: <>Good signal — three Leadership vectors marked, and I've flagged the culture concern to pick up later.
    Quick check: <strong>is the escalation policy actually working in practice?</strong> Can you point to a recent
    case where someone escalated early and it was acted on?</>,
    suggestions: ["Yes, here's an example", "Honestly, not really", "Mixed — depends on the team"],
  },
  {
    role: "user", time: "09:05",
    text: <>Mixed. The control-room team escalates fast. The maintenance crews don't — there's a "we'll handle it" culture
    that bit us in March.</>,
    evidence: { name: "march-incident-postmortem.pdf", linked: 2 },
  },
  {
    role: "captured", time: "09:05",
    captured: [
      { id: 5, pillar: "Leadership", text: "Risk breaches escalated promptly", score: 2 },
      { id: 82, pillar: "Culture", text: "Employees encouraged to escalate", score: 2 },
      { id: 90, pillar: "Culture", text: "Psychological safety for escalation", score: 2 },
    ],
    flag: "evidence linked: march-incident-postmortem.pdf → vectors 5, 82, 90",
  },
  {
    role: "ai", time: "09:06",
    text: <>This is a structural pattern — three vectors, two pillars, one root cause. I'll come back to
    this in my summary. Moving on: <strong>strategy and risk integration.</strong> When Generation builds
    its next 12-month investment plan, who at the table represents the risk perspective?</>,
  },
];

const CvBubble = ({ role, time, children, citation, suggestions, evidence }) => {
  if (role === "ai") {
    return (
      <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
        <span style={{
          width: 28, height: 28, borderRadius: 999, flexShrink: 0,
          background: cvTokens.ink, color: cvTokens.highlight,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
            <path d="M6.5 1l1.4 3.7L11.5 6 7.9 7.3 6.5 11 5.1 7.3 1.5 6l3.6-1.3z"/>
          </svg>
        </span>
        <div style={{ flex: 1, minWidth: 0, maxWidth: 620 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
            <span style={{ ...cvFont.mono, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: cvTokens.accent }}>
              Navigator
            </span>
            <span style={{ ...cvFont.mono, fontSize: 10.5, color: cvTokens.inkSubtle }}>{time}</span>
          </div>
          <div style={{
            ...cvFont.serif, fontSize: 17, lineHeight: 1.5, fontWeight: 400,
            color: cvTokens.ink, letterSpacing: '-0.005em',
          }}>
            {children}
          </div>
          {citation && (
            <div style={{
              marginTop: 8, paddingLeft: 10, borderLeft: `2px solid ${cvTokens.accentLine}`,
              ...cvFont.mono, fontSize: 10.5, color: cvTokens.inkMuted, letterSpacing: '0.02em',
            }}>
              {citation}
            </div>
          )}
          {suggestions && (
            <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {suggestions.map((s, i) => (
                <span key={i} style={{
                  padding: '5px 11px', borderRadius: 999,
                  background: cvTokens.panelAlt, border: `1px solid ${cvTokens.border}`,
                  fontSize: 12.5, color: cvTokens.inkSoft, cursor: 'pointer',
                }}>{s}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  if (role === "user") {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
        <div style={{ maxWidth: 540, textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, justifyContent: 'flex-end', marginBottom: 6 }}>
            <span style={{ ...cvFont.mono, fontSize: 10.5, color: cvTokens.inkSubtle }}>{time}</span>
            <span style={{ ...cvFont.mono, fontSize: 10.5, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: cvTokens.inkMuted }}>
              Aisha
            </span>
          </div>
          <div style={{
            background: cvTokens.ink, color: cvTokens.inkInv,
            padding: '12px 16px', borderRadius: '14px 14px 4px 14px',
            fontSize: 14.5, lineHeight: 1.5, textAlign: 'left',
          }}>
            {children}
          </div>
          {evidence && (
            <div style={{
              marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '5px 11px', borderRadius: 6,
              background: cvTokens.highlightSoft, border: `1px solid ${cvTokens.accentLine}`,
            }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke={cvTokens.accent} strokeWidth="1.4">
                <path d="M2 2h7v7H2z M5 4v3M3.5 5.5h3"/>
              </svg>
              <span style={{ ...cvFont.mono, fontSize: 10.5, color: cvTokens.accent, fontWeight: 500 }}>
                {evidence.name}
              </span>
              <span style={{ ...cvFont.mono, fontSize: 10, color: cvTokens.accent, opacity: 0.7 }}>
                · linked to {evidence.linked} vectors
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

const CvCaptureCard = ({ captured, flag }) => (
  <div style={{
    margin: '0 0 18px 40px', maxWidth: 620,
    background: cvTokens.panelAlt,
    border: `1px solid ${cvTokens.border}`,
    borderLeft: `3px solid ${cvTokens.highlight}`,
    borderRadius: 8, padding: 14,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke={cvTokens.warn} strokeWidth="1.6">
        <path d="M2 5.5l2.5 2.5L9 3.5"/>
      </svg>
      <span style={{ ...cvFont.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: cvTokens.warn }}>
        Captured · {captured.length} vectors
      </span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {captured.map((c, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '46px 1fr 30px',
          gap: 10, alignItems: 'center', fontSize: 12.5,
        }}>
          <span style={{ ...cvFont.mono, fontSize: 10.5, color: cvTokens.inkMuted, letterSpacing: '0.06em' }}>
            #{String(c.id).padStart(3, '0')}
          </span>
          <span style={{ color: cvTokens.ink }}>{c.text}</span>
          <span style={{
            ...cvFont.mono, fontSize: 12, fontWeight: 600,
            color: c.score >= 4 ? cvTokens.ok : c.score >= 3 ? cvTokens.warn : cvTokens.accent,
            textAlign: 'right',
          }}>
            {c.score}/5
          </span>
        </div>
      ))}
    </div>
    {flag && (
      <div style={{
        marginTop: 10, paddingTop: 10, borderTop: `1px solid ${cvTokens.border}`,
        ...cvFont.mono, fontSize: 10.5, color: cvTokens.inkMuted, fontStyle: 'italic',
      }}>
        ↳ {flag}
      </div>
    )}
  </div>
);

// Mini coverage ring — radial progress for vectors captured
const CvCoverageRing = ({ size = 110, captured = 18, total = 100 }) => {
  const cx = size / 2, cy = size / 2;
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  const pct = captured / total;
  return (
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke={cvTokens.border} strokeWidth="6" />
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke={cvTokens.accent} strokeWidth="6"
        strokeDasharray={`${c * pct} ${c}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`} />
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
        fontFamily="Inter Tight, Inter" fontSize="22" fontWeight="600"
        fill={cvTokens.ink} letterSpacing="-0.02em">
        {captured}
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle"
        fontFamily="JetBrains Mono" fontSize="9.5"
        fill={cvTokens.inkMuted} letterSpacing="0.10em">
        of {total}
      </text>
    </svg>
  );
};

// Pillar coverage row
const CvPillarCov = ({ name, short, captured, total }) => {
  const pct = (captured / total) * 100;
  return (
    <div style={{
      padding: '10px 0', borderBottom: `1px solid ${cvTokens.border}`,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 5,
      }}>
        <span style={{ fontSize: 12.5, color: cvTokens.inkSoft }}>{name}</span>
        <span style={{ ...cvFont.mono, fontSize: 11, color: captured === total ? cvTokens.ok : captured > 0 ? cvTokens.warn : cvTokens.inkMuted, fontWeight: 500 }}>
          {captured}/{total}
        </span>
      </div>
      <div style={{ height: 3, background: cvTokens.panelAlt, borderRadius: 999 }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: captured === total ? cvTokens.ok : cvTokens.accent,
          borderRadius: 999,
        }} />
      </div>
    </div>
  );
};

const DirectionF = () => {
  // Synthetic vector capture state — 18 of 100 captured at this point
  const pillarCov = [
    { id: "lead",    name: "Leadership & Governance",   short: "LEAD",    captured: 10, total: 10 },
    { id: "strat",   name: "Strategy & Integration",    short: "STRAT",   captured: 0,  total: 10 },
    { id: "scope",   name: "Scope, Context & Criteria", short: "SCOPE",   captured: 0,  total: 10 },
    { id: "ident",   name: "Risk Identification",       short: "IDENT",   captured: 0,  total: 10 },
    { id: "assess",  name: "Risk Assessment",           short: "ASSESS",  captured: 0,  total: 10 },
    { id: "treat",   name: "Risk Treatment",            short: "TREAT",   captured: 0,  total: 10 },
    { id: "monitor", name: "Monitoring & Review",       short: "MONITR",  captured: 0,  total: 10 },
    { id: "report",  name: "Recording & Reporting",     short: "REPORT",  captured: 0,  total: 10 },
    { id: "culture", name: "Risk Culture",              short: "CULTUR",  captured: 5,  total: 10 },
    { id: "improve", name: "Continuous Improvement",    short: "IMPRV",   captured: 0,  total: 10 },
  ];
  const totalCaptured = pillarCov.reduce((a, p) => a + p.captured, 0);

  return (
    <div style={{
      width: 1440, minHeight: 1200,
      background: cvTokens.bg,
      color: cvTokens.ink,
      ...cvFont.ui,
      fontSize: 14, lineHeight: 1.5,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* NAV */}
      <header style={{
        height: 56, borderBottom: `1px solid ${cvTokens.border}`,
        background: cvTokens.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <span style={{
              width: 22, height: 22, borderRadius: 5, background: cvTokens.ink,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ width: 8, height: 8, background: cvTokens.highlight, borderRadius: 2 }} />
            </span>
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.015em' }}>Navigator</span>
          </div>
          <div style={{ width: 1, height: 22, background: cvTokens.border }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ ...cvFont.mono, fontSize: 11, color: cvTokens.inkMuted, letterSpacing: '0.10em', textTransform: 'uppercase' }}>
              Assessment ·
            </span>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Generation · Q2 2026</span>
            <span style={{
              padding: '3px 9px', borderRadius: 4,
              background: cvTokens.highlightSoft, color: cvTokens.warn,
              ...cvFont.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              In session · 06:42
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{
            ...cvFont.ui, fontSize: 13, fontWeight: 500,
            padding: '6px 12px', borderRadius: 6,
            background: 'transparent', color: cvTokens.inkSoft,
            border: `1px solid ${cvTokens.border}`, cursor: 'pointer',
          }}>
            Switch to grid mode
          </button>
          <button style={{
            ...cvFont.ui, fontSize: 13, fontWeight: 500,
            padding: '6px 13px', borderRadius: 6,
            background: cvTokens.ink, color: cvTokens.bg,
            border: 'none', cursor: 'pointer',
          }}>
            Pause & save
          </button>
        </div>
      </header>

      {/* BODY: 2-col */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 380px',
        minHeight: 'calc(100% - 56px)',
      }}>
        {/* CONVERSATION COLUMN */}
        <div style={{
          padding: '32px 40px 0',
          maxWidth: 920,
          margin: '0 auto', width: '100%',
        }}>
          {/* Session header */}
          <div style={{ marginBottom: 28 }}>
            <span style={{
              ...cvFont.mono, fontSize: 11, fontWeight: 500, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: cvTokens.accent,
            }}>
              ◐  Conversational assessment · adaptive
            </span>
            <h1 style={{
              ...cvFont.serif, fontSize: 36, fontWeight: 400, letterSpacing: '-0.018em',
              lineHeight: 1.15, margin: '12px 0 0',
            }}>
              Tell me about <em style={{ color: cvTokens.accent }}>Generation's</em> risk
              posture. I'll capture the vectors as we talk.
            </h1>
            <p style={{
              fontSize: 14, color: cvTokens.inkSoft, marginTop: 10, maxWidth: 680, lineHeight: 1.55,
            }}>
              25 minutes, 10 pillars, adaptive depth. The 100 standards-aligned vectors are captured
              in the background — you'll see them appear in the right panel. Skip what doesn't apply;
              I'll come back to it.
            </p>
          </div>

          {/* Transcript */}
          <div>
            {cvTurns.map((t, i) => {
              if (t.role === "captured") return <CvCaptureCard key={i} captured={t.captured} flag={t.flag} />;
              return <CvBubble key={i} role={t.role} time={t.time} citation={t.citation} suggestions={t.suggestions} evidence={t.evidence}>
                {t.text}
              </CvBubble>;
            })}
          </div>

          {/* Composer */}
          <div style={{
            position: 'sticky', bottom: 0,
            background: `linear-gradient(180deg, ${cvTokens.bg}00 0%, ${cvTokens.bg} 30%)`,
            paddingTop: 28, paddingBottom: 28,
          }}>
            <div style={{
              background: cvTokens.panel,
              border: `1px solid ${cvTokens.borderStr}`,
              borderRadius: 14,
              padding: '14px 14px 10px',
              boxShadow: '0 4px 18px rgba(26, 24, 21, 0.06)',
            }}>
              <div style={{
                fontSize: 14, color: cvTokens.inkSubtle, minHeight: 64,
                lineHeight: 1.5,
              }}>
                Type your answer · or paste a Slack thread, doc, or screenshot…
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                paddingTop: 10, borderTop: `1px solid ${cvTokens.border}`, marginTop: 4,
              }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[
                    <svg key="a" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 7h10M7 2v10"/></svg>,
                    <svg key="b" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 3h8v8H3z M3 6h8M6 3v8"/></svg>,
                    <svg key="c" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="7" cy="6" r="2"/><path d="M3 12c0-2 2-3 4-3s4 1 4 3"/></svg>,
                  ].map((icon, i) => (
                    <button key={i} style={{
                      width: 28, height: 28, borderRadius: 6,
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: cvTokens.inkMuted,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    }}>{icon}</button>
                  ))}
                  <span style={{ ...cvFont.mono, fontSize: 10.5, color: cvTokens.inkSubtle, padding: '6px 10px' }}>
                    attach · screenshot · paste
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ ...cvFont.mono, fontSize: 10.5, color: cvTokens.inkMuted }}>
                    ⌘ + ↵ to send
                  </span>
                  <button style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: cvTokens.ink, color: cvTokens.bg,
                    border: 'none', cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 7l10-5-3 12-2-5z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT RAIL: Capture state */}
        <aside style={{
          background: cvTokens.panelAlt,
          borderLeft: `1px solid ${cvTokens.border}`,
          padding: '32px 24px',
          display: 'flex', flexDirection: 'column', gap: 24,
        }}>
          {/* Coverage hero */}
          <div>
            <span style={{
              ...cvFont.mono, fontSize: 10.5, fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: cvTokens.inkMuted,
            }}>
              Live capture
            </span>
            <div style={{
              marginTop: 12, display: 'flex', alignItems: 'center', gap: 18,
            }}>
              <CvCoverageRing captured={totalCaptured} total={100} />
              <div style={{ flex: 1 }}>
                <div style={{
                  ...cvFont.ui, fontSize: 13, fontWeight: 500, color: cvTokens.ink,
                  marginBottom: 6,
                }}>
                  18 of 100 vectors
                </div>
                <div style={{ fontSize: 12, color: cvTokens.inkSoft, lineHeight: 1.5 }}>
                  Estimated{' '}
                  <strong style={{ color: cvTokens.ink }}>~18 min</strong>
                  {' '}remaining at current pace.
                </div>
                <div style={{
                  marginTop: 8, ...cvFont.mono, fontSize: 10.5, color: cvTokens.warn,
                  fontWeight: 500,
                }}>
                  ⚑ 1 flag open: culture concern
                </div>
              </div>
            </div>
          </div>

          {/* Pillar coverage */}
          <div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              marginBottom: 6,
            }}>
              <span style={{
                ...cvFont.mono, fontSize: 10.5, fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: cvTokens.inkMuted,
              }}>
                Pillar coverage
              </span>
              <span style={{ ...cvFont.mono, fontSize: 10.5, color: cvTokens.inkSubtle }}>
                jump ›
              </span>
            </div>
            <div>
              {pillarCov.map(p => (
                <CvPillarCov key={p.id} {...p} />
              ))}
            </div>
          </div>

          {/* Live insight */}
          <div style={{
            background: cvTokens.panel,
            border: `1px solid ${cvTokens.border}`,
            borderRadius: 10, padding: 14,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill={cvTokens.accent}>
                <path d="M6 1l1.2 3.4L10.5 5.5 7.2 6.8 6 10 4.8 6.8 1.5 5.5 4.8 4.4z"/>
              </svg>
              <span style={{ ...cvFont.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: cvTokens.accent }}>
                Live insight
              </span>
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.5, color: cvTokens.inkSoft, margin: 0 }}>
              Three of your last five answers point at <strong style={{ color: cvTokens.ink }}>escalation
              culture</strong> as a structural weak spot. When we reach Pillar 9, I'll probe vectors
              82, 88, and 90 specifically.
            </p>
          </div>

          {/* Footer hint */}
          <div style={{ marginTop: 'auto', ...cvFont.mono, fontSize: 10.5, color: cvTokens.inkMuted, lineHeight: 1.5 }}>
            All evidence and audio is encrypted and stored against your assessment ID.
            <span style={{ display: 'block', marginTop: 4, color: cvTokens.inkSubtle }}>
              SESSION · ASM-2026-0519-GEN
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
};

window.DirectionF = DirectionF;

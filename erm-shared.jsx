/* Shared data + helpers for the 3 ERM direction mocks.
   Same payload across all artboards so we're comparing apples to apples. */

const ERM_DATA = {
  entityName: "Generation",
  entityId: "GEN",
  benchmark: "Industry",
  overallScore: 3.34,
  benchmarkAverage: 3.55,
  alignedPillars: 2,
  activeRoadmap: 12,
  criticalRegressions: 3,
  status: "VECTOR_DRIFT",
  pillars: [
    { id: "lead",    name: "Leadership & Governance",        short: "LEAD",    score: 3.78, target: 3.80 },
    { id: "strat",   name: "Strategy & Integration",         short: "STRAT",   score: 3.42, target: 3.70 },
    { id: "scope",   name: "Scope, Context & Criteria",      short: "SCOPE",   score: 3.15, target: 3.50 },
    { id: "ident",   name: "Risk Identification",            short: "IDENT",   score: 3.85, target: 3.50 },
    { id: "assess",  name: "Risk Assessment",                short: "ASSESS",  score: 3.60, target: 3.80 },
    { id: "treat",   name: "Risk Treatment",                 short: "TREAT",   score: 2.95, target: 3.60 },
    { id: "monitor", name: "Monitoring & Review",            short: "MONITR",  score: 3.20, target: 3.50 },
    { id: "report",  name: "Recording & Reporting",          short: "REPORT",  score: 3.55, target: 3.40 },
    { id: "culture", name: "Risk Culture",                   short: "CULTUR",  score: 2.78, target: 3.30 },
    { id: "improve", name: "Continuous Improvement",         short: "IMPRV",   score: 3.10, target: 3.40 },
  ],
  dimensions: [
    { id: "People",     name: "People",     score: 2.96 },
    { id: "Process",    name: "Process",    score: 3.42 },
    { id: "Technology", name: "Technology", score: 3.51 },
    { id: "Governance", name: "Governance", score: 3.60 },
  ],
  regressions: [
    { pillar: "Risk Culture",         delta: -0.42, prev: 3.20, curr: 2.78, when: "07d" },
    { pillar: "Risk Treatment",       delta: -0.31, prev: 3.26, curr: 2.95, when: "14d" },
    { pillar: "Monitoring & Review",  delta: -0.18, prev: 3.38, curr: 3.20, when: "21d" },
  ],
  roadmap: [
    { phase: 1, name: "Codify risk-culture survey cadence",      pillar: "Culture", uplift: 0.34, effort: "Low",    timeline: "Q2 2026" },
    { phase: 1, name: "Treatment-plan template + owner ledger",  pillar: "Treat",   uplift: 0.28, effort: "Medium", timeline: "Q2 2026" },
    { phase: 1, name: "KRI threshold review board",              pillar: "Monitor", uplift: 0.22, effort: "Low",    timeline: "Q2 2026" },
    { phase: 2, name: "Cross-BU scenario library",               pillar: "Assess",  uplift: 0.19, effort: "Medium", timeline: "Q3 2026" },
    { phase: 2, name: "Vendor & supply-chain risk register",     pillar: "Ident",   uplift: 0.16, effort: "High",   timeline: "Q3 2026" },
    { phase: 3, name: "Automated drift alerts to leadership",    pillar: "Lead",    uplift: 0.14, effort: "Medium", timeline: "Q4 2026" },
  ],
};

// Compute heat grid (pillar × dimension) with synthetic but plausible cell scores.
// Each cell varies its pillar's score by ±0.5 based on dimension index, deterministic.
function buildHeat(data) {
  const dims = data.dimensions.map(d => d.id);
  return data.pillars.map(p => ({
    pillar: p,
    cells: dims.map((d, i) => {
      const drift = (i - 1.5) * 0.18 + ((p.id.charCodeAt(0) % 5) - 2) * 0.08;
      const v = Math.max(1, Math.min(5, p.score + drift));
      return { dim: d, score: +v.toFixed(2) };
    }),
  }));
}

const ERM_HEAT = buildHeat(ERM_DATA);

// Cubic-bezier easing for smooth motion
const EASE = [0.22, 1, 0.36, 1];

// Build radar polygon points (10 vertices for 10 pillars)
function radarPoints(values, max, cx, cy, r) {
  const n = values.length;
  return values
    .map((v, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      const ratio = v / max;
      const x = cx + Math.cos(a) * r * ratio;
      const y = cy + Math.sin(a) * r * ratio;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function radarLabelPos(i, n, cx, cy, r, pad = 18) {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  return { x: cx + Math.cos(a) * (r + pad), y: cy + Math.sin(a) * (r + pad), a };
}

// Severity classifier — used everywhere
function severity(score, target) {
  if (score >= target) return "ok";
  if (score >= target * 0.85) return "warn";
  return "crit";
}

Object.assign(window, {
  ERM_DATA, ERM_HEAT, EASE,
  radarPoints, radarLabelPos, severity,
});

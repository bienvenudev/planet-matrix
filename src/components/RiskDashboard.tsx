"use client";
import { useEffect, useMemo, useState } from "react";

/* ─── Data ────────────────────────────────────────────────── */
const RISKS = [
  { name: "Water Leakage", score: 18, level: "low", label: "Low", color: "var(--risk-green)",
    icon: <path d="M12 2.69 5.6 9.09a9 9 0 1 0 12.8 0z" /> },
  { name: "Carbon Emissions", score: 52, level: "medium", label: "Medium", color: "var(--risk-yellow)",
    icon: <path d="M17.5 19a4.5 4.5 0 1 0 0-9 6 6 0 0 0-11.6 1.5A4 4 0 0 0 6 19z" /> },
  { name: "Energy Waste", score: 74, level: "high-o", label: "High", color: "var(--risk-orange)",
    icon: <path d="m13 2-8 11h6l-1 9 8-11h-6z" /> },
  { name: "Supply Chain Risk", score: 88, level: "high-r", label: "High", color: "var(--risk-red)",
    icon: <><path d="M3 7h13v10H3zM16 10h3l2 3v4h-5z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></> },
];

const ALERTS = [
  { sev: "high", src: "Supply Chain", tag: "Scope 3", time: "14:32", conf: 96,
    msg: <>Tier-1 vendor emissions spiked <b>+23%</b> vs. 30-day baseline.</> },
  { sev: "med", src: "Energy", tag: "Plant 04", time: "14:18", conf: 81,
    msg: <>kWh draw exceeded forecast band for 40 min during off-shift.</> },
  { sev: "high", src: "Carbon", tag: "EU region", time: "13:40", conf: 88,
    msg: <>Scope 2 grid emission factor drift detected — recalc advised.</> },
  { sev: "low", src: "Water", tag: "Sensor #12", time: "13:55", conf: 72,
    msg: <>Flow sensor auto-recalibrated; readings back within range.</> },
  { sev: "info", src: "System", tag: "Climate API", time: "13:12", conf: null,
    msg: <>Auth token expiring in 2 days — disclosure feed at risk.</> },
];

const TREND = [42, 46, 44, 51, 55, 62, 67];
const RING_R = 58;
const RING_C = 2 * Math.PI * RING_R;
const SCORE_PCT = 0.82;

/* Trend line/area path (matches the prototype's math) */
function useTrend() {
  return useMemo(() => {
    const W = 560, H = 220, PAD = 8, n = TREND.length, max = 80, min = 30;
    const pts = TREND.map((v, i) => [
      PAD + (i / (n - 1)) * (W - PAD * 2),
      H - PAD - ((v - min) / (max - min)) * (H - PAD * 2),
    ]);
    const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    const area = `${line} L${pts[n - 1][0].toFixed(1)} ${H} L${pts[0][0].toFixed(1)} ${H} Z`;
    const grid = [0, 1, 2, 3].map((g) => (PAD + (g / 3) * (H - PAD * 2)).toFixed(1));
    return { W, H, line, area, grid, lastX: pts[n - 1][0].toFixed(1), lastY: pts[n - 1][1].toFixed(1) };
  }, []);
}

export default function RiskDashboard() {
  const [on, setOn] = useState(false);
  const trend = useTrend();
  useEffect(() => {
    const t = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className="risk-root">
      <style>{css}</style>
      <div className="risk-inner">

        {/* Top bar */}
        <div className="risk-topbar">
          <div className="risk-tb-left">
            <div className="risk-tb-icon">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 3 6v6c0 5 3.8 8.4 9 10 5.2-1.6 9-5 9-10V6z" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
            </div>
            <div>
              <h1>Risk Analysis</h1>
              <p className="risk-tb-sub">Exposure modeling &amp; AI anomaly detection · Q2 2026</p>
            </div>
          </div>
          <div className="risk-tb-right">
            <div className="risk-seg">
              <button>24h</button>
              <button className="on">7d</button>
              <button>30d</button>
            </div>
            <div className="risk-pill-live"><span className="risk-pulse" />Live monitoring</div>
          </div>
        </div>

        {/* Grid */}
        <div className="risk-grid">

          {/* Column 1: Score + Risk exposure */}
          <div className="risk-col">
            {/* ESG Score */}
            <div className="risk-card">
              <div className="risk-card-head">
                <div className="risk-ttl"><h2>ESG Score</h2><span className="risk-sub">Composite · weighted by exposure</span></div>
                <span className="risk-chip">vs. industry · +6</span>
              </div>
              <div className="risk-score-body">
                <div className="risk-ring-wrap">
                  <svg width="132" height="132" viewBox="0 0 132 132">
                    <circle cx="66" cy="66" r={RING_R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="11" />
                    <circle cx="66" cy="66" r={RING_R} fill="none" stroke="#7c3aed" strokeWidth="11" strokeLinecap="round" transform="rotate(-90 66 66)"
                      style={{ strokeDasharray: RING_C, strokeDashoffset: on ? RING_C * (1 - SCORE_PCT) : RING_C, transition: "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)" }} />
                  </svg>
                  <div className="risk-ring-center"><span className="risk-ring-val">82</span><span className="risk-ring-max">/ 100</span></div>
                </div>
                <div className="risk-score-meta">
                  <div className="risk-score-row">
                    <span className="risk-score-label">Rating</span>
                    <div className="risk-grade">
                      <span className="risk-g">A−</span>
                      <span className="risk-delta"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 15 6-6 6 6" /></svg>4 pts</span>
                    </div>
                  </div>
                  <div className="risk-pct-row">
                    <div className="risk-pct"><span className="risk-n">88</span><span className="risk-l">Environmental</span></div>
                    <div className="risk-pct"><span className="risk-n">79</span><span className="risk-l">Social</span></div>
                    <div className="risk-pct"><span className="risk-n">80</span><span className="risk-l">Governance</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk exposure */}
            <div className="risk-card risk-exposure">
              <div className="risk-card-head">
                <div className="risk-ttl"><h2>Risk Exposure</h2><span className="risk-sub">Modeled risk index by category</span></div>
                <span className="risk-chip">4 categories</span>
              </div>
              <div className="risk-list">
                {RISKS.map((r, i) => (
                  <div className="risk-item" key={r.name}>
                    <div className="risk-top">
                      <div className="risk-name">
                        <span className="risk-ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{r.icon}</svg></span>
                        {r.name}
                      </div>
                      <div className="risk-right"><span className="risk-score-v">{r.score}</span><span className={`risk-level ${r.level}`}>{r.label}</span></div>
                    </div>
                    <div className="risk-track"><div className="risk-fill" style={{ background: r.color, width: on ? `${r.score}%` : 0, transitionDelay: `${120 + i * 90}ms` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Exposure trend */}
          <div className="risk-col">
            <div className="risk-card risk-trend-card">
              <div className="risk-card-head">
                <div className="risk-ttl"><h2>Exposure Trend</h2><span className="risk-sub">Composite risk index · 7-day</span></div>
                <span className="risk-chip risk-chip-warn">▲ +9 this week</span>
              </div>
              <div className="risk-trend-body">
                <div className="risk-trend-top">
                  <span className="risk-trend-big">58</span>
                  <span className="risk-trend-cap">avg risk index · all categories</span>
                </div>
                <svg className="risk-trend-svg" viewBox={`0 0 ${trend.W} ${trend.H}`} preserveAspectRatio="none">
                  <defs><linearGradient id="risk-tg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#7c3aed" stopOpacity="0.28" />
                    <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
                  </linearGradient></defs>
                  {trend.grid.map((y, i) => (<line key={i} x1="0" y1={y} x2={trend.W} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />))}
                  <path d={trend.area} fill="url(#risk-tg)" />
                  <path d={trend.line} fill="none" stroke="#9b6bff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx={trend.lastX} cy={trend.lastY} r="4.5" fill="#0d0b18" stroke="#9b6bff" strokeWidth="2.4" />
                </svg>
                <div className="risk-trend-x"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
                <div className="risk-trend-stats">
                  <div><div className="risk-stat-n">+23%</div><div className="risk-stat-l">Supply chain QoQ</div></div>
                  <div><div className="risk-stat-n">2</div><div className="risk-stat-l">Categories above threshold</div></div>
                  <div><div className="risk-stat-n">94%</div><div className="risk-stat-l">Model confidence</div></div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: AI anomaly feed */}
          <div className="risk-card risk-feed-card">
            <div className="risk-card-head">
              <div className="risk-ttl"><h2>AI Anomaly Detection</h2><span className="risk-sub">Auto-flagged from live streams</span></div>
              <span className="risk-chip risk-chip-ai">5 new</span>
            </div>
            <div className="risk-feed">
              <div className="risk-feed-list">
                {ALERTS.map((a, i) => (
                  <div className="risk-alert" key={i}>
                    <span className={`risk-sev ${a.sev}`} />
                    <div className="risk-alert-body">
                      <div className="risk-a-top"><span className="risk-a-src">{a.src}</span><span className="risk-a-tag">{a.tag}</span><span className="risk-a-time">{a.time}</span></div>
                      <div className="risk-a-msg">{a.msg}</div>
                      {a.conf != null && (
                        <div className="risk-a-conf"><span className="risk-conf-bar"><i style={{ width: `${a.conf}%` }} /></span>{a.conf}% confidence</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="risk-feed-foot">
                <span className="risk-ai">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b794ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v2M12 19v2M5 12H3M21 12h-2" /><circle cx="12" cy="12" r="4" /></svg>
                  Model · esg-anomaly-v3
                </span>
                <span>scanning 212 datapoints</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── Scoped styles — mobile-first, reflows on its own width ── */
const css = `
.risk-root {
  --risk-bg: #0d0b18;
  --risk-surface: #1a1530;
  --risk-surface-2: #211a3d;
  --risk-border: rgba(255,255,255,0.07);
  --risk-border-strong: rgba(255,255,255,0.11);
  --risk-accent-soft: rgba(124,58,237,0.16);
  --risk-text: #ECEAF6;
  --risk-text-mid: #A39FBB;
  --risk-text-dim: #6F6A87;
  --risk-green: #34D399;
  --risk-yellow: #FBBF24;
  --risk-orange: #FB923C;
  --risk-red: #F4544E;
  --risk-mono: 'Geist Mono', ui-monospace, monospace;
  container-type: inline-size;
  width: 100%;
  background: var(--risk-bg);
  font-family: 'Geist', system-ui, -apple-system, sans-serif;
  color: var(--risk-text);
  -webkit-font-smoothing: antialiased;
  text-align: left;
}
.risk-root * { box-sizing: border-box; }

.risk-inner { width: 100%; display: flex; flex-direction: column; gap: 16px; padding: 18px; }

/* Top bar */
.risk-topbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.risk-tb-left { display: flex; align-items: center; gap: 13px; min-width: 0; }
.risk-tb-icon { width: 38px; height: 38px; border-radius: 11px; background: var(--risk-accent-soft); border: 1px solid rgba(124,58,237,0.35); display: flex; align-items: center; justify-content: center; color: #b794ff; flex-shrink: 0; }
.risk-tb-left h1 { font-size: 18px; font-weight: 600; letter-spacing: -0.012em; color: var(--risk-text); line-height: 1.15; }
.risk-tb-left p { font-size: 12px; color: var(--risk-text-dim); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.risk-tb-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.risk-seg { display: flex; background: var(--risk-surface); border: 1px solid var(--risk-border); border-radius: 9px; padding: 3px; }
.risk-seg button { font-family: inherit; font-size: 12px; font-weight: 500; color: var(--risk-text-dim); background: transparent; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; }
.risk-seg button.on { background: var(--risk-surface-2); color: var(--risk-text); box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset; }
.risk-pill-live { display: flex; align-items: center; gap: 8px; height: 34px; padding: 0 13px; background: var(--risk-surface); border: 1px solid var(--risk-border); border-radius: 9px; font-size: 12px; color: var(--risk-text-mid); font-weight: 500; white-space: nowrap; }
.risk-pulse { position: relative; width: 8px; height: 8px; flex-shrink: 0; }
.risk-pulse::before, .risk-pulse::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: var(--risk-green); }
.risk-pulse::after { animation: riskping 1.8s cubic-bezier(0,0,0.2,1) infinite; }
@keyframes riskping { 0% { transform: scale(1); opacity: 0.7; } 80%,100% { transform: scale(2.6); opacity: 0; } }

/* Grid — mobile-first: single stacked column */
.risk-grid { display: flex; flex-direction: column; gap: 16px; min-height: 0; }
.risk-col { display: flex; flex-direction: column; gap: 16px; min-height: 0; }

.risk-card { background: var(--risk-surface); border: 1px solid var(--risk-border); border-radius: 15px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 24px 60px -50px rgba(0,0,0,0.8); }
.risk-card-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 15px 17px 13px; border-bottom: 1px solid var(--risk-border); flex-shrink: 0; }
.risk-ttl { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.risk-ttl h2 { font-size: 14px; font-weight: 600; color: var(--risk-text); letter-spacing: -0.005em; }
.risk-ttl .risk-sub { font-size: 11px; color: var(--risk-text-dim); }
.risk-chip { font-size: 10px; font-weight: 500; color: var(--risk-text-mid); background: var(--risk-surface-2); border: 1px solid var(--risk-border); border-radius: 999px; padding: 4px 9px; white-space: nowrap; flex-shrink: 0; }
.risk-chip-warn { color: var(--risk-orange); border-color: rgba(251,146,60,0.3); background: rgba(251,146,60,0.1); }
.risk-chip-ai { color: #b794ff; border-color: rgba(124,58,237,0.35); background: var(--risk-accent-soft); }

/* ESG score */
.risk-score-body { display: flex; flex-wrap: wrap; align-items: center; gap: 22px; padding: 18px; }
.risk-ring-wrap { position: relative; width: 132px; height: 132px; flex-shrink: 0; }
.risk-ring-wrap svg { display: block; }
.risk-ring-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.risk-ring-val { font-size: 30px; font-weight: 700; color: var(--risk-text); letter-spacing: -0.02em; line-height: 1; }
.risk-ring-max { font-size: 11.5px; color: var(--risk-text-dim); margin-top: 4px; font-family: var(--risk-mono); }
.risk-score-meta { display: flex; flex-direction: column; gap: 13px; min-width: 0; }
.risk-score-row { display: flex; flex-direction: column; gap: 4px; }
.risk-score-label { font-size: 11px; color: var(--risk-text-dim); text-transform: uppercase; letter-spacing: 0.06em; }
.risk-grade { display: flex; align-items: center; gap: 10px; }
.risk-grade .risk-g { font-size: 21px; font-weight: 700; color: #b794ff; letter-spacing: -0.01em; }
.risk-delta { display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 500; color: var(--risk-green); font-family: var(--risk-mono); }
.risk-pct-row { display: flex; gap: 18px; }
.risk-pct { display: flex; flex-direction: column; gap: 3px; }
.risk-pct .risk-n { font-family: var(--risk-mono); font-size: 13.5px; color: var(--risk-text); }
.risk-pct .risk-l { font-size: 11px; color: var(--risk-text-dim); }

/* Risk exposure bars */
.risk-list { padding: 6px 17px 14px; display: flex; flex-direction: column; }
.risk-item { padding: 13px 0; border-bottom: 1px solid var(--risk-border); }
.risk-item:last-child { border-bottom: none; }
.risk-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
.risk-name { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 500; color: var(--risk-text); min-width: 0; }
.risk-ic { width: 28px; height: 28px; border-radius: 8px; background: var(--risk-surface-2); border: 1px solid var(--risk-border-strong); display: flex; align-items: center; justify-content: center; color: var(--risk-text-mid); flex-shrink: 0; }
.risk-right { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.risk-score-v { font-family: var(--risk-mono); font-size: 12.5px; color: var(--risk-text-mid); }
.risk-level { font-size: 10px; font-weight: 600; padding: 3px 9px; border-radius: 999px; text-transform: capitalize; letter-spacing: 0.01em; white-space: nowrap; }
.risk-level.low { color: var(--risk-green); background: rgba(52,211,153,0.13); border: 1px solid rgba(52,211,153,0.25); }
.risk-level.medium { color: var(--risk-yellow); background: rgba(251,191,36,0.13); border: 1px solid rgba(251,191,36,0.26); }
.risk-level.high-o { color: var(--risk-orange); background: rgba(251,146,60,0.13); border: 1px solid rgba(251,146,60,0.28); }
.risk-level.high-r { color: var(--risk-red); background: rgba(244,84,78,0.14); border: 1px solid rgba(244,84,78,0.3); }
.risk-track { height: 9px; border-radius: 999px; background: var(--risk-bg); overflow: hidden; box-shadow: inset 0 0 0 1px var(--risk-border); }
.risk-fill { height: 100%; border-radius: 999px; width: 0; transition: width 0.9s cubic-bezier(0.22,1,0.36,1); }

/* Exposure trend */
.risk-trend-body { flex: 1; min-height: 0; padding: 16px 17px; display: flex; flex-direction: column; }
.risk-trend-top { display: flex; align-items: baseline; gap: 9px; flex-wrap: wrap; }
.risk-trend-big { font-size: 30px; font-weight: 700; letter-spacing: -0.02em; color: var(--risk-text); font-family: var(--risk-mono); line-height: 1; }
.risk-trend-cap { font-size: 12px; color: var(--risk-text-dim); }
.risk-trend-svg { width: 100%; height: 170px; margin-top: 14px; display: block; }
.risk-trend-x { display: flex; justify-content: space-between; font-family: var(--risk-mono); font-size: 10.5px; color: var(--risk-text-dim); margin-top: 6px; }
.risk-trend-stats { display: flex; gap: 16px; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--risk-border); }
.risk-trend-stats > div { flex: 1; min-width: 0; }
.risk-stat-n { font-family: var(--risk-mono); font-size: 16px; color: var(--risk-text); }
.risk-stat-l { font-size: 11px; color: var(--risk-text-dim); margin-top: 3px; line-height: 1.3; }

/* Anomaly feed */
.risk-feed { flex: 1; display: flex; flex-direction: column; min-height: 0; }
.risk-feed-list { padding: 4px 0; }
.risk-alert { display: flex; gap: 12px; padding: 13px 17px; border-bottom: 1px solid var(--risk-border); }
.risk-alert:last-child { border-bottom: none; }
.risk-sev { width: 9px; height: 9px; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
.risk-sev.high { background: var(--risk-red); box-shadow: 0 0 0 4px rgba(244,84,78,0.14); }
.risk-sev.med { background: var(--risk-yellow); box-shadow: 0 0 0 4px rgba(251,191,36,0.13); }
.risk-sev.low { background: var(--risk-green); box-shadow: 0 0 0 4px rgba(52,211,153,0.12); }
.risk-sev.info { background: var(--risk-text-dim); }
.risk-alert-body { flex: 1; min-width: 0; }
.risk-a-top { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
.risk-a-src { font-size: 11.5px; font-weight: 600; color: var(--risk-text); }
.risk-a-tag { font-size: 10px; font-weight: 500; color: var(--risk-text-dim); background: var(--risk-surface-2); border: 1px solid var(--risk-border); border-radius: 5px; padding: 1px 7px; }
.risk-a-time { margin-left: auto; font-family: var(--risk-mono); font-size: 11px; color: var(--risk-text-dim); }
.risk-a-msg { font-size: 12px; color: var(--risk-text-mid); line-height: 1.45; }
.risk-a-msg b { color: var(--risk-text); }
.risk-a-conf { display: flex; align-items: center; gap: 6px; margin-top: 8px; font-family: var(--risk-mono); font-size: 10.5px; color: var(--risk-text-dim); }
.risk-conf-bar { width: 54px; height: 4px; border-radius: 2px; background: var(--risk-bg); box-shadow: inset 0 0 0 1px var(--risk-border); overflow: hidden; }
.risk-conf-bar i { display: block; height: 100%; background: #9b6bff; border-radius: 2px; }
.risk-feed-foot { margin-top: auto; padding: 12px 17px; border-top: 1px solid var(--risk-border); display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 11px; color: var(--risk-text-dim); flex-shrink: 0; }
.risk-feed-foot .risk-ai { display: flex; align-items: center; gap: 7px; color: var(--risk-text-mid); }

/* ── Very narrow: strip secondary detail ── */
@container (max-width: 460px) {
  .risk-inner { padding: 14px; gap: 13px; }
  .risk-tb-sub { display: none; }
  .risk-pill-live { display: none; }
}

/* ── Roomy: 3-column dashboard. Natural height (no fixed aspect-ratio) so
   content is never clipped — the outer frame scrolls when it overflows. ── */
@container (min-width: 680px) {
  .risk-grid { display: grid; grid-template-columns: 1fr 1fr 0.92fr; gap: 18px; }
  .risk-exposure { flex: 1; min-height: 0; }
  .risk-trend-card { flex: 1; min-height: 0; }
  .risk-trend-svg { flex: 1; min-height: 120px; }
  .risk-feed-card { min-height: 0; }
  /* score ring + meta stack vertically in the narrow column */
  .risk-score-body { flex-direction: column; align-items: center; text-align: center; gap: 14px; }
  .risk-score-row { align-items: center; }
  .risk-grade { justify-content: center; }
}
`;

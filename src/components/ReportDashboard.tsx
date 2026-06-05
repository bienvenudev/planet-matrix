"use client";
import { useEffect, useMemo, useState } from "react";

/* ─── Data (from the design) ──────────────────────────────── */
const DONUT = [
  { key: "s3", color: "var(--crd-s3)", frac: 0.55, start: 0 },
  { key: "s2", color: "var(--crd-s2)", frac: 0.27, start: 0.55 },
  { key: "s1", color: "var(--crd-s1)", frac: 0.18, start: 0.82 },
];

const LEGEND = [
  { color: "var(--crd-s1)", nm: "Scope 1 · Direct",      v: "0.797" },
  { color: "var(--crd-s2)", nm: "Scope 2 · Energy",      v: "1.196" },
  { color: "var(--crd-s3)", nm: "Scope 3 · Value chain", v: "2.437" },
];

const FRAMEWORKS = [
  { code: "CSRD", full: "Corporate Sustainability Reporting Directive", pct: 78, status: "prog", label: "In progress" },
  { code: "PCAF", full: "Partnership for Carbon Accounting Financials", pct: 91, status: "ready", label: "Ready" },
  { code: "SFDR", full: "Sustainable Finance Disclosure Regulation", pct: 65, status: "prog", label: "In progress" },
  { code: "GRI", full: "Global Reporting Initiative Standards", pct: 84, status: "prog", label: "In progress" },
];

/* Stacked-area series (declining totals across 2022–2024) */
const S3 = [3.2, 3.0, 2.95, 2.85, 2.8, 2.7, 2.62, 2.58, 2.553];
const S2 = [1.55, 1.5, 1.46, 1.42, 1.4, 1.35, 1.3, 1.27, 1.254];
const S1 = [1.12, 1.08, 1.02, 0.98, 0.94, 0.9, 0.87, 0.85, 0.836];

/* ─── Donut geometry ──────────────────────────────────────── */
const R = 46;
const CIRC = 2 * Math.PI * R;
const GAP = 0.012;

/* ─── Stacked-area paths (matches the prototype's math) ───── */
function useAreaPaths() {
  return useMemo(() => {
    const W = 720, H = 300, PAD = 6, n = S1.length;
    const totals = S1.map((_, i) => S1[i] + S2[i] + S3[i]);
    const maxT = Math.max(...totals) * 1.08;
    const x = (i: number) => PAD + (i / (n - 1)) * (W - PAD * 2);
    const y = (v: number) => H - PAD - (v / maxT) * (H - PAD * 2);

    const band = (lower: number[], upper: number[]) => {
      let d = "";
      upper.forEach((v, i) => { d += (i ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1) + " "; });
      for (let i = n - 1; i >= 0; i--) d += "L" + x(i).toFixed(1) + " " + y(lower[i]).toFixed(1) + " ";
      return d + "Z";
    };

    const base = new Array(n).fill(0);
    const c3 = S3.map((v) => v);
    const c2 = S3.map((v, i) => v + S2[i]);
    const c1 = totals;

    const grid: string[] = [];
    for (let g = 0; g <= 3; g++) grid.push((PAD + (g / 3) * (H - PAD * 2)).toFixed(1));

    let tline = "";
    totals.forEach((v, i) => { tline += (i ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1) + " "; });

    return {
      W, H,
      grid,
      band3: band(base, c3),
      band2: band(c3, c2),
      band1: band(c2, c1),
      tline,
      lastX: x(n - 1).toFixed(1),
      lastY: y(totals[n - 1]).toFixed(1),
    };
  }, []);
}

export default function ReportDashboard() {
  const [on, setOn] = useState(false);
  const area = useAreaPaths();

  useEffect(() => {
    const t = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className="crd-root">
      <style>{css}</style>
      <div className="crd-inner">

      {/* Header */}
      <div className="crd-head">
        <div className="crd-head-left">
          <div className="crd-head-ic">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="m9 15 2 2 4-4" /></svg>
          </div>
          <div>
            <h1>Compliance Reporting</h1>
            <p>Carbon disclosure &amp; framework readiness · FY2024 · audit-ready</p>
          </div>
        </div>
        <div className="crd-ai-tag">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v2M12 19v2M5 12H3M21 12h-2" /><circle cx="12" cy="12" r="4" /></svg>
          <span><b>78%</b> automated via AI</span>
        </div>
      </div>

      {/* Grid */}
      <div className="crd-grid">

        {/* Donut */}
        <div className="crd-card crd-area-donut">
          <div className="crd-chead">
            <div className="crd-ttl"><h2>Carbon Footprint</h2><div className="crd-sub">By emission scope · FY2024</div></div>
            <span className="crd-chip">tCO₂e</span>
          </div>
          <div className="crd-donut-body">
            <div className="crd-donut-wrap">
              <svg width="118" height="118" viewBox="0 0 118 118">
                <circle cx="59" cy="59" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
                {DONUT.map((seg) => {
                  const len = Math.max(0, seg.frac - GAP) * CIRC;
                  return (
                    <circle
                      key={seg.key}
                      className="crd-donut-seg"
                      cx="59" cy="59" r={R} fill="none"
                      stroke={seg.color} strokeWidth="14" strokeLinecap="butt"
                      transform={`rotate(${seg.start * 360 - 90} 59 59)`}
                      style={{
                        strokeDasharray: `${len} ${CIRC - len}`,
                        strokeDashoffset: on ? 0 : CIRC,
                      }}
                    />
                  );
                })}
              </svg>
              <div className="crd-donut-center">
                <span className="crd-total">4.43</span>
                <span className="crd-unit">tCO₂e total</span>
                <span className="crd-cap">↓ 11% YoY</span>
              </div>
            </div>
            <div className="crd-legend-rows">
              {LEGEND.map((l) => (
                 <div className="crd-lrow" key={l.nm}>
                   <span className="crd-dot" style={{ background: l.color }} />
                   <span className="crd-nm">{l.nm}</span>
                   <span className="crd-v">{l.v}</span>
                 </div>
              ))}
            </div>
          </div>
        </div>

        {/* Area chart */}
        <div className="crd-card crd-area-chart-card">
          <div className="crd-chead">
            <div className="crd-ttl"><h2>Emissions Over Time</h2><div className="crd-sub">Stacked by scope · monthly</div></div>
            <span className="crd-chip">2022 — 2024</span>
          </div>
          <div className="crd-area-body">
            <div className="crd-area-top">
              <span className="crd-big">4.43</span>
              <span className="crd-dl">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                11% YoY
              </span>
              <span className="crd-area-cap">peak 5.870 · Mar 2022</span>
            </div>
            <div className="crd-area-chart">
              <svg viewBox={`0 0 ${area.W} ${area.H}`} preserveAspectRatio="none">
                {area.grid.map((yy, i) => (
                  <line key={i} x1="0" y1={yy} x2={area.W} y2={yy} stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
                ))}
                <path d={area.band3} fill="rgba(86,80,115,0.55)" />
                <path d={area.band2} fill="rgba(183,148,255,0.5)" />
                <path d={area.band1} fill="rgba(124,58,237,0.55)" />
                <path d={area.tline} fill="none" stroke="#cbb6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                <circle cx={area.lastX} cy={area.lastY} r="4" fill="#0d0b18" stroke="#cbb6ff" strokeWidth="2" />
              </svg>
            </div>
            <div className="crd-xaxis"><span>2022</span><span>2023</span><span>2024</span></div>
          </div>
        </div>

        {/* Frameworks */}
        <div className="crd-card crd-area-fw">
          <div className="crd-chead">
            <div className="crd-ttl"><h2>Framework Completion</h2><div className="crd-sub">Disclosure readiness by standard</div></div>
            <span className="crd-chip crd-chip-accent">4 active</span>
          </div>
          <div className="crd-fw-list">
            {FRAMEWORKS.map((f, i) => (
              <div className="crd-fw" key={f.code}>
                <div className="crd-fw-top">
                  <div className="crd-fw-name"><span className="crd-code">{f.code}</span><span className="crd-full">{f.full}</span></div>
                  <div className="crd-fw-right">
                    <span className="crd-fw-pct">{f.pct}%</span>
                    <span className={`crd-fw-status ${f.status}`}>{f.label}</span>
                  </div>
                </div>
                <div className="crd-fw-track">
                  <div className="crd-fw-fill" style={{ width: on ? `${f.pct}%` : 0, transitionDelay: `${150 + i * 110}ms` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="crd-fw-foot">
            <span className="crd-ok">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              556 disclosures mapped
            </span>
            <span>next audit <b>Jul 2026</b></span>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}

/* ─── Scoped styles — mobile-first, reflows on its own width ── */
const css = `
.crd-root {
  --crd-bg: #0d0b18;
  --crd-surface: #1a1530;
  --crd-surface-2: #211a3d;
  --crd-border: rgba(255,255,255,0.07);
  --crd-border-strong: rgba(255,255,255,0.11);
  --crd-accent-soft: rgba(124,58,237,0.16);
  --crd-text: #ECEAF6;
  --crd-text-mid: #A39FBB;
  --crd-text-dim: #6F6A87;
  --crd-green: #34D399;
  --crd-s1: #7c3aed;
  --crd-s2: #b794ff;
  --crd-s3: #565073;
  --crd-mono: 'Geist Mono', ui-monospace, monospace;
  container-type: inline-size;
  width: 100%;
  background: var(--crd-bg);
  font-family: 'Geist', system-ui, -apple-system, sans-serif;
  color: var(--crd-text);
  -webkit-font-smoothing: antialiased;
  text-align: left;
}
.crd-root * { box-sizing: border-box; }

.crd-inner {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}

/* Header */
.crd-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-shrink: 0; }
.crd-head-left { display: flex; align-items: center; gap: 11px; min-width: 0; }
.crd-head-ic { width: 36px; height: 36px; border-radius: 10px; background: var(--crd-accent-soft); border: 1px solid rgba(124,58,237,0.35); display: flex; align-items: center; justify-content: center; color: #b794ff; flex-shrink: 0; }
.crd-head-left h1 { font-size: 16px; font-weight: 600; letter-spacing: -0.012em; color: var(--crd-text); line-height: 1.15; }
.crd-head-left p { font-size: 11px; color: var(--crd-text-dim); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.crd-ai-tag { display: flex; align-items: center; gap: 6px; height: 30px; padding: 0 11px; background: var(--crd-accent-soft); border: 1px solid rgba(124,58,237,0.35); border-radius: 9px; font-size: 11.5px; font-weight: 500; color: #c2a6ff; flex-shrink: 0; white-space: nowrap; }
.crd-ai-tag b { color: #fff; font-weight: 600; }

/* Grid — mobile-first: single stacked column */
.crd-grid { display: flex; flex-direction: column; gap: 12px; min-height: 0; }

.crd-card { background: var(--crd-surface); border: 1px solid var(--crd-border); border-radius: 13px; display: flex; flex-direction: column; overflow: hidden; min-height: 0; box-shadow: 0 24px 60px -50px rgba(0,0,0,0.8); }
.crd-chead { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 13px 15px 10px; border-bottom: 1px solid var(--crd-border); flex-shrink: 0; }
.crd-ttl h2 { font-size: 13.5px; font-weight: 600; color: var(--crd-text); letter-spacing: -0.005em; }
.crd-ttl .crd-sub { font-size: 10.5px; color: var(--crd-text-dim); margin-top: 2px; }
.crd-chip { font-size: 10px; font-weight: 500; color: var(--crd-text-mid); background: var(--crd-surface-2); border: 1px solid var(--crd-border); border-radius: 999px; padding: 4px 9px; white-space: nowrap; flex-shrink: 0; }
.crd-chip-accent { color: #c2a6ff; border-color: rgba(124,58,237,0.3); background: var(--crd-accent-soft); }

/* Donut */
.crd-donut-body { flex: 1; display: flex; align-items: center; gap: 14px; padding: 14px 16px; min-height: 0; }
.crd-donut-wrap { position: relative; width: 118px; height: 118px; flex-shrink: 0; }
.crd-donut-wrap svg { width: 100%; height: 100%; display: block; }
.crd-donut-seg { transition: stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1); }
.crd-donut-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.crd-donut-center .crd-total { font-size: 23px; font-weight: 700; color: var(--crd-text); letter-spacing: -0.02em; line-height: 1; font-family: var(--crd-mono); }
.crd-donut-center .crd-unit { font-size: 9.5px; color: var(--crd-text-dim); margin-top: 5px; }
.crd-donut-center .crd-cap { font-size: 9px; color: var(--crd-green); margin-top: 5px; }
.crd-legend-rows { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 11px; }
.crd-lrow { display: flex; align-items: center; gap: 8px; }
.crd-lrow .crd-dot { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
.crd-lrow .crd-nm { font-size: 11.5px; color: var(--crd-text-mid); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.crd-lrow .crd-pct { margin-left: auto; font-family: var(--crd-mono); font-size: 11px; color: var(--crd-text-mid); }
.crd-lrow .crd-v { font-family: var(--crd-mono); font-size: 11px; color: var(--crd-text); min-width: 46px; text-align: right; }

/* Area chart */
.crd-area-body { flex: 1; display: flex; flex-direction: column; padding: 14px 15px; min-height: 0; }
.crd-area-top { display: flex; align-items: baseline; gap: 9px; flex-shrink: 0; flex-wrap: wrap; }
.crd-area-top .crd-big { font-family: var(--crd-mono); font-size: 20px; font-weight: 700; color: var(--crd-text); letter-spacing: -0.02em; }
.crd-area-top .crd-dl { display: flex; align-items: center; gap: 3px; font-family: var(--crd-mono); font-size: 11.5px; font-weight: 500; color: var(--crd-green); }
.crd-area-top .crd-area-cap { font-size: 10.5px; color: var(--crd-text-dim); margin-left: auto; white-space: nowrap; }
.crd-area-chart { height: 120px; min-height: 0; margin-top: 10px; }
.crd-area-chart svg { width: 100%; height: 100%; display: block; }
.crd-xaxis { display: flex; justify-content: space-between; font-family: var(--crd-mono); font-size: 10px; color: var(--crd-text-dim); margin-top: 7px; padding: 0 2px; flex-shrink: 0; }

/* Frameworks */
.crd-fw-list { flex: 1; padding: 6px 15px; display: flex; flex-direction: column; justify-content: space-around; min-height: 0; }
.crd-fw { padding: 9px 0; border-bottom: 1px solid var(--crd-border); }
.crd-fw:last-child { border-bottom: none; }
.crd-fw-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
.crd-fw-name { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.crd-fw-name .crd-code { font-size: 12.5px; font-weight: 600; color: var(--crd-text); letter-spacing: -0.005em; }
.crd-fw-name .crd-full { font-size: 9.5px; color: var(--crd-text-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.crd-fw-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.crd-fw-pct { font-family: var(--crd-mono); font-size: 13px; font-weight: 500; color: var(--crd-text); }
.crd-fw-status { font-size: 8.5px; font-weight: 600; padding: 2px 7px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.03em; white-space: nowrap; }
.crd-fw-status.ready { color: var(--crd-green); background: rgba(52,211,153,0.13); border: 1px solid rgba(52,211,153,0.25); }
.crd-fw-status.prog { color: #c2a6ff; background: var(--crd-accent-soft); border: 1px solid rgba(124,58,237,0.3); }
.crd-fw-track { height: 7px; border-radius: 999px; background: var(--crd-bg); overflow: hidden; box-shadow: inset 0 0 0 1px var(--crd-border); }
.crd-fw-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #7c3aed, #9b6bff); width: 0; transition: width 1s cubic-bezier(0.22,1,0.36,1); }
.crd-fw-foot { padding: 11px 15px; border-top: 1px solid var(--crd-border); background: var(--crd-bg); display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 10.5px; color: var(--crd-text-dim); flex-shrink: 0; }
.crd-fw-foot b { color: var(--crd-text-mid); font-weight: 500; font-family: var(--crd-mono); }
.crd-fw-foot .crd-ok { display: flex; align-items: center; gap: 5px; color: var(--crd-green); }

/* ── Very narrow: strip secondary detail for a minimal dashboard ── */
@container (max-width: 430px) {
  .crd-inner { padding: 13px; gap: 10px; }
  .crd-head-left p { display: none; }
  .crd-fw-name .crd-full { display: none; }
  .crd-area-top .crd-area-cap { display: none; }
  .crd-fw-foot { display: none; }
  .crd-donut-body { flex-direction: column; gap: 12px; }
  .crd-legend-rows { width: 100%; }
}

/* ── Roomy: restore the side-by-side 2-column dashboard ── */
@container (min-width: 600px) {
  .crd-inner { aspect-ratio: 16 / 10.4; gap: 14px; }
  .crd-grid { flex: 1; display: grid; grid-template-columns: 1.32fr 1fr; grid-template-rows: 1fr 1fr; gap: 14px; }
  .crd-area-donut { grid-column: 1; grid-row: 1; }
  .crd-area-chart-card { grid-column: 1; grid-row: 2; }
  .crd-area-fw { grid-column: 2; grid-row: 1 / span 2; }
  .crd-area-chart { height: auto; flex: 1; }
  .crd-donut-body { gap: 10px; }
}
`;

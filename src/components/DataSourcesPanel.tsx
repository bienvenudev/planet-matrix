"use client";
import { useMemo } from "react";

/* ─── Sparkline shapes & colors (from the prototype) ──────── */
const SHAPES: Record<string, number[]> = {
  up: [6, 7, 5, 8, 7, 9, 8, 11, 10, 13, 12, 15, 14, 17],
  steady: [9, 10, 9, 11, 10, 9, 11, 10, 12, 11, 10, 12, 11, 12],
  down: [15, 14, 13, 14, 12, 11, 12, 9, 8, 7, 5, 4, 3, 2],
  flat: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
};
const SPARK_COLOR: Record<string, string> = {
  up: "#34D399",
  steady: "#9b6bff",
  down: "#FB7185",
  flat: "#6F6A87",
};

function Spark({ type, id }: { type: keyof typeof SHAPES; id: string }) {
  const { line, area, last } = useMemo(() => {
    const W = 80, H = 30, PAD = 3;
    const data = SHAPES[type];
    const max = Math.max(...data), min = Math.min(...data);
    const range = max - min || 1;
    const n = data.length;
    const pts = data.map((v, i) => [
      PAD + (i / (n - 1)) * (W - PAD * 2),
      H - PAD - ((v - min) / range) * (H - PAD * 2),
    ]);
    const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    const area = `${line} L${pts[n - 1][0].toFixed(1)} ${H} L${pts[0][0].toFixed(1)} ${H} Z`;
    return { line, area, last: pts[n - 1] };
  }, [type]);
  const col = SPARK_COLOR[type];
  return (
    <svg className="ds-spark" width="80" height="30" viewBox="0 0 80 30">
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={col} stopOpacity="0.22" />
        <stop offset="1" stopColor={col} stopOpacity="0" />
      </linearGradient></defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={col} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      {type !== "flat" && <circle cx={last[0].toFixed(1)} cy={last[1].toFixed(1)} r="2.4" fill={col} />}
    </svg>
  );
}

/* ─── Row data ────────────────────────────────────────────── */
const ROWS = [
  {
    name: "Water Sensors", sub: "48 devices · IoT mesh",
    icon: <path d="M12 2.69 5.6 9.09a9 9 0 1 0 12.8 0z" />,
    avatar: "AQ", avatarBg: "#2563EB", account: "Aquatech Grid", tag: null,
    status: "green", statusLabel: "Active", freq: "2s", spark: "up", mvNum: "2,480 m³/h", mvLbl: "flow rate",
  },
  {
    name: "Energy Grid", sub: "Scope 2 · kWh meters",
    icon: <path d="m13 2-8 11h6l-1 9 8-11h-6z" />,
    avatar: "NG", avatarBg: "#0E9E6E", account: "National Grid", tag: null,
    status: "green", statusLabel: "Active", freq: "15s", spark: "steady", mvNum: "18.4 MWh", mvLbl: "today",
  },
  {
    name: "Supply Chain", sub: "Scope 3 · 11 tier-1 vendors",
    icon: <><path d="M3 7h13v10H3zM16 10h3l2 3v4h-5z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></>,
    avatar: "ML", avatarBg: "#C026D3", account: "Maersk Logistics", tag: "Partner",
    status: "green", statusLabel: "Active", freq: "6h", spark: "steady", mvNum: "312 tCO₂e", mvLbl: "this month",
  },
  {
    name: "Climate API", sub: "REST · regional factors",
    icon: <path d="M17.5 19a4.5 4.5 0 1 0 0-9 6 6 0 0 0-11.6 1.5A4 4 0 0 0 6 19z" />,
    avatar: "OC", avatarBg: "#475569", account: "OpenClimate", tag: null,
    status: "red", statusLabel: "At Risk", freq: "—", spark: "down", mvNum: "auth expiring", mvLbl: "token · 2d left",
  },
  {
    name: "Factory Floor", sub: "Plant 04 · Detroit, MI",
    icon: <path d="M3 21h18M4 21V9l5 3V9l5 3V7l5 3v11" />,
    avatar: "PL", avatarBg: "#7C3AED", account: "Plant Ops", tag: null,
    status: "amber", statusLabel: "Pending", freq: "—", spark: "flat", mvNum: "awaiting setup", mvLbl: "gateway pairing",
  },
];

export default function DataSourcesPanel() {
  return (
    <div className="ds-root">
      <style>{css}</style>
      <div className="ds-panel">

        {/* Header */}
        <div className="ds-head">
          <div className="ds-head-left">
            <div className="ds-head-icon">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" /><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></svg>
            </div>
            <div className="ds-head-titles">
              <h1>Data Sources</h1>
              <p>Real-time IoT &amp; partner ingestion for ESG disclosures</p>
            </div>
          </div>
          <div className="ds-head-right">
            <div className="ds-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
              <span>Search sources</span>
              <kbd>⌘K</kbd>
            </div>
            <button className="ds-btn ds-btn-filter">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M6 12h12M10 18h4" /></svg>
              Filter
            </button>
            <button className="ds-btn ds-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
              Connect source
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="ds-summary">
          <div className="ds-live"><span className="ds-pulse" />Live</div>
          <div className="ds-stat"><span className="ds-num">212</span><span className="ds-lbl">datapoints</span></div>
          <div className="ds-divider" />
          <div className="ds-stat"><span className="ds-lbl">tracking</span><span className="ds-num">556</span><span className="ds-lbl">disclosures</span></div>
          <div className="ds-divider" />
          <div className="ds-stat"><span className="ds-num">5</span><span className="ds-lbl">connected sources</span></div>
          <div className="ds-updated">synced 8s ago</div>
        </div>

        {/* Table */}
        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th className="ds-c-src">Source</th>
                <th className="ds-c-acct">Account</th>
                <th className="ds-c-status">Status</th>
                <th className="ds-c-metrics">Metrics</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.name}>
                  <td className="ds-c-src">
                    <div className="ds-src">
                      <div className="ds-src-ico"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{r.icon}</svg></div>
                      <div>
                        <div className="ds-src-name">{r.name}</div>
                        <div className="ds-src-sub">{r.sub}</div>
                      </div>
                    </div>
                  </td>
                  <td className="ds-c-acct">
                    <div className="ds-acct">
                      <div className="ds-acct-av" style={{ background: r.avatarBg }}>{r.avatar}</div>
                      <span className="ds-acct-name">{r.account}</span>
                      {r.tag && <span className="ds-acct-tag">{r.tag}</span>}
                    </div>
                  </td>
                  <td className="ds-c-status"><span className={`ds-badge ${r.status}`}><span className="ds-dot" />{r.statusLabel}</span></td>
                  <td className="ds-c-metrics">
                    <div className="ds-metrics">
                      <span className="ds-freq">{r.freq}</span>
                      <Spark type={r.spark as keyof typeof SHAPES} id={`ds-spark-${i}`} />
                      <div className="ds-metric-val"><div className="ds-mv-num">{r.mvNum}</div><div className="ds-mv-lbl">{r.mvLbl}</div></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="ds-foot">
          <div className="ds-foot-links">
            <span><b>3</b> active</span>
            <span><b>1</b> at risk</span>
            <span><b>1</b> pending</span>
          </div>
          <span className="ds-foot-next">Next ingestion window in <b>00:42</b></span>
        </div>
      </div>
    </div>
  );
}

/* ─── Scoped styles — mobile-first, reflows on its own width ── */
const css = `
.ds-root {
  --ds-bg: #0d0b18;
  --ds-surface: #1a1530;
  --ds-surface-2: #211a3d;
  --ds-surface-hover: #241d44;
  --ds-border: rgba(255,255,255,0.07);
  --ds-border-strong: rgba(255,255,255,0.11);
  --ds-accent: #7c3aed;
  --ds-accent-soft: rgba(124,58,237,0.16);
  --ds-text: #ECEAF6;
  --ds-text-mid: #A39FBB;
  --ds-text-dim: #6F6A87;
  --ds-green: #34D399;
  --ds-green-bg: rgba(52,211,153,0.13);
  --ds-red: #FB7185;
  --ds-red-bg: rgba(251,113,133,0.13);
  --ds-amber: #FBBF24;
  --ds-amber-bg: rgba(251,191,36,0.13);
  --ds-slate: #94A3C7;
  --ds-slate-bg: rgba(148,163,199,0.12);
  --ds-mono: 'Geist Mono', ui-monospace, monospace;
  container-type: inline-size;
  width: 100%;
  background: var(--ds-bg);
  font-family: 'Geist', system-ui, -apple-system, sans-serif;
  color: var(--ds-text);
  -webkit-font-smoothing: antialiased;
  text-align: left;
}
.ds-root * { box-sizing: border-box; }

.ds-panel { width: 100%; background: var(--ds-surface); border: 1px solid var(--ds-border); border-radius: 16px; box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset, 0 30px 70px -45px rgba(0,0,0,0.7); overflow: auto; }

/* Header */
.ds-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 16px 18px; border-bottom: 1px solid var(--ds-border); flex-wrap: wrap; }
.ds-head-left { display: flex; align-items: center; gap: 13px; min-width: 0; }
.ds-head-icon { width: 38px; height: 38px; border-radius: 10px; background: var(--ds-accent-soft); border: 1px solid rgba(124,58,237,0.35); display: flex; align-items: center; justify-content: center; color: #b794ff; flex-shrink: 0; }
.ds-head-titles h1 { font-size: 18px; font-weight: 600; letter-spacing: -0.01em; color: var(--ds-text); line-height: 1.2; }
.ds-head-titles p { font-size: 12px; color: var(--ds-text-dim); margin-top: 2px; }
.ds-head-right { display: flex; align-items: center; gap: 9px; flex-shrink: 0; }
.ds-search { display: flex; align-items: center; gap: 8px; height: 34px; padding: 0 12px; background: var(--ds-bg); border: 1px solid var(--ds-border); border-radius: 9px; color: var(--ds-text-dim); font-size: 12.5px; min-width: 150px; }
.ds-search kbd { margin-left: auto; font-family: var(--ds-mono); font-size: 10.5px; color: var(--ds-text-dim); background: var(--ds-surface-2); border: 1px solid var(--ds-border); border-radius: 5px; padding: 2px 6px; }
.ds-btn { display: flex; align-items: center; gap: 7px; height: 34px; padding: 0 13px; border-radius: 9px; font-family: inherit; font-size: 12.5px; font-weight: 500; cursor: pointer; border: 1px solid var(--ds-border-strong); background: var(--ds-surface-2); color: var(--ds-text); white-space: nowrap; }
.ds-primary { background: var(--ds-accent); border-color: transparent; color: #fff; box-shadow: 0 1px 0 rgba(255,255,255,0.18) inset; }

/* Summary */
.ds-summary { display: flex; align-items: center; gap: 18px; padding: 12px 18px; border-bottom: 1px solid var(--ds-border); flex-wrap: wrap; }
.ds-live { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--ds-text-mid); font-weight: 500; }
.ds-pulse { position: relative; width: 8px; height: 8px; flex-shrink: 0; }
.ds-pulse::before, .ds-pulse::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: var(--ds-green); }
.ds-pulse::after { animation: dsping 1.8s cubic-bezier(0,0,0.2,1) infinite; }
@keyframes dsping { 0% { transform: scale(1); opacity: 0.7; } 80%,100% { transform: scale(2.6); opacity: 0; } }
.ds-stat { display: flex; align-items: baseline; gap: 7px; }
.ds-num { font-family: var(--ds-mono); font-size: 14px; font-weight: 500; color: var(--ds-text); letter-spacing: -0.01em; }
.ds-lbl { font-size: 12.5px; color: var(--ds-text-dim); }
.ds-divider { width: 1px; height: 16px; background: var(--ds-border-strong); }
.ds-updated { margin-left: auto; font-size: 12px; color: var(--ds-text-dim); font-family: var(--ds-mono); }

/* Table */
.ds-table-wrap { width: 100%; }
.ds-table { width: 100%; border-collapse: collapse; }
.ds-table thead th { text-align: left; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.07em; color: var(--ds-text-dim); padding: 12px 18px; border-bottom: 1px solid var(--ds-border); background: var(--ds-bg); }
.ds-table thead th.ds-c-metrics { text-align: right; }
.ds-table tbody td { padding: 14px 18px; border-bottom: 1px solid var(--ds-border); vertical-align: middle; }
.ds-table tbody tr:last-child td { border-bottom: none; }
.ds-table tbody tr { transition: background 0.12s ease; }
.ds-table tbody tr:hover { background: var(--ds-surface-hover); }
.ds-c-src { width: 100%; }

/* Source cell */
.ds-src { display: flex; align-items: center; gap: 12px; }
.ds-src-ico { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: var(--ds-surface-2); border: 1px solid var(--ds-border-strong); color: var(--ds-text-mid); flex-shrink: 0; }
.ds-src-name { font-size: 13.5px; font-weight: 500; color: var(--ds-text); letter-spacing: -0.005em; }
.ds-src-sub { font-size: 12px; color: var(--ds-text-dim); margin-top: 2px; font-family: var(--ds-mono); white-space: nowrap; }

/* Account cell */
.ds-acct { display: flex; align-items: center; gap: 10px; }
.ds-acct-av { width: 25px; height: 25px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 10.5px; font-weight: 600; color: #fff; flex-shrink: 0; }
.ds-acct-name { font-size: 13px; color: var(--ds-text-mid); white-space: nowrap; }
.ds-acct-tag { margin-left: 6px; font-size: 10.5px; font-weight: 500; color: var(--ds-slate); background: var(--ds-slate-bg); border: 1px solid rgba(148,163,199,0.22); padding: 2px 8px; border-radius: 999px; white-space: nowrap; }

/* Status badge */
.ds-badge { display: inline-flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 500; padding: 5px 11px 5px 9px; border-radius: 999px; border: 1px solid transparent; white-space: nowrap; }
.ds-badge .ds-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.ds-badge.green { color: var(--ds-green); background: var(--ds-green-bg); border-color: rgba(52,211,153,0.25); }
.ds-badge.green .ds-dot { background: var(--ds-green); box-shadow: 0 0 0 3px rgba(52,211,153,0.18); }
.ds-badge.red { color: var(--ds-red); background: var(--ds-red-bg); border-color: rgba(251,113,133,0.28); }
.ds-badge.red .ds-dot { background: var(--ds-red); }
.ds-badge.amber { color: var(--ds-amber); background: var(--ds-amber-bg); border-color: rgba(251,191,36,0.28); }
.ds-badge.amber .ds-dot { background: var(--ds-amber); }

/* Metrics cell */
.ds-metrics { display: flex; align-items: center; justify-content: flex-end; gap: 12px; }
.ds-spark { display: block; flex-shrink: 0; }
.ds-metric-val { text-align: right; min-width: 76px; }
.ds-mv-num { font-family: var(--ds-mono); font-size: 13px; color: var(--ds-text); letter-spacing: -0.01em; white-space: nowrap; }
.ds-mv-lbl { font-size: 11px; color: var(--ds-text-dim); margin-top: 2px; white-space: nowrap; }
.ds-freq { font-family: var(--ds-mono); font-size: 10.5px; color: var(--ds-text-dim); min-width: 34px; text-align: right; }

/* Footer */
.ds-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 18px; border-top: 1px solid var(--ds-border); background: var(--ds-bg); font-size: 12px; color: var(--ds-text-dim); flex-wrap: wrap; }
.ds-foot-links { display: flex; gap: 18px; }
.ds-foot-links span { display: flex; align-items: center; gap: 6px; }
.ds-foot-links b, .ds-foot-next b { color: var(--ds-text-mid); font-weight: 500; font-family: var(--ds-mono); }

/* ── Narrow: drop the Account column, trim metrics & header chrome ── */
@container (max-width: 620px) {
  .ds-search, .ds-btn-filter { display: none; }
  .ds-c-acct { display: none; }
  .ds-spark, .ds-freq { display: none; }
  .ds-updated { display: none; }
  .ds-table thead th, .ds-table tbody td { padding-left: 14px; padding-right: 14px; }
}

/* ── Very narrow: also hide the source sub-label ── */
@container (max-width: 420px) {
  .ds-head-titles p { display: none; }
  .ds-src-sub { display: none; }
}
`;

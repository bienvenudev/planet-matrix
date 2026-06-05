"use client";
import { useEffect, useState } from "react";

/* ─── Map geometry (hand-built Europe, viewBox 640×660) ───── */
const MUTED_PATHS = [
  "M96,250 L102,224 L122,212 L144,220 L150,244 L139,268 L114,274 L99,268 Z", // Ireland
  "M392,212 L406,150 L424,96 L440,56 L452,42 L460,72 L448,124 L436,168 L424,206 L408,224 L394,222 Z", // Norway
  "M436,168 L448,124 L460,72 L476,98 L484,152 L474,198 L454,220 L437,226 L424,206 Z", // Sweden
  "M484,152 L476,98 L500,78 L530,94 L538,146 L520,186 L492,190 Z", // Finland
  "M354,236 L380,230 L390,252 L380,272 L361,270 L351,254 Z", // Denmark
  "M312,280 L334,276 L342,294 L334,310 L315,308 L308,294 Z", // Netherlands
  "M302,312 L334,312 L340,331 L323,343 L304,339 L298,323 Z", // Belgium
  "M334,392 L364,388 L380,398 L374,416 L346,419 L331,409 Z", // Switzerland
  "M382,388 L424,378 L466,388 L474,406 L444,417 L400,413 L382,403 Z", // Austria
  "M400,354 L444,346 L468,358 L460,378 L422,378 L402,371 Z", // Czechia
  "M424,276 L476,268 L522,278 L527,320 L510,354 L466,360 L444,346 L427,318 Z", // Poland
  "M142,440 L178,430 L234,432 L286,442 L298,472 L280,518 L238,538 L182,535 L143,514 L129,476 Z", // Spain
  "M124,448 L142,446 L148,480 L140,517 L123,522 L113,491 Z", // Portugal
  "M380,392 L400,388 L412,406 L424,428 L438,456 L452,492 L470,536 L480,562 L471,574 L458,560 L440,520 L424,490 L410,464 L398,440 L388,418 L378,406 Z", // Italy
  "M452,580 L472,582 L460,598 Z", // Sicily
  "M474,406 L526,400 L548,432 L532,476 L495,481 L474,452 Z", // Balkans
  "M508,484 L542,481 L536,516 L514,536 L502,512 Z", // Greece
  "M527,278 L588,272 L612,300 L600,346 L562,366 L527,360 L527,320 Z", // East edge
];

const ACTIONS = [
  { rank: 1, title: "Reduce Rhine-region water draw", prio: "high", prioLabel: "High", desc: "Throttle non-critical cooling at 2 German plants ahead of forecast flood crest.", impact: "↓ 15% withdrawal · 3 facilities", purple: false },
  { rank: 2, title: "Renew Climate API credentials", prio: "high", prioLabel: "High", desc: "Auth token expires in 2 days; lapse pauses 4 disclosure feeds.", impact: "protects 41 datapoints", purple: true },
  { rank: 3, title: "Rebalance Plant 04 energy load", prio: "med", prioLabel: "Medium", desc: "Shift off-shift draw to off-peak window to close the forecast gap.", impact: "↓ 8% Scope 2 · Detroit", purple: false },
];

const CALLOUTS = [
  { sw: "var(--geo-w4)", name: "Germany", val: "High" },
  { sw: "var(--geo-w3)", name: "France", val: "Medium" },
  { sw: "var(--geo-w2)", name: "United Kingdom", val: "Low–Med" },
];

export default function GeoDashboard() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className="geo-root">
      <style>{css}</style>
      <div className="geo-inner">

        {/* Alert banner */}
        <div className="geo-alert">
          <div className="geo-ab-ico">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>
          </div>
          <div className="geo-ab-text"><b>2 active flood risk alerts</b> <span>— Rhine region · downstream water facilities flagged for review</span></div>
          <div className="geo-ab-meta">
            <span className="geo-ab-time">updated 4m ago</span>
            <button className="geo-ab-btn">View alerts</button>
          </div>
        </div>

        {/* Header */}
        <div className="geo-head">
          <div className="geo-head-left">
            <div className="geo-head-ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
            </div>
            <div>
              <h1>Geographic Intelligence</h1>
              <p>Water consumption intensity &amp; recommended actions · EU operations</p>
            </div>
          </div>
          <div className="geo-head-right">
            <div className="geo-seg">
              <button className="on">Water</button>
              <button>Carbon</button>
              <button>Energy</button>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="geo-main">

          {/* Map */}
          <div className="geo-card geo-map-card">
            <div className="geo-card-head">
              <div className="geo-ttl"><h2>Water Consumption Intensity</h2><div className="geo-sub">By region · m³ per output unit · live</div></div>
              <span className="geo-chip">3 regions monitored</span>
            </div>
            <div className="geo-map-body">
              <svg className="geo-map" viewBox="0 0 640 660" preserveAspectRatio="xMidYMid meet">
                <g>
                  {MUTED_PATHS.map((d, i) => (
                    <path key={i} className="geo-country geo-w0" d={d} />
                  ))}
                </g>
                {/* Highlighted: UK, France, Germany */}
                <path className="geo-country hl geo-w2" d="M150,300 L162,262 L156,236 L176,206 L170,182 L192,166 L208,184 L202,214 L224,234 L236,262 L222,288 L230,302 L206,316 L186,318 L168,314 Z" />
                <path className="geo-country hl geo-w3" d="M212,335 L200,320 L196,300 L218,308 L244,318 L270,322 L300,318 L332,336 L340,374 L324,402 L300,422 L270,427 L240,420 L218,402 L228,374 Z" />
                <path className="geo-country hl geo-w4" d="M340,288 L362,272 L390,272 L410,288 L420,320 L412,356 L422,380 L400,390 L380,382 L364,390 L352,367 L358,336 L340,318 Z" />
                {/* Labels */}
                <text className="geo-clabel" x="190" y="252" fontSize="15">UK</text>
                <text className="geo-clabel" x="268" y="372" fontSize="16">FR</text>
                <text className="geo-clabel" x="382" y="335" fontSize="16">DE</text>
                {/* Flood markers along the Rhine */}
                <g className="geo-flood-marker" transform="translate(348,330)">
                  <circle className="geo-fm-ring" r="7" fill="none" stroke="#F4544E" strokeWidth="2" />
                  <circle r="5" fill="#F4544E" stroke="#0d0b18" strokeWidth="1.5" />
                </g>
                <g className="geo-flood-marker" transform="translate(338,300)">
                  <circle className="geo-fm-ring" r="7" fill="none" stroke="#F4544E" strokeWidth="2" style={{ animationDelay: "0.7s" }} />
                  <circle r="5" fill="#F4544E" stroke="#0d0b18" strokeWidth="1.5" />
                </g>
                <text className="geo-clabel dim" x="356" y="318" fontSize="11" textAnchor="start">Rhine</text>
              </svg>
            </div>

            {/* Callout cards */}
            <div className="geo-callout">
              {CALLOUTS.map((c) => (
                <div className="geo-co-item" key={c.name}>
                  <span className="geo-co-sw" style={{ background: c.sw }} />
                  <span className="geo-co-name">{c.name}</span>
                  <span className="geo-co-val">{c.val}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="geo-legend">
              <div className="geo-lt">Water intensity · m³/unit</div>
              <div className="geo-scale">
                <span className="geo-sw" style={{ background: "var(--geo-w0)" }} />
                <span className="geo-sw" style={{ background: "var(--geo-w1)" }} />
                <span className="geo-sw" style={{ background: "var(--geo-w2)" }} />
                <span className="geo-sw" style={{ background: "var(--geo-w3)" }} />
                <span className="geo-sw" style={{ background: "var(--geo-w4)" }} />
              </div>
              <div className="geo-ends"><span>0.4</span><span>3.8</span></div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="geo-side">

            {/* Recommended actions */}
            <div className="geo-card geo-actions-card">
              <div className="geo-card-head">
                <div className="geo-ttl"><h2>Recommended Actions</h2><div className="geo-sub">Ranked by impact &amp; urgency</div></div>
                <span className="geo-chip geo-chip-ai">AI</span>
              </div>
              <div className="geo-actions">
                {ACTIONS.map((a) => (
                  <div className="geo-action" key={a.rank}>
                    <div className="geo-rank">{a.rank}</div>
                    <div className="geo-ac-body">
                      <div className="geo-ac-top">
                        <span className="geo-ac-title">{a.title}</span>
                        <span className={`geo-prio ${a.prio}`}>{a.prioLabel}</span>
                      </div>
                      <div className="geo-ac-desc">{a.desc}</div>
                      <div className={`geo-ac-impact${a.purple ? " purple" : ""}`}>{a.impact}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scenario comparison */}
            <div className="geo-card geo-scenario-card">
              <div className="geo-card-head">
                <div className="geo-ttl"><h2>Scenario · Current vs Target</h2><div className="geo-sub">Annual emissions · tCO₂e</div></div>
                <span className="geo-chip">2030 plan</span>
              </div>
              <div className="geo-scenario">
                <div className="geo-bars">
                  <div className="geo-barcol">
                    <div className="geo-bar cur" style={{ height: on ? "120px" : 0 }}><span className="geo-cap">1,240</span></div>
                    <span className="geo-blab">Current</span>
                  </div>
                  <div className="geo-barcol">
                    <div className="geo-bar tgt" style={{ height: on ? "89px" : 0, transitionDelay: "120ms" }}><span className="geo-cap">920</span></div>
                    <span className="geo-blab">Target</span>
                  </div>
                </div>
                <div className="geo-scenario-meta">
                  <div className="geo-sm-delta">
                    <span className="geo-big">−26%</span>
                    <span className="geo-lbl">projected reduction</span>
                  </div>
                  <div className="geo-sm-note">On track to hit the 2030 target with the 3 recommended actions applied. <span className="geo-unit">−320 tCO₂e/yr</span></div>
                </div>
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
.geo-root {
  --geo-bg: #0d0b18;
  --geo-surface: #1a1530;
  --geo-surface-2: #211a3d;
  --geo-border: rgba(255,255,255,0.07);
  --geo-border-strong: rgba(255,255,255,0.11);
  --geo-accent-soft: rgba(124,58,237,0.16);
  --geo-text: #ECEAF6;
  --geo-text-mid: #A39FBB;
  --geo-text-dim: #6F6A87;
  --geo-green: #34D399;
  --geo-amber: #FBBF24;
  --geo-red: #F4544E;
  --geo-w0: #221a3d;
  --geo-w1: #3a2a66;
  --geo-w2: #5b3aa8;
  --geo-w3: #7c3aed;
  --geo-w4: #9b6bff;
  --geo-mono: 'Geist Mono', ui-monospace, monospace;
  container-type: inline-size;
  width: 100%;
  background: var(--geo-bg);
  font-family: 'Geist', system-ui, -apple-system, sans-serif;
  color: var(--geo-text);
  -webkit-font-smoothing: antialiased;
  text-align: left;
}
.geo-root * { box-sizing: border-box; }

.geo-inner { width: 100%; display: flex; flex-direction: column; gap: 13px; padding: 16px; }

/* Alert banner */
.geo-alert { display: flex; align-items: center; gap: 13px; padding: 11px 15px; border-radius: 12px; background: rgba(244,84,78,0.08); border: 1px solid rgba(244,84,78,0.28); }
.geo-ab-ico { width: 30px; height: 30px; border-radius: 8px; background: rgba(244,84,78,0.15); border: 1px solid rgba(244,84,78,0.35); display: flex; align-items: center; justify-content: center; color: var(--geo-red); flex-shrink: 0; }
.geo-ab-text { font-size: 12.5px; color: var(--geo-text); font-weight: 500; min-width: 0; }
.geo-ab-text b { color: var(--geo-red); font-weight: 600; }
.geo-ab-text span { color: var(--geo-text-dim); font-weight: 400; }
.geo-ab-meta { margin-left: auto; display: flex; align-items: center; gap: 11px; flex-shrink: 0; }
.geo-ab-time { font-family: var(--geo-mono); font-size: 11px; color: var(--geo-text-dim); white-space: nowrap; }
.geo-ab-btn { font-family: inherit; font-size: 12px; font-weight: 500; color: var(--geo-text); background: var(--geo-surface-2); border: 1px solid var(--geo-border-strong); border-radius: 8px; padding: 6px 12px; cursor: pointer; white-space: nowrap; }

/* Header */
.geo-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.geo-head-left { display: flex; align-items: center; gap: 12px; min-width: 0; }
.geo-head-ic { width: 38px; height: 38px; border-radius: 10px; background: var(--geo-accent-soft); border: 1px solid rgba(124,58,237,0.35); display: flex; align-items: center; justify-content: center; color: #b794ff; flex-shrink: 0; }
.geo-head-left h1 { font-size: 17px; font-weight: 600; letter-spacing: -0.012em; color: var(--geo-text); line-height: 1.15; }
.geo-head-left p { font-size: 11px; color: var(--geo-text-dim); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.geo-head-right { flex-shrink: 0; }
.geo-seg { display: flex; background: var(--geo-surface); border: 1px solid var(--geo-border); border-radius: 9px; padding: 3px; }
.geo-seg button { font-family: inherit; font-size: 11.5px; font-weight: 500; color: var(--geo-text-dim); background: transparent; border: none; padding: 6px 11px; border-radius: 6px; cursor: pointer; }
.geo-seg button.on { background: var(--geo-surface-2); color: var(--geo-text); }

/* Main — mobile-first: single stacked column */
.geo-main { display: flex; flex-direction: column; gap: 13px; min-height: 0; }

.geo-card { background: var(--geo-surface); border: 1px solid var(--geo-border); border-radius: 14px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 24px 60px -50px rgba(0,0,0,0.8); }
.geo-card-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 13px 15px 11px; border-bottom: 1px solid var(--geo-border); flex-shrink: 0; }
.geo-ttl h2 { font-size: 13.5px; font-weight: 600; color: var(--geo-text); letter-spacing: -0.005em; }
.geo-ttl .geo-sub { font-size: 10.5px; color: var(--geo-text-dim); margin-top: 2px; }
.geo-chip { font-size: 10px; font-weight: 500; color: var(--geo-text-mid); background: var(--geo-surface-2); border: 1px solid var(--geo-border); border-radius: 999px; padding: 4px 9px; white-space: nowrap; flex-shrink: 0; }
.geo-chip-ai { color: #b794ff; border-color: rgba(124,58,237,0.35); background: var(--geo-accent-soft); }

/* Map */
.geo-map-card { position: relative; }
.geo-map-body { flex: 1; position: relative; display: flex; align-items: center; justify-content: center; min-height: 260px; padding: 6px; }
.geo-map { width: 100%; height: 100%; display: block; }
.geo-country { stroke: #0d0b18; stroke-width: 1.4; transition: fill 0.2s; }
.geo-country.hl { stroke: rgba(255,255,255,0.18); stroke-width: 1.2; }
.geo-w0 { fill: var(--geo-w0); }
.geo-w2 { fill: var(--geo-w2); }
.geo-w3 { fill: var(--geo-w3); }
.geo-w4 { fill: var(--geo-w4); }
.geo-clabel { font-family: 'Geist', system-ui, sans-serif; font-weight: 600; fill: #fff; text-anchor: middle; pointer-events: none; }
.geo-clabel.dim { fill: var(--geo-text-dim); font-weight: 500; }
.geo-flood-marker { transform-box: fill-box; transform-origin: center; }
.geo-fm-ring { animation: geofloodping 2.2s ease-out infinite; transform-box: fill-box; transform-origin: center; }
@keyframes geofloodping { 0% { transform: scale(0.6); opacity: 0.8; } 80%,100% { transform: scale(2.6); opacity: 0; } }

/* Legend */
.geo-legend { position: absolute; left: 14px; bottom: 14px; background: rgba(13,11,24,0.72); backdrop-filter: blur(6px); border: 1px solid var(--geo-border); border-radius: 10px; padding: 9px 11px; }
.geo-lt { font-size: 9.5px; color: var(--geo-text-dim); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 7px; }
.geo-scale { display: flex; align-items: center; gap: 0; }
.geo-scale .geo-sw { width: 24px; height: 8px; }
.geo-scale .geo-sw:first-child { border-radius: 3px 0 0 3px; }
.geo-scale .geo-sw:last-child { border-radius: 0 3px 3px 0; }
.geo-ends { display: flex; justify-content: space-between; margin-top: 5px; font-family: var(--geo-mono); font-size: 9.5px; color: var(--geo-text-dim); }

/* Callout cards */
.geo-callout { position: absolute; right: 14px; top: 60px; display: flex; flex-direction: column; gap: 7px; }
.geo-co-item { display: flex; align-items: center; gap: 9px; background: rgba(13,11,24,0.6); border: 1px solid var(--geo-border); border-radius: 9px; padding: 7px 11px; min-width: 150px; }
.geo-co-sw { width: 11px; height: 11px; border-radius: 4px; flex-shrink: 0; }
.geo-co-name { font-size: 11.5px; font-weight: 500; color: var(--geo-text); }
.geo-co-val { margin-left: auto; font-family: var(--geo-mono); font-size: 11.5px; color: var(--geo-text-mid); }

/* Sidebar */
.geo-side { display: flex; flex-direction: column; gap: 13px; min-height: 0; }
.geo-actions-card { flex: 1; min-height: 0; }
.geo-actions { padding: 4px 0; }
.geo-action { display: flex; gap: 12px; padding: 12px 15px; border-bottom: 1px solid var(--geo-border); }
.geo-action:last-child { border-bottom: none; }
.geo-rank { width: 23px; height: 23px; border-radius: 7px; background: var(--geo-surface-2); border: 1px solid var(--geo-border-strong); display: flex; align-items: center; justify-content: center; font-family: var(--geo-mono); font-size: 11px; color: var(--geo-text-mid); flex-shrink: 0; margin-top: 2px; }
.geo-ac-body { flex: 1; min-width: 0; }
.geo-ac-top { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.geo-ac-title { font-size: 12.5px; font-weight: 500; color: var(--geo-text); letter-spacing: -0.005em; }
.geo-prio { font-size: 9.5px; font-weight: 600; padding: 2px 8px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.03em; margin-left: auto; flex-shrink: 0; white-space: nowrap; }
.geo-prio.high { color: var(--geo-red); background: rgba(244,84,78,0.13); border: 1px solid rgba(244,84,78,0.3); }
.geo-prio.med { color: var(--geo-amber); background: rgba(251,191,36,0.13); border: 1px solid rgba(251,191,36,0.28); }
.geo-ac-desc { font-size: 11px; color: var(--geo-text-dim); line-height: 1.45; }
.geo-ac-impact { display: inline-flex; align-items: center; gap: 6px; margin-top: 7px; font-family: var(--geo-mono); font-size: 10.5px; color: var(--geo-green); }
.geo-ac-impact.purple { color: #b794ff; }

/* Scenario */
.geo-scenario-card { flex-shrink: 0; }
.geo-scenario { padding: 16px; display: flex; gap: 20px; align-items: flex-end; }
.geo-bars { display: flex; gap: 18px; align-items: flex-end; height: 130px; flex-shrink: 0; }
.geo-barcol { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 9px; height: 100%; }
.geo-bar { width: 50px; border-radius: 7px 7px 0 0; position: relative; transition: height 0.9s cubic-bezier(0.22,1,0.36,1); }
.geo-bar .geo-cap { position: absolute; top: -22px; left: 50%; transform: translateX(-50%); font-family: var(--geo-mono); font-size: 12px; color: var(--geo-text); white-space: nowrap; }
.geo-blab { font-size: 11px; color: var(--geo-text-dim); }
.geo-bar.cur { background: linear-gradient(180deg, #4a3a6e, #3a2d57); box-shadow: inset 0 1px 0 rgba(255,255,255,0.08); }
.geo-bar.tgt { background: linear-gradient(180deg, #9b6bff, #7c3aed); box-shadow: inset 0 1px 0 rgba(255,255,255,0.18); }
.geo-scenario-meta { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 11px; min-width: 0; }
.geo-sm-delta { display: flex; flex-direction: column; gap: 3px; }
.geo-sm-delta .geo-big { font-size: 25px; font-weight: 700; letter-spacing: -0.02em; color: var(--geo-green); line-height: 1; font-family: var(--geo-mono); }
.geo-sm-delta .geo-lbl { font-size: 11px; color: var(--geo-text-dim); }
.geo-sm-note { font-size: 11px; color: var(--geo-text-mid); line-height: 1.45; }
.geo-unit { font-size: 10px; color: var(--geo-text-dim); }

/* ── Very narrow: strip secondary detail ── */
@container (max-width: 460px) {
  .geo-inner { padding: 13px; gap: 11px; }
  .geo-head-left p { display: none; }
  .geo-ab-meta { display: none; }
  .geo-callout { display: none; }
  .geo-ab-text span { display: none; }
}

/* ── Roomy: map + sidebar side by side ── */
@container (min-width: 660px) {
  .geo-main { flex: 1; display: grid; grid-template-columns: minmax(0, 1.32fr) minmax(0, 1fr); gap: 18px; align-items: stretch; }
  .geo-map-body { min-height: 0; }
}
`;

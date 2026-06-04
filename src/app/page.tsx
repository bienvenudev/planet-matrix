"use client";
import { useState, useEffect, useRef } from "react";

const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" stroke="#7c3aed" strokeWidth="1.5" fill="none" opacity="0.5" />
    <circle cx="16" cy="16" r="9" stroke="#9d5cf6" strokeWidth="1.5" fill="none" opacity="0.7" />
    <circle cx="16" cy="16" r="3.5" fill="#b97bff" />
    <circle cx="16" cy="4.5" r="1.5" fill="#7c3aed" />
    <circle cx="27.5" cy="11" r="1.5" fill="#7c3aed" />
    <circle cx="27.5" cy="21" r="1.5" fill="#7c3aed" />
    <circle cx="16" cy="27.5" r="1.5" fill="#7c3aed" />
    <circle cx="4.5" cy="21" r="1.5" fill="#7c3aed" />
    <circle cx="4.5" cy="11" r="1.5" fill="#7c3aed" />
  </svg>
);

const TABS = [
  {
    label: "Collect",
    heading: "Build a trusted data foundation for growth",
    body: "Connect IoT sensors, meters, and data streams from water systems, energy grids, and climate instruments into one unified source of truth.",
    points: [
      "Reflect your organizational structure directly in PlanetMatrix",
      "Unite internal data sources and your external value chain",
      "Create custom metrics that aggregate any data from any source",
      "One source of truth for reporting, analysis, and management",
    ],
    visual: "collect",
  },
  {
    label: "Analyze",
    heading: "Transform your data into actionable intelligence",
    body: "AI models process data 250 times per second, detecting anomalies and inefficiencies invisible to manual inspection — before they become costly problems.",
    points: [
      "Uncover climate, geopolitical, and operational risks",
      "Detect anomalies with AI to flag issues before they escalate",
      "Benchmark performance against peers and industry standards",
      "Design custom dashboards to track what matters most",
    ],
    visual: "analyze",
  },
  {
    label: "Act",
    heading: "Maximise the commercial value of your data",
    body: "Real-time alerts, automated shutoff controls, and scenario planning tools let your team respond in seconds — backed by data.",
    points: [
      "Run scenario analyses to compare outcomes",
      "Prioritise high-impact actions for maximum ROI",
      "Automated alerts with root-cause context",
      "Benefit from real-time updates to stay ahead",
    ],
    visual: "act",
  },
  {
    label: "Report",
    heading: "Demonstrate impact to build lasting trust",
    body: "Generate audit-ready ESG reports aligned to global frameworks at the click of a button. Share directly with investors, banks, and auditors.",
    points: [
      "Create compliant reports for any framework from one source",
      "Export in branded microsites, Excel, and custom formats",
      "Share with stakeholders in one click",
      "Machine-readable, audit-proof, fully transparent",
    ],
    visual: "report",
  },
];

const CAPS = [
  { icon: "📋", title: "Automated Reporting", desc: "Save up to 90% of ESG reporting time with AI and automations." },
  { icon: "⚡", title: "Fast-Track ESG Compliance", desc: "Reduce manual work and accelerate ESG compliance with AI-driven workflows." },
  { icon: "🔗", title: "Microsite & Stakeholder Sharing", desc: "Share results with stakeholders in one click via a branded, custom microsite." },
  { icon: "⚖️", title: "Double Materiality", desc: "Simplify your assessment with guided steps and expert support for ESRS compliance." },
  { icon: "🌍", title: "CO₂ Carbon Accounting", desc: "Measure and report your carbon footprint in minutes with audit-proof results." },
  { icon: "🎯", title: "Targets & Actions", desc: "Set goals, track progress and take actions that drive measurable results." },
  { icon: "📊", title: "Benchmarks & Simulations", desc: "Compare performance, run simulations and identify opportunities to improve." },
  { icon: "⚙️", title: "Real-Time Insights", desc: "Custom dashboards to monitor ESG performance and make better decisions." },
];

const FRAMEWORKS = [
  { abbr: "GRI", name: "Global Reporting Initiative" },
  { abbr: "CSRD", name: "Corporate Sustainability Reporting Directive" },
  { abbr: "GHG", name: "Greenhouse Gas Protocol" },
  { abbr: "SFDR", name: "Sustainable Finance Disclosure Regulation" },
  { abbr: "PCAF", name: "Partnership for Carbon Accounting Financials" },
  { abbr: "TCFD", name: "Task Force on Climate Disclosures" },
  { abbr: "ISO\n14001", name: "Environmental Management Systems" },
  { abbr: "ESRS", name: "European Sustainability Reporting Standards" },
  { abbr: "CDP", name: "Carbon Disclosure Project" },
  { abbr: "SDGs", name: "UN Sustainable Development Goals" },
  { abbr: "VSME", name: "Voluntary SME Standard" },
  { abbr: "SASB", name: "Sustainability Accounting Standards Board" },
];

const LOGOS = ["AgroVest Group", "ClimaFactory EU", "NexaEnergy Africa", "AquaFlow Industries", "GreenBuilds Co.", "EcoVentures MENA", "CarbonPath Ltd", "SustainCorp", "FarmTech Jordan"];

function useCounter(target: number, suffix: string, trigger: boolean) {
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!trigger) return;
    const duration = 2200;
    const steps = duration / 16;
    const inc = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { current = target; clearInterval(timer); }
      const display = target >= 1000 ? Math.round(current).toLocaleString() : Math.round(current);
      setVal(display + suffix);
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, suffix]);
  return val;
}

function StatCard({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const val = useCounter(target, suffix, triggered);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="stat-card" ref={ref}>
      <div className="stat-num">{val}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function CollectVisual() {
  return (
    <div className="panel-visual">
      <div className="panel-topbar">
        <div className="panel-dot" style={{ background: "#ff5f57" }} />
        <div className="panel-dot" style={{ background: "#febc2e" }} />
        <div className="panel-dot" style={{ background: "#28c840" }} />
        <span style={{ fontSize: "0.7rem", color: "var(--text3)", marginLeft: "8px" }}>Data Sources — Live</span>
      </div>
      <div className="panel-body">
        <table className="mock-table">
          <thead><tr><th>Source</th><th>Account</th><th>Status</th><th>Metrics</th></tr></thead>
          <tbody>
            <tr><td>Water Sensors</td><td>Self-owned</td><td><span className="badge badge-active">Active</span></td><td>32/80</td></tr>
            <tr><td>Energy Grid</td><td>Self-owned</td><td><span className="badge badge-active">Active</span></td><td>28/60</td></tr>
            <tr><td>Supply Chain</td><td>Partner +1</td><td><span className="badge badge-active">Active</span></td><td>41/100</td></tr>
            <tr><td>Climate API</td><td>External</td><td><span className="badge badge-risk">At Risk</span></td><td>12/40</td></tr>
            <tr><td>Factory Floor</td><td>IoT Direct</td><td><span className="badge badge-inactive">Pending</span></td><td>0/50</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnalyzeVisual() {
  const risks = [
    { name: "Water Leakage", pct: 15, color: "#4ade80", score: "Low 15/100" },
    { name: "Carbon Emissions", pct: 43, color: "#facc15", score: "Med 43/100" },
    { name: "Energy Waste", pct: 67, color: "#f97316", score: "High 67/100" },
    { name: "Supply Chain", pct: 88, color: "#ef4444", score: "High 88/100" },
  ];
  return (
    <div className="panel-visual">
      <div className="panel-topbar">
        <div className="panel-dot" style={{ background: "#ff5f57" }} /><div className="panel-dot" style={{ background: "#febc2e" }} /><div className="panel-dot" style={{ background: "#28c840" }} />
        <span style={{ fontSize: "0.7rem", color: "var(--text3)", marginLeft: "8px" }}>Risk Analysis</span>
      </div>
      <div className="panel-body">
        <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Risk Exposure Score</div>
        {risks.map(r => (
          <div className="risk-row" key={r.name}>
            <span className="risk-name">{r.name}</span>
            <div className="risk-bar-wrap"><div className="risk-bar" style={{ width: `${r.pct}%`, background: r.color }} /></div>
            <span className="risk-score">{r.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActVisual() {
  return (
    <div className="panel-visual">
      <div className="panel-topbar">
        <div className="panel-dot" style={{ background: "#ff5f57" }} /><div className="panel-dot" style={{ background: "#febc2e" }} /><div className="panel-dot" style={{ background: "#28c840" }} />
        <span style={{ fontSize: "0.7rem", color: "var(--text3)", marginLeft: "8px" }}>Impact Simulator</span>
      </div>
      <div className="panel-body">
        <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Scope Emissions Reduction</div>
        {[{ l: "Scope 1 — Direct", pct: 72, c: "#7c3aed", v: "−72%" }, { l: "Scope 2 — Energy", pct: 54, c: "#9d5cf6", v: "−54%" }, { l: "Scope 3 — Supply", pct: 31, c: "#b97bff", v: "−31%" }].map(s => (
          <div className="scope-row" key={s.l}>
            <span className="scope-label">{s.l}</span>
            <div className="scope-bar-wrap"><div className="scope-bar" style={{ width: `${s.pct}%`, background: s.c }} /></div>
            <span className="scope-val">{s.v}</span>
          </div>
        ))}
        <div style={{ marginTop: "1rem", padding: "0.75rem", background: "var(--purple-dim)", border: "1px solid var(--purple-border2)", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.72rem", color: "var(--purple3)", fontWeight: 600 }}>Projected Annual Savings</div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: "1.4rem", fontWeight: 800, color: "var(--text)", marginTop: "4px" }}>$2.4M CO₂ credits</div>
        </div>
      </div>
    </div>
  );
}

function ReportVisual() {
  return (
    <div className="panel-visual">
      <div className="panel-topbar">
        <div className="panel-dot" style={{ background: "#ff5f57" }} /><div className="panel-dot" style={{ background: "#febc2e" }} /><div className="panel-dot" style={{ background: "#28c840" }} />
        <span style={{ fontSize: "0.7rem", color: "var(--text3)", marginLeft: "8px" }}>Reporting Summary</span>
      </div>
      <div className="panel-body">
        <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Framework Completion</div>
        {[{ n: "CSRD", pct: 78, c: "#7c3aed" }, { n: "PCAF", pct: 91, c: "#9d5cf6" }, { n: "SFDR", pct: 65, c: "#b97bff" }, { n: "GRI", pct: 84, c: "#7c3aed" }].map(r => (
          <div className="report-row" key={r.n}>
            <span className="report-name">{r.n}</span>
            <div className="report-bar-wrap"><div className="report-bar" style={{ width: `${r.pct}%`, background: r.c }} /></div>
            <span className="report-pct">{r.pct}%</span>
          </div>
        ))}
        <div style={{ marginTop: "0.75rem", fontSize: "0.72rem", color: "var(--purple3)" }}>✦ 78% automated via PlanetMatrix AI</div>
      </div>
    </div>
  );
}

const VISUALS = { collect: CollectVisual, analyze: AnalyzeVisual, act: ActVisual, report: ReportVisual };

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const Visual = VISUALS[TABS[activeTab].visual as keyof typeof VISUALS];

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo">
          <LogoIcon />
          <span><span className="logo-planet">Planet</span><span className="logo-matrix">Matrix</span></span>
        </div>
        <ul className="nav-links">
          <li><a href="#solutions">Solutions</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#compliance">Compliance</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <div className="nav-actions">
          <button className="btn-ghost">Log In</button>
          <button className="btn-nav" onClick={() => scrollTo("demo")}>Book a demo</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-badge"><span className="badge-dot" />ESG & Climate Intelligence Platform</div>
        <h1>One Platform.<br /><span className="accent">All Your ESG.</span></h1>
        <div className="hero-sub-head">Infinite Impact.</div>
        <p>Manage all ESG needs on one platform, automate your reporting, and unlock a 360‑degree view of sustainability performance — for industries, farms, factories, and cities worldwide.</p>
        <div className="hero-cta">
          <button className="btn-hero" onClick={() => scrollTo("demo")}>Book a demo</button>
          <button className="btn-outline-hero" onClick={() => scrollTo("how")}>See how it works</button>
        </div>
      </section>

      {/* LOGO STRIP */}
      <div className="logo-strip">
        <p className="logo-strip-label">Trusted by forward-thinking organizations</p>
        <div className="logo-track">
          {[...LOGOS, ...LOGOS].map((l, i) => <span key={i}>{l}</span>)}
        </div>
      </div>

      {/* STATS */}
      <div className="stats-section">
        <div className="stats-inner">
          <StatCard target={90} suffix="%" label="Reduction in ESG reporting time with AI automation" />
          <StatCard target={20000} suffix="K+" label="Gallons of water saved through real-time monitoring" />
          <StatCard target={95} suffix="%" label="Accuracy in leak & anomaly detection via AI sensors" />
          <StatCard target={12} suffix="+" label="Global ESG frameworks supported out of the box" />
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="tag">How it works</span>
            <h2 className="sec-title" style={{ maxWidth: "100%", marginLeft: "auto", marginRight: "auto" }}>Our fast-changing world requires a 360° view.</h2>
            <p className="sec-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>From shifting regulations to emerging multi-vector risks, PlanetMatrix combines AI with expert guidance to protect value, ensure compliance, and build trust.</p>
          </div>
          <div className="tab-bar">
            {TABS.map((t, i) => (
              <button key={i} className={`tab-btn${activeTab === i ? " active" : ""}`} onClick={() => setActiveTab(i)}>
                <span className="tab-num">{i + 1}</span>{t.label}
              </button>
            ))}
          </div>
          <div className="tab-panel active">
            <div className="panel-text">
              <h3>{TABS[activeTab].heading}</h3>
              <p>{TABS[activeTab].body}</p>
              <ul className="check-list">
                {TABS[activeTab].points.map((pt, i) => (
                  <li key={i}><span className="check-icon">✓</span>{pt}</li>
                ))}
              </ul>
            </div>
            <Visual />
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="solutions">
        <div className="inner">
          <span className="tag">Powerful Capabilities</span>
          <h2 className="sec-title">Everything you need to manage ESG at scale</h2>
          <p className="sec-sub">Eight integrated capabilities, one unified platform — built for industries, farms, factories, and cities.</p>
          <div className="cap-grid">
            {CAPS.map((c, i) => (
              <div className="cap-card" key={i}>
                <div className="cap-icon">{c.icon}</div>
                <div className="cap-title">{c.title}</div>
                <div className="cap-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE PATH */}
      <section className="path-section" id="compliance">
        <div className="inner">
          <span className="tag">ESG Compliance</span>
          <h2 className="sec-title">Your path to success</h2>
          <p className="sec-sub">A clear, guided journey from onboarding to full compliance — automated every step of the way.</p>
          <div className="path-grid">
            {[
              { step: "Step 01", title: "Get Started", items: ["Double materiality assessment", "Carbon accounting setup", "External data collection", "Benchmarks & simulations"] },
              { step: "Step 02", title: "Report", items: ["Integrated ESG report", "CSRD reporting", "Taxonomy reporting", "Audit & assurance", "Machine-readable export"] },
              { step: "Step 03", title: "Stay Compliant", items: ["CSRD / ESRS compliant", "Taxonomy aligned", "Full audit trails", "Continuous compliance monitoring"] },
            ].map((p, i) => (
              <div className="path-card" key={i}>
                <div className="path-step">{p.step}</div>
                <div className="path-title">{p.title}</div>
                <ul className="path-list">{p.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRAMEWORKS */}
      <section>
        <div className="inner">
          <span className="tag">Compliance Frameworks</span>
          <h2 className="sec-title">Automated compliance with the world's leading sustainability frameworks</h2>
          <p className="sec-sub">Whatever your reporting obligations, PlanetMatrix makes them faster, easier, and audit-ready — across every framework.</p>
          <div className="fw-grid">
            {FRAMEWORKS.map((f, i) => (
              <div className="fw-cell" key={i}>
                <span className="fw-abbr" style={{ whiteSpace: "pre-line" }}>{f.abbr}</span>
                <span className="fw-name">{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT PILLARS */}
      <section className="pillars-section">
        <div className="inner" style={{ textAlign: "center" }}>
          <span className="tag">Data. Insight. Impact.</span>
          <h2 className="sec-title" style={{ maxWidth: "100%", marginLeft: "auto", marginRight: "auto" }}>Empowering organizations to build a sustainable future with confidence.</h2>
          <div className="pillars-grid" style={{ textAlign: "left" }}>
            {[
              { icon: "🌱", title: "Drive Impact", desc: "Reduce emissions and create positive environmental impact across your operations and value chain." },
              { icon: "🛡️", title: "Reduce Risk", desc: "Mitigate regulatory risks and ensure compliance with evolving international ESG standards." },
              { icon: "⏱️", title: "Save Time & Costs", desc: "Automate processes and optimize resource efficiency — turn weeks of reporting into hours." },
              { icon: "🤝", title: "Build Trust", desc: "Increase transparency and strengthen stakeholder trust with audit-ready, verifiable data." },
            ].map((p, i) => (
              <div className="pillar" key={i}>
                <div className="pillar-icon">{p.icon}</div>
                <div className="pillar-title">{p.title}</div>
                <div className="pillar-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="inner" style={{ maxWidth: "680px" }}>
          <span className="tag">About PlanetMatrix</span>
          <h2 className="sec-title">Powering a sustainable tomorrow.</h2>
          <p style={{ fontSize: "1rem", color: "var(--text2)", lineHeight: 1.8, marginBottom: "1.25rem" }}>PlanetMatrix is an intelligent ESG and climate intelligence platform built for industries, factories, farms, and buildings. We bridge the gap between raw environmental data and meaningful action — combining IoT sensor technology, AI-driven analytics, and global compliance frameworks into one accessible system.</p>
          <p style={{ fontSize: "1rem", color: "var(--text2)", lineHeight: 1.8 }}>Our mission: give every organization the tools to understand, manage, and reduce their environmental footprint in real time. Because what gets measured, gets managed.</p>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--font-head)", fontSize: "1.1rem", fontWeight: 800, color: "var(--purple2)" }}>www.planet-matrix.com</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text3)" }}>Official website</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-head)", fontSize: "1rem", fontWeight: 700, color: "var(--text2)" }}>info@planet-matrix.com</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text3)" }}>Get in touch</div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOK DEMO */}
      <section className="demo-section" id="demo">
        <div className="demo-inner">
          <div>
            <span className="tag">Book a Demo</span>
            <h2 className="sec-title">Streamline compliance. Enhance performance.</h2>
            <p style={{ fontSize: "0.95rem", color: "var(--text2)", lineHeight: 1.75, marginBottom: "1.25rem" }}>PlanetMatrix helps you streamline ESG compliance and unlock the full potential of your sustainability data. Complete the form to schedule a demo with our experts.</p>
            <p style={{ fontSize: "0.875rem", color: "var(--text3)", marginBottom: "0.75rem", fontWeight: 500 }}>Together on the call we will:</p>
            <ul className="demo-bullets">
              {["Discuss your ESG challenges and sustainability goals", "Demo the software and our AI capabilities live", "Explore integration with your existing infrastructure", "Discover if PlanetMatrix is the right partner for you"].map((b, i) => (
                <li key={i}><span className="demo-check">✓</span>{b}</li>
              ))}
            </ul>
          </div>
          <div>
            {!submitted ? (
              <div className="form-wrap">
                <div className="form-row2">
                  <div className="fg"><label>First Name *</label><input type="text" placeholder="Sarah" /></div>
                  <div className="fg"><label>Last Name *</label><input type="text" placeholder="Johnson" /></div>
                </div>
                <div className="fg"><label>Work Email *</label><input type="email" placeholder="sarah@company.com" /></div>
                <div className="form-row2">
                  <div className="fg"><label>Phone</label><input type="tel" placeholder="+1 555 000 0000" /></div>
                  <div className="fg"><label>Job Title</label><input type="text" placeholder="Sustainability Lead" /></div>
                </div>
                <div className="fg"><label>Company Name *</label><input type="text" placeholder="Your organization" /></div>
                <div className="fg">
                  <label>Type of Company *</label>
                  <select><option value="">Please Select</option><option>Agriculture / Farming</option><option>Manufacturing / Factory</option><option>Real Estate / Property</option><option>Energy & Utilities</option><option>Financial Services</option><option>Government / Municipality</option><option>NGO / Non-Profit</option><option>Other</option></select>
                </div>
                <div className="fg">
                  <label>My top priority is</label>
                  <select><option value="">Please Select</option><option>ESG Reporting & Compliance</option><option>Carbon Accounting</option><option>Water Management</option><option>Energy Efficiency</option><option>Stakeholder Reporting</option></select>
                </div>
                <div className="fg"><label>Message</label><textarea placeholder="Tell us about your ESG or sustainability goals..." /></div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.78rem", color: "var(--text3)" }}>
                  <input type="checkbox" style={{ marginTop: "2px", width: "auto" }} />
                  <span>I agree to receive industry insights and relevant updates from PlanetMatrix.</span>
                </div>
                <button className="btn-submit" onClick={() => setSubmitted(true)}>Request a Demo →</button>
                <p className="form-note">No commitment required. We typically respond within 24 hours.</p>
              </div>
            ) : (
              <div className="success-msg" style={{ display: "block" }}>
                🌍 Thank you — we&apos;ve received your request!<br />
                <span style={{ fontSize: "0.875rem", fontWeight: 400, color: "var(--text2)", display: "block", marginTop: "0.5rem" }}>A PlanetMatrix team member will be in touch within 24 hours.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo" style={{ marginBottom: "0.5rem" }}>
              <LogoIcon /><span><span className="logo-planet">Planet</span><span className="logo-matrix">Matrix</span></span>
            </div>
            <p>One Platform. All Your ESG. Infinite Impact. Intelligent sustainability intelligence for industries, farms, and cities worldwide.</p>
            <div className="footer-domain">www.planet-matrix.com</div>
          </div>
          <div className="fc"><h4>Platform</h4><ul><li><a href="#solutions">Capabilities</a></li><li><a href="#how">How It Works</a></li><li><a href="#compliance">Compliance</a></li><li><a href="#demo">Book a Demo</a></li></ul></div>
          <div className="fc"><h4>Company</h4><ul><li><a href="#about">About</a></li><li><a href="#">Careers</a></li><li><a href="#">Press</a></li><li><a href="#">Contact</a></li></ul></div>
          <div className="fc"><h4>Legal</h4><ul><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Service</a></li><li><a href="#">Cookie Policy</a></li><li><a href="#">Data Processing</a></li></ul></div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 PlanetMatrix. All rights reserved. | info@planet-matrix.com</p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="LinkedIn">in</a>
            <a href="#" className="social-link" aria-label="Twitter">𝕏</a>
            <a href="#" className="social-link" aria-label="Instagram">ig</a>
          </div>
        </div>
      </footer>
    </>
  );
}
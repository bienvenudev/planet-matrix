"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const Logo = ({ size = 128}: { size?: number }) => (
  <Image
    src="/planet-matrix-logo.jpeg"
    alt="PlanetMatrix logo"
    width={size}
    height={size}
    className="rounded-full object-cover"
    priority
  />
);

/* ─── Data ──────────────────────────────────────────────── */
const TABS = [
  {
    label: "Collect",
    heading: "Build a trusted data foundation for growth",
    body: "Connect IoT sensors, meters, and data streams from water systems, energy grids, and climate instruments into one unified source of truth.",
    points: ["Reflect your organizational structure directly in PlanetMatrix","Unite internal data sources and your external value chain","Create custom metrics that aggregate any data from any source","One source of truth for reporting, analysis, and management"],
    visual: "collect",
  },
  {
    label: "Analyze",
    heading: "Transform your data into actionable intelligence",
    body: "AI models process data 250 times per second, detecting anomalies and inefficiencies invisible to manual inspection — before they become costly problems.",
    points: ["Uncover climate, geopolitical, and operational risks","Detect anomalies with AI to flag issues before they escalate","Benchmark performance against peers and industry standards","Design custom dashboards to track what matters most"],
    visual: "analyze",
  },
  {
    label: "Act",
    heading: "Maximise the commercial value of your data",
    body: "Real-time alerts, automated shutoff controls, and scenario planning tools let your team respond in seconds — backed by data.",
    points: ["Run scenario analyses to compare outcomes","Prioritise high-impact actions for maximum ROI","Automated alerts with root-cause context","Benefit from real-time updates to stay ahead"],
    visual: "act",
  },
  {
    label: "Report",
    heading: "Demonstrate impact to build lasting trust",
    body: "Generate audit-ready ESG reports aligned to global frameworks at the click of a button. Share directly with investors, banks, and auditors.",
    points: ["Create compliant reports for any framework from one source","Export in branded microsites, Excel, and custom formats","Share with stakeholders in one click","Machine-readable, audit-proof, fully transparent"],
    visual: "report",
  },
];

const CAPS = [
  { icon: "📋", title: "Automated Reporting",           desc: "Save up to 90% of ESG reporting time with AI and automations." },
  { icon: "⚡", title: "Fast-Track ESG Compliance",      desc: "Reduce manual work and accelerate ESG compliance with AI-driven workflows." },
  { icon: "🔗", title: "Microsite & Stakeholder Sharing",desc: "Share results with stakeholders in one click via a branded, custom microsite." },
  { icon: "⚖️", title: "Double Materiality",             desc: "Simplify your assessment with guided steps and expert support for ESRS compliance." },
  { icon: "🌍", title: "CO₂ Carbon Accounting",          desc: "Measure and report your carbon footprint in minutes with audit-proof results." },
  { icon: "🎯", title: "Targets & Actions",              desc: "Set goals, track progress and take actions that drive measurable results." },
  { icon: "📊", title: "Benchmarks & Simulations",       desc: "Compare performance, run simulations and identify opportunities to improve." },
  { icon: "⚙️", title: "Real-Time Insights",             desc: "Custom dashboards to monitor ESG performance and make better decisions." },
];

const FRAMEWORKS = [
  { abbr: "GRI",     name: "Global Reporting Initiative" },
  { abbr: "CSRD",    name: "Corporate Sustainability Reporting Directive" },
  { abbr: "GHG",     name: "Greenhouse Gas Protocol" },
  { abbr: "SFDR",    name: "Sustainable Finance Disclosure Regulation" },
  { abbr: "PCAF",    name: "Partnership for Carbon Accounting Financials" },
  { abbr: "TCFD",    name: "Task Force on Climate Disclosures" },
  { abbr: "ISO 14001",name: "Environmental Management Systems" },
  { abbr: "ESRS",    name: "European Sustainability Reporting Standards" },
  { abbr: "CDP",     name: "Carbon Disclosure Project" },
  { abbr: "SDGs",    name: "UN Sustainable Development Goals" },
  { abbr: "VSME",    name: "Voluntary SME Standard" },
  { abbr: "SASB",    name: "Sustainability Accounting Standards Board" },
];

const LOGOS = ["AgroVest Group","ClimaFactory EU","NexaEnergy Africa","AquaFlow Industries","GreenBuilds Co.","EcoVentures MENA","CarbonPath Ltd","SustainCorp","FarmTech Jordan"];

const PATH_STEPS = [
  { step:"Step 01", title:"Get Started",     items:["Double materiality assessment","Carbon accounting setup","External data collection","Benchmarks & simulations"] },
  { step:"Step 02", title:"Report",          items:["Integrated ESG report","CSRD reporting","Taxonomy reporting","Audit & assurance","Machine-readable export"] },
  { step:"Step 03", title:"Stay Compliant",  items:["CSRD / ESRS compliant","Taxonomy aligned","Full audit trails","Continuous compliance monitoring"] },
];

const PILLARS = [
  { icon:"🌱", title:"Drive Impact",       desc:"Reduce emissions and create positive environmental impact across your operations and value chain." },
  { icon:"🛡️", title:"Reduce Risk",        desc:"Mitigate regulatory risks and ensure compliance with evolving international ESG standards." },
  { icon:"⏱️", title:"Save Time & Costs",  desc:"Automate processes and optimize resource efficiency — turn weeks of reporting into hours." },
  { icon:"🤝", title:"Build Trust",        desc:"Increase transparency and strengthen stakeholder trust with audit-ready, verifiable data." },
];

/* ─── Counter hook ──────────────────────────────────────── */
function useCounter(target: number, suffix: string, trigger: boolean) {
  const [val, setVal] = useState("0" + suffix);
  useEffect(() => {
    if (!trigger) return;
    const steps = 2200 / 16;
    const inc = target / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { cur = target; clearInterval(t); }
      const d = target >= 1000 ? Math.round(cur).toLocaleString() : Math.round(cur);
      setVal(d + suffix);
    }, 16);
    return () => clearInterval(t);
  }, [trigger, target, suffix]);
  return val;
}

function StatCard({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const val = useCounter(target, suffix, on);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="rounded-2xl border border-white/[0.07] bg-[#0e0b1a] p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#7c3aed]/40">
      <div className="font-['Manrope'] text-[2.6rem] font-extrabold leading-none text-[#9d5cf6] mb-2">{val}</div>
      <div className="text-sm text-[#a89dc8] leading-snug">{label}</div>
    </div>
  );
}

/* ─── Mock dashboard visuals ────────────────────────────── */
const PanelShell = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-[#7c3aed]/10 bg-[#130f22] overflow-hidden shadow-[0_0_60px_rgba(124,58,237,0.08)]">
    <div className="flex items-center gap-2 bg-[#1a1530] border-b border-white/[0.07] px-4 py-2.5">
      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"/>
      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"/>
      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]"/>
      <span className="text-[0.7rem] text-[#5e567a] ml-2">{title}</span>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const CollectVisual = () => (
  <PanelShell title="Data Sources — Live">
    <table className="w-full text-xs border-collapse">
      <thead>
        <tr>{["Source","Account","Status","Metrics"].map(h=><th key={h} className="text-left text-[#5e567a] font-medium pb-2 px-1 border-b border-white/[0.07]">{h}</th>)}</tr>
      </thead>
      <tbody>
        {[
          ["Water Sensors","Self-owned","active","32/80"],
          ["Energy Grid",  "Self-owned","active","28/60"],
          ["Supply Chain", "Partner +1","active","41/100"],
          ["Climate API",  "External",  "risk",  "12/40"],
          ["Factory Floor","IoT Direct","pending","0/50"],
        ].map(([src,acc,status,metrics])=>(
          <tr key={src} className="border-b border-white/[0.04]">
            <td className="py-2 px-1 text-[#a89dc8]">{src}</td>
            <td className="py-2 px-1 text-[#a89dc8]">{acc}</td>
            <td className="py-2 px-1">
              <span className={`px-2 py-0.5 rounded-full text-[0.65rem] font-semibold ${
                status==="active"  ? "bg-green-500/10 text-green-400" :
                status==="risk"    ? "bg-red-500/10 text-red-400" :
                                     "bg-slate-500/10 text-slate-400"
              }`}>{status==="active"?"Active":status==="risk"?"At Risk":"Pending"}</span>
            </td>
            <td className="py-2 px-1 text-[#a89dc8]">{metrics}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </PanelShell>
);

const AnalyzeVisual = () => (
  <PanelShell title="Risk Analysis">
    <p className="text-[0.72rem] text-[#5e567a] uppercase tracking-widest mb-4">Risk Exposure Score</p>
    {[
      { name:"Water Leakage",   pct:15, color:"#4ade80", label:"Low 15/100" },
      { name:"Carbon Emissions",pct:43, color:"#facc15", label:"Med 43/100" },
      { name:"Energy Waste",    pct:67, color:"#f97316", label:"High 67/100" },
      { name:"Supply Chain",    pct:88, color:"#ef4444", label:"High 88/100" },
    ].map(r=>(
      <div key={r.name} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04]">
        <span className="text-[0.8rem] text-[#a89dc8] w-36 shrink-0">{r.name}</span>
        <div className="flex-1 h-1 bg-[#221d3a] rounded-full">
          <div className="h-full rounded-full" style={{width:`${r.pct}%`,background:r.color}}/>
        </div>
        <span className="text-[0.75rem] text-[#5e567a] shrink-0 w-24 text-right">{r.label}</span>
      </div>
    ))}
  </PanelShell>
);

const ActVisual = () => (
  <PanelShell title="Impact Simulator">
    <p className="text-[0.72rem] text-[#5e567a] uppercase tracking-widest mb-4">Scope Emissions Reduction</p>
    {[
      { l:"Scope 1 — Direct", pct:72, c:"#7c3aed", v:"−72%" },
      { l:"Scope 2 — Energy", pct:54, c:"#9d5cf6", v:"−54%" },
      { l:"Scope 3 — Supply", pct:31, c:"#b97bff", v:"−31%" },
    ].map(s=>(
      <div key={s.l} className="flex items-center gap-3 mb-3">
        <span className="text-[0.78rem] text-[#a89dc8] w-36 shrink-0">{s.l}</span>
        <div className="flex-1 h-1.5 bg-[#221d3a] rounded-full">
          <div className="h-full rounded-full" style={{width:`${s.pct}%`,background:s.c}}/>
        </div>
        <span className="text-[0.78rem] text-[#5e567a] w-8 text-right">{s.v}</span>
      </div>
    ))}
    <div className="mt-4 p-3 rounded-lg border border-[#7c3aed]/10 bg-[#7c3aed]/10">
      <p className="text-[0.72rem] text-[#b97bff] font-semibold">Projected Annual Savings</p>
      <p className="font-['Manrope'] text-2xl font-extrabold text-[#f0eeff] mt-1">$2.4M CO₂ credits</p>
    </div>
  </PanelShell>
);

const ReportVisual = () => (
  <PanelShell title="Reporting Summary">
    <p className="text-[0.72rem] text-[#5e567a] uppercase tracking-widest mb-4">Framework Completion</p>
    {[
      { n:"CSRD", pct:78, c:"#7c3aed" },
      { n:"PCAF", pct:91, c:"#9d5cf6" },
      { n:"SFDR", pct:65, c:"#b97bff" },
      { n:"GRI",  pct:84, c:"#7c3aed" },
    ].map(r=>(
      <div key={r.n} className="flex items-center gap-3 mb-3">
        <span className="text-[0.78rem] text-[#a89dc8] w-12 shrink-0">{r.n}</span>
        <div className="flex-1 h-1.5 bg-[#221d3a] rounded-full">
          <div className="h-full rounded-full" style={{width:`${r.pct}%`,background:r.c}}/>
        </div>
        <span className="text-[0.78rem] text-[#5e567a] w-8 text-right">{r.pct}%</span>
      </div>
    ))}
    <p className="text-[0.72rem] text-[#b97bff] mt-2">✦ 78% automated via PlanetMatrix AI</p>
  </PanelShell>
);

const VISUALS = { collect: CollectVisual, analyze: AnalyzeVisual, act: ActVisual, report: ReportVisual };

/* ─── Page ──────────────────────────────────────────────── */
export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const Visual = VISUALS[TABS[activeTab].visual as keyof typeof VISUALS];

  return (
    <>
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[6%] h-[66px] bg-[#08060f]/90 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="flex items-center gap-2.5 font-['Manrope'] text-lg font-extrabold tracking-tight">
          <Logo />
          {/* <span className="text-[#f0eeff]">Planet</span><span className="text-[#9d5cf6]">Matrix</span> */}
        </div>
        <ul className="hidden md:flex items-center gap-8 list-none">
          {["Solutions","How It Works","Compliance","About"].map((l,i)=>(
            <li key={l}><a href={["#solutions","#how","#compliance","#about"][i]} className="text-sm text-[#a89dc8] hover:text-[#f0eeff] transition-colors">{l}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-[#a89dc8] border border-white/[0.07] hover:border-[#7c3aed]/40 hover:text-[#f0eeff] rounded-lg px-4 py-2 bg-transparent transition-all">Log In</button>
          <button onClick={()=>scrollTo("demo")} className="text-sm font-semibold text-white bg-[#7c3aed] hover:bg-[#9d5cf6] rounded-lg px-4 py-2 transition-all hover:-translate-y-px">Book a demo</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="top" className="relative min-h-screen flex flex-col items-center justify-center text-center px-[6%] pt-32 pb-20 overflow-hidden">
        <div className="hero-glow"/>
        <div className="hero-grid-bg"/>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="animate-fade-up-1 font-['Manrope'] font-extrabold leading-[1.06] tracking-[-0.03em] text-[clamp(2.6rem,6.5vw,5rem)] text-[#f0eeff] max-w-4xl mb-1">
            One Platform.<br/><span className="text-[#9d5cf6]">All Your ESG.</span>
          </h1>
          <p className="animate-fade-up-2 font-['Manrope'] font-extrabold leading-tight tracking-[-0.025em] text-[clamp(1.6rem,4vw,3rem)] text-[#b97bff] mb-6">Infinite Impact.</p>
          <p className="animate-fade-up-3 text-lg text-[#a89dc8] max-w-xl leading-relaxed mb-10">
            Manage all ESG needs on one platform, automate your reporting, and unlock a 360‑degree view of sustainability performance — for industries, farms, factories, and cities worldwide.
          </p>
          <div className="animate-fade-up-4 flex gap-4 flex-wrap justify-center">
            <button onClick={()=>scrollTo("demo")} className="text-base font-semibold text-white bg-[#7c3aed] hover:bg-[#9d5cf6] rounded-xl px-9 py-3.5 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(124,58,237,0.4)]">Book a demo</button>
            <button onClick={()=>scrollTo("how")} className="text-base font-medium text-[#f0eeff] border border-white/[0.07] hover:border-[#7c3aed]/40 hover:text-[#b97bff] rounded-xl px-9 py-3.5 bg-transparent transition-all">See how it works</button>
          </div>
        </div>
      </section>

      {/* ── LOGO STRIP ── */}
      <div className="border-t border-b border-white/[0.07] py-6 overflow-hidden">
        <p className="text-center text-[0.72rem] uppercase tracking-[0.12em] text-[#5e567a] mb-5">Trusted by forward-thinking organizations</p>
        <div className="animate-marquee flex gap-16 items-center whitespace-nowrap w-max">
          {[...LOGOS,...LOGOS].map((l,i)=>(
            <span key={i} className="font-['Manrope'] font-bold text-[0.95rem] text-[#5e567a] opacity-60 shrink-0">{l}</span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="py-20 px-[6%]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard target={90}    suffix="%" label="Reduction in ESG reporting time with AI automation"/>
          <StatCard target={20000} suffix="K+" label="Gallons of water saved through real-time monitoring"/>
          <StatCard target={95}    suffix="%" label="Accuracy in leak & anomaly detection via AI sensors"/>
          <StatCard target={12}    suffix="+" label="Global ESG frameworks supported out of the box"/>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-[6%] bg-[#0e0b1a] border-t border-b border-white/[0.07]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[0.72rem] uppercase tracking-[0.1em] text-[#b97bff] font-semibold">How it works</span>
            <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.7rem,3.5vw,2.6rem)] tracking-tight text-[#f0eeff] mt-2 mb-3">Our fast-changing world requires a 360° view.</h2>
            <p className="text-[#a89dc8] max-w-xl mx-auto leading-relaxed">From shifting regulations to emerging multi-vector risks, PlanetMatrix combines AI with expert guidance to protect value, ensure compliance, and build trust.</p>
          </div>

          {/* Tab bar */}
          <div className="flex bg-[#130f22] border border-white/[0.07] rounded-xl p-1.5 gap-1 mb-10">
            {TABS.map((t,i)=>(
              <button key={i} onClick={()=>setActiveTab(i)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-[9px] text-sm font-medium transition-all ${
                  activeTab===i ? "bg-[#221d3a] text-[#f0eeff]" : "text-[#5e567a] hover:text-[#a89dc8]"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.7rem] font-bold border transition-all ${
                  activeTab===i ? "bg-[#7c3aed] border-[#7c3aed] text-white" : "bg-[#1a1530] border-white/[0.07] text-[#5e567a]"
                }`}>{i+1}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="font-['Manrope'] text-2xl font-bold tracking-tight text-[#f0eeff] mb-4">{TABS[activeTab].heading}</h3>
              <p className="text-[0.95rem] text-[#a89dc8] leading-relaxed mb-6">{TABS[activeTab].body}</p>
              <ul className="space-y-3">
                {TABS[activeTab].points.map((pt,i)=>(
                  <li key={i} className="flex items-start gap-2.5 text-[0.9rem] text-[#a89dc8]">
                    <span className="mt-0.5 w-4.5 h-4.5 shrink-0 rounded-full bg-[#7c3aed]/[0.14] border border-[#7c3aed]/25 flex items-center justify-center text-[0.55rem] text-[#9d5cf6]">✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <Visual />
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section id="solutions" className="py-24 px-[6%]">
        <div className="max-w-5xl mx-auto">
          <span className="text-[0.72rem] uppercase tracking-[0.1em] text-[#b97bff] font-semibold">Powerful Capabilities</span>
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.7rem,3.5vw,2.6rem)] tracking-tight text-[#f0eeff] mt-2 mb-3 max-w-lg">Everything you need to manage ESG at scale</h2>
          <p className="text-[#a89dc8] max-w-md leading-relaxed mb-12">Eight integrated capabilities, one unified platform — built for industries, farms, factories, and cities.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] border border-white/[0.07] rounded-2xl overflow-hidden">
            {CAPS.map((c,i)=>(
              <div key={i} className="bg-[#0e0b1a] hover:bg-[#130f22] transition-colors p-7">
                <div className="text-2xl mb-4">{c.icon}</div>
                <div className="font-['Manrope'] text-[0.85rem] font-bold text-[#f0eeff] uppercase tracking-wide mb-2">{c.title}</div>
                <div className="text-[0.82rem] text-[#a89dc8] leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE PATH ── */}
      <section id="compliance" className="py-24 px-[6%] bg-[#0e0b1a] border-t border-b border-white/[0.07]">
        <div className="max-w-5xl mx-auto">
          <span className="text-[0.72rem] uppercase tracking-[0.1em] text-[#b97bff] font-semibold">ESG Compliance</span>
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.7rem,3.5vw,2.6rem)] tracking-tight text-[#f0eeff] mt-2 mb-3 max-w-lg">Your path to success</h2>
          <p className="text-[#a89dc8] max-w-md leading-relaxed mb-12">A clear, guided journey from onboarding to full compliance — automated every step of the way.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PATH_STEPS.map((p,i)=>(
              <div key={i} className="path-card-accent relative bg-[#130f22] border border-white/[0.07] rounded-2xl p-8 hover:border-[#7c3aed]/40 transition-colors overflow-hidden">
                <p className="text-[0.7rem] uppercase tracking-[0.12em] text-[#b97bff] font-bold mb-3">{p.step}</p>
                <p className="font-['Manrope'] text-lg font-bold text-[#f0eeff] mb-4">{p.title}</p>
                <ul className="space-y-0">
                  {p.items.map((it,j)=>(
                    <li key={j} className="flex items-center gap-2 text-[0.85rem] text-[#a89dc8] py-1.5 border-b border-white/[0.04]">
                      <span className="text-[#b97bff] text-xs">→</span>{it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAMEWORKS ── */}
      <section className="py-24 px-[6%]">
        <div className="max-w-5xl mx-auto">
          <span className="text-[0.72rem] uppercase tracking-[0.1em] text-[#b97bff] font-semibold">Compliance Frameworks</span>
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.7rem,3.5vw,2.6rem)] tracking-tight text-[#f0eeff] mt-2 mb-3 max-w-xl">Automated compliance with the world&apos;s leading sustainability frameworks</h2>
          <p className="text-[#a89dc8] max-w-md leading-relaxed mb-12">Whatever your reporting obligations, PlanetMatrix makes them faster, easier, and audit-ready — across every framework.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/[0.04] border border-white/[0.07] rounded-2xl overflow-hidden">
            {FRAMEWORKS.map((f,i)=>(
              <div key={i} className="bg-[#0e0b1a] hover:bg-[#130f22] border-l-2 border-l-transparent hover:border-l-[#7c3aed] transition-all p-6 flex flex-col gap-2">
                <span className="font-['Manrope'] text-lg font-extrabold text-[#f0eeff] tracking-tight">{f.abbr}</span>
                <span className="text-[0.78rem] text-[#a89dc8] leading-snug">{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT PILLARS ── */}
      <section className="py-24 px-[6%] bg-[#0e0b1a] border-t border-white/[0.07]">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[0.72rem] uppercase tracking-[0.1em] text-[#b97bff] font-semibold">Data. Insight. Impact.</span>
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.7rem,3.5vw,2.6rem)] tracking-tight text-[#f0eeff] mt-2 mb-12 max-w-2xl mx-auto">Empowering organizations to build a sustainable future with confidence.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {PILLARS.map((p,i)=>(
              <div key={i} className="bg-[#130f22] border border-white/[0.07] rounded-2xl p-8 text-center hover:border-[#7c3aed]/40 hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-4">{p.icon}</div>
                <div className="font-['Manrope'] text-[0.85rem] font-bold text-[#b97bff] uppercase tracking-widest mb-2">{p.title}</div>
                <div className="text-[0.83rem] text-[#a89dc8] leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 px-[6%] border-t border-white/[0.07]">
        <div className="max-w-2xl mx-auto">
          <span className="text-[0.72rem] uppercase tracking-[0.1em] text-[#b97bff] font-semibold">About PlanetMatrix</span>
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.7rem,3.5vw,2.6rem)] tracking-tight text-[#f0eeff] mt-2 mb-5">Powering a sustainable tomorrow.</h2>
          <p className="text-[#a89dc8] leading-[1.8] mb-5">PlanetMatrix is an intelligent ESG and climate intelligence platform built for industries, factories, farms, and buildings. We bridge the gap between raw environmental data and meaningful action — combining IoT sensor technology, AI-driven analytics, and global compliance frameworks into one accessible system.</p>
          <p className="text-[#a89dc8] leading-[1.8]">Our mission: give every organization the tools to understand, manage, and reduce their environmental footprint in real time. Because what gets measured, gets managed.</p>
          <div className="mt-6 flex gap-8 flex-wrap">
            <div>
              <p className="font-['Manrope'] font-extrabold text-[#9d5cf6]">www.planet-matrix.com</p>
              <p className="text-xs text-[#5e567a]">Official website</p>
            </div>
            <div>
              <p className="font-['Manrope'] font-bold text-[#a89dc8]">info@planet-matrix.com</p>
              <p className="text-xs text-[#5e567a]">Get in touch</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOK DEMO ── */}
      <section id="demo" className="py-28 px-[6%] border-t border-white/[0.07]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <span className="text-[0.72rem] uppercase tracking-[0.1em] text-[#b97bff] font-semibold">Book a Demo</span>
            <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.7rem,3.5vw,2.6rem)] tracking-tight text-[#f0eeff] mt-2 mb-4">Streamline compliance. Enhance performance.</h2>
            <p className="text-[0.95rem] text-[#a89dc8] leading-relaxed mb-5">PlanetMatrix helps you streamline ESG compliance and unlock the full potential of your sustainability data.</p>
            <p className="text-sm text-[#5e567a] font-medium mb-4">Together on the call we will:</p>
            <ul className="space-y-3">
              {["Discuss your ESG challenges and sustainability goals","Demo the software and our AI capabilities live","Explore integration with your existing infrastructure","Discover if PlanetMatrix is the right partner for you"].map((b,i)=>(
                <li key={i} className="flex items-start gap-2.5 text-[0.9rem] text-[#a89dc8]">
                  <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-[#7c3aed]/[0.14] border border-[#7c3aed]/25 flex items-center justify-center text-[0.55rem] text-[#9d5cf6]">✓</span>{b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {!submitted ? (
              <div className="flex flex-col gap-3.5">
                <div className="grid grid-cols-2 gap-3.5">
                  <Field label="First Name *" type="text" placeholder="Sarah"/>
                  <Field label="Last Name *"  type="text" placeholder="Johnson"/>
                </div>
                <Field label="Work Email *" type="email" placeholder="sarah@company.com"/>
                <div className="grid grid-cols-2 gap-3.5">
                  <Field label="Phone"      type="tel"  placeholder="+1 555 000 0000"/>
                  <Field label="Job Title"  type="text" placeholder="Sustainability Lead"/>
                </div>
                <Field label="Company Name *" type="text" placeholder="Your organization"/>
                <SelectField label="Type of Company *" options={["Agriculture / Farming","Manufacturing / Factory","Real Estate / Property","Energy & Utilities","Financial Services","Government / Municipality","NGO / Non-Profit","Other"]}/>
                <SelectField label="My top priority is" options={["ESG Reporting & Compliance","Carbon Accounting","Water Management","Energy Efficiency","Stakeholder Reporting"]}/>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.72rem] text-[#5e567a] font-medium uppercase tracking-widest">Message</label>
                  <textarea placeholder="Tell us about your ESG or sustainability goals..." rows={3}
                    className="w-full bg-[#130f22] border border-white/[0.07] focus:border-[#7c3aed]/40 focus:ring-2 focus:ring-[#7c3aed]/10 rounded-lg px-3.5 py-2.5 text-sm text-[#f0eeff] placeholder-[#5e567a] outline-none resize-y transition-all"/>
                </div>
                <label className="flex items-start gap-2 text-[0.78rem] text-[#5e567a] cursor-pointer">
                  <input type="checkbox" className="mt-0.5 accent-[#7c3aed]"/>
                  I agree to receive industry insights and relevant updates from PlanetMatrix.
                </label>
                <button onClick={()=>setSubmitted(true)}
                  className="w-full mt-1 bg-[#7c3aed] hover:bg-[#9d5cf6] text-white font-semibold text-[0.95rem] rounded-lg py-3.5 transition-all hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(124,58,237,0.35)]">
                  Request a Demo →
                </button>
                <p className="text-center text-[0.72rem] text-[#5e567a]">No commitment required. We typically respond within 24 hours.</p>
              </div>
            ) : (
              <div className="bg-[#7c3aed]/[0.14] border border-[#7c3aed]/25 rounded-2xl p-8 text-center">
                <p className="font-['Manrope'] text-lg font-bold text-[#b97bff]">🌍 Thank you — we&apos;ve received your request!</p>
                <p className="text-sm text-[#a89dc8] mt-2">A PlanetMatrix team member will be in touch within 24 hours.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#08060f] border-t border-white/[0.07] px-[6%] pt-16 pb-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 font-['Manrope'] text-lg font-extrabold tracking-tight mb-3">
              <Logo size={28}/><span className="text-[#f0eeff]">Planet</span><span className="text-[#9d5cf6]">Matrix</span>
            </div>
            <p className="text-[0.85rem] text-[#5e567a] leading-relaxed max-w-[220px]">One Platform. All Your ESG. Infinite Impact.</p>
            <p className="text-[0.8rem] text-[#b97bff] mt-2">www.planet-matrix.com</p>
          </div>
          {[
            { h:"Platform", links:[["Capabilities","#solutions"],["How It Works","#how"],["Compliance","#compliance"],["Book a Demo","#demo"]] },
            { h:"Company",  links:[["About","#about"],["Careers","#"],["Press","#"],["Contact","#"]] },
            { h:"Legal",    links:[["Privacy Policy","#"],["Terms of Service","#"],["Cookie Policy","#"],["Data Processing","#"]] },
          ].map(col=>(
            <div key={col.h}>
              <h4 className="text-[0.72rem] uppercase tracking-[0.1em] text-[#5e567a] font-semibold mb-4">{col.h}</h4>
              <ul className="space-y-2">
                {col.links.map(([label,href])=>(
                  <li key={label}><a href={href} className="text-[0.85rem] text-[#a89dc8] hover:text-[#b97bff] transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-5xl mx-auto border-t border-white/[0.07] pt-6 flex items-center justify-between flex-wrap gap-4">
          <p className="text-[0.78rem] text-[#5e567a]">© 2026 PlanetMatrix. All rights reserved. | info@planet-matrix.com</p>
          <div className="flex gap-3">
            {["in","𝕏","ig"].map((s,i)=>(
              <a key={i} href="#" className="w-8 h-8 rounded-lg bg-[#0e0b1a] border border-white/[0.07] hover:border-[#7c3aed]/40 hover:text-[#b97bff] flex items-center justify-center text-[#5e567a] text-xs font-bold transition-all">{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

/* ─── Reusable form atoms ───────────────────────────────── */
function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.72rem] text-[#5e567a] font-medium uppercase tracking-widest">{label}</label>
      <input type={type} placeholder={placeholder}
        className="w-full bg-[#130f22] border border-white/[0.07] focus:border-[#7c3aed]/40 focus:ring-2 focus:ring-[#7c3aed]/10 rounded-lg px-3.5 py-2.5 text-sm text-[#f0eeff] placeholder-[#5e567a] outline-none transition-all"/>
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.72rem] text-[#5e567a] font-medium uppercase tracking-widest">{label}</label>
      <select className="w-full bg-[#130f22] border border-white/[0.07] focus:border-[#7c3aed]/40 rounded-lg px-3.5 py-2.5 text-sm text-[#a89dc8] outline-none transition-all">
        <option value="">Please Select</option>
        {options.map(o=><option key={o} className="bg-[#08060f]">{o}</option>)}
      </select>
    </div>
  );
}
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import ReportDashboard from "@/components/ReportDashboard";
import GeoDashboard from "@/components/GeoDashboard";
import RiskDashboard from "@/components/RiskDashboard";
import DataSourcesPanel from "@/components/DataSourcesPanel";

// Wide wordmark (1346×265). Control the rendered size with a height class
// (`w-auto` keeps the aspect ratio); never crop it into a circle.
const Logo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <Image
    src="/PlanetMatrix-Logo-light.png"
    alt="PlanetMatrix logo"
    width={1346}
    height={265}
    className={`shrink-0 ${className}`}
    priority
  />
);

/* ─── Data ──────────────────────────────────────────────── */
const TABS = [
  {
    label: "Collect",
    heading: "Build a trusted data foundation for growth",
    body: "Collect real-time data from IoT devices for water systems, energy grids, carbon, and climate instruments into one central platform to enable multi-party, automated tracking, calculation, and reporting for Scope 1, 2, and 3 data.",
    points: ["Reflect your organizational structure directly in PlanetMatrix", "Unite internal data sources and your external value chain", "Create custom metrics that aggregate any data from any source", "Share results with stakeholders in one click"],
    image: "/tab-collect.png",
  },
  {
    label: "Analyze",
    heading: "Turn your data into clear intelligence",
    body: "Our intelligence layer processes data 250 times per second, detecting anomalies and inefficiencies invisible to manual inspection, giving your team the insight to act before problems become costly.",
    points: ["Uncover climate, geopolitical, cybersecurity, and operational risks", "Detect anomalies with AI to flag issues before they escalate", "Benchmark performance against peers and industry standards", "Design custom dashboards to track what matters most"],
    image: "/tab-analyze.png",
  },
  {
    label: "Act",
    heading: "Maximize the commercial value of your data",
    body: "Turn ESG data into commercial advantage. Real-time alerts, automated controls, and scenario planning tools give your team the speed to protect revenue, cut costs, and drive measurable ROI, all backed by live data.",
    points: ["Run scenario analyses to compare outcomes and protect margin", "Prioritise actions that drive the strongest ROI and commercial return", "Real-time alerts with root-cause context, stop problems before they cost you", "Embed ESG into your commercial strategy, not just compliance"],
    image: "/tab-act-white.png",
    // image: "/tab-act.png",
  },
  {
    label: "Report",
    heading: "Demonstrate impact to build lasting trust",
    body: "Generate audit-ready CSRD, GRI, and ESG reports aligned to global frameworks at the click of a button. Share directly with manufacturing, farms, airports, hotels, and banks.",
    points: ["Generate CSRD-ready and GRI-compliant reports from one data source", "Export in branded microsites, Excel, and custom formats", "Share with stakeholders in one click", "Machine-readable, audit-proof, fully transparent"],
    image: "/tab-report-white.png",
    // image: "/tab-report.png",
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
  { abbr: "GRI", name: "Global Reporting Initiative", logo: "/frameworks/mono/gri.png" },
  { abbr: "CSRD", name: "Corporate Sustainability Reporting Directive", logo: "/frameworks/mono/csrd.png" },
  { abbr: "GHG", name: "Greenhouse Gas Protocol", logo: "/frameworks/mono/ghg.png" },
  { abbr: "SFDR", name: "Sustainable Finance Disclosure Regulation", logo: "/frameworks/mono/sfdr.png" },
  { abbr: "SDGs", name: "UN Sustainable Development Goals", logo: "/frameworks/mono/sdgs.png" },
  { abbr: "ESRS", name: "European Sustainability Reporting Standards", logo: "/frameworks/mono/esrs.png" },
];

const LOGOS = ["SUEZ", "Thames Water", "Siemens", "AWS", "Schneider Electric", "EIT", "Climate-KIC", "EIC", "JV", "LCL", "CSRD", "GIZ", "German Water Partnership", "ClimatePartner Gmbh", "Groupe ADP", "Carbon Clean", "World Bank"];

const PATH_STEPS = [
  { step: "Step 01", title: "Get Started", items: ["Double materiality assessment", "Carbon accounting setup", "External data collection", "Benchmarks & simulations"] },
  { step: "Step 02", title: "Report", items: ["Integrated ESG report", "CSRD reporting", "Taxonomy reporting", "Audit & assurance", "Machine-readable export"] },
  { step: "Step 03", title: "Stay Compliant", items: ["CSRD / ESRS compliant", "Taxonomy aligned", "Full audit trails", "Continuous compliance monitoring"] },
];

const PILLARS = [
  { icon: "/climate.png", title: "Drive Impact", desc: "Reduce emissions and create positive environmental impact across your operations and value chain." },
  { icon: "/risk.png", title: "Reduce Risk", desc: "Mitigate regulatory risks and ensure compliance with evolving international ESG standards." },
  { icon: "/time-cost.png", title: "Save Time & Costs", desc: "Automate your reporting and resource tracking. Cut weeks of work down to hours." },
  { icon: "/trust.png", title: "Build Trust", desc: "Increase transparency and strengthen stakeholder trust with audit-ready, verifiable data." },
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
    <div ref={ref} className="rounded-2xl border border-white/[0.07] bg-[#0e0b1a] p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#7c3aed]/40">
      <div className="font-['Manrope'] text-[2.4rem] font-extrabold leading-none text-[#9d5cf6] mb-2">{val}</div>
      <div className="text-base text-[#a89dc8] leading-snug">{label}</div>
    </div>
  );
}


/* ─── Page ──────────────────────────────────────────────── */
export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <>
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[6%] h-[72px] bg-[#08060f]/90 backdrop-blur-xl border-b border-white/[0.07]">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Logo className="h-6 sm:h-7 md:h-8 w-auto" />
        </Link>
        <ul className="hidden md:flex items-center gap-8 list-none">
          {["Solutions", "How It Works", "Compliance", "About"].map((l, i) => (
            <li key={l}><a href={["#solutions", "#how", "#compliance", "#about"][i]} className="text-base text-[#a89dc8] hover:text-[#f0eeff] transition-colors">{l}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-base font-medium text-[#a89dc8] border border-white/[0.07] hover:border-[#7c3aed]/40 hover:text-[#f0eeff] rounded-lg px-4 py-2 bg-transparent transition-all">Log In</Link>
          <Link href="/demo" className="text-base font-semibold text-white bg-[#7c3aed] hover:bg-[#9d5cf6] rounded-lg px-4 py-2 transition-all hover:-translate-y-px">Book A Demo</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="top" className="relative min-h-screen flex flex-col items-center justify-center text-center px-[6%] pt-32 pb-20 overflow-hidden">
        <div className="hero-glow" />
        <div className="hero-grid-bg" />
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="animate-fade-up-1 font-['Manrope'] font-extrabold leading-[1.06] tracking-[-0.03em] text-[clamp(2.6rem,6.5vw,5rem)] text-[#f0eeff] max-w-4xl mb-1">
            One Platform.<br /><span className="text-[#9d5cf6]">All Your ESG.</span>
          </h1>
          <p className="animate-fade-up-2 font-['Manrope'] font-extrabold leading-tight tracking-[-0.025em] text-[clamp(1.6rem,4vw,3rem)] text-[#b97bff] mb-6">Infinite Impact.</p>
          <p className="animate-fade-up-3 text-lg text-[#a89dc8] max-w-xl leading-relaxed mb-10">
            Manage all your ESG needs on one platform, automate your reporting, and get a complete view of sustainability performance across industries, farms, factories, and smart cities worldwide.
          </p>
          <div className="animate-fade-up-4 flex gap-4 flex-wrap justify-center">
            <Link href="/demo" className="text-base font-semibold text-white bg-[#7c3aed] hover:bg-[#9d5cf6] rounded-xl px-9 py-3.5 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(124,58,237,0.4)]">Book A Demo</Link>
            <button onClick={() => scrollTo("how")} className="text-base font-medium text-[#f0eeff] border border-white/[0.07] hover:border-[#7c3aed]/40 hover:text-[#b97bff] rounded-xl px-9 py-3.5 bg-transparent transition-all">See how it works</button>
          </div>
        </div>
      </section>

      {/* ── LOGO STRIP ── */}
      <div className="border-t border-b border-white/[0.07] py-6 overflow-hidden">
        <p className="text-center text-sm uppercase tracking-[0.12em] text-[#5e567a] mb-5">Trusted by sustainability partners worldwide</p>
        <div className="animate-marquee flex gap-16 items-center whitespace-nowrap w-max">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <span key={i} className="font-['Manrope'] font-bold text-[0.95rem] text-[#5e567a] opacity-60 shrink-0">{l}</span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="py-20 px-[6%]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard target={25} suffix="%" label="Saving in water consumption" />
          <StatCard target={20} suffix="%" label="Lowering in energy cost" />
          <StatCard target={10} suffix="M" label="Tonnes reduction in carbon emissions" />
          <StatCard target={95} suffix="%" label="Accuracy in water, energy, & carbon detection using AI, IoT and digital twin" />
        </div>
      </div>

      {/* ── INTELLIGENCE CALLOUT ── */}
      <div className="px-[6%] pb-10">
        <div className="max-w-7xl mx-auto bg-[#130f22] border border-[#7c3aed]/20 rounded-2xl px-10 py-10 flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0 text-center">
            <p className="font-['Manrope'] font-extrabold text-[3.2rem] leading-none text-[#9d5cf6]">250×</p>
            <p className="text-base text-[#b97bff] font-semibold mt-1 whitespace-nowrap">per second</p>
          </div>
          <div className="hidden md:block w-px self-stretch bg-white/[0.07] shrink-0" />
          <p className="text-lg text-[#a89dc8] leading-relaxed">
            Our intelligence layer processes data{" "}
            <span className="text-[#f0eeff] font-semibold">250 times per second</span>,
            detecting anomalies and inefficiencies invisible to manual inspection;
            this gives your team the insight to act before problems become costly.
          </p>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-[6%] bg-[#0e0b1a] border-t border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm uppercase tracking-[0.1em] text-[#b97bff] font-semibold">How it works</span>
            <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.7rem,3.5vw,2.6rem)] tracking-tight text-[#f0eeff] mt-2 mb-3">Our fast-changing world requires a 360° view.</h2>
            <p className="text-lg text-[#a89dc8] max-w-xl mx-auto leading-relaxed">From shifting regulations to emerging multi-vector risks, PlanetMatrix combines AI with expert guidance to protect value, ensure compliance, and build trust.</p>
          </div>

          {/* Tab bar */}
          <div className="flex flex-wrap justify-around bg-[#130f22] border border-white/[0.07] rounded-xl p-1.5 gap-y-3 mb-10">
            {TABS.map((t, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                className={`text-lg flex items-center justify-center gap-2 px-4 py-2.5 rounded-[9px] font-medium transition-all ${activeTab === i ? "text-[#f0eeff]" : "text-[#5e567a] hover:text-[#a89dc8]"
                  }`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold border transition-all ${activeTab === i ? "bg-[#7c3aed] border-[#7c3aed] text-white" : "bg-[#1a1530] border-white/[0.07] text-[#5e567a]"
                  }`}>{i + 1}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 items-start">
            <div>
              <h3 className="font-['Manrope'] text-2xl font-bold tracking-tight text-[#f0eeff] mb-4">{TABS[activeTab].heading}</h3>
              <p className="text-lg text-[#a89dc8] leading-relaxed mb-6">{TABS[activeTab].body}</p>
              <ul className="space-y-3">
                {TABS[activeTab].points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-base text-[#a89dc8]">
                    <span className="mt-0.5 w-4.5 h-4.5 shrink-0 rounded-full bg-[#7c3aed]/[0.14] border border-[#7c3aed]/25 flex items-center justify-center text-[0.55rem] text-[#9d5cf6]">✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#7c3aed]/10 shadow-[0_0_60px_rgba(124,58,237,0.08)] overflow-auto max-h-[72vh] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-track]:bg-transparent">
              {activeTab === 3 ? (
                <ReportDashboard />
              ) : activeTab === 2 ? (
                <GeoDashboard />
              ) : activeTab === 1 ? (
                <RiskDashboard />
              ) : activeTab === 0 ? (
                <DataSourcesPanel />
              ) : (
                <Image
                  src={TABS[activeTab].image}
                  alt={`${TABS[activeTab].label} in PlanetMatrix`}
                  width={720}
                  height={480}
                  className="w-full h-auto rounded-2xl border border-[#7c3aed]/10 shadow-[0_0_60px_rgba(124,58,237,0.08)]"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section id="solutions" className="py-24 px-[6%]">
        <div className="max-w-7xl mx-auto">
          <span className="text-sm uppercase tracking-[0.1em] text-[#b97bff] font-semibold">Powerful Capabilities</span>
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.7rem,3.5vw,2.6rem)] tracking-tight text-[#f0eeff] mt-2 mb-3 max-w-lg">Everything you need to manage ESG at scale</h2>
          <p className="text-lg text-[#a89dc8] max-w-md leading-relaxed mb-12">Eight capabilities, one platform, built for industries, farms, factories, and smart cities.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] border border-white/[0.07] rounded-2xl overflow-hidden">
            {CAPS.map((c, i) => (
              <div key={i} className="bg-[#0e0b1a] hover:bg-[#130f22] transition-colors p-7">
                <div className="text-2xl mb-4">{c.icon}</div>
                <div className="font-['Manrope'] text-[0.85rem] font-bold text-[#f0eeff] uppercase tracking-wide mb-2">{c.title}</div>
                <div className="text-base text-[#a89dc8] leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE PATH ── */}
      <section id="compliance" className="py-24 px-[6%] bg-[#0e0b1a] border-t border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto">
          <span className="text-sm uppercase tracking-[0.1em] text-[#b97bff] font-semibold">ESG Compliance</span>
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.7rem,3.5vw,2.6rem)] tracking-tight text-[#f0eeff] mt-2 mb-3 max-w-lg">Your path to success</h2>
          <p className="text-lg text-[#a89dc8] max-w-md leading-relaxed mb-12">A clear path from onboarding to full compliance, automated at every step.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PATH_STEPS.map((p, i) => (
              <div key={i} className="path-card-accent relative bg-[#130f22] border border-white/[0.07] rounded-2xl p-8 hover:border-[#7c3aed]/40 transition-colors overflow-hidden">
                <p className="text-[0.7rem] uppercase tracking-[0.12em] text-[#b97bff] font-bold mb-3">{p.step}</p>
                <p className="font-['Manrope'] text-lg font-bold text-[#f0eeff] mb-4">{p.title}</p>
                <ul className="space-y-0">
                  {p.items.map((it, j) => (
                    <li key={j} className="flex items-center gap-2 text-base text-[#a89dc8] py-1.5 border-b border-white/[0.04]">
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
        <div className="max-w-7xl mx-auto">
          <span className="text-sm uppercase tracking-[0.1em] text-[#b97bff] font-semibold">Compliance Frameworks</span>
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.7rem,3.5vw,2.6rem)] tracking-tight text-[#f0eeff] mt-2 mb-3 max-w-xl">Automated compliance with the world&apos;s leading sustainability frameworks</h2>
          <p className="text-lg text-[#a89dc8] max-w-md leading-relaxed mb-12">Whatever your reporting obligations, PlanetMatrix makes them faster, easier, and audit-ready, for any framework.</p>
          <div className="rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.07]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px">
              {FRAMEWORKS.map((f, i) => (
                <div key={i} className="bg-[#0e0b1a] flex flex-col items-center text-center py-12 px-6 transition-colors">
                  <Image src={f.logo} alt={f.abbr} width={104} height={104} className="object-contain mb-6 opacity-90" style={{ width: 104, height: 104 }} />
                  <p className="text-base text-[#a89dc8] leading-snug">{f.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="py-20 px-[6%] border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.7rem,3.5vw,2.6rem)] tracking-tight text-[#f0eeff] mb-3">PlanetMatrix is certified and compliant.</h2>
          <p className="text-lg text-[#a89dc8] mb-12">Enterprise-grade security, compliance, and auditability.</p>
          <div className="flex items-center justify-center gap-16 flex-wrap">
            <Image src="/iso.png" alt="ISO Certified" width={110} height={110} className="object-contain opacity-90 hover:opacity-100 transition-opacity" />
            <Image src="/label-bas-carbone-light.png" alt="Label Bas Carbone Certified" width={150} height={110} className="object-contain opacity-90 hover:opacity-100 transition-opacity" />
            <Image src="/idw.png" alt="IDW Certified" width={110} height={110} className="object-contain opacity-90 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* ── IMPACT PILLARS ── */}
      <section className="py-24 px-[6%] bg-[#0e0b1a] border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-sm uppercase tracking-[0.1em] text-[#b97bff] font-semibold">Data. Insight. Impact.</span>
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.7rem,3.5vw,2.6rem)] tracking-tight text-[#f0eeff] mt-2 mb-12 max-w-2xl mx-auto">Helping organizations build a more sustainable future.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {PILLARS.map((p, i) => (
              <div key={i} className="bg-[#130f22] border border-white/[0.07] rounded-2xl p-8 text-center hover:border-[#7c3aed]/40 hover:-translate-y-1 transition-all duration-300">
                <Image src={p.icon} alt={p.title} width={72} height={72} className="mb-5 mx-auto object-contain" />
                <div className="font-['Manrope'] text-[0.85rem] font-bold text-[#b97bff] uppercase tracking-widest mb-2">{p.title}</div>
                <div className="text-base text-[#a89dc8] leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 px-[6%] border-t border-white/[0.07]">
        <div className="max-w-2xl mx-auto">
          <span className="text-sm uppercase tracking-[0.1em] text-[#b97bff] font-semibold">About PlanetMatrix</span>
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.7rem,3.5vw,2.6rem)] tracking-tight text-[#f0eeff] mt-2 mb-5">Powering a sustainable tomorrow.</h2>
          <p className="text-lg text-[#a89dc8] leading-[1.8] mb-5">PlanetMatrix is an ESG and climate intelligence platform built for industries, factories, farms, and buildings. We connect raw environmental data to meaningful action, combining IoT sensor technology, AI-driven analytics, and global compliance frameworks into one system.</p>
          <p className="text-lg text-[#a89dc8] leading-[1.8]">Our mission: give every organization the tools to understand, manage, and reduce their environmental footprint in real time. Because what gets measured, gets managed.</p>
          <div className="mt-6 flex gap-8 flex-wrap">
            <div>
              <p className="font-['Manrope'] font-extrabold text-[#9d5cf6]">www.planet-matrix.com</p>
              <p className="text-xs text-[#5e567a]">Official website</p>
            </div>
            <div>
              <a href="mailto:info@planet-matrix.com" className="font-['Manrope'] font-bold text-[#a89dc8] hover:text-[#b97bff] transition-colors">info@planet-matrix.com</a>
              <p className="text-xs text-[#5e567a]">Get in touch</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-[6%] border-t border-white/[0.07]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.7rem,3.5vw,2.6rem)] tracking-tight text-[#f0eeff] mb-4">Ready to simplify your ESG?</h2>
          <p className="text-lg text-[#a89dc8] leading-relaxed mb-8">Schedule a demo and see how PlanetMatrix can transform your sustainability data into real impact.</p>
          <Link href="/demo" className="inline-block text-base font-semibold text-white bg-[#7c3aed] hover:bg-[#9d5cf6] rounded-xl px-10 py-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(124,58,237,0.4)]">Book A Demo →</Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#08060f] border-t border-white/[0.07] px-[6%] pt-16 pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 font-['Manrope'] text-lg font-extrabold tracking-tight mb-3">
              <Logo className="h-9 w-auto" />
            </div>
            <p className="text-[0.85rem] text-[#5e567a] leading-relaxed max-w-[220px]">One Platform. All Your ESG. Infinite Impact.</p>
            <p className="text-[0.8rem] text-[#b97bff] mt-2">www.planet-matrix.com</p>

            {/* App download badges — links not wired up yet (placeholders). */}
            <div className="mt-5">
              <p className="text-sm uppercase tracking-[0.1em] text-[#5e567a] font-semibold mb-3">Get the App</p>
              <div className="flex flex-wrap gap-2.5">
                <button type="button" aria-label="Download on the App Store" className="flex items-center gap-2 bg-black border border-white/15 hover:border-white/35 rounded-lg px-3 py-2 transition-colors cursor-pointer">
                  <svg viewBox="0 0 384 512" width="18" height="20" fill="currentColor" className="text-white shrink-0" aria-hidden="true">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                  </svg>
                  <span className="flex flex-col leading-none text-left">
                    <span className="text-[0.6rem] text-white/70">Download on the</span>
                    <span className="text-[0.95rem] font-semibold text-white">App Store</span>
                  </span>
                </button>
                <button type="button" aria-label="Get it on Google Play" className="flex items-center gap-2 bg-black border border-white/15 hover:border-white/35 rounded-lg px-3 py-2 transition-colors cursor-pointer">
                  <svg viewBox="0 0 512 512" width="18" height="18" fill="currentColor" className="text-white shrink-0" aria-hidden="true">
                    <path d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1zM47 0c-8 4.7-13 12.5-13 22.5v467c0 10 5 17.8 13 22.5l255.6-256L47 0zm437.2 233.3-74.8-43.3-67.2 65.5 67.2 65.5 75.3-43.3c22.4-13.4 22.4-30.9-.5-44.4zM104.6 499 325.3 277.7l60.1 60.1L104.6 499z" />
                  </svg>
                  <span className="flex flex-col leading-none text-left">
                    <span className="text-[0.6rem] text-white/70">Get it on</span>
                    <span className="text-[0.95rem] font-semibold text-white">Google Play</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
          {[
            { h: "Platform", links: [["Capabilities", "#solutions"], ["How It Works", "#how"], ["Compliance", "#compliance"], ["Book A Demo", "/demo"]] },
            { h: "Company", links: [
              ["About", "#about"],
              ["Careers", "/careers"],
              ["Press", "/press"],
              // ["Contact", "/contact"],  // commented out — uncomment when ready
            ]},
            { h: "Legal", links: [["Privacy Policy", "/privacy-policy"]] },
          ].map(col => (
            <div key={col.h}>
              <h4 className="text-sm uppercase tracking-[0.1em] text-[#5e567a] font-semibold mb-4">{col.h}</h4>
              <ul className="space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={label}><a href={href} className="text-[0.85rem] text-[#a89dc8] hover:text-[#b97bff] transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/[0.07] pt-6 flex items-center justify-between flex-wrap gap-4">
          <p className="text-[0.78rem] text-[#5e567a]">© 2026 PlanetMatrix. All rights reserved.</p>
          <div className="flex gap-3">
            {[
              { href: "https://www.linkedin.com/company/planetmatrix", label: "LinkedIn", content: "in" },
              { href: "#", label: "X", content: "𝕏" },
              {
                href: "https://www.instagram.com/planetmatrix1",
                label: "Instagram",
                content: (
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
              },
              {
                href: "mailto:info@planet-matrix.com",
                label: "Email",
                content: (
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                ),
              },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="w-8 h-8 rounded-lg bg-[#0e0b1a] border border-white/[0.07] hover:border-[#7c3aed]/40 hover:text-[#b97bff] flex items-center justify-center text-[#5e567a] text-xs font-bold transition-all"
              >
                {s.content}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}


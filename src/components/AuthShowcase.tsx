// Right-hand "live" panel shown beside the login / register forms.
// Gradient field + faint pill grid + breathing glows + floating metric pills.
//
// Layout is a 3-zone flex column: a top pill band, the centered headline
// (its own flex track), and a bottom pill band. Pills live in wrapping flex
// rows — never absolutely positioned over the text — so they can't collide
// with the headline at any panel width.

import type { ReactNode } from "react";

const PILL_GRID = [
  { top: "8%", left: "10%", w: 120 },
  { top: "6%", left: "44%", w: 150 },
  { top: "10%", left: "78%", w: 90 },
  { top: "30%", left: "4%", w: 100 },
  { top: "26%", left: "72%", w: 130 },
  { top: "68%", left: "8%", w: 140 },
  { top: "72%", left: "40%", w: 110 },
  { top: "66%", left: "74%", w: 120 },
  { top: "88%", left: "20%", w: 100 },
  { top: "90%", left: "60%", w: 130 },
];

type Pill = { label: string; icon: ReactNode; anim: string; offset: string };

// 24×24 stroke icons, themed to each label.
const ICONS = {
  carbon: (<><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6" /></>),
  decarbonization: (<><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></>),
  netZero: (<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>),
  circularity: (<><polyline points="1 4 1 10 7 10" /><polyline points="23 20 23 14 17 14" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" /></>),
  compliance: (<><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></>),
  reporting: (<><rect x="4" y="11" width="3.5" height="9" rx="1" /><rect x="10.25" y="6" width="3.5" height="14" rx="1" /><rect x="16.5" y="14" width="3.5" height="6" rx="1" /></>),
};

// Pills spread to the sides via `justify-between`; `offset` gives each a
// different vertical position so they scatter instead of forming a tidy row,
// and pulls several inward toward the headline. We use margin (not translate)
// so it doesn't fight the float animation, which drives `transform`.
const TOP_PILLS: Pill[] = [
  { label: "Carbon", icon: ICONS.carbon, anim: "animate-float-slow", offset: "mt-2" },
  { label: "Decarbonization", icon: ICONS.decarbonization, anim: "animate-float-med", offset: "mt-24" },
  { label: "Net Zero", icon: ICONS.netZero, anim: "animate-float-fast", offset: "mt-10" },
];

const BOTTOM_PILLS: Pill[] = [
  { label: "Circularity", icon: ICONS.circularity, anim: "animate-float-med", offset: "mb-20" },
  { label: "Compliance", icon: ICONS.compliance, anim: "animate-float-slow", offset: "mb-2" },
  { label: "Reporting", icon: ICONS.reporting, anim: "animate-float-fast", offset: "mb-14" },
];

function MetricPill({ label, icon, anim, offset }: Pill) {
  return (
    <div className={`${anim} ${offset} flex items-center gap-2.5 bg-white/95 rounded-full pl-3 pr-4 py-2.5 shadow-[0_12px_40px_rgba(80,30,160,0.35)]`}>
      <span className="grid place-items-center w-7 h-7 rounded-full bg-[#7c3aed]/15 shrink-0">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </span>
      <span className="text-sm font-semibold text-[#1a1130] whitespace-nowrap">{label}</span>
    </div>
  );
}

export default function AuthShowcase() {
  return (
    <div className="relative hidden lg:flex flex-col overflow-hidden rounded-3xl m-3 bg-gradient-to-br from-[#1c1145] via-[#150a32] to-[#0c0620]">
      {/* breathing glows */}
      <div className="animate-glow absolute -top-24 -left-16 w-[420px] h-[420px] rounded-full bg-[#7c3aed]/40 blur-[120px]" />
      <div className="animate-glow absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-[#b97bff]/30 blur-[120px] [animation-delay:3s]" />

      {/* faint pill grid */}
      <div className="absolute inset-0">
        {PILL_GRID.map((p, i) => (
          <div
            key={i}
            className="absolute h-9 rounded-full border border-white/[0.06]"
            style={{ top: p.top, left: p.left, width: p.w }}
          />
        ))}
      </div>

      {/* top pill band — spread to the corners/sides */}
      <div className="relative z-10 flex flex-wrap items-start justify-between gap-3 px-6 pt-8">
        {TOP_PILLS.map((p) => <MetricPill key={p.label} {...p} />)}
      </div>

      {/* headline — its own flex track, so pills never reach it */}
      <div className="relative z-10 flex-1 grid place-items-center px-12 py-2">
        <div className="text-center max-w-md">
          <h2 className="font-['Manrope'] font-extrabold leading-[1.08] tracking-[-0.02em] text-[clamp(2rem,3vw,2.8rem)] text-white">
            Simplify ESG.
            <br />
            <span className="text-[#c8a6ff]">Amplify Impact.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#cabfe8]">
            Introducing the next generation of ESG reporting and sustainability
            intelligence.
          </p>
        </div>
      </div>

      {/* bottom pill band — spread to the corners/sides */}
      <div className="relative z-10 flex flex-wrap items-end justify-between gap-3 px-6 pb-8">
        {BOTTOM_PILLS.map((p) => <MetricPill key={p.label} {...p} />)}
      </div>
    </div>
  );
}

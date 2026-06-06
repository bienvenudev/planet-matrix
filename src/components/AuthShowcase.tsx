// Right-hand "live" panel shown beside the login / register forms.
// Gradient field + faint pill grid + breathing glows + floating metric pills.

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

export default function AuthShowcase() {
  return (
    <div className="relative hidden lg:flex flex-1 overflow-hidden rounded-3xl m-3 bg-gradient-to-br from-[#1c1145] via-[#150a32] to-[#0c0620]">
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

      {/* floating metric pills */}
      <div className="animate-float-slow absolute top-[16%] right-[14%] flex items-center gap-2.5 bg-white/95 rounded-full pl-3 pr-4 py-2.5 shadow-[0_12px_40px_rgba(80,30,160,0.35)]">
        <span className="grid place-items-center w-7 h-7 rounded-full bg-[#7c3aed]/15">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 17l6-6 4 4 7-7" /><path d="M14 7h6v6" />
          </svg>
        </span>
        <span className="text-sm font-semibold text-[#1a1130]">Emissions</span>
      </div>

      <div className="animate-float-med absolute top-[40%] left-[10%] flex items-center gap-2.5 bg-white/95 rounded-full pl-3 pr-4 py-2.5 shadow-[0_12px_40px_rgba(80,30,160,0.35)]">
        <span className="grid place-items-center w-7 h-7 rounded-full bg-[#7c3aed]/15">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12l2 2 4-4" /><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
          </svg>
        </span>
        <span className="text-sm font-semibold text-[#1a1130]">Compliance</span>
      </div>

      <div className="animate-float-fast absolute bottom-[16%] right-[20%] flex items-center gap-2.5 bg-white/95 rounded-full pl-3 pr-4 py-2.5 shadow-[0_12px_40px_rgba(80,30,160,0.35)]">
        <span className="grid place-items-center w-7 h-7 rounded-full bg-[#7c3aed]/15">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19V5" /><rect x="7" y="11" width="3" height="8" rx="1" /><rect x="13" y="7" width="3" height="12" rx="1" /><rect x="19" y="13" width="2" height="6" rx="1" />
          </svg>
        </span>
        <span className="text-sm font-semibold text-[#1a1130]">Reporting</span>
      </div>

      {/* headline */}
      <div className="relative z-10 m-auto px-12 text-center max-w-md">
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
  );
}

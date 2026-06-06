import Image from "next/image";
import Link from "next/link";

const RELEASES = [
  {
    date: "May 2026",
    title: "PlanetMatrix expands into the Middle East to accelerate regional ESG adoption",
    excerpt: "New partnerships across the UAE and Saudi Arabia bring real-time sustainability intelligence to water, energy, and infrastructure operators.",
  },
  {
    date: "March 2026",
    title: "PlanetMatrix launches AI intelligence layer for real-time anomaly detection",
    excerpt: "The platform now processes operational data 250 times per second, surfacing climate, operational, and compliance risks before they escalate.",
  },
  {
    date: "January 2026",
    title: "PlanetMatrix joins EIT Climate-KIC to scale climate impact across Europe",
    excerpt: "The collaboration strengthens PlanetMatrix's mission to make CSRD and ESRS compliance effortless for organizations of every size.",
  },
];

const COVERAGE = [
  { outlet: "Sustainability Today", quote: "One of the most promising ESG platforms to watch in 2026." },
  { outlet: "ClimateTech Weekly", quote: "PlanetMatrix turns compliance from a cost center into a competitive advantage." },
  { outlet: "The Water Report", quote: "A genuinely real-time view of environmental performance." },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#08060f] text-[#f0eeff] overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-[6%] h-[72px] border-b border-white/[0.07]">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/PlanetMatrix-Logo-light.png" alt="PlanetMatrix" width={1346} height={265} className="h-6 sm:h-7 md:h-8 w-auto" priority />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-base font-medium text-[#a89dc8] border border-white/[0.07] hover:border-[#7c3aed]/40 hover:text-[#f0eeff] rounded-lg px-4 py-2 transition-all">← Home</Link>
          <Link href="/demo" className="text-sm sm:text-base font-semibold text-white bg-[#7c3aed] hover:bg-[#9d5cf6] rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 whitespace-nowrap transition-all hover:-translate-y-px">Book A Demo</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative px-[6%] pt-20 pb-16 overflow-hidden">
        <div className="pointer-events-none absolute right-1/4 top-0 w-[600px] h-[600px] rounded-full bg-[#7c3aed]/[0.13] blur-[130px]" />
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 text-[#b97bff] font-semibold mb-6">
              <span>📰</span>
              <span className="text-base uppercase tracking-[0.1em]">Press &amp; Media</span>
            </div>
            <h1 className="font-['Manrope'] font-extrabold text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.05] tracking-[-0.03em] mb-6">
              In the news.<br />
              <span className="text-[#9d5cf6]">Making impact visible.</span>
            </h1>
            <p className="text-lg text-[#a89dc8] leading-relaxed max-w-lg mb-8">
              Press releases, media coverage, and resources about PlanetMatrix. For interviews, assets, or media enquiries, reach our team directly.
            </p>
            <a href="mailto:info@planet-matrix.com" className="inline-block bg-[#7c3aed] hover:bg-[#9d5cf6] text-white font-semibold text-base rounded-lg px-6 py-3.5 transition-all hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(124,58,237,0.35)] uppercase tracking-widest">
              Contact Press Team →
            </a>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.07]">
            <Image src="/press-media.jpg" alt="PlanetMatrix in the media" width={1200} height={800} className="w-full h-full object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#08060f]/60 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Press releases ── */}
      <section className="px-[6%] py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.02em] mb-10">Latest releases</h2>
          <div className="flex flex-col gap-4">
            {RELEASES.map(r => (
              <article key={r.title} className="rounded-2xl border border-white/[0.07] bg-[#0e0b1a] p-7 transition-all duration-300 hover:border-[#7c3aed]/40">
                <p className="text-sm uppercase tracking-[0.1em] text-[#5e567a] mb-2">{r.date}</p>
                <h3 className="font-['Manrope'] font-bold text-xl mb-2">{r.title}</h3>
                <p className="text-base text-[#a89dc8] leading-relaxed">{r.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coverage ── */}
      <section className="px-[6%] py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.02em] mb-10">What they&apos;re saying</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COVERAGE.map(c => (
              <div key={c.outlet} className="rounded-2xl border border-white/[0.07] bg-[#0e0b1a] p-7">
                <p className="text-lg text-[#f0eeff] leading-relaxed mb-4">&ldquo;{c.quote}&rdquo;</p>
                <p className="text-sm uppercase tracking-[0.1em] text-[#b97bff]">{c.outlet}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media kit CTA ── */}
      <section className="px-[6%] py-16">
        <div className="max-w-7xl mx-auto rounded-3xl border border-white/[0.07] bg-[#0e0b1a] p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.4rem,2.5vw,2rem)] tracking-[-0.02em] mb-2">Media enquiries</h2>
            <p className="text-base text-[#a89dc8] max-w-xl">For logos, brand assets, executive bios, or interview requests, get in touch and we&apos;ll respond promptly.</p>
          </div>
          <a href="mailto:info@planet-matrix.com" className="shrink-0 bg-[#7c3aed] hover:bg-[#9d5cf6] text-white font-semibold text-base rounded-lg px-6 py-3.5 transition-all hover:-translate-y-px uppercase tracking-widest text-center">
            info@planet-matrix.com
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#08060f] border-t border-white/[0.07] px-[6%] py-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <p className="text-[0.78rem] text-[#5e567a]">© 2026 PlanetMatrix. All rights reserved.</p>
          <Link href="/" className="text-base text-[#b97bff] hover:underline">← Back to home</Link>
        </div>
      </footer>
    </div>
  );
}

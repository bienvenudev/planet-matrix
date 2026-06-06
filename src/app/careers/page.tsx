import Image from "next/image";
import Link from "next/link";

const VALUES = [
  { icon: "🌍", title: "Impact First", desc: "Everything we build helps organizations cut emissions and operate more responsibly. Your work matters here." },
  { icon: "🚀", title: "Move Fast", desc: "We ship quickly, learn from real users, and improve every day. Ownership beats hierarchy." },
  { icon: "🤝", title: "Win Together", desc: "We're a small, global team that backs each other. No egos, just shared goals and mutual respect." },
  { icon: "📈", title: "Grow With Us", desc: "We invest in your development. Take on responsibility early and grow as fast as the company does." },
];

const PERKS = [
  "Remote-first",
  "Flexible hours",
  "Competitive salary and equity",
  "Work that fights climate change",
  "Global and diverse team",
  "Invitation to international conventions",
];

const ROLES = [
  { title: "Senior Full-Stack Engineer", team: "Engineering", location: "Remote / Berlin", type: "Full-time" },
  { title: "ESG Data Analyst", team: "Product", location: "Remote / Dubai", type: "Full-time" },
  { title: "Customer Success Manager", team: "Operations", location: "Remote / Kigali", type: "Full-time" },
  { title: "Product Designer", team: "Design", location: "Remote", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#08060f] text-[#f0eeff] overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-[6%] h-[72px] border-b border-white/[0.07]">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/planet-matrix-logo.jpeg" alt="PlanetMatrix" width={128} height={64} className="rounded-full object-cover" priority />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-base font-medium text-[#a89dc8] border border-white/[0.07] hover:border-[#7c3aed]/40 hover:text-[#f0eeff] rounded-lg px-4 py-2 transition-all">← Home</Link>
          <Link href="/demo" className="text-base font-semibold text-white bg-[#7c3aed] hover:bg-[#9d5cf6] rounded-lg px-4 py-2 transition-all hover:-translate-y-px">Book A Demo</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative px-[6%] pt-20 pb-16 overflow-hidden">
        <div className="pointer-events-none absolute left-1/4 top-0 w-[600px] h-[600px] rounded-full bg-[#7c3aed]/[0.13] blur-[130px]" />
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 text-[#b97bff] font-semibold mb-6">
              <span>💼</span>
              <span className="text-base uppercase tracking-[0.1em]">Careers</span>
            </div>
            <h1 className="font-['Manrope'] font-extrabold text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.05] tracking-[-0.03em] mb-6">
              Build the platform<br />
              <span className="text-[#9d5cf6]">powering a sustainable future.</span>
            </h1>
            <p className="text-lg text-[#a89dc8] leading-relaxed max-w-lg mb-8">
              At PlanetMatrix we&apos;re on a mission to make ESG compliance effortless and sustainability measurable. Join a global team turning environmental data into real-world impact.
            </p>
            <a href="#openings" className="inline-block bg-[#7c3aed] hover:bg-[#9d5cf6] text-white font-semibold text-base rounded-lg px-6 py-3.5 transition-all hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(124,58,237,0.35)] uppercase tracking-widest">
              View Open Roles →
            </a>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.07]">
            <Image src="/careers-team.jpg" alt="The PlanetMatrix team collaborating in the office" width={1200} height={800} className="w-full h-full object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#08060f]/60 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="px-[6%] py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.02em] mb-3">Why work with us</h2>
          <p className="text-lg text-[#a89dc8] max-w-2xl mb-10">We&apos;re a values-driven team building something that matters. Here&apos;s what we care about.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(v => (
              <div key={v.title} className="rounded-2xl border border-white/[0.07] bg-[#0e0b1a] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#7c3aed]/40">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-['Manrope'] font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-base text-[#a89dc8] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Perks ── */}
      <section className="px-[6%] py-16">
        <div className="max-w-7xl mx-auto rounded-3xl border border-white/[0.07] bg-[#0e0b1a] p-10 md:p-14">
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.02em] mb-8">Perks &amp; benefits</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PERKS.map(p => (
              <div key={p} className="flex items-center gap-3 text-base text-[#a89dc8]">
                <span className="w-2 h-2 rounded-full bg-[#9d5cf6] shrink-0" />
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open roles ── */}
      <section id="openings" className="px-[6%] py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-['Manrope'] font-extrabold text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.02em] mb-3">Open positions</h2>
          <p className="text-lg text-[#a89dc8] max-w-2xl mb-10">Don&apos;t see a perfect fit? We&apos;re always happy to hear from great people. Reach out at <a href="mailto:careers@planet-matrix.com" className="text-[#b97bff] hover:underline">careers@planet-matrix.com</a>.</p>
          <div className="flex flex-col gap-4">
            {ROLES.map(r => (
              <div key={r.title} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-[#0e0b1a] p-6 transition-all duration-300 hover:border-[#7c3aed]/40">
                <div>
                  <h3 className="font-['Manrope'] font-bold text-lg mb-1">{r.title}</h3>
                  <p className="text-base text-[#5e567a]">{r.team} · {r.location} · {r.type}</p>
                </div>
                <a href={`mailto:careers@planet-matrix.com?subject=Application: ${r.title}`} className="shrink-0 text-base font-semibold text-white bg-[#7c3aed] hover:bg-[#9d5cf6] rounded-lg px-5 py-2.5 transition-all hover:-translate-y-px text-center">
                  Apply →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#08060f] border-t border-white/[0.07] px-[6%] py-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <p className="text-[0.78rem] text-[#5e567a]">© 2026 PlanetMatrix. All rights reserved. | info@planet-matrix.com</p>
          <Link href="/" className="text-base text-[#b97bff] hover:underline">← Back to home</Link>
        </div>
      </footer>
    </div>
  );
}

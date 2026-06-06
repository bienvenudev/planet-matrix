"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const REASONS = ["General enquiry", "Sales & demos", "Partnerships", "Press & media", "Support", "Careers"];

const CHANNELS = [
  { icon: "✉️", label: "Email", value: "info@planet-matrix.com", href: "mailto:info@planet-matrix.com" },
  { icon: "💼", label: "Sales", value: "sales@planet-matrix.com", href: "mailto:sales@planet-matrix.com" },
  { icon: "📰", label: "Press", value: "press@planet-matrix.com", href: "mailto:press@planet-matrix.com" },
  { icon: "🌐", label: "Website", value: "www.planet-matrix.com", href: "/" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

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

      {/* ── Main ── */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-72px)]">
        <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#7c3aed]/[0.13] blur-[130px]" />

        {/* ── Left: copy + image + channels ── */}
        <div className="relative z-10 flex flex-col justify-center px-[8%] py-20">
          <div className="flex items-center gap-2 text-[#b97bff] font-semibold mb-6">
            <span>📬</span>
            <span className="text-base uppercase tracking-[0.1em]">Contact Us</span>
          </div>
          <h1 className="font-['Manrope'] font-extrabold text-[clamp(2rem,3.8vw,3rem)] leading-[1.08] tracking-[-0.03em] mb-6">
            Let&apos;s talk about<br />
            <span className="text-[#9d5cf6]">your sustainability goals.</span>
          </h1>
          <p className="text-lg text-[#a89dc8] leading-relaxed max-w-md mb-8">
            Whether you have a question about the platform, pricing, or partnerships, our team is ready to help. Send us a message and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] mb-8 max-w-md">
            <Image src="/contact-support.jpg" alt="The PlanetMatrix team ready to help" width={1200} height={675} className="w-full h-full object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#08060f]/60 via-transparent to-transparent" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-md">
            {CHANNELS.map(c => (
              <a key={c.label} href={c.href} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#0e0b1a] p-4 transition-all hover:border-[#7c3aed]/40">
                <span className="text-xl">{c.icon}</span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-[#5e567a]">{c.label}</span>
                  <span className="block text-sm text-[#a89dc8]">{c.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="relative z-10 flex flex-col justify-center px-[8%] lg:px-16 py-20">
          {!submitted ? (
            <div className="flex flex-col gap-4 max-w-lg w-full">
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name *" type="text" placeholder="Sarah" />
                <Field label="Last Name *" type="text" placeholder="Johnson" />
              </div>
              <Field label="Work Email *" type="email" placeholder="sarah@company.com" />
              <Field label="Company" type="text" placeholder="Your organization" />
              <SelectField label="What can we help with? *" options={REASONS} />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-[#5e567a] font-medium uppercase tracking-widest">Message *</label>
                <textarea placeholder="How can we help you?" rows={4}
                  className="w-full bg-[#130f22] border border-white/[0.07] focus:border-[#7c3aed]/40 focus:ring-2 focus:ring-[#7c3aed]/10 rounded-lg px-3.5 py-2.5 text-base text-[#f0eeff] placeholder-[#5e567a] outline-none resize-y transition-all" />
              </div>
              <p className="text-base text-[#5e567a] leading-relaxed">
                By submitting this form, you consent to PlanetMatrix processing your information subject to our {" "}
                <Link href="/privacy-policy" className="text-[#b97bff] hover:underline">Privacy Policy</Link>.
              </p>
              <button onClick={() => setSubmitted(true)}
                className="w-full bg-[#7c3aed] hover:bg-[#9d5cf6] text-white font-semibold text-base rounded-lg py-4 transition-all hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(124,58,237,0.35)] uppercase tracking-widest mt-1">
                Send Message →
              </button>
            </div>
          ) : (
            <div className="bg-[#7c3aed]/[0.14] border border-[#7c3aed]/25 rounded-2xl p-10 text-center max-w-lg">
              <p className="font-['Manrope'] text-xl font-bold text-[#b97bff] mb-3">🌍 Thank you!</p>
              <p className="text-base text-[#a89dc8] leading-relaxed">We&apos;ve received your message. A PlanetMatrix team member will be in touch within 24 hours.</p>
              <Link href="/" className="inline-block mt-6 text-base text-[#b97bff] hover:underline">← Back to home</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Form atoms ─────────────────────────────────────────── */
function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-[#5e567a] font-medium uppercase tracking-widest">{label}</label>
      <input type={type} placeholder={placeholder}
        className="w-full bg-[#130f22] border border-white/[0.07] focus:border-[#7c3aed]/40 focus:ring-2 focus:ring-[#7c3aed]/10 rounded-lg px-3.5 py-2.5 text-base text-[#f0eeff] placeholder-[#5e567a] outline-none transition-all" />
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-[#5e567a] font-medium uppercase tracking-widest">{label}</label>
      <select className="w-full bg-[#130f22] border border-white/[0.07] focus:border-[#7c3aed]/40 rounded-lg px-3.5 py-2.5 text-base text-[#a89dc8] outline-none transition-all">
        <option value="">Please Select</option>
        {options.map(o => <option key={o} className="bg-[#08060f]">{o}</option>)}
      </select>
    </div>
  );
}

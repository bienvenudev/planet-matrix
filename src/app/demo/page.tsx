"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#08060f] text-[#f0eeff] overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-[6%] h-[72px] border-b border-white/[0.07]">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/planet-matrix-logo.jpeg" alt="PlanetMatrix" width={128} height={64} className="rounded-full object-cover" priority />
        </Link>
        <ul className="hidden md:flex items-center gap-8 list-none">
          {(["Solutions", "How It Works", "Compliance", "About"] as const).map((l, i) => (
            <li key={l}>
              <Link href={`/${["#solutions", "#how", "#compliance", "#about"][i]}`} className="text-base text-[#a89dc8] hover:text-[#f0eeff] transition-colors">{l}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button className="text-base font-medium text-[#a89dc8] border border-white/[0.07] hover:border-[#7c3aed]/40 hover:text-[#f0eeff] rounded-lg px-4 py-2 bg-transparent transition-all">Log In</button>
          <button
            onClick={() => document.getElementById("demo-form")?.scrollIntoView({ behavior: "smooth" })}
            className="text-base font-semibold text-white bg-[#7c3aed] hover:bg-[#9d5cf6] rounded-lg px-4 py-2 transition-all hover:-translate-y-px">
            Book a demo
          </button>
        </div>
      </nav>

      {/* ── Main layout ── */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-66px)]">

        {/* Purple glow — left side */}
        <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#7c3aed]/[0.13] blur-[130px]" />

        {/* ── Left: copy ── */}
        <div className="relative z-10 flex flex-col justify-center px-[8%] py-20">
          <div className="flex items-center gap-2 text-[#b97bff] font-semibold mb-8">
            <span>📅</span>
            <span className="text-base uppercase tracking-[0.1em]">Book a Demo</span>
          </div>
          <h1 className="font-['Manrope'] font-extrabold text-[clamp(2rem,3.8vw,3rem)] leading-[1.08] tracking-[-0.03em] mb-6">
            Simplify Compliance.<br />
            <span className="text-[#9d5cf6]">Maximize Impact.</span>
          </h1>
          <p className="text-lg text-[#a89dc8] leading-relaxed max-w-md mb-8">
            PlanetMatrix helps you simplify ESG compliance and get more from your sustainability data. Complete the form to schedule a demo call with our experts.          </p>
          <p className="text-base font-semibold text-[#f0eeff] mb-5">Together on the call we will:</p>
          <ul className="space-y-4">
            {[
              "Discuss your ESG challenges and sustainability goals",
              "Demo the software and our AI capabilities live",
              "Explore integration with your existing infrastructure",
              "Discover if PlanetMatrix is the right partner for you",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-base text-[#a89dc8]">
                <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-[#9d5cf6] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right: form ── */}
        <div id="demo-form" className="relative z-10 flex flex-col justify-center px-[8%] lg:px-16 py-20">
          {!submitted ? (
            <div className="flex flex-col gap-4 max-w-lg w-full">
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name *" type="text" placeholder="Sarah" />
                <Field label="Last Name *" type="text" placeholder="Johnson" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Work Email *" type="email" placeholder="sarah@company.com" />
                <Field label="Phone Number" type="tel" placeholder="+1 555 000 0000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Company Name *" type="text" placeholder="Your organization" />
                <Field label="Job Title" type="text" placeholder="Sustainability Lead" />
              </div>
              <SelectField label="Type of Company *" options={["Agriculture / Farming", "Manufacturing / Factory", "Real Estate / Property", "Energy & Utilities", "Financial Services", "Government / Municipality", "NGO / Non-Profit", "Other"]} />
              <SelectField label="Country / Region *" options={["United Arab Emirates", "Saudi Arabia", "Jordan", "Egypt", "Rwanda", "Kenya", "Germany", "France", "United Kingdom", "United States", "Other"]} />
              <SelectField label="My top priority is" options={["ESG Reporting & Compliance", "Carbon Accounting", "Water Management", "Energy Efficiency", "Stakeholder Reporting"]} />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-[#5e567a] font-medium uppercase tracking-widest">Message</label>
                <textarea placeholder="Tell us about your ESG or sustainability goals..." rows={3}
                  className="w-full bg-[#130f22] border border-white/[0.07] focus:border-[#7c3aed]/40 focus:ring-2 focus:ring-[#7c3aed]/10 rounded-lg px-3.5 py-2.5 text-base text-[#f0eeff] placeholder-[#5e567a] outline-none resize-y transition-all" />
              </div>
              <label className="flex items-start gap-2 text-base text-[#5e567a] cursor-pointer">
                <input type="checkbox" className="mt-1 accent-[#7c3aed]" />
                I agree to receive industry insights and relevant updates from PlanetMatrix.
              </label>
              <p className="text-base text-[#5e567a] leading-relaxed">
                By clicking the button below, you consent to allow PlanetMatrix to store and process the personal information submitted above subject to {" "}
                <a href="#" className="text-[#b97bff] hover:underline">Privacy Policy</a>.
              </p>
              <button onClick={() => setSubmitted(true)}
                className="w-full bg-[#7c3aed] hover:bg-[#9d5cf6] text-white font-semibold text-base rounded-lg py-4 transition-all hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(124,58,237,0.35)] uppercase tracking-widest mt-1">
                Request a Demo →
              </button>
            </div>
          ) : (
            <div className="bg-[#7c3aed]/[0.14] border border-[#7c3aed]/25 rounded-2xl p-10 text-center max-w-lg">
              <p className="font-['Manrope'] text-xl font-bold text-[#b97bff] mb-3">🌍 Thank you!</p>
              <p className="text-base text-[#a89dc8] leading-relaxed">We&apos;ve received your request. A PlanetMatrix team member will be in touch within 24 hours.</p>
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

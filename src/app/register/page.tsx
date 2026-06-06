"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="min-h-screen bg-[#08060f] text-[#f0eeff] flex flex-col">

      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-[6%] h-[72px] border-b border-white/[0.07]">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/planet-matrix-logo.jpeg" alt="PlanetMatrix" width={56} height={56} className="rounded-full object-cover" priority />
        </Link>
        <ul className="hidden md:flex items-center gap-8 list-none">
          {(["Solutions","How It Works","Compliance","About"] as const).map((l, i) => (
            <li key={l}>
              <Link href={`/#${["solutions","how","compliance","about"][i]}`} className="text-base text-[#a89dc8] hover:text-[#f0eeff] transition-colors">{l}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-base font-medium text-[#a89dc8] border border-white/[0.07] hover:border-[#7c3aed]/40 hover:text-[#f0eeff] rounded-lg px-4 py-2 bg-transparent transition-all">Log In</Link>
          <Link href="/demo" className="text-base font-semibold text-white bg-[#7c3aed] hover:bg-[#9d5cf6] rounded-lg px-4 py-2 transition-all hover:-translate-y-px">Book a demo</Link>
        </div>
      </nav>

      {/* ── Card ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[420px] flex flex-col gap-6">

          {/* Heading */}
          <div className="text-center">
            <h1 className="font-['Manrope'] font-extrabold text-[1.9rem] tracking-tight text-[#f0eeff] mb-1">Create an account</h1>
            <p className="text-base text-[#a89dc8]">Start your PlanetMatrix journey today</p>
          </div>

          {/* Google button */}
          <button className="w-full flex items-center justify-center gap-3 bg-[#130f22] border border-white/[0.1] hover:border-[#7c3aed]/40 rounded-xl py-3 text-base font-medium text-[#f0eeff] transition-all hover:-translate-y-px">
            <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
              <path d="M44.5 20H24v8.5h11.8C34.7 33.9 29.9 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.4-.1-2.7-.5-4z" fill="#FFC107"/>
              <path d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.6 5.1 29.6 3 24 3 16.3 3 9.7 7.9 6.3 14.7z" fill="#FF3D00"/>
              <path d="M24 45c5.5 0 10.5-1.9 14.4-5.1l-6.7-5.5C29.6 36.1 26.9 37 24 37c-5.9 0-10.7-3.1-11.8-8.5L5.3 34c3.4 6.8 10 11 18.7 11z" fill="#4CAF50"/>
              <path d="M44.5 20H24v8.5h11.8c-.6 2.8-2.3 5.1-4.8 6.9l6.7 5.5C41.8 37.2 45 31.1 45 24c0-1.4-.1-2.7-.5-4z" fill="#1976D2"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-sm text-[#5e567a]">or register with email</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#5e567a] font-medium uppercase tracking-widest">Full Name</label>
              <input type="text" placeholder="Sarah Johnson" value={form.name} onChange={set("name")}
                className="w-full bg-[#130f22] border border-white/[0.07] focus:border-[#7c3aed]/40 focus:ring-2 focus:ring-[#7c3aed]/10 rounded-xl px-4 py-3 text-base text-[#f0eeff] placeholder-[#5e567a] outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#5e567a] font-medium uppercase tracking-widest">Work Email</label>
              <input type="email" placeholder="you@company.com" value={form.email} onChange={set("email")}
                className="w-full bg-[#130f22] border border-white/[0.07] focus:border-[#7c3aed]/40 focus:ring-2 focus:ring-[#7c3aed]/10 rounded-xl px-4 py-3 text-base text-[#f0eeff] placeholder-[#5e567a] outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#5e567a] font-medium uppercase tracking-widest">Password</label>
              <input type="password" placeholder="••••••••" value={form.password} onChange={set("password")}
                className="w-full bg-[#130f22] border border-white/[0.07] focus:border-[#7c3aed]/40 focus:ring-2 focus:ring-[#7c3aed]/10 rounded-xl px-4 py-3 text-base text-[#f0eeff] placeholder-[#5e567a] outline-none transition-all" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#5e567a] font-medium uppercase tracking-widest">Confirm Password</label>
              <input type="password" placeholder="••••••••" value={form.confirm} onChange={set("confirm")}
                className="w-full bg-[#130f22] border border-white/[0.07] focus:border-[#7c3aed]/40 focus:ring-2 focus:ring-[#7c3aed]/10 rounded-xl px-4 py-3 text-base text-[#f0eeff] placeholder-[#5e567a] outline-none transition-all" />
            </div>
            <button type="submit"
              className="w-full bg-[#7c3aed] hover:bg-[#9d5cf6] text-white font-semibold text-base rounded-xl py-3.5 transition-all hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(124,58,237,0.35)] mt-1">
              Create Account
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-base text-[#a89dc8]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#b97bff] font-semibold hover:underline">Sign in</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

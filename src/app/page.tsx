"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, MapPin, Phone, Star, CheckCircle, Quote, BadgeCheck,
} from "lucide-react";
import {
  companyInfo, owner, processSteps, projects, blogPosts, images, services,
} from "@/data/mockData";
import ReviewsMarquee from "@/components/ReviewsMarquee";

const REELS: { url: string; caption: string }[] = [
  { url: "https://www.instagram.com/p/DW5InDDDHVT/", caption: "Custom home build — Rio Grande Valley" },
  { url: "https://www.instagram.com/reel/DTV7Rn1gdaS/", caption: "Interior finish walkthrough" },
  { url: "https://www.instagram.com/p/DUWNx6IkcTV/", caption: "From foundation to final keys" },
];

/* ─── Scroll-reveal ────────────────────────────────────────────────────── */
function FadeUp({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Section label ─────────────────────────────────────────────────────── */
function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="block w-8 h-[2px] bg-[#0A3594]" />
      <span className={`text-[11px] font-semibold tracking-[.24em] uppercase ${light ? "text-[#6B93D6]" : "text-[#0A3594]"}`}>
        {text}
      </span>
    </div>
  );
}

/* ─── Industrial frame (corner brackets) ───────────────────────────────── */
function Frame({
  src, alt, className = "", priority = false,
}: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <motion.div whileHover={{ scale: 1.018 }} transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative overflow-hidden group ${className}`}>
      <Image src={src} alt={alt} fill priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width:768px) 100vw,50vw" />
    </motion.div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end bg-[#111827] overflow-hidden">
        <Image
          src={images.trinity816[0]}
          alt="RCG Estates custom home — 816 N Trinity, McAllen TX"
          fill priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/95 via-[#111827]/30 to-[#111827]/0" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#111827]/65 to-[#111827]/0" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-40">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-7 rounded-full bg-white/8 border border-white/12 text-white/70 text-xs font-mono tracking-[.2em] uppercase backdrop-blur-sm">
              <MapPin className="w-3 h-3 text-[#0A3594]" /> Rio Grande Valley, Texas
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.04] tracking-tight mb-6">
              Custom Homes<br />
              <span className="text-neutral-100">Built for the RGV</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-white/70 text-lg leading-relaxed mb-4 max-w-xl">
              {companyInfo.subTagline}
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-white/55 text-base leading-relaxed mb-10 max-w-xl">
              Designed and built by{" "}
              <span className="text-white font-semibold">Raul Ceron</span> — licensed Texas
              real estate agent and custom builder — from pre-approval to move-in.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact"
                className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0A3594] hover:bg-[#072D82] text-white font-semibold rounded-xl transition-all text-base">
                Schedule a Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-all text-base">
                View Our Work
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR — boxed grid on charcoal ──────────────────────────── */}
      <section className="bg-[#111827] border-t border-white/8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/8">
            {companyInfo.stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.08 }}
                className="px-8 py-9 flex flex-col items-start">
                <span className="text-4xl font-bold text-white tracking-tight leading-none mb-2">{s.value}</span>
                <span className="text-xs text-white/40 font-mono uppercase tracking-[.2em]">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. WHO WE ARE ─────────────────────────────────────────────────── */}
      <section className="py-28 bg-white overflow-hidden border-t border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">

            {/* Left 7 cols — text */}
            <div className="lg:col-span-7">
              <FadeUp><SectionLabel text="Who We Are" /></FadeUp>
              <FadeUp delay={0.05}>
                <h2 className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight tracking-tight mb-2">
                  Your Vision.
                </h2>
                <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-7">
                  <span className="text-[#0A3594]">Our Expertise.</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-gray-500 text-lg leading-relaxed mb-4">{companyInfo.about}</p>
                <p className="text-gray-400 leading-relaxed mb-10">{companyInfo.mission}</p>
              </FadeUp>

              {/* Raul quote */}
              <FadeUp delay={0.14}>
                <div className="flex items-start gap-4 p-6 border-l-4 border-[#0A3594] bg-gray-50 mb-10">
                  <Quote className="w-5 h-5 text-[#0A3594] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#111827] font-medium leading-relaxed text-sm">
                      "I built RCG Estates to give Rio Grande Valley families something that didn't exist — a builder
                      who is also your licensed agent, giving you one trusted professional from the lot to the closing table."
                    </p>
                    <p className="text-xs text-[#0A3594] font-mono font-semibold tracking-widest mt-3 uppercase">
                      — Raul Ceron, Founder
                    </p>
                  </div>
                </div>
              </FadeUp>

              {/* Principles — boxed grid on white */}
              <div className="border-t border-gray-200 pt-8">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-[.2em] mb-5">Core Principles</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-x divide-y divide-neutral-100 border border-neutral-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)]">
                  {companyInfo.principles.map((p, i) => (
                    <FadeUp key={p.title} delay={0.16 + i * 0.06}>
                      <div className="flex items-start gap-3 p-5 bg-white hover:bg-gray-50 transition-colors">
                        <CheckCircle className="w-4 h-4 text-[#0A3594] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-[#111827] text-sm mb-1">{p.title}</h4>
                          <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
                        </div>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 cols — Raul story photos */}
            <div className="lg:col-span-5 pt-4">

              {/* Top: Signing at title company — portrait, full width */}
              <FadeUp delay={0.18} className="mb-4">
                <div className="relative w-full h-80 overflow-hidden group">
                  <Image src="/raul-signing.jpg" alt="Raul Ceron signing at closing table"
                    fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="(max-width:1024px) 100vw,40vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-white text-[10px] font-mono tracking-widest uppercase opacity-80">At the Closing Table</span>
                  </div>
                </div>
              </FadeUp>

              {/* Middle row: site photo + phone photo side by side */}
              <FadeUp delay={0.26} className="mb-4 grid grid-cols-2 gap-4">
                <div className="relative h-52 overflow-hidden group">
                  <Image src="/raul-site.jpg" alt="Raul Ceron at construction site"
                    fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="20vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/50 to-transparent" />
                  <div className="absolute bottom-2 left-3">
                    <span className="text-white text-[10px] font-mono tracking-widest uppercase opacity-80">On Site</span>
                  </div>
                </div>
                <div className="relative h-52 overflow-hidden group">
                  <Image src="/raul-phone.jpg" alt="Raul Ceron at desk"
                    fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="20vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/50 to-transparent" />
                  <div className="absolute bottom-2 left-3">
                    <span className="text-white text-[10px] font-mono tracking-widest uppercase opacity-80">Client Calls</span>
                  </div>
                </div>
              </FadeUp>

              {/* Bottom: crutches — dedication shot */}
              <FadeUp delay={0.34} className="mb-6">
                <div className="relative w-full h-56 overflow-hidden group">
                  <Image src="/raul-crutches.jpg" alt="Raul Ceron on job site"
                    fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" sizes="(max-width:1024px) 100vw,40vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/65 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-white text-[10px] font-mono tracking-widest uppercase opacity-80">Nothing Stops the Build</span>
                  </div>
                </div>
              </FadeUp>

              {/* Stats */}
              <FadeUp delay={0.4}>
                <div className="grid grid-cols-3 border-t border-neutral-100 pt-5 gap-0">
                  {[
                    { value: "50+", label: "Homes Built" },
                    { value: "5", label: "RGV Cities" },
                    { value: "100%", label: "Referral Rate" },
                  ].map((s, i) => (
                    <div key={s.label} className={`pr-4 ${i > 0 ? "pl-4 border-l border-neutral-200" : ""}`}>
                      <div className="text-3xl font-bold text-[#111827] tracking-tight leading-none mb-1.5">{s.value}</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-[.18em] font-medium">{s.label}</div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
          {/* ── Instagram Reels strip ──────────────────────────────────────── */}
          <FadeUp delay={0.1} className="mt-16 pt-10 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                {/* Instagram icon */}
                <svg className="w-5 h-5 text-[#0A3594]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-gray-400">Follow the Build</p>
                  <a href="https://www.instagram.com/rcg.estates/" target="_blank" rel="noopener noreferrer"
                    className="text-sm text-[#0A3594] font-medium hover:underline">@rcg.estates</a>
                </div>
              </div>
              <a href="https://www.instagram.com/rcg.estates/reels/" target="_blank" rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#0A3594] font-semibold border-b border-[#0A3594]/30 hover:border-[#0A3594] pb-px transition-all">
                View All Reels <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {REELS.map((reel, i) => (
                <div key={i} className="flex flex-col">
                  <div className="relative bg-[#111827] overflow-hidden" style={{ aspectRatio: "9/16", maxHeight: 480 }}>
                    {reel.url.startsWith("http") ? (
                      <iframe
                        src={`${reel.url}embed/`}
                        className="absolute inset-0 w-full h-full border-0"
                        scrolling="no"
                        allowTransparency
                        allow="encrypted-media; autoplay; clipboard-write; picture-in-picture"
                        loading="lazy"
                      />
                    ) : (
                      /* Placeholder until real URLs are added */
                      <a href="https://www.instagram.com/rcg.estates/reels/" target="_blank" rel="noopener noreferrer"
                        className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0D1117] border border-white/8 hover:border-[#0A3594]/40 transition-colors group">
                        <svg className="w-10 h-10 text-white/20 group-hover:text-[#6B93D6] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                        <span className="text-white/30 text-xs font-mono">@rcg.estates</span>
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-2 px-0.5">{reel.caption}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 3. PROCESS — charcoal with boxed bordered rows ────────────────── */}
      <section className="bg-[#111827] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-14">
            <FadeUp className="lg:col-span-5">
              <SectionLabel text="The Process" light />
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
                From Pre-Approval<br />to Move-In
              </h2>
            </FadeUp>
            <FadeUp delay={0.08} className="lg:col-span-7 flex items-end">
              <p className="text-gray-400 text-lg leading-relaxed">
                As your builder and licensed agent, Raul guides every phase — no handoffs, no dropped balls.
                One professional from the lot to the keys.
              </p>
            </FadeUp>
          </div>

          {/* Boxed bordered process rows */}
          <div className="border border-white/10">
            {processSteps.map((s, i) => (
              <FadeUp key={s.step} delay={i * 0.07}>
                <div className={`grid grid-cols-12 gap-0 items-stretch ${i > 0 ? "border-t border-white/10" : ""}`}>
                  {/* Step number box */}
                  <div className="col-span-2 md:col-span-1 border-r border-white/10 flex items-center justify-center py-8 px-4">
                    <span className="text-4xl font-bold text-white/12 font-mono">{s.step}</span>
                  </div>
                  {/* Title box */}
                  <div className="col-span-10 md:col-span-3 border-r border-white/10 flex flex-col justify-center py-8 px-6">
                    <h3 className="text-sm font-bold text-white mb-2">{s.title}</h3>
                    <div className="w-8 h-[2px] bg-[#0A3594]" />
                  </div>
                  {/* Description box */}
                  <div className="col-span-12 md:col-span-5 border-r border-white/10 flex items-center py-8 px-6">
                    <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  {/* Detail box */}
                  <div className="col-span-12 md:col-span-3 flex items-center py-8 px-6">
                    <p className="text-[#6B93D6] text-xs font-mono leading-relaxed">{s.detail}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SERVICES ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <FadeUp>
              <SectionLabel text="Our Services" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
                Construction Built Around Your Vision
              </h2>
            </FadeUp>
            <FadeUp>
              <Link href="/services"
                className="inline-flex items-center gap-2 text-[#0A3594] font-medium text-sm border-b border-[#0A3594]/30 hover:border-[#0A3594] pb-px transition-all">
                View All Services <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeUp>
          </div>

          {/* 2x2 service grid — soft shadow lift */}
          <div className="border border-neutral-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.07)] transition-all duration-500 ease-out grid grid-cols-1 md:grid-cols-2 divide-y divide-x divide-neutral-100">
            {services.map((svc, i) => (
              <FadeUp key={svc.id} delay={i * 0.07}>
                <Link href="/services" className="group block h-full">
                  <motion.div whileHover={{ backgroundColor: "#FAFAFA" }} transition={{ duration: 0.2 }}
                    className="h-full bg-white overflow-hidden flex flex-col">
                    <div className="h-44 relative overflow-hidden">
                      <Image src={svc.image} alt={svc.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw,50vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/65 to-[#111827]/0" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-bold text-white text-sm">{svc.title}</h3>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-xs text-gray-400 leading-relaxed mb-4 flex-1">{svc.description}</p>
                      <span className="inline-flex items-center gap-1 text-xs text-[#0A3594] font-semibold group-hover:gap-2 transition-all">
                        Learn more <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── UVP — Charcoal with credential grid ──────────────────────────── */}
      <section className="bg-[#111827]">
        <div className="max-w-7xl mx-auto">
          {/* Proof bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-white/8 border-b border-white/8">
            {[
              { value: "50+", label: "Custom Homes Built", sub: "Across the Rio Grande Valley since founding" },
              { value: "1 Pro", label: "Agent + Builder", sub: "Raul handles land, construction, and sale" },
              { value: "100%", label: "Client Referral Rate", sub: "Every client came from a prior client" },
            ].map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.08}>
                <div className="px-10 py-10">
                  <div className="text-4xl font-bold text-white tracking-tight mb-1">{item.value}</div>
                  <div className="text-gray-200 font-semibold text-sm mb-1">{item.label}</div>
                  <div className="text-gray-500 text-xs leading-relaxed">{item.sub}</div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* UVP body */}
          <div className="px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <FadeUp className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-8 h-[2px] bg-white/20" />
                <span className="text-white/40 text-[11px] font-semibold tracking-[.24em] uppercase">The RCG Difference</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
                One Professional.<br />From Raw Land<br />to Closing Table.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Most builders stop at the slab. Most agents stop at the contract. Raul Ceron does both —
                licensed to represent you on the land purchase and qualified to build the home. No referrals,
                no markups, no coordination gaps.
              </p>
            </FadeUp>

            <FadeUp delay={0.1} className="lg:col-span-5">
              <div className="border border-white/10 divide-y divide-white/10">
                {[
                  { icon: BadgeCheck, label: "Licensed TX Real Estate Agent", sub: "Represent you on every land and resale transaction" },
                  { icon: BadgeCheck, label: "Custom Home Builder", sub: "Foundation, framing, finish — full construction oversight" },
                  { icon: BadgeCheck, label: "Royal Decor Gallery Partner", sub: "Exclusive Italian luxury finishes in every premium build" },
                  { icon: BadgeCheck, label: "Local RGV Expert", sub: "Deep knowledge of soil, codes, and neighborhoods since day one" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 px-6 py-5">
                    <item.icon className="w-5 h-5 text-[#6B93D6] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-semibold text-sm">{item.label}</div>
                      <div className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/contact"
                  className="btn-glow inline-flex items-center gap-2 px-7 py-4 bg-[#0A3594] hover:bg-[#072D82] text-white font-bold rounded-lg transition-colors text-sm w-full justify-center">
                  Book a Free Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 5. GALLERY / PROJECTS — pitch black ──────────────────────────── */}
      <section className="py-24 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <FadeUp>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-[#0A3594]" />
                <span className="text-[#6B93D6] text-[11px] font-semibold tracking-[.24em] uppercase">Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">See What We've Built</h2>
              <p className="text-white/40 mt-2 max-w-xl text-sm leading-relaxed">
                From the Bette Street collection in Mission to 816 N Trinity in McAllen — every build
                reflects a distinct client story and RCG's commitment to premium craftsmanship.
              </p>
            </FadeUp>
            <FadeUp>
              <Link href="/projects"
                className="inline-flex items-center gap-2 text-[#6B93D6] font-medium text-sm border-b border-[#0A3594]/40 hover:border-[#0A3594] pb-px transition-all">
                Full Portfolio <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeUp>
          </div>

          {/* Featured project — bordered on black */}
          <FadeUp className="mb-5">
            <div className="border border-white/10 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
              <Frame src={projects[0].images[0]} alt={projects[0].title} className="lg:col-span-7 h-80 lg:h-auto rounded-none" />
              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 p-8 flex flex-col justify-center bg-[#0D0D0D]">
                <span className="text-[#6B93D6] text-[10px] font-mono tracking-widest uppercase mb-3">Featured Build</span>
                <h3 className="text-2xl font-bold text-white mb-2">{projects[0].title}</h3>
                <p className="text-sm text-white/50 mb-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0A3594]" />
                  {projects[0].address}, {projects[0].city}
                </p>
                <p className="text-sm text-white/40 leading-relaxed mb-5">{projects[0].description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[0].features.map((f) => (
                    <span key={f} className="px-2.5 py-1 text-xs border border-white/10 text-white/50">{f}</span>
                  ))}
                </div>
                <div className="grid grid-cols-3 border-t border-white/10 pt-4">
                  {[
                    { v: `${projects[0].sqft.toLocaleString()}`, l: "sqft" },
                    { v: `${projects[0].bedrooms}`, l: "Bed" },
                    { v: `${projects[0].bathrooms}`, l: "Bath" },
                  ].map((s, i) => (
                    <div key={s.l} className={`text-center ${i > 0 ? "border-l border-white/10" : ""}`}>
                      <div className="text-white font-bold text-sm">{s.v}</div>
                      <div className="text-white/30 text-[10px] font-mono uppercase">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          {/* 3-col grid on black */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {projects.slice(1, 4).map((project, i) => (
              <FadeUp key={project.id} delay={i * 0.08}>
                <div className="bg-[#0D0D0D] h-full flex flex-col">
                  <Frame src={project.images[0]} alt={project.title} className="w-full h-52 rounded-none" />
                  <div className="p-5 flex flex-col flex-1 border-t border-white/10">
                    {project.highlight && (
                      <span className="text-[#6B93D6] text-[10px] font-mono tracking-widest uppercase mb-1">{project.highlight}</span>
                    )}
                    <h3 className="font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-xs text-white/40 mb-3 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#0A3594]" />{project.address}
                    </p>
                    <p className="text-xs text-white/35 leading-relaxed flex-1 mb-3">{project.description}</p>
                    <div className="h-px w-full bg-white/8 mb-3" />
                    <div className="flex gap-4 text-xs text-white/30 font-mono">
                      <span>{project.sqft.toLocaleString()} sqft</span>
                      <span>{project.bedrooms} Bed</span>
                      <span>{project.bathrooms} Bath</span>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Interior strip */}
          <FadeUp delay={0.12} className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/8">
            {[images.livingRoom, images.luxuryLiving, images.bathroomBuild, images.bette1007[3]].map((img, i) => (
              <Frame key={i} src={img} alt="RCG Estates interior" className="w-full h-40 rounded-none" />
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── 6. REVIEWS MARQUEE (live Google data) ────────────────────────── */}
      <ReviewsMarquee />

      {/* ── 7. BLOG PREVIEW ───────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <FadeUp>
              <SectionLabel text="Build Journal" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">Building Smarter Starts Here</h2>
            </FadeUp>
            <FadeUp>
              <Link href="/blog"
                className="inline-flex items-center gap-2 text-[#0A3594] font-medium text-sm border-b border-[#0A3594]/30 hover:border-[#0A3594] pb-px transition-all">
                Read All Posts <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeUp>
          </div>

          {/* Blog cards — soft shadow lift */}
          <div className="border border-neutral-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.07)] transition-all duration-500 ease-out grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            {blogPosts.map((post, i) => (
              <FadeUp key={post.id} delay={i * 0.08}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <motion.div whileHover={{ backgroundColor: "#FAFAFA" }} transition={{ duration: 0.2 }}
                    className="h-full bg-white flex flex-col">
                    <Frame src={post.image} alt={post.title} className="w-full h-44 rounded-none" />
                    <div className="p-5 flex flex-col flex-1 border-t border-gray-100">
                      <span className="text-[#0A3594] text-[10px] font-mono tracking-widest uppercase mb-2">{post.category}</span>
                      <h3 className="font-bold text-[#111827] text-sm leading-snug mb-2 group-hover:text-[#0A3594] transition-colors">{post.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed flex-1 mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-3 border-t border-gray-100">
                        <span>{post.readTime}</span>
                        <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CTA ────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#111827] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <div className="w-12 h-[2px] bg-[#0A3594] mx-auto mb-8" />
            <p className="text-[#6B93D6] text-xs font-mono tracking-[.25em] uppercase mb-4">Let's Build Together</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
              Let's Build Your Dream<br />Home, Together
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Whether you're ready to break ground or just exploring what's possible — Raul is ready to listen.
              No pressure, no commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="btn-glow inline-flex items-center justify-center gap-2 px-9 py-4 bg-[#0A3594] hover:bg-[#072D82] text-white font-bold rounded-xl transition-all text-base">
                Schedule a Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+19564087136"
                className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all text-base">
                <Phone className="w-4 h-4" /> (956) 408-7136
              </a>
            </div>
            <div className="w-12 h-[2px] bg-[#0A3594]/30 mx-auto mt-14" />
          </FadeUp>
        </div>
      </section>
    </>
  );
}

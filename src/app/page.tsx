"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, MapPin, Star, CheckCircle, Quote, BadgeCheck, Volume2, VolumeX,
} from "lucide-react";
import {
  companyInfo, owner, processSteps, projects, blogPosts, images, videos,
} from "@/data/mockData";
import ReviewsMarquee from "@/components/ReviewsMarquee";
import ContactForm from "@/components/ContactForm";

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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [unmutedIndex, setUnmutedIndex] = useState<number | null>(null);

  function handleToggleMute(i: number) {
    const next = unmutedIndex === i ? null : i;
    videoRefs.current.forEach((el, idx) => {
      if (el) el.muted = next !== idx;
    });
    setUnmutedIndex(next);
  }

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end bg-[#111827] overflow-hidden">
        <Image
          src={images.bette1001[0]}
          alt="RCG Estates custom home — 1001 Bette, Mission TX"
          fill priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/20 to-[#111827]/0" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#111827]/40 to-[#111827]/0" />

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
              Your vision.<br />Built for your future.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-white/85 font-medium text-lg leading-relaxed mb-10 max-w-xl drop-shadow-md [text-shadow:_0_1px_10px_rgb(0_0_0_/_40%)]">
              You’ve spent years planning this moment. We protect your investment with fixed pricing and absolute transparency from day one.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              <div className="mb-5">
                  <a href="#contact"
                  className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0A3594] hover:bg-[#072D82] text-white font-semibold rounded-xl transition-all text-base">
                  Explore the Process <ArrowRight className="w-4 h-4" />
                </a>
              </div>
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
                <span className="text-xs text-white/50 font-mono uppercase tracking-[.2em]">{s.label}</span>
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
                <h2 className="text-4xl sm:text-5xl font-bold text-[#111827] leading-tight tracking-tight mb-7">
                  You've Done the Research. Now You're Looking for Someone You Can Trust.
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-gray-600 text-lg leading-relaxed mb-10">
                  Comparing prices and floor plans gets you close — but what really drives the decision is confidence in your builder. At RCG, trust isn’t a promise we make, it’s a process we’ve built, so every step from blueprint to keys feels certain, not stressful.
                </p>
              </FadeUp>

              {/* Raul quote */}
              <FadeUp delay={0.14}>
                <div className="flex items-start gap-4 p-6 border-l-4 border-[#0A3594] bg-gray-50 mb-10">
                  <Quote className="w-5 h-5 text-[#0A3594] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#111827] font-medium leading-relaxed text-sm">
                      &ldquo;A custom home is likely the largest investment your family will ever make—it should be a journey defined by excitement, never anxiety.&rdquo;
                    </p>
                    <p className="text-xs text-[#0A3594] font-mono font-semibold tracking-widest mt-3 uppercase">
                      — RAUL CERON, FOUNDER
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
                          <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                        </div>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 cols — Raul story photos */}
            <div className="lg:col-span-5 pt-4">

              {/* Raul portrait */}
              <FadeUp delay={0.18} className="mb-6">
                <div className="relative w-full overflow-hidden group" style={{ aspectRatio: "3/4" }}>
                  <Image src="/raul-dante.jpg" alt="Raul Ceron — RCG Estates"
                    fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="(max-width:1024px) 100vw,40vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/50 to-transparent" />
                </div>
              </FadeUp>

              {/* Credentials */}
              <FadeUp delay={0.4}>
                <div className="border-t border-neutral-100 pt-5 space-y-3">
                  {owner.credentials.map((c) => (
                    <div key={c} className="flex items-start gap-2">
                      <BadgeCheck className="w-4 h-4 text-[#0A3594] shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{c}</span>
                    </div>
                  ))}
                  <Link href="/projects"
                    className="inline-flex items-center gap-1.5 text-sm text-[#0A3594] font-medium hover:underline pt-2">
                    See completed builds at real addresses <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO / PROJECTS — pitch black ──────────────────────────── */}
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
                Real homes at real addresses in McAllen and Mission, including the Bette Street collection
                and 816 N Trinity. Drive by them before you hire anyone.
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

          {/* Video row */}
          <FadeUp delay={0.14} className="mt-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-[2px] bg-[#0A3594]" />
              <span className="text-[#6B93D6] text-[11px] font-semibold tracking-[.24em] uppercase">Build Footage</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1px] bg-white/8">
              {videos.map((v, i) => (
                <div key={i} className="bg-black relative overflow-hidden group">
                  <video
                    ref={(el) => { videoRefs.current[i] = el; }}
                    src={v.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover aspect-[9/16] sm:aspect-[9/16]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-mono tracking-widest uppercase text-white/50">
                    {v.label}
                  </span>
                  <button
                    onClick={() => handleToggleMute(i)}
                    aria-label={unmutedIndex === i ? "Mute video" : "Unmute video"}
                    className="absolute bottom-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-sm hover:bg-black/80 hover:border-white/40 transition-all duration-200"
                  >
                    {unmutedIndex === i
                      ? <Volume2 size={14} />
                      : <VolumeX size={14} />
                    }
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <a href="https://www.instagram.com/rcg.estates?igsh=MTZ0c2JwNTNreWVjbg==" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#6B93D6] font-medium text-sm border-b border-[#0A3594]/40 hover:border-[#0A3594] pb-px transition-all">
                Watch More Reels on Instagram <ArrowRight className="w-4 h-4" />
              </a>
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
                How We Protect<br />Your Building Journey
              </h2>
            </FadeUp>
            <FadeUp delay={0.08} className="lg:col-span-7 flex items-end">
              <p className="text-gray-400 text-lg leading-relaxed">
                Building your home should be a journey defined by clarity, not guesswork. By replacing the unexpected with a transparent, predictable roadmap, you remain completely in control of your timeline, your budget, and your decisions from the first sketch to the day you move in.
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
                  <div className="col-span-12 md:col-span-8 flex items-center py-8 px-6">
                    <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS MARQUEE (live Google data) ────────────────────────────── */}
      <ReviewsMarquee />

      {/* ── UVP — Charcoal with credential grid ──────────────────────────── */}
      <section className="bg-[#111827]">
        <div className="max-w-7xl mx-auto">
          {/* UVP body */}
          <div className="px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <FadeUp className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-8 h-[2px] bg-white/20" />
                <span className="text-white/40 text-[11px] font-semibold tracking-[.24em] uppercase">The RCG Difference</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
                Building a custom home shouldn&apos;t feel like a gamble with your life savings.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-4">
                You start the process excited, but the local horror stories are everywhere. &quot;Bait and switch&quot; quotes that explode into $20,000 site prep change orders. The stress of the &quot;subcontractor lottery,&quot; where the name on the brochure isn&apos;t the person swinging the hammer.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-4">
                And the ultimate frustration: builders who ghost you the second the final check clears, leaving you to deal with sloppy finishing work or soaring summer AC bills.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                You aren&apos;t just buying wood and concrete. You are making a massive investment, and you deserve to feel protected.
              </p>
            </FadeUp>

            <FadeUp delay={0.1} className="lg:col-span-5">
              <div className="border border-white/10 divide-y divide-white/10">
                {[
                  { icon: BadgeCheck, label: "Built to Save® Certification", sub: "Your energy efficiency is verified by independent inspectors, cutting your South Texas cooling costs by up to 40%." },
                  { icon: BadgeCheck, label: "Pre Construction Discovery", sub: "No guessing games. We lock in your site prep, soil realities, and material selections before we ever break ground." },
                  { icon: BadgeCheck, label: "Vetted Local Trades", sub: "No cheap, revolving door crews. We work exclusively with long term, trusted local craftsmen who treat your property with care." },
                  { icon: BadgeCheck, label: "Radical Transparency", sub: "You are always in the loop. Access your private digital portal anytime to see real time schedules, daily photos, and regular updates." },
                  { icon: BadgeCheck, label: "Relentless Warranty", sub: "We protect your peace of mind long after the keys are yours. Enjoy a 24 hour response guarantee and proactive structural check ins." },
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
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 7. BLOG PREVIEW ───────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <FadeUp>
              <SectionLabel text="Build Journal" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">Before You Break Ground</h2>
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

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 bg-[#111827] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <FadeUp className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-8 h-[2px] bg-[#0A3594]" />
                <span className="text-[#6B93D6] text-[11px] font-semibold tracking-[.24em] uppercase">Get In Touch</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
                Tell Us Where You Are<br />In The Process
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Not sure if you’re entirely ready to take the leap yet? That’s okay. Tell us where you are in your thinking, and we will help you map out your next best step. No pressure.
              </p>
            </FadeUp>

            <FadeUp delay={0.1} className="lg:col-span-7">
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/12 shadow-[0_0_60px_rgba(29,82,212,0.12),0_30px_60px_rgba(0,0,0,0.4)] p-8 sm:p-10">
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1D52D4]/40 to-transparent" />
                <div className="mb-8">
                  <p className="text-[#6B93D6] text-[10px] font-mono tracking-[.22em] uppercase mb-2">
                    Free Consultation
                  </p>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Tell Us About Your Project
                  </h3>
                  <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
                    The more detail you share, the better we can prepare for our first conversation.
                  </p>
                </div>
                <ContactForm glass />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}

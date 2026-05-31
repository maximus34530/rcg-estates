"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { images } from "@/data/mockData";

function FadeUp({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 bg-[#111827] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#1D52D4]/6 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#1D52D4]/4 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-[2px] bg-[#1D52D4]" />
              <span className="text-[#6B93D6] text-[11px] font-semibold tracking-[.24em] uppercase">Get In Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-5">
              Building a Home in the RGV?<br />
              <span className="text-[#6B93D6]">Start Here.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Whether you have a lot picked out or you&apos;re still figuring out
              if building makes sense — fill out the form and we&apos;ll follow
              up within one business day with an honest answer on next steps.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main: Full-bleed image + glassmorphism form ───────────────────── */}
      <section className="relative min-h-[860px] flex items-stretch">

        {/* Background: luxury interior */}
        <div className="absolute inset-0">
          <Image
            src={images.bathroom}
            alt="RCG Estates luxury interior"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Multi-layer overlay for depth */}
          <div className="absolute inset-0 bg-[#0D1117]/72" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117]/90 via-[#0D1117]/55 to-[#0D1117]/30" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#111827] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111827] to-transparent" />
          {/* Ambient blue glow */}
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#1D52D4]/8 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left — contact details ──────────────────────────────────────── */}
          <div className="lg:col-span-5">
            <FadeUp>
              <p className="text-[#6B93D6] text-xs font-mono tracking-[.22em] uppercase mb-4">
                Direct Contact
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
                One Call.<br />One Builder.<br />Zero Runaround.
              </h2>
              <p className="text-gray-400 leading-relaxed text-sm mb-10">
                Raul reviews every inquiry personally. Whether you have a lot picked out or just a budget in mind, tell us where you are and you will get an honest answer within one business day.
              </p>
            </FadeUp>

            <FadeUp delay={0.08}>
              <ul className="space-y-5 mb-10">
                {[
                  { Icon: Phone, label: "Call or Text", value: "+1 (956) 408-7136", href: "tel:+19564087136" },
                  { Icon: Mail, label: "Email", value: "rceron.tx@gmail.com", href: "mailto:rceron.tx@gmail.com" },
                  { Icon: MapPin, label: "Service Area", value: "McAllen · Mission · Harlingen · Pharr", href: undefined },
                  { Icon: Clock, label: "Office Hours", value: "Mon–Fri 9am–5pm · Sat by Appt", href: undefined },
                ].map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#6B93D6]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[.2em] mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-medium text-white hover:text-[#6B93D6] transition-colors">
                          {value}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-300">{value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.14}>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/profile.php?id=61552752162933"
                  target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 hover:bg-[#1D52D4]/20 hover:border-[#1D52D4]/40 flex items-center justify-center transition-all">
                  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/rcg.estates/"
                  target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 hover:bg-[#1D52D4]/20 hover:border-[#1D52D4]/40 flex items-center justify-center transition-all">
                  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a href="https://linktr.ee/rceron.tx"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Raul Ceron on Linktree"
                  className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 hover:bg-[#1D52D4]/20 hover:border-[#1D52D4]/40 flex items-center justify-center transition-all">
                  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.51 5.41 16.88 2l1.41 1.42-3.38 3.38 3.38 3.38-1.41 1.41-3.37-3.37-3.38 3.37-1.41-1.41 3.38-3.38L9.71 3.42 11.12 2l2.39 2.39v1.02ZM11.12 22l1.43-3.49h-4.1l1.42 3.49h1.25ZM9.09 17.09h5.82l1.59-3.89H7.5l1.59 3.89Z" />
                  </svg>
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right — glassmorphism form card ─────────────────────────────── */}
          <FadeUp delay={0.1} className="lg:col-span-7">
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/12 shadow-[0_0_60px_rgba(29,82,212,0.12),0_30px_60px_rgba(0,0,0,0.4)] p-8 sm:p-10">
              {/* Ambient corner glow */}
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
      </section>

      {/* ── Service Area Map ──────────────────────────────────────────────── */}
      <section className="bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left — copy */}
            <FadeUp className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-[#1D52D4]" />
                <span className="text-[#0A3594] text-[11px] font-semibold tracking-[.24em] uppercase">Service Area</span>
              </div>
              <h2 className="text-3xl font-bold text-[#111827] tracking-tight leading-tight mb-4">
                McAllen is Home. The Whole Valley is Our Territory.
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                We are based in McAllen and take on projects throughout the Rio Grande Valley. If you have a lot anywhere in South Texas, call us and we will tell you straight whether it makes sense to build.
              </p>

              <div className="space-y-0 divide-y divide-neutral-100 border border-neutral-100">
                {[
                  { city: "McAllen", note: "Primary market · Most active builds" },
                  { city: "Mission", note: "Bette St collection & surrounding areas" },
                  { city: "Harlingen", note: "Growing residential pipeline" },
                  { city: "Pharr", note: "Active custom home projects" },
                  { city: "Edinburg", note: "Available for new projects" },
                  { city: "Brownsville", note: "South Valley coverage" },
                ].map(({ city, note }) => (
                  <div key={city} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-semibold text-[#111827]">{city}</span>
                    <span className="text-xs text-gray-400">{note}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                Don&apos;t see your city? Call us —{" "}
                <a href="tel:+19564087136" className="text-[#0A3594] font-medium hover:underline">
                  (956) 408-7136
                </a>
                . We evaluate every project individually.
              </p>
            </FadeUp>

            {/* Right — map */}
            <FadeUp delay={0.1} className="lg:col-span-8">
              <div className="relative w-full overflow-hidden border border-neutral-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)]" style={{ height: 480 }}>
                <iframe
                  src="https://maps.google.com/maps?q=McAllen,+TX&t=&z=11&ie=UTF8&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="RCG Estates Service Area — Rio Grande Valley, Texas"
                />
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────────────────── */}
      <section className="bg-[#111827] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/8 py-12">
            {[
              { value: "24hr", label: "Response Goal", sub: "We aim to reply to every inquiry within one business day" },
              { value: "$2.1M+", label: "In Custom Homes Built", sub: "McAllen and Mission — real addresses you can drive to" },
              { value: "5★", label: "Google Rating", sub: "Verified reviews from real homeowners who've built with RCG Estates" },
            ].map((item) => (
              <div key={item.label} className="px-8 py-6 text-center md:text-left">
                <div className="text-3xl font-bold text-white tracking-tight mb-1">{item.value}</div>
                <div className="text-white/60 text-xs font-semibold uppercase tracking-[.15em] mb-1">{item.label}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

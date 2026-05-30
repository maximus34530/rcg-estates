"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Home, PencilRuler, Wrench, MapPin, ClipboardList,
  BarChart3, ArrowRight, CheckCircle, Phone,
} from "lucide-react";
import { services, companyInfo } from "@/data/mockData";

function FadeUp({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

const iconMap: Record<string, React.ElementType> = {
  Home, PencilRuler, Wrench, MapPin, ClipboardList, BarChart3,
};

const serviceStats = [
  { value: "50+", label: "Custom Homes Delivered" },
  { value: "4", label: "Core Service Areas" },
  { value: "100%", label: "Client Satisfaction Rate" },
  { value: "1", label: "Professional, No Handoffs" },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-0 bg-[#111827] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-1/3 w-96 h-96 bg-[#0A3594]/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-[2px] bg-[#0A3594]" />
              <span className="text-[#6B93D6] text-[11px] font-semibold tracking-[.24em] uppercase">What We Do</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5">
              Full-Scope Services for Every Stage of Your Build
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              From raw land acquisition to the final walkthrough, RCG Estates
              provides end-to-end services purpose-built for the Rio Grande
              Valley&apos;s unique construction landscape.
            </p>
          </motion.div>
        </div>

        {/* Stats bar — attached to hero bottom */}
        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
              {serviceStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                  className="px-8 py-8 flex flex-col items-start"
                >
                  <span className="text-3xl font-bold text-white tracking-tight leading-none mb-1.5">{s.value}</span>
                  <span className="text-[10px] text-white/40 font-mono uppercase tracking-[.2em]">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* White bridge */}
      <div aria-hidden className="h-12 bg-gradient-to-b from-white/0 to-white" />

      {/* Services Box Matrix */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-8 h-[2px] bg-[#0A3594]" />
              <span className="text-[#0A3594] text-[11px] font-semibold tracking-[.24em] uppercase">Core Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
              Every Phase. One Builder.
            </h2>
          </FadeUp>

          <div className="border border-neutral-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.07)] transition-all duration-500 ease-out grid grid-cols-1 lg:grid-cols-2 divide-y divide-x-0 lg:divide-x lg:divide-y-0 divide-neutral-100">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Home;
              return (
                <FadeUp key={service.id} delay={i * 0.08} className="flex flex-col">
                  {/* Image header */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width:1024px) 100vw,50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 to-[#111827]/0" />
                    <div className="absolute bottom-4 left-5 flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/15 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-sm font-bold text-white tracking-wide">{service.title}</h2>
                    </div>
                    {/* Service number */}
                    <div className="absolute top-4 right-4 text-white/20 text-4xl font-bold font-mono leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-7 flex flex-col flex-1 border-t border-neutral-100">
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.description}</p>
                    <ul className="space-y-2.5 flex-1">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2.5 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-[#0A3594] shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dual-role UVP — Charcoal, premium */}
      <section className="bg-[#111827]">
        <div className="max-w-7xl mx-auto">

          {/* Proof bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/8 border-b border-white/8">
            {[
              { label: "Licensed Texas Real Estate Agent", sub: "Representing you on the land purchase — no extra fees" },
              { label: "Custom Home Builder — RGV", sub: "Managing every phase from permit to final walkthrough" },
              { label: "Single Point of Contact", sub: "From raw lot to closed sale, one professional, no handoffs" },
            ].map((item) => (
              <div key={item.label} className="px-8 py-7">
                <div className="text-[10px] text-white/40 font-mono uppercase tracking-[.18em] mb-1.5">{item.label}</div>
                <div className="text-sm text-gray-300 leading-relaxed">{item.sub}</div>
              </div>
            ))}
          </div>

          {/* Main UVP content */}
          <div className="px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-8 h-[2px] bg-white/20" />
                <span className="text-white/40 text-[11px] font-semibold tracking-[.24em] uppercase">The RCG Difference</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-5 leading-tight">
                One Professional.<br />Two Licenses.<br />Zero Handoffs.
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                Raul Ceron is both a <strong className="text-white font-semibold">Licensed Texas Real Estate Agent</strong> and
                a <strong className="text-white font-semibold">Custom Home Builder</strong>. That means he can represent you
                on the land purchase, manage the entire build, and list the finished home — all under one roof,
                with no extra fees or coordination overhead.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact"
                  className="btn-glow inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#0A3594] hover:bg-[#072D82] text-white font-bold rounded-none transition-colors text-sm">
                  Book a Free Consultation <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+19564087136"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/20 text-white font-semibold rounded-none hover:bg-white/5 transition-colors text-sm">
                  <Phone className="w-4 h-4" /> (956) 408-7136
                </a>
              </div>
            </div>

            {/* Credentials box */}
            <div className="lg:col-span-5">
              <div className="border border-white/10 divide-y divide-white/10">
                {[
                  { credential: "Licensed Texas Real Estate Agent", note: "RE/MAX Platinum RGV · Imperio Real Estate" },
                  { credential: "Custom Home Builder — RGV", note: "50+ homes delivered across the Rio Grande Valley" },
                  { credential: "Royal Decor Gallery Partner", note: "Exclusive access to Italian luxury finishes & hardware" },
                  { credential: "RGV Land & Lot Expert", note: "Geotechnical, zoning, and flood zone evaluation" },
                ].map((item) => (
                  <div key={item.credential} className="px-6 py-5 flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-[#6B93D6] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-white font-semibold text-sm mb-0.5">{item.credential}</div>
                      <div className="text-gray-500 text-xs leading-relaxed">{item.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

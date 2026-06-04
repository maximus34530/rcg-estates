"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import {
  ArrowRight, CheckCircle, Phone, MapPin, Quote, BadgeCheck, Building2,
} from "lucide-react";
import { companyInfo, owner, projects, images } from "@/data/mockData";
import FadeUp from "@/components/FadeUp";

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

const mapContainerStyle = {
  width: "100%",
  height: "100%"
};

const center = {
  lat: 26.200,
  lng: -98.183
};

export default function AboutPage() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#111827] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0A3594]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-[2px] bg-[#0A3594]" />
              <span className="text-[#6B93D6] text-[11px] font-semibold tracking-[.24em] uppercase">About Us</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Building With Purpose,<br />
              Guided by Your Vision
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">{companyInfo.about}</p>
          </motion.div>
        </div>
      </section>

      {/* Raul Bio */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">

            {/* Image cluster — 5 cols */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <FadeUp>
                <Frame src="/raul-dante.jpg" alt="Raul Ceron — RCG Estates"
                  className="w-full h-[540px] rounded-2xl" priority />
              </FadeUp>
            </div>

            {/* Bio — 7 cols */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <FadeUp>
                <div className="flex items-center gap-3 mb-5">
                  <span className="block w-8 h-[2px] bg-[#0A3594]" />
                  <span className="text-[#0A3594] text-[11px] font-semibold tracking-[.24em] uppercase">Meet the Founder</span>
                </div>
                <h2 className="text-4xl font-bold text-[#111827] tracking-tight leading-tight mb-1">
                  Raul Ceron
                </h2>
                <p className="text-gray-400 text-sm font-mono tracking-wider mb-6">
                  {owner.title} · RCG Estates Construction & Development
                </p>
              </FadeUp>

              <FadeUp delay={0.08}>
                <div className="flex flex-wrap gap-2 mb-7">
                  {owner.credentials.map((c) => (
                    <span key={c}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#111827] bg-gray-50 border border-gray-100">
                      <BadgeCheck className="w-3.5 h-3.5 text-[#0A3594]" />
                      {c}
                    </span>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.12}>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">{owner.bio}</p>
              </FadeUp>

              <FadeUp delay={0.16}>
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 mb-8">
                  <Quote className="w-6 h-6 text-[#0A3594] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#111827] font-medium leading-relaxed italic text-sm">
                      &ldquo;Building a home is one of the biggest decisions a family makes. My job is to make sure they never feel alone in that process.&rdquo;
                    </p>
                    <p className="text-xs text-[#0A3594] font-mono tracking-widest mt-3 uppercase font-bold">
                      — Raul Ceron, Founder
                    </p>
                  </div>
                </div>
              </FadeUp>

            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-24 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="w-8 h-[2px] bg-[#0A3594]" />
              <span className="text-[#6B93D6] text-[11px] font-semibold tracking-[.24em] uppercase">What Sets Us Apart</span>
              <div className="w-8 h-[2px] bg-[#0A3594]" />
            </div>
            <h2 className="text-4xl font-bold text-white tracking-tight">What Sets Us Apart</h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {companyInfo.principles.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.09}>
                <div className="rounded-2xl bg-white/5 border border-white/8 p-7 h-full hover:bg-white/8 transition-colors">
                  <div className="text-4xl font-bold text-white/10 font-mono mb-4 leading-none">0{i + 1}</div>
                  <div className="flex items-start gap-2 mb-3">
                    <CheckCircle className="w-4 h-4 text-[#0A3594] shrink-0 mt-0.5" />
                    <h3 className="font-bold text-white text-sm">{p.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area + Map */}
      <section className="bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

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

            <FadeUp delay={0.1} className="lg:col-span-8">
              <div className="relative w-full overflow-hidden border border-neutral-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)]" style={{ height: 480 }}>
                <iframe
                  src="https://maps.google.com/maps?q=RCG+Estates+Construction+%26+Development,+McAllen,+TX&t=&z=9&ie=UTF8&output=embed"
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
    </>
  );
}

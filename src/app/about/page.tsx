"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import {
  ArrowRight, CheckCircle, Phone, MapPin, Quote, BadgeCheck, Building2,
} from "lucide-react";
import { companyInfo, owner, projects, images } from "@/data/mockData";

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
              <span className="text-[#6B93D6] text-[11px] font-semibold tracking-[.24em] uppercase">About RCG Estates</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              One Builder.<br />
              <span className="text-[#0A3594]">From the Lot to the Keys.</span>
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
                <Frame src={projects[0].images[0]} alt="RCG Estates — 816 N Trinity"
                  className="w-full h-72 rounded-2xl" priority />
              </FadeUp>
              <FadeUp delay={0.12} className="mt-5 ml-10">
                <Frame src={projects[1].images[2]} alt="RCG Estates interior"
                  className="w-4/5 h-48 rounded-xl" />
              </FadeUp>
              <FadeUp delay={0.2} className="mt-5">
                <div className="rounded-xl border border-gray-100 shadow-sm bg-white p-5">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-[#0A3594] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-mono text-[#0A3594] tracking-widest uppercase mb-1">Premium Finish Partner</p>
                      <p className="font-bold text-[#111827] text-sm">{owner.partner.name}</p>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">{owner.partner.note}</p>
                      <p className="text-xs text-gray-400 mt-0.5 font-mono">{owner.partner.address}</p>
                    </div>
                  </div>
                </div>
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
                      "I built RCG Estates to give Rio Grande Valley families something that didn't exist — a builder
                      who is also your licensed agent, guiding you from the lot purchase to the closing table."
                    </p>
                    <p className="text-xs text-[#0A3594] font-mono tracking-widest mt-3 uppercase font-bold">
                      — Raul Ceron, Founder
                    </p>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: BadgeCheck, label: "Licensed TX Agent", sub: "Full real estate representation on land purchase and sale" },
                    { icon: BadgeCheck, label: "Custom Builder", sub: "End-to-end construction — foundation to finish" },
                    { icon: BadgeCheck, label: "RGV Land Expert", sub: "Lot evaluation, zoning, and soil review before you commit" },
                  ].map((item) => (
                    <div key={item.label} className="p-4 rounded-xl border border-gray-100 shadow-sm bg-white">
                      <item.icon className="w-5 h-5 text-[#0A3594] mb-2" />
                      <div className="font-bold text-[#111827] text-xs mb-1">{item.label}</div>
                      <div className="text-xs text-gray-400 leading-relaxed">{item.sub}</div>
                    </div>
                  ))}
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
              <span className="text-[#6B93D6] text-[11px] font-semibold tracking-[.24em] uppercase">Core Principles</span>
              <div className="w-8 h-[2px] bg-[#0A3594]" />
            </div>
            <h2 className="text-4xl font-bold text-white tracking-tight">How We Build</h2>
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

      {/* Service Area + Contact */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <FadeUp className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-[#0A3594]" />
                <span className="text-[#0A3594] text-[11px] font-semibold tracking-[.24em] uppercase">Service Area</span>
              </div>
              <h2 className="text-3xl font-bold text-[#111827] tracking-tight mb-4 leading-tight">
                Building Custom Homes Across the Rio Grande Valley
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                We proudly serve clients in McAllen, Pharr, Mission, Harlingen, Brownsville, and surrounding South Texas areas.
                Every home is customized to thrive in the local climate and community.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["McAllen", "Mission", "Pharr", "Harlingen", "Brownsville", "Edinburg", "Weslaco"].map((c) => (
                  <span key={c}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-50 border border-gray-100 text-[#0A3594]">
                    {c}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact"
                  className="btn-glow inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0A3594] hover:bg-[#072D82] text-white font-semibold rounded-xl transition-all text-sm">
                  Schedule a Free Consultation <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+19564087136"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium rounded-xl transition-all text-sm">
                  <Phone className="w-4 h-4" /> (956) 408-7136
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.12} className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm relative bg-gray-50" style={{ height: "420px" }}>
                {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={12}
                    options={{
                      disableDefaultUI: true,
                      zoomControl: true,
                      scrollwheel: false,
                      streetViewControl: false,
                      mapTypeControl: false,
                      fullscreenControl: false,
                      styles: [
                        {
                          featureType: "poi",
                          elementType: "labels",
                          stylers: [{ visibility: "off" }]
                        }
                      ]
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Loading Map...
                  </div>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}

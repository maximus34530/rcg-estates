"use client";


import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Home, PencilRuler, Building2,
  ArrowRight, CheckCircle, Phone,
} from "lucide-react";
import { services } from "@/data/mockData";
import FadeUp from "@/components/FadeUp";

const iconMap: Record<string, React.ElementType> = {
  Home, PencilRuler, Building2,
};

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
              <span className="text-[#6B93D6] text-[11px] font-semibold tracking-[.24em] uppercase">Our Services</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5">
              Construction Built Around Your Vision
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              A complete suite of construction services designed to bring your ideas to life — from initial concept to final delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Box Matrix */}
      <section className="pt-16 pb-20 bg-white border-t border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-8 h-[2px] bg-[#0A3594]" />
              <span className="text-[#0A3594] text-[11px] font-semibold tracking-[.24em] uppercase">Core Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
              From Land to Move-In
            </h2>
          </FadeUp>

          <div className="border border-neutral-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.07)] transition-all duration-500 ease-out grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
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
                    <p className="text-[#111827] font-semibold text-sm mb-2">{service.subheading}</p>
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
              { label: "General Contractor — McAllen & Mission", sub: "Every build managed from permit to final walkthrough" },
              { label: "Premium Finish Selections", sub: "Access to artisan hardware and high-end materials for every build" },
              { label: "RGV Land & Lot Expert", sub: "Soil, zoning, flood zone, and setback evaluation before you commit a dollar" },
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
                Built in the RGV.<br />For the RGV.
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                Come with whatever you have. See what&apos;s possible, what it costs, and how to get there.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact"
                  className="btn-glow inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#0A3594] hover:bg-[#072D82] text-white font-bold rounded-none transition-colors text-sm">
                  Start a Free Consultation <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+19564087136"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/20 text-white font-semibold rounded-none hover:bg-white/5 transition-colors text-sm">
                  <Phone className="w-4 h-4" /> (956) 408-7136
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>


    </>
  );
}

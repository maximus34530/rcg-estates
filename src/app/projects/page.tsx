"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Maximize2, BedDouble, Bath, ArrowRight, Phone, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, ProjectCategory, companyInfo } from "@/data/mockData";

type Project = typeof projects[0];

/* ─── Gallery Modal ──────────────────────────────────────────────────────── */
function GalleryModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const total = project.images.length;

  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
      onClick={onClose}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 shrink-0" onClick={(e) => e.stopPropagation()}>
        <div>
          <h2 className="text-white font-bold text-lg leading-none">{project.title}</h2>
          <p className="text-white/40 text-xs mt-0.5 flex items-center gap-1">
            <MapPin className="w-3 h-3" />{project.address}, {project.city}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/30 text-xs font-mono">{idx + 1} / {total}</span>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 hover:border-white/40 hover:bg-white/10 transition-all text-white/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main image */}
      <div className="flex-1 relative flex items-center justify-center min-h-0 px-14" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.22 }}
            className="relative w-full h-full max-h-[calc(100vh-220px)]"
          >
            <Image
              src={project.images[idx]}
              alt={`${project.title} — photo ${idx + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next */}
        <button onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/10 hover:bg-[#0A3594]/80 hover:border-[#0A3594]/60 text-white transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/10 hover:bg-[#0A3594]/80 hover:border-[#0A3594]/60 text-white transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="shrink-0 border-t border-white/8 px-5 py-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none justify-center">
          {project.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`relative shrink-0 w-14 h-14 overflow-hidden transition-all ${
                i === idx ? "ring-2 ring-[#0A3594] opacity-100" : "opacity-40 hover:opacity-70"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="56px" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

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

/* ─── Corner-accent image frame ─────────────────────────────────────────── */
function ImageFrame({
  src, alt, className = "",
}: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw" />
    </div>
  );
}

const categories: (ProjectCategory | "All")[] = ["All", "Custom Build"];

const statusStyles: Record<string, string> = {
  "Completed":    "bg-emerald-950/60 text-emerald-400 border border-emerald-700/50",
  "In Progress":  "bg-blue-950/60 text-blue-400 border border-blue-700/50",
  "Coming Soon":  "bg-amber-950/60 text-amber-400 border border-amber-700/50",
};

/* ─── Project card (dark-surface) ─────────────────────────────────────── */
function ProjectCard({ project, tall = false, onClick }: { project: Project; tall?: boolean; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="cursor-pointer border border-white/8 bg-[#0D1117] hover:border-white/20 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out flex flex-col overflow-hidden group/card"
    >
      <div className={`relative w-full ${tall ? "h-72" : "h-52"} overflow-hidden`}>
        <ImageFrame src={project.images[0]} alt={project.title} className="absolute inset-0 w-full h-full" />
        {/* Photo count badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm border border-white/10 text-white text-xs font-mono opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
          {project.images.length} photos
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-0.5 text-xs font-semibold font-mono ${statusStyles[project.status] ?? ""}`}>
            {project.status}
          </span>
          <span className="text-xs text-white/30 font-mono">{project.year}</span>
          {project.highlight && (
            <span className="ml-auto text-[10px] text-[#6B93D6] font-mono uppercase tracking-wide">{project.highlight}</span>
          )}
        </div>

        <h3 className="font-bold text-white text-lg mb-1">{project.title}</h3>
        <p className="flex items-center gap-1.5 text-sm text-white/40 mb-3">
          <MapPin className="w-3.5 h-3.5 text-[#0A3594]" />
          {project.address}, {project.city}
        </p>
        <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">{project.description}</p>

        <div className="h-px w-full bg-white/8 mb-4" />

        <div className="flex gap-4 text-xs text-white/40 font-mono mb-4">
          <span className="flex items-center gap-1"><Maximize2 className="w-3 h-3" /> {project.sqft.toLocaleString()} sqft</span>
          <span className="flex items-center gap-1"><BedDouble className="w-3 h-3" /> {project.bedrooms} Bed</span>
          <span className="flex items-center gap-1"><Bath className="w-3 h-3" /> {project.bathrooms} Bath</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.features.slice(0, 3).map((f) => (
            <span key={f} className="px-2 py-0.5 text-xs bg-white/5 border border-white/10 text-white/50">{f}</span>
          ))}
          {project.features.length > 3 && (
            <span className="px-2 py-0.5 text-xs bg-[#0A3594]/15 border border-[#0A3594]/25 text-[#6B93D6] font-medium">
              +{project.features.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const col0 = filtered.filter((_, i) => i % 3 === 0);
  const col1 = filtered.filter((_, i) => i % 3 === 1);
  const col2 = filtered.filter((_, i) => i % 3 === 2);

  return (
    <>
      <AnimatePresence>
        {selected && <GalleryModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      {/* Hero */}
      <section className="pt-32 pb-0 bg-[#111827] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-96 bg-[#0A3594]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-[#0A3594]" />
              <span className="text-[#6B93D6] text-[11px] font-semibold tracking-[.24em] uppercase">Our Portfolio</span>
              <div className="w-8 h-[2px] bg-[#0A3594]" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5">
              Built Across the Rio Grande Valley
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Every project is a collaboration — your vision, our craft. From the Bette St collection in
              Mission to 816 N Trinity in McAllen, every build reflects a distinct client story.
            </p>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
              {companyInfo.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.07 }}
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

      {/* Filter Bar */}
      <div className="bg-[#0D1117] border-b border-white/10 sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-0 flex-wrap items-stretch">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-4 text-sm font-medium transition-all border-r border-white/10 ${
                filter === cat
                  ? "bg-[#0A3594] text-white"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto flex items-center px-5 text-xs text-white/30 font-mono">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Masonry Grid */}
      <section className="py-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>

              {/* Desktop: 3-col masonry */}
              <div className="hidden lg:grid grid-cols-3 gap-[1px] items-start bg-white/8">
                <div className="flex flex-col gap-[1px]">
                  {col0.map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                      <ProjectCard project={p} tall={i % 2 === 0} onClick={() => setSelected(p)} />
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-col gap-[1px] mt-14">
                  {col1.map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.06 }}>
                      <ProjectCard project={p} tall={i % 2 !== 0} onClick={() => setSelected(p)} />
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-col gap-[1px] mt-7">
                  {col2.map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 + i * 0.06 }}>
                      <ProjectCard project={p} tall={i % 2 === 0} onClick={() => setSelected(p)} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile / Tablet: 1-2 col */}
              <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/8">
                {filtered.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                    <ProjectCard project={p} onClick={() => setSelected(p)} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA — charcoal with border structure */}
      <section className="bg-[#111827] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* Main CTA */}
            <FadeUp className="lg:col-span-8 px-8 py-16">
              <div className="w-8 h-[2px] bg-[#0A3594] mb-8" />
              <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
                Want to Be Our Next Project?
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed max-w-lg">
                Tell us about your lot, your vision, and your timeline. As your builder and licensed agent, Raul handles every step from land search to move-in day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact"
                  className="btn-glow inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#0A3594] hover:bg-[#002EB8] text-white font-semibold rounded-none transition-colors text-sm">
                  Start a Conversation <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+19564087136"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/20 text-white font-semibold rounded-none hover:bg-white/5 transition-colors text-sm">
                  <Phone className="w-4 h-4" /> (956) 408-7136
                </a>
              </div>
            </FadeUp>

            {/* Side stat */}
            <div className="lg:col-span-4 px-8 py-16 flex flex-col justify-center">
              <div className="text-[10px] text-white/30 font-mono uppercase tracking-[.2em] mb-3">Current Pipeline</div>
              <div className="text-5xl font-bold text-white mb-3">{projects.length}</div>
              <div className="text-sm text-white/50 leading-relaxed mb-6">
                Projects completed or in active development across McAllen, Mission, Pharr, Harlingen, and Brownsville.
              </div>
              <div className="text-[10px] text-white/25 font-mono uppercase tracking-[.2em]">Est. 2024 · Rio Grande Valley</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/mockData";

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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#111827] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0A3594]/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-[2px] bg-[#0A3594]" />
              <span className="text-[#6B93D6] text-[11px] font-semibold tracking-[.24em] uppercase">Insights & Guides</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5">
              The RCG Estates Build Journal
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Real insights from the field — custom build tips, local codes, design
              trends, and everything you need to build smarter in the Rio Grande Valley.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-white/0 pointer-events-none" />
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Featured Post */}
          <FadeUp className="mb-14">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:border-gray-200 transition-all">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <Image src={featured.image} alt={featured.title} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:1024px) 100vw,50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/40 to-[#111827]/0" />
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1 rounded-full bg-[#0A3594]/15 text-[#6B93D6] text-xs font-semibold border border-[#0A3594]/20 backdrop-blur-sm">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-10 bg-white flex flex-col justify-center">
                  <span className="text-[#0A3594] text-[10px] font-mono tracking-widest uppercase mb-3">{featured.category}</span>
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-3 group-hover:text-[#0A3594] transition-colors leading-tight tracking-tight">
                    {featured.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-5 text-sm">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                    <span>{formatDate(featured.date)}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-[#0A3594] font-semibold text-sm group-hover:gap-3 transition-all">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </FadeUp>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {rest.map((post, i) => (
              <FadeUp key={post.id} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.22 }}
                    className="h-full rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:border-gray-200 transition-all flex flex-col">
                    <div className="relative h-44 overflow-hidden">
                      <Image src={post.image} alt={post.title} fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw,33vw" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-[#0A3594] text-[10px] font-mono tracking-widest uppercase mb-2">{post.category}</span>
                      <h3 className="font-bold text-[#111827] text-base leading-snug mb-2 group-hover:text-[#0A3594] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400 font-mono border-t border-gray-100 pt-3">
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

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

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+1 (956) 408-7136", href: "tel:+19564087136" },
  { icon: Mail, label: "Email", value: "rceron.tx@gmail.com", href: "mailto:rceron.tx@gmail.com" },
  { icon: MapPin, label: "Service Area", value: "McAllen · Mission · Harlingen · Pharr", href: undefined },
  { icon: Clock, label: "Office Hours", value: "Mon – Fri: 9 AM – 5 PM · Sat: By Appt", href: undefined },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#111827] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#0A3594]/8 rounded-full blur-3xl" />
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
              <span className="text-[#6B93D6] text-[11px] font-semibold tracking-[.24em] uppercase">Get In Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5">
              Let's Talk About Your Project
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Whether you're ready to break ground or just starting to explore
              what's possible — we're here. Fill out the form and we'll follow
              up within one business day.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F9FAFB] to-[#F9FAFB]/0 pointer-events-none" />
      </section>

      {/* Main Content */}
      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Sidebar */}
            <FadeUp delay={0.1} className="lg:col-span-1 space-y-5">

              {/* Contact Info */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                <h2 className="font-bold text-[#111827] text-base mb-6">Contact Information</h2>
                <ul className="space-y-5">
                  {contactInfo.map((item) => (
                    <li key={item.label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-[#0A3594]/8 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-[#0A3594]" />
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="text-sm font-medium text-[#111827] hover:text-[#0A3594] transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-sm font-medium text-[#111827]">{item.value}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Socials */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                <h2 className="font-bold text-[#111827] text-base mb-4">Follow Our Work</h2>
                <div className="flex flex-col gap-3">
                  <a href="https://www.facebook.com/profile.php?id=61552752162933"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#0A3594]/20 hover:bg-[#0A3594]/5 transition-all group">
                    <FacebookIcon className="w-4 h-4 text-gray-400 group-hover:text-[#0A3594] transition-colors" />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-[#0A3594] transition-colors">
                      RCG Estates on Facebook
                    </span>
                  </a>
                  <a href="https://www.instagram.com/rcg.estates/"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#0A3594]/20 hover:bg-[#0A3594]/5 transition-all group">
                    <InstagramIcon className="w-4 h-4 text-gray-400 group-hover:text-[#0A3594] transition-colors" />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-[#0A3594] transition-colors">
                      @rcg.estates on Instagram
                    </span>
                  </a>
                </div>
              </div>

              {/* Trust signal */}
              <div className="bg-[#111827] rounded-2xl border border-white/8 p-7 text-center">
                <div className="text-4xl font-bold text-white mb-2">24hr</div>
                <div className="text-sm text-gray-400 leading-relaxed">
                  Guaranteed response time for all inquiries received during business hours.
                </div>
              </div>
            </FadeUp>

            {/* Form */}
            <FadeUp delay={0.18} className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h2 className="font-bold text-[#111827] text-xl mb-2">Send Us a Message</h2>
                <p className="text-gray-400 text-sm mb-8">
                  Tell us about your project. The more detail you share, the
                  better we can prepare for our conversation.
                </p>
                <ContactForm />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}

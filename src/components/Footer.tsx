import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

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

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  "Custom Home Builds",
  "Design & Planning",
  "Luxury Renovations",
  "Real Estate Advisory",
  "Pre-Construction",
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-400">

      {/* CTA Strip */}
      <div className="border-t border-white/8 bg-[#0D1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-semibold text-lg">Ready to build your dream home?</p>
            <p className="text-gray-500 text-sm mt-0.5">Let's talk. We're local, experienced, and ready to make it happen.</p>
          </div>
          <Link
            href="/contact"
            className="btn-glow shrink-0 px-7 py-3.5 bg-[#0A3594] hover:bg-[#072D82] text-white font-semibold rounded-lg transition-colors text-sm"
          >
            Start Your Project
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2.5 mb-5">
              <Image
                src="/logo.png"
                alt="RCG Estates logo"
                width={100}
                height={63}
                className="h-8 w-auto object-contain shrink-0"
              />
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-lg tracking-tight">
                RCG<span className="text-[#6B93D6]"> Estates</span>
              </span>
              <div className="text-gray-600 text-[9px] font-medium tracking-[.25em] uppercase mt-0.5">
                Construction & Development
              </div>
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-gray-500 mb-6">
            Building premium custom homes across the Rio Grande Valley. Your vision,
            our craftsmanship — from lot to closing table.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=61552752162933"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RCG Estates on Facebook"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-[#0A3594] text-gray-500 hover:text-white transition-all"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/rcg.estates/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RCG Estates on Instagram"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-[#0A3594] text-gray-500 hover:text-white transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white text-xs font-semibold uppercase tracking-[.2em] mb-5">Navigation</h3>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white text-xs font-semibold uppercase tracking-[.2em] mb-5">Services</h3>
          <ul className="space-y-2.5">
            {serviceLinks.map((label) => (
              <li key={label}>
                <Link href="/services" className="text-sm text-gray-500 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-xs font-semibold uppercase tracking-[.2em] mb-5">Contact</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#0A3594] mt-0.5 shrink-0" />
              <span className="text-sm text-gray-500">
                Rio Grande Valley, TX<br />
                McAllen · Mission · Harlingen · Pharr
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#0A3594] shrink-0" />
              <a href="tel:+19564087136" className="text-sm text-gray-500 hover:text-white transition-colors">
                +1 (956) 408-7136
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#0A3594] shrink-0" />
              <a href="mailto:rceron.tx@gmail.com" className="text-sm text-gray-500 hover:text-white transition-colors">
                rceron.tx@gmail.com
              </a>
            </li>
          </ul>
          <div className="mt-6 text-xs text-gray-600 space-y-0.5">
            <p>Mon – Fri: 9 AM – 5 PM</p>
            <p>Saturday: By Appointment</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} RCG Estates Construction & Development. All rights reserved.</p>
          <p>Rio Grande Valley, Texas · Licensed Texas Real Estate Agent & Custom Builder</p>
        </div>
      </div>
    </footer>
  );
}

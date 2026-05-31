"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

/* ── Types ───────────────────────────────────────────────────────────────── */
type GoogleReview = {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
};

/* ── Fallback — home build reviews only ─────────────────────────────────── */
const BUILD_REVIEW_KEYWORDS = /\b(build|home|construction|house|property|realtor)\b/i;

const FALLBACK: GoogleReview[] = [
  { author_name: "Amaris Ramirez", profile_photo_url: "", rating: 5, relative_time_description: "a year ago", text: "It can be scary to start the process of building a home when you don't know where to begin, but RCG made it seamless! They were very helpful throughout the entire process, from start to finish. Def recommend!" },
  { author_name: "Valeria Cantu", profile_photo_url: "", rating: 5, relative_time_description: "a year ago", text: "Working with RCG Estates and Construction to build my home was one of the best decisions I've made. Their team was professional, communicative, and fully committed to turning my vision into reality." },
  { author_name: "Marcelo Flores", profile_photo_url: "", rating: 5, relative_time_description: "a year ago", text: "Raul Ceron is an extraordinary individual who exemplifies excellence in every endeavor. Whether building and selling impressive properties or overseeing construction, Raul does it all with unmatched dedication." },
  { author_name: "Noah Villarreal", profile_photo_url: "", rating: 5, relative_time_description: "2 years ago", text: "Closes deals and gets business done, best realtor for construction & development!!" },
];

function isBuildReview(review: GoogleReview) {
  return BUILD_REVIEW_KEYWORDS.test(review.text);
}

/* ── Avatar ──────────────────────────────────────────────────────────────── */
function Avatar({ name, photoUrl }: { name: string; photoUrl: string }) {
  const [imgError, setImgError] = useState(false);
  const initial = name.trim()[0]?.toUpperCase() ?? "?";

  if (photoUrl && !imgError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt={name}
        onError={() => setImgError(true)}
        className="w-9 h-9 rounded-full object-cover shrink-0"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div className="w-9 h-9 rounded-full bg-[#0A3594]/10 flex items-center justify-center shrink-0">
      <span className="text-[#0A3594] text-sm font-bold">{initial}</span>
    </div>
  );
}

/* ── Review card ─────────────────────────────────────────────────────────── */
function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <div className="w-[340px] shrink-0 bg-white border border-neutral-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out p-7">
      <div className="flex gap-1 mb-4">
        {[...Array(review.rating)].map((_, j) => (
          <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-[#111827] text-sm font-medium leading-relaxed mb-6 line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <Avatar name={review.author_name} photoUrl={review.profile_photo_url} />
        <div>
          <div className="text-sm font-semibold text-[#111827]">{review.author_name}</div>
          {review.relative_time_description && (
            <div className="text-xs text-gray-400 font-mono mt-0.5">
              {review.relative_time_description}
            </div>
          )}
        </div>
        {/* Google G mark */}
        <div className="ml-auto shrink-0">
          <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Section label ───────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

/* ── Main component ──────────────────────────────────────────────────────── */
export default function ReviewsMarquee() {
  const [reviews, setReviews] = useState<GoogleReview[]>(FALLBACK);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.reviews) && data.reviews.length > 0) {
          const liveNames = new Set(
            (data.reviews as GoogleReview[]).map((r) => r.author_name.toLowerCase())
          );
          const extra = FALLBACK.filter(
            (f) => !liveNames.has(f.author_name.toLowerCase())
          );
          const merged = [...data.reviews, ...extra].filter(isBuildReview);
          if (merged.length > 0) setReviews(merged);
        }
      })
      .catch(() => {/* silently keep fallback */});
  }, []);

  const items = [...reviews, ...reviews]; // duplicate for seamless loop

  return (
    <section className="py-20 bg-white overflow-hidden border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <FadeUp>
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-8 h-[2px] bg-[#0A3594]" />
            <span className="text-[#0A3594] text-[11px] font-semibold tracking-[.24em] uppercase">
              Homeowner Reviews
            </span>
          </div>
        </FadeUp>
        <FadeUp delay={0.06}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight mb-2">
                From People Who Built With Raul
              </h2>
              <p className="text-sm text-gray-500 max-w-xl">
                Pulled from Google reviews — only from clients who mention home building or construction.
              </p>
            </div>
            <a
              href="https://www.google.com/search?q=rcg%20estates%20google#lrd=0x8665a10a63699df7:0x97aa34bfe1fbcce8,1"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 text-xs text-[#0A3594] font-semibold border-b border-[#0A3594]/30 hover:border-[#0A3594] pb-px transition-all"
            >
              See all on Google <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </FadeUp>
      </div>

      <div className="overflow-hidden select-none">
        <div className="marquee-track gap-5 px-5">
          {items.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

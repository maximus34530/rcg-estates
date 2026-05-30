# RCG Estates — Developer Log

> **Project:** RCG Estates Construction & Development
> **Stack:** Next.js 16.2.6 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion v12 · Supabase · n8n

---

## Environment Setup

```bash
# Clone and install
cd "Coding Lessons"
npx create-next-app@latest rcg-estates --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd rcg-estates
npm install framer-motion lucide-react @supabase/supabase-js

# Dev server
npm run dev       # http://localhost:3000

# Production build
npm run build
npm start

# Type check only
npx tsc --noEmit
```

---

## Environment Variables

Create `.env.local` in the project root:

```env
# Supabase (required for contact form lead capture)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# n8n webhook (optional — failures are non-fatal, logged to console only)
WEBHOOK_CONTACT_URL=https://neuronex-n8n.com/webhook/806ce233-411b-4843-a211-19615d3af0a6
```

**Security note:** `NEXT_PUBLIC_*` variables are exposed to the browser. The Supabase anon key is safe to expose as long as RLS policies are correctly configured (see `supabase-migrations.md`).

---

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens, marquee keyframe, base styles
│   ├── layout.tsx           # Root layout — Inter font, Navbar, Footer
│   ├── page.tsx             # Home: Hero, Who We Are, Process, Services,
│   │                        #       Gallery, Testimonial Marquee, Blog, CTA
│   ├── about/page.tsx       # Raul Ceron bio, principles, testimonials
│   ├── services/page.tsx    # 4 services with real images, dual-role callout
│   ├── projects/page.tsx    # Masonry 3-col staggered portfolio grid
│   ├── blog/page.tsx        # Blog index — featured + grid
│   └── blog/[slug]/page.tsx # Blog post — async params, generateStaticParams
├── components/
│   ├── Navbar.tsx           # Scroll-aware, mobile drawer, framer layout pill
│   ├── Footer.tsx           # 4-col grid, inline FB/IG SVG icons
│   ├── ContactForm.tsx      # localStorage persistence + Supabase + n8n dual-post
│   └── ui/
│       ├── Button.tsx       # variant: primary | outline | ghost
│       └── Input.tsx        # Input + Textarea with label/error slots
├── lib/
│   └── supabaseClient.ts    # Lazy singleton — avoids build-time env crash
└── data/
    └── mockData.ts          # All real client data: images, projects, services,
                             # testimonials, blog posts, owner bio, process steps
```

---

## Key Architectural Decisions

### Font: Inter (not Geist)
Switched from Geist to Inter for the luxury architectural aesthetic. Loaded via `next/font/google` with `display: "swap"` and weight range 300–800.

### Tailwind CSS v4 Syntax
**Do NOT use the v3 three-directive syntax.** Tailwind v4 uses a single import:
```css
@import "tailwindcss";
```
Custom theme tokens go inside `@theme inline {}`. No `tailwind.config.js` needed.

### Supabase Lazy Singleton Pattern
The Supabase client is **not** initialized at module load time. This avoids a build-time crash when env vars are undefined during static generation:

```ts
let _client: SupabaseClient | null = null;
export function getSupabaseClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  _client = createClient(url, key);
  return _client;
}
```

### Contact Form — Dual Async Submission
Both Supabase insert and n8n webhook POST run concurrently via `Promise.allSettled`. Supabase failure = fatal. Webhook failure = `console.warn` only.

```ts
const [supabaseResult, webhookResult] = await Promise.allSettled([
  supabase.from("leads").insert([payload]),
  fetch(webhookUrl, { method: "POST", ... }),
]);
```

`localStorage` cleared **only** on confirmed Supabase success.

### lucide-react v1 — No Social Icons
`lucide-react@1.x` does not export `Facebook` or `Instagram`. Both implemented as inline SVG components in `Footer.tsx` and `contact/page.tsx`.

### Next.js 16 Async Params
```ts
interface Props { params: Promise<{ slug: string }>; }
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
}
```

### Image Hosting — WordPress CDN
Two base paths on the client's WordPress site:
- `/wp-content/uploads/2025/06/` — generic house photos, logo, avatars
- `/wp-content/uploads/2025/07/` — numbered project images (`1-4.jpg`, `2-4-scaled.jpg`, etc.)

---

## Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#0047FF` | Primary CTA, section labels, accents |
| `--accent-deep` | `#002EB8` | Hover states |
| `--dark` | `#111827` | Dark section backgrounds, navbar |
| White | `#FFFFFF` | Primary section background |
| Alt | `#F9FAFB` | Alternating section background |
| Border (light) | `#E5E7EB` / `border-gray-100` | Clean architectural borders |
| Border (dark) | `rgba(255,255,255,0.08)` | Dark section borders |

### No Grid Overlays
The design uses **solid architectural backgrounds only** — no CSS grid-line textures.
Previous `.blueprint-grid` classes have been fully removed.

### Testimonial Marquee
CSS `@keyframes marquee-scroll` on `.marquee-track`. 6 testimonials doubled to 12 for seamless looping. Pauses on hover.

```css
@keyframes marquee-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-track { animation: marquee-scroll 38s linear infinite; }
.marquee-track:hover { animation-play-state: paused; }
```

### Industrial Image Frames
4× absolute `<span>` corner brackets per image. Color: `border-[#0047FF]/50`. `scale(1.025)` on `whileHover`.

### Masonry Project Grid (Desktop)
3 flex columns with stagger offsets (`mt-14` col 2, `mt-7` col 3). Mobile: 1–2 col standard grid.

---

## Deployment (Vercel)

```bash
npm i -g vercel
vercel

# Add env vars:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add WEBHOOK_CONTACT_URL
```

All routes build as static (`○`) except `/blog/[slug]` (SSG via `generateStaticParams`).

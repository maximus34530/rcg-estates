import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact RCG Estates | Start Your Custom Home Build",
  description:
    "Whether you have a lot, a budget, or just an idea — let's talk. RCG Estates serves McAllen, Mission, Harlingen, Pharr, and the entire Rio Grande Valley.",
  openGraph: {
    title: "Contact RCG Estates | Start Your Custom Home Build",
    description:
      "Bring your lot, budget, or idea. We'll tell you exactly what's possible in the Rio Grande Valley.",
    url: "https://rcgestatesconstruction.com/contact",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact RCG Estates" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact RCG Estates",
    description: "Bring your lot, budget, or idea. We'll tell you exactly what's possible.",
    images: ["/og-image.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

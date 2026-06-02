import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About RCG Estates | Custom Home Builder — Rio Grande Valley",
  description:
    "Meet Raul Ceron, founder of RCG Estates. A licensed TX agent and custom builder guiding families across the Rio Grande Valley from lot purchase to closing table.",
  openGraph: {
    title: "About RCG Estates | Custom Home Builder — Rio Grande Valley",
    description:
      "Meet Raul Ceron — licensed agent, custom builder, and RGV land expert guiding families from lot to keys.",
    url: "https://rcgestatesconstruction.com/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RCG Estates — About" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About RCG Estates",
    description: "Licensed TX agent and custom builder guiding RGV families from lot to keys.",
    images: ["/og-image.png"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

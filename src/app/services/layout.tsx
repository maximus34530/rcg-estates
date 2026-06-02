import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | RCG Estates — Custom Home Builder, Rio Grande Valley",
  description:
    "Full-scope custom home building services in the RGV: lot selection, design, construction, and real estate advisory. One builder, every phase.",
  openGraph: {
    title: "Services | RCG Estates — Custom Home Builder",
    description:
      "Lot selection to final walkthrough — every phase handled by one builder in the Rio Grande Valley.",
    url: "https://rcgestatesconstruction.com/services",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RCG Estates Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | RCG Estates",
    description: "Every phase of your custom home build, handled by one team in the RGV.",
    images: ["/og-image.png"],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

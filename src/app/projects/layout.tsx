import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | RCG Estates — Custom Homes Across the Rio Grande Valley",
  description:
    "Real homes at real addresses. See the Bette St collection in Mission and 816 N Trinity in McAllen. Drive by before you hire anyone.",
  openGraph: {
    title: "Portfolio | RCG Estates — Custom Homes Across the RGV",
    description:
      "Real homes at real addresses in McAllen and Mission. Drive by before you hire anyone.",
    url: "https://rcgestatesconstruction.com/projects",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RCG Estates Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | RCG Estates",
    description: "Real homes at real addresses in McAllen and Mission, TX.",
    images: ["/og-image.png"],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

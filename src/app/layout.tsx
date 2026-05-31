import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RCG Estates | Custom Home Builder — Rio Grande Valley",
  description:
    "RCG Estates builds premium custom homes across the Rio Grande Valley — McAllen, Mission, Harlingen, and Pharr. From pre-approval to move-in, we handle every detail.",
  keywords:
    "custom home builder RGV, Rio Grande Valley real estate, McAllen homes, luxury homes RGV, RCG Estates",
  metadataBase: new URL("https://rcgestatesconstruction.com"),
  openGraph: {
    title: "RCG Estates | Custom Home Builder — Rio Grande Valley",
    description:
      "Premium custom estate development in the Rio Grande Valley. Built to your vision, managed from foundation to finish.",
    type: "website",
    url: "https://rcgestatesconstruction.com",
    siteName: "RCG Estates",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RCG Estates — Custom Home Builder, Rio Grande Valley",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RCG Estates | Custom Home Builder — Rio Grande Valley",
    description:
      "Premium custom estate development in the Rio Grande Valley. Built to your vision, managed from foundation to finish.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

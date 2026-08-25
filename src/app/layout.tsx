import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import PWARegister from "@/components/PWARegister";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Odi Portfolio — Odinaka Ogbonna",
  description: "Frontend developer and digital creative building premium digital products, modern brands and scalable user experiences.",
  keywords: [
    "Odi",
    "Odinaka Ogbonna",
    "Frontend Developer",
    "Next.js Developer",
    "UI UX Designer",
    "Portfolio",
    "Digital Creative",
  ],
  authors: [
    {
      name: "Odinaka Ogbonna",
    },
  ],
  creator: "Odinaka Ogbonna",
  openGraph: {
    title: "Odi Portfolio — Odinaka Ogbonna",
    description: "Frontend developer and digital creative building premium digital products and brands.",
    url: "https://odiportfolio.vercel.app",
    siteName: "Odi Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Odi Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Odi Portfolio — Odinaka Ogbonna",
    description: "Frontend developer and digital creative.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://odiportfolio.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Umami Cloud Analytics Core Telemetry Tracker */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="d78f3d77-7206-4b6a-8f69-423f6847f887"
          strategy="afterInteractive"
          defer
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} font-sans bg-[#050816] text-white antialiased`}
      >
        <Toaster position="top-right" />
        <PWARegister />
        {children}

        <Analytics />
      </body>
    </html>
  );
}
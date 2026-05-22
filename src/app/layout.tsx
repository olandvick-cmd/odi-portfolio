import type { Metadata } from "next";

import "./globals.css";

import { Space_Grotesk } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";

import { Toaster } from "react-hot-toast";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title:
    "Odi Portfolio — Odinaka Ogbonna",

  description:
    "Frontend developer and digital creative building premium digital products, modern brands and scalable user experiences.",

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
    title:
      "Odi Portfolio — Odinaka Ogbonna",

    description:
      "Frontend developer and digital creative building premium digital products and brands.",

    url: "https://yourdomain.com",

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

    title:
      "Odi Portfolio — Odinaka Ogbonna",

    description:
      "Frontend developer and digital creative.",

    images: ["/og-image.png"],
  },

  metadataBase: new URL(
    "https://yourdomain.com"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <body
        className={`${spaceGrotesk.variable} font-sans bg-[#050816] text-white antialiased`}
      >

        <Toaster
          position="top-right"
        />

        {children}

        <Analytics />

      </body>

    </html>
  );
}
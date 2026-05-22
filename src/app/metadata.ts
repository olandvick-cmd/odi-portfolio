import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Odi — Frontend Developer & Digital Creative",

  description:
    "Frontend developer and digital creative building modern brands, scalable digital products and premium user experiences.",

  keywords: [
    "Odi",
    "Frontend Developer",
    "Portfolio",
    "Next.js Developer",
    "UI UX",
    "Digital Creative",
    "Web Developer",
  ],

  authors: [
    {
      name: "Odi",
    },
  ],

  creator: "Odi",

  openGraph: {
    title:
      "Odi — Frontend Developer & Digital Creative",

    description:
      "Building premium digital experiences and scalable modern products.",

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
      "Odi — Frontend Developer & Digital Creative",

    description:
      "Building premium digital experiences and scalable modern products.",

    images: ["/og-image.png"],
  },

  metadataBase: new URL(
    "https://yourdomain.com"
  ),
};
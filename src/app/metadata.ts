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
    "Graphic Designer",
    "Branding",
    "Brand Identity",
    "Personal Portfolio",
    "Odinaka Ogbonna",
    
    
  ],

  authors: [
    {
      name: "Odinaka Ogbonna",
    },
  ],

  creator: "Odinaka Ogbonna",

  openGraph: {
    title:
      "Odi — Frontend Developer & Digital Creative",

    description:
      "Building premium digital experiences and scalable modern products.",

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

    title:
      "Odi — Frontend Developer & Digital Creative",

    description:
      "Building premium digital experiences and scalable modern products.",

    images: ["/og-image.png"],
  },

  metadataBase: new URL(
    "https://https://odiportfolio.vercel.app"
  ),
};
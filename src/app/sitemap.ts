import { MetadataRoute } from "next";

export default function sitemap():
  MetadataRoute.Sitemap {

  return [
    {
      url: "https://https://odiportfolio.vercel.app",
      lastModified: new Date(),
    },

    {
      url:
        "https://https://odiportfolio.vercel.app/admin",
      lastModified: new Date(),
    },
  ];
}
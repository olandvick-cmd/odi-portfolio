"use client";

import Link from "next/link";

export default function MobileSidebar() {
  return (
    <div className="lg:hidden sticky top-0 z-50 bg-[#050816]/90 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex items-center justify-between">

      <h1 className="text-2xl font-bold text-white">
        Odi<span className="text-purple-500">.</span>
      </h1>

      <Link
        href="/admin/projects"
        className="text-sm text-gray-300"
      >
        Projects
      </Link>

    </div>
  );
}
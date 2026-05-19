import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-white/10 p-6">
      
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold">
          Admin<span className="text-purple-500">.</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Portfolio Control Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 text-sm">

        <Link
          href="/admin"
          className="p-3 rounded-xl hover:bg-white/5 transition"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/projects"
          className="p-3 rounded-xl hover:bg-white/5 transition"
        >
          Projects
        </Link>

        <Link
          href="/admin/about"
          className="p-3 rounded-xl hover:bg-white/5 transition"
        >
          About
        </Link>

        <Link
          href="/admin/media"
          className="p-3 rounded-xl hover:bg-white/5 transition"
        >
          Media
        </Link>

        <Link
          href="/admin/settings"
          className="p-3 rounded-xl hover:bg-white/5 transition"
        >
          Settings
        </Link>

      </nav>

      {/* Footer */}
      <div className="absolute bottom-6 text-xs text-gray-600">
        v1.0 Portfolio CMS
      </div>

    </aside>
  );
}
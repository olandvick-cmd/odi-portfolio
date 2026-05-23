"use client";
import { MessageSquare, NewspaperIcon, ScanFaceIcon, SpeakerIcon } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FolderKanban,
  Images,
  Settings,
  LogOut,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

const links = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
  name: "Messages",
  href: "/admin/messages",
  icon: MessageSquare,
},
  {
    name: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    name: "Media",
    href: "/admin/media",
    icon: Images,
  },
  {
    name: "Blogs",
    href: "/admin/blog",
    icon: NewspaperIcon,
  },
  {
    name: "Testimonials",
    href: "/admin/testimonials",
    icon: SpeakerIcon,
  },
  {
    name: "Profile",
    href: "/admin/profile",
    icon: ScanFaceIcon,
  },
  
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },

];

export default function Sidebar() {

  const pathname = usePathname();

  async function handleLogout() {

    await supabase.auth.signOut();

    window.location.href = "/login";
  }

  return (
    <aside className="hidden lg:flex w-72 min-h-screen border-r border-white/5 bg-black/20 backdrop-blur-xl p-6 flex flex-col justify-between">

      {/* Top */}
      <div>

        {/* Logo */}
        <div className="mb-12">

          <h1 className="text-3xl font-bold text-white">
            Odi<span className="text-purple-500">.</span>
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Portfolio CMS
          </p>

        </div>

        {/* Navigation */}
        <nav className="space-y-2">

          {links.map((link) => {

            const Icon = link.icon;

            const active =
              pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition border ${
                  active
                    ? "bg-purple-600 border-purple-500 text-white"
                    : "border-transparent text-gray-400 hover:bg-white/[0.03] hover:text-white"
                }`}
              >

                <Icon size={20} />

                <span>
                  {link.name}
                </span>

              </Link>
            );
          })}

        </nav>

      </div>

      {/* Bottom */}
      <div className="space-y-5">

        {/* User Card */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5">

          <p className="text-sm text-gray-500 mb-2">
            Logged in as
          </p>

          <h3 className="text-white font-medium">
            Odi
          </h3>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition px-5 py-4 rounded-2xl flex items-center justify-center gap-3"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
}
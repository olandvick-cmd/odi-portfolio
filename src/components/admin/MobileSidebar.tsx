"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  MessageSquare, 
  NewspaperIcon, 
  ScanFaceIcon, 
  SpeakerIcon,
  LayoutDashboard,
  FolderKanban,
  Images,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Media", href: "/admin/media", icon: Images },
  { name: "Blogs", href: "/admin/blog", icon: NewspaperIcon },
  { name: "Testimonials", href: "/admin/testimonials", icon: SpeakerIcon },
  { name: "Profile", href: "/admin/profile", icon: ScanFaceIcon },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <>
      {/* Fixed Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-[100] bg-[#050816]/90 backdrop-blur-xl border-b border-white/5 px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/admin" className="select-none" onClick={() => setIsOpen(false)}>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Odi<span className="text-purple-500">.</span>
          </h1>
        </Link>

        {/* Expand/Collapse Toggle Button */}
        <button
          onClick={toggleMenu}
          className="text-zinc-400 hover:text-white p-2 -mr-2 focus:outline-none transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Expanded Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] z-[90] bg-[#050816]/95 backdrop-blur-3xl border-t border-white/5 overflow-y-auto flex flex-col justify-between">
          
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-4 px-2">Portfolio CMS</p>
            
            <nav className="space-y-2">
              {links.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={toggleMenu}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition border ${
                      active
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "border-transparent text-gray-400 hover:bg-white/[0.03] hover:text-white"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Section: User Card & Logout */}
          <div className="p-6 space-y-5 border-t border-white/5 pb-10">
            
            {/* User Card */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5">
              <p className="text-sm text-gray-500 mb-2">Logged in as</p>
              <h3 className="text-white font-medium">Odi</h3>
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
        </div>
      )}

      {/* Invisible spacer to prevent content from sliding under the top bar */}
      <div className="h-16 lg:hidden" />
    </>
  );
}
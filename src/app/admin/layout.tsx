import Sidebar from "@/components/admin/Sidebar";
import MobileSidebar from "@/components/admin/MobileSidebar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Added a custom selection color so highlighting text matches your purple branding
    <div className="relative flex flex-col lg:flex-row min-h-screen bg-[#050816] text-zinc-100 selection:bg-purple-500/30">
      
      {/* Subtle Ambient Glow - Adds depth without cluttering the UI */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/10 via-[#050816]/0 to-transparent pointer-events-none" />

      {/* Navigation Components */}
      <Sidebar />
      <MobileSidebar />

      {/* Themed Toaster - Custom dark mode styling with your brand colors */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(10, 15, 36, 0.8)',
            backdropFilter: 'blur(12px)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 10px 40px -10px rgba(168, 85, 247, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#9333ea', // Tailwind purple-600
              secondary: '#ffffff',
            },
          },
        }}
      />

      {/* Main Content Area */}
      {/* min-w-0 prevents large tables/charts from breaking the flex layout */}
      <main className="relative z-10 flex-1 flex flex-col min-w-0">
        <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-24 lg:pt-8 transition-all duration-300">
          {children}
        </div>
      </main>

    </div>
  );
}
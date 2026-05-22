import Sidebar from "@/components/admin/Sidebar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#050816] text-white">
      <Sidebar />
      <Toaster
  position="top-right"
/>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
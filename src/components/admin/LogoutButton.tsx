"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {

  const router = useRouter();

  async function handleLogout() {

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition px-5 py-3 rounded-2xl"
    >
      Logout
    </button>
  );
}
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  id: string;
  image?: string;
}

export default function DeleteProjectButton({ id, image }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    try {
      setIsDeleting(true);

      /* 1. Safely handle storage file deletion */
      if (image && image.includes("/storage/v1/object/public/projects/")) {
        const parts = image.split("/storage/v1/object/public/projects/");
        const imagePath = parts[1];

        if (imagePath) {
          // Wrap in a try/catch block so a missing file doesn't block the database delete
          try {
            await supabase.storage.from("projects").remove([imagePath]);
          } catch (storageErr) {
            console.error("Storage deletion failed, proceeding to database...", storageErr);
          }
        }
      }

      /* 2. Delete database row */
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Project deleted");
      
      // Force Next.js to update server data cache right away
      router.refresh();

    } catch (err: any) {
      console.error("Delete sequence crashed:", err);
      toast.error(err.message || "Failed to delete");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition flex items-center gap-2 disabled:opacity-50"
    >
      <Trash2 size={16} />
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
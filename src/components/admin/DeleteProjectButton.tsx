"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  id: string;
  image?: string;
}

export default function DeleteProjectButton({
  id,
  image,
}: Props) {

  const router = useRouter();

  async function handleDelete() {

    const confirmed = confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    /* Delete image from storage */
    if (image) {

      const imagePath = image.split("/storage/v1/object/public/projects/")[1];

      if (imagePath) {
        await supabase.storage
          .from("projects")
          .remove([imagePath]);
      }
    }

    /* Delete database row */
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete");
      return;
    }
toast.success("Project deleted");
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition flex items-center gap-2"
    >

      <Trash2 size={16} />

      Delete

    </button>
  );
}
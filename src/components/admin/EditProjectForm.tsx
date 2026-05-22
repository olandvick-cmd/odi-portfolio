"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import UploadImage from "./UploadImage";
import Image from "next/image";

interface Props {
  project: any;
}

export default function EditProjectForm({
  project,
}: Props) {

  const router = useRouter();

  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [image, setImage] = useState(project.image || "");
  const [loading, setLoading] = useState(false);

  async function handleUpdate(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("projects")
      .update({
        title,
        description,
        image,
      })
      .eq("id", project.id);

    setLoading(false);

    if (error) {
      alert("Update failed");
      return;
    }

    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleUpdate}
      className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 space-y-6"
    >

      {/* Title */}
      <div className="space-y-2">

        <label className="text-sm text-gray-400">
          Project Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

      </div>

      {/* Description */}
      <div className="space-y-2">

        <label className="text-sm text-gray-400">
          Description
        </label>

        <textarea
          rows={6}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none resize-none"
        />

      </div>

      {/* Current Image */}
      {image && (
        <div className="relative h-60 rounded-[28px] overflow-hidden border border-white/10">

          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />

        </div>
      )}

      {/* Upload */}
      <UploadImage onUpload={setImage} />

      {/* Button */}
      <button
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 transition px-6 py-4 rounded-2xl font-medium"
      >
        {loading ? "Updating..." : "Save Changes"}
      </button>

    </form>
  );
}
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { UploadCloud } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

interface Props {
  onUpload: (url: string) => void;
}

export default function UploadImage({
  onUpload,
}: Props) {

  const [uploading, setUploading] = useState(false);

  const [preview, setPreview] = useState("");

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();

    const fileName = `${uuidv4()}.${fileExt}`;

    const filePath = `projects/${fileName}`;

    const { error } = await supabase.storage
      .from("projects")
      .upload(filePath, file);

    if (error) {
      console.log(error);
      alert("Upload failed");
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("projects")
      .getPublicUrl(filePath);

    setPreview(publicUrl);

    onUpload(publicUrl);

    setUploading(false);
  }

  return (
    <div className="space-y-5">

      {/* Upload Box */}
      <label className="border border-dashed border-white/15 hover:border-purple-500/30 transition bg-white/[0.02] rounded-[28px] p-10 flex flex-col items-center justify-center text-center cursor-pointer">

        <UploadCloud
          size={40}
          className="text-purple-400 mb-5"
        />

        <h3 className="text-lg font-semibold mb-2">
          Upload Project Image
        </h3>

        <p className="text-gray-500 text-sm">
          PNG, JPG, WEBP supported
        </p>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />

      </label>

      {/* Loading */}
      {uploading && (
        <div className="text-sm text-purple-400">
          Uploading image...
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative h-60 rounded-[28px] overflow-hidden border border-white/10">

          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />

        </div>
      )}

    </div>
  );
}
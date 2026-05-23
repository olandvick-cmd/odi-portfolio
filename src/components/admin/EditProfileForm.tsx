"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import UploadImage from "./UploadImage";
import Image from "next/image";
import toast from "react-hot-toast";
import { FileText, Save } from "lucide-react";

interface Props {
  profile: any;
}

export default function EditProfileForm({ profile }: Props) {
  const router = useRouter();

  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || "");
  const [resumeUrl, setResumeUrl] = useState(profile.resume_url || "");
  const [loading, setLoading] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      avatar_url: avatarUrl,
      resume_url: resumeUrl,
      updated_at: new Date().toISOString(),
    };

    let error;

    // If a configuration row already exists, update it. Otherwise insert a fresh one.
    if (profile.id) {
      const res = await supabase
        .from("profile_settings")
        .update(payload)
        .eq("id", profile.id);
      error = res.error;
    } else {
      const res = await supabase
        .from("profile_settings")
        .insert([payload]);
      error = res.error;
    }

    setLoading(false);

    if (error) {
      toast.error("Failed to update configurations: " + error.message);
      return;
    }

    toast.success("Profile configurations saved successfully!");
    
    // Refresh caches and sync the home layout views
    router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 space-y-8">
      
      {/* SECTION 1: Display Image (DP) */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-white">Hero Avatar Picture (DP)</h3>
          <p className="text-gray-500 text-sm">Upload a professional image to display in your portfolio landing section card.</p>
        </div>

        {avatarUrl && (
          <div className="relative w-40 h-52 rounded-2xl overflow-hidden border border-white/10 bg-black/40">
            <Image
              src={avatarUrl}
              alt="Avatar Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <UploadImage onUpload={setAvatarUrl} />
      </div>

      <hr className="border-white/5" />

      {/* SECTION 2: Downloadable Resume Document Link */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-white">Resume URL / Document</h3>
          <p className="text-gray-500 text-sm">Paste the hosting link or public bucket file path for your downloadable CV.</p>
        </div>

        <div className="flex items-center gap-3 bg-black/20 border border-white/10 rounded-2xl px-5 py-4">
          <FileText size={20} className="text-purple-400 shrink-0" />
          <input
            type="url"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            placeholder="https://your-supabase-bucket.co/storage/v1/object/public/resumes/my-cv.pdf"
            className="w-full bg-transparent outline-none text-sm text-gray-300 placeholder-gray-600"
          />
        </div>
      </div>

      {/* Form Submission Action Control */}
      <div className="pt-2">
        <button
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 transition px-6 py-4 rounded-2xl font-medium flex items-center gap-2 text-white shadow-lg shadow-purple-600/10 cursor-pointer"
        >
          <Save size={18} />
          {loading ? "Saving Changes..." : "Save Configuration Settings"}
        </button>
      </div>

    </form>
  );
}
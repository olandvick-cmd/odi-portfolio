"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import UploadImage from "./UploadImage";
import Image from "next/image";
import toast from "react-hot-toast";
import { X, Plus, Image as ImageIcon, Paintbrush, Code2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  project: any;
}

export default function EditProjectForm({ project }: Props) {
  const router = useRouter();

  // Existing Core Base States Pre-populated
  const [title, setTitle] = useState(project.title || "");
  const [description, setDescription] = useState(project.description || "");
  const [image, setImage] = useState(project.image || ""); // Main Cover

  // NEW: Adaptive Framework States Pre-populated
  const [projectType, setProjectType] = useState<"development" | "design">(
    project.project_type === "design" ? "design" : "development"
  );
  const [subtitle, setSubtitle] = useState(project.subtitle || "");
  const [role, setRole] = useState(project.role || "");
  const [liveUrl, setLiveUrl] = useState(project.live_url || "");
  const [githubUrl, setGithubUrl] = useState(project.github_url || "");

  // NEW: Array Array Pre-populated States (with fallback checks)
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(project.tags || []);

  const [colorInput, setColorInput] = useState("#7c3aed");
  const [colors, setColors] = useState<string[]>(project.colors || []);

  const [galleryImages, setGalleryImages] = useState<string[]>(project.gallery_images || []);

  const [loading, setLoading] = useState(false);

  // Helper handling logic for Tags array append mutations
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // Helper handling logic for Palette array append mutations
  const addColor = () => {
    if (colorInput && !colors.includes(colorInput)) {
      setColors([...colors, colorInput]);
    }
  };

  // Helper handling logic for Multi-Image Queue append mutations
  const handleAddToGallery = (url: string) => {
    if (url && !galleryImages.includes(url)) {
      setGalleryImages([...galleryImages, url]);
    }
  };

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return toast.error("Project title is required");

    setLoading(true);

    const { error } = await supabase
      .from("projects")
      .update({
        title,
        subtitle,
        description,
        image,
        project_type: projectType,
        role,
        live_url: liveUrl,
        github_url: projectType === "development" ? githubUrl : null,
        tags,
        colors: projectType === "design" ? colors : null,
        gallery_images: galleryImages, // Save mutated array state directly back to cell
      })
      .eq("id", project.id);

    setLoading(false);

    if (error) {
      console.error(error);
      toast.error("Update payload operational failure.");
      return;
    }

    toast.success("Case study updated successfully!");
    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <div className="space-y-6 text-white max-w-4xl">
      {/* Structural Context Back To Management Portal */}
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition mb-2">
        <ArrowLeft size={16} /> Back to dashboard list
      </Link>

      <form
        onSubmit={handleUpdate}
        className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 md:p-8 space-y-6 backdrop-blur-xl"
      >
        {/* 1. PROJECT STRATEGY DYNAMICS TOGGLE */}
        <div>
          <label className="block mb-2.5 text-sm font-medium text-gray-400">Project Strategy Mode</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setProjectType("development")}
              className={`p-4 rounded-xl font-medium border flex items-center justify-center gap-2 transition ${
                projectType === "development"
                  ? "bg-purple-600/20 border-purple-500 text-purple-300"
                  : "bg-black/20 border-white/5 text-gray-400 hover:border-white/10"
              }`}
            >
              <Code2 size={16} /> Web Development
            </button>
            <button
              type="button"
              onClick={() => setProjectType("design")}
              className={`p-4 rounded-xl font-medium border flex items-center justify-center gap-2 transition ${
                projectType === "design"
                  ? "bg-pink-600/20 border-pink-500 text-pink-300"
                  : "bg-black/20 border-white/5 text-gray-400 hover:border-white/10"
              }`}
            >
              <Paintbrush size={16} /> Design & Branding
            </button>
          </div>
        </div>

        {/* 2. CORE FIELDS STRUCTURAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-400">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black/20 border border-white/10 focus:border-purple-500/50 transition rounded-xl px-4 py-3 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-400">Subtitle / Hook</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-black/20 border border-white/10 focus:border-purple-500/50 transition rounded-xl px-4 py-3 outline-none text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-400">Explicit Role / Scope Allocation</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-black/20 border border-white/10 focus:border-purple-500/50 transition rounded-xl px-4 py-3 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              {projectType === "design" ? "Brand Case Study Link (Behance)" : "Live Application URL Link"}
            </label>
            <input
              type="text"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="w-full bg-black/20 border border-white/10 focus:border-purple-500/50 transition rounded-xl px-4 py-3 outline-none text-sm"
            />
          </div>
        </div>

        {/* DEV SPECIFIC: Codebase Routing endpoint */}
        {projectType === "development" && (
          <div>
            <label className="block mb-2 text-sm text-gray-400">Source Repository URL (GitHub)</label>
            <input
              type="text"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full bg-black/20 border border-white/10 focus:border-purple-500/50 transition rounded-xl px-4 py-3 outline-none text-sm"
            />
          </div>
        )}

        {/* 3. DYNAMIC ARRAYS CONTROLLER MODIFIER */}
        <div>
          <label className="block mb-2 text-sm text-gray-400">
            {projectType === "design" ? "Deliverables & Production Assets" : "Stack / Framework Tags"}
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              placeholder="Type target value and click Add or press Enter"
              className="flex-1 bg-black/20 border border-white/10 focus:border-purple-500/50 transition rounded-xl px-4 py-3 outline-none text-sm"
            />
            <button type="button" onClick={addTag} className="bg-white/10 hover:bg-white/20 transition px-4 rounded-xl text-xs font-semibold">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10">
                {t}
                <X size={12} className="text-gray-400 cursor-pointer hover:text-white" onClick={() => setTags(tags.filter((_, i) => i !== idx))} />
              </span>
            ))}
          </div>
        </div>

        {/* BRANDING SPECIFIC: Dynamic Color Swatch Aggregations */}
        {projectType === "design" && (
          <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
            <label className="block mb-2 text-sm text-gray-400 font-medium">Brand Identity Palette Hex Codes</label>
            <div className="flex items-center gap-3 mb-4">
              <input type="color" value={colorInput} onChange={(e) => setColorInput(e.target.value)} className="w-10 h-10 rounded-xl bg-transparent border border-white/10 cursor-pointer" />
              <input type="text" value={colorInput} onChange={(e) => setColorInput(e.target.value)} className="bg-black/20 border border-white/10 focus:border-purple-500/50 transition rounded-xl px-3 py-2 text-xs font-mono w-28 uppercase outline-none" />
              <button type="button" onClick={addColor} className="bg-purple-600/40 border border-purple-500/30 hover:bg-purple-600 transition px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1"><Plus size={12} /> Add Color</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {colors.map((c, idx) => (
                <div key={idx} className="flex items-center gap-1 bg-black/30 border border-white/5 pr-2 pl-1 py-1 rounded-full text-[10px] font-mono">
                  <div className="w-5 h-5 rounded-full border border-white/10" style={{ backgroundColor: c }} />
                  <span>{c.toUpperCase()}</span>
                  <X size={10} className="text-gray-400 cursor-pointer hover:text-white ml-1" onClick={() => setColors(colors.filter((_, i) => i !== idx))} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. CORE STORY TEXT BLOCK EDITOR */}
        <div>
          <label className="block mb-2 text-sm text-gray-400">The Story Case Study Narrative (Deep Form Block)</label>
          <textarea
            rows={7}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#030712] border border-white/10 focus:border-purple-500/50 transition rounded-xl px-4 py-3 outline-none text-sm leading-relaxed"
          />
        </div>

        {/* 5. SEPARATED MEDIA MATRIX RE-CONFIGURATION BLOCK */}
        <div className="border-t border-white/5 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Cover Media Asset Modification Frame */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-purple-400 flex items-center gap-1">
              <ImageIcon size={14} /> 1. Primary Cover Image
            </label>
            {image && (
              <div className="relative h-40 rounded-xl overflow-hidden border border-white/10 bg-black/40">
                <Image src={image} alt="Current Cover Asset" fill className="object-cover" />
              </div>
            )}
            <UploadImage onUpload={setImage} />
          </div>

          {/* Dynamic Storytelling Media Multi-Image Row Mutation Queue */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-purple-400 flex items-center gap-1">
              <ImageIcon size={14} /> 2. Supporting Media Gallery (Multi-Image Narrative)
            </label>
            <UploadImage onUpload={handleAddToGallery} />
            
            {/* Visual breakdown representation array grid list elements */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {galleryImages.map((imgUrl, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group bg-black/40">
                  <img src={imgUrl} className="w-full h-full object-cover" alt={`Gallery mutation instance key: ${idx}`} />
                  <button
                    type="button"
                    onClick={() => setGalleryImages(galleryImages.filter((_, i) => i !== idx))}
                    className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SYSTEM FINAL FOOTER SUBMIT ACTION PANEL */}
        <div className="pt-4 border-t border-white/5 flex justify-end">
          <button
            disabled={loading}
            className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white transition px-8 py-4 rounded-xl font-semibold shadow-lg shadow-purple-600/10 text-sm"
          >
            {loading ? "Saving System Updates..." : "Apply Adaptive Changes"}
          </button>
        </div>

      </form>
    </div>
  );
}
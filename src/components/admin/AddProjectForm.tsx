"use client";
import UploadImage from "./UploadImage";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { X, Plus, Image as ImageIcon, Paintbrush, Code2 } from "lucide-react";

export default function AddProjectForm() {
  // Existing Base Fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); // Main Hero Image

  // NEW: Adaptive Strategy Fields
  const [projectType, setProjectType] = useState<"development" | "design">("development");
  const [subtitle, setSubtitle] = useState("");
  const [role, setRole] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  
  // NEW: Array States (Tags, Brand Colors, Multi-Image Gallery)
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  
  const [colorInput, setColorInput] = useState("#7c3aed");
  const [colors, setColors] = useState<string[]>([]);
  
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  // Helper logic to add/remove tags array
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // Helper logic to add/remove brand colors
  const addColor = () => {
    if (colorInput && !colors.includes(colorInput)) {
      setColors([...colors, colorInput]);
    }
  };

  // Helper logic to add an uploaded image to the narrative gallery array
  const handleAddToGallery = (url: string) => {
    if (url && !galleryImages.includes(url)) {
      setGalleryImages([...galleryImages, url]);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return toast.error("Project title is required");

    setLoading(true);

    const { error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          subtitle,
          description,
          image, // Hero
          project_type: projectType,
          role,
          live_url: liveUrl,
          github_url: projectType === "development" ? githubUrl : null,
          tags,
          colors: projectType === "design" ? colors : null,
          gallery_images: galleryImages, // The multi-image story block
        },
      ]);

    if (error) {
      console.error(error);
      toast.error("Something went wrong saving payload context.");
    } else {
      toast.success("Adaptive project registered successfully!");
      
      // Reset Form States completely
      setTitle("");
      setSubtitle("");
      setDescription("");
      setImage("");
      setRole("");
      setLiveUrl("");
      setGithubUrl("");
      setTags([]);
      setColors([]);
      setGalleryImages([]);
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 md:p-8 space-y-6 backdrop-blur-xl text-white"
    >
      {/* 1. PROJECT TYPE SELECTOR TOGGLE BUTTONS */}
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

      {/* 2. CORE SYSTEM IDENTITY FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm text-gray-300">Project Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Homely Platform"
            className="w-full bg-black/20 border border-white/10 focus:border-purple-500/50 transition rounded-xl px-4 py-3 outline-none text-sm"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-300">Subtitle / Catchy Hook</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="e.g., Minimalist Real Estate Identity System"
            className="w-full bg-black/20 border border-white/10 focus:border-purple-500/50 transition rounded-xl px-4 py-3 outline-none text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm text-gray-300">Your Explicit Role / Scope</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder={projectType === "design" ? "e.g., Lead Brand Strategist" : "e.g., Full Stack Engineer"}
            className="w-full bg-black/20 border border-white/10 focus:border-purple-500/50 transition rounded-xl px-4 py-3 outline-none text-sm"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-300">
            {projectType === "design" ? "Brand Case Study Link (Behance/PDF)" : "Live App URL Link"}
          </label>
          <input
            type="text"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="https://..."
            className="w-full bg-black/20 border border-white/10 focus:border-purple-500/50 transition rounded-xl px-4 py-3 outline-none text-sm"
          />
        </div>
      </div>

      {/* DEV SPECIFIC: GitHub Endpoint Link */}
      {projectType === "development" && (
        <div>
          <label className="block mb-2 text-sm text-gray-300">Source Repository URL (GitHub)</label>
          <input
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/..."
            className="w-full bg-black/20 border border-white/10 focus:border-purple-500/50 transition rounded-xl px-4 py-3 outline-none text-sm"
          />
        </div>
      )}

      {/* 3. DYNAMIC METADATA ARRAYS (TAGS INPUT) */}
      <div>
        <label className="block mb-2 text-sm text-gray-300">
          {projectType === "design" ? "Deliverables & Asset Scope Tags" : "Stack / Framework Tags"}
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            placeholder={projectType === "design" ? "Press Enter for tags like: '3D Billboard', 'Logo Design'" : "Press Enter for tags like: 'Next.js', 'Supabase'"}
            className="flex-1 bg-black/20 border border-white/10 focus:border-purple-500/50 transition rounded-xl px-4 py-3 outline-none text-sm"
          />
          <button type="button" onClick={addTag} className="bg-white/10 hover:bg-white/20 transition px-4 rounded-xl text-xs font-semibold">
            Add
          </button>
        </div>
        {/* Render Badges array list preview */}
        <div className="flex flex-wrap gap-2">
          {tags.map((t, idx) => (
            <span key={idx} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10">
              {t}
              <X size={12} className="text-gray-400 cursor-pointer hover:text-white" onClick={() => setTags(tags.filter((_, i) => i !== idx))} />
            </span>
          ))}
        </div>
      </div>

      {/* BRANDING SPECIFIC: Real-time Color Palette Matrix picker */}
      {projectType === "design" && (
        <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
          <label className="block mb-2 text-sm text-gray-300 font-medium">Brand Identity Palette Hex Codes</label>
          <div className="flex items-center gap-3 mb-4">
            <input
              type="color"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              className="w-10 h-10 rounded-xl bg-transparent border border-white/10 cursor-pointer"
            />
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              placeholder="#FFFFFF"
              className="bg-black/20 border border-white/10 focus:border-purple-500/50 transition rounded-xl px-3 py-2 text-xs font-mono w-28 uppercase outline-none"
            />
            <button type="button" onClick={addColor} className="bg-purple-600/40 border border-purple-500/30 hover:bg-purple-600 transition px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1">
              <Plus size={12} /> Add Color
            </button>
          </div>
          {/* Colors display grid preview item layout */}
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

      {/* 4. PRIMARY CORE NARRATIVE (DESCRIPTION EDITOR) */}
      <div>
        <label className="block mb-2 text-sm text-gray-300">The Story Case Study (Deep Process Detail)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Break down your design narrative. What was the core conceptual goal? What technical constraints did you break through?"
          rows={7}
          className="w-full bg-[#030712] border border-white/10 focus:border-purple-500/50 transition rounded-xl px-4 py-3 outline-none text-sm leading-relaxed"
        />
      </div>

      {/* 5. MEDIA ARCHITECTURE UPLOADS (HERO VS MULTI-IMAGE GALLERY) */}
      <div className="border-t border-white/5 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Module: Hero Feature Cover Image */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-purple-400 flex items-center gap-1">
            <ImageIcon size={14} /> 1. Hero Cover Image
          </label>
          <p className="text-[11px] text-gray-400">This acts as the primary image on card thumbnails and the main header banner asset.</p>
          <UploadImage onUpload={setImage} />
          {image && (
            <div className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 p-2.5 rounded-xl truncate">
              ✓ Main Cover Asset Configured!
            </div>
          )}
        </div>

        {/* Right Module: Narrative Story Supporting Media Gallery array block */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-purple-400 flex items-center gap-1">
            <ImageIcon size={14} /> 2. Supporting Media Gallery (Storytellers)
          </label>
          <p className="text-[11px] text-gray-400">Upload multiple items sequentially (mockups, logo variants, or inner system screen layouts).</p>
          <UploadImage onUpload={handleAddToGallery} />
          
          {/* Thumbnail list preview queue */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {galleryImages.map((imgUrl, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group bg-black/40">
                <img src={imgUrl} className="w-full h-full object-cover" alt="Gallery item" />
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

      {/* SUBMISSION FOOTER ACTION PANEL */}
      <div className="pt-4 border-t border-white/5 flex justify-end">
        <button
          type="submit"
          disabled={loading || !image}
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white transition px-8 py-4 rounded-xl font-semibold shadow-lg shadow-purple-600/10 text-sm"
        >
          {loading ? "Adding Dynamic Project..." : "Publish Dynamic Case Study"}
        </button>
      </div>

    </form>
  );
}
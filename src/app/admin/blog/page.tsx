"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

interface Blog {
  id: string;
  title: string;
  slug: string;
  is_published: boolean;
  created_at: string;
}

export default function AdminBlogManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [coverImage, setCoverImage] = useState(""); // Stores public image URL

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    const { data } = await supabase
      .from("blogs")
      .select("id, title, slug, is_published, created_at")
      .order("created_at", { ascending: false });
    if (data) setBlogs(data);
    setLoading(false);
  }

  // Handle image upload to Supabase Storage Bucket
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      setUploading(true);
      
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      // Generate unique clean file path name
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file directly to Supabase Storage 'blog-images' bucket
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the absolute public URL string for your newly uploaded image
      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setCoverImage(data.publicUrl);
    } catch (error: any) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return alert("Title is required");

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const { error } = await supabase.from("blogs").insert([
      {
        title,
        slug,
        description,
        content,
        cover_image: coverImage, // Pass the storage public URL string
        is_published: isPublished,
      },
    ]);

    if (error) {
      alert("Error creating blog post: " + error.message);
    } else {
      setTitle("");
      setDescription("");
      setContent("");
      setCoverImage("");
      setIsPublished(false);
      fetchBlogs();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this article?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (!error) fetchBlogs();
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Blog Management</h1>
        <p className="text-gray-400 text-sm mt-1">Compose, publish, and upload assets across your portfolio.</p>
      </div>

      <GlassCard>
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold">Write a New Post</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">Article Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Optimizing Next.js Images"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Custom File Upload Block */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">Cover Image</label>
              <div className="flex items-center gap-4">
                <label className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/10 transition cursor-pointer select-none">
                  {uploading ? "Uploading Image..." : "Choose Image File"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                {coverImage && (
                  <span className="text-xs text-emerald-400 truncate max-w-[250px] font-mono">
                    ✓ Image ready!
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">Brief Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short summaries displayed on card previews..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">Body Content</label>
              <textarea
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your main article content here using markdown..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition resize-y font-mono text-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="publish"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 rounded bg-white/5 border-white/10 text-purple-600 focus:ring-0"
              />
              <label htmlFor="publish" className="text-sm text-gray-300 cursor-pointer select-none">
                Publish immediately (Visible to the public)
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={uploading}>
              {uploading ? "Processing assets..." : "Create Post"}
            </Button>
          </div>
        </form>
      </GlassCard>

      {/* Existing Articles Dashboard View */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">All Articles</h2>
        {loading ? (
          <p className="text-gray-500 text-sm">Loading articles dashboard...</p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500 text-sm">No articles created yet.</p>
        ) : (
          <div className="space-y-3">
            {blogs.map((blog) => (
              <GlassCard key={blog.id}>
                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-white text-base">{blog.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Slug: /blog/{blog.slug}</p>
                  </div>
                  <div className="flex items-center gap-4 justify-between sm:justify-end">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      blog.is_published 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}>
                      {blog.is_published ? "Published" : "Draft"}
                    </span>
                    <button 
                      onClick={() => handleDelete(blog.id)}
                      className="text-sm font-medium text-red-400 hover:text-red-300 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
"use client";
import UploadImage from "./UploadImage";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AddProjectForm() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); 

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          description,
           image,
        },
      ]);

    if (error) {
      console.log(error);
      toast.error("Something went wrong");
    } else {
      toast.success("Project added");

      setTitle("");
      setDescription("");
      setImage("");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
     className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 space-y-6 backdrop-blur-xl"
    >
      
      <div>
        <label className="block mb-2 text-sm text-gray-300">
          Project Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter project title"
          className="w-full bg-black/20 border border-white/10 focus:border-purple-500/50 transition rounded-2xl px-5 py-4 outline-none resize-none"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm text-gray-300">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter project description"
          rows={5}
          className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 outline-none resize-none"
        />
      </div>
      <UploadImage onUpload={setImage} />
      <button
        type="submit"
        disabled={loading}
        className="bg-white text-black hover:bg-gray-200 transition px-6 py-4 rounded-2xl font-medium"
      >
        {loading ? "Adding..." : "Add Project"}
      </button>

    </form>
  );
}
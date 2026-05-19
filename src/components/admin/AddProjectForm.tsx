"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddProjectForm() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
        },
      ]);

    if (error) {
      console.log(error);
      alert("Something went wrong");
    } else {
      alert("Project added successfully");

      setTitle("");
      setDescription("");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-5"
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
          className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 outline-none"
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

      <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 transition px-5 py-3 rounded-xl"
      >
        {loading ? "Adding..." : "Add Project"}
      </button>

    </form>
  );
}
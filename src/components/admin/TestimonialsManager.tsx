"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Plus, Trash2, User, Briefcase, MessageSquare, Sparkles, X } from "lucide-react";
import toast from "react-hot-toast";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  message: string;
  created_at: string;
}

interface Props {
  initialTestimonials: Testimonial[];
}

export default function TestimonialsManager({ initialTestimonials }: Props) {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  async function handleAddTestimonial(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      role,
      company: company.trim() || null,
      message,
    };

    const { data, error } = await supabase
      .from("testimonials")
      .insert([payload])
      .select()
      .single();

    setLoading(false);

    if (error) {
      toast.error("Failed to add testimonial: " + error.message);
      return;
    }

    toast.success("New testimonial added successfully!");
    setTestimonials([data, ...testimonials]);
    
    // Reset Form fields
    setName("");
    setRole("");
    setCompany("");
    setMessage("");
    setShowForm(false);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    setDeletingId(id);
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    setDeletingId(null);

    if (error) {
      toast.error("Failed to delete testimonial: " + error.message);
      return;
    }

    toast.success("Testimonial removed.");
    setTestimonials(testimonials.filter((t) => t.id !== id));
    router.refresh();
  }

  return (
    <div className="space-y-8">
      
      {/* Dynamic Form Control Toggle Action Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-3 rounded-xl flex items-center gap-2 transition duration-200 cursor-pointer shadow-lg shadow-purple-600/10"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Cancel Entry" : "Add New Testimonial"}
        </button>
      </div>

      {/* Input Modal Form Section */}
      {showForm && (
        <form 
          onSubmit={handleAddTestimonial}
          className="bg-white/[0.02] border border-white/10 rounded-[32px] p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex items-center gap-2 text-white font-semibold text-lg border-b border-white/5 pb-3">
            <Sparkles size={18} className="text-purple-400" />
            Client Review Metrics
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-medium">Client Name</label>
              <div className="flex items-center gap-2 bg-black/20 border border-white/10 rounded-xl px-4 py-3">
                <User size={16} className="text-gray-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Chidera Caleb"
                  className="w-full bg-transparent outline-none text-sm text-gray-200 placeholder-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2 font-medium">Client Role/Position</label>
              <div className="flex items-center gap-2 bg-black/20 border border-white/10 rounded-xl px-4 py-3">
                <Briefcase size={16} className="text-gray-500" />
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Product Manager"
                  className="w-full bg-transparent outline-none text-sm text-gray-200 placeholder-gray-600"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2 font-medium">Company (Optional)</label>
            <div className="flex items-center gap-2 bg-black/20 border border-white/10 rounded-xl px-4 py-3">
              <span className="text-gray-500 font-bold text-sm">@</span>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Homely Tech"
                className="w-full bg-transparent outline-none text-sm text-gray-200 placeholder-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2 font-medium">Review Message</label>
            <div className="flex items-start gap-2 bg-black/20 border border-white/10 rounded-xl px-4 py-3">
              <MessageSquare size={16} className="text-gray-500 mt-1" />
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Paste the statement or feedback detail regarding project delivery impact..."
                className="w-full bg-transparent outline-none text-sm text-gray-200 placeholder-gray-600 resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-4 rounded-xl transition duration-200 cursor-pointer shadow-lg shadow-purple-600/10"
          >
            {loading ? "Adding Record..." : "Publish Testimonial"}
          </button>
        </form>
      )}

      {/* Grid List View Display Area */}
      {testimonials.length === 0 ? (
        <div className="text-center py-20 border border-white/5 bg-white/[0.01] rounded-[32px]">
          <p className="text-gray-500 font-medium">No testimonials found on the dashboard.</p>
          <p className="text-gray-600 text-sm mt-1">Click the button above to add your first dynamic client reference!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative flex flex-col justify-between group hover:border-purple-500/20 transition-all duration-200"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-white text-lg tracking-tight">{item.name}</h4>
                    <p className="text-gray-400 text-xs font-medium mt-0.5">
                      {item.role} {item.company && <span className="text-purple-400">@ {item.company}</span>}
                    </p>
                  </div>

                  <button
                    disabled={deletingId === item.id}
                    onClick={() => handleDelete(item.id)}
                    className="text-gray-500 hover:text-red-400 p-2 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200 disabled:opacity-40 shrink-0"
                    title="Delete review"
                  >
                    <Trash2 size={16} className={deletingId === item.id ? "animate-pulse" : ""} />
                  </button>
                </div>

                <p className="text-gray-300 text-sm italic leading-relaxed bg-black/10 p-4 border border-white/5 rounded-xl">
                  &ldquo;{item.message}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
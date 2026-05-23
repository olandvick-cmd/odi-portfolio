import { supabase } from "@/lib/supabase";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  // Fetch testimonials ordered from newest to oldest
  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-8 text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl">
        Failed to load testimonials: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 md:p-10 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Testimonials Management</h1>
        <p className="text-gray-400 text-sm mt-1">
          Add, monitor, or remove client reviews displayed on your main landing page.
        </p>
      </div>

      <TestimonialsManager initialTestimonials={testimonials || []} />
    </div>
  );
}
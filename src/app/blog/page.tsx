import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import GlassCard from "@/components/ui/GlassCard";

export const revalidate = 0; // Fetch fresh data on every request

export default async function BlogPage() {
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <main className="relative min-h-screen bg-[#050816] text-white py-20">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <header className="mb-16 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            My <span className="text-purple-500">Articles</span> & Insights
          </h1>
          <p className="text-gray-400 text-lg">
            Thoughts on frontend architecture, digital branding, design systems, and product development.
          </p>
        </header>

        {/* Blog Grid */}
        {!blogs || blogs.length === 0 ? (
          <p className="text-gray-500 text-lg">No articles published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="group block">
                <GlassCard>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[29px] bg-white/[0.02]">
                    {post.cover_image ? (
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        No Cover Image
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <h2 className="text-xl font-bold text-white mt-2 mb-3 line-clamp-2 group-hover:text-purple-400 transition">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { marked } from "marked";

interface Props {
  params: {
    slug: string;
  };
}

// Ensure Next.js fetches fresh data for new posts
export const revalidate = 0;

export default async function BlogPostPage({ params }: Props) {
  // Await params if using Next.js 14/15 configurations
  const { slug } = await params;

  // Fetch the article based on its unique slug
  const { data: post } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  // If no post matches, render the Next.js 404 page
  if (!post) {
    notFound();
  }

  // Parse markdown text to HTML string safely
  const formattedContent = await marked.parse(post.content || "");

  return (
    <main className="relative min-h-screen bg-[#050816] text-white py-20">
      {/* Soft Decorative Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Back Navigation Button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition mb-12 group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> Back to articles
        </Link>

        {/* Article Metadata Header */}
        <header className="mb-12">
          <span className="text-sm text-purple-400 font-semibold tracking-wider uppercase">
            {new Date(post.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-3 mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl border-l-2 border-purple-500 pl-4 italic">
            {post.description}
          </p>
        </header>

        {/* Feature/Cover Image */}
        {post.cover_image && (
          <div className="relative aspect-[16/9] w-full rounded-[24px] overflow-hidden border border-white/10 bg-white/[0.02] mb-12">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Main Article Render Body */}
        {/* We use global css selectors via our layout to handle formatting easily */}
        <article 
          className="blog-content prose-invert text-gray-300 leading-relaxed text-base md:text-lg space-y-6"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />

      </div>
    </main>
  );
}
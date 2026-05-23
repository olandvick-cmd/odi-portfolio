import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Stats from "@/components/stats/Stats";
import Projects from "@/components/projects/Projects";
import Testimonials from "@/components/testimonials/Testimonials";
import Footer from "@/components/footer/Footer";
import Contact from "@/components/contact/Contact";

import { supabase } from "@/lib/supabase";

// Force Next.js to always fetch real-time updates when data changes in the admin dashboard
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  /* 1. Fetch Profile Settings (For Admin-Controlled DP and Resume Link) */
  const { data: profileData } = await supabase
    .from("profile_settings")
    .select("*")
    .single(); // Pulls your individual configuration record

  /* 2. Fetch Projects Data */
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  /* 3. Fetch Testimonials Data */
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  // Fallback links in case they are not configured in your dashboard database table yet
  const avatarUrl = profileData?.avatar_url || "";
  const resumeUrl = profileData?.resume_url || "#";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white scroll-smooth">
      
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/20 blur-[180px] rounded-full pointer-events-none"></div>

      {/* Global Interface Layout wrapper */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          
          {/* Header navigation controls */}
          <Navbar />

          {/* Hero Landing Header - We pass your profile configurations directly down here */}
          <Hero avatarUrl={avatarUrl} resumeUrl={resumeUrl} />

          {/* Core Metrics Track section */}
          <Stats />

          {/* Target Sections for smooth-scroll anchor mapping */}
          <section id="projects" className="scroll-mt-24">
            <Projects projects={projects || []} />
          </section>

          <section id="testimonials" className="scroll-mt-24">
            <Testimonials testimonials={testimonials || []} />
          </section>

          <section id="contact" className="scroll-mt-24">
            <Contact />
          </section>

          <Footer />

        </div>
      </div>
    </main>
  );
}
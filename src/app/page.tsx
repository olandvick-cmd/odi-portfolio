import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Stats from "@/components/stats/Stats";
import Projects from "@/components/projects/Projects";
import Testimonials from "@/components/testimonials/Testimonials";
import Footer from "@/components/footer/Footer";

import { supabase } from "@/lib/supabase";

export default async function HomePage() {

  /* Fetch Projects */
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  /* Fetch Testimonials */
  const { data: testimonials } =
    await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/20 blur-[180px] rounded-full"></div>

      {/* Content */}
      <div className="relative z-10">

        {/* Global Container */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <Navbar />

          <Hero />

          <Stats />

          <Projects
            projects={projects || []}
          />

          <Testimonials
            testimonials={
              testimonials || []
            }
          />

          <Footer />

        </div>

      </div>

    </main>
  );
}
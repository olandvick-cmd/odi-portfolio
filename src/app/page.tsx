import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <Navbar />
      <Hero />
      <Projects />
    </main>
  );
}

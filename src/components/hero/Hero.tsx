"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between gap-16 overflow-hidden">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1"
      >
        
        <div className="mb-6">
          <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-4 py-2 rounded-full text-sm">
            Available for projects
          </span>
        </div>

        <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
          Building{" "}
          <span className="text-purple-500">
            digital experiences
          </span>{" "}
          that feel premium.
        </h1>

        <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-10">
          Product designer, frontend developer and creative thinker
          focused on building modern brands, platforms and user experiences.
        </p>

        <div className="flex items-center gap-4 flex-wrap">
          
          <button className="bg-purple-600 hover:bg-purple-700 transition px-6 py-4 rounded-2xl flex items-center gap-2 font-medium">
            View Projects
            <ArrowRight size={18} />
          </button>

          <button className="border border-white/10 hover:border-white/20 transition px-6 py-4 rounded-2xl">
            Download CV
          </button>

        </div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex justify-center"
      >
        
        <div className="relative w-[320px] h-[420px] rounded-[40px] bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-900 p-[1px]">
          
          <div className="w-full h-full rounded-[40px] bg-[#0f172a] flex items-center justify-center overflow-hidden">
            
            <h2 className="text-2xl text-gray-500">
              Portfolio Preview
            </h2>

          </div>

          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/30 blur-3xl rounded-full"></div>

          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/30 blur-3xl rounded-full"></div>

        </div>

      </motion.div>

    </section>
  );
}
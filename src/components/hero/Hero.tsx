"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import {
  ArrowRight,
  Download,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center py-24 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/20 blur-[180px] rounded-full"></div>

      <div className="relative z-10 w-full">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="max-w-2xl"
          >

            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-sm mb-8 backdrop-blur-xl">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

              Available for freelance

            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.02] tracking-[-0.04em] mb-8">

              Hi, I’m{" "}

              <span className="text-purple-500">
                Odi
              </span>

              <br />

              I build digital
              products & brands
              that create impact.

            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl mb-10">

              Frontend developer and digital creative focused on building premium user experiences, scalable platforms and modern digital brands.

            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-5 mb-14">

              <Link
                href="#projects"
                className="group bg-purple-600 hover:bg-purple-700 transition px-8 py-4 rounded-2xl font-medium flex items-center gap-3"
              >

                View My Work

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />

              </Link>

              <button className="border border-white/10 hover:border-purple-500/30 hover:bg-white/[0.03] transition px-8 py-4 rounded-2xl flex items-center gap-3">

                <Download size={18} />

                Download Resume

              </button>

            </div>

            {/* Brands */}
            <div>

              <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-6">
                Trusted by / Worked with
              </p>

              <div className="flex flex-wrap items-center gap-8 text-gray-300">

                <span className="font-semibold hover:text-white transition">
                  Homely
                </span>

                <span className="font-semibold hover:text-white transition">
                  Vetex
                </span>

                <span className="font-semibold hover:text-white transition">
                  VTU
                </span>

                <span className="font-semibold hover:text-white transition">
                  Telecom Hub
                </span>

              </div>

            </div>

          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative flex justify-center lg:justify-end"
          >

            {/* Glow */}
            <div className="absolute w-[450px] h-[450px] bg-purple-600/30 blur-[120px] rounded-full"></div>

            {/* Image Card */}
            <div className="relative w-[320px] h-[420px] md:w-[400px] md:h-[520px] rounded-[40px] overflow-hidden border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] backdrop-blur-xl shadow-2xl">

              <Image
                src="/images/profile.png"
                alt="Odi"
                fill
                priority
                className="object-cover"
              />

            </div>

            {/* Floating Experience Card */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute bottom-8 -left-5 md:-left-10 bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-3xl px-7 py-5 shadow-2xl"
            >

              <h3 className="text-4xl font-bold text-purple-400 mb-1">
                3+
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                Years of
                <br />
                Experience
              </p>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}
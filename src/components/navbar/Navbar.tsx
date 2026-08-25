"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "../ui/Container";
import { Menu, X } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  // Strictly typed Framer Motion Variants
  const heartbeatVariants: Variants = {
    animate: {
      scale: [1, 1.08, 1, 1.05, 1],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        repeatDelay: 1.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#050816]/80 backdrop-blur-xl">
      <Container>
        <nav className="h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="group" onClick={closeMenu}>
            <h1 className="text-3xl font-bold tracking-tight text-white select-none">
              Odi<span className="text-purple-500 group-hover:translate-x-1 inline-block transition-transform duration-200">.</span>
            </h1>
          </Link>

          {/* Desktop Navigation Menu */}
          <ul className="hidden lg:flex items-center gap-10 text-sm font-medium text-gray-400">
            <li>
              <Link href="/" className="hover:text-white transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="hover:text-white transition-colors duration-200">
                About
              </Link>
            </li>
            <li>
              <Link href="#projects" className="hover:text-white transition-colors duration-200">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors duration-200">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-white transition-colors duration-200">
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile Center CTA with Heartbeat */}
          <div className="lg:hidden">
            <motion.a 
              href="https://wa.me/2349045003152?text=Hello%20Odi,%20I%27d%20like%20to%20discuss%20a%20project!" 
              target="_blank"
              rel="noopener noreferrer"
              variants={heartbeatVariants}
              animate="animate"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-medium shadow-lg shadow-purple-600/20"
            >
              Let&apos;s Talk
            </motion.a>
          </div>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <motion.a 
              href="https://wa.me/2349045003152?text=Hello%20Odi,%20I%27d%20like%20to%20discuss%20a%20Project!" 
              target="_blank"
              rel="noopener noreferrer"
              variants={heartbeatVariants}
              animate="animate"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:inline-block bg-purple-600 hover:bg-purple-700 text-white text-sm px-6 py-3 rounded-2xl font-medium shadow-lg shadow-purple-600/20"
            >
              Let&apos;s Talk
            </motion.a>

            {/* Mobile Toggle Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </nav>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/5 py-6 animate-in slide-in-from-top-2 duration-200">
            <ul className="flex flex-col gap-4 text-base font-medium text-gray-300 px-2">
              <li>
                <Link href="/" onClick={closeMenu} className="block hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#testimonials" onClick={closeMenu} className="block hover:text-purple-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" onClick={closeMenu} className="block hover:text-purple-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" onClick={closeMenu} className="block hover:text-purple-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#contact" onClick={closeMenu} className="block hover:text-purple-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}
import Container from "../ui/Container";
import Link from "next/link";

export default function Footer() {
  // Automatically stays up to date with the current system year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 mt-28">
      <Container>
        <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Brand Metadata */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold tracking-tight text-white select-none">
                Odi<span className="text-purple-500">.</span>
              </h2>
            </Link>
            <p className="text-gray-400 text-sm mt-2 max-w-xs leading-relaxed">
              Building premium digital experiences and scalable digital brands.
            </p>
            <p className="text-gray-600 text-xs mt-4">
              &copy; {currentYear} Odi. All rights reserved.
            </p>
          </div>

          {/* Right Social Navigation Grid */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-sm font-medium text-gray-400">
            <a
              href="https://x.com" // Update with your custom Twitter handle profile link
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-200"
            >
              Twitter
            </a>

            <a
              href="https://linkedin.com" // Update with your custom LinkedIn profile link
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-200"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com" // Update with your custom GitHub developer repository profile link
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-200"
            >
              GitHub
            </a>
          </div>

        </div>
      </Container>
    </footer>
  );
}
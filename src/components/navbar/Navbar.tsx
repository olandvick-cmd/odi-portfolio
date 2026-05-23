import Link from "next/link";
import Container from "../ui/Container";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#050816]/80 backdrop-blur-xl">
      <Container>
        <nav className="h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="group">
            <h1 className="text-3xl font-bold tracking-tight text-white select-none">
              Odi<span className="text-purple-500 group-hover:translate-x-1 inline-block transition-transform duration-200">.</span>
            </h1>
          </Link>

          {/* Navigation Menu */}
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
              {/* Links dynamically over to your production blog ecosystem route */}
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

          {/* CTA - Drops down cleanly to your custom Contact form */}
          <Link 
            href="#contact" 
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-6 py-3 rounded-2xl font-medium transition-all duration-200 shadow-lg shadow-purple-600/10 hover:shadow-purple-600/20"
          >
            Let&apos;s Talk
          </Link>

        </nav>
      </Container>
    </header>
  );
}
import Container from "../ui/Container";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#050816]/80 backdrop-blur-xl">
      
      <Container>

        <nav className="h-20 flex items-center justify-between">

          {/* Logo */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Odi<span className="text-purple-500">.</span>
            </h1>
          </div>

          {/* Nav */}
          <ul className="hidden lg:flex items-center gap-10 text-sm text-gray-400">

            <li className="hover:text-white transition cursor-pointer">
              Home
            </li>

            <li className="hover:text-white transition cursor-pointer">
              About
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Projects
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Blog
            </li>

            <li className="hover:text-white transition cursor-pointer">
              Contact
            </li>

          </ul>

          {/* CTA */}
          <button className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-2xl font-medium">
            Let&apos;s Talk
          </button>

        </nav>

      </Container>

    </header>
  );
}
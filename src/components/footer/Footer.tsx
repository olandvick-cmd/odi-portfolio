import Container from "../ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-28">
      
      <Container>

        <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left */}
          <div>
            <h2 className="text-2xl font-bold">
              Odi<span className="text-purple-500">.</span>
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Building premium digital experiences.
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6 text-sm text-gray-400">

            <a
              href="#"
              className="hover:text-white transition"
            >
              Twitter
            </a>

            <a
              href="#"
              className="hover:text-white transition"
            >
              LinkedIn
            </a>

            <a
              href="#"
              className="hover:text-white transition"
            >
              GitHub
            </a>

          </div>

        </div>

      </Container>

    </footer>
  );
}
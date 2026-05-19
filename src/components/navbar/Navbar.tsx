export default function Navbar() {
  return (
    <header className="w-full border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        
        <div>
          <h1 className="text-2xl font-bold">
            Odi<span className="text-purple-500">.</span>
          </h1>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <li className="hover:text-white cursor-pointer transition">
            Home
          </li>

          <li className="hover:text-white cursor-pointer transition">
            About
          </li>

          <li className="hover:text-white cursor-pointer transition">
            Projects
          </li>

          <li className="hover:text-white cursor-pointer transition">
            Contact
          </li>
        </ul>

        <button className="bg-purple-600 hover:bg-purple-700 transition px-5 py-2 rounded-xl text-sm font-medium">
          Let&apos;s Talk
        </button>
      </nav>
    </header>
  );
}
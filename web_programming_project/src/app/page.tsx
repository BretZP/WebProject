import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center bg-black/[.05] dark:bg-white/[.06] rounded-lg px-6 py-4">
        <div className="text-lg font-semibold">
          <a href="/" className="text-foreground no-underline hover:opacity-80 transition-opacity">
            Home
          </a>
        </div>
        
        <ul className="flex list-none gap-6 m-0 p-0">
          <li>
            <a
              href="/sign in / sign up"
              className="text-sm text-foreground no-underline hover:opacity-80 transition-opacity font-[family-name:var(--font-geist-mono)]"
            >
              Sign in / Sign up
            </a>
          </li>
        </ul>

      </nav>
    </div>
  );
}
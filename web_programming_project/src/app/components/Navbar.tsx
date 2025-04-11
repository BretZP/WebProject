'use client';

import React from "react";
import "@/app/globals.css";

const Navbar = () => {
  return (
      <nav className="w-full flex justify-between items-center bg-accent-background rounded-lg px-6 py-4">
        <div className="text-lg font-semibold">
          <a href="/" className="color-text no-underline hover:opacity-80 transition-opacity">
            Home
          </a>
        </div>
        
        <ul className="flex list-none gap-6 m-0 p-0">
          <li>
            <a
              href="/register"
              className="text-sm text-foreground no-underline hover:opacity-80 transition-opacity font-[family-name:var(--font-geist-mono)]"
            >
              Register / Login
          </a>
          </li>
        </ul>

      </nav>
  );
}

export default Navbar;
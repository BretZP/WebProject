'use client';

import React from "react";
import "@/app/globals.css";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { Session } from "next-auth";
import { doLogout } from "../app/actions/index";
import Button from "@/components/Button"

// interface Session {
//   user?: {
//     name: string;
//     email?: string;
//     image?: string;
//   };
// }

interface NavbarProps {
  session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!session?.user);
  }, [session]);

  const handleLogout = () => {
    doLogout();
    setIsLoggedIn(!!session?.user);
    console.log("User logged out");
  }

  return (
    <nav className="w-full flex justify-between items-center bg-accent-background rounded-lg px-6 py-4 fixed z-10">
      {/* left - home button */}
      <div className="text-lg font-semibold">

        <a href="/" className="color-text no-underline hover:opacity-80 transition-opacity">
          <HomeIcon className="h-6 w-6" />


        </a>
      </div>

      {/* middle - logo */}
      <div className="flex-1 flex justify-center relative z-20">
        <a href="/scale-list" className="cursor-pointer inline-block">
          <Image
            src="/scale_explorer2.png"
            alt="Logo"
            width={220}
            height={40}
            className="object-contain"
          />
        </a>
      </div>

      {/* right - auth status */}
      <ul className="flex list-none gap-6 m-0 p-0">
        {isLoggedIn && session?.user ? (
          <>
            <li>
              <span>Welcome, {session.user?.name}!</span>
            </li>
            <li>
              <Button onClick={handleLogout}>Logout</Button>
            </li>
          </>
        ) : (
          <li>
            <a
              href="/login"
              className="text-sm text-foreground no-underline hover:opacity-80 transition-opacity font-[family-name:var(--font-geist-mono)]"
            >
              Login
            </a>
          </li>
        )}
        {/* <li>
          <a
            href="/login"
            className="text-sm text-foreground no-underline hover:opacity-80 transition-opacity font-[family-name:var(--font-geist-mono)]"
            onClick={handleLogin}
          >
            Login
          </a>
        </li> */}
      </ul>

    </nav>
  );
}

export default Navbar;
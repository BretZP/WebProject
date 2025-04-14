'use client';

import React from "react";
import "@/app/globals.css";
import { HomeIcon } from "@heroicons/react/24/solid"; 
import {useState} from 'react';
import Button from "@/app/components/Button";


interface NavbarProps {
  onBooleanChange: (value:boolean)=>void;
}

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(prev => !prev);
    console.log(isLoggedIn);
  }

  return (
      <nav className="w-full flex justify-between items-center bg-accent-background rounded-lg px-6 py-4 fixed z-10">
        <div className="text-lg font-semibold">

          <a href="/" className="color-text no-underline hover:opacity-80 transition-opacity">
          <HomeIcon className="h-6 w-6" />
           

          </a>
        </div>
        
        <ul className="flex list-none gap-6 m-0 p-0">
          <li>
            {/* <a
              href="/register"
              className="text-sm text-foreground no-underline hover:opacity-80 transition-opacity font-[family-name:var(--font-geist-mono)]"
              onClick={handleLogin}
            >
              Register / Login
          </a> */}
              <Button onClick={handleLogin}>{isLoggedIn ? "Login" : "Logout"}</Button>
          </li>
        </ul>

      </nav>
  );
}

export default Navbar;
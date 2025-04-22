// src/app/layout.tsx
'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google"; // Assuming Geist comes from here
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import React from "react";

// Font definitions
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], // <-- ADD THIS LINE
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"], // This one was likely correct already
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"], // This one was likely correct already
});

// Metadata definition ...
// export const metadata: Metadata = { ... };

// RootLayout component ...
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // --- ADD FONT VARIABLES TO HTML TAG ---
    <html className={`min-h-full overflow-hidden ${geistSans.variable} ${geistMono.variable} ${inter.variable}`} lang="en">
    {/* --- END FONT VARIABLES --- */}
      <body>
        <SessionProvider>
          <Navbar session={null} />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
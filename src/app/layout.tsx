
'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import React from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"], 
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"], 
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html className={`min-h-full overflow-hidden ${geistSans.variable} ${geistMono.variable} ${inter.variable}`} lang="en">
    
      <body>
        <SessionProvider>
          <Navbar session={null} />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
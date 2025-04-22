'use client';

import React from "react";
import "@/app/globals.css";
import { HomeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/Button";
import Link from "next/link";

const Navbar = () => {
    const { data: session, status } = useSession();

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <nav className="w-full flex justify-between items-center bg-accent-background rounded-lg px-6 py-4 fixed z-10">
            <div className="text-lg font-semibold">
                <Link href="/" className="color-text no-underline hover:opacity-80 transition-opacity">
                    <HomeIcon className="h-6 w-6" />
                </Link>
            </div>

            <div className="flex-1 flex justify-center relative z-20">
                <Link href="/scale-list" className="cursor-pointer inline-block">
                    <Image
                        src="/scale_explorer2.png"
                        alt="Logo"
                        width={220}
                        height={40}
                        className="object-contain"
                    />
                </Link>
            </div>

            <ul className="flex items-center list-none gap-6 m-0 p-0">
                {status === "loading" && (
                    <li><span className="text-sm text-gray-400">Loading...</span></li>
                )}

                {status === "authenticated" && session?.user && (
                    <>
                        <li className="flex items-center">
                            <span className="p-2 text-sm text-white">
                                Welcome, {session.user?.name || 'User'}!
                            </span>
                        </li>
                        <li>
                            <Button onClick={handleLogout} size="sm" variant="outline">
                                Logout
                            </Button>
                        </li>
                    </>
                )}

                {status === "unauthenticated" && (
                    <li>
                        <Link href="/login" className="text-sm text-white no-underline hover:opacity-80">
                            Login
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

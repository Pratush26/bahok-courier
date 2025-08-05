"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./theme";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--secground)',
      }}
      className="p-4"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold fontbaumans">
          Bahok
        </Link>

        {/* Desktop Nav */}
        <section className="hidden sm:flex justify-center items-center gap-6">
          <NavLinks pathname={pathname} />
        </section>

        {/* Hamburger Icon (Mobile Only) */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            // X icon SVG
            <Image
              src="/cross.svg"
              alt="Close Menu"
              width={24}
              height={24}
              className="dark:invert" />
          ) : (
            // Hamburger icon SVG
            <Image
              src="/menu.svg"
              alt="Hamburger Menu"
              width={24}
              height={24}
              className="dark:invert" />
          )}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <section className="sm:hidden flex flex-col mt-3 space-y-2">
          <NavLinks pathname={pathname} />
        </section>
      )}
    </nav>
  );
}

function NavLinks({ pathname }: { pathname: string }) {
  const baseClasses =
    "font-semibold hover:text-gray-600 transition-all duration-300";
  const active = "underline underline-offset-4";

  return (
    <>
      <Link
        href="/track"
        className={`${baseClasses} ${pathname === "/track" ? active : ""}`}
      >
        Track
      </Link>
      <Link
        href="/about"
        className={`${baseClasses} ${pathname === "/about" ? active : ""}`}
      >
        About
      </Link>
      <Link
        href="/ship"
        className={`${baseClasses} ${pathname === "/ship" ? active : ""}`}
      >
        Services
      </Link>
      <Link
        href="/help"
        className={`${baseClasses} ${pathname === "/help" ? active : ""}`}
      >
        Help
      </Link>
      <ThemeToggle />
    </>
  );
}

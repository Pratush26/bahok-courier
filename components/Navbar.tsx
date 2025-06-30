"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-purple-800 px-6 py-4 flex justify-between items-center overflow-hidden">
        <Link href="/" className="text-white text-2xl font-bold fontbaumans">
          Bahok
        </Link>
        <section className="flex justify-center items-center gap-6">
          <Link href="/track" className={`text-white font-semibold hover:text-amber-300 transition-all duration-300 ${pathname === '/track' && 'underline underline-offset-3'}`}>
            Track
          </Link>
          <Link href="/about" className={`text-white font-semibold hover:text-amber-300 transition-all duration-300 ${pathname === '/about' && 'underline underline-offset-3'}`}>
            About
          </Link>
          <Link href="/ship" className={`text-white font-semibold hover:text-amber-300 transition-all duration-300 ${pathname === '/ship' && 'underline underline-offset-3'}`}>
            Services
          </Link>
          <Link href="/help" className={`text-white font-semibold hover:text-amber-300 transition-all duration-300 ${pathname === '/help' && 'underline underline-offset-3'}`}>
            Help
          </Link>
        </section>
    </nav>
  );
}
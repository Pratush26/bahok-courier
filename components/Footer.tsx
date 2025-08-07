import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-purple-800 dark:bg-purple-950 text-white dark:text-gray-300 py-6 text-center shadow-purple-950 shadow-[0_-4px_20px_rgba(0,0,0,0)]">
        <p className="text-sm mb-2 dark:text-gray-400">© 2025 Bahok. All rights reserved.</p>
        <div className="flex justify-evenly items-center">
          <section className="flex flex-col items-center">
            <p>Developed by - Pratush</p>
            <a href="https://pratushportfolio.vercel.app/" target="_blank" className="underline underline-offset-3">pratushportfolio.vercel.app</a>
          </section>
          <section className="flex flex-col items-center gap-2">
            <Link href="/terms" className="hover:text-amber-300 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-amber-300 transition-colors duration-300">
              Privacy Policy
            </Link>
          </section>
        </div>
    </footer>
  );
}
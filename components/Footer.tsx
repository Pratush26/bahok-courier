import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-purple-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-2">© 2025 Bahok. All rights reserved.</p>
        <div className="flex justify-evenly items-center">
          <section className="flex flex-col items-center">
            <p >Developed by - Pratush</p>
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
      </div>
    </footer>
  );
}
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-purple-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-2">© 2023 Bahok. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <Link href="/privacy" className="hover:text-amber-300 transition-colors duration-300">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-amber-300 transition-colors duration-300">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
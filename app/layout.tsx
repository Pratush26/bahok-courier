import type { Metadata } from "next";
import { Geist, Geist_Mono, Genos, Baumans, Tinos, Leckerli_One } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const genos = Genos({
  variable: "--font-genos",
  subsets: ["latin"],
  weight: "400",
});

const baumans = Baumans({
  variable: "--font-baumans",
  subsets: ["latin"],
  weight: "400",
});

const tinos = Tinos({
  variable: "--font-tinos",
  subsets: ["latin"],
  weight: "400",
});

const leckerliOne = Leckerli_One({
  variable: "--font-leckerli-one",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Bahok - Courier Service",
  keywords: ["Bahok", "Courier Service", "Delivery", "Shipping", "Track Order"],
  authors: [{ name: "Pratush", url: "https://pratushportfolio.vercel.app/" }],
  creator: "Pratush Barua",
  description: "This is a demo courier service website, a project showcasing the use of Next.js, React, and Tailwind CSS. It features a modern design with a focus on user experience, allowing users to track their orders and learn about the services offered.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${genos.variable} ${baumans.variable} ${tinos.variable} ${leckerliOne.variable} antialiased`}
      >
      <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

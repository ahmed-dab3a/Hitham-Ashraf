import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hitham Ashraf | Online Fitness Coach",
  description: "Transform your physique with personalized training and nutrition coaching by Hitham Ashraf.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-black text-white antialiased">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-dark-bg border-t border-white/5 py-12">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Hitham Ashraf Fitness. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

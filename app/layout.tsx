// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raj Watches Dashboard",
  description: "Admin dashboard for managing orders and inventory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex bg-[#f7f6f3] text-black`}
      >
        {/* Sidebar */}
        <aside className="w-64 bg-[#f2efe9] border-r border-gray-200 px-6 py-8 flex flex-col">
          {/* Brand */}
          <div className="mb-10">
            <h1 className="text-2xl text-black font-semibold tracking-tight">
              Raj Watches
            </h1>
            <p className="text-xs text-gray-600 mt-1">
              Admin Dashboard
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <Link
              href="/orders"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-white hover:shadow-sm transition"
            >
              Orders
            </Link>

            <Link
              href="/prices"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-white hover:shadow-sm transition"
            >
              Manage Prices
            </Link>
            <Link
              href="/watches"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-white hover:shadow-sm transition"
            >
              Manage Watches
            </Link>
          </nav>

          {/* Footer (optional but classy) */}
          <div className="mt-auto pt-6 text-xs text-gray-500">
            © {new Date().getFullYear()} Raj Watches
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}

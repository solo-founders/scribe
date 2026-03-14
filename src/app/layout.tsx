import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Toaster } from "sonner";
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
  title: "Scribe — Podcast Content Remix",
  description: "Transform podcast episodes into 20+ pieces of content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <header className="border-b bg-background">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
              <Link href="/" className="text-xl font-bold tracking-tight">
                Scribe
              </Link>
              <nav>
                <Link
                  href="/episodes/new"
                  className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  New Episode
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">
            <div className="max-w-6xl mx-auto px-6 py-8">{children}</div>
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

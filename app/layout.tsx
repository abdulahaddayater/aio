import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeProvider from "@/components/DarkModeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIO — All-in-One Recipe Platform",
  description:
    "Discover thousands of recipes from every cuisine, culture, and dietary preference. AI-powered recipe search, meal planning, and cooking assistance.",
  keywords: ["recipes", "cooking", "meal planning", "AI chef", "healthy eating", "cuisine"],
  openGraph: {
    title: "AIO — All-in-One Recipe Platform",
    description: "Discover any recipe, anytime, anywhere.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FF6B35",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF6B35" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <DarkModeProvider>
          <Navbar />
          <main className="min-h-screen safe-bottom">{children}</main>
          <Footer />
        </DarkModeProvider>
      </body>
    </html>
  );
}

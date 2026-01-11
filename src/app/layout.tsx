import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Snowfall from "@/components/Snowfall";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mountain Planner - 登山計画アプリ",
  description: "安全で楽しい登山をサポートする計画アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Snowfall />
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-6">
          {children}
        </main>
      </body>
    </html>
  );
}

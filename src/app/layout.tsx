import type { Metadata } from "next";
// Remove unused import
// import { Fira_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Countdown Timer",
  description: "A simple countdown timer application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  );
}
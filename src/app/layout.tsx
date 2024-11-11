import type { Metadata } from "next";
import { Fira_Mono } from "next/font/google";
import "./globals.css";

// const firaMono = Fira_Mono({
//   weight: ['400', '500', '700'],
//   subsets: ['latin'],
//   variable: '--font-fira-mono',
// });

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
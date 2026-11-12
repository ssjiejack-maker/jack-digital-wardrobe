import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Wardrobe",
  description: "A private styling companion for your own closet."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-ink min-h-screen antialiased">{children}</body>
    </html>
  );
}

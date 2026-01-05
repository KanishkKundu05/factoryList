import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Factory List - India Map",
  description: "Interactive map of India with factory locations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

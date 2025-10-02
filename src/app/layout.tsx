import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Team Tools - Pair Programming Timer",
  description: "Simple timer and tools for pair programming teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlanetMatrix | One Platform. All Your ESG. Infinite Impact.",
  description: "Manage all ESG needs on one platform, automate your reporting, and unlock a 360-degree view of sustainability performance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
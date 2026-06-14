import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meal Carbon Calculator",
  description: "Track the carbon footprint of your diet and discover greener swaps.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-leaf-50 min-h-screen">{children}</body>
    </html>
  );
}

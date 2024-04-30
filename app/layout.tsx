import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";
import "./globals.css";

const pt_serif = PT_Serif({ subsets: ["latin"], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: "Inverse Matrix",
  description: "Inverse of a Matrix using the Gaussian Elimination Method",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pt_serif.className} bg-zinc-200`} >{children}</body>
    </html>
  );
}

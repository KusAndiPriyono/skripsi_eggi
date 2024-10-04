import type { Metadata } from "next";
import { Inter, Markazi_Text } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
const markazi = Markazi_Text({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SMKS Era Pembangunan",
  description: "SMKS Era Pembangunan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={markazi.className}>
        <Toaster/>
        {children}</body>
    </html>
  );
}

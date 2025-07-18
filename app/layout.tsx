import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Nvabar from "@/components/Nvabar";

// ✅ Load font correctly and specify weights
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Example weights, adjust as needed
});

export const metadata: Metadata = {
  title: "Wavy Share",
  description: "Share files with pride",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${poppins.variable}`}>
        <body>
          <Nvabar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
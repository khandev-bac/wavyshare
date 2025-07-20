import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignIn } from "@clerk/nextjs";


import { Toaster } from "react-hot-toast";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Example weights, adjust as needed
});

export const metadata: Metadata = {
  title: "WavyShare | Send file with proud simple",
  description: "Share files with pride",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider

    >
      <html lang="en" className={`${poppins.variable}`}>
        <link rel="icon" type="image/svg+xml" href="/wavy.svg" />
        <body>
          {children}
          <Toaster position="bottom-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
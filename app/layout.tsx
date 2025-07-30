import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppStoreProvider } from "./store/store";
import { Toaster } from "@/components/ui/toaster";

const dmSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MoodMatch",
  description: "AI-Driven Playlist Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={dmSans.className}
      >
        <AppStoreProvider>
          <Navbar />
            {children}
            <Toaster />
          <Footer />
        </AppStoreProvider>
      </body>
    </html>
  );
}

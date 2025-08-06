import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Footer from "@/app/components/Footer";
import { AppStoreProvider } from "./store/store";
import { Toaster } from "sonner";

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
              {children}
              <Toaster />
            {/* <Footer /> */}
          </AppStoreProvider>
      </body>
    </html>
  );
}

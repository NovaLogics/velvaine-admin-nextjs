import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import SideBar from "@/components/layout/SideBar";
import TopBar from "@/components/layout/TopBar";
import { ToastProvider } from "@/lib/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Velvaine - Admin Dashboard",
  description: "Dashboard for Velvaine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ToastProvider/>
          <div className="flex max-lg:flex-col text-grey-1">
            <SideBar />
            <TopBar />
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Logger from "./logger";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Navigation/Sidebar/AppSidebar";
import AppNavbar from "@/components/Navigation/AppNavbar";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: "Affworld Assignment 2025",
  description:
    "A Next.js 15 application showcasing advanced features like SSR, ISR, ShadCN UI integration, and MongoDB Atlas. Built as part of the Affworld Software Engineer assignment.",
  keywords: [
    "Next.js",
    "ShadCN UI",
    "MongoDB Atlas",
    "SSR",
    "ISR",
    "Affworld Assignment",
    "Software Engineer",
    "Modern Web Application",
  ],
  author: "BeyonderSS",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#ffffff",
  charset: "UTF-8",
};


export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SidebarProvider defaultOpen={defaultOpen}>




        <AppSidebar />
      <main className="w-full">
        <AppNavbar />
        {children}
      </main>        </SidebarProvider>
        </ThemeProvider>
        <Logger />
      </body>
    </html>
  );
}

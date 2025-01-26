import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Logger from "./logger";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Navigation/Sidebar/AppSidebar";
import AppNavbar from "@/components/Navigation/AppNavbar";
import { cookies } from "next/headers";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "./api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";
import { Toaster } from "@/components/ui/toaster";

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
};


export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider defaultOpen={defaultOpen}>




            <AppSidebar />
            <main className="w-full">
              <AppNavbar />
              <NextSSRPlugin
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              {children}
              <Logger />
              <Toaster />

            </main>        </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Geist_Mono, Caveat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Oneko from "@/components/Oneko";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rudraksh Sharma — Web Developer",
  description: "Enthusiastic B.Tech IT student with a strong foundation in Python, web development, and AWS Cloud.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", plusJakartaSans.variable, playfair.variable, geistMono.variable, caveat.variable, "font-sans")}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Oneko />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "ChatRooms",
  description: "Developed by Preetam Patil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute right-10 top-10 z-50">
            <Navbar />
          </div>
          <div className="flex items-center flex-col  relative w-full  justify-start h-screen px-4">
            {children}
          </div>

          <div
            className="absolute bottom-0 w-full
          "
          >
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

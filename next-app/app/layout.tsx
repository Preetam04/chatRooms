import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";

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
      <body className="flex items-center flex-col py-24 relative w-full h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute right-10 top-10">
            <Navbar />
          </div>
          <div className="w-full h-full mt-14">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}

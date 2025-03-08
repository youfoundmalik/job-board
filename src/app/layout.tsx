import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { JobsContextProvider } from "@/context/JobsContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Board Page",
  description: "Frontend developer task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased !bg-gray-50`}>
        <JobsContextProvider>{children}</JobsContextProvider>
      </body>
    </html>
  );
}

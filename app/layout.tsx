import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DecentWork | Decentralized Freelancing Platform",
  description:
    "Connect with top talent, secure payments with smart contracts, and build your decentralized career",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider> {/* Wrapping everything with SessionProvider */}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            suppressHydrationWarning
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

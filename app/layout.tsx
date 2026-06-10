import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Studio Switch",
  description: "A three-action production console Mini App on Base.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="base:app_id" content="6a27e41fcf15720bcb102d4b" />
        <meta
          name="talentapp:project_verification"
          content="384c784b6ca54ba4caca6e8cf8f113558284d15fe425361b4997ca1f41b5fb19b46fe8ff99d1c55ef5852f9b2d0f7b2562aef8687d60f36309e953e5bbd7024e"
        />
      </head>
      <body className="min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

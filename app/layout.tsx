import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MetaLearn — AI-Powered Night Revision Learning",
  description:
    "A multi-agent AI learning platform that helps you revise deeply and efficiently — even while you sleep. Powered by GenAI and ancient memory techniques.",
  openGraph: {
    title: "MetaLearn — Learn While You Sleep",
    description:
      "MetaLearn is your intelligent revision partner. From Socratic learning to sleep modules — it's the future of education.",
    url: "http://localhost:3000", 
    siteName: "MetaLearn",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MetaLearn — Rethink Learning Forever",
    description:
      "Explore how AI agents can guide you through nightly revision and simulation-based mastery.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReadingProgress } from "@/components/ReadingProgress";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cold Calling Wiki — Expert Tips for Effective Outreach",
  description:
    "Your complete guide to mastering cold calling. Expert tips, scripts, objection handling, and strategies for sales professionals.",
  icons: {
    icon: "https://cdn.prod.website-files.com/690b1090d92ceadd368ab122/690b29fd719b235787ea75f8_DIV%20(2).svg",
  },
  openGraph: {
    title: "Cold Calling Wiki",
    description:
      "Your complete guide to mastering cold calling. Expert tips, scripts, objection handling, and strategies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white font-body text-navy-950 antialiased">
        <ReadingProgress />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

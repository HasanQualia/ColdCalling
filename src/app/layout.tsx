import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundAnimation } from "@/components/BackgroundAnimation";
import { SplashLoader } from "@/components/SplashLoader";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TitleMarquee } from "@/components/TitleMarquee";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

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
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-white/80 font-body text-charcoal-900 antialiased dark:bg-charcoal-900/80 dark:text-charcoal-100" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange={false}>
          <TitleMarquee />
          <SplashLoader />
          <ReadingProgress />
          <BackgroundAnimation />
          <Navbar />
          <main className="relative z-10 pt-14">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

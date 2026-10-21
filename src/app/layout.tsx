import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CookieBanner from "@/components/CookieBanner";
import { CookieConsentProvider } from "@/lib/cookie-consent";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://studiosociale.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Studio Socialé — Social media management, content & strategy",
  description:
    "Studio Socialé is a social media marketing agency handling management, content and strategy, so your brand never goes quiet.",
  openGraph: {
    title: "Studio Socialé",
    description:
      "Social media management, content and strategy for brands that want to show up like they mean it.",
    url: siteUrl,
    siteName: "Studio Socialé",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Socialé",
    description:
      "Social media management, content and strategy for brands that want to show up like they mean it.",
  },
  icons: {
    icon: "/icon",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${manrope.variable} h-full`}
    >
      <body className="min-h-full bg-bone text-ink antialiased">
        <MotionConfig reducedMotion="user">
          <CookieConsentProvider>
            <SmoothScroll>{children}</SmoothScroll>
            <CookieBanner />
          </CookieConsentProvider>
        </MotionConfig>
      </body>
    </html>
  );
}

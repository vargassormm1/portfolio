import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RegisterSW } from "@/components/RegisterSW";
import { INDEXABLE, OG, SITE_URL, VERIFICATION } from "@/content/site";
import { PROFILE } from "@/content/profile";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

const description = "Software engineer in the New York City metropolitan area working across full-stack applications, cloud infrastructure on AWS, AI-powered systems and data engineering. Currently at Alliance Advisors.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${PROFILE.name} | Software Engineer`, template: `%s | ${PROFILE.name}` },
  description,
  applicationName: PROFILE.name,
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  openGraph: { ...OG, type: "profile", title: `${PROFILE.name} | Software Engineer`, description, url: "/", firstName: "Ralph", lastName: "Vargas Sormillon" },
  twitter: { card: "summary_large_image", title: `${PROFILE.name} | Software Engineer`, description },
  appleWebApp: { capable: true, title: "Ralph Vargas", statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
  robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  verification: { ...(VERIFICATION.google ? { google: VERIFICATION.google } : {}), ...(VERIFICATION.bing ? { other: { "msvalidate.01": VERIFICATION.bing } } : {}) },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#202225", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <a href="#main" className="sr-only z-50 rounded-md bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3">Skip to content</a>
        <Header />
        <div id="top" />
        {children}
        <Footer />
        <RegisterSW />
      </body>
    </html>
  );
}

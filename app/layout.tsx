import type { Metadata } from "next";
import { Inter, Sora } from 'next/font/google';
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sf-pro',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Subpricing — Global Subscription Price Tracker",
  description: "Compare subscription prices across countries. Save up to 90% on Netflix, Spotify, YouTube Premium, and more.",
  keywords: ["subscription pricing", "Netflix price", "Spotify price", "YouTube Premium price", "VPN", "save money", "international pricing"],
  authors: [{ name: "Subpricing Team" }],
  creator: "Subpricing",
  publisher: "Subpricing",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://subpricing.com",
    title: "Subpricing — Global Subscription Price Tracker",
    description: "Compare subscription prices across countries. Save up to 90% on Netflix, Spotify, YouTube Premium, and more.",
    siteName: "Subpricing",
    images: [
      {
        url: "https://subpricing.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Subpricing — Global Subscription Price Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subpricing — Global Subscription Price Tracker",
    description: "Compare subscription prices across countries. Save up to 90% on Netflix, Spotify, YouTube Premium, and more.",
    images: ["https://subpricing.com/og-image.png"],
    creator: "@subpricing",
  },
  verification: {
    google: "your-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
  },
  alternates: {
    canonical: "https://subpricing.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Subpricing",
              "url": "https://subpricing.com",
              "description": "Compare subscription prices across countries. Save up to 90% on Netflix, Spotify, YouTube Premium, and more.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://subpricing.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Subpricing",
              "url": "https://subpricing.com",
              "logo": "https://subpricing.com/logo.png",
              "sameAs": [
                "https://twitter.com/subpricing",
                "https://github.com/subpricing",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <NavigationBar />
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

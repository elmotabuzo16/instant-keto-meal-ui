import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import RouteLoadingBar from "@/components/layout/RouteLoadingBar";
import { APP_NAME, DOMAIN } from "@/lib/config";
import { defaultOgImage, defaultSeoDescription, defaultSeoKeywords } from "@/lib/seo";
import "antd/dist/reset.css";
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
  metadataBase: new URL(DOMAIN),
  title: {
    default: `${APP_NAME} | Low Carb & Keto Meals`,
    template: `%s | ${APP_NAME}`,
  },
  description: defaultSeoDescription,
  keywords: defaultSeoKeywords,
  applicationName: APP_NAME,
  creator: APP_NAME,
  publisher: APP_NAME,
  icons: {
    icon: "/grains.ico",
    shortcut: "/grains.ico",
    apple: "/grains.ico",
    other: [
      { rel: "icon", url: "/grains.ico", type: "image/x-icon" },
      { rel: "shortcut icon", url: "/grains.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", url: "/grains.ico" },
    ],
  },
  openGraph: {
    title: `${APP_NAME} | Low Carb & Keto Meals`,
    description: defaultSeoDescription,
    url: DOMAIN,
    siteName: APP_NAME,
    type: "website",
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 800,
        alt: `${APP_NAME} keto meal ideas`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} | Low Carb & Keto Meals`,
    description: defaultSeoDescription,
    images: [defaultOgImage],
  },
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
      <body className="min-h-full flex min-h-screen flex-col">
        <Suspense fallback={null}>
          <RouteLoadingBar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}

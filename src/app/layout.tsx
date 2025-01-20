import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "@/lib/utils/lenis";
import CurveTransition from "@/components/curve/Transitioncurve";
import Header from "@/components/header/header";
import { MenuProvider } from "@/components/provider/transitionTextProvider";

import { Debug } from "@/components/debug";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactLenis root>
          <CurveTransition>
            <MenuProvider>
              {children}
              <Header />
            </MenuProvider>
            <Debug />
          </CurveTransition>
        </ReactLenis>
      </body>
    </html>
  );
}

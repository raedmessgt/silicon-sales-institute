import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Sora } from "next/font/google";
import "./globals.css";
import "./silicon-sales.css";

const display = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-ssi-display",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ssi-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ssi-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Silicon Sales Institute",
    template: "%s | Silicon Sales Institute",
  },
  description:
    "Break into 6-figure tech sales in 30–45 days. Global tech sales bootcamp — live coaching, placement-focused.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body style={{ background: "#0a0a0a", minHeight: "100dvh", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}

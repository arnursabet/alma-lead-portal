import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import StyledComponentsRegistry from "@/lib/registry";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["-apple-system", "Roboto", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Alma Lead Portal",
    default: "Alma Lead Portal",
  },
  description: "Lead management portal for visa assistance by Alma",
  keywords: ["lead management", "visa assistance", "Alma", "admin portal"],
  authors: [{ name: "Alma Team" }],
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <StyledComponentsRegistry>
          <Providers>
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

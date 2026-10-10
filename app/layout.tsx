import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Providers } from "@/components/Providers";
import { meta } from "@/lib/content";
import "./globals.css";

// One family everywhere (design.md §2): variable weight 100–900, upright and italic.
const archivo = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: meta.title,
    template: `%s — ${meta.name}`,
  },
  description: meta.tagline,
  openGraph: {
    title: meta.title,
    description: meta.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        {/* Without JavaScript nothing animates in, so show everything as-is. */}
        <noscript>
          <style>{`[data-motion]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Providers>
          <Nav />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

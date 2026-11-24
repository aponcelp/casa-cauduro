import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { PostHogProvider } from "@/components/posthog-provider";
import "./globals.css";

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Casa Estudio Rafael Cauduro",
    template: "%s · Casa Cauduro",
  },
  description:
    "Casa-museo en Cuernavaca. Visitas prepagadas, obra y una tienda pequeña.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <PostHogProvider />
        {children}
      </body>
    </html>
  );
}

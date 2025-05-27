import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/layout/Providers";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tramboory - Salón de Eventos Infantiles",
  description: "El mejor salón de fiestas infantiles en Zapopan, Jalisco",
  keywords: "salón de fiestas, eventos infantiles, fiestas infantiles, Zapopan, Jalisco",
  authors: [{ name: "Tramboory", url: "https://tramboory.com" }],
  creator: "Tramboory",
  openGraph: {
    title: "Tramboory - Eventos Infantiles Inolvidables",
    description: "Celebra momentos inolvidables en el mejor salón de fiestas infantiles en Zapopan",
    url: "https://tramboory.com",
    siteName: "Tramboory",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

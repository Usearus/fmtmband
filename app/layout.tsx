import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FROM MISERY TO MALICE | Official Site",
  description: "Official website of From Misery To Malice - Deathcore metal band. Tour dates, music, merch, and more.",
  keywords: "deathcore, metal, band, from misery to malice, tour, music, heavy metal",
  openGraph: {
    title: "FROM MISERY TO MALICE",
    description: "Official website of From Misery To Malice - Deathcore metal band",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

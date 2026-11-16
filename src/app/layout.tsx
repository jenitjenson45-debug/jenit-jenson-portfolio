import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CustomCursor } from "@/components/cursor/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://jenitjenson.dev"),
  title: "JENIT JENSON — Full-Stack Developer & Creative Engineer",
  description:
    "Production portfolio of Jenit Jenson, Full-Stack Developer and B.Tech Computer Science Engineering student at Jyothi Engineering College, Kerala. Built with Next.js, Three.js 3D depth, and editorial typography.",
  keywords: [
    "Jenit Jenson",
    "Full-Stack Developer",
    "Creative Developer",
    "Kerala Web Developer",
    "Jyothi Engineering College",
    "Next.js Developer",
    "TypeScript",
    "React",
    "ResQLink",
    "ResQMesh",
    "Sentinel AI",
  ],
  authors: [{ name: "Jenit Jenson" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "JENIT JENSON — Full-Stack Developer & Creative Engineer",
    description:
      "Crafting thoughtful digital experiences through clean engineering, creative design, and modern web technologies.",
    siteName: "Jenit Jenson Portfolio",
    images: [
      {
        url: "/images/jenit-jenson-portrait.jpg",
        width: 1200,
        height: 800,
        alt: "Jenit Jenson — Full-Stack Developer",
      },
    ],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        />
        <meta name="theme-color" content="#051F20" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300..800;1,9..40,300..800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#051F20] text-[#DAF1DE] font-sans antialiased overflow-x-hidden selection:bg-[#235347] selection:text-[#DAF1DE]">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

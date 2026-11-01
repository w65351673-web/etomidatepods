import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import SocialFloat from "@/components/SocialFloat";
import ImageProtection from "@/components/ImageProtection";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL("https://etomidatepods.com"),
  title: {
    default: "EtomidatePods — Premium K-Pods, Powder & Liquid | EtomidatePods.com",
    template: "%s | EtomidatePods.com",
  },
  description:
    "EtomidatePods.com — Premium etomidate powder, K-Pods vape cartridges & liquid solutions. Lab-tested ≥99.8% purity. COA certified, discreet worldwide shipping within 24h.",
  keywords: [
    "buy etomidate online",
    "etomidate for sale",
    "order etomidate",
    "etomidate shop",
    "etomidate store",
    "etomidate powder",
    "buy etomidate powder",
    "etomidate powder for sale",
    "pure etomidate powder",
    "pharmaceutical grade etomidate powder",
    "etomidate pods",
    "buy etomidate pods",
    "etomidatepods",
    "k pods",
    "kpods vape",
    "etomidate vape",
    "etomidate vape pods",
    "etomidate K-Pods",
    "buy etomidate K-Pods",
    "etomidate vape cartridge",
    "etomidate disposable vape",
    "etomidate liquid solution",
    "buy etomidate liquid",
    "etomidate liquid for sale",
    "etomidate",
    "etomidate supplier",
    "etomidate vendor",
    "pharmaceutical grade etomidate",
    "research grade etomidate",
    "lab tested etomidate",
    "etomidate 99.8 purity",
    "etomidate COA certified",
    "HPLC tested etomidate",
    "discreet etomidate shipping",
    "etomidate worldwide delivery",
    "etomidate bulk order",
    "etomidate wholesale",
    "etomidate research chemical",
    "etomidate anesthetic compound",
    "etomidate 33125-97-2",
    "33125-97-2",
    "CAS 33125-97-2",
    "CAS number 33125-97-2",
    "buy 33125-97-2",
    "33125-97-2 for sale",
    "33125-97-2 powder",
    "33125-97-2 buy online",
    "etomidate CAS number",
    "zombie vape",
    "buy zombie vape",
    "zombie vape pods",
    "zombie K-Pod",
    "piao piao vape",
    "buy piao piao vape",
    "piao piao pods",
    "piao piao K-Pod",
    "cychlorphine",
    "cychlorphine HCL",
    "cychlorphine HCL powder",
    "buy cychlorphine HCL",
    "cychlorphine 16145-71-4",
    "16145-71-4",
    "CAS 16145-71-4",
    "buy 16145-71-4",
    "16145-71-4 powder",
    "16145-71-4 for sale",
    "EtomidatePods",
    "etomidatepods.com",
    "medetomidine",
    "medetomidine powder",
    "buy medetomidine",
    "medetomidine for sale",
    "tiletamine",
    "tiletamine powder",
    "buy tiletamine",
    "tiletamine for sale",
    "spirochlorphine",
    "spirochlorphine r6890",
    "spirochlorphine r6890 powder",
    "buy spirochlorphine",
    "zombie vape",
    "piao piao",
    "etomidate starter kit",
    "kpod starter kit",
    "etomidate vape flavours",
    "grape etomidate",
    "strawberry mango vape",
    "etomidate green apple",
    "space oil",
    "buy space oil",
    "space oil vape",
    "space oil pods",
    "etomidate e-liquid",
    "etomidate e-liquids",
    "etomidate flavours",
    "etomidate flavored pods",
    "etomidate menthol pods",
    "etomidate oil",
    "etomidate oil for sale",
    "etomidate drops",
    "etomidate solution drops",
    "etomidate nasal spray",
    "etomidate oral solution",
    "etomidate concentrate",
    "space pods",
    "research chemical vape",
    "pharmaceutical vape pods",
  ],
  authors: [{ name: "EtomidatePods.com" }],
  creator: "EtomidatePods.com",
  publisher: "EtomidatePods.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://etomidatepods.com",
    siteName: "EtomidatePods.com",
    title: "EtomidatePods — Premium K-Pods, Powder & Liquid",
    description:
      "EtomidatePods.com — Premium etomidate powder, K-Pods vape cartridges & liquid. ≥99.8% purity, COA included, discreet worldwide shipping.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Etomidate Pods — Premium Powder, Vape & Liquid",
    description:
      "EtomidatePods.com — Premium etomidate powder, K-Pods vape cartridges & liquid. Lab-tested ≥99.8% purity. Ships worldwide within 24h.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://etomidatepods.com",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  verification: {
    google: "6uz5n6ngf_ozH4xgFtl0Clt_Tm2OBYScFmgYVpqS5gk",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "EtomidatePods",
              url: "https://etomidatepods.com",
              logo: "https://etomidatepods.com/logo.svg",
              description:
                "Supplier of lab-tested etomidate products — K-Pods vape, powder and liquid solutions with COA certification.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                url: "https://etomidatepods.com/contact",
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-navy text-bone">
        <ImageProtection />
        <ToastProvider />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <SocialFloat />
      </body>
    </html>
  );
}

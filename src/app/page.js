import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Settings from "@/models/Settings";
import HomeClient from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Etomidate Pods — Premium Powder, K-Pods Vape & Liquid",
  description:
    "EtomidatePods.com — Premium etomidate powder, K-Pods vape cartridges & liquid solutions. Lab-tested ≥99.8% purity. COA certified, fast discreet worldwide shipping within 24h.",
  keywords: [
    "buy etomidate online",
    "etomidate for sale",
    "etomidate powder buy",
    "etomidate vape pods buy",
    "etomidate K-Pods",
    "etomidate liquid buy",
    "pharmaceutical grade etomidate",
    "etomidate 99.8% purity",
    "etomidate COA included",
    "HPLC verified etomidate",
    "research grade etomidate",
    "discreet etomidate shipping",
    "etomidate worldwide delivery 24h",
    "etomidate bulk discount",
    "best etomidate supplier",
    "trusted etomidate vendor",
    "etomidate shop online",
    "etomidate vape cartridge",
    "etomidate disposable vape",
    "etomidate liquid solution",
    "space oil",
    "buy space oil",
    "space oil pods",
    "space pods vape",
    "etomidate e-liquid",
    "etomidate flavours",
    "etomidate oil",
    "etomidate drops",
    "etomidate concentrate",
    "pharmaceutical vape pods",
    "33125-97-2",
    "CAS 33125-97-2",
    "buy CAS 33125-97-2",
    "etomidate CAS number",
    "etomidate 33125-97-2",
  ],
  openGraph: {
    title: "Etomidate Pods — Premium Powder, Vape & Liquid",
    description:
      "EtomidatePods.com — Premium etomidate powder, K-Pods vape cartridges & liquid. ≥99.8% purity, lab-tested with COA. Fast discreet shipping worldwide.",
    url: "https://etomidatepods.com",
    siteName: "EtomidatePods.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Etomidate Pods — Premium Powder, Vape & Liquid",
    description:
      "EtomidatePods.com — Premium etomidate powder, K-Pods vape & liquid. ≥99.8% purity, lab-tested, COA included. Ships worldwide within 24h.",
  },
  alternates: {
    canonical: "https://etomidatepods.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Home() {
  const conn = await dbConnect();
  
  if (!conn) {
    const siteSettings = {
      announcement: "",
      heroSubtitle: "",
      siteName: "EtomidatePods",
      tagline: "",
    };
    return <HomeClient products={[]} siteSettings={siteSettings} />;
  }
  const productsRaw = await Product.find({}).lean();
  const products = productsRaw.map((p) => ({
    _id: p._id.toString(),
    name: p.name || "",
    slug: p.slug || "",
    price: p.price || 0,
    category: p.category || "",
    shortDescription: p.shortDescription || "",
    description: p.description || "",
    specifications: p.specifications || [],
    sizes: (p.sizes || []).map((s) => ({ label: s.label, price: s.price })),
    inStock: p.inStock ?? true,
    image: p.image || "",
  }));

  let raw = await Settings.findOne({ key: "main" }).lean();
  const siteSettings = {
    announcement: raw?.announcement || "",
    heroSubtitle: raw?.heroSubtitle || "",
    siteName: raw?.siteName || "EtomidatePods",
    tagline: raw?.tagline || "",
  };

  return <HomeClient products={products} siteSettings={siteSettings} />;
}

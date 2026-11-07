import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import ShopClient from "@/components/ShopClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop Etomidate Products — K-Pods, Powder & Liquid | EtomidatePods.com",
  description:
    "Shop premium etomidate products at EtomidatePods.com. Etomidate powder, K-Pods vape cartridges & liquid solutions. Lab-tested ≥99.8% purity, COA with every order. Discreet worldwide shipping.",
  keywords: [
    "buy etomidate powder",
    "etomidate powder for sale",
    "etomidate vape pods for sale",
    "buy etomidate K-Pods",
    "etomidate K-Pods vape",
    "etomidate vape cartridge for sale",
    "etomidate disposable vape",
    "buy etomidate liquid solution",
    "etomidate liquid for sale",
    "etomidate products online",
    "order etomidate online",
    "etomidate shop",
    "pharmaceutical grade etomidate",
    "research grade etomidate for sale",
    "pure etomidate 99.8%",
    "etomidate COA certified",
    "etomidate bulk buy",
    "etomidate wholesale prices",
    "discreet etomidate delivery",
    "etomidate fast shipping",
    "space oil",
    "buy space oil online",
    "space oil pods for sale",
    "space pods buy",
    "etomidate e-liquid for sale",
    "etomidate flavours buy",
    "etomidate menthol flavour",
    "etomidate oil buy",
    "etomidate drops for sale",
    "etomidate nasal spray buy",
    "etomidate oral solution buy",
    "etomidate concentrate for sale",
    "research chemical e-liquid",
    "pharmaceutical e-liquid pods",
    "33125-97-2",
    "CAS 33125-97-2",
    "buy 33125-97-2 online",
    "33125-97-2 for sale",
    "33125-97-2 powder buy",
    "etomidate CAS 33125-97-2",
    "etomidate CAS number",
    "zombie vape",
    "buy zombie vape",
    "zombie vape pods",
    "piao piao vape",
    "buy piao piao vape",
    "piao piao pods",
    "cychlorphine HCL",
    "cychlorphine HCL powder",
    "buy cychlorphine HCL",
    "cychlorphine 16145-71-4",
    "16145-71-4",
    "CAS 16145-71-4",
    "buy 16145-71-4",
    "16145-71-4 for sale",
  ],
  openGraph: {
    title: "Shop Etomidate Products — K-Pods, Powder & Liquid",
    description:
      "EtomidatePods.com — Buy etomidate powder, K-Pods vape cartridges & liquid solutions. Lab-tested ≥99.8% purity, COA included. Discreet worldwide shipping.",
    url: "https://etomidatepods.com/shop",
  },
  alternates: {
    canonical: "https://etomidatepods.com/shop",
  },
};

export default async function ShopPage() {
  const conn = await dbConnect();
  
  if (!conn) {
    return <ShopClient products={[]} />;
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

  return <ShopClient products={products} />;
}

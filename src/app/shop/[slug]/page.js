import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductDetailClient from "./ProductDetailClient";

const BASE_URL = "https://etomidatepods.com";

async function getProduct(slug) {
  try {
    await dbConnect();
    const product = await Product.findOne({ slug }).lean();
    if (!product) return null;
    return JSON.parse(JSON.stringify(product));
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | EtomidatePods.com",
      description: "The product you are looking for could not be found.",
    };
  }

  const priceFrom = product.sizes?.[0]?.price || product.price || 0;
  const title = `${product.name} — Buy Online | EtomidatePods.com`;
  const description = product.shortDescription
    ? `${product.shortDescription} From €${priceFrom}. ≥99.8% purity, COA included. Discreet worldwide shipping.`
    : `Buy ${product.name} online. Pharmaceutical-grade, lab-tested ≥99.8% purity. COA included. From €${priceFrom}. Discreet worldwide shipping.`;

  return {
    title,
    description,
    keywords: [
      product.name.toLowerCase(),
      `buy ${product.name.toLowerCase()}`,
      `${product.name.toLowerCase()} for sale`,
      `${product.name.toLowerCase()} online`,
      `${product.category} etomidate`,
      "buy etomidate online",
      "etomidate for sale",
      "pharmaceutical grade etomidate",
      "etomidate COA",
      "discreet etomidate shipping",
      "33125-97-2",
      "CAS 33125-97-2",
    ],
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/shop/${slug}`,
      siteName: "EtomidatePods.com",
      type: "website",
      images: product.image ? [{ url: `${BASE_URL}${product.image}`, alt: product.name }] : undefined,
    },
    alternates: {
      canonical: `${BASE_URL}/shop/${slug}`,
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="display text-5xl mb-4">Product not found</h1>
        <Link href="/shop" className="btn-ghost">Back to shop</Link>
      </div>
    );
  }

  const priceFrom = product.sizes?.[0]?.price || product.price || 0;
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription || product.description,
    image: product.image ? `${BASE_URL}${product.image}` : `${BASE_URL}/logo.svg`,
    category: product.category,
    brand: { "@type": "Brand", name: "EtomidatePods" },
    offers: product.sizes?.length
      ? product.sizes.map((s) => ({
          "@type": "Offer",
          name: `${product.name} — ${s.label}`,
          price: s.price,
          priceCurrency: "EUR",
          availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          url: `${BASE_URL}/shop/${product.slug}`,
        }))
      : {
          "@type": "Offer",
          price: priceFrom,
          priceCurrency: "EUR",
          availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          url: `${BASE_URL}/shop/${product.slug}`,
        },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${BASE_URL}/shop` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${BASE_URL}/shop/${product.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ProductDetailClient product={product} />
    </>
  );
}

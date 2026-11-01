"use client";
import Link from "next/link";
import { FaFlask, FaVial, FaTint, FaAppleAlt } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import ProtectedImage from "@/components/ProtectedImage";

const icons = { powder: FaFlask, vape: FaVial, liquid: FaTint, "vape flavours": FaAppleAlt };

/* Horizontal list-row variant of a product */
export default function ProductCard({ product }) {
  const Icon = icons[product.category] || FaFlask;
  const from = product.sizes?.length ? Math.min(...product.sizes.map((s) => s.price || 0)) : product.price || 0;
  return (
    <Link href={`/shop/${product.slug}`} className="product-card group panel panel-hover cut-br grid grid-cols-[112px_1fr] sm:grid-cols-[160px_1fr_auto] gap-5 items-center p-3 pr-5">
      <div className="relative aspect-square sm:aspect-[4/3] bg-ink overflow-hidden image-container no-context-menu">
        {product.image ? (
          <ProtectedImage src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-grid"><Icon className="w-10 h-10 text-ember/60" /></div>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.3em] text-ember font-display">{product.category}</p>
        <h3 className="display text-2xl text-bone group-hover:text-ember transition-colors truncate">{product.name}</h3>
        <p className="text-sm text-mute mt-1 line-clamp-2">{product.shortDescription}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-mute">
          {product.sizes?.slice(0, 4).map((s) => <span key={s.label}>{s.label} · €{s.price?.toFixed(2)}</span>)}
          <span className={`font-display uppercase tracking-[0.15em] ${product.inStock ? "text-emerald-400" : "text-red-400"}`}>{product.inStock ? "In stock" : "Sold out"}</span>
        </div>
      </div>
      <div className="col-span-2 sm:col-span-1 flex sm:flex-col items-center sm:items-end justify-between gap-3">
        <p className="display text-2xl text-bone">€{from.toFixed(2)}</p>
        <span className="inline-flex items-center gap-2 bg-ember text-white font-display uppercase tracking-[0.15em] text-xs px-4 py-2.5 skew-x group-hover:bg-ember-2 transition-colors">
          <span className="unskew-x inline-flex items-center gap-2">View <FiArrowUpRight className="w-3.5 h-3.5" /></span>
        </span>
      </div>
    </Link>
  );
}

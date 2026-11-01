"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFlask, FaVial, FaTint, FaAppleAlt, FaBitcoin, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { FiCheck, FiChevronRight, FiArrowRight, FiStar, FiTruck, FiShield, FiFileText } from "react-icons/fi";
import ProtectedImage from "@/components/ProtectedImage";

const icons = { powder: FaFlask, vape: FaVial, liquid: FaTint, "vape flavours": FaAppleAlt };

export default function ProductDetailClient({ product }) {
  const [selected, setSelected] = useState(0);
  const Icon = icons[product.category] || FaFlask;
  const price = product.sizes?.[selected]?.price || product.price || 0;
  const label = product.sizes?.[selected]?.label || "";
  const orderHref = `/order/${product.slug}${label ? `?size=${encodeURIComponent(label)}` : ""}`;

  return (
    <div className="bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-display text-mute mb-8">
          <Link href="/" className="hover:text-bone">Home</Link>
          <FiChevronRight className="w-3 h-3 text-ember" />
          <Link href="/shop" className="hover:text-bone">Shop</Link>
          <FiChevronRight className="w-3 h-3 text-ember" />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-bone">{product.category}</Link>
          <FiChevronRight className="w-3 h-3 text-ember" />
          <span className="text-ember truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Media */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-7">
            <div className="relative panel cut-tl cut-br overflow-hidden aspect-[4/3] bg-ink image-container no-context-menu">
              {product.image ? (
                <ProtectedImage src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-grid flex flex-col items-center justify-center gap-4">
                  <Icon className="w-24 h-24 text-ember" />
                  <span className="font-display uppercase tracking-[0.3em] text-mute text-xs">{product.category}</span>
                </div>
              )}
              <span className={`absolute top-4 left-4 px-3 py-1.5 text-[10px] font-display uppercase tracking-[0.2em] skew-x ${product.inStock ? "bg-ember text-white" : "bg-ink text-mute border border-line"}`}>
                <span className="unskew-x inline-flex items-center gap-2">{product.inStock && <span className="w-1.5 h-1.5 bg-white animate-pulse" />}{product.inStock ? "In stock" : "Sold out"}</span>
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-px bg-line border border-line">
              {[
                { icon: FiFileText, t: "COA included" },
                { icon: FiShield, t: "≥ 99.8% purity" },
                { icon: FiTruck, t: "Ships in 72h" },
              ].map(({ icon: I, t }) => (
                <div key={t} className="bg-navy p-4 flex items-center gap-3 text-xs sm:text-sm text-mute"><I className="w-4 h-4 text-ember shrink-0" /> {t}</div>
              ))}
            </div>

            {product.specifications?.length > 0 && (
              <div className="mt-10">
                <h2 className="eyebrow">Specifications</h2>
                <ul className="mt-5 grid sm:grid-cols-2 gap-px bg-line border border-line">
                  {product.specifications.map((s) => (
                    <li key={s} className="bg-navy px-5 py-4 flex items-start gap-3 text-sm text-bone/90">
                      <span className="mt-0.5 w-4 h-4 flex items-center justify-center bg-ember text-white skew-x shrink-0"><FiCheck className="w-2.5 h-2.5 unskew-x" /></span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Buy box */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-2 text-ember">
                {[1, 2, 3, 4, 5].map((s) => <FiStar key={s} className="w-4 h-4 fill-ember" />)}
                <span className="text-xs text-mute ml-1">5.0 · 128 reviews</span>
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-ember font-display">{product.category}</p>
              <h1 className="display text-5xl md:text-6xl mt-1">{product.name}</h1>
              <p className="mt-5 text-mute leading-relaxed">{product.description}</p>

              {product.sizes?.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display uppercase tracking-[0.25em] text-xs text-mute">Quantity</h3>
                    <span className="text-xs text-mute">{product.sizes.length} options</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {product.sizes.map((s, i) => {
                      const on = selected === i;
                      return (
                        <button key={s.label} onClick={() => setSelected(i)} className={`cut-br border px-4 py-3 text-left transition-all ${on ? "bg-ember border-ember text-white" : "border-line text-bone hover:border-mute"}`}>
                          <span className="block font-display font-bold uppercase tracking-wide">{s.label}</span>
                          <span className={`text-sm ${on ? "text-white/80" : "text-mute"}`}>€{s.price.toFixed(2)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-8 panel cut-br p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-mute font-display">Total</p>
                    <p className="display text-5xl text-bone">€{price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-mute"><FaBitcoin className="w-4 h-4 text-[#f7931a]" /> BTC</div>
                </div>
                <Link href={orderHref} className={`btn-ember w-full mt-6 ${!product.inStock ? "pointer-events-none opacity-40" : ""}`}>
                  {product.inStock ? <>Order now <FiArrowRight className="w-4 h-4" /></> : "Currently unavailable"}
                </Link>
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-mute">
                  <span className="flex items-center gap-1.5"><FaWhatsapp className="text-[#25d366]" /> WhatsApp</span>
                  <span className="w-px h-3 bg-line" />
                  <span className="flex items-center gap-1.5"><FaTelegramPlane className="text-[#2aa3e0]" /> Telegram</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-mute text-center">You&apos;ll confirm details on the next step — nothing is charged here.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

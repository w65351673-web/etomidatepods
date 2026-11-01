"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaFlask, FaVial, FaTint, FaAppleAlt, FaWhatsapp, FaTelegramPlane, FaBitcoin } from "react-icons/fa";
import { FiUser, FiMapPin, FiMessageSquare, FiAtSign, FiChevronRight, FiLoader, FiArrowLeft, FiPackage, FiShield, FiTruck } from "react-icons/fi";
import ProtectedImage from "@/components/ProtectedImage";

const WHATSAPP_NUMBER = "19852913802";
const TELEGRAM_USERNAME = "chemsolution12maa";

const icons = { powder: FaFlask, vape: FaVial, liquid: FaTint, "vape flavours": FaAppleAlt };

export default function OrderPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(0);
  const [channel, setChannel] = useState(null); // "whatsapp" | "telegram"
  const [form, setForm] = useState({ name: "", telegramUser: "", address: "", message: "" });

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        const found = data.products?.find((p) => p.slug === slug);
        setProduct(found || null);
        // If size was passed via query param
        const sizeParam = searchParams.get("size");
        if (sizeParam && found?.sizes?.length) {
          const idx = found.sizes.findIndex((s) => s.label === sizeParam);
          if (idx >= 0) setSelectedSize(idx);
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug, searchParams]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <FiLoader className="w-8 h-8 text-ember animate-spin mx-auto mb-3" />
        <p className="text-mute font-display uppercase tracking-[0.2em] text-xs">Loading…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="display text-5xl mb-6">Product not found</h1>
        <Link href="/shop" className="btn-ghost">Back to shop</Link>
      </div>
    );
  }

  const Icon = icons[product.category] || FaFlask;
  const currentPrice = product.sizes?.[selectedSize]?.price || product.price || 0;

  const getCountry = () => {
    // Prefer the last part of the shipping address (usually the country)
    const parts = form.address.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length > 1) return parts[parts.length - 1];
    // Fallback to browser locale region
    try {
      const region = (navigator.language || "").split("-")[1];
      if (region && typeof Intl.DisplayNames === "function") {
        const name = new Intl.DisplayNames(["en"], { type: "region" }).of(region.toUpperCase());
        if (name) return name;
      }
    } catch {}
    return "Not specified";
  };

  const buildOrderMessage = () => {
    const size = product.sizes?.[selectedSize]?.label || "Standard";
    return [
      "Hello EtomidatePods team! 👋",
      "",
      "I'd love to place an order through your website (etomidatepods.com):",
      "",
      `🛍️ Product: ${product.name}`,
      `📦 Quantity: ${size}`,
      `💶 Total: €${currentPrice.toFixed(2)}`,
      `💳 Payment Method: Bitcoin (BTC)`,
      "",
      "My details:",
      `👤 Name: ${form.name}`,
      channel === "telegram" ? `📱 Telegram: @${form.telegramUser.replace(/^@/, "")}` : null,
      `📍 Shipping Address: ${form.address}`,
      `🌍 Country: ${getCountry()}`,
      form.message ? `💬 Note: ${form.message}` : null,
      "",
      "Thank you so much — looking forward to your confirmation and payment details! 🙏",
    ].filter((line) => line !== null).join("\n");
  };

  const handleOrder = (e) => {
    e.preventDefault();
    const message = buildOrderMessage();
    if (channel === "whatsapp") {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      toast.success("Opening WhatsApp — send the message to confirm your order!");
    } else {
      // Telegram does not allow pre-filled text in user chat links — open the
      // chat directly and copy the order so the user can paste and send.
      if (navigator.clipboard) {
        navigator.clipboard.writeText(message).catch(() => {});
      }
      window.open(`https://t.me/${TELEGRAM_USERNAME}`, "_blank", "noopener,noreferrer");
      toast.success("Opening Telegram — your order is copied! Just paste (Ctrl+V) in the chat and send.", { duration: 6000 });
    }
  };

  const labelCls = "block font-display uppercase tracking-[0.2em] text-[10px] text-mute mb-2";

  return (
    <div className="min-h-screen bg-navy">
      <div className="relative border-b border-line bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-display text-mute mb-5">
            <Link href="/" className="hover:text-bone">Home</Link>
            <FiChevronRight className="w-3 h-3 text-ember" />
            <Link href="/shop" className="hover:text-bone">Shop</Link>
            <FiChevronRight className="w-3 h-3 text-ember" />
            <Link href={`/shop/${product.slug}`} className="hover:text-bone truncate max-w-[140px]">{product.name}</Link>
            <FiChevronRight className="w-3 h-3 text-ember" />
            <span className="text-ember">Order</span>
          </nav>
          <span className="eyebrow">Checkout</span>
          <h1 className="display text-5xl md:text-7xl mt-3">Confirm your <span className="text-ember">order.</span></h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-12 gap-10">
        {/* Summary column */}
        <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-5 space-y-5">
          <Link href={`/shop/${product.slug}`} className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.2em] text-mute hover:text-ember">
            <FiArrowLeft className="w-3.5 h-3.5" /> Back to product
          </Link>

          <div className="panel cut-tl cut-br overflow-hidden">
            <div className="relative aspect-[16/9] bg-ink image-container no-context-menu">
              {product.image ? (
                <ProtectedImage src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-grid flex items-center justify-center"><Icon className="w-16 h-16 text-ember" /></div>
              )}
            </div>
            <div className="p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-ember font-display">{product.category}</p>
              <h2 className="display text-3xl mt-1">{product.name}</h2>
              <dl className="mt-5 divide-y divide-line border-y border-line text-sm">
                <div className="flex justify-between py-3"><dt className="text-mute">Quantity</dt><dd className="font-semibold">{product.sizes?.[selectedSize]?.label || "Standard"}</dd></div>
                <div className="flex justify-between py-3"><dt className="text-mute">Payment</dt><dd className="font-semibold flex items-center gap-1.5"><FaBitcoin className="text-[#f7931a]" /> Bitcoin</dd></div>
                <div className="flex justify-between py-3"><dt className="text-mute">Shipping</dt><dd className="font-semibold">Tracked, plain packaging</dd></div>
              </dl>
              <div className="mt-5 flex items-end justify-between">
                <span className="font-display uppercase tracking-[0.25em] text-xs text-mute">Total</span>
                <span className="display text-5xl text-ember">€{currentPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {product.sizes?.length > 0 && (
            <div className="panel cut-br p-6">
              <h3 className="font-display uppercase tracking-[0.25em] text-xs text-mute mb-4">Change quantity</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.sizes.map((size, i) => {
                  const on = selectedSize === i;
                  return (
                    <button key={size.label} onClick={() => setSelectedSize(i)} className={`cut-br border px-3 py-3 text-left transition-all ${on ? "bg-ember border-ember text-white" : "border-line text-bone hover:border-mute"}`}>
                      <span className="block font-display font-bold uppercase tracking-wide text-sm">{size.label}</span>
                      <span className={`text-xs ${on ? "text-white/80" : "text-mute"}`}>€{size.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border border-line">
            {[
              { icon: FaBitcoin, label: "BTC payments" },
              { icon: FiShield, label: "Secure order" },
              { icon: FiTruck, label: "Discreet shipping" },
              { icon: FiPackage, label: "COA included" },
            ].map(({ icon: I, label }) => (
              <div key={label} className="bg-navy p-4 flex flex-col items-center gap-2 text-center">
                <I className="w-5 h-5 text-ember" />
                <span className="text-[10px] font-display uppercase tracking-[0.15em] text-mute">{label}</span>
              </div>
            ))}
          </div>
        </motion.aside>

        {/* Form column */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-7">
          <form onSubmit={handleOrder} className="panel cut-tl cut-br p-8 md:p-10 space-y-6">
            <div className="flex items-start gap-4 bg-[#f7931a]/10 border border-[#f7931a]/40 p-4">
              <FaBitcoin className="w-6 h-6 text-[#f7931a] shrink-0" />
              <p className="text-sm text-bone/90"><span className="font-bold">We accept Bitcoin (BTC) only.</span> Wallet address and payment instructions are shared in the chat after you send your order.</p>
            </div>

            <div>
              <p className="font-display uppercase tracking-[0.25em] text-xs text-ember mb-1">Step 1</p>
              <h3 className="display text-3xl mb-4">Choose a channel</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { id: "whatsapp", icon: FaWhatsapp, label: "WhatsApp", color: "#25d366" },
                  { id: "telegram", icon: FaTelegramPlane, label: "Telegram", color: "#2aa3e0" },
                ].map(({ id, icon: I, label, color }) => {
                  const on = channel === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setChannel(id)}
                      className={`cut-br flex items-center justify-center gap-3 py-4 font-display font-bold uppercase tracking-[0.1em] text-base transition-all border ${on ? "text-white" : channel ? "opacity-50 hover:opacity-90 text-bone border-line" : "text-bone border-line hover:border-mute"}`}
                      style={on ? { background: color, borderColor: color } : undefined}
                    >
                      <I className="w-5 h-5" style={!on ? { color } : undefined} /> Order via {label}
                    </button>
                  );
                })}
              </div>
              {!channel && <p className="mt-3 text-xs text-mute text-center">Each option has its own requirements — pick one to continue.</p>}
            </div>

            {channel && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                <div>
                  <p className="font-display uppercase tracking-[0.25em] text-xs text-ember mb-1">Step 2</p>
                  <h3 className="display text-3xl">Your details</h3>
                  <p className="text-xs text-mute mt-2">
                    {channel === "whatsapp"
                      ? "We need your name and shipping address — your order opens in WhatsApp ready to send."
                      : "Telegram orders need your @username so we can reply — our chat opens with your order copied, just paste and send."}
                  </p>
                </div>

                <label className="block">
                  <span className={labelCls}>Full name</span>
                  <div className="relative"><FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mute" /><input type="text" placeholder="John Doe" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="field cut-br" /></div>
                </label>

                {channel === "telegram" && (
                  <label className="block">
                    <span className={labelCls}>Telegram username</span>
                    <div className="relative"><FiAtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mute" /><input type="text" placeholder="@yourusername" required value={form.telegramUser} onChange={(e) => setForm({ ...form, telegramUser: e.target.value })} className="field cut-br" /></div>
                  </label>
                )}

                <label className="block">
                  <span className={labelCls}>Shipping address</span>
                  <div className="relative"><FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mute" /><input type="text" placeholder="123 Main St, Berlin, Germany" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="field cut-br" /></div>
                </label>

                <label className="block">
                  <span className={labelCls}>Message <span className="normal-case tracking-normal">(optional)</span></span>
                  <div className="relative"><FiMessageSquare className="absolute left-3.5 top-4 w-4 h-4 text-mute" /><textarea placeholder="Any special requests or questions…" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="field cut-br resize-none" /></div>
                </label>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 text-white font-display font-bold uppercase tracking-[0.1em] py-4 cut-br transition-all hover:brightness-110"
                  style={{ background: channel === "whatsapp" ? "#25d366" : "#2aa3e0" }}
                >
                  {channel === "whatsapp" ? <FaWhatsapp className="w-5 h-5" /> : <FaTelegramPlane className="w-5 h-5" />}
                  Send order on {channel === "whatsapp" ? "WhatsApp" : "Telegram"} — €{currentPrice.toFixed(2)}
                </button>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}

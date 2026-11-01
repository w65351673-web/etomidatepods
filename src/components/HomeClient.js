"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowUpRight, FiStar, FiCheck } from "react-icons/fi";
import { HiOutlineBeaker, HiOutlineTruck, HiOutlineGlobe, HiOutlineShieldCheck } from "react-icons/hi";
import { BsHeadset, BsBoxSeam } from "react-icons/bs";
import { FaFlask, FaVial, FaTint, FaAppleAlt, FaWhatsapp, FaTelegramPlane, FaBitcoin } from "react-icons/fa";
import gsap from "gsap";
import ProtectedImage from "@/components/ProtectedImage";
import { LogoMark } from "@/components/Logo";

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] } }),
};

const categoryMeta = {
  powder: { label: "Powder / Crystal", short: "Powder", icon: FaFlask, blurb: "Micronised, HPLC-verified etomidate crystal for lab work." },
  vape: { label: "K-Pods / Vape", short: "K-Pods", icon: FaVial, blurb: "Pre-filled pods with precise, degradation-free dosing." },
  liquid: { label: "Liquid", short: "Liquid", icon: FaTint, blurb: "Stable solutions in sealed amber vials, ready to use." },
  "vape flavours": { label: "Vape Flavours", short: "Flavours", icon: FaAppleAlt, blurb: "Flavoured pod range for compliance and preference studies." },
};
const categoryOrder = ["vape", "powder", "liquid", "vape flavours"];

const ticker = ["≥99.8% purity", "COA with every batch", "Ships within 24h", "50+ countries", "Plain packaging", "Bitcoin accepted", "Human support 24/7"];

export default function HomeClient({ products = [], siteSettings = {} }) {
  const settings = siteSettings || {};
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EtomidatePods",
    url: "https://etomidatepods.com",
    description: "Premium pharmaceutical-grade etomidate products — powder, K-Pods vape & liquid solutions.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://etomidatepods.com/shop?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero announcement={settings.announcement} subtitle={settings.heroSubtitle} productCount={products.length} />
      <Ticker />
      <CategoryBento products={products} />
      <ProductRail products={products} />
      <Process />
      <Testimonials />
      <PromiseSection />
    </>
  );
}

/* ─── Hero ─── */
function Hero({ announcement, subtitle, productCount }) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none" />
      <div className="absolute -left-40 top-1/3 w-[560px] h-[560px] rounded-full bg-ember/15 blur-[160px] ember-glow pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-12 gap-12 items-center">
        {/* Copy */}
        <div className="lg:col-span-7">
          {announcement && (
            <motion.div variants={rise} initial="hidden" animate="visible" className="inline-flex items-center gap-3 border border-ember/40 bg-ember/10 text-ember px-4 py-2 text-xs font-semibold tracking-widest uppercase mb-6 cut-tl">
              <span className="w-1.5 h-1.5 bg-ember animate-pulse" /> {announcement}
            </motion.div>
          )}
          <motion.span variants={rise} initial="hidden" animate="visible" className="eyebrow">Pharma-grade etomidate</motion.span>
          <motion.h1 variants={rise} initial="hidden" animate="visible" custom={1} className="display text-[3.4rem] sm:text-7xl lg:text-[6.5rem] mt-5">
            Built for <span className="text-ember">precision.</span>
            <br />
            <span className="outline-text">Verified</span> every batch.
          </motion.h1>
          <motion.p variants={rise} initial="hidden" animate="visible" custom={2} className="mt-7 text-lg text-mute max-w-xl leading-relaxed">
            {subtitle || "Powder, K-Pods and liquid — HPLC-tested, COA-documented and dispatched within 24 hours in plain, tracked packaging to 50+ countries."}
          </motion.p>
          <motion.div variants={rise} initial="hidden" animate="visible" custom={3} className="mt-9 flex flex-wrap gap-3">
            <Link href="/shop" className="btn-ember">Browse products <FiArrowRight className="w-4 h-4" /></Link>
            <Link href="/about" className="btn-ghost">How we test</Link>
          </motion.div>

          <motion.dl variants={rise} initial="hidden" animate="visible" custom={4} className="mt-12 grid grid-cols-3 max-w-lg divide-x divide-line border-y border-line">
            {[
              ["99.8%", "min. purity"],
              ["24h", "dispatch"],
              [productCount > 0 ? `${productCount}` : "3", "product lines"],
            ].map(([v, l]) => (
              <div key={l} className="py-5 px-4 first:pl-0">
                <dt className="display text-3xl md:text-4xl text-bone">{v}</dt>
                <dd className="text-xs uppercase tracking-[0.2em] text-mute mt-1 font-display">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Plate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -1 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] panel bg-grid cut-tl cut-br overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(236,90,14,0.35),transparent_60%)]" />
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <LogoMark className="w-full max-w-[320px] h-auto drift drop-shadow-[0_30px_40px_rgba(236,90,14,0.45)]" />
            </div>

            <Chip className="top-6 left-6" label="COA" value="Every batch" delay={0.6} />
            <Chip className="top-1/2 -translate-y-1/2 right-6" label="Purity" value="≥ 99.8%" delay={0.75} />
            <Chip className="bottom-6 left-10" label="Dispatch" value="< 24 hours" delay={0.9} />

            <div className="absolute bottom-0 left-0 right-0 h-10 bg-ember flex items-center overflow-hidden">
              <span className="font-display uppercase tracking-[0.35em] text-xs text-white/90 pl-6 whitespace-nowrap">etomidatepods &middot; research supply &middot; est. 2019</span>
            </div>
          </div>
          <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border border-ember/40 cut-tl cut-br" />
        </motion.div>
      </div>
    </section>
  );
}

function Chip({ className, label, value, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute ${className} bg-ink/85 backdrop-blur border border-line px-4 py-2.5 skew-x`}
    >
      <div className="unskew-x">
        <p className="text-[10px] uppercase tracking-[0.25em] text-ember font-display">{label}</p>
        <p className="font-display font-bold text-bone text-base leading-tight">{value}</p>
      </div>
    </motion.div>
  );
}

/* ─── Ticker ─── */
function Ticker() {
  const items = [...ticker, ...ticker];
  return (
    <div className="bg-ember text-white border-y border-ember-3 overflow-hidden -skew-y-1 origin-left">
      <div className="marquee-track py-3 skew-y-1">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 font-display font-bold uppercase tracking-[0.2em] text-sm whitespace-nowrap">
            {t} <LogoMark className="h-3.5 w-auto" color="#1b1736" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Category bento ─── */
function CategoryBento({ products }) {
  const cats = categoryOrder.map((c) => ({ key: c, ...categoryMeta[c], count: products.filter((p) => p.category === c).length }));
  return (
    <section className="relative py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow">Catalogue</span>
            <h2 className="display text-5xl md:text-6xl mt-4">Four ways to <span className="text-ember">source</span> it.</h2>
          </div>
          <Link href="/shop" className="group inline-flex items-center gap-2 font-display uppercase tracking-[0.2em] text-sm text-mute hover:text-bone">
            View all products <FiArrowUpRight className="w-4 h-4 text-ember group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cats.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div key={c.key} variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} custom={i}>
                <Link href={`/shop?category=${encodeURIComponent(c.key)}`} className={`group block panel panel-hover cut-br p-7 h-full relative overflow-hidden ${i === 0 ? "lg:row-span-1" : ""}`}>
                  <span className="absolute -right-3 -top-6 display text-[7rem] text-white/[0.035] leading-none select-none">0{i + 1}</span>
                  <div className="w-12 h-12 flex items-center justify-center bg-ember/15 border border-ember/30 text-ember mb-10 skew-x">
                    <Icon className="w-5 h-5 unskew-x" />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-mute font-display">0{i + 1} &mdash; {c.count} {c.count === 1 ? "item" : "items"}</p>
                  <h3 className="display text-3xl mt-2 text-bone group-hover:text-ember transition-colors">{c.label}</h3>
                  <p className="text-sm text-mute mt-3 leading-relaxed">{c.blurb}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.2em] text-ember">
                    Explore <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Product rail: sticky vertical tabs + grid ─── */
function ProductRail({ products }) {
  const categories = categoryOrder.filter((c) => products.some((p) => p.category === c));
  const [active, setActive] = useState(categories[0] || "powder");
  const gridRef = useRef(null);
  const list = products.filter((p) => p.category === active);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".product-card");
    gsap.killTweensOf(cards);
    gsap.fromTo(cards, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out", clearProps: "transform" });
  }, [active, list.length]);

  if (products.length === 0) {
    return (
      <section className="py-24 bg-ink border-y border-line">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="eyebrow justify-center">Products</span>
          <h2 className="display text-5xl mt-4">Catalogue loading soon</h2>
          <p className="text-mute mt-4">Reach out on WhatsApp or Telegram for current availability.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 bg-ink border-y border-line overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
        {/* Rail */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Shop</span>
            <h2 className="display text-5xl mt-4 mb-8">Pick a <span className="text-ember">format.</span></h2>
            <ul className="flex lg:flex-col gap-2 overflow-x-auto scroll-hide -mx-4 px-4 lg:mx-0 lg:px-0">
              {categories.map((c, i) => {
                const Icon = categoryMeta[c].icon;
                const on = active === c;
                return (
                  <li key={c} className="shrink-0">
                    <button
                      onClick={() => setActive(c)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 border text-left font-display uppercase tracking-[0.12em] text-sm transition-all cut-br ${
                        on ? "bg-ember border-ember text-white" : "border-line text-mute hover:text-bone hover:border-mute"
                      }`}
                    >
                      <span className={`text-[10px] ${on ? "text-white/70" : "text-ember"}`}>0{i + 1}</span>
                      <Icon className="w-4 h-4" />
                      {categoryMeta[c].short}
                      <span className="ml-auto text-xs opacity-70">{products.filter((p) => p.category === c).length}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="hidden lg:block mt-8 text-sm text-mute leading-relaxed">{categoryMeta[active]?.blurb}</p>
          </div>
        </aside>

        {/* Grid */}
        <div ref={gridRef} className="lg:col-span-9">
          <div className={`grid gap-5 ${list.length === 1 ? "sm:grid-cols-1 max-w-md" : "sm:grid-cols-2 xl:grid-cols-3"}`}>
            {list.map((p) => <ProductTile key={p._id || p.slug} product={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductTile({ product }) {
  const Icon = categoryMeta[product.category]?.icon || FaFlask;
  const from = product.sizes?.length ? Math.min(...product.sizes.map((s) => s.price || 0)) : product.price || 0;
  const to = product.sizes?.length > 1 ? Math.max(...product.sizes.map((s) => s.price || 0)) : null;
  return (
    <Link href={`/shop/${product.slug}`} className="product-card group block panel panel-hover cut-br overflow-hidden">
      <div className="relative aspect-[4/3] bg-ink image-container no-context-menu overflow-hidden">
        {product.image ? (
          <ProtectedImage src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-grid">
            <Icon className="w-16 h-16 text-ember/60" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy to-transparent" />
        <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-display uppercase tracking-[0.2em] skew-x ${product.inStock ? "bg-ember text-white" : "bg-ink text-mute border border-line"}`}>
          <span className="unskew-x inline-block">{product.inStock ? "In stock" : "Sold out"}</span>
        </span>
      </div>
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-ember font-display">{product.category}</p>
        <h3 className="display text-2xl mt-1 text-bone group-hover:text-ember transition-colors line-clamp-1">{product.name}</h3>
        <p className="text-sm text-mute mt-2 line-clamp-2 leading-relaxed">{product.shortDescription || product.description}</p>
        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-mute font-display">{to ? "From" : "Price"}</p>
            <p className="display text-2xl text-bone">€{from.toFixed(2)}{to && to !== from && <span className="text-mute text-base not-italic font-sans font-medium"> – €{to.toFixed(2)}</span>}</p>
          </div>
          <span className="w-10 h-10 flex items-center justify-center bg-ember text-white skew-x group-hover:bg-ember-2 transition-colors">
            <FiArrowUpRight className="w-4 h-4 unskew-x" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Process ─── */
function Process() {
  const steps = [
    { icon: HiOutlineBeaker, title: "Choose the format", text: "Pick powder, K-Pods, liquid or flavoured pods and select your quantity." },
    { icon: FaWhatsapp, title: "Send the order", text: "One tap opens WhatsApp or Telegram with your order pre-filled." },
    { icon: FaBitcoin, title: "Pay in Bitcoin", text: "We confirm stock and share the wallet address in the same chat." },
    { icon: HiOutlineTruck, title: "Tracked delivery", text: "Plain packaging dispatched within 24h, tracking number shared." },
  ];
  return (
    <section className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="eyebrow">Process</span>
          <h2 className="display text-5xl md:text-6xl mt-4">From message to <span className="text-ember">mailbox.</span></h2>
        </div>
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.li key={s.title} variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} className="relative bg-navy p-8 group">
                <div className="flex items-center justify-between mb-10">
                  <span className="display text-5xl text-ember">0{i + 1}</span>
                  <Icon className="w-6 h-6 text-mute group-hover:text-ember transition-colors" />
                </div>
                <h3 className="font-display font-bold uppercase tracking-wide text-xl text-bone">{s.title}</h3>
                <p className="text-sm text-mute mt-3 leading-relaxed">{s.text}</p>
                {i < steps.length - 1 && <FiArrowRight className="hidden lg:block absolute top-1/2 -right-3 w-5 h-5 text-ember bg-navy z-10" />}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ─── Testimonials: horizontal snap ─── */
function Testimonials() {
  const reviews = [
    { name: "Dr. Elena Kowalski", role: "Pharmacology dept.", text: "Five years of consistent quality. Their powder has become the gold standard for our department. Documentation is always thorough." },
    { name: "Prof. James Morrison", role: "Clinical research", text: "The K-Pod range is a breakthrough for compliance studies. Precise dosing, no degradation, and shipping is genuinely discreet." },
    { name: "Dr. Amara Okafor", role: "University lab, Lagos", text: "International shipping used to be a nightmare. Customs paperwork is handled perfectly. Products arrive intact, every single time." },
    { name: "Dr. Lars Jensen", role: "Private research facility", text: "Their liquid solutions saved our timeline. Other suppliers had months of backlog. EtomidatePods delivered in 72 hours." },
    { name: "Prof. Maria Santos", role: "Ethics board liaison", text: "The HPLC certificates are accepted by our board without question. That level of transparency is rare in this industry." },
  ];
  return (
    <section className="py-24 bg-ink border-y border-line overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="eyebrow">Field notes</span>
          <h2 className="display text-5xl md:text-6xl mt-4">What labs <span className="text-ember">say.</span></h2>
        </div>
        <div className="flex items-center gap-1 text-ember">
          {[1, 2, 3, 4, 5].map((s) => <FiStar key={s} className="w-5 h-5 fill-ember" />)}
          <span className="ml-3 text-sm text-mute">5.0 average &middot; 128 reviews</span>
        </div>
      </div>
      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-hide px-4 sm:px-6 lg:px-[max(1rem,calc((100vw-80rem)/2+2rem))] pb-4">
        {reviews.map((r, i) => (
          <motion.figure
            key={r.name}
            variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
            className="snap-start shrink-0 w-[85vw] sm:w-[420px] panel cut-br p-8 flex flex-col"
          >
            <span className="display text-6xl text-ember/40 leading-none">&ldquo;</span>
            <blockquote className="text-bone/90 leading-relaxed -mt-4 flex-1">{r.text}</blockquote>
            <figcaption className="mt-8 pt-5 border-t border-line flex items-center gap-4">
              <span className="w-11 h-11 skew-x bg-ember/15 border border-ember/40 flex items-center justify-center font-display font-bold text-ember">
                <span className="unskew-x">{r.name.split(" ").pop().charAt(0)}</span>
              </span>
              <span>
                <p className="font-display font-bold uppercase tracking-wide text-bone">{r.name}</p>
                <p className="text-xs text-mute">{r.role}</p>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

/* ─── Promise ─── */
function PromiseSection() {
  const points = [
    { icon: HiOutlineShieldCheck, title: "Triple-verified", text: "HPLC, GC-MS and NMR on every lot. Certificates travel with the parcel." },
    { icon: BsBoxSeam, title: "Zero-trace packaging", text: "Vacuum-sealed, tamper-evident, unmarked. No logos, no labels." },
    { icon: HiOutlineGlobe, title: "50+ countries", text: "Customs-compliant paperwork and tracked routes on every continent." },
    { icon: BsHeadset, title: "People, not bots", text: "Chemists and logistics staff reply on WhatsApp and Telegram." },
  ];
  return (
    <section className="relative py-24 bg-navy overflow-hidden">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-grid bg-grid-fade opacity-80 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start">
        <motion.div variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="eyebrow">Our promise</span>
          <h2 className="display text-5xl md:text-7xl mt-4">
            Transparency is the <span className="text-ember">product.</span>
          </h2>
          <p className="mt-7 text-lg text-mute leading-relaxed max-w-lg">
            Since 2019 we have served more than 2,000 research facilities. The compound is only half the job — the paperwork, packaging and people are the rest.
          </p>
          <ul className="mt-8 space-y-3">
            {["Certificate of analysis in every parcel", "Batch numbers traceable on request", "Re-test or replacement if spec is not met"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm text-bone/90">
                <span className="w-5 h-5 flex items-center justify-center bg-ember text-white skew-x"><FiCheck className="w-3 h-3 unskew-x" /></span> {t}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="https://wa.me/19852913802" target="_blank" rel="noopener noreferrer" className="btn-ember"><FaWhatsapp className="w-4 h-4" /> Talk to us</a>
            <a href="https://t.me/chemsolution12maa" target="_blank" rel="noopener noreferrer" className="btn-ghost"><FaTelegramPlane className="w-4 h-4" /> Telegram</a>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title} variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} className={`panel panel-hover cut-tl p-7 ${i % 2 === 1 ? "sm:translate-y-8" : ""}`}>
                <Icon className="w-7 h-7 text-ember" />
                <h3 className="font-display font-bold uppercase tracking-wide text-xl text-bone mt-6">{p.title}</h3>
                <p className="text-sm text-mute mt-2 leading-relaxed">{p.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaFlask, FaVial, FaTint, FaAppleAlt } from "react-icons/fa";
import { FiChevronRight, FiSearch, FiX, FiGrid, FiList } from "react-icons/fi";
import gsap from "gsap";
import { ProductTile } from "@/components/HomeClient";
import ProductCard from "@/components/ProductCard";

const categoryInfo = {
  powder: { label: "Powder / Crystal", icon: FaFlask, desc: "High-purity etomidate crystal for research and clinical use." },
  vape: { label: "K-Pods / Vape", icon: FaVial, desc: "Precision-formulated cartridges and K-Pod systems." },
  liquid: { label: "Liquid", icon: FaTint, desc: "Pharmaceutical-grade liquid solutions in sealed vials." },
  "vape flavours": { label: "Vape Flavours", icon: FaAppleAlt, desc: "Flavoured pod range in fruit and specialty profiles." },
};
const order = ["powder", "vape", "liquid", "vape flavours"];

export default function ShopClient({ products }) {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(() => searchParams?.get("category") || "all");
  const [query, setQuery] = useState(searchParams?.get("q") || "");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");
  const [stockOnly, setStockOnly] = useState(false);
  const gridRef = useRef(null);

  const categories = order.filter((c) => products.some((p) => p.category === c));

  const visible = useMemo(() => {
    let list = products.filter((p) => (filter === "all" || p.category === filter));
    if (stockOnly) list = list.filter((p) => p.inStock);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || (p.shortDescription || "").toLowerCase().includes(q));
    }
    const price = (p) => (p.sizes?.length ? Math.min(...p.sizes.map((s) => s.price || 0)) : p.price || 0);
    if (sort === "low") list = [...list].sort((a, b) => price(a) - price(b));
    if (sort === "high") list = [...list].sort((a, b) => price(b) - price(a));
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, filter, query, sort, stockOnly]);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".product-card");
    gsap.killTweensOf(cards);
    gsap.fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power3.out", clearProps: "transform" });
  }, [visible, view]);

  const active = filter !== "all" ? categoryInfo[filter] : null;

  return (
    <div className="min-h-screen bg-navy">
      {/* Header band */}
      <div className="relative overflow-hidden border-b border-line bg-ink">
        <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-display text-mute mb-6">
            <Link href="/" className="hover:text-bone">Home</Link>
            <FiChevronRight className="w-3 h-3 text-ember" />
            <span className="text-bone">Shop</span>
            {active && (<><FiChevronRight className="w-3 h-3 text-ember" /><span className="text-ember">{active.label}</span></>)}
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <span className="eyebrow">{active ? "Category" : "Full catalogue"}</span>
              <h1 className="display text-6xl md:text-7xl mt-4">{active ? active.label : <>All <span className="text-ember">products.</span></>}</h1>
              <p className="mt-4 text-mute max-w-xl">{active ? active.desc : "Lab-tested, COA-certified etomidate in every format. Dispatched within 24h in plain packaging."}</p>
            </div>
            <div className="relative w-full lg:w-80">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mute" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" className="field cut-br" />
              {query && <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-mute hover:text-bone"><FiX /></button>}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-12 gap-10">
        {/* Sidebar filters */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28 space-y-8">
            <div>
              <h3 className="font-display uppercase tracking-[0.25em] text-xs text-ember mb-4">Category</h3>
              <ul className="flex lg:flex-col gap-2 overflow-x-auto scroll-hide -mx-4 px-4 lg:mx-0 lg:px-0">
                <FilterBtn on={filter === "all"} onClick={() => setFilter("all")} label="Everything" count={products.length} />
                {categories.map((c) => {
                  const Icon = categoryInfo[c].icon;
                  return <FilterBtn key={c} on={filter === c} onClick={() => setFilter(c)} label={categoryInfo[c].label} count={products.filter((p) => p.category === c).length} icon={<Icon className="w-4 h-4" />} />;
                })}
              </ul>
            </div>

            <div>
              <h3 className="font-display uppercase tracking-[0.25em] text-xs text-ember mb-4">Sort</h3>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="field field-plain cut-br cursor-pointer">
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <span className={`w-10 h-6 flex items-center px-1 transition-colors ${stockOnly ? "bg-ember" : "bg-navy-3"}`} onClick={() => setStockOnly(!stockOnly)}>
                <span className={`w-4 h-4 bg-white transition-transform ${stockOnly ? "translate-x-4" : ""}`} />
              </span>
              <span className="text-sm text-mute">In stock only</span>
            </label>

            <div className="hidden lg:block panel cut-tl p-5">
              <p className="font-display uppercase tracking-[0.2em] text-xs text-ember">Bulk pricing</p>
              <p className="text-sm text-mute mt-2 leading-relaxed">Ordering for a facility? Message us for wholesale tiers and consolidated shipping.</p>
              <Link href="/contact" className="mt-4 inline-flex text-sm font-display uppercase tracking-[0.15em] text-bone hover:text-ember">Request a quote →</Link>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="lg:col-span-9">
          <div className="flex items-center justify-between mb-6 text-sm text-mute">
            <span><span className="text-bone font-semibold">{visible.length}</span> {visible.length === 1 ? "product" : "products"}</span>
            <div className="flex items-center gap-1 border border-line">
              <button onClick={() => setView("grid")} className={`p-2 ${view === "grid" ? "bg-ember text-white" : "hover:text-bone"}`} aria-label="Grid view"><FiGrid /></button>
              <button onClick={() => setView("list")} className={`p-2 ${view === "list" ? "bg-ember text-white" : "hover:text-bone"}`} aria-label="List view"><FiList /></button>
            </div>
          </div>

          <div ref={gridRef}>
            {visible.length === 0 ? (
              <div className="panel cut-br p-16 text-center">
                <p className="display text-3xl">Nothing matches.</p>
                <p className="text-mute mt-2 text-sm">Try a different category or clear your search.</p>
                <button onClick={() => { setFilter("all"); setQuery(""); setStockOnly(false); }} className="btn-ghost mt-6 !py-2.5 text-sm">Reset filters</button>
              </div>
            ) : view === "grid" ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {visible.map((p) => <ProductTile key={p._id} product={p} />)}
              </div>
            ) : (
              <div className="space-y-4">
                {visible.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterBtn({ on, onClick, label, count, icon }) {
  return (
    <li className="shrink-0">
      <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 border text-left font-display uppercase tracking-[0.12em] text-sm transition-all cut-br ${on ? "bg-ember border-ember text-white" : "border-line text-mute hover:text-bone hover:border-mute"}`}>
        {icon}
        {label}
        <span className={`ml-auto text-xs ${on ? "text-white/70" : "opacity-60"}`}>{count}</span>
      </button>
    </li>
  );
}

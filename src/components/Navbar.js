"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";
import { FiArrowUpRight, FiShoppingBag } from "react-icons/fi";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import Logo, { LogoMark } from "@/components/Logo";

const links = [
  { href: "/", label: "Home", num: "01" },
  { href: "/shop", label: "Shop", num: "02" },
  { href: "/about", label: "About", num: "03" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <>
      {/* Top strip */}
      <div className="bg-ember text-white text-[11px] font-semibold tracking-[0.25em] uppercase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between font-display">
          <span className="truncate">Lab-tested &middot; COA on every batch &middot; Ships in 24h</span>
          <span className="hidden sm:flex items-center gap-4">
            <a href="https://t.me/chemsolution12maa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-ink transition-colors"><FaTelegramPlane /> Telegram</a>
            <a href="https://wa.me/19852913802" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-ink transition-colors"><FaWhatsapp /> WhatsApp</a>
          </span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled ? "bg-ink/90 backdrop-blur-xl border-line" : "bg-navy border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo mark="h-9 w-auto" text="text-[22px]" />

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center">
              <ul className="flex items-center gap-1 panel px-2 py-1.5 slant">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`relative flex items-baseline gap-1.5 px-4 py-2 font-display uppercase tracking-[0.12em] text-sm font-semibold transition-colors ${
                        isActive(l.href) ? "text-white" : "text-mute hover:text-white"
                      }`}
                    >
                      <span className="text-[10px] text-ember">{l.num}</span>
                      {l.label}
                      {isActive(l.href) && (
                        <motion.span layoutId="nav-underline" className="absolute left-4 right-4 -bottom-0.5 h-0.5 bg-ember" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/shop" className="btn-ember hidden sm:inline-flex !py-2.5 !px-5 text-sm">
                <FiShoppingBag className="w-4 h-4" /> Order Now
              </Link>
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden w-11 h-11 flex items-center justify-center border border-line text-bone hover:border-ember transition-colors"
                aria-label="Open menu"
              >
                <HiOutlineMenuAlt4 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-navy border-l border-line bg-grid flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-20 border-b border-line">
                <Logo mark="h-8 w-auto" text="text-xl" />
                <button onClick={() => setOpen(false)} className="w-11 h-11 flex items-center justify-center border border-line hover:border-ember" aria-label="Close menu">
                  <HiX className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 px-6 py-8 flex flex-col gap-2">
                {links.map((l, i) => (
                  <motion.div key={l.href} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.08 + i * 0.06 }}>
                    <Link
                      href={l.href}
                      className={`group flex items-center justify-between border-b border-line py-4 display text-4xl ${
                        isActive(l.href) ? "text-ember" : "text-bone hover:text-ember"
                      }`}
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="text-xs not-italic font-sans font-semibold tracking-widest text-mute">{l.num}</span>
                        {l.label}
                      </span>
                      <FiArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="px-6 pb-8 space-y-4">
                <Link href="/shop" className="btn-ember w-full">
                  <FiShoppingBag className="w-4 h-4" /> Order Now
                </Link>
                <div className="flex items-center justify-between text-xs text-mute">
                  <span className="flex items-center gap-2"><LogoMark className="h-4 w-auto" /> EtomidatePods</span>
                  <span className="flex items-center gap-3">
                    <a href="https://t.me/chemsolution12maa" target="_blank" rel="noopener noreferrer" className="hover:text-ember"><FaTelegramPlane className="w-4 h-4" /></a>
                    <a href="https://wa.me/19852913802" target="_blank" rel="noopener noreferrer" className="hover:text-ember"><FaWhatsapp className="w-4 h-4" /></a>
                  </span>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

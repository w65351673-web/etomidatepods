import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { FaTelegramPlane, FaWhatsapp, FaBitcoin } from "react-icons/fa";
import Logo, { LogoMark } from "@/components/Logo";

const shopLinks = [
  { href: "/shop", label: "All products" },
  { href: "/shop?category=powder", label: "Powder / Crystal" },
  { href: "/shop?category=vape", label: "K-Pods (Vape)" },
  { href: "/shop?category=liquid", label: "Liquid" },
  { href: "/shop?category=vape%20flavours", label: "Vape flavours" },
];

const companyLinks = [
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
  { href: "/contact", label: "Bulk & wholesale" },
  { href: "/contact", label: "Shipping & FAQ" },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto bg-ink border-t border-line overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-70 pointer-events-none" />
      <div className="absolute -right-20 -bottom-24 w-[520px] opacity-[0.05] pointer-events-none">
        <LogoMark className="w-full h-auto" color="#ffffff" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA row */}
        <div className="py-12 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-end border-b border-line">
          <div>
            <span className="eyebrow">Ready when you are</span>
            <h2 className="display text-4xl md:text-6xl mt-4">
              Order in <span className="text-ember">two taps.</span>
              <br />
              <span className="outline-text">WhatsApp or Telegram.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a href="https://wa.me/13468721280" target="_blank" rel="noopener noreferrer" className="btn-ember"><FaWhatsapp className="w-4 h-4" /> WhatsApp</a>
            <a href="https://t.me/Zhong5cla" target="_blank" rel="noopener noreferrer" className="btn-ghost"><FaTelegramPlane className="w-4 h-4" /> Telegram</a>
          </div>
        </div>

        {/* Link columns */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-6">
            <Logo mark="h-10 w-auto" text="text-2xl" />
            <p className="mt-5 text-sm text-mute leading-relaxed max-w-sm">
              EtomidatePods supplies lab-verified etomidate powder, K-Pods and liquid to research buyers worldwide.
              Every batch ships with a certificate of analysis in plain, tracked packaging.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-mute">
              <FaBitcoin className="w-4 h-4 text-[#f7931a]" /> Bitcoin accepted
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display uppercase tracking-[0.25em] text-xs text-ember mb-5">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="group inline-flex items-center gap-2 text-sm text-mute hover:text-bone transition-colors">
                    {l.label}
                    <FiArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-ember" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display uppercase tracking-[0.25em] text-xs text-ember mb-5">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-mute hover:text-bone transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="py-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-mute">
          <span>&copy; {new Date().getFullYear()} EtomidatePods. All rights reserved.</span>
          <span className="font-display uppercase tracking-[0.25em]">For research use only</span>
        </div>
      </div>
    </footer>
  );
}

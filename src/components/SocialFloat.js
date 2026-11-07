"use client";
import { useState } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

const links = [
  { label: "Telegram", href: "https://t.me/Zhong5cla", icon: FaTelegramPlane, color: "#2aa3e0" },
  { label: "WhatsApp", href: "https://wa.me/13468721280", icon: FaWhatsapp, color: "#25d366" },
];

export default function SocialFloat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col-reverse items-start gap-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 flex items-center justify-center skew-x transition-all duration-300 border"
        style={{ background: open ? "#0f0c21" : "#ec5a0e", borderColor: open ? "#342e63" : "#ec5a0e", color: "#fff" }}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
      >
        <span className="unskew-x">{open ? <FiX className="w-6 h-6" /> : <FiMessageCircle className="w-6 h-6" />}</span>
      </button>

      {open && (
        <div className="flex flex-col items-start gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3"
              >
                <span
                  className="w-12 h-12 flex items-center justify-center skew-x border"
                  style={{ background: `${link.color}1a`, borderColor: `${link.color}66`, color: link.color }}
                >
                  <Icon className="w-5 h-5 unskew-x" />
                </span>
                <span className="bg-ink border border-line text-bone text-xs font-display uppercase tracking-[0.15em] px-3 py-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

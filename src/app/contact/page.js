"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FiUser, FiSend, FiMessageSquare, FiLoader, FiCheckCircle, FiArrowRight, FiArrowUpRight, FiClock } from "react-icons/fi";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

const faqs = [
  { q: "How long does shipping take?", a: "Orders are processed within 72h. Standard delivery is 3–7 business days within Europe; 7–14 days elsewhere." },
  { q: "Do you offer bulk pricing?", a: "Yes. Tell us your quantities and destination and we'll send a wholesale quote with consolidated shipping." },
  { q: "Is shipping discreet?", a: "Always. Plain, unmarked packaging with no product references, vacuum-sealed and tamper-evident." },
  { q: "What payment methods do you accept?", a: "Bitcoin (BTC). The wallet address is shared in chat after your order is confirmed." },
];

function Field({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mute" />
      <input {...props} className="field cut-br" />
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name, contact: form.phone, subject: form.subject, message: form.message }) });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", phone: "", subject: "", message: "" });
        toast.success("Message sent successfully!");
      } else toast.error("Failed to send message.");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const channels = [
    { icon: FaWhatsapp, label: "WhatsApp", value: "+1 346 872 1280", note: "Fastest — usually under 2h", href: "https://wa.me/13468721280", accent: "#25d366" },
    { icon: FaTelegramPlane, label: "Telegram", value: "@Zhong5cla", note: "Order is copied for you to paste", href: "https://t.me/Zhong5cla", accent: "#2aa3e0" },
  ];

  return (
    <div className="bg-navy">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-line bg-ink">
        <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="eyebrow">Contact</span>
            <h1 className="display text-6xl md:text-8xl mt-5">Talk to a <span className="text-ember">human.</span></h1>
            <p className="mt-6 text-lg text-mute max-w-2xl">Orders, bulk quotes, shipping questions or technical guidance — pick a channel. Chat apps are fastest; the form reaches the same team.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-12 gap-12">
        {/* Left: channels + FAQ */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-3">
            {channels.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="group panel panel-hover cut-br flex items-center gap-5 p-5"
                >
                  <span className="w-12 h-12 shrink-0 flex items-center justify-center skew-x" style={{ background: `${c.accent}22`, border: `1px solid ${c.accent}66`, color: c.accent }}>
                    <Icon className="w-5 h-5 unskew-x" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-display uppercase tracking-[0.2em] text-xs text-mute">{c.label}</span>
                    <span className="block font-display font-bold text-xl text-bone truncate">{c.value}</span>
                    <span className="block text-xs text-mute">{c.note}</span>
                  </span>
                  <FiArrowUpRight className="w-5 h-5 text-ember opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              );
            })}
          </div>

          <div className="panel cut-tl p-6 flex items-center gap-5">
            <span className="w-14 h-14 shrink-0 flex items-center justify-center bg-ember text-white skew-x"><FiClock className="w-6 h-6 unskew-x" /></span>
            <div>
              <p className="font-display uppercase tracking-[0.2em] text-xs text-mute">Average response</p>
              <p className="display text-4xl text-bone">&lt; 2 hours</p>
            </div>
          </div>

          <div>
            <h3 className="eyebrow mb-5">Common questions</h3>
            <div className="border-t border-line">
              {faqs.map((f, i) => {
                const on = openFaq === i;
                return (
                  <div key={f.q} className="border-b border-line">
                    <button onClick={() => setOpenFaq(on ? -1 : i)} className="w-full flex items-center justify-between gap-4 py-4 text-left">
                      <span className={`font-display font-semibold uppercase tracking-wide ${on ? "text-ember" : "text-bone"}`}>{f.q}</span>
                      <span className={`display text-2xl transition-transform ${on ? "rotate-45 text-ember" : "text-mute"}`}>+</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden text-sm text-mute leading-relaxed pb-4">
                          {f.a}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="panel cut-tl cut-br p-14 text-center">
                <span className="mx-auto w-20 h-20 flex items-center justify-center bg-ember text-white skew-x"><FiCheckCircle className="w-9 h-9 unskew-x" /></span>
                <h2 className="display text-5xl mt-8">Message received.</h2>
                <p className="text-mute mt-3 max-w-sm mx-auto">Thanks for reaching out — the team will reply within 24 hours.</p>
                <button onClick={() => setSent(false)} className="btn-ghost mt-8">Send another <FiArrowRight className="w-4 h-4" /></button>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} onSubmit={handleSubmit} className="panel cut-tl cut-br p-8 md:p-10">
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <p className="font-display uppercase tracking-[0.25em] text-xs text-ember">Written enquiry</p>
                    <h2 className="display text-4xl mt-1">Send a message</h2>
                  </div>
                  <span className="hidden sm:block text-xs text-mute">* required</span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block font-display uppercase tracking-[0.2em] text-[10px] text-mute mb-2">Full name *</span>
                    <Field icon={FiUser} type="text" required placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="block font-display uppercase tracking-[0.2em] text-[10px] text-mute mb-2">WhatsApp / Telegram *</span>
                    <Field icon={FaWhatsapp} type="text" required placeholder="+1 555 123 4567 or @username" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="block font-display uppercase tracking-[0.2em] text-[10px] text-mute mb-2">Subject *</span>
                    <Field icon={FiMessageSquare} type="text" required placeholder="Bulk quote, shipping, COA…" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                  </label>
                </div>

                <label className="block mt-4">
                  <span className="block font-display uppercase tracking-[0.2em] text-[10px] text-mute mb-2">Message *</span>
                  <div className="relative">
                    <FiSend className="absolute left-3.5 top-4 w-4 h-4 text-mute" />
                    <textarea required rows={6} maxLength={1000} placeholder="Tell us what you need…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="field cut-br resize-none" />
                    <span className="absolute bottom-3 right-3 text-[10px] text-mute">{form.message.length}/1000</span>
                  </div>
                </label>

                <button type="submit" disabled={submitting} className="btn-ember w-full mt-6 disabled:opacity-50">
                  {submitting ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiSend className="w-4 h-4" />}
                  {submitting ? "Sending…" : "Send message"}
                </button>
                <p className="mt-4 text-center text-xs text-mute">Encrypted in transit &middot; Never shared &middot; Reply within 24h</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

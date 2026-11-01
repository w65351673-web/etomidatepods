"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineBeaker, HiOutlineShieldCheck } from "react-icons/hi";
import { BsBoxSeam, BsPeople } from "react-icons/bs";
import { FiTarget, FiArrowRight } from "react-icons/fi";
import { LogoMark } from "@/components/Logo";

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

const pillars = [
  { icon: FiTarget, title: "Our mission", text: "Founded in 2019 from a simple observation: researchers needed a supplier they could trust. We bridge pharmaceutical manufacturers and research facilities so scientists get verified, high-purity compounds without the usual friction." },
  { icon: HiOutlineShieldCheck, title: "Quality without compromise", text: "Every product passes HPLC purity verification, GC-MS contaminant screening and NMR structural confirmation. We don't just meet industry standards — we exceed them, and every shipment includes a full certificate of analysis." },
  { icon: BsBoxSeam, title: "Discretion as standard", text: "Vacuum-sealed inner containers, tamper-evident seals and plain outer packaging with no identifying marks. Whether shipping to a university lab or private facility, your order arrives securely and confidentially." },
  { icon: BsPeople, title: "Scientists supporting scientists", text: "No outsourced call centre. You speak directly with people who understand chemistry, protocols and logistics. Need help choosing a format or storage conditions? We collaborate, not just transact." },
];

const timeline = [
  { year: "2019", text: "EtomidatePods founded; first powder batches shipped to EU labs." },
  { year: "2020", text: "Liquid solutions added. COA on every parcel becomes policy." },
  { year: "2022", text: "K-Pods line launched after 18 months of stability testing." },
  { year: "2024", text: "2,000+ facilities served across 50+ countries." },
];

export default function AboutClient({ aboutText }) {
  return (
    <div className="bg-navy">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-ink">
        <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none" />
        <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-[560px] opacity-[0.06] pointer-events-none"><LogoMark className="w-full h-auto" color="#fff" /></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-12 gap-10 items-end">
          <motion.div variants={rise} initial="hidden" animate="visible" className="lg:col-span-8">
            <span className="eyebrow">Who we are</span>
            <h1 className="display text-6xl md:text-8xl mt-5">
              Supply you can <span className="text-ember">cite.</span>
            </h1>
            <p className="mt-7 text-lg text-mute max-w-2xl leading-relaxed">
              EtomidatePods is a research-supply house for verified etomidate compounds — powder, K-Pods and liquid — serving laboratories, universities and private facilities worldwide.
            </p>
          </motion.div>
          <motion.dl variants={rise} initial="hidden" animate="visible" custom={2} className="lg:col-span-4 grid grid-cols-2 gap-px bg-line border border-line">
            {[["5+", "years active"], ["2000+", "research partners"], ["50+", "countries"], ["99.8%", "purity floor"]].map(([v, l]) => (
              <div key={l} className="bg-ink p-5">
                <dt className="display text-4xl text-ember">{v}</dt>
                <dd className="text-[10px] uppercase tracking-[0.25em] text-mute font-display mt-1">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* Admin-editable statement */}
      {aboutText && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.blockquote variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative panel cut-tl cut-br p-10 md:p-14 border-l-4 border-l-ember">
            <span className="display text-8xl text-ember/30 absolute top-4 left-8 leading-none">&ldquo;</span>
            <p className="relative display text-3xl md:text-4xl text-bone/95 normal-case not-italic font-semibold leading-snug tracking-normal">{aboutText}</p>
          </motion.blockquote>
        </section>
      )}

      {/* Pillars — alternating rows */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-px">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div key={p.title} variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="group grid md:grid-cols-12 gap-6 md:gap-10 py-10 border-t border-line last:border-b items-start">
              <div className="md:col-span-1 display text-4xl text-ember">0{i + 1}</div>
              <div className="md:col-span-4 flex items-center gap-4">
                <span className="w-12 h-12 shrink-0 flex items-center justify-center bg-ember/10 border border-ember/30 text-ember skew-x"><Icon className="w-5 h-5 unskew-x" /></span>
                <h2 className="display text-3xl text-bone group-hover:text-ember transition-colors">{p.title}</h2>
              </div>
              <p className="md:col-span-7 text-mute leading-relaxed">{p.text}</p>
            </motion.div>
          );
        })}
      </section>

      {/* Timeline */}
      <section className="bg-ink border-y border-line py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="eyebrow">Track record</span>
          <h2 className="display text-5xl md:text-6xl mt-4 mb-12">Five years, <span className="text-ember">zero shortcuts.</span></h2>
          <ol className="grid md:grid-cols-4 gap-6 relative">
            <span className="hidden md:block absolute top-3 left-0 right-0 h-px bg-line" />
            {timeline.map((t, i) => (
              <motion.li key={t.year} variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} className="relative md:pt-10">
                <span className="hidden md:block absolute top-0 left-0 w-6 h-6 bg-ember skew-x" />
                <p className="display text-4xl text-ember">{t.year}</p>
                <p className="text-sm text-mute mt-2 leading-relaxed">{t.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative bg-ember cut-tl cut-br p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8 overflow-hidden">
          <LogoMark className="absolute -right-8 -bottom-10 h-56 w-auto opacity-20" color="#1b1736" />
          <div className="relative">
            <p className="font-display uppercase tracking-[0.3em] text-xs text-white/80">Next step</p>
            <h2 className="display text-4xl md:text-6xl text-white mt-2">See the catalogue.</h2>
          </div>
          <Link href="/shop" className="relative inline-flex items-center gap-3 bg-ink text-bone font-display font-bold uppercase tracking-[0.1em] px-8 py-4 cut-br hover:bg-navy-2 transition-colors">
            Browse products <FiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

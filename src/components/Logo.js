import Link from "next/link";

/* Orange stepped "E" mark — three slanted bars joined by a leaning spine */
export function LogoMark({ className = "h-10 w-auto", color = "#ec5a0e" }) {
  return (
    <svg viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <polygon points="78,38 163.4,38 170,20 84.5,20" fill={color} />
      <polygon points="60,70 151.8,70 158.4,52 66.5,52" fill={color} />
      <polygon points="22,108 138,108 146,86 30,86" fill={color} />
      <polygon points="124,108 138,108 170,20 156,20" fill={color} />
      <polygon points="92,20 118,20 120.5,13 94.5,13" fill={color} />
      <polygon points="22,108 46,108 44,114 20,114" fill={color} opacity="0.85" />
    </svg>
  );
}

export default function Logo({ href = "/", mark = "h-10 w-auto", text = "text-2xl", light = true, className = "" }) {
  return (
    <Link href={href} className={`inline-flex items-center gap-3 group ${className}`} aria-label="EtomidatePods home">
      <LogoMark className={`${mark} transition-transform duration-300 group-hover:-translate-y-0.5`} />
      <span className={`font-display font-extrabold italic uppercase tracking-tight leading-none ${text}`}>
        <span className={light ? "text-bone" : "text-ink"}>Etomidate</span>
        <span className="text-ember">Pods</span>
      </span>
    </Link>
  );
}

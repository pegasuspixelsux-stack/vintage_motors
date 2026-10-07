import Link from "next/link";

/** Logo lockup: "Vintage Motors" in manuscript script with drop-cap initials, with a centred sans-serif CARS MARKETPLACE tagline between hairlines below. */
export default function Brand() {
  return (
    <Link
      href="/"
      aria-label="Vintage Motors - Cars Marketplace, home"
      className="flex flex-col items-center gap-1"
    >
      <span className="manuscript-text text-2xl md:text-4xl" aria-hidden>
        <span className="drop-cap text-3xl md:text-5xl">V</span>intage{" "}
        <span className="drop-cap text-3xl md:text-5xl">M</span>otors
      </span>
      <span aria-hidden className="flex w-full items-center gap-3">
        <span className="h-px flex-1 bg-gold/40" />
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400 sm:text-xs">
          Cars Marketplace
        </span>
        <span className="h-px flex-1 bg-gold/40" />
      </span>
    </Link>
  );
}

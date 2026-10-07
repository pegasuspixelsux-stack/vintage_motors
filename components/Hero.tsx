"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FileCheck, Globe, Truck } from "lucide-react";

const spring = { type: "spring", stiffness: 180, damping: 26 } as const;

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: spring },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const values = [
  {
    icon: FileCheck,
    title: "Document & Title Verified",
    note: "We collect and verify all registration, title, and historical paperwork to ensure authentic documentation before listing.",
  },
  {
    icon: Globe,
    title: "Worldwide Shipping",
    note: "Established global shipping network to export and import classic automobiles across major international ports.",
  },
  {
    icon: Truck,
    title: "Covered Port Transport",
    note: "Enclosed, white-glove ground transport from the owner or seller directly to the shipping port.",
  },
];

export default function Hero() {
  return (
    <section
      id="performance"
      className="relative isolate w-full overflow-hidden border-b border-fg/10"
    >
      <Image
        src="https://images.unsplash.com/photo-1733483873939-8a1a76ca448b?auto=format&fit=crop&w=2400&q=80"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 -scale-x-100 rounded-none object-cover"
      />
      {/* Theme-coloured overlay (light wash in light mode, dark in dark mode): heavier on the left behind the copy, fading to the page background at the bottom */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-bg/60 dark:bg-bg/30" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-bg/90 via-bg/55 to-transparent dark:from-bg/55 dark:via-bg/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-transparent to-transparent"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-20 lg:px-16 lg:pb-20 lg:pt-28"
      >
        <div className="max-w-2xl">
          <motion.p
            variants={rise}
            className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-text"
          >
            Curated Collection
          </motion.p>

          <motion.h1
            variants={rise}
            className="mb-6 font-serif text-5xl leading-[1.05] tracking-[-0.02em] md:text-6xl lg:text-7xl"
          >
            Find Your <em className="italic text-gold-text">Timeless Classic.</em>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mb-10 max-w-xl text-base leading-relaxed text-fg/70"
          >
            Curated vintage automobiles, restored to perfection. Preserved for those
            seeking automotive excellence, provenance, and mechanical artistry.
          </motion.p>

          <motion.div variants={rise} className="flex flex-wrap items-center gap-4">
            <a
              href="#inventory"
              className="rounded-none bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-[background-color,transform] duration-200 ease-out hover:bg-gold-hover active:scale-[0.97]"
            >
              Explore Inventory
            </a>
            <a
              href="#salons"
              className="rounded-none border border-fg/30 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition-[background-color,border-color,transform] duration-200 ease-out hover:border-gold hover:text-gold-text active:scale-[0.97]"
            >
              Private Salon
            </a>
          </motion.div>
        </div>

        <motion.ul
          variants={rise}
          className="mt-16 grid grid-cols-1 rounded-none border border-line bg-panel md:grid-cols-3 md:divide-x md:divide-line"
        >
          {values.map(({ icon: Icon, title, note }) => (
            <li
              key={title}
              className="flex items-start gap-4 border-b border-line p-6 last:border-b-0 md:border-b-0"
            >
              <Icon size={28} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" aria-hidden />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide">{title}</p>
                <p className="mt-2 text-xs leading-relaxed text-fg/60">{note}</p>
              </div>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}

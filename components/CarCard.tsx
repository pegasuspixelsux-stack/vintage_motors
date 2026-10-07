"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ctaFor, formatMileage, formatPrice, type Car } from "@/lib/cars";

export const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 160, damping: 24 },
  },
} as const;

export default function CarCard({ car }: { car: Car }) {
  const specs = [
    ["Engine", car.engine],
    ["Transmission", car.transmission],
    ["Mileage", formatMileage(car.mileage)],
    ["Colour", car.colour],
  ] as const;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex flex-col overflow-hidden rounded-none border border-fg/10 bg-card transition-[border-color] duration-300 hover:border-gold/50"
    >
      <div className="relative h-52 rounded-none bg-surface">
        <Image
          src={car.image}
          alt={car.title}
          fill
          sizes="(min-width: 1280px) 320px, (min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
          className="rounded-none object-cover"
        />
        <span className="absolute left-4 top-4 rounded-none bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-black">
          {car.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div>
          <h3 className="font-serif text-2xl leading-snug">{car.title}</h3>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/50">
            {car.condition} &middot; {car.location}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-4 border-y border-fg/10 py-5">
          {specs.map(([term, value]) => (
            <div key={term}>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/50">
                {term}
              </dt>
              <dd className="mt-1 text-sm text-fg/90">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/50">
              Acquisition Value
            </p>
            <p className="mt-1 text-xl font-semibold text-gold-text">{formatPrice(car.price)}</p>
          </div>
          <Link
            href="/#sign-in"
            className="rounded-none border border-fg/30 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 hover:border-gold hover:text-gold-text"
          >
            {ctaFor(car)}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

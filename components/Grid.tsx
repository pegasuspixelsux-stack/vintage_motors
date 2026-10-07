"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import CarCard from "@/components/CarCard";
import { cars, featuredCars, type Car } from "@/lib/cars";

const makeOptions = ["All Makes", "Chevrolet", "Ferrari", "Jaguar", "Mercedes-Benz", "Porsche", "Shelby"];
const eraOptions = ["All Eras", "1950s", "1960s", "1970s"];
const priceOptions = ["Any Price", "Under $200k", "$200k - $500k", "$500k+"];

interface Filters {
  query: string;
  make: string;
  era: string;
  price: string;
}

const noFilters: Filters = { query: "", make: makeOptions[0], era: eraOptions[0], price: priceOptions[0] };

function matches(car: Car, f: Filters) {
  const q = f.query.trim().toLowerCase();
  if (q && !car.title.toLowerCase().includes(q)) return false;
  if (f.make !== makeOptions[0] && car.make !== f.make) return false;
  if (f.era !== eraOptions[0] && Math.floor(car.year / 10) * 10 !== parseInt(f.era)) return false;
  if (f.price === "Under $200k" && car.price >= 200_000) return false;
  if (f.price === "$200k - $500k" && (car.price < 200_000 || car.price > 500_000)) return false;
  if (f.price === "$500k+" && car.price <= 500_000) return false;
  return true;
}

const controlClass =
  "w-full rounded-none border border-line-strong bg-bg px-3 py-3 text-sm text-fg placeholder:text-fg/40 focus:border-gold focus:outline-none";

export default function Grid() {
  const [draft, setDraft] = useState<Filters>(noFilters);
  const [applied, setApplied] = useState<Filters>(noFilters);
  const visible = featuredCars.filter((car) => matches(car, applied));

  const update = (patch: Partial<Filters>) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <section id="inventory" className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-16 lg:py-28">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="font-serif text-4xl leading-tight tracking-[-0.01em] md:text-5xl">
          Featured Vault Collection
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-fg/70">
          Hand-selected vintage masterpieces ready for immediate acquisition and private delivery.
        </p>
      </div>

      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setApplied(draft);
        }}
        className="mb-8 grid grid-cols-1 gap-3 rounded-none border border-line bg-panel p-3 md:grid-cols-6"
      >
        <div className="relative md:col-span-2">
          <label htmlFor="grid-search" className="sr-only">
            Search make, model, or year
          </label>
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg/40"
            aria-hidden
          />
          <input
            id="grid-search"
            type="search"
            value={draft.query}
            onChange={(e) => update({ query: e.target.value })}
            placeholder="Search make, model, or year..."
            className={`${controlClass} pl-10`}
          />
        </div>
        <select
          aria-label="Filter by brand"
          value={draft.make}
          onChange={(e) => update({ make: e.target.value })}
          className={controlClass}
        >
          {makeOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <select
          aria-label="Filter by era"
          value={draft.era}
          onChange={(e) => update({ era: e.target.value })}
          className={controlClass}
        >
          {eraOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <select
          aria-label="Filter by price"
          value={draft.price}
          onChange={(e) => update({ price: e.target.value })}
          className={controlClass}
        >
          {priceOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <button
          type="submit"
          aria-label="Search"
          className="flex items-center justify-center gap-2 rounded-none bg-gold px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black transition-colors duration-200 hover:bg-gold-hover"
        >
          <Search size={16} className="md:hidden" aria-hidden />
          <span className="hidden md:inline">Search</span>
        </button>
      </form>

      {visible.length === 0 && (
        <p className="rounded-none border border-line bg-panel px-6 py-10 text-center text-sm text-fg/70">
          No automobiles match those filters.
        </p>
      )}

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.07 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {visible.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </motion.div>

      <Link
        href="/inventory"
        className="mt-8 block w-full rounded-none border border-fg/15 bg-card px-6 py-5 text-center text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-200 hover:border-gold hover:text-gold-text"
      >
        Browse Complete Vault Collection ({cars.length} Automobiles)
      </Link>
    </section>
  );
}

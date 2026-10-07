"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import CarCard from "@/components/CarCard";
import FinanceSidebar from "@/components/FinanceSidebar";
import { bodyStyles, cars, conditions, locations, makes, type Car } from "@/lib/cars";

const PAGE_SIZE = 12;

const sorts = {
  newest: { label: "Year: Newest First", fn: (a: Car, b: Car) => b.year - a.year },
  oldest: { label: "Year: Oldest First", fn: (a: Car, b: Car) => a.year - b.year },
  priceAsc: { label: "Price: Low to High", fn: (a: Car, b: Car) => a.price - b.price },
  priceDesc: { label: "Price: High to Low", fn: (a: Car, b: Car) => b.price - a.price },
} as const;
type SortKey = keyof typeof sorts;

interface Filters {
  query: string;
  makes: string[];
  bodies: string[];
  conditions: string[];
  locations: string[];
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  maxMileage: string;
}

const noFilters: Filters = {
  query: "",
  makes: [],
  bodies: [],
  conditions: [],
  locations: [],
  yearMin: "",
  yearMax: "",
  priceMin: "",
  priceMax: "",
  maxMileage: "",
};

const mileageOptions = [
  { value: "", label: "Any mileage" },
  { value: "30000", label: "Under 30,000 mi" },
  { value: "50000", label: "Under 50,000 mi" },
  { value: "75000", label: "Under 75,000 mi" },
];

const labelClass = "mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/60";
const fieldClass =
  "w-full rounded-none border border-line-strong bg-bg px-3 py-2.5 text-sm text-fg placeholder:text-fg/40 focus:border-gold focus:outline-none";

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

interface CheckGroupProps {
  legend: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}

function CheckGroup({ legend, options, selected, onToggle }: CheckGroupProps) {
  return (
    <fieldset>
      <legend className={labelClass}>{legend}</legend>
      <div className="flex flex-col gap-2.5">
        {options.map((o) => (
          <label key={o} className="flex cursor-pointer items-center gap-3 text-sm text-fg/80">
            <input
              type="checkbox"
              checked={selected.includes(o)}
              onChange={() => onToggle(o)}
              className="h-4 w-4 rounded-none accent-gold"
            />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function InventoryBrowser() {
  const [filters, setFilters] = useState<Filters>(noFilters);
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);

  const update = (patch: Partial<Filters>) => {
    setFilters((f) => ({ ...f, ...patch }));
    setPage(1);
  };

  const results = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const num = (s: string) => (s === "" ? null : Number(s));
    const yearMin = num(filters.yearMin);
    const yearMax = num(filters.yearMax);
    const priceMin = num(filters.priceMin);
    const priceMax = num(filters.priceMax);
    const maxMileage = num(filters.maxMileage);

    return cars
      .filter((c) => {
        if (q && ![c.title, c.colour, c.engine].some((s) => s.toLowerCase().includes(q))) return false;
        if (filters.makes.length && !filters.makes.includes(c.make)) return false;
        if (filters.bodies.length && !filters.bodies.includes(c.body)) return false;
        if (filters.conditions.length && !filters.conditions.includes(c.condition)) return false;
        if (filters.locations.length && !filters.locations.includes(c.location)) return false;
        if (yearMin !== null && c.year < yearMin) return false;
        if (yearMax !== null && c.year > yearMax) return false;
        if (priceMin !== null && c.price < priceMin) return false;
        if (priceMax !== null && c.price > priceMax) return false;
        if (maxMileage !== null && c.mileage > maxMileage) return false;
        return true;
      })
      .sort(sorts[sort].fn);
  }, [filters, sort]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = results.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const firstShown = results.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1;

  const goTo = (p: number) => {
    setPage(p);
    document.getElementById("vault-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pageButton =
    "flex h-10 min-w-10 items-center justify-center rounded-none border px-3 text-xs font-semibold transition-colors duration-200";

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-16 lg:py-20">
      <header className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-text">
            The Vault
          </p>
          <h1 className="font-serif text-5xl leading-tight tracking-[-0.02em] md:text-6xl">
            Vault Collection
          </h1>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-fg/70">
          Every automobile in the vault, inspected, documented and ready for private delivery.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[18rem_1fr]">
        <aside aria-label="Search and financing" className="flex flex-col gap-6 lg:self-start">
          <form
            onSubmit={(e) => e.preventDefault()}
            aria-label="Advanced search"
            className="flex flex-col gap-7 rounded-none border border-line bg-panel p-5"
          >
            <div>
              <label htmlFor="inv-search" className={labelClass}>
                Keyword
              </label>
              <div className="relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg/40"
                  aria-hidden
                />
                <input
                  id="inv-search"
                  type="search"
                  value={filters.query}
                  onChange={(e) => update({ query: e.target.value })}
                  placeholder="Make, model, colour..."
                  className={`${fieldClass} pl-10`}
                />
              </div>
            </div>

            <CheckGroup
              legend="Location"
              options={locations}
              selected={filters.locations}
              onToggle={(v) => update({ locations: toggle(filters.locations, v) })}
            />
            <CheckGroup
              legend="Make"
              options={makes}
              selected={filters.makes}
              onToggle={(v) => update({ makes: toggle(filters.makes, v) })}
            />
            <CheckGroup
              legend="Condition"
              options={conditions}
              selected={filters.conditions}
              onToggle={(v) => update({ conditions: toggle(filters.conditions, v) })}
            />
            <CheckGroup
              legend="Body Style"
              options={bodyStyles}
              selected={filters.bodies}
              onToggle={(v) => update({ bodies: toggle(filters.bodies, v) })}
            />

            <fieldset>
              <legend className={labelClass}>Year</legend>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="numeric"
                  aria-label="Year from"
                  placeholder="1955"
                  value={filters.yearMin}
                  onChange={(e) => update({ yearMin: e.target.value })}
                  className={fieldClass}
                />
                <span aria-hidden className="text-fg/40">–</span>
                <input
                  type="number"
                  inputMode="numeric"
                  aria-label="Year to"
                  placeholder="1977"
                  value={filters.yearMax}
                  onChange={(e) => update({ yearMax: e.target.value })}
                  className={fieldClass}
                />
              </div>
            </fieldset>

            <fieldset>
              <legend className={labelClass}>Price (USD)</legend>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="numeric"
                  aria-label="Minimum price"
                  placeholder="Min"
                  value={filters.priceMin}
                  onChange={(e) => update({ priceMin: e.target.value })}
                  className={fieldClass}
                />
                <span aria-hidden className="text-fg/40">–</span>
                <input
                  type="number"
                  inputMode="numeric"
                  aria-label="Maximum price"
                  placeholder="Max"
                  value={filters.priceMax}
                  onChange={(e) => update({ priceMax: e.target.value })}
                  className={fieldClass}
                />
              </div>
            </fieldset>

            <div>
              <label htmlFor="inv-mileage" className={labelClass}>
                Mileage
              </label>
              <select
                id="inv-mileage"
                value={filters.maxMileage}
                onChange={(e) => update({ maxMileage: e.target.value })}
                className={fieldClass}
              >
                {mileageOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                setFilters(noFilters);
                setPage(1);
              }}
              className="rounded-none border border-fg/30 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 hover:border-gold hover:text-gold-text"
            >
              Reset Filters
            </button>
          </form>

          <FinanceSidebar />
        </aside>

        <section id="vault-results" aria-label="Search results" className="scroll-mt-24">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-fg/70" aria-live="polite">
              {results.length === 0
                ? "No automobiles found"
                : `Showing ${firstShown}–${firstShown + pageItems.length - 1} of ${results.length} automobiles`}
            </p>
            <div className="flex items-center gap-3">
              <label htmlFor="inv-sort" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/60">
                Sort
              </label>
              <select
                id="inv-sort"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as SortKey);
                  setPage(1);
                }}
                className={`${fieldClass} w-auto`}
              >
                {(Object.keys(sorts) as SortKey[]).map((k) => (
                  <option key={k} value={k}>
                    {sorts[k].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {results.length === 0 ? (
            <p className="rounded-none border border-line bg-panel px-6 py-16 text-center text-sm text-fg/70">
              No automobiles match those filters. Try widening your search.
            </p>
          ) : (
            <motion.div
              key={`${current}-${sort}-${results.length}`}
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.05 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {pageItems.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </motion.div>
          )}

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                aria-label="Previous page"
                disabled={current === 1}
                onClick={() => goTo(current - 1)}
                className={`${pageButton} border-fg/20 hover:border-gold disabled:pointer-events-none disabled:opacity-30`}
              >
                <ChevronLeft size={16} aria-hidden />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-label={`Page ${p}`}
                  aria-current={p === current ? "page" : undefined}
                  onClick={() => goTo(p)}
                  className={`${pageButton} ${
                    p === current
                      ? "border-gold bg-gold text-black"
                      : "border-fg/20 hover:border-gold"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                aria-label="Next page"
                disabled={current === totalPages}
                onClick={() => goTo(current + 1)}
                className={`${pageButton} border-fg/20 hover:border-gold disabled:pointer-events-none disabled:opacity-30`}
              >
                <ChevronRight size={16} aria-hidden />
              </button>
            </nav>
          )}
        </section>
      </div>
    </div>
  );
}

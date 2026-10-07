"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const makes = ["Any make", "Chevrolet", "Jaguar", "Porsche", "Shelby", "Mercedes-Benz", "Ferrari"];
const bodyStyles = ["Any body style", "Coupe", "Roadster", "Fastback", "Convertible"];
const priceRanges = [
  "Any price",
  "Under $200,000",
  "$200,000 – $500,000",
  "$500,000 – $1,000,000",
  "$1,000,000+",
];
const quickTags = ["1960s Air-Cooled 911", "British Racing Green", "V12 Ferrari Engine", "Matching Numbers"];

const labelClass = "mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/60";
const fieldClass =
  "w-full rounded-none border border-fg/15 bg-bg px-4 py-3 text-sm text-fg placeholder:text-fg/40 focus:border-gold focus:outline-none";

export default function SearchFilter() {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) =>
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  return (
    <section aria-label="Search the vault" className="mx-auto w-full max-w-[1440px] px-6 pt-16 lg:px-16">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6 rounded-none border border-fg/10 bg-card p-6 lg:p-8"
      >
        <div>
          <label htmlFor="vault-search" className="sr-only">
            Search by make, model, chassis number or era
          </label>
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-fg/40"
              aria-hidden
            />
            <input
              id="vault-search"
              type="search"
              placeholder="Search by make, model, chassis number or era..."
              className={`${fieldClass} py-4 pl-12`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="filter-make" className={labelClass}>
              Make / Model
            </label>
            <select id="filter-make" className={fieldClass} defaultValue={makes[0]}>
              {makes.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-body" className={labelClass}>
              Body Style
            </label>
            <select id="filter-body" className={fieldClass} defaultValue={bodyStyles[0]}>
              {bodyStyles.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
          <fieldset>
            <legend className={labelClass}>Year</legend>
            <div className="flex items-center gap-2">
              <input
                type="number"
                aria-label="Year from"
                min={1900}
                max={1989}
                defaultValue={1955}
                className={fieldClass}
              />
              <span aria-hidden className="text-fg/40">–</span>
              <input
                type="number"
                aria-label="Year to"
                min={1900}
                max={1989}
                defaultValue={1989}
                className={fieldClass}
              />
            </div>
          </fieldset>
          <div>
            <label htmlFor="filter-price" className={labelClass}>
              Price Range
            </label>
            <select id="filter-price" className={fieldClass} defaultValue={priceRanges[0]}>
              {priceRanges.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {quickTags.map((tag) => {
              const active = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-none border px-4 py-2 text-xs transition-colors duration-200 ${
                    active
                      ? "border-gold bg-gold/10 text-gold-text"
                      : "border-fg/15 text-fg/70 hover:border-fg/40 hover:text-fg"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          <button
            type="submit"
            className="rounded-none bg-gold px-10 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-[background-color,transform] duration-200 ease-out hover:bg-gold-hover active:scale-[0.97]"
          >
            Apply Filter
          </button>
        </div>
      </form>
    </section>
  );
}

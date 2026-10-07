"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import { Camera, Check, Mail, Phone } from "lucide-react";
import { loanSummary, terms, usd, type Term } from "@/lib/finance";

const tabs = [
  { id: "financing", label: "Financing Calculator" },
  { id: "consign", label: "Sell / Consign Your Car" },
] as const;
type TabId = (typeof tabs)[number]["id"];

const labelClass = "mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/60";
const fieldClass =
  "w-full rounded-none border border-line-strong bg-bg px-3 py-3 text-sm text-fg placeholder:text-fg/40 focus:border-gold focus:outline-none";
const goldButton =
  "rounded-none bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-black transition-[background-color,transform] duration-200 ease-out hover:bg-gold-hover active:scale-[0.98]";

function FinancingPanel() {
  const [value, setValue] = useState("185000");
  const [down, setDown] = useState("35000");
  const [apr, setApr] = useState("6.5");
  const [term, setTerm] = useState<Term>(60);

  const price = Math.max(0, Number(value) || 0);
  const downPayment = Math.max(0, Number(down) || 0);
  const rate = Math.max(0, Number(apr) || 0);
  const { principal, monthly, totalCost, interest } = loanSummary(price, downPayment, rate, term);

  const metrics = [
    ["Total Principal Financed", usd(principal)],
    ["Total Interest Paid", usd(interest)],
    ["Total Loan Cost", usd(totalCost)],
  ];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="fin-value" className={labelClass}>
            Vehicle Value ($)
          </label>
          <input
            id="fin-value"
            type="number"
            inputMode="decimal"
            min={0}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="fin-down" className={labelClass}>
            Down Payment ($)
          </label>
          <input
            id="fin-down"
            type="number"
            inputMode="decimal"
            min={0}
            value={down}
            onChange={(e) => setDown(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="fin-apr" className={labelClass}>
            Estimated Interest Rate (% APR)
          </label>
          <input
            id="fin-apr"
            type="number"
            inputMode="decimal"
            min={0}
            step={0.1}
            value={apr}
            onChange={(e) => setApr(e.target.value)}
            className={fieldClass}
          />
        </div>
        <fieldset>
          <legend className={labelClass}>Loan Term (Months)</legend>
          <div className="grid grid-cols-4 gap-2">
            {terms.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={term === t}
                onClick={() => setTerm(t)}
                className={`rounded-none border px-3 py-3 text-sm font-semibold transition-colors duration-200 ${
                  term === t
                    ? "border-gold bg-gold text-black"
                    : "border-line-strong bg-bg text-fg/80 hover:border-fg/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* `dark` re-scopes the theme tokens so this results panel stays high-contrast dark in both themes */}
      <div className="dark flex flex-col rounded-none border border-line-strong bg-bg p-6 text-fg">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/60">
          Estimated Monthly Payment
        </p>
        <p className="mt-2 text-4xl font-bold text-gold-text md:text-5xl" aria-live="polite">
          {usd(monthly)}
          <span className="text-lg font-semibold text-gold-text/80"> / mo</span>
        </p>

        <dl className="mt-8 flex flex-col divide-y divide-fg/10 border-y border-fg/10">
          {metrics.map(([term_, amount]) => (
            <div key={term_} className="flex items-center justify-between py-4">
              <dt className="text-sm text-fg/70">{term_}</dt>
              <dd className="text-base font-semibold">{amount}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-xs leading-relaxed text-fg/50">
          Estimate only, based on a fixed rate over {term} months. Final terms are subject to credit approval.
        </p>

        <Link href="/#sign-in" className={`${goldButton} mt-6 block text-center`}>
          Apply for Pre-Approval
        </Link>
      </div>
    </div>
  );
}

const MAX_FILE_BYTES = 25 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png"];

function ConsignPanel() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const list = Array.from(incoming);
    const valid = list.filter((f) => ACCEPTED.includes(f.type) && f.size <= MAX_FILE_BYTES);
    setFileError(
      valid.length < list.length ? "Only JPG or PNG files up to 25MB are accepted." : "",
    );
    setFiles((prev) => [...prev, ...valid]);
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
      <div>
        <h3 className="mb-5 font-serif text-3xl leading-tight md:text-4xl">
          Consign or Sell Your Classic Direct to Vault.
        </h3>
        <p className="mb-8 text-sm leading-relaxed text-fg/70">
          We acquire exceptional, high-grade vintage automobiles worldwide. Whether you are looking
          to sell outright or consign through our global network of collectors, our specialists
          ensure maximum value and seamless white-glove service.
        </p>
        <ul className="mb-8 flex flex-col gap-4">
          {[
            "Instant valuation and competitive cash offers",
            "Nationwide white-glove transport and insured storage",
            "Direct access to pre-qualified global buyers",
          ].map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm text-fg/90">
              <Check size={18} className="mt-0.5 shrink-0 text-gold-text" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 border-t border-fg/10 pt-6 text-sm">
          <a href="tel:+442000000000" className="flex items-center gap-3 hover:text-gold-text">
            <Phone size={16} className="text-gold-text" aria-hidden />
            +44 20 0000 0000
          </a>
          <a
            href="mailto:consign@vintagemotors.example"
            className="flex items-center gap-3 hover:text-gold-text"
          >
            <Mail size={16} className="text-gold-text" aria-hidden />
            consign@vintagemotors.example
          </a>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="flex flex-col gap-5"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="c-name" className={labelClass}>Full Name</label>
            <input id="c-name" name="name" required autoComplete="name" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="c-email" className={labelClass}>Email Address</label>
            <input id="c-email" name="email" type="email" required autoComplete="email" className={fieldClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="c-phone" className={labelClass}>Phone Number</label>
            <input id="c-phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="c-method" className={labelClass}>Preferred Contact Method</label>
            <select id="c-method" name="method" defaultValue="Email" className={fieldClass}>
              <option>Email</option>
              <option>Phone call</option>
              <option>Text message</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="c-year" className={labelClass}>Year</label>
            <input id="c-year" name="year" type="number" inputMode="numeric" min={1900} max={2000} required placeholder="1967" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="c-make" className={labelClass}>Make</label>
            <input id="c-make" name="make" required placeholder="Chevrolet" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="c-model" className={labelClass}>Model</label>
            <input id="c-model" name="model" required placeholder="Corvette" className={fieldClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="c-mileage" className={labelClass}>Mileage</label>
            <input id="c-mileage" name="mileage" type="number" inputMode="numeric" min={0} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="c-price" className={labelClass}>Estimated Asking Price ($)</label>
            <input id="c-price" name="price" type="number" inputMode="numeric" min={0} className={fieldClass} />
          </div>
        </div>

        <div>
          <span id="c-photos-label" className={labelClass}>Photos</span>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              addFiles(e.dataTransfer.files);
            }}
            onClick={() => inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center gap-3 rounded-none border border-dashed px-4 py-8 text-center transition-colors duration-200 ${
              dragging ? "border-gold bg-gold/10" : "border-line-strong bg-bg hover:border-fg/40"
            }`}
          >
            <Camera size={28} strokeWidth={1.25} className="text-gold-text" aria-hidden />
            <p className="text-sm text-fg/70">
              Drag &amp; drop photos or click to browse (JPG, PNG - Max 25MB)
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png"
              multiple
              aria-labelledby="c-photos-label"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
              className="max-w-full text-xs text-fg/60 file:mr-3 file:rounded-none file:border-0 file:bg-card file:px-3 file:py-2 file:text-xs file:text-fg"
            />
          </div>
          {fileError && (
            <p role="alert" className="mt-2 text-xs text-red-600 dark:text-red-400">
              {fileError}
            </p>
          )}
          {files.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {files.map((f, i) => (
                <li
                  key={`${f.name}-${i}`}
                  className="flex items-center gap-2 rounded-none border border-line-strong bg-bg px-3 py-1.5 text-xs text-fg/80"
                >
                  {f.name}
                  <button
                    type="button"
                    aria-label={`Remove ${f.name}`}
                    onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                    className="text-fg/50 hover:text-fg"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label htmlFor="c-notes" className={labelClass}>Additional Vehicle Details / Provenance Notes</label>
          <textarea id="c-notes" name="notes" rows={4} className={`${fieldClass} resize-y`} />
        </div>

        <button type="submit" className={`${goldButton} w-full`}>
          Submit Vehicle for Review
        </button>
        {submitted && (
          <p role="status" className="text-center text-sm text-gold-text">
            Thank you. A specialist will review your vehicle and be in touch shortly.
          </p>
        )}
      </form>
    </div>
  );
}

const subscribeToHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const getHash = () => window.location.hash;
const getServerHash = () => "";

export default function Services() {
  // Links to "#sell" (e.g. "Submit Your Car for Review") open the consign tab, including on a
  // fresh page load. A manual tab choice only applies for the hash it was made under.
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);
  const [chosen, setChosen] = useState<{ tab: TabId; forHash: string } | null>(null);
  const active: TabId =
    chosen && chosen.forHash === hash ? chosen.tab : hash === "#sell" ? "consign" : "financing";
  const setActive = (tab: TabId) => setChosen({ tab, forHash: hash });
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({ financing: null, consign: null });

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next: TabId = active === "financing" ? "consign" : "financing";
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="consignment"
      aria-labelledby="services-heading"
      className="mx-auto w-full max-w-[1440px] px-6 pb-24 lg:px-16 lg:pb-28"
    >
      <div className="mb-10 flex flex-col gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-text">
          Services &amp; Acquisitions
        </p>
        <h2 id="services-heading" className="font-serif text-4xl leading-tight tracking-[-0.01em] md:text-5xl">
          Valuation &amp; Financing
        </h2>
      </div>

      <div id="sell" className="scroll-mt-32" />
      <div role="tablist" aria-label="Services" onKeyDown={onKeyDown} className="mb-6 flex flex-col sm:flex-row">
        {tabs.map((tab) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              id={`tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className={`rounded-none border px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-200 ${
                selected
                  ? "border-gold bg-gold text-black"
                  : "border-line bg-panel text-fg/60 hover:text-fg"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-none border border-line bg-panel p-6 md:p-8">
        <div role="tabpanel" id="panel-financing" aria-labelledby="tab-financing" hidden={active !== "financing"}>
          <FinancingPanel />
        </div>
        <div role="tabpanel" id="panel-consign" aria-labelledby="tab-consign" hidden={active !== "consign"}>
          <ConsignPanel />
        </div>
      </div>
    </section>
  );
}

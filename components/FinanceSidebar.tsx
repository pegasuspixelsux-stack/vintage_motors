"use client";

import { useState } from "react";
import { loanSummary, terms, usd, type Term } from "@/lib/finance";

const labelClass = "text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/60";
const sliderClass = "mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-none bg-fg/15 accent-gold";

interface SliderProps {
  id: string;
  label: string;
  display: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}

function Slider({ id, label, display, min, max, step, value, onChange }: SliderProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        <output htmlFor={id} className="text-sm font-semibold">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={sliderClass}
      />
    </div>
  );
}

export default function FinanceSidebar() {
  const [value, setValue] = useState(185_000);
  const [down, setDown] = useState(35_000);
  const [apr, setApr] = useState(6.5);
  const [term, setTerm] = useState<Term>(60);

  // Keep the down payment within the vehicle value when the value slider moves.
  const downPayment = Math.min(down, value);
  const { principal, monthly, interest, totalCost } = loanSummary(value, downPayment, apr, term);

  const rows = [
    ["Principal Financed", usd(principal)],
    ["Total Interest", usd(interest)],
    ["Total Loan Cost", usd(totalCost)],
  ];

  return (
    <section
      aria-labelledby="finance-heading"
      className="flex flex-col gap-6 rounded-none border border-line bg-panel p-5"
    >
      <h2 id="finance-heading" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-text">
        Financing Calculator
      </h2>

      <Slider
        id="fs-value"
        label="Vehicle Value"
        display={usd(value)}
        min={25_000}
        max={2_500_000}
        step={5_000}
        value={value}
        onChange={setValue}
      />
      <Slider
        id="fs-down"
        label="Down Payment"
        display={usd(downPayment)}
        min={0}
        max={value}
        step={1_000}
        value={downPayment}
        onChange={setDown}
      />
      <Slider
        id="fs-apr"
        label="Interest Rate (APR)"
        display={`${apr.toFixed(2)}%`}
        min={0}
        max={15}
        step={0.25}
        value={apr}
        onChange={setApr}
      />

      <fieldset>
        <legend className={labelClass}>Loan Term (Months)</legend>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {terms.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={term === t}
              onClick={() => setTerm(t)}
              className={`rounded-none border px-2 py-2.5 text-sm font-semibold transition-colors duration-200 ${
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

      <div className="dark rounded-none border border-line-strong bg-bg p-5 text-fg">
        <p className={labelClass}>Estimated Monthly Payment</p>
        <p className="mt-2 text-3xl font-bold text-gold-text" aria-live="polite">
          {usd(monthly)}
          <span className="text-base font-semibold text-gold-text/80"> / mo</span>
        </p>
        <dl className="mt-5 flex flex-col divide-y divide-fg/10 border-y border-fg/10">
          {rows.map(([term_, amount]) => (
            <div key={term_} className="flex items-center justify-between gap-3 py-3">
              <dt className="text-xs text-fg/70">{term_}</dt>
              <dd className="text-sm font-semibold">{amount}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="text-xs leading-relaxed text-fg/50">
        Estimate only, at a fixed rate. Final terms are subject to credit approval.
      </p>
    </section>
  );
}

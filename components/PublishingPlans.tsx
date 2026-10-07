import { Check } from "lucide-react";

const plans = [
  {
    kicker: "Free to List (Pay-Per-Contact)",
    name: "Free to List",
    price: "$0",
    cadence: "upfront",
    note: null,
    description:
      "List your car for free with zero upfront charges. Pay a small fee only when a verified buyer reaches out to contact you.",
    badge: "Zero Upfront Risk",
    featured: false,
  },
  {
    kicker: "Cup of Coffee Price",
    name: "Annual Publishing Pass",
    price: "~$4.99",
    cadence: "/ month",
    note: "Billed annually",
    description:
      "Classic automobiles take time to find the right collector. Enjoy a full 12-month listing with unlimited buyer inquiries and zero lead fees.",
    badge: "Best Value for Collectors",
    featured: true,
  },
];

export default function PublishingPlans() {
  return (
    <section aria-labelledby="plans-heading" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-16 lg:py-28">
        <h2
          id="plans-heading"
          className="mb-12 font-serif text-4xl leading-tight tracking-[-0.01em] md:text-5xl"
        >
          Flexible Publishing Plans
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`flex flex-col rounded-none border bg-panel p-8 ${
                plan.featured ? "border-gold" : "border-line"
              }`}
            >
              <span
                className={`mb-6 inline-block self-start rounded-none px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${
                  plan.featured ? "bg-gold text-black" : "border border-gold text-gold-text"
                }`}
              >
                {plan.badge}
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/60">
                {plan.kicker}
              </p>
              <h3 className="mt-1 font-serif text-3xl">{plan.name}</h3>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="text-5xl font-bold text-gold-text">{plan.price}</span>
                <span className="text-sm text-fg/60">{plan.cadence}</span>
              </p>
              {plan.note && <p className="mt-2 text-xs text-fg/60">{plan.note}</p>}
              <p className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-fg/70">
                <Check size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden />
                {plan.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

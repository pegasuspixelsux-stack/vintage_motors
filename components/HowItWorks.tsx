const principles = [
  {
    n: "01",
    title: "Keep Your Car & Control",
    body: "Your automobile never leaves your property. You maintain full ownership, drive it when you want, and hold the title throughout the entire listing period.",
  },
  {
    n: "02",
    title: "We Guide & Publish",
    body: "We help you meet our listing standards. We instruct you on capturing professional-quality photography and verifying your title documentation so your car stands out to serious buyers.",
  },
  {
    n: "03",
    title: "Direct Inquiries & Transactions",
    body: "Inquiries from interested buyers are sent straight to your email. You negotiate directly, agree on payment terms, and complete the transaction on your own terms with zero dealer markups.",
  },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-heading" className="mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-16 lg:py-28">
      <h2
        id="how-it-works-heading"
        className="mb-12 font-serif text-4xl leading-tight tracking-[-0.01em] md:text-5xl"
      >
        How It Works
      </h2>
      <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {principles.map((p) => (
          <li key={p.n} className="rounded-none border border-line bg-panel p-6">
            <span className="font-serif text-3xl text-gold-text">{p.n}</span>
            <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.18em]">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-fg/70">{p.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

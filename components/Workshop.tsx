import Image from "next/image";
import Link from "next/link";

export default function Workshop() {
  return (
    <section id="restoration" className="border-y border-fg/10 bg-surface">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-16 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-text">
              Global Classic Automotive Publication
            </p>
            <h2 className="mb-6 font-serif text-4xl leading-tight tracking-[-0.01em] md:text-5xl">
              Your Garage. Global Reach. Direct Sales.
            </h2>
            <p className="mb-10 max-w-xl text-base leading-relaxed text-fg/70">
              Publish your classic car on our international platform, retain complete control of your
              vehicle, and receive direct inquiries from serious collectors worldwide.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/about#sell"
                className="inline-block rounded-none bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-black transition-[background-color,transform] duration-200 ease-out hover:bg-gold-hover active:scale-[0.97]"
              >
                Submit Your Car for Review
              </Link>
              <Link
                href="/about"
                className="inline-block rounded-none border border-fg/30 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-200 hover:border-gold hover:text-gold-text"
              >
                How It Works &amp; Plans
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-none border border-fg/10 bg-card">
            <Image
              src="https://images.unsplash.com/photo-1579175748380-21fefe0b01d7?auto=format&fit=crop&w=1400&q=80"
              alt="A pristine classic car kept in a clean private garage"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="rounded-none object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

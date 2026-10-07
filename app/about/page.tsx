import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpenText, Globe, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DirectBuyerCallout from "@/components/DirectBuyerCallout";
import HowItWorks from "@/components/HowItWorks";
import PublishingPlans from "@/components/PublishingPlans";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "About Us | Vintage Motors",
  description:
    "Vintage Motors is a global classic automotive publication and peer-to-peer marketplace connecting owners directly with serious collectors.",
};

const pillars = [
  {
    icon: BookOpenText,
    title: "A Publication First",
    body: "We present every automobile the way a collector's magazine would: with context, provenance and photography worthy of the car.",
  },
  {
    icon: Globe,
    title: "A Direct Marketplace",
    body: "Owners keep their cars and deal with buyers directly. We provide the international audience and the qualified leads, never a middleman's markup.",
  },
  {
    icon: ShieldCheck,
    title: "Standards You Can Trust",
    body: "Every listing is reviewed for authentic documentation and title history before it is published, so buyers can inquire with confidence.",
  },
];

const standards = [
  "Clear, authentic title and registration paperwork",
  "Honest, professional-quality photography",
  "Accurate specifications, mileage and history",
  "Direct, responsive communication between buyer and seller",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-16 lg:py-28">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-text">
              About Us
            </p>
            <h1 className="mb-8 max-w-4xl font-serif text-5xl leading-[1.05] tracking-[-0.02em] md:text-6xl lg:text-7xl">
              A publication for those who <em className="italic text-gold-text">love the classics.</em>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-fg/70">
              Vintage Motors is a global classic automotive publication and peer-to-peer marketplace.
              We exist to put exceptional vintage automobiles in front of serious collectors and to
              keep the sale between the two people who care most: the owner and the next custodian.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-16 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] rounded-none border border-line bg-card">
              <Image
                src="https://images.unsplash.com/photo-1733483873939-8a1a76ca448b?auto=format&fit=crop&w=1400&q=80"
                alt="A classic car resting in a private garage"
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="rounded-none object-cover"
              />
            </div>
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-text">
                Our Story
              </p>
              <h2 className="mb-6 font-serif text-4xl leading-tight tracking-[-0.01em] md:text-5xl">
                Not a dealership. By design.
              </h2>
              <div className="flex flex-col gap-4 text-sm leading-relaxed text-fg/70">
                <p>
                  Great classic cars rarely belong on a dealer&rsquo;s lot. They belong in the garages
                  of people who know them, drive them and care for them. We built Vintage Motors
                  around that idea.
                </p>
                <p>
                  Your automobile never leaves your property, and you never hand over your keys. We
                  publish your listing to an international audience, hold it to clear standards, and
                  deliver verified inquiries straight to your inbox. The sale itself is yours to
                  negotiate and complete, directly with the buyer.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-surface">
          <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-16 lg:py-28">
            <h2 className="mb-12 max-w-2xl font-serif text-4xl leading-tight tracking-[-0.01em] md:text-5xl">
              What we stand for
            </h2>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {pillars.map(({ icon: Icon, title, body }) => (
                <li key={title} className="rounded-none border border-line bg-panel p-6">
                  <Icon size={28} strokeWidth={1.5} className="text-gold" aria-hidden />
                  <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg/70">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mx-auto w-full max-w-[1440px] px-6 pt-20 lg:px-16 lg:pt-28">
          <DirectBuyerCallout />
        </div>

        <HowItWorks />
        <PublishingPlans />

        <div className="pt-20 lg:pt-28">
          <Services />
        </div>

        <section className="mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-16 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-text">
                Listing Standards
              </p>
              <h2 className="font-serif text-4xl leading-tight tracking-[-0.01em] md:text-5xl">
                A short list, strictly kept.
              </h2>
            </div>
            <ol className="flex flex-col">
              {standards.map((s, i) => (
                <li key={s} className="flex gap-6 border-t border-line py-5 last:border-b">
                  <span className="font-serif text-2xl text-gold-text">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-relaxed text-fg/80">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-line bg-surface">
          <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-8 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-16">
            <h2 className="max-w-xl font-serif text-3xl leading-tight md:text-4xl">
              Looking for your next classic, or ready to pass one on?
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/inventory"
                className="rounded-none bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-black transition-[background-color,transform] duration-200 ease-out hover:bg-gold-hover active:scale-[0.97]"
              >
                Browse the Vault
              </Link>
              <Link
                href="#sell"
                className="rounded-none border border-fg/30 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-200 hover:border-gold hover:text-gold-text"
              >
                Submit Your Car
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

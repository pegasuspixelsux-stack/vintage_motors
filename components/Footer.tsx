import Link from "next/link";
import Brand from "@/components/Brand";
import ThemeToggle from "@/components/ThemeToggle";
import { Camera, Video, AtSign } from "lucide-react";

const archives = [
  { label: "Collection Inventory", href: "/inventory" },
  { label: "About Us", href: "/about" },
  { label: "Private Sales", href: "#" },
  { label: "Consignment Terms", href: "#" },
  { label: "Provenance Advisory", href: "#" },
];

const salons = [
  { city: "London", address: "14 Mount Street, Mayfair, W1K 2RF" },
  { city: "New York", address: "520 West 25th Street, Chelsea, NY 10001" },
  { city: "Tokyo", address: "5-2-1 Minami-Aoyama, Minato-ku, 107-0062" },
];

const socials = [
  { label: "Photos", icon: Camera },
  { label: "Videos", icon: Video },
  { label: "Contact", icon: AtSign },
];

const legal = ["Privacy Policy", "Terms of Sale", "Cookie Policy"];

const headingClass = "mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-text";

export default function Footer() {
  return (
    <footer id="salons" className="w-full border-t border-fg/10 bg-bg">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-6 py-20 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-6">
            <Brand />
            <p className="text-sm leading-relaxed text-fg/60">
              Curators of the world&rsquo;s finest vintage automobiles. Provenance, performance
              and preservation for the discerning collector.
            </p>
            <div className="flex gap-3">
              {socials.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-none border border-fg/20 transition-colors duration-200 hover:border-gold hover:text-gold-text"
                >
                  <Icon size={15} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className={headingClass}>Vault Archives</h2>
            <ul className="flex flex-col gap-3">
              {archives.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-fg/60 transition-colors duration-200 hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={headingClass}>Salons &amp; Showrooms</h2>
            <ul className="flex flex-col gap-4">
              {salons.map((s) => (
                <li key={s.city} className="text-sm text-fg/60">
                  <span className="block text-fg">{s.city}</span>
                  <address className="not-italic">{s.address}</address>
                </li>
              ))}
            </ul>
          </div>

          <div id="vault">
            <h2 className={headingClass}>Private Appointments</h2>
            <p className="mb-3 text-sm text-fg/60">
              By appointment only
              <br />
              Mon – Sat, 10:00 – 18:00
            </p>
            <p className="text-sm text-fg/60">
              <a href="tel:+442000000000" className="block text-fg hover:text-gold-text">
                +44 20 0000 0000
              </a>
              <a
                href="mailto:concierge@vintagemotors.example"
                className="block text-fg hover:text-gold-text"
              >
                concierge@vintagemotors.example
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-fg/10 pt-8 text-xs text-fg/50 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <ThemeToggle />
            <p>&copy; {new Date().getFullYear()} Vintage Motors. All rights reserved.</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((item) => (
              <li key={item}>
                <a href="#" className="transition-colors duration-200 hover:text-fg">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

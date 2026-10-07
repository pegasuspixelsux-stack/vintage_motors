"use client";

import { useState } from "react";
import Link from "next/link";
import Brand from "@/components/Brand";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Inventory", href: "/inventory" },
  { label: "Performance", href: "/#performance" },
  { label: "Restoration", href: "/#restoration" },
  { label: "Private Salon", href: "/#salons" },
  { label: "Consignment", href: "/about#consignment" },
  { label: "My Vault", href: "/#vault" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="sticky top-0 z-50 w-full border-b border-fg/10 bg-bg/90 backdrop-blur-md"
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-6 lg:px-16"
      >
        <Brand />

        <div className="hidden items-center gap-7 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-fg/70 transition-colors duration-200 hover:text-gold-text"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#sign-in"
            className="rounded-none bg-gold px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-[background-color,transform] duration-200 ease-out hover:bg-gold-hover active:scale-[0.97]"
          >
            Sign In
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-none border border-fg/20 xl:hidden"
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-fg/10 bg-surface px-6 py-4 xl:hidden"
        >
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-fg/5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-fg/80 hover:text-gold-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.header>
  );
}

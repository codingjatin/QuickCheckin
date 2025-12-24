"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react"; // social icons

import { useFooter } from "../content";

type LinkItem = { label: string; href: string };

const BLOCKED_HREFS = new Set([
  "/case-studies",
  "/resources",
  "/security",
  "/faq",
]);

function isValidLink(link: LinkItem) {
  return (
    !!link?.href &&
    link.href !== "#" &&
    !BLOCKED_HREFS.has(link.href)
  );
}

export function FooterSection() {
  const { tagline, description, columns, legal, copyright } = useFooter();

  // Remove the "Resources" column and re-map
  const filteredColumns = columns
    .filter((col) => col.title.toLowerCase() !== "resources")
    .map((col) => ({
      ...col,
      links: col.links.filter(isValidLink),
    }));

  const quickLinks = filteredColumns
    .flatMap((c) => c.links)
    .filter((l) => l.href !== "/")
    .slice(0, 4);

  const filteredLegal = legal.filter(isValidLink);

  return (
    <footer className="border-t border-border bg-panel pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-border pb-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          {/* --- Left: Logo and description --- */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/QuickCheck.svg"
                alt="QuickCheck logo"
                width={32}
                height={32}
              />
              <span className="text-lg font-semibold text-ink">{tagline}</span>
            </Link>

            <p className="max-w-xs text-sm text-muted">{description}</p>

            <div className="flex flex-wrap gap-3 text-xs text-muted">
              {quickLinks.map((link) => (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  className="hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* --- Middle Columns (Product, Company, etc.) --- */}
          {filteredColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {column.links.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link href={link.href} className="hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* --- Right Side: Contact & Socials --- */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <Link
                  href="mailto:info@quickcheckin.ca"
                  className="hover:text-ink"
                >
                  info@quickcheckin.ca
                </Link>
              </li>
              <li>
                <Link href="tel:+16472216677" className="hover:text-ink">
                  +1 647-221-6677
                </Link>
              </li>
            </ul>

            {/* --- Social Media Links --- */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted mb-3">
                Follow Us
              </h4>
              <div className="flex items-center gap-4 text-muted">
                <Link
                  href="https://www.instagram.com/kohligarageinc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </Link>
                <Link
                  href="https://www.facebook.com/kohligarageinc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/kohligarageinc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Legal Section --- */}
        <div className="flex flex-col gap-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{copyright}</p>
          <div className="flex gap-4">
            {filteredLegal.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

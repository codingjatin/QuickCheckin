"use client";

import Image from "next/image";
import Link from "next/link";

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

  // Create filtered, non-mutating views of footer data
  const filteredColumns = columns.map((col) => ({
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
        </div>

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

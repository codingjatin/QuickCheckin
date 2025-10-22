"use client";

import Link from "next/link";

type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: HeroAction[];
};

export function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="bg-off/60 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {eyebrow ? (
          <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-base text-muted sm:text-lg">{description}</p>
        {actions && actions.length > 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {actions.map((action) => {
              const baseClasses =
                "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
              const variantClasses =
                action.variant === "secondary"
                  ? "border border-border text-ink hover:bg-off"
                  : "bg-primary text-white hover:bg-primary-600";
              const isExternal =
                action.href.startsWith("http") ||
                action.href.startsWith("mailto:") ||
                action.href.startsWith("tel:") ||
                action.href.startsWith("#");

              if (isExternal) {
                return (
                  <a
                    key={action.href}
                    href={action.href}
                    className={`${baseClasses} ${variantClasses}`}
                    rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {action.label}
                  </a>
                );
              }

              return (
                <Link key={action.href} href={action.href} className={`${baseClasses} ${variantClasses}`}>
                  {action.label}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}

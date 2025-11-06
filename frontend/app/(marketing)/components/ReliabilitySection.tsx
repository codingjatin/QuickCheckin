'use client'

import Link from 'next/link'
import { ShieldCheck, Activity, Lock, Server } from 'lucide-react'
import { useMarketingContent } from '../content'
import { SectionHeading } from './SectionHeading'

const icons = [ShieldCheck, Activity, Lock, Server]

export function ReliabilitySection() {
  const { landing } = useMarketingContent()
  const r = landing.reliability

  return (
    <section className="relative overflow-hidden bg-ink text-off py-20">
      {/* ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-[-10%] h-80 w-80 rounded-full bg-[radial-gradient(60%_60%_at_50%_50%,rgba(20,184,166,0.18),transparent_70%)] blur-xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 right-[-10%] h-96 w-96 rounded-full bg-[radial-gradient(60%_60%_at_50%_50%,rgba(245,158,11,0.16),transparent_70%)] blur-xl"
      />
      {/* subtle grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={r.eyebrow}
          title={r.title}
          description={r.description}
        />

        {/* spotlight cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {r.highlights.map(({ stat, description }, i) => {
            const Icon = icons[i % icons.length]
            return (
              <article key={`${stat}-${description}`} className="group">
                <div className="rounded-2xl bg-gradient-to-br from-primary/35 via-white/5 to-amber-200/30 p-[1px]">
                  <div className="h-full rounded-[calc(theme(borderRadius.2xl)-1px)] border border-white/10 bg-ink/60 p-6 backdrop-blur-sm shadow-[0_1px_2px_rgba(15,23,42,0.25)] transition duration-300 group-hover:translate-y-[-2px] group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-off">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{stat}</h3>
                    <p className="mt-2 text-sm text-off/80">{description}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-6 sm:p-7">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-off/80">
\              <span className="mr-2 inline-flex h-6 items-center rounded-full bg-primary/20 px-2 text-xs font-semibold text-primary">
                SOC / SLA / Compliance
              </span>
              <span className="hidden sm:inline">
              </span>
            </p>

            <Link
              href={r.link.href}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {r.link.label}
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 10h9M10 5l4.5 4.5L10 14"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div> */}
      </div>
    </section>
  )
}

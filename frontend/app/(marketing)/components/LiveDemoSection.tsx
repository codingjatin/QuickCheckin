'use client'

import { useMemo, useState } from 'react'
import { Check, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMarketingContent } from '../content'

export function LiveDemoSection() {
  const { landing } = useMarketingContent()
  const live = landing.liveDemo

  const [guestNumber, setGuestNumber] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const maskedNumber = useMemo(() => {
    if (guestNumber.length < 4) return guestNumber
    const digits = guestNumber.replace(/\D/g, '')
    if (digits.length < 4) return guestNumber
    return `${digits.slice(0, -4).replace(/\d/g, '#')}${digits.slice(-4)}`
  }, [guestNumber])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!guestNumber.trim()) return
    setSubmitted(true)
  }

  // small helper for {{number}} interpolation
  const replacement =
    (maskedNumber && maskedNumber.trim()) || live.fallbackGuest || 'your guest'

  const successText = (
    live.successMessage ?? 'Preview updated for {{number}}.'
  ).replace('{{number}}', replacement)

  return (
    <section className="bg-panel py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div className="space-y-6">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            {live.title}
          </h2>
          <p className="text-base text-muted sm:text-lg">{live.description}</p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-border bg-off/80 p-6 shadow-soft"
          >
            <div className="space-y-2">
              <Label
                htmlFor="demo-phone"
                className="text-sm font-medium text-ink"
              >
                {live.inputLabel}
              </Label>
              <Input
                id="demo-phone"
                name="demo-phone"
                type="tel"
                inputMode="tel"
                placeholder={live.placeholder ?? '(555) 123-4567'}
                value={guestNumber}
                onChange={(event) => setGuestNumber(event.target.value)}
                className="border-border bg-white"
                aria-describedby="demo-help"
              />
              <p id="demo-help" className="text-xs text-muted">
                {live.helperText}
              </p>
            </div>

            <Button
              type="submit"
              className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary-600"
            >
              <Send className="h-4 w-4" aria-hidden />
              {live.submitLabel}
            </Button>

            {submitted ? (
              <p className="flex items-center gap-2 text-sm text-success">
                <Check className="h-4 w-4" aria-hidden />
                {successText}
              </p>
            ) : null}
          </form>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {live.messages.map((m) => (
            <div
              key={m.title}
              className="flex h-full flex-col rounded-2xl border border-border bg-off p-5 shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {m.title}
              </p>
              <p className="mt-3 flex-1 text-sm text-ink">{m.body}</p>
              {live.replyHint ? (
                <div className="mt-4 rounded-lg bg-white px-4 py-2 text-xs text-muted">
                  {live.replyHint}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

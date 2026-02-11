'use client'

import { useMemo, useState } from 'react'
import { Check, Send, Smartphone, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMarketingContent } from '../content'
import { useTranslation } from '@/lib/i18n'

export function LiveDemoSection() {
  const { t } = useTranslation()
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

  const replacement =
    (maskedNumber && maskedNumber.trim()) || live.fallbackGuest || 'your guest'

  const successText = (
    live.successMessage ?? 'Preview updated for {{number}}.'
  ).replace('{{number}}', replacement)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-panel via-off/60 to-off py-20">
      {/* soft ambient lights */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(60%_60%_at_50%_50%,rgba(20,184,166,0.18),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 left-16 h-56 w-56 rounded-full bg-[radial-gradient(60%_60%_at_50%_50%,rgba(245,158,11,0.16),transparent_70%)] blur-md"
      />

      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        {/* Left: copy + form */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/50">
            <Smartphone className="h-3.5 w-3.5" />
            {t('smsDemo')}
          </div>

          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            {live.title}
          </h2>
          <p className="text-base text-muted sm:text-lg">{live.description}</p>

          <form
            onSubmit={handleSubmit}
            className="relative space-y-4 rounded-2xl border border-border bg-off/80 p-6 shadow-soft backdrop-blur supports-[backdrop-filter]:bg-off/60"
          >
            <div className="space-y-2">
              <Label htmlFor="demo-phone" className="text-sm font-medium text-ink">
                {live.inputLabel}
              </Label>
              <div className="flex items-center gap-2">
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
                <Button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary-600"
                >
                  <Send className="h-4 w-4" aria-hidden />
                  {live.submitLabel}
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted" id="demo-help">
                <ShieldCheck className="h-3.5 w-3.5" />
                {live.helperText}
              </div>
            </div>

            {submitted ? (
              <div
                role="status"
                className="flex items-center gap-2 rounded-xl border border-emerald-200/80 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
              >
                <Check className="h-4 w-4" aria-hidden />
                {successText}
              </div>
            ) : null}
          </form>

          {/* small note showing who the preview is for */}
          <p className="text-xs text-muted">
            {t('previewFor')} <span className="font-semibold text-ink">{replacement}</span>
          </p>
        </div>

        {/* Right: device preview */}
        <div className="mx-auto w-full max-w-sm">
          {/* Device frame */}
          <div className="relative rounded-[2.2rem] border border-border bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:bg-ink">
            {/* notch */}
            <div className="mx-auto mb-3 h-6 w-36 rounded-b-2xl bg-ink/90 dark:bg-black/60" />
            {/* screen */}
            <div className="relative h-[560px] overflow-hidden rounded-[1.6rem] border border-border bg-panel">
              {/* top bar */}
              <div className="flex items-center justify-between border-b border-border/70 bg-off/80 px-4 py-2 text-xs text-muted">
                <span className="font-medium">QuickCheck</span>
                <span className="tabular-nums">{replacement}</span>
              </div>

              {/* chat area */}
              <div className="flex h-full flex-col gap-3 overflow-y-auto p-4">
                {live.messages.map((m, idx) => {
                  const isGuest = m.from === 'guest'
                  return (
                  <div key={m.title + idx} className="contents">
                    {/* Title / status bubble */}
                    <div className="mx-auto mt-1 rounded-full border border-border/70 bg-off/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                      {m.title}
                    </div>

                    {/* message bubble - only show if there is body text */}
                    {m.body ? (
                      <div
                        className={[
                          'relative mt-2 max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm',
                          isGuest
                            ? 'self-end rounded-br-md bg-primary text-white'
                            : 'self-start rounded-bl-md border border-border bg-white text-ink',
                        ].join(' ')}
                      >
                        <p>{m.body}</p>

                        {/* reply hint (only show on last bubble if available and if quickcheck message) */}
                        {idx === live.messages.length - 1 && live.replyHint && !isGuest ? (
                          <div
                            className='mt-3 rounded-lg px-3 py-2 text-[11px] bg-off/70 text-muted border border-border/70'
                          >
                            {live.replyHint}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  )
                })}
              </div>

              {/* bottom safe area gloss */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-panel to-transparent" />
            </div>
          </div>

          {/* tiny legend */}
          <div className="mt-4 text-center text-xs text-muted">
            {t('simulatedPreview')}
          </div>
        </div>
      </div>
    </section>
  )
}

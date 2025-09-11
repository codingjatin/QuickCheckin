'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Mail, Phone, MapPin, Clock, Send, Home, Copy, Check, ChevronDown } from 'lucide-react';
import { LanguageSwitcher } from '@/components/language-switcher';
import Link from 'next/link';
import Image from 'next/image';

type FormShape = typeof initialForm;
type Errors = Partial<Record<keyof FormShape, string>>;

const initialForm = {
  name: '',
  email: '',
  company: '',
  phone: '',
  subject: '',
  message: '',
  // spam honeypot (keep empty)
  website: '',
  consent: false as boolean,
  topic: '' as '' | 'Support' | 'Sales' | 'Partnerships' | 'Other',
};

const EMAIL = 'info@quickcheckin.ca';
const PHONE_DISPLAY = '+1 (289) 332-0707';
const PHONE_TEL = '+12893320707';
const MESSAGE_MIN = 20;
const MESSAGE_MAX = 1200;

// change this to your real thank-you page
const NEXT_URL = '/contact?submitted=1';

export default function ContactPage() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState<{ email?: boolean; phone?: boolean }>({});

  // detect ?submitted=1 for simple thank-you page behavior
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('submitted') === '1') setIsSubmitted(true);
    }
  }, []);

  const chars = formData.message.length;
  const messageHelp =
    chars < MESSAGE_MIN
      ? `${MESSAGE_MIN - chars} more characters to go`
      : `${Math.max(0, MESSAGE_MAX - chars)} characters left`;

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isValidPhone = (val: string) => !val || /^[+()\-\d\s]{7,}$/.test(val);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!formData.name.trim()) e.name = 'Please tell us your name.';
    if (!formData.email.trim()) e.email = 'Email is required.';
    else if (!isValidEmail(formData.email)) e.email = 'Enter a valid email.';
    if (!formData.subject.trim()) e.subject = 'Subject is required.';
    if (!formData.topic) e.topic = 'Please choose a topic.';
    if (!formData.message.trim()) e.message = 'Message is required.';
    else if (formData.message.length < MESSAGE_MIN) e.message = `Please add at least ${MESSAGE_MIN} characters.`;
    else if (formData.message.length > MESSAGE_MAX) e.message = `Please keep it under ${MESSAGE_MAX} characters.`;
    if (!isValidPhone(formData.phone)) e.phone = 'Enter a valid phone number (optional).';
    if (!formData.consent) e.consent = 'Please confirm you agree to be contacted.';
    if (formData.website) e.website = 'Bot detected.'; // honeypot
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const nextValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
  };

  // IMPORTANT: allow native form submit to FormSubmit unless invalid
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const ok = validate();
    if (!ok) {
      e.preventDefault();
      return;
    }
    setIsSubmitting(true);
    // do NOT preventDefault — browser posts to FormSubmit and redirects to _next
  };

  const canSubmit = useMemo(() => {
    return (
      formData.name &&
      formData.email &&
      isValidEmail(formData.email) &&
      formData.subject &&
      formData.topic &&
      formData.message.length >= MESSAGE_MIN &&
      formData.message.length <= MESSAGE_MAX &&
      formData.consent &&
      !isSubmitting
    );
  }, [formData, isSubmitting]);

  const copy = async (text: string, key: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 1500);
    } catch {}
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-off flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-panel border border-border text-center shadow-soft">
          <CardContent className="pt-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-bold text-ink mb-3">Message Sent 🎉</h2>
            <p className="text-muted mb-6">
              Thanks for reaching out! We usually reply within 2–24 hours.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/">
                <Button className="bg-primary hover:bg-primary-600 text-white">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <a href={`mailto:${EMAIL}`}>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Email us
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off text-ink">
      {/* Navigation */}
      <nav className="border-b border-border bg-panel/90 backdrop-blur supports-[backdrop-filter]:bg-panel/75 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-md">
              <Image src="/QuickCheck.svg" alt="QuickCheck Logo" width={36} height={36} />
              <span className="text-xl md:text-2xl font-display font-bold">QuickCheck</span>
            </Link>
            <div className="flex items-center space-x-3">
              <LanguageSwitcher />
              <Link href="/">
                <Button variant="outline" className="border-ink/15 text-ink hover:bg-off">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <header className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
            Ready to elevate your restaurant&apos;s waitlist experience? We&apos;re here to help.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Information */}
          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-panel border border-border shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg grid place-items-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-ink">Email Us</h3>
                    <p className="text-muted">
                      <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:text-ink">
                        {EMAIL}
                      </a>
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => copy(EMAIL, 'email')}>
                        {copied.email ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        {copied.email ? 'Copied' : 'Copy'}
                      </Button>
                      <a href={`mailto:${EMAIL}`}>
                        <Button size="sm" className="bg-primary text-white hover:bg-primary-600">
                          Compose
                        </Button>
                      </a>
                    </div>
                    <p className="text-xs text-muted mt-3">We typically respond within 2–24 hours.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-panel border border-border shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sage/30 rounded-lg grid place-items-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-ink">Call Us</h3>
                    <p className="text-muted">
                      <a href={`tel:${PHONE_TEL}`} className="underline underline-offset-4 hover:text-ink">
                        {PHONE_DISPLAY}
                      </a>
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => copy(PHONE_DISPLAY, 'phone')}>
                        {copied.phone ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        {copied.phone ? 'Copied' : 'Copy'}
                      </Button>
                      <a href={`tel:${PHONE_TEL}`}>
                        <Button size="sm" className="bg-primary text-white hover:bg-primary-600">
                          Call
                        </Button>
                      </a>
                    </div>
                    <p className="text-xs text-muted mt-3">Mon–Fri, 9:00–18:00 EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-panel border border-border shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg grid place-items-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-ink">Visit Us</h3>
                    <p className="text-muted">Toronto, ON, Canada</p>
                    <p className="text-xs text-muted mt-3">Book a meeting at our office.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-ink text-off shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-off/10 rounded-lg grid place-items-center">
                    <Clock className="h-6 w-6 text-off" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Quick Response</h3>
                    <p className="text-off/80">Average reply time: ~2 hours</p>
                    <p className="text-xs text-off/70 mt-3">We’re committed to helping you succeed.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Contact Form (FormSubmit) */}
          <section className="lg:col-span-2">
            <Card className="bg-panel border border-border shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl text-ink font-display">Send us a Message</CardTitle>
                <CardDescription className="text-muted">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Use FormSubmit */}
                <form
                  action={`https://formsubmit.co/${EMAIL}`}
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                >
                  {/* FormSubmit options */}
                  <input type="hidden" name="_subject" value={`QuickCheck Contact • ${formData.topic || 'General'} • ${formData.subject || ''}`} />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value={NEXT_URL} />
                  {/* Optional auto-response */}
                  <input
                    type="hidden"
                    name="_autoresponse"
                    value={`Hi ${formData.name || ''},\n\nThanks for contacting QuickCheck! We received your message and will reply soon.\n\n— QuickCheck Team`}
                  />
                  {/* Honeypot recognized by FormSubmit */}
                  <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
                  {/* Your own honeypot (kept for extra safety) */}
                  <div className="hidden">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" name="website" value={formData.website} onChange={handleInputChange} tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-ink font-medium">
                        Full Name <span className="text-error">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
                        placeholder="John Doe"
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && <p id="name-error" className="text-error text-sm mt-2">{errors.name}</p>}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-ink font-medium">
                        Email Address <span className="text-error">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
                        placeholder="john@restaurant.com"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && <p id="email-error" className="text-error text-sm mt-2">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="company" className="text-ink font-medium">
                        Restaurant/Company
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
                        placeholder="Bella Vista Restaurant"
                        autoComplete="organization"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-ink font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
                        placeholder="(289) 332-0707"
                        autoComplete="tel"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                      {errors.phone && <p id="phone-error" className="text-error text-sm mt-2">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="topic" className="text-ink font-medium">
                        Topic <span className="text-error">*</span>
                      </Label>
                      <select
                        id="topic"
                        name="topic"
                        value={formData.topic}
                        onChange={handleInputChange}
                        className="mt-2 h-10 w-full rounded-md border border-border bg-panel px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-invalid={!!errors.topic}
                        aria-describedby={errors.topic ? 'topic-error' : undefined}
                        required
                      >
                        <option value="">Select a topic</option>
                        <option>Support</option>
                        <option>Sales</option>
                        <option>Partnerships</option>
                        <option>Other</option>
                      </select>
                      {errors.topic && <p id="topic-error" className="text-error text-sm mt-2">{errors.topic}</p>}
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-ink font-medium">
                        Subject <span className="text-error">*</span>
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
                        placeholder="Interested in QuickCheck for my restaurant"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                      />
                      {errors.subject && <p id="subject-error" className="text-error text-sm mt-2">{errors.subject}</p>}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="message" className="text-ink font-medium">
                        Message <span className="text-error">*</span>
                      </Label>
                      <span className={`text-xs ${chars < MESSAGE_MIN ? 'text-amber-700' : 'text-muted'}`}>
                        {messageHelp}
                      </span>
                    </div>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => {
                        if (e.target.value.length <= MESSAGE_MAX) handleInputChange(e);
                      }}
                      required
                      rows={6}
                      className="mt-2 border-border focus-visible:ring-2 focus-visible:ring-primary"
                      placeholder="Tell us about your restaurant and how we can help..."
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && <p id="message-error" className="text-error text-sm mt-2">{errors.message}</p>}
                  </div>

                  {/* Consent */}
                  <div className="space-y-2">
                    <label className="inline-flex items-start gap-3 select-none">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? 'consent-error' : undefined}
                        required
                      />
                      <span className="text-sm text-muted">
                        I agree to be contacted about my inquiry and understand my data will be handled
                        according to QuickCheck&apos;s policies.
                      </span>
                    </label>
                    {errors.consent && <p id="consent-error" className="text-error text-sm">{errors.consent}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full bg-primary hover:bg-primary-600 text-white py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted text-center">
                    Prefer email? Write to{' '}
                    <a className="underline underline-offset-4 hover:text-ink" href={`mailto:${EMAIL}`}>
                      {EMAIL}
                    </a>
                    .
                  </p>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted">Quick answers to common questions about QuickCheck</p>
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
            {[
              {
                q: 'How quickly can we get started?',
                a: 'Most restaurants are up and running within 24–48 hours. We provide full setup support and training.',
              },
              {
                q: 'Do you offer a free trial?',
                a: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required.',
              },
              {
                q: 'What kind of support do you provide?',
                a: 'We offer 24/7 email support, phone support during business hours, and comprehensive documentation.',
              },
              {
                q: 'Can QuickCheck integrate with our POS system?',
                a: 'Yes, we integrate with most major POS systems. Contact us to discuss your specific requirements.',
              },
            ].map((item, idx) => (
              <details key={idx} className="group rounded-lg border border-border bg-panel p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-medium text-ink">{item.q}</span>
                  <ChevronDown className="h-5 w-5 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

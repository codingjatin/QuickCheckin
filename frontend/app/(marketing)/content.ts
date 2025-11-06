// content.ts
import type { Language } from '@/lib/i18n'
import { useI18nStore } from '@/lib/i18n'
import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  BellRing,
  Building2,
  ClipboardList,
  LayoutDashboard,
  MailCheck,
  MessageCircle,
  Monitor,
  PlugZap,
  Presentation,
  Repeat,
  Settings2,
  ShieldCheck,
  Tablet,
  Timer,
  UserCheck,
  UserRound,
} from 'lucide-react'

// ---------------- Types ----------------

export type NavLink = {
  label: string
  href: string
}

export type ButtonLink = {
  label: string
  href: string
}

type StatItem = {
  value: string
  label: string
}

type ProblemPoint = {
  title: string
  description: string
}

type OutcomeItem = {
  stat: string
  description: string
}

type FeatureHighlight = {
  icon: LucideIcon
  title: string
  description: string
}

type DemoMessage = {
  title: string
  body: string
}

type IntegrationCard = {
  icon: LucideIcon
  title: string
  description: string
  bullets: string[]
}

type PlanPreview = {
  name: string
  price: string
  cadence?: string
  description: string
  highlight: string
  cta: ButtonLink
  featured?: boolean
  features?: string[]
}

type ComparisonRow = {
  feature: string
  starter: string
  pro: string
  enterprise: string
}

export type FAQItem = {
  question: string
  answer: string
}

type FeatureCluster = {
  category: string
  summary: string
  items: FeatureHighlight[]
}

type FooterContent = {
  tagline: string
  description: string
  columns: {
    title: string
    links: NavLink[]
  }[]
  legal: NavLink[]
  copyright: string
}

type LandingContent = {
  hero: {
    eyebrow: string
    title: string
    description: string
    primaryCta: ButtonLink
    secondaryCta: ButtonLink
    stats: StatItem[]
  }
  problemOutcome: {
    eyebrow: string
    title: string
    description: string
    problems: ProblemPoint[]
    outcomes: OutcomeItem[]
    note: string
    labels: {
      problemsHeading: string
      outcomesHeading: string
    }
  }
  // (Removed howItWorks)
  features: {
    title: string
    description: string
    highlights: FeatureHighlight[]
  }
  liveDemo: {
    title: string
    description: string
    inputLabel: string
    helperText: string
    submitLabel: string
    successMessage: string
    messages: DemoMessage[]
    placeholder?: string
    replyHint?: string
    fallbackGuest?: string
  }
  integrations: {
    eyebrow: string
    title: string
    description: string
    cards: IntegrationCard[]
    logos: string[]
  }
  pricingPreview: {
    eyebrow: string
    title: string
    description: string
    plans: PlanPreview[]
    link: ButtonLink
  }
  testimonials: {
    title: string
    description: string
    brands: string[]
    quotes: {
      quote: string
      author: string
      role: string
    }[]
  }
  reliability: {
    eyebrow: string
    title: string
    description: string
    highlights: OutcomeItem[]
    link: ButtonLink
  }
  cta: {
    title: string
    description: string
    primaryCta: ButtonLink
    secondaryCta: ButtonLink
  }
}

type PageHeroContent = {
  eyebrow?: string
  title: string
  description: string
  actions?: ButtonLink[]
}

type PricingContent = {
  hero: PageHeroContent
  plans: PlanPreview[]
  usageNotes: string[]
  comparison: ComparisonRow[]
  faq: FAQItem[]
}

type FeaturesContent = {
  hero: PageHeroContent
  clusters: FeatureCluster[]
  planHighlights: string[]
}

type MarketingContent = {
  announcement: string
  nav: {
    links: NavLink[]
    login: ButtonLink
    primaryCta: ButtonLink
  }
  landing: LandingContent
  pages: {
    // (Removed howItWorks page)
    features: FeaturesContent
    pricing: PricingContent
  }
  footer: FooterContent
}

// ---------------- Constants ----------------

const PARTNER_LOGOS = [
  'Toast',
  'Square',
  'Lightspeed',
  'SevenRooms',
  'Twilio',
  'Vonage',
  'Zapier',
  'Google Calendar',
] as const

const SOCIAL_PROOF_BRANDS = [
  'Seoul Kitchen Group',
  'Garden Bistro Collective',
  'Oak & Vine Hospitality',
  'Northern Lights Dining',
] as const

const CURRENT_YEAR = 2025 as const

// ---------------- Content (EN + FR) ----------------

const content: Record<Language, MarketingContent> = {
  en: {
    announcement:
      'QuickCheck v2 now supports two-way SMS and multi-location dashboards.',
    nav: {
      links: [
        { label: 'Home', href: '/' },
        // Removed: How it works
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Contact', href: '/contact' },
      ],
      login: { label: 'Log in', href: '/auth' },
      primaryCta: { label: 'Book a demo', href: '/contact' },
    },
    landing: {
      hero: {
        eyebrow: 'Digital waitlists that text back',
        title: 'Digital waitlists & reservations that text back.',
        description:
          'Reduce walk-offs, auto-notify guests, and track seating in real time. QuickCheck replaces clipboards with automated flows built for the dinner rush.',
        primaryCta: { label: 'Start free trial', href: '/pricing' },
        secondaryCta: { label: 'Book a demo', href: '/contact' },
        stats: [
          { value: '60k+', label: 'Guests seated through QuickCheck each month' },
          { value: '7 min', label: 'Average table reclaim after the first alert' },
          { value: '99.9%', label: 'Uptime target backed by status page transparency' },
        ],
      },
      problemOutcome: {
        eyebrow: 'Problem & outcome',
        title: 'Give hosts back their focus and guests their confidence',
        description:
          'Manual processes make the host stand chaotic. QuickCheck automates messaging and seating so service feels calm.',
        problems: [
          { title: 'Manual notes', description: 'Hosts juggle clipboards and sticky notes that never stay in sync.' },
          { title: 'Missed calls', description: 'Guests give up when no one can answer the phone during the dinner rush.' },
          { title: 'Blocked tables', description: 'Tables sit empty while staff chase no-shows and outdated wait times.' },
          { title: 'Poor guest comms', description: 'Guests stay in the dark, walk off, or crowd the host stand for updates.' },
        ],
        outcomes: [
          { stat: '30-60% fewer walk-offs', description: 'Automated SMS updates keep guests informed and eager to return.' },
          { stat: 'Faster table turns', description: 'Smart reassignment frees blocked tables the moment plans change.' },
          { stat: 'Happier staff & guests', description: 'Hosts focus on hospitality instead of spreadsheets and status calls.' },
        ],
        note: 'QuickCheck mirrors the steps your team already follows and adds automation where it matters.',
        labels: {
          problemsHeading: 'Pain points we eliminate',
          outcomesHeading: 'Outcomes restaurants see',
        },
      },
      // (Removed landing.howItWorks)
      features: {
        title: 'Key features built for busy floors',
        description:
          'Digital waitlists, two-way SMS, and smart seating combine into one platform that keeps your dining room humming.',
        highlights: [
          { icon: ClipboardList, title: 'Digital waitlists', description: 'Replace paper lists with synced kiosks, QR codes, and host tablets.' },
          { icon: MessageCircle, title: 'Two-way messaging', description: 'Guest replies update statuses instantly so staff never wonder who is coming back.' },
          { icon: Monitor, title: 'Real-time dashboard', description: 'View party statuses, table availability, and pacing metrics from any device.' },
          { icon: Repeat, title: 'Smart follow-ups', description: 'Automated nudges reclaim tables while your hosts stay focused on guests.' },
        ],
      },
      liveDemo: {
        title: 'Try the guest experience',
        description:
          'Drop in a number to see the automated SMS flow guests receive. This demo is instant and only simulates the experience—no messages are sent.',
        inputLabel: 'Enter a mobile number',
        helperText: "We'll never send a message to this number—it powers the preview only.",
        submitLabel: 'Preview SMS flow',
        successMessage: 'Preview updated for {{number}}.',
        fallbackGuest: 'your guest',
        placeholder: '(555) 123-4567',
        replyHint: 'Reply options: Y to confirm, N to release, STOP to opt out.',
        messages: [
          { title: 'Confirmation', body: "Thanks for joining the QuickCheck waitlist! We'll text you when your table is ready." },
          { title: 'Table ready', body: 'Your table is ready at Willow & Rye. Reply Y to hold it for 15 minutes or N to release.' },
          { title: 'Smart follow-up', body: "Still on your way? Reply Y to keep your spot. Otherwise we'll seat the next party." },
        ],
      },
      integrations: {
        eyebrow: 'Integrations',
        title: 'Works with your POS, SMS provider, and calendar',
        description:
          'QuickCheck connects to the tools you already rely on with secure APIs, webhooks, and native partnerships.',
        cards: [
          {
            icon: PlugZap,
            title: 'Connect your stack',
            description:
              'POS sync, messaging providers, and calendar workflows keep operations tightly aligned.',
            bullets: [
              'POS seat status updates and CSV exports',
              'Twilio, Vonage, and regional messaging partners',
              'Webhook triggers for CRMs and marketing tools',
              'Open REST API (beta) for custom flows',
            ],
          },
          {
            icon: ShieldCheck,
            title: 'Security first',
            description:
              'Role-based permissions, detailed audit logs, and encrypted messaging keep sensitive data safe.',
            bullets: [
              'Granular access controls by location and role',
              'Message retention rules and deletion workflows',
              'Carrier compliance checks with automatic alerts',
              'Encryption at rest and in transit by default',
            ],
          },
        ],
        logos: [...PARTNER_LOGOS],
      },
      pricingPreview: {
        eyebrow: 'Pricing teaser',
        title: 'Flexible plans for single sites and multi-location groups',
        description:
          'Start with a free trial, upgrade as you scale, and only pay for the locations you activate.',
        plans: [
          {
            name: 'Starter',
            price: '$149',
            cadence: 'per month',
            description: 'Single location waitlist with core messaging and kiosk mode.',
            highlight: 'Perfect for first-time digital waitlists.',
            cta: { label: 'Start trial', href: '/pricing' },
          },
          {
            name: 'Pro',
            price: '$349',
            cadence: 'per month',
            description: 'Multi-location management with advanced automations and integrations.',
            highlight: 'Most popular with growing groups.',
            featured: true,
            cta: { label: 'Book a demo', href: '/contact' },
          },
          {
            name: 'Enterprise',
            price: 'Custom',
            description: 'Custom SLAs, SSO, and white-glove onboarding for hospitality groups.',
            highlight: 'Purpose-built for national brands.',
            cta: { label: 'Talk to sales', href: '/contact' },
          },
        ],
        link: { label: 'View detailed pricing', href: '/pricing' },
      },
      testimonials: {
        title: 'Loved by fast-casuals and fine dining teams alike',
        description:
          'Operations teams choose QuickCheck to run every service with confident pacing, reliable messaging, and flexible controls.',
        brands: [...SOCIAL_PROOF_BRANDS],
        quotes: [
          { quote: 'QuickCheck cut our walk-offs in half in two weeks. Guests finally trust our quoted times.', author: 'Maria Rodriguez', role: 'Owner, Tapas Barcelona' },
          { quote: 'The kiosk freed our hosts to greet guests instead of juggling clipboards and phone calls.', author: 'James Park', role: 'Manager, Seoul Kitchen' },
          { quote: 'Multi-location reporting lets me see pacing and staffing issues before the weekend rush.', author: 'Sarah Chen', role: 'Director of Operations, Garden Bistro Group' },
        ],
      },
      reliability: {
        eyebrow: 'Compliance & reliability',
        title: 'Built for enterprise-grade reliability from day one',
        description:
          'QuickCheck protects guest data, keeps service online, and gives your security team the transparency they expect.',
        highlights: [
          { stat: '99.9% uptime target', description: 'Redundant infrastructure, status page transparency, and proactive monitoring.' },
          { stat: 'SOC 2 controls in progress', description: 'Role-based access, audit logs, and change management aligned to SOC 2 Type II.' },
          { stat: 'Regional SMS compliance', description: 'Consent, opt-out keywords, and sender ID guidance for North America and EU.' },
        ],
        link: { label: 'Read about security & compliance', href: '#' },
      },
      cta: {
        title: 'Launch your digital waitlist in minutes',
        description:
          'Sign up for a free trial or schedule a guided demo to see how QuickCheck keeps guests informed and your floor at capacity.',
        primaryCta: { label: 'Start free trial', href: '/pricing' },
        secondaryCta: { label: 'Talk to sales', href: '/contact' },
      },
    },
    pages: {
      // (Removed howItWorks)
      features: {
        hero: {
          eyebrow: 'Feature overview',
          title: 'Everything teams need to run a calm, connected service',
          description:
            'QuickCheck unifies guest check-in, two-way messaging, seating intelligence, and analytics in one platform built for hospitality.',
          actions: [
            { label: 'Compare plans', href: '/pricing' },
            { label: 'Download feature guide', href: '#' },
          ],
        },
        clusters: [
          {
            category: 'Waitlist & kiosk',
            summary: 'Branded experiences that keep guests informed from arrival to seating.',
            items: [
              { icon: Tablet, title: 'Self check-in kiosk', description: 'Custom logos, colors, and prompts that feel on-brand in every venue.' },
              { icon: UserRound, title: 'Walk-ins & reservations', description: 'Merge pre-booked parties with live walk-ins without losing track of order.' },
              { icon: UserCheck, title: 'Party size rules', description: 'Block over-capacity requests and flag special needs like patio or high chairs.' },
            ],
          },
          {
            category: 'Messaging engine',
            summary: 'Two-way SMS that keeps guests in the loop and staff in control.',
            items: [
              { icon: MailCheck, title: 'Responsive templates', description: 'Pre-built copy for confirmations, table-ready alerts, follow-ups, and no-show notices.' },
              { icon: BellRing, title: 'Smart reminders', description: 'Nudge guests after seven minutes with automated rules you control.' },
              { icon: ShieldCheck, title: 'Opt-out compliance', description: 'Respect TCPA and regional opt-out keywords with automatic logging.' },
            ],
          },
          {
            category: 'Smart seating',
            summary: 'Keep tables moving with real-time data and auto assignments.',
            items: [
              { icon: Timer, title: 'Grace periods', description: 'Hold tables for confirmed parties and release them once timers expire.' },
              { icon: LayoutDashboard, title: 'Table matching', description: 'Pair parties with the right table size, zone, and amenities automatically.' },
              { icon: Settings2, title: 'Staff overrides', description: 'Allow hosts to adjust priorities, mark no-shows, or seat walk-ins instantly.' },
            ],
          },
          {
            category: 'Analytics & admin',
            summary: 'Understand performance in real time across locations.',
            items: [
              { icon: Presentation, title: 'Live dashboards', description: 'Monitor wait times, table statuses, and pacing from any device.' },
              { icon: BarChart3, title: 'Conversion analytics', description: 'Track check-ins to seated conversions and identify walk-off trends.' },
              { icon: Building2, title: 'Multi-location controls', description: 'Super admins manage branding, rules, and reporting across sites.' },
            ],
          },
        ],
        planHighlights: [
          'Unlimited users on every plan.',
          'Multi-location controls unlock with Pro and Enterprise.',
          'Enterprise plans include SSO, SLAs, and dedicated onboarding.',
        ],
      },
      pricing: {
        hero: {
          eyebrow: 'Pricing',
          title: 'Plans that flex with service volume',
          description:
            'No per-user fees. Activate new locations in minutes and only pay for the seats you manage.',
          actions: [
            { label: 'Start free trial', href: '/contact' },
            { label: 'Talk to sales', href: '/contact' },
          ],
        },
        plans: [
          {
            name: 'Starter',
            price: '$149',
            cadence: 'per month',
            description: 'Single location waitlist with core messaging and kiosk mode.',
            highlight: 'Perfect for first-time digital waitlists.',
            features: [
              'Unlimited waitlist parties',
              'Self check-in kiosk & QR flows',
              'Table-ready & reminder SMS',
              'Real-time host dashboard',
              'Basic analytics & exports',
            ],
            cta: { label: 'Start free trial', href: '/contact' },
          },
          {
            name: 'Pro',
            price: '$349',
            cadence: 'per month',
            description: 'Multi-location management with advanced automations and integrations.',
            highlight: 'Most popular with growing groups.',
            features: [
              'Everything in Starter',
              'Multi-location controls',
              'Advanced seating rules & follow-ups',
              'POS & calendar integrations',
              'Branding controls per venue',
            ],
            featured: true,
            cta: { label: 'Book a demo', href: '/contact' },
          },
          {
            name: 'Enterprise',
            price: 'Talk to us',
            description: 'Custom SLAs, SSO, and white-glove onboarding for hospitality groups.',
            highlight: 'Purpose-built for national brands.',
            features: [
              'Dedicated success manager',
              'SSO & SCIM provisioning',
              'Custom integrations',
              'Advanced reporting APIs',
              '24/7 priority support',
            ],
            cta: { label: 'Contact sales', href: '/contact' },
          },
        ],
        usageNotes: [
          'SMS and WhatsApp credits included with fair-use tiers. Regional pricing available.',
          'Overage rates apply beyond pooled credits with alerts before thresholds are met.',
          'Annual contracts include two months free and onboarding concierge.',
        ],
        comparison: [
          { feature: 'Locations', starter: '1', pro: 'Up to 10', enterprise: 'Unlimited' },
          { feature: 'Two-way messaging', starter: 'Included', pro: 'SMS + WhatsApp', enterprise: 'Custom routing' },
          { feature: 'Integrations', starter: 'CSV exports', pro: 'POS, calendar, webhooks', enterprise: 'Custom + API access' },
          { feature: 'Analytics', starter: 'Core dashboards', pro: 'Advanced insights', enterprise: 'Data warehouse feeds' },
          { feature: 'Support', starter: 'Chat & email', pro: 'Phone + success reviews', enterprise: 'Dedicated team' },
        ],
        faq: [
          { question: 'How long is the free trial?', answer: 'Starter plans include a 14-day trial with full access to kiosk, messaging, and analytics features.' },
          { question: 'What payment methods do you accept?', answer: 'Credit card or ACH for monthly plans. Annual contracts support invoicing and procurement workflows.' },
          { question: 'Can we cancel anytime?', answer: "Yes. Monthly plans can be cancelled anytime. Annual plans require 30 days' notice before renewal." },
          { question: 'Do you charge per SMS?', answer: 'Each plan includes pooled SMS credits sized to typical usage. Overages are billed at regional market rates.' },
          { question: 'Is onboarding included?', answer: 'Starter includes guided setup. Pro and Enterprise add dedicated onboarding sessions and staff training materials.' },
        ],
      },
    },
    footer: {
      tagline: 'QuickCheck',
      description:
        'Digital waitlists, two-way SMS, and real-time dashboards that keep seats full and guests informed.',
      columns: [
        {
          title: 'Product',
          links: [
            // removed: { label: 'How it works', href: '/how-it-works' }
            { label: 'Features', href: '/features' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Security & compliance', href: '#' },
            { label: 'Contact', href: '/contact' },
          ],
        },
        {
          title: 'Resources',
          links: [
            { label: 'Case studies', href: '#' },
            { label: 'Resource library', href: '#' },
            { label: 'FAQ', href: '#' },
            { label: 'Status page', href: '#' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About', href: '#' },
            { label: 'Careers', href: '#' },
            { label: 'Contact sales', href: '/contact' },
            { label: 'Privacy & terms', href: '#' },
          ],
        },
      ],
      legal: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Security', href: '#' },
      ],
      copyright: '\u00A9 ' + CURRENT_YEAR + ' QuickCheck. All rights reserved.',
    },
  },

  fr: {
    announcement:
      'QuickCheck v2 prend désormais en charge la messagerie bidirectionnelle et les tableaux de bord multi-sites.',
    nav: {
      links: [
        { label: 'Accueil', href: '/' },
        // supprimé : Comment ça marche
        { label: 'Fonctionnalités', href: '/features' },
        { label: 'Tarifs', href: '/pricing' },
        { label: 'Contact', href: '/contact' },
      ],
      login: { label: 'Connexion', href: '/auth' },
      primaryCta: { label: 'Réserver une démo', href: '/contact' },
    },
    landing: {
      hero: {
        eyebrow: "Listes d'attente numériques qui répondent",
        title: "Listes d'attente et réservations numériques qui envoient des SMS.",
        description:
          "Réduisez les abandons, avertissez automatiquement les clients et suivez l'occupation des tables en temps réel. QuickCheck remplace les carnets papier par des flux automatisés pensés pour les heures de pointe.",
        primaryCta: { label: "Démarrer l'essai gratuit", href: '/pricing' },
        secondaryCta: { label: 'Réserver une démo', href: '/contact' },
        stats: [
          { value: '60k+', label: 'Convives installés chaque mois grâce à QuickCheck' },
          { value: '7 min', label: 'Délai moyen pour réattribuer une table après la première alerte' },
          { value: '99,9%', label: 'Objectif de disponibilité avec transparence sur la page statut' },
        ],
      },
      problemOutcome: {
        eyebrow: 'Problème & impact',
        title: 'Redonnez sérénité à vos hôtes et confiance à vos clients',
        description:
          "Les processus manuels rendent le comptoir d'accueil chaotique. QuickCheck automatise la messagerie et l'attribution des tables pour un service fluide.",
        problems: [
          { title: 'Notes manuscrites', description: 'Les hôtes jonglent entre carnets et post-it jamais synchronisés.' },
          { title: 'Appels manqués', description: 'Les clients abandonnent quand personne ne répond pendant le rush du dîner.' },
          { title: 'Tables bloquées', description: "Des tables restent vides tandis qu'on gère absences et estimations obsolètes." },
          { title: 'Communication limitée', description: 'Les clients restent dans le flou, partent ou se massent au comptoir pour demander des nouvelles.' },
        ],
        outcomes: [
          { stat: "30-60 % d'abandons en moins", description: 'Des SMS automatisés tiennent les clients informés et motivés à revenir.' },
          { stat: 'Rotation des tables accélérée', description: 'La réaffectation intelligente libère immédiatement les tables quand un plan change.' },
          { stat: 'Équipes et clients satisfaits', description: "Les hôtes se concentrent sur l'accueil plutôt que sur tableurs et appels." },
        ],
        note: "QuickCheck s'adapte à vos méthodes actuelles et automatise uniquement ce qui crée de la valeur.",
        labels: {
          problemsHeading: 'Irritants que nous éliminons',
          outcomesHeading: 'Résultats constatés par les restaurants',
        },
      },
      // (Supprimé: landing.howItWorks)
      features: {
        title: 'Des fonctionnalités pensées pour les salles animées',
        description:
          "Listes d'attente numériques, SMS bidirectionnels et assignations intelligentes réunis dans une même plateforme.",
        highlights: [
          { icon: ClipboardList, title: "Listes d'attente digitalisées", description: 'Remplacez le papier par des kiosques, QR codes et tablettes synchronisés.' },
          { icon: MessageCircle, title: 'Messagerie bidirectionnelle', description: "Les réponses clients mettent à jour le statut en temps réel sans stress pour l'équipe." },
          { icon: Monitor, title: 'Tableau de bord temps réel', description: 'Visualisez les statuts, la disponibilité des tables et le rythme du service.' },
          { icon: Repeat, title: 'Relances intelligentes', description: "Des rappels automatiques pour récupérer les tables tout en gardant l'accueil concentré." },
        ],
      },
      liveDemo: {
        title: "Testez l'expérience client",
        description:
          "Saisissez un numéro pour visualiser le flux de SMS automatisés. Démo instantanée, aucun message réel n'est envoyé.",
        inputLabel: 'Entrez un numéro de mobile',
        helperText: 'Aucun SMS ne sera envoyé : ce numéro sert uniquement à la prévisualisation.',
        submitLabel: 'Prévisualiser le flux SMS',
        successMessage: 'Prévisualisation mise à jour pour {{number}}.',
        fallbackGuest: 'votre invité',
        placeholder: '06 12 34 56 78',
        replyHint: 'Réponses possibles : O pour confirmer, N pour libérer, STOP pour se désinscrire.',
        messages: [
          { title: 'Confirmation', body: "Merci d'avoir rejoint la liste d'attente QuickCheck ! Nous vous avertirons quand votre table sera prête." },
          { title: 'Table prête', body: 'Votre table est prête chez Willow & Rye. Répondez O pour la garder 15 minutes ou N pour la libérer.' },
          { title: 'Relance intelligente', body: 'Toujours en route ? Répondez O pour conserver votre place, sinon nous assignerons le groupe suivant.' },
        ],
      },
      integrations: {
        eyebrow: 'Intégrations',
        title: 'Compatible avec votre POS, vos SMS et vos agendas',
        description:
          "QuickCheck s'intègre à vos outils via API sécurisées, webhooks et partenariats natifs.",
        cards: [
          {
            icon: PlugZap,
            title: 'Connectez votre stack',
            description:
              'Synchronisation POS, fournisseurs SMS et workflows calendaires pour une exploitation alignée.',
            bullets: [
              "Mises à jour d'état des tables et exports CSV",
              'Partenaires SMS : Twilio, Vonage et acteurs régionaux',
              'Webhooks vers CRM et outils marketing',
              'API REST (bêta) pour les flux sur mesure',
            ],
          },
          {
            icon: ShieldCheck,
            title: 'Sécurité avant tout',
            description:
              "Permissions par rôle, journaux d'audit et messages chiffrés pour protéger vos données.",
            bullets: [
              "Contrôles d'accès granulaires par site et rôle",
              'Règles de conservation et workflows de suppression',
              'Alertes automatiques de conformité opérateur',
              'Chiffrement au repos et en transit par défaut',
            ],
          },
        ],
        logos: [...PARTNER_LOGOS],
      },
      pricingPreview: {
        eyebrow: 'Aperçu des tarifs',
        title: 'Des offres flexibles pour un ou plusieurs établissements',
        description:
          'Commencez avec un essai gratuit, montez en gamme selon vos besoins et ne payez que les sites activés.',
        plans: [
          {
            name: 'Starter',
            price: '149 $',
            cadence: 'par mois',
            description: 'Une adresse avec messagerie essentielle et mode kiosque.',
            highlight: "Idéal pour digitaliser sa liste d'attente.",
            cta: { label: "Démarrer l'essai", href: '/pricing' },
          },
          {
            name: 'Pro',
            price: '349 $',
            cadence: 'par mois',
            description: 'Gestion multi-sites avec automatisations avancées et intégrations.',
            highlight: 'Formule plébiscitée par les groupes en croissance.',
            featured: true,
            cta: { label: 'Réserver une démo', href: '/contact' },
          },
          {
            name: 'Enterprise',
            price: 'Sur devis',
            description: 'SLA personnalisés, SSO et accompagnement premium pour réseaux nationaux.',
            highlight: 'Pensé pour les chaînes multi-marques.',
            cta: { label: 'Contacter les ventes', href: '/contact' },
          },
        ],
        link: { label: 'Voir les tarifs détaillés', href: '/pricing' },
      },
      testimonials: {
        title: 'Approuvé par les restaurants rapides et gastronomiques',
        description:
          "Les équipes d'exploitation choisissent QuickCheck pour un service rythmé, une messagerie fiable et un pilotage souple.",
        brands: [...SOCIAL_PROOF_BRANDS],
        quotes: [
          { quote: 'QuickCheck a réduit de moitié nos départs en deux semaines. Les clients font confiance à nos délais.', author: 'Maria Rodriguez', role: 'Propriétaire, Tapas Barcelona' },
          { quote: 'Le kiosque libère nos hôtes : ils accueillent les clients plutôt que de jongler avec carnets et téléphone.', author: 'James Park', role: 'Manager, Seoul Kitchen' },
          { quote: "Les rapports multi-sites me permettent d'anticiper les besoins en personnel avant les pics.", author: 'Sarah Chen', role: 'Directrice des opérations, Garden Bistro Group' },
        ],
      },
      reliability: {
        eyebrow: 'Fiabilité & conformité',
        title: 'Une fiabilité de niveau entreprise dès le premier jour',
        description:
          'QuickCheck protège les données clients, assure la continuité du service et offre la transparence attendue par vos équipes sécurité.',
        highlights: [
          { stat: 'Disponibilité cible 99,9 %', description: 'Infrastructure redondante, page de statut publique et surveillance proactive.' },
          { stat: 'Contrôles SOC 2 en cours', description: "Gestion des accès, journaux d'audit et gouvernance des changements alignés sur SOC 2 type II." },
          { stat: 'Conformité SMS régionale', description: "Consentement, mots-clés STOP et identité d'expéditeur adaptés aux marchés nord-américain et européen." },
        ],
        link: { label: 'En savoir plus sur la sécurité', href: '#' },
      },
      cta: {
        title: "Déployez votre liste d'attente digitale en quelques minutes",
        description:
          "Essayez QuickCheck gratuitement ou planifiez une démo guidée pour découvrir comment l'outil informe vos clients et optimise vos tables.",
        primaryCta: { label: "Démarrer l'essai gratuit", href: '/pricing' },
        secondaryCta: { label: 'Contacter les ventes', href: '/contact' },
      },
    },
    pages: {
      // (Supprimé : howItWorks)
      features: {
        hero: {
          eyebrow: 'Panorama des fonctionnalités',
          title: "Tout ce qu'il faut pour un service fluide et connecté",
        description:
            "QuickCheck réunit check-in client, messagerie bidirectionnelle, intelligence d'attribution et analytics dans une plateforme dédiée à la restauration.",
          actions: [
            { label: 'Comparer les offres', href: '/pricing' },
            { label: 'Télécharger le guide', href: '#' },
          ],
        },
        clusters: [
          {
            category: "Liste d'attente & kiosque",
            summary:
              'Des expériences à votre image qui informent les clients du hall à la table.',
            items: [
              { icon: Tablet, title: 'Kiosque libre-service', description: 'Logos, couleurs et messages personnalisés pour chaque concept.' },
              { icon: UserRound, title: 'Walk-ins & réservations', description: 'Fusionnez réservations et arrivées spontanées sans perdre la priorité.' },
              { icon: UserCheck, title: 'Règles par taille de groupe', description: 'Bloquez les demandes hors capacité et signalez les besoins spécifiques.' },
            ],
          },
          {
            category: 'Moteur de messagerie',
            summary:
              'SMS bidirectionnels qui informent les clients et simplifient le pilotage.',
            items: [
              { icon: MailCheck, title: 'Modèles réactifs', description: "Confirmations, alertes table prête, relances et messages d'absence prêts à l'emploi." },
              { icon: BellRing, title: 'Rappels intelligents', description: 'Relances après sept minutes ou selon vos règles par établissement.' },
              { icon: ShieldCheck, title: 'Conformité opt-out', description: 'Respect automatique des mots-clés STOP et journalisation des consentements.' },
            ],
          },
          {
            category: 'Attribution intelligente',
            summary:
              "Gardez les tables en mouvement grâce aux données et à l'automatisation.",
            items: [
              { icon: Timer, title: 'Délais de grâce', description: 'Conservez la table pour les confirmations puis libérez-la automatiquement.' },
              { icon: LayoutDashboard, title: 'Appariement des tables', description: 'Associez automatiquement la bonne table selon taille, zone et contraintes.' },
              { icon: Settings2, title: 'Override maîtrisé', description: "Permettez aux hôtes d'ajuster priorités ou no-show en un geste." },
            ],
          },
          {
            category: 'Analytics & admin',
            summary:
              "Comprenez les performances et pilotez l'expérience à l'échelle.",
            items: [
              { icon: Presentation, title: 'Tableaux de bord live', description: 'Suivez attentes, statuts et rythme de service sur tout appareil.' },
              { icon: BarChart3, title: 'Analyses de conversion', description: "Analysez le passage du check-in à l'installation et détectez les abandons." },
              { icon: Building2, title: 'Contrôle multi-sites', description: 'Les super admins ajustent branding, règles et rapports par établissement.' },
            ],
          },
        ],
        planHighlights: [
          'Utilisateurs illimités sur chaque formule.',
          "Fonctions multi-sites disponibles dès l'offre Pro.",
          'Enterprise inclut SSO, SLA et onboarding dédié.',
        ],
      },
      pricing: {
        hero: {
          eyebrow: 'Tarification',
          title: "Des formules qui s'adaptent à votre volume",
          description:
            'Aucun coût par utilisateur. Activez de nouveaux sites en quelques minutes et payez uniquement ceux que vous exploitez.',
          actions: [
            { label: "Lancer l'essai gratuit", href: '/contact' },
            { label: 'Contacter les ventes', href: '/contact' },
          ],
        },
        plans: [
          {
            name: 'Starter',
            price: '149 $',
            cadence: 'par mois',
            description: 'Une localisation avec messagerie et kiosque essentiels.',
            highlight: 'Idéal pour une première digitalisation.',
            features: [
              'Groupes illimités',
              "Kiosque & QR d'auto-enregistrement",
              'SMS table prête & rappels',
              'Tableau de bord hôte',
              'Analyses et exports de base',
            ],
            cta: { label: "Démarrer l'essai gratuit", href: '/contact' },
          },
          {
            name: 'Pro',
            price: '349 $',
            cadence: 'par mois',
            description: 'Gestion multi-sites avec automatisations avancées et intégrations POS.',
            highlight: 'Formule préférée des groupes en croissance.',
            features: [
              'Tout Starter inclus',
              'Pilotage multi-établissements',
              "Règles d'attribution avancées",
              'Intégrations POS & agenda',
              'Contrôles de marque par site',
            ],
            featured: true,
            cta: { label: 'Réserver une démo', href: '/contact' },
          },
          {
            name: 'Enterprise',
            price: 'Sur devis',
            description: 'SLA personnalisés, SSO et accompagnement premium pour groupes nationaux.',
            highlight: 'Pensé pour les réseaux multi-marques.',
            features: [
              'Customer success dédié',
              'Provisionnement SSO & SCIM',
              'Intégrations sur mesure',
              'API de reporting avancées',
              'Support prioritaire 24/7',
            ],
            cta: { label: 'Contacter les ventes', href: '/contact' },
          },
        ],
        usageNotes: [
          'Crédits SMS et WhatsApp inclus avec alertes avant dépassement.',
          'Surcoûts appliqués au-delà du forfait, au tarif régional.',
          'Contrats annuels : deux mois offerts et onboarding accompagné.',
        ],
        comparison: [
          { feature: 'Sites inclus', starter: '1', pro: "Jusqu'à 10", enterprise: 'Illimités' },
          { feature: 'Messagerie bidirectionnelle', starter: 'SMS inclus', pro: 'SMS + WhatsApp', enterprise: 'Routage personnalisé' },
          { feature: 'Intégrations', starter: 'Exports CSV', pro: 'POS, agenda, webhooks', enterprise: 'Sur mesure + API' },
          { feature: 'Analyses', starter: 'Dashboards essentiels', pro: 'Insights avancés', enterprise: 'Flux data warehouse' },
          { feature: 'Support', starter: 'Chat & email', pro: 'Téléphone + revues succès', enterprise: 'Équipe dédiée' },
        ],
        faq: [
          { question: "Quelle est la durée de l'essai gratuit ?", answer: "L'offre Starter inclut 14 jours d'essai avec accès complet au kiosque, à la messagerie et aux analyses." },
          { question: 'Quels moyens de paiement acceptez-vous ?', answer: 'Cartes bancaires ou prélèvement ACH mensuel. Les contrats annuels acceptent la facturation.' },
          { question: 'Peut-on résilier à tout moment ?', answer: 'Oui pour les formules mensuelles. Les contrats annuels nécessitent 30 jours de préavis.' },
          { question: 'Facturez-vous chaque SMS ?', answer: 'Chaque offre comprend des crédits mutualisés. Les dépassements sont facturés au tarif régional.' },
          { question: "L'onboarding est-il inclus ?", answer: 'Starter inclut un accompagnement guidé. Pro et Enterprise ajoutent sessions dédiées et supports.' },
        ],
      },
    },
    footer: {
      tagline: 'QuickCheck',
      description:
        "Listes d'attente numériques, SMS bidirectionnels et tableaux de bord pour garder vos tables remplies et vos clients informés.",
      columns: [
        {
          title: 'Produit',
          links: [
            // supprimé : { label: 'Comment ça marche', href: '/how-it-works' }
            { label: 'Fonctionnalités', href: '/features' },
            { label: 'Tarifs', href: '/pricing' },
            { label: 'Sécurité & conformité', href: '#' },
          ],
        },
        {
          title: 'Ressources',
          links: [
            { label: 'Études de cas', href: '#' },
            { label: 'Bibliothèque', href: '#' },
            { label: 'FAQ', href: '#' },
            { label: 'Page statut', href: '#' },
          ],
        },
        {
          title: 'Entreprise',
          links: [
            { label: 'À propos', href: '#' },
            { label: 'Carrières', href: '#' },
            { label: 'Contacter les ventes', href: '/contact' },
            { label: 'Confidentialité & conditions', href: '#' },
          ],
        },
      ],
      legal: [
        { label: 'Politique de confidentialité', href: '#' },
        { label: "Conditions d'utilisation", href: '#' },
        { label: 'Sécurité', href: '#' },
      ],
      copyright:
        '\u00A9 ' + CURRENT_YEAR + ' QuickCheck. Tous droits réservés.',
    },
  },
}

// ---------- Server-safe selectors & (optional) hook-like accessors ----------

export function getMarketingContent(language?: Language): MarketingContent {
  const lang =
    language && content[language as keyof typeof content] ? language : 'en'
  return content[lang as keyof typeof content] ?? content.en
}

export function useMarketingContent() {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    return content.en
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { language } = useI18nStore()
  return getMarketingContent(language)
}

/** Convenience accessors */
export const useNav = () => useMarketingContent().nav
export const useAnnouncement = () => useMarketingContent().announcement
export const useFooter = () => useMarketingContent().footer
export const useHero = () => useMarketingContent().landing.hero
export const usePricingPreview = () => useMarketingContent().landing.pricingPreview

// ---------- Named re-exports for components ----------
export const partnerLogos = [...PARTNER_LOGOS]
export const socialProofBrands = [...SOCIAL_PROOF_BRANDS]

// Components often read these directly:
export const homeFeatureHighlights = content.en.landing.features.highlights
export const problemPoints = content.en.landing.problemOutcome.problems
export const positiveOutcomes = content.en.landing.problemOutcome.outcomes
export const complianceHighlights = content.en.landing.reliability.highlights
export const testimonials = content.en.landing.testimonials.quotes

// Features & Pricing pages need these:
export const featureClusters = content.en.pages.features.clusters
export const pricingPlans = content.en.pages.pricing.plans
export const usageNotes = content.en.pages.pricing.usageNotes
export const comparisonMatrix = content.en.pages.pricing.comparison
export const pricingFaq = content.en.pages.pricing.faq

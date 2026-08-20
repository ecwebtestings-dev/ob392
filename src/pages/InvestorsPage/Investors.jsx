'use client'

import { useEffect, useState } from 'react'
import {
  BuildingLibraryIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'



const TOC = [
  { id: 'exec-summary', number: '01', title: 'Executive Summary' },
  { id: 'challenge', number: '02', title: 'The Challenge' },
  { id: 'solution', number: '03', title: 'The Solution' },
  { id: 'chapter-a', number: '04', title: 'Chapter A — Enterprise Development' },
  { id: 'chapter-b', number: '05', title: 'Chapter B — Agricultural Transformation' },
  { id: 'commercial-model', number: '06', title: 'Commercial Model & Revenue Streams' },
  { id: 'market-advantage', number: '07', title: 'Market & Competitive Advantage' },
  { id: 'roadmap', number: '08', title: 'Implementation Strategy' },
  { id: 'resources', number: '09', title: 'Key Resources & Partnerships' },
  { id: 'governance', number: '10', title: 'Governance, Compliance & Risk' },
  { id: 'impact', number: '11', title: 'Expected Results & Impact' },
  { id: 'investment', number: '12', title: 'Funding & Investment Requirement' },
  { id: 'proposition', number: '13', title: 'Investment & Partnership Proposition' },
  { id: 'conclusion', number: '14', title: 'Conclusion' },
]

/* ── Small building blocks ─────────────────────────────────────────────── */

function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full  px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-badges">
      {children}
    </span>
  )
}


function BulletList({ items }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-text-color">
          <CheckCircleIcon className="mt-0.5 size-4 flex-none text-icons" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Section({ id, number, title, children }) {
  return (
    <section id={id} className="reveal scroll-mt-24 border-t border-badge-bg py-12 sm:scroll-mt-28 sm:py-20">
      <div className="flex items-center gap-4 sm:items-start sm:gap-5">
        <span className="flex size-9 flex-none items-center justify-center rounded-full bg-background font-mono text-xs font-bold tabular-nums text-white sm:size-10 sm:text-sm">
          {number}
        </span>
        <h2 className="text-[1.3rem] font-bold leading-snug tracking-tight text-heading sm:pt-1 sm:text-[1.65rem]">{title}</h2>
      </div>
      <div className="mt-6 max-w-3xl sm:mt-8 sm:pl-14">{children}</div>
    </section>
  )
}

export default function PartnersPage() {
  const [activeId, setActiveId] = useState(TOC[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let revealObserver
    if (!prefersReducedMotion) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal-in')
              revealObserver.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
      )
      document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))
    } else {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('reveal-in'))
    }

    return () => {
      observer.disconnect()
      if (revealObserver) revealObserver.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans">
      <style>{`
        .reveal { opacity: 0; transform: translateY(14px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal-in { opacity: 1; transform: translateY(0); }
        a:focus-visible, button:focus-visible { outline: 2px solid var(--color-badges); outline-offset: 3px; }
        .dot-leader { border-bottom: 1px dotted var(--color-badge-bg); }
      `}</style>

      {/* HERO */}
      <div className="relative overflow-hidden bg-background lg:h-screen">
        <div className="pointer-events-none absolute -top-32 right-[-6rem] h-[28rem] w-[28rem] rounded-full bg-background opacity-[0.12] blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-8rem] left-[-4rem] h-[22rem] w-[22rem] rounded-full bg-background opacity-[0.06] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-28 lg:px-8 lg:pt-34 ">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-start " >
            <div className="max-w-3xl">
              <Eyebrow>OB39 Limited &middot; Concept Note</Eyebrow>

              <h1 className="mt-6 text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[3.1rem]">
                Integrated Business Development &amp; Agricultural Transformation
              </h1>

              <p className="mt-7 max-w-3xl text-sm leading-relaxed text-hero-text">
                OB39 Limited is a developing Project , connecting young businesses,
                smallholder farmers, markets, capital and technology  beginning with
                controlled implementation in Uganda, scaling toward East Africa and
                international markets.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-button-bg px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-button-hover"
                >
                  Concept Note
                  <ArrowRightIcon className="size-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Partner With Us
                </a>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      {/* MOBILE TOC */}
      <div className="sticky top-0 z-10 border-b border-badge-bg bg-white/95 backdrop-blur lg:hidden">
        <div className="flex gap-2 overflow-x-auto px-6 py-3">
          {TOC.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex-none whitespace-nowrap rounded-full bg-badge-bg px-3 py-1.5 text-xs font-medium text-badges"
            >
              {item.number} · {item.title}
            </a>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-16">

          {/* DESKTOP SIDEBAR — index with dot leaders */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28 space-y-0.5">
              <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-badges">
                Contents
              </p>
              {TOC.map((item) => {
                const isActive = activeId === item.id
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-baseline gap-2 py-1.5 text-[0.78rem] leading-snug transition-colors"
                  >
                    <span
                      className="whitespace-nowrap"
                      style={{ color: isActive ? 'var(--color-heading)' : 'var(--color-text-color)', fontWeight: isActive ? 700 : 400 }}
                    >
                      {item.title}
                    </span>
                    <span className="dot-leader flex-1 translate-y-[-3px]" />
                    <span className={`font-mono tabular-nums ${isActive ? 'text-badges' : 'text-text-color/50'}`}>
                      {item.number}
                    </span>
                  </a>
                )
              })}
            </nav>
          </aside>

          {/* CONTENT */}
          <div>

            <Section id="exec-summary" number="01" title="Executive Summary">
              <p className="text-sm leading-relaxed text-text-color">
                OB39 Limited is a developing Project , an integrated commercial and
                development initiative addressing two barriers to economic growth: the
                difficulty young and developing businesses face in accessing growth
                resources, business knowledge and markets, and the constraints
                small-scale farmers face in accessing inputs, technical knowledge,
                labour, storage and reliable markets.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-color">
                We are operating through two complementary pillars  Chapter A
                (Enterprise Development) and Chapter B (Agricultural Transformation) 
                building toward a commercially sustainable platform connecting people,
                businesses, farmers, productive resources, technology, markets,
                logistics and investment. OB39 is beginning with controlled
                implementation in Uganda, validating the operating model, and
                strengthening governance ahead of progressive expansion.
              </p>
            </Section>

            <Section id="challenge" number="02" title="The Challenge">
              <h3 className="text-base font-bold text-heading">Enterprise Development</h3>
              <BulletList
                items={[
                  'Limited access to appropriate growth capital',
                  'Weak bookkeeping and financial-management practices',
                  'Poor saving cultures and limited business knowledge',
                  'Small customer bases and business insecurity',
                  'Difficulties sustaining and expanding operations',
                ]}
              />
              <h3 className="mt-9 text-base font-bold text-heading">Agricultural Constraints</h3>
              <BulletList
                items={[
                  'Poor or inappropriate farming methods and limited input access',
                  'Shortage of farm labour, tools and equipment',
                  'Inadequate storage and insufficient agricultural knowledge',
                  'Weak market information, bargaining power and exploitation by intermediaries',
                  'Difficulties meeting international food-safety and export standards',
                ]}
              />
            </Section>

            <Section id="solution" number="03" title="The Solution">
              <p className="text-sm leading-relaxed text-text-color">
                OB39 Limited is built on five core interventions, applied in sequence
                to both businesses and farmers:
              </p>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {[
                  ['I', 'Organize', 'Structuring participants into accountable, coordinated units.'],
                  ['II', 'Equip', 'Providing knowledge, inputs, resources, business support and technology.'],
                  ['III', 'Develop', 'Delivering financial-management, business-development and agricultural training.'],
                  ['IV', 'Connect', 'Linking participants to suppliers, buyers, investors and institutions.'],
                  ['V', 'Grow', 'Converting resources and market access into income and community development.'],
                ].map(([num, label, desc]) => (
                  <div key={label} className="rounded-xl bg-card-background p-6">
                    <span className="text-xs font-bold tracking-wider text-icons">{num}</span>
                    <p className="mt-1 text-sm font-bold text-heading">{label}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-color">{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="chapter-a" number="04" title="Chapter A Enterprise Development">
              <p className="text-sm leading-relaxed text-text-color">
                OB39 is reaching young and developing businesses through agents and
                organizing them into units of approximately 60 members.
              </p>
              <h3 className="mt-8 text-base font-bold text-heading">Services</h3>
              <BulletList
                items={[
                  'Growth-oriented capital',
                  'Business and financial-management training',
                  'Bookkeeping, reporting and savings-discipline support',
                  'Marketing, sales and business-networking opportunities',
                  'Domestic and international market access',
                ]}
              />
              <h3 className="mt-9 text-base font-bold text-heading">Operating Model</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-color">
                Participating businesses are contributing an agreed proportion of daily
                profits originally structured at 10%, 20% or 30% tiers  into pooled,
                controlled financial arrangements supporting rotational expansion across
                the group. The precise financial structure, eligibility and legal
                treatment are being established through formal agreements ahead of
                implementation.
              </p>
            </Section>

            <Section id="chapter-b" number="05" title="Chapter B — Agricultural Transformation">
              <p className="text-sm leading-relaxed text-text-color">
                Chapter B is targeting small- and medium-scale farmers, rural
                households, farmer groups and cooperatives, alongside agricultural
                exporters, food processors, international buyers, government
                programmes and development partners.
              </p>
              <h3 className="mt-8 text-base font-bold text-heading">Farmer Organization</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-color">
                Farmers are organized into units of approximately 15 households,
                working together on a rotational basis across planting, weeding,
                fertilizer application, harvesting and storage preparation  reducing
                labour constraints and strengthening cooperation.
              </p>
              <h3 className="mt-9 text-base font-bold text-heading">Agricultural Services</h3>
              <BulletList
                items={[
                  'Soil assessment and certified seeds/inputs',
                  'Modern farming practices and pest/disease management',
                  'Harvesting, post-harvest and quality-management training',
                  'Product aggregation and storage coordination',
                  'Market information and export-market linkages',
                ]}
              />
            </Section>

            <Section id="commercial-model" number="06" title="Commercial Model & Revenue Streams">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-card-background p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-heading">Chapter A</h3>
                  <BulletList
                    items={[
                      'Business-development services',
                      'Marketing & sales platforms',
                      'Joint ventures & business networks',
                      'Approved operational allocations',
                      'International business opportunities',
                    ]}
                  />
                </div>
                <div className="rounded-2xl bg-card-background p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-heading">Chapter B</h3>
                  <BulletList
                    items={[
                      'Export trading margin',
                      'Export facilitation fees (aggregation, QA, documentation)',
                      'Agricultural input coordination',
                      'Processing & value addition',
                      'Strategic partnerships with development funds and donors',
                    ]}
                  />
                </div>
              </div>
            </Section>

            <Section id="market-advantage" number="07" title="Market & Competitive Advantage">
              <BulletList
                items={[
                  'Integrated Support — combining technical, financial, organizational and market solutions',
                  'Collective Organization — structured units enabling shared labour, knowledge and coordinated action',
                  'Direct Market Access — reducing unnecessary intermediary layers to improve farmer returns',
                  'Capacity Building — equipping participants with skills for sustainable growth',
                  'Quality Focus — linking production to quality assurance and market standards',
                  'International Ambition — developing export-capable businesses and value chains',
                ]}
              />
            </Section>

            <Section id="roadmap" number="08" title="Implementation Strategy">
              <div className="space-y-5">
                {[
                  ['Foundation', 'Corporate and legal structuring, governance and financial systems, key personnel, regulatory preparation.'],
                  ['Pilot', 'Establishing controlled business and farmer groups in Uganda to test unit structures, training, systems and market linkages.'],
                  ['Expansion', 'Scaling successful pilot activities based on demonstrated capacity, sustainability, demand and compliance.'],
                  ['Regional Growth', 'Exploring expansion into additional African markets through compliant partnerships, subsidiaries or joint ventures.'],
                ].map(([stage, desc], i) => (
                  <div key={stage} className="flex gap-4 rounded-xl bg-card-background p-6">
                    <span className="flex size-8 flex-none items-center justify-center rounded-full bg-white text-xs font-bold text-icons">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-heading">{stage}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-text-color">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="resources" number="09" title="Key Resources & Partnerships">
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <h3 className="text-sm font-bold text-heading">Human Resources</h3>
                  <BulletList items={['Management & field coordinators', 'Agronomists & training officers', 'Export & QA specialists']} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-heading">Physical & Tech</h3>
                  <BulletList items={['Offices & collection centres', 'Storage & transport systems', 'Digital platforms & databases']} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-heading">Strategic Partners</h3>
                  <BulletList items={['Government & financial institutions', 'Research & extension bodies', 'International buyers & investors']} />
                </div>
              </div>
            </Section>

            {/* GOVERNANCE — dark navy panel, mirrors the hero for weight */}
            <section id="governance" className="reveal scroll-mt-24 border-t border-badge-bg py-12 sm:scroll-mt-28 sm:py-20">
              <div className="flex items-center gap-4 sm:items-start sm:gap-5">
                <span className="flex size-9 flex-none items-center justify-center rounded-full bg-background font-mono text-xs font-bold tabular-nums text-white sm:size-10 sm:text-sm">
                  10
                </span>
                <h2 className="text-[1.3rem] font-bold leading-snug tracking-tight text-heading sm:pt-1 sm:text-[1.65rem]">Governance, Compliance &amp; Risk</h2>
              </div>
              <div className="mt-6 rounded-2xl bg-background p-6 sm:mt-8 sm:p-10">
                <div className="flex items-center gap-2.5">
                  <BuildingLibraryIcon className="size-5 text-badges" />
                  <h3 className="text-base font-bold text-white">Operating Under Institutional Controls</h3>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-hero-text">
                  OB39 is operating through structured corporate governance, internal
                  financial controls and transparent reporting, including board
                  oversight and independent audit where appropriate. OB39 is managing
                  agricultural, market, financial, operational and regulatory risk
                  through phased implementation, diversification, quality control and
                  continuous compliance review.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    'Maintaining board oversight and independent audit where appropriate',
                    'Formalizing written agreements with every farmer, business, buyer and service provider',
                    'Securing applicable Ugandan licences and regulatory approvals before any regulated activity',
                    'Reviewing compliance continuously through each phase of implementation',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-hero-text">
                      <CheckCircleIcon className="mt-0.5 size-4 flex-none text-badges" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <Section id="impact" number="11" title="Expected Results & Impact">
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <h3 className="text-sm font-bold text-heading">Enterprise</h3>
                  <BulletList items={['Stronger financial discipline', 'Increased access to growth resources', 'Business expansion & employment']} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-heading">Agricultural</h3>
                  <BulletList items={['Increased productivity', 'Improved post-harvest management', 'Stronger market prices & export participation']} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-heading">Community</h3>
                  <BulletList items={['Increased rural economic activity', 'Environmental & CSR initiatives', 'Inclusive participation of disadvantaged members']} />
                </div>
              </div>
            </Section>

            <Section id="investment" number="12" title="Funding & Investment Requirement">
              <p className="text-sm leading-relaxed text-text-color">
                OB39 limited is seeking investment and working capital across business and
                farmer mobilization, agricultural inputs, training, collection and
                storage infrastructure, transport and logistics, technology, quality
                assurance and certification, export-market development, human resources
                and regulatory compliance.
              </p>
              <h3 className="mt-8 text-base font-bold text-heading">Potential Financing Structures</h3>
              <BulletList
                items={[
                  'Equity investment & debt financing',
                  'Asset finance & trade finance',
                  'Joint ventures & strategic partnerships',
                  'Appropriate grants & blended-finance arrangements',
                ]}
              />
              <p className="mt-5 text-xs text-text-color/70">
                A detailed investment amount and financial projections are available
                through a separate financial model, provided under a briefing or NDA.
              </p>
            </Section>

            <Section id="proposition" number="13" title="Investment & Partnership Proposition">
              <p className="text-sm leading-relaxed text-text-color">
                OB39 Limited is seeking investors and strategic partners who can
                contribute capital, technical expertise, market access, infrastructure,
                technology or institutional partnership. Project L is offering the
                opportunity to participate in a scalable platform connecting
                Businesses, Farmers, Markets, Finance, Technology, Logistics and
                Investment — building toward commercially sustainable value chains that
                create returns for investors while improving economic opportunities for
                participating businesses, farmers and communities.
              </p>
            </Section>

            <Section id="conclusion" number="14" title="Conclusion">
              <p className="text-sm leading-relaxed text-text-color">
                Ob39 Limited is being built around a simple principle: organized people, equipped
                with knowledge and productive resources and connected to markets, can
                create stronger and more sustainable economic opportunities. OB39 is
                implementing Project L progressively — beginning with controlled
                operations in Uganda, measuring results, strengthening governance and
                financial systems, and scaling only where commercial and operational
                conditions support expansion.
              </p>
            </Section>

            {/* CONTACT  */}
            <div className="reveal mt-4 rounded-2xl bg-card-background p-10 text-center sm:p-14">
              <Eyebrow></Eyebrow>
              <h2 className="mt-5 text-2xl font-extrabold text-heading">Engage With OB39</h2>
              <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-text-color">
                OB39 is welcoming engagement from investors, financial institutions,
                government authorities and development partners looking to contribute
                to this Project .
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-button-bg px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-button-hover"
                >
                  Request the Concept Note
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-icons/20 bg-white px-6 py-3 text-sm font-semibold text-heading transition-colors hover:bg-badge-bg"
                >
                  Contact the  Team
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
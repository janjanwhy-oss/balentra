import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

type TabKey = 'overview' | 'included' | 'bestFor';

export interface ServiceShowcaseItem {
  id: string;
  number: string;
  slug: string;
  route: string;
  title: string;
  highlightWords: string;
  remainingTitle: string;
  summary: string;
  overviewDetail: string;
  overviewHighlights: [string, string, string];
  includedIntro: string;
  included: [string, string, string];
  bestFor: string;
  bestForHighlights: [string, string, string];
  mainImage: string;
  mainImageAlt: string;
  detailImage: string;
  detailImageAlt: string;
}

export const SERVICES_SHOWCASE_DATA: ServiceShowcaseItem[] = [
  {
    id: 'service-01',
    number: '01',
    slug: 'bookkeeping-accounting',
    route: '/services/bookkeeping-accounting',
    title: 'Bookkeeping & Accounting',
    highlightWords: 'Bookkeeping',
    remainingTitle: '& Accounting',
    summary:
      'Keep your day-to-day financial records accurate, organized, and ready for meaningful reporting.',
    overviewDetail:
      'Structured bookkeeping routines that maintain clean general ledgers, timely bank reconciliations, and organized documentation across every accounting period.',
    overviewHighlights: [
      'Transaction recording and reconciliation',
      'General ledger and month-end support',
      'Expense categorization and cleanup',
    ],
    includedIntro:
      'Core bookkeeping workflows delivered with consistent monthly structure and clear documentation:',
    included: [
      'Transaction recording and reconciliation',
      'General ledger and month-end support',
      'Expense categorization and cleanup',
    ],
    bestFor:
      'Growing businesses that need structured, dependable bookkeeping.',
    bestForHighlights: [
      'Startups establishing clean financial records',
      'Growing teams scaling transaction volume',
      'Businesses preparing for structured month-end closes',
    ],
    mainImage:
      '/assets/aistudio/Consultant_reviewing_financial_d__20261026001240__1__c45553eb.jpg',
    mainImageAlt:
      'Elegant modern accounting desk with ledger documents, laptop, and a professional working with financial records',
    detailImage: '/assets/aistudio/cta_calculator_docs.webp',
    detailImageAlt:
      'Close-up of accounting calculator and organized financial ledger documents',
  },
  {
    id: 'service-02',
    number: '02',
    slug: 'financial-reporting',
    route: '/services/financial-reporting',
    title: 'Financial Reporting & Analysis',
    highlightWords: 'Financial Reporting',
    remainingTitle: '& Analysis',
    summary:
      'Understand business performance through clear financial reports and practical analysis.',
    overviewDetail:
      'Monthly and quarterly reporting packages that translate complex accounting figures into clear, decision-ready insights for founders and leadership teams.',
    overviewHighlights: [
      'Financial statement preparation',
      'Management reporting',
      'Cash flow and variance analysis',
    ],
    includedIntro:
      'Comprehensive reporting deliverables structured around clarity and operational visibility:',
    included: [
      'Financial statement preparation',
      'Management reporting',
      'Cash flow and variance analysis',
    ],
    bestFor:
      'Businesses seeking stronger visibility over their financial performance.',
    bestForHighlights: [
      'Leadership teams tracking monthly margin trends',
      'Companies requiring structured management packs',
      'Organizations monitoring budget-to-actual variance',
    ],
    mainImage:
      '/assets/aistudio/Financial_charts_on_office_desk_20261026001253_11zon_39cfd48b.jpg',
    mainImageAlt:
      'Premium modern office with finance professional reviewing printed financial charts and statements',
    detailImage: '/assets/aistudio/cta_laptop_charts.webp',
    detailImageAlt:
      'Laptop and printed reports displaying financial performance charts',
  },
  {
    id: 'service-03',
    number: '03',
    slug: 'payroll',
    route: '/services/payroll',
    title: 'Payroll Management & Coordination',
    highlightWords: 'Payroll Management',
    remainingTitle: '& Coordination',
    summary:
      'Make recurring payroll administration more organized through accurate records and structured financial workflows.',
    overviewDetail:
      'Dependable payroll coordination that aligns employee compensation records, recurring schedules, and general ledger entries with accuracy.',
    overviewHighlights: [
      'Payroll data preparation',
      'Employee payment record coordination',
      'Payroll reconciliation and reporting',
    ],
    includedIntro:
      'End-to-end payroll administration and accounting alignment across each pay cycle:',
    included: [
      'Payroll data preparation',
      'Employee payment record coordination',
      'Payroll reconciliation and reporting',
    ],
    bestFor:
      'Growing teams that need more organized payroll administration.',
    bestForHighlights: [
      'Expanding teams managing recurring pay cycles',
      'Businesses coordinating multi-department payroll records',
      'Finance teams seeking clean payroll-to-ledger reconciliation',
    ],
    mainImage:
      '/assets/aistudio/Desk_with_payroll_documents_and_20261026001248_11zon_16cb4757.jpg',
    mainImageAlt:
      'Professional HR and finance administration workspace with payroll reports and laptop',
    detailImage: '/assets/aistudio/about_us_image_2_68f64913.webp',
    detailImageAlt:
      'Finance professional coordinating payroll schedules and documentation',
  },
  {
    id: 'service-04',
    number: '04',
    slug: 'accounts-payable-receivable',
    route: '/services/accounts-payable-receivable',
    title: 'Accounts Payable & Receivable',
    highlightWords: 'Accounts Payable',
    remainingTitle: '& Receivable',
    summary:
      'Create greater clarity over invoices, vendor payments, customer balances, and everyday financial operations.',
    overviewDetail:
      'Organized invoicing and vendor administration workflows that keep receivables clear, supplier obligations current, and working capital predictable.',
    overviewHighlights: [
      'Customer invoicing',
      'Vendor bill administration',
      'Receivables and payment tracking',
    ],
    includedIntro:
      'Structured payables and receivables administration for smoother daily cash movement:',
    included: [
      'Customer invoicing',
      'Vendor bill administration',
      'Receivables and payment tracking',
    ],
    bestFor:
      'Businesses managing recurring supplier and customer transactions.',
    bestForHighlights: [
      'Companies with high-frequency client billing',
      'Operations coordinating multiple supplier schedules',
      'Teams seeking clearer aging and collections visibility',
    ],
    mainImage:
      '/assets/aistudio/Consultant_reviewing_tax_documents_20261026001238_11zon_4cde3799.jpg',
    mainImageAlt:
      'Close-up editorial shot of professional invoice processing and payment documents',
    detailImage: '/assets/aistudio/image_57598ec1.webp',
    detailImageAlt:
      'Organized accounts payable and receivable review in modern office',
  },
  {
    id: 'service-05',
    number: '05',
    slug: 'fractional-cfo',
    route: '/services/fractional-cfo',
    title: 'Fractional CFO & Financial Advisory',
    highlightWords: 'Fractional CFO',
    remainingTitle: '& Financial Advisory',
    summary:
      'Support financial decision-making with planning, forecasting, and meaningful performance insights.',
    overviewDetail:
      'Forward-looking financial planning, scenario modeling, and KPI evaluation designed to help founders and executives make informed strategic commitments.',
    overviewHighlights: [
      'Budgeting and forecasting',
      'Cash flow planning',
      'KPI and profitability analysis',
    ],
    includedIntro:
      'Strategic advisory deliverables tailored to your operational and growth priorities:',
    included: [
      'Budgeting and forecasting',
      'Cash flow planning',
      'KPI and profitability analysis',
    ],
    bestFor:
      'Founders and management teams needing financial planning support without a full-time CFO.',
    bestForHighlights: [
      'Founders planning next-stage capital allocation',
      'Management teams evaluating unit economics and margins',
      'Growing companies building rolling cash-flow forecasts',
    ],
    mainImage:
      '/assets/aistudio/Professionals_discussing_financi__20261026001243__1__a33fe2c9.jpg',
    mainImageAlt:
      'Premium boardroom financial strategy meeting with senior professionals reviewing forecasts',
    detailImage: '/assets/aistudio/cta_team_meeting.webp',
    detailImageAlt:
      'Executive advisory session reviewing financial models and KPIs',
  },
  {
    id: 'service-06',
    number: '06',
    slug: 'cloud-accounting',
    route: '/services/cloud-accounting',
    title: 'Cloud Accounting & Finance Systems',
    highlightWords: 'Cloud Accounting',
    remainingTitle: '& Finance Systems',
    summary:
      'Connect financial records, accounting technology, and practical workflows into a more organized system.',
    overviewDetail:
      'Thoughtful configuration of cloud accounting platforms, digital document capture, and connected reporting tools that reduce repetitive manual entry.',
    overviewHighlights: [
      'Accounting software configuration',
      'Data migration support',
      'Financial workflow improvements',
    ],
    includedIntro:
      'System setup, clean data transition, and workflow optimization for modern finance teams:',
    included: [
      'Accounting software configuration',
      'Data migration support',
      'Financial workflow improvements',
    ],
    bestFor:
      'Businesses modernizing or improving their accounting systems.',
    bestForHighlights: [
      'Companies transitioning from spreadsheets to cloud ledgers',
      'Teams consolidating fragmented finance tools',
      'Businesses automating routine invoicing and expense capture',
    ],
    mainImage:
      '/assets/aistudio/Team_collaborating_around_confer__20261026000222__1__1344684c.webp',
    mainImageAlt:
      'Modern digital finance workspace with laptop, financial application, and organized office environment',
    detailImage: '/assets/aistudio/cta_office_building.webp',
    detailImageAlt:
      'Modern connected corporate environment and digital finance operations',
  },
];

const FEATURE_CARDS = [
  {
    number: '01',
    title: '01 — Accurate by Design',
    description:
      'Organized financial records and dependable accounting workflows built around day-to-day business needs.',
    progressWidth: 'w-[34%]',
    icon: (
      <svg
        viewBox="0 0 36 36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9 text-[#FF6438]"
        aria-hidden="true"
      >
        <rect x="6" y="4" width="24" height="28" rx="3" />
        <path d="M12 12h12" />
        <path d="M12 18h12" />
        <path d="M12 24h7" />
        <circle cx="24.5" cy="24.5" r="3.5" />
        <path d="m23.2 24.5 1 1 2-2" />
      </svg>
    ),
  },
  {
    number: '02',
    title: '02 — Clear Financial Visibility',
    description:
      'Meaningful reports and insights that make financial performance easier to understand.',
    progressWidth: 'w-[68%]',
    icon: (
      <svg
        viewBox="0 0 36 36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9 text-[#FF6438]"
        aria-hidden="true"
      >
        <path d="M5 29h26" />
        <rect x="8" y="18" width="4.5" height="11" rx="1" />
        <rect x="15.75" y="12" width="4.5" height="17" rx="1" />
        <rect x="23.5" y="7" width="4.5" height="22" rx="1" />
        <path d="M8 13l7.5-4.5 7.5 3 5-5" />
      </svg>
    ),
  },
  {
    number: '03',
    title: '03 — Flexible Business Support',
    description:
      "Accounting services structured around your business's size, processes, and changing priorities.",
    progressWidth: 'w-[48%]',
    icon: (
      <svg
        viewBox="0 0 36 36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9 text-[#FF6438]"
        aria-hidden="true"
      >
        <rect x="5" y="6" width="11" height="11" rx="2.5" />
        <rect x="20" y="6" width="11" height="11" rx="2.5" />
        <rect x="5" y="21" width="11" height="10" rx="2.5" />
        <circle cx="25.5" cy="26" r="5" />
        <path d="M25.5 23.5v5" />
        <path d="M23 26h5" />
      </svg>
    ),
  },
  {
    number: '04',
    title: '04 — Connected Financial Systems',
    description:
      'Modern cloud tools and organized workflows to help reduce unnecessary manual work.',
    progressWidth: 'w-[54%]',
    icon: (
      <svg
        viewBox="0 0 36 36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9 text-[#FF6438]"
        aria-hidden="true"
      >
        <rect x="4" y="7" width="28" height="19" rx="3" />
        <path d="M12 31h12" />
        <path d="M18 26v5" />
        <circle cx="13" cy="16.5" r="2.2" />
        <circle cx="23" cy="13.5" r="2.2" />
        <circle cx="23" cy="19.5" r="2.2" />
        <path d="M15 15.8l5.8-1.6" />
        <path d="M15 17.2l5.8 1.6" />
      </svg>
    ),
  },
];

interface ServicesPageProps {
  currentPath: string;
  onNavigateHomeSection: (sectionId?: string) => void;
  onNavigateServices: (slug?: string) => void;
  onOpenConsultation: (defaultService?: string) => void;
}

export function ServicesPage({
  currentPath,
  onNavigateHomeSection,
  onNavigateServices,
  onOpenConsultation,
}: ServicesPageProps) {
  const [heroImageError, setHeroImageError] = useState(false);

  // Track active tab ('overview' | 'included' | 'bestFor') independently for each of the 6 service showcases
  const [activeTabs, setActiveTabs] = useState<Record<string, TabKey>>({
    'service-01': 'overview',
    'service-02': 'overview',
    'service-03': 'overview',
    'service-04': 'overview',
    'service-05': 'overview',
    'service-06': 'overview',
  });

  useEffect(() => {
    document.title = 'Services Overview | Balentra Accounting';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'From accurate bookkeeping to strategic financial guidance, Balentra services bring clarity, structure, and confidence to the way your business operates.'
      );
    }
  }, []);

  const handleTabSelect = (serviceId: string, tab: TabKey) => {
    setActiveTabs((prev) => ({
      ...prev,
      [serviceId]: tab,
    }));
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FFFFFF] text-[#101114] font-sans overflow-x-hidden">
      {/* SECTION 1 — CENTERED CINEMATIC HERO WITH FLOATING CUSTOM-CUT NAVBAR */}
      <section
        id="services-hero"
        aria-labelledby="services-hero-heading"
        className="relative w-full min-h-[490px] sm:min-h-[535px] bg-[#101114] text-[#F5F5F3] flex flex-col justify-between overflow-hidden"
      >
        {/* Subtle Cinematic Corporate / Architectural Background Photography */}
        <div className="absolute inset-0 z-0">
          {!heroImageError ? (
            <picture>
              <source
                type="image/webp"
                srcSet="/assets/aistudio/hero_image_design_e8f2459b-768w.webp 768w, /assets/aistudio/hero_image_design_e8f2459b.webp 1376w"
                sizes="(max-width: 768px) 100vw, 100vw"
              />
              <img
                src="/assets/aistudio/hero_image_design_e8f2459b.jpg"
                alt="Balentra executive financial advisory environment"
                referrerPolicy="no-referrer"
                fetchPriority="high"
                decoding="async"
                width={1376}
                height={768}
                onError={() => setHeroImageError(true)}
                className="w-full h-full object-cover object-center brightness-[0.42] contrast-[1.08]"
              />
            </picture>
          ) : (
            <div className="w-full h-full bg-[#101114]" />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#0A0B0E]/85 via-[#101114]/75 to-[#101114]/96"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,100,56,0.07),transparent_60%)]"
            aria-hidden="true"
          />
        </div>

        {/* TOP CONTAINED SCULPTED WHITE NAVIGATION BAR WITH SERVICES DROPDOWN */}
        <Navbar
          currentPath={currentPath}
          activeNav="Services"
          variant="dark-hero"
          onNavigateHomeSection={onNavigateHomeSection}
          onNavigateServices={onNavigateServices}
          onOpenConsultation={() => onOpenConsultation()}
        />

        {/* Centered Hero Content */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-10 pt-10 pb-12 sm:pt-14 sm:pb-14 max-w-[820px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                aria-hidden="true"
              />
              <span className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-[#FF6438]">
                OUR SERVICES
              </span>
            </div>

            {/* Centered Editorial Serif H1 */}
            <h1
              id="services-hero-heading"
              className="font-serif text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.1] tracking-[-0.02em] text-white font-normal mb-5 text-balance"
            >
              Financial Expertise.
              <br />
              Built Around Your Business.
            </h1>

            {/* Supporting Text */}
            <p className="text-[15px] sm:text-[16.5px] leading-[1.68] text-[#C9C9D1] font-normal max-w-[58ch] mb-8">
              From accurate bookkeeping to strategic financial guidance, our
              services bring clarity, structure, and confidence to the way
              your business operates.
            </p>

            {/* Understated Scroll Indicator */}
            <button
              type="button"
              onClick={() => {
                const nextEl = document.getElementById('services-features');
                if (nextEl) {
                  nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              aria-label="Scroll to service features"
              className="group inline-flex flex-col items-center gap-1.5 text-[11px] font-medium tracking-[0.18em] uppercase text-[#9E9EA8] hover:text-white transition-colors duration-250 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6438]"
            >
              <span>Scroll</span>
              <span className="w-7 h-7 rounded-full border border-white/15 group-hover:border-[#FF6438] inline-flex items-center justify-center transition-colors duration-250">
                <ChevronDown className="w-3.5 h-3.5 text-[#FF6438] transition-transform duration-250 group-hover:translate-y-0.5" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — FOUR FEATURE CARDS (Reference Image 1) */}
      <section
        id="services-features"
        aria-label="Key service pillars"
        className="w-full bg-[#F1F5F6] py-14 sm:py-18 px-6 sm:px-10"
      >
        <div className="w-full max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {FEATURE_CARDS.map((card, index) => (
            <motion.article
              key={card.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => {
                const targetShowcase = document.getElementById(
                  `service-showcase-0${index + 1}`
                );
                if (targetShowcase) {
                  targetShowcase.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }
              }}
              className="group relative bg-white rounded-[26px] p-7 pb-11 flex flex-col justify-between transition-all duration-[250ms] ease-out hover:-translate-y-1.5 shadow-[0_6px_24px_rgba(16,17,20,0.03)] hover:shadow-[0_16px_36px_rgba(16,17,20,0.07)] cursor-pointer"
            >
              <div>
                {/* Top Electric Orange Outline Icon */}
                <div className="mb-5">{card.icon}</div>

                {/* Thin Horizontal Divider with Animated Segment & Circular Endpoint */}
                <div
                  className="relative w-full flex items-center mb-5"
                  aria-hidden="true"
                >
                  <div className="relative flex-1 h-[1.5px] bg-[#DCE2E6] overflow-hidden">
                    <span
                      className={`absolute left-0 top-0 bottom-0 ${card.progressWidth} group-hover:w-full bg-[#202428] group-hover:bg-[#FF6438] transition-all duration-[250ms] ease-out`}
                    />
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B0BAC2] group-hover:bg-[#FF6438] transition-colors duration-[250ms] shrink-0 -ml-0.5" />
                </div>

                {/* Bold Heading */}
                <h2 className="text-[18px] sm:text-[19px] font-bold tracking-[-0.015em] text-[#101114] group-hover:text-[#FF6438] transition-colors duration-[250ms] mb-2.5">
                  {card.title}
                </h2>

                {/* Short Description */}
                <p className="text-[13.5px] leading-[1.62] text-[#686E74] font-normal pr-8">
                  {card.description}
                </p>
              </div>

              {/* Bottom-Right Sculpted Corner Cutout + Circular Arrow Button (Matching Reference Image 1) */}
              <div
                aria-hidden="true"
                className="absolute right-0 bottom-0 w-[62px] h-[62px] bg-[#F1F5F6] rounded-tl-[26px] flex items-end justify-end p-1.5"
              >
                <span className="w-11 h-11 rounded-full bg-white group-hover:bg-[#FF6438] text-[#101114] group-hover:text-white inline-flex items-center justify-center shadow-[0_4px_12px_rgba(16,17,20,0.05)] transition-all duration-[250ms] ease-out">
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform duration-[250ms] ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* SECTION 3 — SIX FULL-WIDTH INDIVIDUAL SERVICE SHOWCASES (Reference Image 2) */}
      <div id="services-showcases" className="w-full">
        {SERVICES_SHOWCASE_DATA.map((service, index) => {
          const isEven = index % 2 === 1;
          const sectionBgClass = isEven ? 'bg-[#F7F8F9]' : 'bg-[#FFFFFF]';
          const notchBgColor = isEven ? '#F7F8F9' : '#FFFFFF';
          const currentTab: TabKey = activeTabs[service.id] || 'overview';

          const tabText =
            currentTab === 'overview'
              ? service.overviewDetail
              : currentTab === 'included'
              ? service.includedIntro
              : service.bestFor;

          const tabBullets =
            currentTab === 'overview'
              ? service.overviewHighlights
              : currentTab === 'included'
              ? service.included
              : service.bestForHighlights;

          return (
            <section
              key={service.id}
              id={`service-showcase-${service.number}`}
              aria-labelledby={`heading-${service.id}`}
              className={`w-full ${sectionBgClass} py-16 sm:py-22 px-6 sm:px-10 border-t border-[#EAECEF]`}
            >
              <div className="w-full max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* LEFT COLUMN (~65% width on Desktop): Large Editorial Photograph with Reference-Matched Stepped/Notched Rounded Corners */}
                <motion.div
                  initial={{ opacity: 0, clipPath: 'inset(4% 4% 4% 4% round 24px)' }}
                  whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-7 w-full"
                >
                  <div className="relative w-full h-[310px] sm:h-[410px] lg:h-[480px] rounded-[24px] overflow-hidden bg-[#16171B]">
                    <img
                      src={service.mainImage}
                      alt={service.mainImageAlt}
                      referrerPolicy="no-referrer"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Subtle natural editorial scrim for depth */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-transparent"
                      aria-hidden="true"
                    />

                    {/* Top-Left Stepped Rounded Notch (Matches Reference Image 2 Geometry) */}
                    <div
                      aria-hidden="true"
                      style={{ backgroundColor: notchBgColor }}
                      className="hidden sm:block absolute top-0 left-0 w-[118px] h-[52px] rounded-br-[22px] z-10"
                    />

                    {/* Bottom-Right Stepped Rounded Notch (Matches Reference Image 2 Geometry) */}
                    <div
                      aria-hidden="true"
                      style={{ backgroundColor: notchBgColor }}
                      className="hidden sm:block absolute bottom-0 right-0 w-[138px] h-[56px] rounded-tl-[22px] z-10"
                    />
                  </div>
                </motion.div>

                {/* RIGHT COLUMN (~35% width on Desktop): Eyebrow, Heading, Interactive Pill Tabs, Detail Photo + 3 Benefits, Explore CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.52,
                    delay: 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="lg:col-span-5 flex flex-col items-start"
                >
                  {/* Numbered Pill Eyebrow (SERVICE 01, etc.) */}
                  <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-[#DEDEE4] bg-white text-[10.5px] font-semibold tracking-[0.14em] uppercase text-[#FF6438] mb-3.5">
                    SERVICE {service.number}
                  </div>

                  {/* Strong Service Heading with Electric Orange Accent */}
                  <h2
                    id={`heading-${service.id}`}
                    className="text-[28px] sm:text-[32px] lg:text-[35px] font-bold leading-[1.16] tracking-[-0.02em] text-[#101114] mb-3 text-balance"
                  >
                    <span className="text-[#FF6438]">
                      {service.highlightWords}
                    </span>{' '}
                    <span>{service.remainingTitle}</span>
                  </h2>

                  {/* Short Introduction */}
                  <p className="text-[14px] sm:text-[14.5px] leading-[1.64] text-[#585B63] font-normal mb-5">
                    {service.summary}
                  </p>

                  {/* Three Interactive Pill Tabs: OVERVIEW / INCLUDED / BEST FOR */}
                  <div
                    role="tablist"
                    aria-label={`${service.title} information tabs`}
                    className="flex flex-wrap items-center gap-2.5 mb-5"
                  >
                    {(
                      [
                        { key: 'overview', label: 'OVERVIEW' },
                        { key: 'included', label: 'INCLUDED' },
                        { key: 'bestFor', label: 'BEST FOR' },
                      ] as const
                    ).map((tab) => {
                      const isActive = currentTab === tab.key;
                      const tabId = `${service.id}-tab-${tab.key}`;
                      const panelId = `${service.id}-panel-${tab.key}`;

                      return (
                        <button
                          key={tab.key}
                          id={tabId}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          aria-controls={panelId}
                          onClick={() => handleTabSelect(service.id, tab.key)}
                          className={`h-[36px] px-4 rounded-full text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-[220ms] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438] ${
                            isActive
                              ? 'bg-[#FF6438] text-white border border-[#FF6438] shadow-[0_6px_16px_rgba(255,100,56,0.25)]'
                              : 'bg-white text-[#171717] border border-[#E4E4E9] hover:border-[#FF6438]/60 hover:text-[#FF6438]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Thin Horizontal Divider */}
                  <div className="w-full border-t border-[#E4E5E9] mb-5" />

                  {/* Lower Information Area: Small Supporting Detail Image + Tab Content & Three Orange Check Benefits */}
                  <div
                    id={`${service.id}-panel-${currentTab}`}
                    role="tabpanel"
                    aria-labelledby={`${service.id}-tab-${currentTab}`}
                    className="w-full grid grid-cols-1 sm:grid-cols-[142px_1fr] gap-5 items-start mb-6"
                  >
                    {/* Small Supporting Detail Photo */}
                    <div className="w-full sm:w-[142px] h-[156px] rounded-[16px] overflow-hidden bg-[#18191D] shrink-0">
                      <img
                        src={service.detailImage}
                        alt={service.detailImageAlt}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Tab Panel Text & Three Orange Check Items */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentTab}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="min-w-0"
                      >
                        <p className="text-[13px] leading-[1.6] text-[#666972] font-normal mb-3.5">
                          {tabText}
                        </p>

                        <ul className="space-y-2">
                          {tabBullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-2.5 text-[12.5px] font-semibold leading-[1.4] text-[#171717]"
                            >
                              <span
                                aria-hidden="true"
                                className="w-4 h-4 rounded-full bg-[#FF6438] text-white inline-flex items-center justify-center shrink-0 mt-0.5"
                              >
                                <Check
                                  className="w-2.5 h-2.5"
                                  strokeWidth={2.8}
                                />
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Compact "Explore Service" CTA with Separate Orange Circular Arrow (Reference Image 2) */}
                  <div className="flex flex-wrap items-center gap-5">
                    <a
                      href={service.route}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigateServices(service.slug);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group inline-flex items-center gap-3.5 rounded-full border border-[#202024] bg-white hover:bg-[#101114] hover:text-white pl-5 pr-1.5 py-1.5 text-[13px] font-semibold text-[#101114] transition-all duration-[250ms] ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
                    >
                      <span>Explore Service</span>
                      <span
                        aria-hidden="true"
                        className="w-8 h-8 rounded-full bg-[#FF6438] text-white inline-flex items-center justify-center shrink-0 transition-transform duration-[250ms] ease-out group-hover:scale-105"
                      >
                        <ArrowUpRight
                          className="w-4 h-4 transition-transform duration-[250ms] ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={2.1}
                        />
                      </span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>

      {/* SECTION 4 — INDUSTRIES WE SERVE (Existing Staggered Milestone Layout, Reference Image 4) */}
      <section
        id="services-industries"
        aria-labelledby="services-industries-heading"
        className="w-full bg-[#FBFBF9] text-[#141416] py-16 sm:py-20 px-6 sm:px-10 border-t border-neutral-200/60"
      >
        <div className="w-full max-w-[1220px] mx-auto">
          {/* Section Heading */}
          <div className="max-w-[640px] mb-11 sm:mb-13">
            <div className="inline-flex items-center gap-2 mb-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#FF6438]">
                INDUSTRIES WE SERVE
              </span>
            </div>

            <h2
              id="services-industries-heading"
              className="font-serif text-[30px] sm:text-[36px] lg:text-[40px] leading-[1.14] tracking-[-0.02em] text-[#111113] font-normal mb-3 text-balance"
            >
              Expertise Across Industries.
            </h2>

            <p className="text-[14px] sm:text-[15px] leading-[1.62] text-[#6E6E77] font-normal max-w-[54ch]">
              Accounting and financial support designed around the needs of
              businesses operating in different industries and markets.
            </p>
          </div>

          {/* Six Horizontally Distributed Milestones with Staggered Vertical Rhythm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-6 lg:gap-x-5 items-start">
            {/* 01 — Startups & Entrepreneurs */}
            <div className="group flex items-start gap-3.5 lg:mt-11 transform-gpu transition-transform duration-[275ms] ease-out hover:-translate-y-1">
              <div
                className="flex flex-col items-center shrink-0 pt-1"
                aria-hidden="true"
              >
                <span className="w-3.5 h-3.5 border border-[#C6C6CE] bg-white transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438] group-hover:border-[#FF6438]" />
                <span className="w-px h-[128px] lg:h-[142px] bg-[#D8D8E0] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]/45" />
                <span className="w-1 h-1 rounded-full bg-[#C6C6CE] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]" />
              </div>
              <div className="pt-0.5">
                <h3 className="text-[15px] sm:text-[15.5px] font-bold leading-[1.28] tracking-[-0.015em] text-[#111113] transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438] mb-1.5">
                  Startups &amp; Entrepreneurs
                </h3>
                <div className="text-[11px] font-medium tracking-[0.02em] text-[#9898A2] tabular-nums mb-2 transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438]/85">
                  Industry 01
                </div>
                <p className="text-[12.5px] leading-[1.52] text-[#7A7A84] font-normal transition-colors duration-[275ms] ease-out group-hover:text-[#34343C]">
                  Support for emerging businesses building stronger financial
                  foundations.
                </p>
              </div>
            </div>

            {/* 02 — Technology & SaaS */}
            <div className="group flex items-start gap-3.5 lg:mt-0 transform-gpu transition-transform duration-[275ms] ease-out hover:-translate-y-1">
              <div
                className="flex flex-col items-center shrink-0 pt-1"
                aria-hidden="true"
              >
                <span className="w-3.5 h-3.5 border border-[#C6C6CE] bg-white transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438] group-hover:border-[#FF6438]" />
                <span className="w-px h-[138px] lg:h-[156px] bg-[#D8D8E0] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]/45" />
                <span className="w-1 h-1 rounded-full bg-[#C6C6CE] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]" />
              </div>
              <div className="pt-0.5">
                <h3 className="text-[15px] sm:text-[15.5px] font-bold leading-[1.28] tracking-[-0.015em] text-[#111113] transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438] mb-1.5">
                  Technology &amp; SaaS
                </h3>
                <div className="text-[11px] font-medium tracking-[0.02em] text-[#9898A2] tabular-nums mb-2 transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438]/85">
                  Industry 02
                </div>
                <p className="text-[12.5px] leading-[1.52] text-[#7A7A84] font-normal transition-colors duration-[275ms] ease-out group-hover:text-[#34343C]">
                  Structured accounting and reporting for technology-driven
                  companies.
                </p>
              </div>
            </div>

            {/* 03 — E-commerce & Retail */}
            <div className="group flex items-start gap-3.5 lg:mt-13 transform-gpu transition-transform duration-[275ms] ease-out hover:-translate-y-1">
              <div
                className="flex flex-col items-center shrink-0 pt-1"
                aria-hidden="true"
              >
                <span className="w-3.5 h-3.5 border border-[#C6C6CE] bg-white transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438] group-hover:border-[#FF6438]" />
                <span className="w-px h-[128px] lg:h-[140px] bg-[#D8D8E0] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]/45" />
                <span className="w-1 h-1 rounded-full bg-[#C6C6CE] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]" />
              </div>
              <div className="pt-0.5">
                <h3 className="text-[15px] sm:text-[15.5px] font-bold leading-[1.28] tracking-[-0.015em] text-[#111113] transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438] mb-1.5">
                  E-commerce &amp; Retail
                </h3>
                <div className="text-[11px] font-medium tracking-[0.02em] text-[#9898A2] tabular-nums mb-2 transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438]/85">
                  Industry 03
                </div>
                <p className="text-[12.5px] leading-[1.52] text-[#7A7A84] font-normal transition-colors duration-[275ms] ease-out group-hover:text-[#34343C]">
                  Financial visibility across sales, expenses, and business
                  operations.
                </p>
              </div>
            </div>

            {/* 04 — Professional Services */}
            <div className="group flex items-start gap-3.5 lg:mt-2 transform-gpu transition-transform duration-[275ms] ease-out hover:-translate-y-1">
              <div
                className="flex flex-col items-center shrink-0 pt-1"
                aria-hidden="true"
              >
                <span className="w-3.5 h-3.5 border border-[#C6C6CE] bg-white transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438] group-hover:border-[#FF6438]" />
                <span className="w-px h-[136px] lg:h-[152px] bg-[#D8D8E0] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]/45" />
                <span className="w-1 h-1 rounded-full bg-[#C6C6CE] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]" />
              </div>
              <div className="pt-0.5">
                <h3 className="text-[15px] sm:text-[15.5px] font-bold leading-[1.28] tracking-[-0.015em] text-[#111113] transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438] mb-1.5">
                  Professional Services
                </h3>
                <div className="text-[11px] font-medium tracking-[0.02em] text-[#9898A2] tabular-nums mb-2 transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438]/85">
                  Industry 04
                </div>
                <p className="text-[12.5px] leading-[1.52] text-[#7A7A84] font-normal transition-colors duration-[275ms] ease-out group-hover:text-[#34343C]">
                  Accounting support for consultants and service-based
                  organizations.
                </p>
              </div>
            </div>

            {/* 05 — Agencies & Creative Businesses */}
            <div className="group flex items-start gap-3.5 lg:mt-12 transform-gpu transition-transform duration-[275ms] ease-out hover:-translate-y-1">
              <div
                className="flex flex-col items-center shrink-0 pt-1"
                aria-hidden="true"
              >
                <span className="w-3.5 h-3.5 border border-[#C6C6CE] bg-white transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438] group-hover:border-[#FF6438]" />
                <span className="w-px h-[128px] lg:h-[142px] bg-[#D8D8E0] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]/45" />
                <span className="w-1 h-1 rounded-full bg-[#C6C6CE] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]" />
              </div>
              <div className="pt-0.5">
                <h3 className="text-[15px] sm:text-[15.5px] font-bold leading-[1.28] tracking-[-0.015em] text-[#111113] transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438] mb-1.5">
                  Agencies &amp; Creative Businesses
                </h3>
                <div className="text-[11px] font-medium tracking-[0.02em] text-[#9898A2] tabular-nums mb-2 transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438]/85">
                  Industry 05
                </div>
                <p className="text-[12.5px] leading-[1.52] text-[#7A7A84] font-normal transition-colors duration-[275ms] ease-out group-hover:text-[#34343C]">
                  Organized project finances, invoicing, and profitability
                  reporting.
                </p>
              </div>
            </div>

            {/* 06 — International Businesses */}
            <div className="group flex items-start gap-3.5 lg:mt-1 transform-gpu transition-transform duration-[275ms] ease-out hover:-translate-y-1">
              <div
                className="flex flex-col items-center shrink-0 pt-1"
                aria-hidden="true"
              >
                <span className="w-3.5 h-3.5 border border-[#C6C6CE] bg-white transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438] group-hover:border-[#FF6438]" />
                <span className="w-px h-[136px] lg:h-[154px] bg-[#D8D8E0] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]/45" />
                <span className="w-1 h-1 rounded-full bg-[#C6C6CE] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]" />
              </div>
              <div className="pt-0.5">
                <h3 className="text-[15px] sm:text-[15.5px] font-bold leading-[1.28] tracking-[-0.015em] text-[#111113] transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438] mb-1.5">
                  International Businesses
                </h3>
                <div className="text-[11px] font-medium tracking-[0.02em] text-[#9898A2] tabular-nums mb-2 transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438]/85">
                  Industry 06
                </div>
                <p className="text-[12.5px] leading-[1.52] text-[#7A7A84] font-normal transition-colors duration-[275ms] ease-out group-hover:text-[#34343C]">
                  Coordinated accounting processes for businesses operating
                  across markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — EXISTING BALENTRA BLACK CTA (Reference Image 3) */}
      <section
        id="services-final-cta"
        aria-labelledby="services-final-cta-heading"
        className="w-full bg-[#050505] text-[#F5F5F3] py-20 sm:py-26 px-6 sm:px-10 overflow-hidden"
      >
        <div className="w-full max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1.02fr_1.08fr] gap-12 lg:gap-10 items-center">
          {/* Left Column: Eyebrow, Heading, Supporting Paragraph & Dual Buttons */}
          <div className="max-w-[590px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2.5 mb-4">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                  aria-hidden="true"
                />
                <span className="text-[11.5px] font-semibold tracking-[0.2em] uppercase text-[#FF6438]">
                  LET’S WORK TOGETHER
                </span>
              </div>

              <h2
                id="services-final-cta-heading"
                className="font-sans text-[36px] sm:text-[46px] lg:text-[52px] font-semibold leading-[1.12] tracking-[-0.025em] text-white mb-5"
              >
                Ready to Move
                <br />
                Forward with Clarity?
              </h2>

              <p className="text-[15px] sm:text-[16.5px] leading-[1.65] text-[#C8C8D0] font-normal max-w-[52ch] mb-9">
                Bring structure to your accounting, gain a clearer view of your
                finances, and build stronger foundations for your next stage of
                growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: 0.14,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Button 1: Solid White with Dark Text & Electric Orange Arrow */}
              <button
                type="button"
                onClick={() => onOpenConsultation()}
                className="group h-[54px] px-7 rounded-[14px] bg-white text-[#111113] text-[14.5px] font-medium tracking-[-0.01em] inline-flex items-center justify-center gap-3 whitespace-nowrap cursor-pointer shadow-[0_8px_24px_rgba(255,255,255,0.08)] transform-gpu transition-all duration-[280ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(255,255,255,0.16)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6438]"
              >
                <span>Book a Consultation</span>
                <ChevronRight
                  strokeWidth={2.2}
                  className="w-4 h-4 text-[#FF6438] transition-transform duration-[280ms] ease-out group-hover:translate-x-1"
                />
              </button>

              {/* Button 2: Contact Us (points to actual contact section on homepage) */}
              <button
                type="button"
                onClick={() => onNavigateHomeSection('contact-us')}
                className="group h-[54px] px-7 rounded-[14px] bg-[#050505] hover:bg-white/[0.05] text-white border border-white/65 hover:border-white text-[14.5px] font-medium tracking-[-0.01em] inline-flex items-center justify-center gap-3 whitespace-nowrap cursor-pointer shadow-[0_8px_20px_rgba(0,0,0,0.4)] transform-gpu transition-all duration-[280ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(255,100,56,0.14)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6438]"
              >
                <span>Contact Us</span>
                <ChevronRight
                  strokeWidth={2.1}
                  className="w-4 h-4 text-white group-hover:text-[#FF6438] transition-all duration-[280ms] ease-out group-hover:translate-x-1"
                />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Reference-Matched Clustered Visual Layout */}
          <div className="w-full">
            <div className="hidden sm:block relative w-full max-w-[600px] h-[450px] lg:h-[470px] mx-auto lg:ml-auto lg:mr-0">
              {/* Accent Square 1: Small Electric Orange Rounded Square */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.48,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                aria-hidden="true"
                className="absolute left-[10%] top-[8%] w-[82px] h-[82px] lg:w-[88px] lg:h-[88px] rounded-[20px] bg-[#FF6438] shadow-[0_14px_34px_rgba(255,100,56,0.26)] transition-transform duration-300 ease-out hover:scale-[1.04] hover:-translate-y-1"
              />

              {/* Image Card 2: Small Top-Right Card — Calculator & Accounting Paperwork */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 14 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.52,
                  delay: 0.16,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute right-[3%] top-[3%] w-[152px] h-[124px] lg:w-[164px] lg:h-[132px] rounded-[20px] overflow-hidden bg-[#141417] shadow-[0_14px_32px_rgba(0,0,0,0.55)] transform-gpu transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgba(0,0,0,0.8)] z-10"
              >
                <img
                  src="/assets/aistudio/cta_calculator_docs.webp"
                  alt="Close-up of calculator and accounting paperwork on desk"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  width={170}
                  height={138}
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>

              {/* Image Card 1: Large Center Card — Laptop with Financial Charts & Reports */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: 0.22,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute left-[23.5%] top-[21%] w-[248px] h-[192px] lg:w-[270px] lg:h-[206px] rounded-[24px] overflow-hidden bg-[#141417] shadow-[0_18px_42px_rgba(0,0,0,0.65)] transform-gpu transition-all duration-300 ease-out hover:scale-[1.035] hover:-translate-y-1.5 hover:shadow-[0_26px_56px_rgba(0,0,0,0.85)] z-20"
              >
                <img
                  src="/assets/aistudio/cta_laptop_charts.webp"
                  alt="Laptop displaying financial charts and reports on executive desk"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  width={285}
                  height={220}
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>

              {/* Image Card 3: Small Bottom-Left Card — Modern Glass Office Building */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 14 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.52,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute left-[2.5%] bottom-[9%] w-[144px] h-[124px] lg:w-[154px] lg:h-[132px] rounded-[20px] overflow-hidden bg-[#141417] shadow-[0_14px_32px_rgba(0,0,0,0.55)] transform-gpu transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgba(0,0,0,0.8)] z-10"
              >
                <img
                  src="/assets/aistudio/cta_office_building.webp"
                  alt="Modern architectural glass office tower at dusk"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  width={158}
                  height={136}
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>

              {/* Accent Square 2: Small Muted Dark Gray Rounded Square */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.48,
                  delay: 0.36,
                  ease: [0.16, 1, 0.3, 1],
                }}
                aria-hidden="true"
                className="absolute left-[31%] bottom-[12%] w-[80px] h-[80px] lg:w-[86px] lg:h-[86px] rounded-[20px] bg-[#2B2E33] shadow-[0_12px_28px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out hover:scale-[1.04] hover:-translate-y-1"
              />

              {/* Image Card 4: Medium Bottom-Right Card — Diverse Team Reviewing Reports */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: 0.42,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute right-[0%] bottom-[1%] w-[224px] h-[170px] lg:w-[244px] lg:h-[184px] rounded-[22px] overflow-hidden bg-[#141417] shadow-[0_18px_42px_rgba(0,0,0,0.65)] transform-gpu transition-all duration-300 ease-out hover:scale-[1.035] hover:-translate-y-1.5 hover:shadow-[0_26px_56px_rgba(0,0,0,0.85)] z-20"
              >
                <img
                  src="/assets/aistudio/cta_team_meeting.webp"
                  alt="Professional business meeting with team reviewing financial reports"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  width={254}
                  height={192}
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            </div>

            {/* Mobile Responsive Clustered Grid (< 640px) */}
            <div className="sm:hidden grid grid-cols-2 gap-3.5 pt-2">
              <div className="space-y-3.5">
                <div className="flex items-end justify-between gap-3">
                  <div
                    aria-hidden="true"
                    className="w-14 h-14 rounded-[16px] bg-[#FF6438] shrink-0"
                  />
                  <div className="h-[110px] flex-1 rounded-[18px] overflow-hidden bg-[#141417]">
                    <img
                      src="/assets/aistudio/cta_office_building.webp"
                      alt="Modern architectural glass office tower"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      width={158}
                      height={136}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="h-[145px] rounded-[20px] overflow-hidden bg-[#141417]">
                  <img
                    src="/assets/aistudio/cta_laptop_charts.webp"
                    alt="Laptop displaying financial charts and reports"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    width={285}
                    height={220}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-3.5 pt-3">
                <div className="h-[115px] rounded-[18px] overflow-hidden bg-[#141417]">
                  <img
                    src="/assets/aistudio/cta_calculator_docs.webp"
                    alt="Close-up of calculator and accounting paperwork"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    width={170}
                    height={138}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-[135px] rounded-[20px] overflow-hidden bg-[#141417]">
                  <img
                    src="/assets/aistudio/cta_team_meeting.webp"
                    alt="Business meeting with team reviewing financial reports"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    width={254}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="w-12 h-12 rounded-[14px] bg-[#2B2E33]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — EXISTING MINIMALIST CENTERED FOOTER */}
      <Footer
        onNavigateSection={(targetId) => {
          if (targetId === 'our-services') {
            onNavigateServices();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            onNavigateHomeSection(targetId);
          }
        }}
      />
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Quote, X, Check, Globe, ShieldCheck, FileSpreadsheet, Scale, UserPlus, Search, Send } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Navbar, NavItem } from './components/Navbar';
import { Footer } from './components/Footer';

const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage }))
);
const ServiceDetailPage = lazy(() =>
  import('./pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage }))
);
import {
  SERVICE_DETAILS_BY_SLUG,
  SERVICE_DETAILS_LIST,
} from './data/serviceDetailsData';

const HOMEPAGE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PORTRAITS = [
  {
    src: '/assets/aistudio/portrait_1.jpg',
    alt: 'Senior International Partner portrait',
  },
  {
    src: '/assets/aistudio/portrait_2.jpg',
    alt: 'Cross-Border Tax Director portrait',
  },
  {
    src: '/assets/aistudio/portrait_3.jpg',
    alt: 'Audit & Advisory Lead portrait',
  },
];

const OUR_SERVICES_CARDS = [
  {
    title: 'Accounting & Bookkeeping',
    slug: 'bookkeeping-accounting',
    route: '/services/bookkeeping-accounting',
    shortText: 'Organized records and day-to-day financial clarity for smoother operations.',
    expandedText: 'Structured general ledger maintenance, multi-currency reconciliations, and month-end close workflows.',
    image: '/assets/aistudio/Consultant_reviewing_financial_d__20261026001240__1__c45553eb.jpg',
    alt: 'Accountant organizing financial records and ledgers at desk',
  },
  {
    title: 'Tax Compliance',
    slug: 'accounts-payable-receivable',
    route: '/services/accounts-payable-receivable',
    shortText: 'Accurate tax preparation, filing, and compliance support for international businesses.',
    expandedText: 'Timely corporate tax returns, indirect tax filings, and cross-border regulatory alignment.',
    image: '/assets/aistudio/Consultant_reviewing_tax_documents_20261026001238_11zon_4cde3799.jpg',
    alt: 'Tax advisor reviewing international compliance filings',
  },
  {
    title: 'Financial Reporting',
    slug: 'financial-reporting',
    route: '/services/financial-reporting',
    shortText: 'Clear monthly and quarterly reporting that helps decision-makers act with confidence.',
    expandedText: 'Board-ready management packs, consolidated IFRS statements, and performance variance analysis.',
    image: '/assets/aistudio/Financial_charts_on_office_desk_20261026001253_11zon_39cfd48b.jpg',
    alt: 'Financial reporting dashboard and analytical charts on executive desk',
  },
  {
    title: 'Payroll Management',
    slug: 'payroll',
    route: '/services/payroll',
    shortText: 'Reliable payroll processing and employee payment administration with precision.',
    expandedText: 'End-to-end salary disbursements, statutory deductions, and compliant multi-region payroll schedules.',
    image: '/assets/aistudio/Desk_with_payroll_documents_and_20261026001248_11zon_16cb4757.jpg',
    alt: 'Workspace with payroll schedules, calculator, and financial statements',
  },
  {
    title: 'Business Advisory',
    slug: 'fractional-cfo',
    route: '/services/fractional-cfo',
    shortText: 'Strategic financial guidance to support growth, efficiency, and smarter planning.',
    expandedText: 'Cash-flow forecasting, operational cost optimization, and international expansion modeling.',
    image: '/assets/aistudio/Professionals_discussing_financi__20261026001243__1__a33fe2c9.jpg',
    alt: 'Senior financial advisors discussing business strategy in boardroom',
  },
  {
    title: 'Audit Support',
    slug: 'cloud-accounting',
    route: '/services/cloud-accounting',
    shortText: 'Structured documentation and financial support to prepare for audits smoothly.',
    expandedText: 'Comprehensive audit trail preparation, statutory schedules, and direct coordination with auditors.',
    image: '/assets/aistudio/Team_collaborating_around_confer__20261026000222__1__1344684c.jpg',
    alt: 'Advisory team reviewing audit documentation around conference table',
  },
];

const SERVICES_PREVIEW = [
  {
    index: '01',
    title: 'Cross-Border Tax & Structuring',
    description: 'Multi-jurisdictional tax optimization, transfer pricing documentation, and treaty compliance for international holdings.',
    icon: Globe,
  },
  {
    index: '02',
    title: 'IFRS & Statutory Financial Reporting',
    description: 'Audit-ready consolidated financial statements, GAAP-to-IFRS conversion, and board-level management reporting.',
    icon: FileSpreadsheet,
  },
  {
    index: '03',
    title: 'Regulatory & Corporate Governance',
    description: 'Entity lifecycle management, statutory filings, and ongoing fiscal compliance across 40+ global markets.',
    icon: ShieldCheck,
  },
  {
    index: '04',
    title: 'M&A Financial Advisory',
    description: 'Buy-side and sell-side financial due diligence, valuation modeling, and post-acquisition accounting integration.',
    icon: Scale,
  },
];

const TEAM_MEMBERS = [
  {
    id: '01',
    name: 'Team Member 01',
    role: 'Accounting Operations',
    fullTitle: 'Team Member 01 — Accounting Operations',
    image: '/assets/aistudio/make_the_background_white_20261026005551_11zon_3e87d16c.jpg',
    alt: 'Team Member 01 — Accounting Operations portrait on white background',
    description:
      'Coordinates day-to-day bookkeeping workflows, multi-currency reconciliations, and structured month-end closing routines so international businesses maintain accurate, well-organized financial records.',
    expertise: [
      'Day-to-Day Bookkeeping & Ledger Management',
      'Month-End Close & Account Reconciliation',
    ],
  },
  {
    id: '02',
    name: 'Team Member 02',
    role: 'Financial Reporting',
    fullTitle: 'Team Member 02 — Financial Reporting',
    image: '/assets/aistudio/make_the_background_white_20261026005720_11zon_-_Copy_f3d00f22.jpg',
    alt: 'Team Member 02 — Financial Reporting portrait on white background',
    description:
      'Prepares clear monthly and quarterly financial statements, management reporting packs, and performance summaries that give business leaders reliable visibility into operational results.',
    expertise: [
      'Monthly & Quarterly Financial Statements',
      'Management Reporting & Performance Analysis',
    ],
  },
  {
    id: '03',
    name: 'Team Member 03',
    role: 'Financial Advisory',
    fullTitle: 'Team Member 03 — Financial Advisory',
    image: '/assets/aistudio/make_the_background_white_20261026005555_11zon_bbe2e59b.jpg',
    alt: 'Team Member 03 — Financial Advisory portrait on white background',
    description:
      'Supports growing organizations with cash-flow planning, budgeting frameworks, and practical financial guidance tailored to evolving operational priorities across markets.',
    expertise: [
      'Cash-Flow Forecasting & Budgeting',
      'Operational Planning & Business Guidance',
    ],
  },
  {
    id: '04',
    name: 'Team Member 04',
    role: 'Cloud Accounting',
    fullTitle: 'Team Member 04 — Cloud Accounting',
    image: '/assets/aistudio/make_the_background_white_20261026005707_11zon_-_Copy_99bedf13.jpg',
    alt: 'Team Member 04 — Cloud Accounting portrait on white background',
    description:
      'Implements and streamlines digital accounting workflows, automated invoicing processes, and connected finance tools that reduce manual administration for modern teams.',
    expertise: [
      'Digital Finance Workflows & Process Setup',
      'Automated Invoicing & Expense Systems',
    ],
  },
];

// ILLUSTRATIVE SAMPLE TESTIMONIAL PROFILES
const DEMO_TESTIMONIALS = [
  {
    id: '01',
    name: 'Sarah Mitchell',
    role: 'Managing Director',
    company: 'Northline Creative Studio',
    review:
      'Balentra brought a level of structure and clarity to our financial reporting that we had been missing. Having our numbers organized and explained in a straightforward way makes it much easier to plan ahead and focus on growing the business.',
    image: '/assets/aistudio/testimonial_avatar_1.png',
    alt: 'Illustrative sample profile portrait of Sarah Mitchell, Managing Director at Northline Creative Studio',
  },
  {
    id: '02',
    name: 'Omar Khalid',
    role: 'Founder & CEO',
    company: 'Meridian Commerce',
    review:
      'What stood out to us was the attention to detail and the clarity of communication. From bookkeeping to financial reporting, the approach felt organized, practical, and tailored to the way our business operates.',
    image: '/assets/aistudio/testimonial_avatar_2.png',
    alt: 'Illustrative sample profile portrait of Omar Khalid, Founder & CEO at Meridian Commerce',
  },
  {
    id: '03',
    name: 'Daniel Foster',
    role: 'Operations Director',
    company: 'Elevate Digital Group',
    review:
      "Managing our financial processes used to take more time than it should. Balentra's structured approach helped simplify our reporting workflow and gave us a clearer picture of the information we needed to make decisions.",
    image: '/assets/aistudio/testimonial_avatar_3.png',
    alt: 'Illustrative sample profile portrait of Daniel Foster, Operations Director at Elevate Digital Group',
  },
];

const FAQ_ITEMS = [
  {
    id: '01',
    question: 'What accounting services does Balentra offer?',
    answer:
      "Balentra's services include bookkeeping, financial reporting, payroll coordination, accounts payable and receivable management, cloud accounting, and financial advisory support.",
  },
  {
    id: '02',
    question: 'Can Balentra support businesses internationally?',
    answer:
      'Balentra is designed around remote-first accounting and financial services. Support for individual businesses depends on their location, financial requirements, and the services available in their jurisdiction.',
  },
  {
    id: '03',
    question: 'Do you work with startups and growing businesses?',
    answer:
      'Yes. Our services are designed for startups, small and medium-sized businesses, and growing companies seeking organized accounting processes and clearer financial reporting.',
  },
  {
    id: '04',
    question: 'How do we get started with Balentra?',
    answer:
      'Start by submitting a consultation request. Share a few details about your business, and our team can discuss your requirements, the appropriate service scope, and the next steps.',
  },
];

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [activeNav, setActiveNav] = useState<NavItem>('Home');
  const [activeModal, setActiveModal] = useState<'consultation' | 'services' | 'about' | null>(null);
  const [imageError, setImageError] = useState(false);
  const [aboutImageError, setAboutImageError] = useState(false);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number>(0);
  const [previousTeamIndex, setPreviousTeamIndex] = useState<number>(1);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState<number>(0);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const getRevealProps = (
    delay = 0,
    duration = 0.62,
    initialScale = 0.96,
    initialY = 24
  ) => ({
    initial: prefersReducedMotion
      ? false
      : { opacity: 0, scale: initialScale, y: initialY },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true, amount: 0.18, margin: '0px 0px -44px 0px' },
    transition: {
      duration: prefersReducedMotion ? 0 : duration,
      delay: prefersReducedMotion ? 0 : delay,
      ease: HOMEPAGE_EASE,
    },
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (currentPath === '/') {
      document.title =
        'Balentra Accounting | International Accounting & Advisory';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Balentra Accounting helps businesses stay compliant, organized, and growth-ready with accounting, tax, reporting, and advisory support tailored for the international market.'
        );
      }
    }
  }, [currentPath]);

  const navigateToServices = (slug?: string) => {
    const targetPath = slug ? `/services/${slug}` : '/services';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setCurrentPath(targetPath);
    setActiveNav('Services');
  };

  const navigateToHomeSection = (
    sectionId?: string,
    defaultServiceTitle?: string
  ) => {
    if (defaultServiceTitle) {
      setInquiryForm((prev) => ({
        ...prev,
        serviceRequired: defaultServiceTitle,
      }));
    }
    const targetUrl =
      sectionId && sectionId !== 'home' ? `/#${sectionId}` : '/';
    if (
      window.location.pathname !== '/' ||
      (sectionId && sectionId !== 'home' && window.location.hash !== `#${sectionId}`)
    ) {
      window.history.pushState({}, '', targetUrl);
    }
    setCurrentPath('/');
    if (!sectionId || sectionId === 'home') {
      setActiveNav('Home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (sectionId === 'about-us') setActiveNav('About');
    else if (sectionId === 'industries-we-serve') setActiveNav('Industries');
    else if (sectionId === 'our-team') setActiveNav('Team');
    else if (sectionId === 'contact-us') setActiveNav('Contact');

    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleToggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const handleSelectTeamMember = (index: number) => {
    if (index === selectedTeamIndex) return;
    setPreviousTeamIndex(selectedTeamIndex);
    setSelectedTeamIndex(index);
  };

  const handlePrevTeamMember = () => {
    setPreviousTeamIndex(selectedTeamIndex);
    setSelectedTeamIndex((prev) => (prev - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length);
  };

  const handleNextTeamMember = () => {
    setPreviousTeamIndex(selectedTeamIndex);
    setSelectedTeamIndex((prev) => (prev + 1) % TEAM_MEMBERS.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonialIndex(
      (prev) => (prev - 1 + DEMO_TESTIMONIALS.length) % DEMO_TESTIMONIALS.length
    );
  };

  const handleNextTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev + 1) % DEMO_TESTIMONIALS.length);
  };

  // Consultation form state
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    jurisdiction: 'European Union & UK',
    inquiry: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.workEmail.trim()) return;
    setModalSubmitting(true);
    setModalError('');
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          businessEmail: formData.workEmail.trim(),
          companyName: formData.company.trim() || 'Balentra Client',
          serviceRequired: 'Business Advisory',
          message:
            formData.inquiry.trim().length >= 10
              ? formData.inquiry.trim()
              : `Executive consultation request for jurisdiction: ${formData.jurisdiction}.`,
        }),
      });
      const data = await response.json().catch(() => null);
      if (response.ok && data?.ok) {
        setFormSubmitted(true);
      } else {
        setModalError(
          data?.error ||
            'Unable to submit your consultation request at this time. Please try again.'
        );
      }
    } catch {
      setModalError(
        'Unable to connect to the inquiry service. Please check your connection and try again.'
      );
    } finally {
      setModalSubmitting(false);
    }
  };

  const resetConsultationModal = () => {
    setActiveModal('consultation');
    setFormSubmitted(false);
    setModalError('');
  };

  // Contact Us / Inquiry section state
  const [inquiryForm, setInquiryForm] = useState({
    fullName: '',
    businessEmail: '',
    companyName: '',
    serviceRequired: '',
    message: '',
  });
  const [inquiryFieldErrors, setInquiryFieldErrors] = useState<
    Partial<Record<'fullName' | 'businessEmail' | 'companyName' | 'serviceRequired' | 'message', string>>
  >({});
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [inquiryErrorMessage, setInquiryErrorMessage] = useState<string>('');
  const [inquiryReferenceId, setInquiryReferenceId] = useState<string>('');

  const validateInquiryForm = () => {
    const errors: Partial<Record<'fullName' | 'businessEmail' | 'companyName' | 'serviceRequired' | 'message', string>> = {};
    if (inquiryForm.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryForm.businessEmail.trim())) {
      errors.businessEmail = 'Please enter a valid business email address.';
    }
    if (!inquiryForm.companyName.trim()) {
      errors.companyName = 'Please enter your company name.';
    }
    if (!inquiryForm.serviceRequired.trim()) {
      errors.serviceRequired = 'Please select a service.';
    }
    if (inquiryForm.message.trim().length < 10) {
      errors.message = 'Please share a brief message (at least 10 characters).';
    }
    return errors;
  };

  const handleInquiryFieldChange = (
    field: 'fullName' | 'businessEmail' | 'companyName' | 'serviceRequired' | 'message',
    value: string
  ) => {
    setInquiryForm((prev) => ({ ...prev, [field]: value }));
    if (inquiryFieldErrors[field]) {
      setInquiryFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (inquiryStatus === 'error') {
      setInquiryStatus('idle');
      setInquiryErrorMessage('');
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateInquiryForm();
    if (Object.keys(validationErrors).length > 0) {
      setInquiryFieldErrors(validationErrors);
      return;
    }

    setInquiryFieldErrors({});
    setInquiryStatus('submitting');
    setInquiryErrorMessage('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: inquiryForm.fullName.trim(),
          businessEmail: inquiryForm.businessEmail.trim(),
          companyName: inquiryForm.companyName.trim(),
          serviceRequired: inquiryForm.serviceRequired.trim(),
          message: inquiryForm.message.trim(),
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload || payload.ok !== true) {
        if (payload?.fieldErrors && typeof payload.fieldErrors === 'object') {
          setInquiryFieldErrors(payload.fieldErrors);
        }
        setInquiryStatus('error');
        setInquiryErrorMessage(
          payload?.error || 'We could not submit your inquiry at this time. Please verify your details and try again.'
        );
        return;
      }

      setInquiryReferenceId(payload.inquiryId || '');
      setInquiryStatus('success');
      setInquiryForm({
        fullName: '',
        businessEmail: '',
        companyName: '',
        serviceRequired: '',
        message: '',
      });
    } catch {
      setInquiryStatus('error');
      setInquiryErrorMessage(
        'Unable to reach the inquiry service right now. Please check your connection and try again.'
      );
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about-us');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const normalizedPath =
    currentPath.length > 1 && currentPath.endsWith('/')
      ? currentPath.slice(0, -1)
      : currentPath;

  const isServicesOverviewRoute = normalizedPath === '/services';
  const activeServiceSlug = normalizedPath.startsWith('/services/')
    ? normalizedPath.replace('/services/', '').split('/')[0] || null
    : null;
  const activeServiceDetail = activeServiceSlug
    ? SERVICE_DETAILS_BY_SLUG[activeServiceSlug] || null
    : null;

  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0C] text-[#F5F5F3] font-sans overflow-x-hidden">
      {activeServiceDetail ? (
        <Suspense fallback={<div className="min-h-screen bg-[#FFFFFF]" />}>
          <ServiceDetailPage
            service={activeServiceDetail}
            currentPath={normalizedPath}
            onNavigateHomeSection={navigateToHomeSection}
            onNavigateServices={navigateToServices}
            onOpenConsultation={(defaultService) => {
              if (defaultService) {
                setFormData((prev) => ({
                  ...prev,
                  inquiry: `Inquiry regarding ${defaultService}: `,
                }));
              }
              resetConsultationModal();
            }}
          />
        </Suspense>
      ) : isServicesOverviewRoute || activeServiceSlug ? (
        <Suspense fallback={<div className="min-h-screen bg-[#FFFFFF]" />}>
          <ServicesPage
            currentPath="/services"
            onNavigateHomeSection={navigateToHomeSection}
            onNavigateServices={navigateToServices}
            onOpenConsultation={(defaultService) => {
              if (defaultService) {
                setFormData((prev) => ({
                  ...prev,
                  inquiry: `Inquiry regarding ${defaultService}: `,
                }));
              }
              resetConsultationModal();
            }}
          />
        </Suspense>
      ) : (
        <>
          {/* FULL-SCREEN HERO SECTION */}
          <section className="relative min-h-screen w-full flex flex-col justify-between">
        {/* Background Image Layer with Zero-Broken-Image Resilience */}
        <div className="absolute inset-0 z-0">
          {!imageError ? (
            <img
              src="/assets/aistudio/hero_image_design_e8f2459b.jpg"
              alt="Balentra Accounting executive advisory team in dark architectural interior"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover object-center scale-[1.01] brightness-[0.88] contrast-[1.08]"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#121316] via-[#0B0C0E] to-[#181512]" />
          )}

          {/* Directional Left-Weighted Dark Editorial Scrims for High Readability + Calmer Right Frame */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#08080A]/95 via-[#0A0A0C]/78 to-[#0A0A0C]/35"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#08080A]/90 via-transparent to-[#08080A]/60"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,100,56,0.05),transparent_55%)]"
            aria-hidden="true"
          />
        </div>

        {/* TOP CONTAINED SCULPTED WHITE NAVIGATION BAR WITH SERVICES DROPDOWN */}
        <Navbar
          currentPath={normalizedPath}
          activeNav={activeNav}
          variant="dark-hero"
          onNavigateHomeSection={navigateToHomeSection}
          onNavigateServices={navigateToServices}
          onOpenConsultation={resetConsultationModal}
        />

        {/* MAIN LEFT-ALIGNED HERO CONTENT */}
        <main className="relative z-20 flex-1 flex items-center">
          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 py-14 lg:py-20">
            <div className="max-w-[650px]">
              {/* Eyebrow */}
              <motion.div
                {...getRevealProps(0, 0.58)}
                className="inline-flex items-center gap-3 mb-6 transform-gpu"
              >
                <span className="w-7 h-[2px] bg-[#FF6438]" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-semibold tracking-[0.22em] uppercase text-[#E5E5E0]">
                  INTERNATIONAL ACCOUNTING &amp; ADVISORY
                </span>
              </motion.div>

              {/* Strong Editorial H1 */}
              <motion.h1
                {...getRevealProps(0.1, 0.65)}
                className="font-serif text-[clamp(2.75rem,5.4vw,4.75rem)] leading-[1.06] tracking-[-0.02em] text-white font-normal text-balance mb-7 transform-gpu"
              >
                Accounting for{' '}
                <span className="italic font-normal text-[#F7F6F2] relative inline-block">
                  What’s Next
                  <span className="text-[#FF6438] not-italic">.</span>
                </span>
              </motion.h1>

              {/* Supporting Paragraph */}
              <motion.p
                {...getRevealProps(0.2, 0.62)}
                className="text-base sm:text-[17px] leading-[1.72] text-[#C8C8C2] font-normal max-w-[56ch] mb-10 tracking-[0.01em] transform-gpu"
              >
                Balentra Accounting helps businesses stay compliant, organized,
                and growth-ready with accounting, tax, reporting, and advisory
                support tailored for the international market.
              </motion.p>

              {/* REDESIGNED HERO CTA AREA:
                  1. White Pill Consultation Button + Connected/Paired Electric Orange Arrow Circle
                  2. Three Small Overlapping Professional Portraits
                  3. Understated Secondary "Explore Services" Action */}
              <motion.div
                {...getRevealProps(0.3, 0.62)}
                className="flex flex-wrap items-center gap-y-4 gap-x-5 sm:gap-x-6 transform-gpu"
              >
                {/* Primary Consultation CTA + Overlapping Portraits Cluster */}
                <div className="flex items-center gap-3.5 sm:gap-4">
                  {/* Unified Two-Part Button: White Pill Left + Electric Orange Circle Right */}
                  <button
                    type="button"
                    onClick={resetConsultationModal}
                    className="group inline-flex items-center gap-1.5 rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6438]"
                  >
                    {/* Left Section: White Pill-Shaped Background */}
                    <span className="h-[46px] px-6 rounded-full bg-white text-[#141416] text-[14px] font-semibold tracking-[-0.01em] inline-flex items-center justify-center whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-shadow duration-[280ms] ease-out group-hover:shadow-[0_10px_28px_rgba(0,0,0,0.36)]">
                      Book a Consultation
                    </span>

                    {/* Right Section: Separate Circular Button Element */}
                    <span className="w-[46px] h-[46px] rounded-full bg-[#FF6438] text-white inline-flex items-center justify-center shrink-0 shadow-[0_6px_18px_rgba(255,100,56,0.32)] transition-all duration-[280ms] ease-out group-hover:bg-[#111113] group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.55)] group-hover:ring-1 group-hover:ring-white/20 group-focus-visible:bg-[#111113]">
                      <ArrowUpRight
                        strokeWidth={2.2}
                        className="w-[18px] h-[18px] text-white transition-all duration-[280ms] ease-out group-hover:text-[#FF6438] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-focus-visible:text-[#FF6438] group-focus-visible:translate-x-[3px] group-focus-visible:-translate-y-[3px]"
                      />
                    </span>
                  </button>

                  {/* Three Small Overlapping Professional Portraits */}
                  <div
                    className="flex items-center -space-x-2 shrink-0"
                    aria-label="Balentra advisory specialists"
                  >
                    {PORTRAITS.map((portrait, index) => (
                      <div
                        key={portrait.src}
                        className="relative w-[34px] h-[34px] sm:w-[36px] sm:h-[36px] rounded-full overflow-hidden border-[1.5px] border-white bg-[#1B1B1F] shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                      >
                        <img
                          src={portrait.src}
                          alt={portrait.alt}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                        />
                        <span className="sr-only">Advisor {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Understated Secondary Action: Explore Services */}
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToServices();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="h-[46px] px-6 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-[#E8E8E3] hover:text-white border border-white/20 hover:border-white/45 text-[14px] font-medium tracking-[0.01em] transition-all duration-[260ms] ease-out inline-flex items-center gap-2 backdrop-blur-[2px] cursor-pointer group whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6438]"
                >
                  <span>Explore Services</span>
                  <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-[#FF6438] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all duration-[260ms]" />
                </a>
              </motion.div>
            </div>
          </div>
        </main>

        {/* SUBTLE EDITORIAL BOTTOM ANCHOR BAR */}
        <motion.footer
          {...getRevealProps(0.4, 0.58)}
          className="relative z-20 w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16 pb-7 pt-4 transform-gpu"
        >
          <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9E9E98] tracking-[0.04em]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-[#E5E5E0] font-medium">Global Desks</span>
              <span aria-hidden="true" className="text-[#FF6438]">·</span>
              <span>London</span>
              <span aria-hidden="true">·</span>
              <span>Zurich</span>
              <span aria-hidden="true">·</span>
              <span>Singapore</span>
              <span aria-hidden="true">·</span>
              <span>New York</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#9E9E98]">
              <span>IFRS &amp; Multi-GAAP Advisory</span>
              <span aria-hidden="true" className="text-white/20">/</span>
              <span className="tabular-nums text-[#D4D4CE]">ISO 27001 Certified Practice</span>
            </div>
          </div>
        </motion.footer>
      </section>

      {/* COMPACT THREE-COLUMN ABOUT US SECTION DIRECTLY BELOW HERO */}
      <section
        id="about-us"
        aria-labelledby="about-us-heading"
        className="w-full bg-white text-[#141416] py-10 sm:py-12 px-6 sm:px-10"
      >
        <div className="w-full max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[370px_1fr_225px] items-center gap-8 lg:gap-10">
          {/* Column 1 (Left): Wider Editorial Rounded-Corner Image Card with Clean Mask Reveal & Bottom-Right Sculpted Avatar Cluster */}
          <motion.div
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.96,
                    y: 24,
                    clipPath: 'inset(6% 6% 6% 6% round 22px)',
                  }
            }
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
              clipPath: 'inset(0% 0% 0% 0% round 22px)',
            }}
            viewport={{ once: true, amount: 0.2, margin: '0px 0px -44px 0px' }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.68,
              delay: 0,
              ease: HOMEPAGE_EASE,
            }}
            className="relative w-full sm:w-[380px] lg:w-[370px] h-[255px] sm:h-[272px] rounded-[22px] overflow-hidden bg-neutral-100 shrink-0 shadow-[0_10px_30px_rgba(17,17,19,0.07)] transform-gpu"
          >
            {!aboutImageError ? (
              <img
                src="/assets/aistudio/Team_collaborating_around_confer__20261026000222__1__1344684c.jpg"
                alt="Balentra accounting team collaborating around a conference table"
                referrerPolicy="no-referrer"
                onError={() => setAboutImageError(true)}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-xs text-neutral-500">
                Balentra Advisory Team
              </div>
            )}

            {/* Subtle Editorial Inner Frame Ring */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-black/[0.06]"
              aria-hidden="true"
            />

            {/* Sculpted White Bottom-Right Cutout with Overlapping Avatar Cluster (Reference Style) */}
            <div className="absolute bottom-0 right-0 z-10 bg-white rounded-tl-[22px] pt-2.5 pl-3.5 pr-1.5 pb-1.5 flex items-center">
              {/* Top-Right Concave Fillet Curve */}
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="w-5 h-5 absolute -top-5 right-0 text-white fill-current pointer-events-none"
              >
                <path d="M 20 0 A 20 20 0 0 1 0 20 L 20 20 Z" />
              </svg>

              {/* Bottom-Left Concave Fillet Curve */}
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="w-5 h-5 absolute bottom-0 -left-5 text-white fill-current pointer-events-none"
              >
                <path d="M 20 0 A 20 20 0 0 1 0 20 L 20 20 Z" />
              </svg>

              {/* Overlapping Three-Avatar Cluster */}
              <div
                className="flex items-center -space-x-2"
                aria-label="Balentra advisory team portraits"
              >
                {PORTRAITS.map((portrait, idx) => (
                  <div
                    key={portrait.src}
                    className="relative w-[34px] h-[34px] rounded-full overflow-hidden border-2 border-white bg-neutral-900 shadow-[0_2px_8px_rgba(17,17,19,0.14)]"
                  >
                    <img
                      src={portrait.src}
                      alt={portrait.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <span className="sr-only">Team member {idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Column 2 (Center): About Us Text Content, 3 Supporting Lines & Sleek White + Orange Accent CTA */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Small Eyebrow with Electric Orange Dot + Heading */}
              <motion.div
                {...getRevealProps(0.09, 0.62)}
                className="transform-gpu"
              >
                <div className="inline-flex items-center gap-2 mb-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#FF6438]">
                    ABOUT US
                  </span>
                </div>

                {/* Heading */}
                <h2
                  id="about-us-heading"
                  className="text-[21px] sm:text-[23px] leading-[1.26] font-semibold tracking-[-0.02em] text-[#111113] mb-2.5 text-balance"
                >
                  Accounting That Works Beyond the Numbers.
                </h2>
              </motion.div>

              {/* Main Paragraph */}
              <motion.p
                {...getRevealProps(0.18, 0.62)}
                className="text-[13.5px] sm:text-[14px] leading-[1.6] text-[#5E5E66] font-normal mb-3.5 transform-gpu"
              >
                Balentra helps growing businesses manage bookkeeping, financial
                reporting, and everyday finance operations with greater clarity
                and confidence. We combine practical accounting support with
                organized systems that help teams stay focused, compliant, and
                ready for growth.
              </motion.p>

              {/* 3 Short Supporting Lines */}
              <ul className="space-y-1.5 mb-5 text-[13px] leading-[1.45] text-[#2B2B30] font-medium">
                <motion.li
                  {...getRevealProps(0.26, 0.58)}
                  className="flex items-start gap-2.5 transform-gpu"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#FF6438] mt-[6px] shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    Clear reporting that helps you understand where your business stands.
                  </span>
                </motion.li>
                <motion.li
                  {...getRevealProps(0.35, 0.58)}
                  className="flex items-start gap-2.5 transform-gpu"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#FF6438] mt-[6px] shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    Flexible accounting support tailored to your operations and goals.
                  </span>
                </motion.li>
                <motion.li
                  {...getRevealProps(0.44, 0.58)}
                  className="flex items-start gap-2.5 transform-gpu"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#FF6438] mt-[6px] shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    Reliable financial processes that create confidence for long-term growth.
                  </span>
                </motion.li>
              </ul>
            </div>

            {/* White Button with Orange Arrow Area & Subtle Hover Animation */}
            <motion.div
              {...getRevealProps(0.52, 0.58)}
              className="flex items-center transform-gpu"
            >
              <a
                href="#about-details"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveNav('About');
                  setActiveModal('about');
                }}
                className="group inline-flex items-center gap-2.5 bg-white hover:bg-[#FAFAFA] text-[#141416] pl-4 pr-1.5 py-1.5 rounded-full border border-neutral-200/90 hover:border-[#FF6438]/40 shadow-[0_4px_14px_rgba(17,17,19,0.06)] hover:shadow-[0_8px_22px_rgba(17,17,19,0.1)] transition-all duration-250 ease-out whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
              >
                <span className="text-[13px] font-semibold tracking-[-0.01em] text-[#141416]">
                  More About Us
                </span>
                <span className="w-7 h-7 rounded-full bg-[#FF6438] text-white inline-flex items-center justify-center transition-all duration-250 ease-out group-hover:bg-[#111113]">
                  <ArrowUpRight
                    strokeWidth={2.2}
                    className="w-3.5 h-3.5 text-white transition-all duration-250 ease-out group-hover:text-[#FF6438] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                  />
                </span>
              </a>
            </motion.div>
          </div>

          {/* Column 3 (Right): Three Vertically Stacked Value Points */}
          <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-neutral-200/80 pt-6 lg:pt-1 lg:pl-8 gap-4">
            {/* Value Point 1 */}
            <motion.div
              {...getRevealProps(0.18, 0.6)}
              className="transform-gpu"
            >
              <h3 className="text-[17px] sm:text-[18px] font-semibold tracking-[-0.02em] text-[#111113] leading-snug mb-0.5">
                Financial Clarity
              </h3>
              <p className="text-[12.5px] sm:text-[13px] leading-[1.45] text-[#7A7A82] font-normal">
                Organized records and meaningful reporting.
              </p>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0.85 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: prefersReducedMotion ? 0 : 0.24, ease: HOMEPAGE_EASE }}
              className="h-px w-full bg-neutral-100 hidden lg:block origin-left"
              aria-hidden="true"
            />

            {/* Value Point 2 */}
            <motion.div
              {...getRevealProps(0.28, 0.6)}
              className="transform-gpu"
            >
              <h3 className="text-[17px] sm:text-[18px] font-semibold tracking-[-0.02em] text-[#111113] leading-snug mb-0.5">
                Flexible Support
              </h3>
              <p className="text-[12.5px] sm:text-[13px] leading-[1.45] text-[#7A7A82] font-normal">
                Accounting built around your business.
              </p>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0.85 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: prefersReducedMotion ? 0 : 0.34, ease: HOMEPAGE_EASE }}
              className="h-px w-full bg-neutral-100 hidden lg:block origin-left"
              aria-hidden="true"
            />

            {/* Value Point 3 */}
            <motion.div
              {...getRevealProps(0.38, 0.6)}
              className="transform-gpu"
            >
              <h3 className="text-[17px] sm:text-[18px] font-semibold tracking-[-0.02em] text-[#111113] leading-snug mb-0.5">
                Growth Focus
              </h3>
              <p className="text-[12.5px] sm:text-[13px] leading-[1.45] text-[#7A7A82] font-normal">
                Practical financial systems for long-term progress.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW BALENTRA WORKS — MINIMALIST THREE-STEP FLOWING PROCESS SECTION */}
      <section
        id="how-we-work"
        aria-labelledby="how-we-work-heading"
        className="w-full bg-white text-[#141416] pt-10 pb-16 sm:pt-14 sm:pb-20 px-6 sm:px-10 border-t border-neutral-100"
      >
        <div className="w-full max-w-[1180px] mx-auto">
          {/* Large Centered Heading */}
          <motion.div
            {...getRevealProps(0, 0.6)}
            className="text-center mb-12 sm:mb-16 transform-gpu"
          >
            <h2
              id="how-we-work-heading"
              className="font-serif text-[30px] sm:text-[38px] lg:text-[42px] leading-[1.15] tracking-[-0.02em] text-[#111113] font-normal"
            >
              How <span className="text-[#111113] font-medium">Balentra</span> Works
            </h2>
          </motion.div>

          {/* Three-Step Horizontal Process with Flowing S-Curve Line */}
          <div className="relative max-w-[1040px] mx-auto">
            {/* Desktop & Tablet Flowing Curved Connecting Line SVG */}
            <svg
              viewBox="0 0 1000 170"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="hidden md:block absolute top-0 left-0 w-full h-[170px] pointer-events-none"
            >
              {/* First Arching Curve: From Step 1 Marker (x≈205, y≈56) to Step 2 Marker (x≈435, y≈92) */}
              <motion.path
                d="M 205 56 C 280 22, 365 36, 435 92"
                stroke="#D0D0D6"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={
                  prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }
                }
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.66,
                  delay: prefersReducedMotion ? 0 : 0.16,
                  ease: HOMEPAGE_EASE,
                }}
              />
              {/* Second Dipping Curve: From Step 2 Marker (x≈555, y≈98) to Step 3 Marker (x≈785, y≈106) */}
              <motion.path
                d="M 555 98 C 630 144, 715 144, 785 106"
                stroke="#D0D0D6"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={
                  prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }
                }
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.66,
                  delay: prefersReducedMotion ? 0 : 0.28,
                  ease: HOMEPAGE_EASE,
                }}
              />
            </svg>

            {/* Three Steps Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 items-start">
              {/* STEP 01 — UNDERSTAND */}
              <motion.div
                {...getRevealProps(0.1, 0.62)}
                className="group relative flex md:block items-start gap-5 md:pt-0 transform-gpu"
              >
                {/* Mobile Vertical Connecting Line */}
                <motion.span
                  aria-hidden="true"
                  initial={
                    prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }
                  }
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.58,
                    delay: prefersReducedMotion ? 0 : 0.18,
                    ease: HOMEPAGE_EASE,
                  }}
                  className="md:hidden absolute left-[24px] top-[58px] -bottom-8 w-px bg-[#D8D8DE] origin-top"
                />

                {/* Icon + Black Numbered Marker Cluster */}
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, scale: 0.92, y: 12 }
                  }
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.58,
                    delay: prefersReducedMotion ? 0 : 0.12,
                    ease: HOMEPAGE_EASE,
                  }}
                  className="relative inline-flex items-center justify-center w-14 h-14 md:ml-16 lg:ml-20 mb-0 md:mb-7 shrink-0 transform-gpu"
                >
                  <UserPlus
                    strokeWidth={1.75}
                    className="w-8 h-8 text-[#141416] transition-colors duration-200 group-hover:text-[#FF6438]"
                  />
                  <span className="absolute -top-1 -right-2 w-6 h-6 rounded-full bg-[#111113] text-white text-[11px] font-semibold tabular-nums flex items-center justify-center shadow-xs transition-colors duration-200 group-hover:ring-2 group-hover:ring-[#FF6438]/30">
                    1
                  </span>
                </motion.div>

                {/* Step Copy */}
                <div className="max-w-[270px]">
                  <h3 className="text-[16px] sm:text-[17px] font-semibold tracking-[-0.01em] text-[#141416] mb-2.5">
                    <span className="tabular-nums text-[#FF6438] font-medium mr-1.5">01</span>
                    <span className="text-neutral-300 mr-1.5">—</span>
                    Understand
                  </h3>
                  <p className="text-[13.5px] sm:text-[14px] leading-[1.6] text-[#7A7A82] font-normal">
                    We learn about your business, financial processes, and accounting requirements.
                  </p>
                </div>
              </motion.div>

              {/* STEP 02 — ORGANIZE */}
              <motion.div
                {...getRevealProps(0.22, 0.62)}
                className="group relative flex md:block items-start gap-5 md:pt-7 transform-gpu"
              >
                {/* Mobile Vertical Connecting Line */}
                <motion.span
                  aria-hidden="true"
                  initial={
                    prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }
                  }
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.58,
                    delay: prefersReducedMotion ? 0 : 0.28,
                    ease: HOMEPAGE_EASE,
                  }}
                  className="md:hidden absolute left-[24px] top-[58px] -bottom-8 w-px bg-[#D8D8DE] origin-top"
                />

                {/* Icon + Black Numbered Marker Cluster */}
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, scale: 0.92, y: 12 }
                  }
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.58,
                    delay: prefersReducedMotion ? 0 : 0.24,
                    ease: HOMEPAGE_EASE,
                  }}
                  className="relative inline-flex items-center justify-center w-14 h-14 md:ml-14 lg:ml-16 mb-0 md:mb-7 shrink-0 transform-gpu"
                >
                  <Search
                    strokeWidth={1.85}
                    className="w-8 h-8 text-[#141416] transition-colors duration-200 group-hover:text-[#FF6438]"
                  />
                  <span className="absolute -top-1 -right-2 w-6 h-6 rounded-full bg-[#111113] text-white text-[11px] font-semibold tabular-nums flex items-center justify-center shadow-xs transition-colors duration-200 group-hover:ring-2 group-hover:ring-[#FF6438]/30">
                    2
                  </span>
                </motion.div>

                {/* Step Copy */}
                <div className="max-w-[270px]">
                  <h3 className="text-[16px] sm:text-[17px] font-semibold tracking-[-0.01em] text-[#141416] mb-2.5">
                    <span className="tabular-nums text-[#FF6438] font-medium mr-1.5">02</span>
                    <span className="text-neutral-300 mr-1.5">—</span>
                    Organize
                  </h3>
                  <p className="text-[13.5px] sm:text-[14px] leading-[1.6] text-[#7A7A82] font-normal">
                    We structure your records, establish workflows, and define clear reporting processes.
                  </p>
                </div>
              </motion.div>

              {/* STEP 03 — SUPPORT */}
              <motion.div
                {...getRevealProps(0.34, 0.62)}
                className="group relative flex md:block items-start gap-5 md:pt-14 transform-gpu"
              >
                {/* Icon + Black Numbered Marker Cluster */}
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, scale: 0.92, y: 12 }
                  }
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.58,
                    delay: prefersReducedMotion ? 0 : 0.36,
                    ease: HOMEPAGE_EASE,
                  }}
                  className="relative inline-flex items-center justify-center w-14 h-14 md:ml-14 lg:ml-16 mb-0 md:mb-7 shrink-0 transform-gpu"
                >
                  <Send
                    strokeWidth={1.75}
                    className="w-8 h-8 text-[#141416] transition-colors duration-200 group-hover:text-[#FF6438]"
                  />
                  <span className="absolute -top-1 -right-2 w-6 h-6 rounded-full bg-[#111113] text-white text-[11px] font-semibold tabular-nums flex items-center justify-center shadow-xs transition-colors duration-200 group-hover:ring-2 group-hover:ring-[#FF6438]/30">
                    3
                  </span>
                </motion.div>

                {/* Step Copy */}
                <div className="max-w-[270px]">
                  <h3 className="text-[16px] sm:text-[17px] font-semibold tracking-[-0.01em] text-[#141416] mb-2.5">
                    <span className="tabular-nums text-[#FF6438] font-medium mr-1.5">03</span>
                    <span className="text-neutral-300 mr-1.5">—</span>
                    Support
                  </h3>
                  <p className="text-[13.5px] sm:text-[14px] leading-[1.6] text-[#7A7A82] font-normal">
                    We provide ongoing accounting assistance and meaningful financial insights.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE BALENTRA — LIGHT EDITORIAL TWO-COLUMN SECTION */}
      <section
        id="why-choose-balentra"
        aria-labelledby="why-balentra-heading"
        className="w-full bg-[#FAFAF9] text-[#171717] py-16 sm:py-20 px-6 sm:px-10"
      >
        <div className="w-full max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[410px_1fr] gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Left Column: Eyebrow, Editorial Serif Heading & Supporting Paragraph */}
          <div className="lg:pr-4">
            <motion.div
              {...getRevealProps(0, 0.58)}
              className="inline-flex items-center gap-2.5 mb-4 transform-gpu"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FF6438]">
                WHY BALENTRA
              </span>
            </motion.div>

            <motion.h2
              id="why-balentra-heading"
              {...getRevealProps(0.09, 0.64)}
              className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] leading-[1.12] tracking-[-0.02em] text-[#171717] font-normal mb-5 text-balance transform-gpu"
            >
              Financial Clarity. Built Around You.
            </motion.h2>

            <motion.p
              {...getRevealProps(0.18, 0.62)}
              className="text-[14.5px] sm:text-[15.5px] leading-[1.68] text-[#737373] font-normal max-w-[44ch] transform-gpu"
            >
              We combine organized financial processes, meaningful reporting,
              and practical guidance to help businesses make more confident
              decisions.
            </motion.p>
          </div>

          {/* Right Column: Four Vertically Stacked Benefit Rows with Thin Horizontal Separators */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.06,
              ease: HOMEPAGE_EASE,
            }}
            className="divide-y divide-[#E7E7E7] border-t border-b border-[#E7E7E7]"
          >
            {/* Benefit 01 */}
            <motion.div
              {...getRevealProps(0.1, 0.6)}
              className="group py-5 sm:py-6 px-4 sm:px-5 -mx-4 sm:-mx-5 rounded-xl hover:bg-[#F3F3F1] transition-colors duration-[275ms] ease-out flex items-start justify-between gap-4 transform-gpu"
            >
              <div className="space-y-1.5 max-w-[560px]">
                <h3 className="text-[16px] sm:text-[17.5px] font-semibold tracking-[-0.01em] text-[#202020] group-hover:text-[#FF6438] transition-colors duration-[275ms] ease-out">
                  <span className="tabular-nums text-[#FF6438] font-medium mr-2">01</span>
                  <span className="text-[#D4D4D4] mr-2">—</span>
                  Clear Financial Visibility
                </h3>
                <p className="text-[13.5px] sm:text-[14px] leading-[1.6] text-[#737373] font-normal pl-0 sm:pl-9">
                  Understand business performance through organized records and meaningful financial reporting.
                </p>
              </div>
              <ArrowUpRight
                strokeWidth={1.85}
                aria-hidden="true"
                className="w-4 h-4 text-[#202020] group-hover:text-[#FF6438] group-hover:translate-x-[4px] group-hover:-translate-y-[4px] transition-all duration-[275ms] ease-out shrink-0 mt-1"
              />
            </motion.div>

            {/* Benefit 02 */}
            <motion.div
              {...getRevealProps(0.2, 0.6)}
              className="group py-5 sm:py-6 px-4 sm:px-5 -mx-4 sm:-mx-5 rounded-xl hover:bg-[#F3F3F1] transition-colors duration-[275ms] ease-out flex items-start justify-between gap-4 transform-gpu"
            >
              <div className="space-y-1.5 max-w-[560px]">
                <h3 className="text-[16px] sm:text-[17.5px] font-semibold tracking-[-0.01em] text-[#202020] group-hover:text-[#FF6438] transition-colors duration-[275ms] ease-out">
                  <span className="tabular-nums text-[#FF6438] font-medium mr-2">02</span>
                  <span className="text-[#D4D4D4] mr-2">—</span>
                  Accounting That Fits
                </h3>
                <p className="text-[13.5px] sm:text-[14px] leading-[1.6] text-[#737373] font-normal pl-0 sm:pl-9">
                  Flexible accounting support designed around your operations and evolving requirements.
                </p>
              </div>
              <ArrowUpRight
                strokeWidth={1.85}
                aria-hidden="true"
                className="w-4 h-4 text-[#202020] group-hover:text-[#FF6438] group-hover:translate-x-[4px] group-hover:-translate-y-[4px] transition-all duration-[275ms] ease-out shrink-0 mt-1"
              />
            </motion.div>

            {/* Benefit 03 */}
            <motion.div
              {...getRevealProps(0.3, 0.6)}
              className="group py-5 sm:py-6 px-4 sm:px-5 -mx-4 sm:-mx-5 rounded-xl hover:bg-[#F3F3F1] transition-colors duration-[275ms] ease-out flex items-start justify-between gap-4 transform-gpu"
            >
              <div className="space-y-1.5 max-w-[560px]">
                <h3 className="text-[16px] sm:text-[17.5px] font-semibold tracking-[-0.01em] text-[#202020] group-hover:text-[#FF6438] transition-colors duration-[275ms] ease-out">
                  <span className="tabular-nums text-[#FF6438] font-medium mr-2">03</span>
                  <span className="text-[#D4D4D4] mr-2">—</span>
                  Smarter Financial Workflows
                </h3>
                <p className="text-[13.5px] sm:text-[14px] leading-[1.6] text-[#737373] font-normal pl-0 sm:pl-9">
                  Efficient financial processes that simplify everyday accounting responsibilities.
                </p>
              </div>
              <ArrowUpRight
                strokeWidth={1.85}
                aria-hidden="true"
                className="w-4 h-4 text-[#202020] group-hover:text-[#FF6438] group-hover:translate-x-[4px] group-hover:-translate-y-[4px] transition-all duration-[275ms] ease-out shrink-0 mt-1"
              />
            </motion.div>

            {/* Benefit 04 */}
            <motion.div
              {...getRevealProps(0.4, 0.6)}
              className="group py-5 sm:py-6 px-4 sm:px-5 -mx-4 sm:-mx-5 rounded-xl hover:bg-[#F3F3F1] transition-colors duration-[275ms] ease-out flex items-start justify-between gap-4 transform-gpu"
            >
              <div className="space-y-1.5 max-w-[560px]">
                <h3 className="text-[16px] sm:text-[17.5px] font-semibold tracking-[-0.01em] text-[#202020] group-hover:text-[#FF6438] transition-colors duration-[275ms] ease-out">
                  <span className="tabular-nums text-[#FF6438] font-medium mr-2">04</span>
                  <span className="text-[#D4D4D4] mr-2">—</span>
                  Guidance Beyond the Numbers
                </h3>
                <p className="text-[13.5px] sm:text-[14px] leading-[1.6] text-[#737373] font-normal pl-0 sm:pl-9">
                  Practical financial insights to support informed decisions and forward planning.
                </p>
              </div>
              <ArrowUpRight
                strokeWidth={1.85}
                aria-hidden="true"
                className="w-4 h-4 text-[#202020] group-hover:text-[#FF6438] group-hover:translate-x-[4px] group-hover:-translate-y-[4px] transition-all duration-[275ms] ease-out shrink-0 mt-1"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* OUR SERVICES — 6-CARD IMAGE-LED SERVICES SECTION */}
      <section
        id="our-services"
        aria-labelledby="our-services-heading"
        className="w-full bg-[#FAFAFA] text-[#141416] py-16 sm:py-22 px-6 sm:px-10 border-t border-neutral-100"
      >
        {/* Hidden SVG ClipPath Definition for the Reference-Inspired Sculpted Sloped-Top Rounded Image Frame */}
        <svg className="w-0 h-0 absolute pointer-events-none" aria-hidden="true">
          <defs>
            <clipPath id="service-card-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0,0.11 Q 0,0 0.09,0.014 L 0.92,0.155 Q 1,0.17 1,0.27 L 1,0.90 Q 1,1 0.92,1 L 0.08,1 Q 0,1 0,0.90 Z" />
            </clipPath>
          </defs>
        </svg>

        <div className="w-full max-w-[1180px] mx-auto">
          {/* Section Heading Block */}
          <motion.div
            {...getRevealProps(0, 0.62)}
            className="max-w-[660px] mx-auto text-center mb-12 sm:mb-14 transform-gpu"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#FF6438]">
                OUR SERVICES
              </span>
            </div>

            {/* Main Heading */}
            <h2
              id="our-services-heading"
              className="font-serif text-[30px] sm:text-[38px] lg:text-[42px] leading-[1.15] tracking-[-0.02em] text-[#111113] font-normal mb-4 text-balance"
            >
              Services Built for Growing Businesses
            </h2>

            {/* Supporting Text */}
            <p className="text-[14.5px] sm:text-[15.5px] leading-[1.65] text-[#6E6E77] font-normal">
              Balentra delivers practical accounting, tax, reporting, and
              advisory solutions designed to support international businesses
              with clarity and confidence.
            </p>
          </motion.div>

          {/* 6-Card Grid: Desktop 3 cols, Tablet 2 cols, Mobile 1 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {OUR_SERVICES_CARDS.map((card, index) => (
              <motion.article
                key={card.title}
                {...getRevealProps(index * 0.09, 0.62, 0.96, 24)}
                onClick={() => {
                  navigateToServices(card.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative bg-white rounded-[24px] p-4 sm:p-5 flex flex-col justify-between border border-neutral-200/60 shadow-[0_8px_28px_rgba(17,17,19,0.04)] hover:shadow-[0_20px_44px_rgba(17,17,19,0.1)] hover:border-neutral-200 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.01] cursor-pointer transform-gpu"
              >
                {/* Top Sculpted Sloped-Corner Service Image */}
                <div>
                  <div className="relative w-full h-[196px] sm:h-[208px] mb-5 overflow-hidden clip-service-image bg-neutral-100">
                    <img
                      src={card.image}
                      alt={card.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Card Text Content */}
                  <div className="px-1.5">
                    <h3 className="text-[18px] sm:text-[19px] font-semibold tracking-[-0.015em] text-[#111113] group-hover:text-[#FF6438] transition-colors duration-250 mb-2">
                      <a
                        href={card.route}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigateToServices(card.slug);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
                      >
                        {card.title}
                      </a>
                    </h3>

                    <p className="text-[13.5px] sm:text-[14px] leading-[1.58] text-[#6E6E77] font-normal">
                      {card.shortText}
                    </p>

                    {/* Hover-Reveal Expanded Detail */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-out">
                      <div className="overflow-hidden">
                        <p className="pt-2.5 mt-2.5 border-t border-neutral-100 text-[12.5px] leading-[1.55] text-[#4A4A52] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                          {card.expandedText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle Learn More + Arrow Indicator */}
                <div className="px-1.5 pt-4 mt-2 flex items-center justify-between">
                  <span className="text-[12.5px] font-semibold tracking-[0.01em] text-[#141416] group-hover:text-[#FF6438] transition-colors duration-250">
                    Learn More
                  </span>
                  <span className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-[#FF6438] text-[#141416] group-hover:text-white inline-flex items-center justify-center transition-all duration-250 ease-out">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-250 ease-out group-hover:translate-x-[1.5px] group-hover:-translate-y-[1.5px]" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Explore All Services Link to /services */}
          <motion.div
            {...getRevealProps(0.28, 0.58)}
            className="mt-10 sm:mt-12 flex justify-center transform-gpu"
          >
            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                navigateToServices();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-3 rounded-full border border-neutral-300/90 bg-white hover:bg-[#111113] hover:text-white hover:border-[#111113] pl-5 pr-1.5 py-1.5 text-[13.5px] font-semibold text-[#111113] shadow-[0_4px_14px_rgba(17,17,19,0.05)] transition-all duration-[250ms] ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
            >
              <span>Explore All Services</span>
              <span className="w-8 h-8 rounded-full bg-[#FF6438] text-white inline-flex items-center justify-center shrink-0">
                <ArrowUpRight
                  strokeWidth={2.1}
                  className="w-4 h-4 transition-transform duration-[250ms] ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE — STAGGERED ARCHITECTURAL MILESTONE SECTION */}
      <section
        id="industries-we-serve"
        aria-labelledby="industries-heading"
        className="w-full bg-[#FBFBF9] text-[#141416] py-14 sm:py-16 px-6 sm:px-10 border-t border-neutral-200/60"
      >
        <div className="w-full max-w-[1220px] mx-auto">
          {/* Section Heading */}
          <motion.div
            {...getRevealProps(0, 0.62)}
            className="max-w-[640px] mb-11 sm:mb-13 transform-gpu"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#FF6438]">
                INDUSTRIES WE SERVE
              </span>
            </div>

            {/* Main Heading */}
            <h2
              id="industries-heading"
              className="font-serif text-[30px] sm:text-[36px] lg:text-[40px] leading-[1.14] tracking-[-0.02em] text-[#111113] font-normal mb-3 text-balance"
            >
              Expertise Across Industries.
            </h2>

            {/* Supporting Description */}
            <p className="text-[14px] sm:text-[15px] leading-[1.62] text-[#6E6E77] font-normal max-w-[54ch]">
              Accounting and financial support designed around the needs of
              businesses operating in different industries and markets.
            </p>
          </motion.div>

          {/* Six Horizontally Distributed Milestones with Staggered Vertical Rhythm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-6 lg:gap-x-5 items-start">
            {/* 01 — Startups & Entrepreneurs (Lower Stagger on Desktop) */}
            <div className="group flex items-start gap-3.5 lg:mt-11 transform-gpu transition-transform duration-[275ms] ease-out hover:-translate-y-1">
              <div className="flex flex-col items-center shrink-0 pt-1" aria-hidden="true">
                <motion.span
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : 0.08, ease: HOMEPAGE_EASE }}
                  className="w-3.5 h-3.5 border border-[#C6C6CE] bg-white transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438] group-hover:border-[#FF6438]"
                />
                <motion.span
                  initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.12, ease: HOMEPAGE_EASE }}
                  className="w-px h-[128px] lg:h-[142px] bg-[#D8D8E0] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]/45 origin-top"
                />
                <motion.span
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.3, ease: HOMEPAGE_EASE }}
                  className="w-1 h-1 rounded-full bg-[#C6C6CE] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]"
                />
              </div>
              <motion.div
                {...getRevealProps(0.18, 0.58)}
                className="pt-0.5 transform-gpu"
              >
                <h3 className="text-[15px] sm:text-[15.5px] font-bold leading-[1.28] tracking-[-0.015em] text-[#111113] transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438] mb-1.5">
                  Startups &amp; Entrepreneurs
                </h3>
                <div className="text-[11px] font-medium tracking-[0.02em] text-[#9898A2] tabular-nums mb-2 transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438]/85">
                  Industry 01
                </div>
                <p className="text-[12.5px] leading-[1.52] text-[#7A7A84] font-normal transition-colors duration-[275ms] ease-out group-hover:text-[#34343C]">
                  Support for emerging businesses building stronger financial foundations.
                </p>
              </motion.div>
            </div>

            {/* 02 — Technology & SaaS (Upper Stagger on Desktop) */}
            <div className="group flex items-start gap-3.5 lg:mt-0 transform-gpu transition-transform duration-[275ms] ease-out hover:-translate-y-1">
              <div className="flex flex-col items-center shrink-0 pt-1" aria-hidden="true">
                <motion.span
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : 0.17, ease: HOMEPAGE_EASE }}
                  className="w-3.5 h-3.5 border border-[#C6C6CE] bg-white transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438] group-hover:border-[#FF6438]"
                />
                <motion.span
                  initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.21, ease: HOMEPAGE_EASE }}
                  className="w-px h-[138px] lg:h-[156px] bg-[#D8D8E0] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]/45 origin-top"
                />
                <motion.span
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.39, ease: HOMEPAGE_EASE }}
                  className="w-1 h-1 rounded-full bg-[#C6C6CE] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]"
                />
              </div>
              <motion.div
                {...getRevealProps(0.27, 0.58)}
                className="pt-0.5 transform-gpu"
              >
                <h3 className="text-[15px] sm:text-[15.5px] font-bold leading-[1.28] tracking-[-0.015em] text-[#111113] transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438] mb-1.5">
                  Technology &amp; SaaS
                </h3>
                <div className="text-[11px] font-medium tracking-[0.02em] text-[#9898A2] tabular-nums mb-2 transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438]/85">
                  Industry 02
                </div>
                <p className="text-[12.5px] leading-[1.52] text-[#7A7A84] font-normal transition-colors duration-[275ms] ease-out group-hover:text-[#34343C]">
                  Structured accounting and reporting for technology-driven companies.
                </p>
              </motion.div>
            </div>

            {/* 03 — E-commerce & Retail (Lower Stagger on Desktop) */}
            <div className="group flex items-start gap-3.5 lg:mt-13 transform-gpu transition-transform duration-[275ms] ease-out hover:-translate-y-1">
              <div className="flex flex-col items-center shrink-0 pt-1" aria-hidden="true">
                <motion.span
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : 0.26, ease: HOMEPAGE_EASE }}
                  className="w-3.5 h-3.5 border border-[#C6C6CE] bg-white transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438] group-hover:border-[#FF6438]"
                />
                <motion.span
                  initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.3, ease: HOMEPAGE_EASE }}
                  className="w-px h-[128px] lg:h-[140px] bg-[#D8D8E0] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]/45 origin-top"
                />
                <motion.span
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.48, ease: HOMEPAGE_EASE }}
                  className="w-1 h-1 rounded-full bg-[#C6C6CE] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]"
                />
              </div>
              <motion.div
                {...getRevealProps(0.36, 0.58)}
                className="pt-0.5 transform-gpu"
              >
                <h3 className="text-[15px] sm:text-[15.5px] font-bold leading-[1.28] tracking-[-0.015em] text-[#111113] transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438] mb-1.5">
                  E-commerce &amp; Retail
                </h3>
                <div className="text-[11px] font-medium tracking-[0.02em] text-[#9898A2] tabular-nums mb-2 transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438]/85">
                  Industry 03
                </div>
                <p className="text-[12.5px] leading-[1.52] text-[#7A7A84] font-normal transition-colors duration-[275ms] ease-out group-hover:text-[#34343C]">
                  Financial visibility across sales, expenses, and business operations.
                </p>
              </motion.div>
            </div>

            {/* 04 — Professional Services (Upper Stagger on Desktop) */}
            <div className="group flex items-start gap-3.5 lg:mt-2 transform-gpu transition-transform duration-[275ms] ease-out hover:-translate-y-1">
              <div className="flex flex-col items-center shrink-0 pt-1" aria-hidden="true">
                <motion.span
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : 0.35, ease: HOMEPAGE_EASE }}
                  className="w-3.5 h-3.5 border border-[#C6C6CE] bg-white transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438] group-hover:border-[#FF6438]"
                />
                <motion.span
                  initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.39, ease: HOMEPAGE_EASE }}
                  className="w-px h-[136px] lg:h-[152px] bg-[#D8D8E0] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]/45 origin-top"
                />
                <motion.span
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.57, ease: HOMEPAGE_EASE }}
                  className="w-1 h-1 rounded-full bg-[#C6C6CE] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]"
                />
              </div>
              <motion.div
                {...getRevealProps(0.45, 0.58)}
                className="pt-0.5 transform-gpu"
              >
                <h3 className="text-[15px] sm:text-[15.5px] font-bold leading-[1.28] tracking-[-0.015em] text-[#111113] transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438] mb-1.5">
                  Professional Services
                </h3>
                <div className="text-[11px] font-medium tracking-[0.02em] text-[#9898A2] tabular-nums mb-2 transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438]/85">
                  Industry 04
                </div>
                <p className="text-[12.5px] leading-[1.52] text-[#7A7A84] font-normal transition-colors duration-[275ms] ease-out group-hover:text-[#34343C]">
                  Accounting support for consultants and service-based organizations.
                </p>
              </motion.div>
            </div>

            {/* 05 — Agencies & Creative Businesses (Lower Stagger on Desktop) */}
            <div className="group flex items-start gap-3.5 lg:mt-12 transform-gpu transition-transform duration-[275ms] ease-out hover:-translate-y-1">
              <div className="flex flex-col items-center shrink-0 pt-1" aria-hidden="true">
                <motion.span
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : 0.44, ease: HOMEPAGE_EASE }}
                  className="w-3.5 h-3.5 border border-[#C6C6CE] bg-white transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438] group-hover:border-[#FF6438]"
                />
                <motion.span
                  initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.48, ease: HOMEPAGE_EASE }}
                  className="w-px h-[128px] lg:h-[142px] bg-[#D8D8E0] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]/45 origin-top"
                />
                <motion.span
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.66, ease: HOMEPAGE_EASE }}
                  className="w-1 h-1 rounded-full bg-[#C6C6CE] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]"
                />
              </div>
              <motion.div
                {...getRevealProps(0.54, 0.58)}
                className="pt-0.5 transform-gpu"
              >
                <h3 className="text-[15px] sm:text-[15.5px] font-bold leading-[1.28] tracking-[-0.015em] text-[#111113] transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438] mb-1.5">
                  Agencies &amp; Creative Businesses
                </h3>
                <div className="text-[11px] font-medium tracking-[0.02em] text-[#9898A2] tabular-nums mb-2 transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438]/85">
                  Industry 05
                </div>
                <p className="text-[12.5px] leading-[1.52] text-[#7A7A84] font-normal transition-colors duration-[275ms] ease-out group-hover:text-[#34343C]">
                  Organized project finances, invoicing, and profitability reporting.
                </p>
              </motion.div>
            </div>

            {/* 06 — International Businesses (Upper Stagger on Desktop) */}
            <div className="group flex items-start gap-3.5 lg:mt-1 transform-gpu transition-transform duration-[275ms] ease-out hover:-translate-y-1">
              <div className="flex flex-col items-center shrink-0 pt-1" aria-hidden="true">
                <motion.span
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : 0.53, ease: HOMEPAGE_EASE }}
                  className="w-3.5 h-3.5 border border-[#C6C6CE] bg-white transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438] group-hover:border-[#FF6438]"
                />
                <motion.span
                  initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.57, ease: HOMEPAGE_EASE }}
                  className="w-px h-[136px] lg:h-[154px] bg-[#D8D8E0] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]/45 origin-top"
                />
                <motion.span
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.75, ease: HOMEPAGE_EASE }}
                  className="w-1 h-1 rounded-full bg-[#C6C6CE] transition-colors duration-[275ms] ease-out group-hover:bg-[#FF6438]"
                />
              </div>
              <motion.div
                {...getRevealProps(0.63, 0.58)}
                className="pt-0.5 transform-gpu"
              >
                <h3 className="text-[15px] sm:text-[15.5px] font-bold leading-[1.28] tracking-[-0.015em] text-[#111113] transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438] mb-1.5">
                  International Businesses
                </h3>
                <div className="text-[11px] font-medium tracking-[0.02em] text-[#9898A2] tabular-nums mb-2 transition-colors duration-[275ms] ease-out group-hover:text-[#FF6438]/85">
                  Industry 06
                </div>
                <p className="text-[12.5px] leading-[1.52] text-[#7A7A84] font-normal transition-colors duration-[275ms] ease-out group-hover:text-[#34343C]">
                  Coordinated accounting processes for businesses operating across markets.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR TEAM — WHITE-BACKGROUND INTERACTIVE TEAM SHOWCASE */}
      <section
        id="our-team"
        aria-labelledby="our-team-heading"
        className="w-full bg-[#FFFFFF] text-[#171717] py-20 sm:py-24 px-6 sm:px-10 border-t border-[#EAEAEA]"
      >
        <div className="w-full max-w-[1180px] mx-auto">
          {/* Top Header Row — Reference Composition:
              Upper-Left: Small introduction & main heading
              Upper-Right: Two compact circular navigation arrows */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 sm:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-[270px_1fr] gap-6 lg:gap-12 items-start max-w-[880px]">
              {/* Upper-Left Supporting Description */}
              <motion.div
                {...getRevealProps(0.1, 0.6)}
                className="order-2 lg:order-1 lg:pt-7 transform-gpu"
              >
                <p className="text-[13.5px] sm:text-[14px] leading-[1.65] text-[#737373] font-normal max-w-[34ch]">
                  Meet the professionals and specialists represented in our team
                  showcase, covering accounting operations, financial reporting,
                  advisory, and digital finance.
                </p>
              </motion.div>

              {/* Eyebrow & Main Editorial Heading */}
              <motion.div
                {...getRevealProps(0, 0.64)}
                className="order-1 lg:order-2 transform-gpu"
              >
                <div className="inline-flex items-center gap-2 mb-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FF6438]">
                    MEET OUR TEAM
                  </span>
                </div>

                <h2
                  id="our-team-heading"
                  className="font-serif text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.1] tracking-[-0.02em] text-[#171717] font-normal text-balance"
                >
                  The People Behind Balentra.
                </h2>
              </motion.div>
            </div>

            {/* Upper-Right Compact Circular Navigation Arrows */}
            <motion.div
              {...getRevealProps(0.16, 0.58)}
              className="flex items-center gap-3 shrink-0 self-start md:self-end transform-gpu"
              role="group"
              aria-label="Team member navigation"
            >
              <button
                type="button"
                onClick={handlePrevTeamMember}
                aria-label="Previous team member"
                className="w-11 h-11 rounded-full border border-[#EAEAEA] bg-[#FFFFFF] text-[#171717] inline-flex items-center justify-center cursor-pointer transition-all duration-[250ms] ease-out hover:border-[#FF6438] hover:text-[#FF6438] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.85} />
              </button>
              <button
                type="button"
                onClick={handleNextTeamMember}
                aria-label="Next team member"
                className="w-11 h-11 rounded-full border border-[#EAEAEA] bg-[#FFFFFF] text-[#171717] inline-flex items-center justify-center cursor-pointer transition-all duration-[250ms] ease-out hover:border-[#FF6438] hover:bg-[#FF6438] hover:text-white active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
              >
                <ArrowRight className="w-4 h-4" strokeWidth={1.85} />
              </button>
            </motion.div>
          </div>

          {/* Main Interactive Team Showcase Grid:
              Desktop & Tablet: 3-column layout (Left: 3 thumbnails + lower-left identity readout, Center: large featured portrait, Right: member details & expertise)
              Mobile: Featured portrait first (order-1), member details underneath (order-2), horizontal thumbnail selector (order-3) */}
          <div className="grid grid-cols-1 md:grid-cols-[225px_270px_1fr] lg:grid-cols-[275px_360px_1fr] gap-8 md:gap-7 lg:gap-12 items-stretch">
            {/* LEFT COLUMN: Three Non-Selected Portrait Thumbnails + Lower-Left Selected Member Readout */}
            <motion.div
              {...getRevealProps(0.14, 0.62)}
              className="order-3 md:order-1 flex flex-col justify-between pt-2 md:pt-1 transform-gpu"
            >
              {/* Three Non-Selected Portrait Thumbnails */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#737373]">
                    Select Team Member
                  </span>
                  <span className="text-[11px] font-semibold tabular-nums text-[#FF6438]">
                    {TEAM_MEMBERS[selectedTeamIndex].id} / 04
                  </span>
                </div>

                <div
                  className="flex items-center gap-2.5 sm:gap-3"
                  role="tablist"
                  aria-label="Select team member portrait"
                >
                  {TEAM_MEMBERS.map((member, index) => {
                    if (index === selectedTeamIndex) return null;
                    const isRecentlySwapped = index === previousTeamIndex;
                    return (
                      <button
                        key={member.id}
                        type="button"
                        role="tab"
                        aria-selected={false}
                        aria-label={`View ${member.fullTitle}`}
                        onClick={() => handleSelectTeamMember(index)}
                        className={`group relative w-[76px] h-[76px] md:w-[68px] md:h-[68px] lg:w-[82px] lg:h-[82px] rounded-[13px] bg-[#FFFFFF] p-0.5 overflow-hidden cursor-pointer shrink-0 transition-all duration-[250ms] ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438] ${
                          isRecentlySwapped
                            ? 'border border-[#FF6438]/75 hover:border-[#FF6438]'
                            : 'border border-[#EAEAEA] hover:border-[#FF6438]'
                        }`}
                      >
                        <img
                          src={member.image}
                          alt={member.alt}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain object-bottom rounded-[11px] bg-[#FFFFFF] transition-transform duration-[300ms] ease-out group-hover:scale-[1.03]"
                        />
                        {/* Subtle Electric Orange Marker Indicator */}
                        <span
                          aria-hidden="true"
                          className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#FF6438] transition-opacity duration-[250ms] ${
                            isRecentlySwapped
                              ? 'opacity-100'
                              : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lower-Left Selected Member Readout (Mirrors the Reference's Lower-Left Placement Without Review Stars) */}
              <div className="hidden md:block pt-8 md:text-right pr-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={TEAM_MEMBERS[selectedTeamIndex].id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="text-[16px] lg:text-[17px] font-semibold tracking-[-0.01em] text-[#171717]">
                      {TEAM_MEMBERS[selectedTeamIndex].name}
                    </div>
                    <div className="text-[12.5px] lg:text-[13px] text-[#737373] font-normal mt-0.5">
                      {TEAM_MEMBERS[selectedTeamIndex].role}
                    </div>

                    {/* Minimal 4-Profile Active Marker Strip */}
                    <div
                      className="inline-flex items-center justify-end gap-1.5 mt-3.5"
                      aria-hidden="true"
                    >
                      {TEAM_MEMBERS.map((member, idx) => {
                        const isActive = idx === selectedTeamIndex;
                        return (
                          <span
                            key={member.id}
                            className={`h-1 rounded-full transition-all duration-[350ms] ${
                              isActive
                                ? 'w-5 bg-[#FF6438]'
                                : 'w-1.5 bg-[#EAEAEA]'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* CENTER COLUMN: Large Featured Portrait Blending Naturally into the #FFFFFF Section */}
            <motion.div
              {...getRevealProps(0.22, 0.65)}
              className="order-1 md:order-2 flex items-center justify-center transform-gpu"
            >
              <div className="relative w-full max-w-[320px] sm:max-w-[350px] lg:max-w-[360px] aspect-square rounded-[15px] overflow-hidden bg-[#FFFFFF]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={TEAM_MEMBERS[selectedTeamIndex].id}
                    src={TEAM_MEMBERS[selectedTeamIndex].image}
                    alt={TEAM_MEMBERS[selectedTeamIndex].alt}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-contain object-bottom bg-[#FFFFFF] rounded-[15px]"
                  />
                </AnimatePresence>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Selected Team Member's Details & Two Areas of Expertise */}
            <motion.div
              {...getRevealProps(0.32, 0.62)}
              className="order-2 md:order-3 flex flex-col justify-end lg:pb-2 min-h-[245px] transform-gpu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={TEAM_MEMBERS[selectedTeamIndex].id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-[460px]"
                >
                  {/* Profile Number & Specialization Eyebrow */}
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#FF6438] tabular-nums">
                      PROFILE {TEAM_MEMBERS[selectedTeamIndex].id}
                    </span>
                    <span className="text-[#EAEAEA]" aria-hidden="true">
                      /
                    </span>
                    <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#737373]">
                      {TEAM_MEMBERS[selectedTeamIndex].role}
                    </span>
                  </div>

                  {/* Selected Member Name & Role Heading */}
                  <h3 className="font-serif text-[23px] sm:text-[26px] lg:text-[28px] leading-[1.2] tracking-[-0.015em] text-[#171717] font-normal mb-3.5">
                    {TEAM_MEMBERS[selectedTeamIndex].fullTitle}
                  </h3>

                  {/* Concise Professional Description */}
                  <p className="text-[14.5px] sm:text-[15px] leading-[1.68] text-[#737373] font-normal">
                    {TEAM_MEMBERS[selectedTeamIndex].description}
                  </p>

                  {/* Subtle Separator */}
                  <div className="border-t border-[#EAEAEA] my-5" />

                  {/* Two Areas of Expertise */}
                  <div>
                    <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#171717] mb-3">
                      Areas of Expertise
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {TEAM_MEMBERS[selectedTeamIndex].expertise.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2.5 text-[13.5px] leading-[1.45] text-[#171717] font-medium"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0 mt-1.5"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — ELECTRIC ORANGE FEATURED CARD + FADED BACKGROUND CARDS CAROUSEL */}
      <section
        id="testimonials"
        aria-labelledby="testimonials-heading"
        className="relative w-full bg-[#FFFFFF] text-[#171717] py-20 sm:py-24 px-6 sm:px-10 border-t border-[#EAEAEA] overflow-hidden"
      >
        <div className="w-full max-w-[1220px] mx-auto">
          {/* Upper Header Composition with Flowing Dashed Trajectory Line */}
          <div className="relative pb-14 sm:pb-18">
            {/* Subtle Dashed S-Curve SVG Behind Header */}
            <svg
              viewBox="0 0 1200 220"
              fill="none"
              aria-hidden="true"
              className="hidden lg:block absolute inset-x-0 top-0 w-full h-[210px] pointer-events-none select-none z-0"
            >
              <motion.path
                d="M -20 140 C 120 35, 340 20, 460 110 C 555 180, 650 180, 745 95 C 845 10, 985 15, 1085 100 C 1140 145, 1185 140, 1230 115"
                stroke="#D8D8DE"
                strokeWidth="1.4"
                strokeDasharray="6 6"
                strokeLinecap="round"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.65,
                  delay: prefersReducedMotion ? 0 : 0.12,
                  ease: HOMEPAGE_EASE,
                }}
              />
            </svg>

            {/* Center Minimal Directional Trajectory Marker Along the Curve */}
            <div
              aria-hidden="true"
              className="hidden lg:flex absolute left-[47.5%] top-[122px] -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white items-center justify-center text-[#202024]"
            >
              <Send className="w-4 h-4 -rotate-12" strokeWidth={1.6} />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              {/* Left Two-Tone Editorial Heading */}
              <motion.div
                {...getRevealProps(0, 0.64)}
                className="max-w-[540px] transform-gpu"
              >
                <div className="inline-flex items-center gap-2 mb-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FF6438]">
                    What Our Clients Say
                  </span>
                </div>

                <h2
                  id="testimonials-heading"
                  className="font-serif text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.13] tracking-[-0.02em] font-normal text-balance"
                >
                  <span className="text-[#171717]">
                    Clarity That Supports
                  </span>{' '}
                  <span className="font-sans font-normal text-[#686870] tracking-[-0.025em]">
                    Structured Financial Decisions &amp; Growth
                  </span>
                </h2>
              </motion.div>

              {/* Right Testimonial Profile Area & Supporting Note */}
              <motion.div
                {...getRevealProps(0.1, 0.62)}
                className="max-w-[380px] lg:pt-4 flex flex-col items-start transform-gpu"
              >
                <p className="text-[14px] sm:text-[14.5px] leading-[1.68] text-[#52525B] font-normal mb-2.5">
                  Organized bookkeeping, transparent reporting, and responsive
                  advisory designed around the way modern businesses operate.
                </p>
                <p className="text-[12px] leading-[1.5] text-[#737373]">
                  We believe with vision, data insight, and human connection.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Three-Card Overlapping Testimonial Carousel */}
          {(() => {
            const prevIndex =
              (activeTestimonialIndex - 1 + DEMO_TESTIMONIALS.length) %
              DEMO_TESTIMONIALS.length;
            const nextIndex =
              (activeTestimonialIndex + 1) % DEMO_TESTIMONIALS.length;
            const prevItem = DEMO_TESTIMONIALS[prevIndex];
            const activeItem = DEMO_TESTIMONIALS[activeTestimonialIndex];
            const nextItem = DEMO_TESTIMONIALS[nextIndex];

            return (
              <div className="relative flex flex-col items-center">
                {/* Cards Stage */}
                <motion.div
                  {...getRevealProps(0.16, 0.66, 0.96, 24)}
                  className="relative w-full max-w-[1120px] min-h-[360px] sm:min-h-[380px] flex items-center justify-center py-4 transform-gpu"
                >
                  {/* LEFT FADED BACKGROUND CARD (Previous Testimonial) */}
                  <button
                    type="button"
                    onClick={() => setActiveTestimonialIndex(prevIndex)}
                    aria-label={`Select illustrative sample profile from ${prevItem.name}`}
                    className="hidden lg:flex flex-col justify-between text-left absolute left-2 xl:left-6 top-1/2 -translate-y-1/2 -rotate-[2.5deg] w-[390px] min-h-[275px] rounded-[26px] bg-[#F9F9FB] border border-[#EFEFF3] p-7 opacity-80 hover:opacity-100 hover:-translate-y-[52%] transition-all duration-[350ms] ease-out cursor-pointer z-10 shadow-[0_10px_30px_rgba(17,17,19,0.03)]"
                  >
                    <div>
                      <div className="flex items-center gap-3.5 mb-5">
                        <img
                          src={prevItem.image}
                          alt={prevItem.alt}
                          className="w-11 h-11 rounded-full object-contain bg-white grayscale opacity-80 shrink-0 border border-[#E5E5EA]"
                        />
                        <div className="min-w-0">
                          <div className="text-[14px] font-bold text-[#6E6E77] truncate">
                            {prevItem.name}
                          </div>
                          <div className="text-[11.5px] text-[#9E9EA8] truncate">
                            {prevItem.role} • {prevItem.company}
                          </div>
                        </div>
                      </div>

                      <p className="text-[13px] italic leading-[1.6] text-[#8E8E98] line-clamp-4">
                        &ldquo;{prevItem.review}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#ECECF0] flex items-center justify-center text-[10.5px] uppercase tracking-[0.12em] text-[#A0A0AA]">
                      <span className="tabular-nums">{prevItem.id} / 03</span>
                    </div>
                  </button>

                  {/* CENTER ELECTRIC ORANGE FEATURED CARD (Active Testimonial) */}
                  <div className="relative z-20 w-full max-w-[540px]">
                    <AnimatePresence mode="wait">
                      <motion.article
                        key={activeItem.id}
                        initial={{ opacity: 0, y: 10, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.985 }}
                        transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full rounded-[28px] bg-[#FF6438] text-white p-7 sm:p-10 shadow-[0_26px_65px_rgba(255,100,56,0.28)]"
                      >
                        {/* Top Profile Row + Quote Icon */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="relative shrink-0">
                              <img
                                src={activeItem.image}
                                alt={activeItem.alt}
                                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-contain bg-white border-2 border-white/90 shadow-sm"
                              />
                            </div>

                            <div className="min-w-0">
                              <h3 className="text-[18px] sm:text-[20px] font-bold tracking-[-0.01em] text-white leading-tight truncate">
                                {activeItem.name}
                              </h3>
                              <p className="text-[13px] sm:text-[13.5px] text-white/90 font-normal mt-0.5 truncate">
                                {activeItem.role} • {activeItem.company}
                              </p>
                            </div>
                          </div>

                          {/* Circular Translucent Quote Badge */}
                          <div
                            aria-hidden="true"
                            className="w-11 h-11 rounded-full bg-white/20 inline-flex items-center justify-center shrink-0 text-white"
                          >
                            <Quote className="w-5 h-5 fill-white text-white" />
                          </div>
                        </div>

                        {/* Main Review Text */}
                        <blockquote className="mt-6 mb-7 text-[16.5px] sm:text-[18.5px] leading-[1.55] font-medium tracking-[-0.01em] text-white">
                          &ldquo;{activeItem.review}&rdquo;
                        </blockquote>

                        {/* Bottom Divider & Centered Slide Number */}
                        <div className="pt-4 border-t border-white/20 flex items-center justify-center text-[11px] font-medium tracking-[0.12em] uppercase text-white/85">
                          <span className="tabular-nums font-semibold text-white">
                            {activeItem.id} / 03
                          </span>
                        </div>
                      </motion.article>
                    </AnimatePresence>
                  </div>

                  {/* RIGHT FADED BACKGROUND CARD (Next Testimonial) */}
                  <button
                    type="button"
                    onClick={() => setActiveTestimonialIndex(nextIndex)}
                    aria-label={`Select illustrative sample profile from ${nextItem.name}`}
                    className="hidden lg:flex flex-col justify-between text-left absolute right-2 xl:right-6 top-1/2 -translate-y-1/2 rotate-[2.5deg] w-[390px] min-h-[275px] rounded-[26px] bg-[#F9F9FB] border border-[#EFEFF3] p-7 opacity-80 hover:opacity-100 hover:-translate-y-[52%] transition-all duration-[350ms] ease-out cursor-pointer z-10 shadow-[0_10px_30px_rgba(17,17,19,0.03)]"
                  >
                    <div>
                      <div className="flex items-center gap-3.5 mb-5">
                        <img
                          src={nextItem.image}
                          alt={nextItem.alt}
                          className="w-11 h-11 rounded-full object-contain bg-white grayscale opacity-80 shrink-0 border border-[#E5E5EA]"
                        />
                        <div className="min-w-0">
                          <div className="text-[14px] font-bold text-[#6E6E77] truncate">
                            {nextItem.name}
                          </div>
                          <div className="text-[11.5px] text-[#9E9EA8] truncate">
                            {nextItem.role} • {nextItem.company}
                          </div>
                        </div>
                      </div>

                      <p className="text-[13px] italic leading-[1.6] text-[#8E8E98] line-clamp-4">
                        &ldquo;{nextItem.review}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#ECECF0] flex items-center justify-center text-[10.5px] uppercase tracking-[0.12em] text-[#A0A0AA]">
                      <span className="tabular-nums">{nextItem.id} / 03</span>
                    </div>
                  </button>
                </motion.div>

                {/* Bottom Carousel Navigation Controls (Left Chevron + Pill/Dot Indicators + Right Chevron) */}
                <motion.div
                  {...getRevealProps(0.26, 0.58)}
                  className="mt-8 sm:mt-10 flex items-center justify-center gap-4 transform-gpu"
                  role="group"
                  aria-label="Testimonial carousel controls"
                >
                  <button
                    type="button"
                    onClick={handlePrevTestimonial}
                    aria-label="Previous testimonial"
                    className="w-11 h-11 rounded-full border border-[#E6E6EA] bg-white text-[#171717] inline-flex items-center justify-center cursor-pointer transition-all duration-[250ms] ease-out hover:border-[#FF6438] hover:text-[#FF6438] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
                  >
                    <ChevronLeft className="w-4 h-4" strokeWidth={1.9} />
                  </button>

                  <div
                    className="flex items-center gap-2 px-1"
                    role="tablist"
                    aria-label="Choose testimonial slide"
                  >
                    {DEMO_TESTIMONIALS.map((item, idx) => {
                      const isActive = idx === activeTestimonialIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          aria-label={`Show illustrative sample profile ${item.id}: ${item.name}`}
                          onClick={() => setActiveTestimonialIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-[300ms] cursor-pointer ${
                            isActive
                              ? 'w-6 bg-[#FF6438]'
                              : 'w-2 bg-[#DCDCE2] hover:bg-[#FF6438]/50'
                          }`}
                        />
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextTestimonial}
                    aria-label="Next testimonial"
                    className="w-11 h-11 rounded-full border border-[#E6E6EA] bg-white text-[#171717] inline-flex items-center justify-center cursor-pointer transition-all duration-[250ms] ease-out hover:border-[#FF6438] hover:text-[#FF6438] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
                  >
                    <ChevronRight className="w-4 h-4" strokeWidth={1.9} />
                  </button>
                </motion.div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS — MINIMALIST TWO-COLUMN ACCORDION SECTION */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="w-full bg-[#FAFAF9] text-[#171717] py-18 sm:py-22 px-6 sm:px-10 border-t border-[#E7E7E7]"
      >
        <div className="w-full max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[410px_1fr] gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Left Column: Eyebrow, Editorial Heading & Brief Introduction */}
          <div className="lg:pr-4">
            <motion.div
              {...getRevealProps(0, 0.58)}
              className="inline-flex items-center gap-2.5 mb-4 transform-gpu"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FF6438]">
                FREQUENTLY ASKED QUESTIONS
              </span>
            </motion.div>

            <motion.h2
              id="faq-heading"
              {...getRevealProps(0.09, 0.64)}
              className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] leading-[1.12] tracking-[-0.02em] text-[#171717] font-normal mb-5 text-balance transform-gpu"
            >
              Questions? We&apos;ve Got Answers.
            </motion.h2>

            <motion.p
              {...getRevealProps(0.18, 0.62)}
              className="text-[14.5px] sm:text-[15.5px] leading-[1.68] text-[#737373] font-normal max-w-[42ch] transform-gpu"
            >
              Find clear answers to common questions about our accounting
              services and how we support growing businesses.
            </motion.p>
          </div>

          {/* Right Column: Four Minimalist Accordion Questions (All Closed by Default) */}
          <div className="divide-y divide-[#E7E7E7] border-t border-b border-[#E7E7E7]">
            {FAQ_ITEMS.map((item, index) => {
              const isExpanded = openFaqId === item.id;
              const triggerId = `faq-trigger-${item.id}`;
              const panelId = `faq-panel-${item.id}`;

              return (
                <motion.div
                  key={item.id}
                  {...getRevealProps(0.1 + index * 0.09, 0.58)}
                  className="group transform-gpu"
                >
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => handleToggleFaq(item.id)}
                      className="w-full py-5 sm:py-6 flex items-center justify-between gap-5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
                    >
                      <span className="flex items-baseline gap-3.5 sm:gap-4 min-w-0">
                        <span
                          className={`text-[13px] font-semibold tabular-nums shrink-0 transition-colors duration-[300ms] motion-reduce:transition-none ${
                            isExpanded
                              ? 'text-[#FF6438]'
                              : 'text-[#8C8C94] group-hover:text-[#FF6438]'
                          }`}
                        >
                          {item.id}
                        </span>
                        <span
                          className={`text-[16px] sm:text-[17.5px] font-semibold tracking-[-0.01em] leading-[1.35] transition-colors duration-[300ms] motion-reduce:transition-none ${
                            isExpanded
                              ? 'text-[#FF6438]'
                              : 'text-[#171717] group-hover:text-[#FF6438]'
                          }`}
                        >
                          {item.question}
                        </span>
                      </span>

                      {/* Minimal Plus / Minus Icon Aligned Right */}
                      <span
                        aria-hidden="true"
                        className="relative w-5 h-5 flex items-center justify-center shrink-0"
                      >
                        {/* Horizontal Bar (Always Visible) */}
                        <span
                          className={`w-3.5 h-[1.5px] rounded-full transition-colors duration-[300ms] motion-reduce:transition-none ${
                            isExpanded
                              ? 'bg-[#FF6438]'
                              : 'bg-[#202020] group-hover:bg-[#FF6438]'
                          }`}
                        />
                        {/* Vertical Bar (Collapses/Rotates Smoothly When Expanded to Form Minus) */}
                        <span
                          className={`absolute w-[1.5px] h-3.5 rounded-full transition-all duration-[300ms] ease-out motion-reduce:transition-none ${
                            isExpanded
                              ? 'scale-y-0 opacity-0 rotate-90 bg-[#FF6438]'
                              : 'scale-y-100 opacity-100 rotate-0 bg-[#202020] group-hover:bg-[#FF6438]'
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  {/* Smooth Height Accordion Panel (310ms Eased Transition, Closed by Default) */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className={`grid transition-[grid-template-rows,opacity] duration-[310ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                      isExpanded
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pl-7 sm:pl-8 pr-6 text-[14px] sm:text-[14.5px] leading-[1.68] text-[#737373] font-normal max-w-[60ch]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT US / INQUIRY SECTION — MINIMALIST TWO-COLUMN EDITORIAL FORM */}
      <section
        id="contact-us"
        aria-labelledby="contact-us-heading"
        className="w-full bg-[#FFFFFF] text-[#171717] py-18 sm:py-22 px-6 sm:px-10 border-t border-[#E7E7E7]"
      >
        <div className="w-full max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[410px_1fr] gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Left Column: Electric Orange Eyebrow, Editorial H2 & Concise Description */}
          <div className="lg:pr-4">
            <motion.div
              {...getRevealProps(0, 0.58)}
              className="inline-flex items-center gap-2.5 mb-4 transform-gpu"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FF6438]">
                GET IN TOUCH
              </span>
            </motion.div>

            <motion.h2
              id="contact-us-heading"
              {...getRevealProps(0.09, 0.64)}
              className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] leading-[1.12] tracking-[-0.02em] text-[#171717] font-normal mb-5 text-balance transform-gpu"
            >
              Let&apos;s Talk About Your Business.
            </motion.h2>

            <motion.p
              {...getRevealProps(0.18, 0.62)}
              className="text-[14.5px] sm:text-[15.5px] leading-[1.68] text-[#737373] font-normal max-w-[42ch] transform-gpu"
            >
              Tell us about your business and the financial support you&apos;re
              looking for. We&apos;re here to help you explore the next steps.
            </motion.p>
          </div>

          {/* Right Column: Minimal Inquiry Form with Understated Dividers */}
          <div className="w-full">
            {inquiryStatus === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="py-8 border-t border-b border-[#E7E7E7]"
              >
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-[#FF6438]/12 text-[#FF6438] inline-flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" strokeWidth={2.4} />
                  </span>
                  <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#FF6438]">
                    INQUIRY RECEIVED
                  </span>
                </div>
                <h3 className="font-serif text-[24px] sm:text-[28px] text-[#171717] font-normal mb-2">
                  Thank you for reaching out.
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-[#52525B] max-w-[54ch] mb-5">
                  Your inquiry has been recorded
                  {inquiryReferenceId ? (
                    <>
                      {' '}
                      (Reference{' '}
                      <span className="font-medium text-[#171717] tabular-nums">
                        {inquiryReferenceId}
                      </span>
                      )
                    </>
                  ) : null}
                  . A member of the Balentra advisory team will review your
                  details and follow up with next steps.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setInquiryStatus('idle');
                    setInquiryReferenceId('');
                  }}
                  className="text-[13px] font-semibold text-[#171717] hover:text-[#FF6438] underline underline-offset-4 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleInquirySubmit}
                noValidate
                className="space-y-6"
              >
                {/* Row 1: Full Name & Business Email */}
                <motion.div
                  {...getRevealProps(0.12, 0.58)}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 transform-gpu"
                >
                  <div>
                    <label
                      htmlFor="inquiry-full-name"
                      className="block text-[11.5px] font-semibold tracking-[0.12em] uppercase text-[#202020] mb-2"
                    >
                      Full Name <span className="text-[#FF6438]">*</span>
                    </label>
                    <input
                      id="inquiry-full-name"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      disabled={inquiryStatus === 'submitting'}
                      value={inquiryForm.fullName}
                      onChange={(e) =>
                        handleInquiryFieldChange('fullName', e.target.value)
                      }
                      aria-invalid={Boolean(inquiryFieldErrors.fullName)}
                      aria-describedby={
                        inquiryFieldErrors.fullName
                          ? 'inquiry-full-name-error'
                          : undefined
                      }
                      placeholder="Your full name"
                      className={`w-full bg-transparent pb-3 pt-1 text-[15px] text-[#171717] placeholder:text-[#A1A1AA] border-b transition-colors duration-200 focus:outline-none disabled:opacity-60 ${
                        inquiryFieldErrors.fullName
                          ? 'border-[#DC2626] focus:border-[#DC2626]'
                          : 'border-[#E2E2DF] focus:border-[#FF6438]'
                      }`}
                    />
                    {inquiryFieldErrors.fullName && (
                      <p
                        id="inquiry-full-name-error"
                        role="alert"
                        className="mt-1.5 text-[12px] text-[#DC2626]"
                      >
                        {inquiryFieldErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-business-email"
                      className="block text-[11.5px] font-semibold tracking-[0.12em] uppercase text-[#202020] mb-2"
                    >
                      Business Email <span className="text-[#FF6438]">*</span>
                    </label>
                    <input
                      id="inquiry-business-email"
                      name="businessEmail"
                      type="email"
                      required
                      autoComplete="email"
                      disabled={inquiryStatus === 'submitting'}
                      value={inquiryForm.businessEmail}
                      onChange={(e) =>
                        handleInquiryFieldChange('businessEmail', e.target.value)
                      }
                      aria-invalid={Boolean(inquiryFieldErrors.businessEmail)}
                      aria-describedby={
                        inquiryFieldErrors.businessEmail
                          ? 'inquiry-business-email-error'
                          : undefined
                      }
                      placeholder="name@company.com"
                      className={`w-full bg-transparent pb-3 pt-1 text-[15px] text-[#171717] placeholder:text-[#A1A1AA] border-b transition-colors duration-200 focus:outline-none disabled:opacity-60 ${
                        inquiryFieldErrors.businessEmail
                          ? 'border-[#DC2626] focus:border-[#DC2626]'
                          : 'border-[#E2E2DF] focus:border-[#FF6438]'
                      }`}
                    />
                    {inquiryFieldErrors.businessEmail && (
                      <p
                        id="inquiry-business-email-error"
                        role="alert"
                        className="mt-1.5 text-[12px] text-[#DC2626]"
                      >
                        {inquiryFieldErrors.businessEmail}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Row 2: Company Name & Service Required */}
                <motion.div
                  {...getRevealProps(0.21, 0.58)}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 transform-gpu"
                >
                  <div>
                    <label
                      htmlFor="inquiry-company-name"
                      className="block text-[11.5px] font-semibold tracking-[0.12em] uppercase text-[#202020] mb-2"
                    >
                      Company Name <span className="text-[#FF6438]">*</span>
                    </label>
                    <input
                      id="inquiry-company-name"
                      name="companyName"
                      type="text"
                      required
                      autoComplete="organization"
                      disabled={inquiryStatus === 'submitting'}
                      value={inquiryForm.companyName}
                      onChange={(e) =>
                        handleInquiryFieldChange('companyName', e.target.value)
                      }
                      aria-invalid={Boolean(inquiryFieldErrors.companyName)}
                      aria-describedby={
                        inquiryFieldErrors.companyName
                          ? 'inquiry-company-name-error'
                          : undefined
                      }
                      placeholder="Your company name"
                      className={`w-full bg-transparent pb-3 pt-1 text-[15px] text-[#171717] placeholder:text-[#A1A1AA] border-b transition-colors duration-200 focus:outline-none disabled:opacity-60 ${
                        inquiryFieldErrors.companyName
                          ? 'border-[#DC2626] focus:border-[#DC2626]'
                          : 'border-[#E2E2DF] focus:border-[#FF6438]'
                      }`}
                    />
                    {inquiryFieldErrors.companyName && (
                      <p
                        id="inquiry-company-name-error"
                        role="alert"
                        className="mt-1.5 text-[12px] text-[#DC2626]"
                      >
                        {inquiryFieldErrors.companyName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-service-required"
                      className="block text-[11.5px] font-semibold tracking-[0.12em] uppercase text-[#202020] mb-2"
                    >
                      Service Required <span className="text-[#FF6438]">*</span>
                    </label>
                    <select
                      id="inquiry-service-required"
                      name="serviceRequired"
                      required
                      disabled={inquiryStatus === 'submitting'}
                      value={inquiryForm.serviceRequired}
                      onChange={(e) =>
                        handleInquiryFieldChange(
                          'serviceRequired',
                          e.target.value
                        )
                      }
                      aria-invalid={Boolean(inquiryFieldErrors.serviceRequired)}
                      aria-describedby={
                        inquiryFieldErrors.serviceRequired
                          ? 'inquiry-service-required-error'
                          : undefined
                      }
                      className={`w-full bg-transparent pb-3 pt-1 text-[15px] border-b transition-colors duration-200 focus:outline-none cursor-pointer disabled:opacity-60 ${
                        inquiryForm.serviceRequired
                          ? 'text-[#171717]'
                          : 'text-[#A1A1AA]'
                      } ${
                        inquiryFieldErrors.serviceRequired
                          ? 'border-[#DC2626] focus:border-[#DC2626]'
                          : 'border-[#E2E2DF] focus:border-[#FF6438]'
                      }`}
                    >
                      <option value="" disabled className="text-[#737373]">
                        Select a service
                      </option>
                      {SERVICE_DETAILS_LIST.map((service) => (
                        <option
                          key={service.slug}
                          value={service.navLabel}
                          className="text-[#171717] bg-white"
                        >
                          {service.navLabel}
                        </option>
                      ))}
                    </select>
                    {inquiryFieldErrors.serviceRequired && (
                      <p
                        id="inquiry-service-required-error"
                        role="alert"
                        className="mt-1.5 text-[12px] text-[#DC2626]"
                      >
                        {inquiryFieldErrors.serviceRequired}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Row 3: Message */}
                <motion.div
                  {...getRevealProps(0.3, 0.58)}
                  className="transform-gpu"
                >
                  <label
                    htmlFor="inquiry-message"
                    className="block text-[11.5px] font-semibold tracking-[0.12em] uppercase text-[#202020] mb-2"
                  >
                    Message <span className="text-[#FF6438]">*</span>
                  </label>
                  <textarea
                    id="inquiry-message"
                    name="message"
                    rows={3}
                    required
                    disabled={inquiryStatus === 'submitting'}
                    value={inquiryForm.message}
                    onChange={(e) =>
                      handleInquiryFieldChange('message', e.target.value)
                    }
                    aria-invalid={Boolean(inquiryFieldErrors.message)}
                    aria-describedby={
                      inquiryFieldErrors.message
                        ? 'inquiry-message-error'
                        : undefined
                    }
                    placeholder="Share a brief overview of your business and accounting needs..."
                    className={`w-full bg-transparent pb-3 pt-1 text-[15px] leading-[1.6] text-[#171717] placeholder:text-[#A1A1AA] border-b transition-colors duration-200 focus:outline-none resize-y disabled:opacity-60 ${
                      inquiryFieldErrors.message
                        ? 'border-[#DC2626] focus:border-[#DC2626]'
                        : 'border-[#E2E2DF] focus:border-[#FF6438]'
                    }`}
                  />
                  {inquiryFieldErrors.message && (
                    <p
                      id="inquiry-message-error"
                      role="alert"
                      className="mt-1.5 text-[12px] text-[#DC2626]"
                    >
                      {inquiryFieldErrors.message}
                    </p>
                  )}
                </motion.div>

                {/* Submission Failure Alert */}
                {inquiryStatus === 'error' && inquiryErrorMessage && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="py-2.5 px-3.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-[13px] text-[#B91C1C]"
                  >
                    {inquiryErrorMessage}
                  </div>
                )}

                {/* Submit Action */}
                <motion.div
                  {...getRevealProps(0.39, 0.58)}
                  className="pt-2 transform-gpu"
                >
                  <button
                    type="submit"
                    disabled={inquiryStatus === 'submitting'}
                    className="group w-full sm:w-auto h-[50px] px-7 rounded-full bg-[#171717] hover:bg-[#242428] text-white text-[14px] font-medium tracking-[-0.01em] inline-flex items-center justify-center gap-3 cursor-pointer transition-all duration-[260ms] ease-out hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
                  >
                    <span>
                      {inquiryStatus === 'submitting'
                        ? 'Sending Inquiry...'
                        : 'Send Inquiry'}
                    </span>
                    <ArrowUpRight
                      strokeWidth={2}
                      aria-hidden="true"
                      className="w-4 h-4 text-[#FF6438] transition-transform duration-[260ms] ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </motion.div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FINAL CTA / CONSULTATION SECTION — PREMIUM DARK EDITORIAL & CLUSTERED IMAGE LAYOUT */}
      <section
        id="final-cta"
        aria-labelledby="final-cta-heading"
        className="w-full bg-[#050505] text-[#F5F5F3] py-20 sm:py-26 px-6 sm:px-10 overflow-hidden"
      >
        <div className="w-full max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1.02fr_1.08fr] gap-12 lg:gap-10 items-center">
          {/* Left Column: Eyebrow, Heading, Supporting Paragraph & Dual Buttons */}
          <div className="max-w-[590px]">
            <motion.div
              {...getRevealProps(0, 0.62)}
              className="transform-gpu"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 mb-4">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                  aria-hidden="true"
                />
                <span className="text-[11.5px] font-semibold tracking-[0.2em] uppercase text-[#FF6438]">
                  LET’S WORK TOGETHER
                </span>
              </div>

              {/* Main Heading */}
              <h2
                id="final-cta-heading"
                className="font-sans text-[36px] sm:text-[46px] lg:text-[52px] font-semibold leading-[1.12] tracking-[-0.025em] text-white mb-5"
              >
                Ready to Move
                <br />
                Forward with Clarity?
              </h2>

              {/* Supporting Paragraph */}
              <p className="text-[15px] sm:text-[16.5px] leading-[1.65] text-[#C8C8D0] font-normal max-w-[52ch] mb-9">
                Bring structure to your accounting, gain a clearer view of your
                finances, and build stronger foundations for your next stage of
                growth.
              </p>
            </motion.div>

            {/* Dual CTA Buttons with Delayed Fade-Up & Lift/Arrow-Shift Hover */}
            <motion.div
              {...getRevealProps(0.11, 0.62)}
              className="flex flex-wrap items-center gap-4 transform-gpu"
            >
              {/* Button 1: Solid White with Dark Text & Electric Orange Arrow */}
              <button
                type="button"
                onClick={resetConsultationModal}
                className="group h-[54px] px-7 rounded-[14px] bg-white text-[#111113] text-[14.5px] font-medium tracking-[-0.01em] inline-flex items-center justify-center gap-3 whitespace-nowrap cursor-pointer shadow-[0_8px_24px_rgba(255,255,255,0.08)] transform-gpu transition-all duration-[280ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(255,255,255,0.16)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6438]"
              >
                <span>Book a Consultation</span>
                <ChevronRight
                  strokeWidth={2.2}
                  className="w-4 h-4 text-[#FF6438] transition-transform duration-[280ms] ease-out group-hover:translate-x-1"
                />
              </button>

              {/* Button 2: Black-Filled / Transparent with Subtle White Border & White Text */}
              <a
                href="/services"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToServices();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group h-[54px] px-7 rounded-[14px] bg-[#050505] hover:bg-white/[0.05] text-white border border-white/65 hover:border-white text-[14.5px] font-medium tracking-[-0.01em] inline-flex items-center justify-center gap-3 whitespace-nowrap cursor-pointer shadow-[0_8px_20px_rgba(0,0,0,0.4)] transform-gpu transition-all duration-[280ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(255,100,56,0.14)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6438]"
              >
                <span>Explore Services</span>
                <ChevronRight
                  strokeWidth={2.1}
                  className="w-4 h-4 text-white group-hover:text-[#FF6438] transition-all duration-[280ms] ease-out group-hover:translate-x-1"
                />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Reference-Matched Clustered Visual Layout (4 Rounded Image Cards + 2 Solid Accent Squares) */}
          <div className="w-full">
            {/* Desktop & Tablet Spatial Cluster Matching Reference Proportions */}
            <div className="hidden sm:block relative w-full max-w-[600px] h-[450px] lg:h-[470px] mx-auto lg:ml-auto lg:mr-0">
              {/* Accent Square 1: Small Electric Orange Rounded Square (Top-Left of Center Card) */}
              <motion.div
                {...getRevealProps(0.08, 0.58, 0.96, 24)}
                aria-hidden="true"
                className="absolute left-[10%] top-[8%] w-[82px] h-[82px] lg:w-[88px] lg:h-[88px] rounded-[20px] bg-[#FF6438] shadow-[0_14px_34px_rgba(255,100,56,0.26)] transition-transform duration-300 ease-out hover:scale-[1.04] hover:-translate-y-1 transform-gpu"
              />

              {/* Image Card 2: Small Top-Right Card — Calculator & Accounting Paperwork */}
              <motion.div
                {...getRevealProps(0.16, 0.62, 0.96, 24)}
                className="absolute right-[3%] top-[3%] w-[152px] h-[124px] lg:w-[164px] lg:h-[132px] rounded-[20px] overflow-hidden bg-[#141417] shadow-[0_14px_32px_rgba(0,0,0,0.55)] transform-gpu transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgba(0,0,0,0.8)] z-10"
              >
                <img
                  src="/assets/aistudio/cta_calculator_docs.png"
                  alt="Close-up of calculator and accounting paperwork on desk"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>

              {/* Image Card 1: Large Center Card — Laptop with Financial Charts & Reports */}
              <motion.div
                {...getRevealProps(0.25, 0.64, 0.96, 24)}
                className="absolute left-[23.5%] top-[21%] w-[248px] h-[192px] lg:w-[270px] lg:h-[206px] rounded-[24px] overflow-hidden bg-[#141417] shadow-[0_18px_42px_rgba(0,0,0,0.65)] transform-gpu transition-all duration-300 ease-out hover:scale-[1.035] hover:-translate-y-1.5 hover:shadow-[0_26px_56px_rgba(0,0,0,0.85)] z-20"
              >
                <img
                  src="/assets/aistudio/cta_laptop_charts.png"
                  alt="Laptop displaying financial charts and reports on executive desk"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>

              {/* Image Card 3: Small Bottom-Left Card — Modern Glass Office Building */}
              <motion.div
                {...getRevealProps(0.34, 0.62, 0.96, 24)}
                className="absolute left-[2.5%] bottom-[9%] w-[144px] h-[124px] lg:w-[154px] lg:h-[132px] rounded-[20px] overflow-hidden bg-[#141417] shadow-[0_14px_32px_rgba(0,0,0,0.55)] transform-gpu transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgba(0,0,0,0.8)] z-10"
              >
                <img
                  src="/assets/aistudio/cta_office_building.png"
                  alt="Modern architectural glass office tower at dusk"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>

              {/* Accent Square 2: Small Muted Dark Gray Rounded Square (Bottom-Center) */}
              <motion.div
                {...getRevealProps(0.42, 0.58, 0.96, 24)}
                aria-hidden="true"
                className="absolute left-[31%] bottom-[12%] w-[80px] h-[80px] lg:w-[86px] lg:h-[86px] rounded-[20px] bg-[#2B2E33] shadow-[0_12px_28px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out hover:scale-[1.04] hover:-translate-y-1 transform-gpu"
              />

              {/* Image Card 4: Medium Bottom-Right Card — Diverse Team Reviewing Reports */}
              <motion.div
                {...getRevealProps(0.5, 0.64, 0.96, 24)}
                className="absolute right-[0%] bottom-[1%] w-[224px] h-[170px] lg:w-[244px] lg:h-[184px] rounded-[22px] overflow-hidden bg-[#141417] shadow-[0_18px_42px_rgba(0,0,0,0.65)] transform-gpu transition-all duration-300 ease-out hover:scale-[1.035] hover:-translate-y-1.5 hover:shadow-[0_26px_56px_rgba(0,0,0,0.85)] z-20"
              >
                <img
                  src="/assets/aistudio/cta_team_meeting.png"
                  alt="Professional business meeting with team reviewing financial reports"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            </div>

            {/* Mobile Responsive Clustered Grid (< 640px) */}
            <div className="sm:hidden grid grid-cols-2 gap-3.5 pt-2">
              <div className="space-y-3.5">
                <div className="flex items-end justify-between gap-3">
                  <motion.div
                    {...getRevealProps(0.08, 0.56)}
                    aria-hidden="true"
                    className="w-14 h-14 rounded-[16px] bg-[#FF6438] shrink-0 transform-gpu"
                  />
                  <motion.div
                    {...getRevealProps(0.16, 0.6)}
                    className="h-[110px] flex-1 rounded-[18px] overflow-hidden bg-[#141417] transform-gpu"
                  >
                    <img
                      src="/assets/aistudio/cta_office_building.png"
                      alt="Modern architectural glass office tower"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
                <motion.div
                  {...getRevealProps(0.24, 0.6)}
                  className="h-[145px] rounded-[20px] overflow-hidden bg-[#141417] transform-gpu"
                >
                  <img
                    src="/assets/aistudio/cta_laptop_charts.png"
                    alt="Laptop displaying financial charts and reports"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              <div className="space-y-3.5 pt-3">
                <motion.div
                  {...getRevealProps(0.2, 0.6)}
                  className="h-[115px] rounded-[18px] overflow-hidden bg-[#141417] transform-gpu"
                >
                  <img
                    src="/assets/aistudio/cta_calculator_docs.png"
                    alt="Close-up of calculator and accounting paperwork"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  {...getRevealProps(0.29, 0.6)}
                  className="h-[135px] rounded-[20px] overflow-hidden bg-[#141417] transform-gpu"
                >
                  <img
                    src="/assets/aistudio/cta_team_meeting.png"
                    alt="Business meeting with team reviewing financial reports"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  {...getRevealProps(0.37, 0.56)}
                  aria-hidden="true"
                  className="w-12 h-12 rounded-[14px] bg-[#2B2E33] transform-gpu"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ULTRA-MINIMALIST WHITE FOOTER */}
      <Footer
        onNavigateSection={(targetId) => {
          if (targetId === 'services-page' || targetId === 'our-services') {
            navigateToServices();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          if (targetId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      />
        </>
      )}

      {/* INTERACTIVE DRAWER / MODAL: MORE ABOUT US */}
      {activeModal === 'about' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-sm transition-opacity duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-modal-title"
        >
          <div className="relative w-full max-w-lg h-full bg-[#111114] border-l border-white/10 p-8 sm:p-10 flex flex-col justify-between overflow-y-auto text-[#F5F5F3]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF6438]" />
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A0A09C]">
                    About Balentra
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close about panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 rounded-2xl overflow-hidden h-44 border border-white/10">
                <img
                  src="/assets/aistudio/Team_collaborating_around_confer__20261026000222__1__1344684c.jpg"
                  alt="Balentra team collaborating"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <h2
                id="about-modal-title"
                className="font-serif text-3xl text-white font-normal mt-6 mb-3"
              >
                Accounting That Works Beyond the Numbers.
              </h2>
              <p className="text-sm text-[#B8B8B2] leading-relaxed mb-6">
                Balentra helps growing businesses manage bookkeeping, financial reporting, and everyday finance operations with greater clarity and confidence. Our practice combines structured international compliance with responsive partner-led advisory.
              </p>

              <div className="space-y-4 border-t border-white/10 pt-5">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <h3 className="text-base font-semibold text-white mb-1">
                    Financial Clarity
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A8A8A2]">
                    Organized records and meaningful reporting tailored for executive decision-making and cross-border oversight.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <h3 className="text-base font-semibold text-white mb-1">
                    Flexible Support
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A8A8A2]">
                    Accounting built around your business—adapting seamlessly as your entity structure and transaction volume scale.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={resetConsultationModal}
                className="group inline-flex items-center gap-1.5 rounded-full cursor-pointer"
              >
                <span className="h-[44px] px-6 rounded-full bg-white text-[#141416] text-xs sm:text-sm font-semibold inline-flex items-center justify-center">
                  Book a Consultation
                </span>
                <span className="w-[44px] h-[44px] rounded-full bg-[#FF6438] text-white inline-flex items-center justify-center transition-all duration-[280ms] group-hover:bg-[#19191D] group-hover:ring-1 group-hover:ring-white/25">
                  <ArrowUpRight className="w-4 h-4 text-white transition-all duration-[280ms] group-hover:text-[#FF6438] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" />
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="h-[44px] px-6 rounded-full border border-white/20 hover:border-white/50 text-xs sm:text-sm text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE DRAWER / MODAL: BOOK A CONSULTATION */}
      {activeModal === 'consultation' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-sm transition-opacity duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-title"
        >
          <div className="relative w-full max-w-lg h-full bg-[#111114] border-l border-white/10 p-8 sm:p-10 flex flex-col justify-between overflow-y-auto text-[#F5F5F3]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-[2px] bg-[#FF6438]" />
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A0A09C]">
                    Private Advisory Desk
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close consultation panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2
                id="consultation-title"
                className="font-serif text-3xl text-white font-normal mt-6 mb-2"
              >
                Schedule an Executive Consultation.
              </h2>
              <p className="text-sm text-[#A8A8A2] leading-relaxed mb-8">
                Connect directly with a Senior International Partner regarding cross-border structuring, statutory reporting, or tax compliance.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/15">
                  <div className="w-10 h-10 rounded-full bg-[#FF6438]/15 border border-[#FF6438] flex items-center justify-center text-[#FF6438] mb-4">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-white mb-2">
                    Consultation Request Received
                  </h3>
                  <p className="text-sm text-[#B8B8B2] leading-relaxed mb-6">
                    Thank you, <span className="text-white font-medium">{formData.fullName}</span>. Our {formData.jurisdiction} advisory desk will dispatch a calendar briefing to <span className="text-white font-medium">{formData.workEmail}</span> within 4 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="w-full py-3 rounded-full bg-white text-[#111113] text-xs font-semibold uppercase tracking-widest hover:bg-[#FF6438] hover:text-white transition-colors cursor-pointer"
                  >
                    Return to Balentra
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A8A8A2] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Elena Rostova"
                      className="w-full rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#FF6438] px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#A8A8A2] mb-2">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="elena@enterprise.com"
                        className="w-full rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#FF6438] px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#A8A8A2] mb-2">
                        Organization
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Vanguard Holdings AG"
                        className="w-full rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#FF6438] px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A8A8A2] mb-2">
                      Primary Operating Region
                    </label>
                    <select
                      value={formData.jurisdiction}
                      onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                      className="w-full rounded-xl bg-[#18181C] border border-white/15 focus:border-[#FF6438] px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    >
                      <option value="European Union & UK">European Union &amp; United Kingdom</option>
                      <option value="North America">North America (US &amp; Canada)</option>
                      <option value="Asia-Pacific & Singapore">Asia-Pacific &amp; Singapore</option>
                      <option value="Latin America">Latin America</option>
                      <option value="Middle East & GCC">Middle East &amp; GCC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A8A8A2] mb-2">
                      Advisory Scope
                    </label>
                    <textarea
                      rows={3}
                      value={formData.inquiry}
                      onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                      placeholder="Briefly describe your reporting, tax structuring, or international compliance requirements..."
                      className="w-full rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#FF6438] px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {modalError && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs leading-relaxed">
                      {modalError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={modalSubmitting}
                    className="group w-full inline-flex items-center justify-center gap-2 pt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="flex-1 h-[46px] rounded-full bg-white text-[#141416] font-semibold text-sm inline-flex items-center justify-center transition-shadow duration-[280ms]">
                      {modalSubmitting ? 'Transmitting Request...' : 'Confirm Consultation Request'}
                    </span>
                    <span className="w-[46px] h-[46px] rounded-full bg-[#FF6438] text-white inline-flex items-center justify-center shrink-0 transition-all duration-[280ms] group-hover:bg-[#19191D] group-hover:ring-1 group-hover:ring-white/25">
                      <ArrowUpRight className="w-[18px] h-[18px] text-white transition-all duration-[280ms] group-hover:text-[#FF6438] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" />
                    </span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-neutral-500 flex items-center justify-between">
              <span>Strict Non-Disclosure Protocol</span>
              <span className="tabular-nums">24h Partner Response</span>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE DRAWER / MODAL: EXPLORE SERVICES */}
      {activeModal === 'services' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-sm transition-opacity duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="services-title"
        >
          <div className="relative w-full max-w-xl h-full bg-[#111114] border-l border-white/10 p-8 sm:p-10 flex flex-col justify-between overflow-y-auto text-[#F5F5F3]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-[2px] bg-[#FF6438]" />
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A0A09C]">
                    Practice Capabilities
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close services panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2
                id="services-title"
                className="font-serif text-3xl text-white font-normal mt-6 mb-2"
              >
                International Practice Areas.
              </h2>
              <p className="text-sm text-[#A8A8A2] leading-relaxed mb-8">
                Structured advisory and statutory accounting engineered for multi-entity enterprises operating across borders.
              </p>

              <div className="divide-y divide-white/10 border-t border-b border-white/10">
                {SERVICES_PREVIEW.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <div
                      key={service.index}
                      className="py-5 flex items-start justify-between gap-4 group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono tabular-nums text-[#FF6438]">
                            {service.index}.
                          </span>
                          <h3 className="text-base font-semibold text-white group-hover:text-[#FF6438] transition-colors">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-[#A8A8A2] leading-relaxed pl-7">
                          {service.description}
                        </p>
                      </div>
                      <IconComponent className="w-4 h-4 text-neutral-500 shrink-0 mt-1" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={resetConsultationModal}
                className="group inline-flex items-center gap-1.5 rounded-full cursor-pointer"
              >
                <span className="h-[44px] px-6 rounded-full bg-white text-[#141416] text-xs sm:text-sm font-semibold inline-flex items-center justify-center">
                  Book a Consultation
                </span>
                <span className="w-[44px] h-[44px] rounded-full bg-[#FF6438] text-white inline-flex items-center justify-center transition-all duration-[280ms] group-hover:bg-[#19191D] group-hover:ring-1 group-hover:ring-white/25">
                  <ArrowUpRight className="w-4 h-4 text-white transition-all duration-[280ms] group-hover:text-[#FF6438] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" />
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="h-[44px] px-6 rounded-full border border-white/20 hover:border-white/50 text-xs sm:text-sm text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


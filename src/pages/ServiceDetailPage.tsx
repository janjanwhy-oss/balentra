import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ServiceDetailConfig } from '../data/serviceDetailsData';

type ShowcaseTabKey = 'PROCESS' | 'DELIVERABLES' | 'SUPPORT';
const SHOWCASE_TAB_KEYS: ShowcaseTabKey[] = [
  'PROCESS',
  'DELIVERABLES',
  'SUPPORT',
];

const POPUP_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const POPUP_VIEWPORT = { once: true, amount: 0.18 } as const;

export interface ServiceDetailPageProps {
  service: ServiceDetailConfig;
  currentPath: string;
  onNavigateHomeSection: (
    sectionId?: string,
    defaultServiceTitle?: string
  ) => void;
  onNavigateServices: (slug?: string) => void;
  onOpenConsultation: (defaultService?: string) => void;
}

export function ServiceDetailPage({
  service,
  currentPath,
  onNavigateHomeSection,
  onNavigateServices,
  onOpenConsultation,
}: ServiceDetailPageProps) {
  const [activeTab, setActiveTab] = useState<ShowcaseTabKey>('PROCESS');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Reset interactive state and update document title + meta description when switching services
  useEffect(() => {
    setActiveTab('PROCESS');
    setOpenFaqId(null);

    document.title = service.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', service.metaDescription);
    }
  }, [service]);

  const getPopupProps = (delay = 0, duration = 0.62, scaleFrom = 0.96, yFrom = 25) => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 1, scale: 1, y: 0 },
        whileInView: { opacity: 1, scale: 1, y: 0 },
        viewport: POPUP_VIEWPORT,
        transition: { duration: 0 },
      };
    }
    return {
      initial: { opacity: 0, scale: scaleFrom, y: yFrom },
      whileInView: { opacity: 1, scale: 1, y: 0 },
      viewport: POPUP_VIEWPORT,
      transition: {
        duration,
        delay,
        ease: POPUP_EASE,
      },
    };
  };

  const getHeroPopupProps = (
    delay = 0,
    duration = 0.62,
    scaleFrom = 0.96,
    yFrom = 25
  ) => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 1, scale: 1, y: 0 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { duration: 0 },
      };
    }
    return {
      initial: { opacity: 0, scale: scaleFrom, y: yFrom },
      animate: { opacity: 1, scale: 1, y: 0 },
      transition: {
        duration,
        delay,
        ease: POPUP_EASE,
      },
    };
  };

  const handleToggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const handleConsultationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigateHomeSection('contact-us', service.navLabel);
  };

  const handleViewAllServicesClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    onNavigateServices();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % SHOWCASE_TAB_KEYS.length;
      const nextKey = SHOWCASE_TAB_KEYS[nextIndex];
      setActiveTab(nextKey);
      const nextBtn = document.getElementById(
        `${service.slug}-showcase-tab-${nextKey}`
      );
      nextBtn?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex =
        (currentIndex - 1 + SHOWCASE_TAB_KEYS.length) %
        SHOWCASE_TAB_KEYS.length;
      const prevKey = SHOWCASE_TAB_KEYS[prevIndex];
      setActiveTab(prevKey);
      const prevBtn = document.getElementById(
        `${service.slug}-showcase-tab-${prevKey}`
      );
      prevBtn?.focus();
    }
  };

  const activeTabContent = service.showcaseTabs[activeTab];
  const h1Lines = service.h1.split('\n');

  return (
    <div
      key={service.slug}
      className="relative min-h-screen w-full bg-[#FFFFFF] text-[#101114] font-sans overflow-x-hidden"
    >
      {/* SECTION 1 — PREMIUM ASYMMETRIC HERO */}
      <section
        id="service-detail-hero"
        aria-labelledby="service-detail-h1"
        className="relative w-full bg-[#FAFAF9] text-[#101114] pb-16 sm:pb-22 border-b border-[#EAEAEA]"
      >
        {/* Existing Floating Custom-Cut White Balentra Navbar */}
        <Navbar
          currentPath={currentPath}
          activeNav="Services"
          variant="light-hero"
          onNavigateHomeSection={(sectionId) => onNavigateHomeSection(sectionId)}
          onNavigateServices={onNavigateServices}
          onOpenConsultation={() => onOpenConsultation(service.navLabel)}
        />

        {/* Two-Column Asymmetric Hero Content with Adequate Clearance Beneath Floating Navbar */}
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 pt-10 sm:pt-14 lg:pt-16 min-h-[500px] lg:min-h-[540px] flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT COLUMN (~55% on Desktop: 7 of 12 cols) */}
            <div className="lg:col-span-7 lg:pr-4">
              {/* Breadcrumb & Small Electric Orange Eyebrow Reveal First */}
              <motion.div {...getHeroPopupProps(0.02, 0.58, 0.96, 20)}>
                {/* Breadcrumb: Home / Services / Current Service */}
                <nav
                  aria-label="Breadcrumb"
                  className="mb-4 text-[12.5px] font-medium text-[#737373]"
                >
                  <ol className="flex flex-wrap items-center gap-2">
                    <li>
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigateHomeSection('home');
                        }}
                        className="hover:text-[#FF6438] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
                      >
                        Home
                      </a>
                    </li>
                    <li aria-hidden="true" className="text-[#C8C8CE]">
                      /
                    </li>
                    <li>
                      <a
                        href="/services"
                        onClick={handleViewAllServicesClick}
                        className="hover:text-[#FF6438] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
                      >
                        Services
                      </a>
                    </li>
                    <li aria-hidden="true" className="text-[#C8C8CE]">
                      /
                    </li>
                    <li
                      aria-current="page"
                      className="text-[#101114] font-semibold"
                    >
                      {service.breadcrumbLabel}
                    </li>
                  </ol>
                </nav>

                {/* Small Electric Orange Eyebrow */}
                <div className="inline-flex items-center gap-2.5 mb-4">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#FF6438]">
                    {service.eyebrow}
                  </span>
                </div>
              </motion.div>

              {/* Large Elegant Serif H1 Pops Into Place Smoothly */}
              <motion.h1
                id="service-detail-h1"
                {...getHeroPopupProps(0.11, 0.64, 0.96, 25)}
                className="font-serif text-[36px] sm:text-[46px] lg:text-[54px] leading-[1.08] tracking-[-0.02em] text-[#101114] font-normal mb-5 text-balance transform-gpu"
              >
                {h1Lines.map((line, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </motion.h1>

              {/* Short Supporting Paragraph Follows */}
              <motion.p
                {...getHeroPopupProps(0.2, 0.62, 0.96, 25)}
                className="text-[15.5px] sm:text-[16.5px] leading-[1.68] text-[#585B63] font-normal max-w-[54ch] mb-9 transform-gpu"
              >
                {service.heroDescription}
              </motion.p>

              {/* Primary CTA (Book a Consultation) + Secondary Text Link (View All Services) Appear With Slight Delay */}
              <motion.div
                {...getHeroPopupProps(0.29, 0.62, 0.96, 25)}
                className="flex flex-wrap items-center gap-x-7 gap-y-4 transform-gpu"
              >
                <a
                  href="/#contact-us"
                  onClick={handleConsultationClick}
                  className="group inline-flex items-center gap-1.5 rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6438]"
                >
                  <span className="h-[48px] px-6 rounded-full bg-[#101114] text-white text-[14px] font-semibold tracking-[-0.01em] inline-flex items-center justify-center whitespace-nowrap shadow-[0_10px_24px_rgba(16,17,20,0.16)] transition-all duration-[260ms] ease-out group-hover:bg-[#1E2025]">
                    Book a Consultation
                  </span>
                  <span className="w-[48px] h-[48px] rounded-full bg-[#FF6438] text-white inline-flex items-center justify-center shrink-0 shadow-[0_6px_18px_rgba(255,100,56,0.28)] transition-all duration-[260ms] ease-out group-hover:bg-[#101114]">
                    <ArrowUpRight
                      strokeWidth={2.2}
                      className="w-[18px] h-[18px] text-white transition-all duration-[260ms] ease-out group-hover:text-[#FF6438] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                    />
                  </span>
                </a>

                <a
                  href="/services"
                  onClick={handleViewAllServicesClick}
                  className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#101114] hover:text-[#FF6438] transition-colors duration-[220ms] py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6438]"
                >
                  <span className="underline underline-offset-4 decoration-[#D4D4D8] group-hover:decoration-[#FF6438] transition-colors">
                    View All Services
                  </span>
                  <ArrowUpRight
                    strokeWidth={2}
                    className="w-4 h-4 text-[#FF6438] transition-transform duration-[220ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </motion.div>
            </div>

            {/* RIGHT COLUMN (~45% on Desktop: 5 of 12 cols) — Hero Photograph Reveals Through Clean Opacity/Scale Transition */}
            <motion.div
              {...getHeroPopupProps(0.14, 0.68, 0.96, 25)}
              className="lg:col-span-5 w-full transform-gpu"
            >
              <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[450px] rounded-[24px] overflow-hidden bg-[#16171B] shadow-[0_18px_42px_rgba(16,17,20,0.08)]">
                <img
                  src={service.heroImage}
                  alt={service.heroImageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {/* Subtle Editorial Depth Scrim */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-transparent"
                  aria-hidden="true"
                />

                {/* Top-Left Stepped Rounded Notch (Balentra Architectural Image Treatment) */}
                <div
                  aria-hidden="true"
                  className="hidden sm:block absolute top-0 left-0 w-[98px] h-[44px] bg-[#FAFAF9] rounded-br-[20px] z-10"
                />

                {/* Bottom-Right Stepped Rounded Notch (Balentra Architectural Image Treatment) */}
                <div
                  aria-hidden="true"
                  className="hidden sm:block absolute bottom-0 right-0 w-[114px] h-[48px] bg-[#FAFAF9] rounded-tl-[20px] z-10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — SERVICE OVERVIEW */}
      <section
        id="service-overview"
        aria-labelledby="service-overview-heading"
        className="w-full bg-[#FFFFFF] text-[#101114] pt-18 sm:pt-22 pb-16 sm:pb-20 px-6 sm:px-10"
      >
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pb-14 sm:pb-16">
            {/* LEFT: Small Section Label — THE OVERVIEW + Large Value Heading Animates Upward */}
            <motion.div
              {...getPopupProps(0, 0.62, 0.96, 25)}
              className="lg:col-span-5 transform-gpu"
            >
              <div className="inline-flex items-center gap-2.5 mb-3.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                  aria-hidden="true"
                />
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FF6438]">
                  THE OVERVIEW
                </span>
              </div>

              <h2
                id="service-overview-heading"
                className="font-serif text-[30px] sm:text-[36px] lg:text-[40px] leading-[1.14] tracking-[-0.02em] text-[#101114] font-normal text-balance"
              >
                {service.overviewHeading}
              </h2>
            </motion.div>

            {/* RIGHT: Two Concise Editorial Paragraphs Reveal Afterward With Subtle Stagger */}
            <div className="lg:col-span-7 space-y-5 lg:pt-7">
              <motion.p
                {...getPopupProps(0.1, 0.62, 0.96, 25)}
                className="text-[15.5px] sm:text-[16px] leading-[1.72] text-[#2B2B30] font-normal transform-gpu"
              >
                {service.overviewParagraphs[0]}
              </motion.p>
              <motion.p
                {...getPopupProps(0.2, 0.62, 0.96, 25)}
                className="text-[15px] sm:text-[15.5px] leading-[1.72] text-[#666972] font-normal transform-gpu"
              >
                {service.overviewParagraphs[1]}
              </motion.p>
            </div>
          </div>

          {/* One Thin Horizontal Divider Below Content */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, scaleX: 1 }
                : { opacity: 0, scaleX: 0.92 }
            }
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={POPUP_VIEWPORT}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.65,
              delay: prefersReducedMotion ? 0 : 0.24,
              ease: POPUP_EASE,
            }}
            className="w-full border-t border-[#E6E6EA] origin-left"
          />
        </div>
      </section>

      {/* SECTION 3 — WHAT'S INCLUDED */}
      <section
        id="whats-included"
        aria-labelledby="whats-included-heading"
        className="w-full bg-[#FAFAF9] text-[#101114] py-18 sm:py-22 px-6 sm:px-10 border-t border-[#EAEAEA]"
      >
        <div className="w-full max-w-[1200px] mx-auto">
          {/* Eyebrow & Heading */}
          <motion.div
            {...getPopupProps(0, 0.62, 0.96, 25)}
            className="max-w-[640px] mb-12 sm:mb-14 transform-gpu"
          >
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FF6438]">
                WHAT&apos;S INCLUDED
              </span>
            </div>

            <h2
              id="whats-included-heading"
              className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] leading-[1.12] tracking-[-0.02em] text-[#101114] font-normal text-balance"
            >
              What&apos;s Included in This Service.
            </h2>
          </motion.div>

          {/* Four Meaningful Service Deliverables Appearing Sequentially (100ms Stagger) + Smooth Divider Reveal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-2">
            {service.deliverables.map((item, idx) => (
              <motion.div
                key={item.number}
                {...getPopupProps(0.08 + idx * 0.1, 0.62, 0.96, 25)}
                className="group relative py-6 sm:py-7 flex flex-col justify-between transform-gpu"
              >
                {/* Animated Top Horizontal Divider Line */}
                <motion.span
                  aria-hidden="true"
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, scaleX: 1 }
                      : { opacity: 0, scaleX: 0 }
                  }
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={POPUP_VIEWPORT}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.6,
                    delay: prefersReducedMotion ? 0 : 0.06 + idx * 0.1,
                    ease: POPUP_EASE,
                  }}
                  className="absolute top-0 left-0 right-0 h-px bg-[#E2E2E6] group-hover:bg-[#FF6438]/60 transition-colors duration-250 origin-left"
                />

                <div>
                  <div className="flex items-baseline gap-3 mb-2.5">
                    <span className="text-[12.5px] font-semibold tracking-[0.1em] tabular-nums text-[#FF6438]">
                      {item.number}
                    </span>
                    <span className="text-[#D4D4D8]" aria-hidden="true">
                      —
                    </span>
                    <h3 className="text-[18px] sm:text-[19.5px] font-semibold tracking-[-0.015em] text-[#101114] group-hover:text-[#FF6438] transition-colors duration-250">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#666972] font-normal pl-0 sm:pl-9">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Divider Line */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, scaleX: 1 }
                : { opacity: 0, scaleX: 0 }
            }
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={POPUP_VIEWPORT}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.65,
              delay: prefersReducedMotion ? 0 : 0.44,
              ease: POPUP_EASE,
            }}
            className="w-full border-t border-[#E2E2E6] origin-left"
          />
        </div>
      </section>

      {/* SECTION 4 — SIGNATURE SERVICE SHOWCASE */}
      <section
        id="signature-service-showcase"
        aria-labelledby="signature-showcase-heading"
        className="w-full bg-[#FFFFFF] text-[#101114] py-18 sm:py-24 px-6 sm:px-10 border-t border-[#EAEAEA]"
      >
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT: Large Photographic Panel Gently Scales From 0.96 to 1 */}
          <motion.div
            {...getPopupProps(0, 0.66, 0.96, 25)}
            className="lg:col-span-7 w-full transform-gpu"
          >
            <div className="relative w-full h-[310px] sm:h-[400px] lg:h-[460px] rounded-[24px] overflow-hidden bg-[#16171B]">
              <img
                src={service.showcaseImage}
                alt={service.showcaseImageAlt}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />

              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-transparent"
                aria-hidden="true"
              />

              {/* Top-Left Stepped Rounded Notch */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute top-0 left-0 w-[114px] h-[50px] bg-[#FFFFFF] rounded-br-[22px] z-10"
              />

              {/* Bottom-Right Stepped Rounded Notch */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute bottom-0 right-0 w-[132px] h-[54px] bg-[#FFFFFF] rounded-tl-[22px] z-10"
              />
            </div>
          </motion.div>

          {/* RIGHT: Text Content Reveals Shortly Afterward + Interactive Tabs Preserve Existing Behavior */}
          <motion.div
            {...getPopupProps(0.12, 0.64, 0.96, 25)}
            className="lg:col-span-5 flex flex-col items-start transform-gpu"
          >
            {/* Small Orange Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FF6438]">
                {service.showcaseEyebrow}
              </span>
            </div>

            {/* Service-Specific Editorial Heading */}
            <h2
              id="signature-showcase-heading"
              className="font-serif text-[28px] sm:text-[34px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] text-[#101114] font-normal mb-3.5 text-balance"
            >
              {service.showcaseHeading}
            </h2>

            {/* Short Supporting Paragraph */}
            <p className="text-[14.5px] leading-[1.65] text-[#585B63] font-normal mb-6">
              {service.showcaseDescription}
            </p>

            {/* Three Compact Functional Tabs: PROCESS / DELIVERABLES / SUPPORT */}
            <div
              role="tablist"
              aria-label={`${service.navLabel} detail tabs`}
              className="flex flex-wrap items-center gap-2 mb-5"
            >
              {SHOWCASE_TAB_KEYS.map((tabKey, idx) => {
                const isSelected = activeTab === tabKey;
                const tabId = `${service.slug}-showcase-tab-${tabKey}`;
                const panelId = `${service.slug}-showcase-panel-${tabKey}`;

                return (
                  <button
                    key={tabKey}
                    id={tabId}
                    type="button"
                    role="tab"
                    tabIndex={isSelected ? 0 : -1}
                    aria-selected={isSelected}
                    aria-controls={panelId}
                    onClick={() => setActiveTab(tabKey)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                    className={`h-[36px] px-4 rounded-full text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-[250ms] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438] ${
                      isSelected
                        ? 'bg-[#FF6438] text-white border border-[#FF6438] shadow-[0_6px_16px_rgba(255,100,56,0.24)]'
                        : 'bg-white text-[#171717] border border-[#E4E4E9] hover:border-[#FF6438]/60 hover:text-[#FF6438]'
                    }`}
                  >
                    {tabKey}
                  </button>
                );
              })}
            </div>

            <div className="w-full border-t border-[#E6E6EA] mb-5" />

            {/* Tab Panel Content (280ms transition) */}
            <div
              id={`${service.slug}-showcase-panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`${service.slug}-showcase-tab-${activeTab}`}
              className="w-full min-h-[210px]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                  <p className="text-[14px] font-semibold text-[#101114] mb-2">
                    {activeTabContent.summary}
                  </p>
                  <p className="text-[13.5px] leading-[1.64] text-[#666972] font-normal mb-4">
                    {activeTabContent.detail}
                  </p>

                  <ul className="space-y-2.5">
                    {activeTabContent.highlights.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-[13px] font-medium leading-[1.45] text-[#171717]"
                      >
                        <span
                          aria-hidden="true"
                          className="w-4 h-4 rounded-full bg-[#FF6438] text-white inline-flex items-center justify-center shrink-0 mt-0.5"
                        >
                          <Check className="w-2.5 h-2.5" strokeWidth={2.8} />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — HOW WE WORK */}
      <section
        id="service-how-we-work"
        aria-labelledby="service-how-we-work-heading"
        className="w-full bg-[#FFFFFF] text-[#101114] py-18 sm:py-22 px-6 sm:px-10 border-t border-[#EAEAEA]"
      >
        <div className="w-full max-w-[1200px] mx-auto">
          {/* Eyebrow & Heading */}
          <motion.div
            {...getPopupProps(0, 0.62, 0.96, 25)}
            className="max-w-[640px] mb-12 sm:mb-16 transform-gpu"
          >
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FF6438]">
                OUR PROCESS
              </span>
            </div>

            <h2
              id="service-how-we-work-heading"
              className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] leading-[1.12] tracking-[-0.02em] text-[#101114] font-normal text-balance"
            >
              How We Work With You.
            </h2>
          </motion.div>

          {/* Restrained Three-Stage Process Layout with Progressive Connecting Line and Sequential Left-to-Right Step Reveals */}
          <div className="relative">
            {/* Desktop Continuous Thin Horizontal Connecting Line Draws Progressively */}
            <motion.div
              aria-hidden="true"
              initial={
                prefersReducedMotion
                  ? { opacity: 1, scaleX: 1 }
                  : { opacity: 0, scaleX: 0 }
              }
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={POPUP_VIEWPORT}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.7,
                delay: prefersReducedMotion ? 0 : 0.1,
                ease: POPUP_EASE,
              }}
              className="hidden md:block absolute top-[18px] left-[18px] right-[18px] h-px bg-[#DFDFE6] origin-left"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 relative z-10">
              {service.howWeWorkSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  {...getPopupProps(0.08 + index * 0.12, 0.62, 0.96, 25)}
                  className="relative flex md:block items-start gap-4 transform-gpu"
                >
                  {/* Mobile Vertical Connecting Line Draws Progressively */}
                  {index < service.howWeWorkSteps.length - 1 && (
                    <motion.span
                      aria-hidden="true"
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1, scaleY: 1 }
                          : { opacity: 0, scaleY: 0 }
                      }
                      whileInView={{ opacity: 1, scaleY: 1 }}
                      viewport={POPUP_VIEWPORT}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.58,
                        delay: prefersReducedMotion ? 0 : 0.16 + index * 0.12,
                        ease: POPUP_EASE,
                      }}
                      className="md:hidden absolute left-[17px] top-[38px] -bottom-10 w-px bg-[#DFDFE6] origin-top"
                    />
                  )}

                  {/* Compact Numbered Node */}
                  <div className="w-9 h-9 rounded-full bg-white border border-[#D4D4DC] text-[#101114] flex items-center justify-center text-[12px] font-semibold tabular-nums shrink-0 md:mb-6 shadow-[0_2px_8px_rgba(16,17,20,0.04)]">
                    <span className="text-[#FF6438]">{step.number}</span>
                  </div>

                  {/* Step Title & Service-Adapted Explanation */}
                  <div className="pt-1 md:pt-0 md:pr-4">
                    <h3 className="text-[18px] sm:text-[19px] font-semibold tracking-[-0.015em] text-[#101114] mb-2.5">
                      <span className="tabular-nums text-[#FF6438] font-medium mr-1.5">
                        {step.number}
                      </span>
                      <span className="text-[#D4D4D8] mr-1.5">—</span>
                      <span>{step.title}</span>
                    </h3>
                    <p className="text-[14.5px] leading-[1.65] text-[#666972] font-normal">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — WHO THIS SERVICE IS FOR */}
      <section
        id="who-this-service-is-for"
        aria-labelledby="who-this-service-is-for-heading"
        className="w-full bg-[#FAFAF9] text-[#101114] py-16 sm:py-20 px-6 sm:px-10 border-t border-[#EAEAEA]"
      >
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT: Large Serif Heading & Concise Intro */}
          <motion.div
            {...getPopupProps(0, 0.62, 0.96, 25)}
            className="lg:col-span-5 transform-gpu"
          >
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FF6438]">
                IDEAL FIT
              </span>
            </div>

            <h2
              id="who-this-service-is-for-heading"
              className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] leading-[1.12] tracking-[-0.02em] text-[#101114] font-normal mb-4 text-balance"
            >
              {service.whoItsForHeading}
            </h2>

            <p className="text-[14.5px] sm:text-[15.5px] leading-[1.68] text-[#666972] font-normal max-w-[42ch]">
              {service.whoItsForIntro}
            </p>
          </motion.div>

          {/* RIGHT: Four Suitable Business Categories Gently Pop Into Place Sequentially */}
          <div className="lg:col-span-7 divide-y divide-[#E4E4E8] border-t border-b border-[#E4E4E8]">
            {service.whoItsForItems.map((audience, idx) => (
              <motion.div
                key={audience.number}
                {...getPopupProps(0.08 + idx * 0.1, 0.62, 0.96, 25)}
                className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5 transform-gpu"
              >
                <div className="flex items-baseline gap-3 sm:w-[230px] shrink-0">
                  <span className="text-[12px] font-semibold tabular-nums text-[#FF6438]">
                    {audience.number}
                  </span>
                  <h3 className="text-[16.5px] sm:text-[17.5px] font-semibold tracking-[-0.01em] text-[#101114]">
                    {audience.title}
                  </h3>
                </div>
                <p className="text-[14px] sm:text-[14.5px] leading-[1.62] text-[#666972] font-normal flex-1">
                  {audience.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — SERVICE FAQs */}
      <section
        id="service-faqs"
        aria-labelledby="service-faqs-heading"
        className="w-full bg-[#FFFFFF] text-[#101114] py-18 sm:py-22 px-6 sm:px-10 border-t border-[#EAEAEA]"
      >
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[410px_1fr] gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading Reveals First */}
          <motion.div
            {...getPopupProps(0, 0.62, 0.96, 25)}
            className="lg:pr-4 transform-gpu"
          >
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FF6438]">
                SERVICE QUESTIONS
              </span>
            </div>

            <h2
              id="service-faqs-heading"
              className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] leading-[1.12] tracking-[-0.02em] text-[#101114] font-normal mb-4 text-balance"
            >
              Frequently Asked Questions.
            </h2>

            <p className="text-[14.5px] sm:text-[15.5px] leading-[1.68] text-[#666972] font-normal max-w-[40ch]">
              Clear answers to common questions regarding our{' '}
              {service.navLabel.toLowerCase()} support and how we work with your
              team.
            </p>
          </motion.div>

          {/* Right Column: Four Service-Specific Accordion Rows Appear With Small Stagger */}
          <div className="divide-y divide-[#E7E7E7] border-t border-b border-[#E7E7E7]">
            {service.faqs.map((item, idx) => {
              const isExpanded = openFaqId === item.id;
              const triggerId = `faq-trigger-${item.id}`;
              const panelId = `faq-panel-${item.id}`;
              const displayNum = `0${idx + 1}`;

              return (
                <motion.div
                  key={item.id}
                  {...getPopupProps(0.08 + idx * 0.095, 0.6, 0.96, 25)}
                  className="group transform-gpu"
                >
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => handleToggleFaq(item.id)}
                      className="w-full py-5 sm:py-6 text-left flex items-center justify-between gap-6 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
                    >
                      <span className="flex items-baseline gap-3.5 min-w-0">
                        <span className="text-[12px] font-semibold tracking-[0.08em] tabular-nums text-[#FF6438] shrink-0">
                          {displayNum}
                        </span>
                        <span
                          className={`text-[16px] sm:text-[17.5px] font-medium tracking-[-0.01em] leading-[1.38] transition-colors duration-[300ms] ${
                            isExpanded
                              ? 'text-[#FF6438]'
                              : 'text-[#171717] group-hover:text-[#FF6438]'
                          }`}
                        >
                          {item.question}
                        </span>
                      </span>

                      {/* Small Orange Plus / Minus Indicator */}
                      <span
                        aria-hidden="true"
                        className="relative w-5 h-5 flex items-center justify-center shrink-0"
                      >
                        <span
                          className={`w-3.5 h-[1.5px] rounded-full transition-colors duration-[300ms] ${
                            isExpanded
                              ? 'bg-[#FF6438]'
                              : 'bg-[#202020] group-hover:bg-[#FF6438]'
                          }`}
                        />
                        <span
                          className={`absolute w-[1.5px] h-3.5 rounded-full transition-all duration-[300ms] ease-out ${
                            isExpanded
                              ? 'scale-y-0 opacity-0 rotate-90 bg-[#FF6438]'
                              : 'scale-y-100 opacity-100 rotate-0 bg-[#202020] group-hover:bg-[#FF6438]'
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

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
                      <p className="pb-6 pl-7 sm:pl-8 pr-6 text-[14px] sm:text-[14.5px] leading-[1.68] text-[#666972] font-normal max-w-[62ch]">
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

      {/* SECTION 8 — PREMIUM CONSULTATION CTA (Smooth Reveal for Heading, Description, and Buttons) */}
      <section
        id="service-consultation-cta"
        aria-labelledby="service-cta-heading"
        className="w-full bg-[#101114] text-[#F5F5F3] py-16 sm:py-20 px-6 sm:px-10"
      >
        <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">
          {/* Left-Aligned Large White Headline & Concise Supporting Text */}
          <motion.div
            {...getPopupProps(0, 0.62, 0.97, 25)}
            className="max-w-[660px] transform-gpu"
          >
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF6438] shrink-0"
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#FF6438]">
                LET’S WORK TOGETHER
              </span>
            </div>

            <h2
              id="service-cta-heading"
              className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.1] tracking-[-0.02em] text-white font-normal mb-4 text-balance"
            >
              {service.ctaHeading}
            </h2>

            <p className="text-[15px] sm:text-[16px] leading-[1.66] text-[#C8C8D0] font-normal max-w-[54ch]">
              {service.ctaDescription}
            </p>
          </motion.div>

          {/* Right / Bottom Action Cluster: White Pill Consultation Button with Orange Arrow + Explore All Services Link */}
          <motion.div
            {...getPopupProps(0.12, 0.62, 0.97, 25)}
            className="flex flex-wrap items-center gap-6 shrink-0 transform-gpu"
          >
            <a
              href="/#contact-us"
              onClick={handleConsultationClick}
              className="group inline-flex items-center gap-1.5 rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6438]"
            >
              <span className="h-[48px] px-6 rounded-full bg-white text-[#101114] text-[14px] font-semibold tracking-[-0.01em] inline-flex items-center justify-center whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-shadow duration-[260ms] ease-out group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.38)]">
                Book a Consultation
              </span>
              <span className="w-[48px] h-[48px] rounded-full bg-[#FF6438] text-white inline-flex items-center justify-center shrink-0 shadow-[0_6px_18px_rgba(255,100,56,0.32)] transition-all duration-[260ms] ease-out group-hover:bg-[#1B1C20] group-hover:ring-1 group-hover:ring-white/20">
                <ArrowUpRight
                  strokeWidth={2.2}
                  className="w-[18px] h-[18px] text-white transition-all duration-[260ms] ease-out group-hover:text-[#FF6438] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                />
              </span>
            </a>

            <a
              href="/services"
              onClick={handleViewAllServicesClick}
              className="group inline-flex items-center gap-2 text-[14px] font-medium text-[#E5E5E0] hover:text-white transition-colors duration-[220ms] py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6438]"
            >
              <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-[#FF6438] transition-colors">
                Explore All Services
              </span>
              <ChevronRight
                strokeWidth={2}
                className="w-4 h-4 text-[#FF6438] transition-transform duration-[220ms] group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 9 — SHARED MINIMALIST WHITE BALENTRA FOOTER */}
      <Footer
        onNavigateSection={(targetId) => {
          if (targetId === 'our-services' || targetId === 'services-page') {
            onNavigateServices();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          onNavigateHomeSection(targetId);
        }}
      />
    </div>
  );
}

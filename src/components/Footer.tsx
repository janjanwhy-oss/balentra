import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

export interface FooterProps {
  onNavigateSection?: (sectionId: string) => void;
}

const FOOTER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[16px] h-[16px]"
        aria-hidden="true"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[16px] h-[16px]"
        aria-hidden="true"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[15px] h-[15px]"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[16px] h-[16px]"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
] as const;

const FOOTER_NAV_LINKS = [
  { label: 'Home', targetId: 'home' },
  { label: 'About Us', targetId: 'about-us' },
  { label: 'Services', targetId: 'our-services' },
  { label: 'Industries', targetId: 'industries-we-serve' },
  { label: 'Our Team', targetId: 'our-team' },
  { label: 'Contact', targetId: 'contact-us' },
] as const;

export function Footer({ onNavigateSection }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [activeLegalView, setActiveLegalView] = useState<'privacy' | 'terms' | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const getFooterRevealProps = (delay = 0) => ({
    initial: prefersReducedMotion
      ? false
      : { opacity: 0, scale: 0.96, y: 24 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.58,
      delay: prefersReducedMotion ? 0 : delay,
      ease: FOOTER_EASE,
    },
  });

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection(targetId);
      return;
    }
    if (targetId === 'services-page' || targetId === 'our-services') {
      window.history.pushState({}, '', '/services');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <footer
        id="footer"
        aria-label="Site footer"
        className="w-full bg-[#FFFFFF] text-[#171717] border-t border-[#EAEAEA] px-6 sm:px-10 py-10 sm:py-12 min-h-[220px] sm:min-h-[245px] flex items-center justify-center"
      >
        <div className="w-full max-w-[1180px] mx-auto flex flex-col items-center text-center">
          {/* 1. TOP — SOCIAL ICONS */}
          <motion.div
            {...getFooterRevealProps(0)}
            className="flex items-center justify-center gap-3 mb-6 transform-gpu"
            role="list"
            aria-label="Social media links"
          >
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                role="listitem"
                className="w-[38px] h-[38px] rounded-[10px] bg-white border border-[#E5E5E5] text-[#202020] inline-flex items-center justify-center transform-gpu transition-all duration-[250ms] ease-out hover:bg-[#FF6438] hover:border-[#FF6438] hover:text-white hover:-translate-y-[3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
              >
                {social.icon}
              </a>
            ))}
          </motion.div>

          {/* 2. MIDDLE — NAVIGATION & DISCREET SERVICES LINK */}
          <motion.div
            {...getFooterRevealProps(0.09)}
            className="flex flex-col items-center transform-gpu"
          >
            <nav aria-label="Footer navigation" className="mb-3">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5">
                {FOOTER_NAV_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.targetId === 'our-services' ? '/services' : `#${item.targetId}`}
                      onClick={(e) => handleLinkClick(e, item.targetId)}
                      className="text-[14px] font-medium tracking-[-0.01em] text-[#202020] hover:text-[#FF6438] transition-colors duration-[250ms] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Optional Discreet Services Link */}
            <div className="mb-6">
              <a
                href="/services"
                onClick={(e) => handleLinkClick(e, 'services-page')}
                className="inline-flex items-center gap-1 text-[13px] font-medium text-[#52525B] hover:text-[#FF6438] transition-colors duration-[250ms] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
              >
                <span>Explore Our Services</span>
                <span aria-hidden="true" className="text-[#FF6438]">
                  ↗
                </span>
              </a>
            </div>
          </motion.div>

          {/* 3. BOTTOM — COPYRIGHT & LEGAL */}
          <motion.div
            {...getFooterRevealProps(0.18)}
            className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 text-[12.5px] leading-[1.5] text-[#737373] transform-gpu"
          >
            <p>© {currentYear} Balentra Accounting. All rights reserved.</p>
            <span
              className="hidden sm:inline text-[#D4D4D8]"
              aria-hidden="true"
            >
              ·
            </span>
            <div className="inline-flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setActiveLegalView('privacy')}
                className="text-[#737373] hover:text-[#FF6438] transition-colors duration-[220ms] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
              >
                Privacy Policy
              </button>
              <span className="text-[#D4D4D8]" aria-hidden="true">
                |
              </span>
              <button
                type="button"
                onClick={() => setActiveLegalView('terms')}
                className="text-[#737373] hover:text-[#FF6438] transition-colors duration-[220ms] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]"
              >
                Terms of Use
              </button>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Minimal Legal Dialog for Privacy Policy & Terms of Use */}
      {activeLegalView && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-dialog-title"
          onClick={() => setActiveLegalView(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white text-[#171717] p-6 sm:p-8 border border-[#E7E7E7] shadow-xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#EAEAEA]">
              <h3
                id="legal-dialog-title"
                className="font-serif text-[22px] text-[#171717] font-normal"
              >
                {activeLegalView === 'privacy'
                  ? 'Privacy Policy'
                  : 'Terms of Use'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveLegalView(null)}
                aria-label="Close legal dialog"
                className="p-1.5 rounded-lg text-[#737373] hover:text-[#171717] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-5 space-y-3 text-[13.5px] leading-[1.65] text-[#52525B]">
              {activeLegalView === 'privacy' ? (
                <>
                  <p>
                    Balentra Accounting respects your confidentiality and processes
                    business contact details solely to respond to service inquiries
                    and deliver contracted accounting and advisory services.
                  </p>
                  <p>
                    Information submitted through our inquiry forms is stored
                    securely and is never sold or shared with unaffiliated third
                    parties.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Content on the Balentra Accounting website is provided for
                    general informational purposes regarding our bookkeeping,
                    reporting, tax compliance, and advisory services.
                  </p>
                  <p>
                    Formal accounting, tax, or audit engagements are governed by
                    written client engagement agreements tailored to your
                    jurisdiction and business scope.
                  </p>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-[#EAEAEA] flex justify-end">
              <button
                type="button"
                onClick={() => setActiveLegalView(null)}
                className="h-9 px-5 rounded-full bg-[#171717] hover:bg-[#FF6438] text-white text-[12.5px] font-medium transition-colors duration-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

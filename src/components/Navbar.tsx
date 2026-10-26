import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SERVICE_DROPDOWN_ITEMS } from '../data/serviceDetailsData';

export type NavItem =
  | 'Home'
  | 'About'
  | 'Services'
  | 'Industries'
  | 'Team'
  | 'Contact';

const NAV_ITEMS: NavItem[] = [
  'Home',
  'About',
  'Services',
  'Industries',
  'Team',
  'Contact',
];

const POP_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
let hasPlayedLogoEntrance = false;

export interface NavbarProps {
  currentPath: string;
  activeNav?: NavItem;
  variant?: 'dark-hero' | 'light-hero';
  onNavigateHomeSection: (sectionId?: string) => void;
  onNavigateServices: (slug?: string) => void;
  onOpenConsultation: () => void;
}

export function Navbar({
  currentPath,
  activeNav = 'Home',
  variant = 'dark-hero',
  onNavigateHomeSection,
  onNavigateServices,
  onOpenConsultation,
}: NavbarProps) {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuContainerRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const isServicesActive =
    activeNav === 'Services' ||
    currentPath === '/services' ||
    currentPath.startsWith('/services/');

  const clearCloseTimer = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleDesktopMouseEnter = () => {
    clearCloseTimer();
    setServicesDropdownOpen(true);
  };

  const handleDesktopMouseLeave = () => {
    clearCloseTimer();
    closeTimeoutRef.current = window.setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 160);
  };

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [currentPath]);

  // Close on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(target)
      ) {
        setServicesDropdownOpen(false);
      }
      if (
        mobileMenuOpen &&
        mobileMenuContainerRef.current &&
        !mobileMenuContainerRef.current.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [mobileMenuOpen]);

  const handlePrimaryItemClick = (item: NavItem) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);

    if (item === 'Home') {
      onNavigateHomeSection('home');
      return;
    }
    if (item === 'About') {
      onNavigateHomeSection('about-us');
      return;
    }
    if (item === 'Services') {
      onNavigateServices();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (item === 'Industries') {
      if (currentPath === '/services') {
        const el = document.getElementById('services-industries');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      onNavigateHomeSection('industries-we-serve');
      return;
    }
    if (item === 'Team') {
      onNavigateHomeSection('our-team');
      return;
    }
    if (item === 'Contact') {
      onNavigateHomeSection('contact-us');
      return;
    }
  };

  const handleServiceRouteClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug?: string
  ) => {
    e.preventDefault();
    clearCloseTimer();
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigateServices(slug || undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const wrapperShadowClass =
    variant === 'light-hero'
      ? 'drop-shadow-[0_14px_34px_rgba(16,17,20,0.09)]'
      : 'drop-shadow-[0_20px_42px_rgba(0,0,0,0.62)]';

  const barSurfaceClass =
    variant === 'light-hero' ? 'bg-[#FFFFFF]' : 'bg-[#F7F7F5]';
  const barFillHex = variant === 'light-hero' ? '#FFFFFF' : '#F7F7F5';

  return (
    <header className="relative z-40 w-full pt-6 sm:pt-8 px-4 sm:px-8 flex justify-center">
      <div
        ref={mobileMenuContainerRef}
        className={`max-w-full ${wrapperShadowClass}`}
      >
        {/* Custom-Curved Contained White Navigation Bar */}
        <div className="inline-flex items-end">
          {/* Left Sculpted Logo Section */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handlePrimaryItemClick('Home');
            }}
            className={`group h-[68px] sm:h-[74px] ${barSurfaceClass} text-[#121214] rounded-l-[37px] pl-7 sm:pl-9 pr-3 sm:pr-4 flex flex-col justify-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6438]`}
          >
            <motion.span
              initial={
                prefersReducedMotion || hasPlayedLogoEntrance
                  ? false
                  : { opacity: 0, scale: 0.88 }
              }
              animate={
                prefersReducedMotion || hasPlayedLogoEntrance
                  ? { opacity: 1, scale: 1 }
                  : { opacity: [0, 1, 1], scale: [0.88, 1.04, 1] }
              }
              transition={{
                duration:
                  prefersReducedMotion || hasPlayedLogoEntrance ? 0 : 0.65,
                times: [0, 0.68, 1],
                ease: POP_EASE,
              }}
              onAnimationComplete={() => {
                hasPlayedLogoEntrance = true;
              }}
              className="inline-flex flex-col justify-center origin-center transform-gpu will-change-transform"
            >
              <span className="inline-flex flex-col justify-center origin-center transform-gpu transition-transform duration-[275ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:scale-[1.06] group-hover:-translate-y-[1.5px] motion-reduce:group-hover:scale-100 motion-reduce:group-hover:translate-y-0">
                <span className="font-serif text-[22px] sm:text-[25px] leading-none tracking-[-0.02em] text-[#111113] font-normal">
                  Balentra
                </span>
                <span className="text-[8.5px] sm:text-[9px] font-medium tracking-[0.34em] uppercase text-neutral-500 mt-1.5 pl-0.5">
                  ACCOUNTING
                </span>
              </span>
            </motion.span>
          </a>

          {/* Smooth Sculpted S-Curve Transition Connecting Logo Area to Navigation */}
          <svg
            viewBox="0 0 42 74"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="w-8 sm:w-[42px] h-[68px] sm:h-[74px] shrink-0 block -ml-px -mr-px"
          >
            <path
              d="M 0 0 C 20 0, 22 20, 42 20 L 42 74 L 0 74 Z"
              fill={barFillHex}
            />
          </svg>

          {/* Right Contained Navigation Links Bar */}
          <div
            className={`h-[49px] sm:h-[54px] ${barSurfaceClass} text-[#141416] rounded-r-[27px] pl-2 sm:pl-3 pr-5 sm:pr-7 flex items-center`}
          >
            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center"
            >
              {NAV_ITEMS.map((item, idx) => {
                if (item === 'Services') {
                  return (
                    <React.Fragment key={item}>
                      {idx > 0 && (
                        <span
                          className="h-3.5 w-px bg-neutral-300/90 mx-1 lg:mx-1.5 shrink-0"
                          aria-hidden="true"
                        />
                      )}
                      <div
                        ref={dropdownContainerRef}
                        onMouseEnter={handleDesktopMouseEnter}
                        onMouseLeave={handleDesktopMouseLeave}
                        className="relative inline-flex items-center"
                      >
                        <div
                          className={`inline-flex items-center rounded-full transform-gpu transition-all duration-[220ms] ease-out ${
                            isServicesActive || servicesDropdownOpen
                              ? 'bg-white shadow-[0_2px_8px_rgba(17,17,19,0.06)] scale-[1.03]'
                              : 'hover:bg-white hover:shadow-[0_4px_12px_rgba(17,17,19,0.08)] hover:scale-[1.04]'
                          }`}
                        >
                          {/* Main Services label remains a normal link to /services */}
                          <a
                            href="/services"
                            aria-current={
                              currentPath === '/services' ? 'page' : undefined
                            }
                            onClick={(e) => handleServiceRouteClick(e)}
                            className={`pl-3.5 pr-1.5 py-1.5 rounded-l-full text-[13px] tracking-[0.01em] whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-[220ms] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#FF6438] ${
                              isServicesActive
                                ? 'text-[#FF6438] font-semibold'
                                : 'text-[#262629] font-medium hover:text-[#FF6438]'
                            }`}
                          >
                            Services
                          </a>

                          {/* Separate small chevron button to open/toggle dropdown */}
                          <button
                            type="button"
                            aria-label="Toggle Services menu"
                            aria-expanded={servicesDropdownOpen}
                            aria-controls="desktop-services-dropdown"
                            aria-haspopup="true"
                            onClick={(e) => {
                              e.stopPropagation();
                              clearCloseTimer();
                              setServicesDropdownOpen((prev) => !prev);
                            }}
                            className={`pr-2.5 pl-1 py-1.5 rounded-r-full inline-flex items-center justify-center cursor-pointer transition-colors duration-[220ms] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#FF6438] ${
                              isServicesActive || servicesDropdownOpen
                                ? 'text-[#FF6438]'
                                : 'text-[#52525B] hover:text-[#FF6438]'
                            }`}
                          >
                            <ChevronDown
                              strokeWidth={2.2}
                              className={`w-3.5 h-3.5 transition-transform duration-[240ms] ease-out ${
                                servicesDropdownOpen ? 'rotate-180' : 'rotate-0'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Desktop Services Dropdown Panel with Pop Animation */}
                        <AnimatePresence>
                          {servicesDropdownOpen && (
                            <motion.div
                              id="desktop-services-dropdown"
                              role="region"
                              aria-label="Services submenu"
                              initial={
                                prefersReducedMotion
                                  ? { opacity: 1, scale: 1, y: 0 }
                                  : { opacity: 0, scale: 0.93, y: 8 }
                              }
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={
                                prefersReducedMotion
                                  ? { opacity: 0 }
                                  : { opacity: 0, scale: 0.95, y: 6 }
                              }
                              transition={{
                                duration: prefersReducedMotion ? 0 : 0.24,
                                ease: POP_EASE,
                              }}
                              className="absolute left-0 top-full pt-2.5 z-50 origin-top-left transform-gpu"
                            >
                              <div className="w-[336px] rounded-2xl bg-white border border-[#E7E7EC] shadow-[0_20px_48px_rgba(16,17,20,0.16)] p-2.5 text-left">
                                <ul className="space-y-1">
                                  {SERVICE_DROPDOWN_ITEMS.map(
                                    (entry, entryIdx) => {
                                      const isExactMatch =
                                        currentPath === entry.route;
                                      return (
                                        <React.Fragment key={entry.route}>
                                          {entryIdx === 1 && (
                                            <li
                                              aria-hidden="true"
                                              className="my-1.5 border-t border-[#EFEFF3]"
                                            />
                                          )}
                                          <motion.li
                                            initial={
                                              prefersReducedMotion
                                                ? { opacity: 1, scale: 1, y: 0 }
                                                : {
                                                    opacity: 0,
                                                    scale: 0.96,
                                                    y: 8,
                                                  }
                                            }
                                            animate={{
                                              opacity: 1,
                                              scale: 1,
                                              y: 0,
                                            }}
                                            transition={{
                                              duration: prefersReducedMotion
                                                ? 0
                                                : 0.26,
                                              delay: prefersReducedMotion
                                                ? 0
                                                : entryIdx * 0.028,
                                              ease: POP_EASE,
                                            }}
                                          >
                                            <a
                                              href={entry.route}
                                              aria-current={
                                                isExactMatch
                                                  ? 'page'
                                                  : undefined
                                              }
                                              onClick={(e) =>
                                                handleServiceRouteClick(
                                                  e,
                                                  entry.slug || undefined
                                                )
                                              }
                                              className={`group flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[13px] transform-gpu transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.025] hover:-translate-y-[1.5px] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#FF6438] ${
                                                isExactMatch
                                                  ? 'bg-[#FAFAF9] text-[#FF6438] font-semibold shadow-[0_4px_12px_rgba(255,100,56,0.08)]'
                                                  : entry.isOverview
                                                  ? 'text-[#101114] font-semibold hover:bg-[#FAFAF9] hover:text-[#FF6438] hover:shadow-[0_6px_16px_rgba(16,17,20,0.06)]'
                                                  : 'text-[#2B2B30] font-medium hover:bg-[#FAFAF9] hover:text-[#FF6438] hover:shadow-[0_6px_16px_rgba(16,17,20,0.06)]'
                                              }`}
                                            >
                                              <span className="flex items-center gap-2.5 min-w-0">
                                                <span
                                                  aria-hidden="true"
                                                  className={`w-1.5 h-1.5 rounded-full shrink-0 transform-gpu transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                                    isExactMatch
                                                      ? 'bg-[#FF6438] scale-110'
                                                      : 'bg-[#FF6438]/0 group-hover:bg-[#FF6438] scale-50 group-hover:scale-110'
                                                  }`}
                                                />
                                                <span className="whitespace-nowrap">
                                                  {entry.label}
                                                </span>
                                              </span>
                                              <ArrowUpRight
                                                strokeWidth={2}
                                                aria-hidden="true"
                                                className={`w-3.5 h-3.5 shrink-0 transform-gpu transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                                  isExactMatch
                                                    ? 'text-[#FF6438] opacity-100 scale-105'
                                                    : 'text-[#A1A1AA] opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-110 group-hover:text-[#FF6438] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                                                }`}
                                              />
                                            </a>
                                          </motion.li>
                                        </React.Fragment>
                                      );
                                    }
                                  )}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </React.Fragment>
                  );
                }

                const isActive =
                  !isServicesActive && activeNav === item && currentPath === '/';

                return (
                  <React.Fragment key={item}>
                    {idx > 0 && (
                      <span
                        className="h-3.5 w-px bg-neutral-300/90 mx-1 lg:mx-1.5 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => handlePrimaryItemClick(item)}
                      className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-medium tracking-[0.01em] whitespace-nowrap shrink-0 cursor-pointer transform-gpu transition-all duration-[250ms] ease-out hover:scale-[1.04] hover:text-[#FF6438] hover:bg-white hover:shadow-[0_4px_12px_rgba(17,17,19,0.08)] active:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#FF6438] ${
                        isActive
                          ? 'text-[#111113] font-semibold'
                          : 'text-[#262629]'
                      }`}
                    >
                      {item}
                    </button>
                  </React.Fragment>
                );
              })}
            </nav>

            {/* Subtle Divider + Get Started Link on Large Screens */}
            <span
              className="hidden lg:block h-3.5 w-px bg-neutral-300/90 mx-1.5 shrink-0"
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={onOpenConsultation}
              className="hidden lg:inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-[#111113] whitespace-nowrap shrink-0 cursor-pointer transform-gpu transition-all duration-[250ms] ease-out hover:scale-[1.04] hover:text-[#FF6438] hover:bg-white hover:shadow-[0_4px_12px_rgba(17,17,19,0.08)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#FF6438]"
            >
              <span>Get Started</span>
            </button>

            {/* Mobile & Tablet Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-panel"
              className="md:hidden ml-2 p-2 rounded-full text-[#111113] hover:text-[#FF6438] hover:bg-white transition-all duration-[250ms] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF6438]"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Responsive Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation-panel"
              initial={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.96, y: 8 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, y: 6 }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.22,
                ease: POP_EASE,
              }}
              className="md:hidden mt-2.5 bg-[#F7F7F5] text-[#111113] rounded-2xl px-4 py-4 border border-neutral-200/90 shadow-2xl w-[min(92vw,360px)] origin-top transform-gpu"
            >
              <div className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  if (item === 'Services') {
                    return (
                      <div
                        key={item}
                        className="rounded-xl bg-white/70 border border-neutral-200/70 overflow-hidden"
                      >
                        <div className="flex items-center justify-between">
                          <a
                            href="/services"
                            onClick={(e) => handleServiceRouteClick(e)}
                            className={`flex-1 py-2.5 pl-3 pr-2 text-left text-[13px] font-semibold transition-colors ${
                              isServicesActive
                                ? 'text-[#FF6438]'
                                : 'text-[#111113] hover:text-[#FF6438]'
                            }`}
                          >
                            Services
                          </a>
                          <button
                            type="button"
                            aria-label="Toggle mobile Services submenu"
                            aria-expanded={mobileServicesOpen}
                            aria-controls="mobile-services-submenu"
                            onClick={() =>
                              setMobileServicesOpen((prev) => !prev)
                            }
                            className="p-2.5 text-[#111113] hover:text-[#FF6438] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF6438]"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                mobileServicesOpen
                                  ? 'rotate-180 text-[#FF6438]'
                                  : ''
                              }`}
                            />
                          </button>
                        </div>

                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.ul
                              id="mobile-services-submenu"
                              initial={
                                prefersReducedMotion
                                  ? { opacity: 1 }
                                  : { opacity: 0, y: -4 }
                              }
                              animate={{ opacity: 1, y: 0 }}
                              exit={
                                prefersReducedMotion
                                  ? { opacity: 0 }
                                  : { opacity: 0, y: -4 }
                              }
                              transition={{
                                duration: prefersReducedMotion ? 0 : 0.2,
                                ease: POP_EASE,
                              }}
                              className="border-t border-neutral-200/70 bg-white px-2 py-2 space-y-1"
                            >
                              {SERVICE_DROPDOWN_ITEMS.map((entry, idx) => {
                                const isExactMatch =
                                  currentPath === entry.route;
                                return (
                                  <motion.li
                                    key={entry.route}
                                    initial={
                                      prefersReducedMotion
                                        ? { opacity: 1, scale: 1, y: 0 }
                                        : { opacity: 0, scale: 0.96, y: 6 }
                                    }
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{
                                      duration: prefersReducedMotion ? 0 : 0.22,
                                      delay: prefersReducedMotion
                                        ? 0
                                        : idx * 0.025,
                                      ease: POP_EASE,
                                    }}
                                  >
                                    <a
                                      href={entry.route}
                                      aria-current={
                                        isExactMatch ? 'page' : undefined
                                      }
                                      onClick={(e) =>
                                        handleServiceRouteClick(
                                          e,
                                          entry.slug || undefined
                                        )
                                      }
                                      className={`flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-[12.5px] transform-gpu transition-all duration-200 hover:scale-[1.02] ${
                                        isExactMatch
                                          ? 'bg-[#FAFAF9] text-[#FF6438] font-semibold'
                                          : entry.isOverview
                                          ? 'text-[#101114] font-semibold hover:bg-[#FAFAF9] hover:text-[#FF6438]'
                                          : 'text-neutral-700 font-medium hover:bg-[#FAFAF9] hover:text-[#FF6438]'
                                      }`}
                                    >
                                      <span>{entry.label}</span>
                                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6438] shrink-0" />
                                    </a>
                                  </motion.li>
                                );
                              })}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  const isActive =
                    !isServicesActive &&
                    activeNav === item &&
                    currentPath === '/';

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handlePrimaryItemClick(item)}
                      className={`w-full text-left py-2 px-3 rounded-xl text-[13px] font-medium transition-all duration-[240ms] flex items-center justify-between hover:bg-white hover:text-[#FF6438] ${
                        isActive
                          ? 'bg-white text-[#FF6438] font-semibold shadow-xs'
                          : 'text-neutral-700'
                      }`}
                    >
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-200/80">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full py-2.5 px-4 rounded-full bg-[#111113] text-white text-xs font-semibold tracking-wide hover:bg-[#FF6438] transition-colors duration-[250ms]"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export interface ServiceDeliverable {
  number: string;
  title: string;
  description: string;
}

export interface ServiceShowcaseTabContent {
  summary: string;
  detail: string;
  highlights: [string, string, string];
}

export interface ServiceProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceAudienceItem {
  number: string;
  title: string;
  description: string;
}

export interface ServiceFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceDetailConfig {
  slug: string;
  route: string;
  number: string;
  eyebrow: string;
  navLabel: string;
  breadcrumbLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroDescription: string;
  heroImage: string;
  heroImageAlt: string;
  overviewHeading: string;
  overviewParagraphs: [string, string];
  deliverables: [
    ServiceDeliverable,
    ServiceDeliverable,
    ServiceDeliverable,
    ServiceDeliverable
  ];
  showcaseEyebrow: string;
  showcaseHeading: string;
  showcaseDescription: string;
  showcaseImage: string;
  showcaseImageAlt: string;
  showcaseTabs: {
    PROCESS: ServiceShowcaseTabContent;
    DELIVERABLES: ServiceShowcaseTabContent;
    SUPPORT: ServiceShowcaseTabContent;
  };
  howWeWorkSteps: [ServiceProcessStep, ServiceProcessStep, ServiceProcessStep];
  whoItsForHeading: string;
  whoItsForIntro: string;
  whoItsForItems: [
    ServiceAudienceItem,
    ServiceAudienceItem,
    ServiceAudienceItem,
    ServiceAudienceItem
  ];
  faqs: [ServiceFaqItem, ServiceFaqItem, ServiceFaqItem, ServiceFaqItem];
  ctaHeading: string;
  ctaDescription: string;
}

export const SERVICE_DROPDOWN_ITEMS = [
  {
    label: 'View All Services',
    route: '/services',
    slug: '',
    isOverview: true,
  },
  {
    label: 'Bookkeeping & Accounting',
    route: '/services/bookkeeping-accounting',
    slug: 'bookkeeping-accounting',
    isOverview: false,
  },
  {
    label: 'Financial Reporting & Analysis',
    route: '/services/financial-reporting',
    slug: 'financial-reporting',
    isOverview: false,
  },
  {
    label: 'Payroll Management & Coordination',
    route: '/services/payroll',
    slug: 'payroll',
    isOverview: false,
  },
  {
    label: 'Accounts Payable & Receivable',
    route: '/services/accounts-payable-receivable',
    slug: 'accounts-payable-receivable',
    isOverview: false,
  },
  {
    label: 'Fractional CFO & Financial Advisory',
    route: '/services/fractional-cfo',
    slug: 'fractional-cfo',
    isOverview: false,
  },
  {
    label: 'Cloud Accounting & Finance Systems',
    route: '/services/cloud-accounting',
    slug: 'cloud-accounting',
    isOverview: false,
  },
] as const;

export const SERVICE_DETAILS_BY_SLUG: Record<string, ServiceDetailConfig> = {
  'bookkeeping-accounting': {
    slug: 'bookkeeping-accounting',
    route: '/services/bookkeeping-accounting',
    number: '01',
    eyebrow: 'SERVICE 01 / 06',
    navLabel: 'Bookkeeping & Accounting',
    breadcrumbLabel: 'Bookkeeping & Accounting',
    metaTitle: 'Bookkeeping & Accounting | Balentra Accounting',
    metaDescription:
      'Accurate financial records, organized processes, and dependable bookkeeping support designed around your everyday business operations.',
    h1: 'Bookkeeping That Keeps You Moving.',
    heroDescription:
      'Accurate financial records, organized processes, and dependable bookkeeping support designed around your everyday business operations.',
    heroImage:
      '/assets/aistudio/Consultant_reviewing_financial_d__20261026001240__1__c45553eb.jpg',
    heroImageAlt:
      'Professional accountant working at a modern desk with organized financial records and natural office lighting',
    overviewHeading: 'A Stronger Foundation for Every Financial Decision.',
    overviewParagraphs: [
      'Reliable bookkeeping helps businesses understand transactions, maintain consistent records, and prepare meaningful financial reports. Balentra supports the ongoing organization and reconciliation of accounting information so teams can work with clearer financial data.',
      'By establishing structured routines for transaction categorization, bank reconciliation, and ledger review, we reduce month-end bottlenecks and help ensure your core accounting records remain orderly, current, and ready for management review.',
    ],
    deliverables: [
      {
        number: '01',
        title: 'Transaction Recording',
        description:
          'Organized recording and categorization of business transactions.',
      },
      {
        number: '02',
        title: 'Bank & Account Reconciliation',
        description:
          'Regular comparison of recorded transactions with relevant account statements.',
      },
      {
        number: '03',
        title: 'General Ledger Management',
        description:
          'Structured maintenance and review of financial ledger records.',
      },
      {
        number: '04',
        title: 'Month-End Accounting Support',
        description:
          'Period-end organization, reconciliations, and preparation for reporting.',
      },
    ],
    showcaseEyebrow: 'BOOKKEEPING ARCHITECTURE',
    showcaseHeading: 'Organized Books. Clearer Business Decisions.',
    showcaseDescription:
      'Structured day-to-day accounting workflows that transform scattered transaction data into dependable, well-documented financial records.',
    showcaseImage:
      '/assets/aistudio/Desk_with_payroll_documents_and_20261026001248_11zon_16cb4757.jpg',
    showcaseImageAlt:
      'Neatly arranged accounting paperwork, ledger statements, and financial workspace details',
    showcaseTabs: {
      PROCESS: {
        summary: 'Recording, categorization, and reconciliation.',
        detail:
          'We establish a disciplined workflow to collect source documents, classify daily entries against a tailored chart of accounts, and reconcile balances on an agreed schedule.',
        highlights: [
          'Systematic capture of bank, card, and expense records',
          'Consistent transaction coding aligned to your chart of accounts',
          'Structured statement reconciliations to identify discrepancies early',
        ],
      },
      DELIVERABLES: {
        summary: 'Organized ledgers, reconciliations, and period-end records.',
        detail:
          'Each accounting cycle concludes with clean, review-ready records that give leadership and external stakeholders a clear view of underlying activity.',
        highlights: [
          'Maintained general ledger with documented journal entries',
          'Completed bank, credit card, and clearing account reconciliations',
          'Organized month-end close schedules ready for financial reporting',
        ],
      },
      SUPPORT: {
        summary:
          'Ongoing bookkeeping coordination and review within the agreed scope.',
        detail:
          'Our accounting specialists work alongside your internal team to resolve transaction queries, maintain documentation standards, and adapt workflows as volume grows.',
        highlights: [
          'Recurring bookkeeping updates on a weekly, bi-weekly, or monthly cadence',
          'Prompt communication regarding missing receipts or uncategorized items',
          'Historical record cleanup and catch-up organization when required',
        ],
      },
    },
    howWeWorkSteps: [
      {
        number: '01',
        title: 'Understand',
        description:
          'Review your business requirements, transaction volume, chart of accounts, existing bookkeeping workflows, and the agreed scope of support.',
      },
      {
        number: '02',
        title: 'Set Up',
        description:
          'Organize your general ledger structure, document collection channels, reconciliation schedules, and necessary accounting software settings.',
      },
      {
        number: '03',
        title: 'Support',
        description:
          'Deliver consistent transaction recording, account reconciliations, month-end close preparation, and clear communication on your agreed schedule.',
      },
    ],
    whoItsForHeading: 'Who This Service Is For.',
    whoItsForIntro:
      'Designed for organizations seeking dependable day-to-day financial record-keeping without internal administrative strain.',
    whoItsForItems: [
      {
        number: '01',
        title: 'Startups',
        description:
          'Emerging companies building structured accounting habits and clean financial records from the outset.',
      },
      {
        number: '02',
        title: 'Small & Medium Businesses',
        description:
          'Established businesses looking for consistent transaction categorization, reconciliations, and dependable month-end close routines.',
      },
      {
        number: '03',
        title: 'E-commerce Companies',
        description:
          'Online sellers managing recurring order settlements, payment processor fees, and multi-channel expense records.',
      },
      {
        number: '04',
        title: 'Agencies & Service Businesses',
        description:
          'Client-serving teams that want organized books and clear visibility over operating costs and project retainers.',
      },
    ],
    faqs: [
      {
        id: 'bk-01',
        question: 'What information do you need to begin bookkeeping?',
        answer:
          'To get started, we typically review your existing chart of accounts, recent bank and payment statements, access to your current accounting software (if applicable), and a brief overview of how your business bills customers and pays suppliers.',
      },
      {
        id: 'bk-02',
        question: 'Can Balentra help organize existing financial records?',
        answer:
          'Yes. If your books have fallen behind or contain uncategorized transactions, we can define a catch-up and cleanup scope to organize historical entries and bring your account reconciliations up to date.',
      },
      {
        id: 'bk-03',
        question: 'How frequently can bookkeeping be updated?',
        answer:
          'Bookkeeping schedules are structured around your transaction volume and operational needs—commonly on a weekly, bi-weekly, or monthly basis—with formal reconciliations completed at each period close.',
      },
      {
        id: 'bk-04',
        question:
          'Can bookkeeping work with our existing accounting software?',
        answer:
          'Yes. We regularly work within established cloud accounting platforms and can adapt our bookkeeping processes to fit your current software environment and internal document workflows.',
      },
    ],
    ctaHeading: "Let's Get Your Books in Order.",
    ctaDescription:
      'Discuss your bookkeeping requirements with our team and establish a structured, reliable routine for your financial records.',
  },

  'financial-reporting': {
    slug: 'financial-reporting',
    route: '/services/financial-reporting',
    number: '02',
    eyebrow: 'SERVICE 02 / 06',
    navLabel: 'Financial Reporting & Analysis',
    breadcrumbLabel: 'Financial Reporting & Analysis',
    metaTitle: 'Financial Reporting & Analysis | Balentra Accounting',
    metaDescription:
      'Clear financial reports and practical analysis that help you understand performance, identify trends, and plan with greater confidence.',
    h1: 'See the Numbers.\nUnderstand the Bigger Picture.',
    heroDescription:
      'Clear financial reports and practical analysis that help you understand performance, identify trends, and plan with greater confidence.',
    heroImage:
      '/assets/aistudio/Financial_charts_on_office_desk_20261026001253_11zon_39cfd48b.jpg',
    heroImageAlt:
      'Premium financial analysis workspace with printed reports, performance charts, and modern architectural details',
    overviewHeading: 'Make Financial Information More Meaningful.',
    overviewParagraphs: [
      'Financial information becomes more useful when it is organized into understandable reports and connected to business performance. Balentra helps prepare and analyze financial information for management review, planning, and operational visibility.',
      'Rather than presenting raw ledger balances in isolation, we structure monthly and quarterly reporting packages around clear statements, cash flow movements, and budget comparisons so decision-makers can evaluate results with clarity.',
    ],
    deliverables: [
      {
        number: '01',
        title: 'Financial Statements',
        description:
          'Preparation and organization of relevant financial statements.',
      },
      {
        number: '02',
        title: 'Management Reporting',
        description:
          'Structured reports tailored to agreed business performance indicators.',
      },
      {
        number: '03',
        title: 'Cash Flow Analysis',
        description:
          'Visibility into historical cash movements and relevant forecasts.',
      },
      {
        number: '04',
        title: 'Budget & Variance Analysis',
        description:
          'Comparison of actual results against budgets and expectations.',
      },
    ],
    showcaseEyebrow: 'REPORTING & INSIGHT',
    showcaseHeading: 'From Financial Data to Practical Insight.',
    showcaseDescription:
      'Structured financial reporting that connects period-end accounting balances directly to operational performance and management priorities.',
    showcaseImage:
      '/assets/aistudio/Desk_with_payroll_documents_and_20261026001248_11zon_16cb4757.jpg',
    showcaseImageAlt:
      'Executive desk with laptop and structured financial reporting charts',
    showcaseTabs: {
      PROCESS: {
        summary: 'Organizing financial data and reporting requirements.',
        detail:
          'We align with your leadership team on the metrics that matter, verify underlying ledger accuracy after period close, and assemble structured reporting packs.',
        highlights: [
          'Review of reconciled trial balances and period-end adjustments',
          'Alignment on revenue, margin, and operating expense categories',
          'Consistent formatting for period-over-period comparability',
        ],
      },
      DELIVERABLES: {
        summary: 'Statements, management reports, and financial analysis.',
        detail:
          'Receive clear, well-structured reporting packages designed for founders, executives, and internal management discussions.',
        highlights: [
          'Income statements, balance sheets, and cash flow summaries',
          'Custom management packs tracking agreed operational KPIs',
          'Budget-to-actual variance breakdowns with clear commentary',
        ],
      },
      SUPPORT: {
        summary: 'Recurring reporting and financial review coordination.',
        detail:
          'We support your reporting calendar consistently each month or quarter and help clarify key movements across revenue, costs, and working capital.',
        highlights: [
          'Scheduled monthly or quarterly report preparation',
          'Walkthroughs of key performance trends and variance drivers',
          'Refinement of reporting templates as your business evolves',
        ],
      },
    },
    howWeWorkSteps: [
      {
        number: '01',
        title: 'Understand',
        description:
          'Review your business model, management reporting requirements, key performance indicators, and the agreed reporting cadence.',
      },
      {
        number: '02',
        title: 'Set Up',
        description:
          'Organize reporting templates, statement structures, budget comparison layouts, and period-end data review workflows.',
      },
      {
        number: '03',
        title: 'Support',
        description:
          'Deliver recurring financial statements, management reporting packages, variance analysis, and ongoing review communication.',
      },
    ],
    whoItsForHeading: 'Who This Service Is For.',
    whoItsForIntro:
      'Built for leadership teams and business owners who want timely, structured visibility into financial results.',
    whoItsForItems: [
      {
        number: '01',
        title: 'Growing SMEs',
        description:
          'Companies expanding operations that need structured monthly or quarterly visibility into profitability and working capital.',
      },
      {
        number: '02',
        title: 'SaaS Businesses',
        description:
          'Subscription and technology businesses tracking recurring revenue trends, operating margins, and cash burn.',
      },
      {
        number: '03',
        title: 'Agency Owners',
        description:
          'Service-led organizations monitoring client revenue, delivery costs, and overhead efficiency across periods.',
      },
      {
        number: '04',
        title: 'Management Teams',
        description:
          'Department heads and executives requiring clear budget-versus-actual comparisons to guide operational decisions.',
      },
    ],
    faqs: [
      {
        id: 'fr-01',
        question: 'Which financial reports can Balentra prepare?',
        answer:
          'Depending on your agreed scope, we prepare core financial statements—including profit and loss statements, balance sheets, and cash flow summaries—alongside tailored management reports and budget variance analyses.',
      },
      {
        id: 'fr-02',
        question: 'How often can management reports be produced?',
        answer:
          'Management reporting is typically prepared on a monthly or quarterly schedule following the completion of your period-end bookkeeping reconciliations.',
      },
      {
        id: 'fr-03',
        question: 'Can reports be tailored to our business KPIs?',
        answer:
          'Yes. We structure management reporting packs around the specific financial and operational indicators relevant to your business, such as gross margin by line of business, overhead ratios, or cash runway.',
      },
      {
        id: 'fr-04',
        question: 'Can Balentra help us understand cash flow trends?',
        answer:
          'Yes. Our cash flow analysis highlights historical inflows and outflows across operating activities and working capital so you can see how profit translates into actual cash movement.',
      },
    ],
    ctaHeading: 'Bring Clarity to Your Financial Performance.',
    ctaDescription:
      'Connect with Balentra to establish clear, dependable financial reporting tailored to how your leadership team makes decisions.',
  },

  payroll: {
    slug: 'payroll',
    route: '/services/payroll',
    number: '03',
    eyebrow: 'SERVICE 03 / 06',
    navLabel: 'Payroll Management & Coordination',
    breadcrumbLabel: 'Payroll Management & Coordination',
    metaTitle: 'Payroll Management & Coordination | Balentra Accounting',
    metaDescription:
      'Structured payroll administration, organized employee payment information, and reliable payroll reporting support.',
    h1: 'Payroll Processes.\nBetter Organized.',
    heroDescription:
      'Structured payroll administration, organized employee payment information, and reliable payroll reporting support.',
    heroImage:
      '/assets/aistudio/Desk_with_payroll_documents_and_20261026001248_11zon_16cb4757.jpg',
    heroImageAlt:
      'Modern payroll administration office with finance specialist, laptop, organized documents, and natural light',
    overviewHeading:
      'A More Structured Approach to Payroll Administration.',
    overviewParagraphs: [
      'Payroll requires accurate information, dependable recurring workflows, and clear coordination. Balentra supports payroll-related financial administration, records, reconciliation, and reporting according to the agreed service scope and relevant local provider arrangements where applicable.',
      'We help your team maintain orderly compensation data, coordinate smoothly with your designated payroll software or local payroll specialists, and ensure every pay cycle is properly reflected and reconciled within your general ledger.',
    ],
    deliverables: [
      {
        number: '01',
        title: 'Payroll Data Preparation',
        description:
          'Organizing relevant employee and compensation information.',
      },
      {
        number: '02',
        title: 'Payroll Records',
        description:
          'Maintaining structured payroll-related payment and accounting records.',
      },
      {
        number: '03',
        title: 'Payroll Reconciliation',
        description:
          'Reviewing payroll transactions against relevant financial records.',
      },
      {
        number: '04',
        title: 'Payroll Reporting Coordination',
        description:
          'Supporting payroll-related reporting and coordination with applicable specialists or providers.',
      },
    ],
    showcaseEyebrow: 'PAYROLL COORDINATION',
    showcaseHeading:
      'Less Administrative Complexity. More Financial Order.',
    showcaseDescription:
      'Dependable coordination between employee compensation data, payroll providers, and your core accounting records.',
    showcaseImage:
      '/assets/aistudio/Desk_with_payroll_documents_and_20261026001248_11zon_16cb4757.jpg',
    showcaseImageAlt:
      'Finance specialist reviewing organized payroll schedules and accounting documentation',
    showcaseTabs: {
      PROCESS: {
        summary: 'Payroll information collection and review.',
        detail:
          'Before each pay cycle, we help gather and structure approved compensation inputs, attendance or variable pay adjustments, and onboarding updates.',
        highlights: [
          'Structured checklists for recurring pay-period inputs and changes',
          'Verification of approved salary, hourly, and reimbursement data',
          'Timely preparation of payroll summaries for internal review',
        ],
      },
      DELIVERABLES: {
        summary:
          'Organized records, reconciliations, and reporting support.',
        detail:
          'Every payroll run is supported by clear accounting entries, reconciled clearing accounts, and organized financial documentation.',
        highlights: [
          'Structured payroll journal entries mapped to your general ledger',
          'Reconciliation of payroll disbursements against bank statements',
          'Departmental or cost-center payroll cost summaries for management',
        ],
      },
      SUPPORT: {
        summary: 'Recurring payroll administration coordination.',
        detail:
          'We work alongside your internal HR or operations contacts and coordinate with your existing payroll platform or local payroll providers within the agreed scope.',
        highlights: [
          'Consistent coordination across monthly, semi-monthly, or bi-weekly cycles',
          'Liaison with your designated payroll software or local specialists',
          'Clear documentation trail for internal reviews and period-end closes',
        ],
      },
    },
    howWeWorkSteps: [
      {
        number: '01',
        title: 'Understand',
        description:
          'Review your team structure, pay cycle schedule, existing payroll providers, and the agreed scope of administrative and accounting support.',
      },
      {
        number: '02',
        title: 'Set Up',
        description:
          'Organize data collection templates, approval cutoffs, general ledger mapping, and coordination routines with your payroll tools or providers.',
      },
      {
        number: '03',
        title: 'Support',
        description:
          'Deliver recurring payroll data preparation, ledger posting, account reconciliation, and reporting coordination each pay period.',
      },
    ],
    whoItsForHeading: 'Who This Service Is For.',
    whoItsForIntro:
      'Tailored for organizations that want structured payroll administration and clean accounting alignment across every pay cycle.',
    whoItsForItems: [
      {
        number: '01',
        title: 'Growing Teams',
        description:
          'Businesses adding staff that need a dependable, repeatable process for preparing and reviewing recurring payroll data.',
      },
      {
        number: '02',
        title: 'SMEs',
        description:
          'Small and medium-sized enterprises seeking accurate payroll-to-ledger reconciliation and clearer visibility into staff costs.',
      },
      {
        number: '03',
        title: 'Agencies',
        description:
          'Service organizations managing salaried employees, project contractors, and departmental compensation tracking.',
      },
      {
        number: '04',
        title: 'Distributed Businesses',
        description:
          'Companies coordinating payroll documentation and accounting records across remote teams and local payroll providers.',
      },
    ],
    faqs: [
      {
        id: 'pr-01',
        question: 'What payroll information is required to begin?',
        answer:
          'We typically review your current pay cycle calendar, existing payroll software or local provider setup, chart-of-accounts mapping for wages and deductions, and the approved workflow for submitting recurring compensation changes.',
      },
      {
        id: 'pr-02',
        question:
          'Can Balentra coordinate with our existing payroll provider?',
        answer:
          'Yes. We frequently work alongside a client’s established payroll software or local payroll specialist—preparing organized input data before each run and recording and reconciling the resulting figures in your accounting system.',
      },
      {
        id: 'pr-03',
        question:
          'Can payroll-related records be reconciled with our accounts?',
        answer:
          'Yes. A core part of our service is reconciling gross pay, deductions, employer costs, and net disbursements against your bank statements and general ledger clearing accounts each period.',
      },
      {
        id: 'pr-04',
        question:
          'Do payroll services vary by country and service scope?',
        answer:
          'Yes. Payroll regulations and filing requirements differ by jurisdiction. Balentra provides payroll data preparation, financial record-keeping, reconciliation, and coordination according to the agreed service scope, working alongside qualified local payroll providers where country-specific statutory processing is required.',
      },
    ],
    ctaHeading: "Let's Simplify Your Payroll Administration.",
    ctaDescription:
      'Speak with our team about organizing your recurring payroll workflows, reconciliations, and accounting records.',
  },

  'accounts-payable-receivable': {
    slug: 'accounts-payable-receivable',
    route: '/services/accounts-payable-receivable',
    number: '04',
    eyebrow: 'SERVICE 04 / 06',
    navLabel: 'Accounts Payable & Receivable',
    breadcrumbLabel: 'Accounts Payable & Receivable',
    metaTitle: 'Accounts Payable & Receivable | Balentra Accounting',
    metaDescription:
      'Organized invoicing, payment tracking, and financial administration that help businesses manage everyday receivables and payables.',
    h1: 'Better Control Over Money In and Out.',
    heroDescription:
      'Organized invoicing, payment tracking, and financial administration that help businesses manage everyday receivables and payables.',
    heroImage:
      '/assets/aistudio/Consultant_reviewing_tax_documents_20261026001238_11zon_4cde3799.jpg',
    heroImageAlt:
      'Elegant editorial financial operations desk with a professional reviewing invoices and supplier documents',
    overviewHeading: 'Bring Structure to Every Payment Cycle.',
    overviewParagraphs: [
      'Consistent management of supplier bills, customer invoices, and outstanding balances supports stronger financial visibility. Balentra helps businesses organize payment-related processes and track relevant financial information.',
      'By maintaining accurate aging schedules, structured invoice documentation, and clear approval workflows, we help your business stay on top of incoming customer receipts and upcoming vendor obligations without administrative confusion.',
    ],
    deliverables: [
      {
        number: '01',
        title: 'Customer Invoicing',
        description:
          'Preparing and organizing invoices according to established procedures.',
      },
      {
        number: '02',
        title: 'Accounts Receivable Tracking',
        description:
          'Maintaining visibility over open customer balances and payment status.',
      },
      {
        number: '03',
        title: 'Vendor Bill Administration',
        description:
          'Recording, organizing, and reviewing supplier bills.',
      },
      {
        number: '04',
        title: 'Payment Reconciliation & Reporting',
        description:
          'Tracking and reconciling relevant payment activity and balances.',
      },
    ],
    showcaseEyebrow: 'RECEIVABLES & PAYABLES',
    showcaseHeading: 'Every Invoice Accounted For.',
    showcaseDescription:
      'Disciplined administration for customer billing and supplier payables that keeps working capital records accurate and transparent.',
    showcaseImage:
      '/assets/aistudio/Desk_with_payroll_documents_and_20261026001248_11zon_16cb4757.jpg',
    showcaseImageAlt:
      'Organized accounts payable and receivable review in a refined modern office environment',
    showcaseTabs: {
      PROCESS: {
        summary: 'Invoice capture, organization, and tracking.',
        detail:
          'We establish clear routines for issuing customer invoices on schedule, capturing incoming vendor bills, and verifying supporting documentation.',
        highlights: [
          'Timely preparation of customer invoices per agreed billing terms',
          'Structured capture and coding of incoming supplier invoices',
          'Verification of bill details before routing for client authorization',
        ],
      },
      DELIVERABLES: {
        summary:
          'Payables and receivables records, status reports, and reconciliations.',
        detail:
          'Maintain a clear, up-to-date picture of who owes your business and which supplier obligations are coming due.',
        highlights: [
          'Current accounts receivable aging reports and open balance summaries',
          'Organized accounts payable schedules grouped by due date',
          'Reconciled customer receipts and supplier payment sub-ledgers',
        ],
      },
      SUPPORT: {
        summary: 'Recurring financial administration and coordination.',
        detail:
          'We support your day-to-day billing and payables administration while respecting your internal sign-off controls and payment authorization rules.',
        highlights: [
          'Consistent tracking of overdue receivables and statement preparation',
          'Preparation of scheduled payment runs for your authorized sign-off',
          'Clear resolution of billing discrepancies and unapplied credits',
        ],
      },
    },
    howWeWorkSteps: [
      {
        number: '01',
        title: 'Understand',
        description:
          'Review your customer billing terms, vendor volume, approval requirements, and the agreed scope of AP and AR support.',
      },
      {
        number: '02',
        title: 'Set Up',
        description:
          'Organize invoice templates, bill capture channels, aging report formats, and clear client payment-authorization protocols.',
      },
      {
        number: '03',
        title: 'Support',
        description:
          'Deliver ongoing invoicing, bill recording, aging visibility, and payment reconciliations on a reliable recurring schedule.',
      },
    ],
    whoItsForHeading: 'Who This Service Is For.',
    whoItsForIntro:
      'Suited for businesses handling recurring customer billing and supplier invoices that require consistent tracking.',
    whoItsForItems: [
      {
        number: '01',
        title: 'E-commerce',
        description:
          'Online brands managing inventory suppliers, logistics invoices, and multi-channel settlement reconciliations.',
      },
      {
        number: '02',
        title: 'Retail',
        description:
          'Retail operations coordinating recurring vendor deliveries, credit terms, and payable due dates.',
      },
      {
        number: '03',
        title: 'Professional Services',
        description:
          'Consultancies and firms issuing milestone or retainer invoices and tracking client collections.',
      },
      {
        number: '04',
        title: 'Growing SMEs',
        description:
          'Expanding companies seeking structured control over working capital inflows and outflows.',
      },
    ],
    faqs: [
      {
        id: 'ap-01',
        question: 'Can Balentra manage both payables and receivables?',
        answer:
          'Yes. You can engage Balentra to support customer invoicing and accounts receivable tracking, supplier bill administration, or both functions together as a unified workflow.',
      },
      {
        id: 'ap-02',
        question: 'How can outstanding invoices be monitored?',
        answer:
          'We maintain up-to-date accounts receivable and accounts payable aging schedules that categorize open invoices by due date, giving you clear visibility into upcoming and overdue balances.',
      },
      {
        id: 'ap-03',
        question: 'Can you work with our existing invoicing system?',
        answer:
          'Yes. We work within your established cloud accounting and billing tools so all invoices, credit notes, and payment records stay centralized in your system.',
      },
      {
        id: 'ap-04',
        question: 'What approvals are needed for supplier payments?',
        answer:
          'Balentra does not authorize or execute payments independently. We record and organize supplier bills and prepare payment schedules for review, ensuring all disbursements follow your company’s agreed internal authorization process.',
      },
    ],
    ctaHeading: 'Take Control of Your Payment Workflows.',
    ctaDescription:
      'Talk with our team about bringing greater structure and visibility to your invoicing, receivables, and supplier bill administration.',
  },

  'fractional-cfo': {
    slug: 'fractional-cfo',
    route: '/services/fractional-cfo',
    number: '05',
    eyebrow: 'SERVICE 05 / 06',
    navLabel: 'Fractional CFO & Financial Advisory',
    breadcrumbLabel: 'Fractional CFO & Financial Advisory',
    metaTitle: 'Fractional CFO & Financial Advisory | Balentra Accounting',
    metaDescription:
      'Practical financial planning, forecasting, and performance analysis to support informed business decisions.',
    h1: "Financial Perspective for What's Next.",
    heroDescription:
      'Practical financial planning, forecasting, and performance analysis to support informed business decisions.',
    heroImage:
      '/assets/aistudio/Professionals_discussing_financi__20261026001243__1__a33fe2c9.jpg',
    heroImageAlt:
      'Senior professionals reviewing financial forecasts and business plans around a modern executive boardroom table',
    overviewHeading:
      'Strategic Financial Insight Without a Full-Time Appointment.',
    overviewParagraphs: [
      'Growing businesses often need a clearer financial perspective as decisions become more complex. Balentra provides advisory and analysis support focused on budgeting, cash flow planning, profitability, and agreed financial performance measures.',
      'Working alongside founders and leadership teams, we help translate operational goals into structured financial models, scenario comparisons, and disciplined review cadences—providing practical planning support without the overhead of a full-time executive hire.',
    ],
    deliverables: [
      {
        number: '01',
        title: 'Budgeting & Forecasting',
        description:
          'Structured financial plans, assumptions, and forecasts.',
      },
      {
        number: '02',
        title: 'Cash Flow Planning',
        description:
          'Reviewing relevant cash flow expectations and planning scenarios.',
      },
      {
        number: '03',
        title: 'Financial Performance Analysis',
        description:
          'Reviewing margins, trends, and relevant financial indicators.',
      },
      {
        number: '04',
        title: 'Management Decision Support',
        description:
          'Preparing financial information and analysis for business planning discussions.',
      },
    ],
    showcaseEyebrow: 'FINANCIAL ADVISORY',
    showcaseHeading: 'Make the Next Decision With Greater Clarity.',
    showcaseDescription:
      'Forward-looking budgeting, scenario analysis, and commercial evaluation designed to support leadership planning.',
    showcaseImage:
      '/assets/aistudio/Desk_with_payroll_documents_and_20261026001248_11zon_16cb4757.jpg',
    showcaseImageAlt:
      'Executive advisory session with leadership team discussing financial models and performance',
    showcaseTabs: {
      PROCESS: {
        summary: 'Financial discovery and business planning priorities.',
        detail:
          'We begin by examining your historical financial performance, revenue drivers, cost structure, and upcoming operational milestones.',
        highlights: [
          'Evaluation of revenue streams, gross margins, and operating costs',
          'Identification of key commercial assumptions and cash flow drivers',
          'Alignment on planning horizons and decision-making priorities',
        ],
      },
      DELIVERABLES: {
        summary: 'Forecasts, financial analyses, and management insights.',
        detail:
          'Receive structured models and clear analytical summaries that help you weigh hiring, pricing, or operational commitments.',
        highlights: [
          'Operating budgets and rolling financial forecasts',
          'Cash flow projections and scenario sensitivity comparisons',
          'Unit economics, margin, and KPI performance evaluations',
        ],
      },
      SUPPORT: {
        summary: 'Agreed recurring advisory and financial review sessions.',
        detail:
          'We meet on an agreed cadence to review actual performance against plan, update forecast assumptions, and prepare analysis for upcoming decisions.',
        highlights: [
          'Scheduled monthly or quarterly financial review discussions',
          'Ongoing updates to forecasts as business conditions change',
          'Preparation of financial materials for internal leadership meetings',
        ],
      },
    },
    howWeWorkSteps: [
      {
        number: '01',
        title: 'Understand',
        description:
          'Review your business objectives, historical financial results, commercial drivers, and the agreed scope of advisory support.',
      },
      {
        number: '02',
        title: 'Set Up',
        description:
          'Organize budgeting frameworks, cash flow forecasting models, KPI definitions, and regular management review schedules.',
      },
      {
        number: '03',
        title: 'Support',
        description:
          'Deliver recurring forecast updates, performance analysis, scenario modeling, and structured financial review sessions.',
      },
    ],
    whoItsForHeading: 'Who This Service Is For.',
    whoItsForIntro:
      'Structured for leaders who want disciplined financial planning and analysis to guide operational growth.',
    whoItsForItems: [
      {
        number: '01',
        title: 'Founders',
        description:
          'Entrepreneurs seeking structured financial models and cash flow clarity when evaluating hiring or expansion plans.',
      },
      {
        number: '02',
        title: 'Scaling Startups',
        description:
          'Growing ventures that need disciplined budgeting, runway tracking, and unit-economics visibility.',
      },
      {
        number: '03',
        title: 'Business Owners',
        description:
          'Owner-managed companies looking to better understand service-line profitability, pricing, and working capital cycles.',
      },
      {
        number: '04',
        title: 'Leadership Teams',
        description:
          'Management groups requiring objective financial analysis and scenario planning for strategic discussions.',
      },
    ],
    faqs: [
      {
        id: 'cfo-01',
        question: 'What is a fractional CFO service?',
        answer:
          'A fractional CFO service provides part-time, flexible financial planning and analytical support—helping businesses with budgeting, cash flow forecasting, margin analysis, and operational decision-making without hiring a full-time executive. It focuses on internal commercial and financial management rather than regulated investment advice.',
      },
      {
        id: 'cfo-02',
        question:
          'How is fractional CFO support different from bookkeeping?',
        answer:
          'Bookkeeping focuses on accurately recording and reconciling historical transactions, whereas fractional CFO and advisory support uses that financial foundation to look forward—building budgets, modeling cash flow scenarios, and analyzing business performance.',
      },
      {
        id: 'cfo-03',
        question:
          'Can Balentra assist with budgeting and forecasting?',
        answer:
          'Yes. We work with your leadership team to build structured annual budgets and rolling forecasts, and we compare actual results against those plans each period.',
      },
      {
        id: 'cfo-04',
        question: 'How frequently can advisory sessions take place?',
        answer:
          'Advisory sessions are arranged around your planning needs—typically on a monthly or quarterly basis, with additional support scheduled around key budgeting or operational planning periods.',
      },
    ],
    ctaHeading: 'Plan Your Next Stage With Confidence.',
    ctaDescription:
      'Discuss how structured budgeting, forecasting, and financial analysis can support your upcoming business decisions.',
  },

  'cloud-accounting': {
    slug: 'cloud-accounting',
    route: '/services/cloud-accounting',
    number: '06',
    eyebrow: 'SERVICE 06 / 06',
    navLabel: 'Cloud Accounting & Finance Systems',
    breadcrumbLabel: 'Cloud Accounting & Finance Systems',
    metaTitle: 'Cloud Accounting & Finance Systems | Balentra Accounting',
    metaDescription:
      'Cloud accounting setup and practical workflow improvements to help businesses organize financial data and reduce unnecessary manual processes.',
    h1: 'Smarter Systems.\nClearer Financial Workflows.',
    heroDescription:
      'Cloud accounting setup and practical workflow improvements to help businesses organize financial data and reduce unnecessary manual processes.',
    heroImage:
      '/assets/aistudio/Team_collaborating_around_confer__20261026000222__1__1344684c.jpg',
    heroImageAlt:
      'Minimal premium digital finance office with modern laptop, financial software interface, and clean architectural surroundings',
    overviewHeading: 'Build a More Connected Finance Function.',
    overviewParagraphs: [
      'Modern accounting systems can make financial information easier to organize and access when configured around real business requirements. Balentra supports suitable system setup, data organization, and finance workflow improvements.',
      'Whether your business is moving away from manual spreadsheets or refining an existing cloud accounting environment, we help structure charts of accounts, streamline document capture, and establish clear operational routines for your team.',
    ],
    deliverables: [
      {
        number: '01',
        title: 'Accounting System Setup',
        description:
          'Initial configuration of suitable accounting platforms.',
      },
      {
        number: '02',
        title: 'Data Migration Support',
        description:
          'Assistance organizing and transferring relevant financial records.',
      },
      {
        number: '03',
        title: 'Workflow Improvements',
        description:
          'Identifying opportunities to streamline recurring accounting activities.',
      },
      {
        number: '04',
        title: 'System Guidance & Training',
        description:
          'Practical guidance for approved financial workflows and day-to-day use.',
      },
    ],
    showcaseEyebrow: 'SYSTEMS & WORKFLOWS',
    showcaseHeading: 'Modern Tools. More Organized Finances.',
    showcaseDescription:
      'Practical configuration of cloud accounting tools and financial workflows that reduce repetitive manual administration.',
    showcaseImage:
      '/assets/aistudio/Desk_with_payroll_documents_and_20261026001248_11zon_16cb4757.jpg',
    showcaseImageAlt:
      'Modern connected corporate environment representing digital finance systems',
    showcaseTabs: {
      PROCESS: {
        summary: 'Reviewing systems, data, and process requirements.',
        detail:
          'We evaluate how financial information currently enters and moves through your business to identify bottlenecks and configuration gaps.',
        highlights: [
          'Assessment of current spreadsheets, ledgers, and billing tools',
          'Review of chart-of-accounts structure and reporting requirements',
          'Planning for clean historical balance transfer and cutover dates',
        ],
      },
      DELIVERABLES: {
        summary: 'Configurations, organized data, and improved workflows.',
        detail:
          'Your accounting platform is structured around your actual operations with clean opening balances and documented day-to-day procedures.',
        highlights: [
          'Configured chart of accounts, tax rates, and bank feed connections',
          'Organized migration of relevant historical balances and contacts',
          'Streamlined workflows for invoicing, receipt capture, and reconciliations',
        ],
      },
      SUPPORT: {
        summary:
          'Practical system guidance and agreed ongoing assistance.',
        detail:
          'We provide clear walkthroughs for your team and ongoing support so your staff can use the configured workflows confidently.',
        highlights: [
          'Role-focused guidance for staff handling billing or expense capture',
          'Post-setup review to verify transactions are mapping accurately',
          'Ongoing workflow adjustments as your business processes evolve',
        ],
      },
    },
    howWeWorkSteps: [
      {
        number: '01',
        title: 'Understand',
        description:
          'Review your existing accounting tools, data structure, operational workflows, and the agreed scope of system support.',
      },
      {
        number: '02',
        title: 'Set Up',
        description:
          'Configure the accounting platform settings, chart of accounts, opening balances, and connected document workflows.',
      },
      {
        number: '03',
        title: 'Support',
        description:
          'Provide practical team guidance, post-migration verification, and ongoing workflow assistance within the agreed scope.',
      },
    ],
    whoItsForHeading: 'Who This Service Is For.',
    whoItsForIntro:
      'Ideal for companies transitioning to cloud accounting or seeking cleaner digital workflows across their finance operations.',
    whoItsForItems: [
      {
        number: '01',
        title: 'Digital Businesses',
        description:
          'Online and remote-first companies that want connected digital workflows for billing, expenses, and reporting.',
      },
      {
        number: '02',
        title: 'Startups',
        description:
          'Early-stage teams moving off manual spreadsheets into a properly structured cloud accounting system.',
      },
      {
        number: '03',
        title: 'E-commerce Companies',
        description:
          'Merchants organizing sales channel data, payment gateways, and inventory-related accounting records.',
      },
      {
        number: '04',
        title: 'Growing SMEs',
        description:
          'Established businesses refining their existing accounting software setup to reduce manual data entry.',
      },
    ],
    faqs: [
      {
        id: 'ca-01',
        question: 'Can Balentra work with our existing accounting system?',
        answer:
          'Yes. In many cases, businesses do not need to switch platforms—we can review your current cloud accounting setup, reorganize the chart of accounts, and improve how recurring transactions and documents are handled.',
      },
      {
        id: 'ca-02',
        question:
          'Can you assist with moving records to a new platform?',
        answer:
          'Yes. We assist with preparing opening trial balances, organizing customer and supplier lists, and transferring relevant historical financial records to your chosen platform at an agreed cutover date.',
      },
      {
        id: 'ca-03',
        question: 'Do you provide accounting software training?',
        answer:
          'Yes. We provide practical, workflow-specific guidance for your team covering everyday tasks such as raising invoices, submitting expense receipts, and reviewing standard reports.',
      },
      {
        id: 'ca-04',
        question:
          'Can financial workflows be improved without replacing our existing software?',
        answer:
          'Often, yes. Adjusting account mappings, standardizing document collection, and refining bank reconciliation rules within your existing software can significantly reduce manual effort without a full system replacement.',
      },
    ],
    ctaHeading: "Let's Improve Your Accounting Systems.",
    ctaDescription:
      'Speak with Balentra about setting up or refining your cloud accounting platform and everyday financial workflows.',
  },
};

export const SERVICE_DETAILS_LIST: ServiceDetailConfig[] = [
  SERVICE_DETAILS_BY_SLUG['bookkeeping-accounting'],
  SERVICE_DETAILS_BY_SLUG['financial-reporting'],
  SERVICE_DETAILS_BY_SLUG['payroll'],
  SERVICE_DETAILS_BY_SLUG['accounts-payable-receivable'],
  SERVICE_DETAILS_BY_SLUG['fractional-cfo'],
  SERVICE_DETAILS_BY_SLUG['cloud-accounting'],
];

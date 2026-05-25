import { TimelineEvent, MetricCardData, TeamWiseJoiner, TeamWiseDecline, ProjectInitiative, AchievementItem } from './types';

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    role: "Executive – Talent Acquisition",
    company: "Jar",
    duration: "Aug 2025 – Present",
    type: "fulltime",
    location: "Bengaluru, India",
    description: [],
    skills: ["Tech Sourcing", "Competency Mapping", "Recruitment Strategy", "Campus Hiring", "Stakeholder Syncs"]
  },
  {
    role: "TA Intern",
    company: "Jar",
    duration: "Mar 2025 – Aug 2025",
    type: "intern",
    location: "Bengaluru, India",
    description: [],
    skills: ["Talent Sourcing", "Candidate Experience", "ATS Management", "LinkedIn Recruiter"]
  },
  {
    role: "HR Intern",
    company: "Zepto",
    duration: "Sep 2024 – Mar 2025",
    type: "intern",
    location: "Mumbai, India",
    description: [],
    skills: ["Onboarding Coordination", "Interview Coordination", "ATS Management", "IT Sourcing"]
  }
];

export const METRICS_DATA: {
  overall: MetricCardData[];
  intern: MetricCardData[];
  fulltime: MetricCardData[];
} = {
  overall: [
    { label: "Total Offers Rolled Out", value: 51, subtext: "Active campaigns", color: "bg-emerald-50/70", stripeColor: "border-emerald-500", type: "overall" },
    { label: "Total Joiners", value: 44, subtext: "Welcomed onboard", color: "bg-teal-50/70", stripeColor: "border-teal-500", type: "overall" },
    { label: "Total Declines", value: 7, subtext: "13.73% decline rate", color: "bg-rose-50/70", stripeColor: "border-rose-300", type: "overall" },
    { label: "Overall Offer to Joiner", value: "86.27%", subtext: "Industry-leading conversions", color: "bg-indigo-50/70", stripeColor: "border-indigo-400", type: "overall" }
  ],
  intern: [
    { label: "Intern Offered", value: 20, subtext: "Sourced prospects", color: "bg-amber-50/60", stripeColor: "border-amber-400", type: "intern" },
    { label: "Total Intern Joiner", value: 19, subtext: "Joined cohort", color: "bg-emerald-50/60", stripeColor: "border-emerald-400", type: "intern" },
    { label: "Intern Decline", value: 1, subtext: "Minimal dropout rate", color: "bg-rose-50/60", stripeColor: "border-rose-300", type: "intern" },
    { label: "Conversion to Full-Time", value: 10, subtext: "High perf conversions", color: "bg-yellow-50/60", stripeColor: "border-yellow-400", type: "intern" },
    { label: "Offer to Joiner - Intern", value: "95.00%", subtext: "95% onboarding success", color: "bg-violet-50/60", stripeColor: "border-violet-300", type: "intern" }
  ],
  fulltime: [
    { label: "Full-Time Offered", value: 31, subtext: "Core team mandates", color: "bg-amber-50/60", stripeColor: "border-amber-400", type: "fulltime" },
    { label: "Total Fulltime Joiner", value: 25, subtext: "Deployed on active units", color: "bg-emerald-50/60", stripeColor: "border-emerald-400", type: "fulltime" },
    { label: "Fulltime Decline", value: 6, subtext: "19.35% dropout rate", color: "bg-rose-50/60", stripeColor: "border-rose-300", type: "fulltime" },
    { label: "Offer to Joiner - Full Time", value: "80.65%", subtext: "Exceeds market benchmark", color: "bg-violet-50/60", stripeColor: "border-violet-300", type: "fulltime" }
  ]
};

export const TEAM_WISE_JOINER: TeamWiseJoiner[] = [
  { team: "CS", fulltimeJoiner: 5, internJoiner: 9, totalJoiner: 14 },
  { team: "Engineering", fulltimeJoiner: 9, internJoiner: 0, totalJoiner: 9 },
  { team: "Marketing", fulltimeJoiner: 2, internJoiner: 4, totalJoiner: 6 },
  { team: "Growth", fulltimeJoiner: 3, internJoiner: 2, totalJoiner: 5 },
  { team: "Data", fulltimeJoiner: 2, internJoiner: 0, totalJoiner: 2 },
  { team: "Design", fulltimeJoiner: 1, internJoiner: 1, totalJoiner: 2 },
  { team: "HR", fulltimeJoiner: 0, internJoiner: 2, totalJoiner: 2 },
  { team: "Performance Marketing", fulltimeJoiner: 1, internJoiner: 1, totalJoiner: 2 },
  { team: "Compliance", fulltimeJoiner: 1, internJoiner: 0, totalJoiner: 1 },
  { team: "Product", fulltimeJoiner: 1, internJoiner: 0, totalJoiner: 1 }
];

export const TEAM_WISE_DECLINE: TeamWiseDecline[] = [
  { team: "Product", fulltimeDecline: 3, internDecline: 0, totalDecline: 3 },
  { team: "Engineering", fulltimeDecline: 2, internDecline: 0, totalDecline: 2 },
  { team: "Growth", fulltimeDecline: 1, internDecline: 0, totalDecline: 1 },
  { team: "CS", fulltimeDecline: 0, internDecline: 1, totalDecline: 1 },
  { team: "Marketing", fulltimeDecline: 0, internDecline: 0, totalDecline: 0 },
  { team: "Data", fulltimeDecline: 0, internDecline: 0, totalDecline: 0 },
  { team: "Design", fulltimeDecline: 0, internDecline: 0, totalDecline: 0 },
  { team: "HR", fulltimeDecline: 0, internDecline: 0, totalDecline: 0 },
  { team: "Performance Marketing", fulltimeDecline: 0, internDecline: 0, totalDecline: 0 },
  { team: "Compliance", fulltimeDecline: 0, internDecline: 0, totalDecline: 0 }
];

export const GENDER_DEMOGRAPHIC = [
  { name: "Male", count: 28, percentage: "54.9%", color: "#2563eb", bg: "bg-blue-500/20" },
  { name: "Female", count: 23, percentage: "45.1%", color: "#db2777", bg: "bg-pink-500/20" }
];

export const EXPERIENCE_YEARS = [
  { term: "0 - 2 Year", count: 34, percentage: "66.7%", color: "#f97316" },
  { term: "3 - 5 Year", count: 16, percentage: "31.3%", color: "#a855f7" },
  { term: "6+ Year", count: 1, percentage: "2.0%", color: "#22c55e" }
];

export const GRADE_DISTRIBUTION = [
  { level: "I1", count: 0, label: "Entry Intern" },
  { level: "E1", count: 19, label: "Junior / Associate" },
  { level: "L1", count: 1, label: "Lead / Specialist" },
  { level: "E3", count: 2, label: "Senior Engineer" },
  { level: "E2", count: 2, label: "Mid-level Engineer" }
];

export const SKILL_CATEGORIES = [
  {
    category: "Technical & Core Sourcing",
    skills: ["Tech Hiring", "Talent Sourcing", "LinkedIn Recruiter", "Instahyre", "Naukri", "Candidate Screening"]
  },
  {
    category: "Recruitment Strategy",
    skills: ["Campus Hiring", "Recruitment Strategy", "Competency Mapping", "Employer Branding", "Stakeholder Management"]
  },
  {
    category: "Operations & Tools",
    skills: ["ATS Management", "Onboarding Coordination", "Data-Driven Hiring", "Hiring Analytics", "Looker Studio"]
  }
];

export const PROJECTS_DATA: ProjectInitiative[] = [
  {
    title: "Internal Benchmarking Dashboard (Live – Looker Studio)",
    category: "Talent Analytics & BI",
    outcome: "Built a centralised dashboard to provide visibility into internal compensation benchmarking across teams, pods, grades, and employment categories. Enabled HR and leadership to make structured, transparent, and data-driven compensation and hiring decisions.",
    details: [
      "Aggregated compensation benchmarks across specific domains, grades, and departments.",
      "Established full visual transparency to empower leadership during headcount scaling and salary review cycles.",
      "Provided robust, real-time filters to slice compensation data dynamically."
    ],
    tags: ["Looker Studio", "Compensation Benchmarking", "Talent Analytics"]
  },
  {
    title: "Integrated External Benchmarking System",
    category: "Market Intelligence & Strategy",
    outcome: "Enhanced the internal benchmarking dashboard by integrating external benchmarking data, enabling a more comprehensive and market-aligned view for compensation and hiring strategy decisions.",
    details: [
      "Merged industry compensation brackets dynamically to cross-reference market data.",
      "Provided recruitment managers with precise competitive insights to combat offer dropouts.",
      "Ensured proactive adjustments based on fluctuating premium tech talent compensation bands."
    ],
    tags: ["Market Intelligence", "System Integration", "Strategy Alignment"]
  },
  {
    title: "Automated Buddy Introduction Emails (Google Apps Script)",
    category: "Employee Experience & Automation",
    outcome: "Developed an automated email system for new joiners to streamline buddy introductions, reduce manual errors, and improve onboarding efficiency while saving team effort and time.",
    details: [
      "Engineered reliable notification automation using Google Apps Script and custom email styling.",
      "Secured immediate alignment between matching onboarding buddies and incoming talent.",
      "Dramatically reduced setup timelines and eliminated onboarding delays without manual interventions."
    ],
    tags: ["Google Apps Script", "Process Automation", "Onboarding Excellence"]
  },
  {
    title: "Knowledge Sharing Initiative (TA & HR Team)",
    category: "Team Enablement & Sourcing Mastery",
    outcome: "Led bi-monthly knowledge-sharing sessions where HR team members presented new topics and ideas, followed by feedback discussions to encourage continuous learning. Personally delivered a session on LinkedIn Algorithm and Talent Visibility Strategies.",
    details: [
      "Fostered professional development and standard core sourcing competency training.",
      "Designed curriculum guidelines covering LinkedIn boolean strings, profile indexing, and search parameters.",
      "Created a shared repository of training frameworks to upskill early-career sourcers."
    ],
    tags: ["Knowledge Sharing", "LinkedIn Algorithm", "Sourcing Strategies"]
  },
  {
    title: "Growth Hiring Program (Ongoing)",
    category: "High-Volume Scaling",
    outcome: "Currently working on designing and executing a Growth hiring program aimed at building a streamlined, high-volume hiring model for growth-focused roles, enabling faster and more efficient talent acquisition compared to traditional hiring processes.",
    details: [
      "Architecting highly scalable, programmatic candidate pipelines to compress time-to-hire metrics.",
      "Creating reusable interview structures tailored to growth-focused competencies.",
      "Optimizing sourcing pathways to ensure continuous talent flow for fast-scaling company branches."
    ],
    tags: ["Growth Program", "High-Volume Recruiting", "Agile Sourcing"]
  }
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    metric: "75% - 85%",
    label: "Hiring Target Achievement",
    description: "Consistently hit and exceeded targeted headcount plans quarterly, scaling teams in high-pace environments.",
    tag: "Operational Scale"
  },
  {
    metric: "35% Increment",
    label: "Candidate Quality Rating",
    description: "Boosted the percentage of screened applicants successfully passing deep hiring manager rounds.",
    tag: "Competency Sourcing"
  },
  {
    metric: "Multitude",
    label: "Cross-Functional Fulfillments",
    description: "Closed demanding mandates spanning Tech, Product, Design, as well as complex Leadership layers.",
    tag: "Versatility"
  },
  {
    metric: "95% Conversion Ratio",
    label: "Onboarding Cohort Strength",
    description: "Achieved nearly flawless transition rates from offer letters to successfully onboarded cohort group members.",
    tag: "Onboarding Care"
  }
];

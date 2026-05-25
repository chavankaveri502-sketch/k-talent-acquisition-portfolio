export interface TimelineEvent {
  role: string;
  company: string;
  duration: string;
  type: 'intern' | 'fulltime';
  location: string;
  description: string[];
  skills: string[];
}

export interface MetricCardData {
  label: string;
  value: string | number;
  subtext: string;
  color: string; // Tailwind bg color class
  stripeColor: string; // Accent color
  type: 'intern' | 'fulltime' | 'overall';
}

export interface TeamWiseJoiner {
  team: string;
  fulltimeJoiner: number;
  internJoiner: number;
  totalJoiner: number;
}

export interface TeamWiseDecline {
  team: string;
  fulltimeDecline: number;
  internDecline: number;
  totalDecline: number;
}

export interface ProjectInitiative {
  title: string;
  category: string;
  outcome: string;
  impactMetric?: string;
  details: string[];
  tags: string[];
}

export interface AchievementItem {
  metric: string;
  label: string;
  description: string;
  tag: string;
}

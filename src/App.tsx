import React, { useState, useRef } from 'react';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import AnalyticsHub from './components/AnalyticsHub';
import ExecutiveSummary from './components/ExecutiveSummary';
import ResumeModal from './components/ResumeModal';
import { 
  Presentation, 
  BarChart4, 
  Sparkles,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation active state: 'all' (continuous deck) or 'analytics' (deep dive metrics)
  const [activeTab, setActiveTab] = useState<'all' | 'analytics'>('all');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  
  // Create refs for smooth scrolls
  const profileRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    setActiveTab('all');
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const navItems = [
    { label: 'Profile', ref: profileRef },
    { label: 'Timeline', ref: timelineRef },
    { label: 'Analytics', ref: analyticsRef },
  ];

  return (
    <div className="min-h-screen bg-editorial-bg text-[#2C332D] selection:bg-editorial-chip-bg selection:text-editorial-forest antialiased">
      
      {/* Top Professional Navigation Header */}
      <nav className="sticky top-0 z-50 bg-editorial-bg/85 backdrop-blur-md border-b border-editorial-border px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Logo / Title Area */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollToSection(profileRef)}>
            <div className="w-8 h-8 rounded bg-editorial-forest flex items-center justify-center font-display font-extrabold text-[#F9FAF8] text-sm shadow-3xs">
              KC
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-editorial-primary font-sans">
                Kaveri Chavan
              </p>
            </div>
          </div>

          {/* Sub Navigation Anchor Toggles */}
          <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
            
            {/* View selectors */}
            <div className="inline-flex p-0.5 rounded-xl bg-editorial-accent-bg border border-editorial-border text-xs font-semibold mr-2">
              <button 
                onClick={() => setActiveTab('all')}
                className={`flex items-center gap-1.5 py-1 px-3 rounded-lg text-xs tracking-wider uppercase transition-all ${
                  activeTab === 'all' 
                    ? 'bg-white text-editorial-primary shadow-3xs border border-editorial-border/60' 
                    : 'text-stone-500 hover:text-editorial-primary'
                }`}
              >
                <Presentation className="w-3.5 h-3.5 text-editorial-sage" />
                <span className="hidden sm:inline font-sans">Full Portfolio</span>
                <span className="sm:hidden font-sans">Portfolio</span>
              </button>
              <button 
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center gap-1.5 py-1 px-3 rounded-lg text-xs tracking-wider uppercase transition-all ${
                  activeTab === 'analytics' 
                    ? 'bg-editorial-forest text-white shadow-3xs' 
                    : 'text-stone-500 hover:text-editorial-forest'
                }`}
              >
                <BarChart4 className="w-3.5 h-3.5" />
                <span className="font-sans">Sourcing Analytics</span>
              </button>
            </div>

            {/* Resume activation button */}
            <button
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl text-xs font-bold bg-[#FFF0F4] hover:bg-[#FCA7BB]/15 text-[#7D5FA5] hover:text-[#5B4181] border border-[#EADBFC] transition-all cursor-pointer shadow-3xs font-sans uppercase tracking-wider"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* Quick-anchors when in Presentation View */}
            {activeTab === 'all' && (
              <div className="hidden lg:flex items-center gap-1 border-l border-editorial-border pl-3">
                {navItems.map((item, id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(item.ref)}
                    className="text-xs px-2.5 py-1.5 hover:bg-editorial-accent-bg rounded-lg text-[#5C635E] hover:text-editorial-primary font-medium transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

          </div>

        </div>
      </nav>



      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
        
        {/* Dynamic Views Rendering */}
        <AnimatePresence mode="wait">
          {activeTab === 'all' ? (
            <motion.div
              key="deck"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-12"
            >
              {/* Profile Hero section */}
              <div ref={profileRef} className="scroll-mt-24">
                <HeroSection 
                  onNavigateToAnalytics={() => setActiveTab('analytics')} 
                  onOpenResume={() => setIsResumeOpen(true)}
                />
              </div>

              {/* Career Timeline Section */}
              <div ref={timelineRef} className="scroll-mt-24 pt-4">
                <TimelineSection />
              </div>

              {/* Recruitment Database Replica embedded smoothly */}
              <div ref={analyticsRef} className="scroll-mt-24 pt-4">
                <div className="bg-editorial-accent-bg p-1.5 rounded-full border border-editorial-border inline-flex items-center gap-2 mb-4 text-xs text-editorial-forest font-medium pl-3 pr-2.5 shadow-3xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-editorial-sage block animate-ping" />
                  <span>Interactive Sourcing DB Replica Included Below</span>
                </div>
                <AnalyticsHub />
              </div>

              {/* Executive closing block */}
              <div className="pt-4">
                <ExecutiveSummary />
              </div>

            </motion.div>
          ) : (
            <motion.div
              key="standalone-database"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Back breadcrumb */}
              <button 
                onClick={() => setActiveTab('all')}
                className="inline-flex items-center gap-1.5 text-xs text-editorial-forest hover:text-editorial-primary group font-mono"
              >
                <span>← Return to Full Portfolio Showcase</span>
              </button>

              <div className="bg-white rounded-3xl border border-editorial-border p-1 shadow-3xs">
                <AnalyticsHub />
              </div>

              {/* Embedded Skills Quickbar */}
              <div className="bg-white border border-editorial-border rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#5C635E] leading-relaxed max-w-xl font-sans">
                  The recruitment metrics above demonstrate execution of core skills: <strong className="text-editorial-forest">Tech Hiring Sourcing</strong>, <strong className="text-editorial-forest">ATS Coordination</strong>, <strong className="text-editorial-forest">Candidate Experience Optimizations</strong>, and <strong className="text-editorial-forest">Budget Management Systems</strong>.
                </p>
                <button 
                  onClick={() => setActiveTab('all')}
                  className="px-4 py-2 bg-editorial-forest hover:bg-[#19241B] text-white rounded-xl text-xs font-semibold tracking-wide transition-colors shrink-0 font-sans uppercase font-xs tracking-wider"
                >
                  Explore Portfolio Showcase
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Professional Footer copyright coordinates */}
      <footer className="border-t border-[#EADBFC] py-10 px-4 md:px-8 bg-[#F4EBFC] mt-16 text-center text-xs text-stone-500 font-mono">
        <div className="max-w-7xl mx-auto space-y-2">
          <p>© 2026 Kaveri Chavan. Talent Acquisition Portfolio.</p>
        </div>
      </footer>

      {/* Interactive Resume View popup */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

    </div>
  );
}

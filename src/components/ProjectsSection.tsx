import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data';
import { ProjectInitiative } from '../types';
import { 
  BarChart3, 
  Workflow, 
  Mail, 
  Users, 
  TrendingUp, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  // Extract all unique categories
  const categories = ['All', ...Array.from(new Set(PROJECTS_DATA.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  const getIcon = (category: string) => {
    switch(category) {
      case 'Talent Analytics & BI':
        return <BarChart3 className="w-5 h-5 text-indigo-500" />;
      case 'Market Intelligence & Strategy':
        return <Layers className="w-5 h-5 text-emerald-500" />;
      case 'Employee Experience & Automation':
        return <Mail className="w-5 h-5 text-amber-500" />;
      case 'Team Enablement & Sourcing Mastery':
        return <Users className="w-5 h-5 text-indigo-500" />;
      case 'Growth Program':
        return <TrendingUp className="w-5 h-5 text-rose-500" />;
      default:
        return <Workflow className="w-5 h-5 text-stone-500" />;
    }
  };

  const toggleExpand = (title: string) => {
    if (expandedProject === title) {
      setExpandedProject(null);
    } else {
      setExpandedProject(title);
    }
  };

  return (
    <section id="projects-section" className="space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6FD] text-[#7D5FA5] text-[10px] font-semibold uppercase tracking-wider border border-[#EADBFC] shadow-3xs">
          <Workflow className="w-3.5 h-3.5" />
          <span>INNOVATIONS & SYSTEMS</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-editorial-primary font-sans">
          Key Projects & Initiatives
        </h2>
        <p className="text-stone-500 text-sm max-w-2xl font-sans leading-relaxed">
          Custom automations, data dashboards, and recruiting workflows designed to streamline talent operations and support strategic hiring.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-1.5 border-b border-editorial-border pb-4">
        {categories.map((category) => (
          <button
            key={category}
            id={`filter-${category.replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              selectedCategory === category
                ? 'bg-editorial-forest text-[#F9FAF8] shadow-3xs'
                : 'bg-white hover:bg-stone-50 text-stone-600 border border-editorial-border'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, idx) => {
          const isExpanded = expandedProject === project.title;
          return (
            <motion.div
              layout
              key={project.title}
              id={`project-card-${idx}`}
              className="bg-white border border-editorial-border hover:border-[#EADBFC]/80 rounded-2xl p-5 md:p-6 transition-all duration-350 shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_8px_30px_rgba(125,95,165,0.035)] flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header with Icon and Category */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-stone-400 font-semibold">
                    {project.category}
                  </span>
                  <div className="p-2 bg-stone-50 rounded-xl border border-stone-100">
                    {getIcon(project.category)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-stone-900 font-sans tracking-tight leading-snug">
                  {project.title}
                </h3>

                {/* Outcome Statement */}
                <p className="text-stone-600 text-[13px] leading-relaxed font-sans">
                  {project.outcome}
                </p>

                {/* Expandable Details Block */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-stone-100 mt-4 space-y-3">
                        <h4 className="text-[10px] font-mono tracking-wider uppercase text-[#7D5FA5] font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Implementation Details</span>
                        </h4>
                        <ul className="space-y-2">
                          {project.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2 text-stone-600 text-[12px] font-sans leading-relaxed">
                              <CheckCircle2 className="w-4 h-4 text-editorial-sage shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tags and Action Bar */}
              <div className="pt-5 border-t border-stone-100/60 mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-[10px] bg-stone-50 text-stone-500 border border-stone-100 rounded-md px-2 py-0.5 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  id={`btn-expand-${idx}`}
                  onClick={() => toggleExpand(project.title)}
                  className="flex items-center justify-center gap-1 py-1 px-2.5 rounded-lg border border-editorial-border text-[11px] font-semibold text-stone-500 hover:text-[#7D5FA5] hover:border-[#EADBFC] transition-colors bg-white hover:bg-[#FAF6FD] cursor-pointer"
                >
                  <span>{isExpanded ? 'Show Less' : 'View Details'}</span>
                  {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data';
import { FolderDot, BadgeCheck, CheckCircle2, Activity, Cpu } from 'lucide-react';

export default function ProjectsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      
      {/* Header coordinates */}
      <div className="border-b border-editorial-border pb-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-editorial-sage font-semibold mb-1">Strategic Initiatives</h3>
          <h2 className="text-3xl font-light text-editorial-primary tracking-tight font-sans">
            Key Projects & Operational Initiatives
          </h2>
          <p className="text-sm text-[#5C635E] font-sans mt-0.5">
            Driving operational excellence through automation, collaboration, and data insights.
          </p>
        </div>
      </div>

      {/* Grid of initiative cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PROJECTS_DATA.map((proj, idx) => {
          const isLookerDashboard = proj.title.includes("Looker Studio");
          const isBuddyAuto = proj.title.includes("Automated Buddy");
          
          return (
            <div 
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`group relative rounded-2xl p-6 bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_2px_12px_rgba(107,142,103,0.02)] ${
                hoveredIdx === idx 
                  ? 'border-editorial-sage/35 shadow-sm' 
                  : 'border-editorial-border'
              }`}
            >
              {/* Highlight background accent for key dashboards/automation */}
              {(isLookerDashboard || isBuddyAuto) && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-editorial-accent-bg/40 rounded-full blur-2xl pointer-events-none transition-all" />
              )}

              <div className="space-y-4 relative z-10">
                {/* Header info */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-editorial-forest bg-editorial-chip-bg px-2 py-0.5 rounded font-semibold">
                      {proj.category}
                    </span>
                    <h3 className="text-lg font-light tracking-tight text-editorial-primary group-hover:text-editorial-forest transition-colors pt-1 font-sans">
                      {proj.title}
                    </h3>
                  </div>
                  
                  {/* Decorative icon according to project style */}
                  <div className="p-2.5 rounded-xl border bg-editorial-accent-bg border-editorial-border text-editorial-forest">
                    {isLookerDashboard && <Activity className="w-5 h-5 text-editorial-sage" />}
                    {isBuddyAuto && <Cpu className="w-5 h-5 text-editorial-sage" />}
                    {!isLookerDashboard && !isBuddyAuto && <FolderDot className="w-5 h-5 text-editorial-sage" />}
                  </div>
                </div>

                {/* Scope outcome statement */}
                <p className="text-[#4A504B] text-sm leading-relaxed font-sans">
                  {proj.outcome}
                </p>

                {/* Core impact box */}
                {proj.impactMetric && (
                  <div className="p-3 rounded-xl bg-editorial-accent-bg/60 border border-editorial-border space-y-1">
                    <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#8A958D] block">Demonstrated Return & Impact Value:</span>
                    <p className="text-xs text-editorial-forest font-sans font-semibold flex items-center gap-1.5 leading-relaxed">
                      <BadgeCheck className="w-4 h-4 text-editorial-sage shrink-0" />
                      <span>{proj.impactMetric}</span>
                    </p>
                  </div>
                )}

                {/* Sub-details list */}
                <div className="space-y-2 pt-1 font-sans">
                  <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#8A958D] block">Actions Taken / Scope:</span>
                  <ul className="space-y-2">
                    {proj.details.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-1.5 text-xs text-[#4A504B] leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-editorial-sage/40 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tag capsules */}
              <div className="pt-4 flex flex-wrap gap-1.5 border-t border-editorial-border/60 mt-5">
                {proj.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="text-[10px] font-mono px-2 py-0.5 bg-editorial-chip-bg text-editorial-forest rounded font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

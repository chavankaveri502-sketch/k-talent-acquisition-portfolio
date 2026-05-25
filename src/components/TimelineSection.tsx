import React from 'react';
import { TIMELINE_DATA } from '../data';
import { Calendar, MapPin } from 'lucide-react';

export default function TimelineSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-editorial-border pb-4">
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-editorial-sage font-semibold mb-1">Career Journey</h3>
          <h2 className="text-3xl font-light text-editorial-primary tracking-tight font-sans">
            Professional Experience
          </h2>
          <p className="text-sm text-[#5C635E] font-sans mt-0.5">
            A dynamic progression of roles across fast-scaling tech companies.
          </p>
        </div>
      </div>

      <div className="relative pl-6 md:pl-10 space-y-6 before:absolute before:left-[11px] md:before:left-[19px] before:top-4 before:bottom-4 before:w-[1px] before:bg-editorial-border">
        
        {TIMELINE_DATA.map((event, idx) => {
          const isJar = event.company === 'Jar';
          
          return (
            <div 
              key={idx} 
              className="relative group pr-1"
            >
              {/* Connector Pin */}
              <div 
                className="absolute -left-[30px] md:-left-[43px] top-6 w-6 h-6 md:w-[28px] md:h-[28px] rounded-full border flex items-center justify-center transition-all bg-[#F9FAF8] border-editorial-border group-hover:border-editorial-sage"
              >
                <div className="w-2 h-2 rounded-full transition-colors bg-editorial-border group-hover:bg-editorial-sage" />
              </div>

              {/* Main Card */}
              <div className="bg-white rounded-2xl border border-editorial-border hover:border-editorial-sage/35 transition-all duration-300 p-5 space-y-4 shadow-[0_2px_12px_rgba(107,142,103,0.02)]">
                {/* Header layout */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className={`text-[10px] uppercase tracking-widest font-mono font-bold px-2 py-0.5 rounded-md ${
                        event.type === 'fulltime' 
                          ? 'bg-editorial-chip-bg text-editorial-forest' 
                          : 'bg-editorial-accent-bg text-editorial-sage border border-editorial-border/40'
                      }`}>
                        {event.type === 'fulltime' ? 'Executive' : 'Internship'}
                      </span>
                      <span className="text-stone-300 text-xs">•</span>
                      <span className="text-[#8A958D] text-xs flex items-center gap-1 font-sans">
                        <MapPin className="w-3.5 h-3.5 text-editorial-sage/60" />
                        {event.location}
                      </span>
                    </div>

                    <h3 className="text-lg font-light text-editorial-primary tracking-tight font-sans">
                      {event.role} <span className="text-[#8A958D] font-light">at</span> <span className="font-semibold text-editorial-forest">{event.company}</span>
                    </h3>

                    <div className="flex items-center gap-1.5 text-stone-500 text-xs font-mono">
                      <Calendar className="w-3.5 h-3.5 text-editorial-sage" />
                      <span>{event.duration}</span>
                    </div>
                  </div>

                  {/* Right Side Info */}
                  <div className="flex items-center gap-3 self-start md:self-center">
                    <div className="w-10 h-10 rounded-xl bg-editorial-accent-bg border border-editorial-border/60 flex items-center justify-center font-display font-bold text-editorial-forest">
                      {isJar ? (
                        <span className="text-editorial-forest font-extrabold text-sm tracking-tighter">Jar</span>
                      ) : (
                        <span className="text-editorial-sage font-bold text-xs tracking-tight">Zepto</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Event Description Bullets */}
                {event.description && event.description.length > 0 && (
                  <ul className="space-y-1.5 list-disc list-inside text-stone-600 text-[12.5px] leading-relaxed font-sans pl-1 pt-1">
                    {event.description.map((bullet, bIdx) => (
                      <li key={bIdx} className="marker:text-editorial-sage">
                        <span className="text-stone-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Event Tags */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {event.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="text-[10px] font-sans px-2.5 py-1 bg-editorial-chip-bg text-editorial-forest rounded-full border border-editorial-border/40 hover:bg-white hover:text-editorial-sage transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          );
        })}
        
      </div>
    </div>
  );
}

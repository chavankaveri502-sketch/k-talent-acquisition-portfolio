import React from 'react';
import { Briefcase, MapPin, Mail, Sparkles, Award, BarChart3, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onNavigateToAnalytics: () => void;
}

export default function HeroSection({ onNavigateToAnalytics }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden bg-white rounded-3xl border border-editorial-border p-6 md:p-10 mb-8 shadow-[0_4px_20px_rgba(107,142,103,0.04)]">
      {/* Decorative ambient soft sage blobs */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-editorial-chip-bg/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-editorial-accent-bg/40 blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
        
        {/* Left Side: Profile & Title */}
        <div className="flex-grow space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-editorial-chip-bg text-editorial-forest text-[11px] font-semibold tracking-wider border border-editorial-border/60">
            <Sparkles className="w-3.5 h-3.5 text-editorial-sage" />
            <span className="uppercase font-sans">Talent Acquisition Professional</span>
          </div>
          
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-editorial-primary font-sans">
              Kaveri Chavan
            </h1>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-editorial-sage font-sans">
              Talent Acquisition | HR | Strategic Hiring
            </p>
          </div>

          <p className="text-[#5C635E] font-serif italic text-base md:text-lg max-w-2xl leading-relaxed border-l-2 border-editorial-sage pl-4 py-1">
            “Building high-impact teams through strategic hiring, process improvement, and people-first initiatives.”
          </p>

          <p className="text-xs font-mono tracking-wider text-[#8A958D] uppercase flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
            <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-editorial-sage" /> TA Directives</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-editorial-sage" /> Strategic Sourcing</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-editorial-sage" /> Org Operations</span>
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a 
              href="mailto:chavankaveri502@gmail.com" 
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-editorial-forest hover:bg-editorial-primary text-white rounded-xl text-xs font-semibold tracking-wider lowercase transition-colors shadow-xs cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-editorial-chip-bg" />
              <span>chavankaveri502@gmail.com</span>
            </a>
            <a 
              href="https://linkedin.com/in/kaveri-chavan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-editorial-primary hover:text-editorial-forest rounded-xl text-xs font-semibold tracking-wider uppercase border border-editorial-border hover:bg-editorial-accent-bg transition-colors shadow-xs cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5 text-editorial-sage" />
              <span>LinkedIn</span>
            </a>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-editorial-accent-bg text-[#4A504B] rounded-xl text-xs font-medium border border-[#DDE3DC]">
              <MapPin className="w-3.5 h-3.5 text-editorial-sage" />
              <span className="font-sans">Bengaluru, India</span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Stats Summary Cards */}
        <div className="w-full lg:w-auto grid grid-cols-2 gap-4 lg:min-w-[340px]">
          <div className="bg-editorial-accent-bg/60 p-4 rounded-2xl border border-editorial-border shadow-2xs">
            <span className="text-3xl font-light text-editorial-forest block font-sans">44</span>
            <span className="text-[#8A958D] text-[9px] uppercase tracking-wider block font-sans font-semibold">Total Joiners</span>
            <span className="text-[10px] text-stone-500 font-sans mt-0.5 block">Onboarded cohort</span>
          </div>

          <div className="bg-editorial-accent-bg/60 p-4 rounded-2xl border border-editorial-border shadow-2xs">
            <span className="text-3xl font-light text-editorial-forest block font-sans">86.3%</span>
            <span className="text-[#8A958D] text-[9px] uppercase tracking-wider block font-sans font-semibold">Offer to Joiner</span>
            <span className="text-[10px] text-stone-500 font-sans mt-0.5 block">High ratio success</span>
          </div>

          <div className="bg-editorial-accent-bg/60 p-4 rounded-2xl border border-editorial-border shadow-2xs">
            <span className="text-3xl font-light text-editorial-forest block font-sans">35%</span>
            <span className="text-[#8A958D] text-[9px] uppercase tracking-wider block font-sans font-semibold">Quality Boost</span>
            <span className="text-[10px] text-stone-500 font-sans mt-0.5 block">Competency metrics</span>
          </div>

          <div 
            className="bg-editorial-chip-bg p-4 rounded-2xl border border-editorial-border text-editorial-forest shadow-2xs flex flex-col justify-between group cursor-pointer hover:bg-editorial-forest hover:text-white transition-all" 
            onClick={onNavigateToAnalytics}
          >
            <span className="text-[9px] font-semibold text-editorial-forest group-hover:text-editorial-primary block uppercase tracking-widest">Sourcing Database</span>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider block font-sans">Looker Hub</span>
              <BarChart3 className="w-4 h-4 text-[#7D5FA5] group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

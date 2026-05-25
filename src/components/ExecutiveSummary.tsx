import React from 'react';
import { Mail, Compass, Sparkles, Linkedin } from 'lucide-react';

export default function ExecutiveSummary() {
  return (
    <div className="bg-gradient-to-br from-pastel-pink-accent via-white to-pastel-lavender-accent border border-[#EADBFC] rounded-3xl p-6 md:p-10 text-editorial-text relative overflow-hidden shadow-[0_4px_24px_rgba(125,95,165,0.02)]">
      
      {/* Background soft vector aesthetics */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#B496D4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FCA7BB]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        
        {/* Left column: Vision and Statement */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#7D5FA5] text-[10px] font-semibold uppercase tracking-wider border border-[#EADBFC] shadow-3xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A68CC6]" />
            <span>EXECUTIVE VISION STATEMENT</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-light tracking-tight leading-snug font-sans text-editorial-primary">
            Passionate about building scalable hiring systems, enhancing candidate experience, and driving impactful talent strategies.
          </h3>

          <p className="text-stone-600 text-sm leading-relaxed font-sans">
            Whether partnering directly with startup founders or high-impact corporate leads, my goal is to implement automated administrative support coordinates, reducing administrative latency while multiplying early-career engagement loops.
          </p>
        </div>

        {/* Right column: Connect section with white cards on top of gradient */}
        <div className="shrink-0 p-5 bg-white rounded-2xl border border-[#EADBFC] space-y-4 md:min-w-[280px] shadow-3xs">
          <h4 className="text-[10px] font-mono tracking-widest uppercase text-[#7D5FA5] font-bold">
            Contact & Networking
          </h4>
          
          <div className="space-y-2.5">
            <a 
              href="mailto:chavankaveri502@gmail.com"
              className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#FAF6FD] hover:bg-[#FFF0F4] border border-[#EADBFC] text-xs text-stone-700 hover:text-[#7D5FA5] transition-all font-mono"
            >
              <Mail className="w-4 h-4 text-[#A68CC6]" />
              <span>chavankaveri502@gmail.com</span>
            </a>

            <a 
              href="https://linkedin.com/in/kaveri-chavan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#FAF6FD] hover:bg-[#FFF0F4] border border-[#EADBFC] text-xs text-stone-700 hover:text-[#7D5FA5] transition-all font-mono"
            >
              <Linkedin className="w-4 h-4 text-[#A68CC6]" />
              <span>linkedin.com/in/kaveri-chavan</span>
            </a>

            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#FAF6FD] border border-[#EADBFC] text-xs text-stone-700">
              <Compass className="w-4 h-4 text-[#A68CC6]" />
              <span>Bengaluru HQ / Hybrid</span>
            </div>
          </div>

          <div className="pt-2 text-center text-[10px] text-stone-400 font-mono">
            Professional Portfolio
          </div>
        </div>

      </div>
    </div>
  );
}

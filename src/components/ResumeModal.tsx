import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Link as LinkIcon, 
  FileText, 
  Mail, 
  Linkedin, 
  MapPin, 
  ExternalLink,
  Edit2,
  Sparkles,
  Phone
} from 'lucide-react';
import { TIMELINE_DATA, SKILL_CATEGORIES } from '../data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);
  const [customPdfLink, setCustomPdfLink] = useState(() => {
    return localStorage.getItem('kaveri_custom_resume_pdf') || '';
  });
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [tempLink, setTempLink] = useState(customPdfLink);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveCustomLink = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('kaveri_custom_resume_pdf', tempLink);
    setCustomPdfLink(tempLink);
    setIsEditingLink(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Container Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-editorial-border overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Controls (Always visible, excluded from printing using print:hidden) */}
        <div className="print:hidden flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 border-b border-editorial-border bg-stone-50/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pastel-pink-accent flex items-center justify-center text-[#7D5FA5] border border-editorial-border">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-editorial-primary font-sans">
                Professional Resume Tool
              </h3>
              <p className="text-[11px] text-stone-500 font-sans">
                Print, download, or link your custom hosted Google Drive attachment.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Print trigger */}
            <button 
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#7D5FA5] hover:bg-[#664C8A] text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            {/* Link Copy */}
            <button 
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-editorial-border hover:bg-[#FAF6FD] text-stone-700 hover:text-[#7D5FA5] text-xs font-semibold rounded-xl cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Portfolio Link</span>
                </>
              )}
            </button>

            {/* Custom Link Setup Toggle */}
            <button 
              onClick={() => {
                setTempLink(customPdfLink);
                setIsEditingLink(!isEditingLink);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFBD0] border border-editorial-border text-stone-700 text-xs font-semibold rounded-xl cursor-pointer hover:bg-[#FFFCE0] transition-colors"
            >
              <LinkIcon className="w-3.5 h-3.5 text-[#7D5FA5]" />
              <span>{customPdfLink ? 'Update PDF Link' : 'Attach Custom PDF'}</span>
            </button>

            {/* Direct Close Button */}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Option configuration tray for attaching their own Google Drive resume link */}
        {isEditingLink && (
          <div className="print:hidden p-4 bg-[#FFFBD0]/40 border-b border-editorial-border text-xs font-sans space-y-2">
            <form onSubmit={handleSaveCustomLink} className="space-y-2 max-w-2xl">
              <label className="block font-bold text-stone-700">
                🚀 Host your custom Resume PDF on Google Drive / Dropbox?
              </label>
              <p className="text-[11px] text-stone-500">
                Paste the shared file link below. We will render a highly visible download button pointing directly to this document!
              </p>
              <div className="flex gap-2">
                <input 
                  type="url" 
                  value={tempLink}
                  onChange={(e) => setTempLink(e.target.value)}
                  placeholder="https://drive.google.com/file/d/your-resume-id/view?usp=sharing"
                  className="w-full px-3 py-2 bg-white border border-editorial-border rounded-xl text-xs font-sans outline-none focus:border-[#7D5FA5]"
                  required
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#7D5FA5] text-white rounded-xl font-semibold cursor-pointer text-xs shrink-0 hover:bg-[#664C8A]"
                >
                  Save Link
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsEditingLink(false)}
                  className="px-3 py-2 bg-stone-100 rounded-xl hover:bg-stone-200 text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Scrollable resume container sheet */}
        <div className="overflow-y-auto p-6 md:p-12 space-y-8 bg-stone-50 print:bg-white print:p-0 print:overflow-visible">
          
          {/* Printable visual frame */}
          <div className="mx-auto w-full max-w-3xl bg-white border border-editorial-border rounded-2xl p-6 md:p-10 space-y-8 shadow-xs print:border-none print:shadow-none print:rounded-none print:p-0">
            
            {/* Resume Header Panel */}
            <div className="border-b-2 border-[#7D5FA5] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <h1 className="text-3xl md:text-4xl font-light text-editorial-primary tracking-tight font-sans">
                  Kaveri Chavan
                </h1>
                <p className="text-xs uppercase tracking-widest font-bold text-[#7D5FA5] font-sans">
                  Talent Acquisition Specialist • Human Resources Executive
                </p>
                                {/* Micro Meta */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-stone-600 text-[11px] md:text-xs font-sans">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#B496D4]" />
                    +91 9307142564
                  </span>
                  <span>•</span>
                  <a href="mailto:chavankaveri502@gmail.com" className="hover:text-[#7D5FA5] flex items-center gap-1 font-mono text-[11px] lowercase">
                    <Mail className="w-3.5 h-3.5 text-[#B496D4]" />
                    chavankaveri502@gmail.com
                  </a>
                  <span>•</span>
                  <a href="https://linkedin.com/in/kaveri-chavan" target="_blank" rel="noreferrer" className="hover:text-[#7D5FA5] flex items-center gap-1">
                    <Linkedin className="w-3.5 h-3.5 text-[#B496D4]" />
                    LinkedIn
                  </a>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B496D4]" />
                    Bengaluru, India
                  </span>
                </div>
              </div>

              {/* Download Option if Custom Link is attached */}
              {customPdfLink && (
                <div className="print:hidden self-start md:self-end">
                  <a 
                    href={customPdfLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pastel-pink-accent border border-editorial-border hover:bg-[#FAF6FD] text-stone-700 text-xs font-bold shadow-3xs cursor-pointer transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#7D5FA5]" />
                    <span>Download Original PDF CV</span>
                  </a>
                </div>
              )}
            </div>

            {/* Profile Summary */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#7D5FA5] font-sans border-b border-editorial-border pb-1">
                Summary
              </h2>
              <p className="text-stone-700 text-xs md:text-sm leading-relaxed font-sans">
                Talent Acquisition Executive with experience managing end-to-end recruitment for Tech, Product, Design, and Leadership roles in a fast-paced environment. Skilled in stakeholder collaboration, competency-based hiring, campus recruitment, and recruitment analytics. Focused on improving hiring processes, enhancing candidate quality, and supporting business growth through effective talent acquisition strategies.
              </p>
            </div>

            {/* Skills section */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#7D5FA5] font-sans border-b border-editorial-border pb-1">
                Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-stone-700 text-xs md:text-sm font-sans pl-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#B496D4] font-bold">•</span>
                  <span>Talent Acquisition Strategy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#B496D4] font-bold">•</span>
                  <span>Leadership Hiring</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#B496D4] font-bold">•</span>
                  <span>Stakeholder Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#B496D4] font-bold">•</span>
                  <span>Effective Communication</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#B496D4] font-bold">•</span>
                  <span>Cross-functional Collaboration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#B496D4] font-bold">•</span>
                  <span>Microsoft Excel</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#B496D4] font-bold">•</span>
                  <span>Process Optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#B496D4] font-bold">•</span>
                  <span>Looker Studio</span>
                </div>
              </div>
            </div>

            {/* Work Experience Section */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#7D5FA5] font-sans border-b border-editorial-border pb-1">
                Work Experience
              </h2>
              <div className="space-y-5">
                {/* Jar */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 font-sans">
                        Jar
                      </h3>
                      <div className="text-[11.5px] md:text-xs text-stone-600 font-semibold font-sans mt-0.5 space-y-0.5">
                        <p>Executive – Talent Acquisition | Aug 2025 – Present</p>
                        <p>Talent Acquisition Intern | Mar 2025 – Jul 2025</p>
                      </div>
                    </div>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-stone-700 text-[12px] font-sans leading-relaxed">
                    <li>Managed end-to-end recruitment for Tech, Product, Design, and Leadership roles, sourcing top talent through LinkedIn, Instahyre, and Naukri.</li>
                    <li>Consistently achieved 75–85% of quarterly hiring targets in a fast-paced growth environment.</li>
                    <li>Led competency mapping discussions with hiring managers and interview panels to define structured evaluation criteria, resulting in a 35% improvement in the quality of shortlisted candidates.</li>
                    <li>Partnered closely with hiring managers and leadership to design and execute strategic hiring plans aligned with rapid business expansion.</li>
                    <li>Maintained strong stakeholder relationships through weekly sync meetings to review hiring progress, address challenges, and realign priorities.</li>
                    <li>Coordinated campus hiring drives at MIT Udupi for engineering interns, securing quality hires and enhancing hiring manager satisfaction.</li>
                    <li>Spearheaded an internal benchmarking initiative by creating a budget tracking dashboard using Looker Studio, enabling leadership to monitor hiring budgets and make data-driven decisions.</li>
                    <li>Automated buddy introduction emails for new joiners using Google Sheets, improving onboarding coordination and reducing manual effort.</li>
                    <li>Initiated and led knowledge-sharing sessions within the TA and HR team to promote collaboration, share best practices, and enhance team capability.</li>
                  </ul>
                </div>

                {/* Zepto */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                    <div>
                      <div className="text-[11.5px] md:text-xs text-stone-600 font-semibold font-sans">
                        Intern- Talent Acquisition
                      </div>
                      <h3 className="text-sm font-bold text-stone-900 font-sans mt-0.5">
                        Zepto | Sep 2024 – March 2025
                      </h3>
                    </div>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-stone-700 text-[12px] font-sans leading-relaxed">
                    <li>Specialize in sourcing, screening, and scheduling candidates for IT recruitment aligned with organizational needs.</li>
                    <li>Skilled in ATS management and talent pipelining.</li>
                    <li>Experienced in talent management and onboarding tracking.</li>
                    <li>Managed multiple technical roles and stakeholder relationships.</li>
                    <li>Collaborated with teams to align recruitment with business goals.</li>
                  </ul>
                </div>

                {/* GAOTek */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                    <div>
                      <div className="text-[11.5px] md:text-xs text-stone-600 font-semibold font-sans">
                        HR Internship
                      </div>
                      <h3 className="text-sm font-bold text-stone-900 font-sans mt-0.5">
                        GAOTek Inc | Nov 2023 – Feb 2024
                      </h3>
                    </div>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-stone-700 text-[12px] font-sans leading-relaxed">
                    <li>Hired for IT and Non-IT roles, with expertise in sourcing, screening, interviewing, headhunting, training interns, and managing reports and trackers.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education, Certificates & Languages Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-stone-100 pt-5">
              {/* Education section */}
              <div className="space-y-2.5 text-[12px]">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#7D5FA5] font-sans border-b border-editorial-border pb-1">
                  Education
                </h2>
                <div className="space-y-3 font-sans">
                  <div>
                    <span className="font-bold text-stone-800 block">Post Graduation (MBA)</span>
                    <span className="text-stone-600">Institute of Excellence in Management Science</span>
                    <span className="text-stone-400 font-mono text-[11px] block mt-0.5">(Oct 2022 - Nov 2024)</span>
                  </div>
                  <div>
                    <span className="font-bold text-stone-800 block">Graduation (BBA)</span>
                    <span className="text-stone-600">Kle's College of Business Administration</span>
                    <span className="text-stone-400 font-mono text-[11px] block mt-0.5">(July 2019 - Sep 2022)</span>
                  </div>
                </div>
              </div>

              {/* Certificates & Languages Section */}
              <div className="space-y-4">
                {/* Certificates */}
                <div className="space-y-2 text-[12px]">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#7D5FA5] font-sans border-b border-editorial-border pb-1">
                    Certificates
                  </h2>
                  <ul className="list-disc list-inside space-y-1 text-stone-700 font-sans pl-1">
                    <li>Human Resource Management</li>
                    <li>Introduction to Microsoft Excel</li>
                    <li>EY strategy and Corporate Finance School</li>
                  </ul>
                </div>

                {/* Languages */}
                <div className="space-y-2 text-[12px]">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#7D5FA5] font-sans border-b border-editorial-border pb-1">
                    Languages
                  </h2>
                  <p className="text-stone-700 font-sans pl-1">
                    English, Hindi, Marathi
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

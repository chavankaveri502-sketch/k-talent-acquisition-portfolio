import React, { useState, useMemo } from 'react';
import { 
  METRICS_DATA, 
  TEAM_WISE_JOINER, 
  TEAM_WISE_DECLINE 
} from '../data';
import { 
  Filter, 
  Clock, 
  PieChart as PieIcon, 
  TrendingUp,
  Sparkles,
  Layers,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Trigonometric helpers for generating modular SVG arcs/slices
const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const getArcPath = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  let absoluteDiff = endAngle - startAngle;
  if (absoluteDiff >= 360) {
    absoluteDiff = 359.99;
  }
  if (absoluteDiff <= 0) {
    return '';
  }
  
  const endAngleNormalized = startAngle + absoluteDiff;
  const start = polarToCartesian(x, y, radius, endAngleNormalized);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = absoluteDiff <= 180 ? '0' : '1';

  return [
    'M', x, y,
    'L', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    'Z',
  ].join(' ');
};

export default function AnalyticsHub() {
  // Cohort Filter state: overall, fulltime, intern
  const [candidateType, setCandidateType] = useState<'overall' | 'intern' | 'fulltime'>('overall');
  
  // Interactive Team Pie view metric: 'total' offers, 'joiners', 'declines'
  const [teamMetric, setTeamMetric] = useState<'total' | 'joiners' | 'declines'>('total');

  // Currently hovered team slice index
  const [activeSlice, setActiveSlice] = useState<number | null>(null);

  // Conversion rates based on candidate type
  const dynamicAcceptedRate = useMemo(() => {
    if (candidateType === 'overall') return { accepted: 44, declined: 7, total: 51 };
    if (candidateType === 'intern') return { accepted: 19, declined: 1, total: 20 };
    return { accepted: 25, declined: 6, total: 31 };
  }, [candidateType]);

  const activeMetrics = METRICS_DATA[candidateType];

  // Combine Joiners and Declines into a consolidated, dynamic list of teams
  const teamChartRawData = useMemo(() => {
    const teams = Array.from(new Set([
      ...TEAM_WISE_JOINER.map(t => t.team),
      ...TEAM_WISE_DECLINE.map(t => t.team)
    ]));

    return teams.map(teamName => {
      const joinObj = TEAM_WISE_JOINER.find(t => t.team === teamName);
      const decObj = TEAM_WISE_DECLINE.find(t => t.team === teamName);

      let joiners = 0;
      let declines = 0;

      if (candidateType === 'overall') {
        joiners = joinObj ? joinObj.totalJoiner : 0;
        declines = decObj ? decObj.totalDecline : 0;
      } else if (candidateType === 'fulltime') {
        joiners = joinObj ? joinObj.fulltimeJoiner : 0;
        declines = decObj ? decObj.fulltimeDecline : 0;
      } else { // intern
        joiners = joinObj ? joinObj.internJoiner : 0;
        declines = decObj ? decObj.internDecline : 0;
      }

      return {
        team: teamName,
        joiners,
        declines,
        total: joiners + declines
      };
    })
    .filter(t => t.joiners > 0 || t.declines > 0)
    .sort((a, b) => b.total - a.total);
  }, [candidateType]);

  // Compute angles, percentages, and assign beautiful pastel palette colors for the pie slices
  const pieData = useMemo(() => {
    const sum = teamChartRawData.reduce((acc, curr) => {
      if (teamMetric === 'total') return acc + curr.total;
      if (teamMetric === 'joiners') return acc + curr.joiners;
      return acc + curr.declines;
    }, 0);

    let cumulativeAngle = 0;

    // Gorgeous accessible pastel palette: Lavender, Pink, Soft Yellow, Mint, Peach, Periwinkle
    const pastelColors = [
      '#B496D4', // Lavender accent brand
      '#FCA7BB', // Soft Pink
      '#FFE082', // Pastel Yellow accent
      '#9BE0EB', // Pastel Soft Cyan
      '#BCE2C9', // Soft Mint
      '#FCD19C', // Soft Coral-Orange
    ];

    return teamChartRawData.map((item, idx) => {
      const value = teamMetric === 'total' ? item.total : (teamMetric === 'joiners' ? item.joiners : item.declines);
      const percentage = sum > 0 ? (value / sum) * 100 : 0;
      const angle = sum > 0 ? (value / sum) * 360 : 0;
      const startAngle = cumulativeAngle;
      const endAngle = cumulativeAngle + angle;
      cumulativeAngle += angle;

      return {
        ...item,
        value,
        percentage,
        startAngle,
        endAngle,
        color: pastelColors[idx % pastelColors.length]
      };
    });
  }, [teamChartRawData, teamMetric]);

  const totalSumSelected = useMemo(() => {
    return pieData.reduce((acc, curr) => acc + curr.value, 0);
  }, [pieData]);

  return (
    <div className="space-y-8 bg-white/80 backdrop-blur-md rounded-3xl border border-editorial-border p-5 md:p-8 shadow-[0_4px_30px_rgba(125,95,165,0.03)] selection:bg-pastel-pink-accent">
      
      {/* Dashboard Top Settings / Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-editorial-border pb-5">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-pastel-pink-accent border border-editorial-border text-editorial-forest text-[10px] font-mono tracking-wider font-semibold flex items-center gap-1.5 uppercase">
              <Sparkles className="w-3 h-3 text-[#7D5FA5]" />
              Interactive Analytics
            </span>
            <span className="text-[10px] text-stone-500 font-mono flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#A68CC6]" />
              Sourcing Window: 17 Mar 2025 – 25 May 2026
            </span>
          </div>
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#7D5FA5] font-semibold mt-2.5">Analytical Insights</h3>
          <h2 className="text-3xl font-light text-editorial-primary tracking-tight font-sans">
            Core Sourcing & Offer Performance
          </h2>
          <p className="text-sm text-stone-500 font-sans">
            Dynamic pipeline summary mapping hires and declines across operational business units.
          </p>
        </div>

        {/* Global Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 p-1 bg-[#F4EBFC] rounded-xl border border-[#EADBFC] text-xs">
            <span className="px-2 font-semibold text-editorial-forest flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-wider">
              <Filter className="w-3 h-3 text-[#A68CC6]" />
              cohort:
            </span>
            <button 
              onClick={() => setCandidateType('overall')}
              className={`px-3 py-1 text-[11px] font-medium rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                candidateType === 'overall' 
                  ? 'bg-white text-editorial-primary shadow-3xs border border-[#EADBFC]' 
                  : 'text-stone-500 hover:text-[#7D5FA5]'
              }`}
            >
              All Hires
            </button>
            <button 
              onClick={() => setCandidateType('fulltime')}
              className={`px-3 py-1 text-[11px] font-medium rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                candidateType === 'fulltime' 
                  ? 'bg-editorial-forest text-white shadow-3xs' 
                  : 'text-stone-500 hover:text-editorial-forest'
              }`}
            >
              Full-Time
            </button>
            <button 
              onClick={() => setCandidateType('intern')}
              className={`px-3 py-1 text-[11px] font-medium rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                candidateType === 'intern' 
                  ? 'bg-editorial-sage text-white shadow-3xs' 
                  : 'text-stone-500 hover:text-[#B496D4]'
              }`}
            >
              Interns
            </button>
          </div>
        </div>
      </div>

      {/* KPI Value Card Matrix - Mapped to Soft Pastel Yellow and White cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {activeMetrics.map((card, idx) => (
          <div 
            key={idx} 
            className="rounded-2xl p-4 md:p-5 border border-editorial-border bg-white shadow-3xs transition-all hover:border-[#B496D4]/40"
            style={{ 
              backgroundColor: idx % 2 === 1 ? '#FFFDF0' : '#FFFFFF', 
              borderLeftWidth: '4px',
              borderLeftColor: idx === 0 ? '#7D5FA5' : idx === 1 ? '#FCA7BB' : idx === 2 ? '#FFE082' : '#B496D4'
            }}
          >
            <div className="flex items-start justify-between">
              <span className="text-[9px] text-[#7D5FA5] font-mono uppercase tracking-wider block font-semibold leading-none mb-1">
                {card.label}
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl md:text-3xl font-light text-editorial-primary tracking-tight font-sans">
                {card.value}
              </span>
            </div>
            <span className="text-[10px] text-stone-500 mt-1.5 block font-sans">
              {card.subtext}
            </span>
          </div>
        ))}
      </div>

      {/* Main Analytics Block (Pie Chart + Team Outcomes Custom Pie Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Offer Acceptance Conversions Donut */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-editorial-border shadow-3xs flex flex-col justify-between">
          <div className="border-b border-editorial-border pb-3 mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-editorial-primary font-sans flex items-center gap-1.5">
              <PieIcon className="w-4 h-4 text-[#A68CC6]" />
              <span>Conversion Metrics</span>
            </h3>
            <span className="text-[9px] text-stone-500 font-mono uppercase tracking-wide block mt-1">
              {candidateType === 'overall' ? 'Cohort: 51 Total Offers' : `Cohort: ${dynamicAcceptedRate.total} Offers`}
            </span>
          </div>

          {/* Render Vector Pie/Donut Chart */}
          <div className="flex items-center justify-around flex-col sm:flex-row lg:flex-col xl:flex-row gap-6 py-4">
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* Accepted slice */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#7D5FA5" // brand purple
                  strokeWidth="15"
                  strokeDasharray={`${(dynamicAcceptedRate.accepted / dynamicAcceptedRate.total) * 251.2} 251.2`}
                />
                {/* Declined slice */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#FCA7BB" // soft coral-pink
                  strokeWidth="15"
                  strokeDashoffset={`-${(dynamicAcceptedRate.accepted / dynamicAcceptedRate.total) * 251.2}`}
                  strokeDasharray={`${(dynamicAcceptedRate.declined / dynamicAcceptedRate.total) * 251.2} 251.2`}
                />
                {/* Center hole for donut aesthetic */}
                <circle cx="50" cy="50" r="28" fill="white" />
                <text x="50" y="54" textAnchor="middle" transform="rotate(90 50 50)" className="font-sans font-semibold text-[10px] fill-[#7D5FA5] tracking-tighter">
                  {Math.round((dynamicAcceptedRate.accepted / dynamicAcceptedRate.total) * 100)}%
                </text>
              </svg>
            </div>
            
            <div className="space-y-3.5 text-xs font-sans">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#7D5FA5] rounded-full block" />
                <span className="text-stone-700 font-medium text-xs">Joiners ({dynamicAcceptedRate.accepted})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#FCA7BB] rounded-full block" />
                <span className="text-stone-700 font-medium text-xs">Declines ({dynamicAcceptedRate.declined})</span>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-[#FFF0F4] border border-[#EADBFC]/60 rounded-xl text-[10px] text-[#7D5FA5] font-sans leading-relaxed text-center mt-2 font-medium">
            📉 Average decline rate is kept within standard industry tolerances (13% - 19%).
          </div>
        </div>

        {/* Complete Team Sourcing Outcomes transformed into a Pie Chart with Interactive Legends and Metrics Filters */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-[#EADBFC] shadow-3xs space-y-4">
          
          {/* Header & Interactive Category selection */}
          <div className="border-b border-editorial-border pb-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-editorial-primary font-sans flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#A68CC6]" />
                <span>Team Sourcing Outcomes</span>
              </h3>
              <p className="text-[10px] text-stone-500 mt-0.5 uppercase tracking-wide">
                Distribution of recruiting outcomes across active corporate pipelines
              </p>
            </div>

            {/* Selector to change pie chart slice criteria */}
            <div className="inline-flex p-0.5 rounded-lg bg-[#FAF6FD] border border-[#EADBFC] text-[10px] font-medium">
              <button 
                onClick={() => { setTeamMetric('total'); setActiveSlice(null); }}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  teamMetric === 'total' ? 'bg-[#7D5FA5] text-white shadow-2xs' : 'text-stone-500 hover:text-[#7D5FA5]'
                }`}
              >
                Total Offers
              </button>
              <button 
                onClick={() => { setTeamMetric('joiners'); setActiveSlice(null); }}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  teamMetric === 'joiners' ? 'bg-[#7D5FA5] text-white shadow-2xs' : 'text-stone-500 hover:text-[#7D5FA5]'
                }`}
              >
                Joiners
              </button>
              <button 
                onClick={() => { setTeamMetric('declines'); setActiveSlice(null); }}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  teamMetric === 'declines' ? 'bg-[#7D5FA5] text-white shadow-2xs' : 'text-stone-500 hover:text-[#7D5FA5]'
                }`}
              >
                Declines
              </button>
            </div>
          </div>

          {/* Interactive Pie Chart Rendering & Legend Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
            
            {/* SVG Pie Chart */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative w-48 h-48">
                {totalSumSelected > 0 ? (
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <g className="origin-center">
                      {pieData.map((item, idx) => {
                        const d = getArcPath(50, 50, 44, item.startAngle, item.endAngle);
                        const isHovered = activeSlice === idx;
                        
                        return (
                          <path
                            key={idx}
                            d={d}
                            fill={item.color}
                            className="transition-all duration-300 stroke-white stroke-2 cursor-pointer"
                            style={{
                              transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                              transformOrigin: '50% 50%',
                              opacity: activeSlice === null || isHovered ? 1 : 0.7,
                            }}
                            onMouseEnter={() => setActiveSlice(idx)}
                            onMouseLeave={() => setActiveSlice(null)}
                          />
                        );
                      })}
                    </g>
                    
                    {/* SVG Inner white Circle to turn the Pie into a high-end Segmented Donut Chart */}
                    <circle cx="50" cy="50" r="26" fill="white" />
                    
                    {/* Centered statistics indicator */}
                    <g transform="translate(50, 50)">
                      <text 
                        textAnchor="middle" 
                        y="-4"
                        className="font-sans fill-[#241635] text-[7.5px] font-bold tracking-tight uppercase"
                      >
                        {activeSlice !== null ? pieData[activeSlice].team : 'All Units'}
                      </text>
                      <text 
                        textAnchor="middle" 
                        y="6"
                        className="font-mono fill-[#7D5FA5] text-[6.5px] font-bold"
                      >
                        {activeSlice !== null 
                          ? `${pieData[activeSlice].value} (${Math.round(pieData[activeSlice].percentage)}%)`
                          : `${totalSumSelected} total`
                        }
                      </text>
                      <text 
                        textAnchor="middle" 
                        y="14"
                        className="font-sans fill-stone-400 text-[4px] tracking-widest uppercase font-semibold progress-bar-label"
                      >
                        {teamMetric === 'total' ? 'Offers' : (teamMetric === 'joiners' ? 'Joined' : 'Declined')}
                      </text>
                    </g>
                  </svg>
                ) : (
                  <div className="w-full h-full rounded-full bg-stone-50 border border-dashed border-stone-200 flex flex-col items-center justify-center text-center p-4">
                    <span className="text-stone-400 text-[10px] font-semibold uppercase font-sans">No distribution</span>
                    <span className="text-stone-300 text-[9px] font-mono">0 Volume</span>
                    <p className="text-[8px] text-stone-400 mt-1">This cohort has no activity under selected filters</p>
                  </div>
                )}
              </div>
              <p className="text-[9.5px] text-stone-400 font-sans mt-3 text-center hidden md:block">
                💡 Hover over slices or legends for interactive metrics.
              </p>
            </div>

            {/* List Legend and Segment Details Table */}
            <div className="md:col-span-7 space-y-2.5">
              <h4 className="text-[10px] uppercase tracking-wider font-mono text-[#7D5FA5] font-bold">
                Distribution Breakdown ({teamMetric === 'total' ? 'Offers' : (teamMetric === 'joiners' ? 'Joined' : 'Declines')})
              </h4>
              
              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                {pieData.map((item, idx) => {
                  const isHovered = activeSlice === idx;
                  const totalCohortVolumeForTeam = item.joiners + item.declines;
                  
                  return (
                    <div 
                      key={idx}
                      onMouseEnter={() => setActiveSlice(idx)}
                      onMouseLeave={() => setActiveSlice(null)}
                      className={`flex items-center justify-between p-2 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isHovered 
                          ? 'border-[#B496D4] bg-[#FFFBD0]/40 shadow-3xs' 
                          : 'border-stone-100 hover:border-stone-200 bg-stone-50/50'
                      }`}
                    >
                      {/* Left: Indicator box, Team Name */}
                      <div className="flex items-center gap-2.5">
                        <span 
                          className="w-2.5 h-2.5 rounded-full block border border-white shrink-0 shadow-1xs"
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <span className="text-xs font-bold text-editorial-primary font-sans block leading-none">
                            {item.team}
                          </span>
                          <span className="text-[9px] text-[#7D5FA5] font-mono">
                            {item.joiners} Joiners • {item.declines} Declines
                          </span>
                        </div>
                      </div>

                      {/* Right: Metrics */}
                      <div className="text-right flex items-center gap-3">
                        <div className="hidden sm:block leading-none text-right">
                          <span className="text-[9px] text-stone-400 font-sans uppercase">Conversion</span>
                          <span className="text-[10px] font-bold block text-[#7D5FA5] font-mono leading-none mt-0.5">
                            {totalCohortVolumeForTeam > 0 ? Math.round((item.joiners / totalCohortVolumeForTeam) * 100) : 0}%
                          </span>
                        </div>
                        <div className="bg-white px-2 py-1 rounded-lg border border-stone-100 text-right min-w-[50px] shadow-3xs">
                          <span className="text-[11px] font-bold text-editorial-primary block font-mono leading-none">
                            {item.value}
                          </span>
                          <span className="text-[8px] text-stone-400 font-mono block leading-none mt-0.5">
                            {Math.round(item.percentage)}%
                          </span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Dynamic feedback notice inside the interactive card */}
              <div className="p-3 bg-[#FFF0F4] border border-[#EADBFC]/60 rounded-xl space-y-1">
                {activeSlice !== null ? (
                  <div className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#7D5FA5] shrink-0 mt-0.5" />
                    <p className="text-[10px] text-[#7D5FA5] font-sans leading-relaxed">
                      <strong>{pieData[activeSlice].team} Pipeline Unit:</strong> Active candidate engagement has yielded <strong>{pieData[activeSlice].joiners} successfully onboarded partners</strong> from a pool of <strong>{pieData[activeSlice].joiners + pieData[activeSlice].declines} official releases</strong>.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-start gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#B496D4] shrink-0 mt-0.5" />
                    <p className="text-[10px] text-stone-500 font-sans leading-relaxed">
                      Selecting different filter toggles at the top lets you examine how high-performing teams like <strong>Tech</strong> or <strong>Product & Design</strong> represent different ratios of onboarding volume.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

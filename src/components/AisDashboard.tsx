import React, { useState, useEffect } from "react";
import { GeneralStats, Material, TourStep, DistrictId } from "../types";
import { Play, Pause, Landmark, Shield, Leaf, Sun, HelpCircle, Activity, Sparkles, Compass } from "lucide-react";

interface AisDashboardProps {
  stats: GeneralStats;
  materials: Material[];
  tourSteps: TourStep[];
  selectedDistrictId: DistrictId | null;
  onSelectDistrict: (id: DistrictId) => void;
  activeTourStep: number | null;
  setActiveTourStep: (step: number | null) => void;
}

export default function AisDashboard({
  stats,
  materials,
  tourSteps,
  selectedDistrictId,
  onSelectDistrict,
  activeTourStep,
  setActiveTourStep,
}: AisDashboardProps) {
  const [isPlayingTour, setIsPlayingTour] = useState(false);

  // Set active district automatically based on tour selection
  useEffect(() => {
    if (activeTourStep !== null) {
      const step = tourSteps[activeTourStep];
      if (step && step.districtId) {
        onSelectDistrict(step.districtId);
      }
    }
  }, [activeTourStep]);

  // Automated tour interval player
  useEffect(() => {
    let interval: any = null;
    if (isPlayingTour && activeTourStep !== null) {
      interval = setInterval(() => {
        if (activeTourStep < tourSteps.length - 1) {
          setActiveTourStep(activeTourStep + 1);
        } else {
          setActiveTourStep(0); // Loop back
        }
      }, 9000); // 9 seconds per step
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingTour, activeTourStep]);

  const handleStartTour = () => {
    setActiveTourStep(0);
    setIsPlayingTour(true);
  };

  const handleStopTour = () => {
    setIsPlayingTour(false);
    setActiveTourStep(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-slate-800">
      
      {/* LEFT BLOCK: Automated Tour & Presentation Walkthrough (Md: 6/12) */}
      <div className="md:col-span-6 flex flex-col gap-6">
        <div id="narrated-tour-card" className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col gap-5">
          
          {/* Faint ambient glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-1.5 border-b border-slate-850 pb-4">
            <div className="flex items-center gap-1.5 text-amber-400">
              <Compass className="h-4.5 w-4.5 animate-spin-slow" />
              <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold">
                Interactive Guided Presentation Walkthrough
              </span>
            </div>
            <h2 className="text-xl font-bold font-sans tracking-tight">
              Virtual Urban Design Narrative
            </h2>
            <p className="text-xs text-slate-400 leading-normal">
              Take is a simulated, high-resolution urban design walk, reviewing the traffic flow planning, structural coordinates, and material balances of the city.
            </p>
          </div>

          {activeTourStep === null ? (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
              <div className="p-4 bg-slate-900 rounded-full border border-slate-800 shadow-md">
                <Landmark className="h-8 w-8 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">Ready to begin stakeholder presentation?</p>
                <p className="text-xs text-slate-400 max-w-sm mt-1">
                  Our custom presentation controller will cycle focus parameters on the masterplan map while playing technical audio captions.
                </p>
              </div>
              <button
                onClick={handleStartTour}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="h-4.5 w-4.5" />
                Initialize Automated Tour
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              
              {/* Tour Step Progress indicator */}
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400">
                <span>STAGE CHECKPOINT</span>
                <span className="text-amber-400">{activeTourStep + 1} / {tourSteps.length}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((activeTourStep + 1) / tourSteps.length) * 100}%` }}
                />
              </div>

              {/* Active Narrative step box */}
              <div className="bg-slate-900 ring-1 ring-slate-800 rounded-xl p-4.5 flex flex-col gap-2.5">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold">
                    🔍 FOCAL POINT: {tourSteps[activeTourStep].focalPoint}
                  </span>
                  <p className="text-base font-bold text-white tracking-tight leading-tight mt-0.5">
                    {tourSteps[activeTourStep].title}
                  </p>
                </div>
                
                {/* Simulated Audio Captions / Narration text */}
                <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-amber-500 pl-3">
                  "{tourSteps[activeTourStep].narration}"
                </p>
              </div>

              {/* Player control panel */}
              <div className="flex items-center justify-between mt-1 pt-3 border-t border-slate-900">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (activeTourStep > 0) setActiveTourStep(activeTourStep - 1);
                    }}
                    disabled={activeTourStep === 0}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-[10px] uppercase font-mono font-bold border border-slate-800 rounded-md transition-colors cursor-pointer"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => {
                      if (activeTourStep < tourSteps.length - 1) {
                        setActiveTourStep(activeTourStep + 1);
                      } else {
                        setActiveTourStep(0);
                      }
                    }}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-[10px] uppercase font-mono font-bold border border-slate-800 rounded-md transition-colors cursor-pointer"
                  >
                    Next
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlayingTour(!isPlayingTour)}
                    className="p-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-white transition-colors cursor-pointer"
                    title={isPlayingTour ? "Pause tour playback" : "Resume tour playback"}
                  >
                    {isPlayingTour ? (
                      <Pause className="h-4.5 w-4.5" />
                    ) : (
                      <Play className="h-4.5 w-4.5 animate-pulse" />
                    )}
                  </button>
                  <button
                    onClick={handleStopTour}
                    className="text-xs text-slate-400 hover:text-white underline font-mono"
                  >
                    Exit Tour
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Masterplan general stats (Card widgets with radial design) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">
                Green Canopy Cover
              </span>
              <Leaf className="h-4.5 w-4.5 text-emerald-500" />
            </div>
            
            <div className="flex items-center gap-4">
              {/* Radial Circle */}
              <svg className="w-14 h-14 shrink-0 transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="#f1f5f9" strokeWidth="4" fill="transparent" />
                <circle 
                  cx="28" cy="28" r="24" 
                  stroke="#10b981" strokeWidth="4.5" fill="transparent" 
                  strokeDasharray="150" 
                  strokeDashoffset="63" // approx 42%
                  strokeLinecap="round"
                />
                <text x="50%" y="55%" transform="rotate(90 28 28)" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155" fontFamily="sans-serif">
                  42%
                </text>
              </svg>
              <div>
                <span className="text-xl font-bold font-sans text-slate-800 block">52.5 Ha</span>
                <span className="text-[10px] text-slate-500 leading-none">Preserved Woods</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold block">
                Solar Generation Cap
              </span>
              <Sun className="h-4.5 w-4.5 text-amber-500" />
            </div>

            <div className="flex items-center gap-4">
              {/* Radial Circle */}
              <svg className="w-14 h-14 shrink-0 transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="#f1f5f9" strokeWidth="4" fill="transparent" />
                <circle 
                  cx="28" cy="28" r="24" 
                  stroke="#f59e0b" strokeWidth="4.5" fill="transparent" 
                  strokeDasharray="150" 
                  strokeDashoffset="37" // approx 75% representation
                  strokeLinecap="round"
                />
                <text x="50%" y="55%" transform="rotate(90 28 28)" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#334155" fontFamily="sans-serif">
                  12.5MW
                </text>
              </svg>
              <div>
                <span className="text-xl font-bold font-sans text-slate-800 block">Clean Grid</span>
                <span className="text-[10px] text-slate-500 leading-none">Indy Power Supply</span>
              </div>
            </div>
          </div>
        </div>

        {/* Masterplan quick indicators summary */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 block">
            📍 Key Structural Indicators
          </h4>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-xs py-1.5 border-b border-slate-200/50">
              <span className="font-medium text-slate-500">Global Sanctuary Seating</span>
              <span className="font-bold text-slate-800">12,500+ Sanctuary Seats</span>
            </div>
            <div className="flex justify-between text-xs py-1.5 border-b border-slate-200/50">
              <span className="font-medium text-slate-500">Security Gate Infrastructure</span>
              <span className="font-bold text-slate-800">CCTV & Automated Scan Gate</span>
            </div>
            <div className="flex justify-between text-xs py-1.5 border-b border-slate-200/50">
              <span className="font-medium text-slate-500">Off-Street Organized Parking</span>
              <span className="font-bold text-slate-800">6,500+ Tree-lined Spaces</span>
            </div>
            <div className="flex justify-between text-xs py-1.5">
              <span className="font-medium text-slate-500">Sustainable Micro-Water Plant</span>
              <span className="font-bold text-slate-800">3 Under-grid Storm Cisterns</span>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT BLOCK: Material Selection Board / Style Guide (Md: 6/12) */}
      <div className="md:col-span-6 flex flex-col gap-6">
        
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col gap-5">
          
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Activity className="h-4.5 w-4.5 text-blue-500" />
              <span className="text-[10px] uppercase font-mono tracking-widest font-bold">
                Climatically-Adaptive Style Guide
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              African Contemporary Material Palette
            </h2>
            <p className="text-xs text-slate-500 leading-normal">
              Review natural textures and architectural finishes selected by our master planners to resist high-humidity, intense equatorial sunshine, and maintain thermal cooling efficiency.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {materials.map((m, index) => (
              <div 
                key={index} 
                className="group p-4 bg-slate-50 hover:bg-slate-100/70 border border-slate-150 rounded-xl transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              >
                
                {/* Decorative Texture Box representing material */}
                <div className={`w-12 h-12 rounded-lg shrink-0 border border-slate-200 flex items-center justify-center select-none ${m.imagePlaceholderColor}`}>
                  <span className="text-[10px] font-mono font-bold text-slate-400">PAT-{index+1}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                      {m.name}
                    </span>
                    <span className="text-[9px] uppercase font-mono bg-white border border-slate-150 text-slate-400 px-2 py-0.25 rounded">
                      {m.category}
                    </span>
                  </div>
                  
                  <p className="text-[11px] text-slate-600 leading-normal mb-1">
                    {m.description}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-2 pt-2 border-t border-slate-200/60">
                    <span>SOURCE: <span className="font-semibold text-slate-700">{m.origin}</span></span>
                    <span className="text-emerald-600">★ {m.sustainabilityRating.split(" ")[0]} Rating</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

import React, { useState } from "react";
import { DistrictId } from "./types";
import { DISTRICTS, MATERIALS, AUDIO_TOUR, GENERAL_STATS } from "./data/masterplanData";
import MapCanvas from "./components/MapCanvas";
import DistrictDetails from "./components/DistrictDetails";
import AisDashboard from "./components/AisDashboard";
import { 
  Compass, 
  Map, 
  ShieldCheck, 
  Info, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  Trees, 
  Network,
  Sun,
  Flame,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Dynamic replacement of static imagery for production build assets
  const d1_image = new URL("./assets/images/district_one_hq_1780666367913.png", import.meta.url).href;
  DISTRICTS[0].image = d1_image;
  DISTRICTS[0].views.aerial = d1_image;
  DISTRICTS[0].views.side = new URL("./assets/images/hq_side_1780667656415.png", import.meta.url).href;
  DISTRICTS[0].views.interior = new URL("./assets/images/hq_interior_1780667640789.png", import.meta.url).href;

  const d2_image = new URL("./assets/images/district_two_acad_1780666384741.png", import.meta.url).href;
  DISTRICTS[1].image = d2_image;
  DISTRICTS[1].views.aerial = d2_image;
  DISTRICTS[1].views.side = new URL("./assets/images/acad_side_1780667692841.png", import.meta.url).href;
  DISTRICTS[1].views.interior = new URL("./assets/images/acad_interior_1780667676341.png", import.meta.url).href;

  const d3_image = new URL("./assets/images/district_three_camp_1780666402579.png", import.meta.url).href;
  DISTRICTS[2].image = d3_image;
  DISTRICTS[2].views.aerial = d3_image;
  DISTRICTS[2].views.side = new URL("./assets/images/camp_side_1780667729563.png", import.meta.url).href;
  DISTRICTS[2].views.interior = new URL("./assets/images/camp_interior_1780667711521.png", import.meta.url).href;

  const d4_image = new URL("./assets/images/district_four_crusade_1780666419869.png", import.meta.url).href;
  DISTRICTS[3].image = d4_image;
  DISTRICTS[3].views.aerial = d4_image;
  DISTRICTS[3].views.side = new URL("./assets/images/crusade_side_1780667764027.png", import.meta.url).href;
  DISTRICTS[3].views.interior = new URL("./assets/images/crusade_interior_1780667746312.png", import.meta.url).href;

  const [selectedDistrictId, setSelectedDistrictId] = useState<DistrictId | null>(null);
  const [activeTourStep, setActiveTourStep] = useState<number | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  
  // Nigeria local layout factors
  const completionDate = "June 2026 Presentation Model";
  const designerName = "Covenant Urban Design & Partners";

  // Quick reset to general view
  const handleResetToGeneral = () => {
    setSelectedDistrictId(null);
    setActiveTourStep(null);
    setIsGalleryOpen(false);
  };

  const activeDistrict = DISTRICTS.find(d => d.id === selectedDistrictId);

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased selection:bg-amber-100 selection:text-amber-900">
      
      {/* SECTION 1: Master Brand Presentation Header */}
      <header className="bg-white border-b border-slate-150 py-4 px-6 md:px-8 shrink-0 shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          <div className="flex items-center gap-3">
            {/* Elegant Golden Star Emblem */}
            <div className="w-10 h-10 rounded-xl bg-amber-550 flex items-center justify-center text-white shadow-md shadow-amber-500/20 shrink-0">
              <Compass className="h-6.5 w-6.5 animate-spin-slow text-amber-100" />
            </div>
            
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-700 font-black">
                  Masterplan Presentation Board
                </span>
                <span className="text-[10px] text-slate-400 font-mono">•</span>
                <span className="text-[10px] uppercase font-mono text-emerald-600 font-semibold tracking-wider">
                  NIGERIA HQ
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-slate-900 flex items-center gap-2 mt-0.5">
                Morningstar Covenant City
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            {/* Status indicators */}
            <div className="hidden lg:flex flex-col text-right font-mono">
              <span className="text-[9px] text-slate-400">DESIGN FIRM:</span>
              <span className="text-xs text-slate-650 font-bold">{designerName}</span>
            </div>
            
            <div className="h-8 w-px bg-slate-200 hidden lg:block" />

            <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-xs">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-semibold text-slate-700">{completionDate}</span>
            </div>
          </div>

        </div>
      </header>

      {/* SECTION 2: Dynamic Walkthrough Workspace Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white py-4.5 px-6 shrink-0 relative overflow-hidden text-center md:text-left z-40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3 relative z-10">
          <div>
            <span className="text-[9px] uppercase font-mono tracking-widest text-amber-400 font-bold px-2 py-0.5 bg-amber-900/40 rounded-full border border-amber-800/40">
              Interactive 3D GIS Visualization
            </span>
            <p className="text-sm text-slate-200 font-medium mt-1">
              Federal Republic of Nigeria • Ministry Headquarter Campus Urban Blueprint
            </p>
          </div>
          <p className="text-xs text-slate-400 md:max-w-md">
            Engineered as an autonomous church community, accommodating over 50,000 active worshipers with complete solar microgrids, dual-layered traffic avenues, and central visual coordinate lines.
          </p>
        </div>
      </div>

      {/* SECTION 3: Main Architectural Presentation Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COMPONENT COLUMN (Lg: 8/12) */}
        <section className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Map Viewer Stage Component */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Map className="h-5 w-5 text-amber-600" />
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Interactive Campus Masterplan</h2>
              </div>
              
              {selectedDistrictId && (
                <button
                  onClick={handleResetToGeneral}
                  className="text-xs font-mono text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                >
                  ↩ Reset General Map Focus
                </button>
              )}
            </div>

            <MapCanvas 
              districts={DISTRICTS}
              selectedDistrictId={selectedDistrictId}
              onSelectDistrict={(id) => {
                setSelectedDistrictId(id);
                setIsGalleryOpen(true);
              }}
              activeTourStep={activeTourStep !== null ? AUDIO_TOUR[activeTourStep] : null}
            />
          </div>

          {/* Under-grid telemetry tabs and stats */}
          <div className="border-t border-slate-200 pt-3">
            <AisDashboard 
              stats={GENERAL_STATS}
              materials={MATERIALS}
              tourSteps={AUDIO_TOUR}
              selectedDistrictId={selectedDistrictId}
              onSelectDistrict={(id) => {
                setSelectedDistrictId(id);
                setIsGalleryOpen(true);
              }}
              activeTourStep={activeTourStep}
              setActiveTourStep={setActiveTourStep}
            />
          </div>

        </section>

        {/* RIGHT SIDEBAR COLUMN: DISTRICT COMPANION CONSOLE (Lg: 4/12) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-8 flex flex-col gap-6">
          
          <AnimatePresence mode="wait">
            
            {/* VIEW A: Active District Deep Dive Dash */}
            {activeDistrict ? (
              <motion.div
                key={`sidebar-district-${activeDistrict.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl p-6 border border-slate-150 shadow-md"
              >
                <DistrictDetails 
                  district={activeDistrict}
                  onBackToOverview={handleResetToGeneral}
                />
              </motion.div>
            ) : (
              
              // VIEW B: Default Dashboard Card (Masterplan Abstract)
              <motion.div
                key="sidebar-welcome-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl p-6 border border-slate-150 shadow-md flex flex-col gap-6"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <ShieldCheck className="h-4.5 w-4.5 text-amber-600" />
                    <span className="text-[10px] font-mono tracking-widest font-bold uppercase">
                      Campus Administrative Charter
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    The Vision of Morningstar Covenant City
                  </h3>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                    Designed as a world-class Christian mini-city and spiritual headquarters. All layout aspects prioritize extreme pedestrian safety, environmental integration, renewable resources, and modern security protocols.
                  </p>
                </div>

                {/* City Entrance Monument Detail Panel */}
                <div className="bg-slate-50/70 p-4.5 rounded-xl border border-dotted border-slate-300 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Trees className="h-4 w-4 text-emerald-600" />
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                      Entrance Monument & Security Gate
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-650 leading-relaxed mb-1">
                    The entrance monument features beautiful 30m high towering architectural arcs representing a vessel of global outreach, connected directly to high-throughput automated lanes with AI camera verification.
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1 pt-2 border-t border-slate-200/50">
                    <span>Boulevard Lanes: <span className="font-bold">6 segments</span></span>
                    <span>Palm Trees: <span className="font-bold">280 Units</span></span>
                  </div>
                </div>

                {/* Quick explore directory */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-1">
                    District Administration Index
                  </span>
                  
                  {DISTRICTS.map((dst) => (
                    <button
                      id={`sidebar-directory-btn-${dst.id}`}
                      key={`dir-item-${dst.id}`}
                      onClick={() => {
                        setSelectedDistrictId(dst.id);
                        setIsGalleryOpen(true);
                      }}
                      className="group w-full p-3 bg-slate-50 hover:bg-slate-100 border border-slate-150 hover:border-slate-300 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-lg bg-slate-905 flex items-center justify-center font-mono text-xs font-bold text-slate-500 group-hover:bg-slate-900 group-hover:text-amber-500 transition-colors">
                          0{dst.number}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-800 group-hover:text-slate-950 transition-colors block leading-tight">
                            {dst.name}
                          </span>
                          <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                            {dst.subtitle}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-450 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>

                {/* Masterplan Planning standards brief */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                  <Info className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-[10.5px] leading-relaxed text-slate-600">
                    <span className="font-semibold block text-slate-800 mb-0.5">Urban Design Standards:</span>
                    Strict adherence to NBC (Nigeria National Building Codes), comprehensive environmental impact offsets, and integrated storm drainage designed for the local Ogun state ecology.
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </aside>

      </main>

      {/* SECTION 4: Elegant bottom footer creds */}
      <footer className="bg-slate-950 text-slate-500 text-xs py-8 px-6 md:px-8 border-t border-slate-900 mt-12 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Compass className="h-5 w-5 text-amber-500" />
            <span className="font-semibold text-slate-400 tracking-tight">
              Morningstar Covenant International Church City Masterplan Project
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="#masterplan-viewport" className="hover:text-slate-300 transition-colors">Interactive CAD</a>
            <a href="#narrated-tour-card" className="hover:text-slate-300 transition-colors">Virtue Walk Tour</a>
            <a href="#system-telemetry-overlay" className="hover:text-slate-300 transition-colors">GPS Telemetry Coordinates</a>
          </div>

          <div className="text-[10px] text-slate-500 font-mono">
            © 2026 Morningstar City Planning. Authorized presentation only.
          </div>

        </div>
      </footer>

      {/* SECTION 5: Full-Screen Interactive pop-up gallery panel modal */}
      <AnimatePresence>
        {isGalleryOpen && activeDistrict && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/98 backdrop-blur-2xl z-[150] flex flex-col justify-between overflow-y-auto"
            id="fullscreen-gallery-overlay"
          >
            {/* Top Bar / Header */}
            <header className="border-b border-slate-900 bg-slate-950/40 backdrop-blur-md sticky top-0 z-[160] px-6 py-4 shrink-0">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      SEC {activeDistrict.number} • MASTERBOARD VIEW
                    </span>
                    <span className="text-slate-600 text-xs font-mono">•</span>
                    <span className="text-slate-400 text-xs font-mono">Nigeria Campus Masterplan</span>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-white mt-1">
                    {activeDistrict.name}
                  </h2>
                </div>

                <button
                  id="close-gallery-btn"
                  onClick={() => setIsGalleryOpen(false)}
                  className="px-4 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  Close Presentation ✕
                </button>
              </div>
            </header>

            {/* Gallery Grid of 3 Views */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 md:py-12 flex flex-col justify-center">
              {/* Layout description - no paragraphs, purely labels/headers */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                  3 mandatory elevation views of Section 0{activeDistrict.number}
                </span>
                <span className="text-[10px] font-mono text-emerald-405">
                  ⚡ 8K High Fidelity Renders Enabled
                </span>
              </div>

              {/* The 3 Grid items representing Aerial, Side, and Interior Views */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* 1. Aerial View */}
                <div className="group relative flex flex-col gap-3">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-850 bg-slate-900 transition-all duration-300 shadow-md group-hover:border-slate-755 group-hover:-translate-y-1">
                    <img 
                      src={activeDistrict.views?.aerial || activeDistrict.image} 
                      alt="Aerial View"
                      className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800/80">
                      <span className="text-[9px] font-mono font-bold tracking-wider text-amber-400">
                        01. AERIAL VIEW
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide">
                      {activeDistrict.views?.aerialTitle || "Master Drone Perspective"}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono">Top-down architectural masterplan layout</span>
                  </div>
                </div>

                {/* 2. Side View */}
                <div className="group relative flex flex-col gap-3">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-850 bg-slate-900 transition-all duration-300 shadow-md group-hover:border-slate-755 group-hover:-translate-y-1">
                    <img 
                      src={activeDistrict.views?.side} 
                      alt="Side View"
                      className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800/80">
                      <span className="text-[9px] font-mono font-bold tracking-wider text-amber-400">
                        02. SIDE ELEVATION
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide">
                      {activeDistrict.views?.sideTitle || "Exterior Building elevation"}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono">Exterior facade & structural context elevation</span>
                  </div>
                </div>

                {/* 3. Interior View */}
                <div className="group relative flex flex-col gap-3 col-span-1 md:col-span-2 lg:col-span-1">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-855 bg-slate-900 transition-all duration-300 shadow-md group-hover:border-slate-755 group-hover:-translate-y-1">
                    <img 
                      src={activeDistrict.views?.interior} 
                      alt="Interior View"
                      className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-slate-1050/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800/80">
                      <span className="text-[9px] font-mono font-bold tracking-wider text-amber-400">
                        03. INTERIOR PERSPECTIVE
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide">
                      {activeDistrict.views?.interiorTitle || "Main Inner Auditorium"}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono">Internal spaces, functional details, and acoustics</span>
                  </div>
                </div>
              </div>
            </main>

            {/* Bottom Section: Navigation controls to jump between complexes easily */}
            <footer className="border-t border-slate-900 bg-slate-950/90 backdrop-blur-md bg-opacity-70 px-6 py-5 shrink-0">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                
                {/* Active counters */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {DISTRICTS.map((dst) => (
                      <button
                        key={`dot-gallery-${dst.id}`}
                        onClick={() => setSelectedDistrictId(dst.id)}
                        className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                          activeDistrict.id === dst.id ? "w-6 bg-amber-400" : "w-2 bg-slate-800 hover:bg-slate-700"
                        }`}
                        title={`Switch to ${dst.name}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-slate-550">
                    District [ 0{activeDistrict.number} / 04 ]
                  </span>
                </div>

                {/* Quick Switch Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const currentIndex = DISTRICTS.findIndex(d => d.id === activeDistrict.id);
                      const prevIndex = (currentIndex - 1 + DISTRICTS.length) % DISTRICTS.length;
                      setSelectedDistrictId(DISTRICTS[prevIndex].id);
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-850 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    ← Previous Complex
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = DISTRICTS.findIndex(d => d.id === activeDistrict.id);
                      const nextIndex = (currentIndex + 1) % DISTRICTS.length;
                      setSelectedDistrictId(DISTRICTS[nextIndex].id);
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-955 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    Next Complex →
                  </button>
                </div>

              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

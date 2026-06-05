import React, { useState } from "react";
import { DistrictId, DistrictData } from "../types";
import { MoveUpRight, Eye, Grid3X3, Layers, Navigation, Compass, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface MapCanvasProps {
  districts: DistrictData[];
  selectedDistrictId: DistrictId | null;
  onSelectDistrict: (id: DistrictId) => void;
  activeTourStep?: { focalPoint: string } | null;
}

export default function MapCanvas({
  districts,
  selectedDistrictId,
  onSelectDistrict,
  activeTourStep,
}: MapCanvasProps) {
  const [viewMode, setViewMode] = useState<"aerial" | "blueprint">("aerial");
  const [showCoordinates, setShowCoordinates] = useState<boolean>(true);
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictId | null>(null);

  // Absolute path of matching images in our applet
  const overallMapSrc = new URL("../assets/images/overall_masterplan_1780666349717.png", import.meta.url).href;

  // Coordinates matching the Nigerian geographical feel (Ogun State/Ifo axis region, home to major multi-hectare cathedral cities)
  const nigeriaCoordinates = {
    elevation: "112m AMSL",
    coordString: "N 06° 48' 22.4\", E 003° 14' 10.8\"",
    bearing: "12° N-NE Axis",
  };

  // Helper colors for districts
  const getBrandColors = (id: DistrictId) => {
    switch (id) {
      case DistrictId.GlobalHQ:
        return { bg: "bg-amber-500", text: "text-amber-500", border: "border-amber-500", glow: "shadow-amber-500/50" };
      case DistrictId.Academic:
        return { bg: "bg-emerald-500", text: "text-emerald-500", border: "border-emerald-500", glow: "shadow-emerald-500/50" };
      case DistrictId.Camp:
        return { bg: "bg-indigo-500", text: "text-indigo-500", border: "border-indigo-500", glow: "shadow-indigo-500/50" };
      case DistrictId.Crusade:
        return { bg: "bg-blue-500", text: "text-blue-500", border: "border-blue-500", glow: "shadow-blue-500/50" };
    }
  };

  return (
    <div id="masterplan-viewport" className="relative w-full aspect-[16/10] bg-slate-950 overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
      
      {/* 1. Backdrop Grid (Always present in Blueprint Mode, behind details) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-750 pointer-events-none ${
          viewMode === "blueprint" ? "opacity-15" : "opacity-5"
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 2. Photo View - Masterplan Rendering */}
      <div 
        className={`absolute inset-0 transition-all duration-750 ease-out ${
          viewMode === "aerial" ? "opacity-100 scale-100" : "opacity-35 scale-[1.01] blur-xs"
        }`}
      >
        <img
          src={overallMapSrc}
          alt="Morningstar Covenant International Church City - Aerial Masterplan Concept"
          className="w-full h-full object-cover select-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30" />
      </div>

      {/* 3. Blueprint SVG Vector Layer */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        viewBox="0 0 1000 625"
        aria-hidden="true"
      >
        {/* Draw Grand Boulevard Avenues - Primary Axes */}
        {/* Entrance Gate -> Central Rotunda -> Cathedral (District 1) */}
        <line 
          x1="500" y1="580" x2="500" y2="280" 
          stroke="rgba(217, 119, 6, 0.45)" 
          strokeWidth="12" 
          strokeDasharray="4 6"
          className={viewMode === "blueprint" ? "opacity-100" : "opacity-30"}
        />
        {/* Central Fountain Rotunda circle */}
        <circle 
          cx="500" cy="350" r="45" 
          fill="none" 
          stroke="rgba(255,255,255,0.25)" 
          strokeWidth="2" 
          strokeDasharray="5 5"
        />
        
        {/* Outer Ring Road connecting all Complexes */}
        <path 
          d="M 150,200 C 150,100 850,100 850,200 C 850,450 750,550 500,560 C 250,550 150,450 150,200 Z" 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.15)" 
          strokeWidth="4" 
        />

        {/* Diagonal arterial pathways */}
        {/* HQ (Center-ish 500, 280) to Academic (Upper Left: 250, 220) */}
        <line x1="500" y1="350" x2="250" y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="3 3" />
        {/* HQ to Camp (Lower Right: 750, 410) */}
        <line x1="500" y1="350" x2="750" y2="410" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="3 3" />
        {/* HQ to Crusade (Lower Left: 300, 470) */}
        <line x1="500" y1="350" x2="300" y2="470" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="3 3" />

        {/* Dynamic Sector Zoning Outlines (Light up on hover or select) */}
        {districts.map((d) => {
          const isSelected = selectedDistrictId === d.id;
          const isHovered = hoveredDistrict === d.id;
          const isActive = isSelected || isHovered;

          // Define visual bounding geometries on SVG coord space (1000 x 625) corresponding to districts
          let points = "";
          let labelX = 0;
          let labelY = 0;
          let color = "rgba(255,255,255,0.05)";
          let strokeColor = "rgba(255,255,255,0.15)";

          if (d.id === DistrictId.GlobalHQ) {
            points = "400,200 600,200 620,380 380,380";
            labelX = 500; labelY = 180;
            color = isActive ? "rgba(245, 158, 11, 0.08)" : "transparent";
            strokeColor = isActive ? "rgba(245, 158, 11, 0.6)" : "rgba(255,255,255,0.15)";
          } else if (d.id === DistrictId.Academic) {
            points = "120,80 430,80 410,290 120,290";
            labelX = 220; labelY = 65;
            color = isActive ? "rgba(16, 185, 129, 0.08)" : "transparent";
            strokeColor = isActive ? "rgba(16, 185, 129, 0.6)" : "rgba(255,255,255,0.15)";
          } else if (d.id === DistrictId.Camp) {
            points = "590,390 880,300 880,510 590,510";
            labelX = 780; labelY = 285;
            color = isActive ? "rgba(99, 102, 241, 0.08)" : "transparent";
            strokeColor = isActive ? "rgba(99, 102, 241, 0.6)" : "rgba(255,255,255,0.15)";
          } else if (d.id === DistrictId.Crusade) {
            points = "160,390 410,390 450,560 160,560";
            labelX = 250; labelY = 375;
            color = isActive ? "rgba(59, 130, 246, 0.08)" : "transparent";
            strokeColor = isActive ? "rgba(59, 130, 246, 0.6)" : "rgba(255,255,255,0.15)";
          }

          return (
            <g key={`svg-sector-${d.id}`} className="transition-all duration-300">
              {/* Highlight Polygon */}
              <polygon 
                points={points} 
                fill={color} 
                stroke={strokeColor} 
                strokeWidth={isActive ? "2.5" : "1"} 
                className="transition-all duration-300 cursor-pointer pointer-events-auto"
                onClick={() => onSelectDistrict(d.id)}
                onMouseEnter={() => setHoveredDistrict(d.id)}
                onMouseLeave={() => setHoveredDistrict(null)}
              />
              
              {/* Sector Name Tags in Blueprint Mode */}
              {viewMode === "blueprint" && (
                <text 
                  x={labelX} 
                  y={labelY} 
                  fill={isActive ? "white" : "rgba(255,255,255,0.4)"}
                  fontSize="12"
                  fontFamily="JetBrains Mono, monospace"
                  textAnchor="middle"
                  className="font-semibold tracking-wider uppercase transition-colors"
                >
                  SEC {d.number}: {d.name.split(" ")[0]}
                </text>
              )}
            </g>
          );
        })}

        {/* Compass, Scale, and Gate annotations on SVG directly */}
        {viewMode === "blueprint" && (
          <>
            {/* Legend Compass */}
            <circle cx="920" cy="100" r="28" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            <line x1="920" y1="65" x2="920" y2="135" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <line x1="885" y1="100" x2="955" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <text x="920" y="60" fill="white" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">N</text>
            
            {/* Blueprint Scale Indicator */}
            <line x1="50" y1="580" x2="150" y2="580" stroke="#fff" strokeWidth="2" />
            <line x1="50" y1="576" x2="50" y2="584" stroke="#fff" strokeWidth="2" />
            <line x1="100" y1="576" x2="100" y2="584" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            <line x1="150" y1="576" x2="150" y2="584" stroke="#fff" strokeWidth="2" />
            <text x="100" y="595" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Scale: 1:5,000 (100m)</text>

            <text x="500" y="612" fill="rgba(217, 119, 6, 0.7)" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="2px">
              ★ PRIMARY VISUAL AXIS OF RECONCILIATION
            </text>
          </>
        )}
      </svg>

      {/* 4. Interactive Hotspots (Absolute Overlay Pin Layers) */}
      <div className="absolute inset-0 pointer-events-none">
        {districts.map((d) => {
          const colors = getBrandColors(d.id);
          const isSelected = selectedDistrictId === d.id;
          const isHovered = hoveredDistrict === d.id;
          const isActive = isSelected || isHovered;

          return (
            <div
              key={`hotspot-pin-${d.id}`}
              className="absolute group pointer-events-auto transition-transform duration-300"
              style={{
                top: `${d.hotspotCoords.y}%`,
                left: `${d.hotspotCoords.x}%`,
                transform: `translate(-50%, -50%) ${isActive ? "scale(1.15)" : "scale(1)"}`,
              }}
            >
              {/* Interactive Anchor Button */}
              <button
                id={`btn-hotspot-${d.id}`}
                onClick={() => onSelectDistrict(d.id)}
                onMouseEnter={() => setHoveredDistrict(d.id)}
                onMouseLeave={() => setHoveredDistrict(null)}
                className="relative flex items-center justify-center cursor-pointer transition-all duration-300 focus:outline-none"
                aria-label={`View ${d.name} details`}
              >
                {/* Rippling Ring for Selected or Hovered District */}
                {isActive && (
                  <span className={`absolute inline-flex h-14 w-14 rounded-full opacity-65 animate-ping ${colors.bg}`} />
                )}

                {/* Main Node Ring */}
                <div className={`relative h-10 w-10 rounded-full border-2 flex items-center justify-center shadow-lg transition-transform bg-slate-900 border-white hover:scale-110 ${colors.glow}`}>
                  <Navigation 
                    className={`h-4.5 w-4.5 transform rotate-45 transition-colors ${
                      isActive ? "text-white" : "text-slate-400"
                    }`} 
                  />
                </div>

                {/* Vertical Indicator Pole */}
                <div className="absolute h-6 w-0.5 bg-white opacity-40 bottom-10" />

                {/* Hover Label Portal */}
                <div className={`absolute bottom-16 flex flex-col items-center whitespace-nowrap transition-all duration-300 pointer-events-none ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}>
                  <div className="px-3.5 py-1.5 rounded-lg bg-slate-900/95 backdrop-blur-md border border-slate-700 text-xs shadow-2xl flex items-center gap-1.5 leading-none">
                    <span className={`h-2 w-2 rounded-full ${colors.bg}`} />
                    <span className="font-semibold text-white tracking-tight">{d.name}</span>
                    <MoveUpRight className="h-3 w-3 text-slate-400" />
                  </div>
                  {/* Small absolute pointer point */}
                  <div className="w-2.5 h-2.5 bg-slate-900 border-r border-b border-slate-700 rotate-45 -mt-1.25" />
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* 5. Live Technical Telemetry Overlay (Top Left) */}
      {showCoordinates && (
        <div 
          id="system-telemetry-overlay" 
          className="absolute top-4 left-4 p-3 rounded-lg bg-slate-950/75 backdrop-blur-md border border-slate-800 text-[11px] font-mono select-none pointer-events-auto leading-relaxed text-slate-300"
        >
          <div className="flex items-center gap-1.5 text-slate-400 mb-1 border-b border-slate-800 pb-1">
            <Compass className="h-3.5 w-3.5 animate-spin-slow text-amber-500" />
            <span className="font-bold tracking-wider">{nigeriaCoordinates.bearing} | TELEMETRY</span>
          </div>
          <div>LOC: <span className="text-white font-semibold">{nigeriaCoordinates.coordString}</span></div>
          <div>ELEV: <span className="text-white font-semibold">{nigeriaCoordinates.elevation}</span></div>
          {activeTourStep ? (
            <div className="text-amber-400 mt-1 flex items-center gap-1">
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>ACTIVE: {activeTourStep.focalPoint}</span>
            </div>
          ) : (
            <div className="text-emerald-400 mt-1">STATUS: MASTERPLAN ACTIVE</div>
          )}
        </div>
      )}

      {/* 6. Dashboard GIS Control Suite (Top Right / Bottom Center) */}
      <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-auto">
        <button
          id="btn-toggle-coordinates"
          onClick={() => setShowCoordinates(!showCoordinates)}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 border leading-none transition-all shadow-md cursor-pointer ${
            showCoordinates 
              ? "bg-slate-800 text-white border-slate-700" 
              : "bg-slate-950/80 text-slate-400 border-slate-900 hover:text-white"
          }`}
          title="Toggle telemetry metrics"
        >
          <Grid3X3 className="h-3 w-3" />
          {showCoordinates ? "Telemetry ON" : "Telemetry OFF"}
        </button>

        <div className="p-0.5 bg-slate-950/95 backdrop-blur-md rounded-lg border border-slate-800 shadow-md flex items-center">
          <button
            id="btn-view-aerial"
            onClick={() => setViewMode("aerial")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
              viewMode === "aerial"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Aerial Photo
          </button>
          <button
            id="btn-view-blueprint"
            onClick={() => setViewMode("blueprint")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
              viewMode === "blueprint"
                ? "bg-cyan-900/60 text-cyan-200 border border-cyan-800 shadow-inner"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            Blueprint CAD
          </button>
        </div>
      </div>

      {/* 7. Clickable Interactive District Cards on Map */}
      <div className="absolute bottom-4 left-4 right-4 flex md:grid md:grid-cols-4 gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none pointer-events-auto z-30">
        {districts.map((d) => {
          const isSelected = selectedDistrictId === d.id;
          const isHovered = hoveredDistrict === d.id;
          const colors = getBrandColors(d.id);
          
          // Get specific metadata labels for clean label presentation
          const areaLabel = d.specs.totalArea;
          const capLabel = d.specs.seatingCapacity || d.specs.housingCapacity || "900+ Spaces";
          const solarLabel = d.specs.solarOutput || "Grid Synced";

          return (
            <button
              id={`map-card-trigger-${d.id}`}
              key={`map-card-${d.id}`}
              onClick={() => onSelectDistrict(d.id)}
              onMouseEnter={() => setHoveredDistrict(d.id)}
              onMouseLeave={() => setHoveredDistrict(null)}
              className={`flex-shrink-0 w-52 md:w-auto p-3 rounded-xl border text-left transition-all duration-300 relative overflow-hidden backdrop-blur-lg flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? "bg-white text-slate-950 border-white shadow-2xl scale-[1.02] ring-2 ring-amber-500/30"
                  : isHovered
                  ? "bg-slate-900/95 text-white border-slate-600 scale-[1.01] shadow-xl"
                  : "bg-slate-950/80 text-slate-200 border-slate-850/90 hover:border-slate-700"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1 pointer-events-none">
                  <span className={`text-[9px] font-mono uppercase tracking-widest font-black ${
                    isSelected ? "text-amber-600" : "text-amber-400"
                  }`}>
                    0{d.number} • SECTION
                  </span>
                  <span className={`text-[8px] font-mono px-1 py-0.25 rounded font-bold ${
                    isSelected ? "bg-slate-100 text-slate-800" : "bg-slate-900 text-slate-400"
                  }`}>
                    {d.id === DistrictId.GlobalHQ ? "CENTRAL" : "ZONED"}
                  </span>
                </div>
                <h4 className="text-xs font-bold leading-tight tracking-tight pr-2 truncate pointer-events-none">
                  {d.name.replace(" & Outreach", "").replace(" & Retreat", "")}
                </h4>
              </div>

              {/* Labeled data grid - strictly no paragraphs, only labels */}
              <div className="mt-2.5 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px] border-t pt-1.5 border-slate-300/25 pointer-events-none">
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-mono leading-none">Area</span>
                  <span className={`text-[10px] font-bold ${isSelected ? "text-slate-900" : "text-white"}`}>{areaLabel}</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-mono leading-none">Capacity</span>
                  <span className={`text-[10px] font-bold ${isSelected ? "text-slate-900" : "text-white"} truncate block`}>{capLabel.split(" (")[0]}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

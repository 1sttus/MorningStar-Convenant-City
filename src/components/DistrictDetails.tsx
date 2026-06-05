import React, { useState } from "react";
import { DistrictData, DistrictId, Facility } from "../types";
import { 
  Building, 
  MapPin, 
  Users, 
  Tv, 
  Radio, 
  Volume2, 
  FolderPlus, 
  Sliders, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Layers2, 
  Activity, 
  Clock, 
  Sparkles,
  Calculator,
  Bed,
  PhoneCall,
  Search,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DistrictDetailsProps {
  district: DistrictData;
  onBackToOverview: () => void;
}

export default function DistrictDetails({ district, onBackToOverview }: DistrictDetailsProps) {
  const [activeFacilityId, setActiveFacilityId] = useState<string | null>(district.facilities[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState("");

  // District 1 (HQ) - Stream simulator state
  const [activeStream, setActiveStream] = useState<"tv" | "radio">("tv");
  const [isStreaming, setIsStreaming] = useState(true);
  const [streamBitrate, setStreamBitrate] = useState(4820);

  // District 2 (Academic) - Calculator state
  const [calcLevel, setCalcLevel] = useState<"primary" | "secondary">("secondary");
  const [studentCountInput, setStudentCountInput] = useState<number>(1200);

  // District 3 (Camp) - Lodging planner state
  const [selectedLodgeType, setSelectedLodgeType] = useState<"chalet" | "hotel" | "hostel">("chalet");
  const [bookedUnits, setBookedUnits] = useState({ chalet: 48, hotel: 165, hostel: 850 });
  const maxUnits = { chalet: 80, hotel: 250, hostel: 1200 };

  // District 4 (Crusade) - Evacuation/Acoustic state
  const [crowdDensity, setCrowdDensity] = useState<"standard" | "dense" | "crusade">("dense");

  const colors = {
    amber: { bg: "bg-amber-500", text: "text-amber-600", light: "bg-amber-50 text-amber-800 border-amber-200", darkText: "hover:bg-amber-50", fill: "fill-amber-500" },
    emerald: { bg: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-50 text-emerald-800 border-emerald-200", darkText: "hover:bg-emerald-50", fill: "fill-emerald-500" },
    indigo: { bg: "bg-indigo-500", text: "text-indigo-600", light: "bg-indigo-50 text-indigo-800 border-indigo-200", darkText: "hover:bg-indigo-50", fill: "fill-indigo-500" },
    blue: { bg: "bg-blue-500", text: "text-blue-600", light: "bg-blue-50 text-blue-800 border-blue-200", darkText: "hover:bg-blue-50", fill: "fill-blue-500" },
  }[district.color] || { bg: "bg-slate-500", text: "text-slate-600", light: "bg-slate-50 text-slate-800", darkText: "hover:bg-slate-50", fill: "fill-slate-500" };

  const filteredFacilities = district.facilities.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFacility = (id: string) => {
    setActiveFacilityId(activeFacilityId === id ? null : id);
  };

  // Calculations for District 2 (Academic)
  const teacherRatio = calcLevel === "primary" ? 25 : 18;
  const classroomCapacity = 30;
  const classroomsNeeded = Math.ceil(studentCountInput / classroomCapacity);
  const teachersNeeded = Math.ceil(studentCountInput / teacherRatio);
  const sportsGroups = Math.floor(studentCountInput / 65);

  // Calculations for District 4 (Crusade)
  const getEgressMetrics = () => {
    switch (crowdDensity) {
      case "standard":
        return { count: "3,500 delegates", time: "2.2 minutes", acoustic: "1.45s RT60 (Optimal speech)", safetyRisk: "Minimal / Code Green" };
      case "dense":
        return { count: "5,000 delegates", time: "3.4 minutes", acoustic: "1.68s RT60 (Rich choral volume)", safetyRisk: "Safe / Code Yellow" };
      case "crusade":
        return { count: "7,000+ delegates (Full capacity)", time: "4.8 minutes", acoustic: "1.92s RT60 (Immersive/Reverberant)", safetyRisk: "Moderated / High Flow Patrols" };
    }
  };
  const egress = getEgressMetrics();

  return (
    <div className="flex flex-col gap-8">
      {/* Primary Header Segment */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono tracking-wider text-white ${colors.bg}`}>
              DISTRICT {district.number}
            </span>
            <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">
              • Morningstar City Masterplan
            </span>
          </div>
          <h1 className="text-3xl font-bold font-sans tracking-tight text-slate-900">
            {district.name}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{district.subtitle}</p>
        </div>

        <button
          onClick={onBackToOverview}
          className="self-start sm:self-center px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:border-slate-300 rounded-lg shadow-sm hover:text-slate-900 transition-colors cursor-pointer"
        >
          ← Back to General Map
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Image & Core Metrics Board (Lg: 5/12) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Spatial Rendering Showcase */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg group aspect-[4/3] bg-slate-100">
            <img
              src={district.image}
              alt={`${district.name} aerial visualize`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
            {/* Soft shadow overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-5 text-white">
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-bold">
                Drone-Eye Visual Alignment
              </span>
              <p className="text-sm font-semibold mt-0.5 text-slate-100 drop-shadow-sm">
                Daylight Render Perspective
              </p>
            </div>
          </div>

          {/* District Specifications Grid */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold mb-4">
              📐 District Spatial & Operational Specs
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs">
                <span className="text-[10px] text-slate-400 block font-mono">TOTAL SECTOR PATH</span>
                <span className="text-base font-bold text-slate-800">{district.specs.totalArea}</span>
              </div>

              {district.specs.seatingCapacity && (
                <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs">
                  <span className="text-[10px] text-slate-400 block font-mono">SEATING DESIGN</span>
                  <span className="text-base font-bold text-slate-800">{district.specs.seatingCapacity}</span>
                </div>
              )}

              {district.specs.housingCapacity && (
                <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs">
                  <span className="text-[10px] text-slate-400 block font-mono">HOUSING CAPACITY</span>
                  <span className="text-base font-bold text-slate-800">{district.specs.housingCapacity}</span>
                </div>
              )}

              <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs">
                <span className="text-[10px] text-slate-400 block font-mono">DEDICATED PARKING</span>
                <span className="text-base font-bold text-slate-800">{district.specs.parkingCapacity || "900+ Spaces"}</span>
              </div>

              {district.specs.solarOutput && (
                <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs">
                  <span className="text-[10px] text-slate-400 block font-mono">GREEN POWER OUTPUT</span>
                  <span className="text-base font-bold text-slate-800 text-emerald-600">{district.specs.solarOutput}</span>
                </div>
              )}
            </div>

            {/* Urban Planning block */}
            <div className="mt-5 border-t border-slate-200/60 pt-4">
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 block mb-1">
                Urban Layout Rationale
              </span>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "{district.urbanPlanningRationale}"
              </p>
            </div>
          </div>

          {/* Interactive Utility Simulators (Renders conditionally per selected district!) */}
          
          {/* DISTRICT 1 SIMULATOR: Media Uplink Monitor */}
          {district.id === DistrictId.GlobalHQ && (
            <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Tv className="h-4 w-4 text-amber-400 animate-pulse" />
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Media Center Uplink System
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${isStreaming ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    {isStreaming ? "LIVE TRANSMITTING" : "OFFLINE"}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Simulate broadcasting content feeds generated directly from the TV Production Studios, sound departments, and Radio Station.
              </p>

              {/* Feed selector tabs */}
              <div className="grid grid-cols-2 gap-2 mb-4 p-1 bg-slate-950 rounded-lg">
                <button
                  onClick={() => { setActiveStream("tv"); setStreamBitrate(4820); }}
                  className={`py-1.5 rounded text-xs font-mono font-medium cursor-pointer ${
                    activeStream === "tv" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  📺 Morningstar TV HD
                </button>
                <button
                  onClick={() => { setActiveStream("radio"); setStreamBitrate(320); }}
                  className={`py-1.5 rounded text-xs font-mono font-medium cursor-pointer ${
                    activeStream === "radio" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  📻 Morningstar 95.1 FM
                </button>
              </div>

              {/* Console Output */}
              <div className="bg-black/80 rounded-xl p-3 border border-slate-850 font-mono text-[10px] leading-relaxed text-slate-300">
                <div className="text-amber-400 mb-1 border-b border-slate-900 pb-1 flex justify-between">
                  <span>🛰️ SATELLITE TRANSIT STATUS</span>
                  <span>{streamBitrate} kbps</span>
                </div>
                {activeStream === "tv" ? (
                  <>
                    <div>FEED: <span className="text-emerald-400">Main Shrine 4K Dome Camera 01</span></div>
                    <div>ENCODER: <span className="text-white">COVENANT_ENC_HEVC_04</span></div>
                    <div>UPLINK PORT: <span className="text-white">SES-Astra 16.5°E Active</span></div>
                    <div className="text-slate-500 mt-1 animate-pulse">● Rec: 108,409 digital households streaming globally...</div>
                  </>
                ) : (
                  <>
                    <div>FEED: <span className="text-emerald-400">95.1 FM Praise Wave Stereo Link</span></div>
                    <div>ENCODER: <span className="text-white">COVENANT_RAD_MP3_951</span></div>
                    <div>AIRTIME TIME: <span className="text-white">24/7 Gospel Stream Channel</span></div>
                    <div className="text-slate-500 mt-1 animate-pulse">● Rec: Simulating digital streaming channels to all parishes...</div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* DISTRICT 2 SIMULATOR: Classroom Capacity Calculator */}
          {district.id === DistrictId.Academic && (
            <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 shadow-inner">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
                <Calculator className="h-4 w-4 text-emerald-400" />
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Academy Campus Layout Calculator
                </h4>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Dynamically estimate classrooms, teachers, and facilities resources based on your targeted student enrollment capacity.
              </p>

              {/* Set target cohort */}
              <div className="flex flex-col gap-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Cohort Structure:</span>
                  <div className="flex gap-1.5 p-0.5 bg-slate-950 rounded-md">
                    <button
                      onClick={() => setCalcLevel("primary")}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono cursor-pointer ${
                        calcLevel === "primary" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Pre-Nurs to Primary
                    </button>
                    <button
                      onClick={() => setCalcLevel("secondary")}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono cursor-pointer ${
                        calcLevel === "secondary" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Secondary (Junior/Senior)
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Total Enrolling Students:</span>
                    <span className="font-bold text-white">{studentCountInput} Pupils</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="2200"
                    step="50"
                    value={studentCountInput}
                    onChange={(e) => setStudentCountInput(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 h-1 bg-slate-950 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Outputs */}
              <div className="grid grid-cols-3 gap-2 text-center bg-slate-950/60 p-3 rounded-xl border border-slate-850">
                <div>
                  <span className="font-mono text-lg font-bold text-emerald-400 block">{classroomsNeeded}</span>
                  <span className="text-[9px] uppercase text-slate-400 font-mono">Classrooms</span>
                </div>
                <div className="border-x border-slate-800">
                  <span className="font-mono text-lg font-bold text-white block">{teachersNeeded}</span>
                  <span className="text-[9px] uppercase text-slate-400 font-mono">Educators</span>
                </div>
                <div>
                  <span className="font-mono text-lg font-bold text-white block">{sportsGroups}</span>
                  <span className="text-[9px] uppercase text-slate-400 font-mono">Athletic Sects</span>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 mt-2.5 flex items-center gap-1 font-mono">
                <span className="text-emerald-500 text-lg leading-none">•</span>
                <span>Calculated on a secure {classroomCapacity}:1 student-to-class density ratio.</span>
              </div>
            </div>
          )}

          {/* DISTRICT 3 SIMULATOR: Camp Retreat Lodging Allocator */}
          {district.id === DistrictId.Camp && (
            <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 shadow-inner">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
                <Bed className="h-4 w-4 text-indigo-400" />
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Covenant Oasis Lodging Planner
                </h4>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Simulate crowd reservation configurations during big conferences or pastoral retreat weeks inside the natural valley.
              </p>

              {/* Accommodation Selector tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-lg mb-4">
                <button
                  onClick={() => setSelectedLodgeType("chalet")}
                  className={`py-1 rounded text-[10px] font-mono cursor-pointer ${
                    selectedLodgeType === "chalet" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Chalets
                </button>
                <button
                  onClick={() => setSelectedLodgeType("hotel")}
                  className={`py-1 rounded text-[10px] font-mono cursor-pointer ${
                    selectedLodgeType === "hotel" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Hotel Rooms
                </button>
                <button
                  onClick={() => setSelectedLodgeType("hostel")}
                  className={`py-1 rounded text-[10px] font-mono cursor-pointer ${
                    selectedLodgeType === "hostel" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Hostel Beds
                </button>
              </div>

              {/* Progress and control buttons */}
              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400 uppercase tracking-wider font-mono text-[10px]">
                      {selectedLodgeType} Allocation:
                    </span>
                    <span className="font-bold text-white">
                      {bookedUnits[selectedLodgeType]} / {maxUnits[selectedLodgeType]} occupied
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(bookedUnits[selectedLodgeType] / maxUnits[selectedLodgeType]) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Simulated booking action */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setBookedUnits(prev => {
                        const current = prev[selectedLodgeType];
                        const step = selectedLodgeType === "chalet" ? 5 : selectedLodgeType === "hotel" ? 15 : 50;
                        const nextVal = Math.min(maxUnits[selectedLodgeType], current + step);
                        return { ...prev, [selectedLodgeType]: nextVal };
                      });
                    }}
                    className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-98 rounded-lg text-xs text-white border border-slate-700 transition-all font-mono leading-none cursor-pointer"
                  >
                    + Add Block Group
                  </button>
                  <button
                    onClick={() => {
                      setBookedUnits(prev => {
                        const current = prev[selectedLodgeType];
                        const step = selectedLodgeType === "chalet" ? 5 : selectedLodgeType === "hotel" ? 15 : 50;
                        const nextVal = Math.max(0, current - step);
                        return { ...prev, [selectedLodgeType]: nextVal };
                      });
                    }}
                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-900 font-mono text-xs rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DISTRICT 4 SIMULATOR: Egress & Acoustic Density Manager */}
          {district.id === DistrictId.Crusade && (
            <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 shadow-inner">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
                <Volume2 className="h-4 w-4 text-blue-400" />
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Crusade Arena Acoustic & Egress Tool
                </h4>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Simulate critical design safety metrics—acoustic resonance and emergency evacuation rates—by configuring the expected attendee density.
              </p>

              {/* Select target density */}
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-lg">
                  <button
                    onClick={() => setCrowdDensity("standard")}
                    className={`py-1 rounded text-[9px] font-mono cursor-pointer ${
                      crowdDensity === "standard" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Standard (Conf)
                  </button>
                  <button
                    onClick={() => setCrowdDensity("dense")}
                    className={`py-1 rounded text-[9px] font-mono cursor-pointer ${
                      crowdDensity === "dense" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Moderate (Event)
                  </button>
                  <button
                    onClick={() => setCrowdDensity("crusade")}
                    className={`py-1 rounded text-[9px] font-mono cursor-pointer ${
                      crowdDensity === "crusade" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Crusade Peak
                  </button>
                </div>

                {/* Structural response metrics */}
                <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-850 flex flex-col gap-2 font-mono text-[10px]">
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-400">PROJECTED FOOTFALL:</span>
                    <span className="text-white font-bold">{egress.count}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-400">EMERGENCY EVAC TIME:</span>
                    <span className="text-emerald-400 font-bold">{egress.time}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-400">ACOUSTIC RT60 DECAY:</span>
                    <span className="text-blue-400">{egress.acoustic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">RISK / DISPATCH BAR:</span>
                    <span className={`font-semibold ${crowdDensity === "crusade" ? "text-amber-400" : "text-emerald-400"}`}>{egress.safetyRisk}</span>
                  </div>
                </div>

                <p className="text-[9px] text-slate-500 italic">
                  * Based on wide peripheral multi-gate radial path clearance protocols and fire-resistant basalt tiles.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Modern Facilities Listing (Lg: 7/12) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Section Search Header */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
            <Search className="h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search facilities, buildings, and structures in this district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm outline-none text-slate-700 bg-transparent"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="text-xs text-slate-400 hover:text-slate-600 font-mono"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-800 font-sans tracking-tight">
              🏛️ Facilities Breakdown ({filteredFacilities.length} items found)
            </h3>
            
            {filteredFacilities.map((f) => {
              const isOpen = activeFacilityId === f.id;
              
              return (
                <div
                  key={f.id}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isOpen 
                      ? "border-slate-300 shadow-md ring-2 ring-slate-100" 
                      : "border-slate-150 hover:border-slate-300 shadow-xs"
                  }`}
                >
                  {/* Accordion Toggle Bar */}
                  <button
                    onClick={() => toggleFacility(f.id)}
                    className="w-full p-4.5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${isOpen ? colors.light : "bg-slate-50 text-slate-500 border-slate-200"}`}>
                        <Building className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 tracking-tight">
                          {f.name}
                        </h4>
                        {f.capacity && (
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded mr-2 uppercase">
                            Cap: {f.capacity}
                          </span>
                        )}
                        {f.floors && (
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">
                            {f.floors} Levels
                          </span>
                        )}
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4.5 w-4.5 text-slate-400" />
                    )}
                  </button>

                  {/* Accordion expanded content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs text-slate-600 leading-relaxed flex flex-col gap-4">
                          
                          {/* Core Description */}
                          <div>
                            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-1">
                              Structural description
                            </span>
                            <p className="text-slate-600 text-xs font-sans">
                              {f.description}
                            </p>
                          </div>

                          {/* Architectural Style details if present */}
                          {f.architecturalStyle && (
                            <div className="bg-slate-50/70 p-3 rounded-lg border border-slate-120 flex items-center gap-3">
                              <Layers2 className={`h-4.5 w-4.5 ${colors.text}`} />
                              <div>
                                <span className="font-mono text-[9px] uppercase text-slate-400 block">
                                  Architectural Concept & Style
                                </span>
                                <span className="text-slate-700 font-semibold text-xs">
                                  {f.architecturalStyle}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Key structural features */}
                          <div>
                            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-2">
                              ✨ Specialized Key Features
                            </span>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {f.keyFeatures.map((feat, index) => (
                                <li key={index} className="flex items-start gap-2 text-[11px] text-slate-600">
                                  <Check className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${colors.text}`} />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Materials board reference */}
                          {f.materials && f.materials.length > 0 && (
                            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 items-center">
                              <span className="text-[9px] uppercase font-mono text-slate-400 mr-1">
                                Building Materials Spec:
                              </span>
                              {f.materials.map((mat, index) => (
                                <span 
                                  key={index}
                                  className="text-[10px] font-medium bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full"
                                >
                                  🎨 {mat}
                                </span>
                              ))}
                            </div>
                          )}

                          {f.highlight && (
                            <div className="bg-amber-50/50 text-amber-900 border border-amber-100 p-2.5 rounded-lg flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
                              <span className="text-[10px] leading-tight font-medium font-sans">
                                {f.highlight}
                              </span>
                            </div>
                          )}

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {filteredFacilities.length === 0 && (
              <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50 text-slate-400 text-xs">
                No facilities match your search. Try looking up broader keywords or clear filter tags.
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

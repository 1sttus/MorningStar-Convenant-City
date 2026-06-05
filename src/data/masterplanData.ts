import { DistrictId, DistrictData, Material, TourStep, GeneralStats } from "../types";

export const GENERAL_STATS: GeneralStats = {
  totalCityArea: "125 Hectares (308 Acres)",
  totalSettleCapacity: "50,000+ Active Population",
  totalGreenCover: "42% (Sustained Forests & Landscaped Parks)",
  totalSolarOutput: "12.5 Megawatts (Microgrid System)",
  parkingLots: "6,500+ Tree-lined Off-street Parking Spaces",
  constructionPhase: "Phase 1 Completed / Phase 2 Commencing 2026",
};

export const MATERIALS: Material[] = [
  {
    name: "Nigeria-Sourced White Granite Cladding",
    category: "Facade",
    origin: "Kogi and Kaduna Quarries",
    description: "Highly durable granite panels reflecting equatorial heat and providing a clean, timeless architectural expression.",
    sustainabilityRating: "Excellent (Local sourcing minimizes carbon transit)",
    imagePlaceholderColor: "bg-slate-100",
  },
  {
    name: "Teak & Mahogany Solar Louvers",
    category: "Facade",
    origin: "Sustainable Forestry Programs, Ondo State",
    description: "Operable timber sunscreens offering dynamic thermal shading to keep building interiors cool while enhancing natural cross-ventilation.",
    sustainabilityRating: "Excellent (Renewable carbon-sink timber)",
    imagePlaceholderColor: "bg-amber-900",
  },
  {
    name: "Low-E Double Glazed Curved Glass",
    category: "Structure",
    origin: "West African Glass Works",
    description: "High-performance solar control glass that filters out infrared heat while flooding the massive auditoriums with soft daylight.",
    sustainabilityRating: "Very Good (Reduces air-conditioning loads by 35%)",
    imagePlaceholderColor: "bg-sky-100",
  },
  {
    name: "Laterite Stabilized Earth Blockways",
    category: "Landscaping",
    origin: "On-site excavation during grading",
    description: "Permeable pedestrian pathways manufactured using native soils and stabilized with local binders, supporting natural stormwater drainage.",
    sustainabilityRating: "Outstanding (Zero-waste site balancing)",
    imagePlaceholderColor: "bg-red-200",
  },
  {
    name: "Polished Basalt Terrazzo",
    category: "Interiors",
    origin: "Local aggregate production in Nigeria",
    description: "Monolithic, heavy-duty floor finish using crushed basalt and marble aggregate, designed to withstand extremely high pedestrian footfall.",
    sustainabilityRating: "Very Good (Indestructible thermal mass floor)",
    imagePlaceholderColor: "bg-slate-300",
  }
];

export const DISTRICTS: DistrictData[] = [
  {
    id: DistrictId.GlobalHQ,
    name: "Global Headquarters Complex",
    subtitle: "The Spiritual and Administrative Epicenter",
    number: 1,
    description: "The core administrative, spiritual, and outreach nerve center of the city. Blending soaring monumental architecture with quiet spaces for personal contemplation, this zone serves as the primary visual and spatial focal point of the masterplan layout.",
    image: "/src/assets/images/district_one_hq_1780666367913.png",
    color: "amber",
    hotspotCoords: { x: 50, y: 45 }, // Centered centerpiece
    specs: {
      totalArea: "32 Hectares",
      seatingCapacity: "5,000 Seats (Main Cathedral)",
      parkingCapacity: "1,200 Cars (Executive + Staff)",
      solarOutput: "4.2 MW Installed Solar Cap",
    },
    urbanPlanningRationale: "Positioned at the geographical center and highest elevation point of the city. Designed around a grand ceremonial visual axis running from the Main Gate monument directly to the Cathedral's illuminated facade, reflecting the core theme of 'revelation' and structured order.",
    facilities: [
      {
        id: "hq-cathedral",
        name: "5,000-Seat Main Worship Cathedral",
        description: "A monumental double-curved architectural marvel with soaring white concrete sails and vertical gold-gilded louvers. Houses state-of-the-art immersive acoustics and interactive seating rings.",
        capacity: "5,000 Sanctuary Seats + 300 Choir Stage",
        architecturalStyle: "Contemporary Expressionist, Climatically Adaptive",
        keyFeatures: ["Naturally assisted air cooling wind tunnels", "Acoustic wood paneling made from Nigerian Teak", "Central majestic altar with natural skylight dome"],
        materials: ["White Granite Cladding", "Low-E Double Glazed Glass"],
        floors: 3,
        highlight: "Spiritual centerpiece of the entire city layout.",
      },
      {
        id: "hq-admin",
        name: "Administrative Headquarters Building",
        description: "A modern 5-story building serving as the administrative engine of Morningstar Covenant International. Connects all department suites with sleek external glass lifts and a massive atrium.",
        floors: 5,
        keyFeatures: ["Executive conference room with panoramic city views", "Double-height main reception showroom", "Central light well generating constant interior daylight"],
        capacity: "450 Administrative Officers & Staff",
        architecturalStyle: "Sleek Modern Corporate, Ribbon-Glazed",
      },
      {
        id: "hq-offices",
        name: "National & International Secretariat Suites",
        description: "Dedicated operational wings managed for global parish networks, digital outreach coordination, global humanitarian relief logistics, and community development.",
        keyFeatures: ["Video-conferencing bridge suites", "Multi-lingual translation offices", "Dynamic map consoles tracing active missions"],
      },
      {
        id: "hq-media",
        name: "Global Media & Broadcast Headquarters",
        description: "A hyper-integrated production node housing full HD television studios, digital podcast sound booths, and radio broadcasting suites broadcasting 24/7 globally.",
        keyFeatures: ["Television Station & Multi-camera Studios", "Radio Broadcast Studios with soundproofing", "Live Satellite Uplink center", "Integrated printing press facility for global literature distribution"],
        highlight: "Vessel for external outreach and media propagation.",
      },
      {
        id: "hq-ministry-school",
        name: "School of Ministry Campus",
        description: "An advanced theological and leadership training complex containing standard lecture halls, discussion chambers, and a quiet prayer chapel.",
        floors: 3,
        capacity: "600 Active Divinity Students",
        keyFeatures: ["Digital theological archive library", "Outdoor seminar courtyards", "Prayer meditation cells"],
      },
    ],
    views: {
      aerial: "",
      aerialTitle: "Global Headquarters plan view",
      side: "",
      sideTitle: "Administration side elevation",
      interior: "",
      interiorTitle: "Worship auditorium interior perspective"
    }
  },
  {
    id: DistrictId.Academic,
    name: "Academic Complex",
    subtitle: "Nurturing Future Christian leaders",
    number: 2,
    description: "An elite, comprehensive educational sanctuary designed on a closed-loop residential model. Spanning early development to advanced secondary classes, this district champions secure learning and dynamic physical development.",
    image: "/src/assets/images/district_two_acad_1780666384741.png",
    color: "emerald",
    hotspotCoords: { x: 25, y: 35 }, // Upper Left
    specs: {
      totalArea: "28 Hectares",
      housingCapacity: "1,500 Boarders (Male/Female hostels)",
      parkingCapacity: "650 Cars & School Buses",
      solarOutput: "2.8 MW",
    },
    urbanPlanningRationale: "Zoned in the quietest, northern quadrant of the city to minimize external traffic dust and ambient noise. Features wide pedestrian-only avenues separating schools to guarantee child safety and encourage active walking.",
    facilities: [
      {
        id: "acad-primary-secondary",
        name: "Morningstar Academies (Crèche to Secondary)",
        description: "A contiguous ring of modern, interconnected structures designed for early pre-nursery development, primary instruction, and rigorous science-oriented secondary studies.",
        keyFeatures: ["Modern STEM labs and computer clusters", "Secure drop-off security lanes", "Inner play courtyards with colorful visual structures"],
        capacity: "2,000 Enrolled Students (Day and Boarding)",
        architecturalStyle: "Clay Brick Modern, Shaded Balconies",
        floors: 3,
      },
      {
        id: "acad-auditorium",
        name: "Academic Symposium Hall",
        description: "A sleek academic auditorium designed with tier-seating and acoustic control, specialized for conventions, graduations, and theatrical productions.",
        capacity: "800 Seats",
        keyFeatures: ["High-definition projection system", "Dynamic acoustic ceiling panels", "Adjoining scientific exhibition hall"],
      },
      {
        id: "acad-sports",
        name: "Providence Sports Complex",
        description: "A professional-grade athletic hub centering a lush green grass football field, surround running track, hardcourt basketball stations, and gymnastics hall.",
        keyFeatures: ["FIFA-size organic grass football pitch", "400m all-weather tartan running track", "2 Covered sports stands with changing rooms"],
        capacity: "1,500 Spectators",
      },
      {
        id: "acad-boarding",
        name: "Residential Boarding Houses",
        description: "Separate hostels for male and female secondary students. Features comfortable study lounges, secure residential gates, and full-time proctor residences.",
        capacity: "1,500 Ward Beds",
        floors: 3,
        keyFeatures: [
          "Separate independent secure compounds for male and female boarders",
          "Centrally air-conditioned study lounges and common library zones",
          "Integrated laundry suites, continuous powerBackup, and dining structures",
          "Dedicated on-campus medical clinics and pediatric resident staff"
        ],
      }
    ],
    views: {
      aerial: "",
      aerialTitle: "Academic Campus aerial perspective",
      side: "",
      sideTitle: "School Building exterior facade",
      interior: "",
      interiorTitle: "Modern School Library classroom structure"
    }
  },
  {
    id: DistrictId.Camp,
    name: "Camp & Retreat Complex",
    subtitle: "Restoration, Fellowship, and Solace",
    number: 3,
    description: "A scenic sanctuary designed for deep spiritual refreshment, community camps, and intensive retreat sequences. Structured like a premium tropical resort, it balances high-quality hospitality with dedicated wellness structures.",
    image: "/src/assets/images/district_three_camp_1780666402579.png",
    color: "indigo",
    hotspotCoords: { x: 75, y: 65 }, // Bottom Right
    specs: {
      totalArea: "35 Hectares",
      seatingCapacity: "2,500 Seats (Camp Auditorium)",
      housingCapacity: "2,200 Guests (Rooms, Chalets & Hostels)",
      parkingCapacity: "1,400 Vehicles",
    },
    urbanPlanningRationale: "Positioned inside the southern valleys of the masterplan, utilizing natural dense foliage as an organic barrier against city-wide hubbub. Walkways wind along gentle water features to induce calmness.",
    facilities: [
      {
        id: "camp-auditorium",
        name: "2,500-Seat Camp & Prayer Sanctuary",
        description: "A grand open-air architecture with glass roofs and massive timber support pillars, creating an organic connection with the surrounding prayer gardens.",
        capacity: "2,500 Seats",
        architecturalStyle: "Biophilic Tropical, Glulam Timber Truss",
        keyFeatures: ["Open-sided design capturing direct prevailing breezes", "Central water moat reflecting gentle altar lights", "Surrounding gravel paths for prayer walking"],
      },
      {
        id: "camp-chalets",
        name: "Executive Family Chalets & Suites",
        description: "Terracotta-roofed boutique cottages nestled under palm trees, offering private rest, fully furnished kitchenettes, and modern smart security.",
        capacity: "80 Luxury Individual Units",
        keyFeatures: ["Shaded mahogany veranda decks", "Private prayer corners leading to gardens", "Solar independent water heaters"],
      },
      {
        id: "camp-hotel",
        name: "Covenant Oasis Hospitality Inn",
        description: "An elegant, highly serviced guest house facility offering executive suites, multi-guest deluxe rooms, and premium business services.",
        floors: 4,
        capacity: "250 Guest Rooms",
        keyFeatures: ["Two multi-cuisine restaurants with commercial kitchens", "Rooftop prayer deck with sunset views of the city", "Executive counseling boardrooms"],
      },
      {
        id: "camp-rehab",
        name: "Grace Restoration & Counseling Center",
        description: "A sanctuary for counseling, recovery, and holistic rehabilitation offering expert clinical care, spiritual mentorship, and mental health therapy.",
        keyFeatures: ["Professional therapy suites", "Private tranquil consultation lounges", "Recreational group spaces"],
      }
    ],
    views: {
      aerial: "",
      aerialTitle: "Retreat Campus aerial perspective",
      side: "",
      sideTitle: "Boutique Family Chalet exterior profile",
      interior: "",
      interiorTitle: "Covenant Hospitality Oasis Lobby"
    }
  },
  {
    id: DistrictId.Crusade,
    name: "Indoor Crusade & Outreach Complex",
    subtitle: "Global Revivals and Mass Gatherings",
    number: 4,
    description: "An incredible high-throughput, heavy-duty event complex optimized to host massive national conferences, global indoor crusades, expositions, and regional outreach programs.",
    image: "/src/assets/images/district_four_crusade_1780666419869.png",
    color: "blue",
    hotspotCoords: { x: 30, y: 75 }, // Bottom Left
    specs: {
      totalArea: "30 Hectares",
      seatingCapacity: "5,000+ Stadium Seats (Crusade Dome)",
      parkingCapacity: "3,200 High-Capacity Event Cars",
      solarOutput: "3.5 MW",
    },
    urbanPlanningRationale: "Strategically located bordering the outer ring road and main South Gate. Allows rapid transit and entry of thousands of visitors directly from external highways without disrupting traffic in the academic or residential zones.",
    facilities: [
      {
        id: "crusade-dome",
        name: "5,000+ Seat Indoor Crusade Arena",
        description: "A massive, state-of-the-art dome with specialized clear-span roof framing. It is highly optimized for mega-crusades, theatrical stage sets, and major concert events.",
        capacity: "5,000 Premium Stadium Seats + 2,000 Ground Standing Floor",
        architecturalStyle: "Futuristic Dome, Clear-Span Space Frame",
        keyFeatures: ["Surrounding wide egress gates (evacuation in under 4 minutes)", "Overhead central truss rig for professional stadium acoustics & lighting", "Surrounding LED tickers display visual directions"],
      },
      {
        id: "crusade-conference",
        name: "Harvest Conference & Exhibition Halls",
        description: "An expansive, modifiable column-free floor designed for modular walls to easily transform into small seminars or massive exhibition zones.",
        capacity: "Up to 3,000 delegates",
        floors: 2,
        keyFeatures: ["Full climate control and ventilation", "Adjoining secure food court courts", "Exhibitor heavy vehicle loading bays"],
      },
      {
        id: "crusade-residences",
        name: "Evangelism Hostels & Outreach Houses",
        description: "High-density dormitories and transit apartments styled to house visiting delegations, outreach staff, and evangelical teams.",
        capacity: "1,200 beds",
        keyFeatures: ["Communal lounges and dining courts", "Separate laundry and service quarters", "Integrated bus shuttle terminal for regional dispatch"],
      }
    ],
    views: {
      aerial: "",
      aerialTitle: "Crusade Complex overall plan map",
      side: "",
      sideTitle: "Massive Crusade Arena exterior view",
      interior: "",
      interiorTitle: "Stadium-tiered arena seating layout"
    }
  }
];

export const AUDIO_TOUR: TourStep[] = [
  {
    title: "City Entrance & Security Monument",
    description: "The main gateway of Morningstar Covenant City, setting the visual tone for the entire modern Christian campus.",
    narration: "Welcome to Morningstar Covenant City. Entering through the main gate, you are greeted by an iconic 30-meter high white concrete monument symbolizing prayer hands. This acts as a security barrier and administrative gateway, utilizing automated scanning for incoming vehicles. Wide six-lane palm-lined boulevards guide us towards the city core.",
    focalPoint: "Main Gate Monument",
  },
  {
    title: "The Grand Boulevard Axis",
    description: "The tree-lined connection corridor linking all major complexes.",
    narration: "As we travel down the Grand Boulevard, notice the meticulous planning: segregated lanes for buses, wide shaded pedestrian sidewalks paving made of stabilized earth tiles, and continuous streetlights powered by the local solar microgrid. To your right are water fountains that help humidify and cool down the ambient air before sending it inland.",
    focalPoint: "Central Boulevard",
  },
  {
    title: "District 1: Spiritual Heart",
    districtId: DistrictId.GlobalHQ,
    description: "Visiting the 5,000-Seat Main Worship Cathedral and five-story Administrative Headquarters.",
    narration: "Our first stop is the Global Headquarters. Here, the magnificent 5,000-seat worship cathedral rises majestically. Its white granite facade sparkles under the Nigerian sun, while the teak wood louvers shift dynamically to shade the glass. Adjacent is the 5-story Administrative Building with its glass-enclosed elevators. Every layout choice here points to structural efficiency and divine inspiration.",
    focalPoint: "Global Cathedral",
  },
  {
    title: "District 2: Academic Sanctuary",
    districtId: DistrictId.Academic,
    description: "Touring the serene primary and secondary academies, sports field, and student hostels.",
    narration: "Pivoting northward, we enter the quiet Academic Complex. Safe from high-traffic noise and dust, the schools are designed in beautiful circular layouts surrounding manicured grass playgrounds. Active secondary students make high-spirited use of the professional sports complex, which features a FIFA-size grass football pitch and a running track.",
    focalPoint: "Academic Complex",
  },
  {
    title: "District 3: The Camp & Retreat Village",
    districtId: DistrictId.Camp,
    description: "Walking through the biophilic prayer gardens, hostels, and elegant family chalets.",
    narration: "We drop down into the lush southern valleys of the Camp Complex. Immediately, the thermal sensation drops. Lush canopy trees shade a village of family chalets with classic clay tile roofs, designed to shelter retreating souls. The open-air 2,500-seat wooden Camp Sanctuary and the peaceful prayer streams encourage quiet introspection and spiritual rejuvenation.",
    focalPoint: "Camp Complex",
  },
  {
    title: "District 4: Mega Outreach Arena",
    districtId: DistrictId.Crusade,
    description: "Exploring the massive 5,000+ seat Indoor Crusade Dome and exhibition halls.",
    narration: "Our tour concludes at the Indoor Crusade Complex near the South Gate. Look up at the giant steel-frame dome structure, capable of packing over 5,000 faithful inside a secure, air-cooled space. Vast parking lots and wide plazas handle arrival surges smoothly, reflecting state-of-the-art urban traffic flow logic and safety planning.",
    focalPoint: "Crusade Dome",
  }
];

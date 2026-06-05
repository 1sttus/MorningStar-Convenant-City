export enum DistrictId {
  GlobalHQ = "global-hq",
  Academic = "academic",
  Camp = "camp",
  Crusade = "crusade",
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  capacity?: string;
  architecturalStyle?: string;
  keyFeatures: string[];
  materials?: string[];
  floors?: number;
  highlight?: string;
}

export interface RenderViews {
  aerial: string;
  aerialTitle: string;
  side: string;
  sideTitle: string;
  interior: string;
  interiorTitle: string;
}

export interface DistrictData {
  id: DistrictId;
  name: string;
  subtitle: string;
  number: number;
  description: string;
  image: string;
  color: string; // Tailwind color class, e.g., 'blue', 'amber', 'emerald', 'indigo'
  hotspotCoords: { x: number; y: number }; // Percentage coords on overall map
  facilities: Facility[];
  specs: {
    totalArea: string;
    seatingCapacity?: string;
    housingCapacity?: string;
    parkingCapacity?: string;
    solarOutput?: string;
  };
  urbanPlanningRationale: string;
  views: RenderViews;
}

export interface Material {
  name: string;
  category: "Structure" | "Facade" | "Landscaping" | "Interiors";
  origin: string;
  description: string;
  sustainabilityRating: string;
  imagePlaceholderColor: string;
}

export interface TourStep {
  title: string;
  districtId?: DistrictId;
  description: string;
  narration: string;
  focalPoint: string;
}

export interface GeneralStats {
  totalCityArea: string;
  totalSettleCapacity: string;
  totalGreenCover: string;
  totalSolarOutput: string;
  parkingLots: string;
  constructionPhase: string;
}

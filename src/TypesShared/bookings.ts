
export interface RestaurantTable {
  id: string;
  code: string;
  name: string;
  label: string;
  capacity: number;
  x: number;
  y: number;
  visualType: string;
  area: string;
  canCombineWith: string[];
  status: "available" | "held" | "reserved";
}

export interface RestaurantFloorPlan {
  width: number;
  height: number;
  tables: RestaurantTable[];
}

export interface RestaurantBookingData {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  bookingEnabled: boolean;
  holdDurationMinutes: number;
  reservationDurationMinutes: number;
  floorPlan: RestaurantFloorPlan;
}

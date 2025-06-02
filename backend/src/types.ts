export type Vessel = {
  mmsi: number;
  position: [number, number]; // [lon, lat]
  heading: number | null;
  updated_at: Date | string | null; // Date object or ISO string
};

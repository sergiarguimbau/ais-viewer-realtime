import {
  geometry,
  index,
  integer,
  pgTable,
  timestamp,
} from "drizzle-orm/pg-core";

export const vessels = pgTable(
  "vessels",
  {
    // Vessel User ID (MMSI)
    mmsi: integer("mmsi").primaryKey(),
    // Geo point [lon, lat] WGS84
    position: geometry("position", {
      type: "point",
      srid: 4326,
      mode: "tuple",
    }).notNull(),
    // Direction in degrees
    heading: integer("heading"),
    // Last update timestamp
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    // Spatial index for fast bounding box queries
    index("idx_vessels_position").using("gist", t.position),
    // Recency index for quick time filtering
    index("idx_vessels_updated_at").on(t.updated_at),
  ]
);

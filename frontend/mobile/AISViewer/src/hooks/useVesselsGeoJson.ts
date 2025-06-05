import { useMemo } from "react";

import type { Vessel } from "../schemas";

export function useVesselsGeojson(vessels: Vessel[]) {
  const geojson = useMemo(() => {
    return {
      type: "FeatureCollection" as const,
      features: vessels.map((vessel) => ({
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: vessel.position,
        },
        properties: {
          mmsi: vessel.mmsi,
          heading: vessel.heading,
        },
      })),
    };
  }, [vessels]);

  return { geojson };
}

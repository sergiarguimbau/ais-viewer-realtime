import type Mapbox from "@rnmapbox/maps";
import { useEffect, useState } from "react";

import type { Vessel } from "../schemas";
import { fetchVesselsInBoundingBox } from "../services/vesselsService";

export default function useVesselsPolling(
  mapRef: React.RefObject<Mapbox.MapView | null>,
  minZoom: number,
  intervalMs: number
) {
  const [vessels, setVessels] = useState<Vessel[]>([]);

  useEffect(() => {
    async function getVessels() {
      if (!mapRef.current) return;
      try {
        // Validate minimum zoom to display vessels
        const zoom = await mapRef.current.getZoom();
        if (zoom < minZoom) {
          setVessels((prev) => (prev.length === 0 ? prev : []));
          return;
        }

        // Get visible map bounds and use it to fetch vessels
        const bounds = await mapRef.current.getVisibleBounds();

        const [[west, south], [east, north]] = bounds;
        const bbox = { west, south, east, north };
        const fetchedVessels = await fetchVesselsInBoundingBox(bbox);
        setVessels((prev) =>
          JSON.stringify(prev) === JSON.stringify(fetchedVessels)
            ? prev
            : fetchedVessels
        );
      } catch (error) {
        console.error("getVessels:", error);
      }
    }

    getVessels();
    const intervalId = setInterval(getVessels, intervalMs);
    return () => clearInterval(intervalId);
  }, [minZoom, intervalMs]);

  return vessels;
}

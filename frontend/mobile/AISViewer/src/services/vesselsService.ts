import {
  type BoundingBox,
  type Vessel,
  bboxQuerySchema,
  vesselsArraySchema,
} from "../schemas";

export async function fetchVesselsInBoundingBox(
  bbox: BoundingBox
): Promise<Vessel[]> {
  try {
    const parsedBbox = bboxQuerySchema.parse(bbox);
    const { west, south, east, north } = parsedBbox;
    const url = `https://aisviewer.dev/api/vessels?south=${south}&west=${west}&north=${north}&east=${east}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch vessels");
    const json = await response.json();
    const parsedVessels = vesselsArraySchema.parse(json);
    return parsedVessels;
  } catch (error) {
    console.error("fetchVesselsInBoundingBox:", error);
    throw error;
  }
}

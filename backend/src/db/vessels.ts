import { sql } from "drizzle-orm";

import type { Vessel } from "../types";
import type { BoundingBox } from "./../schemas";
import { db } from "./connector";
import { vessels } from "./tables";

/**
 * Upsert (insert or update) a vessel's position and heading.
 * If the vessel already exists, update its position, heading, and timestamp.
 * @param data Vessel object
 */
export async function upsertVessel(data: Vessel) {
  await db
    .insert(vessels)
    .values({
      mmsi: data.mmsi,
      position: data.position,
      heading: data.heading,
      updated_at: new Date(),
    })
    .onConflictDoUpdate({
      target: vessels.mmsi,
      set: {
        position: data.position,
        heading: data.heading,
        updated_at: new Date(),
      },
    });
}

/**
 * Query all vessels within a bounding box and updated in the last 2 minutes.
 * @param bbox GeoJSON-style bounding box
 * @returns Array of Vessel objects for the map
 */
export async function getVesselsInBoundingBox(
  bbox: BoundingBox
): Promise<Vessel[]> {
  const { west, south, east, north } = bbox;

  const result: Vessel[] = await db
    .select()
    .from(vessels)
    .where(
      sql`
        ${vessels.updated_at} > NOW() - INTERVAL '2 minutes'
        AND ${vessels.position} && ST_MakeEnvelope(${west}, ${south}, ${east}, ${north}, 4326)
      `
    );

  return result;
}

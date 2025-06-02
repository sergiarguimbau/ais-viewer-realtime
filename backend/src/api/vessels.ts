import type { FastifyInstance } from "fastify";

import { getVesselsInBoundingBox } from "../db/vessels";
import { bboxQuerySchema } from "../schemas";

export async function registerApiVesselRoutes(fastify: FastifyInstance) {
  /**
   * GET /api/vessels?west=...&south=...&east=...&north=...
   * Returns vessels in the bounding box, updated in the last 2 minutes.
   */
  fastify.get("/vessels", async (request, reply) => {
    const parseResult = bboxQuerySchema.safeParse(request.query);

    if (!parseResult.success) {
      return reply.code(400).send({ error: "Invalid bounding box parameters" });
    }

    const bbox = parseResult.data;

    try {
      const vessels = await getVesselsInBoundingBox(bbox);
      return vessels;
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Failed to fetch vessels" });
    }
  });
}

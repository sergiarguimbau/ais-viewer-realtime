import z from "zod";

export const bboxQuerySchema = z.object({
  west: z.coerce.number().finite(),
  south: z.coerce.number().finite(),
  east: z.coerce.number().finite(),
  north: z.coerce.number().finite(),
});

export type BoundingBox = z.infer<typeof bboxQuerySchema>;

export const vesselSchema = z.object({
  mmsi: z.number(),
  position: z.tuple([z.number(), z.number()]),
  heading: z.number().nullable(),
  updated_at: z.string(),
});

export type Vessel = z.infer<typeof vesselSchema>;

export const vesselsArraySchema = z.array(vesselSchema);

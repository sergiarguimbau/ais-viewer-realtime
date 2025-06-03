import z from "zod";

export const bboxQuerySchema = z.object({
  west: z.coerce.number().finite(),
  south: z.coerce.number().finite(),
  east: z.coerce.number().finite(),
  north: z.coerce.number().finite(),
});

export type BoundingBox = z.infer<typeof bboxQuerySchema>;

export const aisMessageSchema = z.object({
  MessageType: z.literal("PositionReport"),
  Message: z.object({
    PositionReport: z.object({
      UserID: z.number(),
      Latitude: z.number(),
      Longitude: z.number(),
      TrueHeading: z.number().nullable(),
    }),
  }),
});

export type AISMessage = z.infer<typeof aisMessageSchema>;

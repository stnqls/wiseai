import z from "zod";

export const imageSchema = z
  .object({
    file: z.file().optional(),
    url: z.string().optional(),
  })
  .optional();
export type ImageSchema = z.infer<typeof imageSchema>;

import z from "zod";

export const postRegisterSchema = z
  .object({
    content: z.string().min(1).max(280),
    images: z.array(z.file()).optional(),
  })
  .refine((data) => {
    const hasContent = data.content.length > 0;
    const hasImages = data.images && data.images.length > 0;
    return hasContent || hasImages;
  });

export type PostRegisterSchema = z.infer<typeof postRegisterSchema>;

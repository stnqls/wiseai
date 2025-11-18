import z from "zod";
import { imageSchema } from "@/_features/image/schemas/imageSchema.schema";

export const postRegisterSchema = z.object({
  content: z
    .string()
    .min(1, { message: "내용을 입력해주세요." })
    .max(280, { message: "내용은 280자 이하로 입력해주세요." }),
  images: z.array(imageSchema).optional(),
});

export type PostRegisterSchema = z.infer<typeof postRegisterSchema>;

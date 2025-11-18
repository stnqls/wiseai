import { useForm } from "react-hook-form";
import {
  postRegisterSchema,
  PostRegisterSchema,
} from "../schemas/postRegisterSchema.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostStore } from "@/_store/postStore";
import { useCallback } from "react";
import { useImageAttachment } from "@/_features/image/hooks/useImageAttachment";
import { useRouter } from "next/navigation";
import { pathUrls } from "@/_routes/path";

export function usePostForm() {
  const router = useRouter();

  // 게시글 작성
  const { writePost, isWrite } = usePostStore();

  const formMethods = useForm<PostRegisterSchema>({
    resolver: zodResolver(postRegisterSchema),
    defaultValues: {
      content: "",
      images: [],
    },
  });
  const { setValue, watch } = formMethods;

  // 이미지 업로드
  const { attachedImages, onAttachImage, onRemoveImage } = useImageAttachment({
    setValue,
    watch,
    name: "images",
  });

  const onSubmit = useCallback(
    async (data: PostRegisterSchema) => {
      try {
        await writePost({
          content: data.content,
          // 이미지 업로드api가 따로 없어서 업로드되는 이미지를 임시로 설정
          // images: data.images?.map((image) => image?.url ?? "") || [],
          images:
            data.images && data.images.length > 0
              ? ["https://picsum.photos/500/300?random=35"]
              : [],
        });

        router.push(pathUrls.home);
      } catch (error) {
        console.error(error);
        window.alert("게시글 작성에 실패했습니다.");
      }
    },
    [writePost, router]
  );

  return {
    ...formMethods,
    onSubmit,
    attachedImages,
    onAttachImage,
    onRemoveImage,
    isWrite,
  };
}

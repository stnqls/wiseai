import { useForm } from "react-hook-form";
import {
  postRegisterSchema,
  PostRegisterSchema,
} from "../schemas/postRegisterSchema.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostStore } from "@/_store/postStore";
import { useCallback } from "react";

export function usePostForm() {
  const { writePost } = usePostStore();

  const formMethods = useForm<PostRegisterSchema>({
    resolver: zodResolver(postRegisterSchema),
    defaultValues: {
      content: "",
      images: [],
    },
  });

  const onSubmit = useCallback(() => {
    writePost({
      id: Date.now(),
      createdAt: new Date().toISOString(),
      likes: 0,
      retweets: 0,
      comments: 0,
      isLiked: false,
      isRetweeted: false,
      isBookmarked: false,
      author: {
        name: "Anonymous",
        username: "anonymous",
        profileImage: "",
        verified: false,
      },
      content: "",
      images: [],
    });
  }, [writePost]);

  return {
    ...formMethods,
    onSubmit,
  };
}

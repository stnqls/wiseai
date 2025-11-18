import { usePostStore } from "@/_store/postStore";
import { toggleLikeApi } from "../apis/postLike.api";

export function useTogglePostLike() {
  const { toggleLike, rollbackPost } = usePostStore();

  // post 좋아요
  const onToggleLike = async (postId: number) => {
    const previousPost = toggleLike(postId);
    if (!previousPost) return;

    try {
      // post 좋아요 API 호출
      await toggleLikeApi(postId);
    } catch (error) {
      // 실패 시 롤백
      console.error(error);
      rollbackPost(previousPost);
    }
  };

  return { onToggleLike };
}

import { usePostStore } from "@/_store/postStore";
import { toggleBookmarkApi } from "../apis/postBookmark.api";

export function useTogglePostBookmark() {
  const { toggleBookmark, rollbackPost } = usePostStore();

  // post 북마크
  const onToggleBookmark = async (postId: number) => {
    const previousPost = toggleBookmark(postId);
    if (!previousPost) return;

    try {
      // post 북마크 API 호출
      await toggleBookmarkApi(postId);
    } catch (error) {
      // 실패 시 롤백
      console.error(error);
      rollbackPost(previousPost);
    }
  };

  return { onToggleBookmark };
}

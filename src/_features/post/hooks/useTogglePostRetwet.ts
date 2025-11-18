import { usePostStore } from "@/_store/postStore";
import { toggleRetweetApi } from "../apis/postRetweet.api";

export function useTogglePostRetweet() {
  const { toggleRetweet, rollbackPost } = usePostStore();

  // post 리트윗
  const onToggleRetweet = async (postId: number) => {
    const previousPost = toggleRetweet(postId);
    if (!previousPost) return;

    try {
      // post 리트윗 API 호출
      await toggleRetweetApi(postId);
    } catch (error) {
      // 실패 시 롤백
      console.error(error);
      rollbackPost(previousPost);
    }
  };

  return { onToggleRetweet };
}

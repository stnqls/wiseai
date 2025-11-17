// 무한 스크롤 또는 페이지네이션으로 게시물 목록 표시

import { getPostListData } from "@/_features/post/apis/getPostListData";
import PostCard from "@/_features/post/components/PostCard";

export default async function Home() {
  const postList = await getPostListData({ page: 1, limit: 10 });

  const onToggleLike = () => {};

  return (
    <div>
      {postList.map((post) => (
        <PostCard key={post.id} {...post} onToggleLike={onToggleLike} />
      ))}
    </div>
  );
}

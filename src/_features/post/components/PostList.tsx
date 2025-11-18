"use client";

import { Post } from "../apis/dtos/getPostList.dto";
import PostCard from "./PostCard";
import { useGetPostList } from "../hooks/useGetPostList";
import { useTogglePostLike } from "../hooks/useTogglePostLike";
import { useTogglePostRetweet } from "../hooks/useTogglePostRetwet";
import { useTogglePostBookmark } from "../hooks/useTogglePostBookmark";

export default function PostList({
  postList,
  limit,
}: {
  postList: Post[];
  limit: number;
}) {
  // 무한스크롤로 데이터 가져오기
  const { posts, inViewRef, isLoading } = useGetPostList({
    postList,
    limit,
  });

  // 좋아요
  const { onToggleLike } = useTogglePostLike();
  // 리트윗
  const { onToggleRetweet } = useTogglePostRetweet();
  // 북마크
  const { onToggleBookmark } = useTogglePostBookmark();

  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          {...post}
          onToggleLike={onToggleLike}
          onToggleRetweet={onToggleRetweet}
          onToggleBookmark={onToggleBookmark}
        />
      ))}

      {isLoading && (
        <div className="text-center text-20 font-semibold text-gray-800 py-26 flex items-center justify-center">
          Loading...
        </div>
      )}
      <div ref={inViewRef} />
    </>
  );
}

"use client";

import { Post } from "../apis/dtos/getPostList.dto";
import PostCard from "./PostCard";
import { useGetPostList } from "../hooks/useGetPostList";

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
  const onToggleLike = () => {};

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} onToggleLike={onToggleLike} />
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

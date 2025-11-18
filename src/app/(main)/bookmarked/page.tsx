"use client";

import PostCard from "@/_features/post/components/PostCard";
import { useGetBookmarkedPostList } from "@/_features/post/hooks/useGetBookmarkedPostList";
import { useTogglePostBookmark } from "@/_features/post/hooks/useTogglePostBookmark";
import { useTogglePostLike } from "@/_features/post/hooks/useTogglePostLike";
import { useTogglePostRetweet } from "@/_features/post/hooks/useTogglePostRetwet";

export default function BookmarkedPage() {
  // 무한스크롤로 데이터 가져오기
  const { bookmarkedPosts, inViewRef } = useGetBookmarkedPostList();
  // 좋아요
  const { onToggleLike } = useTogglePostLike();
  // 리트윗
  const { onToggleRetweet } = useTogglePostRetweet();
  // 북마크
  const { onToggleBookmark } = useTogglePostBookmark();

  if (bookmarkedPosts.length === 0) {
    return (
      <div className="text-center text-20 font-semibold text-gray-800 py-26 flex h-full items-center justify-center tablet:min-w-600">
        No bookmarked posts
      </div>
    );
  }
  return (
    <>
      {bookmarkedPosts.map((post) => (
        <PostCard
          key={post.id}
          {...post}
          onToggleLike={onToggleLike}
          onToggleRetweet={onToggleRetweet}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
      <div ref={inViewRef} />
    </>
  );
}

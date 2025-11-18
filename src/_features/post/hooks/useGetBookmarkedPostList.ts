import { useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { usePostStore } from "@/_store/postStore";

export function useGetBookmarkedPostList() {
  const limit = 5;
  const { posts: originalPosts } = usePostStore();
  const [page, setPage] = useState(1);
  // 무한스크롤
  const [inViewRef, inView] = useInView();

  const bookmarkedPosts = useMemo(() => {
    return originalPosts
      .filter((post) => post.isBookmarked)
      .slice(0, page * limit);
  }, [originalPosts, page, limit]);

  const totalBookmarked = originalPosts.filter(
    (post) => post.isBookmarked
  ).length;
  const isHasMore = bookmarkedPosts.length < totalBookmarked;

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!inView || !isHasMore) return;
    queueMicrotask(() => {
      loadMore();
    });
  }, [inView, isHasMore, loadMore]);

  return { bookmarkedPosts, isHasMore, inViewRef };
}

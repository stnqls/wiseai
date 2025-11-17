import { useCallback, useEffect, useState } from "react";
import { getPostListApi } from "../apis/getPostList.api";
import { Post } from "../apis/dtos/getPostList.dto";
import { useInView } from "react-intersection-observer";

export function useGetPostList({
  postList,
  limit,
}: {
  postList: Post[];
  limit: number;
}) {
  const [posts, setPosts] = useState<Post[]>(postList);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isHasMore, setIsHasMore] = useState(true);
  // 무한스크롤 체크
  const [inViewRef, inView] = useInView();

  const fetchNextPage = useCallback(async () => {
    if (isLoading || !isHasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const newPosts = await getPostListApi({ page: nextPage, limit });

      // 다음 데이터가 없는경우 더이상 데이터를 가져오지 않음
      if (newPosts.length === 0) return setIsHasMore(false);
      // 기존 데이터에 다음 데이터 추가
      setPosts((prev) => [...prev, ...newPosts]);
      // 페이지 번호 증가
      setPage(nextPage);
    } catch (error) {
      console.error("데이터 로딩 실패", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isHasMore, page, limit]);

  // 데이터 로딩
  useEffect(() => {
    if (!inView || !isHasMore) return;
    fetchNextPage();
  }, [inView, isHasMore, fetchNextPage]);

  return {
    posts,
    inViewRef,
    isLoading,
  };
}

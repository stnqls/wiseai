import { useCallback, useEffect, useState } from "react";
import { getPostListApi } from "../apis/getPostList.api";
import { Post } from "../apis/dtos/getPostList.dto";
import { useInView } from "react-intersection-observer";
import { usePostStore } from "@/_store/postStore";
import storageUtil from "@/_utils/storageUtil";
import { storageKey } from "@/_constants/storageKey";

export function useGetPostList({
  postList,
  limit,
}: {
  postList: Post[];
  limit: number;
}) {
  const { posts, addPosts, initPostList } = usePostStore();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isHasMore, setIsHasMore] = useState(true);
  // 무한스크롤
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
      addPosts(newPosts);
      // 페이지 번호 증가
      setPage(nextPage);
    } catch (error) {
      console.error("데이터 로딩 실패", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isHasMore, page, limit, addPosts]);

  // 초기 데이터 로딩
  useEffect(() => {
    const storagePostList = storageUtil.getSessionStorage(storageKey.POST_LIST);
    if (!storagePostList) return initPostList(postList);
    // storage에 데이터가 있는경우 저장된 데이터의 길이가 제한보다 크거나 같은경우 해당 페이지까지 데이터를 맞춰 보여준다.
    if (posts.length >= limit) {
      setPage(Math.floor(posts.length / limit));
    }
  }, [postList, initPostList, posts, limit]);

  // 데이터 로딩
  useEffect(() => {
    if (!inView || !isHasMore) return;
    fetchNextPage();
  }, [inView, isHasMore, fetchNextPage]);

  return {
    posts,
    inViewRef,
    isLoading,
    isHasMore,
  };
}

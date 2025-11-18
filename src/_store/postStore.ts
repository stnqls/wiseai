import { storageKey } from "@/_constants/storageKey";
import { Post } from "@/_features/post/apis/dtos/getPostList.dto";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PostStore {
  posts: Post[];
  initPostList: (posts: Post[]) => void;
  addPosts: (posts: Post[]) => void;
  toggleLike: (postId: number) => Post | null;
  toggleRetweet: (postId: number) => Post | null;
  toggleBookmark: (postId: number) => Post | null;
  rollbackPost: (post: Post) => void;
}

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      posts: [],

      // 초기 데이터 설정
      initPostList: (posts) => {
        set({ posts });
      },

      // 무한 스크롤로 가져온 데이터 추가
      addPosts: (newPosts) => {
        set((state) => ({
          posts: [...state.posts, ...newPosts],
        }));
      },

      // 좋아요 토글
      toggleLike: (postId) => {
        const state = get();
        const post = state.posts.find((post) => post.id === postId);
        if (!post) return null;

        // 이전 상태 저장 (롤백용)
        const previousPost = { ...post };

        // 즉시 UI 업데이트
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  isLiked: !post.isLiked,
                  likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                }
              : post
          ),
        }));

        return previousPost; // 롤백을 위해 이전 상태 반환
      },

      // 리트윗 토글
      toggleRetweet: (postId) => {
        const state = get();
        const post = state.posts.find((post) => post.id === postId);
        if (!post) return null;

        // 이전 상태 저장 (롤백용)
        const previousPost = { ...post };

        // 즉시 UI 업데이트
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  isRetweeted: !post.isRetweeted,
                  retweets: post.isRetweeted
                    ? post.retweets - 1
                    : post.retweets + 1,
                }
              : post
          ),
        }));

        return previousPost; // 롤백을 위해 이전 상태 반환
      },

      // 에러 발생 시 이전 상태로 롤백
      rollbackPost: (post) => {
        set((state) => ({
          posts: state.posts.map((p) => (p.id === post.id ? post : p)),
        }));
      },

      // 북마크 토글
      toggleBookmark: (postId) => {
        const state = get();
        const post = state.posts.find((post) => post.id === postId);
        if (!post) return null;

        // 이전 상태 저장 (롤백용)
        const previousPost = { ...post };

        // UI 업데이트
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  isBookmarked: !post.isBookmarked,
                }
              : post
          ),
        }));

        return previousPost; // 롤백을 위해 이전 상태 반환
      },
    }),
    {
      name: storageKey.POST_LIST,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

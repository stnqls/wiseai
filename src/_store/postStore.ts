import { storageKey } from "@/_constants/storageKey";
import { Post } from "@/_features/post/apis/dtos/getPostList.dto";
import { getUserData } from "@/_features/user/apis/getUserData";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PostStore {
  posts: Post[];
  isWrite: boolean;
  initPostList: (posts: Post[]) => void;
  addPosts: (posts: Post[]) => void;
  writePost: (post: Pick<Post, "content" | "images">) => Promise<void>;
  toggleLike: (postId: number) => Post | null;
  toggleRetweet: (postId: number) => Post | null;
  toggleBookmark: (postId: number) => Post | null;
  rollbackPost: (post: Post) => void;
}

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      posts: [],
      isWrite: false,
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

      // 게시물 작성
      writePost: async (post) => {
        set({ isWrite: true });
        try {
          const user = await getUserData();
          if (!user) return;

          const newPost: Post = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            likes: 0,
            retweets: 0,
            comments: 0,
            isLiked: false,
            isRetweeted: false,
            isBookmarked: false,
            author: {
              name: user.name,
              username: user.username,
              profileImage: user.profileImage,
              verified: user.verified,
            },
            content: post.content,
            images: post.images,
          };
          set((state) => ({
            posts: [newPost, ...state.posts],
          }));
        } catch (error) {
          set({ isWrite: false });
          throw error;
        } finally {
          set({ isWrite: false });
        }
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

      // 에러 발생 시 이전 상태로 롤백
      rollbackPost: (post) => {
        set((state) => ({
          posts: state.posts.map((p) => (p.id === post.id ? post : p)),
        }));
      },
    }),
    {
      name: storageKey.POST_LIST,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

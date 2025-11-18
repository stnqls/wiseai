export const toggleRetweetApi = async (postId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { success: true, postId };
};

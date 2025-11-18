import { Post } from "./dtos/getPostList.dto";

export const postWriteApi = async (post: Post) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { success: true, post };
};

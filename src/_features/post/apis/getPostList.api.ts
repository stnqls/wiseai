import postListData from "@/_data/posts.data.json";

export const getPostListApi = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 로딩 시뮬레이션
  return postListData.slice((page - 1) * limit, page * limit);
};

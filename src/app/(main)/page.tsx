import { getPostListApi } from "@/_features/post/apis/getPostList.api";
import PostList from "@/_features/post/components/PostList";

export default async function Home() {
  const limit = 10;
  const postList = await getPostListApi({ page: 1, limit });

  return <PostList postList={postList} limit={limit} />;
}

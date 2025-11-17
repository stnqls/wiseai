import Image from "next/image";
import { getRelativeDate } from "@/_utils/formatDate";
import HeartIcon from "@/assets/icons/heart.svg";
import RepeatIcon from "@/assets/icons/repeat.svg";
import CommentIcon from "@/assets/icons/comment.svg";
import UserProfile from "@/_features/user/components/UserProfile";
import VerifiedIcon from "@/assets/icons/verified.svg";
import BookmarkIcon from "@/assets/icons/bookmark.svg";
import MoreIcon from "@/assets/icons/more.svg";
import { Post } from "../apis/dtos/getPostList.dto";

interface PostCardProps extends Post {
  onToggleLike: () => void;
}

export default function PostCard({
  onToggleLike,
  author,
  content,
  comments,
  images,
  createdAt,
  likes,
  retweets,
  isLiked,
  isRetweeted,
}: PostCardProps) {
  return (
    <div className="flex gap-8 max-w-600 items-start px-16 py-12">
      {/* 프로필 이미지 */}
      <UserProfile
        src={author.profileImage}
        alt={author.name}
        width={40}
        height={40}
      />

      <div className="flex-1">
        {/* 작성자 정보 */}
        <div className="flex gap-4 items-end mb-2">
          <div className="flex items-center gap-4">
            <span className="text-16 font-bold">{author.name}</span>
            {author.verified && (
              <VerifiedIcon className="w-18 h-18 text-[#1C9BF0]" />
            )}
          </div>
          <span className="text-14 text-gray-600">@{author.username}</span>
          <span className="text-12 text-gray-600">·</span>
          <span className="text-12 text-gray-600">
            {getRelativeDate(createdAt)}
          </span>
        </div>
        {/* 게시물 내용 */}
        <div className="text-16 mb-12 text-gray-950">{content}</div>
        {images.length > 0 && (
          <div className="flex gap-4">
            {images.map((image) => (
              <Image
                key={image}
                src={image}
                alt="post image"
                width={100}
                height={100}
              />
            ))}
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="flex items-center ga mt-12 justify-between">
          <div className="flex items-center justify-between flex-2">
            <button className="flex items-center gap-4 text-12 text-gray-600">
              <CommentIcon className="w-18 h-18" />
              {comments}
            </button>
            <button className="flex items-center gap-4 text-12 text-gray-600">
              <RepeatIcon className="w-18 h-18" />
              {retweets}
            </button>
            <button className="flex items-center gap-4 text-12 text-gray-600">
              <HeartIcon className="w-18 h-18" />
              {likes}
            </button>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end">
            <button className="w-34 h-34 flex justify-center items-center rounded-full hover:bg-blue-50 hover:[&>svg]:text-blue-400">
              <BookmarkIcon className="w-18 h-18 text-gray-600 " />
            </button>
            <button className="w-34 h-34 flex justify-center items-center rounded-full hover:bg-blue-50 hover:[&>svg]:text-blue-400">
              <MoreIcon className="w-18 h-18 text-gray-600 " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

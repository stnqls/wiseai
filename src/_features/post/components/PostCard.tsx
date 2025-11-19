import { getRelativeDate } from "@/_utils/formatDate";
import HeartIcon from "@/assets/icons/heart.svg";
import RepeatIcon from "@/assets/icons/repeat.svg";
import CommentIcon from "@/assets/icons/comment.svg";
import UserProfile from "@/_features/user/components/UserProfile";
import VerifiedIcon from "@/assets/icons/verified.svg";
import BookmarkIcon from "@/assets/icons/bookmark.svg";
import MoreIcon from "@/assets/icons/more.svg";
import { Post } from "../apis/dtos/getPostList.dto";
import PostImageList from "./PostImageList";
import { cn } from "@/_lib/cn";
import ActionIconButton from "../../../_components/Button/ActionIconButton";

interface PostCardProps extends Post {
  onToggleLike: (postId: number) => void;
  onToggleRetweet: (postId: number) => void;
  onToggleBookmark: (postId: number) => void;
}

export default function PostCard({
  author,
  content,
  comments,
  images,
  createdAt,
  likes,
  retweets,
  isLiked,
  isRetweeted,
  isBookmarked,
  id,
  onToggleLike,
  onToggleRetweet,
  onToggleBookmark,
}: PostCardProps) {
  return (
    <div className="flex gap-8 tablet:w-600 items-start px-16 py-12">
      {/* 프로필 이미지 */}
      <UserProfile
        src={author.profileImage}
        alt={author.name}
        width={40}
        height={40}
      />

      <div className="flex-1">
        {/* 작성자 정보 */}
        <div className="flex gap-4 items-center mb-2">
          <div className="flex items-center gap-4">
            <span className="text-16 font-bold">{author.name}</span>
            {author.verified && (
              <VerifiedIcon className="w-18 h-18 text-[#1C9BF0]" />
            )}
          </div>
          <div className="flex items-end gap-4">
            <span className="text-14 text-gray-600">@{author.username}</span>
            <span className="text-12 text-gray-600">·</span>
            <span className="text-12 text-gray-600">
              {getRelativeDate(createdAt)}
            </span>
          </div>
        </div>
        {/* 게시물 내용 */}
        <div className="text-16 mb-12 text-gray-950">{content}</div>
        {images && images.length > 0 && <PostImageList images={images} />}

        {/* 하단 버튼 */}
        <div className="flex items-center ga mt-12 justify-between">
          <div className="flex items-center justify-between flex-2">
            <ActionIconButton
              icon={<CommentIcon className="w-18 h-18" />}
              text={comments}
            />
            <ActionIconButton
              icon={
                <RepeatIcon
                  className={cn("w-18 h-18", isRetweeted && "text-blue-500")}
                />
              }
              text={retweets}
              onClick={() => onToggleRetweet(id)}
            />
            <ActionIconButton
              icon={
                <HeartIcon
                  className={cn(
                    "w-18 h-18",
                    isLiked && "fill-red-500 text-red-500"
                  )}
                />
              }
              text={likes}
              onClick={() => onToggleLike(id)}
            />
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end">
            <button
              onClick={() => onToggleBookmark(id)}
              className="w-34 h-34 flex justify-center items-center rounded-full hover:bg-blue-50 hover:[&>svg]:text-blue-400"
            >
              <BookmarkIcon
                className={cn(
                  "w-18 h-18 text-gray-600",
                  isBookmarked && "fill-blue-500 text-blue-500"
                )}
              />
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

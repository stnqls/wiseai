export interface Post {
  id: number;
  createdAt: string;
  likes: number;
  retweets: number;
  comments: number;
  isLiked: boolean;
  isRetweeted: boolean;
  content: string;
  images: string[];
  author: Author;
  isBookmarked: boolean;
}

export interface Author {
  name: string;
  username: string;
  profileImage: string;
  verified: boolean;
}

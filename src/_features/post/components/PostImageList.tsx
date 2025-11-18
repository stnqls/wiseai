"use client";

import NextImage from "next/image";
import MoreIcon from "@/assets/icons/more.svg";
import { useGetImageSize } from "@/_features/image/hooks/useGetImageSize";

interface PostImageListProps {
  images: string[];
}

export default function PostImageList({ images }: PostImageListProps) {
  const { imageSizes, isLoading, isError } = useGetImageSize(images);

  if (isLoading || isError) {
    return (
      <div className="w-full h-390 bg-gray-200 rounded-12 animate-pulse" />
    );
  }

  if (images.length === 1 && imageSizes[0]) {
    const aspectRatio = imageSizes[0].width / imageSizes[0].height;

    return (
      <div
        className="relative max-h-490 w-full rounded-12 overflow-hidden"
        style={{
          aspectRatio: aspectRatio,
        }}
      >
        <NextImage
          src={images[0]}
          alt="post image"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    );
  }

  if (images.length >= 5) {
    return (
      <div className="grid grid-cols-2 gap-2 max-h-490 ">
        {images.slice(0, 3).map((image, idx) => {
          const aspectRatio = imageSizes[idx].width / imageSizes[idx].height;

          return (
            <div
              key={image}
              className={`relative w-full rounded-12 overflow-hidden`}
              style={{
                aspectRatio: aspectRatio,
              }}
            >
              <NextImage
                src={image}
                alt="post image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          );
        })}
        <div className="flex items-center justify-center">
          <MoreIcon className="w-28 h-28" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 max-h-490">
      {images.map((image, idx) => {
        const aspectRatio = imageSizes[idx].width / imageSizes[idx].height;

        return (
          <div
            key={image}
            className={`relative w-full rounded-12 overflow-hidden`}
            style={{
              aspectRatio: aspectRatio,
            }}
          >
            <NextImage
              src={image}
              alt="post image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        );
      })}
    </div>
  );
}

"use client";

import NextImage from "next/image";
import { useEffect, useState } from "react";
import MoreIcon from "@/assets/icons/more.svg";

interface PostImageListProps {
  images: string[];
}

export default function PostImageList({ images }: PostImageListProps) {
  const [imageSizes, setImageSizes] = useState<
    { width: number; height: number }[]
  >([]);

  useEffect(() => {
    Promise.all(
      images.map(
        (url) =>
          new Promise<{ width: number; height: number }>((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () =>
              resolve({ width: img.naturalWidth, height: img.naturalHeight });
          })
      )
    ).then(setImageSizes);
  }, [images]);

  if (images.length === 1 && imageSizes[0]) {
    const { width, height } = imageSizes[0];
    return (
      <div className={`relative w-full h-490`}>
        <NextImage
          src={images[0]}
          alt="post image"
          fill
          className="object-cover"
          sizes="100%"
        />
      </div>
    );
  }

  if (images.length >= 5) {
    return (
      <div className="grid grid-cols-2 gap-2 h-490">
        {images.slice(0, 3).map((image, idx) => {
          const size = imageSizes[idx];
          return (
            <div key={image} className={`relative w-full`}>
              <NextImage
                src={image}
                alt="post image"
                fill
                className="object-cover"
              />
            </div>
          );
        })}
        <div className="flex items-center justify-center">
          <MoreIcon className="w-48 h-48" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 h-490">
      {images.map((image, idx) => {
        const size = imageSizes[idx];
        return (
          <div key={image} className={`relative w-full`}>
            <NextImage
              src={image}
              alt="post image"
              fill
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}

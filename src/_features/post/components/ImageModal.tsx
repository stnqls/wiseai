"use client";

import { useGetImageSize } from "@/_features/image/hooks/useGetImageSize";
import { useModalStore } from "@/_store/modalStore";
import Image from "next/image";
import ChevronLeftIcon from "@/assets/icons/chevron_left.svg";
import ChevronRightIcon from "@/assets/icons/chevron_right.svg";
import XIcon from "@/assets/icons/x.svg";

export default function ImageModal() {
  // 이미지 모달
  const { isOpen, imageIndex, images, onClose, onPrev, onNext } =
    useModalStore();
  const { imageSizes, isLoading, isError } = useGetImageSize(images);

  if (!isOpen) return null;
  if (isLoading || isError || !imageSizes[imageIndex]) {
    return (
      <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
        <div className="absolute w-full h-full top-0 left-0 bg-black/80"></div>
        <div className="z-10 max-h-[calc(100vh-180px)] max-w-[1200px] w-full h-full bg-gray-200 rounded-12 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="absolute w-full h-full top-0 left-0 bg-black/80"></div>
      <button className="absolute top-24 right-24" onClick={onClose}>
        <XIcon className="w-30 h-30 text-white" />
      </button>
      {imageIndex > 0 ? (
        <button
          className="z-10 hover:bg-white/50 hover:rounded-full mx-12"
          onClick={() => onPrev(imageIndex)}
        >
          <ChevronLeftIcon className="w-40 h-40 text-white" />
        </button>
      ) : (
        <div className="w-40 h-40"></div>
      )}
      <div
        className="relative max-h-[calc(100vh-180px)] max-w-[1200px] w-full h-full z-10"
        style={{
          aspectRatio:
            imageSizes[imageIndex]?.width / imageSizes[imageIndex]?.height,
        }}
      >
        <Image
          src={images[imageIndex]}
          alt="image"
          fill
          //   sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain"
        />
      </div>
      {imageIndex < images.length - 1 ? (
        <button
          onClick={() => onNext(imageIndex)}
          className="z-10 hover:bg-white/50 hover:rounded-full ml-12"
        >
          <ChevronRightIcon className="w-40 h-40 text-white" />
        </button>
      ) : (
        <div className="w-40 h-40"></div>
      )}
    </div>
  );
}

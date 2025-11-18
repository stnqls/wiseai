"use client";

import { useGetImageSize } from "@/_features/image/hooks/useGetImageSize";
import { useModalStore } from "@/_store/modalStore";
import Image from "next/image";
import ChevronLeftIcon from "@/assets/icons/chevron_left.svg";
import ChevronRightIcon from "@/assets/icons/chevron_right.svg";
import Modal from "@/_components/Modal/Modal";

export default function ImageModal() {
  // 이미지 모달
  const { isOpen, imageIndex, images, onClose, onPrev, onNext } =
    useModalStore();
  const { imageSizes, isLoading, isError } = useGetImageSize(images);

  if (isLoading || isError || !imageSizes[imageIndex]) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="z-10 max-h-[calc(100vh-180px)] max-w-[1200px] w-full h-full bg-gray-200 rounded-12 animate-pulse" />
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
    </Modal>
  );
}

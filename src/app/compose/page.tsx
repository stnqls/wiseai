"use client";

import ImageAttachment from "@/_features/image/components/ImageAttachment";
import Textarea from "@/_components/Textarea/Textarea";
import Button from "@/_components/Button/Button";
import { pathUrls } from "@/_routes/path";
import ArrowLeftIcon from "@/assets/icons/arrow_left.svg";
import Link from "next/link";
import { usePostForm } from "@/_features/post/hooks/usePostForm";

export default function ComposePage() {
  const {
    handleSubmit,
    onSubmit,
    register,
    formState: { isValid },
    watch,
    attachedImages,
    onAttachImage,
    onRemoveImage,
    isWrite,
  } = usePostForm();
  const text = watch("content");

  return (
    <main className="h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pc:max-w-600 pc:mx-auto"
      >
        <div className="sticky top-0 left-0 bg-white h-53 flex items-center justify-between px-16">
          <Link href={pathUrls.home}>
            <ArrowLeftIcon className="w-24 h-24" />
          </Link>
          <Button
            variant="blue"
            size={36}
            className="w-80"
            disabled={!isValid || isWrite}
          >
            {isWrite ? "Posting" : "Post"}
          </Button>
        </div>
        <div className="p-16 flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Textarea
              placeholder="What's happening?"
              className="h-250"
              maxLength={280}
              {...register("content")}
            />
            <span className="self-end text-gray-500 text-12 px-12">
              {text.length}/280
            </span>
          </div>

          <ImageAttachment
            multiple
            attachedImages={attachedImages}
            onAttachImage={onAttachImage}
            onRemoveImage={onRemoveImage}
          />
        </div>
      </form>
    </main>
  );
}

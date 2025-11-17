"use client";

import ImageAttachment from "@/_components/ImageAttachment/ImageAttachment";
import Textarea from "@/_components/Textarea/Textarea";
// 게시물 작성 모달 또는 별도 페이지
// 텍스트 입력 (최대 280자 제한)
// 이미지 첨부 기능 (미리보기 포함)
// 실시간 글자 수 카운터
// 작성 완료 후 피드에 새 게시물 반영

import { ChangeEvent, useCallback, useState } from "react";
import Button from "@/_components/Button/Button";
import { pathUrls } from "@/_routes/path";
import ArrowLeftIcon from "@/assets/icons/arrow_left.svg";
import Link from "next/link";

export default function ComposePage() {
  const [text, setText] = useState("");

  const onChangeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
  }, []);

  return (
    <main className="h-full">
      <form className="pc:max-w-600 pc:mx-auto">
        <div className="sticky top-0 left-0 bg-white h-53 flex items-center justify-between px-16">
          <Link href={pathUrls.home}>
            <ArrowLeftIcon className="w-24 h-24" />
          </Link>
          <Button variant="blue" size={36} className="w-80" disabled={!text}>
            Post
          </Button>
        </div>
        <div className="p-16 flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Textarea
              placeholder="What's happening?"
              value={text}
              maxLength={280}
              onChange={onChangeText}
              className="h-250"
            />
            <span className="self-end text-gray-500 text-12 px-12">
              {text.length}/280
            </span>
          </div>

          <ImageAttachment multiple />
        </div>
      </form>
    </main>
  );
}

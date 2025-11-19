import { ComponentProps, useState } from "react";
import Image from "next/image";
import { cn } from "@/_lib/cn";
import ImageIcon from "@/assets/icons/image.svg";
import { ImageSchema } from "../schemas/imageSchema.schema";

interface ImageAttachmentProps extends ComponentProps<"input"> {
  classNames?: {
    label?: string;
    input?: string;
    icon?: string;
  };
  onAttachImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (url: string) => void;
  attachedImages: ImageSchema[];
}

export default function ImageAttachment({
  classNames,
  onAttachImage,
  onRemoveImage,
  attachedImages,
  ...props
}: ImageAttachmentProps) {
  const [key, setKey] = useState<number>(() => Date.now());

  return (
    <div className="flex w-full flex-col gap-8">
      <label
        className={cn(
          "hover:cursor-pointer w-fit has-focus:ring-2 has-focus:ring-blue-500 has-focus:ring-offset-2 has-focus:rounded-4",
          classNames?.label
        )}
      >
        <input
          key={key}
          type="file"
          accept="image/*, video/*"
          className={cn(
            "absolute w-1 h-1 opacity-0 pointer-events-none",
            classNames?.input
          )}
          onChange={onAttachImage}
          {...props}
        />
        <ImageIcon
          className={cn(
            "w-24 h-24 text-gray-500 hover:text-blue-500",
            classNames?.icon
          )}
        />
      </label>
      <div className="flex gap-4 flex-wrap">
        {attachedImages.length > 0 &&
          attachedImages.map((image) => (
            <div
              key={image?.url}
              className={`
                rounded-8 relative flex h-135 w-135 items-center justify-center overflow-hidden border-1 border-gray-300 cursor-pointer
                hover:after:content-['Delete'] hover:after:text-white hover:after:flex hover:after:items-center hover:after:justify-center hover:after:absolute hover:after:top-0 hover:after:right-0 hover:after:w-full hover:after:h-full hover:after:bg-black/50
                `}
              onClick={() => {
                onRemoveImage(image?.url || "");
                setKey(() => Date.now());
              }}
            >
              <Image
                src={image?.url || ""}
                alt="preview"
                fill
                className="object-contain"
              />
            </div>
          ))}
      </div>
    </div>
  );
}

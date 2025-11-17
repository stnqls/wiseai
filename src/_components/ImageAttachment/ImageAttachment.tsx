import { cn } from "@/_lib/cn";
import ImageIcon from "@/assets/icons/image.svg";
import { ComponentProps } from "react";

interface ImageAttachmentProps extends ComponentProps<"input"> {
  classNames?: {
    label?: string;
    input?: string;
    icon?: string;
  };
}

export default function ImageAttachment({
  classNames,
  ...props
}: ImageAttachmentProps) {
  return (
    <label
      className={cn(
        "hover:cursor-pointer w-fit has-focus:ring-2 has-focus:ring-blue-500 has-focus:ring-offset-2 has-focus:rounded-4",
        classNames?.label
      )}
    >
      <input
        type="file"
        accept="image/* video/*"
        className={cn(
          "absolute w-1 h-1 opacity-0 pointer-events-none",
          classNames?.input
        )}
        multiple
        {...props}
      />
      <ImageIcon
        className={cn(
          "w-24 h-24 text-gray-500 hover:text-blue-500",
          classNames?.icon
        )}
      />
    </label>
  );
}

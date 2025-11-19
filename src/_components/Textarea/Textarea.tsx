import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/_lib/cn";

const textareaVariants = cva(
  // 기본 스타일
  `
  w-full rounded-8 border-1 border-gray-300 resize-none p-16 font-b-14r text-gray-1000
  placeholder:text-gray-600
   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
 `
);

interface TextareaProps
  extends ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {}

export default function Textarea({ className, ...props }: TextareaProps) {
  return <textarea className={cn(textareaVariants(), className)} {...props} />;
}

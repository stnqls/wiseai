import { cn } from "@/_lib/cn";
import { ComponentProps } from "react";

interface ActionButtonProps
  extends Omit<ComponentProps<"button">, "className"> {
  icon: React.ReactNode;
  text: number;
  classNames?: {
    text?: string;
    button?: ComponentProps<"button">["className"];
  };
}

export default function ActionButton({
  icon,
  text,
  classNames,
  ...props
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        `flex items-center gap-4 w-40
      transition-all duration-500 
      active:scale-150 active:font-semibold `,
        classNames?.button
      )}
      {...props}
    >
      {icon}
      <span className={cn("text-12 text-gray-600", classNames?.text)}>
        {text}
      </span>
    </button>
  );
}

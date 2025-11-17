import { cn } from "@/_lib/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const buttonVariants = cva(
  `
  rounded-8 w-full whitespace-nowrap
  disabled:bg-gray-100 disabled:text-gray-500 
  focus:outline-solid focus:outline-1 focus:outline-gray-800
    `,
  {
    variants: {
      variant: {
        gray: "bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700",
      },
      size: {
        48: `h-48 font-b-14sb px-24`,
        36: `h-36 font-b-12r px-16`,
      },
    },
    defaultVariants: {
      variant: "gray",
      size: 48,
    },
  }
);

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export default function Button({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      //
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  );
}

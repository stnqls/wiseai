import Image from "next/image";
import { cn } from "@/_lib/cn";

interface UserProfileProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function UserProfile({
  src,
  alt,
  width,
  height,
  className,
}: UserProfileProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("rounded-full overflow-hidden mx-auto", className)}
    />
  );
}

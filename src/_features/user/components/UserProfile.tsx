import Image from "next/image";
import { cn } from "@/_lib/cn";

interface UserProfileProps {
  src: string;
  alt: string;
  className?: string;
}

export default function UserProfile({ src, alt, className }: UserProfileProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 40px, 50px" />
    </div>
  );
}

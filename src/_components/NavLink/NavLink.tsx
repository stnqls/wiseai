"use client";

import { cn } from "@/_lib/cn";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  className?: string;
}

const navLinkVariants = cva(
  `
  flex gap-6 w-50 h-56 pc:w-fit pc:h-50 justify-center pc:justify-start items-center pc:px-24 
 text-gray-500
hover:bg-gray-100 hover:rounded-full hover:text-black
    `,
  {
    variants: {
      isActive: {
        true: `bg-gray-100 rounded-full font-semibold text-black`,
        false: ``,
      },
    },
  }
);

export default function NavLink({
  href,
  icon,
  title,
  className,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = useMemo(() => pathname === href, [pathname, href]);

  return (
    <Link href={href} className={cn(navLinkVariants({ isActive }), className)}>
      {icon}
      <span className="text-16 hidden pc:block">{title}</span>
    </Link>
  );
}

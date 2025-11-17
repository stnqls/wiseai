"use client";

import Button from "@/_components/Button/Button";
import { pathUrls } from "@/_routes/path";
import ArrowLeftIcon from "@/assets/icons/arrow_left.svg";
import Link from "next/link";

export default function ComposeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <header className="sticky top-0 left-0 bg-white h-53 flex items-center justify-between px-16">
        <Link href={pathUrls.home}>
          <ArrowLeftIcon className="w-24 h-24" />
        </Link>
        <Button variant="blue" size={36} className="w-80">
          Post
        </Button>
      </header>
      <main className="p-16">{children}</main>
    </div>
  );
}

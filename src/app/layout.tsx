import "../_styles/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WiseAI",
  description: "WiseAI 프론트엔드 과제 전형",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="h-dvh">
        <main className="h-full">{children}</main>
      </body>
    </html>
  );
}

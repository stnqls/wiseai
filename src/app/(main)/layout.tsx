import Header from "@/_layouts/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full">
      <Header />
      <div className="flex-2 shrink-0">{children}</div>
    </div>
  );
}

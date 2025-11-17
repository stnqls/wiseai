import Header from "@/_layouts/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full max-w-742 pc:max-w-1230 mx-auto">
      <Header />
      <div className="flex-1 shrink-0">{children}</div>
    </div>
  );
}

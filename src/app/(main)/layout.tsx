import Header from "@/_layouts/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full">
      <Header />
      <div className="flex-grow-2 overflow-y-auto">{children}</div>
    </div>
  );
}

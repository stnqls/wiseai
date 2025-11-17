import Header from "@/_layouts/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full tablet:flex-row flex-col-reverse">
      <Header />
      <main className="flex-grow-2 overflow-y-auto">{children}</main>
    </div>
  );
}

export default function Home({
  header,
  sidebar,
}: {
  header: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center">
        {header}
        {sidebar}
      </main>
    </div>
  );
}

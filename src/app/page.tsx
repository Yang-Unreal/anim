import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center flex-col gap-3">
      <h1 className="text-4xl font-bold">Home</h1>
      <Link href="/about" className="underline text-blue-500">
        go to about
      </Link>
    </main>
  );
}

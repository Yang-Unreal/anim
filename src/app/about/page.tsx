import Link from "next/link";

export default function About() {
  return (
    <>
      <main className="h-screen flex items-center  flex-col gap-3">
        <h1 className="text-4xl font-bold">About</h1>
        <Link href="/" className="underline text-blue-500">
          go to home
        </Link>
      </main>
      <div className="w-full h-screen bg-orange-500"></div>
    </>
  );
}

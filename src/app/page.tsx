import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <main className="h-screen flex items-center  flex-col gap-3">
      <h1 className="text-4xl font-bold">Home</h1>
      <Link href="/about" className="underline text-blue-500">
        go to about
      </Link>

      <Image
        src="https://minio.limingcn.com/payload/media/002.jpg"
        width={300}
        height={300}
        alt={"car"}
      />
    </main>
  );
}

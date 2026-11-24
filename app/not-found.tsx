import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-6 py-24">
      <h1 className="font-serif text-4xl">404</h1>
      <p className="mt-4 text-[#3f3b35]">No está esta página.</p>
      <p className="mt-6">
        <Link href="/" className="underline underline-offset-4">
          Casa Cauduro
        </Link>
      </p>
    </main>
  );
}

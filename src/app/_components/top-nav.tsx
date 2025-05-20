import Link from "next/link";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div className="flex flex-row items-center gap-4">
        <Link href="/">Cryptocurrencies</Link>
      </div>
    </nav>
  );
}

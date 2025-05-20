"use client";
import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
import Table from "./_components/table";
import { fetchCoins } from "../lib/features/coin/coinSlice";
import TableSkeleton from "./_components/table-skeleton";

export default function HomePage() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { status, coins } = useAppSelector((state) => state.coins);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCoins()).catch((e) => console.error(e));
    }
    intervalRef.current = setInterval(() => void dispatch(fetchCoins()), 5000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [dispatch, status]);

  const data = coins ?? [];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        {data.length === 0 ? <TableSkeleton /> : <Table data={data} />}
      </div>
    </main>
  );
}

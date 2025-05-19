"use client";
import { env } from "../env";
import { useEffect, useState, useRef } from "react";
import Table from "./_components/table";
// import { useSSEWithReconnect } from "./hooks/useSSEWithReconnect";
interface Asset {
  changePercent24Hr: string;
  explorer: string;
  id: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
}

interface AssetResponse {
  data: Readonly<Asset[]>;
  timestamp: number;
}

export default function HomePage() {
  const [data, setData] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchAssets() {
      setIsLoading(true);
      try {
        const response = await fetch(`https://rest.coincap.io/v3/assets`, {
          method: "GET",
          headers: {
            "Content-Type": "accept: application/json",
            Authorization: `Bearer ${env.NEXT_PUBLIC_APIKEY}`,
          },
        });
        const assets = (await response.json()) as AssetResponse;
        const assetsData = assets.data.slice(0, 20);

        setData(assetsData);
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAssets().catch((e) => console.error(e));
    intervalRef.current = setInterval(() => void fetchAssets(), 5000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        {isLoading ? "Loading..." : <Table data={data} />}
      </div>
    </main>
  );
}

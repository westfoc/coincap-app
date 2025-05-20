"use client";

import { useState, useEffect, useRef } from "react";
import { env } from "../../env";
import Chart from "./chart";
import type { IndividualAsset, Asset } from "../../types";

function formatUSDCurrency(num: bigint | number, isCompact = false) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: isCompact ? "compact" : "standard",
    minimumFractionDigits: isCompact ? 2 : 0,
  }).format(num);
}

function formatNumber(num: number) {
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    minimumFractionDigits: 2,
  });

  return formatter.format(num);
}

interface RealTimeAssetUpdaterProps {
  initialData: Asset;
  assetId: string;
}

export default function RealTimeAssetUpdater({
  initialData,
  assetId,
}: RealTimeAssetUpdaterProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    async function fetchLatestData() {
      const resp = await fetch(`https://rest.coincap.io/v3/assets/${assetId}`, {
        method: "GET",
        headers: {
          "Content-Type": "accept: application/json",
          Authorization: `Bearer ${env.NEXT_PUBLIC_APIKEY}`,
        },
      });

      const parsedResp = (await resp.json()) as IndividualAsset;
      const dataParsed = parsedResp.data;
      setData(dataParsed);
    }

    intervalRef.current = setInterval(() => void fetchLatestData, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [assetId]);

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row justify-center pt-6">
        <div className="flex w-3/5 flex-row flex-wrap items-end gap-5 border-t border-r border-l border-gray-200 p-5">
          <div>
            <h1 className="text-[28px] leading-9 font-semibold">
              {data.name} {data.symbol}
            </h1>
          </div>
          <div className="flex flex-wrap text-right align-bottom">
            <h3 className="text-[40px] leading-10 font-normal">
              {formatUSDCurrency(parseInt(data.priceUsd))}
            </h3>
            <p className="text-2xl">
              (${Number(data.changePercent24Hr).toFixed(2)}%)
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row justify-center">
        <div className="flex w-3/5 flex-row flex-wrap items-stretch gap-10 border border-gray-200 p-5">
          <div className="text-left">
            <div className="mb-2">
              <h3>Popularity</h3>
              <h2>{`#${data.rank}`}</h2>
            </div>
            <div>
              <h3>Volume (24Hr)</h3>
              <p>{formatUSDCurrency(parseInt(data.volumeUsd24Hr), true)}</p>
            </div>
          </div>
          <div>
            <div className="mb-2">
              <h3>Market Cap</h3>
              <p>{formatUSDCurrency(parseInt(data.marketCapUsd), true)}</p>
            </div>
            <h3>Supply</h3>
            <p>{formatNumber(Number(data.supply))}</p>
          </div>
          <div></div>
        </div>
      </div>
      <div className="mb-10 flex w-full flex-row justify-center">
        <div className="flex w-3/5 flex-row flex-wrap items-stretch border-r border-b border-l border-gray-200 pt-4 pr-4 pb-4 pl-4">
          <Chart id={assetId} />
        </div>
      </div>
    </div>
  );
}

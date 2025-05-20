"use client";
import { useRouter } from "next/navigation";

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

interface TableProps {
  data: Readonly<Asset[]>;
}

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

export default function Table({ data }: TableProps) {
  const router = useRouter();

  if (!data.length) return null;

  return (
    <div className="not-prose w-full overflow-auto rounded-lg outline outline-white/5 max-[600px]:w-4/5 max-[600px]:bg-white">
      <div className="mt-4 overflow-hidden">
        <table className="w-full table-auto border-collapse text-sm">
          <thead className="bg-white pt-2 dark:bg-gray-900">
            <tr>
              <th className="border-b border-gray-200 p-4 pt-0 pt-4 pb-3 pl-8 text-left font-medium text-gray-400 max-[600px]:hidden dark:border-gray-600 dark:text-gray-200">
                Rank
              </th>
              <th className="border-b border-gray-200 p-4 pt-0 pt-4 pb-3 pl-8 text-left font-medium text-gray-400 max-[600px]:hidden dark:border-gray-600 dark:text-gray-200">
                Name
              </th>
              <th className="border-b border-gray-200 p-4 pt-0 pt-4 pb-3 pl-8 text-left font-medium text-gray-400 max-[600px]:hidden dark:border-gray-600 dark:text-gray-200">
                Price
              </th>
              <th className="border-b border-gray-200 p-4 pt-0 pt-4 pb-3 pl-8 text-left font-medium text-gray-400 max-[600px]:hidden dark:border-gray-600 dark:text-gray-200">
                VWAP (24hr)
              </th>
              <th className="border-b border-gray-200 p-4 pt-0 pt-4 pb-3 pl-8 text-left font-medium text-gray-400 max-[600px]:hidden dark:border-gray-600 dark:text-gray-200">
                Supply
              </th>
              <th className="border-b border-gray-200 p-4 pt-0 pt-4 pb-3 pl-8 text-left font-medium text-gray-400 max-[600px]:hidden dark:border-gray-600 dark:text-gray-200">
                Market Cap
              </th>
              <th className="border-b border-gray-200 p-4 pt-0 pt-4 pb-3 pl-8 text-left font-medium text-gray-400 max-[600px]:hidden dark:border-gray-600 dark:text-gray-200">
                Volume
              </th>
              <th className="border-b border-gray-200 p-4 pt-0 pt-4 pb-3 pl-8 text-left font-medium text-gray-400 max-[600px]:hidden dark:border-gray-600 dark:text-gray-200">
                Change (24Hr)
              </th>
            </tr>
          </thead>
          <tbody className="w-full bg-white dark:bg-gray-800">
            {data.map((item) => (
              <tr
                key={item.id}
                className="cursor-pointer hover:bg-gray-700"
                onClick={() => router.push(`/coin/${item.id}`)}
              >
                <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 max-[600px]:flex max-[600px]:flex-1 max-[600px]:justify-between dark:border-gray-700 dark:text-gray-400">
                  <span className="hidden max-[600px]:block max-[600px]:font-bold">
                    Rank:{" "}
                  </span>
                  {item.rank}
                </td>
                <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 max-[600px]:flex max-[600px]:flex-1 max-[600px]:justify-between dark:border-gray-700 dark:text-gray-400">
                  <span className="hidden max-[600px]:block max-[600px]:font-bold">
                    Name:{" "}
                  </span>
                  {item.name}
                </td>
                <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 max-[600px]:flex max-[600px]:flex-1 max-[600px]:justify-between dark:border-gray-700 dark:text-gray-400">
                  <span className="hidden max-[600px]:block max-[600px]:font-bold">
                    Price:{" "}
                  </span>
                  {formatUSDCurrency(Number(item.priceUsd), true)}
                </td>
                <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 max-[600px]:flex max-[600px]:flex-1 max-[600px]:justify-between dark:border-gray-700 dark:text-gray-400">
                  <span className="hidden max-[600px]:block max-[600px]:font-bold">
                    VWAP (24hr):{" "}
                  </span>
                  {formatUSDCurrency(Number(item.vwap24Hr), true)}
                </td>
                <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 max-[600px]:flex max-[600px]:flex-1 max-[600px]:justify-between dark:border-gray-700 dark:text-gray-400">
                  <span className="hidden max-[600px]:block max-[600px]:font-bold">
                    Supply:{" "}
                  </span>
                  {formatNumber(Number(item.supply))}
                </td>
                <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 max-[600px]:flex max-[600px]:flex-1 max-[600px]:justify-between dark:border-gray-700 dark:text-gray-400">
                  <span className="hidden max-[600px]:block max-[600px]:font-bold">
                    Market Cap:{" "}
                  </span>
                  {formatUSDCurrency(Number(item.marketCapUsd), true)}
                </td>
                <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 max-[600px]:flex max-[600px]:flex-1 max-[600px]:justify-between dark:border-gray-700 dark:text-gray-400">
                  <span className="hidden max-[600px]:block max-[600px]:font-bold">
                    Volume:
                  </span>
                  {formatNumber(Number(item.volumeUsd24Hr))}
                </td>
                <td className="border-b border-gray-100 p-4 pl-8 text-gray-500 max-[600px]:flex max-[600px]:flex-1 max-[600px]:justify-between dark:border-gray-700 dark:text-gray-400">
                  <span className="hidden max-[600px]:block max-[600px]:font-bold">
                    Change (24Hr):{" "}
                  </span>
                  {Number(item.changePercent24Hr).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

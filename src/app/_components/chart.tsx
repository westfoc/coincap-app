"use client";
import { useEffect, useState } from "react";
import { env } from "./../../env";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

interface HistoryData {
  priceUsd: string;
  time: number;
  date: string;
}

interface HistoryResponse {
  data: HistoryData[];
  timestamp: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

interface ChartProps {
  id: string;
}

function formatMD(date: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateStr = new Date(date);

  const month = months[dateStr.getMonth()];
  const day = dateStr.getDate();

  return `${month} ${day + 1}`;
}

export default function Chart({ id }: ChartProps) {
  const [timePeriod, setTimePeriod] = useState("d1");
  const [dataHistory, setDataHistory] = useState<HistoryData[]>([]);
  useEffect(() => {
    async function fetchAssetHistory() {
      const resp = await fetch(
        `https://rest.coincap.io/v3/assets/${id}/history?interval=${timePeriod}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "accept: application/json",
            Authorization: `Bearer ${env.NEXT_PUBLIC_APIKEY}`,
          },
        },
      );
      const assetHistory = (await resp.json()) as HistoryResponse;
      const dataHistory = assetHistory.data;
      setDataHistory(dataHistory);
    }

    fetchAssetHistory().catch((e) => console.error(e));
  }, [timePeriod, id]);

  const timePeriodButtons = [{ label: "1Y", value: "d1" }];

  const data = {
    labels: dataHistory.map((datum) => formatMD(datum.date)),
    datasets: [
      {
        label: "Prices",
        data: dataHistory.map((datum) => datum.priceUsd),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data} />
      {timePeriodButtons.map((button) => (
        <div className="mt-3 ml-3 flex flex-row" key={button.label}>
          <button
            className={`pointer rounded-[10rem] border border-[rgb(24,198,131)] ${timePeriod === button.value ? "bg-[rgb(24,198,131)]" : "bg-white"} px-4 py-2 ${timePeriod === button.value ? "text-white" : "text-[rgb(24,198,131)]"}`}
            onClick={() => setTimePeriod(button.value)}
          >
            {button.label}
          </button>
        </div>
      ))}
    </>
  );
}

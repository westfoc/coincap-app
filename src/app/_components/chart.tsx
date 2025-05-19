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
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

interface ChartProps {
  id: string;
}

export default function Chart({ id }: ChartProps) {
  const [interval, setInterval] = useState("d1");
  const [dataHistory, setDataHistory] = useState<HistoryData[]>([]);
  useEffect(() => {
    async function fetchAssetHistory() {
      const resp = await fetch(
        `https://rest.coincap.io/v3/assets/${id}/history?interval=${interval}`,
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
      console.log(dataHistory);
    }

    fetchAssetHistory().catch((e) => console.error(e));
  }, [interval, id]);
  console.log(dataHistory);

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

  const data = {
    labels: dataHistory.map((datum) => formatMD(datum.date)),
    datasets: [
      {
        label: "Dataset 1",
        data: dataHistory.map((datum) => datum.priceUsd),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}

"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  TooltipItem, // ✅ type for tooltip callback
} from "chart.js";
import { formatSecondsToLabel } from "../../utils/formatTime";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip);

interface Props {
  data: { timeSec: number; count: number }[];
}

export default function HypeLineChart({ data }: Props) {
  const chartData = {
    labels: data.map((d) => formatSecondsToLabel(d.timeSec)),
    datasets: [
      {
        label: "Hype Intensity",
        data: data.map((d) => d.count),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: (items: TooltipItem<"line">[]) => {
            const sec = data[items[0].dataIndex].timeSec;
            return formatSecondsToLabel(sec);
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

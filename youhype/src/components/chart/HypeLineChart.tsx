"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  TooltipItem,
  ActiveElement,
} from "chart.js";
import { formatSecondsToLabel } from "../../utils/formatTime";
import { useState } from "react";
import Toast from "../common/Toast";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip);

interface Props {
  data: { timeSec: number; count: number }[];
  smoothed: { timeSec: number; count: number }[];
  peaks: { timeSec: number; count: number }[];
  onSeek: (timeSec: number) => void; // ✅ passed down from page
}

export default function HypeLineChart({ data, smoothed, peaks, onSeek }: Props) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const peakMap = new Map(peaks.map((p) => [p.timeSec, p.count]));
  const peakSeries = data.map((d) => peakMap.get(d.timeSec) ?? null);

  const chartData = {
    labels: data.map((d) => formatSecondsToLabel(d.timeSec)),
    datasets: [
      {
        label: "Raw Hype",
        data: data.map((d) => d.count),
        borderColor: "rgba(255, 99, 132, 0.5)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
      {
        label: "Smoothed Hype",
        data: smoothed.map((d) => d.count),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
      },
      {
        label: "Detected Peaks",
        data: peakSeries,
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgb(255, 206, 86)",
        pointStyle: "triangle",
        pointRadius: 6,
        showLine: false,
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
    onClick: (_event: unknown, elements: ActiveElement[]) => {
      if (!elements.length) return;
      const index = elements[0].index;
      const sec = data[index].timeSec;

      // ✅ call onSeek to jump the YouTube player
      onSeek(sec);

      // optional toast feedback
      const label = formatSecondsToLabel(sec);
      setToastMessage(`Seeked to ${label}`);
    },
  };

  return (
    <>
      <Line data={chartData} options={options} />
      {toastMessage && <Toast message={toastMessage} />}
    </>
  );
}

"use client";

import FilePicker from "../components/common/FilePicker";
import HypeLineChart from "../components/chart/HypeLineChart";
import { useReplayFile } from "../hooks/useReplayFile";

export default function Page() {
  const { data, handleFile } = useReplayFile();

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">YouTube Stream Hype Timeline</h1>
      <FilePicker onFileSelected={handleFile} />
      {data.length > 0 && <HypeLineChart data={data} />}
    </main>
  );
}

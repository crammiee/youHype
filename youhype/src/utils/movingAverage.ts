export function movingAverage(
  data: { timeSec: number; count: number }[],
  windowSize: number = 5
): { timeSec: number; count: number }[] {
  const smoothed: { timeSec: number; count: number }[] = [];

  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const window = data.slice(start, i + 1);
    const avg =
      window.reduce((sum, d) => sum + d.count, 0) / window.length;

    smoothed.push({ timeSec: data[i].timeSec, count: avg });
  }

  return smoothed;
}

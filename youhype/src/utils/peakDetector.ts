export function detectPeaks(
  data: { timeSec: number; count: number }[],
  thresholdMultiplier: number = 2
): { timeSec: number; count: number }[] {
  if (data.length === 0) return [];

  const avg =
    data.reduce((sum, d) => sum + d.count, 0) / data.length;

  const threshold = avg * thresholdMultiplier;

  return data.filter((d) => d.count >= threshold);
}

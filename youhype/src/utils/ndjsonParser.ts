import { RawReplayObject } from '@/types/RawReplayObject';

export function parseNdjson(lines: string[]): RawReplayObject[] {
  return lines.map((line) => JSON.parse(line) as RawReplayObject);
}
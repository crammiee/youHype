import { create } from "zustand";

export interface ReplayEntry {
  timeSec: number;
  count: number;
}

interface ReplayState {
  data: ReplayEntry[];
  smoothed: ReplayEntry[];
  peaks: ReplayEntry[];
  setReplay: (payload: {
    data: ReplayEntry[];
    smoothed: ReplayEntry[];
    peaks: ReplayEntry[];
  }) => void;
}

export const useReplayStore = create<ReplayState>((set) => ({
  data: [],
  smoothed: [],
  peaks: [],
  setReplay: ({ data, smoothed, peaks }) =>
    set({ data, smoothed, peaks }),
}));

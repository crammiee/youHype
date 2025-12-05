// src/components/common/Toast.tsx
"use client";

import { useEffect, useState } from "react";

interface Props {
  message: string;
  duration?: number; // ms
}

export default function Toast({ message, duration = 2000 }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg text-sm">
      {message}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface Toast {
  id: number;
  message: string;
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function addToast(message: string, duration: number = 2000) {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }

  useEffect(() => {
    window.addToast = addToast;
    return () => {
      delete window.addToast; // cleanup on unmount
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-black text-white px-4 py-2 rounded shadow-lg text-sm transition-opacity duration-500"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

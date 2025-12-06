"use client";

import { useState, DragEvent } from "react";

interface Props {
  onFileSelected: (file: File) => void;
}

export default function FilePicker({ onFileSelected }: Props) {
  const [isDragging, setIsDragging] = useState(false);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      onFileSelected(file);
      e.dataTransfer.clearData();
    }
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onFileSelected(file);
    }
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`border-2 border-dashed rounded p-6 text-center cursor-pointer transition-colors ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <p className="mb-2">
        Drag & drop your replay JSON file here, or click to select
      </p>
      <input
        type="file"
        accept=".json"
        onChange={handleFileInput}
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer"
      >
        Choose File
      </label>
    </div>
  );
}

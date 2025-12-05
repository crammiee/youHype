"use client";

interface Props {
  onFileSelected: (file: File) => void;
}

export default function FilePicker({ onFileSelected }: Props) {
  return (
    <div>
      <input
        type="file"
        accept=".txt, .json"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelected(file);
        }}
      />
    </div>
  );
}

import React from "react";

interface AccentButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export default function AccentButton({
  children,
  onClick,
  type = "button",
  className = "",
}: AccentButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-3 rounded-lg font-medium 
                  bg-gradient-to-r from-accent to-purple-600 
                  hover:from-purple-600 hover:to-accent 
                  transition-all duration-300 shadow-lg
                  ${className}`}
    >
      {children}
    </button>
  );
}

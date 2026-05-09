import { motion } from "motion/react";

interface InsertCoinButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function InsertCoinButton({ 
  onClick, 
  label = "INSERT COIN", 
  className = "",
  variant = "primary"
}: InsertCoinButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`w-full py-4 font-headline text-2xl tracking-widest transition-all active:translate-y-1 active:translate-x-1 ${
        variant === "primary" 
          ? "bg-secondary-fixed text-surface shadow-[4px_4px_0_0_#6c6200]" 
          : "bg-primary text-surface shadow-[4px_4px_0_0_#00566a]"
      } ${className}`}
      id="insert-coin-button"
    >
      {label}
    </motion.button>
  );
}

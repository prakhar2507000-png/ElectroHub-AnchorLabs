import { motion } from "motion/react";
import { ReactNode } from "react";

interface PixelCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  headerIcon?: ReactNode;
  key?: string | number;
}

export default function PixelCard({ 
  title, 
  subtitle, 
  children, 
  variant = "primary",
  headerIcon
}: PixelCardProps) {
  const colors = {
    primary: "border-primary bg-surface-container",
    secondary: "border-secondary-fixed bg-surface-container",
    tertiary: "border-tertiary bg-surface-container-highest",
  };

  const headerColors = {
    primary: "bg-primary text-on-primary",
    secondary: "bg-secondary-fixed text-on-secondary",
    tertiary: "bg-tertiary text-on-tertiary",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative border-2 ${colors[variant]} overflow-hidden group hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-shadow`}
      id={`card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className={`px-4 py-2 flex justify-between items-center ${headerColors[variant]}`}>
        <span className="font-label text-xs uppercase tracking-widest drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">{title}</span>
        {headerIcon}
      </div>
      <div className="p-4">
        {subtitle && <p className="font-label text-[10px] text-outline mb-2 uppercase">{subtitle}</p>}
        {children}
      </div>
    </motion.div>
  );
}

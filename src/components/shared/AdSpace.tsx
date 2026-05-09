import { motion } from "motion/react";
import AdSense from "./AdSense";
import { Info } from "lucide-react";

interface AdSpaceProps {
  variant?: "horizontal" | "vertical" | "square";
  className?: string;
  adSlot?: string; // Add your slot ID from AdSense
}

export default function AdSpace({ variant = "horizontal", className = "", adSlot }: AdSpaceProps) {
  const sizes = {
    horizontal: "w-full h-32",
    vertical: "w-64 h-full min-h-[400px]",
    square: "w-full aspect-square max-w-sm",
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className={`${sizes[variant]} bg-surface-container-highest border-4 border-dashed border-outline-variant relative flex flex-col items-center justify-center overflow-hidden ${className} shadow-[inset_0_0_20px_rgba(165,231,255,0.1)]`}
    >
      <div className="absolute inset-0 dither-pattern opacity-10" />
      
      {adSlot ? (
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <AdSense adSlot={adSlot} />
        </div>
      ) : (
        <div className="relative z-10 text-center p-4">
          <div className="bg-primary/20 text-primary border-2 border-primary px-4 py-2 font-label text-[8px] uppercase tracking-widest mb-3 italic">
            COMMERCIAL_INTERCEPT
          </div>
          <p className="font-headline text-sm text-outline-variant uppercase tracking-tighter">HARDWARE_REVENUE_NODE</p>
          <p className="font-label text-[6px] text-outline uppercase mt-2">Space reserved for premium hardware partners</p>
          <button className="mt-4 px-6 py-2 bg-outline-variant text-[8px] font-bold font-label uppercase hover:bg-primary hover:text-surface transition-all border-2 border-primary/20">
            BOOK_SLOT
          </button>
        </div>
      )}
    </motion.div>
  );
}

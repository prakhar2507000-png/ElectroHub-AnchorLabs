import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Store } from "lucide-react";

interface ShopkeeperProps {
  onClick: () => void;
}

export default function Shopkeeper({ onClick }: ShopkeeperProps) {
  const [isWaving, setIsWaving] = useState(false);

  useEffect(() => {
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 2000);
    }, 5000);

    return () => clearInterval(waveInterval);
  }, []);

  return (
    <div 
      className="fixed bottom-6 right-6 z-[60] flex flex-col items-end group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative mb-2">
        {/* Speech Bubble */}
        <div className="absolute -top-16 right-0 bg-surface border-4 border-primary p-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-[4px_4px_0_0_#003543]">
          <p className="font-label text-[10px] text-primary uppercase">Gear up, Tech!</p>
        </div>
        
        {/* Detailed 8-bit Shop Structure inspired by image */}
        <div className="w-24 h-24 relative pixelated bg-surface-container border-4 border-primary overflow-hidden shadow-[8px_8px_0_0_#003543]">
           {/* Roof */}
           <div className="absolute top-0 left-0 w-full h-4 bg-primary/20 border-b-4 border-primary" />
           {/* Signage */}
           <div className="absolute top-6 left-2 right-2 h-6 bg-error border-2 border-primary flex items-center justify-center">
              <span className="text-[6px] text-surface font-headline animate-pulse tracking-tighter">D1EEN</span>
           </div>
           {/* Counter */}
           <div className="absolute bottom-0 left-0 w-full h-8 bg-secondary-fixed border-t-2 border-primary" />
           
           {/* The Shopkeeper */}
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-10">
              {/* Head */}
              <div className="absolute top-0 left-1 w-6 h-6 bg-[#ffdbac] border-2 border-primary" />
              {/* Arm that waves */}
              <motion.div 
                animate={isWaving ? { rotate: [0, -40, 0, -40, 0] } : {}}
                transition={{ duration: 1 }}
                className="absolute top-4 -right-1 w-2 h-4 bg-[#ffdbac] border-2 border-primary origin-top"
              />
           </div>
        </div>
      </div>
    </div>
  );
}

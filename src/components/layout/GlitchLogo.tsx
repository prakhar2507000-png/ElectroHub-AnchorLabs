import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface GlitchLogoProps {
  onClick: () => void;
}

export default function GlitchLogo({ onClick }: GlitchLogoProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150 + Math.random() * 200);
      }
    }, 1000);

    return () => clearInterval(glitchInterval);
  }, []);

  const glitchVariants = {
    glitch: {
      x: [0, -2, 2, -1, 1, 0],
      y: [0, 1, -1, 2, -2, 0],
      skew: [0, 5, -5, 10, -10, 0],
      transition: { duration: 0.2 }
    }
  };

  return (
    <div 
      className="relative cursor-pointer group" 
      onClick={onClick}
      id="main-logo-container"
    >
      <motion.h1 
        animate={isGlitching ? "glitch" : ""}
        variants={glitchVariants}
        className="font-headline text-2xl md:text-4xl italic font-black relative z-10 text-pixel-3d-cyan tracking-tight"
      >
        ELECTROHUB
      </motion.h1>
      
      <AnimatePresence>
        {isGlitching && (
          <>
            <motion.h1 
              initial={{ opacity: 0.8, x: -3, y: 1 }}
              animate={{ opacity: [0, 0.8, 0], x: [-3, 3, -3], y: [1, -1, 1] }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 font-headline text-2xl md:text-4xl italic font-black text-error mix-blend-screen z-0"
            >
              ELECTROHUB
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0.8, x: 3, y: -1 }}
              animate={{ opacity: [0, 0.8, 0], x: [3, -3, 3], y: [-1, 1, -1] }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 font-headline text-2xl md:text-4xl italic font-black text-secondary-fixed mix-blend-screen z-0"
            >
              ELECTROHUB
            </motion.h1>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

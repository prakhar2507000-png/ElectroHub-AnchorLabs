import React, { useState, useRef } from "react";
import { evaluateBuild, EvaluationResult } from "../../services/evaluatorService";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Scan, ShieldCheck, ShieldAlert, Cpu, Zap, RotateCcw } from "lucide-react";

export default function BuildEvaluator() {
  const [image, setImage] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [projectTitle, setProjectTitle] = useState("Raspberry Pi Home Server");
  const [projectDesc, setProjectDesc] = useState("A compact home server using RPi 5, 8GB RAM, and an NVMe SSD.");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startEvaluation = async () => {
    if (!image) return;
    setIsEvaluating(true);
    setResult(null);

    // Simulate some "scanning" time for drama
    await new Promise(resolve => setTimeout(resolve, 2000));

    const evalResult = await evaluateBuild(projectTitle, projectDesc, image);
    setResult(evalResult);
    setIsEvaluating(false);
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setIsEvaluating(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8" id="build-evaluator">
      <header className="border-b-8 border-error pb-6 text-center lg:text-left bg-surface-container-highest p-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-error/5 animate-pulse pointer-events-none" />
        <h1 className="font-headline text-6xl uppercase italic tracking-tighter relative z-10 text-pixel-3d">AI_EVALUATOR</h1>
        <div className="flex items-center justify-center lg:justify-start gap-4 mt-4 relative z-10">
          <span className="bg-error text-surface font-label text-xs px-4 py-1 uppercase tracking-widest font-bold">LEVEL: FINAL BOSS</span>
          <p className="font-label text-[10px] text-outline tracking-widest uppercase">Indifferent Hardware Audit In Progress...</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Input Phase */}
        <section className="space-y-6">
          <div 
            onClick={() => !isEvaluating && fileInputRef.current?.click()}
            className={`aspect-square border-4 border-dashed relative flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden ${
              image ? "border-primary" : "border-outline-variant hover:border-primary group"
            }`}
          >
            {image ? (
              <>
                <img src={image} alt="Submission" className="w-full h-full object-cover" />
                {isEvaluating && (
                  <motion.div 
                    initial={{ top: "-10%" }}
                    animate={{ top: "110%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-1 bg-primary shadow-[0_0_10px_#a5e7ff] z-20"
                  />
                )}
              </>
            ) : (
              <div className="flex flex-col items-center text-outline group-hover:text-primary transition-colors">
                <Camera size={48} className="mb-4" />
                <p className="font-label text-xs uppercase">Upload Build Snapshot</p>
                <p className="text-[10px] mt-2 opacity-50">JPG / PNG | MAX 5MB</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden" 
              accept="image/*"
            />
          </div>

          <div className="bg-surface-container p-6 border-2 border-outline-variant space-y-4">
            <div className="space-y-1">
              <label className="font-label text-[10px] text-outline uppercase tracking-tight">Active Blueprint</label>
              <div className="font-headline text-xl text-primary uppercase">{projectTitle}</div>
            </div>
            {!result && (
              <button 
                disabled={!image || isEvaluating}
                onClick={startEvaluation}
                className={`w-full py-4 font-headline text-2xl tracking-widest transition-all flex items-center justify-center gap-3 ${
                  !image || isEvaluating 
                  ? "bg-surface-container-highest text-outline cursor-not-allowed" 
                  : "bg-primary text-surface shadow-[4px_4px_0_0_#00566a] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                }`}
              >
                {isEvaluating ? <Zap className="animate-spin" /> : <Scan />}
                {isEvaluating ? "AUDITING..." : "INITIALIZE SCAN"}
              </button>
            )}
          </div>
        </section>

        {/* Results Phase */}
        <section className="bg-surface-container-low border-4 border-double border-primary p-8 relative overflow-hidden flex flex-col">
          <div className="absolute inset-0 dither-pattern opacity-5 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {!result && !isEvaluating && (
              <motion.div 
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center py-20"
              >
                <Cpu size={64} className="text-outline-variant mb-6 animate-pulse" />
                <h3 className="font-label text-sm text-outline uppercase tracking-widest">Awaiting Neural Link</h3>
                <p className="text-[10px] text-outline-variant mt-2">Upload visual data to start hardware verification</p>
              </motion.div>
            )}

            {isEvaluating && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 space-y-8"
              >
                <div className="space-y-2">
                  <div className="flex justify-between font-label text-[10px] text-primary">
                    <span>PROCESSING_SILICON_MAP</span>
                    <span>RUNNING</span>
                  </div>
                  <div className="h-2 bg-surface-container-highest overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-1/2 h-full bg-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-label text-[10px] text-secondary-fixed">
                    <span>CIRCUIT_DENSITY_ANALYSIS</span>
                    <span>RUNNING</span>
                  </div>
                  <div className="h-2 bg-surface-container-highest overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                      className="w-1/2 h-full bg-secondary-fixed"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 space-y-8"
              >
                <div className={`p-6 border-4 flex items-center gap-6 ${result.status === 'approved' ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(165,231,255,0.3)]' : 'border-error bg-error/10 shadow-[0_0_15px_rgba(255,107,107,0.3)]'}`}>
                  {result.status === 'approved' ? (
                    <ShieldCheck size={48} className="text-primary animate-pulse" />
                  ) : (
                    <ShieldAlert size={48} className="text-error animate-pulse" />
                  )}
                  <div>
                    <h3 className={`font-headline text-3xl uppercase tracking-tighter ${result.status === 'approved' ? 'text-primary' : 'text-error'}`}>
                      {result.status === 'approved' ? 'AUDIT_SUCCESS' : 'AUDIT_FAILED'}
                    </h3>
                    <p className={`font-label text-[10px] uppercase mt-1 ${result.status === 'approved' ? 'text-primary' : 'text-error'}`}>
                      NEURAL_INTEGRITY: {result.score}%
                    </p>
                  </div>
                </div>

                <div className="space-y-6 bg-surface p-6 border-2 border-outline-variant shadow-[4px_4px_0_0_#003543]">
                  <div>
                    <div className="flex justify-between font-label text-[8px] mb-3">
                      <span className="text-outline uppercase">SILICON_NEATNESS</span>
                      <span className="text-secondary-fixed font-bold">{result.neatness}%</span>
                    </div>
                    <div className="flex gap-1.5 h-3">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className={`flex-1 transition-all ${i < result.neatness / 10 ? 'bg-secondary-fixed' : 'bg-surface-container-highest'}`} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-label text-[8px] mb-3">
                      <span className="text-outline uppercase">CIRCUIT_ACCURACY</span>
                      <span className="text-tertiary font-bold">{result.accuracy}%</span>
                    </div>
                    <div className="flex gap-1.5 h-3">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className={`flex-1 transition-all ${i < result.accuracy / 10 ? 'bg-tertiary' : 'bg-surface-container-highest'}`} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-highest p-4 font-mono text-[10px] text-primary border-l-4 border-primary">
                   <p className="text-outline-variant mb-2">// OVERSEER_COMMENTARY</p>
                   <p className="leading-relaxed opacity-90">{result.feedback}</p>
                </div>

                <div className="flex gap-4 mt-auto pt-6">
                  <button 
                    onClick={reset}
                    className="flex-1 py-3 border-2 border-outline-variant text-outline font-label text-[10px] uppercase hover:bg-outline-variant/10 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} />
                    Retake Scan
                  </button>
                  {result.status === 'approved' && (
                    <button className="flex-[2] py-3 bg-secondary-fixed text-surface font-headline text-xl tracking-widest shadow-[4px_4px_0_0_#6c6200] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                      CLAIM_REWARDS
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}

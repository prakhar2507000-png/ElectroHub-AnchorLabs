import { useState } from "react";
import TopNav from "./components/layout/TopNav";
import Shopkeeper from "./components/shop/Shopkeeper";
import HardwareStore from "./components/store/HardwareStore";
import RaffleArena from "./components/raffle/RaffleArena";
import SystemConfig from "./components/config/SystemConfig";
import UnagamiTerminal from "./components/terminal/UnagamiTerminal";
import ProjectLab from "./components/workshop/ProjectLab";
import BuildEvaluator from "./components/workshop/BuildEvaluator";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, LayoutGrid, Upload, Zap, User } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("gallery");
  const [balance] = useState(1250); // Hardcoded Electrocredit balance for now

  return (
    <div className="min-h-screen electric-bg arcade-grid selection:bg-secondary-fixed selection:text-surface">
      <div className="scanlines" />
      
      <TopNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        balance={balance} 
        onConfigClick={() => setActiveTab("config")} 
      />
      
      <Shopkeeper onClick={() => setActiveTab("store")} />
      
      <main className="pt-32 px-4 md:px-margin-md pb-margin-lg max-w-7xl mx-auto min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectLab initialView="gallery" />
            </motion.div>
          )}

          {activeTab === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectLab initialView="upload" />
            </motion.div>
          )}

          {activeTab === "audit" && (
            <motion.div
              key="audit"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <BuildEvaluator />
            </motion.div>
          )}

          {activeTab === "store" && (
            <motion.div
              key="store"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <HardwareStore />
            </motion.div>
          )}

          {activeTab === "matrix" && (
            <motion.div
              key="matrix"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <RaffleArena />
            </motion.div>
          )}

          {activeTab === "terminal" && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <UnagamiTerminal />
            </motion.div>
          )}

          {activeTab === "config" && (
            <motion.div
              key="config"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SystemConfig />
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex items-center justify-center min-h-[60vh] border-4 border-dashed border-primary"
            >
              <div className="text-center p-12">
                <h2 className="font-headline text-5xl text-primary mb-6">USER_PROFILE</h2>
                <div className="font-label text-outline uppercase tracking-widest space-y-4">
                  <p>Cybernetic Identity Verified</p>
                  <p className="text-2xl text-secondary-fixed">PLAYER_ONE</p>
                  <div className="bg-primary/10 p-6 border-2 border-primary mt-8">
                    <p className="text-primary">TOTAL_XP: 45,200</p>
                    <p className="text-tertiary">RANK: SILICON_ADEPTS</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Footer Stats / System Logs */}
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2 p-6 bg-surface-container-low border-2 border-primary relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                  <ShoppingCart size={80} />
                </motion.div>
             </div>
            <h4 className="font-label text-xs text-primary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary inline-block"></span>
              SYSTEM LOGS
            </h4>
            <div className="space-y-2 font-label text-[10px] text-on-surface-variant h-28 overflow-y-auto pr-4">
              <p className="flex justify-between border-b border-primary-container/20 pb-1"><span>&gt; INITIALIZING_STORE_V2.0.4</span><span className="text-primary">OK</span></p>
              <p className="flex justify-between border-b border-primary-container/20 pb-1"><span>&gt; SCANNING_INVENTORY_CORE...</span><span className="text-primary">DONE</span></p>
              <p className="flex justify-between border-b border-primary-container/20 pb-1"><span>&gt; ESTABLISHING_SECURE_LINK...</span><span className="text-secondary-fixed font-bold">ENCRYPTED</span></p>
              <p className="flex justify-between border-b border-primary-container/20 pb-1"><span>&gt; CONNECTING_TO_ELECTROHUB_NETWORK</span><span className="text-primary">ACTIVE</span></p>
              <p className="flex justify-between border-b border-primary-container/20 pb-1 italic text-outline"><span>&gt; SYNCING_USER_PROFILE: UNAGAMI_CORE</span><span className="text-primary">99%</span></p>
            </div>
          </div>
          
          <div className="p-6 bg-surface-container-low border-2 border-secondary-fixed relative overflow-hidden">
            <div className="absolute inset-0 dither-pattern opacity-5 pointer-events-none" />
            <h4 className="font-label text-xs text-secondary-fixed mb-4 uppercase">Network Latency</h4>
            <div className="flex items-end gap-1.5 h-12 mb-4">
              <div className="flex-1 bg-secondary-fixed/30 h-[20%]"></div>
              <div className="flex-1 bg-secondary-fixed/50 h-[50%]"></div>
              <div className="flex-1 bg-secondary-fixed/70 h-[80%]"></div>
              <div className="flex-1 bg-secondary-fixed h-[40%]"></div>
              <div className="flex-1 bg-secondary-fixed h-[90%] animate-pulse"></div>
            </div>
            <p className="font-headline text-2xl text-secondary-fixed">14 MS</p>
          </div>

          <div className="p-6 bg-surface-container-low border-2 border-tertiary">
            <h4 className="font-label text-xs text-tertiary mb-4 uppercase">Thermal Load</h4>
            <div className="w-full bg-surface-container-lowest h-6 border-2 border-tertiary mb-4 relative overflow-hidden p-0.5">
              <motion.div 
                animate={{ width: "75%" }} 
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="h-full bg-tertiary dither-pattern"
              />
            </div>
            <p className="font-headline text-2xl text-tertiary">75°C</p>
          </div>
        </section>
      </main>

      {/* Mobile Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-surface-container border-t-4 border-double border-primary z-50 flex justify-around p-2 h-24 gap-2">
         <button 
           onClick={() => setActiveTab("gallery")} 
           className={`flex flex-col items-center justify-center gap-1 flex-1 border-2 transition-all ${activeTab === "gallery" ? "border-secondary-fixed bg-secondary-fixed/10 text-secondary-fixed shadow-[2px_2px_0_0_#6c6200]" : "border-transparent text-outline"}`}
         >
            <LayoutGrid size={18} />
            <span className="text-[7px] font-label uppercase">Gallery</span>
         </button>
         <button 
           onClick={() => setActiveTab("upload")} 
           className={`flex flex-col items-center justify-center gap-1 flex-1 border-2 transition-all ${activeTab === "upload" ? "border-secondary-fixed bg-secondary-fixed/10 text-secondary-fixed shadow-[2px_2px_0_0_#6c6200]" : "border-transparent text-outline"}`}
         >
            <Upload size={18} />
            <span className="text-[7px] font-label uppercase">Upload</span>
         </button>
         <button 
           onClick={() => setActiveTab("audit")} 
           className={`flex flex-col items-center justify-center gap-1 flex-1 border-2 transition-all ${activeTab === "audit" ? "border-error bg-error/10 text-error shadow-[2px_2px_0_0_#eb4034]" : "border-transparent text-outline"}`}
         >
            <Zap size={18} className={activeTab === "audit" ? "fill-error" : ""} />
            <span className="text-[7px] font-label uppercase">Boss</span>
         </button>
         <button 
           onClick={() => setActiveTab("store")} 
           className={`flex flex-col items-center justify-center gap-1 flex-1 border-2 transition-all ${activeTab === "store" ? "border-primary bg-primary/10 text-primary shadow-[2px_2px_0_0_#003543]" : "border-transparent text-outline"}`}
         >
            <ShoppingCart size={18} />
            <span className="text-[7px] font-label uppercase">Shop</span>
         </button>
         <button 
           onClick={() => setActiveTab("profile")} 
           className={`flex flex-col items-center justify-center gap-1 flex-1 border-2 transition-all ${activeTab === "profile" ? "border-secondary-fixed bg-secondary-fixed/10 text-secondary-fixed shadow-[2px_2px_0_0_#6c6200]" : "border-transparent text-outline"}`}
         >
            <User size={18} />
            <span className="text-[7px] font-label uppercase">User</span>
         </button>
      </nav>
    </div>
  );
}

import { motion } from "motion/react";
import { Monitor, Volume2, Save, RotateCcw, Cpu, HardDrive } from "lucide-react";
import PixelCard from "../shared/PixelCard";

export default function SystemConfig() {
  return (
    <div className="space-y-8" id="system-config">
      <section className="border-4 border-primary p-8 bg-surface-container-low relative overflow-hidden">
        <div className="absolute inset-0 dither-pattern opacity-10 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="font-headline text-5xl text-primary uppercase mb-2 tracking-widest">System_Config</h1>
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
              MODIFY CORE PARAMETERS OF THE ELECTROHUB SIMULATION ENGINE. WARNING: ROM WRITES ARE PERMANENT UNTIL NEXT SYSTEM REBOOT.
            </p>
          </div>
          <div className="text-right">
            <div className="text-secondary-fixed font-label text-[10px] mb-2">STABILITY: 98.4%</div>
            <div className="w-48 h-4 bg-surface-container-high border border-outline p-0.5 flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-secondary-fixed flex-1"></div>
              ))}
              <div className="bg-surface-variant flex-1"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <PixelCard title="CORE_VISUALS" headerIcon={<Monitor size={16} />}>
            <div className="space-y-10 py-4">
              {[
                { id: "bios", label: "STARTUP_ANIMATION", desc: "ENABLE BIOS BOOT SEQUENCE ON INITIAL LOAD", active: true },
                { id: "glitch", label: "GLITCH_INTENSITY", desc: "RANDOM PIXEL TEARING AND CHROMA SHIFT", active: false },
                { id: "scan", label: "CRT_SCANLINES", desc: "APPLY VERTICAL PHOSPHOR MASK EMULATION", active: true },
              ].map((setting) => (
                <div key={setting.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-label text-base text-on-surface uppercase tracking-wider">{setting.label}</h3>
                    <p className="text-[10px] text-outline uppercase tracking-tight">{setting.desc}</p>
                  </div>
                  <button className={`w-16 h-8 border-2 ${setting.active ? "border-secondary-fixed bg-surface-container-highest" : "border-outline-variant bg-surface-container-lowest"} relative p-0.5 transition-colors`}>
                    <motion.div 
                      animate={{ x: setting.active ? 28 : 0 }}
                      className={`w-7 h-6 ${setting.active ? "bg-secondary-fixed shadow-[0_0_8px_#fbe40f]" : "bg-outline-variant"}`}
                    />
                    <span className={`absolute ${setting.active ? "right-2" : "left-2"} top-1.5 text-[8px] font-bold ${setting.active ? "text-surface" : "text-outline"}`}>
                      {setting.active ? "ON" : "OFF"}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </PixelCard>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface border-2 border-primary p-6 flex flex-col justify-between aspect-video group hover:border-secondary-fixed transition-colors">
              <Cpu className="text-primary group-hover:text-secondary-fixed transition-colors" size={24} />
              <div>
                <div className="font-label text-[10px] text-outline uppercase mb-1">CPU_ALLOCATION</div>
                <div className="font-headline text-3xl text-secondary-fixed">THREAD_8</div>
              </div>
            </div>
            <div className="bg-surface border-2 border-tertiary p-6 flex flex-col justify-between aspect-video group hover:border-primary transition-colors">
              <HardDrive className="text-tertiary group-hover:text-primary transition-colors" size={24} />
              <div>
                <div className="font-label text-[10px] text-outline uppercase mb-1">STORAGE_MODE</div>
                <div className="font-headline text-3xl text-primary">DITHER_SRAM</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <PixelCard title="AUDIO_MATRIX" headerIcon={<Volume2 size={16} />} variant="secondary">
            <div className="space-y-10 py-4">
              {[
                { label: "BGM_VOLUME", val: "80%", segments: 8 },
                { label: "SFX_VOLUME", val: "40%", segments: 4, color: "active-yellow" },
                { label: "CORE_VOICE", val: "100%", segments: 10 },
              ].map((audio) => (
                <div key={audio.label} className="space-y-4">
                  <div className="flex justify-between font-label text-[10px]">
                    <span className="text-on-surface">{audio.label}</span>
                    <span className="text-secondary-fixed">{audio.val}</span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-6 w-full ${
                          i < audio.segments 
                            ? audio.color === "active-yellow" ? "bg-secondary-fixed shadow-[0_0_8px_#fbe40f]" : "bg-primary shadow-[0_0_8px_#a5e7ff]"
                            : "bg-surface-container-highest"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </PixelCard>

          <div className="space-y-6">
            <button className="w-full bg-primary text-surface py-6 font-headline text-2xl tracking-widest flex items-center justify-center gap-4 transition-all hover:bg-secondary-fixed hover:border-surface group shadow-[8px_8px_0_0_#00566a]">
              <Save size={24} className="group-hover:rotate-12 transition-transform" />
              COMMIT_CHANGES_TO_ROM
            </button>
            <p className="text-[10px] font-label text-outline text-center uppercase tracking-tighter animate-pulse">
               WARNING: SYSTEM REBOOT REQUIRED AFTER FLASHING
            </p>
            
            <button className="w-full bg-surface-container-low border-2 border-error text-error py-4 font-label text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-error/10 transition-all uppercase">
              <RotateCcw size={16} />
              Reset to Factory Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

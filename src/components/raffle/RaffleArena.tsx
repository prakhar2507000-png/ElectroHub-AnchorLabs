import { motion } from "motion/react";
import { Ticket, Zap, Trophy, Lock } from "lucide-react";
import PixelCard from "../shared/PixelCard";

export default function RaffleArena() {
  const stats = [
    { label: "POWER LEVEL", value: "9999", progress: 90 },
    { label: "CLOCK SPEED", value: "2.52 GHz", progress: 60 },
  ];

  const winners = [
    { rank: "01", player: "PIXEL_REAPER", loot: "TITAN_V", score: "999,999", color: "text-secondary-fixed" },
    { rank: "02", player: "GLITCH_QUEEN", loot: "RTX_3080", score: "842,100", color: "text-primary" },
    { rank: "03", player: "CYBER_PUNK_4", loot: "CORE_I9_MAX", score: "775,002", color: "text-primary" },
    { rank: "04", player: "UNAGAMI_FAN", loot: "PSU_850W", score: "650,440", color: "text-primary" },
    { rank: "05", player: "BOT_KILLER", loot: "RAM_64GB", score: "512,000", color: "text-primary" },
  ];

  return (
    <div className="space-y-12" id="raffle-arena">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-surface-container border-2 border-primary p-1 mb-1">
            <div className="bg-primary text-on-primary px-4 py-1 flex justify-between items-center">
              <h2 className="font-label text-xs uppercase tracking-widest">CURRENT WORLD BOSS</h2>
              <span className="font-label text-[10px] animate-pulse">RARE DROP AVAILABLE</span>
            </div>
          </div>
          
          <div className="relative group border-4 border-double border-primary bg-surface overflow-hidden aspect-video flex items-center justify-center">
            <div className="absolute inset-0 dither-pattern opacity-20 pointer-events-none"></div>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZdep-3ZE36cl9DMs-bbvK-OJ-jaLVoEje1gnmfmzQAD0RYW37VCz7XP37lrqotZ6IAEDMQBdXKamelNRe_QUGWEjTPGcTSeSBG2KBFxFo6UOggCBWu-kuO9bi8LUwwW_ZgNBfTIIeizAKSiYSdXXEVAYw7TN_Oj3R_qCpbUN5ddjxASdN9BUbVheXa5E4PLeBZ30_Qia6_nkicho90Vndf-kGOLmIDM8eR93o__V-oCBki7mBhud64CHynfqZVRXAukuPfDvhfTA" 
              alt="RTX 4090"
              className="w-4/5 h-auto object-contain z-10 transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6 z-20">
              <h1 className="font-headline text-5xl text-primary drop-shadow-[4px_4px_0_#000]">GeForce RTX 4090</h1>
              <div className="flex gap-4 mt-2">
                <span className="bg-secondary-container text-on-secondary-container font-label text-[10px] px-3 py-1">ULTRA RARE</span>
                <span className="bg-tertiary-container text-on-tertiary-container font-label text-[10px] px-3 py-1">BOSS LOOT</span>
              </div>
            </div>
            <div className="absolute top-6 right-6 z-20 text-right">
              <div className="font-headline text-3xl text-secondary-fixed">0.0042%</div>
              <div className="font-label text-[10px] text-outline">DROP RATE</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-surface-container border-2 border-primary p-6 flex-1 flex flex-col">
            <h3 className="font-headline text-2xl text-primary mb-6 uppercase tracking-tighter">Item Stats</h3>
            <div className="space-y-6 flex-grow">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="flex justify-between font-label text-[10px] mb-2">
                    <span>{stat.label}</span>
                    <span className="text-secondary-fixed">{stat.value}</span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-6 flex-1 ${i < stat.progress / 10 ? "bg-secondary-fixed shadow-[0_0_8px_#fbe40f]" : "bg-surface-container-highest"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <div className="flex justify-between font-label text-[10px] mb-2 text-error">
                  <span>VRAM_GLITCH_LEVEL</span>
                  <span>CRITICAL</span>
                </div>
                <p className="font-body text-xs text-on-surface-variant italic border-l-4 border-error pl-4">
                  "If you look closely at the memory chips, you can see the fragments of the lost users."
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-outline/20">
              <div className="text-center mb-4">
                <span className="font-label text-[10px] text-outline">COST PER ATTEMPT</span>
                <div className="font-headline text-3xl text-primary">500 CREDITS</div>
              </div>
              <button className="w-full bg-secondary-fixed text-surface py-5 font-headline text-2xl tracking-widest flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-[4px_4px_0_0_#6c6200]">
                <Ticket />
                BUY TICKET
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface border-4 border-double border-primary overflow-hidden">
          <div className="bg-primary text-on-primary px-4 py-2 font-headline text-2xl italic tracking-tighter">
            WINNER_LOG
          </div>
          <div className="p-6">
            <div className="grid grid-cols-4 font-label text-[10px] text-outline border-b-2 border-surface-container-highest pb-4 mb-4">
              <span>RANK</span>
              <span>PLAYER_ID</span>
              <span>LOOT_TYPE</span>
              <span className="text-right">SCORE</span>
            </div>
            <div className="space-y-1">
              {winners.map((w) => (
                <div key={w.rank} className={`grid grid-cols-4 font-label text-[10px] py-3 border-b border-outline/10 hover:bg-surface-container transition-colors ${w.color}`}>
                  <span>{w.rank}</span>
                  <span>{w.player}</span>
                  <span>{w.loot}</span>
                  <span className="text-right">{w.score}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="text-primary font-label text-[10px] hover:underline uppercase tracking-widest">[ View All Historical Logs ]</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-surface-container border-2 border-primary p-6">
            <h3 className="font-headline text-2xl text-tertiary-container mb-4 uppercase tracking-tighter">Drop Chance Buffer</h3>
            <p className="font-label text-[10px] text-outline mb-4">CALCULATING GLOBAL SERVER LUCK...</p>
            <div className="relative h-12 w-full border-4 border-primary bg-surface-container-lowest overflow-hidden">
              <motion.div 
                animate={{ width: "65%" }}
                className="h-full bg-primary dither-pattern"
              />
              <div className="absolute inset-0 flex items-center justify-center font-headline text-2xl text-surface mix-blend-difference">
                65% CHARGED
              </div>
            </div>
            <p className="mt-6 font-body text-xs text-on-surface-variant leading-relaxed">
              As players buy tickets, the global Drop Buffer increases. At 100%, the next ticket has a 10x multiplier.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface border-2 border-outline-variant hover:border-primary transition-all cursor-pointer group">
              <div className="h-24 bg-surface-container-low overflow-hidden">
                 <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLH1jnIKPFZ2a-oN-gfH7OAgM8wNoFSpJOM-KurWJcK10l91-BCGyu_lEnRT7LL-3JLOJQR8NpIV_IxBEYYSkjmqVdssCzjz1vumrdu-EsjX8SC0RTmIGAHbGl_oXhHvB1Q9nLkjExNpecTPYESklyRCxNY59mpGAtafxKDbYLVE2p-7aozhjLUBfqfYJSK1Ao_5AI55UETOFvCPr4VsoKG6KEyZkWGHrSD7Mod_Mvi4jBy0x5kSLurn3H4osf86Qfa-oQeni8LNY" 
                    alt="KBD_MINI"
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                 />
              </div>
              <div className="p-3">
                <div className="font-label text-[10px] text-primary">KBD_MINI</div>
                <div className="text-[8px] text-outline">400 TICKETS REMAIN</div>
              </div>
            </div>
            <div className="bg-surface border-2 border-outline-variant hover:border-primary transition-all cursor-pointer group">
               <div className="h-24 bg-surface-container-low overflow-hidden">
                 <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlp1CfmEgZbAmc3Zcu0LYAnPfj6NBByJuDf4XNj6B-Rrin09rvPlkeclyt_yFpl225XTrNregu6Qx9F2urGNgKKLReYNodh7VTvAowmx1rWQlpn9oqj_qGRpmc0xXDbntFjAGv3WdhqOkIbByO5QTSEB4yQ16Qilu-NNbtV0ReSIa-9Mxz-IxWQTepwYMzawZ8S6_dWKkFM2oUTKxdYOsYNcL6JqLK6USY9YHMAGpUI1sFPcqh4oLKV1exwiW_J68rZfpzLyzAlUY" 
                    alt="MS_CURSOR_V2"
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                 />
              </div>
              <div className="p-3">
                <div className="font-label text-[10px] text-primary">MS_CURSOR_V2</div>
                <div className="text-[8px] text-outline">12 TICKETS REMAIN</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

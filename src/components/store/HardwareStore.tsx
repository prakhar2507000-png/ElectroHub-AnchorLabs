import { motion } from "motion/react";
import PixelCard from "../shared/PixelCard";
import RaffleArena from "../raffle/RaffleArena";
import { Verified, MemoryStick, Lock } from "lucide-react";

const PRODUCTS = [
  {
    id: "001",
    code: "DEV_BOARD // 001",
    name: "Raspberry Pi 5",
    desc: "High-performance silicon with 8GB RAM and quad-core CPU. Essential for matrix intrusion.",
    price: 8000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5zw9UEdm45dvq8p6kptGQjxzC6KGPibCcJG_Ge_iFCgDXsnKrJTg8vwjyzD12BJaQKeJGDRqnp1vNoHGuj1Ps02dAMEvneqsFsoizbWVWv9G3DnLpR1a-56fMKlYUJHQEw3_ILufQxBfm5nZaWPTHNtRzB3tw1_LTuGaaVx_qjQYpHxLTeoDARV60uqzLjGp79SCQWwurNS7f_jbYyBoqeRrCMsuoxCB7iflQhYXyz5vKG_dMuDvgkrLbiCI5P9j5FRRSGU4GgTk",
    icon: <Verified size={16} />,
    tag: "NEW VERSION"
  },
  {
    id: "042",
    code: "MICRO_CTRL // 042",
    name: "STM32 Nucleo",
    desc: "Prototyping platform for low-level system override. ARM Cortex-M architecture.",
    price: 2500,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuANToiPr_ngaV4-huAbwhc4YSzqK5TjLKaKasXvQZQ70wpsZlFP7ENXu-7SA2nDaHmLop-KQM0uZ-NiwAH3E-pqDDlkXYeq8dfK-mxU_kiGjbXkf10z-_x_d0elP8Rf4tV4wX6skp1RG9zYDSn9U54vC5XiQfKA3GSS9KkAft_2G4vU5cXccJGL_YLB0rz6cmStwf1WPJSWL4raeYzasKoyeZFBvK-hXZSNhGLnEV3trMI8OfLQptGf97vpLdFQMCpw94qtjT43Llc",
    icon: <MemoryStick size={16} />
  }
];

export default function HardwareStore() {
  return (
    <div className="space-y-12" id="hardware-store">
      {/* Raffle Arena Integration */}
      <section className="border-4 border-double border-tertiary p-6 bg-surface-container-highest">
         <h2 className="font-headline text-2xl text-tertiary mb-6 uppercase italic tracking-tighter">Arena_Hotspot</h2>
         <RaffleArena />
      </section>

      <section className="relative border-4 border-primary p-8 bg-surface-container-low overflow-hidden">
        <div className="absolute inset-0 dither-pattern opacity-10 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="font-headline text-5xl uppercase mb-2 text-pixel-3d-cyan">Hardware Vestibule</h1>
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
              Restock your digital arsenal. Premium silicons and high-voltage conduits harvested from the deepest sectors.
            </p>
          </div>
          <div className="bg-surface border-2 border-secondary-fixed p-4 text-center shadow-[4px_4px_0_0_#6c6200]">
            <span className="font-label text-[8px] text-secondary-fixed block mb-1">ELECTROCREDITS</span>
            <span className="font-headline text-2xl text-secondary-fixed">9420.00</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <PixelCard key={product.id} title={product.code} headerIcon={product.icon}>
            <div className="aspect-square bg-surface-container-lowest border border-outline-variant mb-4 relative overflow-hidden group/img pixelated">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover p-4 scale-90 group-hover/img:scale-100 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              {product.tag && (
                <div className="absolute bottom-2 right-2 bg-secondary-fixed text-surface px-2 py-1 font-label text-[8px]">
                  {product.tag}
                </div>
              )}
            </div>
            <h3 className="font-headline text-lg text-primary mb-1">{product.name}</h3>
            <p className="font-body text-sm text-on-surface-variant mb-6 h-12 overflow-hidden">{product.desc}</p>
            <div className="flex justify-between items-center">
              <span className="font-headline text-xl text-secondary-fixed">{product.price} <small className="text-[10px]">EC</small></span>
              <button className="px-4 py-2 bg-primary text-surface font-bold font-label text-[10px] hover:bg-secondary-fixed transition-colors shadow-[2px_2px_0_0_#003543]">
                BUY_ITEM
              </button>
            </div>
          </PixelCard>
        ))}


        <div className="bg-surface-container-highest border-2 border-tertiary relative flex flex-col p-0 overflow-hidden">
          <div className="bg-tertiary text-on-tertiary px-4 py-2 flex justify-between items-center">
            <span className="font-label text-xs uppercase tracking-widest">SPECIAL_OP // ???</span>
            <Lock size={16} />
          </div>
          <div className="p-6 flex-1 flex flex-col items-center justify-center text-center opacity-50 hover:opacity-100 transition-opacity">
            <div className="w-full border-2 border-dashed border-tertiary p-8 mb-4 flex flex-col items-center">
              <Lock size={48} className="text-tertiary animate-pulse mb-4" />
              <p className="font-label text-xs text-tertiary uppercase tracking-widest">ENCRYPTED BUNDLE</p>
              <p className="text-[10px] text-tertiary-fixed mt-2">LVL 50 REQUIRED</p>
            </div>
            <h3 className="font-headline text-2xl text-tertiary mb-4">Null Pointer Set</h3>
            <div className="w-full flex justify-between items-center mt-auto">
              <span className="font-headline text-2xl text-tertiary-fixed">??? <small className="text-xs">CR</small></span>
              <button className="px-6 py-2 bg-surface text-tertiary border-2 border-tertiary font-bold font-label text-xs opacity-50 cursor-not-allowed">
                LOCKED
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

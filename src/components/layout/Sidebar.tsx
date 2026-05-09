import { LayoutGrid, Package, Trophy, Zap, Coins, Terminal } from "lucide-react";
import { motion } from "motion/react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "lab", label: "Project Lab", icon: <LayoutGrid size={18} /> },
    { id: "audit", label: "Neural Audit", icon: <Zap size={18} /> },
    { id: "store", label: "Hardware Vestibule", icon: <Package size={18} /> },
    { id: "matrix", label: "Raffle Arena", icon: <Trophy size={18} /> },
    { id: "terminal", label: "Neural Link", icon: <Terminal size={18} /> },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 pt-24 pb-8 flex flex-col border-r-4 border-double border-primary bg-surface-container-lowest z-40 hidden lg:flex" id="sidebar">
      <div className="flex flex-col items-center p-6 text-center">
        <div className="w-20 h-20 bg-primary-container border-2 border-primary mb-4 p-1">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy0uF29hBSo5x11wuubNJccnb1BIuw5hjQZnIVF3-ehUxkhHXdUxWZYmGrynPFnhNw9a57K_RdKbhjYYAiNuuasOEtHO0BU_2WWcKVPL4mdmf3SiB0zJbuZzRITtkS4LG_ALmHxu8s620r0q55eFd-xGjxwvl4ZkKNbRfz9eSGGdVXOmj4e8yf6H2YK4zPbvC92MLJL-CaQmx8TlgBhug8BJEX8GbMmvvd3wQu70LCgBQimV4ubsJUA4wTmf8WsYy8QM-ufy_jrgs" 
            alt="Unagami" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h2 className="font-headline text-secondary-fixed text-lg">UNAGAMI_CORE</h2>
        <p className="font-label text-[10px] text-outline">LVL 99 SYSTEM ADMIN</p>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-2 transition-all font-label text-xs uppercase tracking-tight ${
              activeTab === item.id 
                ? "text-tertiary-container translate-x-2 before:content-['▶'] before:animate-pulse" 
                : "text-outline hover:text-primary"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-6 space-y-4">
        <div className="bg-secondary-fixed py-4 text-surface text-center font-headline text-2xl shadow-[4px_4px_0_0_#6c6200] cursor-pointer hover:scale-105 active:scale-95 transition-all">
          INSERT COIN
        </div>
        <div className="flex items-center justify-center gap-2 text-primary font-label text-[10px]">
          <Coins size={12} />
          XP: 8840/9000
        </div>
      </div>
    </aside>
  );
}

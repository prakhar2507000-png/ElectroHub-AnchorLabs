import { Bell, Settings2, Zap, User } from "lucide-react";
import GlitchLogo from "./GlitchLogo";

interface TopNavProps {
  onConfigClick: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  balance: number;
}

export default function TopNav({ onConfigClick, activeTab, setActiveTab, balance }: TopNavProps) {
  return (
    <header className="fixed top-0 left-0 w-full h-24 bg-surface border-b-4 border-double border-primary z-50 flex items-center justify-between px-8" id="top-nav">
      <div className="flex items-center gap-12">
        <div className="flex flex-col">
          <GlitchLogo onClick={() => setActiveTab("lab")} />
          <p className="font-label text-[8px] text-outline uppercase tracking-[0.2em] mt-1 ml-1">Learning made fun</p>
        </div>
        
        <nav className="hidden md:flex gap-10 items-center h-full pt-4">
          <button 
            onClick={() => setActiveTab("gallery")}
            className={`font-label text-[10px] tracking-widest transition-all ${activeTab === "gallery" ? "text-secondary-fixed border-b-2 border-secondary-fixed" : "text-outline hover:text-secondary-fixed"}`}
          >
            GALLERY
          </button>
          <button 
            onClick={() => setActiveTab("upload")}
            className={`font-label text-[10px] tracking-widest transition-all ${activeTab === "upload" ? "text-secondary-fixed border-b-2 border-secondary-fixed" : "text-outline hover:text-secondary-fixed"}`}
          >
            UPLOAD
          </button>
          <button 
            onClick={() => setActiveTab("audit")}
            className={`font-label text-[10px] tracking-widest transition-all px-4 py-2 border-2 ${activeTab === "audit" ? "border-error text-error bg-error/10" : "border-primary text-primary hover:border-error hover:text-error transition-colors"}`}
            id="evaluate-boss-btn"
          >
            EVALUATE [BOSS]
          </button>
          <button 
            onClick={() => setActiveTab("profile")}
            className={`font-label text-[10px] tracking-widest transition-all ${activeTab === "profile" ? "text-secondary-fixed border-b-2 border-secondary-fixed" : "text-outline hover:text-secondary-fixed"}`}
          >
            PROFILE
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-8">
        <div 
          className="bg-surface-container-highest border-2 border-primary px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-primary/5 transition-colors group shadow-[4px_4px_0_0_#003543]"
          onClick={() => setActiveTab("store")}
        >
          <Zap size={14} className="text-secondary-fixed fill-secondary-fixed group-hover:scale-125 transition-transform" />
          <div className="flex flex-col">
            <span className="font-label text-[6px] text-outline uppercase">ELECTROCREDITS</span>
            <span className="font-headline text-sm text-primary">{balance} EC</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-primary">
          <Bell size={20} className="cursor-pointer hover:scale-110 transition-transform" />
          <User 
            size={20} 
            className={`cursor-pointer hover:scale-110 transition-transform ${activeTab === "profile" ? "text-secondary-fixed" : ""}`}
            onClick={() => setActiveTab("profile")} 
          />
          <Settings2 size={20} className="cursor-pointer hover:scale-110 transition-transform" onClick={onConfigClick} />
        </div>
      </div>
    </header>
  );
}

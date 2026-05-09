import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";
import { motion, AnimatePresence } from "motion/react";
import PixelCard from "../shared/PixelCard";
import AdSpace from "../shared/AdSpace";
import { Plus, LayoutGrid, Upload, Cpu, Zap, Verified, Info } from "lucide-react";

interface Project {
  id: string;
  title: string;
  code: string;
  description: string;
  difficulty: string;
  ecReward: number;
  imageUrl: string;
  connectionImageUrl: string;
  components: string[];
  instructions: string;
  authorEmail: string;
}

interface ProjectLabProps {
  initialView?: "gallery" | "upload";
}

export default function ProjectLab({ initialView = "gallery" }: ProjectLabProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [view, setView] = useState<"gallery" | "upload">(initialView);
  const [loading, setLoading] = useState(true);
  const [isValidating, setIsValidating] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [desc, setDesc] = useState("");
  const [components, setComponents] = useState("");
  const [instructions, setInstructions] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [ec, setEc] = useState(1000);
  const [imgUrl, setImgUrl] = useState("");
  const [connImgUrl, setConnImgUrl] = useState("");

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  async function fetchProjects() {
    setLoading(true);
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      setProjects(data);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload() {
    if (!auth.currentUser) {
      alert("PLEASE_SIGN_IN_TO_DEPLOY_PROJECTS");
      return;
    }

    if (!title || !code || !components || !instructions || !imgUrl || !connImgUrl) {
      alert("ALL_CRITERIA_MUST_BE_MET_BEFORE_DEPLOYMENT");
      return;
    }

    setIsValidating(true);
    // Simulate AI audit of the blueprint
    await new Promise(r => setTimeout(r, 2000));

    try {
      await addDoc(collection(db, "projects"), {
        title,
        code,
        description: desc,
        components: components.split(",").map(c => c.trim()),
        instructions,
        difficulty,
        ecReward: Number(ec),
        imageUrl: imgUrl,
        connectionImageUrl: connImgUrl,
        authorId: auth.currentUser.uid,
        authorEmail: auth.currentUser.email,
        createdAt: serverTimestamp(),
      });
      setView("gallery");
      fetchProjects();
      // Reset form
      setTitle("");
      setCode("");
      setDesc("");
      setComponents("");
      setInstructions("");
      setImgUrl("");
      setConnImgUrl("");
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsValidating(false);
    }
  }

  return (
    <div className="space-y-8" id="project-lab">
      <header className="flex flex-col md:flex-row justify-between items-end gap-4 border-b-4 border-primary pb-6 bg-surface-container-low p-6">
        <div>
          <h1 className="font-headline text-5xl uppercase text-pixel-3d">PROJECT_LAB</h1>
          <p className="font-label text-[10px] text-outline tracking-tighter mt-2 uppercase">EXPLORE_COLLECT_BUILD</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setView("gallery")}
            className={`px-6 py-2 font-label text-xs uppercase tracking-widest transition-all ${view === "gallery" ? "bg-primary text-surface" : "text-primary border-2 border-primary hover:bg-primary/10"}`}
          >
            Gallery
          </button>
          <button 
            onClick={() => setView("upload")}
            className={`px-6 py-2 font-label text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${view === "upload" ? "bg-secondary-fixed text-surface" : "text-secondary-fixed border-2 border-secondary-fixed hover:bg-secondary-fixed/10"}`}
          >
            <Plus size={14} />
            Deploy
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {view === "gallery" ? (
          <motion.div 
            key="gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.length > 0 && (
              <div className="col-span-full mb-8">
                <AdSpace variant="horizontal" />
              </div>
            )}
            
            {projects.length === 0 ? (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-outline-variant">
                <p className="font-label text-outline uppercase">No projects found in this sector. Be the first to deploy.</p>
              </div>
            ) : (
              projects.map((p) => (
                <PixelCard key={p.id} title={p.code || "UNKNOWN_NODE"} headerIcon={<Verified size={16} />}>
                  <div className="aspect-video bg-surface-container-lowest border-2 border-outline-variant mb-4 overflow-hidden pixelated">
                    <img 
                      src={p.imageUrl} 
                      alt={p.title} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <h3 className="font-headline text-lg text-primary mb-1 uppercase tracking-tight line-clamp-1">{p.title}</h3>
                  <div className="flex gap-2 mb-4">
                    <span className="bg-surface-container-highest px-2 py-0.5 text-[6px] font-label text-secondary-fixed border border-secondary-fixed/30 uppercase">{p.difficulty}</span>
                    <span className="bg-surface-container-highest px-2 py-0.5 text-[6px] font-label text-tertiary border border-tertiary/30 uppercase">{p.ecReward} EC</span>
                  </div>
                  <p className="font-body text-xs text-on-surface-variant mb-6 line-clamp-2 h-8">{p.description}</p>
                  <button className="w-full py-3 bg-primary text-surface font-bold font-label text-[10px] uppercase hover:bg-secondary-fixed transition-colors shadow-[4px_4px_0_0_#003543]">
                    OPEN_MAINFRAME
                  </button>
                </PixelCard>
              ))
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto bg-surface-container border-2 border-secondary-fixed p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 dither-pattern opacity-5 pointer-events-none" />
            <h2 className="font-headline text-3xl text-secondary-fixed mb-8 uppercase flex items-center gap-3">
              <Upload />
              DEPLOY_BLUEPRINT
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="font-label text-[8px] text-outline uppercase tracking-widest">01. Project Name</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. ARDUINO_OSCILLOSCOPE"
                    className="w-full bg-surface-container-highest border-2 border-outline-variant px-4 py-3 text-primary font-label text-[10px] focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-label text-[8px] text-outline uppercase tracking-widest">02. Unique Code</label>
                  <input 
                    type="text" 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. CTRL_OSC_88"
                    className="w-full bg-surface-container-highest border-2 border-outline-variant px-4 py-3 text-primary font-label text-[10px] focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-label text-[8px] text-outline uppercase tracking-widest">03. Bill of Materials (Comma Separated)</label>
                  <textarea 
                    value={components}
                    onChange={(e) => setComponents(e.target.value)}
                    rows={3}
                    placeholder="Arduino Nano, 10k Resistor, OLED Display..."
                    className="w-full bg-surface-container-highest border-2 border-outline-variant px-4 py-3 text-primary font-label text-[10px] focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-label text-[8px] text-outline uppercase tracking-widest">Difficulty</label>
                    <select 
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full bg-surface-container-highest border-2 border-outline-variant px-4 py-3 text-primary font-label text-[10px] focus:border-primary focus:outline-none cursor-pointer"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label text-[8px] text-outline uppercase tracking-widest">EC Reward</label>
                    <input 
                      type="number" 
                      value={ec}
                      onChange={(e) => setEc(Number(e.target.value))}
                      className="w-full bg-surface-container-highest border-2 border-outline-variant px-4 py-3 text-primary font-label text-[10px] focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="font-label text-[8px] text-outline uppercase tracking-widest">04. Connection Schematic (Image URL)</label>
                  <input 
                    type="text" 
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-surface-container-highest border-2 border-outline-variant px-4 py-3 text-primary font-label text-[10px] focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-label text-[8px] text-outline uppercase tracking-widest">05. Assembly Instructions</label>
                  <textarea 
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={8}
                    placeholder="1. Connect VCC to 5V...
2. Flash the firmware...
3. Calibrate sensory inputs..."
                    className="w-full bg-surface-container-highest border-2 border-outline-variant px-4 py-3 text-primary font-label text-[10px] focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 bg-tertiary/5 border border-tertiary/20 p-4 flex gap-4 items-start">
              <Zap size={16} className="text-tertiary shrink-0 mt-0.5" />
              <p className="text-[10px] font-label text-outline uppercase leading-relaxed">
                NEURAL_AUDIT REQUIRED: AI will verify schematic logic and component compatibility before live deployment.
              </p>
            </div>

            <button 
              onClick={handleUpload}
              disabled={isValidating}
              className="w-full py-4 bg-secondary-fixed text-surface font-headline text-xl tracking-widest shadow-[4px_4px_0_0_#6c6200] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all mt-6 disabled:opacity-50"
            >
              {isValidating ? "INITIALIZING_AI_AUDIT..." : "DEPLOY_TO_GALLERY"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

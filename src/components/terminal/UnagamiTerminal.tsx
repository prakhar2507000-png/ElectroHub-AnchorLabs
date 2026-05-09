import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from "motion/react";
import { Terminal as TerminalIcon, Send } from "lucide-react";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function UnagamiTerminal() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "SYSTEM_INITIALIZED. I AM UNAGAMI. WHAT DO YOU REQUIRE, USER?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const prompt = `You are Unagami, a high-stakes system administrator of a retro-arcade hardware simulation called ELECTROHUB. 
      You speak in a cold, technical, but slightly aggressive and neon-brutalist tone. 
      Use words like 'CORES', 'MATRIX', 'SILICON', 'OVERRIDE', 'CREDITS'. 
      The user just said: ${userMsg}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [...prev, { role: "ai", text: text.trim() }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", text: "ERROR: NEURAL_LINK_FAILED. RETRY_TRANSMISSION." }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-[60vh] flex flex-col bg-surface-container-lowest border-4 border-double border-primary" id="unagami-terminal">
      <div className="bg-primary text-on-primary px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} />
          <span className="font-label text-xs uppercase">UNAGAMI_LINK_V5.0</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-on-primary rounded-full animate-pulse"></div>
          <span className="font-label text-[10px]">ENCRYPTED</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-xs">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex gap-3 ${msg.role === "ai" ? "text-primary" : "text-secondary-fixed"}`}
            >
              <span className="shrink-0 font-bold">[{msg.role === "ai" ? "UNAGAMI" : "USER"}]</span>
              <p className="leading-relaxed">{msg.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex gap-3 text-primary animate-pulse">
            <span className="shrink-0 font-bold">[UNAGAMI]</span>
            <p>COMPUTING_RESPONSE...</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t-2 border-primary bg-surface flex gap-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="SEND COMMAND..."
          className="flex-1 bg-surface-container-highest border-2 border-outline-variant px-4 py-2 text-primary font-label text-sm focus:outline-none focus:border-primary transition-colors"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-primary text-surface px-6 py-2 flex items-center gap-2 hover:bg-secondary-fixed transition-colors disabled:opacity-50"
        >
          <Send size={16} />
          <span className="font-bold">EXECUTE</span>
        </button>
      </div>
    </div>
  );
}
